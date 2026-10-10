# Accessibility

Accessibility constrains architecture and behavior from the start, not only final QA.

## Semantics and Focus

- Use native HTML first: real links, buttons, labels, forms, tables, dialogs, landmarks, and headings.
- Buttons act; links navigate. Give icon-only controls accessible names and states.
- Follow logical keyboard order; preserve a visible unobscured focus indicator.
- Use established Enter, Space, arrow, Escape, and Tab semantics. Avoid custom div-based controls without need.
- Move focus intentionally for dialogs and task-critical reveals; restore it when temporary UI closes.
- Use meaningful `aria-current` for navigation and restrained live regions for significant updates.

## Contrast and Alternative Cues

Provide usable text/control contrast across variable media, gradients, dark mode, and states. Selection, warning, success, and status must not depend on color alone: pair with labels, semantics, icons, shape, or position. Do not use icon-only status when text or accessible names are necessary.

## Touch Targets

Size the interactive area, not just the drawn icon. Ensure sufficient separation and a non-drag alternative where precision gestures would block a task.

- WCAG 2.2 AA SC 2.5.8 specifies a 24×24 **CSS px** target size with listed exceptions, including spacing. It is not a universal minimum for every situation.
- WCAG SC 2.5.5, AAA, specifies 44×44 **CSS px** with exceptions. Larger practical touch targets may be preferable.
- Native iOS guidance uses 44×44 **points**; do not silently treat those as CSS pixels or mix units.

Check the actual applicable criterion and exceptions; conformance minima are not ergonomic ideals.

## Forms, Content, and Media

- Persistent, associated labels; clear required/optional fields; field-level validation; error recovery; sensible autofill and paste.
- Images that communicate information need equivalent text; decorative media should not pollute announcements. Caption/transcribe time media where required.
- Use readable sizes and line heights, allow zoom/reflow, long translations, and large system text. Avoid clipped fixed-height text.
- Do not require motion, hover, precision dragging, or memory-dependent workarounds to complete essential tasks.

## Motion and Review

Respect reduced motion. Verify keyboard-only completion, screen-reader semantics where available, zoom/reflow, focus inside sticky layouts, non-color cues, accurate dynamic announcements, and touch activation on real narrow screens.
