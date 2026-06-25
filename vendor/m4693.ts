// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getInitialSettings,getSettingsForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Y2e,Gvn} from "./m2606.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {R8r,AD,oh} from "./m2600.ts";
import {WEo,z5t,rH} from "../src/config/4461_operation.ts";
import {sp,Ce,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {Z0,dS} from "../src/config/4460_source.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {JRt,bk} from "../src/agent/0731_level.ts";
import {J5t,Scl,Qce} from "../src/config/4464_ref.ts";
var ebl={};
ft(ebl,{settingSourceToScope:()=>settingSourceToScope,isPersistableScope:()=>isPersistableScope,installSelectedPlugins:()=>installSelectedPlugins,getPluginEditableScopes:()=>getPluginEditableScopes,getInstalledPlugins:()=>getInstalledPlugins,findMissingPlugins:()=>findMissingPlugins,checkEnabledPlugins:()=>checkEnabledPlugins});
async function checkEnabledPlugins(){let e=getInitialSettings(),t=[],n=Y2e();for(let[r,o]of Object.entries(n))if(r.includes("@")&&o)t.push(r);if(e.enabledPlugins)for(let[r,o]of Object.entries(e.enabledPlugins)){if(!r.includes("@"))continue;let s=t.indexOf(r);if(o){if(s===-1)t.push(r)}else if(s!==-1)t.splice(s,1)}return t}
function getPluginEditableScopes(){let e=new Map,t=Y2e();for(let[r,o]of Object.entries(t)){if(!r.includes("@"))continue;if(o===!0)e.set(r,"flag");else if(o===!1)e.delete(r)}let n=[{scope:"managed",source:"policySettings"},{scope:"user",source:"userSettings"},{scope:"project",source:"projectSettings"},{scope:"local",source:"localSettings"},{scope:"flag",source:"flagSettings"}];for(let{scope:r,source:o}of n){let s=getSettingsForSource(o);if(!s?.enabledPlugins)continue;for(let[i,a]of Object.entries(s.enabledPlugins)){if(!i.includes("@"))continue;if(i in t&&t[i]!==a)logForDebugging(`Plugin ${i} from --add-dir (${t[i]}) overridden by ${o} (${a})`);if(a===!0)e.set(i,r);else if(a===!1)e.delete(i)}}return logForDebugging(`Found ${e.size} enabled plugins with scopes: ${Array.from(e.entries()).map(([r,o])=>`${r}(${o})`).join(", ")}`),e}
function isPersistableScope(e){return e!=="flag"}
function settingSourceToScope(e){return R8r[e]}
async function getInstalledPlugins(){WEo().catch((n)=>{if(sp(n)||n instanceof SyntaxError)logForDebugging(`Plugin sync skipped (fs/parse error): ${Ce(n)}`,{level:"error"});else Ie(n)});let e=z5t(),t=Object.keys(e.plugins);return logForDebugging(`Found ${t.length} installed plugins`),t}
async function findMissingPlugins(e){try{let t=await getInstalledPlugins(),n=e.filter((s)=>!t.includes(s));return(await Promise.all(n.map(async(s)=>{try{let i=await Z0(s);return{pluginId:s,found:i!==null&&i!==void 0}}catch(i){return logForDebugging(`Failed to check plugin ${s} in marketplace: ${i}`),{pluginId:s,found:!1}}}))).filter(({found:s})=>s).map(({pluginId:s})=>s)}catch(t){return Ie(t),[]}}
async function installSelectedPlugins(e,t,n="user"){let r=n!=="user"?isTmuxControlMode():void 0,o=AD(n),s=getSettingsForSource(o),i={...s?.enabledPlugins},a=[],l=[];for(let c=0;c<e.length;c++){let u=e[c];if(!u)continue;if(t)t(u,c+1,e.length);try{let d=await Z0(u);if(!d){l.push({name:u,error:"Plugin not found in any marketplace"});continue}let{entry:p,marketplaceInstallLocation:m}=d;if(!JRt(p.source))await J5t(u,p,n,r);else Scl({pluginId:u,installPath:QSl.join(m,p.source),version:p.version},n,r);i[u]=!0,a.push(u)}catch(d){let p=d instanceof Error?d.message:String(d);l.push({name:u,error:p}),logForDebugging(`Failed to install plugin ${u}: ${p}`,{level:"error"})}}return ao(o,{...s,enabledPlugins:i}),{installed:a,failed:l}}
var QSl;
var mWe=b(()=>{Po();qe();Ct();vn();br();Gvn();rH();dS();oh();Qce();bk();QSl=require("path")});
export {ebl,checkEnabledPlugins,getPluginEditableScopes,isPersistableScope,settingSourceToScope,getInstalledPlugins,findMissingPlugins,installSelectedPlugins,QSl,mWe};
