# Platform constraints

- Desktop: multi-window focus, keyboard shortcuts, HiDPI, monitor scale, system theme, pointer and keyboard coexistence, Wayland/macOS/Windows conventions.
- Web: browser navigation, responsive reflow, screen-reader semantics, async network failures, variable content, back/forward and form state.
- Mobile: touch reach, safe areas, IME/keyboard, interruptions, gestures with accessible alternatives, offline state.
- CLI/TUI: predictable command grammar, useful exit codes, readable errors, pipe/script friendliness, narrow terminal widths, non-color alternatives.
- Embedded: constrained input, latency, disconnection, small screens, predictable physical controls.

Choose patterns that fit the actual platform instead of copying web design everywhere. A cross-platform product may share principles, not identical widgets.
