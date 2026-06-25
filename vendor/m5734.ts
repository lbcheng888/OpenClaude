// @ts-nocheck
import {updateLastInteractionTime,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function G$o(){updateLastInteractionTime(!0)}
function N_c(e){switch(e.type){case"user":case"bash_command":return!0;case"control_request":return bYm.has(e.request.subtype);default:return!1}}
function F_c(e){return EYm.has(e.request.subtype)}
var bYm,EYm;
var B_c=b(()=>{lt();bYm=new Set(["interrupt","set_permission_mode","set_model","set_max_thinking_tokens","set_color","mcp_toggle","message_rated"]),EYm=new Set(["can_use_tool","request_user_dialog","elicitation"])});
export {G$o,N_c,F_c,bYm,EYm,B_c};
