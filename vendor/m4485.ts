// @ts-nocheck
import {getTeamName,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function Qol(e){if(getTeamName())return;return e.standaloneAgentContext?.name}
function e8n(e,t){let n=e.standaloneAgentContext;if(!Object.keys(t).some((o)=>n?.[o]!==t[o]))return e;return{...e,standaloneAgentContext:{...n,name:n?.name??"",...t}}}
var t8n=b(()=>{Am()});
export {Qol,e8n,t8n};
