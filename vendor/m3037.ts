// @ts-nocheck
import {b1,_0n} from "./m3031.ts";
import {Ige,sYr} from "./m3036.ts";
import {T9e,y0n} from "./m3032.ts";
import {b} from "../runtime.ts";
function S9e({status:e="idle",theme:t}){let[n,r]=b1(!1),[o,s]=b1(0),{prefix:i,spinner:a}=Ige(t);if(T9e(()=>{if(e==="loading"){let c,u=-1,d=setTimeout(iYr.AsyncResource.bind(()=>{r(!0),c=setInterval(iYr.AsyncResource.bind(()=>{u=u+1,s(u%a.frames.length)}),a.interval)}),300);return()=>{clearTimeout(d),clearInterval(c)}}else r(!1)},[e]),n)return a.frames[o];return typeof i==="string"?i:i[e==="loading"?"idle":e]}
var iYr;
var oQi=b(()=>{_0n();y0n();sYr();iYr=require("async_hooks")});
export {S9e,iYr,oQi};
