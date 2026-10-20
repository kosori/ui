# `zen` mirrors shadcn/ui's render plumbing, and coss supplies the styling

ADR-0005 made coss/ui the single design source for `zen`: a Port copies coss
markup, composition, variants and class strings, then changes only imports,
registry dependencies and item names. That kept each Port reviewable as a diff
against coss. Porting the full catalog exposed a cost that the first six
components did not: coss's own render plumbing is not shadcn/ui's.

`zen` serves shadcn/ui item names so a Consumer project's existing shadcn
knowledge, documentation and examples transfer. Those examples pass `render` the
way shadcn/ui documents it. coss instead declares `render` in component types
where shadcn only inherits it from Base UI, wraps plain elements in `useRender`,
and composes internal controls with `render={<Button />}`. Keeping coss's
structure would make `zen`'s public render surface diverge from the examples it
exists to serve.

## Decision

A Port copies coss's class strings, variants and exports, but mirrors shadcn/ui's
render and prop-forwarding structure:

- A Base UI wrapper spreads its primitive's props and inherits `render` from
  `Primitive.Props`. It does not declare `render` itself.
- A non-primitive that shadcn/ui gives `useRender` — currently `badge` and
  `breadcrumb` — keeps `useRender` with `mergeProps`.
- A component that shadcn/ui renders as a plain element accepts plain element
  props and does not accept `render`.
- Internal composition that coss writes as `render={<Button />}` uses shadcn/ui's
  composition instead, with coss's class strings carried onto the matching
  elements.

The visual result stays coss. `VERSION.md` pins the coss bytes that supply the
styling; the local source is not a diffable copy of them.

## Consequences

- A structural divergence from coss is expected and correct. Reviewing a Port
  against coss shows renamed imports, the shadcn render structure and unchanged
  class strings; markup may differ where shadcn's composition requires it.
- `render` disappears wherever coss exposed it and shadcn/ui does not. A
  compile-time fixture records the accepted and rejected cases, so the surface
  cannot drift silently.
- Examples keep using `render` the way shadcn/ui's Examples do, including on
  components that no longer declare it in their own types.
- Re-syncing from coss now requires separating styling changes from structural
  changes. The upstream hash proves which styling revision a Port used, not that
  the local file matches it byte for byte.
- This supersedes ADR-0005's "Divergence" consequence that a Port differs only
  through Tokens. Its naming, semantic Tokens and Internal items decisions stand.
