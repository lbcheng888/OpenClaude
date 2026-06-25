// @ts-nocheck
import {pKs,hFe} from "./m1542.ts";
import {b} from "../runtime.ts";
var wKs=(e,t)=>{e=e.toLowerCase();for(let n of Object.keys(t))if(e===n.toLowerCase())return!0;return!1};
var Rfn=({headers:e,query:t,...n})=>({...n,headers:{...e},query:t?a4u(t):void 0}),a4u=(e)=>Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{});
var ODr=(e,t={})=>{let{headers:n,query:r={}}=typeof e.clone==="function"?e.clone():Rfn(e);for(let o of Object.keys(n)){let s=o.toLowerCase();if(s.slice(0,6)==="x-amz-"&&!t.unhoistableHeaders?.has(s))r[o]=n[o],delete n[o]}return{...e,headers:n,query:r}};
var LDr=()=>{};
var vfn=(e)=>{e=typeof e.clone==="function"?e.clone():Rfn(e);for(let t of Object.keys(e.headers))if(pKs.indexOf(t.toLowerCase())>-1)delete e.headers[t];return e};
var MDr=b(()=>{hFe()});
export {wKs,Rfn,a4u,ODr,LDr,vfn,MDr};
