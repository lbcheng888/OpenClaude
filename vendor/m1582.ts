// @ts-nocheck
import {M1e,Uoe} from "./m1186.ts";
import {b} from "../runtime.ts";
var zjs=(e)=>{if(typeof e==="string")return e;if(typeof e!=="object"||typeof e.byteOffset!=="number"||typeof e.byteLength!=="number")throw Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");return M1e(e.buffer,e.byteOffset,e.byteLength).toString("utf8")};
var Yjs=b(()=>{Uoe()});
export {zjs,Yjs};
