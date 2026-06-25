// @ts-nocheck
import {b} from "../runtime.ts";
function Ml(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function Gd(e){return Ml(e).replaceAll('"',"&quot;").replaceAll("'","&apos;")}
function Pot(e,t){return t.replace(new RegExp(`</(?=${e}[>\\s/])`,"gi"),"<\\/")}
function Fzr(e){return e.replace(CFd,(t)=>eWi[t]??t)}
function Zke(e){return e.replace(AFd,(t)=>RFd[t]??t)}
var CFd,eWi,AFd,RFd;
var Yk=b(()=>{CFd=/&(?:amp|lt|gt);/g,eWi={"&amp;":"&","&lt;":"<","&gt;":">"};AFd=/&(?:amp|lt|gt|quot|apos);/g,RFd={...eWi,"&quot;":'"',"&apos;":"'"}});
export {Ml,Gd,Pot,Fzr,Zke,CFd,eWi,AFd,RFd,Yk};
