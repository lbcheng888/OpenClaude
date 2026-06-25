// @ts-nocheck
import {Q} from "../runtime.ts";
var RDi=Q((PRg,ADi)=>{var Qtt=require("fs"),WTd=(e)=>{let t=Qtt.openSync(e,"r"),n=Buffer.alloc(2048),r=Qtt.readSync(t,n,0,2048,0);return Qtt.close(t,()=>{}),n.subarray(0,r)},GTd=(e)=>new Promise((t,n)=>{Qtt.open(e,"r",(r,o)=>{if(r)n(r);else{let s=Buffer.alloc(2048);Qtt.read(o,s,0,2048,0,(i,a)=>{t(s.subarray(0,a)),Qtt.close(o,()=>{})})}})});ADi.exports={LDD_PATH:"/usr/bin/ldd",SELF_PATH:"/proc/self/exe",readFileSync:WTd,readFile:GTd}});
export {RDi};
