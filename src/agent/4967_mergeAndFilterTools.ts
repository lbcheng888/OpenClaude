// @ts-nocheck
import {ft as j_,b as L,oo as x8} from "../../runtime.ts";
import {Ne as nH} from "../../vendor/m583.ts";
import {Zk as EZ} from "../mcp/3159_scope.ts";
import {l$n as pI6,y9t as iI_} from "../../vendor/m3890.ts";
import {He as SH,mn as P6} from "../telemetry/0600_feature_name.ts";
import {oKr as QB8,D$e as mH_} from "../../vendor/m2713.ts";
import {o1e as XVH,Tnn as Kt_} from "../../vendor/m458.ts";
import {aS as ej,uee as se} from "../../vendor/m2762.ts";
import {parsePermissionRule as UC,BRIEF_TOOL_NAME as BC} from "../../vendor/m2704.ts";
import {Ir as d8} from "../../vendor/m584.ts";
import {SEND_USER_FILE_TOOL_NAME as vh_} from "../../vendor/m2705.ts";
import {NO as XV,k4 as lp} from "../permissions/2717_matchSessionMode.ts";
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
export {MX4 as LPl,isPrActivitySubscriptionTool,isRemoteCodeMcpTool as xPl,applyCoordinatorToolFilter,mergeAndFilterTools,BRIEF_MODE_EXTRA_TOOLS as ggm,PR_ACTIVITY_TOOL_SUFFIXES as _gm,REMOTE_MCP_SERVER_NAME as ygm,coordinatorFallbackLogged as DPl,sessionModeManager as h0o,aU_ as MGt};
