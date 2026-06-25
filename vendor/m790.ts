// @ts-nocheck
import {Q} from "../runtime.ts";
import {qsn} from "./m789.ts";
var eps=Q((Wsn)=>{Object.defineProperty(Wsn,"__esModule",{value:!0});Wsn.fromBase64=void 0;var Huu=qsn(),Iuu=/^[A-Za-z0-9+/]*={0,2}$/,xuu=(e)=>{if(e.length*3%4!==0)throw TypeError("Incorrect padding on base64 string.");if(!Iuu.exec(e))throw TypeError("Invalid base64 string.");let t=(0,Huu.fromString)(e,"base64");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)};Wsn.fromBase64=xuu});
export {eps};
