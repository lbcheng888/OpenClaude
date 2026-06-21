// @ts-nocheck
import {b} from "../runtime.ts";
var Sgs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var nsn,bgs=(e,t=0,n=e.byteLength-t)=>{if(!Sgs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return nsn.Buffer.from(e,t,n)},Egs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?nsn.Buffer.from(e,t):nsn.Buffer.from(e)};
var OTr=b(()=>{nsn=require("buffer")});
export {Sgs,nsn,bgs,Egs,OTr};
