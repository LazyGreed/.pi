import { type Static, Type } from "typebox";
import { Check } from "typebox/value";
import { judge } from "./client.ts";
import { type JevConfig, JevError } from "./config.ts";

const text = Type.String({ minLength: 1, maxLength: 4096 });
export const questionSchema = Type.Union([
  Type.Object(
    {
      type: Type.Literal("noul"),
      instructions: text,
      criteria: Type.Object(
        { true: text, false: text },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
  Type.Object(
    {
      type: Type.Literal("choice"),
      instructions: text,
      criteria: Type.Record(
        Type.String({ minLength: 1, maxLength: 128 }),
        text,
        { minProperties: 2, maxProperties: 64 },
      ),
    },
    { additionalProperties: false },
  ),
  Type.Object(
    {
      type: Type.Literal("score"),
      instructions: text,
      criteria: Type.Array(text, { minItems: 2, maxItems: 10 }),
    },
    { additionalProperties: false },
  ),
]);
export const questionsSchema = Type.Record(
  Type.String({ minLength: 1, maxLength: 128 }),
  questionSchema,
  {
    minProperties: 1,
    maxProperties: 64,
  },
);
export const evaluateSchema = Type.Object(
  {
    state: Type.Unknown({
      description:
        "JSON state to judge. Sent only to the configured Jev endpoint.",
    }),
    questions: questionsSchema,
  },
  { additionalProperties: false },
);

const probability = Type.Number({ minimum: 0, maximum: 1 });
const metadata = {
  confidence: Type.Optional(probability),
  probabilities: Type.Optional(Type.Record(Type.String(), probability)),
};
export const answerSchema = Type.Union([
  Type.Object(
    {
      type: Type.Literal("noul"),
      answer: Type.Boolean(),
      probability,
      confidence: metadata.confidence,
    },
    { additionalProperties: false },
  ),
  Type.Object(
    { type: Type.Literal("choice"), answer: Type.String(), ...metadata },
    { additionalProperties: false },
  ),
  Type.Object(
    { type: Type.Literal("score"), answer: Type.Number(), ...metadata },
    { additionalProperties: false },
  ),
]);
export const evaluateOutputSchema = Type.Object({
  answers: Type.Record(Type.String(), answerSchema),
});
export type Question = Static<typeof questionSchema>;
export type Questions = Static<typeof questionsSchema>;
export type Answer = Static<typeof answerSchema>;
export type EvaluateInput = Static<typeof evaluateSchema>;

export function validateQuestions(
  questions: unknown,
): asserts questions is Questions {
  if (!Check(questionsSchema, questions))
    throw new JevError(
      "k-jev: Invalid questions. Use 1-64 named noul, choice, or score questions with instructions and criteria.",
    );
}

export function compactAnswer(raw: unknown, question: Question): Answer {
  const invalid = () =>
    new JevError(
      "k-jev: Invalid Jev answer (type, value, or probabilities do not match the question).",
    );
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw invalid();
  const value = raw as Record<string, unknown>;
  if (value.type !== question.type) throw invalid();
  const isProbability = (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 1;
  const confidence = value.confidence;
  if (confidence !== undefined && !isProbability(confidence)) throw invalid();
  const meta =
    confidence === undefined ? {} : { confidence: confidence as number };
  if (question.type === "noul") {
    if (!isProbability(value.noul)) throw invalid();
    return {
      type: "noul",
      answer: value.noul >= 0.5,
      probability: value.noul,
      ...meta,
    };
  }
  const keys =
    question.type === "choice"
      ? Object.keys(question.criteria)
      : question.criteria.map((_, i) => String(i));
  let probabilities: Record<string, number> | undefined;
  if (value.probabilities !== undefined) {
    if (
      !value.probabilities ||
      typeof value.probabilities !== "object" ||
      Array.isArray(value.probabilities)
    )
      throw invalid();
    const entries = Object.entries(value.probabilities);
    if (entries.some(([key, p]) => !keys.includes(key) || !isProbability(p)))
      throw invalid();
    probabilities = Object.fromEntries(entries) as Record<string, number>;
  }
  const distribution = probabilities === undefined ? {} : { probabilities };
  if (question.type === "choice") {
    if (typeof value.choice !== "string" || !keys.includes(value.choice))
      throw invalid();
    return { type: "choice", answer: value.choice, ...meta, ...distribution };
  }
  if (
    typeof value.score !== "number" ||
    !Number.isFinite(value.score) ||
    value.score < 0 ||
    value.score > question.criteria.length - 1
  )
    throw invalid();
  return { type: "score", answer: value.score, ...meta, ...distribution };
}

export async function evaluate(
  input: EvaluateInput,
  config: JevConfig,
  signal?: AbortSignal,
) {
  validateQuestions(input.questions);
  const result = await judge(config, input.state, input.questions, signal);
  const answers = Object.fromEntries(
    Object.entries(input.questions).map(([name, question]) => [
      name,
      compactAnswer(result.answers[name], question),
    ]),
  );
  return { answers, usage: result.usage };
}
