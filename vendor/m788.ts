// @ts-nocheck
import {X} from "../runtime.ts";
import {cis} from "./m787.ts";
var FS=X((arn)=>{var uis=cis(),dis=(e)=>{let t=uis.fromString(e,"utf8");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength/Uint8Array.BYTES_PER_ELEMENT)},Teu=(e)=>{if(typeof e==="string")return dis(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)},Seu=(e)=>{if(typeof e==="string")return e;if(typeof e!=="object"||typeof e.byteOffset!=="number"||typeof e.byteLength!=="number")throw Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");return uis.fromArrayBuffer(e.buffer,e.byteOffset,e.byteLength).toString("utf8")};arn.fromUtf8=dis;arn.toUint8Array=Teu;arn.toUtf8=Seu});
export {FS};
