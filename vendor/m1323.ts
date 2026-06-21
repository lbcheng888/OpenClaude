// @ts-nocheck
import {FMs,Uvr} from "./m1321.ts";
import {b,M} from "../runtime.ts";
import {FS} from "./m788.ts";
var jMs,WMs=(e)=>{let t;if(typeof e==="string")t=jMs.fromUtf8(e);else t=e;if(typeof t!=="object"||typeof t.byteOffset!=="number"||typeof t.byteLength!=="number")throw Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");return FMs(t.buffer,t.byteOffset,t.byteLength).toString("base64")};
var GMs=b(()=>{Uvr();jMs=M(FS(),1)});
export {jMs,WMs,GMs};
