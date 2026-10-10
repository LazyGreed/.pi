# Audit and Review Workflow

Audit the **end-to-end decision journey** in descending order of impact, not in order of visual novelty.

## Audit Sequence

1. **Task:** What is the primary job, success state, and worst credible failure? Can users complete it?
2. **Information architecture:** Is necessary information visible at the point of decision? Are coupled constraints and comparison attributes near each other?
3. **Decision support:** Can users see real alternatives, likely consequences, inventory, costs, and how changing a constraint affects options?
4. **Hierarchy:** Does the first screen emphasize the right information, with coherent grouping and typography rather than competing cards/chips/badges?
5. **Interaction:** Are controls understandable and feedback immediate? Can people revise, undo, cancel, or recover?
6. **States:** Check loading, partial, empty, zero-match, stale, offline, error, disabled, permission-limited, and success as applicable.
7. **Accessibility:** Check semantics, keyboard, focus, contrast, zoom, touch, and reduced motion.
8. **Responsive:** Check narrow touch, desktop keyboard, long content, system gestures, sticky bars, mobile keyboards, and localized text.
9. **Consistency/performance:** Reuse tokens and components; check slow loads, layout shifts, unstable sorting, overly expensive real-time signals.
10. **Trust/conversion:** Are prices, fees, subscriptions, personalizations, rankings, availability, and claims truthful and comprehensible?

## Decision-support Questions

- Is the task exploration, comparison, action, or a combination? Does the layout reflect it?
- Does every new control/chart/badge help a concrete decision more than it increases noise?
- Can users tell exact versus minimum versus ranged filters apart?
- Are displayed counts, rankings, median values, prices, and estimates current, conditional on active filters, and labeled appropriately?
- Can users preview a consequence reliably without misleading precision? What happens when results are empty?
- Are labels/controls closer to their associated content than unrelated content? Are prices/numbers aligned for comparison?
- Is text legible over all plausible photos? What if images are missing, too bright, or low-resolution?
- Does a popular/default option have evidence and avoid coercion? Does a mobile sticky CTA cover focus, errors, or safe areas?
- Is prototype motion actually interruptible and accessible? Can users use a nested carousel on keyboard and touch?
- Does a visually premium redesign make task completion or comprehension worse?

## Findings Format

For each nontrivial issue report:

### `[Blocker|Major|Minor|Polish] Concise title`

**Area:** interaction / IA / accessibility / content / performance / trust / etc.

**Observed problem:** What demonstrably happens, with reproduction conditions.

**Impact:** How it affects comprehension, accuracy, autonomy, accessibility, efficiency, or completion.

**Smallest viable correction:** Prefer removal, reorder, existing component, copy change, or clearer feedback before adding UI.

**Evidence:** Direct observation, usability test, analytics, research, accessibility guidance, convention, or explicitly labeled design hypothesis.

## Severity

- **Blocker:** Prevents completion, serious accessibility failure, material harm, or effective unusability.
- **Major:** Significant repeated friction, confusion, error, or task failure.
- **Minor:** Noticeable but recoverable usability/consistency problem.
- **Polish:** Primarily visual, with little task impact.

Do not elevate subjective visual preferences into blockers.

## Evaluation

Prefer observed task success, time to useful action, corrections, reversals, wrong submissions, comprehension, and confidence over screenshot preference. Compare alternatives with the same realistic data and constraints. Record test limits honestly. Do not infer a designer's quality from claimed seniority level or count of advanced widgets.

## Minimal Change Discipline

Before recommending new UI: can the extra element be removed, existing content reordered, a design-system primitive reused, wording clarified, or feedback improved? Add a new component only when simpler changes cannot solve the issue. Preserve interfaces that already work.
