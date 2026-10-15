# Accessibility and motion checks

Verify full task completion by keyboard and non-pointer input. Maintain visible focus, correct semantics/labels, logical reading order, sufficient contrast, usable target size, zoom/reflow, and color-independent status. Test reduced-motion and interrupted animation, not just disabled animation. Avoid hidden destructive actions and inaccessible custom sliders/menus.

For TUI/CLI, plain output and descriptive errors are accessibility features. For dynamic views, announce important results without overwhelming assistive technologies. For desktop overlays, verify focus and pointer pass-through behavior at the system compositor boundary.
