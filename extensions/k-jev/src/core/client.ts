import { type JevConfig, JevError } from "./config.js";
import type { Questions } from "./evaluate.js";
import { parseUsage } from "./usage.js";

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
    body = JSON.stringify({ model: config.model, state, questions });
  } catch {
    throw new JevError("k-jev: State must be JSON-serializable.");
  }
  if (Buffer.byteLength(body) > MAX_REQUEST_BYTES)
    throw new JevError(
      "k-jev: Request exceeds 1 MiB. Narrow the state or questions.",
    );
  if (!Object.hasOwn(JSON.parse(body), "state"))
    throw new JevError("k-jev: State must be JSON-serializable.");
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
          ? " Check K_JEV_API_KEY and endpoint access."
          : response.status === 404
            ? " Check K_JEV_BASE_URL (the full decision endpoint) and K_JEV_MODEL."
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
      "k-jev: Jev network request failed. Check K_JEV_BASE_URL and connectivity.",
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
