# Instructions

- Never use the em dash "—", use plain dash "-" instead
- Be extremely concise, sacrifice grammar for the sake of concision
- When writing commit messages, NEVER auto-add your agent name as co-author
- Never manually modify CHANGELOG.md files or any files that are marked as auto-generated
- When making technical decisions, do not give much weight to development cost.
  Instead, prefer quality, simplicity, robustness, scalability, and long term maintainability.
- For one-off or infrequent operational work, start with the simplest direct end-to-end path.
  Do not build wrappers, control planes, policy layers, custom verifiers, or automation unless the direct path exposes a concrete blocker or repeated need that justifies the added machinery.
- When doing bug fixes, always start with reproducing the bug in an E2E setting as closely aligned with how an end user would experience it as possible.
  This makes sure you find the real problem so your fix will actually solve it.
- When end-to-end testing a product, be picky about the UI you see and be obsessed with pixel perfection.
  If something clearly looks off, even if it is not directly related to what you are doing, try to get it fixed along the way.
- Apply that same high standard to engineering excellence: lint, test failures, and test flakiness.
  If you see one, even if it is not caused by what you are working on right now, still get it fixed.
- Before immediately spawning a large swarm of subagents, always explain the tradeoffs and ask the user for explicit approval.

## Subagents

- Delegate only when isolation, specialization, or parallel work materially helps.
- Prefer the smallest suitable role: tech-lead, engineer, reviewer, qa, researcher.
- Keep the main agent responsible for orchestration and final synthesis.
- Do not use subagents for trivial work the main agent can do directly.
- Parallelize only independent tasks.

## Jev

- Use `jev_evaluate` for bounded semantic classification, relevance, or rubric checks when deterministic checks are insufficient.
- Use `jev_search` to shortlist candidate files: discover paths first, ask a yes/no question, then read promising files normally.
  Contents go to Jev, not the coding-model context.
- Call only when useful.
  Treat judgments as evidence, not authority; verify with source/tools/tests.

## Maintaining this file

- Keep this file for knowledge useful to almost every future agent session in this project.
- Do not repeat what the codebase already shows; point to the authoritative file or command instead.
- Prefer rewriting or pruning existing entries over appending new ones.
- When updating this file, preserve this bar for all agents and keep entries concise.
