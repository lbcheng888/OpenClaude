// @ts-nocheck
import {Q} from "../runtime.ts";
var CDi=Q((DRg,EDi)=>{var bDi=()=>!1,rRn=null,qTd=()=>{if(!rRn)if(bDi()&&process.report){let e=process.report.excludeNetwork;process.report.excludeNetwork=!0,rRn=process.report.getReport(),process.report.excludeNetwork=e}else rRn={};return rRn};EDi.exports={isLinux:bDi,getReport:qTd}});
export {CDi};
