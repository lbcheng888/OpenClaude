// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyEnforced,rd} from "../../vendor/m2205.ts";
import {collectFlagValueIndexes} from "./0728_serverName.ts";
import {initModelResolutionModule,Btt} from "../../vendor/m2694.ts";
import {nb,ree} from "../config/2668_ree.ts";
import {Jrt,SMt} from "../../vendor/m3159.ts";
import {vae} from "../../vendor/m2801.ts";
import {Gxe} from "./3149_scope.ts";
import {b} from "../../runtime.ts";
/** Create or reference an isolation latch for web-search / connector isolation. */
function o0e(initialValue: any = null, onLatch: any) {
  // If a value is provided, immediately fire the latch callback
  if (initialValue) onLatch?.(initialValue);
  return {
    current: initialValue,
    onLatch
  };
}

/** Check whether the doorbell-agave feature flag is on AND the isolation policy is enforced. */
function kPp(): boolean {
  return getFeatureValue_CACHED_MAY_BE_STALE(w5a, !1) && isPolicyEnforced(xPp);
}

/** Append newly-seen MCP server names (by flag index) to the exemptServers list on the session config. */
function R5a(sessionConfig: any, serverNames: any[]) {
  if (serverNames.length === 0) return;
  let exemptList = [...(sessionConfig.exemptServers ?? Tpo)];
  for (let serverName of serverNames) {
    let flagIndex = collectFlagValueIndexes(serverName);
    if (!exemptList.includes(flagIndex)) exemptList.push(flagIndex);
  }
  sessionConfig.exemptServers = exemptList;
}

/** Classify a server name as "web" or "connectors", or null if not subject to isolation. */
function x5a(serverName: any, mcpPrefix: any, exemptList: any): string | null {
  // Well-known "web" tier servers
  if (serverName === initModelResolutionModule || serverName === nb) return "web";
  // Well-known "connectors" tier servers
  if (serverName === Jrt || serverName === vae) return "connectors";
  // If a prefix was passed and is NOT in the exempt list, it belongs to "connectors"
  if (mcpPrefix && !exemptList.includes(collectFlagValueIndexes(mcpPrefix))) return "connectors";
  return null;
}

/** Classify a full MCP tool/server entry object using its name and scope. */
function k5a(serverEntry: any, exemptList: any = Tpo): string | null {
  return x5a(serverEntry.name, Gxe(serverEntry), exemptList);
}

/**
 * Scan conversation turns to detect the first "web" or "connectors" tool use,
 * respecting the current exemptServers list.
 */
function h3t(turns: any[], tools: any[], exemptList: any = Tpo): string | null {
  if (!getFeatureValue_CACHED_MAY_BE_STALE(w5a, !1)) return null;
  let toolsByName = new Map(tools.map(tool => [tool.name, tool]));
  for (let turn of turns) {
    if (turn.type !== "assistant") continue;
    let contentBlocks = turn.message.content;
    if (!Array.isArray(contentBlocks)) continue;
    for (let block of contentBlocks) {
      if (block.type !== "tool_use") continue;
      let matchedTool = toolsByName.get(block.name);
      // Classify via the tool object if found, otherwise classify by the raw name
      let classification = matchedTool ? k5a(matchedTool, exemptList) : x5a(block.name, block.name.startsWith("mcp__") ? block.name.split("__")[1] : void 0, exemptList);
      if (classification !== null) return classification;
    }
  }
  return null;
}

/** Return a human-readable deny message for the given isolation tier. */
function HPp(tier: string): string {
  return tier === "web" ? "Connectors are unavailable in this session under your organization's web search / connector isolation policy. Start a new session to use connectors." : "Web search is unavailable in this session under your organization's web search / connector isolation policy. Start a new session to use web search.";
}

/**
 * Check whether the tool call on `serverEntry` should be denied by isolation policy.
 * Returns a result object describing the deny decision and classification.
 */
function q3n(serverEntry: any, sessionConfig: any): any {
  let latch = sessionConfig.isolationLatch;
  // No latch or feature off → always allow
  if (!latch || !kPp()) return v5a;
  let classification = k5a(serverEntry, latch.exemptServers);
  // Not subject to isolation
  if (!classification) return v5a;
  let activeTier = latch.current;
  // A different tier was already latched → deny
  if (activeTier && activeTier !== classification) return {
    denyMessage: HPp(activeTier),
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
var xPp = "enforce_web_search_mcp_isolation",
  w5a = "tengu_doorbell_agave",
  Tpo: any,
  v5a: any;
var ndt = b(() => {
  SMt();
  ree();
  Btt();
  zn();
  rd();
  // Default exempt server list — these are always allowed regardless of isolation tier
  Tpo = ["cowork", "workspace", "session-info", "mcp-registry", "plugins", "scheduled-tasks", "dispatch", "ide"];
  // Null-object sentinel meaning "no isolation decision made"
  v5a = {
    denyMessage: null,
    classifiedAs: null,
    activeLatch: null
  };
});
export {o0e,kPp,R5a,x5a,k5a,h3t,HPp,q3n,xPp,w5a,Tpo,v5a,ndt};
