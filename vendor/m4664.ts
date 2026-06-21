// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getInitialSettings,getSettingsForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {YUe,eCn} from "./m2595.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {z3r,cP,sh} from "./m2589.ts";
import {Ygo,Sqt,Mk} from "../src/config/4439_operation.ts";
import {qp,Se,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {U0,hS} from "../src/config/4438_source.ts";
import {Pt,Go} from "./m632.ts";
import {EEt,ik} from "../src/agent/0726_level.ts";
import {Cqt,Onl,tue} from "../src/config/4442_ref.ts";
var uml={};
isFullscreenWithTTY(uml,{settingSourceToScope:()=>settingSourceToScope,isPersistableScope:()=>isPersistableScope,installSelectedPlugins:()=>installSelectedPlugins,getPluginEditableScopes:()=>getPluginEditableScopes,getInstalledPlugins:()=>getInstalledPlugins,findMissingPlugins:()=>findMissingPlugins,checkEnabledPlugins:()=>checkEnabledPlugins});
async function checkEnabledPlugins(){let e=getInitialSettings(),t=[],n=YUe();for(let[r,o]of Object.entries(n))if(r.includes("@")&&o)t.push(r);if(e.enabledPlugins)for(let[r,o]of Object.entries(e.enabledPlugins)){if(!r.includes("@"))continue;let s=t.indexOf(r);if(o){if(s===-1)t.push(r)}else if(s!==-1)t.splice(s,1)}return t}
function getPluginEditableScopes(){let e=new Map,t=YUe();for(let[r,o]of Object.entries(t)){if(!r.includes("@"))continue;if(o===!0)e.set(r,"flag");else if(o===!1)e.delete(r)}let n=[{scope:"managed",source:"policySettings"},{scope:"user",source:"userSettings"},{scope:"project",source:"projectSettings"},{scope:"local",source:"localSettings"},{scope:"flag",source:"flagSettings"}];for(let{scope:r,source:o}of n){let s=getSettingsForSource(o);if(!s?.enabledPlugins)continue;for(let[i,a]of Object.entries(s.enabledPlugins)){if(!i.includes("@"))continue;if(i in t&&t[i]!==a)logForDebugging(`Plugin ${i} from --add-dir (${t[i]}) overridden by ${o} (${a})`);if(a===!0)e.set(i,r);else if(a===!1)e.delete(i)}}return logForDebugging(`Found ${e.size} enabled plugins with scopes: ${Array.from(e.entries()).map(([r,o])=>`${r}(${o})`).join(", ")}`),e}
function isPersistableScope(e){return e!=="flag"}
function settingSourceToScope(e){return z3r[e]}
async function getInstalledPlugins(){Ygo().catch((n)=>{if(qp(n)||n instanceof SyntaxError)logForDebugging(`Plugin sync skipped (fs/parse error): ${Se(n)}`,{level:"error"});else De(n)});let e=Sqt(),t=Object.keys(e.plugins);return logForDebugging(`Found ${t.length} installed plugins`),t}
async function findMissingPlugins(e){try{let t=await getInstalledPlugins(),n=e.filter((s)=>!t.includes(s));return(await Promise.all(n.map(async(s)=>{try{let i=await U0(s);return{pluginId:s,found:i!==null&&i!==void 0}}catch(i){return logForDebugging(`Failed to check plugin ${s} in marketplace: ${i}`),{pluginId:s,found:!1}}}))).filter(({found:s})=>s).map(({pluginId:s})=>s)}catch(t){return De(t),[]}}
async function installSelectedPlugins(e,t,n="user"){let r=n!=="user"?Pt():void 0,o=cP(n),s=getSettingsForSource(o),i={...s?.enabledPlugins},a=[],l=[];for(let c=0;c<e.length;c++){let u=e[c];if(!u)continue;if(t)t(u,c+1,e.length);try{let d=await U0(u);if(!d){l.push({name:u,error:"Plugin not found in any marketplace"});continue}let{entry:p,marketplaceInstallLocation:m}=d;if(!EEt(p.source))await Cqt(u,p,n,r);else Onl({pluginId:u,installPath:lml.join(m,p.source),version:p.version},n,r);i[u]=!0,a.push(u)}catch(d){let p=d instanceof Error?d.message:String(d);l.push({name:u,error:p}),logForDebugging(`Failed to install plugin ${u}: ${p}`,{level:"error"})}}return updateSettingsForSource(o,{...s,enabledPlugins:i}),{installed:a,failed:l}}
var lml;
var Lje=b(()=>{Go();qe();bt();Rn();yr();eCn();Mk();hS();sh();tue();ik();lml=require("path")});
export {uml,checkEnabledPlugins,getPluginEditableScopes,isPersistableScope,settingSourceToScope,getInstalledPlugins,findMissingPlugins,installSelectedPlugins,lml,Lje};
