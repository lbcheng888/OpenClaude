// @ts-nocheck
import {Pit,XFt} from "../../vendor/m3267.ts";
import {zVr,MO} from "./2710_allErrors.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
/* Restored Claude Code 2.1.190 module: Always-loaded verification tool.
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function KXn(toolInput: any, context: any): any {
  return Pit(toolInput, context);
}
/* Builds the always-loaded verification result tool descriptor. */
function L3l(): any {
  return {
    ...zVr,
    alwaysLoad: !0,
    inputSchema: hKt(),
    inputJSONSchema: {
      type: "object",
      properties: {
        ok: {
          type: "boolean",
          description: "Whether the condition was met"
        },
        reason: {
          type: "string",
          description: "Reason, if the condition was not met"
        }
      },
      required: ["ok"],
      additionalProperties: !1
    },
    async prompt(): Promise<string> {
      return "Use this tool to return your verification result. You MUST call this tool exactly once at the end of your response.";
    }
  };
}
/** Lazily-built zod schema for the verification result input. */
var hKt: any;
var UOo = b((): void => {
  Qr();
  MO();
  XFt();
  hKt = ve((): any => C.object({
    ok: C.boolean().describe("Whether the condition was met"),
    reason: C.string().describe("Reason, if the condition was not met").optional(),
    impossible: C.boolean().describe("Whether the condition can never be satisfied (only meaningful when ok is false)").optional()
  }));
});

export {KXn,L3l,hKt,UOo};
