// @ts-nocheck
import {b,x} from "../runtime.ts";
var eis,tis,nis,con=(e,t)=>String(e).padStart(t,"0"),Hiu=()=>{let e=new Date;return`${con(e.getHours(),2)}:${con(e.getMinutes(),2)}:${con(e.getSeconds(),2)}.${con(e.getMilliseconds(),3)}`},yTr=(e,{verbose:t})=>{if(!t)return;tis.default.stderr.write(`[${Hiu()}] ${e}
`)};
var ris=b(()=>{eis=require("util"),tis=x(require("process")),nis=eis.debuglog("execa").enabled});
export {eis,tis,nis,con,Hiu,yTr,ris};
