// @ts-nocheck
import {Zje,FS} from "./m722.ts";
import {adt,gye} from "../src/permissions/3986_editRemovalVisibility.ts";
import {isModelDrivenSession,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {b} from "../runtime.ts";
function gyc(e,t,n,r){return async(o)=>{let s=t();switch(Zje(s.mode,s.isBypassPermissionsModeAvailable)){case"allow":return!0;case"deny":return!1;case"classify":return adt(o.host,o.port,n(),r(),s,new AbortController().signal,{isSubagentLoop:isModelDrivenSession(void 0),recordPresumed:!0});case"ask":return e(o)}}}
var _yc=b(()=>{FS();gye();Op()});
export {gyc,_yc};
