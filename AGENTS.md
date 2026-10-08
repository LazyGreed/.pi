# Instructions

- Never use the em dash "—", use plain dash "-" instead
- Be extremely concise, sacrifice grammar for the sake of concision
- Never add 'Generated with Claude Code', Co-Authored-By, or any agent 
  attribution to commits, PR descriptions or comments
- When making technical decisions, do not give much weight to development cost.
  Instead, prefer quality, simplicity, robustness, scalability, and long term 
  maintainability.
- For one-off or infrequent operational work, start with the simplest direct 
  end-to-end path. Do not build wrappers, control planes, policy layers, 
  custom verifiers, or automation unless the direct path exposes a concrete 
  blocker or repeated need that justifies the added machinery.
- When doing bug fixes, always start with reproducing the bug in an E2E 
  setting as closely aligned with how an end user would experience it as 
  possible. This makes sure you find the real problem so your fix will 
  actually solve it.
- Apply that same high standard to engineering excellence: lint, test 
  failures, and test flakiness. If you see one, even if it is not caused 
  by what you are working on right now, still get it fixed.
- Before immediately spawning a large swarm of subagents, always explain 
  the tradeoffs and ask the user for explicit approval.

## Subagents

- Delegate only when isolation, specialization, or parallel work materially 
  helps.
- Prefer the smallest suitable role: tech-lead, engineer, reviewer, qa, 
  researcher.
- Keep the main agent responsible for orchestration and final synthesis.
- Do not use subagents for trivial work the main agent can do directly.
- Parallelize only independent tasks.

## Testing and verification

- Do not use TDD by default.
- Do not generate tests merely because code changed.
- Run existing relevant tests, lint, and static checks.
- Add tests when they independently verify specified behavior, reproduce 
  a confirmed defect, or protect a meaningful invariant.
- Prefer observable behavior and production interfaces over 
  implementation-specific assertions.
- For regression tests, verify they fail against the broken implementation 
  when practical.
- Never weaken existing tests to make an implementation pass.
- Keep independent review before final manual E2E verification.
- For bug fixes, reproduce the original failure first.

## Jev

- Use Jev for semantic judgment. This is mandatory, not optional.
- Use `jev_search` when locating or ranking relevant code/docs requires 
  semantic relevance, especially across unfamiliar or multiple files.
- Use `jev_evaluate` when judging meaning, intent, quality, alignment, 
  architecture, tradeoffs, ambiguity, categorization, or whether an 
  implementation satisfies requirements.
- Reviews, refactors, architecture work, spec/code alignment, and 
  documentation/product-boundary checks MUST use Jev at least once when they 
  involve semantic judgment.
- Green CI, tests, `rg`, source inspection, or runtime checks do not replace 
  Jev for semantic judgment. They establish deterministic facts; Jev evaluates 
  meaning.
- If two reasonable reviewers could disagree based on interpretation rather 
  than an exact fact, use `jev_evaluate`.
- If you do not know which sources matter without reading many candidates, 
  use `jev_search` before broad reads.
- Do not use Jev for exact lookups, syntax, mechanical verification, 
  known-path reads, or facts deterministically answered by tools.
- Read and verify selected source normally after Jev. Jev output is evidence, 
  not authority.
- Batch independent Jev questions when practical.
- If Jev is required but unavailable or fails, say so explicitly and continue 
  with the strongest deterministic evidence available. Never silently skip it.
- Before finishing any non-trivial review or analysis, check: **Did this task 
  require semantic judgment? If yes and no Jev call was made, use Jev before 
  answering.**

## Maintaining this file

- Keep this file for knowledge useful to almost every future agent session in 
  this project.
- Do not repeat what the codebase already shows; point to the authoritative 
  file or command instead.
- Prefer rewriting or pruning existing entries over appending new ones.
- When updating this file, preserve this bar for all agents and keep entries 
  concise.
