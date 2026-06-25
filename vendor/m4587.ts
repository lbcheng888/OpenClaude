// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {P_,po} from "../src/tools/5224_userPromptCount.ts";
import {jWn,YWn} from "../src/permissions/4434_level.ts";
import {Y8t,vRo} from "../src/core/4586_categories.ts";
var kRo={};
ft(kRo,{collectContextData:()=>collectContextData,call:()=>yem});
async function collectContextData(e){let{messages:t,getAppState:n,options:{mainLoopModel:r,tools:o,agentDefinitions:s,customSystemPrompt:i,appendSystemPrompt:a,excludeDynamicSections:l}}=e,c=P_(t),u=n();return jWn(c,r,async()=>u.toolPermissionContext,o,s,void 0,{options:{customSystemPrompt:i,appendSystemPrompt:a}},void 0,c,u.autoCompactWindow,l)}
async function yem(e,t){let n=await collectContextData(t);return{type:"text",value:Y8t(n)}}
var X8t=b(()=>{YWn();po();vRo()});
export {kRo,collectContextData,yem,X8t};
