// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var SRu=(e)=>Array.isArray(e)?e:[e];
var W0s=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=W0s(e[n]);return e};
var bRu=(e)=>e!=null;
class _ln{trace(){}debug(){}info(){}warn(){}error(){}}
function G0s(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,vRu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}V0s(r,null,s,i)}return r}
var ERu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},CRu=(e,t)=>{let n={};for(let r in t)V0s(n,e,t,r);return n},vRu=(e,t,n)=>G0s(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),V0s=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=wRu,l=RRu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},wRu=(e)=>e!=null,RRu=(e)=>e;
var K0s;
var z0s=b(()=>{K0s=M(tC(),1)});
export {SRu,W0s,bRu,_ln,G0s,ERu,CRu,vRu,V0s,wRu,RRu,K0s,z0s};
