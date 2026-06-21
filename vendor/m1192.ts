// @ts-nocheck
import {b} from "../runtime.ts";
import {vHs} from "./m1191.ts";
function QEr(e){if(typeof e==="string")return e.length===0;return e.byteLength===0}
function ZEr(e){return new Uint8Array([(e&4278190080)>>24,(e&16711680)>>16,(e&65280)>>8,e&255])}
function eCr(e){if(!Uint32Array.from){var t=new Uint32Array(e.length),n=0;while(n<e.length)t[n]=e[n],n+=1;return t}return Uint32Array.from(e)}
var tCr=b(()=>{vHs()});
export {QEr,ZEr,eCr,tCr};
