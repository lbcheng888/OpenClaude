// @ts-nocheck
import {D6a,P6a} from "../src/permissions/4180_v.ts";
import {ldo,g6a,_6a} from "./m4174.ts";
import {QY,Kqe,H9n,I9n,Put,a6a,k9n,S_e} from "./m4169.ts";
import {p6a,N9n,Out} from "./m4172.ts";
import {q9t,QIe,j9t} from "./m4183.ts";
import {b,M} from "../runtime.ts";
function q6a(e,t,n,r,o,s,i,a,l,c){let u=D6a(e,t,n,r,o,i,a,l,c),d=ldo((_)=>n({type:"progress",toolUseID:"workflow_log",data:{type:"workflow_log",message:_}})),p=Object.freeze({__proto__:null,total:a?.total??null,spent:QY(()=>a?.getTurnSpent()??0),remaining:QY(()=>a?.total==null?1/0:Math.max(0,a.total-a.getTurnSpent()))}),m=e.abortController?.signal,f=p6a(m),A=g6a({hooks:u,budget:p,abortSignal:m,timers:f,resolveWorkflow:q9t,getAllWorkflows:QIe}),h=W9t.createContext({__proto__:null,log:QY(u.log),phase:QY(u.phase),budget:p,console:d,setTimeout:f.setTimeout,clearTimeout:f.clearTimeout},{codeGeneration:{strings:!1,wasm:!1}});N9n(h),Kqe(h),f.bindVMInvoke(W9t.runInContext("(fn => { fn() })",h));let g=H9n(h);for(let[_,y]of[["agent",u.agent],["parallel",u.parallel],["pipeline",u.pipeline],["workflow",A]])Object.defineProperty(h,_,{value:g(I9n(y)),writable:!0,enumerable:!0,configurable:!0});{let _=s===void 0?void 0:JSON.stringify(s);Object.defineProperty(h,"args",{value:_===void 0?void 0:W9t.runInContext(`JSON.parse(${JSON.stringify(_)})`,h),writable:!0,enumerable:!0,configurable:!0})}return u.bindVMAwait({settle:Put(h),call:a6a(h),clone:k9n(h)}),{vmContext:h,hooks:u}}
var W9t;
var j6a=b(()=>{S_e();_6a();Out();P6a();j9t();W9t=M(require("vm"))});
export {q6a,W9t,j6a};
