// @ts-nocheck
import {yS} from "./m3824.ts";
import {od,RE} from "../src/agent/4342_toolUseCount.ts";
import {mainAgentId,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function G6n(e,t){let n=e?t[e]:void 0,r=yS(n)?n:void 0,o=!r&&od(n)?n:void 0;return{teammate:r,localAgent:o}}
function zel({viewingAgentTaskId:e,tasks:t,transcripts:n,mainIsBusy:r,mainConversationId:o}){let{teammate:s,localAgent:i}=G6n(e,t),a=s??i;if(!a||!e){let c=n[mainAgentId()];return{task:void 0,isMain:!0,isTeammate:!1,messages:c?.messages??Vel,inProgressToolUseIDs:c?.inProgressToolUseIDs??Kel,conversationKey:o,isLoading:r}}let l=n[e];return{task:a,isMain:!1,isTeammate:!!s,messages:l?.messages??Vel,inProgressToolUseIDs:l?.inProgressToolUseIDs??Kel,conversationKey:e,isLoading:a.status==="running"&&!a.isIdle}}
var Vel,Kel;
var mgo=b(()=>{lt();RE();Vel=[],Kel=new Set});
export {G6n,zel,Vel,Kel,mgo};
