// @ts-nocheck
import {Q} from "../runtime.ts";
import {uDr} from "./m1495.ts";
var n7s=Q((xfn)=>{Object.defineProperty(xfn,"__esModule",{value:!0});xfn.convertToBuffer=void 0;var u4u=uDr(),d4u=typeof Buffer<"u"&&Buffer.from?function(e){return Buffer.from(e,"utf8")}:u4u.fromUtf8;function p4u(e){if(e instanceof Uint8Array)return e;if(typeof e==="string")return d4u(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)}xfn.convertToBuffer=p4u});
export {n7s};
