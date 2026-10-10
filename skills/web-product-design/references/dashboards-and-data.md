# Dashboards and Data Interfaces

Operational products are tools for answering questions and acting, not galleries of cards with numbers.

## Operational Density

- Show status and anomalies where they can be found quickly.
- Favor readable compact rows, stable alignment, bulk operations, keyboard efficiency, persistent state, and clear timestamps for repeated tasks.
- Expose frequently used row actions; move rare actions to accessible overflow; separate destructive actions.
- Avoid converting useful tables into cards merely to appear modern.

## Tables and Quantities

- Use semantic tables for cross-record comparison; keep headers and sort direction clear.
- Right-align comparable numeric columns where suitable; use `font-variant-numeric: tabular-nums` for stable digit widths and align units/decimals consistently.
- Preserve row identity across async updates; maintain position and selections.
- Avoid hiding critical identifiers without a way to inspect/copy; handle narrow layouts deliberately.
- Show counts/metrics with relevant period, denominator, units, freshness, baseline, and uncertainty. Avoid decorative percentages.

## Search and Sorting

- Match search hints to supported query types. Keep the search accessible via a persistent label/name.
- Make the active sort key/direction visible, with stable sorting where possible. Do not silently reorder lists on incidental updates.
- Show active filters, allow clearing each/all, preserve them across detail navigation, and expose shareable URLs for complex searches where useful.
- Separate sorting (ordering) from filtering (eligibility). Expose frequently used controls rather than putting everything behind an unlabeled generic menu.

## Decision-Aware Filtering

Users' preferences may be negotiable. A buyer seeking three bedrooms may accept two for the right price; a small budget change may unlock significant inventory. Present these trade-offs without treating every parameter as an isolated yes/no query.

- Co-locate interdependent facets and maintain underlying results context. A cohesive sheet or page is often better than several nested subpages.
- Choose control semantics deliberately: `3` exact, `3+` minimum, and `2–4` bounded range are different. Do not make an inclusive preference accidentally exclusive.
- Prefer directly selectable labeled values for a short known set; steppers are reasonable for small repeated increments, not universally ideal for known target numbers.
- Pair exploratory sliders with precise inputs when exact constraints matter. Always include keyboard access and accessible value text.
- When results are dependable, show total and matching counts; `Show 41 homes` can communicate consequence before Apply. Offer recovery from zero matches.
- Show per-option counts only if computed *conditionally on the other active filters*. Document whether current facet selections are excluded from their own count calculation.
- Treat counts as potentially asynchronous or stale. Label approximation/freshness; debounce expensive queries; avoid layout thrash and false precision. Prefer explicit Apply when real-time computation is unreliable.
- Use distributions/histograms when they expose a useful threshold or cluster, not merely to fill space. Label axes, units, binning assumptions, extreme values, and selection range; provide an accessible textual equivalent.
- Translate price into decisions users actually make (cash required, monthly payment, ongoing costs) only with explicit inputs, assumptions, uncertainty, and excluded fees. A mortgage affordability estimate is not guaranteed approval.
- Limit extra context to signals that inform the user's next adjustment, not every theoretically available metric.

## Browsing Large Result Sets

Pagination fits stable position and deliberate comparison. Infinite scrolling can fit casual discovery, but restore the user's previous position and selected state when returning. Use a card/list toggle only when visual browsing and rapid structured comparison are both recurring needs.

## System States

Distinguish no records exist from no records match current filters; loading from empty; unavailable values from zeros; and stale from live counts. Make partial failure actionable without blocking unrelated records.
