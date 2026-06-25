// @ts-nocheck
import {getProjectRoot,addSessionCronTask,getSessionId,removeSessionCronTasks,getSessionCronTasks,lt} from "../src/session/0132_sent.ts";
import {Wt,ps} from "./m230.ts";
import {Jo,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {ba,pd} from "./m706.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {c1,Drt,formatPermissionRule} from "./m2695.ts";
import {ownProcStart,lE} from "./m1461.ts";
import {b} from "../runtime.ts";
function oge(e){return Fkn.join(e??getProjectRoot(),bPd)}
async function Lrt(e){let t=Wt(),n;try{n=await t.readFile(oge(e),{encoding:"utf-8"})}catch(i){if(Jo(i))return[];return Ie(i),[]}let r=ba(n,!1);if(!r||typeof r!=="object")return[];let o=r;if(!Array.isArray(o.tasks))return[];let s=[];for(let i of o.tasks){if(!i||typeof i.id!=="string"||typeof i.cron!=="string"||typeof i.prompt!=="string"||typeof i.createdAt!=="number"){logForDebugging(`[ScheduledTasks] skipping malformed task: ${TeamDeleteToolName(i)}`);continue}if(!c1(i.cron)){logForDebugging(`[ScheduledTasks] skipping task ${i.id} with invalid cron '${i.cron}'`);continue}s.push({id:i.id,cron:i.cron,prompt:i.prompt,createdAt:i.createdAt,...typeof i.lastFiredAt==="number"&&{lastFiredAt:i.lastFiredAt},...i.recurring&&{recurring:!0},...i.permanent&&{permanent:!0},...typeof i.createdBySessionId==="string"&&{createdBySessionId:i.createdBySessionId},...typeof i.createdByPid==="number"&&{createdByPid:i.createdByPid},...typeof i.createdByProcStart==="string"&&{createdByProcStart:i.createdByProcStart}})}return s}
function Bkn(e){let t;try{t=P9i.readFileSync(oge(e),"utf-8")}catch{return!1}let n=ba(t,!1);if(!n||typeof n!=="object")return!1;let r=n.tasks;return Array.isArray(r)&&r.length>0}
async function oMt(e,t){let n=t??getProjectRoot();await Nkn.mkdir(Fkn.join(n,".claude"),{recursive:!0});let r={tasks:e.map(({durable:o,...s})=>s)};await Nkn.writeFile(oge(n),TeamDeleteToolName(r,null,2)+`
`,"utf-8")}
async function Mrt(e,t,n,r,o){let s=D9i.randomUUID().slice(0,8),i={id:s,cron:e,prompt:t,createdAt:Date.now(),...n&&{recurring:!0}};if(!r)return addSessionCronTask({...i,...o&&{agentId:o}}),s;let a=await Lrt();return a.push({...i,createdBySessionId:getSessionId(),createdByPid:process.pid,createdByProcStart:ownProcStart()}),await oMt(a),s}
async function uae(e,t){if(e.length===0)return;if(t===void 0&&removeSessionCronTasks(e)===e.length)return;let n=new Set(e),r=await Lrt(t),o=r.filter((s)=>!n.has(s.id));if(o.length===r.length)return;await oMt(o,t)}
async function O9i(e,t,n){if(e.length===0)return;let r=new Set(e),o=await Lrt(n),s=!1;for(let i of o)if(r.has(i.id))i.lastFiredAt=t,s=!0;if(!s)return;await oMt(o,n)}
async function dae(e){let t=await Lrt(e);if(e!==void 0)return t;let n=getSessionCronTasks().map((r)=>({...r,durable:!1}));return[...t,...n]}
function Ort(e,t){let n=c1(e);if(!n)return null;let r=Drt(n,new Date(t));return r?r.getTime():null}
function L9i(e){let t=parseInt(e.slice(0,8),16)/4294967296;return Number.isFinite(t)?t:0}
function sMt(e,t,n,r=sW){let o=Ort(e,t);if(o===null)return null;let s=Ort(e,o);if(s===null)return o;let i=s-o;if(SPd.test(e)&&r.cacheLeadMs>0&&r.cacheLeadMs<i&&i>=rMt&&i-r.cacheLeadMs<rMt)return t+i-r.cacheLeadMs;let a=Math.min(L9i(n)*r.recurringFrac*i,r.recurringCapMs);return o+a}
function Ukn(e,t,n,r=sW){let o=Ort(e,t);if(o===null)return null;if(new Date(o).getMinutes()%r.oneShotMinuteMod!==0)return o;let s=r.oneShotFloorMs+L9i(n)*(r.oneShotMaxMs-r.oneShotFloorMs);return Math.max(o-s,t)}
function M9i(e,t){return e.filter((n)=>{let r=Ort(n.cron,n.createdAt);return r!==null&&r<t})}
var D9i,P9i,Nkn,Fkn,rMt=300000,SPd,bPd,sW;
var iW=b(()=>{lt();formatPermissionRule();qe();Ct();ps();lE();pd();vn();tn();D9i=require("crypto"),P9i=require("fs"),Nkn=require("fs/promises"),Fkn=require("path"),SPd=/^\*\/\d+ \* \* \* \*$/,bPd=Fkn.join(".claude","scheduled_tasks.json");sW={recurringFrac:0.5,recurringCapMs:1800000,oneShotMaxMs:90000,oneShotFloorMs:0,oneShotMinuteMod:30,recurringMaxAgeMs:604800000,cacheLeadMs:15000}});
export {oge,Lrt,Bkn,oMt,Mrt,uae,O9i,dae,Ort,L9i,sMt,Ukn,M9i,D9i,P9i,Nkn,Fkn,rMt,SPd,bPd,sW,iW};
