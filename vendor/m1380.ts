// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var m2u=(e)=>Array.isArray(e)?e:[e];
var c4s=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=c4s(e[n]);return e};
var f2u=(e)=>e!=null;
class Dpn{trace(){}debug(){}info(){}warn(){}error(){}}
function u4s(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,_2u(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}d4s(r,null,s,i)}return r}
var h2u=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},g2u=(e,t)=>{let n={};for(let r in t)d4s(n,e,t,r);return n},_2u=(e,t,n)=>u4s(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),d4s=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=y2u,l=T2u,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},y2u=(e)=>e!=null,T2u=(e)=>e;
var p4s;
var m4s=b(()=>{p4s=x(sC(),1)});
export {m2u,c4s,f2u,Dpn,u4s,h2u,g2u,_2u,d4s,y2u,T2u,p4s,m4s};
