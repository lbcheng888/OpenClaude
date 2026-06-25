// @ts-nocheck
import {Q} from "../runtime.ts";
import {FCr} from "./m878.ts";
import {BS} from "./m793.ts";
var R_s=Q((tan)=>{Object.defineProperty(tan,"__esModule",{value:!0});tan.toBase64=void 0;var Qgu=FCr(),Zgu=BS(),e_u=(e)=>{let t;if(typeof e==="string")t=(0,Zgu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,Qgu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};tan.toBase64=e_u});
export {R_s};
