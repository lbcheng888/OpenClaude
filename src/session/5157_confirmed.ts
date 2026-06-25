// @ts-nocheck
import {AT as Mj,fue as A1H} from "../../vendor/m4610.ts";
import {zd as JO,Fft as Q5_,C8t as Xm_,A8t as Pm_,bL as iV} from "../../vendor/m4515.ts";
import {sleep as l6} from "../telemetry/1488_withTimeout.ts";
import {qG as Cc,uht as K3_} from "./4612_proto.ts";
import {aGe as VUH,MVt as hU_} from "../../vendor/m5155.ts";
import {uN as VE,mue as Y1H,CL as oV} from "../../vendor/m4609.ts";
import {listAllLiveSessions as LmH,sendToUdsSocket as qqq,rut as oK_} from "../../vendor/m3883.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {cn as L6,Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {isSameProcessAsync as WW,lE as UD} from "../../vendor/m1461.ts";
import {yh as jA,hy as vf,Nxe as YGH} from "../agent/4175_state.ts";
import {kc as x1,aA as SX} from "../../vendor/m234.ts";
import {bgSupervisorNoun as Jf,bgSupervisorNounCap as WTH,fC as wP} from "../config/2212_shouldShowLaunchComposer.ts";
import {He as vH,xe as IH,Pt as n_,mn as M6} from "../telemetry/0600_feature_name.ts";
import {ec as j1,Oi as AK,mT as lM,Id as IO,Pm as v$,bI as FN,Pf as qA} from "../agent/2591_level.ts";
import {N6 as MU,sGe as NUH} from "../config/5153_proto.ts";
import {Ve as O_} from "../../vendor/m5.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {Ott as IsH,AAn as _w6} from "../config/2428_type.ts";
import {kJ as oo,$2l as CZ4,JDo as $Xq} from "../telemetry/5151_promise.ts";
import {Z3 as qp,dO as EN} from "../../vendor/m2278.ts";
import {W0 as $L,vve as bXH} from "../../vendor/m2296.ts";
import {MF as _C,nS as pJ} from "../config/2351_nS.ts";
import {getAgentWorktreeChanges as uO_,listRegisteredWorktrees as VU_,removeAgentWorktree as mHH,qI as rG} from "./5205_worktreeBranchName.ts";
import {findCanonicalGitRoot as h$,ia as gK} from "../../vendor/m698.ts";
import {b as L} from "../../runtime.ts";
// FIXME: unverified name: GwH
/* Restored Claude Code 2.1.177 module: Background job control helpers..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
async function GwH(H: any, _: any, q: any): Promise<any> {
  if (_?.backend === "peer") return {
    confirmed: !0
  };
  let K = q?.knownGone ? {
    ok: !1,
    code: "ENOJOB",
    error: "job already gone (caller-verified)"
  } : await Mj({
    proto: JO,
    op: "kill",
    short: H
  });
  for (let O = 0; !K.ok && K.code === "ESTARTING" && O < 10; O++) await l6(200), K = await Mj({
    proto: JO,
    op: "kill",
    short: H
  });
  if (K.ok) return {
    confirmed: !0
  };
  if (K.code === "ENOJOB" || K.code === "ENOCONN" || K.code === "ETIMEOUT") {
    let O = await GXq(H);
    if (O.anyMatch) return {
      confirmed: O.confirmed
    };
    if (K.code === "ENOCONN" || K.code === "ETIMEOUT") {
      let T = (await Cc({
        silent: !0
      })).workers[H];
      return {
        confirmed: T !== void 0 && !(await sendJobControlRequest(T.pid, T.procStart))
      };
    }
    return {
      confirmed: !0
    };
  }
  return {
    confirmed: !1,
    error: K.error
  };
}
// FIXME: unverified name: GXq
async function GXq(H: any): Promise<any> {
  let _ = await VUH(VE(H)),
    q = !1,
    K = !0;
  for (let O of await LmH().catch((): any => [])) if (O.kind === "bg" && (O.jobId === H || O.sessionId?.startsWith(H))) {
    if (q = !0, !_) try {
      process.kill(O.pid, "SIGTERM");
    } catch {}
    let T = Date.now() + 3000,
      z = !0;
    while ((z = await sendJobControlRequest(O.pid, O.procStart)) && Date.now() < T) await l6(100);
    if (z) {
      c("tengu_bg_killjob_ctrl_fallback", {
        ctrlSent: _
      });
      try {
        process.kill(O.pid, "SIGTERM");
      } catch {}
      let $ = Date.now() + 500;
      while ((z = await sendJobControlRequest(O.pid, O.procStart)) && Date.now() < $) await l6(100);
    }
    if (z) K = !1;
  }
  return {
    confirmed: K,
    anyMatch: q
  };
}
// FIXME: unverified name: Mc6
async function Mc6(): Promise<any> {
  let H = await Mj({
    proto: JO,
    op: "list"
  });
  if (H.ok && H.op === "list") return {
    shorts: new Set(H.jobs.map((O: any): any => O.short)),
    records: H.jobs.filter((O: any): any => !O.outcome)
  };
  let _ = await Cc({
      silent: !0
    }),
    q = Object.entries(_.workers),
    K = await Promise.all(q.map(([, O]: any): any => sendJobControlRequest(O.pid, O.procStart)));
  return {
    shorts: new Set(q.filter((O: any, T: any): any => K[T]).map(([O]: any): any => O)),
    records: []
  };
}
// FIXME: unverified name: lZ4
async function lZ4(H: any): Promise<any> {
  let _ = await Mj({
    proto: JO,
    op: "has",
    short: H
  });
  if (_.ok && _.op === "has") return {
    alive: _.alive,
    present: _.present ?? _.alive,
    daemonUp: !0
  };
  let q = (await Cc({
      silent: !0
    })).workers[H],
    K = q !== void 0 && (await sendJobControlRequest(q.pid, q.procStart));
  return {
    alive: K,
    present: K,
    daemonUp: !1
  };
}
// FIXME: unverified name: nZ4
async function nZ4(H: any, _: any = 5000): Promise<any> {
  let q = Date.now() + _;
  while (Date.now() < q) {
    let K = await Mj({
      proto: JO,
      op: "has",
      short: H
    });
    if (!K.ok || K.op !== "has") return !1;
    if (!(K.present ?? K.alive)) return !1;
    if (K.ready ?? !0) return !0;
    await l6(50);
  }
  return !1;
}
// FIXME: unverified name: iZ4
async function iZ4(H: any): Promise<any> {
  let _ = await Mj({
    proto: JO,
    op: "has",
    short: H
  });
  return _.ok && _.op === "has" ? _.present ?? _.alive : !1;
}
async function sendJobControlRequest(H: any, _: any): Promise<any> {
  try {
    process.kill(H, 0);
  } catch (q) {
    let K = L6(q);
    return K !== "ESRCH" && K !== "EPERM";
  }
  return WW(H, _);
}
// FIXME: unverified name: QO_
function QO_(H: any, _: any): any {
  return {
    ...H,
    detail: jA(x1(_).replace(/\s+/g, " ").trim(), vf),
    tempo: "active",
    needs: void 0,
    block: void 0,
    suggestedReply: void 0,
    output: null,
    updatedAt: new Date().toISOString()
  };
}
function getBackgroundJobRegistry(): any {
  return `Couldn't reach the ${Jf()} \u2014 it may be restarting. Press Enter to retry`;
}
// FIXME: unverified name: oZ4
function oZ4(H: any): any {
  return H === getBackgroundJobRegistry();
}
// FIXME: unverified name: NU_
async function NU_(H: any, _: any, q: any, K: any): Promise<any> {
  if (q?.backend === "peer") {
    if (!q.sock) return vH("job_reply"), {
      err: RXq
    };
    try {
      return await qqq(q.sock, _), vH("job_reply"), null;
    } catch (A) {
      return IH("job_reply", "job_reply_peer_send_failed"), {
        err: `Couldn't send to that session \u2014 ${GH(A)}`
      };
    }
  }
  // FIXME: unverified name: $
  let O = j1(H),
    T = K ?? (await AK(O)),
    z = await Y1H(),
    $ = (): any => Mj({
      proto: JO,
      op: "reply",
      short: H,
      text: _,
      auth: z
    }),
    Y = await $();
  for (let A = 0; !Y.ok && (Y.code === "ESTARTING" || Y.code === "ENOREPLY") && A < 10; A++) await l6(200), Y = await $();
  if (!Y.ok && Y.code === "EAUTH") {
    let A = await Y1H();
    if (A && A !== z) z = A, Y = await $();
  }
  if (!Y.ok && (Y.code === "ENOCONN" || Y.code === "ETIMEOUT")) {
    if ((await MU({
      forceTransient: !0
    })).ok) {
      z = (await Y1H()) ?? z, Y = await $();
      for (let w = 0; !Y.ok && (Y.code === "ESTARTING" || Y.code === "ENOREPLY") && w < 10; w++) await l6(200), Y = await $();
    }
  }
  if (Y.ok) {
    if (T && !K) {
      lM(O);
      let A = (await AK(O)) ?? T;
      IO(O, QO_(A, _)).catch(v$);
    }
    if (!K) c("tengu_bg_agent_action", {
      action: O_("reply"),
      agent: T?.template ?? "unknown",
      wasTerminal: T ? FN(T.state) : !1,
      daemon: !0
    }), vH("job_reply");
    return null;
  }
  if (Y.code === "ENOJOB") {
    if (!K) n_("job_reply", "job_reply_not_running");
    return {
      err: vUH,
      code: Y.code
    };
  }
  if (Y.code === "ENOCONN" || Y.code === "ETIMEOUT") {
    if (!K) IH("job_reply", "job_reply_daemon_unreachable");
    return {
      err: getBackgroundJobRegistry(),
      code: Y.code
    };
  }
  if (!K) IH("job_reply", "job_reply_send_failed");
  return {
    err: `Couldn't send your message \u2014 ${Y.error}`,
    code: Y.code
  };
}
async function parseBackgroundJobId(H: any): Promise<any> {
  let _ = j1(H);
  lM(_);
  let q = await AK(_).catch((): any => null);
  if (q === null) return vH("job_attach"), {
    kind: "error",
    ended: !0,
    msg: "That session was removed \u2014 back to the list"
  };
  if (q.state !== "done" && q.state !== "stopped" && q.state !== "blocked" && q.state !== "failed") await l6(50), lM(_), q = (await AK(_).catch((): any => null)) ?? q;
  if (q.state === "done" || q.state === "stopped" || q.state === "blocked") return vH("job_attach"), {
    kind: "error",
    ended: !0,
    msg: q.state === "stopped" ? "That session was stopped \u2014 back to the list" : q.state === "blocked" ? "That session is blocked \u2014 back to the list" : "That session ended \u2014 back to the list"
  };
  if (q.state === "failed") {
    let K = q.detail.includes("before init");
    return n_("job_attach", K ? "job_attach_pre_init_crash" : "job_attach_crash_loop"), {
      kind: "error",
      ended: !0,
      msg: `Session can't start \u2014 ${q.detail.replace(/^.*?before init(?: \u2014 )?/, "").replace(/^Error:\s*/, "") || q.detail || "it crashed repeatedly"}`
    };
  }
  return;
}
// FIXME: unverified name: aZ4
async function aZ4(H: any, _: any = {}): Promise<any> {
  yUH.writeFile(dZ4.join(j1(H), ZXq), "").catch((): any => {}), N("[PERF:bg-attach-start]"), IsH();
  let q = /ENOENT|ECONNREFUSED|control socket closed/,
    K = Q5_,
    O = {
      holdScreenOnDisconnect: !0,
      alreadyInAlt: _.alreadyInAlt
    },
    T = {
      ...O,
      holdingFrame: !0
    },
    z = !_.alreadyInAlt,
    $ = await oo(H, O),
    Y;
  if ($.outcome === "error" && $.msg && q.test($.msg)) {
    if (Y = await MU({
      forceTransient: !0
    }), Y.ok) $ = await oo(H, O);
  }
  for (let A = 0; $.msg && K.test($.msg) && A < 20; A++) await l6(500), $ = await oo(H, O);
  while ($.outcome === "disconnected") {
    let w = Math.max(1, (process.stdout.columns ?? 80) - 15);
    process.stdout.write(`\x1B7${qp(1, w)}\x1B[2;7m${" Reconnecting\u2026 "}\x1B[0m\x1B8`);
    let f;
    if (process.stdin.isTTY) {
      let J = "isRaw" in process.stdin ? Boolean(process.stdin.isRaw) : !1;
      if (!J) $L(process.stdin, !0);
      let D = CZ4(process.stdin);
      try {
        f = await Promise.race([MU({
          forceTransient: !0
        }), D.promise.then((): any => "detach")]);
      } finally {
        if (D.cancel(), !J) $L(process.stdin, !1);
      }
    } else f = await MU({
      forceTransient: !0
    });
    if (f === "detach") {
      if (z) process.stdout.write(_C());
      return N("[PERF:bg-attach-end]"), vH("job_attach"), {
        kind: "detached"
      };
    }
    let j = f;
    if (!j.ok) {
      if (z) process.stdout.write(_C());
      return IH("job_attach", "job_attach_daemon_start_failed"), {
        kind: "error",
        msg: `Couldn't restart the ${Jf()} \u2014 ${j.reason}`
      };
    }
    IsH(), $ = await oo(H, T);
    for (let J = 0; $.msg && K.test($.msg) && J < 10; J++) await l6(200), $ = await oo(H, T);
    if ($.msg?.includes("ENOJOB")) {
      if (z) process.stdout.write(_C());
      N(`[bg-attach] ENOJOB on reconnect short=${H} \u2014 daemon has no handle (or it's killing/settled)`);
      let J = await parseBackgroundJobId(H);
      if (J) return J;
      return n_("job_attach", "job_attach_crashed"), {
        kind: "error",
        orphaned: !0,
        msg: "Session crashed \u2014 press Enter to respawn"
      };
    }
    if ($.outcome === "error" && z) process.stdout.write(_C());
  }
  if ($.outcome === "detached" && $.msg && (Xm_.test($.msg) || K.test($.msg))) {
    if (z) process.stdout.write(_C());
    return IH("job_attach", "job_attach_stalled"), {
      kind: "error",
      msg: $.msg.replace(/^E(STALLED|RESPAWNING|STARTING):\s*/, "")
    };
  }
  if ($.outcome === "error") {
    if ($.msg?.includes("ENOJOB")) {
      N(`[bg-attach] ENOJOB on first attach short=${H} \u2014 daemon has no handle (or it's killing/settled)`);
      let w = await parseBackgroundJobId(H);
      if (w) return w;
      return n_("job_attach", "job_attach_orphaned"), {
        kind: "error",
        orphaned: !0,
        msg: `${WTH()} lost track of this job \u2014 press Enter to respawn it`
      };
    }
    if (Y && !Y.ok) return IH("job_attach", "job_attach_daemon_start_failed"), {
      kind: "error",
      msg: `Couldn't start the ${Jf()} \u2014 ${Y.reason}`
    };
    let A = $.msg && K.test($.msg) ? `${WTH()} is still starting \u2014 try again in a moment` : $.msg && q.test($.msg) ? `${WTH()} didn't respond after starting \u2014 try again in a moment` : $.msg ? `Couldn't attach \u2014 ${$.msg}` : "Couldn't attach to that session";
    return IH("job_attach", "job_attach_failed"), {
      kind: "error",
      msg: A
    };
  }
  if (N("[PERF:bg-attach-end]"), vH("job_attach"), $.msg && Pm_.test($.msg)) return {
    kind: "detached",
    msg: $.msg.replace(Pm_, "")
  };
  return {
    kind: "detached"
  };
}
// FIXME: unverified name: u1H
async function u1H(H: any, _: any = {}): Promise<any> {
  let q = await AK(j1(H)),
    K = await GwH(H, q ?? void 0, {
      knownGone: _.knownGone
    }).catch(($: any): any => ({
      confirmed: !1,
      error: GH($)
    }));
  if (!K.confirmed) {
    if (N(`deleteJob: kill unconfirmed for ${H} \u2014 skipping jobdir/worktree removal to avoid stranding a live worker`, {
      level: "warn"
    }), !_.internal) IH("job_delete", "kill_unconfirmed");
    return {
      removed: !1,
      error: K.error
    };
  }
  let O, T, z;
  if (q?.worktreePath) {
    let {
      dirty: $,
      gitError: Y
    } = _.force ? {
      dirty: !1,
      gitError: !1
    } : await uO_(q.worktreePath);
    if ($ && !Y) O = q.worktreePath, T = "dirty", z = "worktree_kept_dirty", N(`deleteJob: worktree has uncommitted changes, kept ${q.worktreePath}`, {
      level: "warn"
    });else {
      let A = h$(q.originCwd ?? q.worktreePath) ?? void 0,
        w = !Y && A && q.worktreeBranch ? await VU_(A).catch((): any => null) : null,
        f = await yUH.realpath(q.worktreePath).catch((): any => q.worktreePath),
        j;
      for (let J of w ?? []) if ((await yUH.realpath(J.worktreePath).catch((): any => J.worktreePath)) === f) {
        j = J;
        break;
      }
      if (j && j.worktreeBranch !== q.worktreeBranch) O = q.worktreePath, T = "branch_mismatch", z = "worktree_kept_branch_mismatch", N(`deleteJob: ${q.worktreePath} is on branch ${j.worktreeBranch ?? "(detached)"}, expected ${q.worktreeBranch} \u2014 not ours to remove`, {
        level: "warn"
      });else if (!(await mHH(q.worktreePath, q.worktreeBranch, A, q.worktreeHookBased, _.force ? "job_delete_force" : "job_delete").catch((): any => !1))) O = q.worktreePath, T = "remove_failed", z = "worktree_kept_remove_failed";
    }
  }
  if (await yUH.rm(j1(H), {
    recursive: !0,
    force: !0
  }).catch((): any => {}), lM(j1(H)), !_.internal) if (z) n_("job_delete", z);else vH("job_delete");
  return {
    removed: !0,
    keptWorktree: O,
    keptReason: T
  };
}
var yUH,
  dZ4,
  ZXq = "recap.trigger",
  vUH = "That session isn't running \u2014 respawn it first",
  RXq = "Can't send \u2014 that session is running in another terminal";
var cO_ = L((): any => {
  wP();
  $Xq();
  A1H();
  NUH();
  oV();
  iV();
  hU_();
  K3_();
  _w6();
  pJ();
  EN();
  M6();
  y_();
  FH();
  L_();
  UD();
  gK();
  SX();
  bXH();
  oK_();
  rG();
  YGH();
  qA();
  yUH = require("fs/promises"), dZ4 = require("path");
});
export {GwH as cSe,GXq as uPo,Mc6 as GJn,lZ4 as t$l,nZ4 as n$l,iZ4 as r$l,sendJobControlRequest as NVt,QO_ as i_t,getBackgroundJobRegistry as o$l,oZ4 as s$l,NU_ as FVt,parseBackgroundJobId as Z2l,aZ4 as i$l,u1H as zue,yUH as lGe,dZ4 as e$l,ZXq as cPo,vUH as cGe,RXq as dPo,cO_ as a_t};
