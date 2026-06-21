// @ts-nocheck
import {b} from "../runtime.ts";
function vQ(e,t){return`${e}@${t}`}
function jRr(e){return e.replace(/%|[^\x20-\x7e]/gu,(t)=>encodeURIComponent(t))}
function fwt(e){let t=e.indexOf("@");if(t===-1)return null;return{agentName:e.slice(0,t),teamName:e.slice(t+1)}}
function CYe(e,t){let n=Date.now();return`${e}-${n}@${t}`}
function Gun(){return j$s.getStore()?.workload}
function Vun(e,t){return j$s.run({workload:e},t)}
var q$s,vYe="cron",j$s;
var oNe=b(()=>{q$s=require("async_hooks"),j$s=new q$s.AsyncLocalStorage});
export {vQ,jRr,fwt,CYe,Gun,Vun,q$s,vYe,j$s,oNe};
