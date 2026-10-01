---
name: codebase-design
description: Design or improve codebase structure using deep-module vocabulary. Use for interface shape, seam placement, dependency direction, testability, AI-navigability, architectural refactors, or evaluating whether an abstraction earns its keep. Do not use for ordinary bug fixes or naming/domain-language disputes.
---

# Codebase Design

Use this skill to reason about the **shape of code**, not to run a generic refactor process.

The objective is to create **deep modules**: substantial behavior behind a small, stable interface, located at a real seam, with tests crossing the same interface callers use.

Prefer evidence from the repository over abstract architecture advice. Inspect relevant callers, implementations, tests, configuration, and change history before recommending a structural change.

## Canonical vocabulary

Use these terms consistently when discussing architecture.

- **Module** - anything with an interface and an implementation: a function, type, package, subsystem, or tier-spanning slice. Avoid vague substitutes such as “component” or “service” when the architectural role is what matters.
- **Interface** - everything a caller must know to use a module correctly: callable surface, accepted data, invariants, sequencing rules, errors, configuration, side effects, and relevant performance behavior. This is broader than a language-level interface or API signature.
- **Implementation** - behavior hidden behind the interface.
- **Depth** - leverage provided by an interface: how much useful behavior callers get relative to how much interface they must understand. Deep modules hide meaningful complexity; shallow modules mostly move complexity into callers.
- **Seam** - a place where behavior can vary without editing the caller at that location. A seam is where a module interface lives. Prefer **seam** over the overloaded word “boundary.”
- **Adapter** - a concrete implementation occupying a seam. “Adapter” describes its role, not its internal size or technology.
- **Leverage** - benefit to callers from centralizing behavior behind the interface.
- **Locality** - benefit to maintainers when knowledge, change, bugs, and verification stay concentrated rather than duplicated across callers.

## Core principles

### 1. Optimize the interface, not implementation line count

A module is deeper when callers need to know less while receiving more behavior.

Ask:
- Can callers provide less configuration?
- Can several operations collapse into one coherent operation?
- Can sequencing/invariants move inside the module?
- Can the module own error normalization or policy currently repeated by callers?
- Can internal complexity remain private without reducing useful capability?

Do **not** measure depth by implementation-lines/interface-lines. Padding internals does not improve design.

### 2. The interface is the test surface

Prefer tests that exercise the same seam production callers cross.

If robust tests repeatedly need to bypass the interface and reach deep implementation details, investigate whether:
- the interface exposes the wrong capability,
- responsibilities are mixed,
- the chosen seam is misplaced,
- or the test is overspecified.

Internal seams are fine when they serve implementation-local variation or focused tests. Do not automatically promote them into public architecture.

### 3. Use the deletion test

Imagine deleting the abstraction.

- If almost no complexity reappears, the module may be a pass-through or naming layer.
- If significant policy, orchestration, validation, protocol handling, or duplication spills into many callers, the module is likely earning its place.

A wrapper can still be valuable when it deliberately establishes a stable seam around a volatile dependency, but state that reason explicitly.

### 4. Prefer real seams over speculative seams

One implementation usually means a seam is hypothetical.

Introduce or preserve an explicit seam when there is concrete evidence of variation, such as:
- two implementations,
- production vs deterministic test implementation,
- multiple upstream protocols/providers,
- runtime-selected strategies,
- a known unstable external dependency that requires containment.

Do not manufacture interfaces merely because dependency injection is fashionable.

### 5. Accept dependencies; do not hide important construction

Construction belongs where lifecycle/configuration decisions are known. A module should not secretly instantiate significant external dependencies if doing so prevents substitution, deterministic testing, lifecycle management, or policy control.

Do not push every trivial pure helper through dependency injection.

### 6. Prefer results over invisible effects

Where practical, make important outcomes explicit in return values or typed state transitions. Side effects are acceptable, but their semantics should be part of the interface and concentrated behind a clear seam.

### 7. Replace, do not layer, when deepening

A refactor intended to deepen a module should normally **remove** duplicated/shallow paths rather than add a new abstraction while leaving the old complexity in place.

Watch for:
- new facade + old facade both surviving indefinitely,
- duplicate validation on both sides of a seam,
- adapters that merely rename calls,
- compatibility layers with no removal plan.

## Evidence-first design workflow

When this skill is invoked on a real codebase:

1. **Locate the behavior.** Identify the main module, callers, dependencies, tests, and configuration involved.
2. **Describe the current interface.** Include hidden requirements callers must know, not just method names.
3. **Trace complexity leakage.** Find duplicated policy, sequencing, branching, conversions, error handling, or configuration outside the module.
4. **Identify the real seam.** State what actually varies and why this location is the right place to isolate it.
5. **Evaluate depth.** Apply leverage, locality, deletion test, and test-surface principles.
6. **Propose the smallest structural change that improves depth.** Prefer moving existing complexity over creating new abstractions.
7. **State migration/removal work.** Identify old paths that should disappear.
8. **Define verification.** Specify tests/checks at the interface, plus any compatibility/property/regression tests needed.

Do not modify code merely because this reference skill was loaded. If the user asked only for analysis/design, return analysis/design.

## AI-navigability

Architecture should also be easy for coding agents to understand without reading the whole repository.

Prefer:
- one canonical implementation path,
- names that expose responsibility,
- colocated policy and tests,
- explicit typed state rather than hidden convention,
- small public surfaces,
- predictable module ownership,
- fewer cross-cutting edits for one behavioral change.

Treat “AI-navigable” as a locality constraint, not a reason to create more files or wrappers.

## Red flags

Investigate these before accepting a design:

- pass-through wrappers with no policy or containment value,
- interfaces mirroring a vendor SDK one-for-one,
- callers required to reproduce internal sequencing,
- repeated translation/validation/error mapping across callers,
- one behavioral change requiring edits across unrelated modules,
- tests coupled to private internals,
- public abstractions created for a single speculative implementation,
- huge option/config objects that transfer implementation knowledge to callers,
- “manager/service/helper” modules whose responsibility cannot be stated precisely,
- a refactor that adds a new layer without deleting an old one.

## Output format for a design review

When the user asks for an architectural assessment, default to:

### Current shape
- module/interface/seam involved
- callers and implementations
- leaked complexity/invariants

### Design pressure
- concrete evidence of friction
- why the current module is shallow or the seam is misplaced

### Proposed shape
- new or changed interface
- behavior hidden behind it
- adapters/implementations, if genuinely needed
- code paths removed or consolidated

### Why it is deeper
- leverage
- locality
- deletion test
- test surface

### Verification
- regression tests
- interface-level tests
- compatibility/migration checks

For small questions, answer proportionally; do not force the full template.

## Interaction with other skills

- Use **domain-modeling** when the problem is terminology, identity, lifecycle meaning, invariants of domain concepts, or ambiguous words.
- Use a debugging skill when behavior is broken but architecture is not yet shown to be the cause.
- Use TDD when implementing concrete behavior and a red-green loop is useful.
- Use repository-specific architecture rules and ADRs over generic advice when they conflict, and surface the conflict explicitly.

## Source and adaptation

Adapted from Matt Pocock's `codebase-design` skill and its deep-module vocabulary. This version is intentionally self-contained and tuned for Pi/ChatGPT coding harnesses: evidence-first repository inspection, minimal speculative abstraction, explicit AI-navigability, and no dependency on adjacent skill files.
