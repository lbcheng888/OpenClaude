// @ts-nocheck
import {tKe,eC} from "./m717.ts";
import {zlt,eIe} from "../src/permissions/3913_allow.ts";
import {isModelDrivenSession,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function alc(e,t,n,r){return async(o)=>{let s=t();switch(tKe(s.mode,s.isBypassPermissionsModeAvailable)){case"allow":return!0;case"deny":return!1;case"classify":return zlt(o.host,o.port,n(),r(),s,new AbortController().signal,{isSubagentLoop:isModelDrivenSession(void 0),recordPresumed:!0});case"ask":return e(o)}}}
var llc=b(()=>{eC();eIe();Am()});
export {alc,llc};
