# An Authored component serves a shadcn/ui name coss/ui does not ship

ADR-0005 makes coss/ui the single design source for `zen`. A Port copies coss
markup, composition, variants and class strings, and `VERSION.md` pins the bytes
it copied. Nothing in that rule anticipates a name coss does not publish.

Of shadcn/ui's 65 installable names, `zen` serves 49 and holds 15 as Pending.
None of those 15 exists in coss's registry, and neither does `sonner`, the
sixteenth gap. Pending means "part of the catalog scope that a Style does not yet
serve", so under the current rule those names can never arrive. Leaving them
Pending forever makes the compatibility promise false for a quarter of the
upstream catalog, and building them as Ports is impossible because there is no
upstream file to copy.

The gaps are also not the hard ones. Seven are the AI/chat family, which coss
ships under its own names and should be ported rather than invented. The rest —
`carousel`, `resizable`, `navigation-menu`, `menubar`, `native-select`, `item`,
`marker`, `chart` — are ordinary UI whose shadcn/ui Structure is stable and whose
Design kosori already has in neighbouring components.

## Decision

A name shadcn/ui publishes but coss/ui does not ship may be served as an
**Authored component**.

- **Structure is shadcn/ui's**, as for a Port: export names, prop names, render
  plumbing, `data-slot` values and the base-nova composition.
- **Design is inherited, not invented.** An Authored component reuses the
  Tokens, class vocabulary and composition of the nearest Port: `native-select`
  from `select`, `item` from `field`, `navigation-menu` from `dropdown-menu`.
  It introduces no new Token, no new type scale, no new spacing value and no new
  interaction pattern. If no Port covers the pattern, the design decision is a
  separate ADR, not an implementation detail.
- **It carries no coss pin.** `VERSION.md` gains no row, the pin test exempts it,
  and the Compatibility page lists it as Authored rather than as a Port.
- **It ships the full corpus rule**: source, catalog entry, Example, page and a
  visual capture, like every other served name.
- **It is replaced when coss catches up.** If coss later publishes the name, the
  Authored component becomes a Port at the next re-sync. Any class change that
  follows is released as a breaking note, because a Consumer has already copied
  the source.

`aspect-ratio` and `direction` predate this ADR and are retroactively the first
Authored components: they were built to fill the same gap without a name for it.

Coss-only components remain out of scope. This ADR adds no reason to invent a
name shadcn/ui does not publish; ADR-0005's naming rule still decides what the
catalog serves.

## Considered options

- **Leave the names Pending indefinitely.** Honest about intent but wrong about
  outcome: Pending promises a Port that cannot exist, and a Consumer reading the
  status page cannot tell the difference between "not yet" and "never".
- **Port shadcn/ui's own classes for these components.** That imports a second
  design language under coss's name and makes every future Port review a
  three-way comparison. ADR-0005 rejected exactly this when it chose one lineage.
- **Ship coss-only components to raise the count.** It adds surface without
  serving a single shadcn/ui name, so a Consumer's snippets still fail.
- **Copy from another registry.** There is no second registry whose Design is
  coss's, which is the only thing a Port is allowed to copy.

## Consequences

- The catalog can reach every classic shadcn/ui name without inventing a second
  design lineage. The AI/chat family stays out until coss's version is ported.
- Review splits in two. A Port is reviewed as a diff against pinned bytes; an
  Authored component has no diff, so review rests on the nearest-Port rule, the
  Example allowlist and the visual capture. That is weaker evidence than a hash,
  and it should be treated as such.
- Design drift is the real risk. "Reuse the nearest Port" is a constraint a
  reviewer can check but a test cannot. The Compatibility page and the visual
  harness are the only guards, so an Authored component without an Example is
  not ready to ship.
- The Compatibility page must distinguish Authored from Pending. A reader should
  never infer that an Authored component will one day be replaced by a coss Port
  without also reading this decision.
- `VERSION.md` stops being a complete inventory of the catalog. It remains a
  complete inventory of what was copied, which is what its hashes can prove.
