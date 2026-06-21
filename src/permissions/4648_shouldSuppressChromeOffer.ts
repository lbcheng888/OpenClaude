// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {je as oH} from "../../vendor/m577.ts";
import {getIsNonInteractiveSession as u8,getChromeFlagOverride as ya,getIsInteractive as N0,getSessionBypassPermissionsMode as U$_,lt as w_} from "../session/0131_sent.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {isClaudeAISubscriber as Lq,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {CLAUDE_IN_CHROME_MCP_SERVER_NAME as sh,getAllNativeMessagingHostsDirs as zb8,openInChrome as oG_,getAllWindowsRegistryKeys as $b8,getAllBrowserDataPaths as Tb8,oL as gN} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {_A as WY} from "../../vendor/m459.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Ago as OOq,V6n as Tm6} from "../../vendor/m4422.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {Ul as tK,ln as M6} from "../telemetry/0594_feature_name.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {execFileNoThrowWithCwd as c8,oa as l7} from "../../vendor/m684.ts";
import {tr as Y8,sn as A6} from "../config/0047_namespace.ts";
import {Hpl as F74,Ipl as g74} from "../../vendor/m4646.ts";
import {Lr as _q} from "../../vendor/m578.ts";
var nYq = {};
j_(nYq, {
  shouldSuppressChromeOffer: () => shouldSuppressChromeOffer,
  shouldEnableClaudeInChrome: () => shouldEnableClaudeInChrome,
  shouldAutoEnableClaudeInChrome: () => shouldAutoEnableClaudeInChrome,
  setupClaudeInChrome: () => setupClaudeInChrome,
  markClaudeInChromeUnwiredIfChrome: () => markClaudeInChromeUnwiredIfChrome,
  markClaudeInChromeUnwired: () => markClaudeInChromeUnwired,
  isClaudeInChromeWiredThisSession: () => isClaudeInChromeWiredThisSession,
  isChromeExtensionInstalled: () => isChromeExtensionInstalled,
  installChromeNativeHostManifest: () => installChromeNativeHostManifest,
  getClaudeInChromeMcpServerConfig: () => getClaudeInChromeMcpServerConfig,
  _resetShouldAutoEnableForTesting: () => _resetShouldAutoEnableForTesting,
  _resetClaudeInChromeWiredForTesting: () => _resetClaudeInChromeWiredForTesting
});

/** Whether the "Claude in Chrome" feature should be enabled, based on flag/env/config. */
function shouldEnableClaudeInChrome(enabledFlag: boolean | undefined): boolean {
  if (enabledFlag === !0) return !0;
  if (enabledFlag === !1) return !1;
  if (oH.CLAUDE_CODE_ENABLE_CFC === !0) return !0;
  if (oH.CLAUDE_CODE_ENABLE_CFC === !1) return !1;
  if (u8()) return !1;
  let globalConfig = C_();
  if (globalConfig.claudeInChromeDefaultEnabled !== void 0) return globalConfig.claudeInChromeDefaultEnabled;
  return !1;
}

/** Whether Claude in Chrome should be auto-enabled this session. Result is cached after first call. */
function shouldAutoEnableClaudeInChrome(): boolean {
  if (cachedAutoEnableResult !== void 0) return cachedAutoEnableResult;
  return cachedAutoEnableResult = ya() !== !1 && oH.CLAUDE_CODE_ENABLE_CFC !== !1 && C_().claudeInChromeDefaultEnabled === void 0 && N0() && Lq() && (checkAndCacheChromeExtensionInstalled() || Boolean(C_().chromeExtension?.pairedDeviceId)) && Y_("tengu_chrome_auto_enable", !1), cachedAutoEnableResult;
}

/** Reset the auto-enable cache (for testing only). */
function _resetShouldAutoEnableForTesting(): void {
  cachedAutoEnableResult = void 0;
}

/** Whether Claude in Chrome has been wired (connected) this session. */
function isClaudeInChromeWiredThisSession(): boolean {
  return claudeInChromeWiredThisSession;
}

/** Reset the wired-this-session flag (for testing only). */
function _resetClaudeInChromeWiredForTesting(): void {
  claudeInChromeWiredThisSession = !1;
}

/** Mark Claude in Chrome as unwired (disconnected). */
function markClaudeInChromeUnwired(): void {
  claudeInChromeWiredThisSession = !1;
}

/** Mark Claude in Chrome as unwired only if the given server name matches the Chrome MCP server name. */
function markClaudeInChromeUnwiredIfChrome(serverName: string): void {
  if (serverName === sh) markClaudeInChromeUnwired();
}

/**
 * Returns true if the Chrome Offer (the prompt to enable Claude in Chrome) should be suppressed.
 * Suppressed in SSH-pending, remote, teleport, safe-mode, bypassPermissions, or teammate-agent scenarios.
 */
function shouldSuppressChromeOffer({
  isSSHPending,
  isRemoteMode,
  hasTeleport,
  isSafeMode,
  permissionMode,
  isBypassPermissionsModeAvailable,
  teammateAgentId
}: {
  isSSHPending: boolean;
  isRemoteMode: boolean;
  hasTeleport: boolean;
  isSafeMode: boolean;
  permissionMode: string;
  isBypassPermissionsModeAvailable: boolean;
  teammateAgentId: string | undefined;
}): boolean {
  return isSSHPending || isRemoteMode || hasTeleport || isSafeMode || permissionMode === "bypassPermissions" || permissionMode === "plan" && isBypassPermissionsModeAvailable || teammateAgentId !== void 0;
}

/** Returns the MCP server config for the Claude in Chrome stdio server. */
function getClaudeInChromeMcpServerConfig(): { type: string; command: string; args: string[]; scope: string } {
  if (WY()) return {
    type: "stdio",
    command: process.execPath,
    args: ["--claude-in-chrome-mcp"],
    scope: "dynamic"
  };
  let setupFilePath = gYq.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/src/utils/claudeInChrome/setup.ts"),
    setupDir = mo.join(setupFilePath, ".."),
    cliJsPath = mo.join(setupDir, "cli.js");
  return {
    type: "stdio",
    command: process.execPath,
    args: [`${cliJsPath}`, "--claude-in-chrome-mcp"],
    scope: "dynamic"
  };
}

/** Set up Claude in Chrome: installs the native host manifest, marks session as wired, returns MCP config. */
function setupClaudeInChrome(): { mcpConfig: Record<string, unknown>; allowedTools: string[]; systemPrompt: string } {
  let isPackaged = WY(),
    allowedTools: string[] = [],
    envOverrides: Record<string, string> = {};
  if (U$_()) envOverrides.CLAUDE_CHROME_PERMISSION_MODE = "skip_all_permission_checks";
  let hasEnvOverrides = Object.keys(envOverrides).length > 0;
  if (isPackaged) {
    let nativeHostCommand = `"${process.execPath}" --chrome-native-host`;
    return createChromeNativeHostWrapperScript(nativeHostCommand).then(wrapperScriptPath => installChromeNativeHostManifest(wrapperScriptPath)).catch(err => N(`[Claude in Chrome] Failed to install native host: ${err}`, {
      level: "error"
    })), claudeInChromeWiredThisSession = !0, {
      mcpConfig: {
        [sh]: {
          ...getClaudeInChromeMcpServerConfig(),
          ...(hasEnvOverrides && {
            env: envOverrides
          })
        }
      },
      allowedTools: allowedTools,
      systemPrompt: OOq()
    };
  } else {
    let setupFilePath = gYq.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/src/utils/claudeInChrome/setup.ts"),
      setupDir = mo.join(setupFilePath, ".."),
      cliJsPath = mo.join(setupDir, "cli.js");
    createChromeNativeHostWrapperScript(`"${process.execPath}" "${cliJsPath}" --chrome-native-host`).then(wrapperScriptPath => installChromeNativeHostManifest(wrapperScriptPath)).catch(err => N(`[Claude in Chrome] Failed to install native host: ${err}`, {
      level: "error"
    }));
    let mcpConfig = {
      [sh]: {
        ...getClaudeInChromeMcpServerConfig(),
        ...(hasEnvOverrides && {
          env: envOverrides
        })
      }
    };
    return claudeInChromeWiredThisSession = !0, {
      mcpConfig: mcpConfig,
      allowedTools: allowedTools,
      systemPrompt: OOq()
    };
  }
}

/** Returns platform-appropriate directories for the Chrome native host manifest. */
function getNativeHostManifestDirs(): string[] {
  if (t_() === "windows") {
    let homeDir = d74.homedir(),
      appDataDir = process.env.APPDATA || mo.join(homeDir, "AppData", "Local");
    return [mo.join(appDataDir, "Claude Code", "ChromeNativeHost")];
  }
  return zb8().map(({
    path: dirPath
  }) => dirPath);
}

/** Writes the Chrome native host manifest JSON to all platform-appropriate locations. */
async function installChromeNativeHostManifest(executablePath: string): Promise<void> {
  return tK("chrome_native_host_install", async () => {
    let manifestDirs = getNativeHostManifestDirs();
    if (manifestDirs.length === 0) throw Error("Claude in Chrome Native Host not supported on this platform");
    let manifest = {
        name: QYq,
        description: "Claude Code Browser Extension Native Host",
        path: executablePath,
        type: "stdio",
        allowed_origins: ["chrome-extension://fcoeoabgfenejglbffodgkkbkcdhcgfn/", ...[]]
      },
      manifestJson = bH(manifest, null, 2),
      didInstallNew = !1;
    for (let manifestDir of manifestDirs) {
      let manifestFilePath = mo.join(manifestDir, Q74);
      if ((await y_H.readFile(manifestFilePath, "utf-8").catch(() => null)) === manifestJson) continue;
      try {
        await y_H.mkdir(manifestDir, {
          recursive: !0
        }), await y_H.writeFile(manifestFilePath, manifestJson), N(`[Claude in Chrome] Installed native host manifest at: ${manifestFilePath}`), didInstallNew = !0;
      } catch (writeErr) {
        N(`[Claude in Chrome] Failed to install manifest at ${manifestFilePath}: ${writeErr}`);
      }
    }
    if (t_() === "windows") {
      let firstManifestFilePath = mo.join(manifestDirs[0], Q74);
      registerNativeHostInWindowsRegistry(firstManifestFilePath);
    }
    if (didInstallNew) isChromeExtensionInstalled().then(isInstalled => {
      if (isInstalled) N("[Claude in Chrome] First-time install detected, opening reconnect page in browser"), oG_(jFO).catch(EH);else N("[Claude in Chrome] First-time install detected, but extension not installed, skipping reconnect");
    }).catch(checkErr => N(`[Claude in Chrome] Failed to check extension installation during manifest install: ${checkErr}`, {
      level: "error"
    }));
  });
}

/** Registers the native host manifest path in the Windows registry for each supported browser. */
function registerNativeHostInWindowsRegistry(manifestFilePath: string): void {
  let browserRegistryEntries = $b8();
  for (let {
    browser: browserName,
    key: registryKey
  } of browserRegistryEntries) {
    let fullRegistryKey = `${registryKey}\\${QYq}`;
    c8("reg", ["add", fullRegistryKey, "/ve", "/t", "REG_SZ", "/d", manifestFilePath, "/f"]).then(result => {
      if (result.code === 0) N(`[Claude in Chrome] Registered native host for ${browserName} in Windows registry: ${fullRegistryKey}`);else N(`[Claude in Chrome] Failed to register native host for ${browserName} in Windows registry: ${result.stderr}`);
    });
  }
}

/** Creates (or reuses) the Chrome native host wrapper shell/bat script and returns its path. */
async function createChromeNativeHostWrapperScript(command: string): Promise<string> {
  let platform = t_(),
    chromeWrapperDir = mo.join(Y8(), "chrome"),
    wrapperScriptPath = platform === "windows" ? mo.join(chromeWrapperDir, "chrome-native-host.bat") : mo.join(chromeWrapperDir, "chrome-native-host"),
    wrapperContent = platform === "windows" ? `@echo off
REM Chrome native host wrapper script
REM Generated by Claude Code - do not edit manually
${command}
` : `#!/bin/sh
# Chrome native host wrapper script
# Generated by Claude Code - do not edit manually
exec ${command}
`;
  if ((await y_H.readFile(wrapperScriptPath, "utf-8").catch(() => null)) === wrapperContent) return wrapperScriptPath;
  if (await y_H.mkdir(chromeWrapperDir, {
    recursive: !0
  }), await y_H.writeFile(wrapperScriptPath, wrapperContent), platform !== "windows") await y_H.chmod(wrapperScriptPath, 493);
  return N(`[Claude in Chrome] Created Chrome native host wrapper script: ${wrapperScriptPath}`), wrapperScriptPath;
}

/** Reads the cached extension-installed flag from config; triggers an async refresh and caches the result. */
function checkAndCacheChromeExtensionInstalled(): boolean {
  return isChromeExtensionInstalled().then(isInstalled => {
    if (!isInstalled) return;
    if (C_().cachedChromeExtensionInstalled !== isInstalled) P6((config: any) => ({
      ...config,
      cachedChromeExtensionInstalled: isInstalled
    }));
  }).catch(err => N(`[Claude in Chrome] Failed to check extension installation during cache refresh: ${err}`, {
    level: "error"
  })), C_().cachedChromeExtensionInstalled ?? !1;
}

/** Checks whether the Claude Chrome extension is currently installed by scanning known extension paths. */
async function isChromeExtensionInstalled(): Promise<boolean> {
  let extensionPaths = Tb8();
  if (extensionPaths.length === 0) return N(`[Claude in Chrome] Unsupported platform for extension detection: ${t_()}`), !1;
  return F74(extensionPaths, N);
}

var y_H: typeof import("fs/promises"),
  d74: typeof import("os"),
  mo: typeof import("path"),
  gYq: typeof import("url"),
  jFO = "https://clau.de/chrome/reconnect",
  QYq = "com.anthropic.claude_code_browser_extension",
  Q74: string,
  /** Cached result of shouldAutoEnableClaudeInChrome(). */
  cachedAutoEnableResult: boolean | undefined = void 0,
  /** Whether Claude in Chrome has been wired (connected) this session. */
  claudeInChromeWiredThisSession: boolean = !1;

var D1H = L(() => {
  w_();
  M6();
  o6();
  Mq();
  T8();
  FH();
  _q();
  A6();
  l7();
  S6();
  y9();
  H6();
  gN();
  Tm6();
  g74();
  y_H = require("fs/promises"), d74 = require("os"), mo = require("path"), gYq = require("url"), Q74 = `${QYq}.json`;
});

export {nYq as SSo,shouldEnableClaudeInChrome,shouldAutoEnableClaudeInChrome,_resetShouldAutoEnableForTesting,isClaudeInChromeWiredThisSession,_resetClaudeInChromeWiredForTesting,markClaudeInChromeUnwired,markClaudeInChromeUnwiredIfChrome,shouldSuppressChromeOffer,getClaudeInChromeMcpServerConfig,setupClaudeInChrome,getNativeHostManifestDirs as Izp,installChromeNativeHostManifest,registerNativeHostInWindowsRegistry as Dzp,createChromeNativeHostWrapperScript as Ppl,checkAndCacheChromeExtensionInstalled as Pzp,isChromeExtensionInstalled,y_H as vne,d74 as Opl,mo as CJ,gYq as hSo,jFO as xzp,QYq as gSo,Q74 as Dpl,cachedAutoEnableResult as j6t,claudeInChromeWiredThisSession as W6t,D1H as rye};
