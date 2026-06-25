// @ts-nocheck
import {b} from "../runtime.ts";
import {yLs} from "./m1195.ts";
import {Akr} from "./m1192.ts";
function vkr(e){if(e instanceof Uint8Array)return e;if(typeof e==="string")return _Mu(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)}
var _Mu;
var TLs=b(()=>{yLs();_Mu=typeof Buffer<"u"&&Buffer.from?function(e){return Buffer.from(e,"utf8")}:Akr});
export {vkr,_Mu,TLs};
