# Migration from LazyGreed/.pi 1.2.0

The separate patch archive's `apply.sh` applies the Albert redesign to a **clean** Git checkout. It does not push changes or alter remote branches. Use `git diff --stat` and `git diff` after applying; a local commit is your rollback point.

## Intentional removals

Old agent names `engineer`, `tech-lead`, `researcher`, `reviewer`, `qa` are replaced with `nora`, `felix`, `vera`, `iris`; `albert` is the primary instruction set, not a subagent. Old skill directories `agent-teams`, `go-for-it`, `codebase-design`, `improve-codebase-architecture`, `pragmatic-domain-design`, `domain-modeling`, `documentation-philosophy`, `design-doc`, `unslop`, `project-landing-page-designer`, and `web-product-design` are replaced by five consolidated skills.

The migration retains your existing provider/model settings, Pi/Claude settings, blackhole configuration, and Jev core. It removes the `./extensions/k-jev` auto-load entry from `settings.json` so Jev is opt-in. The installed Jev extension is expanded to include semantic file/diff evaluation and no longer warns on Pi startup when unconfigured. Optional installation is through `./install.sh --with-jev`.

## After migration

1. Check changed files and `git diff` in the `.pi` repository.
2. Run `./install.sh --harness pi,claude --scope global --dry-run`.
3. Run your chosen global or project install. Project mode modifies instruction files using managed markers and preserves existing text.
4. Ensure `nathanstephenson/pi-subagents` is installed in Pi. Claude Code uses built-in agents.
5. Run Pi with a restrictive Albert tool set where supported (`pi --tools read,grep,find,ls,subagent`). Ensure Felix retains independent tool capabilities in the child harness.
6. Select model and effort levels manually. Reload harnesses, confirm role discovery, test one scoped implementation + review + E2E handoff.

## Limits

`pi-subagents` isolates conversation context, not the filesystem. Use one writer by default. These Markdown contracts do not themselves sandbox shell commands; follow local harness permissions/trust configuration. Jev transmits source/diffs to the configured endpoint. Do not enable it without reviewing data exposure. No database, session log layer, or custom supervisor is installed.

## Validation

The patch archive includes smoke tests for the installer. Jev source additions are syntactically checked, but full TypeScript typecheck and integration tests require the original npm dependencies (`cd extensions/k-jev && npm ci && npm run check`). Those dependencies are not embedded in this patch archive.
