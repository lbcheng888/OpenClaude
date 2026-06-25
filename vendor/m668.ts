// @ts-nocheck
import {Yos,Xos,Qos} from "./m667.ts";
import {b} from "../runtime.ts";
var Zos,Qyr=()=>{let e=Yos();return[...Xos,...e].map(Bsu)},Bsu=({name:e,number:t,description:n,action:r,forced:o=!1,standard:s})=>{let{signals:{[e]:i}}=Zos.constants,a=i!==void 0;return{name:e,number:a?i:t,description:n,supported:a,action:r,forced:o,standard:s}};
var ess=b(()=>{Qos();Zos=require("os")});
export {Zos,Qyr,Bsu,ess};
