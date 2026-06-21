// @ts-nocheck
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {Xae as Uae,Ske as oke} from "../../vendor/m3273.ts";
import {UD,L2 as v2} from "./0640_existsSync.ts";
import {Xa as Ja} from "../../vendor/m2509.ts";
import {f2e as GUe,oee as YZ} from "./2670_cause.ts";
import {Zw as Yw,bW as oW} from "./3273_bW.ts";
import {qb as Fb,vB as hB} from "../../vendor/m682.ts";
import {getEnabledPluginBinPaths as qzr,gg as mg} from "../agent/4445_resolvePluginRoot.ts";
import {subprocessEnv as PO,P1 as E1} from "../agent/2223_subprocessEnv.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {LRn as Jwn,qOt as _Ot} from "./2776_qOt.ts";
import {ud as pd,mc} from "./0645_maxBytes.ts";
import {tr as sr,sn as an} from "./0047_namespace.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {b,M as L} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
function LN4(H, t, n = [], r = []) {
  let o = n.length > 0 ? `${n.join(" ")} \${1+"$@"}` : '${1+"$@"}',
    s = Yt() === "windows",
    i = p1t.join(Uae(), s ? "claude.exe" : "claude"),
    a = s ? UD(i) : i,
    l = r.length > 0 ? ["  local _cc_a", '  for _cc_a in ${1+"$@"}; do', `    case "$_cc_a" in ${r.join("|")}) command ${H} \${1+"$@"}; return ;; esac`, "  done"] : [];
  return [`function ${H} {`, ...l, `  local _cc_bin="\${${$zr}:-}"`, `  [[ -x $_cc_bin ]] || _cc_bin=${Ja([a])}`, `  if [[ ! -x $_cc_bin ]]; then command ${H} \${1+"$@"}; return; fi`, "  if [[ -n ${ZSH_VERSION:-} ]]; then", `    ARGV0=${t} "$_cc_bin" ${o}`, '  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then', `    ARGV0=${t} "$_cc_bin" ${o}`, "  else", `    (exec -a ${t} "$_cc_bin" ${o})`, "  fi", "}"].join(`
`);
}
function Sqd() {
  let e = GUe();
  if (e.argv0) return {
    type: "function",
    snippet: LN4("rg", e.argv0)
  };
  let t = Ja([e.rgPath]),
    n = e.rgArgs.map(o => Ja([o]));
  return {
    type: "alias",
    snippet: e.rgArgs.length > 0 ? `${t} ${n.join(" ")}` : t
  };
}
function Eqd() {
  if (!Yw()) return null;
  return ["unalias find 2>/dev/null || true", "unalias grep 2>/dev/null || true", LN4("find", "bfs", ["-S", "dfs", "-regextype", "findutils-default"]), LN4("grep", "ugrep", ["-G", "--ignore-files", "--hidden", "-I", ...bqd.map(e => `--exclude-dir=${e}`)], ["-*-filter*", "-*-pager*", "-*-view*", "-*-format-open*", "-*-config*", "---*", "-@*", "-*-save-config*"])].join(`
`);
}
function Cqd() {
  return null;
}
function Uzr(e) {
  let t = e.includes("zsh") ? ".zshrc" : e.includes("bash") ? ".bashrc" : ".profile";
  return p1t.join(gIn.homedir(), t);
}
function vqd(e) {
  let t = e.endsWith(".zshrc"),
    n = "";
  if (t) n += `
      echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      typeset -f > /dev/null 2>&1

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      typeset +f | grep -vE '^_[^_]' | while read func; do
        typeset -f "$func" >> "$SNAPSHOT_FILE"
      done
    `;else n += `
      echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      declare -f > /dev/null 2>&1

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      declare -F | cut -d' ' -f3 | grep -vE '^_[^_]' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval ${Bzr}"${Bzr}$(echo '$encoded_func' | base64 -d)${Bzr}" > /dev/null 2>&1" >> "$SNAPSHOT_FILE"
      done
    `;
  if (t) n += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      setopt | sed 's/^/setopt /' | head -n 1000 >> "$SNAPSHOT_FILE"
    `;else n += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      shopt -p | head -n 1000 >> "$SNAPSHOT_FILE"
      set -o | grep "on" | awk '{print "set -o " $1}' | head -n 1000 >> "$SNAPSHOT_FILE"
      echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"
    `;
  return n += `
      echo "# Aliases" >> "$SNAPSHOT_FILE"
      # Filter out winpty aliases on Windows to avoid "stdin is not a tty" errors
      # Git Bash automatically creates aliases like "alias node='winpty node.exe'" for
      # programs that need Win32 Console in mintty, but winpty fails when there's no TTY
      if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        alias | grep -v "='winpty " | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      else
        alias | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      fi
  `, n;
}
async function wqd(e) {
  let t = process.env.PATH;
  if (Yt() === "windows") {
    let l = await Fb(e, ["-lc", 'echo "$PATH"'], {
      reject: false,
      timeout: AIn
    });
    if (l.exitCode === 0 && l.stdout) t = l.stdout.trim();
  }
  let n = await qzr();
  if (n.length > 0) {
    let l = Yt() === "windows" ? n.map(UD) : n;
    t = [t, ...l].filter(Boolean).join(":");
  }
  let r = Sqd(),
    o = "";
  if (o += `
      # Check for rg availability
      echo "# Check for rg availability" >> "$SNAPSHOT_FILE"
      echo "if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then" >> "$SNAPSHOT_FILE"
  `, r.type === "function") o += `
      cat >> "$SNAPSHOT_FILE" << 'RIPGREP_FUNC_END'
  ${r.snippet}
RIPGREP_FUNC_END
    `;else {
    let l = r.snippet.replaceAll("'", "'\\''");
    o += `
      echo '  alias rg='"'${l}'" >> "$SNAPSHOT_FILE"
    `;
  }
  o += `
      echo "fi" >> "$SNAPSHOT_FILE"
  `;
  let s = Eqd();
  if (s !== null) o += `
      # Shadow find/grep with embedded bfs/ugrep (ant-native only)
      echo "# Shadow find/grep with embedded bfs/ugrep" >> "$SNAPSHOT_FILE"
      cat >> "$SNAPSHOT_FILE" << 'FIND_GREP_FUNC_END'
${s}
FIND_GREP_FUNC_END
    `;
  let i = Cqd();
  if (i !== null) o += `
      echo "# Shadow bq to label query jobs with source=claude_code" >> "$SNAPSHOT_FILE"
      cat >> "$SNAPSHOT_FILE" << 'BQ_FUNC_END'
${i}
BQ_FUNC_END
    `;
  let a = `PATH_END_${Math.random().toString(36).substring(2, 18)}`;
  return o += `

      # Add PATH to the file
      cat >> "$SNAPSHOT_FILE" << '${a}'
export PATH=${Ja([t || ""])}
${a}
  `, o;
}
async function Rqd(e, t, n) {
  let r = Uzr(e),
    o = r.endsWith(".zshrc"),
    s = n ? vqd(r) : !o ? 'echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"' : "",
    i = await wqd(e);
  return `SNAPSHOT_FILE=${Ja([t])}
      ${n ? `source "${r}" < /dev/null` : "# No user config file to source"}

      # First, create/clear the snapshot file
      echo "# Snapshot file" >| "$SNAPSHOT_FILE"

      # When this file is sourced, we first unalias to avoid conflicts
      # This is necessary because aliases get "frozen" inside function definitions at definition time,
      # which can cause unexpected behavior when functions use commands that conflict with aliases
      echo "# Unset all aliases to avoid conflicts with functions" >> "$SNAPSHOT_FILE"
      echo "unalias -a 2>/dev/null || true" >> "$SNAPSHOT_FILE"

      ${s}

      ${i}

      # Exit silently on success, only report errors
      if [ ! -f "$SNAPSHOT_FILE" ]; then
        echo "Error: Snapshot file was not created at $SNAPSHOT_FILE" >&2
        exit 1
      fi
    `;
}
async function asa(e) {
  try {
    let t = await Fb(e, ["-c", "env"], {
      reject: false,
      timeout: AIn,
      maxBuffer: 1048576,
      env: {
        ...(process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : PO()),
        SHELL: e,
        GIT_EDITOR: "true",
        CLAUDECODE: "1"
      }
    });
    if (t.exitCode !== 0 || !t.stdout) {
      v(`Spawn-env probe failed: exit=${t.exitCode} stderr=${t.stderr?.slice(0, 200)}`), Jwn(null);
      return;
    }
    let n = [];
    for (let r of t.stdout.split(`
`)) {
      let o = r.match(xqd);
      if (o) n.push(o[1]);
    }
    v(`Spawn-env probe captured ${n.length} keys`), Jwn(n);
  } catch (t) {
    v(`Spawn-env probe error: ${t}`), Jwn(null);
  }
}
var ssa,
  hIn,
  gIn,
  p1t,
  Bzr = "\\",
  AIn = 1e4,
  $zr = "CLAUDE_CODE_EXECPATH",
  Tqd = "CLAUDE_CODE_INVOKED_SKILLS",
  bqd,
  isa = async e => {
    let t = e.includes("zsh") ? "zsh" : e.includes("bash") ? "bash" : "sh";
    return v(`Creating shell snapshot for ${t} (${e})`), new Promise(async n => {
      try {
        let r = Uzr(e);
        v(`Looking for shell config file: ${r}`);
        let o = await pd(r);
        if (!o) v(`Shell config file not found: ${r}, creating snapshot with Claude Code defaults only`);
        let s = Date.now(),
          i = Math.random().toString(36).substring(2, 8),
          a = p1t.join(sr(), "shell-snapshots");
        v(`Snapshots directory: ${a}`);
        let l = p1t.join(a, `snapshot-${t}-${s}-${i}.sh`);
        await hIn.mkdir(a, {
          recursive: true
        });
        let c = await Rqd(e, l, o);
        v(`Creating snapshot at: ${l}`), v(`Execution timeout: ${AIn}ms`), ssa.execFile(e, ["-c", "-l", c], {
          env: {
            ...(process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : PO()),
            SHELL: e,
            GIT_EDITOR: "true",
            CLAUDECODE: "1"
          },
          timeout: AIn,
          maxBuffer: 1048576,
          encoding: "utf8",
          windowsHide: true
        }, async (u, d, p) => {
          if (u) {
            let m = u;
            if (v(`Shell snapshot creation failed: ${u.message}`), v("Error details:"), v(`  - Error code: ${m?.code}`), v(`  - Error signal: ${m?.signal}`), v(`  - Error killed: ${m?.killed}`), v(`  - Shell path: ${e}`), v(`  - Config file: ${Uzr(e)}`), v(`  - Config file exists: ${o}`), v(`  - Working directory: ${Pt()}`), v(`  - Claude home: ${sr()}`), v(`Full snapshot script:
${c}`), d) v(`stdout output (${d.length} chars):
${d}`);else v("No stdout output captured");
            if (p) v(`stderr output (${p.length} chars): ${p}`);else v("No stderr output captured");
            v(`Failed to create shell snapshot: ${u.message}`, {
              level: "error"
            });
            let f = m?.signal ? gIn.constants.signals[m.signal] : undefined;
            j("tengu_shell_snapshot_failed", {
              stderr_length: p?.length || 0,
              has_error_code: !!m?.code,
              error_signal_number: f,
              error_killed: m?.killed
            }), n(undefined);
          } else {
            let m;
            try {
              m = (await hIn.stat(l)).size;
            } catch {}
            if (m !== undefined) v(`Shell snapshot created successfully (${m} bytes)`), qi(async () => {
              try {
                await jt().unlink(l), v(`Cleaned up session snapshot: ${l}`);
              } catch (f) {
                v(`Error cleaning up session snapshot: ${f}`);
              }
            }), n(l);else {
              v(`Shell snapshot file not found after creation: ${l}`), v(`Checking if parent directory still exists: ${a}`);
              try {
                let f = await jt().readdir(a);
                v(`Directory contains ${f.length} files`);
              } catch {
                v(`Parent directory does not exist or is not accessible: ${a}`);
              }
              j("tengu_shell_unknown_error", {}), n(undefined);
            }
          }
        });
      } catch (r) {
        if (v(`Unexpected error during snapshot creation: ${r}`, {
          level: "error"
        }), r instanceof Error) v(`Error stack trace: ${r.stack}`);
        j("tengu_shell_snapshot_error", {}), n(undefined);
      }
    });
  },
  xqd;
var lsa = b(() => {
  Ct();
  Jd();
  Ko();
  je();
  oW();
  Or();
  an();
  mc();
  bs();
  $s();
  mg();
  YZ();
  hB();
  E1();
  v2();
  oke();
  _Ot();
  ssa = require("child_process"), hIn = require("fs/promises"), gIn = L(require("os")), p1t = require("path");
  bqd = [".git", ".svn", ".hg", ".bzr", ".jj", ".sl"];
  xqd = /^([A-Za-z_][A-Za-z0-9_]*)=/;
});

export {LN4 as MYr,Sqd as Wjd,Eqd as Vjd,Cqd as Kjd,Uzr as NYr,vqd as zjd,wqd as Yjd,Rqd as Jjd,asa as bia,ssa as Tia,hIn as t0n,gIn as n0n,p1t as P1t,Bzr as LYr,AIn as e0n,$zr as BYr,Tqd as jjd,bqd as Gjd,isa as Sia,xqd as Xjd,lsa as Eia};
