// @ts-nocheck
import {Q} from "../runtime.ts";
import {rps} from "./m792.ts";
var BS=Q((Gsn)=>{var ops=rps(),sps=(e)=>{let t=ops.fromString(e,"utf8");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength/Uint8Array.BYTES_PER_ELEMENT)},Muu=(e)=>{if(typeof e==="string")return sps(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)},Nuu=(e)=>{if(typeof e==="string")return e;if(typeof e!=="object"||typeof e.byteOffset!=="number"||typeof e.byteLength!=="number")throw Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");return ops.fromArrayBuffer(e.buffer,e.byteOffset,e.byteLength).toString("utf8")};Gsn.fromUtf8=sps;Gsn.toUint8Array=Muu;Gsn.toUtf8=Nuu});
export {BS};
