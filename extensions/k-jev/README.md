# k-jev

Two normal Pi tools, no automatic Jev calls or runtime dependencies beyond Pi's supplied modules.
Jev returns evidence; verify important decisions with source and tests.

## Environment

All three variables must be exported into the Pi process:

```sh
export PI_JEV_BASE_URL='https://your-service.example/decisions'
export PI_JEV_MODEL='your-model'
export PI_JEV_API_KEY='your-key'
```

Fish equivalent:

```fish
set -Ux PI_JEV_BASE_URL 'https://your-service.example/decisions'
set -Ux PI_JEV_MODEL 'your-model'
set -Ux PI_JEV_API_KEY 'your-key'
```

`PI_JEV_BASE_URL` is the **full POST decision endpoint**, used verbatim (no path appended).
The endpoint must accept `{model,state,questions}` and return Jev-compatible `{answers,usage?}` JSON.
No provider-specific routing or chat-completions conversion.
The key must be nonempty even for an unauthenticated local HTTP endpoint; use `placeholder`. Requests always send `Authorization: Bearer ...`.
Never place credentials in the URL.

Changing a parent shell's exports does not update an already-running Pi process.
Restart Pi after changing environment variables.

## Tool examples

Ask Pi to call `jev_evaluate` with:

```json
{
  "state": {"status": 401, "message": "Unauthorized"},
  "questions": {
    "cause": {
      "type": "choice",
      "instructions": "Classify this failure",
      "criteria": {
        "authentication": "Credentials missing or rejected",
        "network": "Transport failure"
      }
    },
    "retryable": {
      "type": "noul",
      "instructions": "Would retrying unchanged credentials likely succeed?",
      "criteria": {"true": "Transient failure", "false": "Credentials need correction"}
    }
  }
}
```

Question types are `noul`, `choice`, and `score`. `score` takes an ordered criteria array and returns a fractional zero-based score.
`noul` returns `probability` of yes and an `answer` boolean using a 0.5 threshold.
Choice/score results retain available `confidence` and `probabilities`; confidence is not winning-label probability.
Missing metadata stays absent.

Find candidate paths first, then ask Pi to call `jev_search` with:

```json
{
  "paths": ["src/auth/rotation.ts", "src/auth/session.ts"],
  "question": "Does this file implement credential rotation?"
}
```

Results stay in input order: `{path,result:{type:"noul",answer,probability,confidence?}}` or `{path,error}`.
Search returns no excerpts, source, or provider explanations in text, structured content, or details.
Pi can then explicitly read promising files.
Relative paths use Pi's working directory; absolute paths and `~/` work.
File contents leave your machine for the configured endpoint.

## Bounds and development

- Search: 1-200 UTF-8 regular files, at most 256 KiB each; four workers **per tool call**.
  Split larger batches.
  Binary/non-UTF-8 files fail individually.
  Results are not automatically ranked.
- Evaluation: 1-64 named questions; 2-64 choice labels; 2-10 score levels; 1 MiB request limit.
- Each HTTP request has a 30-second timeout covering headers and body.
  No retries.
  A search batch can take multiple timeout intervals.
  Cancellation stops remaining work.
- No automatic chunking, provider autodetection, or arbitrary text answers.
  Provider error bodies and extra response fields are discarded.
- Token counts and total cost are reported to Pi when the endpoint supplies them; the API does not provide an input/output cost split.

```sh
npm ci --ignore-scripts
npm run check
npm test
```

Development dependencies are not required for Pi to load the extension.
