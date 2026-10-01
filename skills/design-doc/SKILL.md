---
name: design-doc
description: Write, review, or improve a software design document for a new system or feature. Use for design docs, RFCs, tech specs, architecture proposals, or planning work with meaningful design decisions, cross-team coordination, or infrastructure/API changes.
---

# Writing Software Design Documents

A design doc aligns people on consequential decisions before implementation. Write only enough to make those decisions understandable and reviewable.

## Decide whether a doc helps

Recommend a design doc when the work involves one or more of these:

- coordination across contributors or teams;
- choices that are expensive to reverse, such as a public API, data model, storage system, or trust boundary;
- unresolved requirements or competing approaches;
- risks that are cheaper to identify before implementation.

Project size, duration, or longevity alone do not justify a doc. If the user asks for one, draft or review it regardless of scope.

If important context is missing, ask focused questions about goals, users, constraints, stakeholders, and decisions. When enough is known, proceed and mark remaining assumptions or open questions instead of blocking on minor gaps.

## Calibrate detail

Use the cost of being wrong to decide what deserves space. Explain consequential decisions and credible alternatives. Leave cheap-to-reverse implementation choices to implementation time.

Distinguish facts, assumptions, decisions, and unresolved questions. Prefer concrete constraints and user or system outcomes over generic claims such as "scalable" or "reliable."

## Choose the structure

Read `references/template.md` for a starting point. Keep only sections that serve the doc's audience and decisions.

Most docs need:

- problem and context;
- goals and non-goals;
- proposed design, including important flows and interfaces;
- alternatives and trade-offs;
- risks, rollout, and open questions.

Add details such as data models, security, privacy, SLOs, monitoring, dependencies, or timeline only when they affect the decision or implementation.

## Draft and review

Write for a reader without a verbal briefing. State the objective and problem early. Use concrete scenarios or editable diagrams when they clarify behavior or data flow. Do not invent metrics, deadlines, constraints, or decisions; mark unknowns explicitly.

For reviews, check that the problem, goals, design, important alternatives, risks, compatibility, and rollout are clear enough to make the decision. Focus feedback on consequential gaps, not wording preferences.

Default to Markdown. Do not leave template placeholders in a finished doc. If a critical choice cannot be resolved from available context, ask a targeted question or leave it clearly open.
