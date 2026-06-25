// @ts-nocheck
import {OVt,rPo} from "./5154_onStarting.ts";
import {N6,sGe} from "../config/5153_proto.ts";
import {qKn,AT,fue} from "../../vendor/m4610.ts";
import {nWe,mue,CL} from "../../vendor/m4609.ts";
import {zd,bL} from "../../vendor/m4515.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {In,Ce,Ct} from "../../vendor/m197.ts";
import {sleep as Kn} from "./1488_withTimeout.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bo} from "../../vendor/m5.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function Ako(e, t = false, n = Date.now()) {
  let r = fko;
  if (!r) {
    pko ??= (e.source === "shell" ? OVt() : N6({
      forceTransient: true
    })).finally(() => {
      pko = null;
    });
    let s = await pko;
    if (!s.ok) return mko("daemon-unreachable", s.reason, e.source, n), {
      ok: false,
      reason: "daemon-unreachable",
      detail: s.reason
    };
  }
  let o = qKn("cli-bg-dispatch");
  try {
    let s = nWe(),
      i = YOl.join(s, `${e.short}.json`),
      a = "ack-timeout",
      l = "no ack",
      c = zOl.randomBytes(4).toString("hex");
    for (let u = 0; u < 3; u++) {
      if (r) {
        let m = await AT({
          proto: zd,
          op: "dispatch",
          d: {
            ...e,
            nonce: c
          },
          timeoutMs: 5000,
          auth: await mue()
        }, {
          timeoutMs: 6000
        });
        if (m.ok && m.op === "dispatch") return KOl(e, m.pid, m.messagingSock, n, m.via);
        if ("code" in m && m.code === "EALIVE") return mko("short-alive", m.error, e.source, n), {
          ok: false,
          reason: "short-alive",
          detail: m.error,
          nonce: c
        };
        if ("code" in m && m.code === "ESTALE") {
          if (a = "stale-short", l = m.error, u < 2) {
            A(`bg: stale handle for ${e.short}, retrying dispatch (${u + 1}/2)`);
            continue;
          }
          break;
        }
        A(`bg: socket dispatch fell through (${"code" in m ? m.code : "?"}), using file path`);
      }
      try {
        let m = Pe({
          ...e,
          nonce: c
        });
        await vf(i, m, 384).catch(async f => {
          if (!In(f)) throw f;
          await oKn.mkdir(s, {
            recursive: true,
            mode: 448
          }), await vf(i, m, 384);
        });
      } catch (m) {
        a = "dispatch-write", l = Ce(m);
        break;
      }
      let d = await AT({
        proto: zd,
        op: "await-ack",
        short: e.short,
        nonce: c,
        timeoutMs: 5000
      }, {
        timeoutMs: 6000
      });
      for (let m = 0; !d.ok && d.code === "ESTARTING" && m < 40; m++) await Kn(200), d = await AT({
        proto: zd,
        op: "await-ack",
        short: e.short,
        nonce: c,
        timeoutMs: 5000
      }, {
        timeoutMs: 6000
      });
      if (d.ok && d.op === "await-ack") return KOl(e, d.pid, d.messagingSock, n, d.via);
      await oKn.unlink(i).catch(() => {});
      let p = "code" in d ? d.code : undefined;
      if (p === "EALIVE") a = "short-alive";else if (p === "ESTALE") a = "stale-short";else if (p === "ENOCONN") a = "enoconn";else if (p === "ESTARTING") a = "estarting";else a = "ack-timeout";
      if (l = p ? `${p}: ${"error" in d ? d.error : "no ack"}` : "error" in d ? d.error : "no ack", u === 2 || a !== "stale-short" && a !== "ack-timeout") break;
      A(`bg: ${a} for ${e.short}, retrying dispatch (${u + 1}/2)`);
    }
    if (!t && (a === "enoconn" || a === "estarting")) return fko = false, await Ako(e, true, n);
    return mko(a, l, e.source, n), A(`bg: daemon dispatch fallback (${a}): ${l}`, {
      level: "warn"
    }), {
      ok: false,
      reason: a,
      detail: l,
      nonce: c
    };
  } finally {
    o();
  }
}
function KOl(e, t, n, r, o) {
  return fko = true, W("tengu_bg_dispatch", {
    backend_daemon: true,
    source_shell: e.source === "shell",
    source_slash: e.source === "slash",
    source_fleet: e.source === "fleet",
    source_spare: e.source === "spare",
    source_respawn: e.source === "respawn",
    has_worktree: e.worktree !== undefined,
    has_agent: e.agent !== undefined,
    ms: Date.now() - r,
    via: Bo(o)
  }), {
    ok: true,
    pid: t,
    messagingSock: n
  };
}
function mko(e, t, n, r) {
  let o = Yt(),
    s = [...t.matchAll(/\bE[A-Z]{2,14}\b/g)].filter(a => !"/\\".includes(t[a.index - 1] ?? ".")).map(a => a[0]),
    i = s.length > 0 ? s.join(",") : /[\\/]/.test(t) ? "<path-bearing>" : t.slice(0, 80);
  W("tengu_bg_dispatch_fallback", {
    ms: Date.now() - r,
    reason_unreachable: e === "daemon-unreachable",
    reason_ack_timeout: e === "ack-timeout",
    reason_write: e === "dispatch-write",
    reason_enoconn: e === "enoconn",
    reason_estarting: e === "estarting",
    reason_stale_short: e === "stale-short",
    reason_short_alive: e === "short-alive",
    platform_darwin: o === "macos",
    platform_linux: o === "linux",
    platform_windows: o === "windows",
    source_spare: n === "spare",
    source_respawn: n === "respawn",
    detail: i
  });
}
var zOl,
  oKn,
  YOl,
  fko = false,
  pko = null;
var JOl = b(() => {
  rPo();
  fue();
  sGe();
  CL();
  bL();
  kt();
  Pv();
  qe();
  Ct();
  Es();
  tn();
  zOl = require("crypto"), oKn = require("fs/promises"), YOl = require("path");
});

export {Ako as EPo,KOl as C$l,mko as SPo,zOl as A$l,oKn as XJn,YOl as R$l,fko as bPo,pko as TPo,JOl as v$l};
