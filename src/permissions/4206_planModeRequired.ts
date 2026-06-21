// @ts-nocheck
import {_lt as P8_,aU as ZV} from "../config/3875_aU.ts";
import {_A as WY} from "../../vendor/m459.ts";
import {Xa as nK} from "../../vendor/m2509.ts";
import {getMainLoopModelOverride as kj,getFlagSettingsExpectedContent as WkH,getFlagSettingsPath as PkH,getInlinePlugins as Bd,getInlinePluginsNoMcp as Ud,getInlinePluginUrls as b6H,getChromeFlagOverride as ya,lt as w_} from "../session/0131_sent.ts";
import {getTeammateModeFromSnapshot as WIH,vke as ZIH} from "../../vendor/m3296.ts";
import {b as L} from "../../runtime.ts";
// Module: permissions / subagent (teammate) spawn-command construction.
//
// This module builds the pieces of the shell command line used to spawn a
// teammate / subagent process:
//   - resolveClaudeExecutablePath(): the Claude Code executable to invoke.
//   - buildSpawnCliFlags(): the `--flag value` string forwarded to the child.
//   - buildSpawnEnvPrefix(): the `KEY=value ...` env prefix passed via `env`.
//
// All three are consumed by the teammate-spawn helpers (see the sibling
// `4191_level.ts` module's tmux / splitpane / in-process spawners).
//
// Behavior is preserved 1:1; only names, types, and comments were added.

// ---------------------------------------------------------------------------
// External (cross-module / bundled) symbols referenced here.
// These keep their original minified identifiers because they are defined in
// other bundle modules; only their inferred shapes are declared.
// ---------------------------------------------------------------------------

/** Env var name whose value, if set, overrides the Claude executable path. */
declare const P8_: string;

/**
 * Returns true when the current process should be re-invoked via
 * `process.execPath` (e.g. a packaged / single-executable build) rather than
 * via the script entry `process.argv[1]`.
 */
declare function WY(): boolean;

/**
 * Shell-quotes/escapes an argv array into a single safe shell token string.
 * (Same helper used throughout the codebase, e.g. `ls ${nK([path])}`.)
 */
declare function nK(args: string[]): string;

/** Resolves the configured subagent model alias, or undefined if none. */
declare function kj(): string | undefined;

/** Returns an explicit `--settings` path/JSON to forward, or undefined. */
declare function WkH(): string | undefined;
/** Fallback `--settings` source when {@link WkH} returns nothing. */
declare function PkH(): string | undefined;

/** Plugin directories to forward as `--plugin-dir`. */
declare function Bd(): string[];
/** Plugin directories to forward as `--plugin-dir-no-mcp`. */
declare function Ud(): string[];
/** Plugin URLs to forward as `--plugin-url`. */
declare function b6H(): string[];

/** Resolved teammate spawn mode: "auto" | "tmux" | "in-process". */
declare function WIH(): TeammateMode;

/**
 * Chrome integration preference: true => `--chrome`, false => `--no-chrome`,
 * undefined => leave unset.
 */
declare function ya(): boolean | undefined;

/** Module-init wrapper used throughout the bundle for lazy section setup. */
declare function L(init: () => void): () => void;

// Lazy-init dependencies pulled in by this module's init block.
declare function w_(): void;
declare function ZIH(): void;
declare function ZV(): void;

/** Permission mode forwarded to the spawned child process. */
type PermissionMode = "bypassPermissions" | "acceptEdits" | "auto" | string;

/** How teammates are spawned. */
type TeammateMode = "auto" | "tmux" | "in-process";

/** Options describing how to build the spawn CLI flag string. */
interface SpawnCliFlagsOptions {
  /** When true, plan mode is required; suppresses permission-mode flags. */
  planModeRequired?: boolean;
  /** Permission mode of the spawning session. */
  permissionMode?: PermissionMode;
  /** When true, do not emit a `--model` flag (caller handles model). */
  skipModel?: boolean;
}

// ---------------------------------------------------------------------------
// Exported (recovered) functions.
// ---------------------------------------------------------------------------

/**
 * Resolves the Claude Code executable path to spawn a teammate with.
 *
 * Precedence:
 *   1. Explicit override via the {@link P8_} env var.
 *   2. `process.execPath` for packaged builds (see {@link WY}).
 *   3. The script entry point `process.argv[1]`.
 */
function resolveClaudeExecutablePath(): string {
  if (process.env[P8_]) return process.env[P8_]!;
  return WY() ? process.execPath : process.argv[1];
}

/**
 * Builds the space-joined `--flag value` string forwarded to a spawned
 * teammate process.
 *
 * Emits permission-mode flags (unless plan mode is required), the subagent
 * model, settings path, plugin directories/URLs, the teammate mode, and the
 * Chrome integration preference. All values are shell-escaped via {@link nK}.
 *
 * This is the "full" variant used by callers that also forward the teammate
 * mode and subagent model resolution (cf. the lighter variant in the sibling
 * spawn module).
 */
function buildSpawnCliFlags(options?: SpawnCliFlagsOptions): string {
  let flags: string[] = [],
    {
      planModeRequired: planModeRequired,
      permissionMode: permissionMode,
      skipModel: skipModel
    } = options || {};
  if (planModeRequired) ;else if (permissionMode === "bypassPermissions") flags.push("--dangerously-skip-permissions");else if (permissionMode === "acceptEdits") flags.push("--permission-mode acceptEdits");else if (permissionMode === "auto") flags.push("--permission-mode auto");
  if (!skipModel) {
    let subagentModel = process.env.CLAUDE_CODE_SUBAGENT_MODEL;
    if (subagentModel && subagentModel !== "inherit") flags.push(`--model ${nK([subagentModel])}`);else {
      let defaultModel = kj();
      if (defaultModel) flags.push(`--model ${nK([defaultModel])}`);
    }
  }
  let settingsSource = WkH() ?? PkH();
  if (settingsSource) flags.push(`--settings ${nK([settingsSource])}`);
  let pluginDirs = Bd();
  for (let dir of pluginDirs) flags.push(`--plugin-dir ${nK([dir])}`);
  for (let dir of Ud()) flags.push(`--plugin-dir-no-mcp ${nK([dir])}`);
  for (let url of b6H()) flags.push(`--plugin-url ${nK([url])}`);
  let teammateMode = WIH();
  flags.push(`--teammate-mode ${teammateMode}`);
  let chromePreference = ya();
  if (chromePreference === !0) flags.push("--chrome");else if (chromePreference === !1) flags.push("--no-chrome");
  return flags.join(" ");
}

/**
 * Builds the `KEY=value KEY=value ...` environment prefix forwarded (via
 * `env`) to a spawned teammate process.
 *
 * Always sets `CLAUDECODE=1` and enables agent teams, then propagates each
 * inherited env var from {@link FORWARDED_ENV_VARS} that is present and
 * non-empty, plus the secure-storage config dir if defined. All values are
 * shell-escaped via {@link nK}.
 */
function buildSpawnEnvPrefix(): string {
  let entries: string[] = ["CLAUDECODE=1", "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1"];
  for (let name of FORWARDED_ENV_VARS) {
    let value = process.env[name];
    if (value !== void 0 && value !== "") entries.push(`${name}=${nK([value])}`);
  }
  let secureStorageConfigDir = process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR;
  if (secureStorageConfigDir !== void 0) entries.push(`CLAUDE_SECURESTORAGE_CONFIG_DIR=${nK([secureStorageConfigDir])}`);
  return entries.join(" ");
}

/**
 * Env var names inherited from the parent process and forwarded to spawned
 * teammates (provider selection, AWS/Bedrock/Vertex config, proxy/TLS config,
 * config dir, telemetry opt-outs, etc.). Populated by the module init block.
 */
var FORWARDED_ENV_VARS: string[];
var initSpawnModule = L(() => {
  w_();
  ZIH();
  ZV();
  FORWARDED_ENV_VARS = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_MANTLE", "ANTHROPIC_AWS_WORKSPACE_ID", "ANTHROPIC_AWS_BASE_URL", "ANTHROPIC_AWS_API_KEY", "CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH", "AWS_BEARER_TOKEN_BEDROCK", "ANTHROPIC_BEDROCK_MANTLE_BASE_URL", "CLAUDE_CODE_SKIP_MANTLE_AUTH", "AWS_REGION", "AWS_DEFAULT_REGION", "AWS_PROFILE", "AWS_CONFIG_FILE", "AWS_SHARED_CREDENTIALS_FILE", "ANTHROPIC_BEDROCK_SERVICE_TIER", "CLAUDE_CODE_SUBAGENT_MODEL", "ANTHROPIC_BASE_URL", "CLAUDE_CONFIG_DIR", "CLAUDE_CODE_REMOTE", "CLAUDE_CODE_REMOTE_MEMORY_DIR", "HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy", "NO_PROXY", "no_proxy", "SSL_CERT_FILE", "NODE_EXTRA_CA_CERTS", "REQUESTS_CA_BUNDLE", "CURL_CA_BUNDLE", "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST", "DISABLE_ERROR_REPORTING", "DISABLE_GROWTHBOOK", "DISABLE_TELEMETRY", "DO_NOT_TRACK"];
});

export {resolveClaudeExecutablePath as Yja,buildSpawnCliFlags as Jja,buildSpawnEnvPrefix as Q9t,FORWARDED_ENV_VARS as yDp,initSpawnModule as Bdo};
