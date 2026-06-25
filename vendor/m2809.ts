// @ts-nocheck
import {ac} from "../src/mcp/0733_serverName.ts";
import {Ta,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function EWi(e){ajr=e}
function CWi(e){ljr=e}
function AWi(){if(!ajr||!ljr)throw Error("MCP skill builders not registered \u2014 loadSkillsDir.ts / client.ts have not been evaluated yet");return{...ajr,...ljr}}
var ajr=null,ljr=null;
function cjr(e,t){let n=e.filter((o)=>o.name===t);if(n.length>0)return n;let r=ac(t);return e.filter((o)=>ac(o.name)===r)}
function BIn(e,t){let[n]=cjr(e,t);if(!n)throw new Ta(`Server "${t}" not found. Available servers: ${e.map((r)=>r.name).join(", ")}`,"MCP server not found");if(n.type!=="connected")throw new Ta(`Server "${n.name}" is not connected`,"MCP server not connected");if(!n.capabilities?.resources)throw new Ta(`Server "${n.name}" does not support resources`,"MCP server has no resources capability");return n}
var UIn=b(()=>{Ct()});
export {EWi,CWi,AWi,ajr,ljr,cjr,BIn,UIn};
