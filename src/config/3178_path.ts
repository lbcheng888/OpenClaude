// @ts-nocheck
import {getAncestorPidsAsync,rE} from "../../vendor/m1456.ts";
import {je} from "../../vendor/m577.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {ds,Se,Xzt,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {qt,Xt} from "./0228_encoding.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {tr,sn} from "./0047_namespace.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {bwe,gki,Pbn} from "../../vendor/m2509.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,st} from "../../vendor/m5.ts";
import {_T,$u} from "../mcp/2194_mcpServerName.ts";
import {Ie,Oe,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {getIsScrollDraining,getOriginalCwd,lt} from "../session/0131_sent.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {k1,a5} from "./2187_terminal.ts";
import {execFileNoThrowWithCwd,execFileNoThrow,oa} from "../../vendor/m684.ts";
import {NZi,BZi} from "../../vendor/m3173.ts";
import {tZ} from "../../vendor/m2206.ts";
import {wR,vB} from "../../vendor/m682.ts";
import {Di,dr} from "../../vendor/m231.ts";
import {U$e,pHn} from "../../vendor/m3172.ts";
import {Nee,O0} from "../tools/3222_name.ts";
import {J7r,jZi} from "../../vendor/m3176.ts";
import {ro,b,M} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {ek} from "../core/0570_isCancel.ts";
import {Lr} from "../../vendor/m578.ts";
import {Mw} from "./2221_recursive.ts";
// Check if a process is alive by sending signal 0
function QZi(pid: number): boolean {
  try {
    return process.kill(pid, 0), !0;
  } catch {
    return !1;
  }
}

// Returns a memoized async function that resolves the ancestor PIDs of the parent process
function k9d(): () => Promise<Set<number>> {
  let cachedPromise: Promise<Set<number>> | null = null;
  return () => {
    if (!cachedPromise) cachedPromise = getAncestorPidsAsync(process.ppid, 10).then((pids: number[]) => new Set(pids));
    return cachedPromise;
  };
}

// Returns true if the given terminal is a VS Code-family IDE
function mHn(terminalName: string | undefined): boolean {
  if (!terminalName) return !1;
  let ideEntry: any = Xrt[terminalName];
  return ideEntry && ideEntry.ideKind === "vscode";
}

// Returns true if the given terminal is a JetBrains IDE
function Mee(terminalName: string | undefined): boolean {
  if (!terminalName) return !1;
  let ideEntry: any = Xrt[terminalName];
  return ideEntry && ideEntry.ideKind === "jetbrains";
}

// Get the terminal name from the environment (only in code-terminal mode)
function X7r(): string | null {
  if (!FF()) return null;
  return je.terminal;
}

// Determine if IDE auto-connect should be enabled
function AHn(forceEnable: boolean = !1): boolean {
  if (je.CLAUDE_CODE_AUTO_CONNECT_IDE === !1) return !1;
  return Boolean(getGlobalConfig().autoConnectIde || forceEnable || FF() || je.CLAUDE_CODE_SSE_PORT !== void 0 || je.CLAUDE_CODE_AUTO_CONNECT_IDE === !0);
}

// Find all IDE lock files sorted by modification time (newest first)
async function hHn(): Promise<string[]> {
  try {
    let lockfileDirs: string[] = await I9d();
    return (await Promise.all(lockfileDirs.map(async (dirPath: string) => {
      try {
        let lockFiles: any[] = (await jt().readdir(dirPath)).filter((entry: any) => entry.name.endsWith(".lock"));
        return (await Promise.all(lockFiles.map(async (entry: any) => {
          let filePath: string = vL.join(dirPath, entry.name);
          try {
            let stat: any = await jt().stat(filePath);
            return {
              path: filePath,
              mtime: stat.mtime
            };
          } catch {
            return null;
          }
        }))).filter((item: any) => item !== null);
      } catch (err: any) {
        if (!ds(err)) De(err);
        return [];
      }
    }))).flat().sort((fileA: any, fileB: any) => fileB.mtime.getTime() - fileA.mtime.getTime()).map((item: any) => item.path);
  } catch (err: any) {
    return De(err), [];
  }
}

// Parse an IDE lock file and return its structured contents
async function ZZi(lockFilePath: string): Promise<any | null> {
  try {
    let rawContent: string = await jt().readFile(lockFilePath, {
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
    let fileName: string | undefined = lockFilePath.split(vL.sep).pop();
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
    return logForDebugging(`Failed to read IDE lockfile ${lockFilePath}: ${Se(err)}`, {
      level: "error"
    }), null;
  }
}

// Test TCP connectivity to a host:port with a timeout (default 500ms)
async function Q7r(host: string, port: number, timeoutMs: number = 500): Promise<boolean> {
  try {
    return new Promise((resolve: (v: boolean) => void) => {
      let socket: any = JZi.createConnection({
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
async function I9d(): Promise<string[]> {
  let searchDirs: string[] = [vL.join(tr(), "ide")];
  if (process.env.CLAUDE_CONFIG_DIR?.trim()) searchDirs.push(vL.join(XZi.homedir(), ".claude", "ide").normalize("NFC"));
  if (zt() === "wsl") {
    let windowsUserProfile: string | undefined = await H9d();
    if (windowsUserProfile) {
      let localPath: string = await new bwe(process.env.WSL_DISTRO_NAME).toLocalPath(windowsUserProfile);
      searchDirs.push(vL.resolve(localPath, ".claude", "ide"));
    }
    try {
      let windowsUsers: any[] = await jt().readdir("/mnt/c/Users");
      for (let userEntry of windowsUsers) {
        if (!userEntry.isDirectory() && !userEntry.isSymbolicLink()) continue;
        if (userEntry.name === "Public" || userEntry.name === "Default" || userEntry.name === "Default User" || userEntry.name === "All Users") continue;
        searchDirs.push(vL.join("/mnt/c/Users", userEntry.name, ".claude", "ide"));
      }
    } catch (err: any) {
      if (ds(err)) logForDebugging(`WSL IDE lockfile path detection failed (${err.code}): ${Se(err)}`);else logForDebugging(`WSL IDE lockfile path detection failed unexpectedly: ${Se(err)}`, {
        level: "error"
      });
    }
  }
  let seenRealPaths: Set<string> = new Set(),
    dedupedDirs: string[] = [];
  for (let dirPath of searchDirs) {
    let realPath: string = await YZi.realpath(dirPath).catch(() => vL.resolve(dirPath));
    if (seenRealPaths.has(realPath)) continue;
    seenRealPaths.add(realPath), dedupedDirs.push(dirPath);
  }
  return dedupedDirs;
}

// Remove stale IDE lock files (those whose process is gone or port is unreachable)
async function D9d(): Promise<void> {
  try {
    let lockFiles: string[] = await hHn();
    for (let lockFile of lockFiles) {
      let lockData: any = await ZZi(lockFile);
      if (!lockData) {
        try {
          await jt().unlink(lockFile);
        } catch (unlinkErr: any) {
          logForDebugging(`Failed to delete unreadable IDE lockfile ${lockFile}: ${unlinkErr}`, {
            level: "error"
          });
        }
        continue;
      }
      let ideHost: string = await uea(lockData.runningInWindows, lockData.port),
        isStale: boolean = !1;
      if (lockData.pid) {
        if (!QZi(lockData.pid)) {
          if (zt() !== "wsl") isStale = !0;else if (!(await Q7r(ideHost, lockData.port))) isStale = !0;
        }
      } else if (!(await Q7r(ideHost, lockData.port))) isStale = !0;
      if (isStale) try {
        await jt().unlink(lockFile);
      } catch (unlinkErr: any) {
        logForDebugging(`Failed to remove stale IDE lockfile ${lockFile}: ${Se(unlinkErr)}`, {
          level: "error"
        });
      }
    }
  } catch (err: any) {
    De(err);
  }
}

// Install the Claude Code extension into the detected IDE
async function P9d(ideType: any): Promise<any> {
  try {
    let installedVersion: any = await L9d(ideType);
    if (logEvent("tengu_ext_installed", {
      ide_type: fromEnum(ideType),
      installed_version: installedVersion == null ? void 0 : _T(installedVersion)
    }), Ie("ide_extension_install"), !getGlobalConfig().diffTool) saveGlobalConfig((cfg: any) => ({
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
    logEvent("tengu_ext_install_error", {
      ide_type: fromEnum(ideType),
      error_code: Xzt(err)
    }), Oe("ide_extension_install", "ide_extension_install_failed");
    let errMsg: string = err instanceof Error ? err.message : String(err);
    return logForDebugging(`IDE extension install failed: ${errMsg}`, {
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
async function GZi(): Promise<any | null> {
  if (q$e) q$e.abort();
  q$e = Jl();
  let abortSignal: any = q$e.signal;
  await D9d();
  let startTime: number = Date.now();
  while (Date.now() - startTime < 30000 && !abortSignal.aborted) {
    if (getIsScrollDraining()) {
      await sleep(1000, abortSignal);
      continue;
    }
    let ideList: any[] = await gHn(!1);
    if (abortSignal.aborted) return null;
    if (ideList.length === 1) return ideList[0];
    await sleep(1000, abortSignal);
  }
  return null;
}

// Cancel the current IDE detection poll
function eea(): void {
  if (q$e) q$e.abort(), q$e = null;
}

// Enumerate available IDE connections, filtering to workspace-matching ones
async function gHn(includeAll: boolean): Promise<any[]> {
  let results: any[] = [];
  try {
    let ssePortEnv: string | undefined = process.env.CLAUDE_CODE_SSE_PORT,
      forcedPort: number | null = ssePortEnv ? parseInt(ssePortEnv) : null,
      normalizedCwd: string = getOriginalCwd().normalize("NFC"),
      lockFiles: string[] = await hHn(),
      parsedLocks: any[] = await Promise.all(lockFiles.map(ZZi)),
      getAncestorPids: any = k9d(),
      isCodeTerminal: boolean = zt() !== "wsl" && FF();
    for (let lockData of parsedLocks) {
      if (!lockData) continue;
      let isValid: boolean = !1;
      if (st(process.env.CLAUDE_CODE_IDE_SKIP_VALID_CHECK)) isValid = !0;else if (lockData.port === forcedPort) isValid = !0;else for (let folder of lockData.workspaceFolders) {
        if (!folder) continue;
        let resolvedFolder: string = folder;
        if (zt() === "wsl" && lockData.runningInWindows && process.env.WSL_DISTRO_NAME) {
          if (!gki(folder, process.env.WSL_DISTRO_NAME)) continue;
          let normalizedWslPath: string = vL.resolve(resolvedFolder).normalize("NFC");
          if (normalizedCwd === normalizedWslPath || normalizedCwd.startsWith(normalizedWslPath + vL.sep)) {
            isValid = !0;
            break;
          }
          resolvedFolder = await new bwe(process.env.WSL_DISTRO_NAME).toLocalPath(folder);
        }
        let normalizedFolder: string = vL.resolve(resolvedFolder).normalize("NFC");
        if (zt() === "windows") {
          let cwdUpper: string = normalizedCwd.replace(/^[a-zA-Z]:/, (driveLetter: string) => driveLetter.toUpperCase()),
            folderUpper: string = normalizedFolder.replace(/^[a-zA-Z]:/, (driveLetter: string) => driveLetter.toUpperCase());
          if (cwdUpper === folderUpper || cwdUpper.startsWith(folderUpper + vL.sep)) {
            isValid = !0;
            break;
          }
          continue;
        }
        if (normalizedCwd === normalizedFolder || normalizedCwd.startsWith(normalizedFolder + vL.sep)) {
          isValid = !0;
          break;
        }
      }
      if (!isValid && !includeAll) continue;
      if (isCodeTerminal) {
        if (!(forcedPort !== null && lockData.port === forcedPort)) {
          if (!lockData.pid || !QZi(lockData.pid)) continue;
          if (process.ppid !== lockData.pid) {
            if (!(await getAncestorPids()).has(lockData.pid)) continue;
          }
        }
      }
      let displayName: string = lockData.ideName ? rea(lockData.ideName) : FF() ? Ok(k1.terminal) : "IDE",
        ideHost: string = await uea(lockData.runningInWindows, lockData.port),
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
      if (portMatches.length === 1) return Ie("ide_detect"), portMatches;
    }
    Ie("ide_detect");
  } catch (err: any) {
    De(err), isTmuxControlMode("ide_detect", "ide_detect_failed");
  }
  return results;
}

// Notify the IDE that this Claude process has connected
async function tea(mcpClient: any): Promise<void> {
  await mcpClient.notification({
    method: "ide_connected",
    params: {
      pid: process.pid
    }
  });
}

// Check if any connection in the list is an IDE connection
function j$e(connections: any[]): boolean {
  return connections.some((conn: any) => conn.type === "connected" && conn.name === "ide");
}

// Check if the Claude Code extension is already installed in the given IDE
async function VZi(ideKey: string): Promise<boolean> {
  if (mHn(ideKey)) {
    let cliPath: string | null = await _Hn(ideKey);
    if (cliPath) try {
      if ((await execFileNoThrowWithCwd(cliPath, ["--list-extensions"], {
        env: eKr()
      })).stdout?.includes(O9d)) return !0;
    } catch {}
  } else if (Mee(ideKey)) return await NZi(ideKey);
  return !1;
}

// Install or verify the Claude Code extension and return its version
async function L9d(ideKey: string): Promise<string | null> {
  if (mHn(ideKey)) {
    let cliPath: string | null = await _Hn(ideKey);
    if (cliPath) {
      let currentVersion: string | null = await M9d(cliPath);
      if (!currentVersion || tZ(currentVersion, KZi())) {
        await sleep(500);
        let installResult: any = await execFileNoThrowWithCwd(cliPath, ["--force", "--install-extension", "anthropic.claude-code"], {
          env: eKr()
        });
        if (installResult.code !== 0) throw Object.assign(Error(`${installResult.code}: ${installResult.error} ${installResult.stderr}`), {
          code: `EXIT_${installResult.code}`
        });
        currentVersion = KZi();
      }
      return currentVersion;
    }
  }
  return null;
}

// Build environment for running the VS Code CLI (clears DISPLAY on Linux)
function eKr(): NodeJS.ProcessEnv | undefined {
  if (zt() === "linux") return {
    ...process.env,
    DISPLAY: ""
  };
  return;
}

// Return the current Claude Code extension version string
function KZi(): string {
  return {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION;
}

// Query the installed version of the anthropic.claude-code extension via CLI
async function M9d(cliPath: string): Promise<string | null> {
  let {
      stdout: rawOutput
    } = await execFileNoThrow(cliPath, ["--list-extensions", "--show-versions"], {
      env: eKr()
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
function nea(ideName: string): string | null {
  let lowerName: string = ideName.toLowerCase();
  if (lowerName.includes("windsurf") || lowerName.includes("devin")) return "windsurf";
  if (lowerName.includes("cursor")) return "cursor";
  if (!lowerName.includes("insiders") && (lowerName.includes("vscode") || lowerName.includes("vs code") || lowerName.includes("visual studio code") || lowerName.includes("vscodium") || lowerName.includes("code - oss"))) return "vscode";
  return null;
}

// Remap "windsurf" references to "Devin Desktop" in an IDE name string
function rea(ideName: string): string {
  return ideName.replace(/windsurf/gi, "Devin Desktop");
}

// Resolve the CLI executable path for the given IDE key
async function _Hn(ideKey: string, ideName?: string): Promise<string | null> {
  let candidateNames: string[] | undefined = B9d[ideKey];
  if (!candidateNames) return null;
  if (ideKey === "vscode" && ideName) candidateNames = ideName.toLowerCase().includes("vscodium") ? ["codium"] : ["code"];
  let cachedPath: string | null = await N9d();
  if (cachedPath && candidateNames.includes(vL.basename(cachedPath))) try {
    return await jt().stat(cachedPath), cachedPath;
  } catch {}
  let platformExt: string = zt() === "windows" ? ".cmd" : "";
  return candidateNames[0] + platformExt;
}

// Check if Cursor CLI is accessible
async function oea(): Promise<boolean> {
  return (await execFileNoThrow("cursor", ["--version"])).code === 0;
}

// Check if Windsurf or Devin Desktop CLI is accessible
async function sea(): Promise<boolean> {
  if ((await execFileNoThrow("windsurf", ["--version"])).code === 0) return !0;
  return (await execFileNoThrow("devin-desktop", ["--version"])).code === 0;
}

// Check if the VS Code CLI is accessible and is a real VS Code (not Cursor)
async function iea(): Promise<boolean> {
  let result: any = await execFileNoThrow("code", ["--help"]);
  return result.code === 0 && Boolean(result.stdout?.includes("Visual Studio Code"));
}

// Detect which IDEs are currently running via process list inspection
async function F9d(): Promise<string[]> {
  let detectedIdes: string[] = [];
  try {
    let platform: string = zt();
    if (platform === "macos") {
      let psOutput: string = (await wR('ps aux | grep -E "Visual Studio Code|Code Helper|Cursor Helper|Windsurf Helper|Devin Helper|Devin.app|IntelliJ IDEA|PyCharm|WebStorm|PhpStorm|RubyMine|CLion|GoLand|Rider|DataGrip|AppCode|DataSpell|Aqua|Gateway|Fleet|Android Studio" | grep -v grep', {
        reject: !1
      })).stdout ?? "";
      for (let [ideKey, ideConfig] of Object.entries(Xrt)) for (let keyword of (ideConfig as any).processKeywordsMac) if (psOutput.includes(keyword)) {
        detectedIdes.push(ideKey);
        break;
      }
    } else if (platform === "windows") {
      let tasksOutput: string = ((await wR('tasklist | findstr /I "Code.exe Cursor.exe Windsurf.exe Devin.exe idea64.exe pycharm64.exe webstorm64.exe phpstorm64.exe rubymine64.exe clion64.exe goland64.exe rider64.exe datagrip64.exe appcode.exe dataspell64.exe aqua64.exe gateway64.exe fleet.exe studio64.exe"', {
        reject: !1
      })).stdout ?? "").toLowerCase();
      for (let [ideKey, ideConfig] of Object.entries(Xrt)) for (let keyword of (ideConfig as any).processKeywordsWindows) if (tasksOutput.includes(keyword.toLowerCase())) {
        detectedIdes.push(ideKey);
        break;
      }
    } else if (platform === "linux") {
      let psOutput: string = ((await wR('ps aux | grep -E "code|cursor|windsurf|devin-desktop|idea|pycharm|webstorm|phpstorm|rubymine|clion|goland|rider|datagrip|dataspell|aqua|gateway|fleet|android-studio" | grep -v grep', {
        reject: !1
      })).stdout ?? "").toLowerCase();
      for (let [ideKey, ideConfig] of Object.entries(Xrt)) for (let keyword of (ideConfig as any).processKeywordsLinux) if (psOutput.includes(keyword)) {
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
    logForDebugging(`IDE process detection failed: ${err}`, {
      level: "error"
    });
  }
  return detectedIdes;
}

// Refresh the cached list of running IDEs
async function tKr(): Promise<string[]> {
  let freshList: string[] = await F9d();
  return Z7r = freshList, freshList;
}

// Return the cached running IDE list, refreshing if not yet populated
async function aea(): Promise<string[]> {
  if (Z7r === null) return tKr();
  return Z7r;
}

// Extract the connected IDE name from an active connection list
function vMt(connections: any[]): string | null {
  let ideConn: any = connections.find((conn: any) => conn.type === "connected" && conn.name === "ide");
  return nKr(ideConn);
}

// Resolve the display name from an IDE connection object
function nKr(ideConn: any): string | null {
  let config: any = ideConn?.config;
  return config?.type === "sse-ide" || config?.type === "ws-ide" ? rea(config.ideName) : FF() ? Ok(k1.terminal) : null;
}

// Resolve a display name for a terminal/IDE string or key
function Ok(terminalOrKey: string | undefined): string {
  if (!terminalOrKey) return "IDE";
  let ideEntry: any = Xrt[terminalOrKey];
  if (ideEntry) return ideEntry.displayName;
  let aliasName: string | undefined = zZi[terminalOrKey.toLowerCase().trim()];
  if (aliasName) return aliasName;
  let basename: string | null = Di(terminalOrKey, " "),
    lowerBasename: string | null = basename ? vL.basename(basename).toLowerCase() : null;
  if (lowerBasename) {
    let basenameAlias: string | undefined = zZi[lowerBasename];
    if (basenameAlias) return basenameAlias;
    return U$e(lowerBasename);
  }
  return U$e(terminalOrKey);
}

// Find and return the connected IDE entry from a connection list
function Lq(connections: any[]): any | undefined {
  if (!connections) return;
  let ideConn: any = connections.find((conn: any) => conn.type === "connected" && conn.name === "ide");
  return ideConn?.type === "connected" ? ideConn : void 0;
}

// Close all diff tabs in the connected IDE
async function lea(mcpClient: any): Promise<void> {
  try {
    await Nee("closeAllDiffTabs", {}, mcpClient);
  } catch (err: any) {}
}

// Start IDE detection polling and optionally trigger extension auto-install
async function cea(onIdeConnected: any, terminalOverride: any, onOnboarding: any, onInstallResult: any, abortSignal: any): Promise<void> {
  GZi().then(onIdeConnected);
  let autoInstall: boolean = getGlobalConfig().autoInstallIdeExtension ?? !0;
  if (!st(process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL) && autoInstall) {
    let terminalKey: string | null = terminalOverride ?? X7r();
    if (terminalKey) {
      if (mHn(terminalKey)) VZi(terminalKey).then(async (alreadyInstalled: boolean) => {
        P9d(terminalKey).catch((installErr: any) => ({
          installed: !1,
          error: installErr.message || "Installation failed",
          installedVersion: null,
          ideType: terminalKey
        })).then((installResult: any) => {
          if (onInstallResult(installResult), installResult?.installed && !abortSignal?.aborted) GZi().then(onIdeConnected);
          if (!alreadyInstalled && installResult?.installed === !0 && !WZi().hasIdeOnboardingDialogBeenShown()) onOnboarding();
        });
      });else if (Mee(terminalKey)) VZi(terminalKey).then(async (alreadyInstalled: boolean) => {
        if (alreadyInstalled && !WZi().hasIdeOnboardingDialogBeenShown()) onOnboarding();
      });
    }
  }
}
var YZi: any,
  JZi: any,
  XZi: any,
  vL: any,
  WZi = () => (J7r(), ro(jZi)),
  Xrt: any,
  CMt: any,
  fHn: any,
  FF: any,
  H9d: any,
  q$e: any = null,
  O9d: string = "anthropic.claude-code",
  N9d: any,
  B9d: any,
  Z7r: string[] | null = null,
  zZi: any,
  uea: any;
var ab = b(() => {
  pHn();
  ta();
  Ct();
  $u();
  lt();
  ln();
  ek();
  O0();
  Qn();
  Lr();
  sn();
  oa();
  ws();
  rE();
  BZi();
  Rn();
  qs();
  vB();
  dr();
  Mw();
  ch();
  qe();
  a5();
  bt();
  Pbn();
  Xt();
  YZi = require("fs/promises"), JZi = require("net"), XZi = M(require("os")), vL = require("path");
  Xrt = {
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
  CMt = wn(() => mHn(je.terminal)), fHn = wn(() => Mee(k1.terminal)), FF = wn(() => CMt() || fHn() || Boolean(process.env.FORCE_CODE_TERMINAL));
  H9d = wn(async () => {
    if (process.env.USERPROFILE) return process.env.USERPROFILE;
    let {
      stdout: cmdOutput,
      code: exitCode
    } = await execFileNoThrow("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "$env:USERPROFILE"]);
    if (exitCode === 0 && cmdOutput.trim()) return cmdOutput.trim();
    logForDebugging("Unable to get Windows USERPROFILE via PowerShell - IDE detection may be incomplete");
    return;
  });
  N9d = wn(async () => {
    try {
      if (zt() !== "macos") return null;
      let parentPid: number = process.ppid;
      for (let depth: number = 0; depth < 10; depth++) {
        if (!parentPid || parentPid === 0 || parentPid === 1) break;
        let cmdLine: string = (await execFileNoThrow("ps", ["-o", "command=", "-p", String(parentPid)])).stdout.trim();
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
        let ppidOutput: string = (await execFileNoThrow("ps", ["-o", "ppid=", "-p", String(parentPid)])).stdout.trim();
        if (!ppidOutput) break;
        parentPid = parseInt(ppidOutput);
      }
      return null;
    } catch {
      return null;
    }
  }), B9d = {
    vscode: ["code", "codium"],
    cursor: ["cursor"],
    windsurf: ["windsurf", "devin"]
  };
  zZi = {
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
  uea = wn(async (runningInWindows: boolean, port: number) => {
    if (process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE) return process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE;
    if (zt() !== "wsl" || !runningInWindows) return "127.0.0.1";
    try {
      let routeResult: any = await wR("ip route show | grep -i default", {
        reject: !1
      });
      if (routeResult.exitCode === 0 && routeResult.stdout) {
        let gatewayMatch: RegExpMatchArray | null = routeResult.stdout.match(/default via (\d+\.\d+\.\d+\.\d+)/);
        if (gatewayMatch) {
          let gatewayIp: string = gatewayMatch[1];
          if (await Q7r(gatewayIp, port)) return gatewayIp;
        }
      }
    } catch (err: any) {}
    return "127.0.0.1";
  }, (runningInWindows: boolean, port: number) => `${runningInWindows}:${port}`);
});
export {QZi,k9d,mHn,Mee,X7r,AHn,hHn,ZZi,Q7r,I9d,D9d,P9d,GZi,eea,gHn,tea,j$e,VZi,L9d,eKr,KZi,M9d,nea,rea,_Hn,oea,sea,iea,F9d,tKr,aea,vMt,nKr,Ok,Lq,lea,cea,YZi,JZi,XZi,vL,WZi,Xrt,CMt,fHn,FF,H9d,q$e,O9d,N9d,B9d,Z7r,zZi,uea,ab};
