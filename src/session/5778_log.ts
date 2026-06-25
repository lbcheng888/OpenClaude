// @ts-nocheck
import {Tl,xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {t1o,uV,a1o} from "../agent/5240_cmd.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {UJn,LVt,J2l,$Jn,qJn} from "../telemetry/5155_qJn.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {spawnSpare as k9o,claimSpare as H9o,reapOrphanSpares as I9o,x9o} from "./5773_spawnSpare.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {sp,cn,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "./0621_length.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {$2e,W2e,ec,Oi,Tg,Id,Pf} from "../agent/2591_level.ts";
import {Le} from "../../vendor/m5.ts";
import {UKn,s_l,rWe,ZRo,lht,i_l,iWt,CTe,Tx,uN,lP,sWt,pne,CL} from "../../vendor/m4609.ts";
import {RSc,vSc} from "./5776_force.ts";
import {qG,cht,uht} from "./4612_proto.ts";
import {WJn,aGe,MVt} from "../../vendor/m5155.ts";
import {getProcessStartTimeAsync as mF,sigtermThenKill as tFe,isProcessRunning as k0,lE} from "../../vendor/m1461.ts";
import {ISc,xSc} from "../telemetry/5777_recursive.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {Swe,U2e} from "../../vendor/m2589.ts";
import {U1,x0e} from "../config/3883_x0e.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Daemon background-worker manager (v2.1.190).
 *
 * DSc() boots the supervisor: tracks live worker handles, an optional pre-warmed
 * "spare" worker, lease state, adoption of workers left behind by a previous
 * supervisor, periodic retire/respawn sweeps, and graceful shutdown.
 *
 * NOTE: this module is part of a flat bundle, so all cross-module references
 * (Tl, t1o, it, UJn, M9o, k9o, W, A, Ie, ...) are bundle-internal symbols and
 * are kept verbatim. Only local bindings are renamed below.
 */
async function DSc(log, options = {}) {
  return Tl("daemon_bg_manager_start", async () => {
    let handles = new Map(),
      settleWrites = new Set(),
      spawnPty = options.spawnPty ?? t1o(),
      onKeepAliveChange = options.onKeepAliveChange ?? (() => {}),
      closed = !1,
      ready = !1,
      spare = null,
      sparePending = !1,
      keepAlive = !1,
      ownsPty = options.spawnPty === void 0,
      /** Maintain (spawn/dispose) the pre-warmed spare worker per current conditions. */
      maintainSpare = () => {
        if (!it("tengu_bg_spare_enable", !0)) {
          if (spare) spare.dispose(), spare = null;
          return;
        }
        let lowMemThreshold = UJn();
        if (lowMemThreshold > 0 && M9o.freemem() < lowMemThreshold) {
          if (spare) spare.dispose(), spare = null;
          return;
        }
        if (!keepAlive || spare || sparePending || closed || !ready || !spawnPty || !ownsPty || Yt() === "windows") return;
        sparePending = !0;
        let spawnedSpare = null,
          exitedBeforeReady = !1;
        k9o({
          log,
          onExit: () => {
            if (spawnedSpare === null) {
              exitedBeforeReady = !0;
              return;
            }
            if (spare === spawnedSpare) {
              if (spare = null, Date.now() - spawnedSpare.startedAt >= 2000) maintainSpare();
            }
          }
        }).then(result => {
          if (spawnedSpare = result, !result || closed || exitedBeforeReady) {
            result?.dispose();
            return;
          }
          spare = result, W("tengu_bg_spare_spawn", {});
        }).catch(err => {
          if (sp(err)) {
            A(`bg-spare spawn failed: ${cn(err)} ${err.message}`, {
              level: "warn"
            });
            return;
          }
          Ie(err);
        }).finally(() => {
          sparePending = !1;
        });
      },
      /** Dispatch (or claim/spawn) a worker for the given request; retries while a stale handle settles. */
      dispatch = async (request, attempt = 0, afterUpgrade) => {
        if (closed) return "closed";
        keepAlive = !0;
        let existing = handles.get(request.short);
        if (existing) {
          if ((existing.isKilling || existing.isRetiring || existing.record.outcome) && attempt < 30) {
            if (attempt === 15 && (existing.isKilling || existing.isRetiring)) W("tengu_bg_dispatch_sigkill_escalate", {}), existing.kill("SIGKILL");
            return await Kn(100), dispatch(request, attempt + 1, afterUpgrade);
          }
          let settling = existing.isKilling || existing.isRetiring || existing.record.outcome;
          if (log(settling ? `bg: dispatch ${request.short} dropped — retry budget exhausted (handle still settling)` : `bg: dup dispatch ${request.short} dropped (existing handle still live)`), settling) return xe("daemon_bg_session_create", "dup_retry_exhausted"), "dropped";
          return He("daemon_bg_session_create"), "dup-live";
        }
        let freeMem = M9o.freemem(),
          lowMemThreshold = UJn();
        if (lowMemThreshold > 0 && freeMem < lowMemThreshold && handles.size > 0) {
          let freeMb = Math.round(freeMem / 1024 / 1024);
          log(`bg: low memory (${freeMb}MB free) — retiring settled workers before spawning ${request.short}`), W("tengu_bg_dispatch_low_mem", {
            free_mb: freeMb,
            handles: handles.size
          }), $2e().catch(err => (Ie(err), new Set())).then(pinned => {
            for (let handle of handles.values()) handle.retireIfSettled(P9o, pinned).catch(retireErr => Ie(retireErr));
          });
        }
        if (request.source === "spare" && lowMemThreshold > 0 && freeMem < lowMemThreshold) return log(`bg: low memory — skipping spare dispatch ${request.short}`), "dropped";
        if (spare && !afterUpgrade && request.launch.mode !== "exec" && spare.cliVersion === {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION && it("tengu_bg_spare_enable", !0)) {
          let claimed = spare;
          spare = null;
          try {
            let handle = H9o(request, claimed, spawnPty, options.getAuthSnapshot);
            return handles.set(request.short, handle), L9o(handles, handle, onKeepAliveChange, settleWrites, log), onKeepAliveChange(), W("tengu_bg_spare_claim", {
              age_ms: Date.now() - claimed.startedAt
            }), log(`bg claimed-spare ${request.short} (${request.source})`), He("daemon_bg_session_create"), maintainSpare(), "claimed";
          } catch (err) {
            let code = cn(err),
              reason = code === "ENOENT" ? "enoent" : code === "ECONNREFUSED" ? "econnrefused" : err instanceof Error ? "error" : "unknown";
            W("tengu_bg_spare_claim_fail", {
              reason: Le(reason)
            }), claimed.dispose();
          }
        }
        let handle = uV.spawn(request, spawnPty, options.getAuthSnapshot, afterUpgrade ? {
          afterUpgrade
        } : void 0);
        return handles.set(request.short, handle), L9o(handles, handle, onKeepAliveChange, settleWrites, log), onKeepAliveChange(), maintainSpare(), log(`bg spawned ${request.short} (${request.source})`), He("daemon_bg_session_create"), "spawned";
      },
      /** Signal every still-running worker; returns how many were signaled. */
      killAll = (signal = "SIGTERM") => {
        let killed = 0;
        for (let handle of handles.values()) if (!handle.record.outcome) handle.kill(signal), killed++;
        return killed;
      };
    await UKn(), await s_l();
    let leaseServer = await RSc(handles, dispatch, options.onNudge ?? (async () => !1), drain => {
      let killed = drain ? killAll("SIGTERM") : 0;
      return options.onShutdown?.(), killed;
    }, () => ready, options.onYield ?? (() => !1));
    leaseServer.onLeaseChange.subscribe(onKeepAliveChange), leaseServer.onLeaseChange.subscribe(() => {
      if (leaseServer.leaseCount() > 0 && !keepAlive) keepAlive = !0, maintainSpare();
    }), await Promise.all(Yt() === "windows" ? [Gf.mkdir(rWe(), {
      recursive: !0
    }).catch(() => {})] : [Gf.mkdir(ZRo(), {
      recursive: !0,
      mode: 448
    }).catch(() => {}), Gf.mkdir(lht(), {
      recursive: !0,
      mode: 448
    }).catch(() => {})]), i_l();
    let roster = await qG(),
      adopted = 0,
      dead = 0,
      respawned = 0;
    if (await Promise.all(Object.entries(roster.workers).map(async ([short, entry]) => {
      let handle;
      try {
        handle = await uV.adopt(short, entry, spawnPty, options.getAuthSnapshot);
      } catch (err) {
        Ie(err), dead++;
        return;
      }
      if (!handle && entry.procStart === void 0 && entry.ptySock && (await WJn(entry.ptySock))) {
        entry.procStart = await mF(entry.pid);
        try {
          handle = await uV.adopt(short, entry, spawnPty, options.getAuthSnapshot);
        } catch (err) {
          Ie(err), handle = null;
        }
        handle ??= uV.unverified(short, entry);
      }
      if (handle) handles.set(short, handle), L9o(handles, handle, onKeepAliveChange, settleWrites, log), adopted++;else if (entry.pendingRespawn === "upgrade") respawned++, W("tengu_bg_adopt_upgrade_respawn", {}), dispatch(entry.dispatch, 0, !0).catch(err => Ie(err));else if (dead++, W2e(short, "failed", "process gone while supervisor was down"), Gf.unlink(iWt(short)).catch(() => {}), Yt() === "windows") Gf.unlink(CTe(short)).catch(() => {}), Gf.unlink(Tx(uN(short))).catch(() => {}), Gf.unlink(lP(uN(short))).catch(() => {});else if (Gf.unlink(sWt(short)).catch(() => {}), Gf.unlink(entry.rendezvousSock).catch(() => {}), entry.ptySock) {
        Gf.unlink(entry.ptySock).catch(() => {}), Gf.unlink(Tx(entry.ptySock)).catch(() => {}), Gf.unlink(lP(entry.ptySock)).catch(() => {});
        try {
          process.kill(entry.pid, 0);
        } catch {
          tFe([-entry.pid]);
        }
      }
    })), adopted + dead + respawned > 0) if (log(`bg adopt: adopted=${adopted} respawned=${respawned} dead=${dead}`), W("tengu_bg_adopt", {
      adopted,
      respawned,
      dead
    }), dead === 0) He("daemon_bg_adopt");else if (adopted > 0 || respawned > 0) Pt("daemon_bg_adopt", "partial");else xe("daemon_bg_adopt", "all_workers_dead");
    if (!roster.parseFailed) UXm(handles, log);
    if (!roster.parseFailed) await I9o(handles, log);
    await cht(state => {
      state.workers = {};
      for (let [short, handle] of handles) state.workers[short] = handle.rosterEntry();
    }).catch(err => Ie(err));
    let watcher = await ISc(request => void dispatch(request).catch(err => Ie(err)));
    if (ready = !0, onKeepAliveChange(), handles.size > 0) keepAlive = !0;
    maintainSpare();
    let lastSweepAt = Date.now(),
      sweepRunning = !1,
      sweepTimer = setInterval(async (handlesArg, maintainArg) => {
        if (sweepRunning) return;
        sweepRunning = !0;
        try {
          await runSweep(handlesArg, maintainArg);
        } finally {
          sweepRunning = !1;
        }
      }, O9o, handles, maintainSpare);
    /** Periodic sweep: retire settled workers, respawn idle-stale ones, pre-warm extras. */
    async function runSweep(handlesArg, maintainArg) {
      {
        let now = Date.now(),
          drift = now - lastSweepAt - O9o;
        if (lastSweepAt = now, drift > O9o) {
          for (let handle of handlesArg.values()) handle.shiftGraceClocksForward(drift);
          maintainArg();
          return;
        }
        let lowMem = LVt(),
          retireGrace = lowMem ? P9o : FXm,
          idleGrace = lowMem ? P9o : J2l(),
          pinned = await $2e().catch(err => (Ie(err), new Set()));
        for (let handle of handlesArg.values()) if (pinned.has(handle.dispatch.short)) handle.respawnIfIdleStale(pinned).catch(err => Ie(err));
        let retiredFlags = await Promise.all([...handlesArg.values()].map(handle => handle.retireIfSettled(retireGrace, pinned, idleGrace).then(result => result.retired).catch(err => (Ie(err), !1)))),
          retiredCount = zn(retiredFlags, flag => flag);
        if (lowMem && retiredCount === 0 && LVt()) {
          let pinnedHandles = [...handlesArg.values()].filter(handle => pinned.has(handle.dispatch.short));
          if (pinnedHandles.length > 0) {
            log("bg: low memory persists after shedding non-pinned — retiring pinned settled workers as a last resort"), W("tengu_bg_retire_pinned_low_mem", {});
            for (let handle of pinnedHandles) handle.retireIfSettled(retireGrace, BXm, idleGrace).catch(err => Ie(err));
          }
        }
        if (!lowMem && $Jn()) {
          let prewarmBudget = it("tengu_bg_prewarm_per_sweep", 3),
            scanBudget = 12;
          for (let handle of handlesArg.values()) {
            if (prewarmBudget <= 0 || scanBudget <= 0) break;
            if (pinned.has(handle.dispatch.short)) continue;
            if (handle.isBooting) {
              prewarmBudget--;
              continue;
            }
            if (!handle.record.cliVersion || handle.record.cliVersion === {
              ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
              PACKAGE_URL: "@anthropic-ai/claude-code",
              README_URL: "https://code.claude.com/docs/en/overview",
              VERSION: "2.1.190",
              FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
              BUILD_TIME: "2026-06-24T02:21:52Z",
              GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
            }.VERSION) continue;
            if ((await handle.respawnIfIdleStale(void 0, "prewarm").catch(err => (Ie(err), {
              respawned: !1
            }))).respawned) prewarmBudget--;else scanBudget--;
          }
        }
        maintainArg();
      }
    }
    return sweepTimer.unref(), {
      handles,
      dispatch: request => void dispatch(request).catch(err => Ie(err)),
      leaseCount: leaseServer.leaseCount,
      liveHandleCount: () => {
        let count = 0;
        for (let handle of handles.values()) if (!handle.record.outcome) count++;
        return count;
      },
      pendingSettleWrites: () => settleWrites.size,
      killAll,
      close: async closeOptions => {
        let displaced = closeOptions?.displaced ?? !1;
        if (closed = !0, clearInterval(sweepTimer), spare) spare.dispose(), spare = null;
        await Promise.all([watcher.close().catch(() => {}), leaseServer.close({
          skipUnlink: displaced
        }).catch(() => {})]);
        for (let handle of handles.values()) handle.stop();
        if (await Promise.allSettled([...settleWrites]), !displaced && handles.size === 0 && !roster.parseFailed && Yt() !== "windows") await Gf.rm(pne(), {
          recursive: !0,
          force: !0
        }).catch(() => {});
      }
    };
  });
}
/** Wire a worker handle's onSettle / onState subscriptions into roster + state-file persistence. */
function L9o(handles, handle, onKeepAliveChange, settleWrites, log) {
  let track = promise => {
    settleWrites.add(promise), promise.finally(() => settleWrites.delete(promise));
  };
  handle.onSettle.subscribe(outcome => {
    log(`bg settled ${handle.record.short} (${outcome})`);
    let jobDir = ec(handle.record.short),
      terminalState = outcome === "done" ? "done" : outcome === "killed" ? "stopped" : "failed",
      detail = handle.record.detail;
    if (handle.shouldDeleteJobDir) track(Gf.rm(jobDir, {
      recursive: !0,
      force: !0
    }).catch(err => Ie(err)));else track(Oi(jobDir).then(existing => {
      if (existing ? Tg(existing) && !(outcome === "crashed" && existing.state === "failed") || outcome === "done" && existing.state === "blocked" && handle.dispatch.launch.mode !== "exec" : outcome !== "crashed" || handle.dispatch.source === "spare") {
        if (!existing && handle.dispatch.source === "spare") return Gf.access(N9o.join(jobDir, "state.json")).then(() => {
          return;
        }, err => cn(err) === "ENOENT" ? Gf.rm(jobDir, {
          recursive: !0,
          force: !0
        }).catch(rmErr => Ie(rmErr)) : void 0);
        return;
      }
      let nowIso = new Date().toISOString(),
        state = existing ?? {
          state: "working",
          detail: "",
          tempo: "active",
          output: null,
          children: null,
          linkScanOffset: 0,
          template: handle.dispatch.launch.mode === "exec" ? "exec" : handle.dispatch.agent ?? handle.dispatch.routine ?? "bg",
          routine: handle.dispatch.routine,
          respawnFlags: Swe([...handle.dispatch.respawnFlags]),
          intent: handle.record.intent,
          name: handle.record.name,
          sessionId: handle.record.sessionId,
          cwd: handle.record.cwd,
          worktreePath: handle.dispatch.worktree?.path ?? handle.record.worktreePath,
          createdAt: new Date(handle.dispatch.createdAt).toISOString(),
          updatedAt: nowIso,
          firstTerminalAt: null,
          backend: "daemon"
        };
      return Id(jobDir, {
        ...state,
        state: terminalState,
        detail: terminalState === "stopped" ? "stopped" : (detail || state.detail).replace(/; respawning$/, ""),
        tempo: "idle",
        inFlight: void 0,
        needs: void 0,
        block: void 0,
        updatedAt: nowIso,
        firstTerminalAt: state.firstTerminalAt ?? nowIso
      });
    }).catch(err => Ie(err)));
    if (track(cht(state => {
      delete state.workers[handle.record.short];
    }).catch(err => Ie(err))), track(Gf.unlink(iWt(handle.record.short)).catch(() => {})), Yt() === "windows") track(Gf.unlink(CTe(handle.record.short)).catch(() => {})), track(Gf.unlink(Tx(uN(handle.record.short))).catch(() => {})), track(Gf.unlink(lP(uN(handle.record.short))).catch(() => {}));else {
      track(Gf.unlink(sWt(handle.record.short)).catch(() => {}));
      let entry = handle.rosterEntry();
      if (track(Gf.unlink(entry.rendezvousSock).catch(() => {})), entry.ptySock) track(Gf.unlink(entry.ptySock).catch(() => {})), track(Gf.unlink(Tx(entry.ptySock)).catch(() => {})), track(Gf.unlink(lP(entry.ptySock)).catch(() => {}));
    }
    if (handle.dispatch.launch.mode === "exec" && outcome !== "killed") {
      onKeepAliveChange(), setTimeout((map, key, value) => {
        if (map.get(key) === value) map.delete(key);
      }, 300000, handles, handle.record.short, handle).unref();
      return;
    }
    handles.delete(handle.record.short), onKeepAliveChange();
  }), handle.onState.subscribe(update => {
    if (update.pid) cht(state => {
      state.workers[handle.record.short] = handle.rosterEntry();
    }).catch(err => Ie(err));
    if (update.state === "crashed" || update.state === "resuming") {
      let nextState = update.state,
        detail = handle.record.detail,
        tempo = nextState === "crashed" ? "idle" : "active",
        jobDir = ec(handle.record.short);
      Oi(jobDir).then(existing => {
        if (handle.record.outcome || !existing || Tg(existing) || existing.state === "blocked" || existing.tempo === "blocked") return;
        if (nextState === "resuming" && existing.state !== "crashed") return;
        return Id(jobDir, {
          ...existing,
          state: nextState,
          detail,
          tempo,
          inFlight: void 0,
          updatedAt: new Date().toISOString()
        });
      }).catch(err => Ie(err));
    }
  });
}
/** Reap roster-less pty host sockets/pid files left in the runtime dir (orphan cleanup). */
async function UXm(handles, log) {
  let isWindows = Yt() === "windows",
    [runtimeDir, ext] = isWindows ? [rWe(), ".pid"] : [lht(), ".sock"],
    entries = await Gf.readdir(runtimeDir).catch(() => []),
    knownIds = new Set(entries.filter(name => name.endsWith(ext))),
    reaped = 0;
  for (let name of entries) {
    if (!name.endsWith(ext)) {
      let suffix = [".err", ".late"].find(s => name.endsWith(isWindows ? s : `.sock${s}`));
      if (suffix) {
        let base = name.slice(0, -suffix.length),
          ptyIdx = isWindows ? base.lastIndexOf("-pty-") : -1,
          ownerId = isWindows ? ptyIdx >= 0 ? `${base.slice(ptyIdx + 5)}.pid` : "" : base;
        if (ownerId && !knownIds.has(ownerId)) Gf.unlink(N9o.join(runtimeDir, name)).catch(() => {});
      }
      continue;
    }
    let short = name.slice(0, -ext.length);
    if (handles.has(short)) continue;
    reaped++;
    let pidFile = CTe(short);
    aGe(uN(short)).then(running => {
      if (!isWindows) {
        W2e(short, "failed", "reaped (roster gap)");
        return;
      }
      let errFile = Tx(uN(short)),
        lateFile = lP(uN(short));
      if (running) {
        W2e(short, "failed", "reaped (roster gap)"), Gf.unlink(pidFile).catch(() => {}), Gf.unlink(errFile).catch(() => {}), Gf.unlink(lateFile).catch(() => {});
        return;
      }
      U1(pidFile, 4096).then(pidStr => {
        if (pidStr === null) return;
        if (!k0(Number(pidStr))) W2e(short, "failed", "reaped (roster gap)"), Gf.unlink(pidFile).catch(() => {}), Gf.unlink(errFile).catch(() => {}), Gf.unlink(lateFile).catch(() => {});
      }).catch(() => {});
    });
  }
  if (reaped) log(`bg orphan-reap: ${reaped} roster-less pty host(s)`), W("tengu_bg_orphan_reap", {
    reaped
  });
}
var Gf,
  M9o,
  N9o,
  FXm = 3600000,
  P9o = 60000,
  O9o = 60000,
  BXm;
var PSc = b(() => {
  U2e();
  Pf();
  mn();
  jn();
  kt();
  qe();
  Ct();
  x0e();
  lE();
  vn();
  Es();
  a1o();
  vSc();
  xSc();
  qJn();
  CL();
  MVt();
  uht();
  x9o();
  Gf = require("fs/promises"), M9o = require("os"), N9o = require("path"), BXm = new Set();
});

export {DSc,L9o,UXm,Gf,M9o,N9o,FXm,P9o,O9o,BXm,PSc};
