// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var BIu=(e)=>Array.isArray(e)?e:[e];
var vMs=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=vMs(e[n]);return e};
var FIu=(e)=>e!=null;
class Tcn{trace(){}debug(){}info(){}warn(){}error(){}}
function wMs(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,qIu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}RMs(r,null,s,i)}return r}
var UIu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},$Iu=(e,t)=>{let n={};for(let r in t)RMs(n,e,t,r);return n},qIu=(e,t,n)=>wMs(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),RMs=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=jIu,l=WIu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},jIu=(e)=>e!=null,WIu=(e)=>e;
var xMs;
var kMs=b(()=>{xMs=M(tC(),1)});
export {BIu,vMs,FIu,Tcn,wMs,UIu,$Iu,qIu,RMs,jIu,WIu,xMs,kMs};
