// @ts-nocheck
import {X} from "../runtime.ts";
import {Qgr} from "./m824.ts";
var lls=X((Mrn)=>{Object.defineProperty(Mrn,"__esModule",{value:!0});Mrn.fromBase64=void 0;var oru=Qgr(),sru=/^[A-Za-z0-9+/]*={0,2}$/,iru=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!sru.exec(e))throw TypeError("Invalid base64 string.");let t=(0,oru.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};Mrn.fromBase64=iru});
export {lls};
