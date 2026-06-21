// @ts-nocheck
import {b} from "../runtime.ts";
var wFs=(e)=>typeof ArrayBuffer==="function"&&e instanceof ArrayBuffer||Object.prototype.toString.call(e)==="[object ArrayBuffer]";
var Jcn,RFs=(e,t=0,n=e.byteLength-t)=>{if(!wFs(e))throw TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof e} (${e})`);return Jcn.Buffer.from(e,t,n)},xFs=(e,t)=>{if(typeof e!=="string")throw TypeError(`The "input" argument must be of type string. Received type ${typeof e} (${e})`);return t?Jcn.Buffer.from(e,t):Jcn.Buffer.from(e)};
var mwr=b(()=>{Jcn=require("buffer")});
export {wFs,Jcn,RFs,xFs,mwr};
