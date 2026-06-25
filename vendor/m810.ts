// @ts-nocheck
import {Q} from "../runtime.ts";
import {xps} from "./m809.ts";
var eEr=Q((Zbr)=>{var Edu=xps(),Qbr=require("buffer"),Cdu=(e,t=0,n=e.byteLength-t)=>{if(!Edu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Qbr.Buffer.from(e,t,n)},Adu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Qbr.Buffer.from(e,t):Qbr.Buffer.from(e)};Zbr.fromArrayBuffer=Cdu;Zbr.fromString=Adu});
export {eEr};
