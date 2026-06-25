// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Sn,lr} from "./m233.ts";
import {Ub,Nu,Wu} from "./m438.ts";
import {gLl,_Ll,eSe,TYn} from "../src/telemetry/5004_enabled.ts";
import {ITe,bPe} from "./m4694.ts";
import {Uie,Whe} from "./m2607.ts";
import {lt} from "../src/session/0132_sent.ts";
import {H0o} from "./m5002.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {Xie} from "./m2677.ts";
var yLl={};
ft(yLl,{call:()=>k_m});
function SJ(e,t){return`${e} ${Sn(e,t)}`}
function H_m(e){let t=[...e.added,...e.removed],[n]=t;return`This reload changes MCP tools (${t.length===1&&n!==void 0?n.split(":").slice(2).join(":")||n:`${t.length} MCP servers`}) \u2014 your next message will re-read `+"the whole conversation instead of using the cache. Run /reload-plugins --force to apply."}
var k_m=async(e,t)=>{if(Ub()){let u=await Nu().sendControlRequest({subtype:"reload_plugins"}),p=`Reloaded on remote: ${[SJ(u.plugins.length,"plugin"),SJ(u.commands.length,"skill"),SJ(u.agents.length,"agent"),SJ(u.mcpServers.length,"plugin MCP server")].join(" \xB7 ")}`;if(u.error_count>0)p+=`
${SJ(u.error_count,"error")} during load. Run /doctor on the remote for details.`;return{type:"text",value:p}}let n=e.trim().split(/\s+/).some((u)=>u==="--force"||u==="force"),r=await gLl({model:t.options.mainLoopModel,mcpClients:t.getAppState().mcp.clients,dynamicMcpConfig:t.options.dynamicMcpConfig}),o=r.wouldInvalidateCache&&!n;if(_Ll(r,{warned:o,forced:n}),o)return{type:"text",value:H_m({added:r.mcpServersAdded,removed:r.mcpServersRemoved})};let s=await eSe(t.setAppState),i="",a=await ITe(s.errors);if(a.installed.length>0)i=`${Uie(a.installed)} resolved`,s=await eSe(t.setAppState);let c=`Reloaded: ${[SJ(s.enabled_count,"plugin"),SJ(s.command_count,"skill"),SJ(s.agent_count,"agent"),SJ(s.hook_count,"hook"),SJ(s.mcp_count,"plugin MCP server"),SJ(s.lsp_count,"plugin LSP server")].join(" \xB7 ")}${i}`;if(s.error_count>0)c+=`
${SJ(s.error_count,"error")} during load. Run /doctor for details.`;return{type:"text",value:c}};
var TLl=b(()=>{lt();Wu();H0o();dn();Whe();bPe();TYn();Xie();lr()});
export {yLl,SJ,H_m,k_m,TLl};
