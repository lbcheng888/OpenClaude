// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {invalidateWorkflowCache,QIe,j9t} from "./m4183.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Ow,R4} from "../src/agent/2214_available.ts";
var Hko={};
isFullscreenWithTTY(Hko,{invalidateWorkflowCache:()=>invalidateWorkflowCache,getWorkflowCommands:()=>getWorkflowCommands,createWorkflowCommand:()=>createWorkflowCommand});
function createWorkflowCommand(e){return{type:"prompt",name:e.name,description:e.description,hasUserSpecifiedDescription:!0,whenToUse:e.whenToUse,progressMessage:"running dynamic workflow",contentLength:e.script.length,source:e.source==="built-in"?"bundled":e.source,loadedFrom:e.source==="built-in"?"bundled":e.source==="plugin"?"plugin":"skills",...e.source==="plugin"&&{pluginInfo:{pluginManifest:e.pluginManifest,repository:e.plugin}},kind:"workflow",async getPromptForCommand(t){let n=e.phases?`

Phases:
`+e.phases.map((i)=>`- ${i.title}${i.detail?`: ${i.detail}`:""}`).join(`
`):"",r=t.trim(),o=Le(e.name),s=r?`{ name: ${o}, args: ${Le(r)} }`:`{ name: ${o} }`;return[{type:"text",text:`Run the "${e.name}" workflow.

${e.description}${e.whenToUse?`

${e.whenToUse}`:""}${n}

Invoke: Workflow(${s})`}]}}}
async function getWorkflowCommands(e){if(!Ow())return[];return(await QIe(e)).filter((n)=>!n.hidden).map(createWorkflowCommand)}
var Iko=b(()=>{Xt();j9t();R4()});
export {Hko,createWorkflowCommand,getWorkflowCommands,Iko};
