// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {getMcpConfigsByScope,px} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {poc,moc,hoc,goc,_oc,foc,yoc,Toc,Aoc,Soc} from "../agent/5644_Soc.ts";
import {checkHasTrustDialogAccepted,saveCurrentProjectConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Bk,gracefulShutdownSync,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {setSessionTrustAccepted,lt} from "../session/0131_sent.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {Y4,Cet} from "../config/2565_Cet.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {Text} from "../../vendor/m2423.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {Link} from "../../vendor/m2427.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {Tm,Fk} from "../../vendor/m3341.ts";
import {Box} from "../../vendor/m2422.ts";
import {ns} from "../mcp/2194_mcpServerName.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var Eoc = {};
isFullscreenWithTTY(Eoc, {
  TrustDialog: () => TrustDialog
});
/** Trust dialog shown at startup to confirm the user trusts the current workspace. */
function TrustDialog(props: any) {
  let cache = boc.c(37),
    {
      onDone: onDone,
      commands: commands
    } = props,
    mcpConfigs: any;
  // Static: get project-scoped MCP configs once
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) mcpConfigs = getMcpConfigsByScope("project"), cache[0] = mcpConfigs;else mcpConfigs = cache[0];
  let {
      servers: servers
    } = mcpConfigs,
    serverKeys: any;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) serverKeys = Object.keys(servers), cache[1] = serverKeys;else serverKeys = cache[1];
  let hasMcpServers = serverKeys.length > 0,
    hooks: any;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) hooks = poc(), cache[2] = hooks;else hooks = cache[2];
  let hasHooks = hooks.length > 0,
    bashCommands: any;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) bashCommands = moc(), cache[3] = bashCommands;else bashCommands = cache[3];
  // bash execution list
  let bashExecList = bashCommands,
    apiKeyHelpers: any;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) apiKeyHelpers = hoc(), cache[4] = apiKeyHelpers;else apiKeyHelpers = cache[4];
  let hasApiKeyHelper = apiKeyHelpers.length > 0,
    awsCommands: any;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) awsCommands = goc(), cache[5] = awsCommands;else awsCommands = cache[5];
  let hasAwsCommands = awsCommands.length > 0,
    gcpCommands: any;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) gcpCommands = _oc(), cache[6] = gcpCommands;else gcpCommands = cache[6];
  let hasGcpCommands = gcpCommands.length > 0,
    otelHeadersHelpers: any;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) otelHeadersHelpers = foc(), cache[7] = otelHeadersHelpers;else otelHeadersHelpers = cache[7];
  let hasOtelHeadersHelper = otelHeadersHelpers.length > 0,
    proxyAuthHelpers: any;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) proxyAuthHelpers = yoc(), cache[8] = proxyAuthHelpers;else proxyAuthHelpers = cache[8];
  let hasProxyAuthHelper = proxyAuthHelpers.length > 0,
    dangerousEnvVars: any;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) dangerousEnvVars = Toc(), cache[9] = dangerousEnvVars;else dangerousEnvVars = cache[9];
  let hasDangerousEnvVars = dangerousEnvVars.length > 0,
    autoMemoryDirs: any;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) autoMemoryDirs = Aoc(), cache[10] = autoMemoryDirs;else autoMemoryDirs = cache[10];
  let hasAutoMemoryDirectory = autoMemoryDirs.length > 0,
    hasDeprecatedCommands: any;
  // Check if commands include deprecated plugin/skills prompts with mcp tool access
  if (cache[11] !== commands) hasDeprecatedCommands = commands?.some(q9m) ?? !1, cache[11] = commands, cache[12] = hasDeprecatedCommands;else hasDeprecatedCommands = cache[12];
  let hasBashViaDeprecated = hasDeprecatedCommands,
    hasPluginCommands: any;
  if (cache[13] !== commands) hasPluginCommands = commands?.some(U9m) ?? !1, cache[13] = commands, cache[14] = hasPluginCommands;else hasPluginCommands = cache[14];
  let hasBashViaPlugin = hasPluginCommands,
    hasBashExecution = bashExecList.length > 0 || hasBashViaDeprecated || hasBashViaPlugin,
    alreadyAccepted = checkHasTrustDialogAccepted(),
    logEffect: any,
    logDeps: any;
  // Log the trust dialog shown event on mount
  if (cache[15] !== hasBashExecution) logEffect = () => {
    let isHomeDir = C1o.homedir() === Pt();
    logEvent("tengu_trust_dialog_shown", {
      isHomeDir: isHomeDir,
      hasMcpServers: hasMcpServers,
      hasHooks: hasHooks,
      hasBashExecution: hasBashExecution,
      hasApiKeyHelper: hasApiKeyHelper,
      hasAwsCommands: hasAwsCommands,
      hasGcpCommands: hasGcpCommands,
      hasOtelHeadersHelper: hasOtelHeadersHelper,
      hasProxyAuthHelper: hasProxyAuthHelper,
      hasDangerousEnvVars: hasDangerousEnvVars,
      hasAutoMemoryDirectory: hasAutoMemoryDirectory
    });
  }, logDeps = [hasMcpServers, hasHooks, hasBashExecution, hasApiKeyHelper, hasAwsCommands, hasGcpCommands, hasOtelHeadersHelper, hasProxyAuthHelper, hasDangerousEnvVars, hasAutoMemoryDirectory], cache[15] = hasBashExecution, cache[16] = logEffect, cache[17] = logDeps;else logEffect = cache[16], logDeps = cache[17];
  QP.useEffect(logEffect, logDeps);
  let didRespondRef = QP.useRef(!1),
    handleResponse: any;
  // Handle the user's trust decision (accept or deny)
  if (cache[18] !== hasBashExecution || cache[19] !== onDone) handleResponse = function (response: any) {
    if (didRespondRef.current || Bk()) return;
    if (didRespondRef.current = !0, response === "exit") {
      Oe("onboarding_trust_dialog", "onboarding_trust_denied"), gracefulShutdownSync(1);
      return;
    }
    let isHomeDir = C1o.homedir() === Pt();
    if (Ie("onboarding_trust_dialog"), logEvent("tengu_trust_dialog_accept", {
      isHomeDir: isHomeDir,
      hasMcpServers: hasMcpServers,
      hasHooks: hasHooks,
      hasBashExecution: hasBashExecution,
      hasApiKeyHelper: hasApiKeyHelper,
      hasAwsCommands: hasAwsCommands,
      hasGcpCommands: hasGcpCommands,
      hasOtelHeadersHelper: hasOtelHeadersHelper,
      hasProxyAuthHelper: hasProxyAuthHelper,
      hasDangerousEnvVars: hasDangerousEnvVars,
      hasAutoMemoryDirectory: hasAutoMemoryDirectory
    }), isHomeDir) setSessionTrustAccepted(!0);else saveCurrentProjectConfig(F9m);
    onDone();
  }, cache[18] = hasBashExecution, cache[19] = onDone, cache[20] = handleResponse;else handleResponse = cache[20];
  let onConfirmCallback = handleResponse,
    exitHandler: any;
  // Force exit on Ctrl+C / escape
  if (cache[21] === Symbol.for("react.memo_cache_sentinel")) exitHandler = () => {
    didRespondRef.current = !0, gracefulShutdownSync(1);
  }, cache[21] = exitHandler;else exitHandler = cache[21];
  let ctrlCHandler = xA(exitHandler),
    noHandler: any;
  if (cache[22] !== onConfirmCallback) noHandler = () => {
    if (Y4()) {
      onConfirmCallback("exit");
      return;
    }
    didRespondRef.current = !0, gracefulShutdownSync(0);
  }, cache[22] = onConfirmCallback, cache[23] = noHandler;else noHandler = cache[23];
  let confirmContext: any;
  if (cache[24] === Symbol.for("react.memo_cache_sentinel")) confirmContext = {
    context: "Confirmation"
  }, cache[24] = confirmContext;else confirmContext = cache[24];
  // Register keyboard shortcut for "no" / cancel
  if (Or("confirm:no", noHandler, confirmContext), alreadyAccepted) return queueMicrotask(onDone), null;
  // Build static UI elements (cached)
  let cwdText: any, safetyText: any, capabilityText: any;
  if (cache[25] === Symbol.for("react.memo_cache_sentinel")) cwdText = QP.default.createElement(Text, {
    bold: !0
  }, jt().cwd()), safetyText = QP.default.createElement(Text, null, "Quick safety check: Is this a project you created or one you trust? (Like your own code, a well-known open source project, or work from your team). If not, take a moment to review what", "'", "s in this folder first."), capabilityText = QP.default.createElement(Text, null, "Claude Code", "'", "ll be able to read, edit, and execute files here."), cache[25] = cwdText, cache[26] = safetyText, cache[27] = capabilityText;else cwdText = cache[25], safetyText = cache[26], capabilityText = cache[27];
  let securityLink: any;
  if (cache[28] === Symbol.for("react.memo_cache_sentinel")) securityLink = QP.default.createElement(Text, {
    dimColor: !0
  }, QP.default.createElement(Link, {
    url: "https://code.claude.com/docs/en/security"
  }, "Security guide")), cache[28] = securityLink;else securityLink = cache[28];
  // Confirm/cancel buttons
  let confirmButtons: any;
  if (cache[29] !== onConfirmCallback) confirmButtons = QP.default.createElement(ac, {
    confirmLabel: "Yes, I trust this folder",
    cancelLabel: "No, exit",
    onConfirm: () => onConfirmCallback("enable_all"),
    onCancel: () => onConfirmCallback("exit")
  }), cache[29] = onConfirmCallback, cache[30] = confirmButtons;else confirmButtons = cache[30];
  // Key hint row (shows double-press hint or keyboard shortcuts)
  let keyHintRow: any;
  if (cache[31] !== ctrlCHandler.keyName || cache[32] !== ctrlCHandler.pending) keyHintRow = QP.default.createElement(Text, {
    dimColor: !0
  }, ctrlCHandler.pending ? QP.default.createElement(QP.default.Fragment, null, "Press ", ctrlCHandler.keyName, " again to exit") : QP.default.createElement(Tn, null, QP.default.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), QP.default.createElement(at, {
    chord: "escape",
    action: "cancel"
  }))), cache[31] = ctrlCHandler.keyName, cache[32] = ctrlCHandler.pending, cache[33] = keyHintRow;else keyHintRow = cache[33];
  let dialogBox: any;
  if (cache[34] !== confirmButtons || cache[35] !== keyHintRow) dialogBox = QP.default.createElement(Tm, {
    color: "warning",
    titleColor: "warning",
    title: "Accessing workspace:"
  }, QP.default.createElement(Box, {
    flexDirection: "column",
    gap: 1,
    paddingTop: 1
  }, cwdText, safetyText, capabilityText, securityLink, confirmButtons, keyHintRow)), cache[34] = confirmButtons, cache[35] = keyHintRow, cache[36] = dialogBox;else dialogBox = cache[36];
  return dialogBox;
}
/** Config updater that marks the trust dialog as accepted. */
function F9m(e: any) {
  return {
    ...e,
    hasTrustDialogAccepted: !0
  };
}
/** Checks if a command is a plugin/skills prompt from project/local settings with mcp tool access. */
function U9m(e: any) {
  return e.type === "prompt" && (e.loadedFrom === "skills" || e.loadedFrom === "plugin") && (e.source === "projectSettings" || e.source === "localSettings" || e.source === "plugin") && e.allowedTools?.some($9m);
}
/** Returns true if the tool is the mcp server namespace or starts with it. */
function $9m(e: any) {
  return e === ns || e.startsWith(ns + "(");
}
/** Checks if a command is a deprecated prompt from project/local settings with mcp tool access. */
function q9m(e: any) {
  return e.type === "prompt" && e.loadedFrom === "commands_DEPRECATED" && (e.source === "projectSettings" || e.source === "localSettings") && e.allowedTools?.some(j9m);
}
/** Returns true if the tool is the mcp server namespace or starts with it. */
function j9m(e: any) {
  return e === ns || e.startsWith(ns + "(");
}
var boc, C1o, QP;
var Coc = b(() => {
  Ct();
  lt();
  jH();
  ze();
  Ts();
  ln();
  px();
  Qn();
  Go();
  ws();
  ym();
  Cet();
  zs();
  e_();
  rs();
  Fk();
  Soc();
  boc = M(rt(), 1), C1o = require("os"), QP = M(Te(), 1);
});
export {Eoc,TrustDialog,F9m,U9m,$9m,q9m,j9m,boc,C1o,QP,Coc};
