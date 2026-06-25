// @ts-nocheck
import {gf,p_,wE} from "./m5177.ts";
import {pk,ps} from "./m230.ts";
import {Dv,bc,yp,qP,Fu,Qd,Ud} from "./m615.ts";
import {Ml,Yk} from "./m2796.ts";
import {rd,ef} from "./m2794.ts";
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {hf,RE} from "../src/session/2796_uuid.ts";
import {E5e,C5e,rc,fx,Cqt,hS} from "../src/agent/4362_toolUseCount.ts";
import {mye,C3t} from "./m3972.ts";
import {av,vw} from "./m5178.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {cd,xS} from "./m122.ts";
import {YA} from "./m3366.ts";
import {Jqt,b5n} from "../src/agent/4307_type.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function q6p(e){let t=e.trimEnd().split(`
`).pop()??"";return $6p.some((n)=>n.test(t))}
function qTo(e,t,n,r,o){if(n==="monitor")return()=>{};let s=gf(e),i=0,a=Date.now(),l=!1,c=setInterval(()=>{wnl.stat(s).then((u)=>{if(u.size>i){i=u.size,a=Date.now();return}if(Date.now()-a<F6p)return;pk(s,B6p).then(({content:d})=>{if(l)return;if(!q6p(d)){a=Date.now();return}l=!0,clearInterval(c);let p=r?`
<${Dv}>${r}</${Dv}>`:"",m=`${Fmt}"${t}" appears to be waiting for interactive input`,f=`<${bc}>
<${yp}>${e}</${yp}>${p}
<${qP}>${s}</${qP}>
<${Fu}>${Ml(m)}</${Fu}>
</${bc}>
Last output:
${d.trimEnd()}

The command is likely blocked on an interactive prompt. Stop this task and re-run with piped input (e.g., \`echo y | command\`) or a non-interactive flag if one exists.`;rd({value:f,mode:"task-notification",priority:"next",agentId:o??mainAgentId()}),He("task_local_shell_stall_detected")},()=>{})},()=>{})},N6p);return c.unref(),()=>{l=!0,clearInterval(c)}}
function w6t(e,t,n,r,o,s,i="bash",a){let l=!1;if(o.update(e,(m)=>{if(m.notified)return m;return l=!0,{...m,notified:!0}}),!l)return;if(n==="completed")He("task_local_shell");else if(n==="failed")xe("task_local_shell","task_local_shell_failed");o.abortSpeculation();let c;if(i==="monitor")switch(n){case"completed":c=`Monitor "${t}" stream ended`;break;case"failed":c=`Monitor "${t}" script failed${r!==void 0?` (exit ${r})`:""}`;break;case"killed":c=`Monitor "${t}" stopped`;break}else switch(n){case"completed":c=`${Fmt}"${t}" completed${r!==void 0?` (exit code ${r})`:""}`;break;case"failed":c=`${Fmt}"${t}" failed${r!==void 0?` with exit code ${r}`:""}`;break;case"killed":c=`${Fmt}"${t}" was stopped`;break}let u=gf(e),d=s?`
<${Dv}>${s}</${Dv}>`:"",p=`<${bc}>
<${yp}>${e}</${yp}>${d}
<${qP}>${u}</${qP}>
<${Qd}>${n}</${Qd}>
<${Fu}>${Ml(c)}</${Fu}>
</${bc}>`;if(rd({value:p,mode:"task-notification",priority:"next",agentId:a??mainAgentId()}),a!==void 0)hf(e,n==="killed"?"stopped":n,{toolUseId:s,summary:c,outputFile:u})}
function knl(e,t,n,r,o,s){E5e(s,`bash:${e}`,n);let i;if(s!==void 0){let a=parseInt(process.env.CLAUDE_SUBAGENT_BG_SHELL_MAX_MS||"",10)||U6p;i=setTimeout((l,c,u,d,p,m)=>{w6t(l,c,"killed",void 0,u,d,p,m),mye(l,u)},a,e,t,n,r,o,s),i.unref?.()}return()=>{if(i)clearTimeout(i);C5e(s,`bash:${e}`,n)}}
async function Kxe(e,t){let{command:n,description:r,shellCommand:o,toolUseId:s,agentId:i,kind:a}=e,{taskRegistry:l}=t,{taskOutput:c}=o,u=c.taskId,d={...av(u,"local_bash",r,s),type:"local_bash",status:"running",command:n,cwd:isTmuxControlMode(),completionStatusSentInAttachment:!1,shellCommand:o,lastReportedTotalLines:0,isBackgrounded:!0,agentId:i,kind:a};l.register(d);let p=a!=="monitor"?knl(u,r,l,s,a,i):void 0;o.background(u);let m=qTo(u,r,a,s,i);return o.result.then(async(f)=>{m(),await y8n(o);let h=!1;l.update(u,(g)=>{if(g.status==="killed")return h=!0,g;if(g.notified)return g;return{...g,status:fDe(f),result:{code:f.code,interrupted:f.interrupted},shellCommand:null,endTime:Date.now()}}),w6t(u,r,h?"killed":fDe(f),f.code,l,s,a,i),p?.(),p_(u)}),{taskId:u}}
function Hnl(e,t){let{taskId:n,command:r,description:o,toolUseId:s,kind:i,agentId:a}=e,l={...av(n,"local_bash",o,s),type:"local_bash",status:"running",command:r,cwd:isTmuxControlMode(),completionStatusSentInAttachment:!1,shellCommand:e.shellCommand,lastReportedTotalLines:e.lastReportedTotalLines,isBackgrounded:!0,agentId:a!==void 0?cd(a):void 0,kind:i};t.register(l),e.shellCommand.result.then(async(c)=>{await y8n(e.shellCommand);let u=c.interrupted?"killed":"completed";t.update(n,(m)=>m.notified?m:{...m,status:u,result:{code:c.code,interrupted:c.interrupted},shellCommand:null,endTime:Date.now()});let d=a!==void 0?t.get(a):void 0,p=rc(d)&&(d.status==="running"||fx(d));w6t(n,o,u,c.code,t,s,i,p?cd(a):void 0),p_(n)})}
function i8n(e,t,n){let{command:r,description:o,shellCommand:s,agentId:i}=e,a=s.taskOutput.taskId,l={...av(a,"local_bash",o,n),type:"local_bash",status:"running",command:r,cwd:isTmuxControlMode(),completionStatusSentInAttachment:!1,shellCommand:s,lastReportedTotalLines:0,isBackgrounded:!1,agentId:i};return t.register(l),a}
function Inl(e,t){let n=t.get(e);if(!YA(n)||n.isBackgrounded||!n.shellCommand)return!1;let{shellCommand:r,description:o}=n,{toolUseId:s,kind:i,agentId:a}=n;if(!r.background(e))return!1;t.update(e,(c)=>{if(c.isBackgrounded)return c;return{...c,isBackgrounded:!0}});let l=qTo(e,o,i,s,a);return r.result.then(async(c)=>{l(),await y8n(r);let u=!1;t.update(e,(d)=>{if(d.status==="killed")return u=!0,d;if(d.notified)return d;return{...d,status:fDe(c),result:{code:c.code,interrupted:c.interrupted},shellCommand:null,endTime:Date.now()}}),w6t(e,o,u?"killed":fDe(c),c.code,t,s,i,a),p_(e)}),!0}
function WTo(e){return Object.values(e.tasks).some((t)=>{if(YA(t)&&!t.isBackgrounded&&t.shellCommand)return!0;if(rc(t)&&!t.isBackgrounded&&!Jqt(t))return!0;return!1})}
function V5e(e){let t=e.all(),n=Object.keys(t).filter((o)=>{let s=t[o];return YA(s)&&!s.isBackgrounded&&s.shellCommand});for(let o of n)Inl(o,e);let r=Object.keys(t).filter((o)=>{let s=t[o];return rc(s)&&!s.isBackgrounded});for(let o of r)Cqt(o,e);He("task_local_shell_background_all")}
function GTo(e,t){for(let[n,r]of Object.entries(t.all())){if(r.toolUseId!==e)continue;if(YA(r)&&!r.isBackgrounded&&r.shellCommand)return Inl(n,t);if(rc(r)&&!r.isBackgrounded&&!Jqt(r))return Cqt(n,t),!0;return!1}return!1}
function a8n(e,t,n,r,o){if(!t.background(e))return!1;let s;r.update(e,(l)=>{if(l.isBackgrounded)return l;return s=l.agentId,{...l,isBackgrounded:!0}});let i=qTo(e,n,void 0,o,s),a=knl(e,n,r,o,void 0,s);return t.result.then(async(l)=>{i(),await y8n(t);let c=!1;r.update(e,(u)=>{if(u.status==="killed")return c=!0,u;if(u.notified)return u;return{...u,status:fDe(l),result:{code:l.code,interrupted:l.interrupted},shellCommand:null,endTime:Date.now()}}),w6t(e,n,c?"killed":fDe(l),l.code,r,o,void 0,s),a(),p_(e)}),!0}
function l8n(e,t,n){let r=!1;if(n.update(e,(o)=>{if(o.notified)return o;return r=!0,{...o,notified:!0,status:fDe(t),result:{code:t.code,interrupted:t.interrupted},shellCommand:null,endTime:Date.now()}}),r){let o=fDe(t);if(o==="completed")He("task_local_shell");else if(o==="failed")xe("task_local_shell","task_local_shell_failed")}return r}
function c8n(e,t,n){let r=n.get(e);if(!YA(r)||r.isBackgrounded||r.notified)return;n.remove(e),hf(e,t,{toolUseId:r.toolUseId,summary:r.description})}
function Dmt(e){if(e.interrupted)return"stopped";return e.code===0?"completed":"failed"}
function fDe(e){if(e.interrupted)return"killed";return e.code===0?"completed":"failed"}
async function y8n(e){try{await e.taskOutput.flush(),e.cleanup()}catch(t){Ie(t)}}
var wnl,Fmt="Background command ",N6p=5000,F6p=45000,B6p=1024,U6p=3600000,$6p,O6n;
var vG=b(()=>{lt();Ud();mn();vw();xS();Po();ps();vn();ef();RE();wE();Yk();hS();b5n();C3t();wnl=require("fs/promises"),$6p=[/\(y\/n\)/i,/\[y\/n\]/i,/\(yes\/no\)/i,/\b(?:Do you|Would you|Shall I|Are you sure|Ready to)\b.*\? *$/i,/Press (any key|Enter)/i,/Continue\?/i,/Overwrite\?/i];O6n={name:"LocalShellTask",type:"local_bash",async kill(e,t){mye(e,t)}}});
export {q6p,qTo,w6t,knl,Kxe,Hnl,i8n,Inl,WTo,V5e,GTo,a8n,l8n,c8n,Dmt,fDe,y8n,wnl,Fmt,N6p,F6p,B6p,U6p,$6p,O6n,vG};
