// @ts-nocheck
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function Wwe(e,t,n){if(typeof n!=="function")return;Object.defineProperty(e,t,{get:n,enumerable:!0,configurable:!0})}
function k0i(e){return e.endsWith(`@${GUe}`)}
function H0i(e){return j3r.get(e)}
function W3r(){let e=getSettings_DEPRECATED(),t=[],n=[];for(let[r,o]of j3r){if(o.isAvailable&&!o.isAvailable())continue;let s=`${r}@${GUe}`,i=e?.enabledPlugins?.[s],a=i!==void 0?i===!0:o.defaultEnabled??!0,l={name:r,manifest:{name:r,description:o.description,version:o.version},path:GUe,source:s,repository:s,enabled:a,isBuiltin:!0,hooksConfig:o.hooks,mcpServers:o.mcpServers};if(a)t.push(l);else n.push(l)}return{enabled:t,disabled:n}}
function I0i(){let{enabled:e}=W3r(),t=[];for(let n of e){let r=j3r.get(n.name);if(!r?.skills)continue;for(let o of r.skills)t.push(ehd(o))}return t}
function ehd(e){let t={type:"prompt",name:e.name,description:typeof e.description==="function"?"":e.description,hasUserSpecifiedDescription:!0,allowedTools:e.allowedTools??[],argumentHint:typeof e.argumentHint==="function"?void 0:e.argumentHint,whenToUse:typeof e.whenToUse==="function"?void 0:e.whenToUse,subcommands:e.subcommands,model:e.model,disableModelInvocation:e.disableModelInvocation??!1,userInvocable:e.userInvocable??!0,contentLength:0,source:"bundled",loadedFrom:"bundled",hooks:e.hooks,context:e.context,agent:e.agent,isEnabled:e.isEnabled??(()=>!0),isHidden:!(e.userInvocable??!0),progressMessage:"running",getPromptForCommand:e.getPromptForCommand};return Wwe(t,"description",e.description),Wwe(t,"argumentHint",e.argumentHint),Wwe(t,"whenToUse",e.whenToUse),t}
var j3r,GUe="builtin";
var Oet=b(()=>{yr();j3r=new Map});
export {Wwe,k0i,H0i,W3r,I0i,ehd,j3r,GUe,Oet};
