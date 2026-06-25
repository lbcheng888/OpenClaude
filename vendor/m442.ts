// @ts-nocheck
import {y5,pAt} from "./m440.ts";
import {b} from "../runtime.ts";
function kEe(e,t,n){n=n||{};for(let[r,o]of Object.entries(t))switch(r){case"$or":if(!nJo(e,o,n))return!1;break;case"$nor":if(nJo(e,o,n))return!1;break;case"$and":if(!WBc(e,o,n))return!1;break;case"$not":if(kEe(e,o,n))return!1;break;default:if(!fAt(o,FBc(e,r),n))return!1}return!0}
function FBc(e,t){let n=t.split("."),r=e;for(let o=0;o<n.length;o++)if(r&&typeof r==="object"&&n[o]in r)r=r[n[o]];else return null;return r}
function BBc(e){if(!dgr[e])dgr[e]=new RegExp(e.replace(/([^\\])\//g,"$1\\/"));return dgr[e]}
function fAt(e,t,n){if(typeof e==="string")return t+""===e;if(typeof e==="number")return t*1===e;if(typeof e==="boolean")return t!==null&&!!t===e;if(e===null)return t===null;if(Array.isArray(e)||!rJo(e))return JSON.stringify(t)===JSON.stringify(e);for(let r in e)if(!qBc(r,t,e[r],n))return!1;return!0}
function rJo(e){let t=Object.keys(e);return t.length>0&&t.filter((n)=>n[0]==="$").length===t.length}
function UBc(e){if(e===null)return"null";if(Array.isArray(e))return"array";let t=typeof e;if(["string","number","boolean","object","undefined"].includes(t))return t;return"unknown"}
function $Bc(e,t,n){if(!Array.isArray(e))return!1;let r=rJo(t)?(o)=>fAt(t,o,n):(o)=>kEe(o,t,n);for(let o=0;o<e.length;o++)if(e[o]&&r(e[o]))return!0;return!1}
function cnn(e,t){if(Array.isArray(e))return e.some((n)=>t.includes(n));return t.includes(e)}
function qBc(e,t,n,r){switch(e){case"$veq":return y5(t)===y5(n);case"$vne":return y5(t)!==y5(n);case"$vgt":return y5(t)>y5(n);case"$vgte":return y5(t)>=y5(n);case"$vlt":return y5(t)<y5(n);case"$vlte":return y5(t)<=y5(n);case"$eq":return t===n;case"$ne":return t!==n;case"$lt":return t<n;case"$lte":return t<=n;case"$gt":return t>n;case"$gte":return t>=n;case"$exists":return n?t!=null:t==null;case"$in":if(!Array.isArray(n))return!1;return cnn(t,n);case"$inGroup":return cnn(t,r[n]||[]);case"$notInGroup":return!cnn(t,r[n]||[]);case"$nin":if(!Array.isArray(n))return!1;return!cnn(t,n);case"$not":return!fAt(n,t,r);case"$size":if(!Array.isArray(t))return!1;return fAt(n,t.length,r);case"$elemMatch":return $Bc(t,n,r);case"$all":if(!Array.isArray(t))return!1;for(let o=0;o<n.length;o++){let s=!1;for(let i=0;i<t.length;i++)if(fAt(n[o],t[i],r)){s=!0;break}if(!s)return!1}return!0;case"$regex":try{return BBc(n).test(t)}catch(o){return!1}case"$type":return UBc(t)===n;default:return console.error("Unknown operator: "+e),!1}}
function nJo(e,t,n){if(!t.length)return!0;for(let r=0;r<t.length;r++)if(kEe(e,t[r],n))return!0;return!1}
function WBc(e,t,n){for(let r=0;r<t.length;r++)if(!kEe(e,t[r],n))return!1;return!0}
var dgr;
var oJo=b(()=>{pAt();dgr={}});
export {kEe,FBc,BBc,fAt,rJo,UBc,$Bc,cnn,qBc,nJo,WBc,dgr,oJo};
