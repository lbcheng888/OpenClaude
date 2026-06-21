// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var gpu=(e)=>Array.isArray(e)?e:[e];
var cgs=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=cgs(e[n]);return e};
var _pu=(e)=>e!=null;
class esn{trace(){}debug(){}info(){}warn(){}error(){}}
function ugs(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,Spu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}dgs(r,null,s,i)}return r}
var ypu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},Tpu=(e,t)=>{let n={};for(let r in t)dgs(n,e,t,r);return n},Spu=(e,t,n)=>ugs(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),dgs=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=bpu,l=Epu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},bpu=(e)=>e!=null,Epu=(e)=>e;
var pgs;
var mgs=b(()=>{pgs=M(tC(),1)});
export {gpu,cgs,_pu,esn,ugs,ypu,Tpu,Spu,dgs,bpu,Epu,pgs,mgs};
