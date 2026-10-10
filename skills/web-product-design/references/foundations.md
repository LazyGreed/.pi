# Foundations

## Task and Information Architecture

Before styling, identify who uses the product, why they are here, the desired outcome, information needed before action, current state, failure cases, and what follows the primary action. Organize content around these decisions, not arbitrary page regions.

- Present necessary facts before their dependent choice; group related entities and actions.
- Keep frequently compared information close. Avoid isolated subpages that require remembering other constraints.
- Separate primary, secondary, exceptional, and destructive actions.
- Prefer recognition over recall, stable navigation, and native browser back/forward behavior.
- Preserve filters, tabs, and edited state when navigating where users expect it.
- Use domain terminology and descriptive destinations. Avoid generic overflow menus for common actions.

## Decision Architecture

- **Explore:** promote distinctive, trustworthy content; media can lead if appearance affects selection.
- **Compare:** align decision attributes (e.g., price, quantity, delivery time, inventory, effort). Consider compact rows or tables.
- **Execute:** prominently show selection, consequence, primary action, and a recovery route.
- **Revise:** place coupled constraints together and provide understandable feedback about changes.

The first viewport should orient and invite the next meaningful step, not maximize the count of visible records. Scrolling is ordinary; do not shrink important images just to cram more results. Conversely, large visuals are not useful when users need quick numeric comparison.

## Proximity and Grouping

Gestalt proximity is a relationship cue: internal gaps within one group should generally be smaller than gaps between groups. Heading, associated body, and action should read as a unit rather than three equally spaced independent items. Also use alignment and typography; proximity alone cannot communicate every relationship. Test across responsive layouts.

## Hierarchy and Typography

- One main focal point per immediate decision context. Subordinate support data without hiding it.
- Use clear title, subtitle, and metadata tiers. Prioritize size, weight, line height, contrast, placement, and spacing over decoration.
- A small coherent type scale often works better than many similar sizes. Two or three sizes in one view is a useful starting heuristic, not a cap. Preserve appropriate minimum legibility, zoom, localization, and semantics.
- Use color semantically and with sufficient contrast. Never rely on color alone.
- Use consistent tokens for spacing, radii, controls, and icon treatments, but allow intentional differences with a clear purpose.
- Make numerical columns easy to compare with aligned units, stable decimal placement, and tabular numeral features (`font-variant-numeric: tabular-nums`). Tabular numerals do not require a monospace font.

## Choice Complexity

Hick-Hyman predicts an approximately logarithmic relationship between certain choice tasks and reaction time under controlled conditions. It does **not** mean each new button geometrically increases hesitation. Reduce same-level competition through meaningful grouping, order, search, presets, and progressive disclosure, without burying frequent actions or hiding meaningful options.

## Imagery, Identity, and Variable Content

- When the item itself motivates discovery, show representative, well-cropped product imagery rather than substituting a seller logo. When seller identity determines trust, show that too.
- Prevent category decoration from competing with core content; establish brand character without losing clarity.
- For merchant-uploaded or unpredictable media, keep essential controls and text readable regardless of bright, dark, detailed, absent, or low-resolution images. Separate content from media when more robust; overlays require contrast guarantees.
- Use genuine logos or avatars when they help recognition and users have the appropriate rights and privacy expectations. Provide meaningful names, accessible alternatives, and fallbacks.
- Do not repeat the unsupported claim that people recognize images "60,000 times faster" than text.

## Layout, Navigation, and Density

- Align to shared axes; use consistent spacing tokens, constrained prose widths, and data-appropriate wide layouts.
- Avoid nesting borders/cards unless they establish a meaningful grouping.
- Favor guidance and whitespace for infrequent consumer tasks; higher density, stable alignment, keyboard shortcuts, and batch actions for professional work.
- Hide advanced, rare, or dangerous complexity, not core capability. Do not force all tasks through the same card grid.
- Use links for navigation, buttons for actions. Make page titles and location clear.
- Preserve return position in deep catalogs and infinite lists when it matters.

## Visual Refinement

Shadows indicate elevation, separation, or focus where useful. Colored ambient shadows can support a brand surface but are not an automatic upgrade over neutral shadows; test on light/dark surfaces and avoid excessive paint cost. Status should combine plain labels with shapes/icons/color where helpful. Skeletons represent pending content, not arbitrary system health. Avoid decorative badges or multiple competing accents.

## Performance Is UX

Reserve layout space for async content, size and lazy-load media intelligently, preserve layout during data updates, acknowledge actions promptly, avoid unnecessary JavaScript and costly animations, and never make state dependent on a flourish completing. Test actual loads and slow devices rather than static mockups.
