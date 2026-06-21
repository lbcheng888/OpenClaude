// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {allTools,lo} from "../src/tools/5190_userPromptCount.ts";
import {k6n,H6n} from "../src/permissions/4412_level.ts";
import {S6t,mTo} from "../src/core/4558_categories.ts";
var fTo={};
isFullscreenWithTTY(fTo,{collectContextData:()=>collectContextData,call:()=>fVp});
async function collectContextData(e){let{messages:t,getAppState:n,options:{mainLoopModel:r,tools:o,agentDefinitions:s,customSystemPrompt:i,appendSystemPrompt:a,excludeDynamicSections:l}}=e,c=allTools(t),u=n();return k6n(c,r,async()=>u.toolPermissionContext,o,s,void 0,{options:{customSystemPrompt:i,appendSystemPrompt:a}},void 0,c,u.autoCompactWindow,l)}
async function fVp(e,t){let n=await collectContextData(t);return{type:"text",value:S6t(n)}}
var C6t=b(()=>{H6n();lo();mTo()});
export {fTo,collectContextData,fVp,C6t};
