// @ts-nocheck
import {X} from "../runtime.ts";
import {Nms} from "./m900.ts";
var Bms=X((tTr)=>{var qcu=Nms(),eTr=require("buffer"),jcu=(e,t=0,n=e.byteLength-t)=>{if(!qcu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return eTr.Buffer.from(e,t,n)},Wcu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?eTr.Buffer.from(e,t):eTr.Buffer.from(e)};tTr.fromArrayBuffer=jcu;tTr.fromString=Wcu});
export {Bms};
