// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {waitForPolicyLimitsToLoad,_B} from "../src/telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {isPolicyAllowed,Bu} from "./m2213.ts";
import {Qu,REPL_CONTEXT_NAME,mn} from "../src/telemetry/0600_feature_name.ts";
import {Qh,gN,_N} from "./m5161.ts";
import {initializeGrowthBook,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {kl,lh} from "./m2739.ts";
import {Ajn,bGt} from "../src/session/4865_flags.ts";
import {dgt,yjn} from "./m4853.ts";
import {Rte,uxe} from "../src/config/3990_maxFiles.ts";
import {Le,Ve} from "./m5.ts";
import {Ce,Ct} from "./m197.ts";
import {$co,a$n,mY} from "../src/tools/3889_allowBundle.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {pollRemoteSessionEvents,qD} from "../src/permissions/3888_validateSessionRepository.ts";
import {isTransientNetworkError,NR} from "../src/api/2195_updateSessionTitle.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {lje,Ud} from "./m615.ts";
import {bt,Gc} from "./m588.ts";
import {Sn,lr} from "./m233.ts";
var jTc={};
ft(jTc,{ultrareviewHandler:()=>ultrareviewHandler});
async function ultrareviewHandler(e,t){let n=()=>process.exit(130);if(process.once("SIGINT",n),await waitForPolicyLimitsToLoad(),!isPolicyAllowed("allow_remote_sessions"))return await Qu("cli_ultrareview","cli_ultrareview_policy_disallowed"),Qh("Cloud sessions are disabled by your organization's policy.");await initializeGrowthBook().catch(()=>{});let r=Number(t.timeout),o=Number.isFinite(r)&&r>0?r:PJm,s=kl(),i=await Ajn(e,{confirm:!0,skipTaskRegistration:!0,invocation:"claude ultrareview",context:{abortController:s,taskRegistry:dgt}});if(i.status!=="launched"){let p=i.status==="blocked"&&i.actionUrl?`
  \u2192 ${i.actionUrl}`:"";return await Qu("cli_ultrareview","cli_ultrareview_launch_failed"),Qh(`Ultrareview could not launch: ${"message"in i?i.message:i.body}${p}`)}mjt(i.message),mjt(`View live progress in the browser: ${i.sessionUrl}`),mjt(`Waiting for findings (${Rte()})\u2026`),process.removeListener("SIGINT",n),process.once("SIGINT",()=>{mjt(`
Cancelled. The remote review is still running \u2014 view it at ${i.sessionUrl}`),process.exit(130)});let a;try{a=await FJm(i.sessionId,s.signal,o*60*1000)}catch(p){return await Qu("cli_ultrareview","cli_ultrareview_poll_failed",{reason:p instanceof fjt?Le(p.reason):Ve("poll_unknown")}),Qh(`Ultrareview failed: ${Ce(p)}
Session: ${i.sessionUrl}`)}let l=NJm(a),c=l===zTc?Ve("session_archived"):Ve("orchestrator_error"),u=$co(a),d=u!==void 0?{findings_count:u}:void 0;if(t.json){if(process.stdout.write(a+`
`),l)await Qu("cli_ultrareview","cli_ultrareview_remote_error",{reason:c});else await REPL_CONTEXT_NAME("cli_ultrareview",d);return gN(l?1:0)}if(l)return await Qu("cli_ultrareview","cli_ultrareview_remote_error",{reason:c}),Qh(`Review failed: ${l}
Session: ${i.sessionUrl}`);return process.stdout.write(UJm(a)+`
`),await REPL_CONTEXT_NAME("cli_ultrareview",d),gN(0)}
function NJm(e){try{let t=qt(e);if(t&&typeof t==="object"&&!Array.isArray(t)){let n=t.error;if(typeof n==="string")return n}}catch{}return null}
async function FJm(e,t,n){let r=Date.now()+n,o=null,s=0,i=[],a="";while(Date.now()<r){if(t.aborted)throw Error("aborted");try{let l=await pollRemoteSessionEvents(e,o);if(o=l.lastEventId,s=0,l.sessionStatus==="archived"){if(l.newEvents.length>0)i.push(...l.newEvents);return a$n(i)??`{"error":"${zTc}"}`}if(l.newEvents.length>0){i.push(...l.newEvents);for(let u of l.newEvents)if(u.type==="system"&&(u.subtype==="hook_progress"||u.subtype==="hook_response")){let d=BJm(u.stdout);if(d&&d!==a)a=d,mjt(`  ${d}`)}let c=a$n(i);if(c)return c}}catch(l){if(t.aborted)throw l;if(!isTransientNetworkError(l))throw new fjt("poll_api_error",Ce(l));if(++s>=OJm)throw new fjt("poll_connection_lost","lost connection to the cloud session after repeated retries")}await sleep(DJm,t)}throw new fjt("poll_timeout",`cloud session exceeded ${Math.round(n/60000)} minutes`)}
function BJm(e){let t=`<${lje}>`,n=`</${lje}>`,r=e.lastIndexOf(n),o=r===-1?-1:e.lastIndexOf(t,r);if(o===-1||r<=o)return null;try{let s=qt(e.slice(o+t.length,r)),i=s.stage??"running",a=s.bugs_found??0,l=s.bugs_verified??0,c=s.bugs_refuted??0;return`${i} \u2014 ${a} found, ${l} verified, ${c} refuted`}catch{return null}}
function UJm(e){let t;try{t=qt(e)}catch{return e}if(!Array.isArray(t)||t.length===0)return"Review complete \u2014 no findings.";let n=t,r=n.length,o=[bt.bold(`Review complete \u2014 ${r} ${Sn(r,"finding")}`),""];for(let s of n){let i=LJm[s.severity??"normal"]??"\uD83D\uDD34",a=s.file_path??"?",l=s.start_line??0,c=s.end_line??l,u=l===c?`${a}:${l}`:`${a}:${l}-${c}`,d=(s.pr_comment??"").trim(),p=d.indexOf(`

`),m=p===-1?d:d.slice(0,p),f=p===-1?"":d.slice(p+2);if(o.push(`${i} ${bt.bold(u)}`),m)o.push(m);if(f)o.push(""),o.push(f);o.push("")}return o.join(`
`).trimEnd()}
function mjt(e){process.stderr.write(bt.dim(e)+`
`)}
var DJm=3000,PJm=30,OJm=5,zTc="cloud session was archived before producing output",fjt,LJm;
var YTc=b(()=>{Gc();bGt();uxe();Ud();mn();jn();_B();Bu();mY();lh();Ct();tn();lr();yjn();NR();qD();_N();fjt=class fjt extends Error{reason;constructor(e,t){super(t);this.reason=e;this.name="PollFailure"}};LJm={normal:"\uD83D\uDD34",nit:"\uD83D\uDFE1",pre_existing:"\uD83D\uDFE3"}});
export {jTc,ultrareviewHandler,NJm,FJm,BJm,UJm,mjt,DJm,PJm,OJm,zTc,fjt,LJm,YTc};
