// @ts-nocheck
import {b} from "../runtime.ts";
var Ciu,Aiu,fTr=(e,t)=>{for(let[n,r]of Aiu){let o=typeof t==="function"?(...s)=>Reflect.apply(r.value,t(),s):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}},Kss=(e)=>new Promise((t,n)=>{if(e.on("exit",(r,o)=>{t({exitCode:r,signal:o})}),e.on("error",(r)=>{n(r)}),e.stdin)e.stdin.on("error",(r)=>{n(r)})});
var zss=b(()=>{Ciu=(async()=>{})().constructor.prototype,Aiu=["then","catch","finally"].map((e)=>[e,Reflect.getOwnPropertyDescriptor(Ciu,e)])});
export {Ciu,Aiu,fTr,Kss,zss};
