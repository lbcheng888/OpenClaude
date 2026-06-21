// @ts-nocheck
import {getSessionId,getAllowedChannels,lt} from "../session/0131_sent.ts";
import {je} from "../../vendor/m577.ts";
import {getCurrentSessionTitle,getCurrentSessionAiTitle,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {Text} from "../../vendor/m2423.ts";
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {isChannelsEnabled,xut} from "../telemetry/4165_isChannelsEnabled.ts";
import {isChannelsPolicyBlocked,Gqe} from "../../vendor/m4165.ts";
import {getSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {u2} from "../config/0048_ISSUES_EXPLAINER.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {MNn,NNn,yRa,mRa,fRa,pRa,hRa,gRa,_Ra,ARa,LNn,bro} from "../config/3765_label.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {twt,KEe} from "../../vendor/m1446.ts";
import {Box} from "../../vendor/m2422.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {useTheme} from "../../vendor/m2274.ts";
import {eb,pE} from "../../vendor/m2548.ts";
import {cA,hje} from "../../vendor/m4517.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Bs,rA} from "../../vendor/m2550.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {mc} from "../config/0645_maxBytes.ts";
import {rDe} from "../../vendor/m4516.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// Builds the static info rows for the settings panel (version, session, tmux, channels, cwd, etc.)
function V8p() {
  let sessionId = getSessionId(),
    tmuxSession = je.CLAUDE_CODE_TMUX_SESSION,
    // Use session title or AI title, falling back to a dim placeholder prompt
    sessionTitle = getCurrentSessionTitle(sessionId) ?? getCurrentSessionAiTitle(sessionId) ?? Ad.createElement(Text, {
      dimColor: !0
    }, "/rename to add a name"),
    allowedChannels = getAllowedChannels(),
    channelsStatus = "";
  if (allowedChannels.length > 0) {
    // Format each channel as "plugin:name@marketplace" or "server:name"
    let channelNames = allowedChannels.map(channel => channel.kind === "plugin" ? `plugin:${channel.name}@${channel.marketplace}` : `server:${channel.name}`).join(", "),
      // Determine why channels might not be active
      inactiveReason = getAPIProvider() !== "firstParty" ? "not available on third-party providers" : !isChannelsEnabled() ? "not currently available" : isChannelsPolicyBlocked(getSettingsForSource("policySettings")) ? "blocked by org policy" : void 0;
    channelsStatus = inactiveReason ? `Configured but not active (${inactiveReason}): ${channelNames}` : `Listening for messages from ${channelNames}`;
  }
  return [{
    label: "Version",
    value: `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}${u2()}`
  }, ...[], {
    label: "Session name",
    value: sessionTitle
  }, {
    label: "Session ID",
    value: sessionId
  }, ...(tmuxSession ? [{
    label: "tmux session",
    value: tmuxSession
  }] : []), ...(channelsStatus ? [{
    label: "Channels",
    value: channelsStatus
  }] : []), ...[], {
    label: "cwd",
    value: Pt()
  }, ...MNn(), ...z8p(), ...NNn()];
}

// Maps a compliance taint key to a human-readable label
function K8p(complianceTaint: any) {
  switch (complianceTaint) {
    case "hipaa":
      return "HIPAA";
    case "zdr":
      return "ZDR (Zero Data Retention)";
    default:
      return logForDebugging(`Unknown compliance_taint '${complianceTaint}' from policyLimits`, {
        level: "warn"
      }), complianceTaint;
  }
}

// Returns compliance info rows if any taints are active
function z8p() {
  let taints = twt();
  return taints.length > 0 ? [{
    label: "Compliance",
    value: taints.map(K8p)
  }] : [];
}

// Builds the model/MCP/theme info rows
function Y8p({
  mainLoopModel: mainLoopModel,
  mcp: mcp,
  theme: theme,
  context: context
}) {
  return [{
    label: "Model",
    value: yRa(mainLoopModel)
  }, ...mRa(mcp.clients, context.options.ideInstallationStatus, theme), ...fRa(mcp.clients, theme), ...pRa(), ...hRa()];
}

// Async: collects system diagnostics from multiple sources
async function _il() {
  return [...(await gRa()), ...(await _Ra()), ...(await ARa())];
}

// Renders a single settings row value — arrays become comma-separated Text nodes, strings become plain Text
function J8p(e: any) {
  let cache = _8n.c(8),
    {
      value: value
    } = e;
  if (Array.isArray(value)) {
    let arrayElement;
    if (cache[0] !== value) {
      let itemRenderer;
      if (cache[2] !== value.length) itemRenderer = (item: any, idx: any) => Ad.createElement(Text, {
        key: idx
      }, item, idx < value.length - 1 ? "," : ""), cache[2] = value.length, cache[3] = itemRenderer;else itemRenderer = cache[3];
      arrayElement = value.map(itemRenderer), cache[0] = value, cache[1] = arrayElement;
    } else arrayElement = cache[1];
    let wrappedBox;
    if (cache[4] !== arrayElement) wrappedBox = Ad.createElement(Box, {
      flexWrap: "wrap",
      columnGap: 1,
      flexShrink: 99
    }, arrayElement), cache[4] = arrayElement, cache[5] = wrappedBox;else wrappedBox = cache[5];
    return wrappedBox;
  }
  if (typeof value === "string") {
    let textNode;
    if (cache[6] !== value) textNode = Ad.createElement(Text, null, value), cache[6] = value, cache[7] = textNode;else textNode = cache[7];
    return textNode;
  }
  return value;
}

// Main settings panel component — renders all info rows plus diagnostics
function yil(e: any) {
  let cache = _8n.c(20),
    {
      context: context,
      diagnosticsPromise: diagnosticsPromise
    } = e,
    mainLoopModel = mt(e5p),
    mcpState = mt(Z8p),
    [theme] = useTheme(),
    sectionGroups: any;
  if (cache[0] !== context || cache[1] !== mainLoopModel || cache[2] !== mcpState || cache[3] !== theme) sectionGroups = LNn([V8p(), Y8p({
    mainLoopModel: mainLoopModel,
    mcp: mcpState,
    theme: theme,
    context: context
  })]), cache[0] = context, cache[1] = mainLoopModel, cache[2] = mcpState, cache[3] = theme, cache[4] = sectionGroups;else sectionGroups = cache[4];
  let allSections = sectionGroups,
    // Expand to fill terminal height when not in a scrollable container
    flexGrow = eb() ? 1 : void 0,
    columnDefs: any;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) columnDefs = [{
    bold: !0
  }, {}], cache[5] = columnDefs;else columnDefs = cache[5];
  let flatRows: any;
  if (cache[6] !== allSections) flatRows = allSections.filter(Q8p).flatMap(X8p), cache[6] = allSections, cache[7] = flatRows;else flatRows = cache[7];
  let tableNode: any;
  if (cache[8] !== flatRows) tableNode = Ad.createElement(cA, {
    box: "plain",
    columns: columnDefs
  }, flatRows), cache[8] = flatRows, cache[9] = tableNode;else tableNode = cache[9];
  let diagnosticsNode: any;
  if (cache[10] !== diagnosticsPromise) diagnosticsNode = Ad.createElement(y8n.Suspense, {
    fallback: null
  }, Ad.createElement(t5p, {
    promise: diagnosticsPromise
  })), cache[10] = diagnosticsPromise, cache[11] = diagnosticsNode;else diagnosticsNode = cache[11];
  let innerBox: any;
  if (cache[12] !== flexGrow || cache[13] !== tableNode || cache[14] !== diagnosticsNode) innerBox = Ad.createElement(Box, {
    flexDirection: "column",
    gap: 1,
    flexGrow: flexGrow
  }, tableNode, diagnosticsNode), cache[12] = flexGrow, cache[13] = tableNode, cache[14] = diagnosticsNode, cache[15] = innerBox;else innerBox = cache[15];
  // Static "Esc to cancel" hint rendered once
  let escHint: any;
  if (cache[16] === Symbol.for("react.memo_cache_sentinel")) escHint = Ad.createElement(Text, {
    dimColor: !0
  }, Ad.createElement(lr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "cancel"
  })), cache[16] = escHint;else escHint = cache[16];
  let outerBox: any;
  if (cache[17] !== flexGrow || cache[18] !== innerBox) outerBox = Ad.createElement(Box, {
    flexDirection: "column",
    gap: 1,
    flexGrow: flexGrow
  }, innerBox, escHint), cache[17] = flexGrow, cache[18] = innerBox, cache[19] = outerBox;else outerBox = cache[19];
  return outerBox;
}

// Converts one section group into table Row elements, with a gap row between groups
function X8p(sectionRows: any, groupIndex: any) {
  return [groupIndex > 0 && Ad.createElement(cA.Row, {
    key: `gap-${groupIndex}`
  }, Ad.createElement(Ad.Fragment, null, " "), Ad.createElement(Ad.Fragment, null, "")), ...sectionRows.map((rowItem: any, rowIndex: any) => {
    let {
      label: label,
      value: value
    } = rowItem;
    return Ad.createElement(cA.Row, {
      key: `${groupIndex}-${rowIndex}`
    }, Ad.createElement(Ad.Fragment, null, label !== void 0 ? `${label}:` : ""), Ad.createElement(J8p, {
      value: value
    }));
  })];
}

// Filters out empty section groups
function Q8p(sectionGroup: any) {
  return sectionGroup.length > 0;
}

// Selector: extract mcp slice from store state
function Z8p(state: any) {
  return state.mcp;
}

// Selector: extract mainLoopModel from store state
function e5p(state: any) {
  return state.mainLoopModel;
}

// Renders the system diagnostics section (warnings with icons)
function t5p(e: any) {
  let cache = _8n.c(5),
    {
      promise: promise
    } = e,
    diagnostics = y8n.use(promise);
  if (diagnostics.length === 0) return null;
  let headingNode: any;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) headingNode = Ad.createElement(Text, {
    bold: !0
  }, "System diagnostics"), cache[0] = headingNode;else headingNode = cache[0];
  let diagnosticRows: any;
  if (cache[1] !== diagnostics) diagnosticRows = diagnostics.map(n5p), cache[1] = diagnostics, cache[2] = diagnosticRows;else diagnosticRows = cache[2];
  let containerBox: any;
  if (cache[3] !== diagnosticRows) containerBox = Ad.createElement(Box, {
    flexDirection: "column",
    paddingBottom: 1
  }, headingNode, diagnosticRows), cache[3] = diagnosticRows, cache[4] = containerBox;else containerBox = cache[4];
  return containerBox;
}

// Renders a single diagnostic row with a warning icon
function n5p(diagnosticEntry: any, idx: any) {
  return Ad.createElement(Box, {
    key: idx,
    flexDirection: "row",
    gap: 1,
    paddingX: 1
  }, Ad.createElement(Bs, {
    status: "warning"
  }), typeof diagnosticEntry === "string" ? Ad.createElement(Text, {
    wrap: "wrap"
  }, diagnosticEntry) : diagnosticEntry);
}
var _8n: any, Ad: any, y8n: any;
var Til = b(() => {
  lt();
  pE();
  ze();
  xut();
  Gqe();
  KEe();
  configProtoStore();
  Go();
  qe();
  Lr();
  mc();
  li();
  rDe();
  ja();
  yr();
  bro();
  readRoster();
  rA();
  hje();
  _8n = M(rt(), 1), Ad = M(Te(), 1), y8n = M(Te(), 1);
});
export {V8p,K8p,z8p,Y8p,_il,J8p,yil,X8p,Q8p,Z8p,e5p,t5p,n5p,_8n,Ad,y8n,Til};
