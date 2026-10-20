import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import {
  CAPTURE_DIR,
  CAPTURE_SCHEMES,
  captureManifest,
  captureSelector,
} from './capture/manifest';

const webDir = join(import.meta.dirname, '..');
const outputDir = join(webDir, CAPTURE_DIR);
const port = Number(process.env.VISUAL_PORT ?? 3210);

/** The docs server to capture, either external or started for this run. */
type Server = {
  baseUrl: string;
  stop: () => void;
};

/** Poll an origin until it answers, so a cold dev server is not a failure. */
const waitForServer = async (
  url: string,
  timeoutMs = 300_000,
  deadline = Date.now() + timeoutMs
): Promise<void> => {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(Math.min(deadline - Date.now(), 120_000)),
    });
    if (response.ok) {
      return;
    }
  } catch {
    // The server has not finished booting; poll again.
  }

  if (Date.now() >= deadline) {
    throw new Error(`${url} did not answer within ${timeoutMs}ms`);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await waitForServer(url, timeoutMs, deadline);
};

/** Reuse a running docs app when given one, otherwise start it from source. */
const startServer = async (): Promise<Server> => {
  const externalBaseUrl = process.env.VISUAL_BASE_URL;

  if (externalBaseUrl) {
    await waitForServer(`${externalBaseUrl}/docs/zen`);
    return { baseUrl: externalBaseUrl, stop: () => undefined };
  }

  const child = spawn(
    join(webDir, 'node_modules/.bin/next'),
    ['dev', '--port', String(port)],
    {
      cwd: webDir,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
      stdio: 'inherit',
    }
  );
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForServer(`${baseUrl}/docs/zen`);
  } catch (error) {
    child.kill('SIGTERM');
    throw error;
  }

  return {
    baseUrl,
    stop: () => {
      child.kill('SIGTERM');
      child.unref();
    },
  };
};

/**
 * Screenshot every zen Example in both schemes. Pixel differences are never
 * compared: the run fails only when a page or its preview cannot be captured.
 */
const main = async () => {
  const captures = await captureManifest(webDir);
  const expected = captures.length * CAPTURE_SCHEMES.length;

  await rm(outputDir, { force: true, recursive: true });

  const server = await startServer();
  const browser = await chromium.launch();
  const failures: string[] = [];

  /** Capture every Example in one scheme, reusing one page for the whole run. */
  const captureScheme = async (scheme: (typeof CAPTURE_SCHEMES)[number]) => {
    await mkdir(join(outputDir, scheme), { recursive: true });

    const context = await browser.newContext({
      colorScheme: scheme,
      deviceScaleFactor: 1,
      viewport: { height: 1000, width: 1440 },
    });
    await context.addInitScript(
      (theme) => window.localStorage.setItem('theme', theme),
      scheme
    );

    const page = await context.newPage();
    page.setDefaultTimeout(60_000);

    for (const { example, route } of captures) {
      try {
        // biome-ignore lint/performance/noAwaitInLoops: one page navigates at a time, keeping captures ordered and memory-bounded
        await page.goto(`${server.baseUrl}${route}`, { waitUntil: 'load' });
        await page.waitForFunction(
          (dark) =>
            document.documentElement.classList.contains('dark') === dark,
          scheme === 'dark'
        );
        await page.evaluate(() => document.fonts.ready.then(() => undefined));

        const preview = page.locator(captureSelector(example));
        await preview.waitFor({ state: 'visible' });
        await preview.screenshot({
          animations: 'disabled',
          path: join(outputDir, scheme, `${example}.png`),
        });
      } catch (error) {
        failures.push(
          `${scheme}/${example}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }

    await context.close();
  };

  try {
    await Promise.all(CAPTURE_SCHEMES.map((scheme) => captureScheme(scheme)));
  } finally {
    await browser.close();
    server.stop();
  }

  if (failures.length > 0) {
    console.error(`${failures.length} of ${expected} captures failed:`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`${expected} captures written to ${CAPTURE_DIR}/`);
};

await main();
