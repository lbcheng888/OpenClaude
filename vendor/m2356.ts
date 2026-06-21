// @ts-nocheck
import {AF,YUr} from "./m2355.ts";
import {b} from "../runtime.ts";
function QUr(e){if(rSn.has(e))return e;if(JUr.has(e))return JUr.get(e);if(e.startsWith(oSn))return Esd;if(e=e.slice(2),e.startsWith("38"))return AF.color.close;else if(e.startsWith("48"))return AF.bgColor.close;let t=AF.codes.get(parseInt(e,10));if(t)return AF.color.ansi(t);else return AF.reset.open}
function F1(e){return e.map((t)=>t.code).join("")}
var Ubi,$bi,qbi,rSn,JUr,oSn="\x1B]8;;",XUr,jbi="\x07",Hrh,Esd;
var BIt=b(()=>{YUr();Ubi=new Set([27,155]),$bi="[".codePointAt(0),qbi="]".codePointAt(0),rSn=new Set,JUr=new Map;for(let[e,t]of AF.codes)rSn.add(AF.color.ansi(t)),JUr.set(AF.color.ansi(e),AF.color.ansi(t));XUr=oSn.split("").map((e)=>e.charCodeAt(0)),Hrh=jbi.charCodeAt(0),Esd=`\x1B]8;;${jbi}`});
export {QUr,F1,Ubi,$bi,qbi,rSn,JUr,oSn,XUr,jbi,Hrh,Esd,BIt};
