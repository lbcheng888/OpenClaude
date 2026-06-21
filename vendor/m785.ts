// @ts-nocheck
import {X} from "../runtime.ts";
import {srn} from "./m784.ts";
var iis=X((irn)=>{Object.defineProperty(irn,"__esModule",{value:!0});irn.fromBase64=void 0;var meu=srn(),feu=/^[A-Za-z0-9+/]*={0,2}$/,Aeu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!feu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,meu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};irn.fromBase64=Aeu});
export {iis};
