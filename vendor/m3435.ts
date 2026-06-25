// @ts-nocheck
import {b} from "../runtime.ts";
class Vat{generateTraceId=nSa(16);generateSpanId=nSa(8)}
function nSa(e){return function(){for(let n=0;n<e/4;n++)hMn.writeUInt32BE(Math.random()*4294967296>>>0,n*4);for(let n=0;n<e;n++)if(hMn[n]>0)break;else if(n===e-1)hMn[e-1]=1;return hMn.toString("hex",0,e)}}
var hMn;
var rSa=b(()=>{hMn=Buffer.allocUnsafe(16)});
export {Vat,nSa,hMn,rSa};
