// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {ooe as K8H,Ne as BH} from "../../vendor/m455.ts";
// ===========================================================================
// Model / fast-mode environment-variable declarations (config subsystem)
//
// Declares all model-selection and fast-mode-related environment variables
// consumed by Claude Code. Variables are read via the `BH` env-access helper
// (three typed accessors: BH.str(), BH.bool(), BH.int()) which is initialized
// in the `K8H` dependency before these are assigned.
//
// NAMING NOTE: Cross-module symbols (`j_`, `L`, `BH`, `K8H`) are preserved
// exactly so bundle linkage stays correct. Module-private symbols (`a48`,
// `CQq`) have been renamed/typed for readability. All control flow, operators,
// string literals, and property references are preserved verbatim.
//
// Cross-module symbols used here:
//   j_   = __export  (define module exports, esbuild helper)
//   L    = lazy ESM module init wrapper (esbuild __esm)
//   BH   = typed env-var accessor object ({ str, bool, int })
//   K8H  = init thunk for the BH env-accessor module (must run first)
// ===========================================================================

// --- Ambient declarations for cross-module symbols (preserved names) --------

/** Registers lazy getters on the module namespace object (esbuild `__export`). */
declare function j_(ns: object, exports: Record<string, () => unknown>): void;

/** Module-init wrapper: runs the body once on first access (esbuild `__esm`). */
declare function L(body: () => void): () => void;

/** Dependency init thunk for the typed env-var accessor module. Must be called before `BH` is used. */
declare function K8H(): void;

/** Typed environment-variable accessor. Returns a typed sentinel/accessor for each env var. */
declare const BH: {
  /** Read env var as a string (undefined when not set). */
  str(): string | undefined;
  /** Read env var as a boolean (`"1"` / `"true"` → true). */
  bool(): boolean | undefined;
  /** Read env var as an integer. */
  int(): number | undefined;
};

// --- Module namespace object -------------------------------------------------

/** Module namespace object populated by `j_` / `__export`. */
var a48 = {};
j_(a48, {
  FALLBACK_FOR_ALL_PRIMARY_MODELS: () => FALLBACK_FOR_ALL_PRIMARY_MODELS,
  CLAUDE_CONTEXT_COLLAPSE_MODEL: () => CLAUDE_CONTEXT_COLLAPSE_MODEL,
  CLAUDE_CONTEXT_COLLAPSE: () => CLAUDE_CONTEXT_COLLAPSE,
  CLAUDE_CODE_SUBAGENT_MODEL: () => CLAUDE_CODE_SUBAGENT_MODEL,
  CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK: () => CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK,
  CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS: () => CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS,
  CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE: () => CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE,
  CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE: () => CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE,
  CLAUDE_CODE_EFFORT_LEVEL: () => CLAUDE_CODE_EFFORT_LEVEL,
  CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP: () => CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP,
  CLAUDE_CODE_DISABLE_FAST_MODE: () => CLAUDE_CODE_DISABLE_FAST_MODE,
  CLAUDE_CODE_DISABLE_1M_CONTEXT: () => CLAUDE_CODE_DISABLE_1M_CONTEXT,
  CLAUDE_CODE_BG_CLASSIFIER_MODEL: () => CLAUDE_CODE_BG_CLASSIFIER_MODEL,
  CLAUDE_CODE_AUTO_MODE_MODEL: () => CLAUDE_CODE_AUTO_MODE_MODEL,
  CLAUDE_CODE_ALWAYS_ENABLE_EFFORT: () => CLAUDE_CODE_ALWAYS_ENABLE_EFFORT,
  ANTHROPIC_SMALL_FAST_MODEL: () => ANTHROPIC_SMALL_FAST_MODEL,
  ANTHROPIC_MODEL: () => ANTHROPIC_MODEL,
  ANTHROPIC_DEFAULT_SONNET_MODEL_NAME: () => ANTHROPIC_DEFAULT_SONNET_MODEL_NAME,
  ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION: () => ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION,
  ANTHROPIC_DEFAULT_SONNET_MODEL: () => ANTHROPIC_DEFAULT_SONNET_MODEL,
  ANTHROPIC_DEFAULT_OPUS_MODEL_NAME: () => ANTHROPIC_DEFAULT_OPUS_MODEL_NAME,
  ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION: () => ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION,
  ANTHROPIC_DEFAULT_OPUS_MODEL: () => ANTHROPIC_DEFAULT_OPUS_MODEL,
  ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME: () => ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME,
  ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION: () => ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION,
  ANTHROPIC_DEFAULT_HAIKU_MODEL: () => ANTHROPIC_DEFAULT_HAIKU_MODEL,
  ANTHROPIC_DEFAULT_FABLE_MODEL_NAME: () => ANTHROPIC_DEFAULT_FABLE_MODEL_NAME,
  ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION: () => ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION,
  ANTHROPIC_DEFAULT_FABLE_MODEL: () => ANTHROPIC_DEFAULT_FABLE_MODEL,
  ANTHROPIC_CUSTOM_MODEL_OPTION_NAME: () => ANTHROPIC_CUSTOM_MODEL_OPTION_NAME,
  ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION: () => ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION,
  ANTHROPIC_CUSTOM_MODEL_OPTION: () => ANTHROPIC_CUSTOM_MODEL_OPTION
});

// --- Forward declarations for all exported variables ------------------------

/** Override for the primary Anthropic model (env: ANTHROPIC_MODEL). */
var ANTHROPIC_MODEL: string | undefined;
/** Override for the small/fast Anthropic model (env: ANTHROPIC_SMALL_FAST_MODEL). */
var ANTHROPIC_SMALL_FAST_MODEL: string | undefined;
/** Override for the default Fable model identifier (env: ANTHROPIC_DEFAULT_FABLE_MODEL). */
var ANTHROPIC_DEFAULT_FABLE_MODEL: string | undefined;
/** Display name for the default Fable model (env: ANTHROPIC_DEFAULT_FABLE_MODEL_NAME). */
var ANTHROPIC_DEFAULT_FABLE_MODEL_NAME: string | undefined;
/** Description for the default Fable model (env: ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION). */
var ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION: string | undefined;
/** Override for the default Opus model identifier (env: ANTHROPIC_DEFAULT_OPUS_MODEL). */
var ANTHROPIC_DEFAULT_OPUS_MODEL: string | undefined;
/** Display name for the default Opus model (env: ANTHROPIC_DEFAULT_OPUS_MODEL_NAME). */
var ANTHROPIC_DEFAULT_OPUS_MODEL_NAME: string | undefined;
/** Description for the default Opus model (env: ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION). */
var ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION: string | undefined;
/** Override for the default Sonnet model identifier (env: ANTHROPIC_DEFAULT_SONNET_MODEL). */
var ANTHROPIC_DEFAULT_SONNET_MODEL: string | undefined;
/** Display name for the default Sonnet model (env: ANTHROPIC_DEFAULT_SONNET_MODEL_NAME). */
var ANTHROPIC_DEFAULT_SONNET_MODEL_NAME: string | undefined;
/** Description for the default Sonnet model (env: ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION). */
var ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION: string | undefined;
/** Override for the default Haiku model identifier (env: ANTHROPIC_DEFAULT_HAIKU_MODEL). */
var ANTHROPIC_DEFAULT_HAIKU_MODEL: string | undefined;
/** Display name for the default Haiku model (env: ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME). */
var ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME: string | undefined;
/** Description for the default Haiku model (env: ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION). */
var ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION: string | undefined;
/** Override for the custom model option identifier (env: ANTHROPIC_CUSTOM_MODEL_OPTION). */
var ANTHROPIC_CUSTOM_MODEL_OPTION: string | undefined;
/** Display name for the custom model option (env: ANTHROPIC_CUSTOM_MODEL_OPTION_NAME). */
var ANTHROPIC_CUSTOM_MODEL_OPTION_NAME: string | undefined;
/** Description for the custom model option (env: ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION). */
var ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION: string | undefined;
/** Override for the subagent model used in Claude Code (env: CLAUDE_CODE_SUBAGENT_MODEL). */
var CLAUDE_CODE_SUBAGENT_MODEL: string | undefined;
/** Override for the auto-mode model (env: CLAUDE_CODE_AUTO_MODE_MODEL). */
var CLAUDE_CODE_AUTO_MODE_MODEL: string | undefined;
/** Override for the background classifier model (env: CLAUDE_CODE_BG_CLASSIFIER_MODEL). */
var CLAUDE_CODE_BG_CLASSIFIER_MODEL: string | undefined;
/** Override for the context-collapse model (env: CLAUDE_CONTEXT_COLLAPSE_MODEL). */
var CLAUDE_CONTEXT_COLLAPSE_MODEL: string | undefined;
/** Whether to enable context collapse (env: CLAUDE_CONTEXT_COLLAPSE). */
var CLAUDE_CONTEXT_COLLAPSE: boolean | undefined;
/**
 * Fallback model string applied to all primary model slots when their specific
 * env vars are unset (env: FALLBACK_FOR_ALL_PRIMARY_MODELS).
 */
var FALLBACK_FOR_ALL_PRIMARY_MODELS: string | undefined;
/** Disable legacy model remapping logic (env: CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP). */
var CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP: boolean | undefined;
/** Effort level string passed to supported models (env: CLAUDE_CODE_EFFORT_LEVEL). */
var CLAUDE_CODE_EFFORT_LEVEL: string | undefined;
/** Always send effort parameter even when feature-flagged off (env: CLAUDE_CODE_ALWAYS_ENABLE_EFFORT). */
var CLAUDE_CODE_ALWAYS_ENABLE_EFFORT: boolean | undefined;
/** Disable fast-mode entirely (env: CLAUDE_CODE_DISABLE_FAST_MODE). */
var CLAUDE_CODE_DISABLE_FAST_MODE: boolean | undefined;
/** Enable Opus 4.7 fast-mode (env: CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE). */
var CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE: boolean | undefined;
/** Override the Opus 4.6 fast-mode model string (env: CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE). */
var CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE: string | undefined;
/** Skip network-error retries in fast-mode (env: CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS). */
var CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS: boolean | undefined;
/** Skip org-check in fast-mode (env: CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK). */
var CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK: boolean | undefined;
/** Disable 1M-context window (env: CLAUDE_CODE_DISABLE_1M_CONTEXT). */
var CLAUDE_CODE_DISABLE_1M_CONTEXT: boolean | undefined;

// --- Module initializer (esbuild `__esm`) -----------------------------------

/** Lazy module initializer; runs once on first access. */
var CQq = L(() => {
  K8H();
  ANTHROPIC_MODEL = BH.str(), ANTHROPIC_SMALL_FAST_MODEL = BH.str(), ANTHROPIC_DEFAULT_FABLE_MODEL = BH.str(), ANTHROPIC_DEFAULT_FABLE_MODEL_NAME = BH.str(), ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION = BH.str(), ANTHROPIC_DEFAULT_OPUS_MODEL = BH.str(), ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = BH.str(), ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = BH.str(), ANTHROPIC_DEFAULT_SONNET_MODEL = BH.str(), ANTHROPIC_DEFAULT_SONNET_MODEL_NAME = BH.str(), ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION = BH.str(), ANTHROPIC_DEFAULT_HAIKU_MODEL = BH.str(), ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME = BH.str(), ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION = BH.str(), ANTHROPIC_CUSTOM_MODEL_OPTION = BH.str(), ANTHROPIC_CUSTOM_MODEL_OPTION_NAME = BH.str(), ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION = BH.str(), CLAUDE_CODE_SUBAGENT_MODEL = BH.str(), CLAUDE_CODE_AUTO_MODE_MODEL = BH.str(), CLAUDE_CODE_BG_CLASSIFIER_MODEL = BH.str(), CLAUDE_CONTEXT_COLLAPSE_MODEL = BH.str(), CLAUDE_CONTEXT_COLLAPSE = BH.bool(), FALLBACK_FOR_ALL_PRIMARY_MODELS = BH.str(), CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP = BH.bool(), CLAUDE_CODE_EFFORT_LEVEL = BH.str(), CLAUDE_CODE_ALWAYS_ENABLE_EFFORT = BH.bool(), CLAUDE_CODE_DISABLE_FAST_MODE = BH.bool(), CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE = BH.bool(), CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE = BH.str(), CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS = BH.bool(), CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK = BH.bool(), CLAUDE_CODE_DISABLE_1M_CONTEXT = BH.bool();
});

export {a48 as gmr,ANTHROPIC_MODEL,ANTHROPIC_SMALL_FAST_MODEL,ANTHROPIC_DEFAULT_FABLE_MODEL,ANTHROPIC_DEFAULT_FABLE_MODEL_NAME,ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION,ANTHROPIC_DEFAULT_OPUS_MODEL,ANTHROPIC_DEFAULT_OPUS_MODEL_NAME,ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION,ANTHROPIC_DEFAULT_SONNET_MODEL,ANTHROPIC_DEFAULT_SONNET_MODEL_NAME,ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION,ANTHROPIC_DEFAULT_HAIKU_MODEL,ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME,ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION,ANTHROPIC_CUSTOM_MODEL_OPTION,ANTHROPIC_CUSTOM_MODEL_OPTION_NAME,ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION,CLAUDE_CODE_SUBAGENT_MODEL,CLAUDE_CODE_AUTO_MODE_MODEL,CLAUDE_CODE_BG_CLASSIFIER_MODEL,CLAUDE_CONTEXT_COLLAPSE_MODEL,CLAUDE_CONTEXT_COLLAPSE,FALLBACK_FOR_ALL_PRIMARY_MODELS,CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP,CLAUDE_CODE_EFFORT_LEVEL,CLAUDE_CODE_ALWAYS_ENABLE_EFFORT,CLAUDE_CODE_DISABLE_FAST_MODE,CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE,CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE,CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS,CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK,CLAUDE_CODE_DISABLE_1M_CONTEXT,CQq as tYo};
