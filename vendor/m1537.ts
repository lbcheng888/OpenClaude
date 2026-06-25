// @ts-nocheck
import {b} from "../runtime.ts";
var SDr=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var bDr,tKs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?bDr.Buffer.from(e,t):bDr.Buffer.from(e)};
var EDr=b(()=>{bDr=require("buffer")});
export {SDr,bDr,tKs,EDr};
