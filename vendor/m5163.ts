// @ts-nocheck
import {enforcementWarnDedup} from "../src/tui/3835_mode.ts";
import {ryo,Lpt} from "../src/agent/4492_label.ts";
import {CLe,dr} from "./m231.ts";
import {getSessionCronTasks,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function b1l(e){let t=[];for(let n of Object.values(e)){if(!enforcementWarnDedup(n))continue;let r={id:n.id,type:ryo[n.type]??n.type,status:n.status,description:CLe(n.description,DHo)};switch(n.type){case"local_bash":r.command=CLe(n.command,DHo);break;case"local_agent":r.agent_type=n.agentType;break;case"monitor_mcp":r.server=n.server,r.tool=n.tool;break;case"mcp_task":r.server=n.serverName,r.tool=n.toolName;break;case"local_workflow":r.name=n.workflowName;break;case"in_process_teammate":case"remote_agent":case"dream":break}t.push(r)}return t}
function E1l(e=getSessionCronTasks()){return e.map((t)=>({id:t.id,schedule:t.cron,recurring:t.recurring??!1,prompt:CLe(t.prompt,DHo)}))}
var DHo=1000;
var C1l=b(()=>{lt();Lpt();dr()});
export {b1l,E1l,DHo,C1l};
