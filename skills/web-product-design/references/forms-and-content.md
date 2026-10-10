# Forms and Content

## Form Design

- Ask only for information the task needs now. Group related fields and show persistent labels.
- Place dependent fields where their relationship is visible; avoid needless multistep pagination.
- Use native input modes and autocomplete where appropriate; support paste and password managers.
- Provide formatting guidance before failure; validate when enough information exists; preserve entered values after errors.
- Clearly label optional fields. Use field widths and helper text meaningfully, not decoratively.
- Expose precision input for financial/quantity ranges when sliders alone cannot express needed values.

## Defaults

Use defaults only when a likely, low-risk, reversible choice exists and its selection is explicit. Never automatically opt users into consent, expensive plans, subscriptions, privacy decisions, or irreversible operations as an anchoring trick.

## Multi-step Workflows

Split steps when they correspond to real stages or reduce complexity, not to manufacture progress. Show truthful progression, allow appropriate back navigation, preserve earlier answers, and keep comparison-relevant constraints visible when selecting dependent options.

## Interface Writing

Prefer concrete nouns and active verbs. Labels should explain the capability (`Places, dishes, cuisines` as search hint when supported) without replacing persistent accessible labels. Favor `Show 41 results` over `Apply` where the count is reliable, and `Pay $84.20` over `Continue` when payment is submitted. Make estimated vs final prices explicit. Explain errors with what happened and the next repair action.

## Trust and Consequences

Disclose recurring billing, trial expiration, fees, permissions, cancellation, data deletion, irreversible results, and material restrictions. Do not bury terms in low-contrast helper text, vague badges, or tooltips. Do not invent savings or pressure users via decline text.
