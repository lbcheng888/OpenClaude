// @ts-nocheck
import {b} from "../runtime.ts";
function isAmberSentinelEnabled(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function Tp(e){return isAmberSentinelEnabled(e).replaceAll('"',"&quot;").replaceAll("'","&apos;")}
function xnt(e,t){return t.replace(new RegExp(`</(?=${e}[>\\s/])`,"gi"),"<\\/")}
function oWr(e){return e.replace(Nkd,(t)=>c9i[t]??t)}
function mxe(e){return e.replace(Bkd,(t)=>Fkd[t]??t)}
var Nkd,c9i,Bkd,Fkd;
var QH=b(()=>{Nkd=/&(?:amp|lt|gt);/g,c9i={"&amp;":"&","&lt;":"<","&gt;":">"};Bkd=/&(?:amp|lt|gt|quot|apos);/g,Fkd={...c9i,"&quot;":'"',"&apos;":"'"}});
export {isAmberSentinelEnabled,Tp,xnt,oWr,mxe,Nkd,c9i,Bkd,Fkd,QH};
