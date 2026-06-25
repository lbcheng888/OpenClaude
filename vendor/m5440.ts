// @ts-nocheck
import {isAgentSwarmsEnabled,lb} from "../src/config/3314_isAgentSwarmsEnabled.ts";
import {DXl,CBo} from "./m5438.ts";
import {readTeamFile,sL} from "./m3897.ts";
import {ABo,PXl} from "./m5439.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {getDynamicTeamContext,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function LXl(e,t,{enabled:n=!0}={}){OXl.useEffect(()=>{if(!n)return;if(isAgentSwarmsEnabled()){let r=t?.[0],o=r&&"teamName"in r?r.teamName:void 0,s=r&&"agentName"in r?r.agentName:void 0;if(o&&s){DXl(e,o,s);let a=readTeamFile(o)?.members.find((l)=>l.name===s);if(a)ABo(e,getSessionId(),{teamName:o,agentId:a.agentId,agentName:s})}else{let i=getDynamicTeamContext?.();if(i?.teamName&&i?.agentId&&i?.agentName)ABo(e,getSessionId(),{teamName:i.teamName,agentId:i.agentId,agentName:i.agentName})}}},[e,t,n])}
var OXl;
var MXl=b(()=>{lt();lb();CBo();sL();PXl();Op();OXl=x(et(),1)});
export {LXl,OXl,MXl};
