# A Style varies Tokens and class strings, never markup

`kaze` was forked from `zen` before either was large enough to make copying cheap, so the second Style is a measurement rather than a guess. It changes radius, density and border/focus treatment, and nothing else. Diffing the two catalogues is what this decision rests on.

## Measured variance

| Surface | Total | Differs | Invariant |
| --- | --- | --- | --- |
| Registry items | 12 | 0 | 12 |
| Components | 6 | 4 | 2 |
| Examples | 6 | 0 | 6 |
| Registry source files | 12 | 4 | 8 |
| Documentation pages | 9 | 5 | 4 |
| Markup | — | 0 | — |

The differences are one Token and 23 class strings. `--radius` moves from `0.625rem` to `1rem` in both colour schemes; the `@theme inline` scale derives every other radius from it. The 23 class strings live in Button (10), Field (8), Dialog (4) and Input (1), and cover control height, padding, focus-ring width and opacity, and border opacity. Label and Separator are byte-identical. All six Examples are byte-identical; only the components they compose differ. No component changed its markup.

A Style today costs 23 files: 13 registry files (one catalogue and twelve sources) and 10 documentation files (nine pages and `meta.json`). Twelve are byte-identical copies, seven differ only by the Style's name or file path (the catalogue and six documentation files), and four carry the entire design difference. A non-default Style additionally needs six documentation preview modules, because the shipped Examples are identical but the docs app binds one component alias to one Style.

## What this implies

The fork is 4 files and 1 Token pretending to be 23 files. A mechanism that replaces it is therefore not a source generator: it is a shared catalogue whose components read density, focus and radius parameters, plus a per-Style Token block. That mechanism cannot be built from today's evidence alone, because the class-string deltas are not derived from Tokens — height, padding and ring width are literals. They must first become Tokens or `cva` axes, or the "mechanism" would encode per-Style class overrides and be the fork with fewer files.

## Decision

Keep `kaze` as a fork and publish it behind the same parity rule as `zen`: a Style is installable only when it serves every item another published Style serves. Defer the parameterised mechanism.

Triggers for building it, whichever comes first:

- a third Style;
- the catalogue doubling to twelve components (24 items);
- any Style needing different markup rather than different classes, which the parameterised mechanism cannot express and which reopens this decision.

## Considered options

Building the parameterised mechanism now. Rejected: two Styles and six components are not enough to fix the axes, and a mechanism built now would encode guesses about density and focus that the next Style would contradict.

Keeping the fork permanently. Rejected: 12 byte-identical files and six preview modules per Style grow linearly, and the third Style would triple a cost that buys nothing.

## Consequences

- Every new component lands in every published Style. The Registry build fails on a missing item rather than letting a Style become silently half-installable.
- A Style's design difference is reviewable as four files, not as a whole catalogue; everything else in a Style diff is noise that the mechanism will delete.
- Documentation previews resolve per Style even when Examples are identical. That is a limitation of binding one component alias in the docs app, not Style variance.
- This ADR is the input to the mechanism's design; the trigger above is when that design starts.
