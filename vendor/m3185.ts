// @ts-nocheck
import {b} from "../runtime.ts";
import {_Kr,gKr} from "./m3184.ts";
function t3d(e){let t=0,n=0,r=!1;return new TransformStream({transform(o,s){let i=-1;for(let a=0;a<o.length;a++){let l=o[a];if(r&&l===10){r=!1;continue}if(r=!1,l===10||l===13){if(n===0)i=a;n=0,r=l===13}else n++}if(t=i>=0?o.length-1-i:t+o.length,t>e){s.error(new nta(e));return}s.enqueue(o)}})}
function tot(e){return async(t,n)=>{let r=await e(t,n);if(!r.body||r.body.locked||r.status<200||r.status>599)return r;let o=r.body.pipeThrough(t3d(e3d)),s=new Response(o,{status:r.status,statusText:r.statusText,headers:r.headers});return Object.defineProperty(s,"url",{value:r.url}),Object.defineProperty(s,"redirected",{value:r.redirected}),Object.defineProperty(s,"type",{value:r.type}),s}}
var e3d,yKr="without an SSE event boundary",nta;
var rta=b(()=>{_Kr();e3d=gKr;nta=class nta extends Error{constructor(e){super(`streamed >${Math.round(e/1024/1024)}MB ${yKr}. The server is likely returning non-protocol data. Disconnecting to prevent unbounded memory growth.`);this.name="HttpBodyOverflowError"}}});
export {t3d,tot,e3d,yKr,nta,rta};
