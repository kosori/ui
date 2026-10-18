# Base colors

An in-repo copy of shadcn's base-colour data, so the Token values an install
writes come from here rather than from the data shadcn's host returns. The CLI
still fetches that data from the host, so this removes the dependency on the
values, not on the host.

Each file is the `cssVarsV4` block of `https://ui.shadcn.com/r/colors/<name>.json`
verbatim: the light and dark Token values for one Base color, in oklch. The seven
files are every Base color the shadcn CLI offers for Tailwind v4
(`@shadcn/registry` `BASE_COLORS`); `gray` is excluded because shadcn still serves
it only in the v1/v3 HSL shape.

Refresh by fetching the block again and re-running the copy; do not hand-edit.
