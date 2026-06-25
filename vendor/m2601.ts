// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
function t$(e){Lvd.emit(e);let t=Date.now(),n=Hwe.get(e);if(n)n.count++,n.lastUsedAt=t;else Hwe.set(e,{count:1,lastUsedAt:t});if(!yNi)yNi=!0,process.on("exit",TNi);if(!Wnt)Wnt=setTimeout(TNi,Ovd),Wnt.unref?.()}
function TNi(){if(Wnt)clearTimeout(Wnt),Wnt=null;if(Hwe.size===0)return;let e=[...Hwe.entries()];Hwe.clear(),saveGlobalConfig((t)=>{let n={...t.pluginUsage};for(let[r,o]of e){let s=n[r];n[r]={usageCount:(s?.usageCount??0)+o.count,lastUsedAt:o.lastUsedAt,lastUsedNumStartups:t.numStartups}}return{...t,pluginUsage:n}})}
function Bvn(e){let t=Date.now();saveGlobalConfig((n)=>{let r=e.filter((s)=>!n.pluginUsage?.[s]);if(r.length===0)return n;let o={...n.pluginUsage};for(let s of r)o[s]={usageCount:0,lastUsedAt:t,lastUsedNumStartups:n.numStartups};return{...n,pluginUsage:o}})}
function Gnt(e){let t=new Set(e.map((n)=>n.toLowerCase()));for(let n of Hwe.keys())if(t.has(n.toLowerCase()))Hwe.delete(n);saveGlobalConfig((n)=>{let o=Object.keys(n.pluginUsage??{}).filter((i)=>t.has(i.toLowerCase()));if(o.length===0)return n;let s={...n.pluginUsage};for(let i of o)delete s[i];return{...n,pluginUsage:s}})}
function WOt(e){return getGlobalConfig().pluginUsage?.[e]}
function w8r(e){return Hwe.has(e)}
function SNi(e){let t=Date.now();saveGlobalConfig((n)=>{let r=e.filter((s)=>n.pluginUsage?.[s]);if(r.length===0)return n;let o={...n.pluginUsage};for(let s of r){let i=o[s];if(!i)continue;o[s]={...i,lastUsedAt:t,lastUsedNumStartups:n.numStartups}}return{...n,pluginUsage:o}})}
function GOt(e,t,n){return{sessionsSinceLastUse:Math.max(0,t-e.lastUsedNumStartups),daysSinceLastUse:Math.max(0,Math.floor((n-e.lastUsedAt)/86400000))}}
var Ovd=60000,Lvd,Hwe,Wnt=null,yNi=!1;
var eW=b(()=>{tr();ig();Lvd=Ni(),Hwe=new Map});
export {t$,TNi,Bvn,Gnt,WOt,w8r,SNi,GOt,Ovd,Lvd,Hwe,Wnt,yNi,eW};
