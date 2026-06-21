// @ts-nocheck
import {PHe,yS} from "./m3824.ts";
import {nR,Ax} from "./m5146.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ln,lo} from "../src/tools/5190_userPromptCount.ts";
import {b} from "../runtime.ts";
import {zHe,KHe} from "./m3880.ts";
function IDa(e,t){t.update(e,(n)=>{if(n.status!=="running"||n.shutdownRequested)return n;return{...n,shutdownRequested:!0}})}
function iso(e,t,n){if(n.get(e)?.status!=="running")return;n.updateTranscript(e,(r)=>({...r,messages:PHe(r.messages,t)}))}
function t2t(e,t,n,r){let o=n.get(e);if(!o||nR(o.status)){logForDebugging(`Dropping message for teammate task ${e}: task status is "${o?.status}"`);return}n.update(e,(s)=>({...s,pendingUserMessages:[...s.pendingUserMessages,{text:t,origin:r}]})),n.updateTranscript(e,(s)=>({...s,messages:PHe(s.messages,Ln({content:t,origin:r}))}))}
function jge(e,t){let n;for(let r of Object.values(t))if(yS(r)&&r.identity.agentId===e){if(r.status==="running")return r;if(!n)n=r}return n}
function aso(e){return Object.values(e).filter(yS)}
var HDa;
var YHe=b(()=>{Ax();qe();lo();zHe();HDa={name:"InProcessTeammateTask",type:"in_process_teammate",async kill(e,t,n){KHe(e,t,n)}}});
export {IDa,iso,t2t,jge,aso,HDa,YHe};
