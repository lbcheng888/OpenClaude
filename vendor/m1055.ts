// @ts-nocheck
import {b} from "../runtime.ts";
var JHs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Bln,XHs=(e,t=0,n=e.byteLength-t)=>{if(!JHs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Bln.Buffer.from(e,t,n)},QHs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Bln.Buffer.from(e,t):Bln.Buffer.from(e)};
var Hvr=b(()=>{Bln=require("buffer")});
export {JHs,Bln,XHs,QHs,Hvr};
