// @ts-nocheck
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {GLOBAL_CONFIG_KEYS as FQn,DEFAULT_GLOBAL_CONFIG as J7,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {uet,mg} from "../../vendor/m2209.ts";
import {b} from "../../runtime.ts";
/**
 * Collectors for "what config the user has explicitly set" — used to report
 * which environment variables and settings keys deviate from defaults (e.g.
 * for telemetry/diagnostics or to surface active overrides).
 *
 * Each collector returns a sorted list of key names that are present/overridden.
 */

/**
 * Find environment variables that the user has set as Claude/Anthropic config.
 *
 * Picks up any `CLAUDE_CODE_*` or `ANTHROPIC_*` env var that is defined, non-empty,
 * and not in the ignore set (JVm). Returns the matching names, sorted.
 */
function apc(env: Record<string, string | undefined> = process.env): string[] {
  let matchedEnvNames: string[] = [];
  for (let envName in env) if ((envName.startsWith("CLAUDE_CODE_") || envName.startsWith("ANTHROPIC_")) && !JVm.has(envName) && env[envName] !== void 0 && env[envName] !== "") matchedEnvNames.push(envName);
  return matchedEnvNames.sort();
}

/**
 * Find top-level config keys whose effective value differs from the default.
 *
 * For each known key (FQn), prefers the runtime override from Fr() when the key
 * is overridable (uet) else falls back to the provided config object; skips keys
 * in the ignore set (XVm), unset values, and values equal to the default (J7).
 */
function lpc(config: Record<string, unknown>): string[] {
  let runtimeOverrides = Fr(),
    changedKeys: string[] = [];
  for (let key of FQn) {
    if (XVm.has(key)) continue;
    let effectiveValue = (uet.includes(key) ? runtimeOverrides[key] : void 0) ?? config[key],
      defaultValue = J7[key];
    if (effectiveValue === void 0 || ZVm(effectiveValue, defaultValue)) continue;
    changedKeys.push(key);
  }
  return changedKeys;
}

/**
 * Collect set keys from a curated allow-list (QVm) plus a couple of nested keys.
 *
 * Returns the names of any QVm key that is defined on the config object, and the
 * dotted paths for `permissions.defaultMode` / `worktree.baseRef` when present.
 */
function cpc(config: Record<string, any>): string[] {
  let setKeys: string[] = [];
  for (let key of QVm) if (config[key] !== void 0) setKeys.push(key);
  if (config.permissions?.defaultMode !== void 0) setKeys.push("permissions.defaultMode");
  if (config.worktree?.baseRef !== void 0) setKeys.push("worktree.baseRef");
  return setKeys.sort();
}

/**
 * Collect keys of `config` that the source-classifier (`getSource`) attributes to
 * the CLI (e.g. flags passed on the command line). Returns the names, sorted.
 */
function upc(config: Record<string, unknown>, getSource: (key: string) => string): string[] {
  let cliKeys: string[] = [];
  for (let key in config) if (getSource(key) === "cli") cliKeys.push(key);
  return cliKeys.sort();
}

/**
 * Test whether a value should be treated as equal to its default: an exact match,
 * or a non-null object with no own keys (an "empty" override).
 */
function ZVm(value: unknown, defaultValue: unknown): boolean {
  if (value === defaultValue) return !0;
  if (typeof value === "object" && value !== null) return Object.keys(value).length === 0;
  return !1;
}

var JVm: Set<string>, XVm: Set<string>, QVm: string[];
var dpc = b(() => {
  tr();
  mg();
  br();
  JVm = new Set(["CLAUDE_CODE_ENTRYPOINT"]);
  XVm = new Set(["tipsHistory", "installMethod", "shiftEnterKeyBindingInstalled", "hasUsedBackslashReturn", "hasCompletedClaudeInChromeOnboarding", "remoteDialogSeen", "lspRecommendationIgnoredCount", "autoUpdates", "autoUpdatesProtectedForNative"]);
  QVm = ["model", "outputStyle", "language", "effortLevel", "fastMode", "alwaysThinkingEnabled", "spinnerTipsEnabled", "prefersReducedMotion", "promptSuggestionEnabled", "awaySummaryEnabled", "precomputeCompactionEnabled", "switchModelsOnFlag", "autoUpdatesChannel", "viewMode", "syntaxHighlightingDisabled", "useAutoModeDuringPlan", "enableWorkflows", "disableWorkflows", "disableArtifact", "workflowKeywordTriggerEnabled", "respondToBashCommands", "autoCompactWindow", "cleanupPeriodDays", "forceLoginMethod"];
});

export {apc,lpc,cpc,upc,ZVm,JVm,XVm,QVm,dpc};
