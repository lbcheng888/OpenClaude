// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {getMainLoopModelOverride,getReplConfigArgv,getOriginalCwd,getMemoryToggledOff,getSessionId,lt} from "../session/0131_sent.ts";
import {getCurrentWorktreeSession,_st,Nke,gracefulShutdown,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {getCurrentSessionFile,flushSessionStorage,getCurrentSessionTitle,getCurrentSessionAiTitle,isTranscriptPersistenceDisabled,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {withTimeout} from "../telemetry/1483_withTimeout.ts";
import {ryn,Om} from "../config/2215_level.ts";
import {spawnBgSession,stripResumeFlags,formatBgHints,T5t} from "../session/5133_withStdinPositional.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {vc,ma,Lp,Fwe,mg} from "../agent/2580_level.ts";
import {Mwe,UUe} from "../../vendor/m2578.ts";
import {De,Rn} from "../session/0615_length.ts";
import {isTmuxControlMode,Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {Bmt,jWn} from "../permissions/4767_once.ts";
import {allTools,rW,Jft,qL,zce,lo} from "../tools/5190_userPromptCount.ts";
import {Gi,ReactHooks} from "../../vendor/m133.ts";
import {bR,initKp} from "../../vendor/m609.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {o8n,Lpt} from "../agent/4492_label.ts";
import {Text} from "../../vendor/m2423.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {K_e,Qqt} from "../../vendor/m4494.ts";
import {ze} from "../../vendor/m2452.ts";
import {hI} from "../session/5172_worktreeBranchName.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var aLl={};
isFullscreenWithTTY(aLl,{spawnBackgroundFork:()=>spawnBackgroundFork,deriveBackgroundSeed:()=>deriveBackgroundSeed,call:()=>Ehm});
async function spawnBackgroundFork(e,t,n,r,o,s,i,a,l,c){let u=getMainLoopModelOverride(),d=typeof n==="string"?n:void 0,p=Array.from(o.values()).filter((R)=>R.source==="session").map((R)=>R.path),m=s.session??[],f=i.session??[],A=m.length>0||f.length>0?{allow:[...m],deny:[...f]}:void 0,h=s.cliArg??[],g=i.cliArg??[],_=getCurrentWorktreeSession(),y=Boolean(_&&!_.enteredExisting),T=getCurrentSessionFile();await withTimeout(flushSessionStorage(),2000,"flush timeout").catch(()=>{});let S=[...T!==null?["--resume",T,"--fork-session"]:[],...c?.replyOnResume?["--reply-on-resume"]:[],...getReplConfigArgv(),...p.flatMap((R)=>["--add-dir",R]),...h.flatMap((R)=>["--allowed-tools",R]),...g.flatMap((R)=>["--disallowed-tools",R]),...u?["--model",u]:[],...d&&ryn()?["--effort",d]:[],"--permission-mode",r,...t?["--",t]:[]],v=await spawnBgSession(S,c?.providedSessionId,"repl",_?.worktreePath??getOriginalCwd(),{...e,worktree:y?{path:_.worktreePath,branch:_.worktreeBranch,hookBased:_.hookBased??!1,originCwd:_.originalCwd}:void 0,sessionPermissionRules:A,memoryToggledOff:getMemoryToggledOff()||void 0},c?.extraEnv).catch((R)=>({ok:!1,error:`Couldn't background \u2014 ${Se(R)}`,reason:void 0}));if(!v.ok){logEvent("tengu_background_spawn_failed",{});let R=!1;if(a==="left_arrow"&&c?.providedSessionId!==void 0&&T!==null&&!v.alive){let k=vc(c.providedSessionId.slice(0,8)),x=await ma(k);if(x){let H=lKn.join(lKn.dirname(T),`${c.providedSessionId}.jsonl`);R=await aKn.copyFile(T,H).then(()=>Lp(k,{...x,state:"failed",tempo:"idle",needs:void 0,block:void 0,inFlight:void 0,detail:"couldn't start in the background \u2014 press Enter to retry",linkScanPath:H,respawnFlags:Mwe(stripResumeFlags(S)),updatedAt:new Date().toISOString()}).catch(async(I)=>{throw await aKn.rm(H,{force:!0}).catch(()=>{}),I})).then(()=>!0,(I)=>(De(I),!1))}if(R&&_)_st(null),Nke()}if(a==="left_arrow")if(R)isTmuxControlMode("repl_background_fork","queued_for_later");else Oe("repl_background_fork","spawn_failed");return{ok:!1,error:v.error,queued:R,reason:v.reason}}if(logEvent("tengu_background",{via_flag:!1,via:fromEnum(a)}),a==="left_arrow")Ie("repl_background_fork");if(_)_st(null),Nke();if(e.name===void 0&&v.sessionId){let R=v.short,k=Bmt(allTools([...l]),AbortSignal.timeout(Chm)).then((x)=>x?Fwe(R,x,"auto"):void 0).catch(()=>{});if(a==="command")Gi(()=>k)}return{ok:!0,short:v.short,handedOff:y,hadWorktree:_!==null}}
function deriveBackgroundSeed(e,t){let n=t,r=!1,o;for(let a=e.length-1;a>=0;a--){let l=e[a];if(l.type==="assistant"&&o===void 0){let c=rW(l);if(c)o=c.replace(/\s+/g," ").trim().slice(0,120)}if(l.type==="user"&&!l.isMeta&&!Jft(l)){let c=qL(l)?.trim();if(c&&zce(c)){if(c.startsWith(`<${bR}>`))r=!0;continue}if(r=!0,!n&&c)n=c}if(r&&n&&o!==void 0)break}if(!r&&!t)return null;let s=getCurrentSessionTitle(getSessionId()),i=getCurrentSessionAiTitle(getSessionId());return{intent:(n||"(backgrounded)").slice(0,200),name:s??i,nameSource:s?"user":i?"auto":void 0,detail:o}}
function vhm(e){let t=iLl.c(27),{onDone:n,prompt:r,seed:o,messages:s,isMidTurn:i}=e,a=mt(Ihm),l=mt(Hhm),c=mt(khm),u=mt(xhm),d=mt(Rhm),p=mt(whm),m;if(t[0]!==p)m=o8n(p),t[0]=p,t[1]=m;else m=t[1];let f=m,[A,h]=Yft.useState(f.count===0),g=Yft.useRef(!1),_,y;if(t[2]!==c||t[3]!==u||t[4]!==d||t[5]!==A||t[6]!==a||t[7]!==f.count||t[8]!==i||t[9]!==s||t[10]!==n||t[11]!==l||t[12]!==r||t[13]!==o)_=()=>{if(!A||g.current)return;g.current=!0,(async()=>{let H=await spawnBackgroundFork(o,r,a,l,c,u,d,"command",s,{replyOnResume:i});if(H.ok)logEvent("tengu_background_fork",{confirmed:f.count>0,inflight_count:f.count,mid_turn:i,had_prompt:r.length>0,had_worktree:H.hadWorktree,worktree_handed_off:H.handedOff}),n(),await gracefulShutdown(0,"prompt_input_exit",{suppressResumeHint:!0,finalMessage:formatBgHints(H.short,H.handedOff?"(worktree handed off)":void 0)});else n(H.error)})()},y=[A,a,l,c,u,d,f.count,i,o,n,r,s],t[2]=c,t[3]=u,t[4]=d,t[5]=A,t[6]=a,t[7]=f.count,t[8]=i,t[9]=s,t[10]=n,t[11]=l,t[12]=r,t[13]=o,t[14]=_,t[15]=y;else _=t[14],y=t[15];if(Yft.useEffect(_,y),A){let H;if(t[16]===Symbol.for("react.memo_cache_sentinel"))H=Nye.createElement(Text,{dimColor:!0},"Backgrounding\u2026"),t[16]=H;else H=t[16];return H}let T;if(t[17]!==f.count||t[18]!==n)T=()=>{logEvent("tengu_background_declined",{inflight_count:f.count}),n()},t[17]=f.count,t[18]=n,t[19]=T;else T=t[19];let S=T,v=`${f.summary} running \u2014 the forked session won't carry live processes.`,R;if(t[20]===Symbol.for("react.memo_cache_sentinel"))R=()=>h(!0),t[20]=R;else R=t[20];let k;if(t[21]!==S)k=Nye.createElement(ac,{confirmLabel:"Background anyway (tasks will be abandoned)",cancelLabel:"Stay",onConfirm:R,onCancel:S}),t[21]=S,t[22]=k;else k=t[22];let x;if(t[23]!==S||t[24]!==v||t[25]!==k)x=Nye.createElement(Kn,{title:"Background this session?",subtitle:v,onCancel:S},k),t[23]=S,t[24]=v,t[25]=k,t[26]=x;else x=t[26];return x}
function whm(e){return e.tasks}
function Rhm(e){return e.toolPermissionContext.alwaysDenyRules}
function xhm(e){return e.toolPermissionContext.alwaysAllowRules}
function khm(e){return e.toolPermissionContext.additionalWorkingDirectories}
function Hhm(e){return e.toolPermissionContext.mode}
function Ihm(e){return e.effortValue}
var iLl,aKn,lKn,Nye,Yft,Ehm=async(e,t,n)=>{if(_i())return logEvent("tengu_background_already_bg",{}),e(),K_e(),null;if(isTranscriptPersistenceDisabled())return e("Cannot background \u2014 session persistence is disabled, so the forked job would have nothing to resume."),null;let r=(n??"").trim(),o=deriveBackgroundSeed(t.messages,r);if(o===null)return e("Nothing to background yet \u2014 send a message first."),null;return Nye.createElement(vhm,{onDone:e,prompt:r,seed:o,messages:t.messages,isMidTurn:t.isMidTurn??!1})},Chm=3000;
var Cko=b(()=>{lt();T5t();e_();Li();initKp();Qqt();ze();UUe();mg();ln();Ct();configProtoStore();ReactHooks();hp();Om();bt();Lpt();ym();Rn();lo();ja();hI();jWn();iLl=M(rt(),1),aKn=require("fs/promises"),lKn=require("path"),Nye=M(Te(),1),Yft=M(Te(),1)});
export {aLl,spawnBackgroundFork,deriveBackgroundSeed,vhm,whm,Rhm,xhm,khm,Hhm,Ihm,iLl,aKn,lKn,Nye,Yft,Ehm,Chm,Cko};
