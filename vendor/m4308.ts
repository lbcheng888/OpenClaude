// @ts-nocheck
import {b} from "../runtime.ts";
function Xqt(e){if(e.type!=="user")return!1;let t=e.message?.content;if(typeof t==="string")return PQa.some((n)=>t.startsWith(n));if(!Array.isArray(t))return!1;return t.length>0&&t.every((n)=>{let r=n.type==="text"?n.text:n.type==="tool_result"&&n.is_error===!0?n.content:void 0;return typeof r==="string"&&PQa.some((o)=>r.startsWith(o))})}
var J$="[Request interrupted by user]",Lw="[Request interrupted by user for tool use]",AY="The user doesn't want to take this action right now. STOP what you are doing and wait for the user to tell you how to proceed.",PQa;
var E5n=b(()=>{PQa=["[Request interrupted by user]","[Request interrupted by user for tool use]","The user doesn't want to take this action right now. STOP what you are doing and wait for the user to tell you how to proceed."]});
export {Xqt,J$,Lw,AY,PQa,E5n};
