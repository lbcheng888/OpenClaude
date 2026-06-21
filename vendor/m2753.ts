// @ts-nocheck
import {b} from "../runtime.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {_z} from "../src/telemetry/2692__z.ts";
function nxe(){return{stateByDir:{},lastUsage:null}}
function $2e(e){if(!e)return;e.stateByDir={},e.lastUsage=null}
function d5r(e,t){return e.stateByDir[t]}
function p5r(e,t,n,r,o){let s={memories:n,messages:[{role:"user",content:[{type:"text",text:`Available memories:
${r}`,...o&&{cache_control:o}}]}]};return e.stateByDir[t]=s,s}
function m5r(e,t,n,r){let o=e.stateByDir[t];if(!o)return;e.stateByDir[t]={...o,messages:[...o.messages,{role:"user",content:[{type:"text",text:n}]},{role:"assistant",content:[{type:"text",text:r}]}]}}
var ROt="memdir_relevance",u5r="memdir_aki_extract";
function f5r(){return!1}
var fnt=b(()=>{zn();sn();_z()});
export {nxe,$2e,d5r,p5r,m5r,ROt,u5r,f5r,fnt};
