// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {e2l,t2l} from "./m5136.ts";
import {uWn,Qmt,Ymt,Xmt,dWn,p8e} from "../src/telemetry/4398_condition.ts";
import {Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {oe} from "./m2275.ts";
var n2l={};
ft(n2l,{call:()=>XCm});
var r2l,XCm=async(e,t,n)=>{let r=n.trim();if(r==="")return r2l.jsx(e2l,{messages:t.messages,onDone:()=>e(void 0,{display:"skip"})});if(uWn(r)){let s=Qmt(t);return e(s===null?"No goal set":`Goal cleared: ${s}`,{display:"system"}),null}if(r.length>Ymt)return Pt("goal_set","too_long"),e(`Goal condition is limited to ${Ymt} characters (got ${r.length})`,{display:"system"}),null;let o=Xmt(r,t);if(o!==null)return e(o,{display:"system"}),null;return e(`Goal set: ${r}`,{shouldQuery:!0,metaMessages:[dWn(r)]}),null};
var o2l=b(()=>{mn();t2l();p8e();r2l=x(oe(),1)});
export {n2l,r2l,XCm,o2l};
