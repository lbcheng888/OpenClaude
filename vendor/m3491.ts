// @ts-nocheck
import {Q} from "../runtime.ts";
import {Mro} from "./m3483.ts";
var lEa=Q((WMn)=>{Object.defineProperty(WMn,"__esModule",{value:!0});WMn.JsonMetricsSerializer=void 0;var Zop=Mro();WMn.JsonMetricsSerializer={serializeRequest:(e)=>{let t=(0,Zop.createExportMetricsServiceRequest)([e],{useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {lEa};
