// @ts-nocheck
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {parseUserSpecifiedModel,getCanonicalName,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function c5p(){let e=getGlobalConfig().clientDataCache?.model_notices;if(typeof e!=="object"||e===null||Array.isArray(e))return{};let t={};for(let[n,r]of Object.entries(e))if(n.trim().length>0&&typeof r==="string"&&r.length>0)t[n]=r;return t}
function wil(e){let t=c5p();if(Object.keys(t).length===0)return;let n=e.toLowerCase(),r=parseUserSpecifiedModel(e).toLowerCase(),o=getCanonicalName(r).toLowerCase();for(let[s,i]of Object.entries(t)){let a=s.toLowerCase();if(a===n||a===r||a===o||r.includes(a))return i}return}
var Ril=b(()=>{Qn();Mo()});
export {c5p,wil,Ril};
