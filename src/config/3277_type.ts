// @ts-nocheck
import {Sia as isa,bia as asa,BYr as $zr,Eia as lsa} from "./3275_type.ts";
import {Ie as He,isTmuxControlMode as Bt,ln as cn} from "../telemetry/0594_feature_name.ts";
import {ORn as Ywn,qOt as _Ot} from "./2776_qOt.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {lF as ZB,JS as GS,Mw as Pw} from "./2221_recursive.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {UD,L2 as v2} from "./0640_existsSync.ts";
import {wia as dsa,via as usa,Cia as csa,r0n as _In,UYr as jzr,Ria as psa} from "../../vendor/m3275.ts";
import {gia as nsa} from "./3273_bW.ts";
import {Xa as Ja} from "../../vendor/m2509.ts";
import {l$i as e2i,K2e as v2e} from "../../vendor/m2764.ts";
import {st as rt} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {lt as ct} from "../session/0131_sent.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function LN4(H) {
  if (process.env.CLAUDE_CODE_SHELL_PREFIX) return "{ shopt -u extglob || setopt NO_EXTENDED_GLOB NO_BARE_GLOB_QUAL; } >/dev/null 2>&1 || true";
  if (H.includes("bash")) return "shopt -u extglob 2>/dev/null || true";else if (H.includes("zsh")) return "setopt NO_EXTENDED_GLOB NO_BARE_GLOB_QUAL 2>/dev/null || true";
  return null;
}
async function Asa(e, t) {
  let n,
    r = t?.skipSnapshot ? Promise.resolve(undefined) : isa(e).then(i => (He("shell_snapshot_create"), Ywn(i !== undefined), i)).catch(i => {
      v(`Failed to create shell snapshot: ${i}`), Bt("shell_snapshot_create", "snapshot_failed"), Ywn(false);
      return;
    });
  if (!t?.skipSnapshot) asa(e).catch(() => {});
  let o,
    s = false;
  return {
    type: "bash",
    shellPath: e,
    detached: true,
    async buildExecCommand(i, a) {
      let l = await r;
      if (l) try {
        await msa.access(l);
      } catch {
        if (v(`Snapshot file missing, falling back to login shell: ${l}`), !s) s = true, Bt("shell_snapshot_create", "snapshot_missing_at_exec");
        l = undefined;
      }
      o = l, Ywn(l !== undefined), n = a.sandboxTmpDir;
      let c = ZB(),
        u = Yt() === "windows",
        d = u ? UD(c) : c,
        p = a.useSandbox ? m1t.join(a.sandboxTmpDir, `cwd-${a.id}`) : m1t.join(d, `claude-${a.id}-cwd`),
        m = a.useSandbox ? m1t.join(a.sandboxTmpDir, `cwd-${a.id}`) : fsa.join(c, `claude-${a.id}-cwd`),
        f = dsa(i),
        A = usa(f),
        h = csa(f, A);
      if (f.includes("|") && A) h = nsa(f);
      let g = [];
      if (l) {
        let S = Yt() === "windows" ? UD(l) : l;
        g.push(`source ${Ja([S])} 2>/dev/null || true`);
      }
      if (u) g.push(`export TEMP=${Ja([c])} TMP=${Ja([c])}`);
      let _ = await e2i();
      if (_) g.push(`${_}
:`);
      if (rt(process.env.CLAUDE_CODE_REMOTE)) g.push('export BUN_OPTIONS="--smol${BUN_OPTIONS:+ $BUN_OPTIONS}"');
      let y = LN4(e);
      if (y) g.push(y);
      g.push(`eval ${h}`), g.push(`pwd -P >| ${Ja([p])}`);
      let T = g.join(" && ");
      if (process.env.CLAUDE_CODE_SHELL_PREFIX) T = _In(process.env.CLAUDE_CODE_SHELL_PREFIX, T);
      return {
        commandString: T,
        cwdFilePath: m
      };
    },
    getSpawnArgs(i) {
      let a = o !== undefined;
      if (a) v("Spawning shell without login (-l flag skipped)");
      return ["-c", ...(a ? [] : ["-l"]), i];
    },
    async getEnvironmentOverrides(i, a) {
      let l = null,
        c = {};
      if (c[$zr] = process.execPath, l) c.TMUX = l;
      if (a) for (let [u, d] of a) c[u] = d;
      if (n) {
        let u = n;
        if (Yt() === "windows") u = UD(u);
        c.TMPDIR = u, c.CLAUDE_CODE_TMPDIR = GS(), c.TMPPREFIX = m1t.join(u, "zsh");
      }
      return c;
    }
  };
}
var msa, fsa, m1t;
var hsa = b(() => {
  ct();
  cn();
  lsa();
  jzr();
  psa();
  _Ot();
  je();
  an();
  $s();
  v2e();
  Pw();
  v2();
  msa = require("fs/promises"), fsa = require("path"), m1t = require("path/posix");
});

export {LN4 as t8d,Asa as Hia,msa as xia,fsa as kia,m1t as O1t,hsa as Iia};
