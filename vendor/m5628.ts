// @ts-nocheck
import {sCe,bk} from "../src/agent/0731_level.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {$m,TL,dS} from "../src/config/4460_source.ts";
import {jA,II} from "./m3268.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {rq,rH} from "../src/config/4461_operation.ts";
import {Qcc,Zcc} from "./m5627.ts";
import {yT} from "./m3150.ts";
import {b} from "../runtime.ts";
function BGm(e){return sCe.has(e.toLowerCase())}
function UGm(e){if(!e)return null;if(typeof e==="string")return logForDebugging("[lspRecommendation] Skipping string path lspServers (not readable from marketplace)"),null;if(Array.isArray(e)){for(let t of e){if(typeof t==="string")continue;let n=tuc(t);if(n)return n}return null}return tuc(e)}
function euc(e){return typeof e==="object"&&e!==null}
function tuc(e){let t=new Set,n=null;for(let[r,o]of Object.entries(e)){if(!euc(o))continue;if(!n&&typeof o.command==="string")n=o.command;let s=o.extensionToLanguage;if(euc(s))for(let i of Object.keys(s))t.add(i.toLowerCase())}if(!n||t.size===0)return null;return{extensions:t,command:n}}
async function $Gm(){let e=new Map;try{let t=await $m();for(let[n,r]of Object.entries(t)){if(!jA(r.source))continue;try{let o=await TL(n),s=BGm(n);for(let i of o.plugins){if(!i.lspServers)continue;let a=UGm(i.lspServers);if(!a)continue;let l=`${i.name}@${n}`;e.set(l,{entry:i,marketplaceName:n,extensions:a.extensions,command:a.command,isOfficial:s})}}catch(o){logForDebugging(`[lspRecommendation] Failed to load marketplace ${n}: ${o}`)}}}catch(t){logForDebugging(`[lspRecommendation] Failed to load marketplaces config: ${t}`)}return e}
async function ruc(e){if(qGm())return logForDebugging("[lspRecommendation] Recommendations are disabled"),[];let t=nuc.extname(e).toLowerCase();if(!t)return logForDebugging("[lspRecommendation] No file extension found"),[];logForDebugging(`[lspRecommendation] Looking for LSP plugins for ${t}`);let n=await $Gm(),o=getGlobalConfig().lspRecommendationNeverPlugins??[],s=[];for(let[a,l]of n){if(!l.extensions.has(t))continue;if(o.includes(a)){logForDebugging(`[lspRecommendation] Skipping ${a} (in never suggest list)`);continue}if(rq(a)){logForDebugging(`[lspRecommendation] Skipping ${a} (already installed)`);continue}s.push({info:l,pluginId:a})}let i=[];for(let{info:a,pluginId:l}of s)if(await Qcc(a.command))i.push({info:a,pluginId:l}),logForDebugging(`[lspRecommendation] Binary '${a.command}' found for ${l}`);else logForDebugging(`[lspRecommendation] Skipping ${l} (binary '${a.command}' not found)`);return i.sort((a,l)=>{if(a.info.isOfficial&&!l.info.isOfficial)return-1;if(!a.info.isOfficial&&l.info.isOfficial)return 1;return 0}),i.map(({info:a,pluginId:l})=>({pluginId:l,pluginName:yT(a.entry),marketplaceName:a.marketplaceName,description:a.entry.description,isOfficial:a.isOfficial,extensions:Array.from(a.extensions),command:a.command}))}
function ouc(e){saveGlobalConfig((t)=>{let n=t.lspRecommendationNeverPlugins??[];if(n.includes(e))return t;return{...t,lspRecommendationNeverPlugins:[...n,e]}}),logForDebugging(`[lspRecommendation] Added ${e} to never suggest`)}
function suc(){saveGlobalConfig((e)=>{let t=(e.lspRecommendationIgnoredCount??0)+1;return{...e,lspRecommendationIgnoredCount:t}}),logForDebugging("[lspRecommendation] Incremented ignored count")}
function qGm(){let e=getGlobalConfig();return e.lspRecommendationDisabled===!0||(e.lspRecommendationIgnoredCount??0)>=FGm}
var nuc,FGm=5;
var iuc=b(()=>{Zcc();tr();qe();rH();dS();II();bk();nuc=require("path")});
export {BGm,UGm,euc,tuc,$Gm,ruc,ouc,suc,qGm,nuc,FGm,iuc};
