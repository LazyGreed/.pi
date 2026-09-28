# Interaction and State

## Interaction Contract

Every interactive element should communicate:

1. that it is interactive
2. what it does
3. its current state
4. whether the action succeeded
5. what happens when something fails

A static mockup is incomplete if important states are unspecified.

## Required States

Consider, where applicable:

- default
- hover
- focus
- active / pressed
- selected
- checked
- disabled
- loading
- success
- warning
- error
- empty
- unavailable
- partial
- read-only

Hover is supplemental. Essential functionality must not depend on it.

## Feedback

Actions should produce immediate perceivable feedback.

For asynchronous actions:

- acknowledge input immediately
- prevent accidental duplicate submission
- preserve context while loading
- indicate completion
- expose recovery when failure occurs

Avoid interfaces where clicking a control appears to do nothing.

## State Design

Design beyond the happy path.

### Loading
What does the user see while data is unavailable? Prefer maintaining layout and context rather than blanking the entire screen.

### Empty
Explain what normally appears, why nothing appears now when relevant, and the most useful next action.

### Partial
Show usable data when only some sources fail. Do not block an entire screen if meaningful work can continue.

### Error
Explain what failed and how to recover. Preserve valid user input and context.

### Success
Confirm the result when completion would otherwise be ambiguous.

### Permission-limited
Explain why an action is unavailable rather than silently disabling it when the reason matters.

### Offline / disconnected
Where relevant, preserve work or clearly explain what cannot be done.

### Stale data
Help users distinguish current data from stale or cached data when that distinction matters.

## Empty States

Useful empty states may communicate:

1. what normally appears here
2. why nothing appears now
3. the most relevant next action

Do not fill every empty state with illustrations or marketing copy. Operational products usually benefit from concise explanatory text.

## Modals, Drawers, Popovers, and Overlays

Use overlays when maintaining the current page context is important.

Good uses:

- short confirmation
- small focused edit
- contextual detail
- lightweight secondary workflow

Avoid overlays when:

- the workflow is long
- deep navigation is needed
- content should be bookmarkable
- multiple nested steps are involved
- users need to compare large amounts of underlying content

Avoid nested modals.

Dialogs should have a clear title, manage focus correctly, support keyboard dismissal where appropriate, return focus sensibly after closing, and make destructive consequences explicit.

## Destructive Actions

Match protection to consequence severity.

- Reversible low-risk action → prefer undo.
- Consequential action → explicit confirmation may be appropriate.
- Highly destructive or irreversible action → name the affected resource, explain the consequence, and require intentional confirmation when justified.

Do not add confirmation dialogs to routine actions merely because they modify data. Excessive confirmations train users to dismiss warnings automatically.

## Feedback Channels

Use channels according to importance.

### Inline feedback
Best for information directly tied to a control or field.

### Toast
Best for brief confirmation that does not require immediate action.

### Banner
Best for persistent page-level or system-level state.

### Modal
Reserve for decisions requiring immediate interruption.

Do not place critical errors only in temporary toasts.

## Optimistic UI

Use optimistic updates only when:

- the action is likely to succeed
- rollback is safe
- temporary inconsistency is acceptable
- failure can be explained and recovered from

Do not optimistically represent irreversible or high-risk operations as complete before the server confirms them.

## Motion

Motion should communicate continuity, hierarchy, causality, spatial relationships, or state change.

Avoid motion added solely to make an interface feel premium.

Transitions should generally be fast, interruptible, consistent, proportional to movement, and respectful of reduced-motion preferences.

Do not delay interaction to wait for animation to finish.
