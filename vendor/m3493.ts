// @ts-nocheck
import {Q} from "../runtime.ts";
import {Nro} from "./m3486.ts";
var uEa=Q((VMn)=>{Object.defineProperty(VMn,"__esModule",{value:!0});VMn.JsonTraceSerializer=void 0;var tsp=Nro();VMn.JsonTraceSerializer={serializeRequest:(e)=>{let t=(0,tsp.createExportTraceServiceRequest)(e,{useHex:!0,useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {uEa};
