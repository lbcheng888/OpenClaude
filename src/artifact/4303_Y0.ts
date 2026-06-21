// @ts-nocheck
import {_3n as D9n,Yao as Kio} from "../tui/4216_toolPermissionContext.ts";
import {J3n as d3n,Dpo as wdo} from "../tui/4247_task_id.ts";
import {Su as du,tN as G1,oA as cA} from "../config/2697_oA.ts";
import {Rl as xl,TU as uU} from "../tui/4359_isSearch.ts";
import {T9 as s9,$4e as y4e} from "../tools/3920_pattern.ts";
import {UL as IL,Jge as Pge} from "../tools/3918_items.ts";
import {$ot as bot,Zw as Yw,bW as oW} from "../config/3273_bW.ts";
import {I9 as g9,Z$t as O$t} from "../tools/4089_tool.ts";
import {gh,Rce as fce} from "../tools/4419_tabAwareSeparator.ts";
import {IE as wE,MIe as _Ie} from "../tools/4336_content.ts";
import {_b as Ab,wce as mce} from "../tools/4066_file_path.ts";
import {k6 as g6,rut as Ict} from "../tools/4070_notebook_path.ts";
import {yU as cU,w9t as i9t} from "../tools/4155_url.ts";
import {Pke as hke,j0n as o0n} from "../tools/3319_todos.ts";
import {X3n as p3n,Opo as xdo} from "../tools/4250_type.ts";
import {Zut as Rut,cpo as odo} from "../tools/4224_task_id.ts";
import {out as Dct,j$t as C$t} from "../tui/4071_answers.ts";
import {aut as Lct,ico as rlo} from "../tools/4093_sanitizedName.ts";
import {p$n as w2n,nco as Zao} from "../tools/4085_message.ts";
import {TE as gE,Nk as Ok} from "../agent/3316_id.ts";
import {gGa as X5a,_Ga as Q5a} from "../tools/4265_subject.ts";
import {SGa as tWa,bGa as nWa} from "../tools/4266_taskId.ts";
import {vGa as sWa,wGa as iWa} from "../tools/4267_taskId.ts";
import {HGa as uWa,IGa as dWa} from "../tools/4269_tasks.ts";
import {st as rt} from "../../vendor/m5.ts";
import {Bpo as Ddo,VWa as w5a} from "../tools/4256_line.ts";
import {isWorktreeModeEnabled as But} from "../../vendor/m4269.ts";
import {ZWa as P5a,eGa as O5a} from "../tools/4260_name.ts";
import {cGa as j5a,uGa as W5a} from "../tools/4262_changedFiles.ts";
import {Rpo as Sdo,oWa as $8a} from "../tools/4244_colors.ts";
import {sWa as q8a,iWa as j8a} from "../tools/4245_delaySeconds.ts";
import {D8a as hja,P8a as gja} from "../tui/4217_role.tsx";
import {f5a as Xja,A5a as Qja} from "../tools/4230_file_uuid.ts";
import {bq as aq,uLt as FOt} from "../tools/2806_server.ts";
import {Pq as yq,bMt as JLt} from "../tools/3162_uri.ts";
import {hL as iL,_z as nz} from "../telemetry/2692__z.ts";
import {ToolSearchTool as oOt,uRn as vwn} from "../tools/2755_outputSchema.ts";
import {Ala as naa,kJr as HYr} from "../tools/3310_servers.ts";
import {getDenyRuleForTool as A3t,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {mS as iS,mee as ree} from "../../vendor/m2749.ts";
import {S7a as eVa,T7a as ZGa} from "../tools/4293_inFlightTeammateResumes.ts";
import {ro as Pr,b} from "../../runtime.ts";
import {qut as gut,N3t as f3t} from "../tui/4327_detectBlockedSleepPattern.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {ox as tx,PA as MA,$tt as Ett,Lv as Hv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Ow as Iw,R4 as f4} from "../agent/2214_available.ts";
import {bf as Gf,aq as H5} from "../tools/2698_allErrors.ts";
import {Lc as Vc,Ri,QAi as Wfi} from "../tools/2227_userFacingName.ts";
import {ns as Xo} from "../mcp/2194_mcpServerName.ts";
import {gWa as X8a} from "../tools/4251_name.ts";
import {jtt as vtt} from "../../vendor/m2701.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {$Ga as SWa,UGa as TWa} from "../tools/4271_CronCreateTool.ts";
import {jGa as EWa,qGa as bWa} from "../tools/4272_CronDeleteTool.ts";
import {GGa as vWa,WGa as CWa} from "../tools/4273_CronListTool.ts";
import {tVa as LWa,eVa as OWa} from "../tools/4276_triggerResponseSchema.ts";
import {Ddo as Ruo,Ido as wuo} from "../tools/4199_applyCcrTimeoutCap.ts";
import {iVa as UWa,sVa as FWa} from "../tools/4278_SendUserFileTool.ts";
import {mVa as KWa,pVa as VWa} from "../tools/4281_PushNotificationTool.ts";
import {WVa as vGa,jVa as CGa} from "../tools/4287_DesignSyncTool.ts";
import {r7a as BGa,n7a as NGa} from "../tools/4288_resolveWritePath.ts";
import {D7a as dVa,I7a as uVa} from "../tui/4296_ArtifactTool.ts";
import {_L as lL,lq as z4} from "../permissions/2705_matchSessionMode.ts";
import {M7a as AVa,L7a as fVa} from "../tools/4298_ShareOnboardingGuideTool.ts";
import {lKa as $Va,aKa as UVa} from "../../vendor/m4301.ts";
import {vdo as Tuo,Cdo as yuo} from "../tools/4193_WorkflowTool.ts";
// @ts-nocheck
function Epo(e) {
  let lowered = e.toLowerCase();
  if (!uOp.includes(lowered)) return null;
  return lowered;
}
function Cpo() {
  let allTools = YW(),
    enabledFlags = allTools.map(tool => tool.isEnabled());
  return allTools.filter((tool, idx) => enabledFlags[idx]).map(tool => tool.name);
}
function YW() {
  return [D9n, d3n, ...(du() ? [xl] : []), ...[s9, IL].filter(tool => !bot().has(tool.name)), g9, gh, wE, Ab, g6, cU, hke, p3n, Rut, Dct, Lct, w2n, ...[], cOp, ...(YVa ? [YVa] : []), ...(r7a ? [r7a] : []), ...(gE() ? [X5a, tWa, sWa, uWa] : []), ...(e7a ? [e7a] : []), ...(t7a ? [t7a] : []), ...(n7a ? [n7a] : []), ...(rt("true") ? [Ddo] : []), ...(XVa ? [XVa] : []), ...(QVa ? [QVa] : []), ...(ZVa ? [ZVa] : []), ...(But() ? [P5a, j5a] : []), Spo(), ...(a7a ? [a7a] : []), ...(l7a ? [l7a] : []), ...(JVa ? [JVa] : []), Sdo, ...(Xut ? [Xut] : []), ...sOp, ...iOp, q8a, ...(qVa ? [qVa] : []), ...(jVa ? [jVa] : []), ...(WVa ? [WVa] : []), hja, ...(GVa ? [GVa] : []), ...aOp, ...(VVa ? [VVa] : []), Xja, lOp, ...(KVa ? [KVa] : []), ...(zVa ? [zVa] : []), ...(bpo() ? [bpo()] : []), ...(s7a ? [s7a] : []), ...(i7a ? [i7a()] : []), ...[], aq, yq, ...(iL() ? [oOt] : []), naa];
}
function Rce(tools, context) {
  return tools.filter(tool => !A3t(context, tool) && tool.mcpInfo?.effectiveMaxPermission !== "blocked");
}
function FY(context, candidateTools, sessionState) {
  let builtinTools = $L(context, sessionState),
    filteredCandidates = Rce(candidateTools, context),
    byName = (a, c) => a.name.localeCompare(c.name),
    skillTools = sessionState?.skillTools ?? [],
    merged = skillTools.length > 0 ? filteredCandidates.concat(Rce(skillTools, context)).sort(byName) : filteredCandidates.sort(byName);
  return iS([...builtinTools].sort(byName).concat(merged), "name");
}
var sOp,
  iOp,
  qVa,
  jVa = null,
  WVa = null,
  GVa = null,
  aOp,
  VVa,
  lOp,
  KVa,
  zVa = null,
  cOp,
  YVa,
  Spo = () => (eVa(), Pr(ZGa)).SendMessageTool,
  JVa = null,
  XVa = null,
  QVa = null,
  ZVa = null,
  e7a,
  t7a = null,
  n7a = null,
  r7a = null,
  o7a,
  s7a = null,
  i7a = null,
  a7a = null,
  l7a,
  Xut,
  bpo = () => {
    if (!G1()) return null;
    return (gut(), Pr(f3t)).PowerShellTool;
  },
  uOp,
  $L = (context, sessionState) => {
    if (Ge.CLAUDE_CODE_SIMPLE) {
      if (tx() && !sessionState?.skipReplFilter) {
        let replTools = [Sdo, wE, Ab];
        if (o7a?.isCoordinatorMode()) replTools.push(D9n, Rut, Spo(), ...(Xut && Iw() ? [Xut] : []));
        return Rce(replTools, context);
      }
      let powerShell = bpo(),
        simpleTools = [...(du() ? [xl] : []), ...(powerShell ? [powerShell] : []), gh, wE];
      if (o7a?.isCoordinatorMode()) simpleTools.push(D9n, Rut, Spo(), ...(Xut && Iw() ? [Xut] : []));
      return Rce(simpleTools, context);
    }
    let mcpExcluded = new Set([aq.name, yq.name, Gf]),
      nonMcpTools = YW().filter(tool => !mcpExcluded.has(tool.name)),
      filteredTools = Rce(nonMcpTools, context),
      hasMcpSearch = filteredTools.some(tool => Vc(tool, Xo)) && xl.isEnabled(),
      isReplFiltered = false;
    if (tx() && !sessionState?.skipReplFilter) {
      if (filteredTools.some(tool => Vc(tool, MA))) filteredTools = filteredTools.filter(u => !Ett.has(u.name)), isReplFiltered = true;
    }
    let enabledFlags = filteredTools.map(tool => tool.isEnabled()),
      enabledTools = filteredTools.filter((tool, idx) => enabledFlags[idx]);
    if (Yw() && !hasMcpSearch && !isReplFiltered) {
      let extraSearch = Rce([s9, IL].filter(tool => !enabledTools.includes(tool)), context);
      enabledTools = [...enabledTools, ...extraSearch];
    }
    return enabledTools;
  };
var K0 = b(() => {
  Ri();
  Kio();
  gja();
  rlo();
  uU();
  _Ie();
  fce();
  mce();
  y4e();
  Ict();
  i9t();
  odo();
  Qja();
  $8a();
  j8a();
  f4();
  wdo();
  xdo();
  o0n();
  O$t();
  X8a();
  Pge();
  C$t();
  w5a();
  FOt();
  JLt();
  vwn();
  HYr();
  Zao();
  O5a();
  W5a();
  Q5a();
  nWa();
  iWa();
  dWa();
  ree();
  nz();
  Ok();
  H5();
  vtt();
  ay();
  oW();
  Or();
  an();
  cA();
  Hv();
  sOp = [(SWa(), Pr(TWa)).CronCreateTool, (EWa(), Pr(bWa)).CronDeleteTool, (vWa(), Pr(CWa)).CronListTool], iOp = [], qVa = (LWa(), Pr(OWa)).RemoteTriggerTool, aOp = [], VVa = (Ruo(), Pr(wuo)).MonitorTool, lOp = (UWa(), Pr(FWa)).SendUserFileTool, KVa = (KWa(), Pr(VWa)).PushNotificationTool, cOp = (vGa(), Pr(CGa)).DesignSyncTool, YVa = Ge.CLAUDE_PROJECT_TOOL ? (BGa(), Pr(NGa)).ProjectsTool : null, e7a = (dVa(), Pr(uVa)).ArtifactTool, o7a = (lL(), Pr(z4)), l7a = (AVa(), Pr(fVa)).ShareOnboardingGuideTool, Xut = (() => (($Va(), Pr(UVa)).initBundledWorkflows(), (Tuo(), Pr(yuo)).WorkflowTool))(), uOp = ["default"];
  Wfi(YW);
});

export {Epo as Hmo,Cpo as Imo,YW as O6,Rce as qce,FY as ZY,sOp as BMp,iOp as FMp,qVa as cKa,jVa as uKa,WVa as dKa,GVa as pKa,aOp as UMp,VVa as mKa,lOp as $Mp,KVa as fKa,zVa as AKa,cOp as qMp,YVa as hKa,Spo as xmo,JVa as gKa,XVa as _Ka,QVa as yKa,ZVa as TKa,e7a as SKa,t7a as bKa,n7a as EKa,r7a as CKa,o7a as vKa,s7a as wKa,i7a as RKa,a7a as xKa,l7a as kKa,Xut as Sdt,bpo as kmo,uOp as jMp,$L as JL,K0 as Y0};
