// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {ca as TK} from "../../vendor/m5.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {tr as Y8,sn as A6} from "../config/0047_namespace.ts";
import {obn as Lw6} from "../../vendor/m2461.ts";
import {KZe as rsH,rbn as Rw6} from "../artifact/2461_context.ts";
import {hc as L1,Iy as tf} from "../agent/2230_explicitlyRequested.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Oe as IH,Ie as vH,isTmuxControlMode as n_,ln as M6} from "./0594_feature_name.ts";
import {abn as Nw6,V$r as JS8,K$r as DS8,Mwi as Jj7} from "../../vendor/m2463.ts";
import {Pn as b6,Se as GH,bt as L_} from "../../vendor/m195.ts";
import {M1 as Wv,sie as q9H} from "../../vendor/m2261.ts";
import {Gi as m7,ReactHooks as U3} from "../../vendor/m133.ts";
import {b as L} from "../../runtime.ts";
import {kg as Ow} from "../../vendor/m129.ts";
/** Keybindings state type: holds current bindings, validation warnings, file watcher, and metadata. */
interface KeybindingsState {
  bindings: unknown[] | null;
  warnings: KeybindingWarning[];
  watcher: { close(): void } | null;
  initialized: boolean;
  disposed: boolean;
  lastCustomBindingsLogDate: string | null;
  changed: ReturnType<typeof TK>;
  [Symbol.dispose](): void;
}

/** A single validation warning emitted when loading keybindings.json. */
interface KeybindingWarning {
  type: string;
  severity: string;
  message: string;
  suggestion?: string;
}

/** Result returned by the async/sync keybinding loaders. */
interface KeybindingsResult {
  bindings: unknown[];
  warnings: KeybindingWarning[];
}

/**
 * Returns whether the `tengu_keybinding_customization_release` feature flag is
 * enabled (i.e. user keybinding customization is active).
 */
function isKeybindingCustomizationEnabled(): boolean {
  return Y_("tengu_keybinding_customization_release", !0);
}

/**
 * Allocates a fresh, empty `KeybindingsState` with default values and a
 * `[Symbol.dispose]` method that tears down the file watcher.
 */
function createKeybindingsState(): KeybindingsState {
  let state: KeybindingsState = {
    bindings: null,
    warnings: [],
    watcher: null,
    initialized: !1,
    disposed: !1,
    lastCustomBindingsLogDate: null,
    changed: TK(),
    [Symbol.dispose]() {
      if (state.disposed = !0, state.watcher) state.watcher.close(), state.watcher = null;
      state.changed.clear();
    }
  };
  return state;
}

/**
 * Emits a `tengu_custom_keybindings_loaded` event at most once per calendar
 * day to avoid flooding analytics.
 *
 * @param state            - The shared keybindings state.
 * @param userBindingCount - Number of user-defined bindings that were loaded.
 */
function logCustomKeybindingsIfNewDay(state: KeybindingsState, userBindingCount: number): void {
  let todayDateStr = new Date().toISOString().slice(0, 10);
  if (state.lastCustomBindingsLogDate === todayDateStr) return;
  state.lastCustomBindingsLogDate = todayDateStr, c("tengu_custom_keybindings_loaded", {
    user_binding_count: userBindingCount
  });
}

/**
 * Returns the absolute path to the user's `keybindings.json` file, which
 * lives in the Claude config directory.
 */
function getKeybindingsFilePath(): string {
  return yw6.join(Y8(), "keybindings.json");
}

/**
 * Returns the compiled default keybindings list by expanding the raw
 * default-bindings spec (`rsH`) via `Lw6`.
 */
function getDefaultBindings(): unknown[] {
  return Lw6(rsH);
}

/**
 * Asynchronously loads user keybindings from `keybindings.json`, merges them
 * with the defaults, and returns the combined list along with any validation
 * warnings.
 *
 * If the feature flag is off or the "keybindings" kill-switch is active the
 * function returns defaults immediately.
 */
async function loadKeybindingsAsync(state: KeybindingsState): Promise<KeybindingsResult> {
  let defaultBindings = getDefaultBindings();
  if (!isKeybindingCustomizationEnabled() || L1("keybindings")) return {
    bindings: defaultBindings,
    warnings: []
  };
  let keybindingsFilePath = getKeybindingsFilePath();
  try {
    let fileContent = await Vw6.readFile(keybindingsFilePath, "utf-8"),
      parsedJson = d_(fileContent),
      rawBindingsArray: unknown;
    if (typeof parsedJson === "object" && parsedJson !== null && "bindings" in parsedJson) rawBindingsArray = (parsedJson as Record<string, unknown>).bindings;else return N('[keybindings] Invalid keybindings.json: keybindings.json must have a "bindings" array'), IH("keybinding_load_user_config", "keybinding_config_invalid_format"), {
      bindings: defaultBindings,
      warnings: [{
        type: "parse_error",
        severity: "error",
        message: 'keybindings.json must have a "bindings" array',
        suggestion: 'Use format: { "bindings": [ ... ] }'
      }]
    };
    if (!Nw6(rawBindingsArray)) {
      let errorMessage = !Array.isArray(rawBindingsArray) ? '"bindings" must be an array' : "keybindings.json contains invalid block structure",
        suggestion = !Array.isArray(rawBindingsArray) ? 'Set "bindings" to an array of keybinding blocks' : 'Each block must have "context" (string) and "bindings" (object mapping keys to a string action or null)';
      return N(`[keybindings] Invalid keybindings.json: ${errorMessage}`), IH("keybinding_load_user_config", "keybinding_config_invalid_structure"), {
        bindings: defaultBindings,
        warnings: [{
          type: "parse_error",
          severity: "error",
          message: errorMessage,
          suggestion: suggestion
        }]
      };
    }
    let userBindings = Lw6(rawBindingsArray);
    N(`[keybindings] Loaded ${userBindings.length} user bindings from ${keybindingsFilePath}`);
    let mergedBindings = [...defaultBindings, ...userBindings];
    logCustomKeybindingsIfNewDay(state, userBindings.length);
    let validationWarnings = [...JS8(fileContent), ...DS8(rawBindingsArray, mergedBindings)];
    if (validationWarnings.length > 0) N(`[keybindings] Found ${validationWarnings.length} validation issue(s)`);
    return vH("keybinding_load_user_config"), {
      bindings: mergedBindings,
      warnings: validationWarnings
    };
  } catch (err) {
    if (b6(err)) return vH("keybinding_load_user_config"), {
      bindings: defaultBindings,
      warnings: []
    };
    return N(`[keybindings] Error loading ${keybindingsFilePath}: ${GH(err)}`), IH("keybinding_load_user_config", "keybinding_config_parse_error"), {
      bindings: defaultBindings,
      warnings: [{
        type: "parse_error",
        severity: "error",
        message: `Failed to parse keybindings.json: ${GH(err)}`
      }]
    };
  }
}

/**
 * Returns the currently loaded bindings from `state`, calling
 * `loadKeybindingsSync` if bindings have not been populated yet.
 */
function getBindings(state: KeybindingsState): unknown[] {
  if (state.bindings) return state.bindings;
  return loadKeybindingsSync(state).bindings;
}

/**
 * Synchronously loads and caches user keybindings into `state`.
 *
 * Mirrors `loadKeybindingsAsync` but uses the synchronous `fs.readFileSync`
 * API so it can be called from non-async contexts.
 */
function loadKeybindingsSync(state: KeybindingsState): KeybindingsResult {
  if (state.bindings) return {
    bindings: state.bindings,
    warnings: state.warnings
  };
  let defaultBindings = getDefaultBindings();
  if (!isKeybindingCustomizationEnabled() || L1("keybindings")) return state.bindings = defaultBindings, state.warnings = [], {
    bindings: state.bindings,
    warnings: state.warnings
  };
  let keybindingsFilePath = getKeybindingsFilePath();
  try {
    let fileContent = Mj7.readFileSync(keybindingsFilePath, "utf-8"),
      parsedJson = d_(fileContent),
      rawBindingsArray: unknown;
    if (typeof parsedJson === "object" && parsedJson !== null && "bindings" in parsedJson) rawBindingsArray = (parsedJson as Record<string, unknown>).bindings;else return IH("keybinding_load_user_config", "keybinding_config_invalid_format"), state.bindings = defaultBindings, state.warnings = [{
      type: "parse_error",
      severity: "error",
      message: 'keybindings.json must have a "bindings" array',
      suggestion: 'Use format: { "bindings": [ ... ] }'
    }], {
      bindings: state.bindings,
      warnings: state.warnings
    };
    if (!Nw6(rawBindingsArray)) {
      let errorMessage = !Array.isArray(rawBindingsArray) ? '"bindings" must be an array' : "keybindings.json contains invalid block structure",
        suggestion = !Array.isArray(rawBindingsArray) ? 'Set "bindings" to an array of keybinding blocks' : 'Each block must have "context" (string) and "bindings" (object mapping keys to a string action or null)';
      return IH("keybinding_load_user_config", "keybinding_config_invalid_structure"), state.bindings = defaultBindings, state.warnings = [{
        type: "parse_error",
        severity: "error",
        message: errorMessage,
        suggestion: suggestion
      }], {
        bindings: state.bindings,
        warnings: state.warnings
      };
    }
    let userBindings = Lw6(rawBindingsArray);
    N(`[keybindings] Loaded ${userBindings.length} user bindings from ${keybindingsFilePath}`), state.bindings = [...defaultBindings, ...userBindings], logCustomKeybindingsIfNewDay(state, userBindings.length);
    let jsonWarnings = JS8(fileContent);
    if (state.warnings = [...jsonWarnings, ...DS8(rawBindingsArray, state.bindings)], state.warnings.length > 0) N(`[keybindings] Found ${state.warnings.length} validation issue(s)`);
    return vH("keybinding_load_user_config"), {
      bindings: state.bindings,
      warnings: state.warnings
    };
  } catch (err) {
    if (b6(err)) return vH("keybinding_load_user_config"), state.bindings = defaultBindings, state.warnings = [], {
      bindings: state.bindings,
      warnings: state.warnings
    };
    return N(`[keybindings] Error loading ${keybindingsFilePath}: ${GH(err)}`), IH("keybinding_load_user_config", "keybinding_config_parse_error"), state.bindings = defaultBindings, state.warnings = [{
      type: "parse_error",
      severity: "error",
      message: `Failed to parse keybindings.json: ${GH(err)}`
    }], {
      bindings: state.bindings,
      warnings: state.warnings
    };
  }
}

/**
 * Starts a chokidar file watcher on the user's `keybindings.json`.
 *
 * No-ops if the watcher is already running (`initialized`), the state is
 * disposed, or the feature flag / kill-switch is off.
 */
async function initKeybindingsWatcher(state: KeybindingsState): Promise<void> {
  if (state.initialized || state.disposed) return;
  if (!isKeybindingCustomizationEnabled() || L1("keybindings")) {
    N("[keybindings] Skipping file watcher - user customization disabled");
    return;
  }
  let keybindingsFilePath = getKeybindingsFilePath(),
    watchDir = yw6.dirname(keybindingsFilePath);
  try {
    if (!(await Vw6.stat(watchDir)).isDirectory()) {
      N(`[keybindings] Not watching: ${watchDir} is not a directory`), n_("keybinding_watcher_init", "watch_dir_inaccessible");
      return;
    }
  } catch {
    N(`[keybindings] Not watching: ${watchDir} does not exist`), n_("keybinding_watcher_init", "watch_dir_inaccessible");
    return;
  }
  state.initialized = !0, N(`[keybindings] Watching for changes to ${keybindingsFilePath}`), state.watcher = Wv.watch(keybindingsFilePath, {
    persistent: !0,
    ignoreInitial: !0,
    awaitWriteFinish: {
      stabilityThreshold: Xe5,
      pollInterval: Pe5
    },
    ignorePermissionErrors: !0,
    usePolling: !0,
    interval: 2000,
    atomic: !0
  }), state.watcher.on("add", filePath => onKeybindingsFileChanged(state, filePath)), state.watcher.on("change", filePath => onKeybindingsFileChanged(state, filePath)), state.watcher.on("unlink", filePath => onKeybindingsFileDeleted(state, filePath)), state.watcher.on("error", err => N(`[keybindings] watcher error: ${GH(err)}`, {
    level: "warn"
  })), m7(state), vH("keybinding_watcher_init");
}

/**
 * Called by the file watcher when `keybindings.json` is added or changed.
 *
 * Re-runs the async loader, updates `state`, and emits a `changed` event.
 */
async function onKeybindingsFileChanged(state: KeybindingsState, filePath: string): Promise<void> {
  N(`[keybindings] Detected change to ${filePath}`);
  try {
    let result = await loadKeybindingsAsync(state);
    state.bindings = result.bindings, state.warnings = result.warnings, state.changed.emit(result), vH("keybinding_hot_reload");
  } catch (err) {
    N(`[keybindings] Error reloading: ${GH(err)}`), n_("keybinding_hot_reload", "keybinding_reload_failed");
  }
}

/**
 * Called by the file watcher when `keybindings.json` is deleted.
 *
 * Resets the state to defaults and emits a `changed` event.
 */
function onKeybindingsFileDeleted(state: KeybindingsState, filePath: string): void {
  N(`[keybindings] Detected deletion of ${filePath}`);
  let defaultBindings = getDefaultBindings();
  state.bindings = defaultBindings, state.warnings = [], state.changed.emit({
    bindings: defaultBindings,
    warnings: []
  });
}

var Mj7: typeof import("fs"),
  Vw6: typeof import("fs/promises"),
  yw6: typeof import("path"),
  Xe5 = 500,
  Pe5 = 200,
  kv: KeybindingsState;

/** Lazy module initializer — sets up Node.js built-in imports and the global keybindings state singleton. */
var Ji = L(() => {
  q9H();
  M6();
  o6();
  y_();
  U3();
  tf();
  FH();
  A6();
  L_();
  Ow();
  H6();
  Rw6();
  Jj7();
  Mj7 = require("fs"), Vw6 = require("fs/promises"), yw6 = require("path");
  kv = createKeybindingsState();
});

export {isKeybindingCustomizationEnabled as D5,createKeybindingsState as Zld,logCustomKeybindingsIfNewDay as Fwi,getKeybindingsFilePath as aAe,getDefaultBindings as z$r,loadKeybindingsAsync as ecd,getBindings as ubn,loadKeybindingsSync as y0t,initKeybindingsWatcher as Uwi,onKeybindingsFileChanged as Nwi,onKeybindingsFileDeleted as tcd,Mj7 as Bwi,Vw6 as lbn,yw6 as cbn,Xe5 as Xld,Pe5 as Qld,kv as E$,Ji as FZ};
