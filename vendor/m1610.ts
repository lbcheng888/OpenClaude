// @ts-nocheck
import {Nkr,Mwt} from "./m1607.ts";
import {b} from "../runtime.ts";
var Dme=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
function*zMu(e){if(!e)return;if(L8s in e){let{values:r,nulls:o}=e;yield*r.entries();for(let s of o)yield[s,null];return}let t=!1,n;if(e instanceof Headers)n=e.entries();else if(Nkr(e))n=e;else t=!0,n=Object.entries(e??{});for(let r of n){let o=r[0];if(typeof o!=="string")throw TypeError("expected header name to be a string");let s=Nkr(r[1])?r[1]:[r[1]],i=!1;for(let a of s){if(a===void 0)continue;if(t&&!i)i=!0,yield[o,null];yield[o,a]}}}
var L8s,zYe=(e)=>{let t=new Headers,n=new Set;for(let r of e){let o=new Set;for(let[s,i]of zMu(r)){let a=s.toLowerCase();if(!o.has(a))t.delete(s),o.add(a);if(i===null)t.delete(s),n.add(a);else t.append(s,i),n.delete(a)}}return{[L8s]:!0,values:t,nulls:n}};
var Ukr=b(()=>{Mwt();L8s=Symbol.for("brand.privateNullableHeaders")});
export {Dme,zMu,L8s,zYe,Ukr};
