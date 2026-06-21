// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {st as rt,_l as hl} from "../../vendor/m5.ts";
import {getOriginalCwd as gr,lt as ct} from "../session/0131_sent.ts";
import {qt as Wt,Xt} from "../config/0228_encoding.ts";
import {sv as nv} from "../../vendor/m434.ts";
import {BAi as Hfi,FAi as Ifi} from "../config/2222_JAVA_TOOL_OPTIONS.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {B3 as b3} from "../../vendor/m453.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {cBr as yNr} from "../../vendor/m2219.ts";
import {Mw as Pw} from "../config/2221_recursive.ts";
// @ts-nocheck
var subprocessEnvExports = {};
pt(subprocessEnvExports, {
  subprocessEnv: () => subprocessEnv,
  shouldUseMcpAllowlistEnv: () => shouldUseMcpAllowlistEnv,
  setSettingsColorEnv: () => setSettingsColorEnv,
  scrubSandboxConfig: () => scrubSandboxConfig,
  registerAgentProxyEnvFn: () => registerEgressGatewayEnvFn,
  isScrubSandboxAvailable: () => isScrubSandboxAvailable,
  isScrubEnabled: () => isScrubEnabled,
  enforceScriptCaps: () => enforceScriptCaps,
  assertScrubSandboxAvailable: () => egressGatewayEnv,
  agentProxyEnv: () => egressGatewayEnv_2,
  _setScrubPathsLatchedForTesting: () => _setScrubPathsLatchedForTesting,
  _resetScrubLatchForTesting: () => _resetScrubLatchForTesting,
  _resetScriptCapsForTesting: () => _resetScriptCapsForTesting
});
function isScrubEnabled() {
  if (scrubEnabledCache === undefined) scrubEnabledCache = rt(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB);
  return scrubEnabledCache;
}
function shouldScrubGithubActionsSecrets() {
  if (isScrubEnabled()) return true;
  if (hl(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB)) return false;
  return process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent";
}
function isScrubSandboxAvailable() {
  if (scrubSandboxAvailableCache_2 !== undefined) return scrubSandboxAvailableCache_2;
  return false;
}
async function egressGatewayEnv() {
  if (!isScrubEnabled()) return;
  let home = Mb8.homedir(),
    originalCwd = gr(),
    runnerFileCommandsDir = process.env.GITHUB_ENV ? F9H.dirname(process.env.GITHUB_ENV) : undefined,
    workspace = process.env.GITHUB_WORKSPACE;
  scrubSandboxAvailableCache_2 = false, scrubPathsConfig = {
    home: home,
    originalCwd: originalCwd,
    claudeConfigDir: process.env.CLAUDE_CONFIG_DIR,
    runnerFileCommandsDir: runnerFileCommandsDir,
    workspace: workspace,
    GITHUB_ACTION_PATH: process.env.GITHUB_ACTION_PATH,
    GITHUB_EVENT_PATH: process.env.GITHUB_EVENT_PATH
  }, scrubPathsConfig.pathDirs = (process.env.PATH ?? "").split(":").map(dir => dir ? F9H.posix.normalize(dir).replace(/\/+$/, "") : dir).filter(dir => dir && sandboxAllowWriteRoots.some(root => dir.startsWith(`${root}/`))), loadScriptCaps();
  return;
}
function loadScriptCaps() {
  if (scriptCapsCache !== undefined) return;
  let raw = process.env.CLAUDE_CODE_SCRIPT_CAPS;
  if (!raw) {
    scriptCapsCache = null;
    return;
  }
  try {
    let parsed = Wt(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      let caps = nv(parsed, (value, key) => typeof value === "number" && Number.isFinite(value) && key.trim().length > 0);
      scriptCapsCache = Object.keys(caps).length > 0 ? caps : null;
    } else scriptCapsCache = null;
  } catch {
    scriptCapsCache = null;
  }
}
function _resetScriptCapsForTesting() {
  scriptCallCounts.clear(), scriptCapsCache = undefined;
}
function _resetScrubLatchForTesting() {
  scrubEnabledCache = undefined, scrubSandboxAvailableCache_2 = undefined, scrubPathsConfig = undefined, _resetScriptCapsForTesting();
}
function _setScrubPathsLatchedForTesting(config) {
  scrubPathsConfig = config;
}
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
function registerEgressGatewayEnvFn(provider) {
  egressGatewayEnvProvider = provider;
}
function egressGatewayEnv_2() {
  return egressGatewayEnvProvider?.() ?? {};
}
function setSettingsColorEnv(env) {
  settingsColorEnv = env;
}
function subprocessEnv() {
  let egressEnv = egressGatewayEnv_2(),
    hasEgressEnv = Object.keys(egressEnv).length > 0,
    hasColorEnv = Object.keys(settingsColorEnv).length > 0,
    proxyEnv = rt(process.env.CLAUDE_CODE_REMOTE) ? Hfi(hasEgressEnv ? {
      ...process.env,
      ...egressEnv
    } : process.env) : {},
    hasProxyEnv = Object.keys(proxyEnv).length > 0,
    scrubGithubSecrets = shouldScrubGithubActionsSecrets(),
    hasAuthSecrets = process.env.CLAUDE_CODE_OAUTH_TOKEN !== undefined || process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE !== undefined || process.env.CLAUDE_CODE_RATE_LIMIT_TIER !== undefined || process.env.CLAUDE_BG_AUTH_SNAPSHOT_PATH !== undefined || Ge.CLAUDE_BG_SOCKET_TOKENS_PATH !== undefined || Ge.CLAUDE_BG_RV_AUTH !== undefined || Ge.CLAUDE_BG_PTY_AUTH !== undefined,
    hasBgSessionVars = false;
  hasBgSessionVars = process.env.CLAUDE_CODE_SESSION_KIND !== undefined || process.env.CLAUDE_BG_SOURCE !== undefined || process.env.CLAUDE_BG_ISOLATION !== undefined || process.env.CLAUDE_BG_BACKEND !== undefined || process.env.CLAUDE_CODE_SESSION_NAME !== undefined || process.env.CLAUDE_BG_SESSION_PERMISSION_RULES !== undefined || process.env.CLAUDE_BG_MEMORY_TOGGLED_OFF !== undefined;
  let hasOtelVars = Object.keys(process.env).some(key => key.startsWith("OTEL_") || key === "CLAUDE_CODE_OTEL_DIAG_STDERR");
  if (!hasEgressEnv && !hasProxyEnv && !scrubGithubSecrets && !hasBgSessionVars && !hasAuthSecrets && !hasOtelVars && !hasColorEnv) return process.env;
  let env = {
    ...process.env,
    ...settingsColorEnv,
    ...egressEnv,
    ...proxyEnv
  };
  delete env.CLAUDE_CODE_OAUTH_TOKEN, delete env.CLAUDE_CODE_SUBSCRIPTION_TYPE, delete env.CLAUDE_CODE_RATE_LIMIT_TIER, delete env.CLAUDE_BG_AUTH_SNAPSHOT_PATH, delete env.CLAUDE_BG_SOCKET_TOKENS_PATH, delete env.CLAUDE_BG_RV_AUTH, delete env.CLAUDE_BG_PTY_AUTH, delete env.CLAUDE_CODE_SESSION_KIND, delete env.CLAUDE_BG_SOURCE, delete env.CLAUDE_BG_ISOLATION, delete env.CLAUDE_BG_BACKEND, delete env.CLAUDE_CODE_SESSION_NAME, delete env.CLAUDE_CODE_RESUME_INTERRUPTED_TURN, delete env.CLAUDE_CODE_RESUME_PROMPT, delete env.CLAUDE_BG_SESSION_PERMISSION_RULES, delete env.CLAUDE_BG_MEMORY_TOGGLED_OFF;
  for (let key of Object.keys(env)) if (key.startsWith("OTEL_")) delete env[key];
  if (delete env.CLAUDE_CODE_OTEL_DIAG_STDERR, !scrubGithubSecrets) return env;
  for (let secretVar of secretEnvVarsToScrub) delete env[secretVar], delete env[`INPUT_${secretVar}`];
  return env;
}
function shouldUseMcpAllowlistEnv() {
  let value = process.env.CLAUDE_CODE_MCP_ALLOWLIST_ENV;
  if (rt(value)) return true;
  if (hl(value)) return false;
  return process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent";
}
function scrubSandboxConfig() {
  let home = scrubPathsConfig?.home ?? Mb8.homedir(),
    originalCwd = scrubPathsConfig?.originalCwd ?? gr(),
    githubActionPath = scrubPathsConfig?.GITHUB_ACTION_PATH ?? process.env.GITHUB_ACTION_PATH,
    runnerFileCommandsDir = scrubPathsConfig?.runnerFileCommandsDir ?? (process.env.GITHUB_ENV ? F9H.dirname(process.env.GITHUB_ENV) : undefined),
    workspace = scrubPathsConfig?.workspace ?? process.env.GITHUB_WORKSPACE,
    workspaceGitPaths = workspace && F9H.posix.resolve(workspace) !== F9H.posix.resolve(originalCwd) ? [`${workspace}/.git/hooks`, `${workspace}/.git/config`, `${workspace}/.git/config.worktree`, `${workspace}/.git/commondir`, `${workspace}/.git/worktrees`, `${workspace}/.git/modules`, `${workspace}/.git/info/exclude`, `${workspace}/.gitmodules`, `${workspace}/.github`] : [];
  return {
    filesystem: {
      allowWrite: sandboxAllowWriteRoots,
      denyRead: ["/run/docker.sock", "/run/containerd/containerd.sock", "/run/podman/podman.sock", "/run/buildkit/buildkitd.sock", "/run/dbus", "/run/user"],
      denyWrite: [`${home}/.bash_profile`, `${home}/.bashrc`, `${home}/.bash_aliases`, `${home}/.bash_login`, `${home}/.bash_logout`, `${home}/.profile`, `${home}/.zshrc`, `${home}/.zprofile`, `${home}/.zshenv`, `${home}/.zlogin`, `${home}/.zlogout`, `${home}/.claude`, `${home}/.claude.json`, scrubPathsConfig?.claudeConfigDir ?? process.env.CLAUDE_CONFIG_DIR, `${home}/.gitconfig`, `${home}/.config/git`, `${home}/.bunfig.toml`, `${originalCwd}/bunfig.toml`, `${originalCwd}/package.json`, ...dotenvFileNames.map(name => `${originalCwd}/${name}`), `${home}/.npmrc`, `${originalCwd}/.npmrc`, `${home}/.yarnrc`, `${home}/.yarnrc.yml`, `${originalCwd}/.yarnrc`, `${originalCwd}/.yarnrc.yml`, `${home}/.config/pip`, `${home}/.pip`, `${originalCwd}/package-lock.json`, `${originalCwd}/yarn.lock`, `${originalCwd}/pnpm-lock.yaml`, `${originalCwd}/node_modules/.bin`, `${originalCwd}/.git/modules`, `${originalCwd}/scripts`, `${originalCwd}/.claude`, `${originalCwd}/.github`, `${home}/.local/bin`, `${home}/runners`, `${home}/actions-runner`, "/tmp/inline-comments-buffer.jsonl", ...(scrubPathsConfig?.pathDirs ?? []), runnerFileCommandsDir, githubActionPath, githubActionPath && githubActionPath.includes("/_actions/") ? githubActionPath.slice(0, githubActionPath.indexOf("/_actions/") + 9) : undefined, scrubPathsConfig?.GITHUB_EVENT_PATH ?? process.env.GITHUB_EVENT_PATH, `${home}/.config/gh`, `${home}/.netrc`, `${home}/.ssh`, `${originalCwd}/.git/hooks`, `${originalCwd}/.git/config`, `${originalCwd}/.git/config.worktree`, `${originalCwd}/.git/commondir`, `${originalCwd}/.git/worktrees`, `${originalCwd}/.gitmodules`, `${originalCwd}/.git/info/exclude`, ...workspaceGitPaths].filter(path => !!path)
    }
  };
}
var Mb8,
  F9H,
  scrubEnabledCache,
  dotenvFileNames,
  sandboxAllowWriteRoots,
  scrubSandboxAvailableCache = ".",
  scrubSandboxAvailableCache_2,
  scrubPathsConfig,
  scriptCallCounts,
  scriptCapsCache,
  secretEnvVarsToScrub,
  egressGatewayEnvProvider,
  settingsColorEnv;
var E1 = b(() => {
  b3();
  ct();
  Or();
  an();
  yNr();
  Xt();
  Pw();
  Ifi();
  Mb8 = require("os"), F9H = require("path");
  dotenvFileNames = [".env", ".env.local", ".env.development", ".env.development.local", ".env.test", ".env.test.local", ".env.production", ".env.production.local"], sandboxAllowWriteRoots = ["home", "root", "tmp", "var", "opt", "run", "mnt"].map(e => `/${e}`);
  scriptCallCounts = new Map();
  secretEnvVarsToScrub = ["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_FOUNDRY_API_KEY", "ANTHROPIC_AWS_API_KEY", "ANTHROPIC_BEDROCK_MANTLE_API_KEY", "ANTHROPIC_CUSTOM_HEADERS", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN", "AWS_BEARER_TOKEN_BEDROCK", "GOOGLE_APPLICATION_CREDENTIALS", "AZURE_CLIENT_SECRET", "AZURE_CLIENT_CERTIFICATE_PATH", "ACTIONS_ID_TOKEN_REQUEST_TOKEN", "ACTIONS_ID_TOKEN_REQUEST_URL", "ACTIONS_RUNTIME_TOKEN", "ACTIONS_RUNTIME_URL", "ALL_INPUTS", "OVERRIDE_GITHUB_TOKEN", "DEFAULT_WORKFLOW_TOKEN", "SSH_SIGNING_KEY"];
  settingsColorEnv = {};
});

export {subprocessEnvExports as GAi,isScrubEnabled,shouldScrubGithubActionsSecrets as zXu,isScrubSandboxAvailable,egressGatewayEnv as assertScrubSandboxAvailable,loadScriptCaps as qAi,_resetScriptCapsForTesting,_resetScrubLatchForTesting,_setScrubPathsLatchedForTesting,enforceScriptCaps,registerEgressGatewayEnvFn as registerAgentProxyEnvFn,egressGatewayEnv_2 as agentProxyEnv,setSettingsColorEnv,subprocessEnv,shouldUseMcpAllowlistEnv,scrubSandboxConfig,Mb8 as fBr,F9H as Qse,scrubEnabledCache as ayn,dotenvFileNames as dBr,sandboxAllowWriteRoots as $Ai,scrubSandboxAvailableCache as UAi,scrubSandboxAvailableCache_2 as lyn,scrubPathsConfig as d5,scriptCallCounts as pBr,scriptCapsCache as bve,secretEnvVarsToScrub as XXu,egressGatewayEnvProvider as WAi,settingsColorEnv as mBr,E1 as P1};
