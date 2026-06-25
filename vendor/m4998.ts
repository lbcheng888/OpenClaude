// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Uw,BDe,qGn,rq,rH} from "../src/config/4461_operation.ts";
import {getPluginEditableScopes,mWe} from "./m4693.ts";
import {tP,d6,dS} from "../src/config/4460_source.ts";
import {v8e,KY,dTe} from "./m4457.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {nH,II} from "./m3268.ts";
var cLl={};
ft(cLl,{getPluginArgumentCompletions:()=>getPluginArgumentCompletions});
async function getPluginArgumentCompletions(e,t){if(e.length===0)return Dgt([{value:"list",description:"List installed plugins",isFinal:!0},{value:"enable",description:"Enable an installed plugin"},{value:"disable",description:"Disable an installed plugin"},{value:"install",description:"Install a plugin from a marketplace"},{value:"uninstall",description:"Remove an installed plugin"},{value:"marketplace",description:"Manage plugin marketplaces"}],t);let n=e[0]?.toLowerCase();if(e.length===1)switch(n){case"enable":case"disable":case"uninstall":{let r=Uw(),o=Object.entries(r.plugins).filter(([,i])=>i.some(BDe));if(n==="enable"||n==="disable"){let i=getPluginEditableScopes(),a=n==="disable";o=o.filter(([l])=>i.has(l)===a)}let s=o.map(([i,a])=>{let l=(a.find(BDe)??a[0])?.version;return{value:i,description:qGn(l),isFinal:!0}}).sort((i,a)=>i.value.localeCompare(a.value));return Dgt(s,t)}case"install":case"i":{if(t.includes("/")||t.includes("\\"))return[];return Dgt(await b_m(),t)}case"list":case"ls":return Dgt(y_m,t);case"marketplace":case"market":return Dgt(T_m,t);default:return[]}if(e.length===2&&(n==="marketplace"||n==="market")){let r=e[1]?.toLowerCase();if(r==="remove"||r==="rm"||r==="update"){let o=await tP(),s=Object.entries(o).map(([i,a])=>({value:i,description:v8e(a.source),isFinal:!0})).sort((i,a)=>i.value.localeCompare(a.value));return Dgt(s,t)}}return[]}
async function b_m(){let e=await tP(),t=Object.keys(e).sort(),n=TeamDeleteToolName(t.map((r)=>[r,e[r]?.installLocation,e[r]?.lastUpdated]));if(k0o?.key!==n){let r=await Promise.all(t.map(async(s)=>({name:s,marketplace:await d6(s)}))),o=[];for(let{name:s,marketplace:i}of r){if(!i)continue;for(let a of i.plugins)o.push({pluginId:KY(a.name,s),description:a.description})}o.sort((s,i)=>s.pluginId.localeCompare(i.pluginId)),k0o={key:n,candidates:o}}return k0o.candidates.filter((r)=>!rq(r.pluginId)&&!nH(r.pluginId)).map((r)=>({value:r.pluginId,description:r.description,isFinal:!0}))}
function Dgt(e,t){if(!t)return e;let n=t.toLowerCase(),r=[],o=[];for(let s of e){let i=s.value.toLowerCase();if(i.startsWith(n))r.push(s);else if(i.includes(n))o.push(s)}return r.concat(o)}
var y_m,T_m,k0o=null;
var uLl=b(()=>{rH();dTe();dS();II();mWe();tn();y_m=[{value:"--enabled",description:"Only show enabled plugins",isFinal:!0},{value:"--disabled",description:"Only show disabled plugins",isFinal:!0}],T_m=[{value:"add",description:"Add a marketplace from a URL or path"},{value:"remove",description:"Remove a known marketplace"},{value:"update",description:"Refresh a marketplace from its source"},{value:"list",description:"List known marketplaces",isFinal:!0}]});
export {cLl,getPluginArgumentCompletions,b_m,Dgt,y_m,T_m,k0o,uLl};
