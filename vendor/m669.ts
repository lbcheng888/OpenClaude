// @ts-nocheck
import {b} from "../runtime.ts";
function btn(e){return e!==null&&typeof e==="object"&&typeof e.pipe==="function"}
function xfr(e){return btn(e)&&e.writable!==!1&&typeof e._write==="function"&&typeof e._writableState==="object"}
var bZo,EZo,BYc=(e)=>e instanceof EZo.ChildProcess&&typeof e.then==="function",kfr=(e,t,n)=>{if(typeof n==="string")return e[t].pipe(bZo.createWriteStream(n)),e;if(xfr(n))return e[t].pipe(n),e;if(!BYc(n))throw TypeError("The second argument must be a string, a stream or an Execa child process.");if(!xfr(n.stdin))throw TypeError("The target child process's stdin must be available.");return e[t].pipe(n.stdin),n},CZo=(e)=>{if(e.stdout!==null)e.pipeStdout=kfr.bind(void 0,e,"stdout");if(e.stderr!==null)e.pipeStderr=kfr.bind(void 0,e,"stderr");if(e.all!==void 0)e.pipeAll=kfr.bind(void 0,e,"all")};
var vZo=b(()=>{bZo=require("fs"),EZo=require("child_process")});
export {btn,xfr,bZo,EZo,BYc,kfr,CZo,vZo};
