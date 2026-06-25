// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function xxl(e,t,n,r){let o=Yt();if(o==="windows"||!Ixl.isAbsolute(e))return;let s;try{if(r)s=process.cwd(),process.chdir(r);let i=require("bun:ffi"),{symbols:a}=i.dlopen(o==="macos"?"/usr/lib/libSystem.B.dylib":"libc.so.6",{execve:{args:["ptr","ptr","ptr"],returns:"int"}}),l=[],c=(m)=>{let f=Buffer.from(m+"\x00","utf8");return l.push(f),BigInt(i.ptr(f))},u=(m)=>{let f=new BigUint64Array(m.length+1);return m.forEach((h,g)=>f[g]=c(h)),f},d=Object.entries(n).flatMap(([m,f])=>f===void 0?[]:[`${m}=${f}`]),p=Buffer.from(e+"\x00","utf8");a.execve(p,u(t),u(d)),logForDebugging(`execve(${e}) failed \u2014 falling back to spawn`,{level:"warn"})}catch(i){logForDebugging(`execReplaceProcess: ${Ce(i)} \u2014 falling back to spawn`,{level:"warn"})}finally{if(s!==void 0)try{process.chdir(s)}catch{}}}
var Ixl;
var Dxl=b(()=>{qe();Ct();Es();Ixl=require("path")});
export {xxl,Ixl,Dxl};
