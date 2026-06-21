// @ts-nocheck
import {Ebe,ik} from "../src/agent/0726_level.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {vf,tM,hS} from "../src/config/4438_source.ts";
import {Uv,nI} from "./m3252.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {$q,Mk} from "../src/config/4439_operation.ts";
import {utc,dtc} from "./m5589.ts";
import {ET} from "./m3140.ts";
import {b} from "../runtime.ts";
function u$m(e){return Ebe.has(e.toLowerCase())}
function d$m(e){if(!e)return null;if(typeof e==="string")return logForDebugging("[lspRecommendation] Skipping string path lspServers (not readable from marketplace)"),null;if(Array.isArray(e)){for(let t of e){if(typeof t==="string")continue;let n=mtc(t);if(n)return n}return null}return mtc(e)}
function ptc(e){return typeof e==="object"&&e!==null}
function mtc(e){let t=new Set,n=null;for(let[r,o]of Object.entries(e)){if(!ptc(o))continue;if(!n&&typeof o.command==="string")n=o.command;let s=o.extensionToLanguage;if(ptc(s))for(let i of Object.keys(s))t.add(i.toLowerCase())}if(!n||t.size===0)return null;return{extensions:t,command:n}}
async function p$m(){let e=new Map;try{let t=await vf();for(let[n,r]of Object.entries(t)){if(!Uv(r.source))continue;try{let o=await tM(n),s=u$m(n);for(let i of o.plugins){if(!i.lspServers)continue;let a=d$m(i.lspServers);if(!a)continue;let l=`${i.name}@${n}`;e.set(l,{entry:i,marketplaceName:n,extensions:a.extensions,command:a.command,isOfficial:s})}}catch(o){logForDebugging(`[lspRecommendation] Failed to load marketplace ${n}: ${o}`)}}}catch(t){logForDebugging(`[lspRecommendation] Failed to load marketplaces config: ${t}`)}return e}
async function Atc(e){if(m$m())return logForDebugging("[lspRecommendation] Recommendations are disabled"),[];let t=ftc.extname(e).toLowerCase();if(!t)return logForDebugging("[lspRecommendation] No file extension found"),[];logForDebugging(`[lspRecommendation] Looking for LSP plugins for ${t}`);let n=await p$m(),o=getGlobalConfig().lspRecommendationNeverPlugins??[],s=[];for(let[a,l]of n){if(!l.extensions.has(t))continue;if(o.includes(a)){logForDebugging(`[lspRecommendation] Skipping ${a} (in never suggest list)`);continue}if($q(a)){logForDebugging(`[lspRecommendation] Skipping ${a} (already installed)`);continue}s.push({info:l,pluginId:a})}let i=[];for(let{info:a,pluginId:l}of s)if(await utc(a.command))i.push({info:a,pluginId:l}),logForDebugging(`[lspRecommendation] Binary '${a.command}' found for ${l}`);else logForDebugging(`[lspRecommendation] Skipping ${l} (binary '${a.command}' not found)`);return i.sort((a,l)=>{if(a.info.isOfficial&&!l.info.isOfficial)return-1;if(!a.info.isOfficial&&l.info.isOfficial)return 1;return 0}),i.map(({info:a,pluginId:l})=>({pluginId:l,pluginName:ET(a.entry),marketplaceName:a.marketplaceName,description:a.entry.description,isOfficial:a.isOfficial,extensions:Array.from(a.extensions),command:a.command}))}
function htc(e){saveGlobalConfig((t)=>{let n=t.lspRecommendationNeverPlugins??[];if(n.includes(e))return t;return{...t,lspRecommendationNeverPlugins:[...n,e]}}),logForDebugging(`[lspRecommendation] Added ${e} to never suggest`)}
function gtc(){saveGlobalConfig((e)=>{let t=(e.lspRecommendationIgnoredCount??0)+1;return{...e,lspRecommendationIgnoredCount:t}}),logForDebugging("[lspRecommendation] Incremented ignored count")}
function m$m(){let e=getGlobalConfig();return e.lspRecommendationDisabled===!0||(e.lspRecommendationIgnoredCount??0)>=c$m}
var ftc,c$m=5;
var _tc=b(()=>{dtc();Qn();qe();Mk();hS();nI();ik();ftc=require("path")});
export {u$m,d$m,ptc,mtc,p$m,Atc,htc,gtc,m$m,ftc,c$m,_tc};
