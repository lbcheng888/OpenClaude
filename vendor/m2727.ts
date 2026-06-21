// @ts-nocheck
import {b} from "../runtime.ts";
function Jl(e=Mwd){let t=new AbortController;return gFi.setMaxListeners(e,t.signal),t}
function Nwd(e){let t=this.deref();e.deref()?.abort(t?.signal.reason)}
function Bwd(e){let t=this.deref(),n=e.deref();if(t&&n)t.signal.removeEventListener("abort",n)}
function _Fi(e,t,n){let r=new WeakRef(t),o=new WeakRef(e);if(e.signal.aborted){n.call(o,r);return}let s=n.bind(o,r);e.signal.addEventListener("abort",s,{once:!0}),t.signal.addEventListener("abort",Bwd.bind(o,new WeakRef(s)),{once:!0})}
function rN(e,t){let n=Jl(t);return _Fi(e,n,Nwd),n}
function yFi(e,t){if(e.signal.aborted)return t.abort(e.signal.reason),()=>{};let n=()=>t.abort(e.signal.reason);return e.signal.addEventListener("abort",n,{once:!0}),()=>e.signal.removeEventListener("abort",n)}
function cOt(e){return new DOMException(e,"AbortError")}
function uOt(e){return e instanceof DOMException&&e.name==="AbortError"?e.message:e}
function Uwd(e){return Fwd.has(uOt(e))}
function zRe(e){return e.aborted&&uOt(e.reason)===C8r}
function dOt(){return new DOMException(C8r,"AbortError")}
function pOt(e){switch(uOt(e)){case"user-cancel":return"user_cancel";case"remote-cancel":return"remote_cancel";case"interrupt":return"interrupt";case"background":return"background";case"recovery-timeout":return"recovery_timeout";case C8r:return"server_fallback_tombstone";default:return"turn_teardown"}}
function TFi(e){switch(e){case"user_cancel":case"remote_cancel":case"interrupt":case"background":return!0;case"turn_teardown":case"recovery_timeout":case"server_fallback_tombstone":return!1}}
function $wd(e){let t=this.deref();if(!t||!Uwd(t.signal.reason))return;e.deref()?.abort(t.signal.reason)}
function qwd(e){e.deref()?.abort("recovery-timeout")}
function SFi(e,t=v8r){let n=Jl();if(_Fi(e,n,$wd),n.signal.aborted)return n;let r=setTimeout(qwd,t,new WeakRef(n));return r.unref(),n.signal.addEventListener("abort",clearTimeout.bind(void 0,r),{once:!0}),n}
var gFi,Mwd=50,Fwd,C8r="server-fallback-tombstone",v8r=600000;
var ch=b(()=>{gFi=require("events");Fwd=new Set(["user-cancel","remote-cancel","interrupt"])});
export {Jl,Nwd,Bwd,_Fi,rN,yFi,cOt,uOt,Uwd,zRe,dOt,pOt,TFi,$wd,qwd,SFi,gFi,Mwd,Fwd,C8r,v8r,ch};
