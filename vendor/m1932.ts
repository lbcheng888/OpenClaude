// @ts-nocheck
import {b,x} from "../runtime.ts";
var Jri,Xri;
var Qri=b(()=>{Jri=x(require("child_process")),Xri={execFile(e,t,n){return new Promise((r,o)=>{Jri.execFile(e,t,n,(s,i,a)=>{if(Buffer.isBuffer(i))i=i.toString("utf8");if(Buffer.isBuffer(a))a=a.toString("utf8");if(a||s)o(a?Error(a):s);else r(i)})})}}});
export {Jri,Xri,Qri};
