# Motion uses two engines, and its presets are a Registry item

`zen` keeps one Motion policy and gives it two engines. Springs — presses, thumbs, indicators, expandables and popup enter/exit — run through the `motion` package, because CSS cannot express a spring, cannot cancel an in-flight animation cheaply, and cannot animate an exit after Base UI has ended the closing phase. Everything else stays CSS: colour, shadow, border, hover and focus transitions, plus Toast, Drawer, Sidebar, Progress and Meter, whose animation is driven by Base UI's per-frame swipe variables or by high-frequency value updates. The split follows Arc UI's own motion guidance rather than a blanket replacement, and it supersedes [ADR-0010](0010-motion-as-a-separate-component-responsibility.md).

Presets ship as one `registry:lib` item, `motion`, installed at `lib/motion.ts`. It is the only item that declares the `motion` package dependency; every animated item declares `@kosori/motion` and nothing else, so the package arrives transitively. Springs live in that module, easing and duration stay CSS Tokens (`--ease-*`, `--duration-*`), which means a value is owned by exactly one engine and never duplicated in both. Components read reduced motion themselves through `useReducedMotion()`: the library installs standalone items and [ADR-0003](0003-install-surface.md) forbids writing a provider into a consumer's layout, so there is no `MotionConfig` to mount. Popups compose Motion through Base UI's `render` prop — `AnimatePresence` with controlled `open` for overlays that unmount, `keepMounted` with state-driven `animate` for Tooltip and PreviewCard — never by wrapping a primitive in `motion.div`.

## Consequences

- A Port keeps shadcn/ui's Structure and coss/ui's Design; Motion is the third responsibility and adds no prop, no export and no DOM level. A wrapper would be a Structural change, so `render` is the only composition mechanism.
- Zen's popup source now differs in markup from a CSS-only Style's. ADR-0004's "Tokens and class strings, never markup" still governs Design, and Motion sits outside it. `kaze` stays CSS and stays Incomplete, so the invariant is not yet exercised between two complete Styles.
- Removing `--motion-*` and renaming the CSS remainder to Arc's `--ease-*` and `--duration-*` is a breaking change for a Consumer project that overrides motion Tokens. The library is pre-1.0 and consumers own the copied source, so no alias is kept: two names for one value is the duplication this decision removes.
- Toast and Drawer stay CSS permanently. The Motion page has to say why, or the split will read as debt rather than a decision.
- An animated item's install now pulls `motion` transitively through `@kosori/motion`. An item that only changes colour or shadow gains nothing to install.

## Considered options

Motion for every transition. Rejected: Drawer and Toast run on Base UI's per-frame swipe and stack variables, and porting them means reimplementing that math in JavaScript; Progress and Meter animate on every value change, where a spring is noise.

A `MotionConfig` provider item. Rejected: it would need an entry in the consumer's layout, which ADR-0003 puts outside the install surface.

CSS only, as before. Rejected: enter, exit and interruption are exactly what CSS does badly, and `data-starting-style` / `data-ending-style` carry no physics.
