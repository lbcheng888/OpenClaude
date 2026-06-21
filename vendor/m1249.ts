// @ts-nocheck
import {b} from "../runtime.ts";
var gDs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var yln,_Ds=(e,t=0,n=e.byteLength-t)=>{if(!gDs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return yln.Buffer.from(e,t,n)},yDs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?yln.Buffer.from(e,t):yln.Buffer.from(e)};
var ICr=b(()=>{yln=require("buffer")});
export {gDs,yln,_Ds,yDs,ICr};
