// @ts-nocheck
import {X} from "../runtime.ts";
import {Xkt} from "./m2064.ts";
import {YMr} from "./m2068.ts";
import {Zhn} from "./m2067.ts";
import {egn} from "./m2069.ts";
var QMr=X((tgn)=>{Object.defineProperty(tgn,"__esModule",{value:!0});tgn.NoopTracer=void 0;var p7u=Xkt(),fri=YMr(),JMr=Zhn(),m7u=egn(),XMr=p7u.ContextAPI.getInstance();class Ari{startSpan(e,t,n=XMr.active()){if(Boolean(t===null||t===void 0?void 0:t.root))return new JMr.NonRecordingSpan;let o=n&&(0,fri.getSpanContext)(n);if(f7u(o)&&(0,m7u.isSpanContextValid)(o))return new JMr.NonRecordingSpan(o);else return new JMr.NonRecordingSpan}startActiveSpan(e,t,n,r){let o,s,i;if(arguments.length<2)return;else if(arguments.length===2)i=t;else if(arguments.length===3)o=t,i=n;else o=t,s=n,i=r;let a=s!==null&&s!==void 0?s:XMr.active(),l=this.startSpan(e,o,a),c=(0,fri.setSpan)(a,l);return XMr.with(c,i,void 0,l)}}tgn.NoopTracer=Ari;function f7u(e){return typeof e==="object"&&typeof e.spanId==="string"&&typeof e.traceId==="string"&&typeof e.traceFlags==="number"}});
export {QMr};
