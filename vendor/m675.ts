// @ts-nocheck
import {b} from "../runtime.ts";
function ron(e){return e!==null&&typeof e==="object"&&typeof e.pipe==="function"}
function rTr(e){return ron(e)&&e.writable!==!1&&typeof e._write==="function"&&typeof e._writableState==="object"}
var Tss,Sss,tiu=(e)=>e instanceof Sss.ChildProcess&&typeof e.then==="function",oTr=(e,t,n)=>{if(typeof n==="string")return e[t].pipe(Tss.createWriteStream(n)),e;if(rTr(n))return e[t].pipe(n),e;if(!tiu(n))throw TypeError("The second argument must be a string, a stream or an Execa child process.");if(!rTr(n.stdin))throw TypeError("The target child process's stdin must be available.");return e[t].pipe(n.stdin),n},bss=(e)=>{if(e.stdout!==null)e.pipeStdout=oTr.bind(void 0,e,"stdout");if(e.stderr!==null)e.pipeStderr=oTr.bind(void 0,e,"stderr");if(e.all!==void 0)e.pipeAll=oTr.bind(void 0,e,"all")};
var Ess=b(()=>{Tss=require("fs"),Sss=require("child_process")});
export {ron,rTr,Tss,Sss,tiu,oTr,bss,Ess};
