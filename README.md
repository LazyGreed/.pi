# Pi agent setup

Personal Pi-first coding-agent configuration. Claude Code shares the same core instructions, skills, agent roles, and Jev semantic-review package.

## Contents

- `AGENTS.md` - global behavior, safety, quality, and delegation rules
- `skills/agent-teams/` - multi-task and multi-project coordination (logical teams, worktree discipline, handoffs, integration)
- `skills/go-for-it/` - one-task implementation and verification
- `skills/` - other on-demand engineering and design skills
- `agents/` - five bounded subagent roles: `tech-lead`, `engineer`, `researcher`, `reviewer`, `qa`
- `extensions/k-jev/` - semantic search and evaluation for Pi and Claude
- `settings.json`, `models.json` - Pi configuration
- `claude-settings.json` - Claude Code settings

## Use

Pi discovers skills from `~/.pi/agent/skills/` or configured skill paths. Install this repository at your chosen Pi agent configuration location, or symlink its `skills/` and `agents/` directories there. Reload Pi after changes.

In an interactive Pi session:

```text
/skill:go-for-it Fix the reported bug and open a PR
/skill:agent-teams Plan and execute these independent Kanade tasks with separate reviewers
/skill:agent-teams Coordinate this OCR research-to-implementation handoff across repositories
```

`agent-teams` is **instructional orchestration**, not a background service. The coordinator lives in the current Pi session. Durable work requires an existing issue/PR tracker or authorized ledger; long-running workers require explicitly managed sessions or a separate scheduler.

The installed `nathanstephenson/pi-subagents` extension gives subagents separate **context**, not automatic filesystem isolation. Parallel writers must use verified separate worktrees/sessions, otherwise serialize them. See [`skills/agent-teams/SKILL.md`](skills/agent-teams/SKILL.md) and its references.

## Existing Pi packages

- `pi-blackhole`
- `pi-web-access`
- `@narumitw/pi-chrome-devtools`
- `@narumitw/pi-lsp`
- `nathanstephenson/pi-subagents`
- local `k-jev`

## Claude Code

Reuse `AGENTS.md` as `~/.claude/CLAUDE.md`, share skill directories where Claude discovers skills, adapt agent tool definitions where needed, and use `claude-settings.json` as settings. The Jev MCP server setup is documented in [`extensions/k-jev/README.md`](extensions/k-jev/README.md).

The Pi `agent-teams` skill does not imply Claude Agent Teams are enabled, compatible with Pi subagents, or persistent between sessions.

## Principles

Simple work stays simple. Parallelize proven independence, never concurrent edits in one checkout. One accountable owner per task, one integration owner per repo, and independent evidence before completion. Do not invent status, costs, or test results.
