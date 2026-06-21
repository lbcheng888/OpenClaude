// @ts-nocheck
import {X} from "../runtime.ts";
import {eZr} from "./m3467.ts";
var Kfa=X((JPn)=>{Object.defineProperty(JPn,"__esModule",{value:!0});JPn.JsonMetricsSerializer=void 0;var pzd=eZr();JPn.JsonMetricsSerializer={serializeRequest:(e)=>{let t=(0,pzd.createExportMetricsServiceRequest)([e],{useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {Kfa};
