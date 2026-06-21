// @ts-nocheck
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {logForDebugging as N,qe as FH} from "./0234_setHasFormattedOutput.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
import {ws as M9,jt as Q_} from "../../vendor/m228.ts";
import {u8 as jF,CR as qW} from "../../vendor/m637.ts";
import {C7e as Wj_,rfr as u18} from "../../vendor/m638.ts";
/**
 * Windows shell-path utilities.
 *
 * Provides:
 *  - Git Bash discovery and SHELL env setup on Windows
 *  - PATH env mutation to prepend an executable's directory
 *  - Shell-command normalization (.sh → bash wrapper)
 *  - Memoized bidirectional path conversion: Win32 ↔ Unix (MSYS/Cygwin style)
 */

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * On Windows, locate Git Bash and set `process.env.SHELL` to its path.
 * Logs a warning if Git Bash cannot be found.
 */
function Fs_(): void {
  if (t_() === "windows") {
    let gitBashPath = j3H();
    if (gitBashPath)
      process.env.SHELL = gitBashPath,
        N(`Using bash path: "${gitBashPath}"`);
    else
      N("Git Bash not found; BashTool will be unavailable");
  }
}

/**
 * Prepend the directory that contains `executablePath` to the PATH key in
 * `envMap`.  No-op when `executablePath` is not absolute.
 *
 * @param envMap          - Environment variable map to mutate.
 * @param executablePath  - Absolute path to an executable whose directory should lead PATH.
 */
function gs_(envMap: Record<string, string | undefined>, executablePath: string): void {
  if (!sjH.isAbsolute(executablePath)) return;
  let dir = sjH.dirname(executablePath),
    pathKey = Object.keys(envMap).find(k => k.toUpperCase() === "PATH") ?? "PATH",
    existingPath = envMap[pathKey];
  envMap[pathKey] = existingPath ? dir + sjH.delimiter + existingPath : dir;
}

/**
 * Normalize a raw shell-command string: if the parsed executable ends with
 * `.sh`, wrap the original command with `bash`.  Otherwise return it unchanged.
 *
 * Handles quoted tokens and backslash escapes when extracting the executable
 * name for the `.sh` check.
 *
 * @param rawCommand - The raw command string as provided by the caller.
 * @returns Either `bash <rawCommand>` or `rawCommand`.
 */
function Qs_(rawCommand: string): string {
  let trimmed = rawCommand.trim(),
    parsed = "",
    pos = 0;
  while (pos < trimmed.length) {
    let ch = trimmed[pos];
    if (ch === '"' || ch === "'") {
      let closing = trimmed.indexOf(ch, pos + 1);
      if (closing === -1) {
        parsed += trimmed.slice(pos + 1), pos = trimmed.length;
        break;
      }
      parsed += trimmed.slice(pos + 1, closing), pos = closing + 1;
    } else if (ch === "\\" && pos + 1 < trimmed.length)
      parsed += trimmed[pos + 1], pos += 2;
    else if (/\s/.test(ch))
      break;
    else
      parsed += ch, pos++;
  }
  return parsed.endsWith(".sh") ? `bash ${rawCommand}` : rawCommand;
}

// ---------------------------------------------------------------------------
// Module-level mutable state (populated lazily inside DI)
// ---------------------------------------------------------------------------

/** Win32 path module (path/win32), used for Windows path operations on any OS. */
var sjH: typeof import("path").win32;

/**
 * Lazy getter that returns the absolute path to Git Bash on Windows,
 * or `null` if not found.
 *
 * Resolution order:
 *  1. `CLAUDE_CODE_GIT_BASH_PATH` env override (exits with code 1 if set but invalid).
 *  2. Well-known install paths under `C:\Program Files`.
 *  3. Sibling `bin\bash.exe` next to the `git` executable on PATH.
 */
var j3H: () => string | null;

/**
 * Memoized converter: Win32 path  →  Unix path (MSYS/WSL-style forward slashes).
 *
 * - UNC paths (`\\host\share`) → `//host/share`
 * - Drive-letter paths (`C:\foo`) → `/c/foo`
 * - Everything else: backslashes replaced with forward slashes.
 *
 * Cache size: 500 entries.
 */
var Nh: (win32Path: string) => string;

/**
 * Memoized converter: Unix/Cygdrive path  →  Win32 path.
 *
 * - `//host/share` → `\\host\share`
 * - `/cygdrive/c/foo` → `C:\foo`
 * - `/c/foo` → `C:\foo`
 * - Everything else: forward slashes replaced with backslashes.
 *
 * Cache size: 500 entries.
 */
var TVH: (unixPath: string) => string;

// ---------------------------------------------------------------------------
// Lazy initializer
// ---------------------------------------------------------------------------

var DI = L(() => {
  c7();
  FH();
  M9();
  jF();
  y9();
  Wj_();
  sjH = u(require("path/win32"));
  j3H = V6(() => {
    let {
      existsSync: checkExists
    } = Q_();
    if (process.env.CLAUDE_CODE_GIT_BASH_PATH) {
      if (checkExists(process.env.CLAUDE_CODE_GIT_BASH_PATH))
        return process.env.CLAUDE_CODE_GIT_BASH_PATH;
      console.error(`Claude Code was unable to find CLAUDE_CODE_GIT_BASH_PATH path "${process.env.CLAUDE_CODE_GIT_BASH_PATH}"`),
        process.exit(1);
    }
    let wellKnownPaths = [
      "C:\\Program Files\\Git\\bin\\bash.exe",
      "C:\\Program Files (x86)\\Git\\bin\\bash.exe"
    ];
    for (let candidate of wellKnownPaths)
      if (checkExists(candidate)) return candidate;
    let gitExecutable = u18("git");
    if (gitExecutable) {
      let bashCandidate = sjH.join(gitExecutable, "..", "..", "bin", "bash.exe");
      if (checkExists(bashCandidate)) return bashCandidate;
    }
    return null;
  });
  Nh = qW((win32Path: string) => {
    if (win32Path.startsWith("\\\\")) return win32Path.replaceAll("\\", "/");
    let driveMatch = win32Path.match(/^([A-Za-z]):[/\\]/);
    if (driveMatch) return "/" + driveMatch[1].toLowerCase() + win32Path.slice(2).replaceAll("\\", "/");
    return win32Path.replaceAll("\\", "/");
  }, (win32Path: string) => win32Path, 500),
    TVH = qW((unixPath: string) => {
      if (unixPath.startsWith("//")) return unixPath.replaceAll("/", "\\");
      let cygdriveMatch = unixPath.match(/^\/cygdrive\/([A-Za-z])(\/|$)/);
      if (cygdriveMatch) {
        let driveLetter = cygdriveMatch[1].toUpperCase(),
          rest = unixPath.slice(("/cygdrive/" + cygdriveMatch[1]).length);
        return driveLetter + ":" + (rest || "\\").replaceAll("/", "\\");
      }
      let shortDriveMatch = unixPath.match(/^\/([A-Za-z])(\/|$)/);
      if (shortDriveMatch) {
        let driveLetter = shortDriveMatch[1].toUpperCase(),
          rest = unixPath.slice(2);
        return driveLetter + ":" + (rest || "\\").replaceAll("/", "\\");
      }
      return unixPath.replaceAll("/", "\\");
    }, (unixPath: string) => unixPath, 500);
});

export {Fs_ as otn,gs_ as stn,Qs_ as itn,sjH as cbe,j3H as Hpe,Nh as UD,TVH as jMe,DI as L2};
