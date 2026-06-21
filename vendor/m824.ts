// @ts-nocheck
import {X} from "../runtime.ts";
import {als} from "./m823.ts";
var Qgr=X((Xgr)=>{var tru=als(),Jgr=require("buffer"),nru=(e,t=0,n=e.byteLength-t)=>{if(!tru.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Jgr.Buffer.from(e,t,n)},rru=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Jgr.Buffer.from(e,t):Jgr.Buffer.from(e)};Xgr.fromArrayBuffer=nru;Xgr.fromString=rru});
export {Qgr};
