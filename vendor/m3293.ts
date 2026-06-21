// @ts-nocheck
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {q0,Khe} from "./m3291.ts";
import {Kot,JYr} from "./m3292.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {C0} from "./m2262.ts";
function Yhe(e){return zhe.getState()[e??mainAgentId()]??N1t}
function raa(e){let t=e??mainAgentId();return A0n.useSyncExternalStore(zhe.subscribe,()=>zhe.getState()[t]??N1t)}
function oaa(e){return A0n.useSyncExternalStore(zhe.subscribe,()=>(zhe.getState()[e]??N1t).thinkingStartedAt)}
function Eke(e,t){zhe.setState((n)=>{let r=e in n,o=n[e]??{...N1t,defaultVerb:q0(Kot())??""},s=t(o);if(s===o&&r)return n;return{...n,[e]:s}})}
function h0n(e){zhe.setState((t)=>{if(!(e in t))return t;let{[e]:n,...r}=t;return r})}
function Zae(e){function t(u){let d=Date.now();Eke(e,(p)=>p.mode===u?p:{...p,mode:u,thinkingStartedAt:u==="thinking"?d:null})}function n(u){Eke(e,(d)=>d.overrideMessage===u?d:{...d,overrideMessage:u})}function r(u,d){Eke(e,(p)=>p.overrideColor===u&&p.overrideShimmerColor===d?p:{...p,overrideColor:u,overrideShimmerColor:d})}function o(u){Eke(e,(d)=>d.turnEffort===u?d:{...d,turnEffort:u})}function s(u){Eke(e,(d)=>d.retryStatus===u?d:{...d,retryStatus:u})}function i(u,d=null){let p=Date.now();Eke(e,(m)=>{if(m.isCompacting===u&&m.compactingHintText===d)return m;let f=u?m.compactingStartTime??p:null;return{...m,isCompacting:u,compactingHintText:d,compactingStartTime:f}})}function a(){Eke(e,(u)=>u.overrideMessage===null&&u.overrideColor===null&&u.overrideShimmerColor===null&&!u.isCompacting&&u.compactingHintText===null&&u.compactingStartTime===null?u:{...u,overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null})}function l(){let u=q0(Kot())??"";Eke(e,(d)=>({...d,overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null,turnEffort:null,retryStatus:null,defaultVerb:u}))}function c(u){switch(u.type){case"hooks_start":r("claudeBlue_FOR_SYSTEM_SPINNER","claudeBlueShimmer_FOR_SYSTEM_SPINNER"),n(u.hookType==="pre_compact"?"Running PreCompact hooks\u2026":u.hookType==="post_compact"?"Running PostCompact hooks\u2026":"Running SessionStart hooks\u2026");return;case"compact_start":n("Compacting conversation"),i(!0,u.hintText??null);return;case"compact_end":a();return}}return{setMode:t,setMessage:n,setColors:r,setTurnEffort:o,setRetryStatus:s,setCompacting:i,resetCompactionState:a,resetOverrides:l,applyCompactProgress:c}}
function B1t(e){Zae(mainAgentId()).setMode(e)}
function XYr(e){Zae(mainAgentId()).setMessage(e)}
function saa(e){Zae(mainAgentId()).setTurnEffort(e)}
function iaa(e){Zae(mainAgentId()).setRetryStatus(e)}
function aaa(e){return A0n.useSyncExternalStore(zhe.subscribe,()=>(zhe.getState()[e]??N1t).retryStatus)}
function laa(){Zae(mainAgentId()).resetOverrides()}
function caa(e){Zae(mainAgentId()).applyCompactProgress(e)}
var A0n,N1t,zhe;
var ele=b(()=>{Khe();lt();JYr();A0n=M(Te(),1),N1t=Object.freeze({mode:"responding",overrideMessage:null,overrideColor:null,overrideShimmerColor:null,isCompacting:!1,compactingHintText:null,compactingStartTime:null,turnEffort:null,retryStatus:null,thinkingStartedAt:null,defaultVerb:""}),zhe=C0({})});
export {Yhe,raa,oaa,Eke,h0n,Zae,B1t,XYr,saa,iaa,aaa,laa,caa,A0n,N1t,zhe,ele};
