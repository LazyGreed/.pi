#!/usr/bin/env bash
# Install Albert's native agent profiles and skills without replacing user settings.
set -euo pipefail

source_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
harness="pi"
scope="global"
target=""
dry=0
with_jev=0
tui_mode=auto
explicit_args=0

usage() {
  cat <<'USAGE'
Usage: ./install.sh                       # interactive TUI
       ./install.sh --tui                 # force interactive TUI
       ./install.sh --harness pi|claude|pi,claude --scope global|project
                    [--target PROJECT_DIR] [--with-jev] [--dry-run] [--no-tui]

Use arrows and Enter/Space to configure the TUI; preview before installing.
Global: installs in ~/.pi/agent and/or ~/.claude; project: in PROJECT/.pi
and/or PROJECT/.claude plus an Albert block in root AGENTS.md/CLAUDE.md.
No change to existing model/provider settings. --with-jev is the only Jev install path.
USAGE
}
while (($#)); do
  case "$1" in
    --harness) [[ $# -ge 2 ]] || { usage >&2; exit 2; }; harness="$2"; explicit_args=1; shift 2 ;;
    --scope) [[ $# -ge 2 ]] || { usage >&2; exit 2; }; scope="$2"; explicit_args=1; shift 2 ;;
    --target) [[ $# -ge 2 ]] || { usage >&2; exit 2; }; target="$2"; explicit_args=1; shift 2 ;;
    --with-jev) with_jev=1; explicit_args=1; shift ;;
    --dry-run) dry=1; explicit_args=1; shift ;;
    --tui) tui_mode=on; shift ;;
    --no-tui) tui_mode=off; shift ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2 ;;
  esac
done
# No-argument terminal invocation opens the TUI. Automation must pass flags.
if [[ "$tui_mode" == on ]] || [[ "$tui_mode" == auto && "$explicit_args" == 0 ]]; then
  if [[ -t 0 && -t 1 ]]; then
    if ((dry)); then echo "TUI already includes a preview; omit --dry-run or use --no-tui for scripted previews." >&2; exit 2; fi
    # A forced TUI takes supplied harness/scope/jev options as initial selections.
    source "$source_dir/lib/tui.sh"
    albert_tui
    exit $?
  fi
  if [[ "$tui_mode" == on || "$explicit_args" == 0 ]]; then
    echo 'Interactive install requires a TTY; use --harness ... --scope ... for scripts.' >&2
    exit 2
  fi
fi
[[ "$scope" == global || "$scope" == project ]] || { echo 'Invalid scope' >&2; exit 2; }
case ",$harness," in
  ,pi,|,claude,|,pi,claude,|,claude,pi,) ;;
  *) echo 'Invalid harness' >&2; exit 2 ;;
esac
if [[ "$scope" == global && -n "$target" ]]; then echo '--target only applies to project installs' >&2; exit 2; fi
if [[ "$scope" == project ]]; then
  target="${target:-$PWD}"
  [[ -d "$target" ]] || { echo "Not a directory: $target" >&2; exit 2; }
  target="$(cd -- "$target" && pwd -P)"
fi
# Preflight optional dependencies before changing any target files.
if ((with_jev)); then
  [[ -f "$source_dir/extensions/k-jev/package.json" ]] || { echo 'k-jev source missing' >&2; exit 1; }
  if (( !dry )); then
    command -v npm >/dev/null || { echo 'npm required for --with-jev' >&2; exit 1; }
  fi
fi

has_harness() { [[ ",$harness," == *",$1,"* ]]; }
report() { printf '%s\n' "$*"; }
mkparent() { if (( !dry )); then mkdir -p -- "$(dirname -- "$1")"; fi; }
# Never overwrite an existing nonidentical file silently.
put() {
  local src="$1" dst="$2"
  if [[ -f "$dst" ]] && cmp -s "$src" "$dst"; then return; fi
  report "WRITE $dst"
  ((dry)) && return 0
  mkparent "$dst"
  if [[ -e "$dst" ]]; then
    cp -p -- "$dst" "$dst.albert-backup-$(date +%Y%m%d%H%M%S)-$$"
  fi
  cp -- "$src" "$dst"
}

# Generate compact, harness-native subagent frontmatter from a single canonical body.
install_role() {
  local tool="$1" role="$2" dst="$3" tools desc
  case "$role" in
    nora) desc='Read-only investigation, architecture, research, root-cause analysis.' ;;
    felix) desc='Implement one bounded code change; perform targeted verification.' ;;
    vera) desc='Independent, read-only consequential-change review.' ;;
    iris) desc='User-facing end-to-end and smoke acceptance without source edits.' ;;
    *) return 1 ;;
  esac
  if [[ "$tool" == pi ]]; then
    case "$role" in
      felix) tools='read, grep, find, ls, bash, edit, write' ;;
      *) tools='read, grep, find, ls, bash' ;;
    esac
  else
    case "$role" in
      felix) tools='Read, Grep, Glob, Bash, Edit, Write' ;;
      *) tools='Read, Grep, Glob, Bash' ;;
    esac
  fi
  if ((with_jev)) && [[ "$role" == nora || "$role" == vera ]]; then
    if [[ "$tool" == pi ]]; then
      tools="$tools, jev_evaluate, jev_search, jev_evaluate_files, jev_evaluate_diff"
    else
      tools="$tools, mcp__k-jev__jev_evaluate, mcp__k-jev__jev_search, mcp__k-jev__jev_evaluate_files, mcp__k-jev__jev_evaluate_diff"
    fi
  fi
  local temp
  temp="$(mktemp)"
  {
    printf -- '---\nname: %s\ndescription: %s\ntools: %s\n' "$role" "$desc" "$tools"
    if [[ "$tool" == claude && "$role" != felix ]]; then printf 'disallowedTools: Write, Edit, NotebookEdit\n'; fi
    printf -- '---\n\n'
    cat -- "$source_dir/agents/$role.md"
  } > "$temp"
  put "$temp" "$dst"
  rm -f -- "$temp"
}

# Add/update only our clearly delimited section. Never discard project instructions.
install_instructions() {
  local dst="$1" begin='<!-- ALBERT MANAGED START -->' end='<!-- ALBERT MANAGED END -->'
  if [[ -f "$dst" ]] && grep -Fqx "$begin" "$dst" && grep -Fqx "$end" "$dst"; then
    if awk -v b="$begin" -v e="$end" '$0==b {inside=1; next} $0==e {exit} inside {print}' "$dst" | cmp -s "$source_dir/AGENTS.md" -; then
      return 0
    fi
  fi
  local temp; temp="$(mktemp)"
  if [[ -f "$dst" ]]; then
    if grep -Fqx "$begin" "$dst"; then
      if ! grep -Fqx "$end" "$dst"; then
        echo "Malformed Albert markers: $dst" >&2; rm -f "$temp"; return 1
      fi
      awk -v b="$begin" -v e="$end" '$0==b {skip=1; next} $0==e {skip=0; next} !skip {print}' "$dst" > "$temp"
    else
      cp -- "$dst" "$temp"
    fi
  fi
  { printf '\n%s\n' "$begin"; cat "$source_dir/AGENTS.md"; printf '%s\n' "$end"; } >> "$temp"
  put "$temp" "$dst"
  rm -f -- "$temp"
}

install_one() {
  local tool="$1" root instruction
  if [[ "$scope" == global ]]; then
    if [[ "$tool" == pi ]]; then root="${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}"; else root="$HOME/.claude"; fi
    if [[ "$tool" == pi ]]; then instruction="$root/AGENTS.md"; else instruction="$root/CLAUDE.md"; fi
  else
    root="$target/.$tool"
    if [[ "$tool" == pi ]]; then instruction="$target/AGENTS.md"; else instruction="$target/CLAUDE.md"; fi
  fi
  install_instructions "$instruction"
  for role in nora felix vera iris; do install_role "$tool" "$role" "$root/agents/$role.md"; done
  for skill in architecture domain-modeling ui-ux documentation research; do
    while IFS= read -r -d '' file; do
      rel="${file#"$source_dir"/skills/}"
      put "$file" "$root/skills/$rel"
    done < <(find "$source_dir/skills/$skill" -type f -print0 | sort -z)
  done
  if [[ -e "$root/agents/engineer.md" || -e "$root/agents/tech-lead.md" ]]; then
    report "NOTICE: old agents may coexist in $root/agents; review manually."
  fi
}

has_harness pi && install_one pi
has_harness claude && install_one claude

if ((with_jev)); then
  jev="$source_dir/extensions/k-jev"
  [[ -f "$jev/package.json" ]] || { echo 'k-jev source missing' >&2; exit 1; }
  report "JEV OPT-IN $jev"
  if (( !dry )); then
    command -v npm >/dev/null || { echo 'npm required for --with-jev' >&2; exit 1; }
    (cd "$jev" && npm ci --ignore-scripts && npm run build)
  fi
  if has_harness pi; then
    if ((dry)); then report "RUN pi install $jev";
    elif command -v pi >/dev/null; then
      if [[ "$scope" == project ]]; then (cd "$target" && pi install -l "$jev"); else pi install "$jev"; fi
    else report 'MANUAL: install Pi and run pi install /path/to/extensions/k-jev'; fi
  fi
  if has_harness claude; then
    if ((dry)); then report "RUN claude mcp add --scope $([[ "$scope" == global ]] && echo user || echo project) --transport stdio k-jev -- node $jev/dist/mcp.js";
    elif command -v claude >/dev/null; then
      if [[ "$scope" == project ]]; then
        (cd "$target" && claude mcp add --scope project --transport stdio k-jev -- node "$jev/dist/mcp.js")
      else
        claude mcp add --scope user --transport stdio k-jev -- node "$jev/dist/mcp.js"
      fi
    else report 'MANUAL: install Claude Code and register the k-jev MCP server'; fi
  fi
  report 'Jev requires K_JEV_BASE_URL, K_JEV_MODEL, and K_JEV_API_KEY at runtime.'
fi

report 'SET MODELS manually: Albert high/max reasoning; Felix/Vera strong code model, high; Nora/Iris task-appropriate.'
report 'PI: ensure nathanstephenson/pi-subagents is installed; enable project agents in the subagent call if applicable.'
report 'Albert tool restriction (Pi): pi --tools read,grep,find,ls,subagent (verify local tool names first).'
report 'DONE'
