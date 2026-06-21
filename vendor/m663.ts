// @ts-nocheck
import {Efr,rZo} from "./m662.ts";
import {bfr} from "./m661.ts";
import {b} from "../runtime.ts";
var oZo,EYc=()=>{let e=Efr();return Object.fromEntries(e.map(CYc))},CYc=({name:e,number:t,description:n,supported:r,action:o,forced:s,standard:i})=>[e,{name:e,number:t,description:n,supported:r,action:o,forced:s,standard:i}],sZo,vYc=()=>{let e=Efr(),t=bfr+1,n=Array.from({length:t},(r,o)=>wYc(o,e));return Object.assign({},...n)},wYc=(e,t)=>{let n=RYc(e,t);if(n===void 0)return{};let{name:r,description:o,supported:s,action:i,forced:a,standard:l}=n;return{[e]:{name:r,number:e,description:o,supported:s,action:i,forced:a,standard:l}}},RYc=(e,t)=>{let n=t.find(({name:r})=>oZo.constants.signals[r]===e);if(n!==void 0)return n;return t.find((r)=>r.number===e)},rTf;
var iZo=b(()=>{rZo();oZo=require("os"),sZo=EYc(),rTf=vYc()});
export {oZo,EYc,CYc,sZo,vYc,wYc,RYc,rTf,iZo};
