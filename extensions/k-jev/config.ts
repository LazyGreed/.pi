export interface JevConfig {
  baseUrl: string;
  model: string;
  apiKey: string;
}

export class JevError extends Error {}

export function resolveConfig(env: NodeJS.ProcessEnv = process.env): JevConfig {
  const required = (name: string): string => {
    const value = env[name]?.trim();
    if (!value)
      throw new JevError(
        `k-jev: ${name} is required. Export it before starting Pi (fish: set -Ux ${name} VALUE).`,
      );
    return value;
  };
  const baseUrl = required("PI_JEV_BASE_URL");
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    throw new JevError(
      "k-jev: PI_JEV_BASE_URL must be an absolute HTTP(S) decision endpoint URL.",
    );
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.hash
  ) {
    throw new JevError(
      "k-jev: PI_JEV_BASE_URL must be HTTP(S), without embedded credentials or a fragment.",
    );
  }
  const model = required("PI_JEV_MODEL");
  if (model.length > 256 || /[\x00-\x1f\x7f]/.test(model)) {
    throw new JevError(
      "k-jev: PI_JEV_MODEL is invalid (maximum 256 characters, no control characters).",
    );
  }
  const apiKey = required("PI_JEV_API_KEY");
  if (!/^[\x21-\x7e]+$/.test(apiKey)) {
    throw new JevError(
      "k-jev: PI_JEV_API_KEY must be a nonempty printable token without whitespace.",
    );
  }
  return { baseUrl: url.href, model, apiKey };
}

// Never expose raw provider, network, or filesystem errors: they may contain state or secrets.
export function safeError(error: unknown): string {
  return error instanceof JevError ? error.message : "k-jev: Operation failed.";
}
