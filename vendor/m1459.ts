// @ts-nocheck
import {b} from "../runtime.ts";
function bQ(e,t){return`${e}@${t}`}
function Txr(e){return e.replace(/%|[^\x20-\x7e]/gu,(t)=>encodeURIComponent(t))}
function $kt(e){let t=e.indexOf("@");if(t===-1)return null;return{agentName:e.slice(0,t),teamName:e.slice(t+1)}}
function EXe(e,t){let n=Date.now();return`${e}-${n}@${t}`}
function wmn(){return F5s.getStore()?.workload}
function kmn(e,t){return F5s.run({workload:e},t)}
var N5s,CXe="cron",F5s;
var eFe=b(()=>{N5s=require("async_hooks"),F5s=new N5s.AsyncLocalStorage});
export {bQ,Txr,$kt,EXe,wmn,kmn,N5s,CXe,F5s,eFe};
