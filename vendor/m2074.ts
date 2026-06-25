// @ts-nocheck
import {Q} from "../runtime.ts";
import {ITn} from "./m2071.ts";
import {DTn} from "./m2072.ts";
var PTn=Q((Nse)=>{Object.defineProperty(Nse,"__esModule",{value:!0});Nse.wrapSpanContext=Nse.isSpanContextValid=Nse.isValidSpanId=Nse.isValidTraceId=void 0;var ici=ITn(),vnd=DTn(),wnd=/^([0-9a-f]{32})$/i,knd=/^[0-9a-f]{16}$/i;function aci(e){return wnd.test(e)&&e!==ici.INVALID_TRACEID}Nse.isValidTraceId=aci;function lci(e){return knd.test(e)&&e!==ici.INVALID_SPANID}Nse.isValidSpanId=lci;function Hnd(e){return aci(e.traceId)&&lci(e.spanId)}Nse.isSpanContextValid=Hnd;function Ind(e){return new vnd.NonRecordingSpan(e)}Nse.wrapSpanContext=Ind});
export {PTn};
