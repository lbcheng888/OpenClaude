// @ts-nocheck
import {getProjectRoot,addSessionCronTask,getSessionId,removeSessionCronTasks,getSessionCronTasks,lt} from "../src/session/0131_sent.ts";
import {jt,ws} from "./m228.ts";
import {ds,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {Fa,Pd} from "./m701.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {X1,ktt,Az} from "./m2683.ts";
import {ownProcStart,rE} from "./m1456.ts";
import {b} from "../runtime.ts";
function WAe(e){return Yvn.join(e??getProjectRoot(),WEd)}
async function Dtt(e){let t=jt(),n;try{n=await t.readFile(WAe(e),{encoding:"utf-8"})}catch(i){if(ds(i))return[];return De(i),[]}let r=Fa(n,!1);if(!r||typeof r!=="object")return[];let o=r;if(!Array.isArray(o.tasks))return[];let s=[];for(let i of o.tasks){if(!i||typeof i.id!=="string"||typeof i.cron!=="string"||typeof i.prompt!=="string"||typeof i.createdAt!=="number"){logForDebugging(`[ScheduledTasks] skipping malformed task: ${Le(i)}`);continue}if(!X1(i.cron)){logForDebugging(`[ScheduledTasks] skipping task ${i.id} with invalid cron '${i.cron}'`);continue}s.push({id:i.id,cron:i.cron,prompt:i.prompt,createdAt:i.createdAt,...typeof i.lastFiredAt==="number"&&{lastFiredAt:i.lastFiredAt},...i.recurring&&{recurring:!0},...i.permanent&&{permanent:!0},...typeof i.createdBySessionId==="string"&&{createdBySessionId:i.createdBySessionId},...typeof i.createdByPid==="number"&&{createdByPid:i.createdByPid},...typeof i.createdByProcStart==="string"&&{createdByProcStart:i.createdByProcStart}})}return s}
function Jvn(e){let t;try{t=z1i.readFileSync(WAe(e),"utf-8")}catch{return!1}let n=Fa(t,!1);if(!n||typeof n!=="object")return!1;let r=n.tasks;return Array.isArray(r)&&r.length>0}
async function wPt(e,t){let n=t??getProjectRoot();await zvn.mkdir(Yvn.join(n,".claude"),{recursive:!0});let r={tasks:e.map(({durable:o,...s})=>s)};await zvn.writeFile(WAe(n),Le(r,null,2)+`
`,"utf-8")}
async function Ptt(e,t,n,r,o){let s=K1i.randomUUID().slice(0,8),i={id:s,cron:e,prompt:t,createdAt:Date.now(),...n&&{recurring:!0}};if(!r)return addSessionCronTask({...i,...o&&{agentId:o}}),s;let a=await Dtt();return a.push({...i,createdBySessionId:getSessionId(),createdByPid:process.pid,createdByProcStart:ownProcStart()}),await wPt(a),s}
async function mae(e,t){if(e.length===0)return;if(t===void 0&&removeSessionCronTasks(e)===e.length)return;let n=new Set(e),r=await Dtt(t),o=r.filter((s)=>!n.has(s.id));if(o.length===r.length)return;await wPt(o,t)}
async function Y1i(e,t,n){if(e.length===0)return;let r=new Set(e),o=await Dtt(n),s=!1;for(let i of o)if(r.has(i.id))i.lastFiredAt=t,s=!0;if(!s)return;await wPt(o,n)}
async function fae(e){let t=await Dtt(e);if(e!==void 0)return t;let n=getSessionCronTasks().map((r)=>({...r,durable:!1}));return[...t,...n]}
function Itt(e,t){let n=X1(e);if(!n)return null;let r=ktt(n,new Date(t));return r?r.getTime():null}
function J1i(e){let t=parseInt(e.slice(0,8),16)/4294967296;return Number.isFinite(t)?t:0}
function RPt(e,t,n,r=W5){let o=Itt(e,t);if(o===null)return null;let s=Itt(e,o);if(s===null)return o;let i=s-o;if(jEd.test(e)&&r.cacheLeadMs>0&&r.cacheLeadMs<i&&i>=vPt&&i-r.cacheLeadMs<vPt)return t+i-r.cacheLeadMs;let a=Math.min(J1i(n)*r.recurringFrac*i,r.recurringCapMs);return o+a}
function Xvn(e,t,n,r=W5){let o=Itt(e,t);if(o===null)return null;if(new Date(o).getMinutes()%r.oneShotMinuteMod!==0)return o;let s=r.oneShotFloorMs+J1i(n)*(r.oneShotMaxMs-r.oneShotFloorMs);return Math.max(o-s,t)}
function X1i(e,t){return e.filter((n)=>{let r=Itt(n.cron,n.createdAt);return r!==null&&r<t})}
var K1i,z1i,zvn,Yvn,vPt=300000,jEd,WEd,W5;
var G5=b(()=>{lt();Az();qe();bt();ws();rE();Pd();Rn();Xt();K1i=require("crypto"),z1i=require("fs"),zvn=require("fs/promises"),Yvn=require("path"),jEd=/^\*\/\d+ \* \* \* \*$/,WEd=Yvn.join(".claude","scheduled_tasks.json");W5={recurringFrac:0.5,recurringCapMs:1800000,oneShotMaxMs:90000,oneShotFloorMs:0,oneShotMinuteMod:30,recurringMaxAgeMs:604800000,cacheLeadMs:15000}});
export {WAe,Dtt,Jvn,wPt,Ptt,mae,Y1i,fae,Itt,J1i,RPt,Xvn,X1i,K1i,z1i,zvn,Yvn,vPt,jEd,WEd,W5,G5};
