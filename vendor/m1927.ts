// @ts-nocheck
import {b,M} from "../runtime.ts";
var tQs,nQs;
var rQs=b(()=>{tQs=M(require("child_process")),nQs={execFile(e,t,n){return new Promise((r,o)=>{tQs.execFile(e,t,n,(s,i,a)=>{if(Buffer.isBuffer(i))i=i.toString("utf8");if(Buffer.isBuffer(a))a=a.toString("utf8");if(a||s)o(a?Error(a):s);else r(i)})})}}});
export {tQs,nQs,rQs};
