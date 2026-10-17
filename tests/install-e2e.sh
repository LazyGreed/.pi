#!/usr/bin/env bash
set -euo pipefail
root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf -- "$tmp"' EXIT
project="$tmp/kanade"
mkdir -p "$project"
printf '# Kanade contract\nKeep this rule.\n' > "$project/AGENTS.md"
printf '# Claude contract\nKeep this too.\n' > "$project/CLAUDE.md"

"$root/install.sh" --harness pi,claude --scope project --target "$project" --dry-run > "$tmp/dry"
[[ ! -d "$project/.pi" && ! -d "$project/.claude" ]]
"$root/install.sh" --harness pi,claude --scope project --target "$project" > "$tmp/initial"
[[ -f "$project/.pi/agents/felix.md" && -f "$project/.claude/agents/vera.md" ]]
[[ -f "$project/.pi/skills/ui-ux/SKILL.md" ]]
grep -q '^name: felix$' "$project/.pi/agents/felix.md"
grep -q '^disallowed_tools: edit, write$' "$project/.pi/agents/vera.md"
grep -q '^disallowedTools: Write, Edit, NotebookEdit$' "$project/.claude/agents/vera.md"
grep -q '@tintinweb/pi-subagents' "$tmp/initial"
! grep -q 'nathanstephenson/pi-subagents' "$tmp/initial"
grep -q 'run_in_background: true' "$project/AGENTS.md"
grep -q 'steer_subagent' "$project/AGENTS.md"
grep -q 'Keep this rule.' "$project/AGENTS.md"
grep -q 'Keep this too.' "$project/CLAUDE.md"
[[ "$(grep -c '<!-- ALBERT MANAGED START -->' "$project/AGENTS.md")" -eq 1 ]]
[[ "$(grep -c '<!-- ALBERT MANAGED START -->' "$project/CLAUDE.md")" -eq 1 ]]
"$root/install.sh" --harness pi,claude --scope project --target "$project" > "$tmp/again"
! grep -q '^WRITE ' "$tmp/again"
[[ "$(grep -c '<!-- ALBERT MANAGED START -->' "$project/AGENTS.md")" -eq 1 ]]
[[ "$(grep -c '<!-- ALBERT MANAGED START -->' "$project/CLAUDE.md")" -eq 1 ]]

echo 'install E2E PASS: dry-run, dual harness, preserve instructions, idempotence'
