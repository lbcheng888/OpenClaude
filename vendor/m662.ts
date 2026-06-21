// @ts-nocheck
import {QQo,eZo,tZo} from "./m661.ts";
import {b} from "../runtime.ts";
var nZo,Efr=()=>{let e=QQo();return[...eZo,...e].map(bYc)},bYc=({name:e,number:t,description:n,action:r,forced:o=!1,standard:s})=>{let{signals:{[e]:i}}=nZo.constants,a=i!==void 0;return{name:e,number:a?i:t,description:n,supported:a,action:r,forced:o,standard:s}};
var rZo=b(()=>{tZo();nZo=require("os")});
export {nZo,Efr,bYc,rZo};
