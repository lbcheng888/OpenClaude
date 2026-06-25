// @ts-nocheck
import {cTr,uTr} from "./m678.ts";
import {b} from "../runtime.ts";
async function ion(e,t){if(!("Buffer"in globalThis))throw Error("getStreamAsBuffer() is only supported in Node.js");try{return Dss(await cTr(e,t))}catch(n){if(n.bufferedData!==void 0)n.bufferedData=Dss(n.bufferedData);throw n}}
var Dss=(e)=>globalThis.Buffer.from(e);
var Pss=b(()=>{uTr()});
export {ion,Dss,Pss};
