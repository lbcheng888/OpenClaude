// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyEnforced as R$r,Bu} from "../../vendor/m2213.ts";
import {ac} from "./0733_serverName.ts";
import {w4,$rt} from "../../vendor/m2706.ts";
import {nb,eee} from "../config/2679_eee.ts";
import {Nae,Aj,G9e} from "../../vendor/m3168.ts";
import {Rae} from "../../vendor/m2814.ts";
import {OHe} from "./3159_scope.ts";
import {b} from "../../runtime.ts";
/** Create or reference an isolation latch for web-search / connector isolation. */
function Xxe(initialValue: any = null, onLatch: any) {
  // If a value is provided, immediately fire the latch callback
  if (initialValue) onLatch?.(initialValue);
  return {
    current: initialValue,
    onLatch
  };
}

/** Check whether the doorbell-agave feature flag is on AND the isolation policy is enforced. */
function YUp(): boolean {
  return it(Vja, !1) && R$r(jUp);
}

/** Append newly-seen MCP server names (by flag index) to the exemptServers list on the session config. */
function Kja(sessionConfig: any, serverNames: any[]) {
  if (serverNames.length === 0) return;
  let exemptList = [...(sessionConfig.exemptServers ?? g_o)];
  for (let serverName of serverNames) {
    let flagIndex = ac(serverName);
    if (!exemptList.includes(flagIndex)) exemptList.push(flagIndex);
  }
  sessionConfig.exemptServers = exemptList;
}

/** Classify a server name as "web" or "connectors", or null if not subject to isolation. */
function zja(serverName: any, mcpPrefix: any, exemptList: any): string | null {
  // Well-known "web" tier servers
  if (serverName === w4 || serverName === nb) return "web";
  // Well-known "connectors" tier servers
  if (serverName === Nae || serverName === Aj || serverName === Rae) return "connectors";
  // If a prefix was passed and is NOT in the exempt list, it belongs to "connectors"
  if (mcpPrefix && !exemptList.includes(ac(mcpPrefix))) return "connectors";
  return null;
}

/** Classify a full MCP tool/server entry object using its name and scope. */
function jja(serverEntry: any, exemptList: any = g_o): string | null {
  return zja(serverEntry.name, OHe(serverEntry), exemptList);
}

/**
 * Scan conversation turns to detect the first "web" or "connectors" tool use,
 * respecting the current exemptServers list.
 */
function Pqt(turns: any[], tools: any[], exemptList: any = g_o): string | null {
  if (!it(Vja, !1)) return null;
  let toolsByName = new Map(tools.map(tool => [tool.name, tool]));
  for (let turn of turns) {
    if (turn.type !== "assistant") continue;
    let contentBlocks = turn.message.content;
    if (!Array.isArray(contentBlocks)) continue;
    for (let block of contentBlocks) {
      if (block.type !== "tool_use") continue;
      let matchedTool = toolsByName.get(block.name),
        // Classify via the tool object if found, otherwise classify by the raw name
        classification = matchedTool ? jja(matchedTool, exemptList) : zja(block.name, block.name.startsWith("mcp__") ? block.name.split("__")[1] : void 0, exemptList);
      if (classification !== null) return classification;
    }
  }
  return null;
}

/** Return a human-readable deny message for the given isolation tier. */
function JUp(tier: string): string {
  return tier === "web" ? "Connectors are unavailable in this session under your organization's web search / connector isolation policy. Start a new session to use connectors." : "Web search is unavailable in this session under your organization's web search / connector isolation policy. Start a new session to use web search.";
}

/**
 * Check whether the tool call on `serverEntry` should be denied by isolation policy.
 * Returns a result object describing the deny decision and classification.
 */
function J6n(serverEntry: any, sessionConfig: any): any {
  let latch = sessionConfig.isolationLatch;
  // No latch or feature off → always allow
  if (!latch || !YUp()) return Gja;
  let classification = jja(serverEntry, latch.exemptServers);
  // Not subject to isolation
  if (!classification) return Gja;
  let activeTier = latch.current;
  // A different tier was already latched → deny
  if (activeTier && activeTier !== classification) return {
    denyMessage: JUp(activeTier),
    classifiedAs: classification,
    activeLatch: activeTier
  };
  // First use of this tier → latch it
  if (!activeTier) latch.current = classification, latch.onLatch?.(classification);
  return {
    denyMessage: null,
    classifiedAs: classification,
    activeLatch: classification
  };
}
var jUp = "enforce_web_search_mcp_isolation",
  Vja = "tengu_doorbell_agave",
  g_o: any,
  Gja: any;
var omt = b(() => {
  G9e();
  eee();
  $rt();
  jn();
  Bu();
  // Default exempt server list — these are always allowed regardless of isolation tier
  g_o = ["cowork", "workspace", "session-info", "mcp-registry", "plugins", "scheduled-tasks", "dispatch", "ide"];
  // Null-object sentinel meaning "no isolation decision made"
  Gja = {
    denyMessage: null,
    classifiedAs: null,
    activeLatch: null
  };
});

export {Xxe,YUp,Kja,zja,jja,Pqt,JUp,J6n,jUp,Vja,g_o,Gja,omt};
