// @ts-nocheck
import {b} from "../runtime.ts";
import {XXr,JXr} from "./m3198.ts";
function N7d(e){let t=0,n=0,r=!1;return new TransformStream({transform(o,s){let i=-1;for(let a=0;a<o.length;a++){let l=o[a];if(r&&l===10){r=!1;continue}if(r=!1,l===10||l===13){if(n===0)i=a;n=0,r=l===13}else n++}if(t=i>=0?o.length-1-i:t+o.length,t>e){s.error(new tla(e));return}s.enqueue(o)}})}
function tit(e){return async(t,n)=>{let r=await e(t,n);if(!r.body||r.body.locked||r.status<200||r.status>599)return r;let o=r.body.pipeThrough(N7d(M7d)),s=new Response(o,{status:r.status,statusText:r.statusText,headers:r.headers});return Object.defineProperty(s,"url",{value:r.url}),Object.defineProperty(s,"redirected",{value:r.redirected}),Object.defineProperty(s,"type",{value:r.type}),s}}
var M7d,QXr="without an SSE event boundary",tla;
var nla=b(()=>{XXr();M7d=JXr;tla=class tla extends Error{constructor(e){super(`streamed >${Math.round(e/1024/1024)}MB ${QXr}. The server is likely returning non-protocol data. Disconnecting to prevent unbounded memory growth.`);this.name="HttpBodyOverflowError"}}});
export {N7d,tit,M7d,QXr,tla,nla};
