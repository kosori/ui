# Base UI is the only primitive library

shadcn v4 ships three primitives — Radix, Base UI and React Aria — as a fourth dimension of every style name (`base-nova`, `radix-vega`, …). kosori builds on Base UI and will never offer a choice, so a style is named for its design alone (`zen`) and the registry has no base dimension. A dimension with exactly one value would multiply every registry path, every docs route and every style name for nothing, and a second base introduced later is a mechanical rename rather than a redesign. The docs site's own chrome is Base UI too: `fumadocs-ui` is aliased to `@fumadocs/base-ui`, or the lockfile quietly contradicts this.

## Considered options

Naming styles `<base>-<design>` so a second base could be added without renaming. Rejected: it pays for a dimension we do not have and makes every artifact carry a constant word.
