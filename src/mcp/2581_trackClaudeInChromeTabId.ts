// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {ds as $7,bt as L_} from "../../vendor/m195.ts";
import {yA as G$,XI as mR} from "../../vendor/m459.ts";
import {collectFlagValueIndexes as O1} from "./0728_serverName.ts";
import {Oe as IH,Ie as vH,ln as M6} from "../telemetry/0594_feature_name.ts";
import {execFileNoThrow as B6,oa as l7} from "../../vendor/m684.ts";
import {lF as Mp,Mw as CW} from "../config/2221_recursive.ts";
// Module: mcp / Claude-in-Chrome browser bridge
//
// Provides discovery and integration support for the "Claude in Chrome" MCP
// server. Responsibilities:
//   - Detect which Chromium-based browser is installed (Chrome, Brave, Arc,
//     Edge, Chromium, Vivaldi, Opera) across macOS / Linux / WSL / Windows.
//   - Resolve per-browser, per-platform filesystem locations (user data dir,
//     native-messaging-hosts dir, Windows registry keys).
//   - Open URLs in the detected browser.
//   - Compute the Unix-socket / Windows-named-pipe path used by the local
//     MCP browser bridge.
//   - Track a bounded set of Chrome tab IDs that Claude is currently driving.
//
// 1:1 restoration: only identifiers, types, and comments were changed. All
// control flow, operators, and string literals are preserved exactly.

// ---------------------------------------------------------------------------
// Type model (inferred from usage)
// ---------------------------------------------------------------------------

/** Host platform classification returned by `t_()`. */
type Platform = "macos" | "linux" | "wsl" | "windows";

/** Per-browser configuration for macOS. */
interface BrowserMacosConfig {
  /** Application bundle display name, e.g. `"Google Chrome"`. */
  appName: string;
  /** Path segments (relative to $HOME) to the browser's user-data directory. */
  dataPath: string[];
  /** Path segments (relative to $HOME) to the native-messaging-hosts directory. */
  nativeMessagingPath: string[];
}

/** Per-browser configuration for Linux / WSL. */
interface BrowserLinuxConfig {
  /** Candidate executable names to probe on $PATH. */
  binaries: string[];
  /** Path segments (relative to $HOME) to the browser's user-data directory. */
  dataPath: string[];
  /** Path segments (relative to $HOME) to the native-messaging-hosts directory. */
  nativeMessagingPath: string[];
}

/** Per-browser configuration for Windows. */
interface BrowserWindowsConfig {
  /** Path segments (relative to the AppData root) to the user-data directory. */
  dataPath: string[];
  /** Optional registry key holding the native-messaging host registration. */
  registryKey?: string;
  /** When true, the data path lives under AppData\Roaming instead of AppData\Local. */
  useRoaming?: boolean;
}

/** Full descriptor for a supported Chromium-based browser. */
interface BrowserDescriptor {
  /** Human-readable browser name used in log output. */
  name: string;
  macos: BrowserMacosConfig;
  linux: BrowserLinuxConfig;
  windows: BrowserWindowsConfig;
}

/** Identifier of a supported browser; keys of {@link CHROMIUM_BROWSERS}. */
type BrowserId = "chrome" | "brave" | "arc" | "chromium" | "edge" | "vivaldi" | "opera";

/** A browser paired with a resolved filesystem path. */
interface BrowserPath {
  browser: BrowserId;
  path: string;
}

/** A browser paired with a Windows registry key. */
interface BrowserRegistryKey {
  browser: BrowserId;
  key: string;
}

// ---------------------------------------------------------------------------
// Export registration (esbuild __export interop)
// ---------------------------------------------------------------------------

var claudeInChromeExports = {};
j_(claudeInChromeExports, {
  trackClaudeInChromeTabId: () => trackClaudeInChromeTabId,
  openInChrome: () => openInChrome,
  isTrackedClaudeInChromeTabId: () => isTrackedClaudeInChromeTabId,
  isInProductPermissionsEnabled: () => isInProductPermissionsEnabled,
  isClaudeInChromeMCPServer: () => isClaudeInChromeMCPServer,
  getSocketDir: () => getSocketDir,
  getSecureSocketPath: () => getSecureSocketPath,
  getAllWindowsRegistryKeys: () => getAllWindowsRegistryKeys,
  getAllSocketPaths: () => getAllSocketPaths,
  getAllNativeMessagingHostsDirs: () => getAllNativeMessagingHostsDirs,
  getAllBrowserDataPaths: () => getAllBrowserDataPaths,
  detectAvailableBrowser: () => detectAvailableBrowser,
  _resetTrackedTabIdsForTesting: () => _resetTrackedTabIdsForTesting,
  CLAUDE_IN_CHROME_MCP_SERVER_NAME: () => CLAUDE_IN_CHROME_MCP_SERVER_NAME,
  CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL: () => CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,
  CHROMIUM_BROWSERS: () => CHROMIUM_BROWSERS,
  CFC_TOOL_PREFIX: () => CFC_TOOL_PREFIX,
  BROWSER_DETECTION_ORDER: () => BROWSER_DETECTION_ORDER
});

/**
 * Whether the in-product (browser-side) permissions experience is enabled via
 * the `tengu_cfc_in_product_permissions` feature gate.
 */
function isInProductPermissionsEnabled(): boolean {
  return Y_("tengu_cfc_in_product_permissions", !1);
}

/**
 * Resolve, for every known browser, the absolute path to its user-data
 * directory on the current platform. Browsers without a configured data path
 * for the platform are skipped.
 */
function getAllBrowserDataPaths(): BrowserPath[] {
  let platform = t_(),
    home = os.homedir(),
    results: BrowserPath[] = [];
  for (let browserId of BROWSER_DETECTION_ORDER) {
    let browser = CHROMIUM_BROWSERS[browserId],
      dataPathSegments: string[] | undefined;
    switch (platform) {
      case "macos":
        dataPathSegments = browser.macos.dataPath;
        break;
      case "linux":
      case "wsl":
        dataPathSegments = browser.linux.dataPath;
        break;
      case "windows":
        {
          if (browser.windows.dataPath.length > 0) {
            let appDataRoot = browser.windows.useRoaming ? path.join(home, "AppData", "Roaming") : path.join(home, "AppData", "Local");
            results.push({
              browser: browserId,
              path: path.join(appDataRoot, ...browser.windows.dataPath)
            });
          }
          continue;
        }
    }
    if (dataPathSegments && dataPathSegments.length > 0) results.push({
      browser: browserId,
      path: path.join(home, ...dataPathSegments)
    });
  }
  return results;
}

/**
 * Resolve, for every known browser, the absolute path to its
 * native-messaging-hosts directory on the current platform. Windows uses the
 * registry instead, so it yields nothing here.
 */
function getAllNativeMessagingHostsDirs(): BrowserPath[] {
  let platform = t_(),
    home = os.homedir(),
    results: BrowserPath[] = [];
  for (let browserId of BROWSER_DETECTION_ORDER) {
    let browser = CHROMIUM_BROWSERS[browserId];
    switch (platform) {
      case "macos":
        if (browser.macos.nativeMessagingPath.length > 0) results.push({
          browser: browserId,
          path: path.join(home, ...browser.macos.nativeMessagingPath)
        });
        break;
      case "linux":
      case "wsl":
        if (browser.linux.nativeMessagingPath.length > 0) results.push({
          browser: browserId,
          path: path.join(home, ...browser.linux.nativeMessagingPath)
        });
        break;
      case "windows":
        break;
    }
  }
  return results;
}

/**
 * Collect the Windows registry keys under which each browser registers its
 * native-messaging host. Returns one entry per browser that declares a key.
 */
function getAllWindowsRegistryKeys(): BrowserRegistryKey[] {
  let results: BrowserRegistryKey[] = [];
  for (let browserId of BROWSER_DETECTION_ORDER) {
    let browser = CHROMIUM_BROWSERS[browserId];
    if (browser.windows.registryKey) results.push({
      browser: browserId,
      key: browser.windows.registryKey
    });
  }
  return results;
}

/**
 * Probe the system for an installed, supported Chromium-based browser, honoring
 * {@link BROWSER_DETECTION_ORDER}. Returns the first browser id found, or
 * `null` if none is detected.
 */
async function detectAvailableBrowser(): Promise<BrowserId | null> {
  let platform = t_();
  for (let browserId of BROWSER_DETECTION_ORDER) {
    let browser = CHROMIUM_BROWSERS[browserId];
    switch (platform) {
      case "macos":
        {
          let appPath = `/Applications/${browser.macos.appName}.app`;
          try {
            if ((await fsPromises.stat(appPath)).isDirectory()) return N(`[Claude in Chrome] Detected browser: ${browser.name}`), browserId;
          } catch (err) {
            if (!$7(err)) throw err;
          }
          break;
        }
      case "wsl":
      case "linux":
        {
          for (let binary of browser.linux.binaries) if (await G$(binary).catch(() => null)) return N(`[Claude in Chrome] Detected browser: ${browser.name}`), browserId;
          break;
        }
      case "windows":
        {
          let home = os.homedir();
          if (browser.windows.dataPath.length > 0) {
            let appDataRoot = browser.windows.useRoaming ? path.join(home, "AppData", "Roaming") : path.join(home, "AppData", "Local"),
              dataDir = path.join(appDataRoot, ...browser.windows.dataPath);
            try {
              if ((await fsPromises.stat(dataDir)).isDirectory()) return N(`[Claude in Chrome] Detected browser: ${browser.name}`), browserId;
            } catch (err) {
              if (!$7(err)) throw err;
            }
          }
          break;
        }
    }
  }
  return null;
}

/** Whether the given MCP server descriptor is the Claude-in-Chrome server. */
function isClaudeInChromeMCPServer(server: unknown): boolean {
  return O1(server) === CLAUDE_IN_CHROME_MCP_SERVER_NAME;
}

/**
 * Record a Chrome tab id as being driven by Claude. The set is bounded to
 * {@link MAX_TRACKED_TAB_IDS}; once full, adding a new id clears the whole set
 * first (acting as a coarse eviction policy).
 */
function trackClaudeInChromeTabId(tabId: number): void {
  if (trackedTabIds.size >= MAX_TRACKED_TAB_IDS && !trackedTabIds.has(tabId)) trackedTabIds.clear();
  trackedTabIds.add(tabId);
}

/** Whether the given Chrome tab id is currently tracked as Claude-driven. */
function isTrackedClaudeInChromeTabId(tabId: number): boolean {
  return trackedTabIds.has(tabId);
}

/** Test-only helper that clears all tracked tab ids. */
function _resetTrackedTabIdsForTesting(): void {
  trackedTabIds.clear();
}

/**
 * Open a URL in the detected Chromium-based browser using the platform's
 * native launcher. Emits success/failure telemetry and returns whether the
 * launch succeeded.
 */
async function openInChrome(url: string): Promise<boolean> {
  let platform = t_(),
    browserId = await detectAvailableBrowser();
  if (!browserId) return N("[Claude in Chrome] No compatible browser found"), IH("chrome_open_url", "no_browser"), !1;
  let browser = CHROMIUM_BROWSERS[browserId];
  switch (platform) {
    case "macos":
      {
        let {
          code: exitCode
        } = await B6("open", ["-a", browser.macos.appName, url]);
        if (exitCode === 0) return vH("chrome_open_url"), !0;
        return IH("chrome_open_url", "exec_failed"), !1;
      }
    case "windows":
      {
        let {
          code: exitCode
        } = await B6("rundll32", ["url,OpenURL", url]);
        if (exitCode === 0) return vH("chrome_open_url"), !0;
        return IH("chrome_open_url", "exec_failed"), !1;
      }
    case "wsl":
    case "linux":
      {
        for (let binary of browser.linux.binaries) {
          let {
            code: exitCode
          } = await B6(binary, [url]);
          if (exitCode === 0) return vH("chrome_open_url"), !0;
        }
        return IH("chrome_open_url", "exec_failed"), !1;
      }
    default:
      return IH("chrome_open_url", "exec_failed"), !1;
  }
}

/** Directory under /tmp holding the per-user MCP browser-bridge sockets. */
function getSocketDir(): string {
  return `/tmp/claude-mcp-browser-bridge-${getCurrentUsername()}`;
}

/**
 * The canonical socket path the MCP browser bridge should listen on:
 * a Windows named pipe, or a per-process `.sock` file under {@link getSocketDir}.
 */
function getSecureSocketPath(): string {
  if (os.platform() === "win32") return `\\\\.\\pipe\\${getWindowsPipeName()}`;
  return path.join(getSocketDir(), `${process.pid}.sock`);
}

/**
 * Enumerate all candidate socket paths the bridge might be reachable at:
 * existing `.sock` files in the socket dir plus the bridge dir under both the
 * configured temp dir and the hardcoded `/tmp` location.
 */
function getAllSocketPaths(): string[] {
  if (os.platform() === "win32") return [`\\\\.\\pipe\\${getWindowsPipeName()}`];
  let paths: string[] = [],
    socketDir = getSocketDir();
  try {
    let entries = fs.readdirSync(socketDir);
    for (let entry of entries) if (entry.endsWith(".sock")) paths.push(path.join(socketDir, entry));
  } catch {}
  let bridgeDirName = `claude-mcp-browser-bridge-${getCurrentUsername()}`,
    tmpDirBridgePath = path.join(Mp(), bridgeDirName),
    slashTmpBridgePath = `/tmp/${bridgeDirName}`;
  if (!paths.includes(tmpDirBridgePath)) paths.push(tmpDirBridgePath);
  if (tmpDirBridgePath !== slashTmpBridgePath && !paths.includes(slashTmpBridgePath)) paths.push(slashTmpBridgePath);
  return paths;
}

/** Per-user Windows named-pipe identifier for the MCP browser bridge. */
function getWindowsPipeName(): string {
  return `claude-mcp-browser-bridge-${getCurrentUsername()}`;
}

/**
 * Current OS username, used to namespace the bridge socket/pipe per user.
 * Falls back to the USER / USERNAME env vars, then `"default"`.
 */
function getCurrentUsername(): string {
  try {
    return os.userInfo().username || "default";
  } catch {
    return process.env.USER || process.env.USERNAME || "default";
  }
}

var fs: typeof import("fs"),
  fsPromises: typeof import("fs/promises"),
  os: typeof import("os"),
  path: typeof import("path"),
  /** MCP server name for the Claude-in-Chrome integration. */
  CLAUDE_IN_CHROME_MCP_SERVER_NAME = "claude-in-chrome",
  /** Tool-name prefix for Claude-in-Chrome MCP tools (`mcp__claude-in-chrome__`). */
  CFC_TOOL_PREFIX: string,
  /** Permission-rule tool name used for per-domain Claude-in-Chrome rules. */
  CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL = "ClaudeInChromeDomain",
  /** Map of supported browser descriptors keyed by {@link BrowserId}. */
  CHROMIUM_BROWSERS: Record<BrowserId, BrowserDescriptor>,
  /** Order in which browsers are probed during detection. */
  BROWSER_DETECTION_ORDER: BrowserId[],
  /** Upper bound on the number of simultaneously tracked Claude tab ids. */
  MAX_TRACKED_TAB_IDS = 200,
  /** Set of Chrome tab ids currently being driven by Claude. */
  trackedTabIds: Set<number>;
var initModule = L(() => {
  M6();
  o6();
  FH();
  L_();
  l7();
  y9();
  CW();
  mR();
  fs = require("fs"), fsPromises = require("fs/promises"), os = require("os"), path = require("path"), CFC_TOOL_PREFIX = `mcp__${CLAUDE_IN_CHROME_MCP_SERVER_NAME}__`;
  CHROMIUM_BROWSERS = {
    chrome: {
      name: "Google Chrome",
      macos: {
        appName: "Google Chrome",
        dataPath: ["Library", "Application Support", "Google", "Chrome"],
        nativeMessagingPath: ["Library", "Application Support", "Google", "Chrome", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["google-chrome", "google-chrome-stable"],
        dataPath: [".config", "google-chrome"],
        nativeMessagingPath: [".config", "google-chrome", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["Google", "Chrome", "User Data"],
        registryKey: "HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts"
      }
    },
    brave: {
      name: "Brave",
      macos: {
        appName: "Brave Browser",
        dataPath: ["Library", "Application Support", "BraveSoftware", "Brave-Browser"],
        nativeMessagingPath: ["Library", "Application Support", "BraveSoftware", "Brave-Browser", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["brave-browser", "brave"],
        dataPath: [".config", "BraveSoftware", "Brave-Browser"],
        nativeMessagingPath: [".config", "BraveSoftware", "Brave-Browser", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["BraveSoftware", "Brave-Browser", "User Data"],
        registryKey: "HKCU\\Software\\BraveSoftware\\Brave-Browser\\NativeMessagingHosts"
      }
    },
    arc: {
      name: "Arc",
      macos: {
        appName: "Arc",
        dataPath: ["Library", "Application Support", "Arc", "User Data"],
        nativeMessagingPath: ["Library", "Application Support", "Arc", "User Data", "NativeMessagingHosts"]
      },
      linux: {
        binaries: [],
        dataPath: [],
        nativeMessagingPath: []
      },
      windows: {
        dataPath: ["Arc", "User Data"],
        registryKey: "HKCU\\Software\\ArcBrowser\\Arc\\NativeMessagingHosts"
      }
    },
    chromium: {
      name: "Chromium",
      macos: {
        appName: "Chromium",
        dataPath: ["Library", "Application Support", "Chromium"],
        nativeMessagingPath: ["Library", "Application Support", "Chromium", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["chromium", "chromium-browser"],
        dataPath: [".config", "chromium"],
        nativeMessagingPath: [".config", "chromium", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["Chromium", "User Data"],
        registryKey: "HKCU\\Software\\Chromium\\NativeMessagingHosts"
      }
    },
    edge: {
      name: "Microsoft Edge",
      macos: {
        appName: "Microsoft Edge",
        dataPath: ["Library", "Application Support", "Microsoft Edge"],
        nativeMessagingPath: ["Library", "Application Support", "Microsoft Edge", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["microsoft-edge", "microsoft-edge-stable"],
        dataPath: [".config", "microsoft-edge"],
        nativeMessagingPath: [".config", "microsoft-edge", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["Microsoft", "Edge", "User Data"],
        registryKey: "HKCU\\Software\\Microsoft\\Edge\\NativeMessagingHosts"
      }
    },
    vivaldi: {
      name: "Vivaldi",
      macos: {
        appName: "Vivaldi",
        dataPath: ["Library", "Application Support", "Vivaldi"],
        nativeMessagingPath: ["Library", "Application Support", "Vivaldi", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["vivaldi", "vivaldi-stable"],
        dataPath: [".config", "vivaldi"],
        nativeMessagingPath: [".config", "vivaldi", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["Vivaldi", "User Data"],
        registryKey: "HKCU\\Software\\Vivaldi\\NativeMessagingHosts"
      }
    },
    opera: {
      name: "Opera",
      macos: {
        appName: "Opera",
        dataPath: ["Library", "Application Support", "com.operasoftware.Opera"],
        nativeMessagingPath: ["Library", "Application Support", "com.operasoftware.Opera", "NativeMessagingHosts"]
      },
      linux: {
        binaries: ["opera"],
        dataPath: [".config", "opera"],
        nativeMessagingPath: [".config", "opera", "NativeMessagingHosts"]
      },
      windows: {
        dataPath: ["Opera Software", "Opera Stable"],
        registryKey: "HKCU\\Software\\Opera Software\\Opera Stable\\NativeMessagingHosts",
        useRoaming: !0
      }
    }
  }, BROWSER_DETECTION_ORDER = ["chrome", "brave", "arc", "edge", "chromium", "vivaldi", "opera"];
  trackedTabIds = new Set();
});

export {claudeInChromeExports as C0i,isInProductPermissionsEnabled,getAllBrowserDataPaths,getAllNativeMessagingHostsDirs,getAllWindowsRegistryKeys,detectAvailableBrowser,isClaudeInChromeMCPServer,trackClaudeInChromeTabId,isTrackedClaudeInChromeTabId,_resetTrackedTabIdsForTesting,openInChrome,getSocketDir,getSecureSocketPath,getAllSocketPaths,getWindowsPipeName as E0i,getCurrentUsername as $3r,fs as S0i,fsPromises as L3r,os as EAe,path as M5,CLAUDE_IN_CHROME_MCP_SERVER_NAME,CFC_TOOL_PREFIX,CLAUDE_IN_CHROME_DOMAIN_RULE_TOOL,CHROMIUM_BROWSERS,BROWSER_DETECTION_ORDER,MAX_TRACKED_TAB_IDS as JAd,trackedTabIds as Het,initModule as oL};
