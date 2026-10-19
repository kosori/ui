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

Inside this app the consumer's `@/components/ui/*` alias resolves to `registry/zen/*`
(see `tsconfig.json`), so zen documentation renders the same file an install
writes. Previews for another Style bind the same Example markup to that Style's
components under `lib/registry/previews`.

Icons come from [`@tabler/icons-react`](https://tabler.io/icons) (`iconLibrary: "tabler"` in `components.json`).

Theming tokens live in `app/globals.css`.

## Fonts

Fonts are loaded with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) from local Geist files in `app/fonts`.
