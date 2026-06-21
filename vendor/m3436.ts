// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var hma=X((xPn)=>{Object.defineProperty(xPn,"__esModule",{value:!0});xPn.createLoggingPartialSuccessResponseHandler=void 0;var rKd=Xi();function oKd(e){return Object.prototype.hasOwnProperty.call(e,"partialSuccess")}function sKd(){return{handleResponse(e){if(e==null||!oKd(e)||e.partialSuccess==null||Object.keys(e.partialSuccess).length===0)return;rKd.diag.warn("Received Partial Success response:",JSON.stringify(e.partialSuccess))}}}xPn.createLoggingPartialSuccessResponseHandler=sKd});
export {hma};
