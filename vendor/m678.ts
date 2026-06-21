// @ts-nocheck
import {b} from "../runtime.ts";
var iJc,aJc,Ffr=(e,t)=>{for(let[n,r]of aJc){let o=typeof t==="function"?(...s)=>Reflect.apply(r.value,t(),s):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}},YZo=(e)=>new Promise((t,n)=>{if(e.on("exit",(r,o)=>{t({exitCode:r,signal:o})}),e.on("error",(r)=>{n(r)}),e.stdin)e.stdin.on("error",(r)=>{n(r)})});
var JZo=b(()=>{iJc=(async()=>{})().constructor.prototype,aJc=["then","catch","finally"].map((e)=>[e,Reflect.getOwnPropertyDescriptor(iJc,e)])});
export {iJc,aJc,Ffr,YZo,JZo};
