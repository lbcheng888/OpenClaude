// @ts-nocheck
import {b} from "../runtime.ts";
var BMs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Scn,FMs=(e,t=0,n=e.byteLength-t)=>{if(!BMs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Scn.Buffer.from(e,t,n)},UMs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Scn.Buffer.from(e,t):Scn.Buffer.from(e)};
var Uvr=b(()=>{Scn=require("buffer")});
export {BMs,Scn,FMs,UMs,Uvr};
