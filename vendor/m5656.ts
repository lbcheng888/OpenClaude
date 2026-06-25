// @ts-nocheck
import {getProjectRoot,getSessionId,lt} from "../src/session/0132_sent.ts";
import {ba,pd} from "./m706.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {cn,Ct} from "./m197.ts";
import {Si,ud} from "./m134.ts";
import {Hdc,Idc} from "./m5655.ts";
import {ownProcStart,isProcessRunning,isSameProcessAsync,lE} from "./m1461.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function $zt(e){return qzt.join(e??getProjectRoot(),wVm)}
async function Ddc(e){let t;try{t=await Xne.readFile($zt(e),"utf8")}catch{return}let n=kVm().safeParse(ba(t,!1));return n.success?n.data:void 0}
async function xdc(e,t){let n=$zt(t),r=TeamDeleteToolName(e);try{return await Xne.writeFile(n,r,{flag:"wx"}),!0}catch(o){let s=cn(o);if(s==="EEXIST")return!1;if(s==="ENOENT"){await Xne.mkdir(qzt.dirname(n),{recursive:!0});try{return await Xne.writeFile(n,r,{flag:"wx"}),!0}catch(i){if(cn(i)==="EEXIST")return!1;throw i}}throw o}}
function I2o(e){Qnr?.(),Qnr=Si(async()=>{await Wzt(e)})}
async function x2o(e){let t=e?.dir;await Hdc(t??getProjectRoot());let n=e?.lockIdentity??getSessionId(),r={sessionId:n,pid:process.pid,procStart:ownProcStart(),acquiredAt:Date.now()};if(await xdc(r,t))return Uzt=void 0,I2o(e),logForDebugging(`[ScheduledTasks] acquired scheduler lock (PID ${process.pid})`),!0;let o=await Ddc(t);if(o?.sessionId===n){if(o.pid!==process.pid)await Xne.writeFile($zt(t),TeamDeleteToolName(r)),I2o(e);return!0}if(o&&isProcessRunning(o.pid)&&await isSameProcessAsync(o.pid,o.procStart)){if(Uzt!==o.sessionId)Uzt=o.sessionId,logForDebugging(`[ScheduledTasks] scheduler lock held by session ${o.sessionId} (PID ${o.pid})`);return!1}if(o)logForDebugging(`[ScheduledTasks] recovering stale scheduler lock from PID ${o.pid}`);if(await Xne.unlink($zt(t)).catch(()=>{}),await xdc(r,t))return Uzt=void 0,I2o(e),!0;return!1}
async function Wzt(e){Qnr?.(),Qnr=void 0,Uzt=void 0;let t=e?.dir,n=e?.lockIdentity??getSessionId(),r=await Ddc(t);if(!r||r.sessionId!==n)return;try{await Xne.unlink($zt(t)),logForDebugging("[ScheduledTasks] released scheduler lock")}catch{}}
var Xne,qzt,wVm,kVm,Qnr,Uzt;
var Pdc=b(()=>{Qr();lt();Idc();ud();qe();Ct();lE();pd();tn();Xne=require("fs/promises"),qzt=require("path"),wVm=qzt.join(".claude","scheduled_tasks.lock"),kVm=ve(()=>C.object({sessionId:C.string(),pid:C.number(),procStart:C.string().optional(),acquiredAt:C.number()}))});
export {$zt,Ddc,xdc,I2o,x2o,Wzt,Xne,qzt,wVm,kVm,Qnr,Uzt,Pdc};
