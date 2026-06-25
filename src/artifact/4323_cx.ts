// @ts-nocheck
import {A6n,Lmo} from "../tools/4234_toolPermissionContext.ts";
import {s5n,k_o} from "../tools/4265_task_id.ts";
import {Yc,m1,Zm} from "../config/2709_Zm.ts";
import {sl,UB} from "../tools/4381_isSearch.ts";
import {getActiveWorktree as z$,r6e} from "../tools/3940_pattern.ts";
import {iL,dye} from "../tools/3938_items.ts";
import {Uit,ov,NW} from "../config/3289_NW.ts";
import {KD,i6e} from "../tools/3962_tool.ts";
import {hh,ace} from "../tools/4441_tabAwareSeparator.ts";
import {ME,nxe} from "../tools/4356_content.ts";
import {fb,sce} from "../tools/3934_file_path.ts";
import {qq,edt} from "../tools/3945_notebook_path.ts";
import {BB,$4t} from "../tools/4168_url.ts";
import {SIe,OOn} from "../tools/3335_todos.ts";
import {i5n,I_o} from "../tools/4268_type.ts";
import {tmt,o_o} from "../tools/4242_task_id.ts";
import {tdt,o3t} from "../tools/3946_answers.ts";
import {opt,jmo} from "../tools/4106_sanitizedName.ts";
import {u9n,Tdo} from "../tools/3965_message.ts";
import {HE,oH} from "../agent/3332_id.ts";
import {NJa,FJa} from "../tools/4283_subject.ts";
import {$Ja,qJa} from "../tools/4284_taskId.ts";
import {VJa,KJa} from "../tools/4285_taskId.ts";
import {JJa,XJa} from "../tools/4287_tasks.ts";
import {nt} from "../../vendor/m127.ts";
import {O_o,pJa} from "../tools/4274_line.ts";
import {isWorktreeModeEnabled as umt} from "../../vendor/m4287.ts";
import {TJa,SJa} from "../tools/4278_name.ts";
import {HJa,IJa} from "../tools/4280_changedFiles.ts";
import {C_o,AYa} from "../tools/4262_colors.ts";
import {RYa,vYa} from "../tools/4263_delaySeconds.ts";
import {Qza,Zza} from "../tools/4235_role.ts";
import {Pja,Oja} from "../tools/4248_file_uuid.ts";
import {N4,F1t} from "../tools/2819_server.ts";
import {Y4,ZNt} from "../tools/3176_server.ts";
import {Hee,zNt} from "../tools/3171_server.ts";
import {OO,Gz} from "../telemetry/2704_Gz.ts";
import {ToolSearchTool as a1t,YHn} from "../tools/2767_outputSchema.ts";
import {Rha,dto} from "../tools/3326_servers.ts";
import {getDenyRuleForTool as o6t,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {aS,uee} from "../../vendor/m2762.ts";
import {KQa,VQa} from "../tools/4313_inFlightTeammateResumes.ts";
import {oo,b} from "../../runtime.ts";
import {Upt,r6t} from "../tools/4347_isAutobackgroundingAllowed.ts";
import {Ne} from "../../vendor/m583.ts";
import {gw,Mf,Grt,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {hC,L2} from "../agent/2222_available.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {Gl,ri,Qbi} from "../tools/2235_userFacingName.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {NYa} from "../tools/4269_name.ts";
import {D$e} from "../../vendor/m2713.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {aXa,iXa} from "../tools/4289_CronCreateTool.ts";
import {cXa,lXa} from "../tools/4290_CronDeleteTool.ts";
import {dXa,uXa} from "../tools/4291_CronListTool.ts";
import {bXa,SXa} from "../tools/4294_triggerResponseSchema.ts";
import {Ago,Cgo} from "../tools/4215_applyCcrTimeoutCap.ts";
import {vXa,RXa} from "../tools/4296_SendUserFileTool.ts";
import {OXa,PXa} from "../tools/4299_PushNotificationTool.ts";
import {dQa,uQa} from "../tools/4305_DesignSyncTool.ts";
import {AQa,CQa} from "../tools/4306_resolveWritePath.ts";
import {nZa,tZa} from "../tools/4316_ArtifactTool.ts";
import {NO,k4} from "../permissions/2717_matchSessionMode.ts";
import {iZa,sZa} from "../tools/4318_ShareOnboardingGuideTool.ts";
import {xZa,IZa} from "../../vendor/m4321.ts";
import {_go,ggo} from "../tools/4208_WorkflowTool.ts";
/**
 * Tool registry & assembly for Claude Code.
 *
 * This module builds the full list of available tools, filters them by
 * enablement / permission, and exposes helpers for resolving the active
 * tool set depending on runtime mode (simple/REPL, coordinator, etc.).
 *
 * Names here are best-effort restorations of minified identifiers; the
 * structure is preserved 1:1 with the reverse-engineered source.
 */

/**
 * Normalize a tool-list preset key (e.g. "default"). Returns the lowercased
 * key if it is a recognized preset, otherwise null.
 */
function kyo(presetKey: string): string | null {
  let normalized = presetKey.toLowerCase();
  if (!g3p.includes(normalized)) return null;
  return normalized;
}

/**
 * Return the names of every tool that is currently enabled.
 */
function Hyo(): string[] {
  let allTools = o9(),
    enabledFlags = allTools.map(tool => tool.isEnabled());
  return allTools.filter((tool, index) => enabledFlags[index]).map(tool => tool.name);
}

/**
 * Assemble the complete (unfiltered) list of tool definitions, gated by
 * feature flags and environment-specific availability checks.
 */
function o9(): any[] {
  return [A6n, s5n, ...(Yc() ? [sl] : []), ...[z$, iL].filter(tool => !Uit().has(tool.name)), KD, hh, ME, fb, qq, BB, SIe, i5n, tmt, tdt, opt, u9n, ...[], f3p, h3p, ...(qZa ? [qZa] : []), ...(HE() ? [NJa, $Ja, VJa, JJa] : []), ...(BZa ? [BZa] : []), ...(UZa ? [UZa] : []), ...($Za ? [$Za] : []), ...(nt("true") ? [O_o] : []), ...(umt() ? [TJa, HJa] : []), vyo(), ...(KZa ? [KZa] : []), ...(zZa ? [zZa] : []), C_o, ...(bmt ? [bmt] : []), ...u3p, ...d3p, RYa, ...(DZa ? [DZa] : []), ...(PZa ? [PZa] : []), ...(OZa ? [OZa] : []), Qza, ...(LZa ? [LZa] : []), ...p3p, ...(MZa ? [MZa] : []), Pja, m3p, ...(NZa ? [NZa] : []), ...(FZa ? [FZa] : []), ...(wyo() ? [wyo()] : []), ...(GZa ? [GZa] : []), ...(VZa ? [VZa()] : []), ...[], N4, Y4, Hee, ...(OO() ? [a1t] : []), Rha];
}

/**
 * Filter a list of tools, dropping any that are excluded by `context` or
 * whose MCP effective max permission is "blocked".
 */
function $te(tools: any[], context: any): any[] {
  return tools.filter(tool => !o6t(context, tool) && tool.mcpInfo?.effectiveMaxPermission !== "blocked");
}

/**
 * Build the sorted, deduplicated set of tools for a request: combine the
 * core tools (`gL`), the MCP/extra tools, and any skill tools, then sort
 * by name and dedupe on "name".
 */
function FY(context: any, extraTools: any[], options: any): any[] {
  let coreTools = gL(context, options),
    filteredExtras = $te(extraTools, context),
    byName = (a: any, b: any) => a.name.localeCompare(b.name),
    skillTools = options?.skillTools ?? [],
    sortedExtras = skillTools.length > 0 ? filteredExtras.concat($te(skillTools, context)).sort(byName) : filteredExtras.sort(byName);
  return aS([...coreTools].sort(byName).concat(sortedExtras), "name");
}

var u3p: any[],
  d3p: any[],
  DZa: any,
  PZa: any = null,
  OZa: any = null,
  LZa: any = null,
  p3p: any[],
  MZa: any,
  m3p: any,
  NZa: any,
  FZa: any = null,
  f3p: any,
  h3p: any,
  /** Lazily resolve the SendMessage tool from its module. */
  vyo = () => (KQa(), oo(VQa)).SendMessageTool,
  BZa: any,
  UZa: any = null,
  $Za: any = null,
  qZa: any = null,
  WZa: any,
  GZa: any = null,
  VZa: any = null,
  KZa: any = null,
  zZa: any,
  bmt: any,
  /** Lazily resolve the PowerShell tool, but only when supported (`m1()`). */
  wyo = () => {
    if (!m1()) return null;
    return (Upt(), oo(r6t)).PowerShellTool;
  },
  g3p: string[],
  /**
   * Resolve the core tool list for the current request/context.
   *
   * In simple/REPL mode (`CLAUDE_CODE_SIMPLE`) a minimal curated set is used;
   * otherwise the full registry is filtered by exclusion set, REPL filtering,
   * enablement, and optional plan-mode tool augmentation.
   */
  gL = (context: any, options: any) => {
    if (Ne.CLAUDE_CODE_SIMPLE) {
      if (gw() && !options?.skipReplFilter) {
        let replSimpleTools = [C_o, ME, fb];
        if (WZa?.isCoordinatorMode()) replSimpleTools.push(A6n, tmt, vyo(), ...(bmt && hC() ? [bmt] : []));
        return $te(replSimpleTools, context);
      }
      let powerShellTool = wyo(),
        simpleTools = [...(Yc() ? [sl] : []), ...(powerShellTool ? [powerShellTool] : []), hh, ME];
      if (WZa?.isCoordinatorMode()) simpleTools.push(A6n, tmt, vyo(), ...(bmt && hC() ? [bmt] : []));
      return $te(simpleTools, context);
    }
    let excludedNames = new Set([N4.name, Y4.name, Hee.name, Rp]),
      registryTools = o9().filter(tool => !excludedNames.has(tool.name)),
      contextFiltered = $te(registryTools, context),
      hasFileSearchTool = contextFiltered.some(tool => Gl(tool, Mo)) && sl.isEnabled(),
      replFiltered = !1;
    if (gw() && !options?.skipReplFilter) {
      if (contextFiltered.some(tool => Gl(tool, Mf))) contextFiltered = contextFiltered.filter(tool => !Grt.has(tool.name)), replFiltered = !0;
    }
    let enabledFlags = contextFiltered.map(tool => tool.isEnabled()),
      enabledTools = contextFiltered.filter((tool, index) => enabledFlags[index]);
    if (ov() && !hasFileSearchTool && !replFiltered) {
      let extraEditTools = $te([z$, iL].filter(tool => !enabledTools.includes(tool)), context);
      enabledTools = [...enabledTools, ...extraEditTools];
    }
    return enabledTools;
  };

/**
 * Module initializer: wire up all dependency modules and lazily bind the
 * deferred tool definitions (Cron, RemoteTrigger, Monitor, etc.) into their
 * registry slots, then register the tool-list provider with `Qbi`.
 */
var cx = b(() => {
  ri();
  Lmo();
  Zza();
  jmo();
  UB();
  nxe();
  ace();
  sce();
  r6e();
  edt();
  $4t();
  o_o();
  Oja();
  AYa();
  vYa();
  L2();
  k_o();
  I_o();
  OOn();
  i6e();
  NYa();
  dye();
  o3t();
  pJa();
  F1t();
  zNt();
  ZNt();
  YHn();
  dto();
  Tdo();
  SJa();
  IJa();
  FJa();
  qJa();
  KJa();
  XJa();
  uee();
  Gz();
  oH();
  MO();
  D$e();
  ly();
  NW();
  Ir();
  dn();
  Zm();
  $A();
  u3p = [(aXa(), oo(iXa)).CronCreateTool, (cXa(), oo(lXa)).CronDeleteTool, (dXa(), oo(uXa)).CronListTool], d3p = [], DZa = (bXa(), oo(SXa)).RemoteTriggerTool, p3p = [], MZa = (Ago(), oo(Cgo)).MonitorTool, m3p = (vXa(), oo(RXa)).SendUserFileTool, NZa = (OXa(), oo(PXa)).PushNotificationTool, f3p = (dQa(), oo(uQa)).DesignSyncTool, h3p = (AQa(), oo(CQa)).ProjectsTool, BZa = (nZa(), oo(tZa)).ArtifactTool, WZa = (NO(), oo(k4)), zZa = (iZa(), oo(sZa)).ShareOnboardingGuideTool, bmt = (() => ((xZa(), oo(IZa)).initBundledWorkflows(), (_go(), oo(ggo)).WorkflowTool))(), g3p = ["default"];
  Qbi(o9);
});

export {kyo,Hyo,o9,$te,FY,u3p,d3p,DZa,PZa,OZa,LZa,p3p,MZa,m3p,NZa,FZa,f3p,h3p,vyo,BZa,UZa,$Za,qZa,WZa,GZa,VZa,KZa,zZa,bmt,wyo,g3p,gL,cx};
