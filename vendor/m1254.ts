// @ts-nocheck
import {b} from "../runtime.ts";
var dNs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var rdn,pNs=(e,t=0,n=e.byteLength-t)=>{if(!dNs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return rdn.Buffer.from(e,t,n)},mNs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?rdn.Buffer.from(e,t):rdn.Buffer.from(e)};
var iHr=b(()=>{rdn=require("buffer")});
export {dNs,rdn,pNs,mNs,iHr};
