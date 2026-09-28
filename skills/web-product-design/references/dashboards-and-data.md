# Dashboards and Data Interfaces

## Dashboards and Admin Interfaces

Optimize operational interfaces for comprehension and repeated use.

- Surface system status clearly.
- Make anomalies easier to find than normal states.
- Preserve filters and view context where useful.
- Support bulk actions for repetitive workflows.
- Keep destructive actions distinct.
- Use tables when users need comparison across records.
- Expose important metadata without repeated drill-down.
- Make asynchronous operations visible.
- Avoid decorative dashboard cards containing one number with no actionable context.

A dashboard should help users answer questions or act, not merely display metrics.

## Operational Density

Frequent professional workflows may legitimately be dense.

Favor:

- compact but readable controls
- stable alignment
- high scan efficiency
- keyboard shortcuts where appropriate
- batch operations
- persistent filtering/sorting state
- useful defaults

Do not force spacious marketing aesthetics onto operational tooling.

## Data Tables

Use tables when users need to compare multiple properties across records.

- Align numeric values appropriately.
- Keep column meaning clear.
- Support sorting/filtering where the task needs them.
- Preserve headers during long vertical scans when useful.
- Keep row actions predictable.
- Avoid showing every possible action permanently in every row if it creates noise.
- Provide bulk selection only when bulk actions exist.
- Make empty, loading, and error states explicit.
- Avoid truncating critical identifiers without a way to inspect/copy them.
- Preserve row identity during async updates.

Do not replace a useful table with cards merely to look modern.

## Row Actions

Choose between inline actions, overflow menus, and detail views based on frequency.

- Frequent primary row action → visible.
- Infrequent secondary actions → overflow may be appropriate.
- Dangerous actions → separated and clearly labeled.

Avoid hover-only actions when touch or keyboard use matters.

## Sorting

- Indicate the active sort and direction.
- Use stable sorting where possible.
- Do not silently change sort order after background updates unless the product depends on live ordering.
- Preserve sort state when returning from detail views where useful.

## Search and Filtering

Search and filters should reduce a dataset predictably.

- Make active filters visible.
- Make filters easy to clear.
- Preserve filter state when navigating into and back from details where useful.
- Show result counts when useful.
- Debounce or explicitly submit based on expected interaction cost.
- Do not reset unrelated filters unexpectedly.
- Clearly distinguish `no data exists` from `no data matches these filters`.
- For complex products, consider shareable URLs representing filter/search state.

## Pagination and Infinite Loading

Choose based on the task.

Pagination is often better when users need:

- stable position
- predictable result boundaries
- direct navigation
- comparison across known pages

Infinite loading may work when users primarily browse continuously and exact location is less important.

Do not use infinite scrolling where users must reliably return to an exact item unless position restoration is robust.

## Status

Status should be easy to scan and semantically consistent.

- Prefer clear labels over unexplained color dots.
- Distinguish current state from historical events.
- Use timestamps when freshness matters.
- Avoid status taxonomies with unnecessary near-duplicates.

## Metrics

Every surfaced metric should answer a plausible product question.

For important metrics, provide relevant context such as period, comparison baseline, units, or denominator.

Avoid decorative percentage deltas without enough context to interpret them.
