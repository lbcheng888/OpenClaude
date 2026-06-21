// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {kg} from "./m129.ts";
import {ca} from "./m5.ts";
function F5(e){chd.emit(e);let t=Date.now(),n=Vwe.get(e);if(n)n.count++,n.lastUsedAt=t;else Vwe.set(e,{count:1,lastUsedAt:t});if(!U0i)U0i=!0,process.on("exit",$0i);if(!Bet)Bet=setTimeout($0i,lhd),Bet.unref?.()}
function $0i(){if(Bet)clearTimeout(Bet),Bet=null;if(Vwe.size===0)return;let e=[...Vwe.entries()];Vwe.clear(),saveGlobalConfig((t)=>{let n={...t.pluginUsage};for(let[r,o]of e){let s=n[r];n[r]={usageCount:(s?.usageCount??0)+o.count,lastUsedAt:o.lastUsedAt,lastUsedNumStartups:t.numStartups}}return{...t,pluginUsage:n}})}
function YEn(e){let t=Date.now();saveGlobalConfig((n)=>{let r=e.filter((s)=>!n.pluginUsage?.[s]);if(r.length===0)return n;let o={...n.pluginUsage};for(let s of r)o[s]={usageCount:0,lastUsedAt:t,lastUsedNumStartups:n.numStartups};return{...n,pluginUsage:o}})}
function Fet(e){let t=new Set(e.map((n)=>n.toLowerCase()));for(let n of Vwe.keys())if(t.has(n.toLowerCase()))Vwe.delete(n);saveGlobalConfig((n)=>{let o=Object.keys(n.pluginUsage??{}).filter((i)=>t.has(i.toLowerCase()));if(o.length===0)return n;let s={...n.pluginUsage};for(let i of o)delete s[i];return{...n,pluginUsage:s}})}
function pDt(e){return getGlobalConfig().pluginUsage?.[e]}
function J3r(e){return Vwe.has(e)}
function q0i(e){let t=Date.now();saveGlobalConfig((n)=>{let r=e.filter((s)=>n.pluginUsage?.[s]);if(r.length===0)return n;let o={...n.pluginUsage};for(let s of r){let i=o[s];if(!i)continue;o[s]={...i,lastUsedAt:t,lastUsedNumStartups:n.numStartups}}return{...n,pluginUsage:o}})}
function mDt(e,t,n){return{sessionsSinceLastUse:Math.max(0,t-e.lastUsedNumStartups),daysSinceLastUse:Math.max(0,Math.floor((n-e.lastUsedAt)/86400000))}}
var lhd=60000,chd,Vwe,Bet=null,U0i=!1;
var rz=b(()=>{Qn();kg();chd=ca(),Vwe=new Map});
export {F5,$0i,YEn,Fet,pDt,J3r,q0i,mDt,lhd,chd,Vwe,Bet,U0i,rz};
