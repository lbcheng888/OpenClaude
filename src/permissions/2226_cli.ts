// @ts-nocheck
import {dynamicTeamContext as aF,rve as Tve,Cp as Om} from "../config/2223_level.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as zn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {nt as st} from "../../vendor/m127.ts";
import {fM as t1,FS as eC} from "../../vendor/m722.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {ep as Dp} from "../../vendor/m2223.ts";
import {getSettingsForSource,hasSkipDangerousModePermissionPrompt,hasAutoModeOptIn,br as yr} from "../config/0745_updateSettingsForSource.ts";
import {parseUserSpecifiedModel,Kg as getDefaultMainLoopModel,isWindowSilentDefaultPick,Ro as Mo} from "./1458_swapShrinksContextWindow.ts";
import {Oa as isModelAllowed,eO as MO} from "../../vendor/m1456.ts";
import {tcs as ars,tNe as l1e} from "../config/0744_level.ts";
import {Ws as _i,vd as hp} from "../session/1465_promise.ts";
import {getGlobalConfig,tr as Qn} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../../runtime.ts";
import {xM as g1} from "../../vendor/m1450.ts";
import {MR as jR} from "../config/2033_allowed.ts";
import {dn as sn} from "../config/0137_namespace.ts";
import {IA as Cv} from "../telemetry/2225_names.ts";
import {wm as mf} from "../../vendor/m707.ts";
/** Resolve the effort level from CLI flags and settings. */
function SAi(e: any): any {
  let effortFromCli = aF(e.cli.effort);
  if (effortFromCli !== void 0) return effortFromCli;
  if (e.settings.ultracode === !0) return "xhigh";
  return Tve(e.settings.effortLevel);
}

/** Check if the auto-mode circuit breaker is currently active via feature gate. */
function $Xu(): any {
  let autoModeConfig = getFeatureValue_CACHED_MAY_BE_STALE("tengu_auto_mode_config", vAi);
  return autoModeConfig !== vAi && autoModeConfig?.enabled === "disabled";
}

/** Resolve the effective permission mode from CLI, env, settings, and agent frontmatter. */
function xAi(e: any): any {
  let {
      cli: cliArgs,
      env: envVars,
      settings: settings,
      agentFrontmatter: frontmatter
    } = e,
    cliPermissionMode = cliArgs.permissionMode,
    dangerouslySkip = cliArgs.dangerouslySkipPermissions,
    frontmatterPermissionMode = frontmatter?.permissionMode;

  // Hardened subprocess env: force default mode
  if (st(envVars.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB)) {
    let hasNonDefaultMode = dangerouslySkip || cliPermissionMode && cliPermissionMode !== "default" || frontmatterPermissionMode && frontmatterPermissionMode !== "default",
      warningMsg = "Permission mode forced to default — CLAUDE_CODE_SUBPROCESS_ENV_SCRUB is set " + "(allowed_non_write_users hardening). Declare allowedTools explicitly, or set CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=0 to opt out.";
    return {
      mode: "default",
      notification: hasNonDefaultMode ? warningMsg : void 0,
      fromAutoFallback: !1
    };
  }
  let bypassDisabledByFeatureGate = getFeatureValue_CACHED_MAY_BE_STALE("tengu_disable_bypass_permissions_mode", !1),
    bypassDisabledBySettings = settings.permissions?.disableBypassPermissionsMode === "disable",
    bypassDisabled = bypassDisabledByFeatureGate || bypassDisabledBySettings,
    autoCircuitBreakerActive = $Xu(),
    candidateModes: any[] = [],
    downgradeNotification: any;

  // dangerouslySkipPermissions flag
  if (dangerouslySkip) if (RAi("bypassPermissions")) downgradeNotification = wAi, candidateModes.push("default");else candidateModes.push("bypassPermissions");

  // CLI --permission-mode flag
  if (cliPermissionMode) {
    let normalizedCliMode = t1(cliPermissionMode);
    if (RAi(normalizedCliMode)) downgradeNotification = wAi, candidateModes.push("default");else if (normalizedCliMode === "auto") {
      if (autoCircuitBreakerActive) logForDebugging("auto mode circuit breaker active (cached) — falling back to default", {
        level: "warn"
      });else candidateModes.push("auto");
    } else candidateModes.push(normalizedCliMode);
  }

  // Agent frontmatter permissionMode
  if (frontmatterPermissionMode) if (frontmatterPermissionMode === "auto" && autoCircuitBreakerActive) logForDebugging("agent frontmatter requested auto mode but circuit breaker active — falling through", {
    level: "warn"
  });else candidateModes.push(frontmatterPermissionMode);

  // settings.permissions.defaultMode
  if (settings.permissions?.defaultMode) {
    let settingsDefaultMode = settings.permissions.defaultMode;
    if (st(envVars.CLAUDE_CODE_REMOTE) && !["acceptEdits", "plan", "default", "auto"].includes(settingsDefaultMode)) logForDebugging(`settings defaultMode "${settingsDefaultMode}" is not supported in CLAUDE_CODE_REMOTE — only acceptEdits, plan, default, and auto are allowed`, {
      level: "warn"
    }), logEvent("tengu_ccr_unsupported_default_mode_ignored", {
      mode_hash: Dp(settingsDefaultMode)
    });else if (settingsDefaultMode === "auto") {
      if (!["policySettings", "userSettings", "flagSettings"].some((_: any) => getSettingsForSource(_)?.permissions?.defaultMode === "auto")) logForDebugging('settings defaultMode "auto" ignored — only policy/user/flag settings may grant auto mode (projectSettings and localSettings are repo-controllable)', {
        level: "warn"
      }), logEvent("tengu_settings_auto_mode_untrusted_source_ignored", {});else if (autoCircuitBreakerActive) logForDebugging("auto mode circuit breaker active (cached) — falling back to default", {
        level: "warn"
      });else candidateModes.push("auto");
    } else candidateModes.push(settingsDefaultMode);
  }

  // Pick first valid candidate mode
  let resolvedMode: any;
  for (let candidateMode of candidateModes) {
    if (candidateMode === "bypassPermissions" && bypassDisabled) {
      if (bypassDisabledByFeatureGate) logForDebugging("bypassPermissions mode is disabled by feature gate", {
        level: "warn"
      }), downgradeNotification = "Bypass permissions mode was disabled by your organization policy";else logForDebugging("bypassPermissions mode is disabled by settings", {
        level: "warn"
      }), downgradeNotification = "Bypass permissions mode was disabled by settings";
      continue;
    }
    resolvedMode = {
      mode: candidateMode,
      notification: downgradeNotification
    };
    break;
  }

  // Auto-fallback if no mode was explicitly selected
  let fromAutoFallback = !1;
  if (!resolvedMode) {
    let fallbackMode = "default";
    if (!autoCircuitBreakerActive && settings.permissions?.disableAutoMode !== "disable" && settings.disableAutoMode !== "disable" && getFeatureValue_CACHED_MAY_BE_STALE("tengu_harbor_willow", !1) && (!cliArgs.isNonInteractiveSession || getFeatureValue_CACHED_MAY_BE_STALE("tengu_moss_anchor", !1))) fallbackMode = "auto", fromAutoFallback = !0;
    resolvedMode = {
      mode: fallbackMode,
      notification: downgradeNotification
    };
  }
  return {
    mode: resolvedMode.mode,
    notification: resolvedMode.notification,
    fromAutoFallback: fromAutoFallback
  };
}

/** Resolve the list of fallback models from CLI or settings. */
function kAi(e: any): any {
  let rawList = e.cli.fallbackModel?.split(",") ?? (Array.isArray(e.settings.fallbackModel) ? e.settings.fallbackModel : void 0);
  if (rawList === void 0) return;
  let seen = new Set(),
    resolved: any[] = [];
  for (let entry of rawList) {
    let modelStr = typeof entry === "string" ? entry.trim() : "";
    if (modelStr === "") continue;
    let resolvedModel = parseUserSpecifiedModel(modelStr === "default" ? getDefaultMainLoopModel() : modelStr);
    if (seen.has(resolvedModel)) continue;
    if (!isModelAllowed(resolvedModel)) continue;
    if (seen.add(resolvedModel), resolved.push(resolvedModel), resolved.length === qXu) break;
  }
  return resolved.length > 0 ? resolved : void 0;
}

/** Resolve the effective model from CLI, env, settings, and agent frontmatter. */
function HAi(e: any): any {
  let {
      cli: cliArgs,
      env: envVars,
      settings: settings,
      agentFrontmatter: frontmatter
    } = e,
    cliModel = cliArgs.model === "default" ? getDefaultMainLoopModel() : cliArgs.model,
    effectiveModel = cliModel,
    frontmatterModel = frontmatter?.model,
    rawModelRequest: any;

  // Inherit model from agent frontmatter if not set by CLI
  if (!cliModel && frontmatterModel && frontmatterModel !== "inherit") rawModelRequest = frontmatterModel, cliModel = parseUserSpecifiedModel(frontmatterModel), effectiveModel = frontmatterModel;
  let wasFromFrontmatter = !1,
    resolvedModel = cliModel;

  // Fall back to env var or settings
  if (resolvedModel === void 0) resolvedModel = envVars.ANTHROPIC_MODEL || settings.model || void 0, effectiveModel = resolvedModel;

  // Handle disallowed model
  let restrictedModel: any;
  if (resolvedModel && !isModelAllowed(resolvedModel)) {
    let displayModel = rawModelRequest !== void 0 && !wasFromFrontmatter ? rawModelRequest : resolvedModel;
    if (!(displayModel.trim().toLowerCase() === "default" || isWindowSilentDefaultPick(displayModel)) && !wasFromFrontmatter) restrictedModel = displayModel;
    resolvedModel = void 0, effectiveModel = void 0, cliModel = void 0;
  }
  let initialMainLoopModel = resolvedModel || null,
    resolvedInitialModel = parseUserSpecifiedModel(initialMainLoopModel ?? getDefaultMainLoopModel());
  return {
    effectiveModel: cliModel,
    initialMainLoopModel: initialMainLoopModel,
    resolvedInitialModel: resolvedInitialModel,
    rawModelRequest: effectiveModel || null,
    restrictedModel: restrictedModel
  };
}

/** Resolve system prompt and append-system-prompt from CLI, including any injected prompt suffix. */
function IAi(e: any): any {
  let systemPrompt = e.cli.systemPrompt,
    appendSystemPrompt = e.cli.appendSystemPrompt,
    injectedSuffix = ars();
  if (injectedSuffix) appendSystemPrompt = appendSystemPrompt ? `${appendSystemPrompt}\n\n${injectedSuffix}` : injectedSuffix;
  return {
    systemPrompt: systemPrompt,
    appendSystemPrompt: appendSystemPrompt
  };
}

/** Check if a given permission mode requires interactive disclaimer acceptance. */
function RAi(e: any): any {
  if (!_i()) return !1;
  if (e === "bypassPermissions") return !hasSkipDangerousModePermissionPrompt() && !getGlobalConfig().bypassPermissionsModeAccepted;
  if (e === "auto") return !hasAutoModeOptIn();
  return !1;
}
var vAi: any,
  qXu = 3,
  wAi = "Permission mode downgraded to default — bypass/auto requires accepting the disclaimer interactively first";
var GHt = b(() => {
  zn();
  g1();
  Ct();
  jR();
  hp();
  Qn();
  qe();
  Om();
  sn();
  Cv();
  Mo();
  MO();
  eC();
  mf();
  l1e();
  yr();
  vAi = Symbol("no-cached-auto-mode-config");
});
export {SAi as bbi,$Xu as uld,xAi as kbi,kAi as Hbi,HAi as Ibi,IAi as xbi,RAi as wbi,vAi as Rbi,qXu as dld,wAi as vbi,GHt as TDt};
