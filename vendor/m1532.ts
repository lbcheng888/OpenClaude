// @ts-nocheck
import {b} from "../runtime.ts";
var Wxr=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Gxr,i6s=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Gxr.Buffer.from(e,t):Gxr.Buffer.from(e)};
var Vxr=b(()=>{Gxr=require("buffer")});
export {Wxr,Gxr,i6s,Vxr};
