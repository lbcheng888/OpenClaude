// @ts-nocheck
import {Rrr,lSe} from "./m136.ts";
import {b} from "../runtime.ts";
var x$o=()=>{};
class Rp{constructor(e){this._client=e}}
function*Dhc(e){if(!e)return;if(k$o in e){let{values:r,nulls:o}=e;yield*r.entries();for(let s of o)yield[s,null];return}let t=!1,n;if(e instanceof Headers)n=e.entries();else if(Rrr(e))n=e;else t=!0,n=Object.entries(e??{});for(let r of n){let o=r[0];if(typeof o!=="string")throw TypeError("expected header name to be a string");let s=Rrr(r[1])?r[1]:[r[1]],i=!1;for(let a of s){if(a===void 0)continue;if(t&&!i)i=!0,yield[o,null];yield[o,a]}}}
var k$o,Ss=(e)=>{let t=new Headers,n=new Set;for(let r of e){let o=new Set;for(let[s,i]of Dhc(r)){let a=s.toLowerCase();if(!o.has(a))t.delete(s),o.add(a);if(i===null)t.delete(s),n.add(a);else t.append(s,i),n.delete(a)}}return{[k$o]:!0,values:t,nulls:n}};
var QC=b(()=>{lSe();k$o=Symbol.for("brand.privateNullableHeaders")});
export {x$o,Rp,Dhc,k$o,Ss,QC};
