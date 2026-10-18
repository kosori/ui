import mauve from './mauve.json';
import mist from './mist.json';
import neutral from './neutral.json';
import olive from './olive.json';
import stone from './stone.json';
import taupe from './taupe.json';
import zinc from './zinc.json';

/** The Base colors the Registry serves, as shadcn's Tailwind v4 Token blocks. */
export const BASE_COLORS = {
  mauve,
  mist,
  neutral,
  olive,
  stone,
  taupe,
  zinc,
};

export type BaseColor = keyof typeof BASE_COLORS;

/** The Base color a Style proposes when a Consumer project takes the default. */
export const DEFAULT_BASE_COLOR: BaseColor = 'neutral';

/** Narrow an arbitrary path segment to a Base color the Registry serves. */
export const isBaseColor = (value: string): value is BaseColor =>
  Object.hasOwn(BASE_COLORS, value);
