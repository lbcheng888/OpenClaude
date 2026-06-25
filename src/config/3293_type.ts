// @ts-nocheck
import {wma as isa,kma as asa,beo as $zr,Hma as lsa} from "./3291_type.ts";
import {He,Pt as Bt,mn as cn} from "../telemetry/0600_feature_name.ts";
import {TIn as Ywn,b1t as _Ot} from "./2788_b1t.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {xF as ZB,hE as GS,resolveToolAlias as Pw} from "./2229_observed_uid.ts";
import {Yt,Es as $s} from "../../vendor/m641.ts";
import {Qx as UD,r2 as v2} from "./0646_existsSync.ts";
import {Dma as dsa,xma as usa,Ima as csa,zPn as _In,Ceo as jzr,Pma as psa} from "../../vendor/m3291.ts";
import {Cma as nsa} from "./3289_NW.ts";
import {Ma as Ja} from "../../vendor/m2519.ts";
import {Z5i as e2i,Z$e as v2e} from "../../vendor/m2776.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {b} from "../../runtime.ts";
import {lt as ct} from "../session/0132_sent.ts";
import {dn as an} from "./0137_namespace.ts";
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
export {LN4 as qXd,Asa as Mma,msa as Oma,fsa as Lma,m1t as dBt,hsa as Nma};
