// @ts-nocheck
import {Q} from "../runtime.ts";
import {eEr} from "./m810.ts";
var Dps=Q((ein)=>{Object.defineProperty(ein,"__esModule",{value:!0});ein.fromBase64=void 0;var Rdu=eEr(),vdu=/^[A-Za-z0-9+/]*={0,2}$/,wdu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!vdu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,Rdu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};ein.fromBase64=wdu});
export {Dps};
