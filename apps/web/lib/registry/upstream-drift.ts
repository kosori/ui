export type Pin = {
  coss: string;
  kosori: string;
  sha256: string;
};

export type DriftReport = {
  changed: Pin[];
  newItems: string[];
  removed: Pin[];
  unreachable: string[];
};

export type DriftInput = {
  pins: Pin[];
  upstreamUiNames: string[];
  /** Every item name in the upstream index; defaults to the UI names. */
  upstreamNames?: string[];
  currentHashes: Map<string, string>;
  unreachable: string[];
};

const PIN_ROW = /^\|([^|]+)\|([^|]+)\|([^|]+)\|$/;
const KOSORI_NAME = /^[a-z][a-z-]*$/;
const COSS_NAME = /^([a-z][a-z0-9-]*)/;
const SHA256 = /^[0-9a-f]{64}$/;

/** Read the pin table's entry rows, ignoring the revision table and headers. */
export const parsePinRows = (versionSource: string): Pin[] =>
  versionSource.split('\n').flatMap((line) => {
    const cells = PIN_ROW.exec(line.trim())
      ?.slice(1)
      .map((cell) => cell.trim());
    const coss = COSS_NAME.exec(cells?.[1] ?? '')?.[1];

    if (
      cells?.length !== 3 ||
      !KOSORI_NAME.test(cells[0] ?? '') ||
      !coss ||
      !SHA256.test(cells[2] ?? '')
    ) {
      return [];
    }

    return [{ coss, kosori: cells[0] ?? '', sha256: cells[2] ?? '' }];
  });

/** Split a pin comparison into actionable, informational and failed fetches. */
export const classifyDrift = (input: DriftInput): DriftReport => {
  const unreachable = new Set(input.unreachable);
  const indexNames = new Set(input.upstreamNames ?? input.upstreamUiNames);
  const uiNames = new Set(input.upstreamUiNames);
  const pinnedCoss = new Set(input.pins.map((pin) => pin.coss));

  return {
    changed: input.pins.filter((pin) => {
      if (unreachable.has(pin.coss)) {
        return false;
      }

      const current = input.currentHashes.get(pin.coss);

      return current !== undefined && current !== pin.sha256;
    }),
    newItems: [...uiNames].filter((name) => !pinnedCoss.has(name)).sort(),
    removed: input.pins.filter((pin) => !indexNames.has(pin.coss)),
    unreachable: [...input.unreachable],
  };
};

const countsLine = (report: DriftReport) =>
  `**${report.changed.length} changed · ${report.newItems.length} new upstream · ${report.removed.length} removed · ${report.unreachable.length} unreachable**`;

const changedSection = (report: DriftReport) => {
  if (report.changed.length === 0) {
    return [];
  }

  return [
    '## Actionable: pinned bytes changed',
    '',
    '| kosori | coss | pinned sha256 |',
    '| --- | --- | --- |',
    ...report.changed.map(
      (pin) => `| ${pin.kosori} | ${pin.coss} | \`${pin.sha256}\` |`
    ),
  ];
};

const removedSection = (report: DriftReport) => {
  if (report.removed.length === 0) {
    return [];
  }

  return [
    '## Removed upstream',
    '',
    ...report.removed.map(
      (pin) =>
        `- \`${pin.kosori}\` (coss \`${pin.coss}\`, pinned \`${pin.sha256}\`)`
    ),
  ];
};

const newItemsSection = (report: DriftReport) => {
  if (report.newItems.length === 0) {
    return [];
  }

  return [
    '## Informational: upstream catalog grew',
    '',
    ...report.newItems.map((name) => `- \`${name}\``),
  ];
};

const unreachableSection = (report: DriftReport) => {
  if (report.unreachable.length === 0) {
    return [];
  }

  return [
    '## Unreachable',
    '',
    'These items could not be fetched, so their bytes were not compared:',
    '',
    ...report.unreachable.map((name) => `- \`${name}\``),
  ];
};

/** Render a drift report as GitHub-flavoured markdown. */
export const renderReport = (report: DriftReport): string => {
  const sections = [
    changedSection(report),
    removedSection(report),
    newItemsSection(report),
    unreachableSection(report),
  ].filter((section) => section.length > 0);

  if (sections.length === 0) {
    return `${countsLine(report)}\n\nNo upstream drift: every pinned item still matches upstream.`;
  }

  return `${countsLine(report)}\n\n${sections.map((section) => section.join('\n')).join('\n\n')}`;
};
