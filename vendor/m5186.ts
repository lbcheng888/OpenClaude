// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {Kd} from "./m4092.ts";
import {getMcpClientsFromAccessor,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {zD,lxe} from "./m3979.ts";
import {VU,Qy} from "../src/tools/0325_ttl.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function Ckm(e,t){let n=(o)=>{let s=t;for(let i of o.split(".")){if(s==null||typeof s!=="object")return;s=s[i]}return s},r=(o)=>{if(typeof o==="string")return o.replace(/\$\{([a-zA-Z_][a-zA-Z0-9_.]*)\}/g,(s,i)=>{let a=n(i);if(a===void 0||a===null)return"";return typeof a==="object"?TeamDeleteToolName(a):String(a)});if(Array.isArray(o))return o.map(r);if(o!==null&&typeof o==="object"){let s={};for(let[i,a]of Object.entries(o))s[i]=r(a);return s}return o};return r(e)}
async function GOo(e,t,n,r,o,s=Kd){let i=r??getMcpClientsFromAccessor();if(i===void 0){let p=`mcp_tool hooks are not available for the '${t}' hook event (no MCP client context)`;return logForDebugging(`Hooks: mcp_tool hook skipped \u2014 ${p}`,{level:"warn"}),{ok:!1,body:"",error:p}}let a=i.find((p)=>p.name===e.server);if(!a||a.type!=="connected"){let p=`MCP server '${e.server}' not connected`;return logForDebugging(`Hooks: mcp_tool hook skipped \u2014 ${p}`,{level:"warn"}),{ok:!1,body:"",error:p}}let l=e.input?Ckm(e.input,n):{},c=e.timeout?e.timeout*1000:s,{signal:u,cleanup:d}=zD(o,{timeoutMs:c});try{logForDebugging(`Hooks: mcp_tool calling ${e.server}/${e.tool} with ${Object.keys(l).length} arg(s)`);let p=await a.client.callTool({name:e.tool,arguments:l},VU,{signal:u,timeout:c});d();let m=Array.isArray(p.content)?p.content.map((f)=>f.type==="text"?f.text:`[${f.type}]`).join(`
`):"";if(p.isError)return{ok:!1,body:m,error:m||"MCP tool returned an error"};return{ok:!0,body:m}}catch(p){if(d(),u.aborted)return{ok:!1,body:"",aborted:!0};let m=Ce(p);return logForDebugging(`Hooks: mcp_tool hook error: ${m}`,{level:"error"}),{ok:!1,body:"",error:m}}}
var Y3l=b(()=>{Qy();lt();lxe();qe();Ct();tn()});
export {Ckm,GOo,Y3l};
