// @ts-nocheck
import {Q} from "../runtime.ts";
import {nps} from "./m791.ts";
var rps=Q((Kbr)=>{var Puu=nps(),Vbr=require("buffer"),Ouu=(e,t=0,n=e.byteLength-t)=>{if(!Puu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Vbr.Buffer.from(e,t,n)},Luu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Vbr.Buffer.from(e,t):Vbr.Buffer.from(e)};Kbr.fromArrayBuffer=Ouu;Kbr.fromString=Luu});
export {rps};
