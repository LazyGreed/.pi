# Task and handoff contracts

Use as a compact schema, not a file that every task must write. The coordinator may keep it in conversation, issues, or an already-authorized task tracker.

## Task

```yaml
id: KAN-142
team: kanade-media
repo: path/to/kanade
objective: User-observable outcome in one sentence
role: engineer                    # Agent/profile responsibility
owner_id: media-worker-1           # Unique identity for this worker instance
depends_on: []                     # Verified task IDs
baseline: <commit SHA>
branch: <branch or worktree>
execution_cwd: /path/to/worktree   # Absolute path
session_id: <Pi run or tmux name>  # Optional when available
owned_paths: [src/media/]
interface_contract: <boundary other tasks can rely on>
inputs: [issue, relevant docs/ADRs, reproduction]
acceptance:
  - Observable behavior or concrete invariant
verification:
  - Exact existing command or reproducible manual check
permissions:
  - Edit owned paths only
  - No merge, deployment, deletion, or credential changes
stop_when: Verified handoff, blocked prerequisite, or budget exhausted
status: ready
```

Do not fabricate SHAs, command results, or permission grants. Keep `role` separate from `owner_id`; one role may have multiple concurrent workers, so `owner_id` must identify the specific worker. Record the absolute execution cwd and the Pi run or tmux session ID when available. `owned_paths` and the interface contract must be precise enough to prevent write collisions. Define an explicit integration task when two teams share an interface.

## Dispatch prompt

```text
Task <id> (<team>) on <repo> at <baseline>.
Objective: <specific behavior>.
Owner: <role>, owner_id <unique worker identity>.
Execution: cwd <absolute path>; session_id <Pi run ID or tmux session, if available>.
Scope: <owned paths and permitted interfaces>. Do not edit outside scope.
Dependencies: <verified input branches/contracts>.
Acceptance: <measurable criteria>.
Verification: <actual commands and E2E expectations>.
Safety: preserve user changes; do not merge/deploy/delete or delegate.
Deliver: paths changed, ref/commit, evidence, failures, findings, next action.
Stop if scope conflicts, environment is shared, or prerequisites fail.
```

## Review prompt

```text
Independently review task <id> versus <baseline> and the full integrated diff.
Read callers, invariants, error paths, tests, and acceptance criteria.
Do not edit. Verify factual claims; use Jev for semantic judgments.
Return actionable findings with severity, location, evidence, and regression.
List checks actually performed and unverified claims separately.
```

## Handoff

```yaml
id: KAN-142
role: engineer
owner_id: media-worker-1
execution_cwd: /path/to/worktree
session_id: <Pi run ID or tmux session, if available>
status: review                     # Not done from self-report alone
baseline: <sha>
result_ref: <branch/commit/PR>
changed_paths: []
verification:
  passed: []
  failed: []
  not_run: []
review:
  reviewer: <identity or pending>
  actionable_findings: []
e2e: <passed/failed/not run and why>
risks: []
next_owner: integrator
next_action: <explicit action>
```

At a session boundary, this minimum ledger is enough to restart correctly:

| ID | Team | State | Role | Owner ID | Execution cwd/session | Depends | Branch/ref | Evidence | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KAN-142 | kanade-media | review | engineer | media-worker-1 | worktree path / Pi run ID | none | feat/media-142 | tests + diff | independent review |

The `KAN-142` values are illustrative placeholders, not live work.
