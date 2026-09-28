# Responsive Design

Responsive design is not shrinking a desktop layout. Adapt information density, navigation, grouping, interaction model, content priority, spacing, and control placement according to available space and input modality.

## Layout

- Prefer fluid layouts with sensible min/max constraints.
- Avoid hardcoded layouts dependent on one viewport width.
- Design around content breakpoints rather than device brand names.
- Test both unusually narrow and unusually wide layouts.
- Keep line lengths reasonable for prose while allowing operational data surfaces to use width efficiently.

## Content Priority

When space becomes constrained:

1. preserve task-critical information and actions
2. collapse secondary detail
3. reorganize grouping
4. move infrequent controls behind explicit disclosure
5. remove only genuinely nonessential decoration

Do not hide important capability merely because the screen is smaller.

## Touch vs Pointer

- Do not rely on hover for discovery or completion.
- Increase target size and separation for touch.
- Avoid dense pointer-oriented action clusters on touch surfaces.
- Preserve efficient pointer/keyboard behavior on desktop rather than forcing touch-sized spatial density everywhere.

## Mobile Keyboard

Account for software keyboards:

- focused fields should remain visible
- primary actions should not be permanently hidden behind the keyboard
- avoid layouts that jump unpredictably as the viewport changes
- scrolling to validation errors should not place them underneath fixed headers

## Sticky and Fixed UI

Sticky UI is a tool, not a requirement.

Use it when persistent context or actionability is worth the viewport cost.

Check:

- top header + bottom navigation + browser chrome + CTA still leave enough content viewport
- sticky controls do not cover focused elements or validation messages
- safe-area insets are respected where needed
- sticky actions reflect the current selection/state

## Navigation Transformations

Navigation may legitimately change form across widths, but should preserve the same conceptual structure.

Examples:

- horizontal nav → menu/disclosure
- persistent side nav → collapsible drawer
- tab row → scrollable tabs or select only when the semantics remain clear

Avoid radically different information architecture across breakpoints unless the user task truly changes.

## Tables

On narrow screens, deliberately choose among:

- horizontal scrolling
- priority columns
- stacked records
- drill-down detail
- alternate compact representation

Do not automatically convert every table into cards.

## Overflow

- Long text should wrap unless preserving a single line is part of the data model.
- Critical identifiers may truncate only when users can inspect/copy the full value.
- Avoid accidental horizontal page overflow.
- Deliberate horizontally scrollable regions should visually indicate that more content exists.

## Localization and Variable Content

Test:

- longer translations
- large numbers
- long usernames/resource names
- empty values
- error messages
- badges/status text
- plural forms

Do not treat English copy length as a layout invariant.

## Responsive Review

Check at minimum:

- narrow touch viewport
- medium viewport
- wide desktop viewport
- keyboard-only desktop
- long/translated content
- browser zoom / enlarged text
- software keyboard open on form-heavy screens
