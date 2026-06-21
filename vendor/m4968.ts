// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {vx,j0e,bjn,$q,Mk} from "../src/config/4439_operation.ts";
import {getPluginEditableScopes,Lje} from "./m4664.ts";
import {NP,V6,hS} from "../src/config/4438_source.ts";
import {Z6e,uJ,W_e} from "./m4435.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Lk,nI} from "./m3252.ts";
var jRl={};
isFullscreenWithTTY(jRl,{getPluginArgumentCompletions:()=>getPluginArgumentCompletions});
async function getPluginArgumentCompletions(e,t){if(e.length===0)return gft([{value:"list",description:"List installed plugins",isFinal:!0},{value:"enable",description:"Enable an installed plugin"},{value:"disable",description:"Disable an installed plugin"},{value:"install",description:"Install a plugin from a marketplace"},{value:"uninstall",description:"Remove an installed plugin"},{value:"marketplace",description:"Manage plugin marketplaces"}],t);let n=e[0]?.toLowerCase();if(e.length===1)switch(n){case"enable":case"disable":case"uninstall":{let r=vx(),o=Object.entries(r.plugins).filter(([,i])=>i.some(j0e));if(n==="enable"||n==="disable"){let i=getPluginEditableScopes(),a=n==="disable";o=o.filter(([l])=>i.has(l)===a)}let s=o.map(([i,a])=>{let l=(a.find(j0e)??a[0])?.version;return{value:i,description:bjn(l),isFinal:!0}}).sort((i,a)=>i.value.localeCompare(a.value));return gft(s,t)}case"install":case"i":{if(t.includes("/")||t.includes("\\"))return[];return gft(await clm(),t)}case"list":case"ls":return gft(ilm,t);case"marketplace":case"market":return gft(alm,t);default:return[]}if(e.length===2&&(n==="marketplace"||n==="market")){let r=e[1]?.toLowerCase();if(r==="remove"||r==="rm"||r==="update"){let o=await NP(),s=Object.entries(o).map(([i,a])=>({value:i,description:Z6e(a.source),isFinal:!0})).sort((i,a)=>i.value.localeCompare(a.value));return gft(s,t)}}return[]}
async function clm(){let e=await NP(),t=Object.keys(e).sort(),n=Le(t.map((r)=>[r,e[r]?.installLocation,e[r]?.lastUpdated]));if(Awo?.key!==n){let r=await Promise.all(t.map(async(s)=>({name:s,marketplace:await V6(s)}))),o=[];for(let{name:s,marketplace:i}of r){if(!i)continue;for(let a of i.plugins)o.push({pluginId:uJ(a.name,s),description:a.description})}o.sort((s,i)=>s.pluginId.localeCompare(i.pluginId)),Awo={key:n,candidates:o}}return Awo.candidates.filter((r)=>!$q(r.pluginId)&&!Lk(r.pluginId)).map((r)=>({value:r.pluginId,description:r.description,isFinal:!0}))}
function gft(e,t){if(!t)return e;let n=t.toLowerCase(),r=[],o=[];for(let s of e){let i=s.value.toLowerCase();if(i.startsWith(n))r.push(s);else if(i.includes(n))o.push(s)}return r.concat(o)}
var ilm,alm,Awo=null;
var WRl=b(()=>{Mk();W_e();hS();nI();Lje();Xt();ilm=[{value:"--enabled",description:"Only show enabled plugins",isFinal:!0},{value:"--disabled",description:"Only show disabled plugins",isFinal:!0}],alm=[{value:"add",description:"Add a marketplace from a URL or path"},{value:"remove",description:"Remove a known marketplace"},{value:"update",description:"Refresh a marketplace from its source"},{value:"list",description:"List known marketplaces",isFinal:!0}]});
export {jRl,getPluginArgumentCompletions,clm,gft,ilm,alm,Awo,WRl};
