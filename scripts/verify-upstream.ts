import { createHash } from 'node:crypto';
import { appendFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  classifyDrift,
  type Pin,
  parsePinRows,
  renderReport,
} from '../apps/web/lib/registry/upstream-drift';

const REPO_ROOT = join(import.meta.dirname, '..');
const REGISTRY_URL = 'https://coss.com/ui/r/registry.json';
const ITEM_URL = 'https://coss.com/ui/r';
const TIMEOUT_MS = 30_000;
const CONCURRENCY = 6;
/** The index lists its own aggregate under this name; it is not a component. */
const INDEX_AGGREGATE = 'ui';

const args = new Set(process.argv.slice(2));
const failOnDrift = args.has('--fail-on-drift');
const jsonOutput = args.has('--json');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const fetchJson = async (url: string): Promise<unknown> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }

  return response.json();
};

const sha256 = (content: string) =>
  createHash('sha256').update(content, 'utf8').digest('hex');

type UpstreamIndex = {
  names: string[];
  uiNames: string[];
};

/** The upstream item names, or null when the index is unusable. */
const readUpstreamIndex = (index: unknown): UpstreamIndex | null => {
  if (!(isRecord(index) && Array.isArray(index.items))) {
    return null;
  }

  const names: string[] = [];
  const uiNames: string[] = [];

  for (const item of index.items) {
    if (!isRecord(item) || typeof item.name !== 'string') {
      continue;
    }

    names.push(item.name);

    if (item.type === 'registry:ui') {
      uiNames.push(item.name);
    }
  }

  return { names, uiNames };
};

/** Hash one pinned item, or null when its document cannot be used. */
const readItemHash = async (pin: Pin): Promise<string | null> => {
  try {
    const item: unknown = await fetchJson(`${ITEM_URL}/${pin.coss}.json`);

    if (!(isRecord(item) && Array.isArray(item.files))) {
      return null;
    }

    const first: unknown = item.files[0];

    if (!isRecord(first) || typeof first.content !== 'string') {
      return null;
    }

    return sha256(first.content);
  } catch (error) {
    console.error(`could not fetch ${pin.coss}: ${String(error)}`);

    return null;
  }
};

/** Map over items with a bounded number of in-flight promises. */
const mapWithConcurrency = async <T, R>(
  items: T[],
  limit: number,
  run: (item: T) => Promise<R>
): Promise<R[]> => {
  const results = new Array<R>(items.length);
  let cursor = 0;

  const worker = async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;

      const item = items[index];

      if (item !== undefined) {
        // biome-ignore lint/performance/noAwaitInLoops: each worker drains a shared cursor so only six fetches run at once
        results[index] = await run(item);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );

  return results;
};

const versionSource = await readFile(join(REPO_ROOT, 'VERSION.md'), 'utf8');
const pins = parsePinRows(versionSource);

const index = await fetchJson(REGISTRY_URL).catch((error: unknown) => {
  console.error(`could not fetch the registry index: ${String(error)}`);

  return null;
});
const upstream = readUpstreamIndex(index);
const unreachable = upstream === null ? ['registry index'] : [];
const hashes = await mapWithConcurrency(pins, CONCURRENCY, readItemHash);
const currentHashes = new Map<string, string>();

for (const [indexPosition, hash] of hashes.entries()) {
  const pin = pins[indexPosition];

  if (!pin) {
    continue;
  }

  if (hash === null) {
    unreachable.push(pin.coss);
  } else {
    currentHashes.set(pin.coss, hash);
  }
}

const report = classifyDrift({
  currentHashes,
  pins,
  unreachable,
  upstreamNames: upstream?.names ?? pins.map((pin) => pin.coss),
  upstreamUiNames:
    upstream?.uiNames.filter((name) => name !== INDEX_AGGREGATE) ??
    pins.map((pin) => pin.coss),
});

const markdown = renderReport(report);
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

if (summaryPath) {
  await appendFile(summaryPath, `${markdown}\n`);
}

console.log(jsonOutput ? JSON.stringify(report, null, 2) : markdown);

const hasDrift =
  report.changed.length > 0 ||
  report.newItems.length > 0 ||
  report.removed.length > 0 ||
  report.unreachable.length > 0;

if (failOnDrift && hasDrift) {
  process.exitCode = 1;
}
