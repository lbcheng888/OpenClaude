// @ts-nocheck
import {ft,b,oo} from "../../runtime.ts";
import {isDangerousTaskPermission as Mho,isDangerousPowerShellPermission as V4t,isDangerousClassifierPermission as u5e,isDangerousBashPermission as W4t,G4t,fqn} from "../../vendor/m4172.ts";
import {isBypassPermissionsModeDisabled as N2,vUe} from "../telemetry/2232_vUe.ts";
import {antBuiltinDenyRules as _Qn,yQn} from "../../vendor/m5214.ts";
import {fA,a2,wm} from "../../vendor/m707.ts";
import {getSettingsFilePathForSource as Xf,getSettings_DEPRECATED as $o,hasAutoModeOptIn as _3,getUseAutoModeDuringPlan as ybr,br} from "../config/0745_updateSettingsForSource.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {ws,Yc,Zm} from "../config/2709_Zm.ts";
import {pqn,dqn,mqn,Lho} from "../../vendor/m4171.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,getDynamicConfig_BLOCKS_ON_INIT as z7,checkSecurityRestrictionGate as m$r,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne} from "../../vendor/m583.ts";
import {Jf,Gp,S0,aCe,ssn,gA} from "../mcp/0733_serverName.ts";
import {i_,Sw} from "../../vendor/m2789.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Bhe,oS} from "../config/2605_event_name.ts";
import {handlePlanModeTransition as zde,handleAutoModeTransition as vJt,tK,MU,getIsNonInteractiveSession as kr,setSearchToolsOptIn as Yir,getOriginalCwd as gr,getIsRemoteMode as la,lt} from "../session/0132_sent.ts";
import {sve,SDt} from "../../vendor/m2226.ts";
import {kyo,Hyo,o9,cx} from "../artifact/4323_cx.ts";
import {Nd,Wt,ps} from "../../vendor/m230.ts";
import {isScrubEnabled as Ok,VM} from "../agent/2231_subprocessEnv.ts";
import {kbi,TDt} from "./2226_cli.ts";
import {lsn,csn} from "../../vendor/m734.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {AIn,Cae} from "../../vendor/m2788.ts";
import {nt} from "../../vendor/m127.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {applyPermissionRulesToPermissionContext as $Lo,getDenyRules as MG,getAskRules as RTe,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {Vtt,Ktt,UAn} from "../../vendor/m2466.ts";
import {fLn,gno} from "../../vendor/m3368.ts";
import {getMainLoopModel as gs,Ro} from "./1458_swapShrinksContextWindow.ts";
import {bfe,cZe,MR} from "../config/2033_allowed.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {Ir} from "../../vendor/m584.ts";
import {E8} from "../config/2192_terminal.ts";
import {dn} from "../config/0137_namespace.ts";
import {bte,lce} from "../../vendor/m3960.ts";
// @ts-nocheck
var c9n = {};
ft(c9n, {
  verifyAutoModeGateAccess: () => verifyAutoModeGateAccess,
  transitionPlanAutoMode: () => transitionPlanAutoMode,
  transitionPermissionMode: () => transitionPermissionMode,
  stripDangerousPermissionsForAutoMode: () => stripDangerousPermissionsForAutoMode,
  shouldPlanUseAutoMode: () => shouldPlanUseAutoMode,
  shouldDisableBypassPermissions: () => shouldDisableBypassPermissions,
  setPermissionModeWithGuards: () => setPermissionModeWithGuards,
  restoreDangerousPermissions: () => restoreDangerousPermissions,
  removeDangerousPermissions: () => removeDangerousPermissions,
  prepareContextForPlanMode: () => prepareContextForPlanMode,
  parseToolListFromCLI: () => parseToolListFromCLI,
  parseBaseToolsFromCLI: () => parseBaseToolsFromCLI,
  isYoloEquivStripEnabledForEntrypoint: () => isYoloEquivStripEnabledForEntrypoint,
  isOverlyBroadPowerShellAllowRule: () => isOverlyBroadPowerShellAllowRule,
  isOverlyBroadBashAllowRule: () => isOverlyBroadBashAllowRule,
  isDefaultPermissionModeAuto: () => isDefaultPermissionModeAuto,
  isDangerousTaskPermission: () => Mho,
  isDangerousPowerShellPermission: () => V4t,
  isDangerousClassifierPermission: () => u5e,
  isDangerousBashPermission: () => W4t,
  isBypassPermissionsModeDisabled: () => N2,
  isAutoModeGateEnabled: () => isAutoModeGateEnabled,
  initializeToolPermissionContext: () => initializeToolPermissionContext,
  initialPermissionModeFromCLI: () => initialPermissionModeFromCLI,
  hasAutoModeOptInAnySource: () => hasAutoModeOptInAnySource,
  getAutoModeUnavailableReason: () => getAutoModeUnavailableReason,
  getAutoModeUnavailableNotification: () => getAutoModeUnavailableNotification,
  getAutoModeEnabledStateIfCached: () => getAutoModeEnabledStateIfCached,
  getAutoModeEnabledState: () => getAutoModeEnabledState,
  findOverlyBroadPowerShellPermissions: () => findOverlyBroadPowerShellPermissions,
  findOverlyBroadBashPermissions: () => findOverlyBroadBashPermissions,
  findDangerousClassifierPermissions: () => findDangerousClassifierPermissions,
  createDisabledBypassPermissionsContext: () => createDisabledBypassPermissionsContext,
  checkAndDisableBypassPermissions: () => checkAndDisableBypassPermissions,
  antBuiltinDenyRules: () => _Qn
});
/** Render a permission rule's source as a short, possibly project-relative, display string. */
function GLo(source) {
  if (fA.includes(source)) {
    let settingsPath = Xf(source);
    if (settingsPath) {
      let relativePath = c6l.relative(Lt(), settingsPath);
      return relativePath.length < settingsPath.length ? relativePath : settingsPath;
    }
  }
  return source;
}
/** Collect "allow" rules that bypass the classifier (dangerous) from context rules and CLI args. */
function findDangerousClassifierPermissions(contextRules, cliRules) {
  let dangerous = [];
  for (let rule of contextRules) if (rule.ruleBehavior === "allow" && u5e(rule.ruleValue.toolName, rule.ruleValue.ruleContent)) {
    let ruleDisplay = rule.ruleValue.ruleContent ? `${rule.ruleValue.toolName}(${rule.ruleValue.ruleContent})` : `${rule.ruleValue.toolName}(*)`;
    dangerous.push({
      ruleValue: rule.ruleValue,
      source: rule.source,
      ruleDisplay,
      sourceDisplay: GLo(rule.source)
    });
  }
  for (let cliRule of cliRules) {
    let match = cliRule.match(/^([^(]+)(?:\(([^)]*)\))?$/);
    if (match) {
      let toolName = match[1].trim(),
        ruleContent = match[2]?.trim();
      if (u5e(toolName, ruleContent)) dangerous.push({
        ruleValue: {
          toolName,
          ruleContent
        },
        source: "cliArg",
        ruleDisplay: ruleContent ? cliRule : `${toolName}(*)`,
        sourceDisplay: "--allowed-tools"
      });
    }
  }
  return dangerous;
}
/** True if a rule content is empty/whitespace or all wildcards (i.e. matches everything). */
function KLo(ruleContent) {
  return ruleContent === void 0 || /^[\s*]+$/.test(ruleContent);
}
/** Classify how broad a Bash/PowerShell allow rule is: powershell | bare | cluster | network | ace. */
function MIm(ruleValue) {
  if (ruleValue.toolName === ws) return "powershell";
  let ruleContent = ruleValue.ruleContent;
  if (ruleContent === void 0 || KLo(ruleContent)) return "bare";
  if (G4t(ruleContent, pqn)) return "cluster";
  if (G4t(ruleContent, dqn)) return "network";
  return "ace";
}
/** True if a Bash allow rule is overly broad (bare or, when strict, matching a broad pattern). */
function isOverlyBroadBashAllowRule(ruleValue, strict = !1) {
  if (ruleValue.toolName !== Mo) return !1;
  let ruleContent = ruleValue.ruleContent;
  if (ruleContent === void 0 || KLo(ruleContent)) return !0;
  return strict && G4t(ruleContent, LIm);
}
/** True if a PowerShell allow rule is overly broad (empty/wildcard content). */
function isOverlyBroadPowerShellAllowRule(ruleValue) {
  return ruleValue.toolName === ws && KLo(ruleValue.ruleContent);
}
/** Decide whether the YOLO-equivalent dangerous-rule stripping applies for the current entrypoint. */
function isYoloEquivStripEnabledForEntrypoint() {
  let config = it("tengu_ant_yolo_equiv_strip_config", {});
  if (!config.enabled) return !1;
  let entrypoint = Ne.CLAUDE_CODE_ENTRYPOINT ?? "cli";
  if (config.includeEntrypoints) return config.includeEntrypoints.includes(entrypoint);
  return !(config.excludeEntrypoints ?? []).includes(entrypoint);
}
/** Find overly broad Bash allow rules across context rules and CLI args. */
function findOverlyBroadBashPermissions(contextRules, cliRules, strict = !1) {
  let found = [];
  for (let rule of contextRules) if (rule.ruleBehavior === "allow" && isOverlyBroadBashAllowRule(rule.ruleValue, strict)) found.push({
    ruleValue: rule.ruleValue,
    source: rule.source,
    ruleDisplay: rule.ruleValue.ruleContent ? `${rule.ruleValue.toolName}(${rule.ruleValue.ruleContent})` : `${rule.ruleValue.toolName}(*)`,
    sourceDisplay: GLo(rule.source)
  });
  for (let cliRule of cliRules) {
    let ruleValue = Jf(cliRule);
    if (isOverlyBroadBashAllowRule(ruleValue, strict)) found.push({
      ruleValue,
      source: "cliArg",
      ruleDisplay: ruleValue.ruleContent ? `${ruleValue.toolName}(${ruleValue.ruleContent})` : `${ruleValue.toolName}(*)`,
      sourceDisplay: "--allowed-tools"
    });
  }
  return found;
}
/** Find overly broad PowerShell allow rules across context rules and CLI args. */
function findOverlyBroadPowerShellPermissions(contextRules, cliRules) {
  let found = [];
  for (let rule of contextRules) if (rule.ruleBehavior === "allow" && isOverlyBroadPowerShellAllowRule(rule.ruleValue)) found.push({
    ruleValue: rule.ruleValue,
    source: rule.source,
    ruleDisplay: `${ws}(*)`,
    sourceDisplay: GLo(rule.source)
  });
  for (let cliRule of cliRules) {
    let ruleValue = Jf(cliRule);
    if (isOverlyBroadPowerShellAllowRule(ruleValue)) found.push({
      ruleValue,
      source: "cliArg",
      ruleDisplay: `${ws}(*)`,
      sourceDisplay: "--allowed-tools"
    });
  }
  return found;
}
/** True if a rule source is removable (a settings source, session, or cliArg). */
function FIm(source) {
  return a2.includes(source) || source === "session" || source === "cliArg";
}
/** Remove dangerous allow rules from a context, grouped by source. */
function removeDangerousPermissions(context, dangerousRules, force = !1) {
  let rulesBySource = new Map();
  for (let rule of dangerousRules) {
    if (!force && !FIm(rule.source)) continue;
    let source = rule.source,
      rules = rulesBySource.get(source) || [];
    rules.push(rule.ruleValue), rulesBySource.set(source, rules);
  }
  let result = context;
  for (let [source, rules] of rulesBySource) result = i_(result, {
    type: "removeRules",
    rules,
    behavior: "allow",
    destination: source
  });
  return result;
}
/** Strip classifier-bypassing dangerous rules for auto mode, recording what was stripped for later restore. */
function stripDangerousPermissionsForAutoMode(context) {
  let allowRules = [];
  for (let [source, rules] of Object.entries(context.alwaysAllowRules)) {
    if (!rules) continue;
    for (let rawRule of rules) {
      let ruleValue = Jf(rawRule);
      allowRules.push({
        source,
        ruleBehavior: "allow",
        ruleValue
      });
    }
  }
  let dangerous = findDangerousClassifierPermissions(allowRules, []);
  if (dangerous.length === 0) return context.strippedDangerousRules !== void 0 ? context : {
    ...context,
    strippedDangerousRules: {}
  };
  for (let rule of dangerous) A(`Ignoring dangerous permission ${rule.ruleDisplay} from ${rule.sourceDisplay} (bypasses classifier)`);
  let strippedBySource = {};
  for (let [source, rules] of Object.entries(context.strippedDangerousRules ?? {})) if (rules) strippedBySource[source] = [...rules];
  for (let rule of dangerous) {
    let serialized = Gp(rule.ruleValue),
      bucket = strippedBySource[rule.source] ??= [];
    if (!bucket.includes(serialized)) bucket.push(serialized);
  }
  return {
    ...removeDangerousPermissions(context, dangerous, !0),
    strippedDangerousRules: strippedBySource
  };
}
/** Re-add previously stripped dangerous rules, clearing the stripped record. */
function restoreDangerousPermissions(context) {
  let strippedBySource = context.strippedDangerousRules;
  if (!strippedBySource) return context;
  let result = context;
  for (let [source, rules] of Object.entries(strippedBySource)) {
    if (!rules || rules.length === 0) continue;
    result = i_(result, {
      type: "addRules",
      rules: rules.map(Jf),
      behavior: "allow",
      destination: source
    });
  }
  return {
    ...result,
    strippedDangerousRules: void 0
  };
}
/** Transition the permission context from one mode to another, applying auto/plan side effects. */
function transitionPermissionMode(fromMode, toMode, context, trigger) {
  if (fromMode === toMode) return context;
  if (Bhe({
    from: fromMode,
    to: toMode,
    trigger
  }), zde(fromMode, toMode), vJt(fromMode, toMode), fromMode === "plan" && toMode !== "plan") tK(!0);
  {
    if (toMode === "plan" && fromMode !== "plan") return prepareContextForPlanMode(context);
    let wasAuto = fromMode === "auto" || fromMode === "plan" && (DL?.isAutoModeActive() ?? !1),
      toAuto = toMode === "auto";
    if (toAuto && !wasAuto) {
      if (!isAutoModeGateEnabled()) throw Error("Cannot transition to auto mode: gate is not enabled");
      DL?.setAutoModeActive(!0), context = stripDangerousPermissionsForAutoMode(context);
    } else if (wasAuto && !toAuto) DL?.setAutoModeActive(!1), MU(!0), context = restoreDangerousPermissions(context);
  }
  if (fromMode === "plan" && toMode !== "plan" && context.prePlanMode) return {
    ...context,
    prePlanMode: void 0
  };
  return context;
}
/** Set the permission mode with guards (bypass/auto availability), updating state and emitting an event. */
function setPermissionModeWithGuards(mode, context, updateState, trigger) {
  if (mode === "bypassPermissions") {
    if (N2()) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because it is disabled by settings or configuration"
    };
    if (!context.isBypassPermissionsModeAvailable) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because the session was not launched with --dangerously-skip-permissions"
    };
  }
  if (mode === "auto" && !isAutoModeGateEnabled()) {
    let reason = getAutoModeUnavailableReason();
    return {
      ok: !1,
      error: reason ? `Cannot set permission mode to auto: ${getAutoModeUnavailableNotification(reason)}` : "Cannot set permission mode to auto"
    };
  }
  return updateState(current => {
    if (current.mode === mode) return current;
    return {
      ...transitionPermissionMode(current.mode, mode, current, trigger),
      mode
    };
  }), setImmediate(() => {
    sve.emit();
  }), {
    ok: !0,
    mode
  };
}
/** Parse the base tool list from CLI args, expanding the default preset when present. */
function parseBaseToolsFromCLI(args) {
  let joined = args.join(" ").trim();
  if (kyo(joined)) return Hyo();
  let tools = parseToolListFromCLI(args);
  if (tools.includes("preset:default")) return o9().map(tool => tool.name).concat(tools.filter(tool => tool !== "preset:default"));
  return tools;
}
/** True if the process PWD is a symlink that resolves to the original cwd. */
function BIm({
  processPwd,
  originalCwd
}) {
  let {
    resolvedPath,
    isSymlink
  } = Nd(Wt(), processPwd);
  return isSymlink ? resolvedPath === u6l.resolve(originalCwd) : !1;
}
/** Resolve the initial permission mode from CLI flags, settings and env scrub hardening. */
function initialPermissionModeFromCLI({
  permissionModeCli,
  dangerouslySkipPermissions,
  agentPermissionMode
}) {
  if (Ok()) {
    let forcedDefault = dangerouslySkipPermissions || permissionModeCli && permissionModeCli !== "default" || agentPermissionMode && agentPermissionMode !== "default",
      notification = "Permission mode forced to default — CLAUDE_CODE_SUBPROCESS_ENV_SCRUB is set " + "(allowed_non_write_users hardening). Declare allowedTools explicitly, or set CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=0 to opt out.";
    if (forcedDefault) process.stderr.write(`⚠ ${notification}
`);
    return {
      mode: "default",
      notification: forcedDefault ? notification : void 0
    };
  }
  let resolved = kbi({
    cli: {
      permissionMode: permissionModeCli,
      dangerouslySkipPermissions,
      isNonInteractiveSession: kr()
    },
    env: {
      ...process.env,
      CLAUDE_CODE_SUBPROCESS_ENV_SCRUB: void 0
    },
    settings: $o() || {},
    agentFrontmatter: agentPermissionMode ? {
      permissionMode: agentPermissionMode
    } : void 0
  });
  if (DL?.setAutoModeFromFallback(resolved.fromAutoFallback), resolved.mode === "auto") DL?.setAutoModeActive(!0);
  return {
    mode: resolved.mode,
    notification: resolved.notification
  };
}
/** Parse a comma/space-separated tool list from CLI args, respecting parentheses for matchers. */
function parseToolListFromCLI(args) {
  if (args.length === 0) return [];
  let tools = [];
  for (let arg of args) {
    if (!arg) continue;
    let current = "",
      insideParens = !1;
    for (let ch of arg) switch (ch) {
      case "(":
        insideParens = !0, current += ch;
        break;
      case ")":
        insideParens = !1, current += ch;
        break;
      case ",":
        if (insideParens) current += ch;else {
          if (current.trim()) tools.push(current.trim());
          current = "";
        }
        break;
      case " ":
        if (insideParens) current += ch;else if (current.trim()) tools.push(current.trim()), current = "";
        break;
      default:
        current += ch;
    }
    if (current.trim()) tools.push(current.trim());
  }
  return tools;
}
/** Build the full tool-permission context from CLI flags, settings, env and base tool narrowing. */
async function initializeToolPermissionContext({
  allowedToolsCli,
  disallowedToolsCli,
  baseToolsCli,
  permissionMode,
  allowDangerouslySkipPermissions,
  addDirs,
  bgSessionPermissionRules
}) {
  let warnings = [],
    allowRules = parseToolListFromCLI(allowedToolsCli).map(rule => Gp(Jf(rule))).filter(rule => {
      let invalid = lsn(Jf(rule).toolName);
      if (invalid) return warnings.push(`Ignoring --allowedTools rule "${rule}": ${invalid.error}. ${invalid.suggestion}.`), !1;
      return !0;
    }),
    denyRules = os([...parseToolListFromCLI(disallowedToolsCli), ..._Qn()]),
    hasBasePreset = !!baseToolsCli && baseToolsCli.length > 0 && kyo(baseToolsCli.join(" ").trim()) !== null,
    baseToolNames = baseToolsCli && !hasBasePreset ? parseToolListFromCLI(baseToolsCli).map(S0) : [];
  Yir([su, Cc].some(tool => baseToolNames.includes(tool) || allowRules.some(rule => Jf(rule).toolName === tool)));
  let narrowedTools = [];
  if (baseToolsCli && baseToolsCli.length > 0) {
    let baseTools = parseBaseToolsFromCLI(baseToolsCli),
      baseToolSet = new Set(baseTools.map(S0)),
      narrowed = (hasBasePreset ? Hyo() : o9().map(tool => tool.name)).filter(name => !baseToolSet.has(name));
    if (!hasBasePreset) {
      for (let tool of [ws, su, Cc]) if (!baseToolSet.has(tool) && !narrowed.includes(tool)) narrowed.push(tool);
    }
    narrowedTools = narrowed;
  }
  let additionalWorkingDirectories = new Map(),
    pwd = process.env.PWD;
  if (pwd && pwd !== gr() && BIm({
    originalCwd: gr(),
    processPwd: pwd
  })) additionalWorkingDirectories.set(pwd, {
    path: pwd,
    source: "session"
  });
  let bypassDisabledByGate = it("tengu_disable_bypass_permissions_mode", !1),
    settings = $o() || {},
    bypassDisabledBySettings = settings.permissions?.disableBypassPermissionsMode === "disable",
    isBypassPermissionsModeAvailable = (permissionMode === "bypassPermissions" || allowDangerouslySkipPermissions) && !bypassDisabledByGate && !bypassDisabledBySettings,
    contextRules = AIn(),
    denyAndNarrowedRules = [...denyRules, ...narrowedTools].map(Jf),
    hasBareBashDeny = denyAndNarrowedRules.some(rule => rule.toolName === Mo && rule.ruleContent === void 0),
    hasBashRule = denyAndNarrowedRules.some(rule => rule.toolName === Mo) || contextRules.some(rule => rule.ruleBehavior === "deny" && rule.ruleValue.toolName === Mo),
    hasPowerShellRule = nt(process.env.CLAUDE_CODE_USE_POWERSHELL_TOOL) || parseToolListFromCLI(baseToolsCli ?? []).map(S0).includes(ws) || allowRules.some(rule => Jf(rule).toolName === ws) || denyAndNarrowedRules.some(rule => rule.toolName === ws) || contextRules.some(rule => rule.ruleValue.toolName === ws);
  if (Yt() === "windows" && Yc() && hasBashRule && !hasPowerShellRule) denyRules = [...denyRules, ws];
  let overlyBroadBashPermissions = [];
  if (!nt(process.env.CLAUDE_CODE_REMOTE) && process.env.CLAUDE_CODE_ENTRYPOINT !== "local-agent") {
    let overlyBroad = [...findOverlyBroadBashPermissions(contextRules, allowRules, !0), ...findOverlyBroadPowerShellPermissions(contextRules, allowRules)];
    if (overlyBroad.length > 0) {
      let categories = overlyBroad.map(perm => MIm(perm.ruleValue)),
        yoloEquivEnabled = !1,
        willStrip = !1;
      W("tengu_ant_overly_broad_bash_detected", {
        count: overlyBroad.length,
        categories: os(categories).sort().join(","),
        yoloEquivEnabled,
        willStrip: overlyBroadBashPermissions.length,
        entrypoint: Ne.CLAUDE_CODE_ENTRYPOINT ?? "cli",
        ...!1
      });
    }
  }
  let dangerousPermissions = [];
  if (permissionMode === "auto") dangerousPermissions = findDangerousClassifierPermissions(contextRules, allowRules);
  let toolPermissionContext = $Lo({
      mode: permissionMode,
      additionalWorkingDirectories,
      alwaysAllowRules: {
        cliArg: allowRules,
        ...(bgSessionPermissionRules && {
          session: bgSessionPermissionRules.allow
        })
      },
      alwaysDenyRules: {
        cliArg: denyRules,
        ...(bgSessionPermissionRules && {
          session: bgSessionPermissionRules.deny
        }),
        ...(narrowedTools.length > 0 && {
          toolsNarrowing: narrowedTools
        })
      },
      alwaysAskRules: {},
      mcpPermissionModeOverrides: {},
      isBypassPermissionsModeAvailable,
      ...(autoEnabled => ({
        isAutoModeAvailable: autoEnabled,
        canAutoClassifierRun: autoEnabled,
        chromeClassifierFloorEnabled: Ne.CLAUDE_CHROME_CLASSIFIER_FLOOR ?? it("tengu_cowork_chrome_automode_default", !1)
      }))(isAutoModeGateEnabled()),
      isRemoteMode: Ne.CLAUDE_CODE_REMOTE || la()
    }, contextRules),
    builtinTools = o9(),
    knownToolNames = new Set([...builtinTools.map(tool => tool.name), Mo, ws, su, Cc]),
    ruleContentFieldByTool = new Map([[Mo, "command"], [ws, "command"], [su, "path"], [Cc, "path"], ...builtinTools.filter(tool => tool.ruleContentField).map(tool => [tool.name, tool.ruleContentField])]);
  for (let rule of [...MG(toolPermissionContext), ...RTe(toolPermissionContext)]) {
    if (rule.source === "toolsNarrowing" || rule.source === "session") continue;
    let {
      toolName,
      ruleContent
    } = rule.ruleValue;
    if (aCe(toolName) || toolName.includes("_") || ssn(toolName).length > 0 || knownToolNames.has(toolName)) {
      let ruleContentField = ruleContentFieldByTool.get(toolName);
      if (ruleContentField && ruleContent !== void 0) {
        let colonIndex = ruleContent.indexOf(":");
        if (colonIndex > 0 && ruleContent.slice(0, colonIndex).trim() === ruleContentField) warnings.push(`Permission ${rule.ruleBehavior} rule "${Gp(rule.ruleValue)}" targets ${ruleContentField} as a raw string and will not match — use ${toolName}(${"…"}) for ${toolName}'s own matcher.`);
      }
      continue;
    }
    warnings.push(`Permission ${rule.ruleBehavior} rule "${Gp(rule.ruleValue)}" matches no known tool — check for typos.`);
  }
  let directoryRequests = [...(settings.permissions?.additionalDirectories || []).map(dir => ({
      dir,
      destination: "localSettings"
    })), ...addDirs.map(dir => ({
      dir,
      destination: "cliArg"
    }))],
    directoryResults = await Promise.all(directoryRequests.map(async ({
      dir,
      destination
    }) => ({
      destination,
      result: await Vtt(dir, toolPermissionContext)
    }))),
    trustedNetworkDirectories = new Map();
  for (let {
    result,
    destination
  } of directoryResults) if (result.resultType === "success") {
    if (toolPermissionContext = i_(toolPermissionContext, {
      type: "addDirectories",
      directories: [result.absolutePath],
      destination
    }), destination === "cliArg") {
      let networkDirs = fLn(result.absolutePath);
      if (networkDirs.length > 0) {
        trustedNetworkDirectories.set(result.absolutePath, networkDirs);
        let extraDirs = networkDirs.filter(dir => dir !== result.absolutePath);
        if (extraDirs.length > 0) toolPermissionContext = i_(toolPermissionContext, {
          type: "addDirectories",
          directories: extraDirs,
          destination
        });
      }
    }
  } else if (result.resultType !== "alreadyInWorkingDirectory" && result.resultType !== "pathNotFound") warnings.push(Ktt(result));
  if (trustedNetworkDirectories.size > 0) toolPermissionContext = {
    ...toolPermissionContext,
    trustedNetworkDirectories
  };
  return {
    toolPermissionContext,
    warnings,
    dangerousPermissions,
    overlyBroadBashPermissions
  };
}
/** Map an auto-mode-unavailable reason to a user-facing notification string. */
function getAutoModeUnavailableNotification(reason) {
  let notification;
  switch (reason) {
    case "settings":
      notification = "auto mode disabled by settings";
      break;
    case "circuit-breaker":
      notification = "auto mode is unavailable for your plan";
      break;
    case "provider":
      notification = "auto mode requires CLAUDE_CODE_ENABLE_AUTO_MODE=1";
      break;
    case "model":
      notification = "auto mode unavailable for this model";
      break;
  }
  return notification;
}
/** Verify whether the session may enter/stay in auto mode; return a context updater (and optional notification). */
async function verifyAutoModeGateAccess(context, disableFastMode) {
  let config = await z7("tengu_auto_mode_config", {}),
    enabledState = JLo(config?.enabled),
    disabledBySettings = YLo();
  if (!(DL?.isAutoModeCircuitBroken() ?? !1)) DL?.setAutoModeCircuitBroken(enabledState === "disabled" || disabledBySettings);
  let model = gs(),
    disableFastModeBreakerFires = !!config?.disableFastMode && (!!disableFastMode || !1),
    modelSupported = bfe(model) && !disableFastModeBreakerFires,
    carouselAvailable = !1;
  if (enabledState !== "disabled" && !disabledBySettings && modelSupported) carouselAvailable = enabledState === "enabled" || hasAutoModeOptInAnySource() || context.mode === "auto" || context.prePlanMode === "auto";
  let canEnterAuto = enabledState !== "disabled" && !disabledBySettings && modelSupported;
  A(`[auto-mode] verifyAutoModeGateAccess: enabledState=${enabledState} disabledBySettings=${disabledBySettings} model=${model} modelSupported=${modelSupported} disableFastModeBreakerFires=${disableFastModeBreakerFires} carouselAvailable=${carouselAvailable} canEnterAuto=${canEnterAuto}`);
  let autoModeFlagCli = DL?.getAutoModeFlagCli() ?? !1,
    setAvailable = (ctx, available) => {
      if (ctx.isAutoModeAvailable !== available) A(`[auto-mode] verifyAutoModeGateAccess setAvailable: ${ctx.isAutoModeAvailable} -> ${available}`);
      return ctx.isAutoModeAvailable === available && ctx.canAutoClassifierRun === canEnterAuto ? ctx : {
        ...ctx,
        isAutoModeAvailable: available,
        canAutoClassifierRun: canEnterAuto
      };
    };
  if (canEnterAuto) return {
    updateContext: ctx => setAvailable(ctx, carouselAvailable)
  };
  let reason;
  if (disabledBySettings) reason = "settings", A("auto mode disabled: disableAutoMode in settings", {
    level: "warn"
  });else if (enabledState === "disabled") reason = "circuit-breaker", A('auto mode disabled: tengu_auto_mode_config.enabled === "disabled" (circuit breaker)', {
    level: "warn"
  });else if (!cZe(Rr())) reason = "provider", A(`auto mode disabled: provider ${Rr()} requires the CLAUDE_CODE_ENABLE_AUTO_MODE opt-in`, {
    level: "warn"
  });else reason = "model", A(`auto mode disabled: model ${gs()} does not support auto mode`, {
    level: "warn"
  });
  let notification = getAutoModeUnavailableNotification(reason),
    kickOutOfAutoIfNeeded = ctx => {
      let isAuto = ctx.mode === "auto";
      A(`[auto-mode] kickOutOfAutoIfNeeded applying: ctx.mode=${ctx.mode} ctx.prePlanMode=${ctx.prePlanMode} reason=${reason}`);
      let isPlanWithAuto = ctx.mode === "plan" && (ctx.prePlanMode === "auto" || !!ctx.strippedDangerousRules);
      if (!isAuto && !isPlanWithAuto) return setAvailable(ctx, !1);
      if (isAuto) return DL?.setAutoModeActive(!1), MU(!0), Bhe({
        from: "auto",
        to: "default",
        trigger: "auto_gate_denied"
      }), {
        ...i_(restoreDangerousPermissions(ctx), {
          type: "setMode",
          mode: "default",
          destination: "session"
        }),
        isAutoModeAvailable: !1,
        canAutoClassifierRun: !1
      };
      return DL?.setAutoModeActive(!1), MU(!0), {
        ...restoreDangerousPermissions(ctx),
        prePlanMode: ctx.prePlanMode === "auto" ? "default" : ctx.prePlanMode,
        isAutoModeAvailable: !1,
        canAutoClassifierRun: !1
      };
    },
    isAuto = context.mode === "auto",
    isPlanWithAuto = context.mode === "plan" && (context.prePlanMode === "auto" || !!context.strippedDangerousRules);
  if (!(isAuto || isPlanWithAuto || autoModeFlagCli)) return {
    updateContext: kickOutOfAutoIfNeeded
  };
  if (isAuto || isPlanWithAuto) return {
    updateContext: kickOutOfAutoIfNeeded,
    notification
  };
  return {
    updateContext: kickOutOfAutoIfNeeded,
    notification: context.isAutoModeAvailable ? notification : void 0
  };
}
/** True if bypassPermissions mode should be disabled by the feature gate (async). */
function shouldDisableBypassPermissions() {
  return m$r("tengu_disable_bypass_permissions_mode");
}
/** True if auto mode is disabled by settings (top-level or permissions.disableAutoMode). */
function YLo() {
  let settings = $o() || {};
  return settings.disableAutoMode === "disable" || settings.permissions?.disableAutoMode === "disable";
}
/** True if the auto-mode gate is enabled (not circuit-broken, not disabled by settings, model supported). */
function isAutoModeGateEnabled() {
  if (DL?.isAutoModeCircuitBroken() ?? !1) return !1;
  if (YLo()) return !1;
  if (!bfe(gs())) return !1;
  return !0;
}
/** Return the reason auto mode is unavailable, or null if it is available. */
function getAutoModeUnavailableReason() {
  if (YLo()) return "settings";
  if (DL?.isAutoModeCircuitBroken() ?? !1) return "circuit-breaker";
  if (!cZe(Rr())) return "provider";
  if (!bfe(gs())) return "model";
  return null;
}
/** Normalize a raw auto-mode enabled value to enabled | disabled | opt-in, defaulting to opt-in. */
function JLo(enabled) {
  if (enabled === "enabled" || enabled === "disabled" || enabled === "opt-in") return enabled;
  return UIm;
}
/** Read the current auto-mode enabled state from config (may be stale). */
function getAutoModeEnabledState() {
  let config = it("tengu_auto_mode_config", {});
  return JLo(config?.enabled);
}
/** Read the auto-mode enabled state only if the config is already cached; otherwise undefined. */
function getAutoModeEnabledStateIfCached() {
  let config = it("tengu_auto_mode_config", l6l);
  if (config === l6l) return;
  return JLo(config?.enabled);
}
/** True if auto mode is opted in via the CLI flag or any other source. */
function hasAutoModeOptInAnySource() {
  if (DL?.getAutoModeFlagCli() ?? !1) return !0;
  return _3();
}
/** Return a context with bypassPermissions mode disabled (reset to default if currently active). */
function createDisabledBypassPermissionsContext(context) {
  let result = context;
  if (context.mode === "bypassPermissions") result = i_(context, {
    type: "setMode",
    mode: "default",
    destination: "session"
  });
  return {
    ...result,
    isBypassPermissionsModeAvailable: !1
  };
}
/** If bypassPermissions is available but the gate says to disable it, shut down the session. */
async function checkAndDisableBypassPermissions(context) {
  if (!context.isBypassPermissionsModeAvailable) return;
  if (!(await shouldDisableBypassPermissions())) return;
  A("bypassPermissions mode is being disabled by feature gate (async check)", {
    level: "warn"
  }), gi(1, "bypass_permissions_disabled");
}
/** True if the default permission mode in settings is "auto". */
function isDefaultPermissionModeAuto() {
  return ($o() || {}).permissions?.defaultMode === "auto";
}
/** True if plan mode should run under auto mode (opted in, gate enabled, and configured to do so). */
function shouldPlanUseAutoMode() {
  return _3() && isAutoModeGateEnabled() && ybr();
}
/** Prepare a context for entering plan mode, recording the prior mode and adjusting auto state. */
function prepareContextForPlanMode(context) {
  let currentMode = context.mode;
  if (currentMode === "plan") return context;
  {
    let useAuto = shouldPlanUseAutoMode();
    if (currentMode === "auto") {
      if (useAuto) return {
        ...context,
        prePlanMode: "auto"
      };
      return DL?.setAutoModeActive(!1), MU(!0), {
        ...restoreDangerousPermissions(context),
        prePlanMode: "auto"
      };
    }
    if (useAuto && currentMode !== "bypassPermissions") return DL?.setAutoModeActive(!0), {
      ...stripDangerousPermissionsForAutoMode(context),
      prePlanMode: currentMode
    };
  }
  return A(`[prepareContextForPlanMode] plain plan entry, prePlanMode=${currentMode}`, {
    level: "info"
  }), {
    ...context,
    prePlanMode: currentMode
  };
}
/** Reconcile auto-mode state when transitioning within/out of plan mode. */
function transitionPlanAutoMode(context) {
  if (context.mode === "auto") return stripDangerousPermissionsForAutoMode(context);
  if (context.mode !== "plan") return context;
  if (!context.prePlanMode || context.prePlanMode === "bypassPermissions") return context;
  let useAuto = shouldPlanUseAutoMode(),
    isActive = DL?.isAutoModeActive() ?? !1;
  if (useAuto && isActive) return stripDangerousPermissionsForAutoMode(context);
  if (!useAuto && !isActive) return context;
  if (useAuto) return DL?.setAutoModeActive(!0), MU(!1), stripDangerousPermissionsForAutoMode(context);
  return DL?.setAutoModeActive(!1), MU(!0), restoreDangerousPermissions(context);
}
var c6l,
  u6l,
  DL,
  LIm,
  UIm = "opt-in",
  l6l;
var cy = b(() => {
  lt();
  TDt();
  SDt();
  Po();
  Ir();
  E8();
  dn();
  wm();
  csn();
  br();
  VM();
  vUe();
  ly();
  Cae();
  jn();
  UAn();
  kt();
  ow();
  XR();
  cx();
  ps();
  MR();
  qe();
  Np();
  Ro();
  Ps();
  Es();
  Zm();
  oS();
  fqn();
  mqn();
  Sw();
  gA();
  gno();
  yQn();
  yQn();
  vUe();
  c6l = require("path"), u6l = require("path"), DL = (bte(), oo(lce));
  LIm = [...Lho, ...dqn, ...pqn];
  l6l = Symbol("no-cached-auto-mode-config");
});

export {c9n,GLo,findDangerousClassifierPermissions,KLo,MIm,isOverlyBroadBashAllowRule,isOverlyBroadPowerShellAllowRule,isYoloEquivStripEnabledForEntrypoint,findOverlyBroadBashPermissions,findOverlyBroadPowerShellPermissions,FIm,removeDangerousPermissions,stripDangerousPermissionsForAutoMode as $6,restoreDangerousPermissions,transitionPermissionMode,setPermissionModeWithGuards,parseBaseToolsFromCLI,BIm,initialPermissionModeFromCLI,parseToolListFromCLI,initializeToolPermissionContext,getAutoModeUnavailableNotification,verifyAutoModeGateAccess,shouldDisableBypassPermissions,YLo,isAutoModeGateEnabled,getAutoModeUnavailableReason,JLo,getAutoModeEnabledState,getAutoModeEnabledStateIfCached,hasAutoModeOptInAnySource,createDisabledBypassPermissionsContext,checkAndDisableBypassPermissions,isDefaultPermissionModeAuto,shouldPlanUseAutoMode,prepareContextForPlanMode,transitionPlanAutoMode,c6l,u6l,DL,LIm,UIm,l6l,cy};
