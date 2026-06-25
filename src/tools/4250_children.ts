// @ts-nocheck
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {C} from "../../vendor/m321.ts";
import {Ks,ri} from "./2235_userFacingName.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Adapters that wrap externally "registered" eval tools (each described by a
 * name/description/schema/handler record) into the internal Claude Code tool
 * interface so they can participate in the normal tool-use lifecycle.
 */

/** A single registered eval tool definition supplied by a caller. */
interface RegisteredEvalTool {
  name: string;
  displayName?: string;
  description: string;
  /** JSON Schema describing the tool's input. */
  schema: unknown;
  /** Executes the tool and resolves to its result payload. */
  handler: (input: unknown) => unknown | Promise<unknown>;
}

/** Serializer used to stringify arbitrary tool inputs/results safely. */
interface Serializer {
  stringify(value: unknown, replacer?: unknown, space?: number): string;
  toStr(value: unknown): string;
}

/**
 * Wraps every entry of a registered-tool map into the internal tool interface.
 * Map keys are ignored; only the values (tool definitions) are used.
 */
function Fja(registeredTools: Iterable<[unknown, RegisteredEvalTool]>, serializer: Serializer) {
  let wrappedTools = [];
  for (let [, registeredTool] of registeredTools) wrappedTools.push(WUp(registeredTool, serializer));
  return wrappedTools;
}

/** Renders a successful tool result by pretty-printing it (falling back to toStr). */
function $Up(result: unknown, serializer: Serializer) {
  let rendered: string;
  try {
    rendered = serializer.stringify(result, null, 2);
  } catch {
    rendered = serializer.toStr(result);
  }
  return D5e.jsx(Yn, {
    children: D5e.jsx(v, {
      children: rendered
    })
  });
}

/** Renders a tool-use error message (only the verbose flag is destructured). */
function qUp(error: unknown, {
  verbose: verbose
}: { verbose: boolean }) {
  return D5e.jsx(Yn, {
    children: D5e.jsx(v, {
      color: "error",
      children: typeof error === "string" ? error : "Error"
    })
  });
}

/** Builds the internal tool object for a single registered eval tool. */
function WUp(registeredTool: RegisteredEvalTool, serializer: Serializer) {
  let inputSchema = C.object({}).passthrough();
  return Ks({
    name: `eval_registered__${registeredTool.name}`,
    maxResultSizeChars: 1e5,
    async prompt() {
      return registeredTool.description;
    },
    async description() {
      return registeredTool.description;
    },
    inputSchema: inputSchema,
    inputJSONSchema: registeredTool.schema,
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    toAutoClassifierInput(input) {
      let inputKeys = Object.keys(input);
      return inputKeys.length > 0 ? `${registeredTool.name}(${inputKeys.join(", ")})` : registeredTool.name;
    },
    async checkPermissions() {
      return {
        behavior: "ask",
        message: `Execute registered tool "${registeredTool.name}"`
      };
    },
    async call(input) {
      return {
        data: await registeredTool.handler(input)
      };
    },
    userFacingName() {
      return registeredTool.displayName ?? registeredTool.name;
    },
    getToolUseSummary() {
      return null;
    },
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      let content: string;
      try {
        content = serializer.stringify(result);
      } catch {
        content = serializer.toStr(result);
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: content
      };
    },
    renderToolUseMessage(input) {
      try {
        let renderedInput = Pe(input, null, 2);
        return `${registeredTool.name}(${renderedInput})`;
      } catch {
        return `${registeredTool.name}(...)`;
      }
    },
    renderToolResultMessage: result => $Up(result, serializer),
    renderToolUseRejectedMessage() {
      return D5e.jsx(Yn, {
        children: D5e.jsx(v, {
          color: "warning",
          children: "Rejected"
        })
      });
    },
    renderToolUseErrorMessage: qUp,
    renderToolUseProgressMessage() {
      return null;
    }
  });
}
var D5e;
var Bja = b(() => {
  Qr();
  Pl();
  je();
  ri();
  tn();
  D5e = x(oe(), 1);
});

export {Fja,$Up,qUp,WUp,D5e,Bja};
