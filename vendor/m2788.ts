// @ts-nocheck
import {getSettingsForSource,getSettingsFilePathForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Nd,Wt,ps} from "./m230.ts";
import {Ov,GN} from "./m640.ts";
import {ba,pd} from "./m706.ts";
import {Jf,Gp,gA} from "../src/mcp/0733_serverName.ts";
import {eD,wm,a2} from "./m707.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function T8i(e){return`prompt: ${e.trim()}`}
function Jke(){return!1}
function S8i(e){return[]}
function b8i(e){return[]}
function EIn(e){return[]}
async function CIn(e,t,n,r,o,s){return{matches:!1,confidence:"high",reason:"This feature is disabled"}}
async function E8i(e,t,n){return t||null}
var bIn="prompt:";
function n9e(){return getSettingsForSource("policySettings")?.allowManagedPermissionRulesOnly===!0}
function Hot(){return!n9e()}
function lFd(e){let t=getSettingsFilePathForSource(e);if(!t)return null;try{let{resolvedPath:n}=Nd(Wt(),t),r=Ov(n);if(r.trim()==="")return{};let o=ba(r,!1);return o&&typeof o==="object"?o:null}catch{return null}}
function cFd(e,t){if(!e||!e.permissions)return[];let{permissions:n}=e,r=[];for(let o of aFd){let s=n[o];if(s)for(let i of s)r.push({source:t,ruleBehavior:o,ruleValue:Jf(i)})}return r}
function AIn(){if(n9e())return E1t("policySettings");let e=[];for(let t of eD())e.push(...E1t(t));return e}
function E1t(e){let t=getSettingsForSource(e);return cFd(t,e)}
function C8i(e){if(!uFd.includes(e.source))return!1;let t=Gp(e.ruleValue),n=getSettingsForSource(e.source);if(!n||!n.permissions)return!1;let r=n.permissions[e.ruleBehavior];if(!r)return!1;let o=(s)=>Gp(Jf(s));if(!r.some((s)=>o(s)===t))return!1;try{let s={...n,permissions:{...n.permissions,[e.ruleBehavior]:r.filter((a)=>o(a)!==t)}},{error:i}=ao(e.source,s);if(i)return!1;return!0}catch(s){return Ie(s),!1}}
function dFd(){return{permissions:{}}}
function A8i({ruleValues:e,ruleBehavior:t},n){if(n9e())return!1;if(e.length<1)return!0;let r=e.map(Gp),o=getSettingsForSource(n)||lFd(n)||dFd();try{let s=o.permissions||{},i=s[t]||[],a=new Set(i.map((d)=>Gp(Jf(d)))),l=r.filter((d)=>!a.has(d));if(l.length===0)return!0;let c={...o,permissions:{...s,[t]:[...i,...l]}},u=ao(n,c);if(u.error)throw u.error;return!0}catch(s){return logForDebugging(`Failed to add permission rules to ${n} settings: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),!1}}
var aFd,uFd;
var Cae=b(()=>{qe();GN();ps();pd();vn();wm();br();gA();aFd=["allow","deny","ask"];uFd=a2});
export {T8i,Jke,S8i,b8i,EIn,CIn,E8i,bIn,n9e,Hot,lFd,cFd,AIn,E1t,C8i,dFd,A8i,aFd,uFd,Cae};
