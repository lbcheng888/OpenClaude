// @ts-nocheck
import {b} from "../runtime.ts";
var P2s=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var spn,O2s=(e,t=0,n=e.byteLength-t)=>{if(!P2s(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return spn.Buffer.from(e,t,n)},L2s=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?spn.Buffer.from(e,t):spn.Buffer.from(e)};
var hIr=b(()=>{spn=require("buffer")});
export {P2s,spn,O2s,L2s,hIr};
