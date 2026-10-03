# k-jev

Shared semantic evaluation and content-free file search for Pi and Claude Code.
One agent-independent core, a Pi extension, and an MCP v2 stdio server. Calls are explicit; Jev returns evidence, not authority.

## Install

Requires Node.js 22.18+ and npm.

```sh
cd /path/to/this/repo/extensions/k-jev
npm ci --ignore-scripts
npm run build

pi install "$PWD"
claude mcp add --scope user --transport stdio k-jev -- node "$PWD/dist/mcp.js"
claude mcp get k-jev
```

Pi loads the source adapter through the package manifest. Claude launches the compiled server as a local child process. No plugin, hook, daemon, or HTTP server.

## Configuration

Export these in the shell that launches either agent. Keep secrets out of MCP configuration:

```fish
set -Ux K_JEV_BASE_URL 'https://your-service.example/decisions'
set -Ux K_JEV_MODEL 'your-model'
set -Ux K_JEV_API_KEY 'your-key'
```

For POSIX shells, use `export NAME='value'` instead. Restart the agents after changing exports.
Each `K_JEV_*` variable takes precedence over its legacy `PI_JEV_*` counterpart; legacy exports still work. An empty canonical value fails validation rather than falling back.

The base URL is the full POST decision endpoint; no path is appended. It must accept `{model,state,questions}` and return Jev-compatible `{answers,usage?}` JSON. A nonempty key is required even for unauthenticated local endpoints; use `placeholder`. Requests send `Authorization: Bearer ...`. Never embed credentials in the URL.

## Tools

`jev_evaluate` judges JSON state using named questions:

```json
{
  "state": {"status": 401},
  "questions": {
    "retryable": {
      "type": "noul",
      "instructions": "Would retrying unchanged credentials succeed?",
      "criteria": {"true": "Transient failure", "false": "Credentials need correction"}
    }
  }
}
```

`noul` returns a yes probability and a boolean using a 0.5 threshold. `choice` takes a label-to-criterion object; `score` takes an ordered criteria array and returns a fractional zero-based score. Results retain available confidence and probabilities, never provider explanations.

Discover candidate paths first, then call `jev_search`:

```json
{
  "paths": ["src/auth/rotation.ts", "src/auth/session.ts"],
  "question": "Does this file implement credential rotation?"
}
```

Search sends file contents to the configured endpoint, but returns only ordered paths with typed answers or individual errors. No excerpts reach the calling model. Read promising files normally to verify.

- Pi: relative paths use the session cwd; absolute paths and `~/` remain supported.
- MCP: relative paths use `CLAUDE_PROJECT_DIR`, falling back to process cwd. Only files within that canonical project root are allowed, including symlink targets. Absolute paths and `~/` work only inside that root. MCP roots and Claude `--add-dir` are not supported yet.
- This is a search path policy, not an OS sandbox. Explicit `jev_evaluate` state can contain any JSON supplied by the caller.

## Limits and development

Search accepts 1-200 UTF-8 regular files, at most 256 KiB each, with four workers per call. Binary and invalid UTF-8 files fail individually.
Evaluation accepts 1-64 questions, 2-64 choice labels, or 2-10 score levels. Requests are limited to 1 MiB and responses to 256 KiB. Each HTTP request has a 30-second timeout; no retries. Cancellation stops remaining work.
Pi reports available token usage and total cost; MCP excludes usage from model-visible results. Provider error bodies and extra response fields are discarded.

```sh
npm run check
npm test
npx @modelcontextprotocol/inspector node dist/mcp.js
```

Core owns validation independently of adapter schemas. Keep Pi, MCP, tool registration, and UI dependencies out of `src/core/`.
