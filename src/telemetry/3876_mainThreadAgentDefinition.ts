// @ts-nocheck
import {Wc as U1} from "../api/3868_level.ts";
import {ix as lW,Sz as Or} from "../config/2704_Sz.ts";
import {_L as KN,lq as xp} from "../permissions/2705_matchSessionMode.ts";
import {ro as g8,b as L} from "../../runtime.ts";
import {isBuiltInAgent as sw,scrubPathsConfig as tw} from "../permissions/4454_toAgentInfos.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {fromEnum as QH,Qe as K_} from "../../vendor/m5.ts";
// @ts-nocheck
function sanitizeModelName({
  mainThreadAgentDefinition: H,
  toolUseContext: _,
  customSystemPrompt: q,
  defaultSystemPrompt: K,
  appendSystemPrompt: O,
  overrideSystemPrompt: T
}) {
  if (T) return U1([T]);
  if (lW() && !H) {
    let {
      getCoordinatorSystemPrompt: $
    } = (KN(), g8(xp));
    return U1([$(), ...(O ? [O] : [])]);
  }
  let z = H ? sw(H) ? H.getSystemPrompt({
    toolUseContext: {
      options: _.options
    }
  }) : H.getSystemPrompt() : undefined;
  if (H?.memory) c("tengu_agent_memory_loaded", {
    ...false,
    scope: QH(H.memory),
    source: K_("main-thread")
  });
  if (z && H?.appendSystemPrompt) return U1([...(typeof q === "string" ? [q] : Array.isArray(q) ? q : K), z, ...(O ? [O] : [])]);
  return U1([...(z ? [z] : typeof q === "string" ? [q] : Array.isArray(q) ? q : K), ...(O ? [O] : [])]);
}
var NmH = L(() => {
  Or();
  v_();
  tw();
});

export {sanitizeModelName as E6,NmH as T4e};
