// @ts-nocheck
import {Q} from "../runtime.ts";
import {qAr} from "./m911.ts";
var eSs=Q((ban)=>{Object.defineProperty(ban,"__esModule",{value:!0});ban.fromBase64=void 0;var bSu=qAr(),ESu=/^[A-Za-z0-9+/]*={0,2}$/,CSu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!ESu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,bSu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};ban.fromBase64=CSu});
export {eSs};
