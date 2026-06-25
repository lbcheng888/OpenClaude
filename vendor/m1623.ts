// @ts-nocheck
import {EPr,jfn} from "./m1622.ts";
import {b} from "../runtime.ts";
function*Cqu(e){if(!e)return;if(Uzs in e){let{values:r,nulls:o}=e;yield*r.entries();for(let s of o)yield[s,null];return}let t=!1,n;if(e instanceof Headers)n=e.entries();else if(EPr(e))n=e;else t=!0,n=Object.entries(e??{});for(let r of n){let o=r[0];if(typeof o!=="string")throw TypeError("expected header name to be a string");let s=EPr(r[1])?r[1]:[r[1]],i=!1;for(let a of s){if(a===void 0)continue;if(t&&!i)i=!0,yield[o,null];yield[o,a]}}}
var Uzs,CPr=(e)=>{let t=new Headers,n=new Set;for(let r of e){let o=new Set;for(let[s,i]of Cqu(r)){let a=s.toLowerCase();if(!o.has(a))t.delete(s),o.add(a);if(i===null)t.delete(s),n.add(a);else t.append(s,i),n.delete(a)}}return{[Uzs]:!0,values:t,nulls:n}};
var $zs=b(()=>{jfn();Uzs=Symbol.for("brand.privateNullableHeaders")});
export {Cqu,Uzs,CPr,$zs};
