# Forms and Content

## Forms and Data Entry

Reduce effort without making consequential decisions silently.

### Smart Defaults

Use defaults when the value is highly probable, safe, easily reversible, and clearly visible.

Avoid automatic defaults for:

- consent
- payment commitments
- destructive operations
- privacy-sensitive choices
- irreversible decisions
- expensive options
- legal acknowledgements

Defaults should reduce repetitive work, not manipulate acceptance.

### Form Rules

- Use persistent labels.
- Do not rely on placeholders as labels.
- Group related inputs.
- Use appropriate native input types where possible.
- Show formatting expectations before failure.
- Validate close to the relevant field.
- Preserve valid user input when another field fails.
- Avoid asking for information already known.
- Avoid splitting simple input across unnecessary steps.
- Support autofill where appropriate.
- Allow copy/paste unless a genuine security requirement prevents it.
- Clearly mark optional fields rather than relying on assumptions.
- Use field widths that reflect the expected value when useful, but do not compromise responsive behavior.

## Validation

Prefer validation that helps correction rather than punishment.

- Validate after sufficient input exists to judge correctness.
- Do not show errors while the user is still typing a valid partial value unless the constraint truly requires immediate feedback.
- Keep server-side validation authoritative.
- Preserve entered values after server errors.
- Place summary errors at the top only when users also receive clear field-level guidance.

An error should answer:

- What happened?
- Where did it happen?
- Why, if known?
- What can the user do next?

Prefer `Repository name is already in use. Choose another name.` over `Invalid input.`

## Multi-Step Forms

Use multiple steps when they reduce cognitive complexity or reflect real task stages.

Do not split forms merely to manufacture progress.

- Keep progress indicators truthful.
- Allow backward navigation where safe.
- Preserve entered values.
- Avoid requiring users to remember prior-step information.
- Defer optional questions when they are not needed to complete the current task.

## Interface Writing

Interface copy should reduce uncertainty.

Prefer:

- concrete nouns
- active verbs
- familiar terminology
- concise instructions
- specific errors
- explicit consequences

Avoid:

- unexplained jargon
- vague marketing language inside operational UI
- redundant labels
- clever copy that obscures meaning
- guilt-inducing decline text

Examples:

Prefer `Delete project` over `Proceed`.

Prefer `3 invoices failed to import` over `Something went wrong`.

Prefer `Cancel` over coercive decline copy.

## Labels and Buttons

Action labels should describe the result.

Prefer:

- `Create project`
- `Save changes`
- `Invite member`
- `Generate report`
- `Pay $84.20`

Use `Continue` only when the next step is obvious from context and no more specific action label would improve understanding.

## Microcopy

Remove redundant text only when doing so preserves clarity and accessibility.

Good candidates for reduction:

- `Price: $24.00` → `$24.00` when price context is obvious
- repetitive helper text already conveyed by labels or nearby structure

Do not remove:

- form labels
- units when ambiguity would result
- destructive consequences
- accessibility names
- important state descriptions

## Trust Copy

Be explicit about:

- recurring billing
- free-trial expiration
- cancellation behavior
- data deletion
- permission grants
- irreversible changes
- mandatory charges

Do not bury material conditions in tooltips or low-contrast footnotes.
