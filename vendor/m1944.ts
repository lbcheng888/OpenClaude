// @ts-nocheck
import {$Pr,Yfn} from "./m1943.ts";
import {b} from "../runtime.ts";
function*D6u(e){if(!e)return;if(EQs in e){let{values:r,nulls:o}=e;yield*r.entries();for(let s of o)yield[s,null];return}let t=!1,n;if(e instanceof Headers)n=e.entries();else if($Pr(e))n=e;else t=!0,n=Object.entries(e??{});for(let r of n){let o=r[0];if(typeof o!=="string")throw TypeError("expected header name to be a string");let s=$Pr(r[1])?r[1]:[r[1]],i=!1;for(let a of s){if(a===void 0)continue;if(t&&!i)i=!0,yield[o,null];yield[o,a]}}}
var EQs,qPr=(e)=>{let t=new Headers,n=new Set;for(let r of e){let o=new Set;for(let[s,i]of D6u(r)){let a=s.toLowerCase();if(!o.has(a))t.delete(s),o.add(a);if(i===null)t.delete(s),n.add(a);else t.append(s,i),n.delete(a)}}return{[EQs]:!0,values:t,nulls:n}};
var CQs=b(()=>{Yfn();EQs=Symbol.for("brand.privateNullableHeaders")});
export {D6u,EQs,qPr,CQs};
