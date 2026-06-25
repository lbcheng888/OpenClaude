// @ts-nocheck
import {Q} from "../runtime.ts";
import {ZTs} from "./m910.ts";
var qAr=Q(($Ar)=>{var ySu=ZTs(),UAr=require("buffer"),TSu=(e,t=0,n=e.byteLength-t)=>{if(!ySu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return UAr.Buffer.from(e,t,n)},SSu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?UAr.Buffer.from(e,t):UAr.Buffer.from(e)};$Ar.fromArrayBuffer=TSu;$Ar.fromString=SSu});
export {qAr};
