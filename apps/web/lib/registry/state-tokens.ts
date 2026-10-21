import { BASE_COLORS, DEFAULT_BASE_COLOR } from '../../registry/base-colors';
import { STATE_TOKEN_NAMES, type StateTokenName } from '../../registry/preset';

/** The utility prefixes that can reference a colour Token in a class string. */
const COLOUR_UTILITY_PREFIXES = [
  'text',
  'bg',
  'border',
  'ring',
  'ring-offset',
  'outline',
  'fill',
  'stroke',
  'from',
  'via',
  'to',
  'divide',
  'shadow',
  'accent',
  'caret',
  'decoration',
  'placeholder',
];

/** Whether a source references a state Token through a colour utility. */
const referencesToken = (source: string, token: string) =>
  new RegExp(
    `(?:^|[\\s:'"\\[()])(?:${COLOUR_UTILITY_PREFIXES.join('|')})-${token}(?![\\w-])`
  ).test(source);

/** The state Tokens a component source references, in preset order. */
export const referencedStateTokens = (source: string): StateTokenName[] =>
  STATE_TOKEN_NAMES.filter((token) => referencesToken(source, token));

/**
 * The per-item Token declarations an install needs when its source references
 * state Tokens without installing the preset. Values come from the neutral Base
 * color because state colour is identical in every palette.
 */
export const stateTokenCssVars = (tokens: readonly StateTokenName[]) => {
  const base = BASE_COLORS[DEFAULT_BASE_COLOR];

  return Object.fromEntries([
    [
      'light',
      Object.fromEntries(tokens.map((token) => [token, base.light[token]])),
    ],
    [
      'dark',
      Object.fromEntries(tokens.map((token) => [token, base.dark[token]])),
    ],
    [
      'theme',
      Object.fromEntries(
        tokens.map((token) => [`--color-${token}`, `var(--${token})`])
      ),
    ],
  ]);
};

/** The `cssVars` a Registry item derives from its own source, if any. */
export const stateCssVarsForSource = (source: string) => {
  const tokens = referencedStateTokens(source);

  return tokens.length > 0 ? stateTokenCssVars(tokens) : undefined;
};
