// @ts-nocheck
import {X} from "../runtime.ts";
import {ZQr} from "./m3463.ts";
var Gfa=X((zPn)=>{Object.defineProperty(zPn,"__esModule",{value:!0});zPn.JsonLogsSerializer=void 0;var uzd=ZQr();zPn.JsonLogsSerializer={serializeRequest:(e)=>{let t=(0,uzd.createExportLogsServiceRequest)(e,{useHex:!0,useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {Gfa};
