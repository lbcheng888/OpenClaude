// @ts-nocheck
import {O6o,pQt} from "./m323.ts";
import {ujo,xcr} from "./m346.ts";
import {mQt,fw,QV} from "./m325.ts";
import {b} from "../runtime.ts";
function Yd(e,t,n=!1){let r=t.seen.get(e);if(t.override){let a=t.override?.(e,t,r,n);if(a!==O6o)return a}if(r&&!n){let a=DCc(r,t);if(a!==void 0)return a}let o={def:e,path:t.currentPath,jsonSchema:void 0};t.seen.set(e,o);let s=ujo(e,e.typeName,t),i=typeof s==="function"?Yd(s(),t):s;if(i)PCc(e,t,i);if(t.postProcess){let a=t.postProcess(i,e,t);return o.jsonSchema=i,a}return o.jsonSchema=i,i}
var DCc=(e,t)=>{switch(t.$refStrategy){case"root":return{$ref:e.path.join("/")};case"relative":return{$ref:mQt(t.currentPath,e.path)};case"none":case"seen":{if(e.path.length<t.currentPath.length&&e.path.every((n,r)=>t.currentPath[r]===n))return console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`),fw(t);return t.$refStrategy==="seen"?fw(t):void 0}}},PCc=(e,t,n)=>{if(e.description){if(n.description=e.description,t.markdownDescription)n.markdownDescription=e.description}return n};
var JI=b(()=>{pQt();xcr();QV()});
export {Yd,DCc,PCc,JI};
