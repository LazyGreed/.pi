import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { JevError, resolveConfig, safeError } from "./config.ts";
import { evaluate, evaluateOutputSchema, evaluateSchema } from "./evaluate.ts";
import { search, searchOutputSchema, searchSchema } from "./search.ts";

export default function kJev(pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    try {
      resolveConfig();
    } catch (error) {
      if (ctx.hasUI) ctx.ui.notify(safeError(error), "warning");
      else throw new JevError(safeError(error));
    }
  });

  pi.registerTool(
    defineTool({
      name: "jev_evaluate",
      label: "Jev evaluate",
      description:
        "Bounded semantic judgment of JSON state using named typed questions: noul (yes/no probability), choice (fixed labels), score (ordered rubric, fractional zero-based score). Supply instructions and criteria. Returns compact typed evidence, not authority; verify important conclusions with normal tools/tests. Sends only the supplied state and questions to the configured Jev endpoint. Invoked only when you choose to call it.",
      parameters: evaluateSchema,
      outputSchema: evaluateOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      async execute(_id, input, signal) {
        try {
          const { usage, ...data } = await evaluate(
            input,
            resolveConfig(),
            signal,
          );
          return {
            content: [{ type: "text", text: JSON.stringify(data) }],
            details: data,
            structuredContent: data,
            usage,
          };
        } catch (error) {
          throw new JevError(safeError(error));
        }
      },
    }),
  );

  pi.registerTool(
    defineTool({
      name: "jev_search",
      label: "Jev search",
      description:
        "Evaluate a yes/no semantic question against 1-200 candidate UTF-8 files (each at most 256 KiB). Reads files internally and sends contents to the configured Jev endpoint, never into your context. Uses four workers per call; returns only paths, typed answers/probabilities, or individual errors, in input order. Relative paths resolve from Pi's cwd; ~/ is supported. No excerpts. Jev is evidence, not authority: read promising files normally to verify. Find candidates first with normal path-discovery tools.",
      parameters: searchSchema,
      outputSchema: searchOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: true,
      },
      async execute(_id, input, signal, _onUpdate, ctx) {
        try {
          const { usage, ...data } = await search(
            input,
            resolveConfig(),
            ctx.cwd,
            signal,
          );
          return {
            content: [{ type: "text", text: JSON.stringify(data) }],
            details: data,
            structuredContent: data,
            usage,
          };
        } catch (error) {
          throw new JevError(safeError(error));
        }
      },
    }),
  );
}
