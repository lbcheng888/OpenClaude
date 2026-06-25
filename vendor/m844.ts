// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var Lmu=(e)=>Array.isArray(e)?e:[e];
var Lfs=(e)=>{for(let n in e)if(e.hasOwnProperty(n)&&e[n]["#text"]!==void 0)e[n]=e[n]["#text"];else if(typeof e[n]==="object"&&e[n]!==null)e[n]=Lfs(e[n]);return e};
var Mmu=(e)=>e!=null;
class Mfs{trace(){}debug(){}info(){}warn(){}error(){}}
function Nfs(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,Bmu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}Ffs(r,null,s,i)}return r}
var Nmu=(e)=>{let t={};for(let[n,r]of Object.entries(e||{}))t[n]=[,r];return t},Fmu=(e,t)=>{let n={};for(let r in t)Ffs(n,e,t,r);return n},Bmu=(e,t,n)=>Nfs(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),Ffs=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=Umu,l=$mu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},Umu=(e)=>e!=null,$mu=(e)=>e;
var Bfs;
var Ufs=b(()=>{Bfs=x(sC(),1)});
export {Lmu,Lfs,Mmu,Mfs,Nfs,Nmu,Fmu,Bmu,Ffs,Umu,$mu,Bfs,Ufs};
