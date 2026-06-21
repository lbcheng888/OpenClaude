// @ts-nocheck
import {getProjectRoot,getSessionId,lt} from "../src/session/0131_sent.ts";
import {Fa,Pd} from "./m701.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {dn,bt} from "./m195.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {jnc,Wnc} from "./m5618.ts";
import {ownProcStart,isProcessRunning,isSameProcessAsync,rE} from "./m1456.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function pVt(e){return mVt.join(e??getProjectRoot(),t9m)}
async function Vnc(e){let t;try{t=await tre.readFile(pVt(e),"utf8")}catch{return}let n=n9m().safeParse(Fa(t,!1));return n.success?n.data:void 0}
async function Gnc(e,t){let n=pVt(t),r=Le(e);try{return await tre.writeFile(n,r,{flag:"wx"}),!0}catch(o){let s=dn(o);if(s==="EEXIST")return!1;if(s==="ENOENT"){await tre.mkdir(mVt.dirname(n),{recursive:!0});try{return await tre.writeFile(n,r,{flag:"wx"}),!0}catch(i){if(dn(i)==="EEXIST")return!1;throw i}}throw o}}
function a1o(e){YQn?.(),YQn=Gi(async()=>{await fVt(e)})}
async function l1o(e){let t=e?.dir;await jnc(t??getProjectRoot());let n=e?.lockIdentity??getSessionId(),r={sessionId:n,pid:process.pid,procStart:ownProcStart(),acquiredAt:Date.now()};if(await Gnc(r,t))return dVt=void 0,a1o(e),logForDebugging(`[ScheduledTasks] acquired scheduler lock (PID ${process.pid})`),!0;let o=await Vnc(t);if(o?.sessionId===n){if(o.pid!==process.pid)await tre.writeFile(pVt(t),Le(r)),a1o(e);return!0}if(o&&isProcessRunning(o.pid)&&await isSameProcessAsync(o.pid,o.procStart)){if(dVt!==o.sessionId)dVt=o.sessionId,logForDebugging(`[ScheduledTasks] scheduler lock held by session ${o.sessionId} (PID ${o.pid})`);return!1}if(o)logForDebugging(`[ScheduledTasks] recovering stale scheduler lock from PID ${o.pid}`);if(await tre.unlink(pVt(t)).catch(()=>{}),await Gnc(r,t))return dVt=void 0,a1o(e),!0;return!1}
async function fVt(e){YQn?.(),YQn=void 0,dVt=void 0;let t=e?.dir,n=e?.lockIdentity??getSessionId(),r=await Vnc(t);if(!r||r.sessionId!==n)return;try{await tre.unlink(pVt(t)),logForDebugging("[ScheduledTasks] released scheduler lock")}catch{}}
var tre,mVt,t9m,n9m,YQn,dVt;
var Knc=b(()=>{Xr();lt();Wnc();ReactHooks();qe();bt();rE();Pd();Xt();tre=require("fs/promises"),mVt=require("path"),t9m=mVt.join(".claude","scheduled_tasks.lock"),n9m=we(()=>E.object({sessionId:E.string(),pid:E.number(),procStart:E.string().optional(),acquiredAt:E.number()}))});
export {pVt,Vnc,Gnc,a1o,l1o,fVt,tre,mVt,t9m,n9m,YQn,dVt,Knc};
