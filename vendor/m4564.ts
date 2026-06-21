// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function Y8n(e,t){let n=getGlobalConfig().numStartups;saveGlobalConfig((r)=>{let o=r.tipsHistory??{};if(o[e]===n)return r;let s=r.tipLifetimeShownCounts??{},i={...r,tipsHistory:{...o,[e]:n},tipLifetimeShownCounts:{...s,[e]:(s[e]??0)+1}};if(!t)return i;let a=r.pluginSuggestionShownCounts??{};return{...i,pluginSuggestionShownCounts:{...a,[t]:(a[t]??0)+1}}})}
function J8n(e){return getGlobalConfig().tipLifetimeShownCounts?.[e]??0}
function pDe(e){let t=getGlobalConfig(),n=t.tipsHistory?.[e];if(!n)return 1/0;return t.numStartups-n}
function Pll(e){return getGlobalConfig().pluginSuggestionShownCounts?.[e]??0}
function Oll(e){return getGlobalConfig().pluginSuggestionDiscoverShownCounts?.[e]??0}
function Lll(e){if(e.length===0)return;saveGlobalConfig((t)=>{let n=t.pluginSuggestionDiscoverShownCounts??{};if(e.every((o)=>(n[o]??0)>0))return t;let r={...n};for(let o of e)r[o]=(r[o]??0)+1;return{...t,pluginSuggestionDiscoverShownCounts:r}})}
var v6t=b(()=>{Qn()});
export {Y8n,J8n,pDe,Pll,Oll,Lll,v6t};
