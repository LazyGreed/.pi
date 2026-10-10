# Responsive Design

Responsive design adapts priorities, density, grouping, navigation, and input, not merely dimensions.

## Layout and Content Priority

Use fluid sizes and content-driven breakpoints. On constrained viewports preserve task-critical content/actions first, then reduce secondary detail, reorganize groups, disclose infrequent controls, and finally remove nonessential decoration. Do not hide needed capability just to fit a fixed-width comp.

## Touch, Pointer, and Keyboard

Touch needs comfortable hit areas and separation. Hover cannot carry essential functionality. Preserve compact desktop/keyboard workflows when the task benefits from them. With software keyboards open, focused fields and validation must stay in view; sticky regions may need to move or disappear.

## Mobile Bottom Navigation

- Use for a small, stable set of frequent top-level destinations, not miscellaneous actions. Three to five is a common heuristic, not a mandatory limit or floor.
- Use clear destination labels and optional consistent icons. Around 24px icons can be a starting token, not a universal dimension. Do not lock labels to 10-12px: preserve readable, zoomable, localized text.
- Make active state unmistakable with shape/fill/weight and semantics (`aria-current="page"` where appropriate), not a tiny color-only dot. Show keyboard focus separately.
- Keep the tappable hit area comfortably sized and separated. Check platform standards without mixing points and CSS px.
- Respect actual browser/device safe areas, e.g. `env(safe-area-inset-bottom)` with sensible base spacing. Never hardcode a universal 34px inset.
- Test landscape, browser chrome, system gesture region, software keyboard, long labels, enlarged text, and a simultaneous sticky CTA.

## Sticky CTAs and Persistent UI

Sticky purchase/action bars can prevent long backtracking when users are ready to act, but must show current selected variant and price/commitment. Keep enough viewport for content, do not cover errors or keyboard focus, and verify scroll/reflow. Do not stack persistent bars simply because they look polished.

## Tables, Overflow, and Navigation Changes

Choose horizontal table scroll, priority columns, stacked records, or drill-down based on comparison task. Do not always convert tables to cards. Navigation may transform in shape across breakpoints while preserving conceptual architecture. Make intentional horizontal carousel overflow discoverable; avoid accidental page overflow. Long identifiers need inspect/copy paths if truncated.

## Robustness Checklist

Test narrow touch, medium, wide desktop, keyboard-only desktop, long/localized content, large numbers, errors/empty values, browser zoom/text enlargement, and mobile software keyboard. Include slow loading, media failures, and rotated screens when relevant.
