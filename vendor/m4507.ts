// @ts-nocheck
import {getTeamName,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function Bdl(e){if(getTeamName())return;return e.standaloneAgentContext?.name}
function bVn(e,t){let n=e.standaloneAgentContext;if(!Object.keys(t).some((o)=>n?.[o]!==t[o]))return e;return{...e,standaloneAgentContext:{...n,name:n?.name??"",...t}}}
var EVn=b(()=>{Op()});
export {Bdl,bVn,EVn};
