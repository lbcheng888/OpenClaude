// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {vPl,wPl} from "./m5106.ts";
import {Gqn,Qdt,Ydt,Xdt,Vqn,F6e} from "../src/telemetry/4376_condition.ts";
import {isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {Te} from "./m2253.ts";
var xPl={};
isFullscreenWithTTY(xPl,{call:()=>Ufm});
var RPl,Ufm=async(e,t,n)=>{let r=n.trim();if(r==="")return RPl.default.createElement(vPl,{messages:t.messages,onDone:()=>e(void 0,{display:"skip"})});if(Gqn(r)){let s=Qdt(t);return e(s===null?"No goal set":`Goal cleared: ${s}`,{display:"system"}),null}if(r.length>Ydt)return isTmuxControlMode("goal_set","too_long"),e(`Goal condition is limited to ${Ydt} characters (got ${r.length})`,{display:"system"}),null;let o=Xdt(r,t);if(o!==null)return e(o,{display:"system"}),null;return e(`Goal set: ${r}`,{shouldQuery:!0,metaMessages:[Vqn(r)]}),null};
var kPl=b(()=>{ln();wPl();F6e();RPl=M(Te(),1)});
export {xPl,RPl,Ufm,kPl};
