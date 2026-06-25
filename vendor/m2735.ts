// @ts-nocheck
import {x4,kke} from "./m2734.ts";
import {b} from "../runtime.ts";
async function*Xrt(e,t){let n=new x4,r={...t,onCompactEvent:(a)=>n.enqueue(a)},o=(a)=>{n.enqueue({type:"notification",notification:a})},s=(a)=>{n.enqueue(a)},i;return e(r,o,s).then((a)=>{i=a,n.done()},(a)=>n.error(a)),yield*n,i}
var W4i=b(()=>{kke()});
export {Xrt,W4i};
