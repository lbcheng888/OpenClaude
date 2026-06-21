// @ts-nocheck
import {u$ as CI,s5 as mF} from "./2182_s5.ts";
import {qsa as vt7,Bsa as kt7,Lot as I6_} from "../../vendor/m3254.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {gs as $9,lP as dN,sh as t$} from "../../vendor/m2589.ts";
import {$q as _B,Mk as JZ} from "./4439_operation.ts";
import {Lk as jZ,nI as kL} from "../../vendor/m3252.ts";
import {U0 as NL,hS as tj} from "./4438_source.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_} from "../../vendor/m5.ts";
import {logForDebugging as N,qe as FH} from "./0234_setHasFormattedOutput.ts";
import {ET as Oj} from "../../vendor/m3140.ts";
import {b as L} from "../../runtime.ts";
/**
 * Plugin hint recommendation pipeline.
 *
 * Processes `<claude-code-hint>` tags emitted by bash tool output: validates
 * each hint, deduplicates it, then queues it into the reactive hint store so
 * the TUI can surface an install prompt to the user.
 */

/** Hint object produced by the `<claude-code-hint>` XML tag parser (from I6_ module). */
interface ClaudeCodeHint {
  v: number;
  type: string;
  value: string;
  sourceCommand: string;
}

/** Shape returned by St7 / resolvePluginHintRecommendation. */
interface PluginHintRecommendation {
  pluginId: string;
  pluginName: string;
  marketplaceName: string;
  pluginDescription: string | undefined;
  sourceCommand: string;
}

/**
 * Validate and queue a plugin hint for recommendation.
 *
 * Guards (all must pass):
 *  - Telemetry must not be disabled (`CI`)
 *  - Hints must not be globally disabled (`vt7`)
 *  - `claudeCodeHints` config must exist and not be disabled
 *  - Fewer than VS3 plugins already acknowledged
 *  - Plugin ID must parse into name + marketplace
 *  - Marketplace must be known (`dN`)
 *  - Plugin must not already be in the acknowledged list
 *  - Plugin must not already be installed (`_B`)
 *  - Plugin must not be policy-blocked (`jZ`)
 *  - Hint must not have been seen this session (`Et7`)
 */
function eN_(hint: ClaudeCodeHint): void {
  if (CI()) return;
  if (vt7()) return;
  let hintsConfig = C_().claudeCodeHints;
  if (hintsConfig?.disabled) return;
  let acknowledgedPlugins = hintsConfig?.plugin ?? [];
  if (acknowledgedPlugins.length >= VS3) return;
  let pluginId = hint.value,
    {
      name: name,
      marketplace: marketplace
    } = $9(pluginId);
  if (!name || !marketplace) return;
  if (!dN(marketplace)) return;
  if (acknowledgedPlugins.includes(pluginId)) return;
  if (_B(pluginId)) return;
  if (jZ(pluginId)) return;
  if (Et7.has(pluginId)) return;
  Et7.add(pluginId), kt7(hint);
}

/**
 * Resolve a queued hint into a full recommendation object.
 *
 * Looks up the plugin in the marketplace cache (`NL`). Returns `null` if the
 * plugin is not found. Emits a `tengu_plugin_hint_detected` telemetry event
 * regardless.
 */
async function St7(hint: ClaudeCodeHint): Promise<PluginHintRecommendation | null> {
  let pluginId = hint.value,
    {
      name: name,
      marketplace: marketplace
    } = $9(pluginId),
    cacheResult = await NL(pluginId);
  if (c("tengu_plugin_hint_detected", {
    _PROTO_plugin_name: name ?? "",
    _PROTO_marketplace_name: marketplace ?? "",
    result: O_(cacheResult ? "passed" : "not_in_cache")
  }), !cacheResult) return N(`[hintRecommendation] ${pluginId} not found in marketplace cache`), null;
  return {
    pluginId: pluginId,
    pluginName: Oj(cacheResult.entry),
    marketplaceName: marketplace ?? "",
    pluginDescription: cacheResult.entry.description,
    sourceCommand: hint.sourceCommand
  };
}

/**
 * Mark a plugin as acknowledged in the persisted `claudeCodeHints.plugin`
 * list so it is never recommended again.
 */
function Ct7(pluginId: string): void {
  P6((config: any) => {
    let acknowledgedPlugins = config.claudeCodeHints?.plugin ?? [];
    if (acknowledgedPlugins.includes(pluginId)) return config;
    return {
      ...config,
      claudeCodeHints: {
        ...config.claudeCodeHints,
        plugin: [...acknowledgedPlugins, pluginId]
      }
    };
  });
}

/**
 * Permanently disable Claude Code plugin hint recommendations by setting
 * `claudeCodeHints.disabled = true` in the global config.
 */
function bt7(): void {
  P6((config: any) => {
    if (config.claudeCodeHints?.disabled) return config;
    return {
      ...config,
      claudeCodeHints: {
        ...config.claudeCodeHints,
        disabled: !0
      }
    };
  });
}

/** Maximum number of plugins that may be acknowledged before hints are suppressed. */
var VS3 = 100,
  /** Session-scoped set of plugin IDs already seen; prevents re-queuing within one run. */
  Et7: Set<string>;

/** Lazy initializer — sets up Et7 after all dependencies are ready. */
var z06 = L(() => {
  mF();
  y_();
  I6_();
  T8();
  FH();
  JZ();
  tj();
  t$();
  kL();
  Et7 = new Set();
});

export {eN_ as C1t,St7 as Wsa,Ct7 as Gsa,bt7 as Vsa,VS3 as z6d,Et7 as jsa,z06 as WIn};
