# My Agent setup

Personal coding-agent configuration shared across Pi and Claude Code.

## Shared

- `AGENTS.md` - global agent instructions
- `skills/` - reusable agent skills
- `agents/` - small role-specific subagents
- `extensions/k-jev/` - shared semantic evaluation and file-search package

## Pi

Configuration:

- `settings.json`
- `models.json`

Packages:

- `pi-blackhole`
- `pi-web-access`
- `@narumitw/pi-chrome-devtools`
- `@narumitw/pi-lsp`
- `pi-subagents`

Pi uses the native `k-jev` adapter.

## Claude Code

Configuration:

- `claude-settings.json` - should replace `~/.claude/settings.json`

Claude Code reuses the same:

- `AGENTS.md` - should rename to `~/.claude/CLAUDE.md`
- skills
- agent roles
- `k-jev` core

Recommended setup:

```text
~/.claude/
├── CLAUDE.md -> AGENTS.md
├── skills -> skills
├── agents/  # update tool names to uppercase and find/ls -> Glob
└── settings.json -> claude-settings.json
```

`k-jev` is exposed to Claude Code through a local stdio MCP server.

See [`extensions/k-jev/README.md`](extensions/k-jev/README.md) for Pi and Claude setup.

## Philosophy

Keep the agent environment small.

Prefer:

- built-in capabilities over plugins
- shared configuration over duplicated configuration
- explicit tools over automatic behavior
- few specialized agents over large agent collections
- local, direct workflows over orchestration layers
