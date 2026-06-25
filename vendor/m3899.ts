// @ts-nocheck
import {b0e,mS} from "./m3842.ts";
import {lv,vw} from "./m5178.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Mn,po} from "../src/tools/5224_userPromptCount.ts";
import {b} from "../runtime.ts";
import {N0e,M0e} from "./m3898.ts";
function tBa(e,t){t.update(e,(n)=>{if(n.status!=="running"||n.shutdownRequested)return n;return{...n,shutdownRequested:!0}})}
function Zco(e,t,n){if(n.get(e)?.status!=="running")return;n.updateTranscript(e,(r)=>({...r,messages:b0e(r.messages,t)}))}
function k9t(e,t,n,r){let o=n.get(e);if(!o||lv(o.status)){logForDebugging(`Dropping message for teammate task ${e}: task status is "${o?.status}"`);return}n.update(e,(s)=>({...s,pendingUserMessages:[...s.pendingUserMessages,{text:t,origin:r}]})),n.updateTranscript(e,(s)=>({...s,messages:b0e(s.messages,Mn({content:t,origin:r}))}))}
function iye(e,t){let n;for(let r of Object.values(t))if(mS(r)&&r.identity.agentId===e){if(r.status==="running")return r;if(!n)n=r}return n}
function euo(e){return Object.values(e).filter(mS)}
var eBa;
var F0e=b(()=>{vw();qe();po();N0e();eBa={name:"InProcessTeammateTask",type:"in_process_teammate",async kill(e,t,n){M0e(e,t,n)}}});
export {tBa,Zco,k9t,iye,euo,eBa,F0e};
