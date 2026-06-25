// @ts-nocheck
import {rl as u4,ri as M7} from "./2235_userFacingName.ts";
import {za as K4,Qr as a8} from "../../vendor/m323.ts";
import {cc as U1} from "../../vendor/m2459.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
/**
 * Semantic restoration for tools/5338_name.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

// FIXME: unverified name
/** Internal restored helper for tools/5338_name.ts; behavior is preserved. */
function pI4(H: any, _: any): any {
  let q = u4(_, H);
  if (q) return q;
  return createStubTool(H);
}
/** Internal restored helper for tools/5338_name.ts; behavior is preserved. */
function createStubTool(H: any): any {
  function _(q: any): any {
    throw Error(`Stub tool ${H}.${q} called \u2014 stub exists only for permission UI rendering.`);
  }
  return {
    name: H,
    isMcp: !1,
    isReadOnly: (): any => !1,
    isConcurrencySafe: (): any => !1,
    isEnabled: (): any => !1,
    inputSchema: K4.record(K4.string(), K4.unknown()),
    maxResultSizeChars: 0,
    userFacingName: (): any => H,
    description: async (): Promise<any> => "",
    prompt: async (): Promise<any> => _("prompt"),
    call: async (): Promise<any> => _("call"),
    checkPermissions: async (): Promise<any> => _("checkPermissions"),
    toAutoClassifierInput: (): any => "",
    mapToolResultToToolResultBlockParam: (q: any, K: any): any => ({
      type: "tool_result",
      tool_use_id: K,
      content: ""
    }),
    renderToolUseMessage: (q: any): any => {
      let K = Object.entries(q);
      if (K.length === 0) return "";
      return K.slice(0, 3).map(([O, T]: any): any => {
        let z = typeof T === "string" ? U1(T) : bH(T);
        return `${U1(O)}: ${z}`;
      }).join(", ");
    }
  };
}
var BI4 = L((): any => {
  a8();
  M7();
  H6();
});
export {pI4 as dJl,createStubTool as SUm,BI4 as pJl};
