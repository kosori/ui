# Base colors

An in-repo copy of shadcn's base-colour data, so that an install takes no runtime
dependency on shadcn's host.

Each file is the `cssVarsV4` block of `https://ui.shadcn.com/r/colors/<name>.json`
verbatim: the light and dark Token values for one Base color, in oklch. The seven
files are every Base color the shadcn CLI offers for Tailwind v4
(`@shadcn/registry` `BASE_COLORS`); `gray` is excluded because shadcn still serves
it only in the v1/v3 HSL shape.

Refresh by fetching the block again and re-running the copy; do not hand-edit.
