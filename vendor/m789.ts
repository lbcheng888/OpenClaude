// @ts-nocheck
import {X} from "../runtime.ts";
import {srn} from "./m784.ts";
import {FS} from "./m788.ts";
var pis=X((lrn)=>{Object.defineProperty(lrn,"__esModule",{value:!0});lrn.toBase64=void 0;var beu=srn(),Eeu=FS(),Ceu=(e)=>{let t;if(typeof e==="string")t=(0,Eeu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,beu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};lrn.toBase64=Ceu});
export {pis};
