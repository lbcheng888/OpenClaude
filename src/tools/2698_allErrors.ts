// @ts-nocheck
import {Fl,bt} from "../../vendor/m195.ts";
import {b,M} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {Xt,Le} from "../config/0228_encoding.ts";
import {rZt} from "../../vendor/m419.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
var I0 = "NotebookEdit";
var AE = "Skill";
var freshFeatureValues = "SendMessage";
var Kw = "TaskCreate";
var Tz = "TaskGet";
var mP = "TaskUpdate";
/** Returns true if the session is non-interactive or a background session. */
function RNi(session: any): boolean {
  return session.isNonInteractiveSession || session.isBgSession === !0;
}
/** Memoized wrapper around ECd: returns cached schema compilation result for the given schema. */
function Ftt(schema: any): any {
  let cached = vNi.get(schema);
  if (cached) return cached;
  let result = ECd(schema);
  return vNi.set(schema, result), result;
}
/** Compiles a JSON schema using Ajv (allErrors mode) and returns either a tool definition or an error. */
function ECd(schema: any): any {
  try {
    let ajv = new wNi.Ajv({
      allErrors: !0
    });
    if (!ajv.validateSchema(schema)) return {
      error: ajv.errorsText(ajv.errors)
    };
    let validate = ajv.compile(schema);
    return {
      tool: {
        ...hjr,
        inputJSONSchema: schema,
        async call(output: any) {
          if (!validate(output)) {
            let errorMsg = validate.errors?.map((err: any) => `${err.instancePath || "root"}: ${err.message}`).join(", "),
              keywords = validate.errors?.map((err: any) => err.keyword).join(",");
            throw new Fl(`Output does not match required schema: ${errorMsg}`, `StructuredOutput schema mismatch: ${keywords ?? ""}`);
          }
          return {
            data: "Structured output provided successfully",
            structured_output: output
          };
        }
      }
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
var wNi,
  SCd,
  bCd,
  bf = "StructuredOutput",
  hjr,
  vNi;
/** Module init: sets up Ajv import, schema lazies, and the StructuredOutput tool definition. */
var aq = b(() => {
  Xr();
  Ri();
  bt();
  Xt();
  wNi = M(rZt(), 1), SCd = we(() => E.object({}).passthrough()), bCd = we(() => E.string().describe("Structured output tool result"));
  hjr = pi({
    isMcp: !1,
    isEnabled() {
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    isOpenWorld() {
      return !1;
    },
    name: bf,
    searchHint: "return the final response as structured JSON",
    maxResultSizeChars: 1e5,
    async description() {
      return "Return structured output in the requested format";
    },
    async prompt() {
      return "Use this tool to return your final response in the requested structured format. You MUST call this tool exactly once at the end of your response to provide the structured output.";
    },
    get inputSchema() {
      return SCd();
    },
    get outputSchema() {
      return bCd();
    },
    async call(input: any) {
      return {
        data: "Structured output provided successfully",
        structured_output: input
      };
    },
    async checkPermissions(input: any) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    renderToolUseMessage(fields: any) {
      let keys = Object.keys(fields);
      if (keys.length === 0) return null;
      if (keys.length <= 3) return keys.map((key: any) => `${key}: ${Le(fields[key])}`).join(", ");
      return `${keys.length} fields: ${keys.slice(0, 3).join(", ")}\u2026`;
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result
      };
    }
  }), vNi = new WeakMap();
});
export {I0,AE,freshFeatureValues,Kw,Tz,mP,RNi,Ftt,ECd,wNi,SCd,bCd,bf,hjr,vNi,aq};
