// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Cbt,initKp} from "./m609.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {dn,bt} from "./m195.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {wN,$He} from "./m3864.ts";
import {isProcessRunning,isSameProcessAsync,rE} from "./m1456.ts";
import {zt,qs} from "./m635.ts";
function $0a(e){if(e.startsWith("uds:"))return{scheme:"uds",target:e.slice(4)};if(e.startsWith("bridge:"))return{scheme:"bridge",target:e.slice(7)};if(e.startsWith("/"))return{scheme:"uds",target:e};if(e.startsWith("\\\\.\\pipe\\"))return{scheme:"uds",target:e};return{scheme:"other",target:e}}
function Lge(e){if(!/^[\\/]{2}/.test(e))return!0;let t=/^[\\/]{2}[.?][\\/]pipe[\\/]([^\\/]+)$/i.exec(e);return t!==null&&t[1]!=="."&&t[1]!==".."}
var Ooo={};
isFullscreenWithTTY(Ooo,{sendToUdsSocket:()=>sendToUdsSocket,sendControlToUdsSocket:()=>sendControlToUdsSocket,listLivePeerSessions:()=>listLivePeerSessions,listAllLiveSessions:()=>listAllLiveSessions,buildCrossSessionAttrs:()=>buildCrossSessionAttrs});
function KAp(e){return VAp.includes(e)?e:void 0}
function YAp(e){return zAp.includes(e)?e:void 0}
function sendToUdsSocket(e,t,n){let o=buildCrossSessionAttrs(void 0,n),s=`<${Cbt}${o}>
${t}
</${Cbt}>`;return logForDebugging(`[uds-client] Sending ${t.length} chars to ${e}`),j0a(e,{type:"user",message:{role:"user",content:s},priority:"next",from:void 0})}
function sendControlToUdsSocket(e,t){return logForDebugging(`[uds-client] Sending control:${t.action} to ${e}`),j0a(e,{type:"control",...t})}
function buildCrossSessionAttrs(e,t){let n=[];if(e)n.push(`from="${e}"`);let r=t?.replace(/["\n\r<>]/g,"").trim();if(r)n.push(`from-name="${r}"`);return n.length>0?` ${n.join(" ")}`:""}
function j0a(e,t){return new Promise((n,r)=>{if(!Lge(e)){r(Error(`Refusing to connect to non-local IPC path: ${e}`));return}let o=Ioo.connect({path:e}),s=!1;o.setTimeout(5000,()=>{s=!0,o.destroy(),r(Error(`Timed out sending to ${e}`))}),o.on("error",(i)=>{s=!0,r(i)}),o.on("connect",()=>{o.end(Le(t)+`
`)}),o.on("close",()=>{if(!s)logForDebugging(`[uds-client] Sent to ${e}`);n()})})}
function JAp(e){return new Promise((t)=>{if(!Lge(e)){t(!1);return}let n=Ioo.connect({path:e}),r=(o)=>{n.destroy(),t(o)};n.on("connect",()=>r(!0)),n.on("error",(o)=>r(dn(o)==="EBUSY")),n.setTimeout(250,()=>r(!1))})}
async function W0a(){let e=Hoo.join(tr(),"sessions"),t;try{t=await LUt.readdir(e)}catch{return[]}return(await Promise.all(t.filter((r)=>/^\d+\.json$/.test(r)).map(async(r)=>{try{let o=parseInt(r.replace(/\.json$/,""),10);if(isNaN(o))return null;let s=Hoo.join(e,r),i=await wN(s,262144);if(i===null)return null;let a=qt(i);return{sock:a.messagingSocketPath??"",cwd:a.cwd??"?",startedAt:a.startedAt??0,procStart:typeof a.procStart==="string"?a.procStart:void 0,name:a.name,kind:KAp(a.kind),sessionId:a.sessionId,jobId:typeof a.jobId==="string"?a.jobId:void 0,bridgeSessionId:typeof a.bridgeSessionId==="string"?a.bridgeSessionId:void 0,logPath:a.logPath,status:YAp(a.status),waitingFor:typeof a.waitingFor==="string"?a.waitingFor:void 0,updatedAt:typeof a.updatedAt==="number"?a.updatedAt:void 0,statusUpdatedAt:typeof a.statusUpdatedAt==="number"?a.statusUpdatedAt:void 0,entrypoint:typeof a.entrypoint==="string"?a.entrypoint:void 0,agent:typeof a.agent==="string"?a.agent:void 0,state:typeof a.state==="string"?a.state:void 0,detail:typeof a.detail==="string"?a.detail:void 0,tempo:a.tempo==="active"||a.tempo==="idle"||a.tempo==="blocked"?a.tempo:void 0,needs:typeof a.needs==="string"?a.needs:void 0,peerProtocol:typeof a.peerProtocol==="number"?a.peerProtocol:void 0,tmux:typeof a.tmux==="string"?a.tmux:void 0,pid:o,file:s}}catch{return null}}))).filter((r)=>r!==null)}
async function listAllLiveSessions(){let e=await W0a(),t=e.map((s)=>isProcessRunning(s.pid)),n=await Promise.all(e.map((s,i)=>t[i]&&isSameProcessAsync(s.pid,s.procStart))),r=zt()!=="wsl",o=[];for(let s=0;s<e.length;s++){let{file:i,...a}=e[s];if(n[s])o.push(a);else if(r&&!t[s])LUt.unlink(i).catch(()=>{})}return o}
async function listLivePeerSessions(){let t=(await W0a()).filter((s)=>s.sock&&s.sock!==void 0),n=await Promise.all(t.map((s)=>JAp(s.sock))),r=zt()!=="wsl",o=[];for(let s=0;s<t.length;s++){let{file:i,...a}=t[s];if(n[s])o.push(a);else if(r&&!isProcessRunning(a.pid))LUt.unlink(i).catch(()=>{})}return o}
var LUt,Ioo,Hoo,VAp,zAp;
var rlt=b(()=>{initKp();qe();sn();bt();$He();rE();qs();Xt();LUt=require("fs/promises"),Ioo=require("net"),Hoo=require("path"),VAp=["interactive","bg","daemon","daemon-worker"];zAp=["busy","shell","idle","waiting"]});
export {$0a,Lge,Ooo,KAp,YAp,sendToUdsSocket,sendControlToUdsSocket,buildCrossSessionAttrs,j0a,JAp,W0a,listAllLiveSessions,listLivePeerSessions,LUt,Ioo,Hoo,VAp,zAp,rlt};
