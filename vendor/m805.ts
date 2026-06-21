// @ts-nocheck
import {X} from "../runtime.ts";
import {Nis} from "./m804.ts";
var vgr=X((Cgr)=>{var itu=Nis(),Egr=require("buffer"),atu=(e,t=0,n=e.byteLength-t)=>{if(!itu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Egr.Buffer.from(e,t,n)},ltu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Egr.Buffer.from(e,t):Egr.Buffer.from(e)};Cgr.fromArrayBuffer=atu;Cgr.fromString=ltu});
export {vgr};
