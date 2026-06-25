// @ts-nocheck
import {hw,a1} from "../src/config/2689_withFileTypes.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {In,Ce,Ct} from "./m197.ts";
import {Wt,ps} from "./m230.ts";
import {vf,Pv} from "./m639.ts";
import {externalHttp,_k} from "../src/core/0576_isCancel.ts";
import {RD,tW,XOt} from "../src/telemetry/2610_source.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function cbl(){return swo.join(hw(),pom)}
async function gom(){try{let e=await x7n.readFile(cbl(),{encoding:"utf-8"}),t=hom().safeParse(qt(e));if(!t.success)return logForDebugging("Plugin catalog cache has invalid structure"),null;let n=t.data;if(n.version!==owo)return logForDebugging(`Plugin catalog cache version mismatch (got ${n.version}, expected ${owo})`),null;let r=new Date(n.fetchedAt).getTime();if(Number.isNaN(r)||Date.now()-r>mom)return logForDebugging("Plugin catalog cache is stale (>24 h old)"),null;return n}catch(e){if(!In(e))logForDebugging(`Failed to load plugin catalog cache: ${Ce(e)}`);return null}}
async function _om(e){try{await Wt().mkdir(hw()),await vf(cbl(),TeamDeleteToolName(e),384),await x7n.unlink(swo.join(hw(),"install-counts-cache.json")).catch(()=>{})}catch(t){logForDebugging(`Failed to save plugin catalog cache: ${Ce(t)}`,{level:"error"})}}
async function yom(){logForDebugging(`Fetching plugin catalog from ${AWt}`);let e=performance.now();try{let t=await externalHttp.get(AWt,{timeout:1e4,maxContentLength:5242880}),n=lbl().safeParse(t.data);if(!n.success)throw Error("Invalid response format from plugin catalog");return RD("plugin_catalog",AWt,"success",performance.now()-e),n.data}catch(t){throw RD("plugin_catalog",AWt,"failure",performance.now()-e,tW(t)),t}}
function ubl(){return rwo??=(async()=>{let e=await gom();if(e)return RD("plugin_catalog",AWt,"cache_hit",0),e.catalog;try{let t=await yom();return await _om({version:owo,fetchedAt:new Date().toISOString(),catalog:t}),t}catch(t){return logForDebugging(`Failed to fetch plugin catalog: ${Ce(t)}`,{level:"error"}),rwo=void 0,null}})(),rwo}
async function Sht(){let e=await ubl();if(!e)return null;let t=new Map;for(let[n,r]of Object.entries(e.plugins))if(typeof r.unique_installs==="number")t.set(n,r.unique_installs);return t}
async function iwo(e){return(await ubl())?.plugins[e]}
async function pbl(e,t){let n=await iwo(e);if(!n)return null;let r=n.tokens[t];if(r)return{alwaysOn:r.always_on,onInvoke:r.on_invoke,isEstimate:!1};let o=[...n.components.commands,...n.components.agents,...n.components.skills],s=0,i=0;for(let a of o)s+=a.chars?.always_on??0,i+=a.chars?.on_invoke??0;return{alwaysOn:Math.round(s/ibl),onInvoke:Math.round(i/ibl),isEstimate:!0}}
function D7n(e){if(e<1000)return String(e);if(e<1e6){let n=(e/1000).toFixed(1);return n.endsWith(".0")?`${n.slice(0,-2)}K`:`${n}K`}let t=(e/1e6).toFixed(1);return t.endsWith(".0")?`${t.slice(0,-2)}M`:`${t}M`}
var x7n,swo,owo=1,pom="plugin-catalog-cache.json",AWt="https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/plugin-stats/plugin-details.json",mom=86400000,abl,nwo,fom,lbl,hom,rwo,dbl=2000,ibl=3;
var RWt=b(()=>{Qr();_k();Pv();qe();Ct();ps();tn();XOt();a1();x7n=require("fs/promises"),swo=require("path"),abl=ve(()=>C.object({always_on:C.number(),on_invoke:C.number()})),nwo=ve(()=>C.object({name:C.string(),chars:abl().optional()}).loose()),fom=ve(()=>C.object({plugin:C.string(),tokens:C.record(C.string(),abl()),components:C.object({commands:C.array(nwo()),agents:C.array(nwo()),skills:C.array(nwo()),hooks:C.array(C.string()).optional(),mcpServers:C.array(C.string()).optional(),lspServers:C.array(C.string()).optional()}).loose(),unique_installs:C.number().optional(),last_updated:C.string().optional(),marketplace_entry:C.record(C.string(),C.unknown())}).loose()),lbl=ve(()=>C.object({generated_at:C.string(),installs_generated_at:C.string().optional(),marketplace_sha:C.string(),models:C.array(C.string()),plugins:C.record(C.string(),fom())}).loose()),hom=ve(()=>C.object({version:C.number(),fetchedAt:C.string(),catalog:lbl()}))});
export {cbl,gom,_om,yom,ubl,Sht,iwo,pbl,D7n,x7n,swo,owo,pom,AWt,mom,abl,nwo,fom,lbl,hom,rwo,dbl,ibl,RWt};
