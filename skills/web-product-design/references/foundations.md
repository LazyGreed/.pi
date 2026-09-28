# Foundations

## Start With the User Task

Before styling a screen, identify:

- who is using it
- what they came here to accomplish
- what information they need before acting
- what decisions they must make
- what can go wrong
- what state the system may already be in
- what happens after the primary action
- which tasks are primary, secondary, and exceptional

Ask: **What is the shortest understandable path from the user's current state to their desired state?**

Do not optimize an interface before understanding that path.

## Information Architecture

Structure information according to user decisions, not visual novelty.

- Place required decision-making information before the action that depends on it.
- Group semantically related information.
- Separate primary, secondary, and tertiary actions.
- Prefer progressive disclosure for advanced, dangerous, or infrequent controls.
- Keep commonly compared information visually close together.
- Avoid forcing users to remember information from another screen.
- Avoid fragmenting one conceptual task across unnecessary pages or modals.
- Use terminology from the user's domain.
- Prefer recognition over recall.
- Keep navigation depth proportional to information complexity.
- Do not hide frequently needed actions behind generic overflow menus.

### Cognitive Proximity

Information participating in the same decision should usually be nearby.

Examples:

- product title + rating + price
- form field + validation message
- resource name + status + relevant action
- plan name + price + important constraints
- destructive action + exact object affected

Proximity should communicate relationships before borders, cards, or decoration do.

## Visual Hierarchy

A screen should reveal its priority structure before the user reads every word.

- Give the primary task the strongest appropriate visual emphasis.
- Avoid multiple elements competing as the primary action.
- Use typography, spacing, alignment, contrast, and grouping before adding decoration.
- Prefer fewer levels of hierarchy executed consistently.
- Use whitespace to establish relationships and separate concepts.
- Reduce low-value visual noise.
- Keep supporting information subordinate without making it inaccessible.
- Do not use card containers simply because content exists.
- Avoid excessive borders, shadows, badges, gradients, and decorative containers.

### Typography

Prefer a small, coherent type system. Establish hierarchy through size, weight, line height, spacing, and placement.

For body copy:

- use comfortable line lengths
- use sufficient line height
- avoid dense uninterrupted text
- break content by meaning, not arbitrary character count

### Color

Use color semantically.

Reserve stronger accents for primary actions, important states, and meaningful emphasis. Do not rely on color alone to communicate state. Avoid assigning a unique color to every category, badge, action, and section.

## Layout

Layout should clarify structure and reduce scanning cost.

- Align related content to shared visual axes.
- Prefer predictable grids over arbitrary positioning.
- Use consistent spacing tokens.
- Constrain long-form content to readable widths.
- Allow data-heavy interfaces to use wider layouts where necessary.
- Avoid excessive nesting of containers.
- Avoid large empty hero regions in task-oriented applications.
- Preserve important context while users work.

Do not force dashboards, editors, data tables, command surfaces, and commerce pages into the same centered marketing-page layout.

## Action Hierarchy

Use visual hierarchy intentionally:

- one primary action per immediate decision context
- secondary actions visually subordinate
- destructive actions differentiated appropriately
- tertiary actions often represented as text or low-emphasis controls

Do not make every action look primary.

Buttons should describe actions, not vague intent. Prefer `Create project`, `Save changes`, `Add to cart`, `Generate report`, or `Delete workspace` over `Submit`, `Proceed`, or `OK` when context is not sufficient.

## Navigation and Wayfinding

Users should understand where they are, where they came from, where they can go, and whether navigation will lose state.

- Preserve browser Back and Forward behavior.
- Use links for navigation and buttons for actions.
- Give pages meaningful titles.
- Show location within deeper hierarchies where needed.
- Keep global navigation stable.
- Avoid changing navigation placement unpredictably.
- Preserve filters, tabs, or context where users reasonably expect it.
- Do not trap ordinary navigation inside modal workflows.

Sticky headers can preserve context, but only when the retained information is worth the viewport space it consumes.

## Design-System Consistency

Prefer existing system primitives before inventing new ones.

Think in this hierarchy:

`tokens → primitives → components → patterns → screens`

Reuse established spacing, typography, colors, radii, shadows, icon sizes, control heights, interaction states, motion, form patterns, and navigation patterns.

Before creating a new component, ask: **Does an existing component already express this interaction?**

Consistency usually produces more usability than novelty.

## Density

Interface density should match task frequency and user expertise.

### Consumer or infrequent workflows

Favor stronger guidance, more whitespace, fewer simultaneous controls, and progressive disclosure.

### Professional or repeated workflows

Favor higher information density, faster scanning, keyboard efficiency, bulk operations, persistent context, and fewer unnecessary confirmations.

Do not apply spacious consumer-marketing aesthetics blindly to operational tools.

## Progressive Disclosure

Hide complexity, not capability.

Use progressive disclosure when controls are advanced, infrequently used, contextual, dangerous, or dependent on another selection.

Do not hide primary functionality merely to make the interface appear cleaner.

## Performance Is UX

Do not introduce visual or interaction patterns that materially degrade performance.

- Reserve dimensions for asynchronously loaded content.
- Avoid unnecessary layout shifts.
- Prioritize content required for the primary task.
- Give immediate interaction feedback.
- Prefer progressive rendering where possible.
- Lazy-load non-critical media.
- Avoid unnecessary client-side JavaScript.
- Prefer native browser behavior and CSS where sufficient.
- Avoid expensive animation on frequently updated surfaces.
- Keep large images appropriately sized for their rendered context.

Optimize perceived and actual responsiveness. Users should not have to wonder whether the interface received their action.
