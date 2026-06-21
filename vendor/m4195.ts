// @ts-nocheck
import {getTeammateContext,Q2} from "./m1457.ts";
import {Rm,zE} from "./m125.ts";
import {b} from "../runtime.ts";
function Z9n(e){if(e.agentId)return e.agentId;let t=getTeammateContext();return t?Rm(t.agentId):void 0}
function hja(e,t){if(e===void 0)return!0;return e===t}
function e3n(e){return e??"main session"}
var K9t=b(()=>{zE();Q2()});
export {Z9n,hja,e3n,K9t};
