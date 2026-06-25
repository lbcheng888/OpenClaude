// @ts-nocheck
import {BKa,UKa} from "../src/permissions/4193_v.ts";
import {Xho,AKa,RKa} from "./m4187.ts";
import {NY,p5e,vqn,wqn,Hqn,Dpt,pKa,Uye} from "./m4181.ts";
import {_Ka,Lqn,m5e} from "./m4184.ts";
import {nqt,Gxe,rqt} from "./m4196.ts";
import {b,x} from "../runtime.ts";
function YKa(e,t,n,r,o,s,i,a,l,c){let u=BKa(e,t,n,r,o,i,a,l,c),d=Xho((y)=>n({type:"progress",toolUseID:"workflow_log",data:{type:"workflow_log",message:y}})),p=Object.freeze({__proto__:null,total:a?.total??null,spent:NY(()=>a?.getTurnSpent()??0),remaining:NY(()=>a?.total==null?1/0:Math.max(0,a.total-a.getTurnSpent()))}),m=e.abortController?.signal,f=_Ka(m),h=oqt.createContext({__proto__:null,log:NY(u.log),phase:NY(u.phase),budget:p,console:d,setTimeout:f.setTimeout,clearTimeout:f.clearTimeout},{codeGeneration:{strings:!1,wasm:!1}});Lqn(h),p5e(h),f.bindVMInvoke(oqt.runInContext("(fn => { fn() })",h));let g=vqn(h),_=AKa({hooks:u,budget:p,abortSignal:m,timers:f,resolveWorkflow:nqt,getAllWorkflows:Gxe,intakeClone:g}),T=wqn(h);for(let[y,S]of[["agent",u.agent],["parallel",u.parallel],["pipeline",u.pipeline],["workflow",_]])Object.defineProperty(h,y,{value:T(Hqn(S)),writable:!0,enumerable:!0,configurable:!0});{let y=s===void 0?void 0:JSON.stringify(s);Object.defineProperty(h,"args",{value:y===void 0?void 0:oqt.runInContext(`JSON.parse(${JSON.stringify(y)})`,h),writable:!0,enumerable:!0,configurable:!0})}return u.bindVMAwait({settle:Dpt(h),call:pKa(h),clone:g}),{vmContext:h,hooks:u}}
var oqt;
var JKa=b(()=>{Uye();RKa();m5e();UKa();rqt();oqt=x(require("vm"))});
export {YKa,oqt,JKa};
