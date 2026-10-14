# Task and handoff contracts

Use as a compact schema, not a file that every task must write. The coordinator may keep it in conversation, issues, or an already-authorized task tracker.

## Task

```yaml
id: KAN-142
team: kanade-media
repo: path/to/kanade
objective: User-observable outcome in one sentence
owner: engineer                    # Exactly one writer
depends_on: []                     # Verified task IDs
baseline: <commit SHA>
branch: <branch or worktree>
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

Do not fabricate SHAs, command results, or permission grants. `owned_paths` and the interface contract must be made precise enough to prevent write collisions. Define an explicit integration task when two teams share an interface.

## Dispatch prompt

```text
Task <id> (<team>) on <repo> at <baseline>.
Objective: <specific behavior>.
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

| ID | Team | State | Owner | Depends | Branch/ref | Evidence | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| KAN-142 | kanade-media | review | engineer | none | feat/media-142 | tests + diff | independent review |

The `KAN-142` values are illustrative placeholders, not live work.
