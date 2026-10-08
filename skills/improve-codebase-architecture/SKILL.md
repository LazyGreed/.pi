---
name: improve-codebase-architecture
description: Assess and improve an existing codebase's architecture using repository evidence, deep-module design, domain language, and incremental refactoring. Use for architectural friction, shallow modules, misplaced seams, dependency direction, testability, AI-navigability, duplicated policy, or cross-cutting change pain. Do not use for ordinary bug fixes, cosmetic cleanup, or speculative rewrites without concrete pressure.
---

# Improve Codebase Architecture

Use this skill to find **high-leverage architectural improvements in an existing codebase**.

The goal is not "clean architecture", more layers, more interfaces, or a rewrite. The goal is to make the codebase easier to change correctly by concentrating complexity behind **deep modules**, placing **seams** where variation is real, improving **locality**, and making the production **interface** the natural test surface.

Work from repository evidence. Prefer a smaller structural change with a clear payoff over a theoretically cleaner architecture.

## Related skills

When available:

- Use **codebase-design** for the canonical architecture vocabulary and detailed reasoning about **module**, **interface**, **implementation**, **depth**, **seam**, **adapter**, **leverage**, **locality**, the deletion test, real-vs-speculative seams, and test surfaces.
- Use **domain-modeling** when architectural friction is actually caused by overloaded terminology, unclear identity/lifecycle, hidden invariants, or conflicting meanings.

This skill orchestrates an architecture review. It should not duplicate those skills wholesale.

If the related skills are unavailable, use the same concepts directly.

## Activation

Use this skill when the user asks to:

- improve or review codebase architecture;
- find architectural debt or deepening opportunities;
- reduce cross-cutting change cost;
- simplify an over-fragmented module structure;
- improve testability or AI-navigability;
- decide where a seam/interface belongs;
- consolidate duplicated policy or orchestration;
- reshape an existing subsystem without changing its intended behavior.

Do **not** activate merely because:

- a bug exists;
- a function is long;
- a file is large;
- code could be "cleaner";
- a design pattern could be introduced;
- there is only one implementation and no demonstrated need for a seam.

Fix behavior first when architecture has not been shown to be the cause.

# Core rules

## 1. Evidence before architecture

Do not recommend restructuring from filenames or aesthetic preferences.

Inspect enough of the real path to understand:

- production callers;
- entry points;
- state/data flow;
- configuration;
- error handling;
- tests;
- persistence/protocol boundaries;
- relevant recent changes;
- existing documentation and ADRs.

For a focused request, stay focused. For a broad review, inspect repository history and recurring change areas before choosing where to spend attention.

Useful evidence includes:

- the same behavioral change repeatedly touching many unrelated files;
- duplicated validation, normalization, translation, retry, policy, or sequencing;
- callers that must know internal ordering/invariants;
- tests that bypass the production interface because it is unusable as a test surface;
- repeated regressions around one distributed responsibility;
- modules that only forward parameters and return values;
- configuration objects that leak implementation knowledge into every caller;
- two or more implementations proving a real variation seam;
- churn concentrated around a concept whose behavior is scattered.

Churn alone is not proof of bad architecture. Stable code is not automatically good architecture either. Use history as evidence of pressure, not as a scoring system.

## 2. Scope before scan

Honor an explicit subsystem, module, issue, or pain point from the user.

If no scope is given:

1. inspect the repository layout;
2. inspect a useful slice of `git log` / recent changes;
3. identify repeated hot paths or cross-cutting edits;
4. sample the relevant callers/tests;
5. widen only if the first evidence is weak.

Do not perform a repository-wide archaeology exercise when a narrow path already explains the problem.

## 3. Read architectural context first

Before contradicting an existing shape, look for:

- `AGENTS.md`;
- `CONTEXT.md`;
- architecture/design docs;
- `docs/adr/` or equivalent ADR directory;
- package/module-level documentation;
- repository-specific invariants.

An ADR is evidence of a deliberate trade-off, not an untouchable law. Reopen it only when current evidence shows the old trade-off no longer holds or its cost has materially changed.

## 4. Delegate only when it buys isolation or parallelism

Do **not** spawn a subagent by default.

A read-only scout subagent is useful when:

- the repository is large;
- the relevant path crosses several subsystems;
- two independent flows can be mapped in parallel;
- you want an independent post-analysis sanity check.

Keep the primary architectural reasoning in the main agent. Do not recursively delegate architecture opinions.

## 5. Prefer deepening over layering

The default architectural move should usually be one of:

- move repeated policy behind an existing interface;
- collapse shallow pass-through modules;
- consolidate sequencing/invariants into one owning module;
- move translation/normalization to the seam that owns it;
- make one canonical path instead of several almost-equivalent paths;
- shrink a caller-facing interface;
- move tests to the same interface production callers use;
- remove obsolete paths after migration.

Do not create another layer unless it removes knowledge or decisions from callers.

## 6. Real seams only

A seam exists to contain real variation or volatility.

Prefer a seam when:

- multiple adapters already exist;
- the external dependency is demonstrably volatile;
- tests need a stable interface around nondeterministic/expensive I/O;
- policy and mechanism need different lifecycles;
- callers otherwise absorb protocol/vendor-specific behavior.

Be suspicious when:

- there is one implementation;
- the new interface mirrors the concrete type one-for-one;
- the abstraction exists only "in case we switch later";
- no caller becomes simpler;
- the new layer cannot delete or absorb existing code.

Apply the **deletion test**: if deleting the proposed abstraction barely increases caller complexity, it probably does not earn its place.

## 7. Preserve domain meaning

Architecture must follow the domain, not invent it.

If two code paths use the same word for different identities/lifecycles, resolve the domain distinction before designing the module shape.

Use domain terms from `CONTEXT.md` when available. If terminology is unclear, use **domain-modeling** to establish:

- canonical term;
- identity;
- lifecycle;
- invariants;
- relationships;
- avoided synonyms.

Do not automatically edit `CONTEXT.md`. Update documentation only when the user asked for implementation/documentation changes or when the task explicitly includes keeping architecture docs current.

## 8. Optimize for AI-navigability without file proliferation

A coding agent should be able to locate behavior without reading the whole repository.

Prefer:

- one canonical implementation path;
- clear ownership;
- small public interfaces;
- colocated policy and tests;
- explicit typed state;
- names matching the domain;
- predictable dependency direction;
- fewer cross-cutting edits for one behavior change.

Do not equate AI-navigability with more files, wrappers, managers, helpers, or micro-modules.

# Review workflow

## Step 1: Establish the current shape

Map only enough to explain the behavior:

- entry point;
- important callers;
- modules/interfaces;
- state/data flow;
- relevant adapters;
- tests;
- configuration;
- persistence/network boundaries.

For a complex flow, produce a compact ASCII or Mermaid-style sketch in the response if it helps reasoning. Do not generate a separate visual artifact unless requested.

## Step 2: Identify design pressure

For each suspected architectural issue, state the evidence.

Good:

> `resolve()` callers repeat provider-specific refresh timing, error mapping, and retry classification in four paths. Two regressions touched different callers for the same rule.

Bad:

> This file is 900 lines, so it should be split.

Look for pressure in these categories:

### Leaked invariants
Callers must know ordering, state transitions, timing, or validation rules that belong inside the module.

### Distributed policy
One conceptual rule is implemented in many locations.

### Shallow modules
The interface is nearly as complex as the implementation or simply mirrors another interface.

### Misplaced seam
Variation occurs somewhere different from where the current abstraction expects it.

### Low locality
A single behavior change requires touching many distant files.

### Wrong test surface
Important tests bypass the production interface, or integration bugs live between individually-tested helpers.

### Parallel paths
Old/new, sync/async, provider-specific, or frontend/backend paths implement almost the same rule independently.

### Dependency inversion without payoff
Interfaces and adapters exist, but callers are not simpler and no meaningful variation is contained.

### Domain/architecture mismatch
The module shape encodes terminology or lifecycle assumptions that do not match the actual domain.

## Step 3: Reject false positives

Before promoting a candidate, test it against:

- **Deletion test** - does the abstraction actually concentrate complexity?
- **Real seam test** - is there demonstrated variation/volatility?
- **Caller simplification test** - do callers know less afterward?
- **Locality test** - will future changes touch fewer places?
- **Test-surface test** - can important behavior be verified through the production interface?
- **Migration test** - can the old path actually be removed?
- **Behavior-preservation test** - is the refactor separable from product behavior changes?

Reject candidates that fail most of these.

## Step 4: Form candidates

Prefer 2–5 meaningful candidates over a long list of micro-cleanups.

Each candidate should include:

### Candidate: <short name>

**Current shape**
- relevant files/modules;
- current interface/seam;
- callers/adapters.

**Evidence**
- concrete friction;
- duplicated knowledge;
- tests/regressions/churn if relevant.

**Proposed deepening**
- what responsibility moves;
- what interface becomes smaller or more coherent;
- where the seam belongs;
- what becomes private;
- what code/path can be deleted.

**Why it is deeper**
- leverage;
- locality;
- production test surface;
- deletion-test result.

**Migration**
- incremental steps;
- compatibility constraints;
- old path to remove.

**Verification**
- regression tests;
- interface-level tests;
- property/compatibility tests where relevant;
- runtime/UI checks if appropriate.

**Confidence**
- `High` - supported by multiple concrete repository signals.
- `Medium` - evidence is good but some behavior/constraint remains uncertain.
- `Low` - plausible, but currently speculative; usually do not implement without more evidence.

Confidence is evidence quality, not "how much the model likes the idea."

## Step 5: Choose a first move

When the user asks for a broad review, identify the **highest-leverage first move** based on:

- demonstrated change pain;
- amount of duplicated knowledge removed;
- caller simplification;
- regression risk;
- migration size;
- ability to delete old code;
- whether it unlocks later simplification.

Do not choose a visually elegant rewrite over a smaller candidate with stronger evidence.

If the user only requested findings, stop at the review. Do not modify code.

# Implementation workflow

Use this only when the user asks to implement or explicitly approves a candidate.

## 1. Lock behavior

Before restructuring:

- identify existing observable behavior;
- assess existing regression coverage around the production interface;
- add tests only for uncovered, meaningful behavioral risks;
- record compatibility constraints.

Do not mix an architecture refactor with unrelated feature work.

## 2. Move complexity behind the target interface

Prefer moving existing logic first.

Typical sequence:

1. establish or refine the target interface;
2. move one invariant/policy path behind it;
3. redirect callers;
4. run focused tests;
5. move the next path;
6. remove obsolete adapters/helpers/config;
7. run broader verification.

Avoid a flag-day rewrite unless the repository genuinely cannot support incremental migration.

## 3. Delete the superseded path

A refactor that leaves both architectures alive is usually unfinished.

Remove:

- obsolete helpers;
- duplicate translation layers;
- compatibility shims no longer needed;
- dead configuration;
- tests targeting implementation details that no longer exist.

Keep compatibility shims only when an external contract requires them, and state the removal condition.

## 4. Verify at the interface

Run the narrowest checks that prove the architectural claim, then broader project checks appropriate to the change.

Verify:

- production-interface behavior;
- known regressions;
- error paths;
- persistence/protocol compatibility;
- dependency direction if enforceable;
- UI/runtime behavior when relevant.

Do not claim architectural improvement merely because the code compiles.

# Output modes

## Default: concise architecture review

Use normal Markdown. Do not create an artifact by default.

Recommended structure:

### Current shape
Short map of the relevant flow.

### Findings
2–5 evidence-backed candidates.

### First move
The candidate with the clearest leverage/locality payoff and why.

### Not worth changing
Call out tempting abstractions/refactors that do not currently earn their cost.

### Verification
How to prove the proposed change preserves behavior and improves the test surface.

For a narrow question, answer proportionally instead of forcing this template.

## Visual/HTML report: only when requested

If the user explicitly asks for a visual report or HTML artifact:

- create a self-contained report outside the repository unless a destination is requested;
- include before/after diagrams only where they clarify structure;
- prefer embedded CSS/SVG or locally self-contained assets;
- avoid depending on CDN availability unless the user explicitly wants it;
- include concrete file/symbol evidence for every candidate;
- include confidence and migration/verification sections;
- do not use visuals as a substitute for architectural evidence.

A good visual report may include:
- current flow;
- duplicated-policy map;
- proposed ownership map;
- before/after interface surface;
- migration sequence.

# Red flags

Be skeptical of recommendations that:

- split files solely because they are large;
- add `Manager`, `Service`, `Helper`, `Facade`, or `Repository` without a precise responsibility;
- mirror a vendor SDK behind a one-for-one wrapper;
- add interfaces for a single stable implementation with no volatility evidence;
- introduce dependency injection everywhere for testability;
- create more public types than the current design;
- move complexity into configuration rather than hiding it;
- add a new path without removing the old one;
- convert one understandable module into many shallow modules;
- replace explicit state with conventions;
- require callers to orchestrate the new abstraction correctly;
- propose a rewrite before proving incremental migration is insufficient;
- treat "clean architecture" diagrams as evidence.

# ADR and documentation discipline

Do not create an ADR for every architectural refactor.

Consider an ADR only when the decision is:

1. expensive to reverse;
2. surprising without context;
3. a genuine trade-off among credible alternatives.

If those conditions are not met, keep the rationale near the code/tests or existing architecture documentation.

If a proposed change conflicts with an existing ADR:

- cite the conflict;
- explain the new evidence;
- separate "the implementation violates the ADR" from "the ADR may now be wrong";
- do not silently redesign around it.

# Interaction with the Pi/Luna harness

For GPT-6 Luna in Pi:

- use `grep`/`find`/`ls` before large reads;
- use LSP/compiler diagnostics as evidence where relevant;
- use `scout` only for genuinely broad reconnaissance;
- use `reviewer` once after a non-trivial implementation;
- use web research only when current external behavior/specifications matter;
- use browser/devtools for UI/runtime verification;
- let Warden enforce repository-specific safety/completion rules;
- keep the main architecture decision in the parent context.

Do not invoke tools/extensions simply because they are installed.

# Completion criteria

An architecture review is complete when:

- the current shape is understood well enough to explain the friction;
- findings are backed by concrete repository evidence;
- speculative abstractions are filtered out;
- proposed changes identify what knowledge moves behind which interface/seam;
- migration/removal work is explicit;
- verification is explicit;
- the response distinguishes analysis from implementation.

An architecture implementation is complete when:

- behavior is preserved or intentional changes are documented;
- callers are simpler or fewer;
- duplicated policy/knowledge is reduced;
- obsolete paths are removed or have an explicit compatibility reason to remain;
- relevant tests/checks pass;
- documentation/ADRs are updated only when the decision warrants it.
