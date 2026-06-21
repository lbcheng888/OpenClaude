// @ts-nocheck
import {_Ds,ICr} from "./m1249.ts";
import {b,M} from "../runtime.ts";
import {FS} from "./m788.ts";
var bDs,EDs=(e)=>{let t;if(typeof e==="string")t=bDs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return _Ds(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var CDs=b(()=>{ICr();bDs=M(FS(),1)});
export {bDs,EDs,CDs};
