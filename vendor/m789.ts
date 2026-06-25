// @ts-nocheck
import {Q} from "../runtime.ts";
import {Zds} from "./m788.ts";
var qsn=Q((Gbr)=>{var vuu=Zds(),Wbr=require("buffer"),wuu=(e,t=0,n=e.byteLength-t)=>{if(!vuu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Wbr.Buffer.from(e,t,n)},kuu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Wbr.Buffer.from(e,t):Wbr.Buffer.from(e)};Gbr.fromArrayBuffer=wuu;Gbr.fromString=kuu});
export {qsn};
