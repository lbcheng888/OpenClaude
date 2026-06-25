// @ts-nocheck
import {Qyr,ess} from "./m668.ts";
import {Xyr} from "./m667.ts";
import {b} from "../runtime.ts";
var tss,Usu=()=>{let e=Qyr();return Object.fromEntries(e.map($su))},$su=({name:e,number:t,description:n,supported:r,action:o,forced:s,standard:i})=>[e,{name:e,number:t,description:n,supported:r,action:o,forced:s,standard:i}],nss,qsu=()=>{let e=Qyr(),t=Xyr+1,n=Array.from({length:t},(r,o)=>Wsu(o,e));return Object.assign({},...n)},Wsu=(e,t)=>{let n=Gsu(e,t);if(n===void 0)return{};let{name:r,description:o,supported:s,action:i,forced:a,standard:l}=n;return{[e]:{name:r,number:e,description:o,supported:s,action:i,forced:a,standard:l}}},Gsu=(e,t)=>{let n=t.find(({name:r})=>tss.constants.signals[r]===e);if(n!==void 0)return n;return t.find((r)=>r.number===e)},Axf;
var rss=b(()=>{ess();tss=require("os"),nss=Usu(),Axf=qsu()});
export {tss,Usu,$su,nss,qsu,Wsu,Gsu,Axf,rss};
