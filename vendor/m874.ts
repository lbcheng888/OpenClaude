// @ts-nocheck
import {X} from "../runtime.ts";
import {cyr} from "./m873.ts";
var Hds=X((gon)=>{Object.defineProperty(gon,"__esModule",{value:!0});gon.fromBase64=void 0;var Piu=cyr(),Oiu=/^[A-Za-z0-9+/]*={0,2}$/,Liu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!Oiu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,Piu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};gon.fromBase64=Liu});
export {Hds};
