// @ts-nocheck
import {uzt,ng} from "./m132.ts";
import {b} from "../runtime.ts";
function F3(){return!0}
function _A(){return Array.isArray(Bun.embeddedFiles)&&Bun.embeddedFiles.length>0}
function uBc(e){let t=process.cwd();return e.filter((n)=>!uzt(n,t))}
function FGo(e){let t=Bun.which(e);return t}
var BGo,yA=async(e)=>FGo(e),r8;
var XI=b(()=>{ng();BGo=require("path");r8=FGo});
export {F3,_A,uBc,FGo,BGo,yA,r8,XI};
