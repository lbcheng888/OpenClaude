// @ts-nocheck
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function wwe(e,t,n){if(typeof n!=="function")return;Object.defineProperty(e,t,{get:n,enumerable:!0,configurable:!0})}
function aNi(e){return e.endsWith(`@${V2e}`)}
function lNi(e){return S8r.get(e)}
function b8r(){let e=getSettings_DEPRECATED(),t=[],n=[];for(let[r,o]of S8r){if(o.isAvailable&&!o.isAvailable())continue;let s=`${r}@${V2e}`,i=e?.enabledPlugins?.[s],a=i!==void 0?i===!0:o.defaultEnabled??!0,l={name:r,manifest:{name:r,description:o.description,version:o.version},path:V2e,source:s,repository:s,enabled:a,isBuiltin:!0,hooksConfig:o.hooks,mcpServers:o.mcpServers};if(a)t.push(l);else n.push(l)}return{enabled:t,disabled:n}}
function cNi(){let{enabled:e}=b8r(),t=[];for(let n of e){let r=S8r.get(n.name);if(!r?.skills)continue;for(let o of r.skills)t.push(vvd(o))}return t}
function vvd(e){let t={type:"prompt",name:e.name,description:typeof e.description==="function"?"":e.description,hasUserSpecifiedDescription:!0,allowedTools:e.allowedTools??[],argumentHint:typeof e.argumentHint==="function"?void 0:e.argumentHint,whenToUse:typeof e.whenToUse==="function"?void 0:e.whenToUse,subcommands:e.subcommands,model:e.model,disableModelInvocation:e.disableModelInvocation??!1,userInvocable:e.userInvocable??!0,contentLength:0,source:"bundled",loadedFrom:"bundled",hooks:e.hooks,context:e.context,agent:e.agent,isEnabled:e.isEnabled??(()=>!0),isHidden:!(e.userInvocable??!0),progressMessage:"running",getPromptForCommand:e.getPromptForCommand};return wwe(t,"description",e.description),wwe(t,"argumentHint",e.argumentHint),wwe(t,"whenToUse",e.whenToUse),t}
var S8r,V2e="builtin";
var Bnt=b(()=>{br();S8r=new Map});
export {wwe,aNi,lNi,b8r,cNi,vvd,S8r,V2e,Bnt};
