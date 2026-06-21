// @ts-nocheck
import {X} from "../runtime.ts";
import {kds} from "./m872.ts";
var cyr=X((lyr)=>{var Hiu=kds(),ayr=require("buffer"),Iiu=(e,t=0,n=e.byteLength-t)=>{if(!Hiu.isArrayBuffer(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return ayr.Buffer.from(e,t,n)},Diu=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?ayr.Buffer.from(e,t):ayr.Buffer.from(e)};lyr.fromArrayBuffer=Iiu;lyr.fromString=Diu});
export {cyr};
