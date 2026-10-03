export interface JevUsage {
  inputTokens: number;
  outputTokens: number;
  cost?: number;
}

export function parseUsage(raw: unknown): JevUsage | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const value = raw as Record<string, unknown>;
  const nonnegative = (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v) && v >= 0;
  if (!nonnegative(value.input_tokens) || !nonnegative(value.output_tokens))
    return undefined;
  return {
    inputTokens: value.input_tokens,
    outputTokens: value.output_tokens,
    ...(nonnegative(value.cost) ? { cost: value.cost } : {}),
  };
}

export function addUsage(
  total: JevUsage | undefined,
  next: JevUsage | undefined,
): JevUsage | undefined {
  if (!next) return total;
  if (!total) return next;
  return {
    inputTokens: total.inputTokens + next.inputTokens,
    outputTokens: total.outputTokens + next.outputTokens,
    ...(total.cost !== undefined || next.cost !== undefined
      ? { cost: (total.cost ?? 0) + (next.cost ?? 0) }
      : {}),
  };
}
