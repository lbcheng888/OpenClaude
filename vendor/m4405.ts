// @ts-nocheck
import {withAllowedCommandTools,withDisallowedCommandTools,gP} from "../src/artifact/4405_withDisallowedCommandTools.ts";
import {isBypassPermissionsModeDisabled,kFe} from "../src/telemetry/2224_kFe.ts";
import {b} from "../runtime.ts";
function Fr(e){let t=e.getAppState().toolPermissionContext,n=e.permissionLayers;if(!n)return t;let r=n.findLast((o)=>o.kind==="working_directory");for(let o of n)switch(o.kind){case"allowed_tools":t=withAllowedCommandTools(t,[...o.allowedTools]);break;case"disallowed_tools":t=withDisallowedCommandTools(t,[...o.disallowedTools]);break;case"avoid_prompts":if(!t.shouldAvoidPermissionPrompts)t={...t,shouldAvoidPermissionPrompts:!0};break;case"permission_mode":{if(o.mode==="bypassPermissions"&&(isBypassPermissionsModeDisabled()||!t.isBypassPermissionsModeAvailable))break;t={...t,mode:o.mode};break}case"working_directory":if(o===r&&!t.additionalWorkingDirectories.has(o.directory))t={...t,additionalWorkingDirectories:new Map([...t.additionalWorkingDirectories,[o.directory,{path:o.directory,source:"session"}]])};break;case"effort":case"model":case"max_thinking_tokens":case"flag_settings":break}return t}
function Fh(e){let t=e.getAppState().effortValue,n=e.permissionLayers;if(!n)return t;for(let r of n)if(r.kind==="effort")t=r.effort;return t}
function DIe(e){let t=e.options.mainLoopModel;for(let n of e.permissionLayers??[])if(n.kind==="model")t=n.mainLoopModel;return t}
function jZa(e){let t=e.options.thinkingConfig;for(let n of e.permissionLayers??[])if(n.kind==="max_thinking_tokens")t=uel(n.maxThinkingTokens);return t}
function uel(e){return e===0?{type:"disabled"}:{type:"enabled",budgetTokens:e}}
function Q9n(e){return e.getAppState().ultracode===!0}
function j3t(e,t){if(t.length===0)return e;let n=e.permissionLayers?[...e.permissionLayers,...t]:[...t],r;for(let i=t.length-1;i>=0;i--){let a=t[i];if(a.kind==="model"){r=a.mainLoopModel;break}}let o;for(let i=t.length-1;i>=0;i--){let a=t[i];if(a.kind==="max_thinking_tokens"){o=uel(a.maxThinkingTokens);break}}return{...e,permissionLayers:n,...(r!==void 0||o!==void 0)&&{options:{...e.options,...r!==void 0&&{mainLoopModel:r},...o!==void 0&&{thinkingConfig:o}}}}}
var Ql=b(()=>{gP();kFe()});
export {Fr,Fh,DIe,jZa,uel,Q9n,j3t,Ql};
