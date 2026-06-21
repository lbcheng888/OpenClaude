// @ts-nocheck
import {X} from "../runtime.ts";
import {vgr} from "./m805.ts";
var Bis=X((grn)=>{Object.defineProperty(grn,"__esModule",{value:!0});grn.fromBase64=void 0;var ctu=vgr(),utu=/^[A-Za-z0-9+/]*={0,2}$/,dtu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!utu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,ctu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};grn.fromBase64=dtu});
export {Bis};
