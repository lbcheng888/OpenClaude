// @ts-nocheck
import {RB as zb,U2n as EC6,Y_e as aYH} from "../../vendor/m3873.ts";
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {cn as L6,Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {ql as p1,e8 as Tn} from "../../vendor/m1485.ts";
import {b as L} from "../../runtime.ts";
/*
 * config/5101_cmd.ts - configuration and daemon-control restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
async function Ac6(H: any): Promise<any> {
  let {
      cmd: cmd,
      prefixArgs: prefixArgs
    } = zb(),
    K = [cmd, ...prefixArgs, ...H],
    O = rKT();
  if (t_() === "windows") {
    let Y = await cKT(K, O);
    if (Y.ok) return {
      err: null
    };
    N(`daemon: WMI spawn failed (${Y.reason}); falling back to direct spawn \u2014 daemon will not survive SSH/terminal close`, {
      level: "warn"
    }), c("tengu_bg_daemon_wmi_fallback", {
      timeout: Y.reason === "timeout",
      enoent: Y.reason === "enoent",
      rc: Y.rc
    });
  }
  let T = await Yc6.mkdtemp(AXq.join(bZ4.tmpdir(), "cc-daemon-")).catch((): any => null),
    stderrPath = T ? AXq.join(T, "stderr.log") : void 0,
    $ = stderrPath ? await Yc6.open(stderrPath, "w").catch((): any => null) : null;
  try {
    let err = await YXq(K, O, $?.fd),
      A = L6(err);
    if (A === "ENOENT" || A === "EACCES") {
      let w = zb({
        pinToCurrentBinary: !0
      });
      if (w.cmd !== cmd) {
        c("tengu_bg_daemon_spawn_execpath_fallback", {
          errno_enoent: A === "ENOENT",
          errno_eacces: A === "EACCES"
        });
        let err = await YXq([w.cmd, ...w.prefixArgs, ...H], O, $?.fd);
        if (L6(err) !== "ENOENT") return {
          err: err,
          stderrPath: stderrPath
        };
        let j = await EC6();
        if (c("tengu_bg_daemon_spawn_versions_fallback", {
          found: j !== null
        }), j !== null && j !== w.cmd) return {
          err: await YXq([j, ...H], O, $?.fd),
          stderrPath: stderrPath
        };
        return {
          err: err,
          stderrPath: stderrPath
        };
      }
    }
    return {
      err: err,
      stderrPath: stderrPath
    };
  } finally {
    await $?.close().catch((): any => {});
  }
}
async function YXq(H: any, env: any, q: any): Promise<any> {
  let K = null;
  try {
    let O = wXq.spawn(H[0], H.slice(1), {
      detached: !0,
      stdio: ["ignore", "ignore", q ?? "ignore"],
      windowsHide: !0,
      env: env
    });
    O.once("error", (T: any): any => {
      K = T;
    }), O.unref();
  } catch (O) {
    K = O;
  }
  return await new Promise((O: any): any => setImmediate(O)), K;
}
function cKT(H: any, env: any): any {
  let q;
  try {
    q = dKT(lKT(H));
  } catch (T) {
    return Promise.resolve({
      ok: !1,
      reason: GH(T)
    });
  }
  let K = Buffer.from(q, "utf16le").toString("base64"),
    O = process.env.SYSTEMROOT || "C:\\Windows";
  return new Promise((T: any): any => {
    let z = !1,
      $ = (w: any): any => {
        if (z) return;
        z = !0, clearTimeout(A), T(w);
      },
      Y = wXq.spawn(`${O}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`, ["-NoProfile", "-NonInteractive", "-EncodedCommand", K], {
        stdio: "ignore",
        windowsHide: !0,
        env: env
      });
    Y.once("error", (w: any): any => $({
      ok: !1,
      reason: L6(w) === "ENOENT" ? "enoent" : GH(w)
    })), Y.once("exit", (w: any): any => {
      if (w === 0) $({
        ok: !0
      });else $({
        ok: !1,
        reason: `Win32_Process.Create rc=${w}`,
        rc: w ?? void 0
      });
    });
    let A = setTimeout((w: any, f: any): any => {
      f.kill(), w({
        ok: !1,
        reason: "timeout"
      });
    }, 5000, $, Y);
    A.unref();
  });
}
function dKT(H: any): any {
  return ['$ErrorActionPreference = "Stop"', '$e = [string[]](Get-ChildItem Env: | ForEach-Object { "$($_.Name)=$($_.Value)" })', "$s = New-CimInstance -ClassName Win32_ProcessStartup -ClientOnly -Property @{ EnvironmentVariables = $e; ShowWindow = [uint16]0; CreateFlags = [uint32]8 }", `$r = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = ${iKT(H)}; CurrentDirectory = $env:USERPROFILE; ProcessStartupInformation = $s }`, "exit $r.ReturnValue"].join(`
`);
}
function lKT(H: any): any {
  return H.map(nKT).join(" ");
}
function nKT(H: any): any {
  if (H.length > 0 && !/[\s"]/.test(H)) return H;
  let _ = '"',
    q = 0;
  while (q < H.length) {
    let K = 0;
    while (H[q] === "\\") K++, q++;
    if (q === H.length) _ += "\\".repeat(K * 2);else if (H[q] === '"') _ += "\\".repeat(K * 2 + 1) + '"', q++;else _ += "\\".repeat(K) + H[q], q++;
  }
  return _ + '"';
}
function iKT(H: any): any {
  if (/[\u2018\u2019\u201A\u201B]/.test(H)) throw Error("unsupported Unicode single-quote in command line");
  return `'${H.replaceAll("'", "''")}'`;
}
function rKT(): any {
  let H = {
    ...process.env,
    INVOCATION_ID: ""
  };
  if (delete H.CLAUDECODE, delete H.CLAUDE_CODE_SESSION_ID, delete H.CLAUDE_CODE_CHILD_SESSION, t_() !== "macos" && process.env.CLAUDE_CODE_OAUTH_TOKEN) {
    if (!!p1().read()?.claudeAiOauth?.refreshToken) delete H.CLAUDE_CODE_OAUTH_TOKEN, delete H.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR;
  }
  return H;
}
var wXq, Yc6, bZ4, AXq;
var fXq = L((): any => {
  y_();
  FH();
  L_();
  y9();
  Tn();
  aYH();
  wXq = require("child_process"), Yc6 = require("fs/promises"), bZ4 = require("os"), AXq = require("path");
});
export {Ac6 as NJn,YXq as XDo,cKT as QAm,dKT as ZAm,lKT as eRm,nKT as tRm,iKT as nRm,rKT as rRm,wXq as ZDo,Yc6 as MJn,bZ4 as q2l,AXq as QDo,fXq as ePo};
