// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var Yvu=(e)=>Array.isArray(e)?e:[e];
var FHs=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=FHs(e[n]);return e};
var Jvu=(e)=>e!=null;
class Fln{trace(){}debug(){}info(){}warn(){}error(){}}
function BHs(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,Zvu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}UHs(r,null,s,i)}return r}
var Xvu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},Qvu=(e,t)=>{let n={};for(let r in t)UHs(n,e,t,r);return n},Zvu=(e,t,n)=>BHs(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),UHs=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=ewu,l=twu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},ewu=(e)=>e!=null,twu=(e)=>e;
var $Hs;
var qHs=b(()=>{$Hs=x(sC(),1)});
export {Yvu,FHs,Jvu,Fln,BHs,Xvu,Qvu,Zvu,UHs,ewu,twu,$Hs,qHs};
