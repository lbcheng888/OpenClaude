// @ts-nocheck
import {Uv,_W,nI} from "./m3252.ts";
import {tM,hS} from "../src/config/4438_source.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Cn,dr} from "./m231.ts";
import {QUe,sCn} from "./m2599.ts";
import {b} from "../runtime.ts";
function ypt(e,t){let r=e.slice(0,2).map((i)=>{let a=i.reason||i.error||"unknown error";return t?`${i.name} (${a})`:i.name}).join(t?"; ":", "),o=e.length-2,s=o>0?` and ${o} more`:"";return`${r}${s}`}
function Z6e(e){switch(e.source){case"github":return e.repo;case"url":return e.url;case"git":return e.url;case"directory":return e.path;case"file":return e.path;case"settings":return`settings:${e.name}`;default:return"Unknown source"}}
function uJ(e,t){return`${e}@${t}`}
async function une(e){let t=[],n=[];for(let[r,o]of Object.entries(e)){if(!Uv(o.source))continue;let s=null;try{s=await tM(r)}catch(i){let a=i instanceof Error?i.message:String(i);n.push({name:r,error:a}),logForDebugging(`Failed to load plugin marketplace ${r}: ${a}`,{level:"error"})}t.push({name:r,config:o,data:s})}return{marketplaces:t,failures:n}}
function Tpt(e,t){if(e.length===0)return null;if(t>0)return{type:"warning",message:e.length===1?`Warning: Failed to load marketplace '${e[0].name}': ${e[0].error}`:`Warning: Failed to load ${e.length} marketplaces: ${hqp(e)}`};return{type:"error",message:`Failed to load all marketplaces. Errors: ${gqp(e)}`}}
function hqp(e){return e.map((t)=>t.name).join(", ")}
function gqp(e){return e.map((t)=>`${t.name}: ${t.error}`).join("; ")}
function j_e(e){switch(e.source){case"github":return`github:${e.repo}${e.ref?`@${e.ref}`:""}`;case"url":return e.url;case"git":return`git:${e.url}${e.ref?`@${e.ref}`:""}`;case"npm":return`npm:${e.package}`;case"file":return`file:${e.path}`;case"directory":return`dir:${e.path}`;case"hostPattern":return`hostPattern:${e.hostPattern}`;case"pathPattern":return`pathPattern:${e.pathPattern}`;case"skills-dir":return"skills-dir";case"settings":return`settings:${e.name} (${e.plugins.length} ${Cn(e.plugins.length,"plugin")})`;default:return"unknown source"}}
async function anl({configuredMarketplaceCount:e,failedMarketplaceCount:t}){if(!await QUe())return"git-not-installed";let r=_W();if(r!==null){if(r.length===0)return"all-blocked-by-policy";if(e===0)return"policy-restricts-sources"}if(e===0)return"no-marketplaces-configured";if(t>0&&t===e)return"all-marketplaces-failed";return"all-plugins-installed"}
var W_e=b(()=>{qe();dr();sCn();hS();nI()});
export {ypt,Z6e,uJ,une,Tpt,hqp,gqp,j_e,anl,W_e};
