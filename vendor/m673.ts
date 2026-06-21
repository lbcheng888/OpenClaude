// @ts-nocheck
import {Ofr,Lfr} from "./m672.ts";
import {b} from "../runtime.ts";
async function vtn(e,t){if(!("Buffer"in globalThis))throw Error("getStreamAsBuffer() is only supported in Node.js");try{return LZo(await Ofr(e,t))}catch(n){if(n.bufferedData!==void 0)n.bufferedData=LZo(n.bufferedData);throw n}}
var LZo=(e)=>globalThis.Buffer.from(e);
var MZo=b(()=>{Lfr()});
export {vtn,LZo,MZo};
