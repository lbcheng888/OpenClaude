// @ts-nocheck
import {Pot as C6_,T1t as oN_} from "../../vendor/m3251.ts";
import {hjr as ou8,bf as gz,aq as Qg} from "./2698_allErrors.ts";
import {Dct as lK_,x9 as tx} from "../../vendor/m4033.ts";
import {q9n as pS6,lo as zq} from "./5190_userPromptCount.ts";
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// FIXME: unverified name: wd6
/* Restored Claude Code 2.1.177 module: Always-loaded verification tool..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function wd6(H: any, _: any): any {
  return C6_(H, _);
}
/* Builds the always-loaded verification result tool. */
// FIXME: unverified name: JL4
function JL4(): any {
  return {
    ...ou8,
    alwaysLoad: !0,
    inputSchema: sU_(),
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
    async prompt(): Promise<any> {
      return "Use this tool to return your verification result. You MUST call this tool exactly once at the end of your response.";
    }
  };
}
// FIXME: unverified name: fd6
function fd6(H: any, _: any): any {
  lK_(H, _, "Stop", "", (q: any): any => pS6(q, gz), `You MUST call the ${gz} tool to complete this request. Call this tool now.`, {
    timeout: 5000
  });
}
var sU_;
var jd6 = L((): any => {
  a8();
  Qg();
  oN_();
  zq();
  tx();
  sU_ = kH((): any => k.object({
    ok: k.boolean().describe("Whether the condition was met"),
    reason: k.string().describe("Reason, if the condition was not met").optional(),
    impossible: k.boolean().describe("Whether the condition can never be satisfied (only meaningful when ok is false)").optional()
  }));
});

export {wd6 as JKn,JL4 as XMl,fd6 as XKn,sU_ as U5t,jd6 as QKn};
