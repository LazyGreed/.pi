# Pragmatic evolution

Start with the smallest observable vertical slice, not a framework redesign. Find user-impacting friction first. Strong evidence: duplicated policy, repeated regression, leaked constraints, awkward call ordering, shallow indirection, or shared data mutated by unrelated owners.

Make invalid states hard to represent when this protects a meaningful invariant. Separate identity, state transition, and persistence concerns where conflating them demonstrably causes bugs. Use bounded contexts only where a term genuinely has different meanings.

Never force a DDD aggregate, factory, repository interface, event bus, or compatibility shim without a concrete reason. Prefer reversible choices and direct integrations. Validate failure behavior. Refactor the owning path rather than creating parallel old/new pathways indefinitely.

Review output: symptom with file evidence; underlying cause; minimal correction; affected invariants and tests; residual risk. Avoid architecture scorecards without decisions.
