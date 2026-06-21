// @ts-nocheck
import {X} from "../runtime.ts";
import {tZr} from "./m3470.ts";
var Yfa=X((QPn)=>{Object.defineProperty(QPn,"__esModule",{value:!0});QPn.JsonTraceSerializer=void 0;var fzd=tZr();QPn.JsonTraceSerializer={serializeRequest:(e)=>{let t=(0,fzd.createExportTraceServiceRequest)(e,{useHex:!0,useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {Yfa};
