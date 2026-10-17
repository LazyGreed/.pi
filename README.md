# Albert

Harness-native engineering orchestrator for one repository at a time. Albert talks to the human, scopes tasks, delegates to four named subagents, and reports only supported outcomes. Albert never implements application code.

## Workflow

Open `pi` or `claude` as usual; Albert is loaded from native instructions. No Albert-specific runtime commands or UI. Express requests freely (e.g. “review changes”, “review updates”, “check the diff”). Albert selects the smallest agent path, dispatches background work when suitable, routes consequential review/E2E, and reports only evidenced results. See [the lifecycle and limits](docs/workflow.md).

## Agents

- **Albert**: coordinator, installed as primary instructions (`AGENTS.md` for Pi; `CLAUDE.md` for Claude Code).
- **Nora**: investigator, architecture/research/scoping.
- **Felix**: engineer, the code-writing worker.
- **Vera**: independent consequential-change review.
- **Iris**: observable E2E/smoke acceptance.

Native delegation: `@tintinweb/pi-subagents` (`Agent`, background by default) for Pi; built-in agents for Claude Code. No custom orchestration service, tmux dependency, database, or task logs.

## Install

Run from this repository (after applying the migration bundle). Launch the keyboard-driven TUI (arrows/`j`/`k`, Space/Enter, Esc) and review the planned writes before confirming:

```sh
./install.sh
```

For unattended or scripted installs, pass explicit flags:

```sh
./install.sh --harness pi --scope global --dry-run
./install.sh --harness pi,claude --scope global
./install.sh --harness claude --scope project --target /path/to/kanade
./install.sh --harness pi --scope global --with-jev
```

Global uses `~/.pi/agent` and `~/.claude`. Project uses `.pi/` and `.claude/` plus root instruction files. Existing instruction files are augmented inside a managed block, not overwritten. Existing user settings/models/packages are unchanged. Installation writes backups if replacing managed paths. The TUI includes a mandatory preview; `--dry-run` prints intended writes without changing anything in CLI mode. `--no-tui` disables interaction explicitly. `--with-jev` installs the optional Jev extension only after dependencies are built and configuration is supplied; read `extensions/k-jev/README.md`.

Pi prerequisite: `pi install npm:@tintinweb/pi-subagents` (if not already installed). The installer detects the package in Pi settings where possible and warns without changing package configuration. The extension discovers `.pi/agents/` and global agent profiles; no `agentScope` option required.

Pi uses the capitalized `Agent` tool, plus `get_subagent_result` and `steer_subagent`; keep them available to Albert. Felix retains writing tools in its own profile. Claude Code uses built-in agents. Prompt-only read-only policies are not sandbox boundaries. See `docs/workflow.md`.

## Installer verification

```sh
./tests/install-e2e.sh
python3 ./tests/tui-e2e.py
```

The terminal wizard does not depend on `gum`, `dialog`, or `whiptail`; it requires Bash and an interactive TTY. CI should use `--harness` / `--scope` flags.

## Skills

Five opt-in skills: `architecture`, `domain-modeling`, `ui-ux`, `documentation`, `research`. Their `SKILL.md` files are short; supporting content is under `references/`. All useful guidance from the old `unslop` is incorporated into documentation and role/reporting rules. REA is not bundled.

## Model selection

Models are not pinned in role definitions: model identifiers vary by provider and account. Set Albert to a strong reasoning model at high/max effort; Felix and Vera to strong code/review models at high effort; Nora and Iris to a more economical model when adequate. Your current Pi config uses Luna/Sol and Claude config selects Sonnet; keep those choices unless you deliberately change them.

## Testing philosophy

Use E2E/smoke checks as the first acceptance evidence. Write focused regression or invariant tests when the risk justifies them. No automatic unit tests for every edited function or coverage targets. Reviews are proportional to change risk. Never report unavailable checks as successful.

## Migration from LazyGreed/.pi 1.2.0

See `MIGRATION.md`. The supplied migration bundle replaces old agent and skill definitions but leaves your `settings.json`, `models.json`, `claude-settings.json`, `pi-blackhole`, and existing `k-jev` core untouched unless explicitly patched. Review removals before applying.
