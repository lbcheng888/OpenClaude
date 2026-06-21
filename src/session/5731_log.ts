// @ts-nocheck
import {Ul,Oe,Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {M0o,zG,q0o} from "../agent/5207_cmd.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {K7n,p5t,TOl,z7n,Y7n} from "../telemetry/5125_Y7n.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {spawnSpare,claimSpare,reapOrphanSpares,FNo} from "./5726_spawnSpare.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {qp,dn,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "./0615_length.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {$Ue,jUe,vc,ma,pg,Lp,mg} from "../agent/2580_level.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {i5n,Ccl,Hje,UTo,nmt,vcl,L6t,eye,iD,$N,WP,O6t,Tne,sM} from "../../vendor/m4581.ts";
import {guc,_uc} from "./5729_force.ts";
import {vG,rmt,omt} from "./4584_proto.ts";
import {J7n,g8e,m5t} from "../../vendor/m5125.ts";
import {getProcessStartTimeAsync,sigtermThenKill,isProcessRunning,rE} from "../../vendor/m1456.ts";
import {buc,Euc} from "../telemetry/5730_recursive.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
import {Mwe,UUe} from "../../vendor/m2578.ts";
import {wN,$He} from "../../vendor/m3864.ts";
import {b} from "../../runtime.ts";
async function vuc(e, t = {}) {
  return Ul("daemon_bg_manager_start", async () => {
    let n = new Map(),
      r = new Set(),
      o = t.spawnPty ?? M0o(),
      s = t.onKeepAliveChange ?? (() => {}),
      i = !1,
      a = !1,
      l = null,
      c = !1,
      u = !1,
      d = t.spawnPty === void 0,
      p = () => {
        if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_spare_enable", !0)) {
          if (l) l.dispose(), l = null;
          return;
        }
        let x = K7n();
        if (x > 0 && WNo.freemem() < x) {
          if (l) l.dispose(), l = null;
          return;
        }
        if (!u || l || c || i || !a || !o || !d || zt() === "windows") return;
        c = !0;
        let H = null,
          I = !1;
        spawnSpare({
          log: e,
          onExit: () => {
            if (H === null) {
              I = !0;
              return;
            }
            if (l === H) {
              if (l = null, Date.now() - H.startedAt >= 2000) p();
            }
          }
        }).then(P => {
          if (H = P, !P || i || I) {
            P?.dispose();
            return;
          }
          l = P, logEvent("tengu_bg_spare_spawn", {});
        }).catch(P => {
          if (qp(P)) {
            logForDebugging(`bg-spare spawn failed: ${dn(P)} ${P.message}`, {
              level: "warn"
            });
            return;
          }
          De(P);
        }).finally(() => {
          c = !1;
        });
      },
      m = async (x, H = 0, I) => {
        if (i) return "closed";
        u = !0;
        let P = n.get(x.short);
        if (P) {
          if ((P.isKilling || P.isRetiring || P.record.outcome) && H < 30) {
            if (H === 15 && (P.isKilling || P.isRetiring)) logEvent("tengu_bg_dispatch_sigkill_escalate", {}), P.kill("SIGKILL");
            return await sleep(100), m(x, H + 1, I);
          }
          let O = P.isKilling || P.isRetiring || P.record.outcome;
          if (e(O ? `bg: dispatch ${x.short} dropped — retry budget exhausted (handle still settling)` : `bg: dup dispatch ${x.short} dropped (existing handle still live)`), O) return Oe("daemon_bg_session_create", "dup_retry_exhausted"), "dropped";
          return Ie("daemon_bg_session_create"), "dup-live";
        }
        let L = WNo.freemem(),
          D = K7n();
        if (D > 0 && L < D && n.size > 0) {
          let O = Math.round(L / 1024 / 1024);
          e(`bg: low memory (${O}MB free) — retiring settled workers before spawning ${x.short}`), logEvent("tengu_bg_dispatch_low_mem", {
            free_mb: O,
            handles: n.size
          }), $Ue().catch($ => (De($), new Set())).then($ => {
            for (let U of n.values()) U.retireIfSettled($No, $).catch(W => De(W));
          });
        }
        if (x.source === "spare" && D > 0 && L < D) return e(`bg: low memory — skipping spare dispatch ${x.short}`), "dropped";
        if (l && !I && x.launch.mode !== "exec" && l.cliVersion === {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION && getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_spare_enable", !0)) {
          let O = l;
          l = null;
          try {
            let $ = claimSpare(x, O, o, t.getAuthSnapshot);
            return n.set(x.short, $), jNo(n, $, s, r, e), s(), logEvent("tengu_bg_spare_claim", {
              age_ms: Date.now() - O.startedAt
            }), e(`bg claimed-spare ${x.short} (${x.source})`), Ie("daemon_bg_session_create"), p(), "claimed";
          } catch ($) {
            let U = dn($),
              W = U === "ENOENT" ? "enoent" : U === "ECONNREFUSED" ? "econnrefused" : $ instanceof Error ? "error" : "unknown";
            logEvent("tengu_bg_spare_claim_fail", {
              reason: fromEnum(W)
            }), O.dispose();
          }
        }
        let N = zG.spawn(x, o, t.getAuthSnapshot, I ? {
          afterUpgrade: I
        } : void 0);
        return n.set(x.short, N), jNo(n, N, s, r, e), s(), p(), e(`bg spawned ${x.short} (${x.source})`), Ie("daemon_bg_session_create"), "spawned";
      },
      f = (x = "SIGTERM") => {
        let H = 0;
        for (let I of n.values()) if (!I.record.outcome) I.kill(x), H++;
        return H;
      };
    await i5n(), await Ccl();
    let A = await guc(n, m, t.onNudge ?? (async () => !1), x => {
      let H = x ? f("SIGTERM") : 0;
      return t.onShutdown?.(), H;
    }, () => a, t.onYield ?? (() => !1));
    A.onLeaseChange.subscribe(s), A.onLeaseChange.subscribe(() => {
      if (A.leaseCount() > 0 && !u) u = !0, p();
    }), await Promise.all(zt() === "windows" ? [xg.mkdir(Hje(), {
      recursive: !0
    }).catch(() => {})] : [xg.mkdir(UTo(), {
      recursive: !0,
      mode: 448
    }).catch(() => {}), xg.mkdir(nmt(), {
      recursive: !0,
      mode: 448
    }).catch(() => {})]), vcl();
    let h = await vG(),
      g = 0,
      _ = 0,
      y = 0;
    if (await Promise.all(Object.entries(h.workers).map(async ([x, H]) => {
      let I;
      try {
        I = await zG.adopt(x, H, o, t.getAuthSnapshot);
      } catch (P) {
        De(P), _++;
        return;
      }
      if (!I && H.procStart === void 0 && H.ptySock && (await J7n(H.ptySock))) {
        H.procStart = await getProcessStartTimeAsync(H.pid);
        try {
          I = await zG.adopt(x, H, o, t.getAuthSnapshot);
        } catch (P) {
          De(P), I = null;
        }
        I ??= zG.unverified(x, H);
      }
      if (I) n.set(x, I), jNo(n, I, s, r, e), g++;else if (H.pendingRespawn === "upgrade") y++, logEvent("tengu_bg_adopt_upgrade_respawn", {}), m(H.dispatch, 0, !0).catch(P => De(P));else if (_++, jUe(x, "failed", "process gone while supervisor was down"), xg.unlink(L6t(x)).catch(() => {}), zt() === "windows") xg.unlink(eye(x)).catch(() => {}), xg.unlink(iD($N(x))).catch(() => {}), xg.unlink(WP($N(x))).catch(() => {});else if (xg.unlink(O6t(x)).catch(() => {}), xg.unlink(H.rendezvousSock).catch(() => {}), H.ptySock) {
        xg.unlink(H.ptySock).catch(() => {}), xg.unlink(iD(H.ptySock)).catch(() => {}), xg.unlink(WP(H.ptySock)).catch(() => {});
        try {
          process.kill(H.pid, 0);
        } catch {
          sigtermThenKill([-H.pid]);
        }
      }
    })), g + _ + y > 0) if (e(`bg adopt: adopted=${g} respawned=${y} dead=${_}`), logEvent("tengu_bg_adopt", {
      adopted: g,
      respawned: y,
      dead: _
    }), _ === 0) Ie("daemon_bg_adopt");else if (g > 0 || y > 0) isTmuxControlMode("daemon_bg_adopt", "partial");else Oe("daemon_bg_adopt", "all_workers_dead");
    if (!h.parseFailed) P6m(n, e);
    if (!h.parseFailed) await reapOrphanSpares(n, e);
    await rmt(x => {
      x.workers = {};
      for (let [H, I] of n) x.workers[H] = I.rosterEntry();
    }).catch(x => De(x));
    let T = await buc(x => void m(x).catch(H => De(H)));
    if (a = !0, s(), n.size > 0) u = !0;
    p();
    let S = Date.now(),
      v = !1,
      R = setInterval(async (x, H) => {
        if (v) return;
        v = !0;
        try {
          await k(x, H);
        } finally {
          v = !1;
        }
      }, qNo, n, p);
    async function k(x, H) {
      {
        let I = Date.now(),
          P = I - S - qNo;
        if (S = I, P > qNo) {
          for (let W of x.values()) W.shiftGraceClocksForward(P);
          H();
          return;
        }
        let L = p5t(),
          D = L ? $No : I6m,
          N = L ? $No : TOl(),
          O = await $Ue().catch(W => (De(W), new Set()));
        for (let W of x.values()) if (O.has(W.dispatch.short)) W.respawnIfIdleStale(O).catch(G => De(G));
        let $ = await Promise.all([...x.values()].map(W => W.retireIfSettled(D, O, N).then(G => G.retired).catch(G => (De(G), !1)))),
          U = Wn($, W => W);
        if (L && U === 0 && p5t()) {
          let W = [...x.values()].filter(G => O.has(G.dispatch.short));
          if (W.length > 0) {
            e("bg: low memory persists after shedding non-pinned — retiring pinned settled workers as a last resort"), logEvent("tengu_bg_retire_pinned_low_mem", {});
            for (let G of W) G.retireIfSettled(D, D6m, N).catch(V => De(V));
          }
        }
        if (!L && z7n()) {
          let W = getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_prewarm_per_sweep", 3),
            G = 12;
          for (let V of x.values()) {
            if (W <= 0 || G <= 0) break;
            if (O.has(V.dispatch.short)) continue;
            if (V.isBooting) {
              W--;
              continue;
            }
            if (!V.record.cliVersion || V.record.cliVersion === {
              ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
              PACKAGE_URL: "@anthropic-ai/claude-code",
              README_URL: "https://code.claude.com/docs/en/overview",
              VERSION: "2.1.185",
              FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
              BUILD_TIME: "2026-06-20T06:38:30Z",
              GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
            }.VERSION) continue;
            if ((await V.respawnIfIdleStale(void 0, "prewarm").catch(K => (De(K), {
              respawned: !1
            }))).respawned) W--;else G--;
          }
        }
        H();
      }
    }
    return R.unref(), {
      handles: n,
      dispatch: x => void m(x).catch(H => De(H)),
      leaseCount: A.leaseCount,
      liveHandleCount: () => {
        let x = 0;
        for (let H of n.values()) if (!H.record.outcome) x++;
        return x;
      },
      pendingSettleWrites: () => r.size,
      killAll: f,
      close: async () => {
        if (i = !0, clearInterval(R), l) l.dispose(), l = null;
        await Promise.all([T.close().catch(() => {}), A.close().catch(() => {})]);
        for (let x of n.values()) x.stop();
        if (await Promise.allSettled([...r]), n.size === 0 && !h.parseFailed && zt() !== "windows") await xg.rm(Tne(), {
          recursive: !0,
          force: !0
        }).catch(() => {});
      }
    };
  });
}
function jNo(e, t, n, r, o) {
  let s = i => {
    r.add(i), i.finally(() => r.delete(i));
  };
  t.onSettle.subscribe(i => {
    o(`bg settled ${t.record.short} (${i})`);
    let a = vc(t.record.short),
      l = i === "done" ? "done" : i === "killed" ? "stopped" : "failed",
      c = t.record.detail;
    if (t.shouldDeleteJobDir) s(xg.rm(a, {
      recursive: !0,
      force: !0
    }).catch(u => De(u)));else s(ma(a).then(u => {
      if (u ? pg(u) && !(i === "crashed" && u.state === "failed") || i === "done" && u.state === "blocked" && t.dispatch.launch.mode !== "exec" : i !== "crashed") return;
      let d = new Date().toISOString(),
        p = u ?? {
          state: "working",
          detail: "",
          tempo: "active",
          output: null,
          children: null,
          linkScanOffset: 0,
          template: t.dispatch.launch.mode === "exec" ? "exec" : t.dispatch.agent ?? t.dispatch.routine ?? "bg",
          routine: t.dispatch.routine,
          respawnFlags: Mwe([...t.dispatch.respawnFlags]),
          intent: t.record.intent,
          name: t.record.name,
          sessionId: t.record.sessionId,
          cwd: t.record.cwd,
          worktreePath: t.dispatch.worktree?.path ?? t.record.worktreePath,
          createdAt: new Date(t.dispatch.createdAt).toISOString(),
          updatedAt: d,
          firstTerminalAt: null,
          backend: "daemon"
        };
      return Lp(a, {
        ...p,
        state: l,
        detail: l === "stopped" ? "stopped" : (c || p.detail).replace(/; respawning$/, ""),
        tempo: "idle",
        inFlight: void 0,
        needs: void 0,
        block: void 0,
        updatedAt: d,
        firstTerminalAt: p.firstTerminalAt ?? d
      });
    }).catch(u => De(u)));
    if (s(rmt(u => {
      delete u.workers[t.record.short];
    }).catch(u => De(u))), s(xg.unlink(L6t(t.record.short)).catch(() => {})), zt() === "windows") s(xg.unlink(eye(t.record.short)).catch(() => {})), s(xg.unlink(iD($N(t.record.short))).catch(() => {})), s(xg.unlink(WP($N(t.record.short))).catch(() => {}));else {
      s(xg.unlink(O6t(t.record.short)).catch(() => {}));
      let u = t.rosterEntry();
      if (s(xg.unlink(u.rendezvousSock).catch(() => {})), u.ptySock) s(xg.unlink(u.ptySock).catch(() => {})), s(xg.unlink(iD(u.ptySock)).catch(() => {})), s(xg.unlink(WP(u.ptySock)).catch(() => {}));
    }
    if (t.dispatch.launch.mode === "exec" && i !== "killed") {
      n(), setTimeout((d, p, m) => {
        if (d.get(p) === m) d.delete(p);
      }, 300000, e, t.record.short, t).unref();
      return;
    }
    e.delete(t.record.short), n();
  }), t.onState.subscribe(i => {
    if (i.pid) rmt(a => {
      a.workers[t.record.short] = t.rosterEntry();
    }).catch(a => De(a));
    if (i.state === "crashed" || i.state === "resuming") {
      let a = i.state,
        l = t.record.detail,
        c = a === "crashed" ? "idle" : "active",
        u = vc(t.record.short);
      ma(u).then(d => {
        if (t.record.outcome || !d || pg(d) || d.state === "blocked" || d.tempo === "blocked") return;
        if (a === "resuming" && d.state !== "crashed") return;
        return Lp(u, {
          ...d,
          state: a,
          detail: l,
          tempo: c,
          inFlight: void 0,
          updatedAt: new Date().toISOString()
        });
      }).catch(d => De(d));
    }
  });
}
async function P6m(e, t) {
  let n = zt() === "windows",
    [r, o] = n ? [Hje(), ".pid"] : [nmt(), ".sock"],
    s = await xg.readdir(r).catch(() => []),
    i = new Set(s.filter(l => l.endsWith(o))),
    a = 0;
  for (let l of s) {
    if (!l.endsWith(o)) {
      let d = [".err", ".late"].find(p => l.endsWith(n ? p : `.sock${p}`));
      if (d) {
        let p = l.slice(0, -d.length),
          m = n ? p.lastIndexOf("-pty-") : -1,
          f = n ? m >= 0 ? `${p.slice(m + 5)}.pid` : "" : p;
        if (f && !i.has(f)) xg.unlink(Cuc.join(r, l)).catch(() => {});
      }
      continue;
    }
    let c = l.slice(0, -o.length);
    if (e.has(c)) continue;
    a++;
    let u = eye(c);
    g8e($N(c)).then(d => {
      if (!n) {
        jUe(c, "failed", "reaped (roster gap)");
        return;
      }
      let p = iD($N(c)),
        m = WP($N(c));
      if (d) {
        jUe(c, "failed", "reaped (roster gap)"), xg.unlink(u).catch(() => {}), xg.unlink(p).catch(() => {}), xg.unlink(m).catch(() => {});
        return;
      }
      wN(u, 4096).then(f => {
        if (f === null) return;
        if (!isProcessRunning(Number(f))) jUe(c, "failed", "reaped (roster gap)"), xg.unlink(u).catch(() => {}), xg.unlink(p).catch(() => {}), xg.unlink(m).catch(() => {});
      }).catch(() => {});
    });
  }
  if (a) t(`bg orphan-reap: ${a} roster-less pty host(s)`), logEvent("tengu_bg_orphan_reap", {
    reaped: a
  });
}
var xg,
  WNo,
  Cuc,
  I6m = 3600000,
  $No = 60000,
  qNo = 60000,
  D6m;
var wuc = b(() => {
  UUe();
  mg();
  ln();
  zn();
  Ct();
  qe();
  bt();
  $He();
  rE();
  Rn();
  qs();
  q0o();
  _uc();
  Euc();
  Y7n();
  sM();
  m5t();
  omt();
  FNo();
  xg = require("fs/promises"), WNo = require("os"), Cuc = require("path"), D6m = new Set();
});
export {vuc,jNo,P6m,xg,WNo,Cuc,I6m,$No,qNo,D6m,wuc};
