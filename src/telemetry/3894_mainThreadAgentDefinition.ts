// @ts-nocheck
import {vc as U1} from "../api/3886_level.ts";
import {yw as lW,jz as Or} from "../config/2716_jz.ts";
import {NO as KN,k4 as xp} from "../permissions/2717_matchSessionMode.ts";
import {oo as g8,b as L} from "../../runtime.ts";
import {isBuiltInAgent as sw,kg as tw} from "../permissions/4476_toAgentInfos.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Le as QH,Ve as K_} from "../../vendor/m5.ts";
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
export {sanitizeModelName as Fq,NmH as Nqe};
