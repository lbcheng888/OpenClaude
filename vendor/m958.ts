// @ts-nocheck
import {b} from "../runtime.ts";
var hCs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Ban,gCs=(e,t=0,n=e.byteLength-t)=>{if(!hCs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Ban.Buffer.from(e,t,n)},_Cs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Ban.Buffer.from(e,t):Ban.Buffer.from(e)};
var cRr=b(()=>{Ban=require("buffer")});
export {hCs,Ban,gCs,_Cs,cRr};
