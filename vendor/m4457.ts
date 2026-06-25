// @ts-nocheck
import {jA,OW,II} from "./m3268.ts";
import {TL,dS} from "../src/config/4460_source.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Sn,lr} from "./m233.ts";
import {Q2e,Yvn} from "./m2610.ts";
import {b} from "../runtime.ts";
function Tft(e,t){let r=e.slice(0,2).map((i)=>{let a=i.reason||i.error||"unknown error";return t?`${i.name} (${a})`:i.name}).join(t?"; ":", "),o=e.length-2,s=o>0?` and ${o} more`:"";return`${r}${s}`}
function v8e(e){switch(e.source){case"github":return e.repo;case"url":return e.url;case"git":return e.url;case"directory":return e.path;case"file":return e.path;case"settings":return`settings:${e.name}`;default:return"Unknown source"}}
function KY(e,t){return`${e}@${t}`}
async function nne(e){let t=[],n=[];for(let[r,o]of Object.entries(e)){if(!jA(o.source))continue;let s=null;try{s=await TL(r)}catch(i){let a=i instanceof Error?i.message:String(i);n.push({name:r,error:a}),logForDebugging(`Failed to load plugin marketplace ${r}: ${a}`,{level:"error"})}t.push({name:r,config:o,data:s})}return{marketplaces:t,failures:n}}
function Sft(e,t){if(e.length===0)return null;if(t>0)return{type:"warning",message:e.length===1?`Warning: Failed to load marketplace '${e[0].name}': ${e[0].error}`:`Warning: Failed to load ${e.length} marketplaces: ${Z7p(e)}`};return{type:"error",message:`Failed to load all marketplaces. Errors: ${ezp(e)}`}}
function Z7p(e){return e.map((t)=>t.name).join(", ")}
function ezp(e){return e.map((t)=>`${t.name}: ${t.error}`).join("; ")}
function uTe(e){switch(e.source){case"github":return`github:${e.repo}${e.ref?`@${e.ref}`:""}`;case"url":return e.url;case"git":return`git:${e.url}${e.ref?`@${e.ref}`:""}`;case"npm":return`npm:${e.package}`;case"file":return`file:${e.path}`;case"directory":return`dir:${e.path}`;case"hostPattern":return`hostPattern:${e.hostPattern}`;case"pathPattern":return`pathPattern:${e.pathPattern}`;case"skills-dir":return"skills-dir";case"settings":return`settings:${e.name} (${e.plugins.length} ${Sn(e.plugins.length,"plugin")})`;default:return"unknown source"}}
async function zll({configuredMarketplaceCount:e,failedMarketplaceCount:t}){if(!await Q2e())return"git-not-installed";let r=OW();if(r!==null){if(r.length===0)return"all-blocked-by-policy";if(e===0)return"policy-restricts-sources"}if(e===0)return"no-marketplaces-configured";if(t>0&&t===e)return"all-marketplaces-failed";return"all-plugins-installed"}
var dTe=b(()=>{qe();lr();Yvn();dS();II()});
export {Tft,v8e,KY,nne,Sft,Z7p,ezp,uTe,zll,dTe};
