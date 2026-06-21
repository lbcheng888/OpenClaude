// @ts-nocheck
import {X} from "../runtime.ts";
var oRi=X((Qph,rRi)=>{var JZe=require("fs"),ycd=(e)=>{let t=JZe.openSync(e,"r"),n=Buffer.alloc(2048),r=JZe.readSync(t,n,0,2048,0);return JZe.close(t,()=>{}),n.subarray(0,r)},Tcd=(e)=>new Promise((t,n)=>{JZe.open(e,"r",(r,o)=>{if(r)n(r);else{let s=Buffer.alloc(2048);JZe.read(o,s,0,2048,0,(i,a)=>{t(s.subarray(0,a)),JZe.close(o,()=>{})})}})});rRi.exports={LDD_PATH:"/usr/bin/ldd",SELF_PATH:"/proc/self/exe",readFileSync:ycd,readFile:Tcd}});
export {oRi};
