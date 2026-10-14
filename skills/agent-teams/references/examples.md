# Execution examples

Read only the example that matches the current task. Verify installed commands, project paths, and branches before running them.

## Parallel read-only investigation in Pi

The installed `nathanstephenson/pi-subagents` package exposes a `subagent` tool with single `{ agent, task }` and parallel `{ tasks: [...] }` forms. Use its **actual tool schema** when calling it; this is conceptual JSON, not a terminal command:

```json
{
  "tasks": [
    { "agent": "tech-lead", "task": "Map module A interfaces and invariants; read-only, return file evidence." },
    { "agent": "researcher", "task": "Verify upstream API compatibility for feature B; read-only, cite official sources." }
  ]
}
```

These agents have isolated model context, **not isolated working directories**. Do not parallelize two editing requests in the same checkout.

## Independent writer environments

From an existing clean Git repository, create a separate worktree for each writer, choosing names that do not already exist:

```bash
git status --short
git worktree add -b feat/media-142 "$HOME/worktrees/kanade-media-142" HEAD
git worktree add -b feat/controls-143 "$HOME/worktrees/kanade-controls-143" HEAD
```

After verifying both worktrees use the intended baseline, prefer one native parallel dispatch with a per-task `cwd`:

```json
{
  "tasks": [
    {
      "agent": "engineer",
      "cwd": "/home/k/worktrees/kanade-media-142",
      "task": "KAN-142: Implement the media behavior. Own src/media/ only."
    },
    {
      "agent": "engineer",
      "cwd": "/home/k/worktrees/kanade-controls-143",
      "task": "KAN-143: Implement the controls behavior. Own src/controls/ only."
    }
  ]
}
```

Use the runtime's actual tool schema. `cwd` selects each worker's process directory; separate worktrees provide filesystem isolation. Keep tmux for independently managed long-lived sessions, or when direct dispatch cannot target each worktree:

```bash
tmux new-session -d -s kanade--media-142 -c "$HOME/worktrees/kanade-media-142" pi
tmux new-session -d -s kanade--controls-143 -c "$HOME/worktrees/kanade-controls-143" pi
```

`tmux` starts sessions; it does not automatically transmit task contracts, detect completion, integrate changes, or resume agent work. Send the scoped task to each session and inspect actual results. Never start worktrees on a dirty checkout without checking whether their base contains expected changes. Do not remove worktrees without checking user data and receiving appropriate authorization.

## Project teams

A portfolio goal may contain these logical teams:

- Kanade: implementation, API/Wayland correctness, independent UI/runtime verification.
- Khmer OCR: model research, reproducible experiments, evaluation with dataset/version IDs.
- Platform: Kinetix/other integrations, infrastructure constraints, CI.
- Shared research: upstream evidence handed off as source-backed task inputs.

This does not require four always-running leads. Assign one active owner to each ready task and only spawn workers when parallelism is justified. If OCR work requires the workstation GPU and builds require its CPU, schedule resource-heavy tasks sequentially despite task independence.

## Cross-repository change

1. Researcher produces a versioned interface proposal and source evidence.
2. Producer repository implements and verifies the contract on an isolated branch.
3. Integration owner records exact PR/ref and verified API version in the task ledger.
4. Consumer repository starts only after the contract is validated; do not depend on an unmerged changing branch without stating that risk.
5. Independent reviewers inspect each diff and combined integration behavior before final acceptance.

## Continuing after interruption

Reopen the issue/PR ledger. Verify each stated branch/ref and actual current status. Treat any `running` entry as **unconfirmed** until a live process, artifact, or fresh tool observation supports it. Recompute the ready set from verified dependencies, not yesterday's plan.
