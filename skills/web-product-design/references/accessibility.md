# Accessibility

Accessibility is a design constraint, not a final QA pass.

Design for keyboard users, screen-reader users, low-vision users, users with reduced motor precision, zoomed interfaces, high-contrast preferences, reduced-motion preferences, and touch/mouse/stylus/keyboard input.

## Keyboard

- Every interactive element must be reachable.
- Focus order should follow logical task order.
- Focus must remain visible.
- Sticky elements must not cover focused controls.
- Do not require pointer-only interactions.
- Do not create custom keyboard behavior when native controls already provide correct behavior.
- Escape, Enter, Space, arrow keys, and Tab behavior should follow established semantics for the component involved.

## Focus

- Use a clearly visible focus indicator.
- Never globally remove focus outlines without an equivalent replacement.
- Move focus intentionally when opening dialogs or navigating to newly revealed task-critical content.
- Restore focus sensibly when temporary UI closes.
- Avoid focus traps except where a true modal interaction requires one.

## Semantics

Prefer native HTML semantics before custom ARIA implementations.

Use correct semantics for buttons, links, headings, lists, forms, tables, dialogs, navigation regions, status messages, and disclosure controls.

Rules:

- Buttons perform actions; links navigate.
- Maintain meaningful heading hierarchy.
- Associate form labels programmatically with inputs.
- Give icon-only controls accessible names.
- Use live-region/status semantics only for meaningful dynamic feedback, not every update.
- Avoid recreating native controls with generic `div` elements unless necessary.

## Contrast and Non-Color Cues

Ensure text, controls, focus indicators, and meaningful graphical elements remain distinguishable across supported states and backgrounds.

Do not encode status, validation, or selection using color alone. Pair color with text, icons, shape, pattern, position, or another perceivable cue.

## Target Size and Motor Accessibility

- Keep interactive targets large enough for reliable activation.
- Provide sufficient separation between adjacent controls.
- Do not make essential actions available only through tiny icons.
- Avoid interactions requiring precise dragging when an alternative can be provided.

## Forms

- Use persistent labels; placeholders are not labels.
- Clearly identify required or optional fields.
- Provide instructions before input when a specific format is required.
- Associate error messages with the relevant fields.
- Do not erase valid input after an error.
- Do not block password managers or paste without a strong justification.
- Avoid cognitive tests or memory-dependent authentication patterns when alternatives exist.

## Zoom and Reflow

The interface should remain functional under enlarged text and browser zoom.

- Avoid fixed-height text containers that clip content.
- Allow labels and controls to wrap where appropriate.
- Do not depend on pixel-perfect positioning that collapses when text grows.
- Ensure sticky/fixed regions do not make the remaining viewport unusable.

## Motion

Respect reduced-motion preferences.

Avoid motion that interferes with reading, delays completion, causes disorientation, or serves no functional purpose.

## Media

Where relevant:

- provide text alternatives for meaningful images
- provide captions/transcripts for time-based media
- avoid auto-playing disruptive media
- ensure controls are keyboard accessible and visibly focused

## Accessibility Review Questions

- Can the entire task be completed using a keyboard?
- Is current focus always visible and unobscured?
- Do controls have correct roles, names, and states?
- Is reading/navigation order logical?
- Does the UI remain usable at increased zoom/text size?
- Are errors perceivable without relying on color?
- Can touch targets be reliably activated?
- Does motion respect user preferences?
- Are dynamic changes announced only when they need to be?
