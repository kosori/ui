# A coss-only component keeps coss's name and borrows the nearest shadcn/ui Structure

ADR-0005 makes shadcn/ui the owner of item names and says that coss-only
components with no shadcn/ui name are not Ports. ADR-0008 then served the
opposite gap: names shadcn/ui publishes that coss does not ship. Both decisions
leave a third case unaddressed, a component coss publishes under a name
shadcn/ui never shipped.

Four of these are ordinary UI rather than the AI/chat family: `checkbox-group`,
`meter`, `toolbar` and `number-field` wrap stable Base UI primitives, carry
coss's full Design, and appear in coss's own documentation. They cannot enter
the catalog today for a naming reason alone, and a Consumer coming from coss
loses surface that has nothing to do with shadcn/ui parity. The chat family is
a different problem — coss ships it under names shadcn/ui does publish — and
stays out of this decision.

## Decision

A component coss/ui publishes and shadcn/ui does not may be served as a
**Coss-only component**.

- **The name is coss's**, in kebab-case, exactly as coss publishes it. If that
  name ever collides with a served name, it is renamed and both names are
  recorded, as `group` → `button-group` already does.
- **Design is coss's, verbatim.** Class strings, variants, composition and
  icon choices are copied, with only the import, registry dependency and icon
  changes a Port already allows. Nothing is retuned for `zen`'s taste.
- **Structure is inferred from the nearest shadcn/ui family**, and the mapping
  is recorded so it can be reviewed: `checkbox-group` from `radio-group`,
  `meter` from `progress`, `toolbar` from `button-group` and `toggle-group`,
  `number-field` from `input-group`. ADR-0007's render rules still apply: a
  primitive wrapper inherits `render` and never declares it, a plain element
  accepts no `render`, and `asChild` does not exist. Every part carries
  `data-slot` in kebab-case.
- **It is a Port, not an Authored component.** Its bytes are pinned in
  `VERSION.md`, and it does not set `meta.authored`. Design has an upstream; the
  pin proves it.
- **The Compatibility page lists it as Coss-only**, so a reader knows that no
  shadcn/ui snippet resolves the name and that it is additive surface.
- **The scope is narrow by construction.** An item qualifies only when coss
  publishes it, shadcn/ui does not, and its Base UI primitive is stable enough
  to wrap without inventing interaction. `fonts` is not a component;
  `composer`, `chat` and `frame` are deferred because their shadcn/ui
  counterparts are Pending, and shipping a coss name beside a Pending shadcn
  name would make two names for one pattern.

## Considered options

- **Leave the names out.** This is the status quo, and it is the safest
  reading of ADR-0005. It also hides working coss surface behind a name
  argument: the component exists, is documented upstream, and costs one item to
  serve. The exclusion in ADR-0005 was written before the catalog reached
  parity, not because the Design is unproven.
- **Rename to a shadcn-style name shadcn never published.** There is no
  upstream to audit the new name against, so the catalog would carry an
  invented name with no way to tell a considered choice from a typo.
- **Fold the component into its nearest shadcn/ui name as extra exports.**
  `meter` as extra `Progress` parts, or `number-field` inside `input-group`,
  keeps the shadcn/ui count intact but makes two components share one item and
  one install. A Consumer could no longer install one without the other.
- **Ship them as Internal items.** Internal items exist only to satisfy another
  component's dependency. These are user-facing components with Examples and
  pages, so the exception does not apply.

## Consequences

- **The served count and shadcn/ui coverage stop being the same number.** The
  status page must report both, or a reader will infer parity from the total.
- **Review is weaker than for a Port.** A Port is diffed against pinned bytes;
  a Coss-only component has a pin but no shadcn/ui source to compare Structure
  against. The nearest-family rule, the Example allowlist and the visual
  capture are the guards.
- **The name is permanent once shipped.** coss can rename or restructure the
  item, and the next re-sync re-pins the bytes; a rename is a breaking note for
  a Consumer who already copied the source.
- **The Pending list does not change.** These names were never Pending, and a
  Pending shadcn/ui name still promises a Port that cannot exist until coss
  ships it.
- **A later coss release may publish a shadcn/ui name for the same pattern.**
  That is a rename decision of its own, not an automatic substitution, because
  the installed exports and slots would move under a Consumer.

## Supersedes

This ADR supersedes the clause in
[ADR-0005](0005-coss-upstream.md) that says "coss-only components with no
shadcn/ui name are not Ports", and the closing paragraph of
[ADR-0008](0008-authored-components.md) that keeps coss-only components out of
scope. Both rules still decide every other case. Nothing here changes the
pending or authored rules, the token contract, or the install surface.
