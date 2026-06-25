// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {invalidateWorkflowCache,Gxe,rqt} from "./m4196.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {hC,L2} from "../src/agent/2222_available.ts";
var $Po={};
ft($Po,{invalidateWorkflowCache:()=>invalidateWorkflowCache,getWorkflowCommands:()=>getWorkflowCommands,createWorkflowCommand:()=>createWorkflowCommand});
function createWorkflowCommand(e){return{type:"prompt",name:e.name,description:e.description,hasUserSpecifiedDescription:!0,whenToUse:e.whenToUse,progressMessage:"running dynamic workflow",contentLength:e.script.length,source:e.source==="built-in"?"bundled":e.source,loadedFrom:e.source==="built-in"?"bundled":e.source==="plugin"?"plugin":"skills",...e.source==="plugin"&&{pluginInfo:{pluginManifest:e.pluginManifest,repository:e.plugin}},kind:"workflow",async getPromptForCommand(t){let n=e.phases?`

Phases:
`+e.phases.map((i)=>`- ${i.title}${i.detail?`: ${i.detail}`:""}`).join(`
`):"",r=t.trim(),o=TeamDeleteToolName(e.name),s=r?`{ name: ${o}, args: ${TeamDeleteToolName(r)} }`:`{ name: ${o} }`;return[{type:"text",text:`Run the "${e.name}" workflow.

${e.description}${e.whenToUse?`

${e.whenToUse}`:""}${n}

Invoke: Workflow(${s})`}]}}}
async function getWorkflowCommands(e){if(!hC())return[];return(await Gxe(e)).filter((n)=>!n.hidden).map(createWorkflowCommand)}
var qPo=b(()=>{tn();rqt();L2()});
export {$Po,createWorkflowCommand,getWorkflowCommands,qPo};
