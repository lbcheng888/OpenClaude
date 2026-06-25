// @ts-nocheck
import {HNe,Foe} from "./m1191.ts";
import {b} from "../runtime.ts";
var W7s=(e)=>{if(typeof e==="string")return e;if(typeof e!=="object"||typeof e.byteOffset!=="number"||typeof e.byteLength!=="number")throw Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");return HNe(e.buffer,e.byteOffset,e.byteLength).toString("utf8")};
var G7s=b(()=>{Foe()});
export {W7s,G7s};
