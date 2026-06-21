// @ts-nocheck
import {pq,WRe} from "./m2722.ts";
import {b} from "../runtime.ts";
async function*Ytt(e,t){let n=new pq,r={...t,onCompactEvent:(a)=>n.enqueue(a)},o=(a)=>{n.enqueue({type:"notification",notification:a})},s=(a)=>{n.enqueue(a)},i;return e(r,o,s).then((a)=>{i=a,n.done()},(a)=>n.error(a)),yield*n,i}
var oFi=b(()=>{WRe()});
export {Ytt,oFi};
