// @ts-nocheck
import {getAncestorPidsAsync as Sxr,lE} from "../../vendor/m1461.ts";
import {Ne} from "../../vendor/m583.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Jo,Ce,IXt,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {qt,tn} from "./0230_encoding.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {or,dn} from "./0137_namespace.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {awe,FOi,SRn} from "../../vendor/m2519.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {cT,vu} from "../mcp/2200_mcpServerName.ts";
import {He,xe,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {getIsScrollDraining as WLe,getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {nt} from "../../vendor/m127.ts";
import {WM,E8} from "./2192_terminal.ts";
import {execFileNoThrowWithCwd as Wr,execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {Fia,Bia} from "../../vendor/m3187.ts";
import {QQ} from "../../vendor/m2214.ts";
import {Nv,zN} from "../../vendor/m688.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {z9e,eDn} from "../../vendor/m3186.ts";
import {xee,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {xXr,Gia} from "../../vendor/m3190.ts";
import {oo,b,x} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {_k} from "../core/0576_isCancel.ts";
import {Ir} from "../../vendor/m584.ts";
import {resolveToolAlias as UR} from "./2229_observed_uid.ts";
// Check if a process is alive by sending signal 0
function Qia(pid: number): boolean {
  try {
    return process.kill(pid, 0), !0;
  } catch {
    return !1;
  }
}

// Returns a memoized async function that resolves the ancestor PIDs of the parent process
function d7d(): () => Promise<Set<number>> {
  let cachedPromise: Promise<Set<number>> | null = null;
  return () => {
    if (!cachedPromise) cachedPromise = Sxr(process.ppid, 10).then((pids: number[]) => new Set(pids));
    return cachedPromise;
  };
}

// Returns true if the given terminal is a VS Code-family IDE
function rDn(terminalName: string | undefined): boolean {
  if (!terminalName) return !1;
  let ideEntry: any = Jst[terminalName];
  return ideEntry && ideEntry.ideKind === "vscode";
}

// Returns true if the given terminal is a JetBrains IDE
function Iee(terminalName: string | undefined): boolean {
  if (!terminalName) return !1;
  let ideEntry: any = Jst[terminalName];
  return ideEntry && ideEntry.ideKind === "jetbrains";
}

// Get the terminal name from the environment (only in code-terminal mode)
function DXr(): string | null {
  if (!cB()) return null;
  return Ne.terminal;
}

// Determine if IDE auto-connect should be enabled
function Xst(forceEnable: boolean = !1): boolean {
  if (Ne.CLAUDE_CODE_AUTO_CONNECT_IDE === !1) return !1;
  return Boolean(Ot().autoConnectIde || forceEnable || cB() || Ne.CLAUDE_CODE_SSE_PORT !== void 0 || Ne.CLAUDE_CODE_AUTO_CONNECT_IDE === !0);
}

// Find all IDE lock files sorted by modification time (newest first)
async function sDn(): Promise<string[]> {
  try {
    let lockfileDirs: string[] = await m7d();
    return (await Promise.all(lockfileDirs.map(async (dirPath: string) => {
      try {
        let lockFiles: any[] = (await Wt().readdir(dirPath)).filter((entry: any) => entry.name.endsWith(".lock"));
        return (await Promise.all(lockFiles.map(async (entry: any) => {
          let filePath: string = WO.join(dirPath, entry.name);
          try {
            let stat: any = await Wt().stat(filePath);
            return {
              path: filePath,
              mtime: stat.mtime
            };
          } catch {
            return null;
          }
        }))).filter((item: any) => item !== null);
      } catch (err: any) {
        if (!Jo(err)) Ie(err);
        return [];
      }
    }))).flat().sort((fileA: any, fileB: any) => fileB.mtime.getTime() - fileA.mtime.getTime()).map((item: any) => item.path);
  } catch (err: any) {
    return Ie(err), [];
  }
}

// Parse an IDE lock file and return its structured contents
async function Zia(lockFilePath: string): Promise<any | null> {
  try {
    let rawContent: string = await Wt().readFile(lockFilePath, {
        encoding: "utf-8"
      }),
      workspaceFolders: string[] = [],
      pid: number | undefined,
      ideName: string | undefined,
      useWebSocket: boolean = !1,
      runningInWindows: boolean = !1,
      authToken: string | undefined;
    try {
      let parsed: any = qt(rawContent);
      if (parsed.workspaceFolders) workspaceFolders = parsed.workspaceFolders;
      pid = parsed.pid, ideName = parsed.ideName, useWebSocket = parsed.transport === "ws", runningInWindows = parsed.runningInWindows === !0, authToken = parsed.authToken;
    } catch (parseErr: any) {
      workspaceFolders = rawContent.split(`
`).map((line: string) => line.trim());
    }
    let fileName: string | undefined = lockFilePath.split(WO.sep).pop();
    if (!fileName) return null;
    let portStr: string = fileName.replace(".lock", "");
    return {
      workspaceFolders,
      port: parseInt(portStr),
      pid,
      ideName,
      useWebSocket,
      runningInWindows,
      authToken
    };
  } catch (err: any) {
    return A(`Failed to read IDE lockfile ${lockFilePath}: ${Ce(err)}`, {
      level: "error"
    }), null;
  }
}

// Test TCP connectivity to a host:port with a timeout (default 500ms)
async function PXr(host: string, port: number, timeoutMs: number = 500): Promise<boolean> {
  try {
    return new Promise((resolve: (v: boolean) => void) => {
      let socket: any = Jia.createConnection({
        host,
        port,
        timeout: timeoutMs
      });
      socket.on("connect", () => {
        socket.destroy(), resolve(!0);
      }), socket.on("error", () => {
        resolve(!1);
      }), socket.on("timeout", () => {
        socket.destroy(), resolve(!1);
      });
    });
  } catch (err: any) {
    return !1;
  }
}

// Collect all directories that may contain IDE lock files (including WSL paths)
async function m7d(): Promise<string[]> {
  let searchDirs: string[] = [WO.join(or(), "ide")];
  if (process.env.CLAUDE_CONFIG_DIR?.trim()) searchDirs.push(WO.join(Xia.homedir(), ".claude", "ide").normalize("NFC"));
  if (Yt() === "wsl") {
    let windowsUserProfile: string | undefined = await p7d();
    if (windowsUserProfile) {
      let localPath: string = await new awe(process.env.WSL_DISTRO_NAME).toLocalPath(windowsUserProfile);
      searchDirs.push(WO.resolve(localPath, ".claude", "ide"));
    }
    try {
      let windowsUsers: any[] = await Wt().readdir("/mnt/c/Users");
      for (let userEntry of windowsUsers) {
        if (!userEntry.isDirectory() && !userEntry.isSymbolicLink()) continue;
        if (userEntry.name === "Public" || userEntry.name === "Default" || userEntry.name === "Default User" || userEntry.name === "All Users") continue;
        searchDirs.push(WO.join("/mnt/c/Users", userEntry.name, ".claude", "ide"));
      }
    } catch (err: any) {
      if (Jo(err)) A(`WSL IDE lockfile path detection failed (${err.code}): ${Ce(err)}`);else A(`WSL IDE lockfile path detection failed unexpectedly: ${Ce(err)}`, {
        level: "error"
      });
    }
  }
  let seenRealPaths: Set<string> = new Set(),
    dedupedDirs: string[] = [];
  for (let dirPath of searchDirs) {
    let realPath: string = await Yia.realpath(dirPath).catch(() => WO.resolve(dirPath));
    if (seenRealPaths.has(realPath)) continue;
    seenRealPaths.add(realPath), dedupedDirs.push(dirPath);
  }
  return dedupedDirs;
}

// Remove stale IDE lock files (those whose process is gone or port is unreachable)
async function f7d(): Promise<void> {
  try {
    let lockFiles: string[] = await sDn();
    for (let lockFile of lockFiles) {
      let lockData: any = await Zia(lockFile);
      if (!lockData) {
        try {
          await Wt().unlink(lockFile);
        } catch (unlinkErr: any) {
          A(`Failed to delete unreadable IDE lockfile ${lockFile}: ${unlinkErr}`, {
            level: "error"
          });
        }
        continue;
      }
      let ideHost: string = await caa(lockData.runningInWindows, lockData.port),
        isStale: boolean = !1;
      if (lockData.pid) {
        if (!Qia(lockData.pid)) {
          if (Yt() !== "wsl") isStale = !0;else if (!(await PXr(ideHost, lockData.port))) isStale = !0;
        }
      } else if (!(await PXr(ideHost, lockData.port))) isStale = !0;
      if (isStale) try {
        await Wt().unlink(lockFile);
      } catch (unlinkErr: any) {
        A(`Failed to remove stale IDE lockfile ${lockFile}: ${Ce(unlinkErr)}`, {
          level: "error"
        });
      }
    }
  } catch (err: any) {
    Ie(err);
  }
}

// Install the Claude Code extension into the detected IDE
async function h7d(ideType: any): Promise<any> {
  try {
    let installedVersion: any = await _7d(ideType);
    if (W("tengu_ext_installed", {
      ide_type: Le(ideType),
      installed_version: installedVersion == null ? void 0 : cT(installedVersion)
    }), He("ide_extension_install"), !Ot().diffTool) hn((cfg: any) => ({
      ...cfg,
      diffTool: "auto"
    }));
    return {
      installed: !0,
      error: null,
      installedVersion,
      ideType
    };
  } catch (err: any) {
    W("tengu_ext_install_error", {
      ide_type: Le(ideType),
      error_code: IXt(err)
    }), xe("ide_extension_install", "ide_extension_install_failed");
    let errMsg: string = err instanceof Error ? err.message : String(err);
    return A(`IDE extension install failed: ${errMsg}`, {
      level: "error"
    }), {
      installed: !1,
      error: errMsg,
      installedVersion: null,
      ideType
    };
  }
}

// Poll for a single valid IDE connection, aborting any previous poll
async function nDn(): Promise<any | null> {
  if (Y9e) Y9e.abort();
  Y9e = kl();
  let abortSignal: any = Y9e.signal;
  await f7d();
  let startTime: number = Date.now();
  while (Date.now() - startTime < 30000 && !abortSignal.aborted) {
    if (WLe()) {
      await Kn(1000, abortSignal);
      continue;
    }
    let ideList: any[] = await aDn(!1);
    if (abortSignal.aborted) return null;
    if (ideList.length === 1) return ideList[0];
    await Kn(1000, abortSignal);
  }
  return null;
}

// Cancel the current IDE detection poll
function iDn(): void {
  if (Y9e) Y9e.abort(), Y9e = null;
}

// Enumerate available IDE connections, filtering to workspace-matching ones
async function aDn(includeAll: boolean): Promise<any[]> {
  let results: any[] = [];
  try {
    let ssePortEnv: string | undefined = process.env.CLAUDE_CODE_SSE_PORT,
      forcedPort: number | null = ssePortEnv ? parseInt(ssePortEnv) : null,
      normalizedCwd: string = gr().normalize("NFC"),
      lockFiles: string[] = await sDn(),
      parsedLocks: any[] = await Promise.all(lockFiles.map(Zia)),
      getAncestorPids: any = d7d(),
      isCodeTerminal: boolean = Yt() !== "wsl" && cB();
    for (let lockData of parsedLocks) {
      if (!lockData) continue;
      let isValid: boolean = !1;
      if (nt(process.env.CLAUDE_CODE_IDE_SKIP_VALID_CHECK)) isValid = !0;else if (lockData.port === forcedPort) isValid = !0;else for (let folder of lockData.workspaceFolders) {
        if (!folder) continue;
        let resolvedFolder: string = folder;
        if (Yt() === "wsl" && lockData.runningInWindows && process.env.WSL_DISTRO_NAME) {
          if (!FOi(folder, process.env.WSL_DISTRO_NAME)) continue;
          let normalizedWslPath: string = WO.resolve(resolvedFolder).normalize("NFC");
          if (normalizedCwd === normalizedWslPath || normalizedCwd.startsWith(normalizedWslPath + WO.sep)) {
            isValid = !0;
            break;
          }
          resolvedFolder = await new awe(process.env.WSL_DISTRO_NAME).toLocalPath(folder);
        }
        let normalizedFolder: string = WO.resolve(resolvedFolder).normalize("NFC");
        if (Yt() === "windows") {
          let cwdUpper: string = normalizedCwd.replace(/^[a-zA-Z]:/, (driveLetter: string) => driveLetter.toUpperCase()),
            folderUpper: string = normalizedFolder.replace(/^[a-zA-Z]:/, (driveLetter: string) => driveLetter.toUpperCase());
          if (cwdUpper === folderUpper || cwdUpper.startsWith(folderUpper + WO.sep)) {
            isValid = !0;
            break;
          }
          continue;
        }
        if (normalizedCwd === normalizedFolder || normalizedCwd.startsWith(normalizedFolder + WO.sep)) {
          isValid = !0;
          break;
        }
      }
      if (!isValid && !includeAll) continue;
      if (isCodeTerminal) {
        if (!(forcedPort !== null && lockData.port === forcedPort)) {
          if (!lockData.pid || !Qia(lockData.pid)) continue;
          if (process.ppid !== lockData.pid) {
            if (!(await getAncestorPids()).has(lockData.pid)) continue;
          }
        }
      }
      let displayName: string = lockData.ideName ? naa(lockData.ideName) : cB() ? tH(WM.terminal) : "IDE",
        ideHost: string = await caa(lockData.runningInWindows, lockData.port),
        ideUrl: string;
      if (lockData.useWebSocket) ideUrl = `ws://${ideHost}:${lockData.port}`;else ideUrl = `http://${ideHost}:${lockData.port}/sse`;
      results.push({
        url: ideUrl,
        name: displayName,
        workspaceFolders: lockData.workspaceFolders,
        port: lockData.port,
        isValid,
        authToken: lockData.authToken,
        ideRunningInWindows: lockData.runningInWindows
      });
    }
    if (!includeAll && forcedPort) {
      let portMatches: any[] = results.filter((item: any) => item.isValid && item.port === forcedPort);
      if (portMatches.length === 1) return He("ide_detect"), portMatches;
    }
    He("ide_detect");
  } catch (err: any) {
    Ie(err), Pt("ide_detect", "ide_detect_failed");
  }
  return results;
}

// Notify the IDE that this Claude process has connected
async function eaa(mcpClient: any): Promise<void> {
  await mcpClient.notification({
    method: "ide_connected",
    params: {
      pid: process.pid
    }
  });
}

// Check if any connection in the list is an IDE connection
function J9e(connections: any[]): boolean {
  return connections.some((conn: any) => conn.type === "connected" && conn.name === "ide");
}

// Check if the Claude Code extension is already installed in the given IDE
async function Kia(ideKey: string): Promise<boolean> {
  if (rDn(ideKey)) {
    let cliPath: string | null = await lDn(ideKey);
    if (cliPath) try {
      if ((await Wr(cliPath, ["--list-extensions"], {
        env: LXr()
      })).stdout?.includes(g7d)) return !0;
    } catch {}
  } else if (Iee(ideKey)) return await Fia(ideKey);
  return !1;
}

// Install or verify the Claude Code extension and return its version
async function _7d(ideKey: string): Promise<string | null> {
  if (rDn(ideKey)) {
    let cliPath: string | null = await lDn(ideKey);
    if (cliPath) {
      let currentVersion: string | null = await y7d(cliPath);
      if (!currentVersion || QQ(currentVersion, zia())) {
        await Kn(500);
        let installResult: any = await Wr(cliPath, ["--force", "--install-extension", "anthropic.claude-code"], {
          env: LXr()
        });
        if (installResult.code !== 0) throw Object.assign(Error(`${installResult.code}: ${installResult.error} ${installResult.stderr}`), {
          code: `EXIT_${installResult.code}`
        });
        currentVersion = zia();
      }
      return currentVersion;
    }
  }
  return null;
}

// Build environment for running the VS Code CLI (clears DISPLAY on Linux)
function LXr(): NodeJS.ProcessEnv | undefined {
  if (Yt() === "linux") return {
    ...process.env,
    DISPLAY: ""
  };
  return;
}

// Return the current Claude Code extension version string
function zia(): string {
  return {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION;
}

// Query the installed version of the anthropic.claude-code extension via CLI
async function y7d(cliPath: string): Promise<string | null> {
  let {
      stdout: rawOutput
    } = await Fn(cliPath, ["--list-extensions", "--show-versions"], {
      env: LXr()
    }),
    lines: string[] = rawOutput?.split(`
`) || [];
  for (let line of lines) {
    let [extId, version] = line.split("@");
    if (extId === "anthropic.claude-code" && version) return version;
  }
  return null;
}

// Map an IDE name string to a canonical IDE key (e.g. "Cursor", "vscode")
function taa(ideName: string): string | null {
  let lowerName: string = ideName.toLowerCase();
  if (lowerName.includes("windsurf") || lowerName.includes("devin")) return "windsurf";
  if (lowerName.includes("cursor")) return "cursor";
  if (!lowerName.includes("insiders") && (lowerName.includes("vscode") || lowerName.includes("vs code") || lowerName.includes("visual studio code") || lowerName.includes("vscodium") || lowerName.includes("code - oss"))) return "vscode";
  return null;
}

// Remap "windsurf" references to "Devin Desktop" in an IDE name string
function naa(ideName: string): string {
  return ideName.replace(/windsurf/gi, "Devin Desktop");
}

// Resolve the CLI executable path for the given IDE key
async function lDn(ideKey: string, ideName?: string): Promise<string | null> {
  let candidateNames: string[] | undefined = S7d[ideKey];
  if (!candidateNames) return null;
  if (ideKey === "vscode" && ideName) candidateNames = ideName.toLowerCase().includes("vscodium") ? ["codium"] : ["code"];
  let cachedPath: string | null = await T7d();
  if (cachedPath && candidateNames.includes(WO.basename(cachedPath))) try {
    return await Wt().stat(cachedPath), cachedPath;
  } catch {}
  let platformExt: string = Yt() === "windows" ? ".cmd" : "";
  return candidateNames[0] + platformExt;
}

// Check if Cursor CLI is accessible
async function raa(): Promise<boolean> {
  return (await Fn("cursor", ["--version"])).code === 0;
}

// Check if Windsurf or Devin Desktop CLI is accessible
async function oaa(): Promise<boolean> {
  if ((await Fn("windsurf", ["--version"])).code === 0) return !0;
  return (await Fn("devin-desktop", ["--version"])).code === 0;
}

// Check if the VS Code CLI is accessible and is a real VS Code (not Cursor)
async function saa(): Promise<boolean> {
  let result: any = await Fn("code", ["--help"]);
  return result.code === 0 && Boolean(result.stdout?.includes("Visual Studio Code"));
}

// Detect which IDEs are currently running via process list inspection
async function b7d(): Promise<string[]> {
  let detectedIdes: string[] = [];
  try {
    let platform: string = Yt();
    if (platform === "macos") {
      let psOutput: string = (await Nv('ps aux | grep -E "Visual Studio Code|Code Helper|Cursor Helper|Windsurf Helper|Devin Helper|Devin.app|IntelliJ IDEA|PyCharm|WebStorm|PhpStorm|RubyMine|CLion|GoLand|Rider|DataGrip|AppCode|DataSpell|Aqua|Gateway|Fleet|Android Studio" | grep -v grep', {
        reject: !1
      })).stdout ?? "";
      for (let [ideKey, ideConfig] of Object.entries(Jst)) for (let keyword of (ideConfig as any).processKeywordsMac) if (psOutput.includes(keyword)) {
        detectedIdes.push(ideKey);
        break;
      }
    } else if (platform === "windows") {
      let tasksOutput: string = ((await Nv('tasklist | findstr /I "Code.exe Cursor.exe Windsurf.exe Devin.exe idea64.exe pycharm64.exe webstorm64.exe phpstorm64.exe rubymine64.exe clion64.exe goland64.exe rider64.exe datagrip64.exe appcode.exe dataspell64.exe aqua64.exe gateway64.exe fleet.exe studio64.exe"', {
        reject: !1
      })).stdout ?? "").toLowerCase();
      for (let [ideKey, ideConfig] of Object.entries(Jst)) for (let keyword of (ideConfig as any).processKeywordsWindows) if (tasksOutput.includes(keyword.toLowerCase())) {
        detectedIdes.push(ideKey);
        break;
      }
    } else if (platform === "linux") {
      let psOutput: string = ((await Nv('ps aux | grep -E "code|cursor|windsurf|devin-desktop|idea|pycharm|webstorm|phpstorm|rubymine|clion|goland|rider|datagrip|dataspell|aqua|gateway|fleet|android-studio" | grep -v grep', {
        reject: !1
      })).stdout ?? "").toLowerCase();
      for (let [ideKey, ideConfig] of Object.entries(Jst)) for (let keyword of (ideConfig as any).processKeywordsLinux) if (psOutput.includes(keyword)) {
        if (ideKey !== "vscode") {
          detectedIdes.push(ideKey);
          break;
        } else if (!psOutput.includes("cursor") && !psOutput.includes("appcode")) {
          detectedIdes.push(ideKey);
          break;
        }
      }
    }
  } catch (err: any) {
    A(`IDE process detection failed: ${err}`, {
      level: "error"
    });
  }
  return detectedIdes;
}

// Refresh the cached list of running IDEs
async function MXr(): Promise<string[]> {
  let freshList: string[] = await b7d();
  return OXr = freshList, freshList;
}

// Return the cached running IDE list, refreshing if not yet populated
async function iaa(): Promise<string[]> {
  if (OXr === null) return MXr();
  return OXr;
}

// Extract the connected IDE name from an active connection list
function nFt(connections: any[]): string | null {
  let ideConn: any = connections.find((conn: any) => conn.type === "connected" && conn.name === "ide");
  return NXr(ideConn);
}

// Resolve the display name from an IDE connection object
function NXr(ideConn: any): string | null {
  let config: any = ideConn?.config;
  return config?.type === "sse-ide" || config?.type === "ws-ide" ? naa(config.ideName) : cB() ? tH(WM.terminal) : null;
}

// Resolve a display name for a terminal/IDE string or key
function tH(terminalOrKey: string | undefined): string {
  if (!terminalOrKey) return "IDE";
  let ideEntry: any = Jst[terminalOrKey];
  if (ideEntry) return ideEntry.displayName;
  let aliasName: string | undefined = jia[terminalOrKey.toLowerCase().trim()];
  if (aliasName) return aliasName;
  let basename: string | null = mi(terminalOrKey, " "),
    lowerBasename: string | null = basename ? WO.basename(basename).toLowerCase() : null;
  if (lowerBasename) {
    let basenameAlias: string | undefined = jia[lowerBasename];
    if (basenameAlias) return basenameAlias;
    return z9e(lowerBasename);
  }
  return z9e(terminalOrKey);
}

// Find and return the connected IDE entry from a connection list
function X4(connections: any[]): any | undefined {
  if (!connections) return;
  let ideConn: any = connections.find((conn: any) => conn.type === "connected" && conn.name === "ide");
  return ideConn?.type === "connected" ? ideConn : void 0;
}

// Close all diff tabs in the connected IDE
async function aaa(mcpClient: any): Promise<void> {
  try {
    await xee("closeAllDiffTabs", {}, mcpClient);
  } catch (err: any) {}
}

// Start IDE detection polling and optionally trigger extension auto-install
async function laa(onIdeConnected: any, terminalOverride: any, onOnboarding: any, onInstallResult: any, abortSignal: any): Promise<void> {
  nDn().then(onIdeConnected);
  let autoInstall: boolean = Ot().autoInstallIdeExtension ?? !0;
  if (!nt(process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL) && autoInstall) {
    let terminalKey: string | null = terminalOverride ?? DXr();
    if (terminalKey) {
      if (rDn(terminalKey)) Kia(terminalKey).then(async (alreadyInstalled: boolean) => {
        h7d(terminalKey).catch((installErr: any) => ({
          installed: !1,
          error: installErr.message || "Installation failed",
          installedVersion: null,
          ideType: terminalKey
        })).then((installResult: any) => {
          if (onInstallResult(installResult), installResult?.installed && !abortSignal?.aborted) nDn().then(onIdeConnected);
          if (!alreadyInstalled && installResult?.installed === !0 && !Via().hasIdeOnboardingDialogBeenShown()) onOnboarding();
        });
      });else if (Iee(terminalKey)) Kia(terminalKey).then(async (alreadyInstalled: boolean) => {
        if (alreadyInstalled && !Via().hasIdeOnboardingDialogBeenShown()) onOnboarding();
      });
    }
  }
}
var Yia,
  Jia,
  Xia,
  WO,
  Via = () => (xXr(), oo(Gia)),
  Jst,
  tFt,
  oDn,
  cB,
  p7d,
  Y9e = null,
  g7d = "anthropic.claude-code",
  T7d,
  S7d,
  OXr = null,
  jia,
  caa;
var uS = b(() => {
  eDn();
  Wi();
  kt();
  vu();
  lt();
  mn();
  _k();
  Ew();
  tr();
  Ir();
  dn();
  Ii();
  ps();
  lE();
  Bia();
  vn();
  Es();
  zN();
  lr();
  UR();
  lh();
  qe();
  E8();
  Ct();
  SRn();
  tn();
  Yia = require("fs/promises"), Jia = require("net"), Xia = x(require("os")), WO = require("path");
  Jst = {
    cursor: {
      ideKind: "vscode",
      displayName: "Cursor",
      processKeywordsMac: ["Cursor Helper", "Cursor.app"],
      processKeywordsWindows: ["cursor.exe"],
      processKeywordsLinux: ["cursor"]
    },
    windsurf: {
      ideKind: "vscode",
      displayName: "Devin Desktop",
      processKeywordsMac: ["Windsurf Helper", "Windsurf.app", "Devin Helper", "Devin.app"],
      processKeywordsWindows: ["windsurf.exe", "Devin.exe"],
      processKeywordsLinux: ["windsurf", "devin-desktop"]
    },
    vscode: {
      ideKind: "vscode",
      displayName: "VS Code",
      processKeywordsMac: ["Visual Studio Code", "Code Helper"],
      processKeywordsWindows: ["code.exe"],
      processKeywordsLinux: ["code"]
    },
    intellij: {
      ideKind: "jetbrains",
      displayName: "IntelliJ IDEA",
      processKeywordsMac: ["IntelliJ IDEA"],
      processKeywordsWindows: ["idea64.exe"],
      processKeywordsLinux: ["idea", "intellij"]
    },
    pycharm: {
      ideKind: "jetbrains",
      displayName: "PyCharm",
      processKeywordsMac: ["PyCharm"],
      processKeywordsWindows: ["pycharm64.exe"],
      processKeywordsLinux: ["pycharm"]
    },
    webstorm: {
      ideKind: "jetbrains",
      displayName: "WebStorm",
      processKeywordsMac: ["WebStorm"],
      processKeywordsWindows: ["webstorm64.exe"],
      processKeywordsLinux: ["webstorm"]
    },
    phpstorm: {
      ideKind: "jetbrains",
      displayName: "PhpStorm",
      processKeywordsMac: ["PhpStorm"],
      processKeywordsWindows: ["phpstorm64.exe"],
      processKeywordsLinux: ["phpstorm"]
    },
    rubymine: {
      ideKind: "jetbrains",
      displayName: "RubyMine",
      processKeywordsMac: ["RubyMine"],
      processKeywordsWindows: ["rubymine64.exe"],
      processKeywordsLinux: ["rubymine"]
    },
    clion: {
      ideKind: "jetbrains",
      displayName: "CLion",
      processKeywordsMac: ["CLion"],
      processKeywordsWindows: ["clion64.exe"],
      processKeywordsLinux: ["clion"]
    },
    goland: {
      ideKind: "jetbrains",
      displayName: "GoLand",
      processKeywordsMac: ["GoLand"],
      processKeywordsWindows: ["goland64.exe"],
      processKeywordsLinux: ["goland"]
    },
    rider: {
      ideKind: "jetbrains",
      displayName: "Rider",
      processKeywordsMac: ["Rider"],
      processKeywordsWindows: ["rider64.exe"],
      processKeywordsLinux: ["rider"]
    },
    datagrip: {
      ideKind: "jetbrains",
      displayName: "DataGrip",
      processKeywordsMac: ["DataGrip"],
      processKeywordsWindows: ["datagrip64.exe"],
      processKeywordsLinux: ["datagrip"]
    },
    appcode: {
      ideKind: "jetbrains",
      displayName: "AppCode",
      processKeywordsMac: ["AppCode"],
      processKeywordsWindows: ["appcode.exe"],
      processKeywordsLinux: ["appcode"]
    },
    dataspell: {
      ideKind: "jetbrains",
      displayName: "DataSpell",
      processKeywordsMac: ["DataSpell"],
      processKeywordsWindows: ["dataspell64.exe"],
      processKeywordsLinux: ["dataspell"]
    },
    aqua: {
      ideKind: "jetbrains",
      displayName: "Aqua",
      processKeywordsMac: [],
      processKeywordsWindows: ["aqua64.exe"],
      processKeywordsLinux: []
    },
    gateway: {
      ideKind: "jetbrains",
      displayName: "Gateway",
      processKeywordsMac: [],
      processKeywordsWindows: ["gateway64.exe"],
      processKeywordsLinux: []
    },
    fleet: {
      ideKind: "jetbrains",
      displayName: "Fleet",
      processKeywordsMac: [],
      processKeywordsWindows: ["fleet.exe"],
      processKeywordsLinux: []
    },
    androidstudio: {
      ideKind: "jetbrains",
      displayName: "Android Studio",
      processKeywordsMac: ["Android Studio"],
      processKeywordsWindows: ["studio64.exe"],
      processKeywordsLinux: ["android-studio"]
    }
  };
  tFt = Hn(() => rDn(Ne.terminal)), oDn = Hn(() => Iee(WM.terminal)), cB = Hn(() => tFt() || oDn() || Boolean(process.env.FORCE_CODE_TERMINAL));
  p7d = Hn(async () => {
    if (process.env.USERPROFILE) return process.env.USERPROFILE;
    let {
      stdout: cmdOutput,
      code: exitCode
    } = await Fn("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "$env:USERPROFILE"]);
    if (exitCode === 0 && cmdOutput.trim()) return cmdOutput.trim();
    A("Unable to get Windows USERPROFILE via PowerShell - IDE detection may be incomplete");
    return;
  });
  T7d = Hn(async () => {
    try {
      if (Yt() !== "macos") return null;
      let parentPid: number = process.ppid;
      for (let depth: number = 0; depth < 10; depth++) {
        if (!parentPid || parentPid === 0 || parentPid === 1) break;
        let cmdLine: string = (await Fn("ps", ["-o", "command=", "-p", String(parentPid)])).stdout.trim();
        if (cmdLine) {
          let appToCli: any = {
              "Visual Studio Code.app": "code",
              "Cursor.app": "cursor",
              "Windsurf.app": "windsurf",
              "Devin.app": "devin",
              "Visual Studio Code - Insiders.app": "code",
              "VSCodium.app": "codium"
            },
            macOsContentsPath: string = "/Contents/MacOS/";
          for (let [appName, cliName] of Object.entries(appToCli)) {
            let matchIdx: number = cmdLine.indexOf(appName + "/Contents/MacOS/");
            if (matchIdx !== -1) {
              let endIdx: number = matchIdx + appName.length;
              return cmdLine.substring(0, endIdx) + "/Contents/Resources/app/bin/" + cliName;
            }
          }
        }
        let ppidOutput: string = (await Fn("ps", ["-o", "ppid=", "-p", String(parentPid)])).stdout.trim();
        if (!ppidOutput) break;
        parentPid = parseInt(ppidOutput);
      }
      return null;
    } catch {
      return null;
    }
  }), S7d = {
    vscode: ["code", "codium"],
    cursor: ["cursor"],
    windsurf: ["windsurf", "devin"]
  };
  jia = {
    code: "VS Code",
    cursor: "Cursor",
    windsurf: "Devin Desktop",
    antigravity: "Antigravity",
    vi: "Vim",
    vim: "Vim",
    nano: "nano",
    notepad: "Notepad",
    "start /wait notepad": "Notepad",
    emacs: "Emacs",
    subl: "Sublime Text",
    atom: "Atom"
  };
  caa = Hn(async (runningInWindows: boolean, port: number) => {
    if (process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE) return process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE;
    if (Yt() !== "wsl" || !runningInWindows) return "127.0.0.1";
    try {
      let routeResult: any = await Nv("ip route show | grep -i default", {
        reject: !1
      });
      if (routeResult.exitCode === 0 && routeResult.stdout) {
        let gatewayMatch: RegExpMatchArray | null = routeResult.stdout.match(/default via (\d+\.\d+\.\d+\.\d+)/);
        if (gatewayMatch) {
          let gatewayIp: string = gatewayMatch[1];
          if (await PXr(gatewayIp, port)) return gatewayIp;
        }
      }
    } catch (err: any) {}
    return "127.0.0.1";
  }, (runningInWindows: boolean, port: number) => `${runningInWindows}:${port}`);
});

export {Qia,d7d,rDn,Iee,DXr,Xst,sDn,Zia,PXr,m7d,f7d,h7d,nDn,iDn,aDn,eaa,J9e,Kia,_7d,LXr,zia,y7d,taa,naa,lDn,raa,oaa,saa,b7d,MXr,iaa,nFt,NXr,tH,X4,aaa,laa,Yia,Jia,Xia,WO,Via,Jst,tFt,oDn,cB,p7d,Y9e,g7d,T7d,S7d,OXr,jia,caa,uS};
