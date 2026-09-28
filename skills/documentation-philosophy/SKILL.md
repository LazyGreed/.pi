---
name: documentation-philosophy
description: Keep repository documentation lean, durable, and resistant to drift. Use when creating, reviewing, reorganizing, or updating README, AGENTS.md, CONTEXT.md, ADRs, docs/, wiki content, architecture docs, or other repository documentation.
---

# Documentation Philosophy

Documentation should contain knowledge that is valuable to humans or agents **and is not better represented by executable artifacts**.

The goal is not more documentation.

The goal is the **smallest durable documentation surface that helps someone correctly understand, use, maintain, or change the system**.

## Core principle

Prefer executable sources of truth over prose.

In descending order, trust:

1. code;
2. tests;
3. schemas/types;
4. configuration and manifests;
5. generated/runtime evidence;
6. durable decision/domain documentation;
7. explanatory prose.

Do not duplicate information from a stronger source into a weaker one unless the duplication materially improves discoverability or usability.

When prose disagrees with executable behavior, investigate the executable behavior first.

## Documentation drift

Documentation that restates implementation details eventually becomes stale.

Avoid prose describing things that can be determined cheaply from:

- source code;
- function signatures;
- types;
- schemas;
- CLI `--help`;
- generated API references;
- configuration definitions;
- tests;
- package manifests;
- repository structure.

Bad:

> `FooService` calls `BarManager`, which invokes `BazRepository`, then returns `FooResult`.

If this is simply the current implementation, the code already says it better.

Useful documentation instead explains:

- why a boundary exists;
- invariants that must remain true;
- terminology;
- externally observable behavior;
- non-obvious constraints;
- operational procedures;
- compatibility requirements;
- decisions and their rationale.

## Document intent, not implementation narration

Good documentation answers questions such as:

- What is this project?
- How do I run it?
- What does the user observe?
- What concepts does the project use?
- What invariants must changes preserve?
- Why was a non-obvious architectural decision made?
- What constraints come from external systems?
- What operational action must a maintainer perform?
- Where is the authoritative source for deeper detail?

Do not write a second version of the codebase in Markdown.

## Source-of-truth ownership

Each kind of knowledge should have one clear owner.

Prefer this split:

### `README.md`

Human entry point.

Owns:

- what the project does;
- supported use cases;
- installation;
- basic configuration;
- common commands;
- short usage examples;
- major limitations;
- links to deeper documentation.

Keep it practical.

Do not turn the README into an architecture manual.

### `AGENTS.md`

Durable instructions for coding agents working in the repository.

Owns:

- repository-specific development constraints;
- required verification;
- source-of-truth rules;
- important architectural boundaries;
- integration/research requirements;
- commands agents repeatedly need.

Only include rules expected to remain useful across many tasks.

Do not use `AGENTS.md` as:

- a changelog;
- an implementation plan;
- a temporary task description;
- a dump of repository architecture;
- duplicated README content.

### `CONTEXT.md`

Domain vocabulary and durable conceptual invariants.

Owns:

- canonical domain terms;
- identities;
- lifecycles;
- important states;
- relationships;
- invariants;
- intentionally rejected synonyms where ambiguity matters.

Do not put implementation walkthroughs in `CONTEXT.md`.

The domain model should survive refactors.

### ADRs

Own significant decisions whose rationale would otherwise be lost.

An ADR should explain:

- context;
- decision;
- meaningful alternatives;
- consequences.

Do not create ADRs for routine implementation choices.

Do not rewrite old ADRs to pretend history was different. Supersede them when the decision changes.

### `docs/`

Own deeper durable material that does not belong in the root entry points.

Examples:

- protocols;
- operational runbooks;
- extension/plugin contracts;
- compatibility requirements;
- integration guides;
- contributor workflows;
- architecture concepts whose rationale is not obvious from code.

Prefer a few strong documents over a hierarchy of overlapping Markdown files.

### Wiki

Treat the wiki as a presentation/discovery surface, not an independent source of truth.

Where the same content belongs in both `docs/` and the wiki:

- choose one canonical source;
- mirror or generate the other where practical;
- do not maintain two independently editable versions of the same documentation.

## Historical design documents

A design document written before implementation is not automatically current architecture documentation.

When a design/spec has served its purpose:

- archive it if its historical context remains useful;
- clearly mark it as historical;
- stop maintaining it as current documentation;
- point readers to the current authoritative sources when necessary.

Do not continuously update old proposal documents until they become an unreliable mixture of historical intent and current behavior.

Archive rather than mutate history.

## When documentation is justified

Add or expand documentation when at least one of these is true:

- the information cannot be inferred reliably from code;
- a user needs it before reading the implementation;
- it records rationale that the implementation cannot express;
- multiple contributors repeatedly need the same non-obvious knowledge;
- an operational process requires ordered human actions;
- terminology needs a canonical definition;
- an external contract must remain stable across implementations;
- a failure mode would be expensive if the constraint were forgotten.

Be suspicious of new documentation when its only justification is:

> It might be useful.

Require a concrete reader and purpose.

## Documentation locality

Place information as close as practical to the thing it governs.

Examples:

- CLI usage → CLI help / README;
- field constraints → schema/type;
- function behavior → tests/code;
- module-specific invariant → module-level docs when necessary;
- domain-wide terminology → `CONTEXT.md`;
- repository-wide agent rule → `AGENTS.md`;
- architectural decision → ADR;
- operational procedure → runbook.

Do not promote local knowledge into global documentation unnecessarily.

## Pointers over duplication

Prefer:

> Plugin packaging rules are defined in `docs/plugins.md`.

over copying the same plugin rules into:

- README;
- AGENTS.md;
- CONTRIBUTING.md;
- wiki;
- several architecture documents.

A short, well-placed pointer is usually cheaper to maintain than duplicated prose.

The pointer must clearly state **when the target should be read**.

Bad:

> See `docs/plugins.md`.

Better:

> Before changing plugin packaging, distribution, or `.kxp` metadata, read `docs/plugins.md`.

## Documentation depth

Use progressive disclosure.

A reader should be able to move from:

```text
README / AGENTS
        ↓
specific durable doc
        ↓
code / schema / tests
```

Do not force every reader or agent to load the entire architecture before performing a small task.

Root documents should remain small.

## Examples over abstract prose

For user-facing behavior, prefer:

- commands;
- configuration snippets;
- input/output examples;
- failure examples;
- concrete workflows.

For architecture, prefer:

- actual invariants;
- actual boundaries;
- actual ownership.

Avoid generic claims such as:

- robust architecture;
- clean separation of concerns;
- highly scalable;
- flexible system;
- modular design.

Explain the concrete property instead.

## Documentation changes

When implementation changes, update documentation only where the documented contract changed.

Typical reasons to update docs:

- public commands changed;
- configuration changed;
- user-visible behavior changed;
- supported integrations changed;
- domain terminology changed;
- an invariant changed;
- a decision was made or superseded;
- installation/deployment changed.

A refactor that preserves these contracts should usually require little or no documentation change.

Large documentation churn caused by an internal refactor is evidence that the docs may be describing implementation too closely.

## Documentation review

When reviewing existing documentation:

1. Identify the intended reader and purpose of each document.
2. Determine the strongest source of truth for each claim.
3. Find duplicated information.
4. Find implementation narration.
5. Find stale or historical design material presented as current.
6. Find documents with overlapping ownership.
7. Consolidate where possible.
8. Replace duplication with pointers.
9. Archive historical material rather than rewriting it.
10. Delete documentation that no longer earns its maintenance cost.

Do not preserve documentation merely because it already exists.

## Deletion test

For any document or section, ask:

> If this disappeared, what important knowledge would become difficult to recover?

If the answer is:

> You could just read the code.

then the documentation may not be earning its maintenance cost.

If deletion would remove:

- rationale;
- user workflow;
- operational knowledge;
- terminology;
- constraints;
- historical decisions;

then it probably has durable value.

## AI-agent documentation

Do not over-document solely for coding agents.

Modern coding agents can inspect:

- repository structure;
- code;
- tests;
- history;
- configuration;
- schemas.

Use documentation to supply what those artifacts cannot efficiently provide:

- repository policy;
- intended domain meaning;
- hidden constraints;
- authoritative terminology;
- required external references;
- non-obvious verification expectations.

More Markdown does not automatically create better context.

Excess documentation can instead create:

- conflicting context;
- stale instructions;
- wasted context-window capacity;
- uncertainty about which source is authoritative.

Optimize for **high-signal context**, not maximum context.

## Final check

Before adding or retaining documentation, ask:

- Who needs this?
- What question does it answer?
- Is there already a stronger source of truth?
- Will normal code changes make this drift?
- Is this rationale, contract, or implementation narration?
- Is the same fact documented elsewhere?
- Could a pointer replace this duplication?
- Does this belong closer to the code?
- Is this historical rather than current?
- Would deleting it lose important knowledge?

If the document cannot justify itself against those questions, reduce or remove it.

## Interaction with other skills

- Use **domain-modeling** to establish terminology and invariants before documenting a domain.
- Use **codebase-design** for architectural reasoning; this skill decides how much of that reasoning deserves durable documentation.
- Use **improve-codebase-architecture** to discover structural problems; do not turn its analysis report into permanent documentation by default.
- Run **unslop** after documentation work to remove generic prose, repetition, and inflated language.

Architecture should live primarily in the architecture.

Documentation should preserve the knowledge that architecture cannot.

