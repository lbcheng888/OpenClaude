// @ts-nocheck
import {$Jt,zf} from "./m133.ts";
import {b} from "../runtime.ts";
function r3(){return!0}
function Rf(){return Array.isArray(Bun.embeddedFiles)&&Bun.embeddedFiles.length>0}
function _5c(e){let t=process.cwd();return e.filter((n)=>!$Jt(n,t))}
function MJo(e){let t=Bun.which(e);return t}
var LJo,Rm=async(e)=>MJo(e),T5;
var tI=b(()=>{zf();LJo=require("path");T5=MJo});
export {r3,Rf,_5c,MJo,LJo,Rm,T5,tI};
