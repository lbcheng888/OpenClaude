// @ts-nocheck
import {Bl as C4,dp as MO,sn as A6} from "../config/0047_namespace.ts";
import {je as oH} from "../../vendor/m577.ts";
import {getAdditionalDirectoriesForClaudeMd as ER,lt as w_} from "../session/0131_sent.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
// Module: agent/2209 — feature gating for "safe mode" and "simple/bare mode".
//
// Claude Code can run in two restricted launch modes:
//   - Safe mode  : `--safe-mode` flag or CLAUDE_CODE_SAFE_MODE env (see C4()).
//                  Disables most config-driven extensibility surfaces, keeping
//                  only a small allow-list enabled.
//   - Simple/bare: `--bare` flag or CLAUDE_CODE_SIMPLE env (see MO()).
//                  Disables a fixed deny-list of features unless the feature
//                  was explicitly requested by the user for this run.
//
// `isFeatureDisabled` is the single predicate every feature loader consults to
// decide whether it should be suppressed for the current run.

/**
 * Set of extensibility features whose availability can be gated by launch mode.
 * Each key is checked against {@link SAFE_MODE_ENABLED_FEATURES} (safe mode) and
 * {@link SIMPLE_MODE_DISABLED_FEATURES} (simple/bare mode).
 */
type FeatureKey =
  | "claudeMd"
  | "skills"
  | "workflows"
  | "plugins"
  | "pluginMonitors"
  | "themes"
  | "hooks"
  | "statusLine"
  | "fileSuggestion"
  | "mcpAutoDiscovered"
  | "mcpClaudeAi"
  | "mcpAgentFrontmatter"
  | "agents"
  | "outputStyles"
  | "lspServers"
  | "keybindings";

/** Per-feature flag map (one boolean per gated feature). */
type FeatureFlagMap = Record<FeatureKey, boolean>;

/** Options passed by callers of {@link isFeatureDisabled}. */
interface FeatureGateOptions {
  /**
   * Whether the user explicitly requested this feature for the current run
   * (e.g. via a CLI flag / additional directories). When true, simple/bare
   * mode does not suppress the feature.
   */
  explicitlyRequested?: boolean;
}

/**
 * Returns whether the given feature should be disabled for the current run.
 *
 * - In safe mode (C4()): disabled unless the feature is on the safe-mode
 *   enabled allow-list ({@link SAFE_MODE_ENABLED_FEATURES}).
 * - In simple/bare mode (MO()): disabled per the simple-mode deny-list
 *   ({@link SIMPLE_MODE_DISABLED_FEATURES}), but only when the feature was not
 *   explicitly requested.
 * - Otherwise: not disabled.
 */
function isFeatureDisabled(feature: FeatureKey, options?: FeatureGateOptions): boolean {
  if (C4() && !SAFE_MODE_ENABLED_FEATURES[feature]) return !0;
  if (MO() && !options?.explicitlyRequested) return SIMPLE_MODE_DISABLED_FEATURES[feature];
  return !1;
}

/**
 * Whether loading of CLAUDE.md memory files is disabled for the current run.
 *
 * Disabled when CLAUDE_CODE_DISABLE_CLAUDE_MDS is set, or when the "claudeMd"
 * feature is gated off by the current launch mode. The CLAUDE.md feature counts
 * as explicitly requested when additional directories were provided (ER()).
 */
function isClaudeMdDisabled(): boolean {
  return Boolean(oH.CLAUDE_CODE_DISABLE_CLAUDE_MDS || isFeatureDisabled("claudeMd", {
    explicitlyRequested: ER().length > 0
  }));
}

/**
 * In simple/bare mode, a `true` value means the feature is DISABLED.
 * Populated lazily by {@link initFeatureGates}.
 */
var SIMPLE_MODE_DISABLED_FEATURES: FeatureFlagMap;

/**
 * In safe mode, a `true` value means the feature stays ENABLED (allow-list).
 * Any feature not marked `true` here is disabled while in safe mode.
 * Populated lazily by {@link initFeatureGates}.
 */
var SAFE_MODE_ENABLED_FEATURES: FeatureFlagMap;

/**
 * Lazy module initializer (memoized via L). Resolves the cross-module
 * dependencies (w_/_q/A6) and builds the two launch-mode feature flag maps.
 */
var initFeatureGates = L(() => {
  w_();
  _q();
  A6();
  SIMPLE_MODE_DISABLED_FEATURES = {
    claudeMd: !0,
    skills: !0,
    workflows: !1,
    plugins: !0,
    pluginMonitors: !1,
    themes: !1,
    hooks: !0,
    statusLine: !1,
    fileSuggestion: !1,
    mcpAutoDiscovered: !1,
    mcpClaudeAi: !1,
    mcpAgentFrontmatter: !0,
    agents: !0,
    outputStyles: !1,
    lspServers: !0,
    keybindings: !1
  }, SAFE_MODE_ENABLED_FEATURES = {
    claudeMd: !1,
    skills: !1,
    workflows: !1,
    plugins: !1,
    pluginMonitors: !1,
    themes: !1,
    hooks: !0,
    statusLine: !0,
    fileSuggestion: !0,
    mcpAutoDiscovered: !1,
    mcpClaudeAi: !1,
    mcpAgentFrontmatter: !1,
    agents: !1,
    outputStyles: !1,
    lspServers: !1,
    keybindings: !1
  };
});

export {isFeatureDisabled as hc,isClaudeMdDisabled as Zse,SIMPLE_MODE_DISABLED_FEATURES as CQu,SAFE_MODE_ENABLED_FEATURES as vQu,initFeatureGates as Iy};
