// @ts-nocheck
import {updateLastInteractionTime,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function Pso(){updateLastInteractionTime(!0)}
function XPa(e){switch(e.type){case"user":case"bash_command":return!0;case"control_request":return Syp.has(e.request.subtype);default:return!1}}
function QPa(e){return byp.has(e.request.subtype)}
var Syp,byp;
var ZPa=b(()=>{lt();Syp=new Set(["interrupt","set_permission_mode","set_model","set_max_thinking_tokens","set_color","mcp_toggle","message_rated"]),byp=new Set(["can_use_tool","request_user_dialog","elicitation"])});
export {Pso,XPa,QPa,Syp,byp,ZPa};
