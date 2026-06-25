// @ts-nocheck
import {Yt,Es} from "../../vendor/m641.ts";
import {Jae,o_e} from "../../vendor/m3289.ts";
import {Qx,r2} from "./0646_existsSync.ts";
import {Ma} from "../../vendor/m2519.ts";
import {h$e,tee} from "./2681_cause.ts";
import {ov,NW} from "./3289_NW.ts";
import {Kb,zN} from "../../vendor/m688.ts";
import {getEnabledPluginBinPaths as Eeo,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {subprocessEnv as lO,VM} from "../agent/2231_subprocessEnv.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {SIn,b1t} from "./2788_b1t.ts";
import {Gu,Xl} from "./0651_maxBytes.ts";
import {or,dn} from "./0137_namespace.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {b,x} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
/**
 * Shell snapshot generation.
 *
 * Builds a shell script that captures the user's shell environment (functions,
 * options, aliases, PATH) plus Claude Code's own shadow definitions for rg /
 * find / grep, then sources it before spawning subprocess shells. This lets
 * Bash tool invocations inherit the user's interactive shell state.
 */

/**
 * Emit a shell function definition that shadows a command (e.g. `rg`, `find`,
 * `grep`) by execing Claude Code's embedded binary, falling back to the real
 * command on miss.
 *
 * @param commandName  Name of the command/function to define (e.g. "rg").
 * @param argv0        argv[0] to present to the embedded binary.
 * @param prefixArgs   Extra args inserted before the forwarded "$@".
 * @param matchPatterns When non-empty, only forward to the embedded binary if
 *                      an argument matches one of these case patterns.
 */
function defineShadowFunction(commandName, argv0, prefixArgs = [], matchPatterns = []) {
  let forwardedArgs = prefixArgs.length > 0 ? `${prefixArgs.join(" ")} \${1+"$@"}` : '${1+"$@"}',
    isWindows = Yt() === "windows",
    binPath = uBt.join(Jae(), isWindows ? "claude.exe" : "claude"),
    resolvedBinPath = isWindows ? Qx(binPath) : binPath,
    matchGuardLines = matchPatterns.length > 0 ? ["  local _cc_a", '  for _cc_a in ${1+"$@"}; do', `    case "$_cc_a" in ${matchPatterns.join("|")}) command ${commandName} \${1+"$@"}; return ;; esac`, "  done"] : [];
  return [`function ${commandName} {`, ...matchGuardLines, `  local _cc_bin="\${${beo}:-}"`, `  [[ -x $_cc_bin ]] || _cc_bin=${Ma([resolvedBinPath])}`, `  if [[ ! -x $_cc_bin ]]; then command ${commandName} \${1+"$@"}; return; fi`, "  if [[ -n ${ZSH_VERSION:-} ]]; then", `    ARGV0=${argv0} "$_cc_bin" ${forwardedArgs}`, '  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then', `    ARGV0=${argv0} "$_cc_bin" ${forwardedArgs}`, "  else", `    (exec -a ${argv0} "$_cc_bin" ${forwardedArgs})`, "  fi", "}"].join(`
`);
}

/**
 * Build the rg (ripgrep) shadow as either a function (when argv0 routing is
 * available) or a plain alias to the resolved rg binary.
 */
function buildRipgrepShadow() {
  let ripgrepConfig = h$e();
  if (ripgrepConfig.argv0) return {
    type: "function",
    snippet: defineShadowFunction("rg", ripgrepConfig.argv0)
  };
  let quotedPath = Ma([ripgrepConfig.rgPath]),
    quotedArgs = ripgrepConfig.rgArgs.map(arg => Ma([arg]));
  return {
    type: "alias",
    snippet: ripgrepConfig.rgArgs.length > 0 ? `${quotedPath} ${quotedArgs.join(" ")}` : quotedPath
  };
}

/**
 * Build the find/grep shadow block using the embedded bfs/ugrep binaries.
 * Returns null when the embedded native tools are unavailable.
 */
function buildFindGrepShadow() {
  if (!ov()) return null;
  return ["unalias find 2>/dev/null || true", "unalias grep 2>/dev/null || true", defineShadowFunction("find", "bfs", ["-S", "dfs", "-regextype", "findutils-default"]), defineShadowFunction("grep", "ugrep", ["-G", "--ignore-files", "--hidden", "-I", ...DXd.map(dir => `--exclude-dir=${dir}`)], ["-*-filter*", "-*-pager*", "-*-view*", "-*-format-open*", "-*-config*", "---*", "-@*", "-*-save-config*", "-[Zz]*", "-[!-]*[Zz]*", "--null", "--null-data"])].join(`
`);
}

/** Build the bq shadow block. Currently disabled (always null). */
function buildBqShadow() {
  return null;
}

/**
 * Resolve the path to the user's shell config file (.zshrc / .bashrc /
 * .profile) for the given shell path.
 */
function resolveShellConfigPath(shellPath) {
  let configFileName = shellPath.includes("zsh") ? ".zshrc" : shellPath.includes("bash") ? ".bashrc" : ".profile";
  return uBt.join(KPn.homedir(), configFileName);
}

/**
 * Emit the shell-specific snippet that dumps functions, shell options and
 * aliases into the snapshot file. Branches on zsh vs bash by config path.
 */
function buildShellStateSnippet(configPath) {
  let isZsh = configPath.endsWith(".zshrc"),
    snippet = "";
  if (isZsh) snippet += `
      echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      typeset -f > /dev/null 2>&1

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      typeset +f | grep -vE '^_[^_]' | while read func; do
        typeset -f "$func" >> "$SNAPSHOT_FILE"
      done
    `;else snippet += `
      echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      declare -f > /dev/null 2>&1

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      declare -F | cut -d' ' -f3 | grep -vE '^_[^_]' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval ${yeo}"${yeo}$(echo '$encoded_func' | base64 -d)${yeo}" > /dev/null 2>&1" >> "$SNAPSHOT_FILE"
      done
    `;
  if (isZsh) snippet += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      setopt | sed 's/^/setopt /' | head -n 1000 >> "$SNAPSHOT_FILE"
    `;else snippet += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      shopt -p | head -n 1000 >> "$SNAPSHOT_FILE"
      set -o | grep "on" | awk '{print "set -o " $1}' | head -n 1000 >> "$SNAPSHOT_FILE"
      echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"
    `;
  return snippet += `
      echo "# Aliases" >> "$SNAPSHOT_FILE"
      # Filter out winpty aliases on Windows to avoid "stdin is not a tty" errors
      # Git Bash automatically creates aliases like "alias node='winpty node.exe'" for
      # programs that need Win32 Console in mintty, but winpty fails when there's no TTY
      if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        alias | grep -v "='winpty " | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      else
        alias | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      fi
  `, snippet;
}

/**
 * Build the snippet that appends the rg/find/grep/bq shadows and the resolved
 * PATH export to the snapshot file.
 */
async function buildShadowsAndPathSnippet(shellPath) {
  let pathValue = process.env.PATH;
  if (Yt() === "windows") {
    let winPathResult = await Kb(shellPath, ["-lc", 'echo "$PATH"'], {
      reject: !1,
      timeout: GPn
    });
    if (winPathResult.exitCode === 0 && winPathResult.stdout) pathValue = winPathResult.stdout.trim();
  }
  let pluginBinPaths = await Eeo();
  if (pluginBinPaths.length > 0) {
    let normalizedBinPaths = Yt() === "windows" ? pluginBinPaths.map(Qx) : pluginBinPaths;
    pathValue = [pathValue, ...normalizedBinPaths].filter(Boolean).join(":");
  }
  let ripgrepShadow = buildRipgrepShadow(),
    snippet = "";
  if (snippet += `
      # Check for rg availability
      echo "# Check for rg availability" >> "$SNAPSHOT_FILE"
      echo "if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then" >> "$SNAPSHOT_FILE"
  `, ripgrepShadow.type === "function") snippet += `
      cat >> "$SNAPSHOT_FILE" << 'RIPGREP_FUNC_END'
  ${ripgrepShadow.snippet}
RIPGREP_FUNC_END
    `;else {
    let escapedAlias = ripgrepShadow.snippet.replaceAll("'", "'\\''");
    snippet += `
      echo '  alias rg='"'${escapedAlias}'" >> "$SNAPSHOT_FILE"
    `;
  }
  snippet += `
      echo "fi" >> "$SNAPSHOT_FILE"
  `;
  let findGrepShadow = buildFindGrepShadow();
  if (findGrepShadow !== null) snippet += `
      # Shadow find/grep with embedded bfs/ugrep (ant-native only)
      echo "# Shadow find/grep with embedded bfs/ugrep" >> "$SNAPSHOT_FILE"
      cat >> "$SNAPSHOT_FILE" << 'FIND_GREP_FUNC_END'
${findGrepShadow}
FIND_GREP_FUNC_END
    `;
  let bqShadow = buildBqShadow();
  if (bqShadow !== null) snippet += `
      echo "# Shadow bq to label query jobs with source=claude_code" >> "$SNAPSHOT_FILE"
      cat >> "$SNAPSHOT_FILE" << 'BQ_FUNC_END'
${bqShadow}
BQ_FUNC_END
    `;
  let pathHeredocTag = `PATH_END_${Math.random().toString(36).substring(2, 18)}`;
  return snippet += `

      # Add PATH to the file
      cat >> "$SNAPSHOT_FILE" << '${pathHeredocTag}'
export PATH=${Ma([pathValue || ""])}
${pathHeredocTag}
  `, snippet;
}

/**
 * Assemble the full snapshot-generation shell script: sources the user config,
 * clears the snapshot file, unaliases, then appends shell state + shadows.
 *
 * @param shellPath         Path to the shell binary.
 * @param snapshotFilePath  Destination snapshot file path.
 * @param hasUserConfig     Whether a user config file exists to source.
 */
async function buildSnapshotScript(shellPath, snapshotFilePath, hasUserConfig) {
  let configPath = resolveShellConfigPath(shellPath),
    isZsh = configPath.endsWith(".zshrc"),
    shellStateSnippet = hasUserConfig ? buildShellStateSnippet(configPath) : !isZsh ? 'echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"' : "",
    shadowsAndPathSnippet = await buildShadowsAndPathSnippet(shellPath);
  return `SNAPSHOT_FILE=${Ma([snapshotFilePath])}
      ${hasUserConfig ? `source "${configPath}" < /dev/null` : "# No user config file to source"}

      # First, create/clear the snapshot file
      echo "# Snapshot file" >| "$SNAPSHOT_FILE"

      # When this file is sourced, we first unalias to avoid conflicts
      # This is necessary because aliases get "frozen" inside function definitions at definition time,
      # which can cause unexpected behavior when functions use commands that conflict with aliases
      echo "# Unset all aliases to avoid conflicts with functions" >> "$SNAPSHOT_FILE"
      echo "unalias -a 2>/dev/null || true" >> "$SNAPSHOT_FILE"

      ${shellStateSnippet}

      ${shadowsAndPathSnippet}

      # Exit silently on success, only report errors
      if [ ! -f "$SNAPSHOT_FILE" ]; then
        echo "Error: Snapshot file was not created at $SNAPSHOT_FILE" >&2
        exit 1
      fi
    `;
}

/**
 * Probe the spawn environment by running `env` in the given shell and caching
 * the captured variable names for later subprocess spawning.
 */
async function probeSpawnEnv(shellPath) {
  try {
    let envResult = await Kb(shellPath, ["-c", "env"], {
      reject: !1,
      timeout: GPn,
      maxBuffer: 1048576,
      env: {
        ...(process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : lO()),
        SHELL: shellPath,
        GIT_EDITOR: "true",
        CLAUDECODE: "1"
      }
    });
    if (envResult.exitCode !== 0 || !envResult.stdout) {
      A(`Spawn-env probe failed: exit=${envResult.exitCode} stderr=${envResult.stderr?.slice(0, 200)}`), SIn(null);
      return;
    }
    let envKeys = [];
    for (let line of envResult.stdout.split(`
`)) {
      let match = line.match(FXd);
      if (match) envKeys.push(match[1]);
    }
    A(`Spawn-env probe captured ${envKeys.length} keys`), SIn(envKeys);
  } catch (err) {
    A(`Spawn-env probe error: ${err}`), SIn(null);
  }
}
var vma,
  VPn,
  KPn,
  uBt,
  yeo = "\\",
  GPn = 1e4,
  beo = "CLAUDE_CODE_EXECPATH",
  IXd = "CLAUDE_CODE_INVOKED_SKILLS",
  DXd,
  wma = async shellPath => {
    let shellKind = shellPath.includes("zsh") ? "zsh" : shellPath.includes("bash") ? "bash" : "sh";
    return A(`Creating shell snapshot for ${shellKind} (${shellPath})`), new Promise(async resolve => {
      try {
        let configPath = resolveShellConfigPath(shellPath);
        A(`Looking for shell config file: ${configPath}`);
        let hasUserConfig = await Gu(configPath);
        if (!hasUserConfig) A(`Shell config file not found: ${configPath}, creating snapshot with Claude Code defaults only`);
        let timestamp = Date.now(),
          randomSuffix = Math.random().toString(36).substring(2, 8),
          snapshotsDir = uBt.join(or(), "shell-snapshots");
        A(`Snapshots directory: ${snapshotsDir}`);
        let snapshotPath = uBt.join(snapshotsDir, `snapshot-${shellKind}-${timestamp}-${randomSuffix}.sh`);
        await VPn.mkdir(snapshotsDir, {
          recursive: !0
        });
        let snapshotScript = await buildSnapshotScript(shellPath, snapshotPath, hasUserConfig);
        A(`Creating snapshot at: ${snapshotPath}`), A(`Execution timeout: ${GPn}ms`), vma.execFile(shellPath, ["-c", "-l", snapshotScript], {
          env: {
            ...(process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : lO()),
            SHELL: shellPath,
            GIT_EDITOR: "true",
            CLAUDECODE: "1"
          },
          timeout: GPn,
          maxBuffer: 1048576,
          encoding: "utf8",
          windowsHide: !0
        }, async (execErr, stdout, stderr) => {
          if (execErr) {
            let errInfo = execErr;
            if (A(`Shell snapshot creation failed: ${execErr.message}`), A("Error details:"), A(`  - Error code: ${errInfo?.code}`), A(`  - Error signal: ${errInfo?.signal}`), A(`  - Error killed: ${errInfo?.killed}`), A(`  - Shell path: ${shellPath}`), A(`  - Config file: ${resolveShellConfigPath(shellPath)}`), A(`  - Config file exists: ${hasUserConfig}`), A(`  - Working directory: ${Lt()}`), A(`  - Claude home: ${or()}`), A(`Full snapshot script:
${snapshotScript}`), stdout) A(`stdout output (${stdout.length} chars):
${stdout}`);else A("No stdout output captured");
            if (stderr) A(`stderr output (${stderr.length} chars): ${stderr}`);else A("No stderr output captured");
            A(`Failed to create shell snapshot: ${execErr.message}`, {
              level: "error"
            });
            let signalNumber = errInfo?.signal ? KPn.constants.signals[errInfo.signal] : void 0;
            W("tengu_shell_snapshot_failed", {
              stderr_length: stderr?.length || 0,
              has_error_code: !!errInfo?.code,
              error_signal_number: signalNumber,
              error_killed: errInfo?.killed
            }), resolve(void 0);
          } else {
            let snapshotSize;
            try {
              snapshotSize = (await VPn.stat(snapshotPath)).size;
            } catch {}
            if (snapshotSize !== void 0) A(`Shell snapshot created successfully (${snapshotSize} bytes)`), Si(async () => {
              try {
                await Wt().unlink(snapshotPath), A(`Cleaned up session snapshot: ${snapshotPath}`);
              } catch (cleanupErr) {
                A(`Error cleaning up session snapshot: ${cleanupErr}`);
              }
            }), resolve(snapshotPath);else {
              A(`Shell snapshot file not found after creation: ${snapshotPath}`), A(`Checking if parent directory still exists: ${snapshotsDir}`);
              try {
                let dirEntries = await Wt().readdir(snapshotsDir);
                A(`Directory contains ${dirEntries.length} files`);
              } catch {
                A(`Parent directory does not exist or is not accessible: ${snapshotsDir}`);
              }
              W("tengu_shell_unknown_error", {}), resolve(void 0);
            }
          }
        });
      } catch (err) {
        if (A(`Unexpected error during snapshot creation: ${err}`, {
          level: "error"
        }), err instanceof Error) A(`Error stack trace: ${err.stack}`);
        W("tengu_shell_snapshot_error", {}), resolve(void 0);
      }
    });
  },
  FXd;
var Hma = b(() => {
  kt();
  ud();
  Po();
  qe();
  NW();
  Ir();
  dn();
  Xl();
  ps();
  Es();
  Eg();
  tee();
  zN();
  VM();
  r2();
  o_e();
  b1t();
  vma = require("child_process"), VPn = require("fs/promises"), KPn = x(require("os")), uBt = require("path");
  DXd = [".git", ".svn", ".hg", ".bzr", ".jj", ".sl"];
  FXd = /^([A-Za-z_][A-Za-z0-9_]*)=/;
});

export {defineShadowFunction as Teo,buildRipgrepShadow as xXd,buildFindGrepShadow as PXd,buildBqShadow as OXd,resolveShellConfigPath as Seo,buildShellStateSnippet as LXd,buildShadowsAndPathSnippet as MXd,buildSnapshotScript as NXd,probeSpawnEnv as kma,vma,VPn,KPn,uBt,yeo,GPn,beo,IXd,DXd,wma,FXd,Hma};
