// @ts-nocheck
import {Q} from "../runtime.ts";
import {Axt} from "./m2069.ts";
import {EUr} from "./m2073.ts";
import {DTn} from "./m2072.ts";
import {PTn} from "./m2074.ts";
var RUr=Q((OTn)=>{Object.defineProperty(OTn,"__esModule",{value:!0});OTn.NoopTracer=void 0;var xnd=Axt(),cci=EUr(),CUr=DTn(),Dnd=PTn(),AUr=xnd.ContextAPI.getInstance();class uci{startSpan(e,t,n=AUr.active()){if(Boolean(t===null||t===void 0?void 0:t.root))return new CUr.NonRecordingSpan;let o=n&&(0,cci.getSpanContext)(n);if(Pnd(o)&&(0,Dnd.isSpanContextValid)(o))return new CUr.NonRecordingSpan(o);else return new CUr.NonRecordingSpan}startActiveSpan(e,t,n,r){let o,s,i;if(arguments.length<2)return;else if(arguments.length===2)i=t;else if(arguments.length===3)o=t,i=n;else o=t,s=n,i=r;let a=s!==null&&s!==void 0?s:AUr.active(),l=this.startSpan(e,o,a),c=(0,cci.setSpan)(a,l);return AUr.with(c,i,void 0,l)}}OTn.NoopTracer=uci;function Pnd(e){return typeof e==="object"&&typeof e.spanId==="string"&&typeof e.traceId==="string"&&typeof e.traceFlags==="number"}});
export {RUr};
