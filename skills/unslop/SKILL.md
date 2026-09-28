---
name: unslop
description: Remove repetitive AI-default phrasing and structure from human-facing prose while preserving facts, technical meaning, code, citations, and the author's intended register. Use as a final cleanup pass for docs, specs, PR text, reviews, explanations, README/AGENTS content, and other prose. Do not apply mechanically to source code or quoted text.
---

# Unslop

Use this skill as a **final prose-quality pass**.

The goal is not to make text casual, quirky, or artificially "human." The goal is to remove generic model defaults so the writing sounds specific to the task, domain, and author.

For this user's coding workflow, default to a concise senior-engineer register: direct, specific, low-fluff, and comfortable with technical jargon. Do not sacrifice necessary detail just to make the text shorter.

## When to use

Apply this skill when producing or revising:

- PR reviews and review comments;
- issue/PR specs;
- architecture reports;
- README/AGENTS/pi-warden documentation;
- implementation notes;
- coding explanations;
- release notes;
- commit-message suggestions;
- technical emails/messages;
- user-facing prose generated from analysis.

Do not invoke it just because code exists in the response.

Do not rewrite:

- source code semantics;
- exact shell commands;
- identifiers;
- schemas;
- error messages;
- quoted upstream text;
- citations;
- numbers/dates;
- contractual wording that must remain exact.

## Core contract

### Preserve meaning before style

Never "improve" prose by changing facts, scope, qualifiers, negation, uncertainty, causality, severity, compatibility claims, technical constraints, names, versions, IDs, commands, or paths.

### Cut empty framing

Remove or rewrite phrases that merely announce the prose, such as "Here's the thing", "The key point is", "It's important to note", "Let's dive in", "Let's break this down", and similar filler.

### Avoid fake conversational emphasis

Do not add "Honestly?", "To be blunt", "Real talk", "Let that sink in", fake suspense, or rhetorical questions whose answers immediately follow. State the information.

### Avoid stock contrast patterns

Use `not X but Y` and similar constructions only when the distinction genuinely matters. Prefer concrete consequences.

### Do not over-section

Use headings only when they help navigation. Short technical answers usually need a few paragraphs or one compact list, not a template of Summary / Problem / Why it matters / Solution / Next steps.

### Avoid repetitive restatement

Do not state the same conclusion in the opening, a bullet, a bottom line, and a final summary.

### Prefer concrete nouns and verbs

Prefer:

> `snapshot_at()` zeroes the failure EWMA while a provisional stream is open.

over vague abstractions about "an issue in the current implementation".

### Preserve useful technical jargon

Keep exact domain terms when they are the right words. Explain them only when the target reader may not know them.

### Avoid adjective inflation

Remove unsupported words such as robust, seamless, powerful, comprehensive, elegant, sophisticated, scalable, production-ready, and critical. State the property instead.

### Calibrate certainty

Match wording to evidence: `does` for established facts, `likely` for strong but incomplete evidence, `may/can` for plausible effects, and `I couldn't verify` when evidence is missing.

### Keep list items parallel

Use consistent grammatical shape across bullets.

### Avoid punctuation/style tics

Do not overuse em dashes, semicolons, parentheses, bold fragments, emoji, or one-sentence paragraphs.

## Technical-writing pass

### PR review comments

Prefer:
1. concrete bug/invariant;
2. minimal consequence or reproduction;
3. exact required fix;
4. regression test.

Do not pad with praise or generic summaries.

### Specs

Each requirement should state what changes, where, required behavior, compatibility/failure constraints, or acceptance tests. Delete prose that only says the implementation should be "clean", "robust", or "proper".

### Architecture analysis

Tie recommendations to repository evidence.

Prefer:

> Three callers duplicate the same refresh-timing rule.

over:

> The architecture could benefit from improved separation of concerns.

### README/docs

Prefer examples, commands, constraints, and observable behavior over marketing language.

### Commit messages

Use imperative, scoped language.

Prefer:

> `fix(auth): preserve unknown token expiry`

over:

> `Improve authentication token handling`

## Rewrite procedure

1. Identify facts and constraints that must survive unchanged.
2. Remove duplicated claims and empty framing.
3. Replace abstract wording with concrete subjects/actions.
4. Collapse stock rhetorical structures.
5. Normalize headings/lists only where useful.
6. Check uncertainty and qualifiers.
7. Verify code, commands, identifiers, numbers, links, and citations were not altered.
8. Read once for rhythm without manufacturing personality.

## Generation procedure

1. Start with the substantive point.
2. Use the domain's actual nouns and symbols.
3. Include only structure the reader needs.
4. State consequences concretely.
5. Separate facts from recommendations.
6. End when the task is complete.

## Do not overcorrect

Do not create a new stock style. Do not make everything fragmentary, remove all transitions, force slang, add personality for its own sake, aggressively shorten needed detail, turn formal docs chatty, or eliminate every heading.

A phrase is a problem when it is generic, repetitive, or weaker than a more specific alternative in context.

## Final validation checklist

- Does every paragraph add information?
- Is the first sentence substantive?
- Are claims as specific as the evidence allows?
- Did I repeat the same conclusion?
- Did I use generic praise or filler?
- Did I add rhetorical contrast or suspense unnecessarily?
- Are headings/list items doing real work?
- Are technical terms precise?
- Did all facts, qualifiers, identifiers, code, commands, numbers, and citations survive?
- Does this sound like this task rather than a reusable AI template?

If yes, return it without describing the cleanup pass unless the user asked for an audit.

## Interaction with other skills

- Run **unslop after** `codebase-design`, `domain-modeling`, or `improve-codebase-architecture` has produced the substantive reasoning.
- Do not let unslop change architectural conclusions.
- Do not let unslop rewrite source code.
- For PR review, the review process finds bugs; unslop tightens the wording.
- For specs, planning decides requirements; unslop removes generic prose and duplication.

## Source and adaptation

Adapted from the public `mshumer/unslop` concept: identify repetitive model defaults and turn them into reusable avoidance guidance.

This version is self-contained for Pi/GPT-6 Luna. It does not require cloning or running the generator repo for every use.
