# kosori distributes through shadcn's registry format, not a bespoke one

The previous kosori shipped a hand-rolled registry (`public/components/index.json`) with its own generator and its own `init`/`add` CLI. kosori adopts shadcn's registry schema verbatim instead: a style is a directory of items at `/r/<style>/<name>.json`, addressed through one `@kosori` namespace whose URL contains a `{style}` placeholder; each style is a single `registry:base` item carrying `config`, `"extends": "none"`, its token block and fully namespaced dependencies; the token block is produced by a dynamic preset route keyed by base colour. The guarantee this buys is that `npx shadcn add @kosori/button` keeps working for someone who has never installed anything of ours — including after we ship our own CLI, so the CLI is a convenience layer and never a requirement.

## Considered options

Reviving the bespoke registry and CLI, or writing a superset of shadcn's schema. Rejected: both discard third-party interop, which is the entire value of a registry, and both re-create tooling that upstream maintains.

## Consequences

- Bare item names resolve to shadcn's own host and 404 under our style, so every dependency a kosori item declares must be vendored under `@kosori/` — including `utils`.
- `apps/web` owns registry source, docs content and built output together; `public/r` is derived, gitignored, and validated on build.
- Item types are added as the library needs them. Only `registry:base`, `registry:ui`, `registry:lib` and `registry:example` exist at the start.
