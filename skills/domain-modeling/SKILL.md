---
name: domain-modeling
description: Resolve unclear domain vocabulary, identities, ownership, lifecycle, state transitions, and invariants. Use when product language, types, or behavior disagree, not for ordinary architecture cleanup.
---

# Domain modeling

Derive terms from actual user behavior, types, schemas, tests, and existing domain/ADR docs. Establish one canonical term per concept when meanings coincide; preserve distinctions where identity, lifecycle, or policy differs. Make invariants explicit and test them with concrete scenarios, including illegal transitions.

Keep the domain separate from storage fields and framework vocabulary. Document durable terms in `CONTEXT.md` only if they help maintainers; document high-cost decisions with an ADR only when rationale would otherwise be lost. Do not create a glossary or ADR just to demonstrate process.

Return ambiguities, proposed definitions, state/ownership boundaries, examples that distinguish competing interpretations, and the smallest code/documentation changes necessary. Use `references/model-checks.md` when reviewing complicated stateful systems.
