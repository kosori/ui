# coss/ui is `zen`'s design source, and shadcn/ui owns the names

`zen` was hand-authored as a `base-nova` port. coss/ui is now its design source: a Port copies coss markup, composition, variants and class strings verbatim, then changes only imports, registry dependencies and item names. The library ends with one lineage to review against and one upstream to re-sync from, instead of two approximations of the same components. coss builds on Base UI, so ADR-0001's single-Base rule still holds.

## Naming

shadcn/ui owns item names. A Consumer project's existing shadcn knowledge, documentation and examples transfer only if `@kosori/zen` serves the names they already know, so four coss names are renamed: `menu` becomes `dropdown-menu`, `preview-card` becomes `hover-card`, `otp-field` becomes `input-otp` and `group` becomes `button-group`. `fieldset` folds into `field`, `sonner` is not shipped, and `sidebar` ships even though coss publishes it without a documentation page. coss-only components with no shadcn/ui name are not Ports.

## Divergence

A Port diverges from upstream through Tokens alone. Class strings are not retuned for `zen`'s taste: the diff against coss must show a rename or an import, never a redesign. This keeps each Port reviewable against the file it came from and leaves motion as a later diff against a verified baseline rather than a second redesign.

> **Superseded in part by [ADR-0007](0007-render-plumbing.md).** A Port now also mirrors shadcn/ui's render and prop-forwarding structure. coss still supplies the class strings, but markup may differ where shadcn's composition requires it; the diff against coss is no longer limited to renames and imports.

## Semantic Tokens

coss's `alert`, `badge` and `toast` variants use state colours it names `success`, `warning` and `info`, derived from emerald, amber and blue. kosori's Token contract did not define them, and its seven Base colors cannot inherit a single theme's values. kosori therefore adds seven Tokens — `success`, `success-foreground`, `warning`, `warning-foreground`, `info`, `info-foreground` and `destructive-foreground` — to the preset with identical values across every Base color. The variant API stays identical to coss's; state colour is a kosori addition, not an upstream one.

`destructive-foreground` completes the state set. coss's Badge, `destructive-outline` Button, Field error, destructive menu item and Drawer classes already reference it, so deriving it from the red palette (`700` light, `400` dark) keeps those class strings byte-verbatim instead of retuning them to the interface foreground.

## Token sources and the theme bridge

A Base color definition is the only place a Token value lives. One composer derives everything downstream:

- the light and dark declarations an install writes;
- the `@theme` colour mappings that make utilities such as `bg-success` and `text-destructive-foreground` compile;
- the committed documentation stylesheet, generated from the neutral Base color;
- the per-item declarations that let a Consumer install one component whose source references a state Token without installing the preset.

Fonts and the radius scale stay explicit, non-derived inputs. A colour mapping is derived for every other Token so a declaration cannot exist without its utility. Registry items declare the state Tokens their own source references; an install is additive to the preset, never a replacement for it. Tests exercise the composition seam and fail when a source references an undeclared state Token or the documentation stylesheet drifts from the composer.

## Design and Structure

A Port takes Design from coss/ui and Structure from shadcn/ui. Design — class strings, default variant values, dividers, spacing, composition — is never retuned. Structure — export names, prop names and render plumbing — never omits an export shadcn/ui publishes. [ADR-0007](0007-render-plumbing.md) supersedes this ADR's earlier clause that a Port differs from coss only through Tokens; the naming, semantic Tokens and Internal items decisions here still stand.

## Considered options

Keeping the hand-authored `base-nova` sources as the lineage, and redesigning each component in kosori's own style. Rejected: the first leaves two approximations of coss that nobody can diff, and the second makes every Port unreviewable against the upstream the install suite is meant to prove.

## Internal items

Three coss items exist only to satisfy another Port's dependencies: `autocomplete` (`registry:ui`, required by `command`), `segmented-control` (`registry:lib`, required by `tabs`) and `use-media-query` (`registry:hook`, required by `sidebar`). They are installable dependencies of a Style, never documented, never Pending, and exempt from the Example/page/menu rule. They are the exception to the documented corpus.

## Consequences

- `VERSION.md` pins the upstream bytes of every Port; no coss snapshot is vendored.
- The documented corpus is the 47 coss `registry:ui` items that have a shadcn/ui name. coss-only components, the chat family and `sonner` stay out. The three Internal items above are installable dependencies outside that corpus.
- Motion is out of scope for every Port and lands later as its own diff.
