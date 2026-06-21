// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {waitForPolicyLimitsToLoad,zF} from "../src/telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {isPolicyAllowed,rd} from "./m2205.ts";
import {TA,memoizeThunk,ln} from "../src/telemetry/0594_feature_name.ts";
import {Lx,X9,qU} from "./m5131.ts";
import {initializeGrowthBook,zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Jl,ch} from "./m2727.ts";
import {LGn,Qjt} from "../src/session/4833_flags.ts";
import {Qmt,kGn} from "./m4821.ts";
import {wte,nIe} from "../src/config/3923_maxFiles.ts";
import {Se,bt} from "./m195.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {pollRemoteSessionEvents,RP} from "../src/tui/3870_validateSessionRepository.ts";
import {aFn,OY} from "../src/tools/3871_allowBundle.ts";
import {isTransientNetworkError,Dw} from "../src/api/2190_updateSessionTitle.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {d7e,initKp} from "./m609.ts";
import {_t,cu} from "./m582.ts";
import {Cn,dr} from "./m231.ts";
var Ucc={};
isFullscreenWithTTY(Ucc,{ultrareviewHandler:()=>ultrareviewHandler});
async function ultrareviewHandler(e,t){let n=()=>process.exit(130);if(process.once("SIGINT",n),await waitForPolicyLimitsToLoad(),!isPolicyAllowed("allow_remote_sessions"))return await TA("cli_ultrareview","cli_ultrareview_policy_disallowed"),Lx("Cloud sessions are disabled by your organization's policy.");await initializeGrowthBook().catch(()=>{});let r=Number(t.timeout),o=Number.isFinite(r)&&r>0?r:wqm,s=Jl(),i=await LGn(e,{confirm:!0,skipTaskRegistration:!0,invocation:"claude ultrareview",context:{abortController:s,taskRegistry:Qmt}});if(i.status!=="launched"){let c=i.status==="blocked"&&i.actionUrl?`
  \u2192 ${i.actionUrl}`:"";return await TA("cli_ultrareview","cli_ultrareview_launch_failed"),Lx(`Ultrareview could not launch: ${"message"in i?i.message:i.body}${c}`)}OVt(i.message),OVt(`View live progress in the browser: ${i.sessionUrl}`),OVt(`Waiting for findings (${wte()})\u2026`),process.removeListener("SIGINT",n),process.once("SIGINT",()=>{OVt(`
Cancelled. The remote review is still running \u2014 view it at ${i.sessionUrl}`),process.exit(130)});let a;try{a=await Iqm(i.sessionId,s.signal,o*60*1000)}catch(c){return await TA("cli_ultrareview","cli_ultrareview_poll_failed"),Lx(`Ultrareview failed: ${Se(c)}
Session: ${i.sessionUrl}`)}let l=Hqm(a);if(t.json){if(process.stdout.write(a+`
`),l)await TA("cli_ultrareview","cli_ultrareview_remote_error");else await memoizeThunk("cli_ultrareview");return X9(l?1:0)}if(l)return await TA("cli_ultrareview","cli_ultrareview_remote_error"),Lx(`Review failed: ${l}
Session: ${i.sessionUrl}`);return process.stdout.write(Pqm(a)+`
`),await memoizeThunk("cli_ultrareview"),X9(0)}
function Hqm(e){try{let t=qt(e);if(t&&typeof t==="object"&&!Array.isArray(t)){let n=t.error;if(typeof n==="string")return n}}catch{}return null}
async function Iqm(e,t,n){let r=Date.now()+n,o=null,s=0,i=[],a="";while(Date.now()<r){if(t.aborted)throw Error("aborted");try{let l=await pollRemoteSessionEvents(e,o);if(o=l.lastEventId,s=0,l.sessionStatus==="archived"){if(l.newEvents.length>0)i.push(...l.newEvents);return aFn(i)??'{"error":"cloud session was archived before producing output"}'}if(l.newEvents.length>0){i.push(...l.newEvents);for(let u of l.newEvents)if(u.type==="system"&&(u.subtype==="hook_progress"||u.subtype==="hook_response")){let d=Dqm(u.stdout);if(d&&d!==a)a=d,OVt(`  ${d}`)}let c=aFn(i);if(c)return c}}catch(l){if(t.aborted||!isTransientNetworkError(l))throw l;if(++s>=Rqm)throw Error("lost connection to the cloud session after repeated retries")}await sleep(vqm,t)}throw Error(`cloud session exceeded ${Math.round(n/60000)} minutes`)}
function Dqm(e){let t=`<${d7e}>`,n=`</${d7e}>`,r=e.lastIndexOf(n),o=r===-1?-1:e.lastIndexOf(t,r);if(o===-1||r<=o)return null;try{let s=qt(e.slice(o+t.length,r)),i=s.stage??"running",a=s.bugs_found??0,l=s.bugs_verified??0,c=s.bugs_refuted??0;return`${i} \u2014 ${a} found, ${l} verified, ${c} refuted`}catch{return null}}
function Pqm(e){let t;try{t=qt(e)}catch{return e}if(!Array.isArray(t)||t.length===0)return"Review complete \u2014 no findings.";let n=t,r=n.length,o=[_t.bold(`Review complete \u2014 ${r} ${Cn(r,"finding")}`),""];for(let s of n){let i=xqm[s.severity??"normal"]??"\uD83D\uDD34",a=s.file_path??"?",l=s.start_line??0,c=s.end_line??l,u=l===c?`${a}:${l}`:`${a}:${l}-${c}`,d=(s.pr_comment??"").trim(),p=d.indexOf(`

`),m=p===-1?d:d.slice(0,p),f=p===-1?"":d.slice(p+2);if(o.push(`${i} ${_t.bold(u)}`),m)o.push(m);if(f)o.push(""),o.push(f);o.push("")}return o.join(`
`).trimEnd()}
function OVt(e){process.stderr.write(_t.dim(e)+`
`)}
var vqm=3000,wqm=30,Rqm=5,xqm;
var $cc=b(()=>{cu();Qjt();nIe();initKp();ln();zn();zF();rd();OY();ch();bt();Xt();dr();kGn();Dw();RP();qU();xqm={normal:"\uD83D\uDD34",nit:"\uD83D\uDFE1",pre_existing:"\uD83D\uDFE3"}});
export {Ucc,ultrareviewHandler,Hqm,Iqm,Dqm,Pqm,OVt,vqm,wqm,Rqm,xqm,$cc};
