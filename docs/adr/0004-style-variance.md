# A Style varies Tokens and class strings, never markup

`kaze` was forked from `zen` before either was large enough for copying to be
expensive to measure. It changes radius, density and border/focus treatment, and
nothing else. Diffing the two catalogues is what this decision rests on.

## Measured variance

| Surface | Total | Differs | Invariant |
| --- | --- | --- | --- |
| Registry items | 12 | 0 | 12 |
| Components | 6 | 6 | 0 |
| Examples | 6 | 0 | 6 |
| Registry source files | 12 | 6 | 6 |
| Documentation pages | 9 | 5 | 4 |
| Markup | — | 0 | — |

The differences are one Token and 25 class strings. `--radius` moves from
`0.625rem` to `1rem` in both colour schemes; the `@theme inline` scale derives
every other radius from it. The 25 class strings live in Button (10), Field (8),
Dialog (4), Input (1), Label (1) and Separator (1), and cover control height,
padding, focus-ring width and opacity, border opacity and density. All six
Examples are byte-identical; only the components they compose differ. No
component changed its markup.

## Measured costs

A non-default Style costs 29 files; the default Style costs the first 23. The
extra six are documentation preview modules. Ten files are byte-identical, 13
differ only by the Style's name, path or import (the catalogue, six
documentation files and six preview modules), and six component sources carry
the entire design difference.

Two preview-only limitations are part of that cost:

- A non-default Style's preview of a component that pulls another item renders
  the default Style's dependency. `kaze`'s Dialog source imports
  `@/components/ui/button`, and the docs app binds that alias to `registry/zen/*`,
  so the `kaze` Dialog preview shows `zen`'s Button. Installation is correct:
  `registryDependencies` resolves the same item to the Consumer's own Style.
  Only the preview is wrong.
- A portal escapes the preview's inline radius Token block. The `kaze` Dialog
  preview portals to `body`, outside the container that carries the override, so
  it renders at `zen`'s radius.

Known debt, not guarded today:

- The six preview modules are hand copies of the shipped Examples with one
  rewritten import. Nothing compares them. Guarding that needs the deferred
  mechanism.
- Documentation prose can be edited in one Style only. The same deferred
  mechanism is the guard.

## Decision

Keep `kaze` as a fork and publish it behind the same parity rule as `zen`: a
Style is installable only when it serves every item another published Style
serves, and every preset has a registry directory and a documentation
directory. Defer the parameterised mechanism.

Triggers for building it, whichever comes first:

- a third Style;
- the catalogue doubling to twelve components (24 items);
- any Style needing different markup rather than different classes, which the
  parameterised mechanism cannot express and which reopens this decision;
- a preview that must show a non-default Style's own dependency or portal
  content, which the single docs-app alias and the inline Token block cannot
  express.

## Consequences

- Every new component lands in every published Style. The Registry build fails on
  a missing item or a Style directory without a preset rather than letting a
  Style become silently half-installable.
- A Style's design difference is reviewable as six files, not as a whole
  catalogue; everything else in a Style diff is noise that the mechanism will
  delete.
- Documentation previews resolve per Style even when Examples are identical.
  That is a limitation of binding one component alias in the docs app, not Style
  variance.
- This ADR is the input to the mechanism's design; the trigger above is when
  that design starts.
