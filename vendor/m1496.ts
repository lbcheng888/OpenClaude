// @ts-nocheck
import {Q} from "../runtime.ts";
import {uDr} from "./m1495.ts";
var AWs=Q((dfn)=>{Object.defineProperty(dfn,"__esModule",{value:!0});dfn.convertToBuffer=void 0;var V3u=uDr(),K3u=typeof Buffer<"u"&&Buffer.from?function(e){return Buffer.from(e,"utf8")}:V3u.fromUtf8;function z3u(e){if(e instanceof Uint8Array)return e;if(typeof e==="string")return K3u(e);if(ArrayBuffer.isView(e))return new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT);return new Uint8Array(e)}dfn.convertToBuffer=z3u});
export {AWs};
