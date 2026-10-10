# Prototyping and Handoff

Use for interactive prototypes, Figma transitions, nested scrolling, animation-heavy web experiences, 3D, and implementation handoff. Specific tools are optional, not prerequisites.

## Prototype the Actual Flow

Show representative default, focus, selection, loading, success, partial, empty, error, and unavailable states. Include long labels, missing/noisy images, outliers, translations, slow results, browser Back, interruption, and reduced motion. Never expose private real-user data as placeholders.

## Motion and Scroll

- In Figma Smart Animate, use compatible named layers and stable hierarchy/component identity between frames where interpolation matters. Verify previews for jump cuts; this is a Figma-specific technique, not a browser architecture rule.
- Specify motion as transitions between states with duration/easing, input interruption, focus, reduced-motion response, and performance constraints. Favor functional continuity over gratuitous 3D.
- For nested horizontal scroll within vertical layouts, specify ownership of gestures, clipping, overflow affordance, keyboard/assistive navigation, snap behavior, and touch conflict at narrow breakpoints.
- A 3D carousel may be interesting in a portfolio but rarely justifies extra input difficulty, CPU/GPU cost, or motion sickness in task-oriented software.

## Handoff

Define tokens, components, semantics, content rules, breakpoints, state transitions, empty/error behaviors, data freshness, validation, design constraints, and performance budgets. Spacing annotations alone cannot communicate an interaction contract.

Optional Figma plugins include Dimensions (annotations), Content Reel (representative content), and Figmotion (timeline animation). Verify current existence and compatibility before recommending them; built-in capabilities may suffice.

## Generative Design Tools

AI tools can speed moodboards, imagery exploration, and mock data. Human validation remains responsible for real user needs, layout mechanics, rights, accessibility, content accuracy, and product fit. A polished AI asset is not evidence of a usable experience.
