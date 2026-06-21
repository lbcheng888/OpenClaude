// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {st as q_} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {vke as ZIH,nJr as Tl8} from "../../vendor/m3296.ts";
import {sn as A6} from "./0047_namespace.ts";
var de7 = {};
j_(de7, {
  isAgentSwarmsEnabled: () => isAgentSwarmsEnabled,
  captureTeammateModeSnapshotIfEnabled: () => captureTeammateModeSnapshotIfEnabled
});

/** Returns true if the --agent-teams CLI flag is present. */
function hasAgentTeamsFlag(): boolean {
  return process.argv.includes("--agent-teams");
}

/** Returns true if agent swarms (teammate mode) is enabled via env var or CLI flag, and the feature gate is active. */
function isAgentSwarmsEnabled(): boolean {
  if (!q_(process.env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS) && !hasAgentTeamsFlag()) return !1;
  if (!Y_("tengu_amber_flint", !0)) return !1;
  return !0;
}

/** If agent swarms are enabled, captures a teammate mode snapshot. */
async function captureTeammateModeSnapshotIfEnabled(): Promise<void> {
  if (!isAgentSwarmsEnabled()) return;
  let {
    captureTeammateModeSnapshot: captureTeammateModeSnapshot
  } = await Promise.resolve().then(() => (ZIH(), Tl8));
  captureTeammateModeSnapshot();
}

var Lf = L(() => {
  o6();
  A6();
});

export {de7 as _aa,hasAgentTeamsFlag as H8d,isAgentSwarmsEnabled,captureTeammateModeSnapshotIfEnabled,Lf as cb};
