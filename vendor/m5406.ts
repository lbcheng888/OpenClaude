// @ts-nocheck
import {isAgentSwarmsEnabled,cb} from "../src/config/3298_isAgentSwarmsEnabled.ts";
import {z5l,nLo} from "./m5404.ts";
import {readTeamFile,BL} from "./m3879.ts";
import {rLo,Y5l} from "./m5405.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {getDynamicTeamContext,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function X5l(e,t,{enabled:n=!0}={}){J5l.useEffect(()=>{if(!n)return;if(isAgentSwarmsEnabled()){let r=t?.[0],o=r&&"teamName"in r?r.teamName:void 0,s=r&&"agentName"in r?r.agentName:void 0;if(o&&s){z5l(e,o,s);let a=readTeamFile(o)?.members.find((l)=>l.name===s);if(a)rLo(e,getSessionId(),{teamName:o,agentId:a.agentId,agentName:s})}else{let i=getDynamicTeamContext?.();if(i?.teamName&&i?.agentId&&i?.agentName)rLo(e,getSessionId(),{teamName:i.teamName,agentId:i.agentId,agentName:i.agentName})}}},[e,t,n])}
var J5l;
var Q5l=b(()=>{lt();cb();nLo();BL();Y5l();Am();J5l=M(Te(),1)});
export {X5l,J5l,Q5l};
