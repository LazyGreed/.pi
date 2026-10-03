import { judge } from "./client.js";
import { type JevConfig, JevError } from "./config.js";

export type Question =
  | {
      type: "noul";
      instructions: string;
      criteria: { true: string; false: string };
    }
  | { type: "choice"; instructions: string; criteria: Record<string, string> }
  | { type: "score"; instructions: string; criteria: string[] };
export type Questions = Record<string, Question>;
export type Answer =
  | { type: "noul"; answer: boolean; probability: number; confidence?: number }
  | {
      type: "choice";
      answer: string;
      confidence?: number;
      probabilities?: Record<string, number>;
    }
  | {
      type: "score";
      answer: number;
      confidence?: number;
      probabilities?: Record<string, number>;
    };
export interface EvaluateInput {
  state: unknown;
  questions: Questions;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function isText(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length >= 1 && value.length <= max;
}

export function validateQuestions(
  questions: unknown,
): asserts questions is Questions {
  const invalid = () =>
    new JevError(
      "k-jev: Invalid questions. Use 1-64 named noul, choice, or score questions with instructions and criteria.",
    );
  if (!isRecord(questions)) throw invalid();
  const entries = Object.entries(questions);
  if (entries.length < 1 || entries.length > 64) throw invalid();
  for (const [name, question] of entries) {
    if (
      !isText(name, 128) ||
      !isRecord(question) ||
      Object.keys(question).length !== 3 ||
      !Object.hasOwn(question, "type") ||
      !Object.hasOwn(question, "criteria") ||
      !Object.hasOwn(question, "instructions") ||
      !isText(question.instructions, 4096)
    )
      throw invalid();
    const criteria = question.criteria;
    if (question.type === "score") {
      if (
        !Array.isArray(criteria) ||
        criteria.length < 2 ||
        criteria.length > 10 ||
        Array.from(criteria).some((text) => !isText(text, 4096))
      )
        throw invalid();
    } else if (question.type === "noul" || question.type === "choice") {
      if (!isRecord(criteria)) throw invalid();
      const labels = Object.entries(criteria);
      if (question.type === "noul") {
        if (
          labels.length !== 2 ||
          !Object.hasOwn(criteria, "true") ||
          !Object.hasOwn(criteria, "false")
        )
          throw invalid();
      } else if (
        labels.length < 2 ||
        labels.length > 64 ||
        labels.some(([label]) => !isText(label, 128))
      )
        throw invalid();
      if (labels.some(([, text]) => !isText(text, 4096))) throw invalid();
    } else throw invalid();
  }
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
  if (
    !isRecord(input) ||
    Object.keys(input).length !== 2 ||
    !Object.hasOwn(input, "state") ||
    !Object.hasOwn(input, "questions")
  )
    throw new JevError("k-jev: Provide JSON state and questions only.");
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
