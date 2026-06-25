// @ts-nocheck
import {HKo,Ven} from "./m325.ts";
import {s7o,tfr} from "./m348.ts";
import {Ken,bR,CK} from "./m327.ts";
import {b} from "../runtime.ts";
function Ad(e,t,n=!1){let r=t.seen.get(e);if(t.override){let a=t.override?.(e,t,r,n);if(a!==HKo)return a}if(r&&!n){let a=MPc(r,t);if(a!==void 0)return a}let o={def:e,path:t.currentPath,jsonSchema:void 0};t.seen.set(e,o);let s=s7o(e,e.typeName,t),i=typeof s==="function"?Ad(s(),t):s;if(i)NPc(e,t,i);if(t.postProcess){let a=t.postProcess(i,e,t);return o.jsonSchema=i,a}return o.jsonSchema=i,i}
var MPc=(e,t)=>{switch(t.$refStrategy){case"root":return{$ref:e.path.join("/")};case"relative":return{$ref:Ken(t.currentPath,e.path)};case"none":case"seen":{if(e.path.length<t.currentPath.length&&e.path.every((n,r)=>t.currentPath[r]===n))return console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`),bR(t);return t.$refStrategy==="seen"?bR(t):void 0}}},NPc=(e,t,n)=>{if(e.description){if(n.description=e.description,t.markdownDescription)n.markdownDescription=e.description}return n};
var h0=b(()=>{Ven();tfr();CK()});
export {Ad,MPc,NPc,h0};
