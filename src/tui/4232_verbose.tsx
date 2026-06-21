// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {Gn as Box,sc as l4} from "../../vendor/m2455.ts";
import {Text} from "../../vendor/m2423.ts";
import {E as z} from "../../vendor/m319.ts";
import {pi as defineTool,Ri as M7} from "../tools/2227_userFacingName.ts";
import {Le as stringifyTraced,Xt as H6} from "../config/0228_encoding.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// Subsystem: tui — React/Ink rendering for "registered" eval/REPL tools.
//
// This module bridges tools that are registered at runtime inside the eval/REPL
// sandbox (e.g. from `4220_colors.ts`, via `X.sealers`) into the standard Tool
// interface understood by the rest of the renderer (`defineTool` / `c9`).
//
// Original obfuscated identifiers (kept here for traceability):
//   QxK -> buildRegisteredToolsFromMap
//   eXO -> createRegisteredEvalTool
//   sXO -> RegisteredToolResultMessage
//   tXO -> RegisteredToolErrorMessage
//   zc  -> React            (assigned in module init: zc = u(WH(), 1))
//   d6  -> Box              (Ink layout container)
//   V   -> Text             (Ink text element)
//   c9  -> defineTool       (tools/2206 — merges defaults + descriptors)
//   k   -> z                (zod)
//   bH  -> stringifyTraced  (config/0226 — traced JSON.stringify)

// NOTE: the following are cross-module references resolved at runtime by the
// bundler's lazy-module init (`cxK`). They are declared `declare const` here so
// the typed source compiles 1:1 without changing any runtime binding.

// React namespace is declared as a mutable `var` near the module init below
// (original `var zc;`, lazily assigned `zc = u(WH(), 1)`). JSX in this file
// compiles down to `React.createElement(...)`, matching the original calls.

/** Ink layout container component. */
declare const Box: (props: {
  children?: import("react").ReactNode;
  height?: number;
}) => import("react").ReactElement;
/** Ink text element component. */
declare const Text: (props: {
  children?: import("react").ReactNode;
  color?: string;
  dimColor?: boolean;
}) => import("react").ReactElement;
/** Tool factory: merges shared tool defaults with the given descriptors. */
declare function defineTool<T>(descriptors: T): Tool;
/** zod, used to build the passthrough input schema. */
declare const z: {
  object(shape: Record<string, never>): { passthrough(): unknown };
};
/** Traced `JSON.stringify` (uses `using` tracing under the hood). */
declare function stringifyTraced(
  value: unknown,
  replacer: null,
  space: number,
): string;

// --- Lazy module-init helpers (bundler-provided) ---------------------------
/** Wraps a module-init thunk so dependent modules are initialized on first use. */
declare function L(init: () => void): () => void;
/** CommonJS/ESM interop helper (esModule unwrap). */
declare function u<T>(mod: T, esModule: 0 | 1): T;
/** Lazy getter for the bundled React module. */
declare function WH(): typeof import("react");
// Dependent-module init thunks pulled in by `cxK`.
declare function a8(): void;
declare function l4(): void;
declare function nH(): void;
declare function M7(): void;
declare function H6(): void;

/**
 * Serializer/"sealer" surface exposed by the eval/REPL VM (see `X.sealers` in
 * `4220_colors.ts`). Used to safely turn arbitrary VM values into strings,
 * falling back to `toStr` when `stringify` throws (e.g. on cyclic data).
 */
interface Sealers {
  /** JSON-style serialize; may throw on non-serializable input. */
  stringify(value: unknown, replacer?: null, space?: number): string;
  /** Best-effort string coercion that never throws. */
  toStr(value: unknown): string;
}

/**
 * Definition of a tool that was registered dynamically inside the eval sandbox.
 */
interface RegisteredToolDefinition {
  /** Programmatic tool name (becomes `eval_registered__<name>`). */
  name: string;
  /** Optional human-friendly label shown in the UI. */
  displayName?: string;
  /** Description, returned for both the prompt and the description hook. */
  description: string;
  /** JSON Schema describing the tool's input. */
  schema: unknown;
  /** Implementation invoked with the parsed tool input. */
  handler(input: Record<string, unknown>): Promise<unknown> | unknown;
}

/** Minimal shape of the Tool objects produced by `defineTool`. */
type Tool = unknown;

/**
 * Convert a map of dynamically registered tool definitions into the standard
 * Tool objects consumed by the renderer.
 *
 * @param registeredToolsMap Map whose values are registered tool definitions.
 * @param sealers VM serializer used to render results/errors.
 * @returns Array of `defineTool`-wrapped tools.
 */
function buildRegisteredToolsFromMap(
  registeredToolsMap: Map<unknown, RegisteredToolDefinition>,
  sealers: Sealers,
): Tool[] {
  let tools: Tool[] = [];
  for (let [, definition] of registeredToolsMap)
    tools.push(createRegisteredEvalTool(definition, sealers));
  return tools;
}

/**
 * Render the result of a registered tool call as Ink markup. Pretty-prints the
 * result via `sealers.stringify`, falling back to `sealers.toStr` on failure.
 */
function RegisteredToolResultMessage(result: unknown, sealers: Sealers) {
  let rendered: string;
  try {
    rendered = sealers.stringify(result, null, 2);
  } catch {
    rendered = sealers.toStr(result);
  }
  return (
    <Box>
      <Text>{rendered}</Text>
    </Box>
  );
}

/**
 * Render an error raised while using a registered tool. Shows the error string
 * if a string was provided, otherwise a generic "Error" label.
 */
function RegisteredToolErrorMessage(
  error: unknown,
  { verbose }: { verbose: boolean },
) {
  return (
    <Box>
      <Text color="error">{typeof error === "string" ? error : "Error"}</Text>
    </Box>
  );
}

/**
 * Build a standard Tool object for a single dynamically registered eval tool.
 *
 * The resulting tool always asks for permission before running, is treated as
 * neither concurrency-safe nor read-only, and serializes its result through the
 * provided `sealers`.
 *
 * @param definition The registered tool definition.
 * @param sealers VM serializer used to render results/errors.
 */
function createRegisteredEvalTool(
  definition: RegisteredToolDefinition,
  sealers: Sealers,
): Tool {
  let inputSchema = z.object({}).passthrough();
  return defineTool({
    name: `eval_registered__${definition.name}`,
    maxResultSizeChars: 1e5,
    async prompt() {
      return definition.description;
    },
    async description() {
      return definition.description;
    },
    inputSchema,
    inputJSONSchema: definition.schema,
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    toAutoClassifierInput(input: Record<string, unknown>) {
      let keys = Object.keys(input);
      return keys.length > 0
        ? `${definition.name}(${keys.join(", ")})`
        : definition.name;
    },
    async checkPermissions() {
      return {
        behavior: "ask",
        message: `Execute registered tool "${definition.name}"`,
      };
    },
    async call(input: Record<string, unknown>) {
      return {
        data: await definition.handler(input),
      };
    },
    userFacingName() {
      return definition.displayName ?? definition.name;
    },
    getToolUseSummary() {
      return null;
    },
    mapToolResultToToolResultBlockParam(result: unknown, toolUseId: string) {
      let content: string;
      try {
        content = sealers.stringify(result);
      } catch {
        content = sealers.toStr(result);
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content,
      };
    },
    renderToolUseMessage(input: unknown) {
      try {
        let serialized = stringifyTraced(input, null, 2);
        return `${definition.name}(${serialized})`;
      } catch {
        return `${definition.name}(...)`;
      }
    },
    renderToolResultMessage: (result: unknown) =>
      RegisteredToolResultMessage(result, sealers),
    renderToolUseRejectedMessage() {
      return (
        <Box>
          <Text color="warning">Rejected</Text>
        </Box>
      );
    },
    renderToolUseErrorMessage: RegisteredToolErrorMessage,
    renderToolUseProgressMessage() {
      return null;
    },
  });
}

// --- Module init -----------------------------------------------------------
// Mutable binding for the React namespace; populated by the init thunk below.
// (Original: `var zc;` with `zc = u(WH(), 1)` inside `cxK`.)
var React: typeof import("react");

/**
 * Lazy module initializer. Initializes the dependent modules this file relies
 * on (tool defaults, Ink components, etc.) and binds the React namespace.
 * (Original obfuscated name: `cxK`.)
 */
var initModule = L(() => {
  a8();
  l4();
  nH();
  M7();
  H6();
  React = u(WH(), 1);
});

export {buildRegisteredToolsFromMap as y5a,RegisteredToolResultMessage as bPp,RegisteredToolErrorMessage as EPp,createRegisteredEvalTool as CPp,React as cG,initModule as T5a};
