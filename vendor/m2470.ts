// @ts-nocheck
import {X} from "../runtime.ts";
var nRi=X((Xph,tRi)=>{var eRi=()=>!1,hbn=null,_cd=()=>{if(!hbn)if(eRi()&&process.report){let e=process.report.excludeNetwork;process.report.excludeNetwork=!0,hbn=process.report.getReport(),process.report.excludeNetwork=e}else hbn={};return hbn};tRi.exports={isLinux:eRi,getReport:_cd}});
export {nRi};
