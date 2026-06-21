// @ts-nocheck
import {g6s,yNe} from "./m1537.ts";
import {b} from "../runtime.ts";
var D6s=(e,t)=>{e=e.toLowerCase();for(let n of Object.keys(t))if(e===n.toLowerCase())return!0;return!1};
var jdn=({headers:e,query:t,...n})=>({...n,headers:{...e},query:t?qLu(t):void 0}),qLu=(e)=>Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{});
var okr=(e,t={})=>{let{headers:n,query:r={}}=typeof e.clone==="function"?e.clone():jdn(e);for(let o of Object.keys(n)){let s=o.toLowerCase();if(s.slice(0,6)==="x-amz-"&&!t.unhoistableHeaders?.has(s))r[o]=n[o],delete n[o]}return{...e,headers:n,query:r}};
var skr=()=>{};
var Wdn=(e)=>{e=typeof e.clone==="function"?e.clone():jdn(e);for(let t of Object.keys(e.headers))if(g6s.indexOf(t.toLowerCase())>-1)delete e.headers[t];return e};
var ikr=b(()=>{yNe()});
export {D6s,jdn,qLu,okr,skr,Wdn,ikr};
