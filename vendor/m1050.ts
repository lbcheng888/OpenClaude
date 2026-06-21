// @ts-nocheck
import {b} from "../runtime.ts";
var nCs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var nin,rCs=(e,t=0,n=e.byteLength-t)=>{if(!nCs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return nin.Buffer.from(e,t,n)},oCs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?nin.Buffer.from(e,t):nin.Buffer.from(e)};
var ebr=b(()=>{nin=require("buffer")});
export {nCs,nin,rCs,oCs,ebr};
