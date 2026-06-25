// @ts-nocheck
import {mS} from "./m3842.ts";
import {rc,hS} from "../src/agent/4362_toolUseCount.ts";
import {mainAgentId,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function uGn(e,t){let n=e?t[e]:void 0,r=mS(n)?n:void 0,o=!r&&rc(n)?n:void 0;return{teammate:r,localAgent:o}}
function Mal({viewingAgentTaskId:e,tasks:t,transcripts:n,mainIsBusy:r,mainConversationId:o}){let{teammate:s,localAgent:i}=uGn(e,t),a=s??i;if(!a||!e){let c=n[mainAgentId()];return{task:void 0,isMain:!0,isTeammate:!1,messages:c?.messages??Oal,inProgressToolUseIDs:c?.inProgressToolUseIDs??Lal,conversationKey:o,isLoading:r}}let l=n[e];return{task:a,isMain:!1,isTeammate:!!s,messages:l?.messages??Oal,inProgressToolUseIDs:l?.inProgressToolUseIDs??Lal,conversationKey:e,isLoading:a.status==="running"&&!a.isIdle}}
var Oal,Lal;
var iEo=b(()=>{lt();hS();Oal=[],Lal=new Set});
export {uGn,Mal,Oal,Lal,iEo};
