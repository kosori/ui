# @kosori/web

Next.js app for UI.

## Getting Started

Run the development server from the repo root:

```sh
turbo dev --filter=@kosori/web
```

Or from this directory:

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## UI

Every published Style (`zen`, `kaze`) ships as a shadcn Registry. Registry source
lives in `registry/<style>` and is built into `public/r/<style>` with:

```sh
bun run registry:build
```

The build first enforces parity: every complete Style must serve every item
another complete Style serves, and two Styles that serve an item under the same
name must agree on its type. An Incomplete Style may serve a subset.

Components arrive as editable source at a Consumer project's own aliases:

```sh
bunx --bun shadcn@latest add @kosori/button
```

Inside this app the consumer's `@/components/ui/*` alias resolves to
`registry/zen/ui/*` (see `tsconfig.json`), so zen documentation renders the same
file an install writes. Previews for another Style bind the same Example markup
to that Style's components under `lib/registry/previews`.

Icons come from [`@tabler/icons-react`](https://tabler.io/icons) (`iconLibrary: "tabler"` in `components.json`).

Theming tokens live in `app/globals.css`.

## Visual proof

Capture every zen Example in light and dark from the documentation pages it is
rendered on:

```sh
bun run visual:capture
```

The command starts the docs app on port `3210` unless `VISUAL_BASE_URL` points
at one already running, then writes one PNG per Example per scheme to
`.visual-proof/<scheme>/<example>.png` — 49 Examples, 98 captures today. Set
`VISUAL_PORT` to move the dev server.

A capture fails the command only when a page or its preview cannot be
screenshotted. Nothing compares pixels, so font anti-aliasing cannot fail the
run. The `Visual proof` GitHub Actions workflow uploads the PNGs as the
`visual-proof` artifact on every pull request and is marked
`continue-on-error`, so a visual difference never blocks a merge.

## Fonts

Fonts are loaded with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) from local Geist files in `app/fonts`.
