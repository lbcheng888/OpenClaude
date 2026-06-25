// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function HKn(e,t){let n=getGlobalConfig().numStartups;saveGlobalConfig((r)=>{let o=r.tipsHistory??{};if(o[e]===n)return r;let s=r.tipLifetimeShownCounts??{},i={...r,tipsHistory:{...o,[e]:n},tipLifetimeShownCounts:{...s,[e]:(s[e]??0)+1}};if(!t)return i;let a=r.pluginSuggestionShownCounts??{};return{...i,pluginSuggestionShownCounts:{...a,[t]:(a[t]??0)+1}}})}
function IKn(e){return getGlobalConfig().tipLifetimeShownCounts?.[e]??0}
function dPe(e){let t=getGlobalConfig(),n=t.tipsHistory?.[e];if(!n)return 1/0;return t.numStartups-n}
function pgl(e){return getGlobalConfig().pluginSuggestionShownCounts?.[e]??0}
function mgl(e){return getGlobalConfig().pluginSuggestionDiscoverShownCounts?.[e]??0}
function fgl(e){if(e.length===0)return;saveGlobalConfig((t)=>{let n=t.pluginSuggestionDiscoverShownCounts??{};if(e.every((o)=>(n[o]??0)>0))return t;let r={...n};for(let o of e)r[o]=(r[o]??0)+1;return{...t,pluginSuggestionDiscoverShownCounts:r}})}
var Q8t=b(()=>{tr()});
export {HKn,IKn,dPe,pgl,mgl,fgl,Q8t};
