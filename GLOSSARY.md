# kosori

An open-source, copy-paste React component library built on Base UI. Consumers install components through a registry, receive the source, and own it from then on. The library is documented and distributed from one Next.js app.

## Language

**kosori**:
The component library this repository builds and distributes. A consumer project adopts kosori components by copying their source in, not by depending on a package.
_Avoid_: UI kit, design system, framework

**Consumer project**:
A project that installs kosori content and then owns the copied source; it takes no runtime dependency on this repository.
_Avoid_: User, app, downstream

**Registry**:
A code-distribution endpoint: a catalog plus one document per item, fetchable by any registry client.
_Avoid_: Library, store, marketplace, CDN

**Registry item**:
One addressable unit a registry serves — a component, block, hook, style, theme, or font — carrying its own files and the metadata needed to install them.
_Avoid_: Package, module, asset

**Namespace**:
A short handle (`@kosori`) that a consumer maps to a registry URL template, letting items be addressed as `@kosori/button` instead of by URL.
_Avoid_: Scope, alias, channel

**Style**:
A presentation of the library: the component source plus the default token values that source assumes. A consumer settles on one Style per project.
_Avoid_: Preset, variant, skin, theme, flavor

**Incomplete Style**:
A Style that declares in its definition that it serves only part of the catalog. It may omit items another Style serves, but any item it does serve keeps the same Registry type as everywhere else.
_Avoid_: Partial style, beta style, unfinished style

**Base**:
The primitive library kosori's components wrap. kosori has exactly one, Base UI; a project has no way to pick a different one.
_Avoid_: Headless library, primitives, foundation

**Base color**:
The named palette (`neutral`, `zinc`, …) that supplies the value of every colour token. It is independent of Style, and a Style only proposes a default.
_Avoid_: Palette, accent, brand colour

**Token**:
A named CSS custom property whose value varies without touching component source.
_Avoid_: CSS variable, custom property, design token

**Example**:
A demonstration of a Component in use, distributed as a registry item so that documentation and installation resolve it by the same name and the same path.
_Avoid_: Demo, preview, story, sample, playground

**Port**:
A component taken from an upstream registry into a Style, copied verbatim except for the renames an install requires: imports, registry dependencies and item names. A Port diverges from its upstream through Tokens alone.
_Avoid_: Fork, rewrite, adaptation

**Pending**:
A name a Style publishes as part of its catalog scope but does not yet serve. Pending names appear in documentation without a page and never appear in the registry catalog.
_Avoid_: Missing, TODO, unimplemented
