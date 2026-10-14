# Coordination protocol

Read when using concurrent writers, cross-repository teams, or continuing work across sessions.

## Authority and topology

- The current Pi session is the coordinator and sole authoritative integration reporter. Team names group tasks by outcome, not persistent autonomous agents.
- One task, one accountable owner. One integration owner per repository. Independent reviewers do not modify the implementation under review.
- Worker profiles are reusable roles, not permanent employees. Start them only for bounded tasks. Never recurse into unsupervised subagents.
- Profile text and a missing `edit` tool are not OS-level read-only enforcement. Agents with shell access and test commands can still mutate files. Keep review/QA out of concurrent writer checkouts; use read-only filesystem permissions if strict isolation is required.
- The repository issue/PR system or approved task ledger is the authority for durable state; a conversation ledger is ephemeral.
- Do not build a homegrown orchestration service, worker heartbeat, or queue because a skill mentioned them.

## Task state

`queued` means dependencies or definition are incomplete; `ready` means they are satisfied. `running` requires an observed task invocation, not intention. `review` requires an actual diff/result. `integration` requires a designated owner and known baseline. `done` requires an accepted artifact and verification. `blocked` describes a missing decision/resource. `failed` describes execution or verification failure and recorded evidence.

Permitted normal transitions:

- `queued -> ready -> running -> review -> integration -> done`
- `running/review/integration -> blocked` when authority or prerequisites are missing
- `running/review/integration -> failed` on demonstrable errors; retry only with new evidence or a corrected plan
- `failed/blocked -> ready` once the reason is resolved

Do not set `done` from a child's success message. Detect stale active work on resume; confirm the session/process/branch actually exists before treating it as running.

## Dependency and collision rules

- Dispatch only tasks whose prerequisite artifacts have been validated, not merely reported complete.
- Shared migrations, schema changes, public interfaces, generated code, CI workflows, and the same path are collision domains. Assign one writer or sequence using explicit integration boundaries.
- At task start, record baseline commit and reserved paths/interfaces. At handoff, include changed paths and any unexpected overlap. If overlap appears, stop both writers and reassign boundaries or sequence the changes.
- A Git branch alone does not isolate files; a **separate checkout/worktree and verified process cwd** does. Do not run two edit-capable subagents in the same checkout concurrently.
- Prefer one PR per independently testable change; group only genuinely inseparable changes. Integration owner rebases/merges branches and handles conflicts only with permission.
- No shared `git reset --hard`, `git clean -fdx`, force pushes, worktree removal, or stash operations without explicit authority and verification of user data.

## Handoffs

A handoff must include: task ID, desired behavior, actual changed files, branch and baseline SHAs, relevant commands/tests and results, E2E status, security/performance considerations, unresolved findings, and exact next owner/action. Never use vague completion claims or require the integrator to reconstruct all context from a long transcript.

## Review

- Reviewer receives task contract, baseline, full diff, relevant surrounding code, and acceptance criteria; not just implementer summary.
- Categorize findings by severity and include path/line, evidence, and concrete failure. Reject speculative suggestions lacking impact; fix all valid actionable findings regardless of priority within scope.
- Reviewer cannot certify their own code. Jev is required for semantic interpretation when available; if unavailable, document the gap and continue with strongest deterministic evidence.
- Update verification after any changed diff; do not reuse a previous review as approval of a new patch.
- E2E is the final practical check, performed after independent review. Document environment limitations rather than claiming passes.

## Budgets and stalls

- Default concurrency: 2 write-capable tasks, 4 workers overall. For small servers, lower limits to match actual load.
- Prefer bounded specialist prompts over broad duplicate investigations. Stop wasteful repetition, redundant workers, or repeated failed retries.
- Record real usage/cost only if the runtime reports it. Never invent token costs, model availability, or worker progress.
- If a blocked task has no new information, surface the blocker rather than relaunching indefinitely.

## Multi-project work

A session coordinating multiple repositories does not imply agents share tools or memory. Each repository has its own worktree, instructions, test commands, review gate, and integration owner. Cross-repo dependencies require explicit versioned artifacts or contracts; do not rely on undocumented state in another agent's chat.

If using tmux, keep sessions named by project/task and treat tmux as **visibility and process supervision only**, not a durable scheduler. Externally triggered recurring runs require separate authorized automation; this skill only documents their work.
