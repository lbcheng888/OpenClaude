// @ts-nocheck
import {getMainThreadAgentType as Ry,getMainLoopModelOverride as kj,setMainLoopModelOverride as DJ,getRefusalFallbackModelLatch as cgH,rewriteRefusalFallbackPreviousOverride as ys6,lt as w_} from "../session/0132_sent.ts";
import {parseUserSpecifiedModel as D9,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {NSe as gwH,oVe as WFH} from "../permissions/5451_fileHistory.ts";
import {saveAgentSetting as bUH,_a as iK} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {isBuiltInAgent as sA,kg as tA} from "../permissions/4476_toAgentInfos.ts";
import {b as L} from "../../runtime.ts";
/**
 * Semantic restoration for core/5664_requestedAgent.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

// FIXME: unverified name
/** Internal restored helper for core/5664_requestedAgent.ts; behavior is preserved. */
function je4({
  requestedAgent: H,
  agents: _,
  systemPrompt: q,
  preAgentSystemPrompt: K
}: any): any {
  if (H != null && typeof H !== "string") return {
    ok: !1,
    error: "agent must be a string or null"
  };
  let O = typeof H === "string" && H !== "" ? H : void 0,
    T = O ? _.find((j: any): any => j.agentType === O) : void 0;
  if (O && !T) return {
    ok: !1,
    error: `Agent "${O}" not found`
  };
  let z = Ry(),
    $ = z ? _.find((j: any): any => j.agentType === z) : void 0;
  if ($?.model && $.model !== "inherit" && kj() === D9($.model)) DJ(void 0);
  let Y = cgH();
  if (Y && $?.model && $.model !== "inherit" && Y.previousOverride === D9($.model)) ys6(T?.model && T.model !== "inherit" ? D9(T.model) : void 0);
  if (gwH(O, void 0, {
    activeAgents: _,
    allAgents: _
  }), T) bUH(T.agentType);
  let A = $ !== void 0 && !sA($) && q === $.getSystemPrompt(),
    w = K !== void 0 || A,
    f = T && !sA(T) ? T.getSystemPrompt() : void 0;
  if (f && (!q || w)) return {
    ok: !0,
    agentDefinition: T,
    systemPrompt: f,
    preAgentSystemPrompt: K ?? {
      value: A ? void 0 : q
    }
  };
  if (w) return {
    ok: !0,
    agentDefinition: T,
    systemPrompt: K ? K.value : void 0,
    preAgentSystemPrompt: void 0
  };
  return {
    ok: !0,
    agentDefinition: T,
    systemPrompt: q,
    preAgentSystemPrompt: K
  };
}
var Je4 = L((): any => {
  w_();
  tA();
  iq();
  WFH();
  iK();
});
export {je4 as Eyc,Je4 as Cyc};
