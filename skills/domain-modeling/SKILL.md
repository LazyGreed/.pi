---
name: domain-modeling
description: Build or sharpen a project's domain language and invariants. Use when terminology is overloaded or inconsistent, domain concepts/lifecycles are unclear, code and product language disagree, CONTEXT.md needs updating, or a durable architectural/domain decision may deserve an ADR. Do not use merely to read an existing glossary.
---

# Domain Modeling

Use this skill when **the meaning of the system is unclear**, not merely when code structure is awkward.

The goal is a precise ubiquitous language: one canonical term per concept where practical, explicit distinctions between concepts, concrete invariants, and documented hard-to-reverse decisions.

Work from evidence. Read existing domain docs, relevant code, schemas, tests, APIs, and user-facing language before inventing terminology.

## Activation test

Use this skill when one or more are true:

- one word refers to multiple concepts,
- multiple words refer to the same concept and cause confusion,
- entity identity or ownership is unclear,
- lifecycle/state transitions are ambiguous,
- product language and code disagree,
- an invariant is only implicit in implementation,
- a cross-cutting decision is difficult to reverse and needs rationale preserved,
- the user explicitly asks to build/update a glossary, `CONTEXT.md`, or ADR.

Do **not** invoke it just because `CONTEXT.md` exists. Reading established vocabulary is normal repository hygiene.

## Evidence order

Before changing the domain model, inspect the most relevant available sources in roughly this order:

1. `CONTEXT-MAP.md`, `CONTEXT.md`, glossary/domain docs.
2. Relevant ADRs.
3. Public/user-facing behavior and terminology.
4. Types, schemas, persistence models, protocol objects, and state machines.
5. Business rules and orchestration code.
6. Tests demonstrating allowed/forbidden scenarios.
7. Comments/names only when stronger evidence is absent.

If sources conflict, surface the conflict. Do not silently choose whichever wording is convenient.

## Distinguish these kinds of statements

Keep them separate:

- **Term definition** — what a concept means.
- **Invariant** — what must always be true.
- **Lifecycle/state transition** — how a concept can change over time.
- **Relationship/cardinality** — how concepts relate.
- **Policy** — a changeable product/business decision.
- **Implementation detail** — how current code realizes the model.
- **Architectural decision** — a durable implementation/design choice with trade-offs.

A glossary should not become a dumping ground for implementation details or transient policy.

## Modeling discipline

### 1. Challenge overloaded terms

When one word carries multiple meanings, split the concepts before designing APIs or types.

Example pattern:

- “Account” currently means login identity, billable customer, and upstream credential container.
- Propose separate canonical terms.
- Show concrete scenarios where treating them as one thing breaks down.

Do not rename concepts just for stylistic preference. Require a semantic distinction or demonstrated ambiguity.

### 2. Collapse accidental synonyms

If two names mean the same thing, choose one canonical term and mark the other as avoided/deprecated language.

Prefer the term already dominant in public behavior or domain documentation unless there is a strong reason to change it.

### 3. Stress-test with scenarios

Use concrete cases to discover hidden distinctions and invariants.

Useful probes:
- Can A exist without B?
- Can one A belong to many B?
- What happens if B is deleted/disabled/expired?
- Is this replacement, mutation, or a new identity?
- Which state owns this fact?
- Is this state observable to users or only implementation-local?
- Can the operation partially succeed?
- What happens under retry/replay/duplication?

Favor scenarios drawn from actual repository behavior over invented edge cases when possible.

### 4. Cross-check code against language

When a stated rule disagrees with code/tests/data shape, report both sides.

Do not immediately “correct” the code or glossary. Determine whether:
- documentation is stale,
- implementation is wrong,
- there are two distinct concepts hidden under one term,
- or an undocumented compatibility constraint exists.

### 5. Make invariants explicit

Good domain modeling should produce statements that can guide code and tests, for example:

- A Route references one logical model but may resolve to multiple Targets.
- A credential lease may be absent when upstream expiry is unknown.
- Disabling a Target does not delete its historical usage records.

When appropriate, suggest encoding invariants in types, schemas, constraints, state machines, or tests rather than relying only on prose.

## CONTEXT.md discipline

If the project uses `CONTEXT.md`, treat it as a **domain glossary**, not a design document.

Create/update it only when the user asked for repository modification or the current workflow explicitly authorizes file edits. Otherwise, return a proposed entry/patch.

If `CONTEXT-MAP.md` exists, update the context-specific glossary it points to rather than assuming a single root context.

Create missing glossary files lazily: only when there is a resolved concept worth recording.

Recommended entry format:

```markdown
### <Canonical Term>
<One or two sentences defining the concept in domain language.>

- **Invariant:** <only when useful>
- **Relates to:** <other canonical terms, only when useful>
- **Avoid:** `<ambiguous synonym>`, `<deprecated term>`
```

Keep entries short. If an entry needs implementation walkthroughs, endpoint details, migration plans, or long rationale, that material belongs elsewhere.

Regularly remove obsolete synonyms and redundant prose. A good glossary can shrink as the model improves.

## ADR discipline

Create or propose an ADR only when **all three** are true:

1. **Hard to reverse** — changing the decision later has meaningful migration, compatibility, operational, or organizational cost.
2. **Surprising without context** — a future maintainer is likely to ask why this choice was made.
3. **Real trade-off** — credible alternatives existed and the choice sacrifices something meaningful.

If any test fails, do not create an ADR.

A domain term by itself normally belongs in `CONTEXT.md`, not an ADR.

Recommended ADR shape:

```markdown
# ADR-NNNN: <Decision>

## Status
Accepted

## Context
What forced the decision. State relevant domain constraints and existing behavior.

## Decision
What is being chosen, precisely.

## Alternatives considered
- <Alternative>: <why not chosen>

## Consequences
### Positive
- ...

### Negative / trade-offs
- ...

## Compatibility / migration
Only when relevant.
```

Do not manufacture an ADR number if repository numbering rules are unknown; inspect existing ADRs first.

## Interaction style

When ambiguity materially affects the model, ask a **small, concrete question** or present the conflicting interpretations.

Good:
> `Account` currently appears to mean both a user identity and an upstream credential holder. Should those have independent lifecycles?

Bad:
> Can you explain your domain model in more detail?

If repository evidence resolves the ambiguity, do not ask the user unnecessarily.

## Output format for analysis

When the user wants a domain-model review, default to:

### Ambiguities
- overloaded/synonymous terms
- code/docs conflicts

### Proposed model
For each affected concept:
- canonical term
- definition
- identity/lifecycle
- invariants
- relationships
- avoided terms

### Scenarios checked
- concrete edge cases that validate the distinctions

### Documentation changes
- proposed `CONTEXT.md` entries
- ADR only if it passes all three ADR tests

### Code implications
- types/schemas/interfaces/tests that should align with the model

For small questions, answer proportionally rather than forcing this template.

## Interaction with codebase-design

Use **domain-modeling** for *what concepts mean*.

Use **codebase-design** for *where behavior belongs and what interface/seam should expose it*.

A common sequence is:

1. Resolve domain terms/invariants.
2. Use those terms to name modules and interfaces.
3. Place seams around real variation.
4. Verify tests express domain behavior through those interfaces.

Do not let architecture invent domain semantics merely because they make code easier to organize.

## Source and adaptation

Adapted from Matt Pocock's `domain-modeling` skill. This version is self-contained and tuned for Pi/ChatGPT coding harnesses: repository evidence first, explicit separation of glossary/invariants/policy/implementation, cautious file mutation, concrete scenario testing, and embedded `CONTEXT.md`/ADR formats instead of external dependencies.
