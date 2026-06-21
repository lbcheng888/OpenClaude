// @ts-nocheck
import {b,M} from "../runtime.ts";
var res,oes,ses,xtn=(e,t)=>String(e).padStart(t,"0"),pJc=()=>{let e=new Date;return`${xtn(e.getHours(),2)}:${xtn(e.getMinutes(),2)}:${xtn(e.getSeconds(),2)}.${xtn(e.getMilliseconds(),3)}`},jfr=(e,{verbose:t})=>{if(!t)return;oes.default.stderr.write(`[${pJc()}] ${e}
`)};
var ies=b(()=>{res=require("util"),oes=M(require("process")),ses=res.debuglog("execa").enabled});
export {res,oes,ses,xtn,pJc,jfr,ies};
