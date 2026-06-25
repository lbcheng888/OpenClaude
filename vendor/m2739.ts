// @ts-nocheck
import {b} from "../runtime.ts";
function kl(e=hMd){let t=new AbortController;return oqi.setMaxListeners(e,t.signal),t}
function gMd(e){let t=this.deref();e.deref()?.abort(t?.signal.reason)}
function _Md(e){let t=this.deref(),n=e.deref();if(t&&n)t.signal.removeEventListener("abort",n)}
function sqi(e,t,n){let r=new WeakRef(t),o=new WeakRef(e);if(e.signal.aborted){n.call(o,r);return}let s=n.bind(o,r);e.signal.addEventListener("abort",s,{once:!0}),yMd.register(t,{parentSignalRef:new WeakRef(e.signal),handler:s}),t.signal.addEventListener("abort",_Md.bind(o,new WeakRef(s)),{once:!0})}
function h1(e,t){let n=kl(t);return sqi(e,n,gMd),n}
function iqi(e,t){if(e.signal.aborted)return t.abort(e.signal.reason),()=>{};let n=()=>t.abort(e.signal.reason);return e.signal.addEventListener("abort",n,{once:!0}),()=>e.signal.removeEventListener("abort",n)}
function qMt(e){return new DOMException(e,"AbortError")}
function WMt(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e}
function SMd(e){return TMd.has(WMt(e))}
function Dke(e){return e.aborted&&WMt(e.reason)===e7r}
function GMt(){return new DOMException(e7r,"AbortError")}
function VMt(e){switch(WMt(e)){case"user-cancel":return"user_cancel";case"remote-cancel":return"remote_cancel";case"interrupt":return"interrupt";case"background":return"background";case"recovery-timeout":return"recovery_timeout";case e7r:return"server_fallback_tombstone";default:return"turn_teardown"}}
function aqi(e){switch(e){case"user_cancel":case"remote_cancel":case"interrupt":case"background":return!0;case"turn_teardown":case"recovery_timeout":case"server_fallback_tombstone":return!1}}
function bMd(e){let t=this.deref();if(!t||!SMd(t.signal.reason))return;e.deref()?.abort(t.signal.reason)}
function EMd(e){e.deref()?.abort("recovery-timeout")}
function lqi(e,t=t7r){let n=kl();if(sqi(e,n,bMd),n.signal.aborted)return n;let r=setTimeout(EMd,t,new WeakRef(n));return r.unref(),n.signal.addEventListener("abort",clearTimeout.bind(void 0,r),{once:!0}),n}
var oqi,hMd=50,yMd,TMd,e7r="server-fallback-tombstone",t7r=600000;
var lh=b(()=>{oqi=require("events");yMd=new FinalizationRegistry(({parentSignalRef:e,handler:t})=>{e.deref()?.removeEventListener("abort",t)});TMd=new Set(["user-cancel","remote-cancel","interrupt"])});
export {kl,gMd,_Md,sqi,h1,iqi,qMt,WMt,SMd,Dke,GMt,VMt,aqi,bMd,EMd,lqi,oqi,hMd,yMd,TMd,e7r,t7r,lh};
