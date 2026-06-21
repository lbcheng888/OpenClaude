// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,ro as x8} from "../../runtime.ts";
import {je as nH} from "../../vendor/m577.ts";
import {Pk as EZ} from "../mcp/3149_scope.ts";
import {lFn as pI6,GUt as iI_} from "../../vendor/m3872.ts";
import {Ie as SH,ln as P6} from "../telemetry/0594_feature_name.ts";
import {Rjr as QB8,jtt as mH_} from "../../vendor/m2701.ts";
import {dMe as XVH,BZt as Kt_} from "../../vendor/m452.ts";
import {mS as ej,mee as se} from "../../vendor/m2749.ts";
import {j$ as UC,BRIEF_TOOL_NAME as BC} from "../../vendor/m2692.ts";
import {Lr as d8} from "../../vendor/m578.ts";
import {SEND_USER_FILE_TOOL_NAME as vh_} from "../../vendor/m2693.ts";
import {_L as XV,lq as lp} from "../permissions/2705_matchSessionMode.ts";
// @ts-nocheck
var MX4 = {};
j_(MX4, {
  mergeAndFilterTools: () => mergeAndFilterTools,
  isPrActivitySubscriptionTool: () => isPrActivitySubscriptionTool,
  applyCoordinatorToolFilter: () => applyCoordinatorToolFilter
});
function isPrActivitySubscriptionTool(toolName) {
  return PR_ACTIVITY_TOOL_SUFFIXES.some(suffix => toolName.endsWith(suffix));
}
function isRemoteCodeMcpTool(tool) {
  return tool.mcpInfo?.serverInfoName === REMOTE_MCP_SERVER_NAME;
}
function applyCoordinatorToolFilter(tools) {
  let isCoordinatorMode = sessionModeManager?.isCcrCoordinator() ?? false,
    briefEnvEnabled = nH.CLAUDE_CODE_BRIEF,
    extraToolsFromEnv = new Set((process.env.CLAUDE_CODE_COORDINATOR_EXTRA_TOOLS ?? "").split(",").map(name => name.trim()).filter(Boolean)),
    hasNonMainSubagentTool = isCoordinatorMode && tools.some(t => EZ(t) && !isRemoteCodeMcpTool(t)) && !tools.some(pI6);
  if (hasNonMainSubagentTool && !coordinatorFallbackLogged) coordinatorFallbackLogged = true, SH("coordinator_mcp_no_comms_role_fallback");
  return tools.filter(tool => QB8.has(tool.name) || isPrActivitySubscriptionTool(tool.name) || isCoordinatorMode && isRemoteCodeMcpTool(tool) || pI6(tool) || hasNonMainSubagentTool && EZ(tool) || briefEnvEnabled && BRIEF_MODE_EXTRA_TOOLS.has(tool.name) || extraToolsFromEnv.has(tool.name));
}
function mergeAndFilterTools(builtinTools, mcpTools, _options) {
  let [mcpPartition, builtinPartition] = XVH(ej([...builtinTools, ...mcpTools], "name"), EZ),
    byName = (a, b) => a.name.localeCompare(b.name),
    merged = [...builtinPartition.sort(byName), ...mcpPartition.sort(byName)];
  if (sessionModeManager) {
    if (sessionModeManager.isCoordinatorMode()) return applyCoordinatorToolFilter(merged);
  }
  return merged;
}
var BRIEF_MODE_EXTRA_TOOLS,
  PR_ACTIVITY_TOOL_SUFFIXES,
  REMOTE_MCP_SERVER_NAME = "claude-code-remote",
  coordinatorFallbackLogged = false,
  sessionModeManager;
var aU_ = L(() => {
  Kt_();
  se();
  mH_();
  P6();
  UC();
  iI_();
  d8();
  BRIEF_MODE_EXTRA_TOOLS = new Set([BC, vh_]), PR_ACTIVITY_TOOL_SUFFIXES = ["subscribe_pr_activity", "unsubscribe_pr_activity"];
  sessionModeManager = (XV(), x8(lp));
});

export {MX4 as Twl,isPrActivitySubscriptionTool,isRemoteCodeMcpTool as hwl,applyCoordinatorToolFilter,mergeAndFilterTools,BRIEF_MODE_EXTRA_TOOLS as oam,PR_ACTIVITY_TOOL_SUFFIXES as sam,REMOTE_MCP_SERVER_NAME as iam,coordinatorFallbackLogged as gwl,sessionModeManager as ewo,aU_ as h8t};
