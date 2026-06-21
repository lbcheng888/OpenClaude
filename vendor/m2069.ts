// @ts-nocheck
import {X} from "../runtime.ts";
import {Xhn} from "./m2066.ts";
import {Zhn} from "./m2067.ts";
var egn=X((Nse)=>{Object.defineProperty(Nse,"__esModule",{value:!0});Nse.wrapSpanContext=Nse.isSpanContextValid=Nse.isValidSpanId=Nse.isValidTraceId=void 0;var dri=Xhn(),a7u=Zhn(),l7u=/^([0-9a-f]{32})$/i,c7u=/^[0-9a-f]{16}$/i;function pri(e){return l7u.test(e)&&e!==dri.INVALID_TRACEID}Nse.isValidTraceId=pri;function mri(e){return c7u.test(e)&&e!==dri.INVALID_SPANID}Nse.isValidSpanId=mri;function u7u(e){return pri(e.traceId)&&mri(e.spanId)}Nse.isSpanContextValid=u7u;function d7u(e){return new a7u.NonRecordingSpan(e)}Nse.wrapSpanContext=d7u});
export {egn};
