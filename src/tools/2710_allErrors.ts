// @ts-nocheck
import {Ta,Ct} from "../../vendor/m197.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {Mtn} from "../../vendor/m421.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
var Y0 = "NotebookEdit";
var CE = "Skill";
var o_ = "SendMessage";
var QR = "TaskCreate";
var Kz = "TaskGet";
var wD = "TaskUpdate";
/** Returns true if the session is non-interactive or a background session. */
function p3i(session: any): boolean {
  return session.isNonInteractiveSession || session.isBgSession === !0;
}
/** Memoized wrapper around eOd: returns cached schema compilation result for the given schema. */
function qrt(schema: any): any {
  let cached = u3i.get(schema);
  if (cached) return cached;
  let result = eOd(schema);
  return u3i.set(schema, result), result;
}
/** Compiles a JSON schema using Ajv (allErrors mode) and returns either a tool definition or an error. */
function eOd(schema: any): any {
  try {
    let ajv = new d3i.Ajv({
      allErrors: !0
    });
    if (!ajv.validateSchema(schema)) return {
      error: ajv.errorsText(ajv.errors)
    };
    let validate = ajv.compile(schema);
    return {
      tool: {
        ...zVr,
        inputJSONSchema: schema,
        async call(output: any) {
          if (!validate(output)) {
            let errorMsg = validate.errors?.map((err: any) => `${err.instancePath || "root"}: ${err.message}`).join(", "),
              keywords = validate.errors?.map((err: any) => err.keyword).join(",");
            throw new Ta(`Output does not match required schema: ${errorMsg}`, `StructuredOutput schema mismatch: ${keywords ?? ""}`);
          }
          return {
            data: "Structured output provided successfully",
            structured_output: output,
            endsTurn: !0
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
var d3i,
  QPd,
  ZPd,
  Rp = "StructuredOutput",
  zVr,
  u3i;
/** Module init: sets up Ajv import, schema lazies, and the StructuredOutput tool definition. */
var MO = b(() => {
  Qr();
  ri();
  Ct();
  tn();
  d3i = x(Mtn(), 1), QPd = ve(() => C.object({}).passthrough()), ZPd = ve(() => C.string().describe("Structured output tool result"));
  zVr = Ks({
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
    name: Rp,
    searchHint: "return the final response as structured JSON",
    maxResultSizeChars: 1e5,
    async description() {
      return "Return structured output in the requested format";
    },
    async prompt() {
      return "Use this tool to return your final response in the requested structured format. You MUST call this tool exactly once at the end of your response to provide the structured output.";
    },
    get inputSchema() {
      return QPd();
    },
    get outputSchema() {
      return ZPd();
    },
    async call(input: any) {
      return {
        data: "Structured output provided successfully",
        structured_output: input,
        endsTurn: !0
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
      if (keys.length <= 3) return keys.map((key: any) => `${key}: ${Pe(fields[key])}`).join(", ");
      return `${keys.length} fields: ${keys.slice(0, 3).join(", ")}\u2026`;
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result
      };
    }
  }), u3i = new WeakMap();
});

export {Y0,CE,o_,QR,Kz,wD,p3i,qrt,eOd,d3i,QPd,ZPd,Rp,zVr,u3i,MO};
