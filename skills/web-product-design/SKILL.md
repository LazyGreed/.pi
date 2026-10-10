---
name: web-product-design
description: >
  Design and audit production web interfaces with strong information
  architecture, decision support, interaction design, accessibility,
  responsiveness, visual hierarchy, usability, trust, and ethical conversion.
  Use for SaaS applications, dashboards, admin tools, onboarding, forms,
  pricing, landing pages, e-commerce, booking, checkout, and other web products.
triggers:
  - Designing or auditing web application interfaces
  - Designing SaaS dashboards, admin panels, or settings
  - Designing forms, onboarding, signup, or account creation flows
  - Designing landing pages, pricing pages, or conversion funnels
  - Designing product discovery, filtering, comparison, booking, or checkout
  - Reviewing responsive behavior, accessibility, hierarchy, or usability
  - Improving an existing interface without unnecessary redesign
---

# Web Product Design

Design around tasks and decisions, not component galleries or polished screenshots. Users should understand where they are, what choices mean, what happens next, and how to recover. Business success follows from relevance, clarity, trust, and low unnecessary friction, not coercion.

## Decision Priority

When goals conflict, prioritize in order:

1. **Task completion** - the task is discoverable and possible.
2. **Accessibility** - the task works across relevant abilities, devices, and input modes.
3. **Correctness and transparency** - states, consequences, prices, data, permissions, and limitations are true.
4. **User control** - users can reverse, cancel, revise, recover, and navigate.
5. **Information architecture** - required context appears before the decision.
6. **Interaction efficiency** - remove needless steps, backtracking, and uncertainty.
7. **Responsive behavior** - adapt content priority and interaction, not just widths.
8. **Legitimate business goals** - make worthwhile actions easy without manipulation.
9. **Visual refinement** - align typography, shapes, spacing, and brand expression.

Never sacrifice a higher-priority property to improve a lower one.

## Work at Three Levels

- **Principle:** what must remain true (e.g., item details legible regardless of photography).
- **Constraint:** what the real product must handle (mixed image quality, stale counts, mobile keyboards, localization, permissions).
- **Pattern:** one possible implementation (separate media/text, scrim, card/list toggle, live count). Do not elevate a single pattern to a universal law.

### Decision-support lens

- **Explore:** create relevance and clear entry points. Imagery matters when appearance drives interest.
- **Compare:** align attributes, costs, times, alternatives, and constraints; rows and tables can beat visual cards.
- **Act:** expose selected state, exact consequence, primary action, and undo/recovery.
- **Revise:** make trade-offs visible before commitment where reliable data permits; preserve selections and context.

An elaborate Staff-style interface is not automatically better. Each count, chart, badge, personalized rank, filter, recommendation, alternate view, or calculation needs a decision it demonstrably improves.

## Workflow

1. Identify primary user, task, intent, success state, and critical constraints.
2. Observe the current path; map decisions, comparisons, reversals, and failure cases.
3. Identify evidence available from product behavior, research, and analytics; mark unknowns.
4. Design information architecture, grouping, content priority, and action hierarchy.
5. Specify interactions, error handling, dynamic data semantics, and feedback.
6. Validate keyboard, semantics, contrast, zoom, reduced motion, and touch.
7. Adapt for viewport, localization, content extremes, and mobile keyboards.
8. Apply only domain patterns justified by the specific task.
9. Audit trust, performance, operational feasibility, and conversion ethics.
10. Test the whole journey, not only screenshot aesthetics; polish last.

## Core Rules

- Start from the user's task and existing product constraints, not trends.
- Put information required for a decision near that decision. Expose common controls; disclose advanced complexity.
- Preserve scan hierarchy with proximity, typography, alignment, spacing, and emphasis before decoration.
- Prefer design-system tokens and existing components. Avoid shape-language drift.
- Treat Hick-Hyman, Gestalt, number of tabs, font-size counts, and above-the-fold rules as heuristics, not laws.
- Use trustworthy, labeled product data for counts, distribution, rankings, recommendations, and estimates.
- Show loading, empty, partial, stale, error, success, disabled, and permission-limited states where applicable.
- Do not create new UI unless it reduces greater complexity elsewhere.
- Do not use unverified badges, inflated claims, misleading pricing, manufactured urgency, or default financial commitments.
- Do not redesign a functioning interface purely to make it look different.

## Evidence Discipline

Do not invent behavioral statistics, conversion multipliers, guarantees, user needs, usage rankings, inventory, or research findings. Prefer evidence roughly in this order: observed behavior; usability testing; analytics; user research; established accessibility/usability guidance; applicable industry research; heuristics; intuition. Distinguish observation, established guideline, product evidence, and hypothesis. When data is unavailable, use a conservative fallback and mark it as a hypothesis to validate.

## Load the Smallest Relevant References

- Task modeling, decision architecture, Gestalt, type, hierarchy, density, visual polish, navigation: `references/foundations.md`
- Interaction states, async feedback, dialogs, recovery, motion: `references/interaction-and-state.md`
- Semantics, keyboard, contrast, zoom, targets, reduced motion: `references/accessibility.md`
- Mobile anatomy, bottom navigation, sticky actions, safe areas, overflow: `references/responsive.md`
- Forms, validation, labels, defaults, microcopy: `references/forms-and-content.md`
- Dashboards, tables, filtering, distributions, metrics, operational density: `references/dashboards-and-data.md`
- Commerce, discovery, variants, subscriptions, checkout, booking, ethical conversion: `references/commerce-and-conversion.md`
- Reviews, evaluation, severity, recommendations: `references/audit.md`
- Motion prototypes, nested scrolling, Figma, 3D, AI, handoff: `references/prototyping-and-handoff.md`

Do not load every reference for a simple task.

## Common AI Failure Modes

Avoid automatically adding another card, pill, badge, shadow, gradient, tooltip, modal, icon, animation, or dashboard metric. Do not turn tables into cards for fashion; hide essential functions for minimalism; make operational software look like a landing page; impose touch-size density on all desktop tools; or use 3D because prototyping permits it. Choose the simplest coherent pattern that satisfies the actual task.

## Final Check

Before shipping, verify task success; decision context and consequences; true data and prices; suitable feedback and recovery; keyboard and focus; touch, zoom, localization, and safe areas; actual performance; consistency with existing design system; and no extra UI without proven purpose. Validate the complete flow with realistic data, failures, and at least one reversal.
