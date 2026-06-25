// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var NMu=(e)=>Array.isArray(e)?e:[e];
var F1s=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=F1s(e[n]);return e};
var FMu=(e)=>e!=null;
class ndn{trace(){}debug(){}info(){}warn(){}error(){}}
function B1s(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,$Mu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}U1s(r,null,s,i)}return r}
var BMu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},UMu=(e,t)=>{let n={};for(let r in t)U1s(n,e,t,r);return n},$Mu=(e,t,n)=>B1s(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),U1s=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=qMu,l=WMu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},qMu=(e)=>e!=null,WMu=(e)=>e;
var $1s;
var q1s=b(()=>{$1s=x(sC(),1)});
export {NMu,F1s,FMu,ndn,B1s,BMu,UMu,$Mu,U1s,qMu,WMu,$1s,q1s};
