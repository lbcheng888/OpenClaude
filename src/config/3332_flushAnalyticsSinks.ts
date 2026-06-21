// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {I1,_Fe} from "../session/2197_shutdown1PEventLogging.ts";
import {iZ,hNt} from "../permissions/5195_trackDatadogEvent.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {mie,BK} from "../../vendor/m2339.ts";
import {qu,bk} from "../../vendor/m2291.ts";
import {mF,XS} from "./2341_XS.ts";
import {PSn,g$r} from "../../vendor/m2413.ts";
import {je} from "../../vendor/m577.ts";
import {C_i,lg} from "../../vendor/m2269.ts";
import {getIsInteractive,isSessionPersistenceDisabled,getSessionId,getIsScrollDraining,getLastMainRequestId,lt} from "../session/0131_sent.ts";
import {sessionIdExists,getCurrentSessionTitle,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {Se,bt,h_} from "../../vendor/m195.ts";
import {kn,SA} from "./0689_timestamp.ts";
import {yca,_ca,fNt} from "../../vendor/m3330.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Ms,Pp} from "./2273_loggedTmuxCcDisable.ts";
import {yp,Dca} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {JWe,ReactHooks} from "../../vendor/m133.ts";
import {Ica,l0n} from "../agent/5148_bigint.ts";
import {profileReport,x3} from "../session/0241_profileReport.ts";
import {Qe} from "../../vendor/m5.ts";
import {Br,WS} from "../../vendor/m1456.ts";
import {Dp} from "../../vendor/m2215.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {M7e,isBundledSkillsDisabled} from "../../vendor/m667.ts";
import {qV,setBgExitCause} from "../../vendor/m229.ts";
import {oXr} from "../../vendor/m3329.ts";
import {hp,_i} from "../session/1460_promise.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn,Ler} from "./0047_namespace.ts";
import {Cv,D1} from "../telemetry/2217_names.ts";
import {fO,registerProcessIOErrorHandlers} from "../../vendor/m230.ts";
import {tv,Kc} from "../../vendor/m232.ts";
import {pNt} from "../../vendor/m3327.ts";
function getCurrentWorktreeSession(){return ANt}
function _st(e){if(ANt=e,e&&!e.enteredExisting)iXr=e.worktreeName}
function Tca(){if(ANt)return ANt.enteredExisting?null:ANt.worktreeName;return iXr}
function Nke(){iXr=null}
var ANt=null,iXr=null;
var Sca={};
isFullscreenWithTTY(Sca,{flushAnalyticsSinks:()=>flushAnalyticsSinks});
async function flushAnalyticsSinks(){try{let[{shutdown1PEventLogging:e},{shutdownDatadog:t}]=await Promise.all([Promise.resolve().then(() => (I1(),_Fe)),Promise.resolve().then(() => (iZ(),hNt))]),n=[e(),t()];await Promise.race([Promise.all(n),sleep(500)])}catch{}}
var aDn=()=>{};
var yNt={};
isFullscreenWithTTY(yNt,{setupGracefulShutdown:()=>setupGracefulShutdown,resetShutdownState:()=>resetShutdownState,releaseShutdownClaim:()=>releaseShutdownClaim,recordUncaughtAndCheckBreaker:()=>recordUncaughtAndCheckBreaker,markStartupActionStarted:()=>markStartupActionStarted,isShuttingDown:()=>Bk,gracefulShutdownSync:()=>gracefulShutdownSync,gracefulShutdown:()=>gracefulShutdown,getPendingShutdownForTesting:()=>getPendingShutdownForTesting,flushAnalyticsSinks:()=>P9e,exitIfStartupNeverMounted:()=>exitIfStartupNeverMounted,emitScrollTelemetrySummary:()=>emitScrollTelemetrySummary,disarmOrphanCheck:()=>disarmOrphanCheck,cleanupTerminalModes:()=>cleanupTerminalModes,claimShutdown:()=>claimShutdown,STARTUP_MOUNT_GRACE_MS:()=>STARTUP_MOUNT_GRACE_MS});
function cleanupTerminalModes(){if(!process.stdout.isTTY)return;try{nge.writeSync(1,mie);let e=qu.get(process.stdout);if(e?.isAltScreenActive)try{e.unmount()}catch{nge.writeSync(1,mF())}if(e?.drainStdin(),e?.detachForShutdown(),PSn(),!je.CLAUDE_CODE_DISABLE_TERMINAL_TITLE)nge.writeSync(1,C_i)}catch{}}
function aXr(){if(lDn)return;if(process.stdout.isTTY&&getIsInteractive()&&!isSessionPersistenceDisabled())try{let e=getSessionId();if(!sessionIdExists(e))return;let t=getCurrentSessionTitle(e),n;if(t)n=`"${t.replaceAll("\\","\\\\").replaceAll('"',"\\\"")}"`;else n=e;let r=Tca(),o=r?`--worktree ${r} `:"";nge.writeSync(1,_t.dim(`
Resume this session with:
claude ${o}--resume ${n}
`)),lDn=!0}catch{}}
function lXr(e){if(Bke!==void 0)clearTimeout(Bke),Bke=void 0;try{qu.get(process.stdout)?.drainStdin()}catch{}try{process.exit(e)}catch(t){process.kill(process.pid,"SIGKILL")}throw Error("unreachable")}
function gracefulShutdownSync(e=0,t="other",n){process.exitCode=e,AXr=gracefulShutdown(e,t,n).catch((r)=>{logForDebugging(`Graceful shutdown failed: ${r}`,{level:"error"}),cleanupTerminalModes(),aXr(),lXr(e)}).catch(()=>{})}
function recordUncaughtAndCheckBreaker(e){if(k9e)return!1;if(e-uXr>cXr)yst=0,uXr=e,gNt=[];if(yst++,yst>=aGd)return k9e=!0,!0;return!1}
function markStartupActionStarted(e){pXr=!0,mXr=e}
function Rca(){return pXr&&!mXr}
function exitIfStartupNeverMounted(e){if(qu.everMounted||Rca()||Bk())return;try{nge.writeSync(2,`Claude Code could not start: ${Se(e)}
`)}catch{}gracefulShutdown(1)}
function Eca(e){if(!getIsInteractive()||qu.everMounted||Rca()||Bk())return;setTimeout(exitIfStartupNeverMounted,STARTUP_MOUNT_GRACE_MS,e).unref()}
function cGd(e){try{return e instanceof Error&&e.name==="McpError"&&e.code===-32000}catch{return!1}}
function Bk(){return D9e}
function kca(){if(H9e!==void 0||!process.stdin.isTTY)return;H9e=setInterval(()=>{if(getIsScrollDraining())return;if(!process.stdout.writable||!process.stdin.readable)clearInterval(H9e),kn("info","shutdown_signal",{signal:"orphan_detected"}),gracefulShutdown(129)},30000),H9e.unref()}
function disarmOrphanCheck(){if(H9e!==void 0)clearInterval(H9e),H9e=void 0}
function claimShutdown(){D9e=!0,disarmOrphanCheck()}
function releaseShutdownClaim(){D9e=!1,kca()}
function emitScrollTelemetrySummary(){try{if(getIsInteractive()&&yca())logEvent("tengu_scroll_summary",{..._ca(),fullscreen:Ms()})}catch{}}
async function P9e(){try{let{flushAnalyticsSinks:e}=await Promise.resolve().then(() => (aDn(),Sca));await e()}catch{}}
function resetShutdownState(){if(D9e=!1,lDn=!1,yst=0,uXr=0,k9e=!1,gNt=[],pXr=!1,mXr=!1,Bke!==void 0)clearTimeout(Bke),Bke=void 0;disarmOrphanCheck(),AXr=void 0}
function getPendingShutdownForTesting(){return AXr}
async function gracefulShutdown(e=0,t="other",n){if(D9e)return;if(D9e=!0,n?.suppressResumeHint)lDn=!0;let{executeSessionEndHooks:r,getSessionEndHookTimeoutMs:o}=await Promise.resolve().then(() => (yp(),Dca)),s=o();Bke=setTimeout((l)=>{cleanupTerminalModes(),aXr(),lXr(l)},Math.max(5000,s+3500),e),Bke.unref(),process.exitCode=e,cleanupTerminalModes(),aXr();let i;try{let l=(async()=>{try{await JWe()}catch{}})();await Promise.race([l,new Promise((c,u)=>{i=setTimeout((d)=>d(new Hca),2000,u)})]),clearTimeout(i)}catch{clearTimeout(i)}try{await Ica()}catch{}try{await r(t,{...n,signal:AbortSignal.timeout(s)})}catch{}try{profileReport()}catch{}emitScrollTelemetrySummary();let a=getLastMainRequestId();if(a)logEvent("tengu_cache_eviction_hint",{scope:Qe("session_end"),last_request_id:Br(a)});if(await P9e(),n?.finalMessage)try{nge.writeSync(2,n.finalMessage+`
`)}catch{}lXr(e)}
function Cca(e){if(!e.error_message)return{};return{error_message_hash:Dp(e.error_message)}}
var nge,lDn=!1,setupGracefulShutdown,aGd=10,cXr=5000,yst=0,uXr=0,k9e=!1,lGd=3,gNt,STARTUP_MOUNT_GRACE_MS=1e4,pXr=!1,mXr=!1,D9e=!1,Bke,H9e,AXr,Hca;
var ym=b(()=>{cu();ta();M7e();lt();qV();bk();g$r();XS();BK();lg();Ct();WS();oXr();ReactHooks();hp();qe();SA();Lr();sn();bt();Cv();Pp();fO();tv();l0n();fNt();ja();x3();nge=require("fs");setupGracefulShutdown=wn(()=>{isBundledSkillsDisabled(()=>{});let e=process.ppid;if(process.on("SIGINT",()=>{if(process.argv.includes("-p")||process.argv.includes("--print"))return;kn("info","shutdown_signal",{signal:"SIGINT"}),gracefulShutdown(0)}),process.on("SIGTERM",()=>{let n={uptime_s:Math.round(process.uptime()),ppid_changed:process.ppid!==e,stdin_at_eof:process.stdin.readableEnded,stdin_destroyed:process.stdin.destroyed,is_tty:process.stdin.isTTY??!1};kn("info","shutdown_signal",{signal:"SIGTERM",...n}),logEvent("tengu_shutdown_signal",{signal:Qe("SIGTERM"),...n}),gracefulShutdown(143)}),process.env.CLAUDE_BG_BACKEND==="daemon")process.on("SIGHUP",()=>{kn("info","shutdown_signal",{signal:"SIGHUP_ignored_bg"})});else process.on("SIGHUP",()=>{kn("info","shutdown_signal",{signal:"SIGHUP"}),gracefulShutdown(129)}),kca();registerProcessIOErrorHandlers((n,r)=>{if(!getIsInteractive())return;kn("info","shutdown_signal",{signal:`${n}_${r}`}),gracefulShutdown(0)});let t=(n)=>{let r;try{r=n instanceof Error}catch{r=!1}if(!r){if(typeof n==="string")return{error_name:"string",error_message:Kc(n).slice(0,2000),isHostError:!1};let l=[];try{let d=n?.name;if(typeof d==="string")l.push(d)}catch{}try{let d=n?.message;if(typeof d==="string")l.push(d)}catch{}let c=l.length>0?Kc(l.join(": ")).slice(0,2000):void 0,u;try{let d=n?.stack;if(typeof d==="string")u=Kc(d).slice(0,4000)}catch{}return{error_name:"non-error",error_message:c,error_stack:u,isHostError:!1}}let o=n,s,i,a;try{s=o.name}catch{}try{i=o.message}catch{}try{a=o.stack}catch{}return{error_name:typeof s==="string"?s:"Error",error_message:typeof i==="string"?Kc(i).slice(0,2000):void 0,error_stack:typeof a==="string"?Kc(a).slice(0,4000):void 0,isHostError:!0}};process.on("uncaughtException",(n)=>{if(k9e)return;let r=t(n);kn("error","uncaught_exception",r);let o=r.isHostError?D1(n):Cca(r);if(logEvent("tengu_uncaught_exception",{error_name:r.error_name,...o}),Ler()){if(k9e=!0,logForDebugging(`Uncaught exception under CLAUDE_CODE_SUPERVISED \u2014 exiting ${pNt}: ${r.error_name}`,{level:"error"}),_i()&&!Bk())setBgExitCause("uncaught:"+r.error_name);gracefulShutdown(pNt);return}let s=recordUncaughtAndCheckBreaker(Date.now());if(gNt.length<lGd||s)gNt.push({name:r.error_name,message:(r.error_message??"").slice(0,200),topFrame:o.error_top_frame});if(s){logEvent("tengu_uncaught_exception_loop",{count:yst,window_ms:cXr,error_name:r.error_name,error_message_hash:o.error_message_hash}),cleanupTerminalModes();try{for(let i of gNt)nge.writeSync(2,`Uncaught exception (loop): ${i.name}: ${i.message}${i.topFrame?` at ${i.topFrame}`:""}
`);nge.writeSync(2,`Uncaught exception loop detected (${yst} in ${cXr}ms) \u2014 forcing shutdown
`)}catch{}gracefulShutdown(1);return}if(_i()&&!Bk()){setBgExitCause("uncaught:"+r.error_name),gracefulShutdown(1);return}Eca(r.error_message??r.error_name)}),process.on("unhandledRejection",(n)=>{if(k9e)return;if(D9e&&cGd(n)){logForDebugging(`Swallowed MCP ConnectionClosed during shutdown: ${Se(n)}`);return}let r=t(n);if(kn("error","unhandled_rejection",r),logEvent("tengu_unhandled_rejection",{error_name:r.error_name,...r.isHostError?D1(n):Cca(r)}),h_(n)){logForDebugging("Swallowed unhandled AbortError rejection (not exiting bg/supervised worker)");return}if(Ler()){if(k9e=!0,logForDebugging(`Unhandled rejection under CLAUDE_CODE_SUPERVISED \u2014 exiting ${pNt}: ${r.error_name}`,{level:"error"}),_i()&&!Bk())setBgExitCause("unhandled:"+r.error_name);gracefulShutdown(pNt);return}if(_i()&&!Bk()){setBgExitCause("unhandled:"+r.error_name),gracefulShutdown(1);return}Eca(r.error_message??r.error_name)})});gNt=[];Hca=class Hca extends Error{constructor(){super("Cleanup timeout")}}});
export {getCurrentWorktreeSession,_st,Tca,Nke,ANt,iXr,Sca,flushAnalyticsSinks,aDn,yNt,cleanupTerminalModes,aXr,lXr,gracefulShutdownSync,recordUncaughtAndCheckBreaker,markStartupActionStarted,Rca,exitIfStartupNeverMounted,Eca,cGd,Bk,kca,disarmOrphanCheck,claimShutdown,releaseShutdownClaim,emitScrollTelemetrySummary,P9e,resetShutdownState,getPendingShutdownForTesting,gracefulShutdown,Cca,nge,lDn,setupGracefulShutdown,aGd,cXr,yst,uXr,k9e,lGd,gNt,STARTUP_MOUNT_GRACE_MS,pXr,mXr,D9e,Bke,H9e,AXr,Hca,ym};
