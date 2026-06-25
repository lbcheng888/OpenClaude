// @ts-nocheck
import {Q} from "../runtime.ts";
import {Lro} from "./m3479.ts";
var iEa=Q(($Mn)=>{Object.defineProperty($Mn,"__esModule",{value:!0});$Mn.JsonLogsSerializer=void 0;var Xop=Lro();$Mn.JsonLogsSerializer={serializeRequest:(e)=>{let t=(0,Xop.createExportLogsServiceRequest)(e,{useHex:!0,useLongBits:!1});return new TextEncoder().encode(JSON.stringify(t))},deserializeResponse:(e)=>{if(e.length===0)return{};return JSON.parse(new TextDecoder().decode(e))}}});
export {iEa};
