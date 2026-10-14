# Agent instructions

- Never use an em dash. Be extremely concise; favor concrete facts over explanation.
- Do not add agent attribution, `Generated with Claude Code`, or `Co-Authored-By` to commits, PRs, or comments.
- Prefer correctness, simplicity, robustness, and long-term maintainability to optimizing initial development time.
- Own the affected code path: read its callers, invariants, conventions, tests, and relevant ADRs before changing it.
- Before acting, check whether a simpler or more efficient approach achieves the same outcome. Make the smallest coherent change that preserves required behavior and lowers future change cost. Remove directly superseded paths when justified. Do not introduce speculative layers, wrappers, or policy engines.
- Before building automation or a control plane, try the simplest direct end-to-end path. A skill is instructions, not permission to build infrastructure.
- Reproduce bugs at the user-facing boundary as closely as practical before fixing. Fix encountered failing lint/tests/flakiness within assigned paths. Report unrelated or out-of-scope failures to the coordinator, who assigns separate work when appropriate. Keep unrelated architectural work separately scoped.
- State maintenance tradeoffs, constraints, and remaining risks at handoff.

## Delegation

- Default to direct work. For a single complex engineering request, use `go-for-it`. For explicit parallel teams, several independent tasks, or cross-repo coordination, use `agent-teams`.
- Invoking `agent-teams` explicitly authorizes a bounded team up to its default concurrency limits; do not repeatedly request approval merely to delegate. Explain significant resource/cost tradeoffs and obtain approval before exceeding four active workers or the user's stated budget.
- The main agent owns integration and the final report. Workers may not recursively create teams. Delegate only when isolation, specialization, or independent parallel work materially helps.
- Multiple subagents do not imply multiple worktrees. Parallel read-only work is fine; parallel writers require verified isolated checkouts and non-overlapping ownership, otherwise serialize.
- Task prompts must specify scope, role, unique owner identity, execution directory or session, dependencies, acceptance, evidence, and stop conditions. Never mark work done from a subagent's claim alone.
- Never infer authorization to merge, deploy, release, delete resources, or alter credentials from permission to implement or open a PR.

## Verification

- Do not default to TDD or generate tests solely because code changed. Use existing relevant tests, lint, static checks, and observable behavior.
- Add tests for confirmed defects and meaningful invariants; verify regression tests fail against the broken behavior where practical. Never weaken tests for a green build.
- Have an independent reviewer inspect nontrivial code changes. Resolve valid findings, refresh review after edits, and do manual/user-facing E2E acceptance after review. If blocked, report the limit rather than inventing a pass.
- Distinguish observed evidence, inference, and unchecked assumptions. Unavailable tooling is not a successful check.

## Jev

- Jev is mandatory for semantic judgment when available, including nontrivial reviews, refactors, architecture assessments, specification alignment, and product/documentation boundaries.
- Use `jev_search` when choosing relevant sources requires semantic ranking across unfamiliar files. Use `jev_evaluate` for meaning, intent, quality, architecture, tradeoffs, and semantic acceptance.
- Deterministic checks, exact search, source reading, and CI do not replace Jev semantic review; Jev does not replace them either.
- Do not use Jev for mechanical lookups or known-path reads. Verify cited source normally after Jev. Batch independent questions when practical.
- If Jev fails or is unavailable, disclose that fact and continue with strongest available independent and deterministic evidence; do not silently skip it.

## Maintainability of these instructions

Keep global instructions short and broadly applicable. Put workflow detail in the relevant skill, not here. Prefer replacing obsolete rules to accumulating contradictory ones.
