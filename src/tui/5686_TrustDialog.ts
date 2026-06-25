// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getMcpConfigsByScope as RC,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {amc,lmc,dmc,pmc,mmc,cmc,fmc,hmc,umc,gmc} from "../agent/5685_gmc.ts";
import {checkHasTrustDialogAccepted as kd,saveCurrentProjectConfig as TE,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {isShuttingDown as ww,gracefulShutdownSync as Rc,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {setSessionTrustAccepted as Fbe,lt} from "../session/0132_sent.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {g4,wnt} from "../config/2576_wnt.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var ymc = {};
ft(ymc, {
  TrustDialog: () => TrustDialog
});
/** Trust dialog shown at startup to confirm the user trusts the current workspace. */
function TrustDialog(props: any) {
  let cache = _mc.c(37),
    {
      onDone: onDone,
      commands: commands
    } = props,
    mcpConfigs: any;
  // Static: get project-scoped MCP configs once
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) mcpConfigs = RC("project"), cache[0] = mcpConfigs;else mcpConfigs = cache[0];
  let {
      servers: servers
    } = mcpConfigs,
    serverKeys: any;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) serverKeys = Object.keys(servers), cache[1] = serverKeys;else serverKeys = cache[1];
  let hasMcpServers = serverKeys.length > 0,
    hooks: any;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) hooks = amc(), cache[2] = hooks;else hooks = cache[2];
  let hasHooks = hooks.length > 0,
    bashCommands: any;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) bashCommands = lmc(), cache[3] = bashCommands;else bashCommands = cache[3];
  // bash execution list
  let bashExecList = bashCommands,
    apiKeyHelpers: any;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) apiKeyHelpers = dmc(), cache[4] = apiKeyHelpers;else apiKeyHelpers = cache[4];
  let hasApiKeyHelper = apiKeyHelpers.length > 0,
    awsCommands: any;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) awsCommands = pmc(), cache[5] = awsCommands;else awsCommands = cache[5];
  let hasAwsCommands = awsCommands.length > 0,
    gcpCommands: any;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) gcpCommands = mmc(), cache[6] = gcpCommands;else gcpCommands = cache[6];
  let hasGcpCommands = gcpCommands.length > 0,
    otelHeadersHelpers: any;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) otelHeadersHelpers = cmc(), cache[7] = otelHeadersHelpers;else otelHeadersHelpers = cache[7];
  let hasOtelHeadersHelper = otelHeadersHelpers.length > 0,
    proxyAuthHelpers: any;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) proxyAuthHelpers = fmc(), cache[8] = proxyAuthHelpers;else proxyAuthHelpers = cache[8];
  let hasProxyAuthHelper = proxyAuthHelpers.length > 0,
    dangerousEnvVars: any;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) dangerousEnvVars = hmc(), cache[9] = dangerousEnvVars;else dangerousEnvVars = cache[9];
  let hasDangerousEnvVars = dangerousEnvVars.length > 0,
    autoMemoryDirs: any;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) autoMemoryDirs = umc(), cache[10] = autoMemoryDirs;else autoMemoryDirs = cache[10];
  let hasAutoMemoryDirectory = autoMemoryDirs.length > 0,
    hasDeprecatedCommands: any;
  // Check if commands include deprecated plugin/skills prompts with mcp tool access
  if (cache[11] !== commands) hasDeprecatedCommands = commands?.some(kKm) ?? !1, cache[11] = commands, cache[12] = hasDeprecatedCommands;else hasDeprecatedCommands = cache[12];
  let hasBashViaDeprecated = hasDeprecatedCommands,
    hasPluginCommands: any;
  if (cache[13] !== commands) hasPluginCommands = commands?.some(vKm) ?? !1, cache[13] = commands, cache[14] = hasPluginCommands;else hasPluginCommands = cache[14];
  let hasBashViaPlugin = hasPluginCommands,
    hasBashExecution = bashExecList.length > 0 || hasBashViaDeprecated || hasBashViaPlugin,
    alreadyAccepted = kd(),
    logEffect: any,
    logDeps: any;
  // Log the trust dialog shown event on mount
  if (cache[15] !== hasBashExecution) logEffect = () => {
    let isHomeDir = r$o.homedir() === Lt();
    W("tengu_trust_dialog_shown", {
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
  prr.useEffect(logEffect, logDeps);
  let didRespondRef = prr.useRef(!1),
    handleResponse: any;
  // Handle the user's trust decision (accept or deny)
  if (cache[18] !== hasBashExecution || cache[19] !== onDone) handleResponse = function (response: any) {
    if (didRespondRef.current || ww()) return;
    if (didRespondRef.current = !0, response === "exit") {
      xe("onboarding_trust_dialog", "onboarding_trust_denied"), Rc(1);
      return;
    }
    let isHomeDir = r$o.homedir() === Lt();
    if (He("onboarding_trust_dialog"), W("tengu_trust_dialog_accept", {
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
    }), isHomeDir) Fbe(!0);else TE(RKm);
    onDone();
  }, cache[18] = hasBashExecution, cache[19] = onDone, cache[20] = handleResponse;else handleResponse = cache[20];
  let onConfirmCallback = handleResponse,
    exitHandler: any;
  // Force exit on Ctrl+C / escape
  if (cache[21] === Symbol.for("react.memo_cache_sentinel")) exitHandler = () => {
    didRespondRef.current = !0, Rc(1);
  }, cache[21] = exitHandler;else exitHandler = cache[21];
  let ctrlCHandler = Df(exitHandler),
    noHandler: any;
  if (cache[22] !== onConfirmCallback) noHandler = () => {
    if (g4()) {
      onConfirmCallback("exit");
      return;
    }
    didRespondRef.current = !0, Rc(0);
  }, cache[22] = onConfirmCallback, cache[23] = noHandler;else noHandler = cache[23];
  let confirmContext: any;
  if (cache[24] === Symbol.for("react.memo_cache_sentinel")) confirmContext = {
    context: "Confirmation"
  }, cache[24] = confirmContext;else confirmContext = cache[24];
  // Register keyboard shortcut for "no" / cancel
  if (Or("confirm:no", noHandler, confirmContext), alreadyAccepted) return queueMicrotask(onDone), null;
  // Build static UI elements (cached)
  let cwdText: any, safetyText: any, capabilityText: any;
  if (cache[25] === Symbol.for("react.memo_cache_sentinel")) cwdText = EN.jsx(v, {
    bold: !0,
    children: Wt().cwd()
  }), safetyText = EN.jsxs(v, {
    children: ["Quick safety check: Is this a project you created or one you trust? (Like your own code, a well-known open source project, or work from your team). If not, take a moment to review what", "'", "s in this folder first."]
  }), capabilityText = EN.jsxs(v, {
    children: ["Claude Code", "'", "ll be able to read, edit, and execute files here."]
  }), cache[25] = cwdText, cache[26] = safetyText, cache[27] = capabilityText;else cwdText = cache[25], safetyText = cache[26], capabilityText = cache[27];
  let securityLink: any;
  if (cache[28] === Symbol.for("react.memo_cache_sentinel")) securityLink = EN.jsx(v, {
    dimColor: !0,
    children: EN.jsx(Ss, {
      url: "https://code.claude.com/docs/en/security",
      children: "Security guide"
    })
  }), cache[28] = securityLink;else securityLink = cache[28];
  // Confirm/cancel buttons
  let confirmButtons: any;
  if (cache[29] !== onConfirmCallback) confirmButtons = EN.jsx(Bl, {
    confirmLabel: "Yes, I trust this folder",
    cancelLabel: "No, exit",
    onConfirm: () => onConfirmCallback("enable_all"),
    onCancel: () => onConfirmCallback("exit")
  }), cache[29] = onConfirmCallback, cache[30] = confirmButtons;else confirmButtons = cache[30];
  // Key hint row (shows double-press hint or keyboard shortcuts)
  let keyHintRow: any;
  if (cache[31] !== ctrlCHandler.keyName || cache[32] !== ctrlCHandler.pending) keyHintRow = EN.jsx(v, {
    dimColor: !0,
    children: ctrlCHandler.pending ? EN.jsxs(EN.Fragment, {
      children: ["Press ", ctrlCHandler.keyName, " again to exit"]
    }) : EN.jsxs(bn, {
      children: [EN.jsx(at, {
        chord: "enter",
        action: "confirm"
      }), EN.jsx(at, {
        chord: "escape",
        action: "cancel"
      })]
    })
  }), cache[31] = ctrlCHandler.keyName, cache[32] = ctrlCHandler.pending, cache[33] = keyHintRow;else keyHintRow = cache[33];
  let dialogBox: any;
  if (cache[34] !== confirmButtons || cache[35] !== keyHintRow) dialogBox = EN.jsx(hm, {
    color: "warning",
    titleColor: "warning",
    title: "Accessing workspace:",
    children: EN.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingTop: 1,
      children: [cwdText, safetyText, capabilityText, securityLink, confirmButtons, keyHintRow]
    })
  }), cache[34] = confirmButtons, cache[35] = keyHintRow, cache[36] = dialogBox;else dialogBox = cache[36];
  return dialogBox;
}
/** Config updater that marks the trust dialog as accepted. */
function RKm(e) {
  return {
    ...e,
    hasTrustDialogAccepted: !0
  };
}
/** Checks if a command is a plugin/skills prompt from project/local settings with mcp tool access. */
function vKm(e) {
  return e.type === "prompt" && (e.loadedFrom === "skills" || e.loadedFrom === "plugin") && (e.source === "projectSettings" || e.source === "localSettings" || e.source === "plugin") && e.allowedTools?.some(wKm);
}
/** Returns true if the tool is the mcp server namespace or starts with it. */
function wKm(e) {
  return e === Mo || e.startsWith(Mo + "(");
}
/** Checks if a command is a deprecated prompt from project/local settings with mcp tool access. */
function kKm(e) {
  return e.type === "prompt" && e.loadedFrom === "commands_DEPRECATED" && (e.source === "projectSettings" || e.source === "localSettings") && e.allowedTools?.some(HKm);
}
/** Returns true if the tool is the mcp server namespace or starts with it. */
function HKm(e) {
  return e === Mo || e.startsWith(Mo + "(");
}
var _mc, r$o, prr, EN;
var Tmc = b(() => {
  kt();
  lt();
  TI();
  je();
  ss();
  mn();
  KA();
  tr();
  Po();
  ps();
  Np();
  wnt();
  Is();
  d_();
  Wo();
  DI();
  gmc();
  _mc = x(tt(), 1), r$o = require("os"), prr = x(et(), 1), EN = x(oe(), 1);
});

export {ymc,TrustDialog,RKm,vKm,wKm,kKm,HKm,_mc,r$o,prr,EN,Tmc};
