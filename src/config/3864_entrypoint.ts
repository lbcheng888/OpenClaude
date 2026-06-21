// @ts-nocheck
import {st as rt} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function Qc(e, t, n) {
  if (kro) return;
  if (e === "skills_load_ms" && firstRequestMetricsFlushed[e] !== undefined) return;
  if (firstRequestMetricsFlushed[e] = Math.round(t), n !== undefined) uIa[e] = Math.round(n);
}
function _Ia(e) {
  return firstRequestMetricsFlushed[e];
}
function yIa() {
  let e = Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS ?? "", 10);
  if (!Number.isFinite(e)) return;
  Qc("spawn_to_exec_ms", Date.now() - process.uptime() * 1000 - e, e - performance.timeOrigin);
}
function TIa() {
  Hro = true;
}
function SIa() {
  xro = performance.now();
}
function bIa(e, t) {
  dIa = e === null ? "miss" : xro !== undefined && xro < t ? "hit" : "pending";
}
function EIa(e, t, n, r, o, s) {
  pIa = e, mIa = t, fIa = n, AIa = r, hIa = o, gIa = s;
}
function CIa() {
  let e = Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS ?? "", 10);
  if (!Number.isFinite(e)) return;
  Qc("first_message_read_from_spawn_ms", Date.now() - e, e - performance.timeOrigin);
}
function vIa() {
  let e = Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS ?? "", 10);
  if (!Number.isFinite(e)) return;
  Qc("input_ready_from_spawn_ms", Date.now() - e, e - performance.timeOrigin);
}
function wIa() {
  if (!rt(process.env.CLAUDE_CODE_REMOTE)) return;
  if (kro || Object.keys(firstRequestMetricsFlushed).length === 0) return;
  return kro = true, {
    entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT ?? "unknown",
    warm_spare_claimed: Hro,
    resume_hydrate_prefetch: dIa,
    resume_hydrate_on_disk_bytes: pIa,
    resume_hydrate_ccr_bytes: mIa,
    resume_hydrate_ccr_events: fIa,
    resume_hydrate_delta_events: AIa,
    resume_hydrate_delta_fetch_attempted: hIa,
    resume_hydrate_anchor_walkback: gIa,
    phases: {
      ...firstRequestMetricsFlushed
    },
    time_origin_ms: performance.timeOrigin,
    phase_start_ms: {
      ...uIa
    }
  };
}
function RIa() {
  if (dBn !== undefined) return;
  let e = Number.parseInt(process.env.CCR_SPAWN_TIMESTAMP_MS ?? "", 10);
  if (!Number.isFinite(e)) return;
  dBn = Date.now() - e;
}
function xIa() {
  if (Hu || dBn === undefined) return;
  return Hu = true, {
    ms: dBn,
    warmSpareClaimed: Hro,
    timeOriginMs: performance.timeOrigin
  };
}
var firstRequestMetricsFlushed,
  uIa,
  Hro = false,
  xro,
  dIa,
  pIa,
  mIa,
  fIa,
  AIa,
  hIa,
  gIa,
  kro = false,
  dBn,
  Hu = false;
var a5 = b(() => {
  an();
  firstRequestMetricsFlushed = {}, uIa = {};
});

export {Qc as tu,_Ia as H0a,yIa as I0a,TIa as D0a,SIa as P0a,bIa as O0a,EIa as L0a,CIa as M0a,vIa as N0a,wIa as B0a,RIa as F0a,xIa as U0a,firstRequestMetricsFlushed as OUt,uIa as b0a,Hro as koo,xro as Roo,dIa as E0a,pIa as C0a,mIa as v0a,fIa as w0a,AIa as R0a,hIa as x0a,gIa as k0a,kro as xoo,dBn as JBn,Hu as S0a,a5 as _9};
