// @ts-nocheck
import {b} from "../runtime.ts";
var b4s=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Opn,E4s=(e,t=0,n=e.byteLength-t)=>{if(!b4s(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Opn.Buffer.from(e,t,n)},C4s=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Opn.Buffer.from(e,t):Opn.Buffer.from(e)};
var qIr=b(()=>{Opn=require("buffer")});
export {b4s,Opn,E4s,C4s,qIr};
