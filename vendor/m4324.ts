// @ts-nocheck
import {b} from "../runtime.ts";
function nel(e){return e?._meta?.["claude/endTurn"]===!0}
function Lyo(e){if(e.type!=="user")return!1;let t=e.toolEndsTurn?"tool":nel(e.mcpMeta)?"mcp_meta":!1;if(!t)return!1;let n=e.message.content;if(Array.isArray(n)&&n.some((r)=>r.type==="tool_result"&&r.is_error===!0))return!1;return t}
function Myo(e,t){if(!e)return t;return nel(t)?S3p:void 0}
var S3p;
var Nyo=b(()=>{S3p=Object.freeze({_meta:Object.freeze({["claude/endTurn"]:!0})})});
export {nel,Lyo,Myo,S3p,Nyo};
