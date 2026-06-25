// @ts-nocheck
import {_ut,wB} from "../config/3893_wB.ts";
import {Rf} from "../../vendor/m465.ts";
import {Ma} from "../../vendor/m2519.ts";
import {getMainLoopModelOverride as by,getFlagSettingsExpectedContent as JLe,getFlagSettingsPath as YLe,getInlinePlugins as QV,ZV,getInlinePluginUrls as kre,getChromeFlagOverride as Vde,lt} from "../session/0132_sent.ts";
import {ove,Cp} from "../config/2223_level.ts";
import {getTeammateModeFromSnapshot as dIe,pIe} from "../../vendor/m3312.ts";
import {b} from "../../runtime.ts";
import {Pgo,fqt} from "../../vendor/m4222.ts";
// @ts-nocheck
// Module: permissions / subagent (teammate) spawn-command construction.
//
// This module builds the pieces of the shell command line used to spawn a
// teammate / subagent process:
//   - resolveClaudeExecutablePath(): the Claude Code executable to invoke.
//   - buildSpawnCliFlags(): the `--flag value` string forwarded to the child.
//   - buildSpawnEnvPrefix(): the `KEY=value ...` env prefix passed via `env`.
//
// All three are consumed by the teammate-spawn helpers (sibling spawn module).
//
// Behavior is preserved 1:1; only names, types, and comments were added.

// ---------------------------------------------------------------------------
// External (cross-module / bundled) symbols referenced here.
// These keep their original minified identifiers because they are defined in
// other bundle modules; only their inferred shapes are declared.
// ---------------------------------------------------------------------------

/** Env var name whose value, if set, overrides the Claude executable path. */
declare const _ut: string;

/**
 * Returns true when the current process should be re-invoked via
 * `process.execPath` (e.g. a packaged / single-executable build) rather than
 * via the script entry `process.argv[1]`.
 */
declare function Rf(): boolean;

/**
 * Shell-quotes/escapes an argv array into a single safe shell token string.
 * (Same helper used throughout the codebase, e.g. `ls ${Ma([path])}`.)
 */
declare function Ma(args: string[]): string;

/** Resolves the configured subagent model alias, or undefined if none. */
declare function by(): string | undefined;

/** True when effort flags should be forwarded to the spawned child. */
declare function ove(): boolean;

/** Returns an explicit `--settings` path/JSON to forward, or undefined. */
declare function JLe(): string | undefined;
/** Fallback `--settings` source when {@link JLe} returns nothing. */
declare function YLe(): string | undefined;

/** Plugin directories to forward as `--plugin-dir`. */
declare function QV(): string[];
/** Plugin directories to forward as `--plugin-dir-no-mcp`. */
declare function ZV(): string[];
/** Plugin URLs to forward as `--plugin-url`. */
declare function kre(): string[];

/** Resolved teammate spawn mode: "auto" | "tmux" | "in-process". */
declare function dIe(): TeammateMode;

/**
 * Chrome integration preference: true => `--chrome`, false => `--no-chrome`,
 * undefined => leave unset.
 */
declare function Vde(): boolean | undefined;

/** Module-init wrapper used throughout the bundle for lazy section setup. */
declare function b(init: () => void): () => void;

/** Additional CA/TLS-bundle env var names spread into the forwarded set. */
declare const fqt: string[];

// Lazy-init dependencies pulled in by this module's init block.
declare function Pgo(): void;
declare function lt(): void;
declare function Cp(): void;
declare function pIe(): void;
declare function wB(): void;

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
  /** Effort level alias forwarded as `--effort`, when supported. */
  effortValue?: string;
}

// ---------------------------------------------------------------------------
// Recovered functions.
// ---------------------------------------------------------------------------

/**
 * Resolves the Claude Code executable path to spawn a teammate with.
 *
 * Precedence:
 *   1. Explicit override via the {@link _ut} env var.
 *   2. `process.execPath` for packaged builds (see {@link Rf}).
 *   3. The script entry point `process.argv[1]`.
 */
function fza(): string {
  if (process.env[_ut]) return process.env[_ut]!;
  return Rf() ? process.execPath : process.argv[1];
}

/**
 * Builds the space-joined `--flag value` string forwarded to a spawned
 * teammate process.
 *
 * Emits permission-mode flags (unless plan mode is required), the subagent
 * model, an optional effort level, the settings path, plugin directories/URLs,
 * the teammate mode, and the Chrome integration preference. All values are
 * shell-escaped via {@link Ma}.
 */
function hza(options?: SpawnCliFlagsOptions): string {
  let flags: string[] = [],
    {
      planModeRequired: planModeRequired,
      permissionMode: permissionMode,
      skipModel: skipModel,
      effortValue: effortValue
    } = options || {};
  if (planModeRequired) ;else if (permissionMode === "bypassPermissions") flags.push("--dangerously-skip-permissions");else if (permissionMode === "acceptEdits") flags.push("--permission-mode acceptEdits");else if (permissionMode === "auto") flags.push("--permission-mode auto");
  if (!skipModel) {
    let subagentModel = process.env.CLAUDE_CODE_SUBAGENT_MODEL;
    if (subagentModel && subagentModel !== "inherit") flags.push(`--model ${Ma([subagentModel])}`);else {
      let defaultModel = by();
      if (defaultModel) flags.push(`--model ${Ma([defaultModel])}`);
    }
  }
  if (typeof effortValue === "string" && ove()) flags.push(`--effort ${effortValue}`);
  let settingsSource = JLe() ?? YLe();
  if (settingsSource) flags.push(`--settings ${Ma([settingsSource])}`);
  let pluginDirs = QV();
  for (let dir of pluginDirs) flags.push(`--plugin-dir ${Ma([dir])}`);
  for (let dir of ZV()) flags.push(`--plugin-dir-no-mcp ${Ma([dir])}`);
  for (let url of kre()) flags.push(`--plugin-url ${Ma([url])}`);
  let teammateMode = dIe();
  flags.push(`--teammate-mode ${teammateMode}`);
  let chromePreference = Vde();
  if (chromePreference === !0) flags.push("--chrome");else if (chromePreference === !1) flags.push("--no-chrome");
  return flags.join(" ");
}

/**
 * Builds the `KEY=value KEY=value ...` environment prefix forwarded (via
 * `env`) to a spawned teammate process.
 *
 * Always sets `CLAUDECODE=1` and enables agent teams, then propagates each
 * inherited env var from {@link NBp} that is present and non-empty, plus the
 * secure-storage config dir if defined. All values are shell-escaped via
 * {@link Ma}.
 */
function hqt(): string {
  let entries: string[] = ["CLAUDECODE=1", "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1"];
  for (let name of NBp) {
    let value = process.env[name];
    if (value !== void 0 && value !== "") entries.push(`${name}=${Ma([value])}`);
  }
  let secureStorageConfigDir = process.env.CLAUDE_SECURESTORAGE_CONFIG_DIR;
  if (secureStorageConfigDir !== void 0) entries.push(`CLAUDE_SECURESTORAGE_CONFIG_DIR=${Ma([secureStorageConfigDir])}`);
  return entries.join(" ");
}

/**
 * Env var names inherited from the parent process and forwarded to spawned
 * teammates (provider selection, AWS/Bedrock/Vertex config, proxy/TLS config,
 * config dir, telemetry opt-outs, etc.). Populated by the module init block.
 */
var NBp;
var Ogo = b(() => {
  Pgo();
  lt();
  Cp();
  pIe();
  wB();
  NBp = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_MANTLE", "ANTHROPIC_AWS_WORKSPACE_ID", "ANTHROPIC_AWS_BASE_URL", "ANTHROPIC_AWS_API_KEY", "CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH", "AWS_BEARER_TOKEN_BEDROCK", "ANTHROPIC_BEDROCK_MANTLE_BASE_URL", "CLAUDE_CODE_SKIP_MANTLE_AUTH", "AWS_REGION", "AWS_DEFAULT_REGION", "AWS_PROFILE", "AWS_CONFIG_FILE", "AWS_SHARED_CREDENTIALS_FILE", "ANTHROPIC_BEDROCK_SERVICE_TIER", "CLAUDE_CODE_SUBAGENT_MODEL", "ANTHROPIC_BASE_URL", "CLAUDE_CONFIG_DIR", "CLAUDE_CODE_REMOTE", "CLAUDE_CODE_REMOTE_MEMORY_DIR", "HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy", "NO_PROXY", "no_proxy", ...fqt, "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST", "DISABLE_ERROR_REPORTING", "DISABLE_GROWTHBOOK", "DISABLE_TELEMETRY", "DO_NOT_TRACK"];
});

export {fza,hza,hqt,NBp,Ogo};
