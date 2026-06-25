// @ts-nocheck
import {Rm as G$,tI as mR,T5 as OF,r3 as wl} from "../../vendor/m465.ts";
import {b as L} from "../../runtime.ts";
import {Wi as c7,Hn as V6} from "../../vendor/m100.ts";
import {Sc as u1,fileSuffixForOauthConfig as Ra_} from "../api/0465_getOauthConfig.ts";
import {dn as A6,or as Y8} from "./0137_namespace.ts";
import {ps as M9,Wt as Q_} from "../../vendor/m230.ts";
import {_k as C0,Ges as hQq} from "../core/0576_isCancel.ts";
import {nt as q_} from "../../vendor/m127.ts";
/** Probes internal/local network access (always returns null in this build). */
async function probeInternalNetworkAccess(): Promise<null> {
  return null;
}

/**
 * Returns true if the given command name resolves to an executable on PATH.
 * Uses the cross-module `G$` resolver (which/lookpath) and swallows errors.
 */
async function checkCommandExists(commandName: string): Promise<boolean> {
  try {
    return !!(await G$(commandName));
  } catch {
    return !1;
  }
}

/** Returns true when running inside the Conductor desktop app (macOS bundle ID check). */
function isConductorApp(): boolean {
  return process.env.__CFBundleIdentifier === "com.conductor.app";
}

/**
 * Returns true if the given path string matches a Windsurf or Devin installation.
 * @param pathStr - lowercased path to test
 */
function isWindsurfPath(pathStr: string): boolean {
  let lower = pathStr.toLowerCase();
  return lower.includes("windsurf") || lower.includes("devin.app") || lower.includes("devin desktop") || lower.includes("devin-desktop") || /appdata[\\/]local[\\/](programs[\\/])?devin[\\/]/.test(lower);
}

/**
 * Detects the active terminal/IDE environment from environment variables.
 * Returns a string identifier (e.g. "cursor", "ghostty", "tmux") or null.
 */
function detectTerminal(): string | null {
  if (process.env.CURSOR_TRACE_ID) return "cursor";
  let vsCodeAskpass = process.env.VSCODE_GIT_ASKPASS_MAIN?.toLowerCase() ?? "";
  if (vsCodeAskpass.includes("cursor")) return "cursor";
  if (isWindsurfPath(vsCodeAskpass)) return "windsurf";
  if (vsCodeAskpass.includes("antigravity")) return "antigravity";
  let bundleId = process.env.__CFBundleIdentifier?.toLowerCase();
  if (bundleId?.includes("vscodium")) return "codium";
  if (bundleId?.includes("windsurf") || bundleId?.includes("devin")) return "windsurf";
  if (bundleId?.includes("com.google.android.studio")) return "androidstudio";
  if (bundleId) {
    for (let ideName of JETBRAINS_IDE_NAMES) if (bundleId.includes(ideName)) return ideName;
  }
  if (process.env.VisualStudioVersion) return "visualstudio";
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") return "pycharm";
  if (process.env.TERM === "xterm-ghostty") return "ghostty";
  if (process.env.TERM?.includes("kitty")) return "kitty";
  if (process.env.TERM_PROGRAM) {
    if (/^devin([ -]desktop)?$/i.test(process.env.TERM_PROGRAM)) return "windsurf";
    return process.env.TERM_PROGRAM;
  }
  if (process.env.TMUX) return "tmux";
  if (process.env.STY) return "screen";
  if (process.env.KONSOLE_VERSION) return "konsole";
  if (process.env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";
  if (process.env.XTERM_VERSION) return "xterm";
  if (process.env.VTE_VERSION) return "vte-based";
  if (process.env.TERMINATOR_UUID) return "terminator";
  if (process.env.KITTY_WINDOW_ID) return "kitty";
  if (process.env.ALACRITTY_LOG) return "alacritty";
  if (process.env.TILIX_ID) return "tilix";
  if (process.env.WT_SESSION) return "windows-terminal";
  if (process.env.SESSIONNAME && process.env.TERM === "cygwin") return "cygwin";
  if (process.env.MSYSTEM) return process.env.MSYSTEM.toLowerCase();
  if (process.env.ConEmuANSI || process.env.ConEmuPID || process.env.ConEmuTask) return "conemu";
  if (process.env.WSL_DISTRO_NAME) return `wsl-${process.env.WSL_DISTRO_NAME}`;
  if (isSSH()) return "ssh-session";
  if (process.env.TERM) {
    let termVar = process.env.TERM;
    if (termVar.includes("alacritty")) return "alacritty";
    if (termVar.includes("rxvt")) return "rxvt";
    if (termVar.includes("termite")) return "termite";
    return process.env.TERM;
  }
  if (!process.stdout.isTTY) return "non-interactive";
  return null;
}

/** Returns true if the current process is running over an SSH connection. */
function isSSH(): boolean {
  return !!(process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY);
}

/**
 * Returns the host platform string, respecting the CLAUDE_CODE_HOST_PLATFORM override.
 * Falls back to `platformInfo.platform`.
 */
function getHostPlatform(): "win32" | "darwin" | "linux" {
  let hostPlatform = process.env.CLAUDE_CODE_HOST_PLATFORM;
  if (hostPlatform === "win32" || hostPlatform === "darwin" || hostPlatform === "linux") return hostPlatform;
  return platformInfo.platform;
}

/**
 * Normalises a shell executable path to a canonical shell identifier string.
 * Returns "none" for empty input, "other" for unrecognised shells.
 * @param shellPath - raw SHELL/COMSPEC value
 */
function getShellBaseName(shellPath: string): string {
  if (!shellPath) return "none";
  let baseName = shellPath.split(/[/\\]/).pop()!.toLowerCase().replace(/\.exe$/, "");
  return KNOWN_SHELLS.has(baseName) ? baseName : "other";
}

/** Returns the canonical name of the default shell from SHELL / COMSPEC env vars. */
function getDefaultShell(): string {
  return getShellBaseName(process.env.SHELL || process.env.COMSPEC || "");
}
var os: typeof import("os"), path: typeof import("path"), getConfigFilePath: () => string, hasInternetAccess: () => Promise<boolean>, getPackageManagers: () => Promise<string[]>, getRuntimes: () => Promise<string[]>, isWslEnvironment: () => boolean, isNpmFromWindowsPath: () => boolean, JETBRAINS_IDE_NAMES: string[], detectDeploymentEnvironment: () => string, /** Singleton platform info object exported by this module. */
  platformInfo: {
    hasInternetAccess: () => Promise<boolean>;
    probeInternalNetworkAccess: () => Promise<null>;
    isCI: boolean;
    platform: "win32" | "darwin" | "linux";
    arch: string;
    nodeVersion: string;
    terminal: string | null;
    isSSH: () => boolean;
    getPackageManagers: () => Promise<string[]>;
    getRuntimes: () => Promise<string[]>;
    isRunningWithBun: () => boolean;
    isWslEnvironment: () => boolean;
    isNpmFromWindowsPath: () => boolean;
    isConductor: () => boolean;
    detectDeploymentEnvironment: () => string;
  }, KNOWN_SHELLS: Set<string>;
var Ys_ = L(() => {
  c7();
  u1();
  A6();
  M9();
  mR();
  os = require("os"), path = require("path"), getConfigFilePath = V6(() => {
    if (Q_().existsSync(path.join(Y8(), ".config.json"))) return path.join(Y8(), ".config.json");
    let suffix = `.claude${Ra_()}.json`;
    return path.join(process.env.CLAUDE_CONFIG_DIR || os.homedir(), suffix);
  }), hasInternetAccess = V6(async () => {
    try {
      let {
        externalHttp: httpClient
      } = await Promise.resolve().then(() => (C0(), hQq));
      return await httpClient.head("http://1.1.1.1", {
        signal: AbortSignal.timeout(1000)
      }), !0;
    } catch {
      return !1;
    }
  });
  getPackageManagers = V6(async () => {
    let managers: string[] = [];
    if (await checkCommandExists("npm")) managers.push("npm");
    if (await checkCommandExists("yarn")) managers.push("yarn");
    if (await checkCommandExists("pnpm")) managers.push("pnpm");
    return managers;
  }), getRuntimes = V6(async () => {
    let runtimes: string[] = [];
    if (await checkCommandExists("bun")) runtimes.push("bun");
    if (await checkCommandExists("deno")) runtimes.push("deno");
    if (await checkCommandExists("node")) runtimes.push("node");
    return runtimes;
  }), isWslEnvironment = V6(() => {
    try {
      return Q_().existsSync("/proc/sys/fs/binfmt_misc/WSLInterop");
    } catch (err) {
      return !1;
    }
  }), isNpmFromWindowsPath = V6(() => {
    try {
      if (!isWslEnvironment()) return !1;
      let npmPath = OF("npm");
      if (npmPath === null) return !1;
      return npmPath.startsWith("/mnt/c/");
    } catch (err) {
      return !1;
    }
  });
  JETBRAINS_IDE_NAMES = ["pycharm", "intellij", "webstorm", "phpstorm", "rubymine", "clion", "goland", "rider", "datagrip", "appcode", "dataspell", "aqua", "gateway", "fleet", "jetbrains", "androidstudio"];
  detectDeploymentEnvironment = V6(() => {
    if (q_(process.env.CODESPACES)) return "codespaces";
    if (process.env.GITPOD_WORKSPACE_ID) return "gitpod";
    if (q_(process.env.CODER) || process.env.CODER_WORKSPACE_NAME) return "coder";
    if (q_(process.env.DEVPOD) || process.env.DEVPOD_WORKSPACE_UID) return "devpod";
    if (process.env.DAYTONA_WS_ID) return "daytona";
    if (q_(process.env.GOOGLE_CLOUD_WORKSTATIONS)) return "gcp-cloud-workstations";
    if (process.env.C9_PID || process.env.C9_USER) return "aws-cloud9";
    if (process.env.REPL_ID || process.env.REPL_SLUG) return "replit";
    if (process.env.PROJECT_DOMAIN) return "glitch";
    if (q_(process.env.VERCEL)) return "vercel";
    if (process.env.RAILWAY_ENVIRONMENT_NAME || process.env.RAILWAY_SERVICE_NAME) return "railway";
    if (q_(process.env.RENDER)) return "render";
    if (q_(process.env.NETLIFY)) return "netlify";
    if (process.env.DYNO) return "heroku";
    if (process.env.FLY_APP_NAME || process.env.FLY_MACHINE_ID) return "fly.io";
    if (q_(process.env.CF_PAGES)) return "cloudflare-pages";
    if (process.env.DENO_DEPLOYMENT_ID) return "deno-deploy";
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) return "aws-lambda";
    if (process.env.AWS_EXECUTION_ENV === "AWS_ECS_FARGATE") return "aws-fargate";
    if (process.env.AWS_EXECUTION_ENV === "AWS_ECS_EC2") return "aws-ecs";
    try {
      if (Q_().readFileSync("/sys/hypervisor/uuid", {
        encoding: "utf8"
      }).trim().toLowerCase().startsWith("ec2")) return "aws-ec2";
    } catch {}
    if (process.env.K_SERVICE) return "gcp-cloud-run";
    if (process.env.GOOGLE_CLOUD_PROJECT) return "gcp";
    if (process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_SKU) return "azure-app-service";
    if (process.env.AZURE_FUNCTIONS_ENVIRONMENT) return "azure-functions";
    if (process.env.APP_URL?.includes("ondigitalocean.app")) return "digitalocean-app-platform";
    if (process.env.SPACE_CREATOR_USER_ID) return "huggingface-spaces";
    if (q_(process.env.GITHUB_ACTIONS)) return "github-actions";
    if (q_(process.env.GITLAB_CI)) return "gitlab-ci";
    if (process.env.CIRCLECI) return "circleci";
    if (process.env.BUILDKITE) return "buildkite";
    if (q_(!1)) return "ci";
    if (process.env.KUBERNETES_SERVICE_HOST) return "kubernetes";
    try {
      if (Q_().existsSync("/.dockerenv")) return "docker";
    } catch {}
    if (platformInfo.platform === "darwin") return "unknown-darwin";
    if (platformInfo.platform === "linux") return "unknown-linux";
    if (platformInfo.platform === "win32") return "unknown-win32";
    return "unknown";
  });
  platformInfo = {
    hasInternetAccess: hasInternetAccess,
    probeInternalNetworkAccess: probeInternalNetworkAccess,
    isCI: q_(!1),
    platform: ["win32", "darwin"].includes("darwin") ? "darwin" : "linux",
    arch: "arm64",
    nodeVersion: process.version,
    terminal: detectTerminal(),
    isSSH: isSSH,
    getPackageManagers: getPackageManagers,
    getRuntimes: getRuntimes,
    isRunningWithBun: V6(wl),
    isWslEnvironment: isWslEnvironment,
    isNpmFromWindowsPath: isNpmFromWindowsPath,
    isConductor: isConductorApp,
    detectDeploymentEnvironment: detectDeploymentEnvironment
  };
  KNOWN_SHELLS = new Set(["zsh", "bash", "fish", "sh", "dash", "ash", "ksh", "tcsh", "csh", "nu", "nushell", "pwsh", "powershell", "cmd", "elvish", "xonsh", "ion"]);
});
export {probeInternalNetworkAccess as $Vc,checkCommandExists as Zze,isConductorApp as VVc,isWindsurfPath as $_r,detectTerminal as KVc,isSSH as jes,getHostPlatform as qAt,getShellBaseName as irn,getDefaultShell as q_r,os as Ves,path as srn,getConfigFilePath as nI,hasInternetAccess as UVc,getPackageManagers as qVc,getRuntimes as WVc,isWslEnvironment as Kes,isNpmFromWindowsPath as GVc,JETBRAINS_IDE_NAMES as C5,detectDeploymentEnvironment as zes,platformInfo as eje,KNOWN_SHELLS as zVc,Ys_ as arn};
