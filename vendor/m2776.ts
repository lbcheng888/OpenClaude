// @ts-nocheck
import {getSettingsForSource,getSettingsFilePathForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {jp,jt,ws} from "./m228.ts";
import {ER,bB} from "./m634.ts";
import {Fa,Pd} from "./m701.ts";
import {bA,Qm,Sw} from "../src/mcp/0728_serverName.ts";
import {$D,mf,F2} from "./m702.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function x$i(e){return`prompt: ${e.trim()}`}
function uxe(){return!1}
function k$i(e){return[]}
function H$i(e){return[]}
function NRn(e){return[]}
async function BRn(e,t,n,r,o,s){return{matches:!1,confidence:"high",reason:"This feature is disabled"}}
async function I$i(e,t,n){return t||null}
var MRn="prompt:";
function WOt(){return getSettingsForSource("policySettings")?.allowManagedPermissionRulesOnly===!0}
function Cnt(){return!WOt()}
function bkd(e){let t=getSettingsFilePathForSource(e);if(!t)return null;try{let{resolvedPath:n}=jp(jt(),t),r=ER(n);if(r.trim()==="")return{};let o=Fa(r,!1);return o&&typeof o==="object"?o:null}catch{return null}}
function Ekd(e,t){if(!e||!e.permissions)return[];let{permissions:n}=e,r=[];for(let o of Skd){let s=n[o];if(s)for(let i of s)r.push({source:t,ruleBehavior:o,ruleValue:bA(i)})}return r}
function FRn(){if(WOt())return jOt("policySettings");let e=[];for(let t of $D())e.push(...jOt(t));return e}
function jOt(e){let t=getSettingsForSource(e);return Ekd(t,e)}
function D$i(e){if(!Ckd.includes(e.source))return!1;let t=Qm(e.ruleValue),n=getSettingsForSource(e.source);if(!n||!n.permissions)return!1;let r=n.permissions[e.ruleBehavior];if(!r)return!1;let o=(s)=>Qm(bA(s));if(!r.some((s)=>o(s)===t))return!1;try{let s={...n,permissions:{...n.permissions,[e.ruleBehavior]:r.filter((a)=>o(a)!==t)}},{error:i}=updateSettingsForSource(e.source,s);if(i)return!1;return!0}catch(s){return De(s),!1}}
function vkd(){return{permissions:{}}}
function P$i({ruleValues:e,ruleBehavior:t},n){if(WOt())return!1;if(e.length<1)return!0;let r=e.map(Qm),o=getSettingsForSource(n)||bkd(n)||vkd();try{let s=o.permissions||{},i=s[t]||[],a=new Set(i.map((d)=>Qm(bA(d)))),l=r.filter((d)=>!a.has(d));if(l.length===0)return!0;let c={...o,permissions:{...s,[t]:[...i,...l]}},u=updateSettingsForSource(n,c);if(u.error)throw u.error;return!0}catch(s){return logForDebugging(`Failed to add permission rules to ${n} settings: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),!1}}
var Skd,Ckd;
var che=b(()=>{qe();bB();ws();Pd();Rn();mf();yr();Sw();Skd=["allow","deny","ask"];Ckd=F2});
export {x$i,uxe,k$i,H$i,NRn,BRn,I$i,MRn,WOt,Cnt,bkd,Ekd,FRn,jOt,D$i,vkd,P$i,Skd,Ckd,che};
