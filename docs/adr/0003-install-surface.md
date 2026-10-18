# An install adds components, CSS and dependencies — nothing else

shadcn's init also vendors a font and patches the consumer's `layout.tsx`. kosori's preset ships no font: it sets `--font-sans` and `--font-mono` to a plain stack and leaves typography to the consumer. The general rule this is an instance of: no kosori registry item writes into a consumer's application routes or layout. The install surface is components, the CSS entry file, and package dependencies.

A consumer's layout and route files are the part of their project kosori understands least, and fonts are the part of a style that is least kosori's to choose — licensed, self-hosted and CDN fonts are all normal. Patch them and every future install silently becomes a source of conflicts in files nobody expected a component library to touch.

## Consequences

- Our init visibly diverges from shadcn's: no font files, no layout edit. Documentation must state that typography is the consumer's to wire.
- Any future registry item that would write outside the install surface needs to reopen this decision, not quietly extend it.
