---
name: web-product-design
description: >
  Design and audit production web interfaces with strong information
  architecture, interaction design, accessibility, responsive behavior,
  visual hierarchy, usability, trust, and ethical conversion optimization.
  Use for SaaS applications, dashboards, admin interfaces, onboarding,
  forms, pricing, landing pages, e-commerce, checkout, and other web
  product experiences.
triggers:
  - Designing or auditing web application interfaces
  - Designing SaaS dashboards, admin panels, or settings
  - Designing forms, onboarding, signup, or account creation flows
  - Designing landing pages, pricing pages, or conversion funnels
  - Designing e-commerce product, cart, or checkout experiences
  - Reviewing responsive behavior, accessibility, hierarchy, or usability
  - Improving an existing product interface without unnecessary redesign
---

# Web Product Design

Design web interfaces around user tasks, comprehension, accessibility, predictable interaction, and product goals.

Good product design does not maximize clicks. It helps users understand where they are, what they can do, what will happen next, and how to complete their task with minimal unnecessary effort.

Conversion is a consequence of clarity, trust, relevance, and low friction. Never improve a business metric by making the interface less truthful, accessible, understandable, or controllable.

## Decision Priority

When design goals conflict, optimize in this order:

1. **Task completion** — can the user accomplish the intended task?
2. **Accessibility** — can users with different abilities, devices, and input methods use it?
3. **Correctness and transparency** — are consequences, prices, permissions, states, and system behavior clear?
4. **User control** — can users undo, cancel, go back, change decisions, and recover from errors?
5. **Information architecture** — is information presented in the sequence needed to make decisions?
6. **Interaction efficiency** — are unnecessary steps, choices, and repeated inputs removed?
7. **Responsive behavior** — does the interface adapt appropriately to available space and modality?
8. **Business and conversion goals** — is the desired action easy without coercion?
9. **Visual refinement** — does the interface feel cohesive, polished, and intentional?

Never sacrifice a higher-priority property to improve a lower-priority one.

## Core Rules

- Start from the user's task, not from a component library or visual style.
- Accessibility is a design constraint, not a final QA pass.
- Design loading, empty, partial, error, success, and disabled states, not only the happy path.
- Responsive design is adaptation, not desktop shrinking.
- Prefer existing design-system primitives over one-off components.
- Prefer recognition over recall and visible system state over hidden state.
- Do not improve conversion by obscuring cost, manufacturing urgency, making rejection difficult, or reducing informed choice.
- Do not recommend additional UI unless it removes greater complexity elsewhere.
- Prefer observed product evidence over generic behavioral heuristics.
- Do not redesign functioning UI merely to make it different.

## Workflow

1. Identify the primary user, task, and success condition.
2. Identify the information and decisions required before the primary action.
3. Establish information architecture and action hierarchy.
4. Design interaction behavior and system states.
5. Check accessibility and responsive behavior.
6. Apply domain-specific patterns only where relevant.
7. Audit trust, content clarity, consistency, and performance.
8. Optimize conversion only after usability and transparency are sound.
9. Polish visuals last.

## Principles vs Patterns

Separate the principle from its implementation.

**Principle** → what must remain true.  
**Constraint** → what the design must handle.  
**Pattern** → one possible implementation.

Example:

- Principle: controls over media must remain legible.
- Constraints: media may be bright, dark, detailed, or user-generated.
- Patterns: scrim, solid control surface, translucent surface, adaptive foreground, safe media zones, or moving controls outside the media.

Do not hardcode one visual pattern when multiple patterns satisfy the principle.

## Load Additional Guidance

Read the smallest set of references relevant to the task.

- Core IA, hierarchy, layout, density, progressive disclosure, consistency → `references/foundations.md`
- Interaction states, async behavior, dialogs, destructive actions, feedback, motion → `references/interaction-and-state.md`
- Keyboard, focus, semantics, contrast, zoom, reduced motion, targets → `references/accessibility.md`
- Responsive behavior, touch, sticky UI, overflow, mobile keyboards → `references/responsive.md`
- Forms, validation, defaults, errors, labels, interface copy → `references/forms-and-content.md`
- Dashboards, admin UI, tables, search, filtering, operational density → `references/dashboards-and-data.md`
- Onboarding, pricing, behavioral UX, e-commerce, cart, checkout → `references/commerce-and-conversion.md`
- Reviews, severity, output format, recommendation discipline → `references/audit.md`

## Evidence Discipline

Do not invent behavioral or usability statistics.

Treat behavioral effects as directional heuristics, not universal laws. Prefer evidence in this order:

1. observed product behavior
2. usability testing
3. product analytics
4. user research
5. established accessibility/usability guidance
6. relevant industry research
7. general behavioral heuristics
8. designer intuition

When product data exists, use it to determine defaults, ordering, presets, prioritization, and common workflows.

Distinguish clearly between an observed problem, established guideline, product-specific evidence, and a design hypothesis.

## Common AI Design Failure Modes

Do not automatically solve problems by adding another:

- card
- badge
- pill
- tooltip
- modal
- gradient
- section
- icon
- animation
- floating control

Prefer removing unnecessary complexity.

Do not:

- turn every setting into a card
- turn simple lists into dashboards
- replace useful tables with cards merely to look modern
- hide important information to create visual minimalism
- make every application look like a marketing page
- prioritize screenshot aesthetics over interaction quality
- create new component variants just to make one screen distinct

## Final Check

Before shipping or recommending a design, verify:

- The primary task is obvious and completable.
- Necessary information appears before the decision that depends on it.
- Interaction states are specified.
- Keyboard and focus behavior are sound.
- The interface adapts across relevant viewport sizes and input modes.
- Costs, permissions, destructive consequences, and recurring commitments are clear.
- Existing system components are reused where possible.
- Conversion improvements preserve informed user choice.
- New UI exists only where it removes more complexity than it introduces.
