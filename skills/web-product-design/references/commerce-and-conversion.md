# Commerce and Conversion

Conversion design should reduce friction around an action users already understand and intend to evaluate.

Optimize relevance, trust, clarity, effort, uncertainty, and action visibility. Do not optimize conversion through deception or obstruction.

## Trust and Transparency

Clearly expose:

- total price
- recurring billing
- trial expiration
- cancellation implications
- permissions
- data deletion
- irreversible operations
- material limitations
- important defaults

Do not:

- hide mandatory charges
- manufacture scarcity
- fabricate urgency
- create fake progress
- disguise advertisements as product content
- make cancellation harder than signup without justification
- make rejection intentionally difficult
- use guilt or fear to force acceptance

Business goals do not override informed user choice.

## Behavioral Design

Behavioral principles are heuristics, not universal laws. Use them only when they improve legitimate task completion.

### Smart Defaults

**Goal:** reduce repetitive decision-making.

Use when one option is strongly probable, low-risk, clearly visible, and easy to change.

Avoid when financial commitment, consent, privacy, irreversible decisions, or destructive operations are involved.

Validate with correction rate, completion rate, abandonment, and user feedback.

### Choice Reduction

**Goal:** reduce unnecessary cognitive load.

Useful patterns include sensible grouping, progressive disclosure, recommended configurations, search/filter, good defaults, and comparison tools.

Do not remove meaningful options merely to force users toward one outcome.

### Progress

Progress indicators must reflect real progress. Do not invent completed steps solely to create artificial momentum.

If prior work genuinely contributes to completion, it may be represented.

### Upfront Value

Where appropriate, let users experience meaningful value before unnecessary account creation or payment.

Examples:

- preview results
- configure before signup
- test an editor
- calculate an estimate
- inspect a generated report

Do not let users perform substantial work and then unexpectedly trap the result behind an undisclosed registration or payment wall.

### User Investment

If users perform meaningful work before signup, preserve it and clearly explain whether signup is required. Do not threaten unnecessary loss to manufacture sunk-cost pressure.

### Loss Communication

Explain genuine consequences such as unsaved changes, expiring data, deleted resources, or access lost after downgrade. Describe the consequence factually; do not exaggerate or invent loss.

### Price Context

You may show total price, billing cadence, per-unit cost, price difference, savings, or relevant comparisons. Always keep absolute costs visible. Do not use percentages primarily to make meaningful costs appear insignificant.

## Onboarding

Onboarding should help users reach first meaningful value quickly.

- Ask only for information required now.
- Defer configuration that can safely happen later.
- Explain why unusual information is required.
- Provide useful defaults.
- Allow skipping nonessential personalization.
- Preserve user progress.
- Keep progress indicators truthful.
- Prefer doing over explaining when the product can teach through interaction.
- Avoid long tours before users can use the product.

Measure time-to-value, not number of onboarding screens completed.

## Pricing

Pricing interfaces should help users understand differences without spreadsheet-level analysis.

Clearly show:

- price
- billing period
- billing frequency
- included limits
- usage-based components
- material exclusions
- upgrade implications

Use comparison tables when plans genuinely require comparison. Do not hide important limitations in tooltips or footnotes.

A recommended plan may be highlighted when there is a legitimate product reason, but other plans must remain understandable and selectable.

## E-Commerce Product Pages

Product pages should answer, roughly:

1. What is this?
2. Is it relevant to me?
3. What does it cost?
4. Can I trust it?
5. Which option should I choose?
6. When/how will I receive it?
7. What happens if it is wrong for me?
8. How do I buy it?

### Product Identity

Keep visually close:

- product name
- meaningful variant
- price
- rating/review count where available
- key purchase state

Avoid stuffing every attribute into the product title.

### Media

Product media should show the actual item clearly, maintain consistent framing where appropriate, support inspection, and keep overlaid controls legible against variable imagery.

### Variant Selection

Variant controls should expose meaningful names, show unavailable options, communicate price differences, update dependent information immediately, and preserve user selection where possible.

### Quantity and Presets

Use presets only when actual product behavior or analytics indicates common quantities. Keep custom selection available where needed. Do not invent `popular` options without evidence.

### Purchase Action

The purchase area should communicate selected product/variant, quantity, current price, availability, and primary action.

Dynamic totals may be included in the CTA where this improves clarity, for example `Add to cart · $48`.

### Sticky Purchase Controls

Sticky controls may help when purchase intent can arise after extended exploration. Use them only when they do not obscure important content, current selection remains understandable, and mobile viewport consumption remains reasonable.

## Cart and Checkout

Checkout should minimize uncertainty and unnecessary input.

- Keep total cost visible.
- Reveal mandatory fees before final commitment.
- Preserve cart state.
- Support browser autofill where appropriate.
- Avoid forcing account creation when guest checkout is viable.
- Make shipping and delivery expectations clear.
- Keep validation close to inputs.
- Preserve completed fields after errors.
- Distinguish billing and shipping clearly.
- Explain why unusual information is required.
- Make the final commitment action explicit.

Prefer `Pay $84.20` over `Continue` when clicking the button creates a charge.
