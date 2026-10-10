# Interaction and State

## Interaction Contract

Every control needs clear affordance, meaning, current state, input acknowledgement, success feedback, and a recoverable failure path. A screenshot is incomplete when interaction outcomes are unknown.

Specify relevant default, hover, focus, pressed, selected, checked, disabled, loading, success, warning, error, empty, unavailable, stale, partial, and read-only states. Hover is supplemental, never essential.

## Async Feedback

- Acknowledge input immediately; prevent accidental duplicates and retain context while loading.
- Distinguish queued, in-progress, complete, partly complete, failed, and stale data when they matter.
- Keep useful partial content visible during a partial outage. Explain empty results versus no existing data.
- Preserve valid user input after errors; use actionable inline errors and visible recovery.
- Announce important completion and errors accessibly without announcing every background update.
- Live inventory, prices, and counts may change. When freshness matters, label estimates/cached values and avoid presenting obsolete values as current.

## Overlays and Navigation

Use a dialog, drawer, popover, or bottom sheet only when it preserves useful context better than a navigable page. Long, deep, shareable, or comparison-heavy workflows usually deserve a page. Avoid nested modals. Manage initial focus, Escape where appropriate, return focus, and browser navigation consistently.

## Destructive Actions and Optimism

Favor undo for low-risk reversible changes. Confirm meaningful irreversible actions with clear affected-object and consequence text. Avoid habitual confirmations. Optimistic UI is suitable only when rollback is safe, inconsistency acceptable, and failure recoverable; do not represent high-risk irreversible actions as done before confirmation.

## Motion

Motion should explain continuity, spatial relationship, causality, or state change, not manufacture polish. Prefer responsive, interruptible transitions. Test repeated quick input, mid-transition retargeting, Escape/back reversals, and focus behavior. Respect reduced-motion preferences and do not delay controls until animation finishes. A prototype's motion fidelity is not a substitute for functional feedback.

## Feedback Channels

Use inline messages for local issues; toasts for nonessential short confirmations; banners for persistent page/system issues; and modals only for decisions requiring interruption. Never put critical failures exclusively in transient toasts.
