// @ts-nocheck
import {isCronFeatureEnabled} from "../src/tui/3853_mode.ts";
import {XCo,Mft} from "../src/agent/4514_label.ts";
import {_Me,lr} from "./m233.ts";
import {getSessionCronTasks,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function i4l(e){let t=[];for(let n of Object.values(e)){if(!isCronFeatureEnabled(n))continue;let r={id:n.id,type:XCo[n.type]??n.type,status:n.status,description:_Me(n.description,KOo)};switch(n.type){case"local_bash":r.command=_Me(n.command,KOo);break;case"local_agent":r.agent_type=n.agentType;break;case"monitor_mcp":r.server=n.server,r.tool=n.tool;break;case"mcp_task":r.server=n.serverName,r.tool=n.toolName;break;case"local_workflow":r.name=n.workflowName;break;case"in_process_teammate":case"remote_agent":case"dream":break}t.push(r)}return t}
function a4l(e=getSessionCronTasks()){return e.map((t)=>({id:t.id,schedule:t.cron,recurring:t.recurring??!1,prompt:_Me(t.prompt,KOo)}))}
var KOo=1000;
var l4l=b(()=>{lt();Mft();lr()});
export {i4l,a4l,KOo,l4l};
