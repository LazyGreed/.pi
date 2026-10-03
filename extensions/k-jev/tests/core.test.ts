import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveConfig } from "../dist/core/config.js";
import {
  type EvaluateInput,
  evaluate,
  validateQuestions,
} from "../dist/core/evaluate.js";
import { type SearchInput, search } from "../dist/core/search.js";
import { addUsage, parseUsage } from "../dist/core/usage.js";

const legacy = {
  PI_JEV_BASE_URL: "http://127.0.0.1:1/decisions",
  PI_JEV_MODEL: "legacy",
  PI_JEV_API_KEY: "old",
};
const canonical = {
  K_JEV_BASE_URL: "http://127.0.0.1:2/decisions",
  K_JEV_MODEL: "new",
  K_JEV_API_KEY: "new-key",
};

test("K_JEV configuration overrides legacy variables independently, never falling back from invalid values", () => {
  assert.deepEqual(resolveConfig({ ...legacy, ...canonical }), {
    baseUrl: canonical.K_JEV_BASE_URL,
    model: "new",
    apiKey: "new-key",
  });
  assert.deepEqual(resolveConfig({ ...legacy, K_JEV_MODEL: " new " }), {
    baseUrl: legacy.PI_JEV_BASE_URL,
    model: "new",
    apiKey: "old",
  });
  for (const name of Object.keys(canonical)) {
    assert.throws(
      () => resolveConfig({ ...legacy, ...canonical, [name]: "" }),
      new RegExp(`${name} is required`),
    );
  }
});

test("neutral usage preserves absent costs and accumulates available usage", () => {
  assert.deepEqual(parseUsage({ input_tokens: 10, output_tokens: 2 }), {
    inputTokens: 10,
    outputTokens: 2,
  });
  assert.deepEqual(
    parseUsage({ input_tokens: 10, output_tokens: 2, cost: 0.01 }),
    { inputTokens: 10, outputTokens: 2, cost: 0.01 },
  );
  assert.equal(parseUsage({ input_tokens: -1, output_tokens: 2 }), undefined);
  assert.equal(parseUsage({ input_tokens: NaN, output_tokens: 2 }), undefined);
  assert.deepEqual(
    addUsage(
      { inputTokens: 10, outputTokens: 2 },
      { inputTokens: 5, outputTokens: 1 },
    ),
    { inputTokens: 15, outputTokens: 3 },
  );
  assert.deepEqual(
    addUsage(
      { inputTokens: 10, outputTokens: 2 },
      { inputTokens: 5, outputTokens: 1, cost: 0.01 },
    ),
    { inputTokens: 15, outputTokens: 3, cost: 0.01 },
  );
  assert.equal(addUsage(undefined, undefined), undefined);
});

test("core validates question shape and bounds without adapter schemas", () => {
  const valid = {
    type: "noul",
    instructions: "?",
    criteria: { true: "yes", false: "no" },
  };
  validateQuestions({ match: valid });
  const invalid = [
    null,
    [],
    {},
    { match: { ...valid, extra: true } },
    { ["x".repeat(129)]: valid },
    Object.fromEntries(Array.from({ length: 65 }, (_, i) => [`q${i}`, valid])),
    { match: { ...valid, instructions: "" } },
    { match: { ...valid, instructions: "x".repeat(4097) } },
    { match: { ...valid, type: "unknown" } },
    {
      match: { ...valid, criteria: { true: "yes", false: "no", extra: "bad" } },
    },
    { match: { type: "choice", instructions: "?", criteria: { only: "one" } } },
    {
      match: {
        type: "choice",
        instructions: "?",
        criteria: { "": "one", other: "two" },
      },
    },
    { match: { type: "score", instructions: "?", criteria: ["one"] } },
    { match: { type: "score", instructions: "?", criteria: Array(3) } },
    {
      match: {
        type: "score",
        instructions: "?",
        criteria: Array(11).fill("one"),
      },
    },
  ];
  for (const value of invalid)
    assert.throws(() => validateQuestions(value), /Invalid questions/);
});

test("core rejects malformed inputs and non-serializable root states before network", async () => {
  const config = resolveConfig(canonical);
  const questions = {
    match: {
      type: "noul" as const,
      instructions: "?",
      criteria: { true: "yes", false: "no" },
    },
  };
  for (const input of [
    null,
    {},
    { state: null },
    { state: null, questions, extra: true },
  ])
    await assert.rejects(
      evaluate(input as EvaluateInput, config),
      /Provide JSON state/,
    );
  for (const state of [undefined, Symbol("secret"), () => "secret", 1n])
    await assert.rejects(
      evaluate({ state, questions }, config),
      /JSON-serializable/,
    );
  for (const input of [
    null,
    {},
    { paths: [], question: "?" },
    { paths: ["a"], question: "?", extra: true },
    { paths: Array(2), question: "?" },
    { paths: ["a"], question: "" },
    { paths: ["a"], question: "x".repeat(2049) },
  ])
    await assert.rejects(
      search(input as SearchInput, config, process.cwd()),
      /1-200 paths/,
    );
});
