// @ts-nocheck
import {b} from "../runtime.ts";
class zst{generateTraceId=$pa(16);generateSpanId=$pa(8)}
function $pa(e){return function(){for(let n=0;n<e/4;n++)bPn.writeUInt32BE(Math.random()*4294967296>>>0,n*4);for(let n=0;n<e;n++)if(bPn[n]>0)break;else if(n===e-1)bPn[e-1]=1;return bPn.toString("hex",0,e)}}
var bPn;
var qpa=b(()=>{bPn=Buffer.allocUnsafe(16)});
export {zst,$pa,bPn,qpa};
