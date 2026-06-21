// @ts-nocheck
import {Eu as bu} from "../../vendor/m3812.ts";
import {bo as vo,configProtoStore as fo} from "../../vendor/m2458.ts";
import {Hwl as lvl,owo as ZCo,pft as qmt} from "../../vendor/m4940.ts";
import {getActiveAgentsFromList as yU,scrubPathsConfig as u_} from "../permissions/4454_toAgentInfos.ts";
import {RG as uG,q9 as R9} from "../../vendor/m4604.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {Xwl as kvl,Qwl as Hvl} from "../../vendor/m4950.ts";
import {b,M as L} from "../../runtime.ts";
import {$y as Fy} from "../../vendor/m3814.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function Ivl({
  tools: e,
  existingAgents: t,
  onComplete: n
}) {
  let {
      wizardData: r
    } = bu(),
    [o, s] = xLH.useState(null),
    i = vo(),
    a = xLH.useCallback(async u => {
      if (!r?.finalAgent) return;
      try {
        if (await lvl(r.location, r.finalAgent.agentType, r.finalAgent.whenToUse, r.finalAgent.tools, r.finalAgent.getSystemPrompt(), true, r.finalAgent.color, r.finalAgent.model, r.finalAgent.memory), i(p => {
          if (!r.finalAgent) return p;
          let m = p.agentDefinitions.allAgents.concat(r.finalAgent);
          return {
            ...p,
            agentDefinitions: {
              ...p.agentDefinitions,
              activeAgents: yU(m),
              allAgents: m
            }
          };
        }), u) {
          let p = ZCo({
            source: r.location,
            agentType: r.finalAgent.agentType
          });
          await uG(p);
        }
        j("tengu_agent_created", {
          agent_type: r.finalAgent.agentType,
          generation_method: r.wasGenerated ? "generated" : "manual",
          source: r.location,
          tool_count: r.finalAgent.tools?.length ?? "all",
          has_custom_model: !!r.finalAgent.model,
          has_custom_color: !!r.finalAgent.color,
          has_memory: !!r.finalAgent.memory,
          memory_scope: r.finalAgent.memory ?? "none",
          ...(u ? {
            opened_in_editor: true
          } : {})
        });
        let d = u ? `Created agent: ${gt.bold(r.finalAgent.agentType)} and opened in editor. If you made edits, restart to load the latest version.` : `Created agent: ${gt.bold(r.finalAgent.agentType)}`;
        n(d);
      } catch (d) {
        s(d instanceof Error ? d.message : "Failed to save agent");
      }
    }, [r, n, i]),
    l = xLH.useCallback(() => a(false), [a]),
    c = xLH.useCallback(() => a(true), [a]);
  return xLH.default.createElement(kvl, {
    tools: e,
    existingAgents: t,
    onSave: l,
    onSaveAndEdit: c,
    error: o
  });
}
var xLH;
var HJ4 = b(() => {
  au();
  Ct();
  fo();
  u_();
  R9();
  Fy();
  qmt();
  Hvl();
  xLH = L(Te(), 1);
});

export {Ivl as Zwl,xLH as ePe,HJ4 as eRl};
