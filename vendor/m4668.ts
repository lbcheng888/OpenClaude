// @ts-nocheck
import {rx,J1} from "../src/config/2678_withFileTypes.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Pn,Se,bt} from "./m195.ts";
import {jt,ws} from "./m228.ts";
import {Rh,ok} from "./m633.ts";
import {externalHttp,ek} from "../src/core/0570_isCancel.ts";
import {uP,U5,TDt} from "../src/telemetry/2599_source.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function yml(){return GSo.join(rx(),uYp)}
async function fYp(){try{let e=await z5n.readFile(yml(),{encoding:"utf-8"}),t=mYp().safeParse(qt(e));if(!t.success)return logForDebugging("Plugin catalog cache has invalid structure"),null;let n=t.data;if(n.version!==WSo)return logForDebugging(`Plugin catalog cache version mismatch (got ${n.version}, expected ${WSo})`),null;let r=new Date(n.fetchedAt).getTime();if(Number.isNaN(r)||Date.now()-r>dYp)return logForDebugging("Plugin catalog cache is stale (>24 h old)"),null;return n}catch(e){if(!Pn(e))logForDebugging(`Failed to load plugin catalog cache: ${Se(e)}`);return null}}
async function AYp(e){try{await jt().mkdir(rx()),await Rh(yml(),Le(e),384),await z5n.unlink(GSo.join(rx(),"install-counts-cache.json")).catch(()=>{})}catch(t){logForDebugging(`Failed to save plugin catalog cache: ${Se(t)}`,{level:"error"})}}
async function hYp(){logForDebugging(`Fetching plugin catalog from ${rjt}`);let e=performance.now();try{let t=await externalHttp.get(rjt,{timeout:1e4,maxContentLength:5242880}),n=_ml().safeParse(t.data);if(!n.success)throw Error("Invalid response format from plugin catalog");return uP("plugin_catalog",rjt,"success",performance.now()-e),n.data}catch(t){throw uP("plugin_catalog",rjt,"failure",performance.now()-e,U5(t)),t}}
function Tml(){return jSo??=(async()=>{let e=await fYp();if(e)return uP("plugin_catalog",rjt,"cache_hit",0),e.catalog;try{let t=await hYp();return await AYp({version:WSo,fetchedAt:new Date().toISOString(),catalog:t}),t}catch(t){return logForDebugging(`Failed to fetch plugin catalog: ${Se(t)}`,{level:"error"}),jSo=void 0,null}})(),jSo}
async function umt(){let e=await Tml();if(!e)return null;let t=new Map;for(let[n,r]of Object.entries(e.plugins))if(typeof r.unique_installs==="number")t.set(n,r.unique_installs);return t}
async function VSo(e){return(await Tml())?.plugins[e]}
async function bml(e,t){let n=await VSo(e);if(!n)return null;let r=n.tokens[t];if(r)return{alwaysOn:r.always_on,onInvoke:r.on_invoke,isEstimate:!1};let o=[...n.components.commands,...n.components.agents,...n.components.skills],s=0,i=0;for(let a of o)s+=a.chars?.always_on??0,i+=a.chars?.on_invoke??0;return{alwaysOn:Math.round(s/hml),onInvoke:Math.round(i/hml),isEstimate:!0}}
function Y5n(e){if(e<1000)return String(e);if(e<1e6){let n=(e/1000).toFixed(1);return n.endsWith(".0")?`${n.slice(0,-2)}K`:`${n}K`}let t=(e/1e6).toFixed(1);return t.endsWith(".0")?`${t.slice(0,-2)}M`:`${t}M`}
var z5n,GSo,WSo=1,uYp="plugin-catalog-cache.json",rjt="https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/plugin-stats/plugin-details.json",dYp=86400000,gml,qSo,pYp,_ml,mYp,jSo,Sml=2000,hml=3;
var ojt=b(()=>{Xr();ek();ok();qe();bt();ws();Xt();TDt();J1();z5n=require("fs/promises"),GSo=require("path"),gml=we(()=>E.object({always_on:E.number(),on_invoke:E.number()})),qSo=we(()=>E.object({name:E.string(),chars:gml().optional()}).loose()),pYp=we(()=>E.object({plugin:E.string(),tokens:E.record(E.string(),gml()),components:E.object({commands:E.array(qSo()),agents:E.array(qSo()),skills:E.array(qSo()),hooks:E.array(E.string()).optional(),mcpServers:E.array(E.string()).optional(),lspServers:E.array(E.string()).optional()}).loose(),unique_installs:E.number().optional(),last_updated:E.string().optional(),marketplace_entry:E.record(E.string(),E.unknown())}).loose()),_ml=we(()=>E.object({generated_at:E.string(),installs_generated_at:E.string().optional(),marketplace_sha:E.string(),models:E.array(E.string()),plugins:E.record(E.string(),pYp())}).loose()),mYp=we(()=>E.object({version:E.number(),fetchedAt:E.string(),catalog:_ml()}))});
export {yml,fYp,AYp,hYp,Tml,umt,VSo,bml,Y5n,z5n,GSo,WSo,uYp,rjt,dYp,gml,qSo,pYp,_ml,mYp,jSo,Sml,hml,ojt};
