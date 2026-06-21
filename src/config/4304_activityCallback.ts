// @ts-nocheck
import {kn as xn,SA as wA} from "./0689_timestamp.ts";
import {st as rt} from "../../vendor/m5.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function dOp() {
  return {
    activityCallback: null,
    refcount: 0,
    mainLoopRefcount: 0,
    activeReasons: new Map(),
    oldestActivityStartedAt: null,
    heartbeatTimer: null,
    idleTimer: null,
    cleanupHandle: null
  };
}
function u7a() {
  let e = wpo(),
    t = h4q.get(e);
  if (!t) t = dOp(), h4q.set(e, t);
  return t;
}
function h3t() {
  return h4q.get(wpo()) ?? null;
}
function d7a(e) {
  J0O(e), e.heartbeatTimer = setInterval(t => {
    if (xn("debug", "session_keepalive_heartbeat", {
      refcount: t.refcount
    }), rt(process.env.CLAUDE_CODE_REMOTE_SEND_KEEPALIVES)) t.activityCallback?.();
  }, c7a, e);
}
function mOp(e) {
  if (J0O(e), e.activityCallback === null) return;
  e.idleTimer = setTimeout(t => {
    xn("info", "session_idle_30s"), t.idleTimer = null;
  }, c7a, e);
}
function J0O(e) {
  if (e.idleTimer !== null) clearTimeout(e.idleTimer), e.idleTimer = null;
}
function rUK(e) {
  let t = u7a();
  if (t.activityCallback = e, t.refcount > 0 && t.heartbeatTimer === null) d7a(t);
}
function $x_() {
  let e = h3t();
  if (!e) return;
  if (e.activityCallback = null, e.heartbeatTimer !== null) clearInterval(e.heartbeatTimer), e.heartbeatTimer = null;
  J0O(e);
}
function oUK() {
  let e = h3t();
  if (e && rt(process.env.CLAUDE_CODE_REMOTE_SEND_KEEPALIVES)) e.activityCallback?.();
}
function M0O() {
  return (h3t()?.activityCallback ?? null) !== null;
}
function V4q(state) {
  Rpo = state;
}
function aUK() {
  return h3t()?.mainLoopRefcount ?? 0;
}
function sUK(e, t) {
  let n = u7a();
  if (n.refcount++, t === undefined) n.mainLoopRefcount++, Rpo?.(n.mainLoopRefcount);
  if (n.activeReasons.set(e, (n.activeReasons.get(e) ?? 0) + 1), n.refcount === 1) {
    if (n.oldestActivityStartedAt = Date.now(), n.activityCallback !== null && n.heartbeatTimer === null) d7a(n);
  }
  if (n.cleanupHandle === null) {
    let r = wpo();
    n.cleanupHandle = qi(async () => {
      xn("info", "session_activity_at_shutdown", {
        owner_key: r,
        refcount: n.refcount,
        active: Object.fromEntries(n.activeReasons),
        oldest_activity_ms: n.refcount > 0 && n.oldestActivityStartedAt !== null ? Date.now() - n.oldestActivityStartedAt : null
      });
    });
  }
}
function tUK(e, t) {
  let n = h3t();
  if (!n) return;
  if (n.refcount > 0) n.refcount--;
  if (t === undefined) if (n.mainLoopRefcount > 0) n.mainLoopRefcount--, Rpo?.(n.mainLoopRefcount);else xn("warn", "session_activity_main_loop_underflow", {
    reason: e
  });
  let r = (n.activeReasons.get(e) ?? 0) - 1;
  if (r > 0) n.activeReasons.set(e, r);else n.activeReasons.delete(e);
  if (n.refcount === 0 && n.heartbeatTimer !== null) clearInterval(n.heartbeatTimer), n.heartbeatTimer = null, mOp(n);
}
var c7a = 30000,
  pOp = "cli",
  wpo = () => pOp,
  Rpo = null,
  h4q;
var NpH = b(() => {
  Jd();
  wA();
  an();
  h4q = new Map();
});

export {dOp as WMp,u7a as IKa,h3t as F3t,d7a as DKa,mOp as VMp,J0O as Lmo,rUK as PKa,$x_ as OKa,oUK as LKa,M0O as MKa,V4q as Mmo,aUK as NKa,sUK as C4n,tUK as v4n,c7a as HKa,pOp as GMp,wpo as Pmo,Rpo as Omo,h4q as Dmo,NpH as g6e};
