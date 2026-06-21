// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {isDaemonWorkerRegistryEnabled,bv} from "../src/config/2204_shouldShowLaunchComposer.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {Se,bt} from "./m195.ts";
import {uDl,rxo} from "../src/git-shell/5082_type.ts";
import {rDn} from "./m3327.ts";
import {zt,qs} from "./m635.ts";
import {Xr} from "./m321.ts";
import {k7n,yxo,NDl} from "./m5093.ts";
import {q8t,exo,iDl} from "../src/permissions/5081_workerPid.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var qDl={};
isFullscreenWithTTY(qDl,{startParentWatchdog:()=>startParentWatchdog,runDaemonWorker:()=>runDaemonWorker,registerShutdownHandlers:()=>registerShutdownHandlers,isShutdownSentinel:()=>isShutdownSentinel,httpStatusOf:()=>httpStatusOf,heartbeatWorkerSchema:()=>heartbeatWorkerSchema,WORKER_KINDS:()=>WORKER_KINDS});
async function Bmm(e,t,n,r){let{intervalSeconds:o}=heartbeatWorkerSchema().parse(e);n(`heartbeat worker started (interval=${o}s)`);while(!t.aborted)if(await sleep(o*1000,t),!t.aborted)n("heartbeat")}
function isShutdownSentinel(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="shutdown"}
function registerShutdownHandlers(e,t){let n=()=>t.abort();e.on("SIGTERM",n),e.on("SIGINT",n),e.on("message",(r)=>{if(isShutdownSentinel(r))t.abort()})}
async function runDaemonWorker(e){if(!e||!(e in WORKER_KINDS))process.stderr.write(`unknown worker kind: ${e}
`),process.exit(2);if(e!=="heartbeat"&&!isDaemonWorkerRegistryEnabled())process.stderr.write(`worker kind '${e}' is not available.
`),process.exit(2);let t=WORKER_KINDS[e],n=[];for await(let a of process.stdin)n.push(a);let r;try{r=qt(Buffer.concat(n).toString("utf8"))}catch(a){process.stderr.write(`invalid config JSON on stdin: ${Se(a)}
`),process.exit(2)}let o=t.schema().safeParse(r.config);if(!o.success)process.stderr.write(`config validation failed: ${o.error.message}
`),process.exit(2);let s=new AbortController;registerShutdownHandlers(process,s),startParentWatchdog(s);let i=uDl(r.initialAccessToken);try{await t.run(o.data,s.signal,(a)=>process.stdout.write(a+`
`),i)}catch(a){if(httpStatusOf(a)===429)process.stdout.write(`rate limited (429): ${Se(a)}
`),process.exit(rDn);throw a}}
function httpStatusOf(e){let t=e;for(let n=0;t!=null&&n<8;n++){let r=t.status;if(typeof r==="number")return r;let o=t.response?.status;if(typeof o==="number")return o;t=t.cause}return}
function $mm(e){try{return process.kill(e,0),!0}catch{return!1}}
function startParentWatchdog(e,t){let n={ppid:()=>process.ppid,isAlive:$mm,log:(i)=>process.stdout.write(i+`
`),onGone:()=>process.exit(0),intervalMs:Umm,exitGraceMs:2000,...t},r=n.ppid();if(r<=1)return;let o=!1,s=setInterval(()=>{if(o)return;if(!(!n.isAlive(r)||zt()!=="windows"&&n.ppid()!==r))return;o=!0,clearInterval(s),n.log("parent supervisor gone \u2014 exiting"),e.abort(),setTimeout(n.onGone,n.exitGraceMs).unref()},n.intervalMs);return s.unref(),s}
var heartbeatWorkerSchema,WORKER_KINDS,Umm=30000;
var Y8t=b(()=>{Xr();bv();bt();qs();Xt();rxo();k7n();q8t();heartbeatWorkerSchema=we(()=>E.object({intervalSeconds:E.number().positive().default(30)}).strict()),WORKER_KINDS={heartbeat:{schema:heartbeatWorkerSchema,run:Bmm,needsOAuth:!1},scheduled:{schema:exo,run:iDl,needsOAuth:!0},remoteControl:{schema:yxo,run:NDl,needsOAuth:!0}}});
export {qDl,Bmm,isShutdownSentinel,registerShutdownHandlers,runDaemonWorker,httpStatusOf,$mm,startParentWatchdog,heartbeatWorkerSchema,WORKER_KINDS,Umm,Y8t};
