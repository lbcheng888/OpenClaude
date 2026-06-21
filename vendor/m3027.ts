// @ts-nocheck
import {lN,xxn} from "./m3021.ts";
import {yhe,CGr} from "./m3026.ts";
import {h$e,kxn} from "./m3022.ts";
import {b} from "../runtime.ts";
function g$e({status:e="idle",theme:t}){let[n,r]=lN(!1),[o,s]=lN(0),{prefix:i,spinner:a}=yhe(t);if(h$e(()=>{if(e==="loading"){let c,u=-1,d=setTimeout(vGr.AsyncResource.bind(()=>{r(!0),c=setInterval(vGr.AsyncResource.bind(()=>{u=u+1,s(u%a.frames.length)}),a.interval)}),300);return()=>{clearTimeout(d),clearInterval(c)}}else r(!1)},[e]),n)return a.frames[o];return typeof i==="string"?i:i[e==="loading"?"idle":e]}
var vGr;
var dVi=b(()=>{xxn();kxn();CGr();vGr=require("async_hooks")});
export {g$e,vGr,dVi};
