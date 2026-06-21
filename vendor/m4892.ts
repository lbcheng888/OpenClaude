// @ts-nocheck
import {zt,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function SCl(e,t,n,r){let o=zt();if(o==="windows"||!TCl.isAbsolute(e))return;let s;try{if(r)s=process.cwd(),process.chdir(r);let i=require("bun:ffi"),{symbols:a}=i.dlopen(o==="macos"?"/usr/lib/libSystem.B.dylib":"libc.so.6",{execve:{args:["ptr","ptr","ptr"],returns:"int"}}),l=[],c=(m)=>{let f=Buffer.from(m+"\x00","utf8");return l.push(f),BigInt(i.ptr(f))},u=(m)=>{let f=new BigUint64Array(m.length+1);return m.forEach((A,h)=>f[h]=c(A)),f},d=Object.entries(n).flatMap(([m,f])=>f===void 0?[]:[`${m}=${f}`]),p=Buffer.from(e+"\x00","utf8");a.execve(p,u(t),u(d)),logForDebugging(`execve(${e}) failed \u2014 falling back to spawn`,{level:"warn"})}catch(i){logForDebugging(`execReplaceProcess: ${Se(i)} \u2014 falling back to spawn`,{level:"warn"})}finally{if(s!==void 0)try{process.chdir(s)}catch{}}}
var TCl;
var bCl=b(()=>{qe();bt();qs();TCl=require("path")});
export {SCl,TCl,bCl};
