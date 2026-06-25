// @ts-nocheck
import {b} from "../runtime.ts";
var hLs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Qun,HNe=(e,t=0,n=e.byteLength-t)=>{if(!hLs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Qun.Buffer.from(e,t,n)},dAe=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Qun.Buffer.from(e,t):Qun.Buffer.from(e)};
var Foe=b(()=>{Qun=require("buffer")});
export {hLs,Qun,HNe,dAe,Foe};
