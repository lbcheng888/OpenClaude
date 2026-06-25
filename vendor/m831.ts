// @ts-nocheck
import {Q} from "../runtime.ts";
import {wEr} from "./m829.ts";
import {BS} from "./m793.ts";
var rfs=Q((Sin)=>{Object.defineProperty(Sin,"__esModule",{value:!0});Sin.toBase64=void 0;var Cmu=wEr(),Amu=BS(),Rmu=(e)=>{let t;if(typeof e==="string")t=(0,Amu.fromUtf8)(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return(0,Cmu.fromArrayBuffer)(t.buffer,t.byteOffset,t.byteLength).toString("base64")};Sin.toBase64=Rmu});
export {rfs};
