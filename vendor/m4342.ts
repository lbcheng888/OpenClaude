// @ts-nocheck
import {mh,iy,vC} from "./m5145.ts";
import {Jx,ws} from "./m228.ts";
import {SO,fp,J_,bO,Mf,__,initKp} from "./m609.ts";
import {isAmberSentinelEnabled,QH} from "./m2784.ts";
import {_m,sA} from "./m2782.ts";
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {e6e,Fut,od,i3t,RE} from "../src/agent/4342_toolUseCount.ts";
import {zge,x2t} from "./m3901.ts";
import {uI,Ax} from "./m5146.ts";
import {Pt,Go} from "./m632.ts";
import {oI} from "./m3350.ts";
import {I3t,f4n} from "../src/agent/4289_type.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function iFp(e){let t=e.trimEnd().split(`
`).pop()??"";return sFp.some((n)=>n.test(t))}
function Gfo(e,t,n,r,o){if(n==="monitor")return()=>{};let s=mh(e),i=0,a=Date.now(),l=!1,c=setInterval(()=>{rJa.stat(s).then((u)=>{if(u.size>i){i=u.size,a=Date.now();return}if(Date.now()-a<nFp)return;Jx(s,rFp).then(({content:d})=>{if(l)return;if(!iFp(d)){a=Date.now();return}l=!0,clearInterval(c);let p=r?`
<${SO}>${r}</${SO}>`:"",m=`${Fdt}"${t}" appears to be waiting for interactive input`,f=`<${fp}>
<${J_}>${e}</${J_}>${p}
<${bO}>${s}</${bO}>
<${Mf}>${isAmberSentinelEnabled(m)}</${Mf}>
</${fp}>
Last output:
${d.trimEnd()}

The command is likely blocked on an interactive prompt. Stop this task and re-run with piped input (e.g., \`echo y | command\`) or a non-interactive flag if one exists.`;_m({value:f,mode:"task-notification",priority:"next",agentId:o??mainAgentId()}),Ie("task_local_shell_stall_detected")},()=>{})},()=>{})},tFp);return c.unref(),()=>{l=!0,clearInterval(c)}}
function tqn(e,t,n,r,o,s,i="bash",a){let l=!1;if(o.update(e,(m)=>{if(m.notified)return m;return l=!0,{...m,notified:!0}}),!l)return;if(n==="completed")Ie("task_local_shell");else if(n==="failed")Oe("task_local_shell","task_local_shell_failed");o.abortSpeculation();let c;if(i==="monitor")switch(n){case"completed":c=`Monitor "${t}" stream ended`;break;case"failed":c=`Monitor "${t}" script failed${r!==void 0?` (exit ${r})`:""}`;break;case"killed":c=`Monitor "${t}" stopped`;break}else switch(n){case"completed":c=`${Fdt}"${t}" completed${r!==void 0?` (exit code ${r})`:""}`;break;case"failed":c=`${Fdt}"${t}" failed${r!==void 0?` with exit code ${r}`:""}`;break;case"killed":c=`${Fdt}"${t}" was stopped`;break}let u=mh(e),d=s?`
<${SO}>${s}</${SO}>`:"",p=`<${fp}>
<${J_}>${e}</${J_}>${d}
<${bO}>${u}</${bO}>
<${__}>${n}</${__}>
<${Mf}>${isAmberSentinelEnabled(c)}</${Mf}>
</${fp}>`;if(_m({value:p,mode:"task-notification",priority:"next",agentId:a??mainAgentId()}),a!==void 0)Bh(e,n==="killed"?"stopped":n,{toolUseId:s,summary:c,outputFile:u})}
function oJa(e,t,n,r,o,s){e6e(s,`bash:${e}`,n);let i;if(s!==void 0){let a=parseInt(process.env.CLAUDE_SUBAGENT_BG_SHELL_MAX_MS||"",10)||oFp;i=setTimeout((l,c,u,d,p,m)=>{tqn(l,c,"killed",void 0,u,d,p,m),zge(l,u)},a,e,t,n,r,o,s),i.unref?.()}return()=>{if(i)clearTimeout(i);Fut(s,`bash:${e}`,n)}}
async function e0e(e,t){let{command:n,description:r,shellCommand:o,toolUseId:s,agentId:i,kind:a}=e,{taskRegistry:l}=t,{taskOutput:c}=o,u=c.taskId,d={...uI(u,"local_bash",r,s),type:"local_bash",status:"running",command:n,cwd:Pt(),completionStatusSentInAttachment:!1,shellCommand:o,lastReportedTotalLines:0,isBackgrounded:!0,agentId:i,kind:a};l.register(d);let p=a!=="monitor"?oJa(u,r,l,s,a,i):void 0;o.background(u);let m=Gfo(u,r,a,s,i);return o.result.then(async(f)=>{m(),await zfo(o);let A=!1;l.update(u,(h)=>{if(h.status==="killed")return A=!0,h;if(h.notified)return h;return{...h,status:S0e(f),result:{code:f.code,interrupted:f.interrupted},shellCommand:null,endTime:Date.now()}}),tqn(u,r,A?"killed":S0e(f),f.code,l,s,a,i),p?.(),iy(u)}),{taskId:u}}
function j4n(e,t,n){let{command:r,description:o,shellCommand:s,agentId:i}=e,a=s.taskOutput.taskId,l={...uI(a,"local_bash",o,n),type:"local_bash",status:"running",command:r,cwd:Pt(),completionStatusSentInAttachment:!1,shellCommand:s,lastReportedTotalLines:0,isBackgrounded:!1,agentId:i};return t.register(l),a}
function sJa(e,t){let n=t.get(e);if(!oI(n)||n.isBackgrounded||!n.shellCommand)return!1;let{shellCommand:r,description:o}=n,{toolUseId:s,kind:i,agentId:a}=n;if(!r.background(e))return!1;t.update(e,(c)=>{if(c.isBackgrounded)return c;return{...c,isBackgrounded:!0}});let l=Gfo(e,o,i,s,a);return r.result.then(async(c)=>{l(),await zfo(r);let u=!1;t.update(e,(d)=>{if(d.status==="killed")return u=!0,d;if(d.notified)return d;return{...d,status:S0e(c),result:{code:c.code,interrupted:c.interrupted},shellCommand:null,endTime:Date.now()}}),tqn(e,o,u?"killed":S0e(c),c.code,t,s,i,a),iy(e)}),!0}
function Vfo(e){return Object.values(e.tasks).some((t)=>{if(oI(t)&&!t.isBackgrounded&&t.shellCommand)return!0;if(od(t)&&!t.isBackgrounded&&!I3t(t))return!0;return!1})}
function y6e(e){let t=e.all(),n=Object.keys(t).filter((o)=>{let s=t[o];return oI(s)&&!s.isBackgrounded&&s.shellCommand});for(let o of n)sJa(o,e);let r=Object.keys(t).filter((o)=>{let s=t[o];return od(s)&&!s.isBackgrounded});for(let o of r)i3t(o,e);Ie("task_local_shell_background_all")}
function Kfo(e,t){for(let[n,r]of Object.entries(t.all())){if(r.toolUseId!==e)continue;if(oI(r)&&!r.isBackgrounded&&r.shellCommand)return sJa(n,t);if(od(r)&&!r.isBackgrounded&&!I3t(r))return i3t(n,t),!0;return!1}return!1}
function W4n(e,t,n,r,o){if(!t.background(e))return!1;let s;r.update(e,(l)=>{if(l.isBackgrounded)return l;return s=l.agentId,{...l,isBackgrounded:!0}});let i=Gfo(e,n,void 0,o,s),a=oJa(e,n,r,o,void 0,s);return t.result.then(async(l)=>{i(),await zfo(t);let c=!1;r.update(e,(u)=>{if(u.status==="killed")return c=!0,u;if(u.notified)return u;return{...u,status:S0e(l),result:{code:l.code,interrupted:l.interrupted},shellCommand:null,endTime:Date.now()}}),tqn(e,n,c?"killed":S0e(l),l.code,r,o,void 0,s),a(),iy(e)}),!0}
function G4n(e,t,n){let r=!1;if(n.update(e,(o)=>{if(o.notified)return o;return r=!0,{...o,notified:!0,status:S0e(t),result:{code:t.code,interrupted:t.interrupted},shellCommand:null,endTime:Date.now()}}),r){let o=S0e(t);if(o==="completed")Ie("task_local_shell");else if(o==="failed")Oe("task_local_shell","task_local_shell_failed")}return r}
function V4n(e,t,n){let r=n.get(e);if(!oI(r)||r.isBackgrounded||r.notified)return;n.remove(e),Bh(e,t,{toolUseId:r.toolUseId,summary:r.description})}
function Ddt(e){if(e.interrupted)return"stopped";return e.code===0?"completed":"failed"}
function S0e(e){if(e.interrupted)return"killed";return e.code===0?"completed":"failed"}
async function zfo(e){try{await e.taskOutput.flush(),e.cleanup()}catch(t){De(t)}}
var rJa,Fdt="Background command ",tFp=5000,nFp=45000,rFp=1024,oFp=3600000,sFp,x3n;
var eJ=b(()=>{lt();initKp();ln();Ax();Go();ws();Rn();sA();bC();vC();QH();RE();f4n();x2t();rJa=require("fs/promises"),sFp=[/\(y\/n\)/i,/\[y\/n\]/i,/\(yes\/no\)/i,/\b(?:Do you|Would you|Shall I|Are you sure|Ready to)\b.*\? *$/i,/Press (any key|Enter)/i,/Continue\?/i,/Overwrite\?/i];x3n={name:"LocalShellTask",type:"local_bash",async kill(e,t){zge(e,t)}}});
export {iFp,Gfo,tqn,oJa,e0e,j4n,sJa,Vfo,y6e,Kfo,W4n,G4n,V4n,Ddt,S0e,zfo,rJa,Fdt,tFp,nFp,rFp,oFp,sFp,x3n,eJ};
