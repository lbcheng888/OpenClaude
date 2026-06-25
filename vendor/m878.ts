// @ts-nocheck
import {Q} from "../runtime.ts";
import {C_s} from "./m877.ts";
var FCr=Q((NCr)=>{var Kgu=C_s(),MCr=require("buffer"),zgu=(e,t=0,n=e.byteLength-t)=>{if(!Kgu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return MCr.Buffer.from(e,t,n)},jgu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?MCr.Buffer.from(e,t):MCr.Buffer.from(e)};NCr.fromArrayBuffer=zgu;NCr.fromString=jgu});
export {FCr};
