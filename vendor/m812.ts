// @ts-nocheck
import {Q} from "../runtime.ts";
import {eEr} from "./m810.ts";
import {BS} from "./m793.ts";
var Pps=Q((tin)=>{Object.defineProperty(tin,"__esModule",{value:!0});tin.toBase64=void 0;var kdu=eEr(),Hdu=BS(),Idu=(e)=>{let t;if(typeof e==="string")t=(0,Hdu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,kdu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};tin.toBase64=Idu});
export {Pps};
