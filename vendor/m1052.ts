// @ts-nocheck
import {rCs,ebr} from "./m1050.ts";
import {b,M} from "../runtime.ts";
import {FS} from "./m788.ts";
var aCs,lCs=(e)=>{let t;if(typeof e==="string")t=aCs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return rCs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var cCs=b(()=>{ebr();aCs=M(FS(),1)});
export {aCs,lCs,cCs};
