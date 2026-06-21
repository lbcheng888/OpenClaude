// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Cn,dr} from "./m231.ts";
import {jb,dd,Dd} from "./m687.ts";
import {JRl,XRl,vye,RVn} from "../src/telemetry/4974_enabled.ts";
import {sye,CDe} from "./m4665.ts";
import {jie,HAe} from "./m2596.ts";
import {lt} from "../src/session/0131_sent.ts";
import {hwo} from "./m4972.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {eae} from "./m2666.ts";
var QRl={};
isFullscreenWithTTY(QRl,{call:()=>hlm});
function kJ(e,t){return`${e} ${Cn(e,t)}`}
function glm(e){let t=[...e.added,...e.removed],[n]=t;return`This reload changes MCP tools (${t.length===1&&n!==void 0?n.split(":").slice(2).join(":")||n:`${t.length} MCP servers`}) \u2014 your next message will re-read `+"the whole conversation instead of using the cache. Run /reload-plugins --force to apply."}
var hlm=async(e,t)=>{if(jb()){let u=await dd().sendControlRequest({subtype:"reload_plugins"}),p=`Reloaded on remote: ${[kJ(u.plugins.length,"plugin"),kJ(u.commands.length,"skill"),kJ(u.agents.length,"agent"),kJ(u.mcpServers.length,"plugin MCP server")].join(" \xB7 ")}`;if(u.error_count>0)p+=`
${kJ(u.error_count,"error")} during load. Run /doctor on the remote for details.`;return{type:"text",value:p}}let n=e.trim().split(/\s+/).some((u)=>u==="--force"||u==="force"),r=await JRl({model:t.options.mainLoopModel,mcpClients:t.getAppState().mcp.clients,dynamicMcpConfig:t.options.dynamicMcpConfig}),o=r.wouldInvalidateCache&&!n;if(XRl(r,{warned:o,forced:n}),o)return{type:"text",value:glm({added:r.mcpServersAdded,removed:r.mcpServersRemoved})};let s=await vye(t.setAppState),i="",a=await sye(s.errors);if(a.installed.length>0)i=`${jie(a.installed)} resolved`,s=await vye(t.setAppState);let c=`Reloaded: ${[kJ(s.enabled_count,"plugin"),kJ(s.command_count,"skill"),kJ(s.agent_count,"agent"),kJ(s.hook_count,"hook"),kJ(s.mcp_count,"plugin MCP server"),kJ(s.lsp_count,"plugin LSP server")].join(" \xB7 ")}${i}`;if(s.error_count>0)c+=`
${kJ(s.error_count,"error")} during load. Run /doctor for details.`;return{type:"text",value:c}};
var ZRl=b(()=>{lt();Dd();hwo();sn();HAe();CDe();RVn();eae();dr()});
export {QRl,kJ,glm,hlm,ZRl};
