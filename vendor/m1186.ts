// @ts-nocheck
import {b} from "../runtime.ts";
var SHs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var fln,M1e=(e,t=0,n=e.byteLength-t)=>{if(!SHs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return fln.Buffer.from(e,t,n)},kEe=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?fln.Buffer.from(e,t):fln.Buffer.from(e)};
var Uoe=b(()=>{fln=require("buffer")});
export {SHs,fln,M1e,kEe,Uoe};
