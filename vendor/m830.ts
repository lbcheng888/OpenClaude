// @ts-nocheck
import {Q} from "../runtime.ts";
import {wEr} from "./m829.ts";
var nfs=Q((Tin)=>{Object.defineProperty(Tin,"__esModule",{value:!0});Tin.fromBase64=void 0;var Smu=wEr(),bmu=/^[A-Za-z0-9+/]*={0,2}$/,Emu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!bmu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,Smu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};Tin.fromBase64=Emu});
export {nfs};
