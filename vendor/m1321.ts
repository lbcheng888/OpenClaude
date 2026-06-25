// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var tUu=(e)=>Array.isArray(e)?e:[e];
var S2s=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=S2s(e[n]);return e};
var nUu=(e)=>e!=null;
class opn{trace(){}debug(){}info(){}warn(){}error(){}}
function b2s(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,sUu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}E2s(r,null,s,i)}return r}
var rUu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},oUu=(e,t)=>{let n={};for(let r in t)E2s(n,e,t,r);return n},sUu=(e,t,n)=>b2s(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),E2s=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=iUu,l=aUu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},iUu=(e)=>e!=null,aUu=(e)=>e;
var C2s;
var A2s=b(()=>{C2s=x(sC(),1)});
export {tUu,S2s,nUu,opn,b2s,rUu,oUu,sUu,E2s,iUu,aUu,C2s,A2s};
