# Blocks

A Block is a composed section of a page: the markup a Consumer copies in when
they want a finished layout, not a single component. It ships as a
`registry:block` item and declares the `ui` items it composes through
`registryDependencies`, rather than importing another Style's source.

The `registry:block` items this directory will hold follow the same layout as
every other item type:

```
registry/zen/blocks/<block>/
  <block>.tsx
  ...
```

A Block is multiple files. Its `files[]` list every file it ships, each typed
`registry:block`, and the entry point imports its siblings from the same
directory. It is the only item type that groups files: `ui/`, `examples/`,
`lib/` and `hooks/` stay one item per file.

A Block is not an Example. An Example is a demonstration of one Component,
shipped as `registry:example` from `examples/` so documentation can render and
install it. A Block is installable content in its own right and may have no
documentation page at all.

No Block items exist yet. This file is the convention they will follow.
