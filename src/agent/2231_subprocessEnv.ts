// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {nt,Za} from "../../vendor/m127.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {dA} from "../../vendor/m436.ts";
import {Fbi,Bbi} from "../config/2230_JAVA_TOOL_OPTIONS.ts";
import {Ne} from "../../vendor/m583.ts";
import {YU} from "../../vendor/m459.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {B$r} from "../../vendor/m2227.ts";
import {resolveToolAlias as UR} from "../config/2229_observed_uid.ts";
// @ts-nocheck
var subprocessEnvExports = {};
ft(subprocessEnvExports, {
  subprocessEnv: () => subprocessEnv,
  shouldUseMcpAllowlistEnv: () => shouldUseMcpAllowlistEnv,
  setSettingsColorEnv: () => setSettingsColorEnv,
  scrubSandboxConfig: () => scrubSandboxConfig,
  registerAgentProxyEnvFn: () => registerAgentProxyEnvFn,
  isScrubSandboxAvailable: () => isScrubSandboxAvailable,
  isScrubEnabled: () => isScrubEnabled,
  enforceScriptCaps: () => enforceScriptCaps,
  assertScrubSandboxAvailable: () => assertScrubSandboxAvailable,
  agentProxyEnv: () => agentProxyEnv,
  _setScrubPathsLatchedForTesting: () => _setScrubPathsLatchedForTesting,
  _resetScrubLatchForTesting: () => _resetScrubLatchForTesting,
  _resetScriptCapsForTesting: () => _resetScriptCapsForTesting,
  BG_WORKER_IDENTITY_ENV_VARS: () => BG_WORKER_IDENTITY_ENV_VARS
});

/** True when CLAUDE_CODE_SUBPROCESS_ENV_SCRUB is explicitly truthy (cached). */
function isScrubEnabled() {
  if (scrubEnabledCache === void 0) scrubEnabledCache = nt(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB);
  return scrubEnabledCache;
}

/** Whether to scrub GitHub Actions secrets from the subprocess env. */
function shouldScrubGithubActionsSecrets() {
  if (isScrubEnabled()) return !0;
  if (Za(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB)) return !1;
  return process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent";
}

/** Whether the OS-level scrub sandbox is available (cached; currently always false). */
function isScrubSandboxAvailable() {
  if (scrubSandboxAvailableCache !== void 0) return scrubSandboxAvailableCache;
  return !1;
}

/** Captures the latched scrub-path config (home/cwd/GitHub paths) once scrubbing is enabled. */
async function assertScrubSandboxAvailable() {
  if (!isScrubEnabled()) return;
  let home = osModule.homedir(),
    originalCwd = gr(),
    runnerFileCommandsDir = process.env.GITHUB_ENV ? pathModule.dirname(process.env.GITHUB_ENV) : void 0,
    workspace = process.env.GITHUB_WORKSPACE;
  scrubSandboxAvailableCache = !1, scrubPathsConfig = {
    home: home,
    originalCwd: originalCwd,
    claudeConfigDir: process.env.CLAUDE_CONFIG_DIR,
    runnerFileCommandsDir: runnerFileCommandsDir,
    workspace: workspace,
    GITHUB_ACTION_PATH: process.env.GITHUB_ACTION_PATH,
    GITHUB_EVENT_PATH: process.env.GITHUB_EVENT_PATH
  }, scrubPathsConfig.pathDirs = (process.env.PATH ?? "").split(":").map(dir => dir ? pathModule.posix.normalize(dir).replace(/\/+$/, "") : dir).filter(dir => dir && sandboxAllowWriteRoots.some(root => dir.startsWith(`${root}/`))), loadScriptCaps();
  return;
}

/** Parses CLAUDE_CODE_SCRIPT_CAPS into a name→count map (cached; null when absent/invalid). */
function loadScriptCaps() {
  if (scriptCapsCache !== void 0) return;
  let raw = process.env.CLAUDE_CODE_SCRIPT_CAPS;
  if (!raw) {
    scriptCapsCache = null;
    return;
  }
  try {
    let parsed = qt(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      let caps = dA(parsed, (value, key) => typeof value === "number" && Number.isFinite(value) && key.trim().length > 0);
      scriptCapsCache = Object.keys(caps).length > 0 ? caps : null;
    } else scriptCapsCache = null;
  } catch {
    scriptCapsCache = null;
  }
}

function _resetScriptCapsForTesting() {
  scriptCallCounts.clear(), scriptCapsCache = void 0;
}

function _resetScrubLatchForTesting() {
  scrubEnabledCache = void 0, scrubSandboxAvailableCache = void 0, scrubPathsConfig = void 0, _resetScriptCapsForTesting();
}

function _setScrubPathsLatchedForTesting(config) {
  scrubPathsConfig = config;
}

/** Counts script invocations in a command and throws if any exceeds its configured cap. */
function enforceScriptCaps(command) {
  if (!isScrubEnabled()) return;
  if (loadScriptCaps(), !scriptCapsCache) return;
  let caps = scriptCapsCache;
  for (let [scriptName, cap] of Object.entries(caps)) {
    let occurrences = command.split(scriptName).length - 1;
    if (occurrences > 0) {
      let total = (scriptCallCounts.get(scriptName) ?? 0) + occurrences;
      if (scriptCallCounts.set(scriptName, total), total > cap) throw Error(`Script call limit exceeded: ${scriptName} has been called ${total} times (cap: ${cap}). This limit prevents data exfiltration via repeated write operations in untrusted-input workflows.`);
    }
  }
}

/** Registers the provider used to inject agent-proxy (egress gateway) env vars. */
function registerAgentProxyEnvFn(provider) {
  agentProxyEnvProvider = provider;
}

/** Returns the agent-proxy env vars from the registered provider (or {}). */
function agentProxyEnv() {
  return agentProxyEnvProvider?.() ?? {};
}

/** Sets the env overlay derived from settings color/theme. */
function setSettingsColorEnv(env) {
  settingsColorEnv = env;
}

/** Builds the env passed to spawned subprocesses, scrubbing auth/bg/otel secrets as needed. */
function subprocessEnv() {
  let agentEnv = agentProxyEnv(),
    hasAgentEnv = Object.keys(agentEnv).length > 0,
    hasColorEnv = Object.keys(settingsColorEnv).length > 0,
    proxyEnv = nt(process.env.CLAUDE_CODE_REMOTE) ? Fbi(hasAgentEnv ? {
      ...process.env,
      ...agentEnv
    } : process.env) : {},
    hasProxyEnv = Object.keys(proxyEnv).length > 0,
    scrubGithubSecrets = shouldScrubGithubActionsSecrets(),
    hasAuthSecrets = process.env.CLAUDE_CODE_OAUTH_TOKEN !== void 0 || process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE !== void 0 || process.env.CLAUDE_CODE_RATE_LIMIT_TIER !== void 0 || process.env.CLAUDE_BG_AUTH_SNAPSHOT_PATH !== void 0 || Ne.CLAUDE_BG_SOCKET_TOKENS_PATH !== void 0 || Ne.CLAUDE_BG_RV_AUTH !== void 0 || Ne.CLAUDE_BG_PTY_AUTH !== void 0,
    hasBgSessionVars = !1;
  hasBgSessionVars = BG_WORKER_IDENTITY_ENV_VARS.some(varName => process.env[varName] !== void 0);
  let hasOtelVars = Object.keys(process.env).some(key => key.startsWith("OTEL_") || key === "CLAUDE_CODE_OTEL_DIAG_STDERR");
  if (!hasAgentEnv && !hasProxyEnv && !scrubGithubSecrets && !hasBgSessionVars && !hasAuthSecrets && !hasOtelVars && !hasColorEnv) return process.env;
  let env = {
    ...process.env,
    ...settingsColorEnv,
    ...agentEnv,
    ...proxyEnv
  };
  delete env.CLAUDE_CODE_OAUTH_TOKEN, delete env.CLAUDE_CODE_SUBSCRIPTION_TYPE, delete env.CLAUDE_CODE_RATE_LIMIT_TIER, delete env.CLAUDE_BG_AUTH_SNAPSHOT_PATH, delete env.CLAUDE_BG_SOCKET_TOKENS_PATH, delete env.CLAUDE_BG_RV_AUTH, delete env.CLAUDE_BG_PTY_AUTH;
  for (let varName of BG_WORKER_IDENTITY_ENV_VARS) delete env[varName];
  for (let key of Object.keys(env)) if (key.startsWith("OTEL_")) delete env[key];
  if (delete env.CLAUDE_CODE_OTEL_DIAG_STDERR, !scrubGithubSecrets) return env;
  for (let secretVar of secretEnvVarsToScrub) delete env[secretVar], delete env[`INPUT_${secretVar}`];
  return env;
}

/** Whether MCP allowlist env mode is active for this entrypoint. */
function shouldUseMcpAllowlistEnv() {
  let value = process.env.CLAUDE_CODE_MCP_ALLOWLIST_ENV;
  if (nt(value)) return !0;
  if (Za(value)) return !1;
  return process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent";
}

/** Computes the sandbox filesystem allow/deny rules used when scrubbing is active. */
function scrubSandboxConfig() {
  let home = scrubPathsConfig?.home ?? osModule.homedir(),
    originalCwd = scrubPathsConfig?.originalCwd ?? gr(),
    githubActionPath = scrubPathsConfig?.GITHUB_ACTION_PATH ?? process.env.GITHUB_ACTION_PATH,
    runnerFileCommandsDir = scrubPathsConfig?.runnerFileCommandsDir ?? (process.env.GITHUB_ENV ? pathModule.dirname(process.env.GITHUB_ENV) : void 0),
    workspace = scrubPathsConfig?.workspace ?? process.env.GITHUB_WORKSPACE,
    workspaceGitPaths = workspace && pathModule.posix.resolve(workspace) !== pathModule.posix.resolve(originalCwd) ? [`${workspace}/.git/hooks`, `${workspace}/.git/config`, `${workspace}/.git/config.lock`, `${workspace}/.git/config.worktree`, `${workspace}/.git/config.worktree.lock`, `${workspace}/.git/commondir`, `${workspace}/.git/worktrees`, `${workspace}/.git/modules`, `${workspace}/.git/info/exclude`, `${workspace}/.gitmodules`, `${workspace}/.github`] : [];
  return {
    filesystem: {
      allowWrite: sandboxAllowWriteRoots,
      denyRead: ["/run/docker.sock", "/run/containerd/containerd.sock", "/run/podman/podman.sock", "/run/buildkit/buildkitd.sock", "/run/dbus", "/run/user"],
      denyWrite: [`${home}/.bash_profile`, `${home}/.bashrc`, `${home}/.bash_aliases`, `${home}/.bash_login`, `${home}/.bash_logout`, `${home}/.profile`, `${home}/.zshrc`, `${home}/.zprofile`, `${home}/.zshenv`, `${home}/.zlogin`, `${home}/.zlogout`, `${home}/.claude`, `${home}/.claude.json`, scrubPathsConfig?.claudeConfigDir ?? process.env.CLAUDE_CONFIG_DIR, `${home}/.gitconfig`, `${home}/.config/git`, `${home}/.bunfig.toml`, `${originalCwd}/bunfig.toml`, `${originalCwd}/package.json`, ...dotenvFileNames.map(name => `${originalCwd}/${name}`), `${home}/.npmrc`, `${originalCwd}/.npmrc`, `${home}/.yarnrc`, `${home}/.yarnrc.yml`, `${originalCwd}/.yarnrc`, `${originalCwd}/.yarnrc.yml`, `${home}/.config/pip`, `${home}/.pip`, `${originalCwd}/package-lock.json`, `${originalCwd}/yarn.lock`, `${originalCwd}/pnpm-lock.yaml`, `${originalCwd}/node_modules/.bin`, `${originalCwd}/.git/modules`, `${originalCwd}/scripts`, `${originalCwd}/.claude`, `${originalCwd}/.github`, `${home}/.local/bin`, `${home}/runners`, `${home}/actions-runner`, "/tmp/inline-comments-buffer.jsonl", ...(scrubPathsConfig?.pathDirs ?? []), runnerFileCommandsDir, githubActionPath, githubActionPath && githubActionPath.includes("/_actions/") ? githubActionPath.slice(0, githubActionPath.indexOf("/_actions/") + 9) : void 0, scrubPathsConfig?.GITHUB_EVENT_PATH ?? process.env.GITHUB_EVENT_PATH, `${home}/.config/gh`, `${home}/.netrc`, `${home}/.ssh`, `${originalCwd}/.git/hooks`, `${originalCwd}/.git/config`, `${originalCwd}/.git/config.lock`, `${originalCwd}/.git/config.worktree`, `${originalCwd}/.git/config.worktree.lock`, `${originalCwd}/.git/commondir`, `${originalCwd}/.git/worktrees`, `${originalCwd}/.gitmodules`, `${originalCwd}/.git/info/exclude`, ...workspaceGitPaths].filter(path => !!path)
    }
  };
}

var osModule,
  pathModule,
  BG_WORKER_IDENTITY_ENV_VARS,
  scrubEnabledCache,
  dotenvFileNames,
  sandboxAllowWriteRoots,
  scrubSandboxAvailableCacheDot = ".",
  scrubSandboxAvailableCache,
  scrubPathsConfig,
  scriptCallCounts,
  scriptCapsCache,
  secretEnvVarsToScrub,
  agentProxyEnvProvider,
  settingsColorEnv;
var E1 = b(() => {
  YU();
  lt();
  Ir();
  dn();
  B$r();
  tn();
  UR();
  Bbi();
  osModule = require("os"), pathModule = require("path"), BG_WORKER_IDENTITY_ENV_VARS = ["CLAUDE_CODE_SESSION_KIND", "CLAUDE_BG_SOURCE", "CLAUDE_BG_ISOLATION", "CLAUDE_BG_BACKEND", "CLAUDE_CODE_SESSION_NAME", "CLAUDE_CODE_RESUME_INTERRUPTED_TURN", "CLAUDE_CODE_RESUME_PROMPT", "CLAUDE_BG_SESSION_PERMISSION_RULES", "CLAUDE_BG_MEMORY_TOGGLED_OFF"];
  dotenvFileNames = [".env", ".env.local", ".env.development", ".env.development.local", ".env.test", ".env.test.local", ".env.production", ".env.production.local"], sandboxAllowWriteRoots = ["home", "root", "tmp", "var", "opt", "run", "mnt"].map(e => `/${e}`);
  scriptCallCounts = new Map();
  secretEnvVarsToScrub = ["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_FOUNDRY_API_KEY", "ANTHROPIC_AWS_API_KEY", "ANTHROPIC_BEDROCK_MANTLE_API_KEY", "ANTHROPIC_CUSTOM_HEADERS", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN", "AWS_BEARER_TOKEN_BEDROCK", "GOOGLE_APPLICATION_CREDENTIALS", "AZURE_CLIENT_SECRET", "AZURE_CLIENT_CERTIFICATE_PATH", "ACTIONS_ID_TOKEN_REQUEST_TOKEN", "ACTIONS_ID_TOKEN_REQUEST_URL", "ACTIONS_RUNTIME_TOKEN", "ACTIONS_RUNTIME_URL", "ALL_INPUTS", "OVERRIDE_GITHUB_TOKEN", "DEFAULT_WORKFLOW_TOKEN", "SSH_SIGNING_KEY"];
  settingsColorEnv = {};
});

export {subprocessEnvExports as Vbi,isScrubEnabled,shouldScrubGithubActionsSecrets as yld,isScrubSandboxAvailable,assertScrubSandboxAvailable,loadScriptCaps as qbi,_resetScriptCapsForTesting,_resetScrubLatchForTesting,_setScrubPathsLatchedForTesting,enforceScriptCaps,registerAgentProxyEnvFn,agentProxyEnv,setSettingsColorEnv,subprocessEnv,shouldUseMcpAllowlistEnv,scrubSandboxConfig,osModule as V$r,pathModule as Xse,BG_WORKER_IDENTITY_ENV_VARS,scrubEnabledCache as qbn,dotenvFileNames as q$r,sandboxAllowWriteRoots as $bi,scrubSandboxAvailableCacheDot as Ubi,scrubSandboxAvailableCache as Wbn,scrubPathsConfig as v8,scriptCallCounts as W$r,scriptCapsCache as ave,secretEnvVarsToScrub as bld,agentProxyEnvProvider as Gbi,settingsColorEnv as G$r,E1 as VM};
