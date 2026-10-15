---
name: architecture
description: Evaluate or change codebase structure, module seams, dependency direction, integration boundaries, architectural debt, and pragmatic refactoring. Apply to consequential design questions, not routine bug fixes.
---

# Architecture

Start from actual code and observed change pressure. Follow one real behavior through its callers, data, errors, and tests before proposing any structural change. Optimize for deep modules: simple interfaces hiding meaningful behavior, with invariants and policies located at the responsible seam.

Ask whether deleting an abstraction would make complexity spill into multiple callers. Avoid speculative interfaces, service layers, state machines, wrappers, and separate policy engines. Consolidate duplicate knowledge, not similar-looking syntax. Prefer one coherent vertical change to broad reorganization.

When reviewing an existing system, distinguish confirmed friction (distributed policy, leaked invariant, wrong boundary, unstable contract) from taste. Include concrete file evidence, first viable change, compatibility risks, and what *not* to refactor. For implementation, preserve observable behavior except the explicitly requested change; delete directly obsolete paths and verify through real interfaces.

Use `references/deep-modules.md` for seam/interface analysis, `references/pragmatism.md` for incremental redesign. If the problem is terminology or lifecycle identity, load `domain-modeling` instead of stretching this skill.
