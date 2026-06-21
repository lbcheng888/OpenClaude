// @ts-nocheck
import {n8,USt} from "./m436.ts";
import {b} from "../runtime.ts";
function KSe(e,t,n){n=n||{};for(let[r,o]of Object.entries(t))switch(r){case"$or":if(!sGo(e,o,n))return!1;break;case"$nor":if(sGo(e,o,n))return!1;break;case"$and":if(!BIc(e,o,n))return!1;break;case"$not":if(KSe(e,o,n))return!1;break;default:if(!qSt(o,PIc(e,r),n))return!1}return!0}
function PIc(e,t){let n=t.split("."),r=e;for(let o=0;o<n.length;o++)if(r&&typeof r==="object"&&n[o]in r)r=r[n[o]];else return null;return r}
function OIc(e){if(!Ndr[e])Ndr[e]=new RegExp(e.replace(/([^\\])\//g,"$1\\/"));return Ndr[e]}
function qSt(e,t,n){if(typeof e==="string")return t+""===e;if(typeof e==="number")return t*1===e;if(typeof e==="boolean")return t!==null&&!!t===e;if(e===null)return t===null;if(Array.isArray(e)||!iGo(e))return JSON.stringify(t)===JSON.stringify(e);for(let r in e)if(!NIc(r,t,e[r],n))return!1;return!0}
function iGo(e){let t=Object.keys(e);return t.length>0&&t.filter((n)=>n[0]==="$").length===t.length}
function LIc(e){if(e===null)return"null";if(Array.isArray(e))return"array";let t=typeof e;if(["string","number","boolean","object","undefined"].includes(t))return t;return"unknown"}
function MIc(e,t,n){if(!Array.isArray(e))return!1;let r=iGo(t)?(o)=>qSt(t,o,n):(o)=>KSe(o,t,n);for(let o=0;o<e.length;o++)if(e[o]&&r(e[o]))return!0;return!1}
function kZt(e,t){if(Array.isArray(e))return e.some((n)=>t.includes(n));return t.includes(e)}
function NIc(e,t,n,r){switch(e){case"$veq":return n8(t)===n8(n);case"$vne":return n8(t)!==n8(n);case"$vgt":return n8(t)>n8(n);case"$vgte":return n8(t)>=n8(n);case"$vlt":return n8(t)<n8(n);case"$vlte":return n8(t)<=n8(n);case"$eq":return t===n;case"$ne":return t!==n;case"$lt":return t<n;case"$lte":return t<=n;case"$gt":return t>n;case"$gte":return t>=n;case"$exists":return n?t!=null:t==null;case"$in":if(!Array.isArray(n))return!1;return kZt(t,n);case"$inGroup":return kZt(t,r[n]||[]);case"$notInGroup":return!kZt(t,r[n]||[]);case"$nin":if(!Array.isArray(n))return!1;return!kZt(t,n);case"$not":return!qSt(n,t,r);case"$size":if(!Array.isArray(t))return!1;return qSt(n,t.length,r);case"$elemMatch":return MIc(t,n,r);case"$all":if(!Array.isArray(t))return!1;for(let o=0;o<n.length;o++){let s=!1;for(let i=0;i<t.length;i++)if(qSt(n[o],t[i],r)){s=!0;break}if(!s)return!1}return!0;case"$regex":try{return OIc(n).test(t)}catch(o){return!1}case"$type":return LIc(t)===n;default:return console.error("Unknown operator: "+e),!1}}
function sGo(e,t,n){if(!t.length)return!0;for(let r=0;r<t.length;r++)if(KSe(e,t[r],n))return!0;return!1}
function BIc(e,t,n){for(let r=0;r<t.length;r++)if(!KSe(e,t[r],n))return!1;return!0}
var Ndr;
var aGo=b(()=>{USt();Ndr={}});
export {KSe,PIc,OIc,qSt,iGo,LIc,MIc,kZt,NIc,sGo,BIc,Ndr,aGo};
