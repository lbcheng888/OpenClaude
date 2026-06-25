// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {JAt,Ud} from "./m615.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {cn,Ct} from "./m197.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {U1,x0e} from "../src/config/3883_x0e.ts";
import {isProcessRunning,isSameProcessAsync,lE} from "./m1461.ts";
import {Yt,Es} from "./m641.ts";
function mFa(e){if(e.startsWith("uds:"))return{scheme:"uds",target:e.slice(4)};if(e.startsWith("bridge:"))return{scheme:"bridge",target:e.slice(7)};if(e.startsWith("/"))return{scheme:"uds",target:e};if(e.startsWith("\\\\.\\pipe\\"))return{scheme:"uds",target:e};return{scheme:"other",target:e}}
function X_e(e){if(!/^[\\/]{2}/.test(e))return!0;let t=/^[\\/]{2}[.?][\\/]pipe[\\/]([^\\/]+)$/i.exec(e);return t!==null&&t[1]!=="."&&t[1]!==".."}
var Rco={};
ft(Rco,{sendToUdsSocket:()=>sendToUdsSocket,sendControlToUdsSocket:()=>sendControlToUdsSocket,listLivePeerSessions:()=>listLivePeerSessions,listAllLiveSessions:()=>listAllLiveSessions,buildCrossSessionAttrs:()=>buildCrossSessionAttrs});
function Nvp(e){return Mvp.includes(e)?e:void 0}
function Bvp(e){return Fvp.includes(e)?e:void 0}
function sendToUdsSocket(e,t,n){let o=buildCrossSessionAttrs(void 0,n),s=`<${JAt}${o}>
${t}
</${JAt}>`;return logForDebugging(`[uds-client] Sending ${t.length} chars to ${e}`),hFa(e,{type:"user",message:{role:"user",content:s},priority:"next",from:void 0})}
function sendControlToUdsSocket(e,t){return logForDebugging(`[uds-client] Sending control:${t.action} to ${e}`),hFa(e,{type:"control",...t})}
function buildCrossSessionAttrs(e,t){let n=[];if(e)n.push(`from="${e}"`);let r=t?.replace(/["\n\r<>]/g,"").trim();if(r)n.push(`from-name="${r}"`);return n.length>0?` ${n.join(" ")}`:""}
function hFa(e,t){return new Promise((n,r)=>{if(!X_e(e)){r(Error(`Refusing to connect to non-local IPC path: ${e}`));return}let o=Eco.connect({path:e}),s=!1;o.setTimeout(5000,()=>{s=!0,o.destroy(),r(Error(`Timed out sending to ${e}`))}),o.on("error",(i)=>{s=!0,r(i)}),o.on("connect",()=>{o.end(TeamDeleteToolName(t)+`
`)}),o.on("close",()=>{if(!s)logForDebugging(`[uds-client] Sent to ${e}`);n()})})}
function Uvp(e){return new Promise((t)=>{if(!X_e(e)){t(!1);return}let n=Eco.connect({path:e}),r=(o)=>{n.destroy(),t(o)};n.on("connect",()=>r(!0)),n.on("error",(o)=>r(cn(o)==="EBUSY")),n.setTimeout(250,()=>r(!1))})}
async function gFa(){let e=bco.join(or(),"sessions"),t;try{t=await l9t.readdir(e)}catch{return[]}return(await Promise.all(t.filter((r)=>/^\d+\.json$/.test(r)).map(async(r)=>{try{let o=parseInt(r.replace(/\.json$/,""),10);if(isNaN(o))return null;let s=bco.join(e,r),i=await U1(s,262144);if(i===null)return null;let a=qt(i);return{sock:a.messagingSocketPath??"",cwd:a.cwd??"?",startedAt:a.startedAt??0,procStart:typeof a.procStart==="string"?a.procStart:void 0,name:a.name,kind:Nvp(a.kind),sessionId:a.sessionId,jobId:typeof a.jobId==="string"?a.jobId:void 0,bridgeSessionId:typeof a.bridgeSessionId==="string"?a.bridgeSessionId:void 0,logPath:a.logPath,status:Bvp(a.status),waitingFor:typeof a.waitingFor==="string"?a.waitingFor:void 0,updatedAt:typeof a.updatedAt==="number"?a.updatedAt:void 0,statusUpdatedAt:typeof a.statusUpdatedAt==="number"?a.statusUpdatedAt:void 0,entrypoint:typeof a.entrypoint==="string"?a.entrypoint:void 0,agent:typeof a.agent==="string"?a.agent:void 0,state:typeof a.state==="string"?a.state:void 0,detail:typeof a.detail==="string"?a.detail:void 0,tempo:a.tempo==="active"||a.tempo==="idle"||a.tempo==="blocked"?a.tempo:void 0,needs:typeof a.needs==="string"?a.needs:void 0,peerProtocol:typeof a.peerProtocol==="number"?a.peerProtocol:void 0,tmux:typeof a.tmux==="string"?a.tmux:void 0,pid:o,file:s}}catch{return null}}))).filter((r)=>r!==null)}
async function listAllLiveSessions(){let e=await gFa(),t=e.map((s)=>isProcessRunning(s.pid)),n=await Promise.all(e.map((s,i)=>t[i]&&isSameProcessAsync(s.pid,s.procStart))),r=Yt()!=="wsl",o=[];for(let s=0;s<e.length;s++){let{file:i,...a}=e[s];if(n[s])o.push(a);else if(r&&!t[s])l9t.unlink(i).catch(()=>{})}return o}
async function listLivePeerSessions(){let t=(await gFa()).filter((s)=>s.sock&&s.sock!==void 0),n=await Promise.all(t.map((s)=>Uvp(s.sock))),r=Yt()!=="wsl",o=[];for(let s=0;s<t.length;s++){let{file:i,...a}=t[s];if(n[s])o.push(a);else if(r&&!isProcessRunning(a.pid))l9t.unlink(i).catch(()=>{})}return o}
var l9t,Eco,bco,Mvp,Fvp;
var rut=b(()=>{Ud();qe();dn();Ct();x0e();lE();Es();tn();l9t=require("fs/promises"),Eco=require("net"),bco=require("path"),Mvp=["interactive","bg","daemon","daemon-worker"];Fvp=["busy","shell","idle","waiting"]});
export {mFa,X_e,Rco,Nvp,Bvp,sendToUdsSocket,sendControlToUdsSocket,buildCrossSessionAttrs,hFa,Uvp,gFa,listAllLiveSessions,listLivePeerSessions,l9t,Eco,bco,Mvp,Fvp,rut};
