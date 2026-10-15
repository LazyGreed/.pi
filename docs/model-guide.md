# Model/effort guidance (manual)

No provider-specific model strings appear in role frontmatter. Model and thinking options change by harness and service; choose them in Pi/Claude settings after installation.

| Agent | Preferred capability | Suggested effort |
| --- | --- | --- |
| Albert | strong reasoning, delegation, prompt discipline | high/max |
| Nora | fast reading/research, adequate reasoning | medium/high |
| Felix | strongest reliable coding model | high |
| Vera | independent strong reviewer; ideally different model family from Felix | high |
| Iris | reliable tool use and precise acceptance evidence | medium/high |

Examples consistent with the existing `.pi` setup: Albert or Felix can use Luna at max, Vera Sol at high. For Claude Code, Sonnet high is an existing user preference. These are suggestions, not verified provider availability or immutable assignments.

Pi: inspect `/model` and `/settings`, then update relevant local/global settings or per-agent frontmatter if that installed runner supports it. The current `nathanstephenson/pi-subagents` README documents a `model` field but not guaranteed per-agent thinking support; do not pretend it applies `thinking` frontmatter without checking the installed version.

Claude Code: inspect `/model` and current effort configuration; built-in agents can have a `model` field, but leaving it unset uses the caller's current model. Keep manually selected settings intact.
