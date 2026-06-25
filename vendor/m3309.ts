// @ts-nocheck
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {tx,i_e} from "./m3307.ts";
import {Kit,Peo} from "./m3308.ts";
import {b,x} from "../runtime.ts";
import {lZ,q0} from "./m2270.ts";
import {et} from "./m2261.ts";
function l_e(e){return a_e.getState()[e??mainAgentId()]??fBt}
function ufa(e){let t=e??mainAgentId();return iOn.useSyncExternalStore(a_e.subscribe,()=>a_e.getState()[t]??fBt)}
function dfa(e){return iOn.useSyncExternalStore(a_e.subscribe,()=>(a_e.getState()[e]??fBt).thinkingStartedAt)}
function cIe(e,t){a_e.setState((n)=>{let r=e in n,o=n[e]??{...fBt,defaultVerb:tx(Kit())??""},s=t(o);if(s===o&&r)return n;return{...n,[e]:s}})}
function aOn(e){a_e.setState((t)=>{if(!(e in t))return t;let{[e]:n,...r}=t;return r})}
function Qae(e){function t(u){let d=Date.now();cIe(e,(p)=>p.mode===u?p:{...p,mode:u,thinkingStartedAt:u==="thinking"?d:null})}function n(u){cIe(e,(d)=>d.overrideMessage===u?d:{...d,overrideMessage:u})}function r(u,d){cIe(e,(p)=>p.overrideColor===u&&p.overrideShimmerColor===d?p:{...p,overrideColor:u,overrideShimmerColor:d})}function o(u){cIe(e,(d)=>d.turnEffort===u?d:{...d,turnEffort:u})}function s(u){cIe(e,(d)=>d.retryStatus===u?d:{...d,retryStatus:u})}function i(u,d=null){let p=Date.now();cIe(e,(m)=>{if(m.isCompacting===u&&m.compactingHintText===d)return m;let f=u?m.compactingStartTime??p:null;return{...m,isCompacting:u,compactingHintText:d,compactingStartTime:f}})}function a(){cIe(e,(u)=>u.overrideMessage===null&&u.overrideColor===null&&u.overrideShimmerColor===null&&!u.isCompacting&&u.compactingHintText===null&&u.compactingStartTime===null?u:{...u,overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null})}function l(){let u=tx(Kit())??"";cIe(e,(d)=>({...d,overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null,turnEffort:null,retryStatus:null,defaultVerb:u}))}function c(u){switch(u.type){case"hooks_start":r("claudeBlue_FOR_SYSTEM_SPINNER","claudeBlueShimmer_FOR_SYSTEM_SPINNER"),n(u.hookType==="pre_compact"?"Running PreCompact hooks\u2026":u.hookType==="post_compact"?"Running PostCompact hooks\u2026":"Running SessionStart hooks\u2026");return;case"compact_start":n("Compacting conversation"),i(!0,u.hintText??null);return;case"compact_end":a();return}}return{setMode:t,setMessage:n,setColors:r,setTurnEffort:o,setRetryStatus:s,setCompacting:i,resetCompactionState:a,resetOverrides:l,applyCompactProgress:c}}
function hBt(e){Qae(mainAgentId()).setMode(e)}
function Oeo(e){Qae(mainAgentId()).setMessage(e)}
function pfa(e){Qae(mainAgentId()).setTurnEffort(e)}
function mfa(e){Qae(mainAgentId()).setRetryStatus(e)}
function ffa(e){return iOn.useSyncExternalStore(a_e.subscribe,()=>(a_e.getState()[e]??fBt).retryStatus)}
function hfa(){Qae(mainAgentId()).resetOverrides()}
function gfa(e){Qae(mainAgentId()).applyCompactProgress(e)}
var iOn,fBt,a_e;
var Zae=b(()=>{i_e();lt();Peo();lZ();iOn=x(et(),1),fBt=Object.freeze({mode:"responding",overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null,turnEffort:null,retryStatus:null,thinkingStartedAt:null,defaultVerb:""}),a_e=q0({})});
export {l_e,ufa,dfa,cIe,aOn,Qae,hBt,Oeo,pfa,mfa,ffa,hfa,gfa,iOn,fBt,a_e,Zae};
