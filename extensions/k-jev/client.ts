import type { Usage } from "@earendil-works/pi-ai";
import { type JevConfig, JevError } from "./config.ts";
import type { Questions } from "./evaluate.ts";

export const TIMEOUT_MS = 30_000;
export const MAX_REQUEST_BYTES = 1024 * 1024;
const MAX_RESPONSE_BYTES = 256 * 1024;

export async function judge(
  config: JevConfig,
  state: unknown,
  questions: Questions,
  signal?: AbortSignal,
  timeoutMs = TIMEOUT_MS,
) {
  let body: string;
  try {
    if (state === undefined) throw new Error();
    body = JSON.stringify({ model: config.model, state, questions });
  } catch {
    throw new JevError("k-jev: State must be JSON-serializable.");
  }
  if (Buffer.byteLength(body) > MAX_REQUEST_BYTES)
    throw new JevError(
      "k-jev: Request exceeds 1 MiB. Narrow the state or questions.",
    );
  const timeout = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  let data: unknown;
  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body,
      signal: combined,
      redirect: "error",
    });
    if (!response.ok) {
      await response.body?.cancel();
      const hint =
        response.status === 401 || response.status === 403
          ? " Check PI_JEV_API_KEY and endpoint access."
          : response.status === 404
            ? " Check PI_JEV_BASE_URL (the full decision endpoint) and PI_JEV_MODEL."
            : " Check endpoint availability and model support.";
      throw new JevError(`k-jev: Jev HTTP ${response.status}.${hint}`);
    }
    if (!response.body) throw new JevError("k-jev: Empty Jev response.");
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_RESPONSE_BYTES) {
          await reader.cancel();
          throw new JevError("k-jev: Jev response exceeds 256 KiB.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    try {
      data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw new JevError("k-jev: Jev returned invalid JSON.");
    }
  } catch (error) {
    if (signal?.aborted) throw new JevError("k-jev: Cancelled.");
    if (timeout.aborted)
      throw new JevError(`k-jev: Jev request timed out after ${timeoutMs} ms.`);
    if (error instanceof JevError) throw error;
    throw new JevError(
      "k-jev: Jev network request failed. Check PI_JEV_BASE_URL and connectivity.",
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new JevError("k-jev: Invalid Jev response.");
  const result = data as Record<string, unknown>;
  if (
    !result.answers ||
    typeof result.answers !== "object" ||
    Array.isArray(result.answers)
  )
    throw new JevError("k-jev: Jev response is missing answers.");
  return {
    answers: result.answers as Record<string, unknown>,
    usage: parseUsage(result.usage),
  };
}

function parseUsage(raw: unknown): Usage | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const value = raw as Record<string, unknown>;
  const nonnegative = (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v) && v >= 0;
  if (!nonnegative(value.input_tokens) || !nonnegative(value.output_tokens))
    return undefined;
  return {
    input: value.input_tokens,
    output: value.output_tokens,
    cacheRead: 0,
    cacheWrite: 0,
    totalTokens: value.input_tokens + value.output_tokens,
    cost: {
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      total: nonnegative(value.cost) ? value.cost : 0,
    },
  };
}

export function addUsage(
  total: Usage | undefined,
  next: Usage | undefined,
): Usage | undefined {
  if (!next) return total;
  if (!total) return next;
  return {
    ...total,
    input: total.input + next.input,
    output: total.output + next.output,
    totalTokens: total.totalTokens + next.totalTokens,
    cost: { ...total.cost, total: total.cost.total + next.cost.total },
  };
}
