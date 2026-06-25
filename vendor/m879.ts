// @ts-nocheck
import {Q} from "../runtime.ts";
import {FCr} from "./m878.ts";
var A_s=Q((ean)=>{Object.defineProperty(ean,"__esModule",{value:!0});ean.fromBase64=void 0;var Ygu=FCr(),Jgu=/^[A-Za-z0-9+/]*={0,2}$/,Xgu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!Jgu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,Ygu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};ean.fromBase64=Xgu});
export {A_s};
