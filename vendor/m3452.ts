// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var xSa=Q((bMn)=>{Object.defineProperty(bMn,"__esModule",{value:!0});bMn.createLoggingPartialSuccessResponseHandler=void 0;var Grp=xi();function Vrp(e){return Object.prototype.hasOwnProperty.call(e,"partialSuccess")}function Krp(){return{handleResponse(e){if(e==null||!Vrp(e)||e.partialSuccess==null||Object.keys(e.partialSuccess).length===0)return;Grp.diag.warn("Received Partial Success response:",JSON.stringify(e.partialSuccess))}}}bMn.createLoggingPartialSuccessResponseHandler=Krp});
export {xSa};
