# An Incomplete Style may serve a subset of the catalog

ADR-0004 made parity a condition of publication: a Style is installable only when
it serves every item another published Style serves. That rule was written when
`zen` and `kaze` were both six components and copying was cheap. Porting `zen`
from coss changes the arithmetic: the catalog grows to 47 items while `kaze`
stays at six. Under the old rule, adding one component to `zen` forces a
duplicate into `kaze` or blocks the build. Neither is acceptable: `kaze` is
frozen, not being completed, and `zen` must be allowed to grow.

## Decision

A Style declares `incomplete` in its definition when it deliberately serves a
subset of the catalog. `kaze` declares it.

Registry parity then enforces full coverage only for complete Styles: a complete
Style must serve every item another complete Style serves, and an Incomplete
Style may omit any of them. Type agreement is unchanged: wherever two Styles
serve the same item name, the Registry type must match, because both names
resolve through one Namespace and a Consumer project's choice of Style must not
silently change what `@kosori/<name>` installs.

The documentation renders an incomplete-Style banner on every page of that
Style. The declaration is explicit so that publishing a partial Style is a
deliberate act rather than silent drift.

## Consequences

- `zen` can grow without touching `kaze`; duplicating six components is no longer
  the price of adding one.
- A Consumer project on `kaze` installs a documented subset and is told so on
  every page.
- Coverage still fails between complete Styles, and a type disagreement still
  fails between any two Styles, so the Namespace keeps one meaning per name.
- Marking a Style complete remains a deliberate review event; removing the
  declaration opts the Style back into full coverage.
- This supersedes the parity rule in ADR-0004. Its measurements and its decision
  to keep `kaze` as a fork stand.
