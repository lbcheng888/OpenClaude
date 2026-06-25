// @ts-nocheck
import {_Nr,x_n} from "./m1948.ts";
import {b} from "../runtime.ts";
function*XYu(e){if(!e)return;if(yoi in e){let{values:r,nulls:o}=e;yield*r.entries();for(let s of o)yield[s,null];return}let t=!1,n;if(e instanceof Headers)n=e.entries();else if(_Nr(e))n=e;else t=!0,n=Object.entries(e??{});for(let r of n){let o=r[0];if(typeof o!=="string")throw TypeError("expected header name to be a string");let s=_Nr(r[1])?r[1]:[r[1]],i=!1;for(let a of s){if(a===void 0)continue;if(t&&!i)i=!0,yield[o,null];yield[o,a]}}}
var yoi,yNr=(e)=>{let t=new Headers,n=new Set;for(let r of e){let o=new Set;for(let[s,i]of XYu(r)){let a=s.toLowerCase();if(!o.has(a))t.delete(s),o.add(a);if(i===null)t.delete(s),n.add(a);else t.append(s,i),n.delete(a)}}return{[yoi]:!0,values:t,nulls:n}};
var Toi=b(()=>{x_n();yoi=Symbol.for("brand.privateNullableHeaders")});
export {XYu,yoi,yNr,Toi};
