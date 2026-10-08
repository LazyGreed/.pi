---
name: pragmatic-domain-design
description: Apply pragmatic engineering and domain-driven design to model concepts clearly, centralize invariants, define useful boundaries, reduce coupling, avoid accidental complexity, and evolve codebases without cargo-cult architecture.
---

# Pragmatic Domain Design

Use pragmatic engineering and domain-driven design together to keep software understandable, correct, and proportionate to the problem.

The goal is not to impose architecture. The goal is to discover the important concepts, encode their rules clearly, establish useful boundaries, and avoid unnecessary machinery.

## Core Principle

Design from the problem inward.

Prefer:

```text
domain concepts
→ rules and invariants
→ boundaries
→ application orchestration
→ infrastructure
```

over:

```text
framework
→ database schema
→ service classes
→ domain terminology added later
```

Architecture should make the important behavior obvious and make invalid behavior difficult.

## Start With the Existing System

Before proposing or changing architecture:

1. Inspect the existing implementation.
2. Identify the vocabulary already used by the code and users.
3. Find where important decisions and invariants currently live.
4. Trace one real behavior end to end.
5. Identify actual coupling, duplication, invalid states, and failure modes.
6. Change only what the problem requires.

Do not redesign a codebase from abstract principles before understanding its current behavior.

## Model the Domain, Not the Storage

Ask:

- What concepts exist?
- Which concepts have identity?
- Which are values?
- What states can they occupy?
- Which transitions are legal?
- Which rules must always hold?
- Who owns each rule?
- Which concepts belong together?
- Which concepts mean different things in different contexts?

Do not derive the domain model mechanically from database tables, API payloads, framework classes, or UI forms.

Persistence represents the model. It does not define it.

## Use Ubiquitous Language

Use the same precise terminology in:

- implementation;
- tests;
- APIs;
- documentation;
- issue descriptions;
- architectural discussions.

When two terms mean different things, keep them distinct.

When two terms mean the same thing, prefer one canonical term.

Rename misleading abstractions when improved domain understanding justifies it.

Avoid technically sophisticated names for simple domain concepts.

## Put Rules Where They Cannot Be Bypassed

Business and domain invariants should live with the concept that owns them.

Prefer:

```text
order.cancel()
credential.refresh()
account.suspend()
route.select_target()
```

over arbitrary state mutation such as:

```text
order.status = "cancelled"
account.enabled = false
```

Callers should request meaningful operations rather than manually reconstructing their rules.

Do not scatter the same invariant across controllers, handlers, jobs, and UI code.

## Make Invalid States Difficult to Represent

Prefer types and state models that constrain behavior.

Use:

- validated constructors;
- enums or state machines for mutually exclusive states;
- value objects for values with meaningful invariants;
- explicit optionality;
- domain-specific identifiers;
- bounded types where appropriate.

Avoid collections of loosely related booleans when there is really one state:

```text
is_active
is_suspended
is_closed
```

Prefer:

```text
AccountState::Active
AccountState::Suspended
AccountState::Closed
```

Reject invalid input as close to its source as practical.

## Distinguish Identity From Value

Use an entity when identity persists through change.

Use a value object when equality is determined by value.

Value objects are useful when a primitive carries semantics or invariants, for example:

```text
Money
EmailAddress
ModelId
DateRange
RetryPolicy
Percentage
```

Do not wrap primitives merely to satisfy a pattern. A type should clarify meaning or enforce behavior.

## Use Aggregates Only for Real Consistency Boundaries

An aggregate defines what must remain consistent together.

Use an aggregate when:

- multiple pieces of state participate in the same invariant;
- mutations must be coordinated atomically;
- there is a meaningful root through which those mutations occur.

Keep aggregates as small as possible.

Do not create giant object graphs merely because objects are related.

Relationships do not automatically imply aggregate membership.

## Separate Policy From Mechanism

Keep decisions separate from execution details.

Examples:

```text
RetryPolicy
RetryExecutor

RouteSelectionPolicy
UpstreamTransport

PricingPolicy
BillingPersistence
```

Policy answers:

> What should happen?

Mechanism answers:

> How is it performed?

This makes domain decisions easier to test and infrastructure easier to replace.

## Keep Application Logic and Domain Logic Distinct

Application code coordinates a use case:

```text
load
→ invoke domain behavior
→ persist
→ publish result
```

Domain code decides what is valid and what should happen.

Infrastructure implements external concerns such as:

- databases;
- HTTP;
- queues;
- files;
- provider SDKs;
- operating-system interfaces.

Do not turn application services into bags of business rules.

Do not force pure domain abstractions around code whose behavior is genuinely infrastructure-specific.

## Protect Domain Boundaries

External systems have their own terminology, state models, and quirks.

Translate them at the boundary.

Prefer:

```text
external representation
        ↓
adapter / anti-corruption layer
        ↓
internal model
```

Do not leak provider-specific payloads, status codes, naming, or semantics throughout the codebase unless they are genuinely part of the domain.

Treat protocol translation as semantic translation, not merely field renaming.

## Use Bounded Contexts When Meanings Diverge

A single universal model is not always desirable.

Establish a separate context when:

- the same term has materially different meanings;
- different invariants apply;
- different teams or workflows own the concepts;
- forcing one shared model creates conditional complexity.

Keep boundaries explicit.

Do not split a small system into artificial bounded contexts merely to imitate DDD terminology.

## Prefer High Cohesion and Low Coupling

Things that change together should usually live together.

Things that change independently should not depend unnecessarily on each other.

A component should expose what collaborators need without revealing unrelated internal decisions.

Look for coupling through:

- shared mutable state;
- knowledge of persistence internals;
- provider-specific assumptions;
- temporal ordering;
- duplicated business rules;
- implicit global state.

Reduce real coupling before introducing abstraction layers intended only to look clean.

## DRY Knowledge, Not Syntax

DRY means one authoritative representation of knowledge.

Duplicated syntax is acceptable when the underlying concepts may evolve independently.

Duplication is dangerous when the same rule must remain synchronized in several places.

Before extracting duplication, ask:

> Are these actually the same concept, or do they merely look similar today?

Prefer a small amount of honest duplication over the wrong abstraction.

## Build Vertical Tracer Bullets

For uncertain or new functionality, establish a thin end-to-end implementation early:

```text
input
→ application
→ domain
→ infrastructure
→ result
```

Use it to validate:

- architecture;
- assumptions;
- integration behavior;
- deployment;
- observability;
- performance constraints.

Expand from proven paths rather than independently completing speculative horizontal layers.

## Prefer Reversible Decisions

Do not prematurely lock the system into decisions that can remain flexible.

Especially isolate:

- external providers;
- storage engines;
- serialization formats;
- transport mechanisms;
- deployment-specific concerns.

But do not create interfaces for every concrete type.

Introduce a boundary when there is a real semantic boundary, multiple implementations, meaningful testing need, or credible source of change.

## Fail Close to the Cause

Reject impossible or invalid conditions early.

Prefer:

```text
invalid configuration
→ startup failure
```

over:

```text
invalid configuration
→ latent runtime corruption
→ unrelated failure later
```

Do not silently substitute behavior when correctness depends on knowing that something failed.

Errors should preserve enough context to diagnose their cause.

## Do Not Program by Coincidence

Do not depend on behavior solely because testing happened to show that it works.

For important external or framework behavior:

- inspect the documented contract;
- inspect upstream implementations when appropriate;
- identify assumptions;
- encode critical assumptions in tests.

Distinguish guaranteed behavior from observed behavior.

## Treat Prototypes as Experiments

Prototype to answer a question.

Define the question before prototyping.

A prototype may sacrifice:

- maintainability;
- completeness;
- abstractions;
- error handling.

Production code may not silently inherit those sacrifices.

Either discard the prototype or deliberately harden it.

## Automate Repeatable Mechanics

Automate tasks that should behave deterministically:

- formatting;
- linting;
- tests;
- builds;
- migrations;
- generation;
- packaging;
- release validation.

Keep human attention for judgment and decisions.

Do not automate a poorly understood process simply to hide its complexity.

## Test Invariants and Boundaries

Tests should protect behavior, not implementation shape.

Prioritize tests for:

- domain invariants;
- state transitions;
- protocol boundaries;
- compatibility contracts;
- regressions;
- failure behavior;
- concurrency where relevant.

Add regression tests selectively when they reproduce a confirmed failure and 
protect against recurrence. Prefer independent behavioral evidence over tests 
derived from implementation assumptions. Do not weaken tests to make a change 
pass.

## Refactor Toward Deeper Insight

The first model is rarely the final model.

When new understanding reveals that the current abstraction is wrong:

1. update the terminology;
2. move ownership of rules if necessary;
3. simplify the model;
4. remove obsolete abstractions;
5. update tests around the improved behavior.

Prefer conceptual simplification over adding another compatibility layer around a bad model.

## Avoid Pattern Cargo Culting

DDD does not require:

- repositories for every object;
- factories for trivial construction;
- domain events for every mutation;
- aggregates around every relationship;
- service classes for every operation;
- separate packages for every layer;
- CQRS;
- event sourcing;
- microservices.

Introduce a pattern only when it solves a demonstrated problem.

Simple code with clear semantics is preferable to ceremonial architecture.

## Review Checklist

When reviewing or designing a change, ask:

### Domain

- Are the important concepts named correctly?
- Is domain language consistent?
- Are invalid states representable?
- Are important transitions explicit?
- Does each invariant have one clear owner?

### Boundaries

- Are domain decisions separated from infrastructure?
- Are external semantics translated at the boundary?
- Is coupling necessary and explicit?
- Does this abstraction correspond to a real conceptual boundary?

### Pragmatism

- Is this the simplest design that preserves the required behavior?
- Is abstraction solving an observed problem?
- Are decisions unnecessarily irreversible?
- Is duplicated knowledge being introduced?
- Is unrelated architecture being changed?

### Correctness

- Are failure modes explicit?
- Are important assumptions verified?
- Are contracts preserved?
- Are regressions covered?
- Do relevant checks pass?

## Default Decision Rule

When several designs are correct, prefer the one that:

1. expresses the domain most clearly;
2. centralizes important invariants;
3. creates the fewest unnecessary dependencies;
4. introduces the least accidental complexity;
5. remains easy to test;
6. keeps likely future decisions reversible;
7. changes the smallest coherent part of the system.

Do not optimize for theoretical architectural purity.

Optimize for a codebase whose behavior can be understood, changed, and verified safely.
