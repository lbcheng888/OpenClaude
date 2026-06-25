// @ts-nocheck
import {b} from "../runtime.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {Gz} from "../src/telemetry/2704_Gz.ts";
function qke(){return{stateByDir:{},lastUsage:null}}
function z$e(e){if(!e)return;e.stateByDir={},e.lastUsage=null}
function G7r(e,t){return e.stateByDir[t]}
function V7r(e,t,n,r,o){let s={memories:n,messages:[{role:"user",content:[{type:"text",text:`Available memories:
${r}`,...o&&{cache_control:o}}]}]};return e.stateByDir[t]=s,s}
function K7r(e,t,n,r){let o=e.stateByDir[t];if(!o)return;e.stateByDir[t]={...o,messages:[...o.messages,{role:"user",content:[{type:"text",text:n}]},{role:"assistant",content:[{type:"text",text:r}]}]}}
var i1t="memdir_relevance",W7r="memdir_aki_extract";
function z7r(){return!1}
var Tot=b(()=>{jn();dn();Gz()});
export {qke,z$e,G7r,V7r,K7r,i1t,W7r,z7r,Tot};
