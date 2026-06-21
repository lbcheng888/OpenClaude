// @ts-nocheck
import {Iwt,Kxr} from "./m1533.ts";
import {b} from "../runtime.ts";
var lCe=(e)=>{if(typeof e==="string")return Iwt(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)};
var a6s=b(()=>{Kxr()});
export {lCe,a6s};
