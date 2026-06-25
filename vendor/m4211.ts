// @ts-nocheck
import {getTeammateContext,b2} from "./m1462.ts";
import {cd,xS} from "./m122.ts";
import {b} from "../runtime.ts";
function r6n(e){if(e.agentId)return e.agentId;let t=getTeammateContext();return t?cd(t.agentId):void 0}
function k7a(e,t){if(e===void 0)return!0;return e===t}
function o6n(e){return e??"main session"}
var lqt=b(()=>{xS();b2()});
export {r6n,k7a,o6n,lqt};
