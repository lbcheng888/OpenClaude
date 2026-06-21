// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {uoe as LdH,logMCPError as w8H,initKp as UO} from "../../vendor/m609.ts";
import {Wn as c6} from "../api/0459_getOauthConfig.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {O5n as eB6,Gpl as HK4,Sue as M1H} from "../../vendor/m4650.ts";
/** /mcp inline command handler — handles reconnect, enable, disable actions for MCP servers. */

/** MCP client connection status type. */
type McpClientStatus = "connected" | "pending" | "failed" | "needs-auth" | "disabled" | "needs-approval";

/** Minimal shape of an MCP client entry as returned by getMcp().clients. */
interface McpClient {
  name: string;
  type: McpClientStatus;
}

/** Text result returned to the conversation. */
interface TextResult {
  type: "text";
  value: string;
}

/** Reconnect result returned by the reconnect callback. */
interface ReconnectResult {
  client: { type: McpClientStatus };
}

/**
 * Returns the connection type of a given MCP client.
 */
function getMcpClientType(client: McpClient): McpClientStatus {
  return client.type;
}

/**
 * Returns the non-null-result status if the client is in a "bad" state
 * that blocks reconnection (disabled, pending, needs-approval); returns null
 * for states where reconnect is allowed (connected, failed, needs-auth).
 */
function getReconnectBlockingStatus(client: McpClient): "disabled" | "pending" | "needs-approval" | null {
  let status = getMcpClientType(client);
  switch (status) {
    case "disabled":
    case "pending":
    case "needs-approval":
      return status;
    case "connected":
    case "failed":
    case "needs-auth":
      return null;
    default:
      return status as "disabled" | "pending" | "needs-approval";
  }
}

/**
 * Validates that a named server can be reconnected, throwing a descriptive
 * Error if it cannot. Throws immediately for the "ide" server (always managed automatically).
 */
function assertReconnectable(clients: McpClient[], serverName: string): void {
  if (serverName === "ide") throw Error("The IDE connection is managed automatically and can't be reconnected manually");
  let found = clients.find(O => O.name === serverName),
    blockingStatus = found && getReconnectBlockingStatus(found);
  if (blockingStatus) throw Error(blockingStatus === "disabled" ? `"${serverName}" is disabled — enable it first` : blockingStatus === "pending" ? `"${serverName}" is already reconnecting — retries can take a few minutes when a server keeps failing` : `"${serverName}" is pending approval — approve it in the terminal first`);
}

var KK4 = {};
j_(KK4, {
  call: () => call
});

/**
 * Implements the `/mcp` inline slash command.
 *
 * Subcommands:
 * - (empty / help) — show server count summary
 * - reconnect [<server>|all] — reconnect failed/needs-auth servers
 * - enable [<server>|all] — enable disabled servers
 * - disable [<server>|all] — disable running servers
 *
 * Fires a `tengu_mcp_command_inline` telemetry event on action execution.
 */
async function call(rawArg: string, context: { getMcp: () => { clients: McpClient[] } }): Promise<TextResult> {
  let trimmedArg = rawArg.trim(),
    clients = context.getMcp().clients.filter(W => W.name !== "ide"),
    lowerArg = trimmedArg.toLowerCase();
  if (!trimmedArg || LdH.includes(lowerArg)) {
    if (clients.length === 0) return makeTextResult(`No MCP servers are configured. Add one with \`claude mcp add\`.
${usageHint}`);
    let connectedCount = c6(clients, E => E.type === "connected"),
      pendingCount = c6(clients, E => E.type === "pending"),
      failedCount = c6(clients, E => E.type === "failed" || E.type === "needs-auth"),
      disabledCount = c6(clients, E => E.type === "disabled"),
      notConnectedCount = clients.length - connectedCount - pendingCount - disabledCount;
    return makeTextResult(`${clients.length} MCP server(s): ${connectedCount} connected, ` + (pendingCount > 0 ? `${pendingCount} connecting, ` : "") + `${notConnectedCount} not connected, ${disabledCount} disabled.` + (failedCount > 0 ? " Reply `/mcp reconnect all` here to retry." : "") + ` Use \`/mcp\` in the terminal for details.
${usageHint}`);
  }
  if (w8H.includes(lowerArg)) return makeTextResult(usageHint);
  let actionMatch = /^(\S+)\s*(.*)$/.exec(trimmedArg),
    action = (actionMatch?.[1] ?? "").toLowerCase(),
    target = actionMatch?.[2] || "all";
  if (action !== "reconnect" && action !== "enable" && action !== "disable") return makeTextResult(`"${action}" isn't a recognized /mcp action. Try reconnect, enable, or disable.`);
  c("tengu_mcp_command_inline", {
    action: tH(action)
  });
  let targetedClients = target === "all" ? clients : clients.filter(W => W.name === target);
  if (targetedClients.length === 0) return makeTextResult(target === "all" ? "No MCP servers are configured. Add one with `claude mcp add`." : `There's no MCP server named "${target}". Run \`/mcp\` in the terminal to see configured servers.`);
  let getReconnectFn = eB6(),
    getToggleFn = HK4();
  if (!getReconnectFn || !getToggleFn) return makeTextResult("MCP controls aren't available right now — the terminal is still starting up or is showing another view.");
  if (action === "reconnect") {
    let singleClient = target !== "all" ? targetedClients[0] : void 0,
      singleStatus = singleClient && getReconnectBlockingStatus(singleClient);
    if (singleStatus === "disabled") return makeTextResult(`"${target}" is disabled. Run \`/mcp enable ${target}\` to bring it back.`);
    if (singleStatus === "pending") return makeTextResult(`"${target}" is already reconnecting — retries can take a few minutes when a server keeps failing.`);
    if (singleStatus === "needs-approval") return makeTextResult(`"${target}" is pending approval. Approve it with \`/mcp\` in the terminal first.`);
    let reconnectTargets = target === "all" ? targetedClients.filter(E => E.type === "failed" || E.type === "needs-auth") : targetedClients;
    if (reconnectTargets.length === 0) {
      let disabledInTargets = c6(targetedClients, v => v.type === "disabled");
      if (disabledInTargets > 0) return makeTextResult(`${disabledInTargets} MCP server(s) are disabled. Run \`/mcp enable all\` to bring them back.`);
      return makeTextResult("All enabled MCP servers are already connected or connecting.");
    }
    let reconnectResults = await Promise.allSettled(reconnectTargets.map(E => getReconnectFn!(E.name))),
      successfullyConnected = c6(reconnectResults, E => E.status === "fulfilled" && (E as PromiseFulfilledResult<ReconnectResult>).value.client.type === "connected");
    if (target !== "all") {
      let firstResult = reconnectResults[0],
        resultType = firstResult?.status === "fulfilled" ? (firstResult as PromiseFulfilledResult<ReconnectResult>).value.client.type : void 0,
        followUpHint = resultType === "needs-auth" ? "Authenticate with `/mcp` in the terminal." : "Check its config with `/mcp` in the terminal.";
      return makeTextResult(resultType === "connected" ? `Reconnected "${target}".` : `Couldn't reconnect "${target}"${resultType ? ` (${mcpStatusLabels[resultType]})` : ""}. ${followUpHint}`);
    }
    return makeTextResult(`Reconnected ${successfullyConnected} of ${reconnectTargets.length} MCP server(s). Run \`/mcp\` in the terminal to see status.`);
  }
  let isEnable = action === "enable";
  if (target !== "all" && targetedClients.some(W => getMcpClientType(W) === "needs-approval")) return makeTextResult(`"${target}" is pending approval. Approve it with \`/mcp\` in the terminal first.`);
  let togglableClients = targetedClients.filter(W => isEnable ? W.type === "disabled" : W.type !== "disabled" && getMcpClientType(W) !== "needs-approval");
  if (togglableClients.length === 0) {
    if (isEnable) {
      let notConnectedCount = c6(targetedClients, G => G.type === "failed" || G.type === "needs-auth");
      if (notConnectedCount > 0) return makeTextResult(target === "all" ? `All MCP servers are already enabled, but ${notConnectedCount} ${notConnectedCount === 1 ? "isn't" : "aren't"} connected. Reply \`/mcp reconnect all\` here to retry.` : `"${target}" is already enabled but not connected. Run \`/mcp reconnect ${target}\` to retry.`);
    }
    return makeTextResult(target === "all" ? `All MCP servers are already ${isEnable ? "enabled" : "disabled"}.` : `"${target}" is already ${isEnable ? "enabled" : "disabled"}.`);
  }
  let toggleResults = await Promise.allSettled(togglableClients.map(W => getToggleFn!(W.name))),
    toggleSuccessCount = c6(toggleResults, W => W.status === "fulfilled"),
    connectedAfterToggle = isEnable ? c6(toggleResults, W => W.status === "fulfilled" && (W as PromiseFulfilledResult<{type: string}>).value.type === "connected") : toggleSuccessCount,
    actionLabel = isEnable ? "Enabled" : "Disabled",
    notYetConnectedSuffix = isEnable && connectedAfterToggle < toggleSuccessCount ? ` (${toggleSuccessCount - connectedAfterToggle} enabled but not yet connected)` : "";
  if (target !== "all") {
    if (!isEnable) return makeTextResult(toggleSuccessCount > 0 ? `Disabled "${target}".` : `Couldn't disable "${target}" — it may have been removed, or its configuration couldn't be read. Run \`/mcp\` in the terminal to check.`);
    let firstResult = toggleResults[0];
    if (firstResult?.status !== "fulfilled") return makeTextResult(`Couldn't enable "${target}" — it may have been removed, or its configuration couldn't be read. Run \`/mcp\` in the terminal to check.`);
    let enabledClientType = (firstResult as PromiseFulfilledResult<{type: string}>).value.type,
      followUpHint = enabledClientType === "needs-auth" ? "Authenticate with `/mcp` in the terminal." : "Check its config with `/mcp` in the terminal.";
    return makeTextResult(enabledClientType === "connected" ? `Enabled "${target}".` : `Enabled "${target}", but it isn't connected yet${enabledClientType !== "failed" ? ` (${mcpStatusLabels[enabledClientType]})` : ""}. ${followUpHint}`);
  }
  let failedToggleCount = togglableClients.length - toggleSuccessCount;
  return makeTextResult(`${actionLabel} ${toggleSuccessCount} MCP server(s)${notYetConnectedSuffix}` + (failedToggleCount > 0 ? ` (${failedToggleCount} couldn't be changed — may have been removed)` : "") + ". Run `/mcp` in the terminal to see status.");
}

/** Wraps a string in a text result object. */
function makeTextResult(text: string): TextResult {
  return {
    type: "text",
    value: text
  };
}

var mcpStatusLabels: Record<string, string>,
  usageHint = "Usage: /mcp [reconnect|enable|disable [<server>|all]]. With no server name, applies to all.";

/** Module initializer — sets up mcpStatusLabels display map. */
var OK4 = L(() => {
  UO();
  y_();
  M1H();
  mcpStatusLabels = {
    connected: "connected",
    pending: "connecting",
    disabled: "disabled",
    failed: "not connected",
    "needs-auth": "needs authentication",
    "needs-approval": "pending approval"
  };
});

export {getMcpClientType as Pje,getReconnectBlockingStatus as xSo,assertReconnectable as Vpl,KK4 as zpl,call as Nzp,makeTextResult as pD,mcpStatusLabels as Kpl,usageHint as kSo,OK4 as Ypl};
