// @ts-nocheck
import {logEvent,Ct} from "../../vendor/m131.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {ije,Bqt} from "../../vendor/m4479.ts";
import {JAn,nE,jS} from "../api/2023_used.ts";
import {getMainThreadAgentType,getSdkBetas,getSessionId,getOriginalCwd,getTotalCostUSD,getTotalDuration,getTotalAPIDuration,getTotalLinesAdded,getTotalLinesRemoved,lt} from "../session/0131_sent.ts";
import {getCurrentWorktreeSession} from "../config/3332_flushAnalyticsSinks.ts";
import {getRuntimeMainLoopModel,renderModelName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {hN,Vq} from "../../vendor/m5187.ts";
import {Xtt,Cwn,oN} from "../core/2729_input_tokens.ts";
import {getCurrentSessionTitle,getCurrentSessionAiTitle,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {TOt,PF} from "../api/2739_status.ts";
import {createBaseHookInput,executeStatusLineCommand,yp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {Lw,jO,Om} from "../config/2215_level.ts";
import {Cne,$6t} from "../../vendor/m4610.ts";
import {dd,ec,Dd} from "../../vendor/m687.ts";
import {_P,allTools,lo} from "../tools/5190_userPromptCount.ts";
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {sy,e9} from "../../vendor/m2808.ts";
import {kE,jL} from "../../vendor/m3944.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {getGitWorktreeName,getRemoteUrl,Ba} from "../../vendor/m693.ts";
import {parseGitRemote,ZI} from "../../vendor/m692.ts";
import {j4} from "../../vendor/m2443.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {checkHasTrustDialogAccepted,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {lD,EJ} from "../../vendor/m4592.ts";
import {Box} from "../../vendor/m2422.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {Text} from "../../vendor/m2423.ts";
import {Ansi} from "../../vendor/m2431.ts";
import {b,M} from "../../runtime.ts";
import {H9} from "../telemetry/4045_contextWindow.ts";
import {ze} from "../../vendor/m2452.ts";
import {hI} from "../session/5172_worktreeBranchName.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
class k9l{pending=null;cancelScheduledFlush=null;scheduleTimeout;onFlush;flushIntervalMs;boundFlush;constructor({scheduleTimeout:e,onFlush:t,flushIntervalMs:n}){this.scheduleTimeout=e,this.onFlush=t,this.flushIntervalMs=n,this.boundFlush=this.flush.bind(this)}apply(e){let t=e(this.pending);if(t===null){this.clear();return}if(this.pending=t,this.cancelScheduledFlush===null)this.cancelScheduledFlush=this.scheduleTimeout(this.boundFlush,this.flushIntervalMs)}clear(){this.pending=null,this.dispose(),this.onFlush(null)}peek(){return this.pending}dispose(){if(this.cancelScheduledFlush!==null)this.cancelScheduledFlush(),this.cancelScheduledFlush=null}flush(){this.cancelScheduledFlush=null,this.onFlush(this.pending)}}
function H9l({scheduleTimeout:e,onFlush:t,flushIntervalMs:n=16}){return new k9l({scheduleTimeout:e,onFlush:t,flushIntervalMs:n})}
function D9l(e,t,n,r=logEvent){if(!e.current)return;e.current=!1,r(t,n())}
async function nRm(e){let{signal:t,executeCommand:n,getCommandLength:r,pendingResultLogRef:o,onResult:s,logFn:i=logEvent}=e,a=r();try{let l=await n();if(t.aborted)return;if(s(l),l)D9l(o,"tengu_status_line_result",()=>{let c=l.split(`
`),u=0;for(let d of c){let p=tn(d);if(p>u)u=p}return{char_length:l.length,visual_width:u,line_count:c.length,command_length:a}},i)}catch{}}
function P9l(e){return ije(e?.statusLine)!==void 0}
function rRm(e,t){let n=JAn(e,t);return{total_input_tokens:e?e.input_tokens+e.cache_creation_input_tokens+e.cache_read_input_tokens:0,total_output_tokens:e?.output_tokens??0,context_window_size:t,current_usage:e,used_percentage:n.used,remaining_percentage:n.remaining}}
function oRm(e,t,n,r,o,s,i,a,l,c,u,d,p,m){let f=getMainThreadAgentType(),A=getCurrentWorktreeSession(),h=getRuntimeMainLoopModel({permissionMode:e,mainLoopModel:i,exceeds200kTokens:t}),g=r?.outputStyle||hN,_=Xtt(o),y=nE(h,getSdkBetas()),T=getSessionId(),S=getCurrentSessionTitle(T)??getCurrentSessionAiTitle(T),v=TOt(),R={...v.five_hour&&{five_hour:{used_percentage:v.five_hour.utilization*100,resets_at:v.five_hour.resets_at}},...v.seven_day&&{seven_day:{used_percentage:v.seven_day.utilization*100,resets_at:v.seven_day.resets_at}}};return{...createBaseHookInput(),cwd:d,...S&&{session_name:S},model:{id:h,display_name:renderModelName(h)},workspace:{current_dir:d,project_dir:getOriginalCwd(),added_dirs:s,...a&&{git_worktree:a},...l&&{repo:l}},version:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,output_style:{name:g},cost:{total_cost_usd:getTotalCostUSD(),total_duration_ms:getTotalDuration(),total_api_duration_ms:getTotalAPIDuration(),total_lines_added:getTotalLinesAdded(),total_lines_removed:getTotalLinesRemoved()},context_window:rRm(_,y),exceeds_200k_tokens:t,fast_mode:n,...Lw(h)&&{effort:{level:jO(h,p)}},thinking:{enabled:m!==!1},...(R.five_hour||R.seven_day)&&{rate_limits:R},...Cne()&&{vim:{mode:u??"INSERT"}},...f&&{agent:{name:f}},...dd()!==null&&{remote:{session_id:getSessionId()}},...c&&{pr:{number:c.number,url:c.url,...c.reviewState&&{review_state:c.reviewState},...c.kind&&{kind:c.kind}}},...A&&{worktree:{name:A.worktreeName,path:A.worktreePath,branch:A.worktreeBranch,original_cwd:A.originalCwd,original_branch:A.originalBranch}}}}
function WDo(e){return _P(e)?.uuid??null}
function sRm({messagesRef:e,lastAssistantMessageId:t,tokenUsage:n,vimMode:r}){let o=Hb.useRef(void 0),s=mt((Q)=>Q.toolPermissionContext.mode),i=mt((Q)=>Q.toolPermissionContext.additionalWorkingDirectories),a=mt((Q)=>Q.statusLineText),l=bo(),c=sy(),u=ije(c?.statusLine),d=kE(),p=mt((Q)=>Q.fastMode??!1),m=mt((Q)=>Q.effortValue),f=mt((Q)=>Q.thinkingEnabled),A=mt((Q)=>Q.prStatus),h=Hb.useRef(c);h.current=c;let g=Hb.useRef(u);g.current=u;let _=Hb.useRef(r);_.current=r;let y=Hb.useRef(s);y.current=s;let T=Hb.useRef(i);T.current=i;let S=Hb.useRef(d);S.current=d;let v=Hb.useRef(p);v.current=p;let R=Hb.useRef(m);R.current=m;let k=Hb.useRef(f);k.current=f;let x=Hb.useRef(A);x.current=A;let H=Hb.useRef({messageId:null,tokenUsage:n,exceeds200kTokens:!1,permissionMode:s,vimMode:r,mainLoopModel:d,fastMode:p,effortValue:m,thinkingEnabled:f,prStatus:A}),I=Hb.useRef(!0),P=Hb.useRef(!0),L=Hb.useRef(!0),D=Hb.useCallback(async()=>{o.current?.abort();let Q=new AbortController;o.current=Q;let K=allTools(e.current),Y=I.current;I.current=!1;let J=H.current.exceeds200kTokens,ee=WDo(K);if(ee!==H.current.messageId)J=Cwn(K),H.current.messageId=ee,H.current.exceeds200kTokens=J;let te=Pt(),[ne,re]=await Promise.all([getGitWorktreeName(te),ec()?Promise.resolve(null):getRemoteUrl()]),oe=re?parseGitRemote(re):null;await nRm({signal:Q.signal,executeCommand:()=>executeStatusLineCommand(oRm(y.current,J,v.current,h.current,K,Array.from(T.current.keys()),S.current,ne,oe,x.current,_.current,te,R.current,k.current),Q.signal,void 0,Y),getCommandLength:()=>g.current?.command.length,pendingResultLogRef:L,onResult:(ce)=>{l((ue)=>{if(ue.statusLineText===ce)return ue;return{...ue,statusLineText:ce}})}})},[e,l]),N=j4(()=>{D()},300);Hb.useEffect(()=>{if(t!==H.current.messageId||n!==H.current.tokenUsage||s!==H.current.permissionMode||r!==H.current.vimMode||d!==H.current.mainLoopModel||p!==H.current.fastMode||m!==H.current.effortValue||f!==H.current.thinkingEnabled||A!==H.current.prStatus)H.current.tokenUsage=n,H.current.permissionMode=s,H.current.vimMode=r,H.current.mainLoopModel=d,H.current.fastMode=p,H.current.effortValue=m,H.current.thinkingEnabled=f,H.current.prStatus=A,N()},[t,n,s,r,d,p,m,f,A,N]);let O=u?.refreshInterval;useInterval(N,O!==void 0?Math.max(1,O)*1000:null);let $=u?.command,U=Hb.useRef(!0);Hb.useEffect(()=>{if(U.current){U.current=!1;return}I.current=!0,P.current=!0,L.current=!0,D()},[$,D]);let W=u;Hb.useEffect(()=>{if(!W)return;D9l(P,"tengu_status_line_mount",()=>({command_length:W.command.length,padding:W.padding}))},[W]);let G=Hb.useRef(!1);Hb.useEffect(()=>{if(G.current)return;if(!W)return;if(G.current=!0,c?.disableAllHooks===!0)logForDebugging("Status line is configured but disableAllHooks is true",{level:"warn"});if(!checkHasTrustDialogAccepted())lD("statusline",1),l((Q)=>{if(Q.setupIssues.statuslineIssueCount===1)return Q;return{...Q,setupIssues:{...Q.setupIssues,statuslineIssueCount:1}}}),logForDebugging("Status line command skipped: workspace trust not accepted",{level:"warn"})},[W,c?.disableAllHooks,l]),Hb.useEffect(()=>(D(),()=>{o.current?.abort()}),[]);let V=u?.padding??0;return XN.createElement(Box,{paddingX:V,gap:2},a?XN.createElement(iRm,{text:a}):Ms()?XN.createElement(Text,null," "):null)}
function iRm(e){let t=I9l.c(11),{text:n}=e,r,o,s,i;if(t[0]!==n){i=Symbol.for("react.early_return_sentinel");e:{let l=cRm(n);if(l.length===1){let c=XN.createElement(Ansi,null,n),u;if(t[5]!==c)u=XN.createElement(Text,{dimColor:!0,wrap:"truncate"},c),t[5]=c,t[6]=u;else u=t[6];i=u;break e}r=Box,o="column",s=l.map(aRm)}t[0]=n,t[1]=r,t[2]=o,t[3]=s,t[4]=i}else r=t[1],o=t[2],s=t[3],i=t[4];if(i!==Symbol.for("react.early_return_sentinel"))return i;let a;if(t[7]!==r||t[8]!==o||t[9]!==s)a=XN.createElement(r,{flexDirection:o},s),t[7]=r,t[8]=o,t[9]=s,t[10]=a;else a=t[10];return a}
function aRm(e,t){return XN.createElement(Text,{key:t,dimColor:!0,wrap:"truncate"},XN.createElement(Ansi,null,e))}
function cRm(e){let t=e.split(`
`);if(t.length===1)return t;let n=[t[0]],r="";for(let o=1;o<t.length;o++)r+=(t[o-1].match(lRm)??[]).join(""),n.push(r+t[o]);return n}
var I9l,XN,Hb,lRm,O9l;
var GDo=b(()=>{Ct();configProtoStore();lt();Vq();H9();jL();e9();Hc();ze();Dd();PF();Qn();jS();Go();qe();ZI();Om();Pp();Ba();Bqt();yp();lo();Mo();ja();EJ();oN();hI();$6t();I9l=M(rt(),1),XN=M(Te(),1),Hb=M(Te(),1);lRm=/\x1b\[[\d;]*m|\x1b\]8;[^\x07\x1b]*(?:\x07|\x1b\\)/g;O9l=Hb.memo(sRm)});
export {k9l,H9l,D9l,nRm,P9l,rRm,oRm,WDo,sRm,iRm,aRm,cRm,I9l,XN,Hb,lRm,O9l,GDo};
