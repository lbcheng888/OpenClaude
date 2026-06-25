// @ts-nocheck
import {getCachedClientData,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {parseUserSpecifiedModel,getCanonicalName,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function GJp(){let e=getCachedClientData()?.model_notices;if(typeof e!=="object"||e===null||Array.isArray(e))return{};let t={};for(let[n,r]of Object.entries(e))if(n.trim().length>0&&typeof r==="string"&&r.length>0)t[n]=r;return t}
function hml(e){let t=GJp();if(Object.keys(t).length===0)return;let n=e.toLowerCase(),r=parseUserSpecifiedModel(e).toLowerCase(),o=getCanonicalName(r).toLowerCase();for(let[s,i]of Object.entries(t)){let a=s.toLowerCase();if(a===n||a===r||a===o||r.includes(a))return i}return}
var gml=b(()=>{tr();Ro()});
export {GJp,hml,gml};
