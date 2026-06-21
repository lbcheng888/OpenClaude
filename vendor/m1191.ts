// @ts-nocheck
import {b} from "../runtime.ts";
import {CHs} from "./m1190.ts";
import {YEr} from "./m1187.ts";
function XEr(e){if(e instanceof Uint8Array)return e;if(typeof e==="string")return tRu(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)}
var tRu;
var vHs=b(()=>{CHs();tRu=typeof Buffer<"u"&&Buffer.from?function(e){return Buffer.from(e,"utf8")}:YEr});
export {XEr,tRu,vHs};
