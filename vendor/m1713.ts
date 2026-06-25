// @ts-nocheck
import {QAe,HHt} from "./m1707.ts";
import {use,Hhn} from "./m1709.ts";
import {b} from "../runtime.ts";
function oXs(e,t,n,r){let o=S5u(t,n,r),s=!1,i=rXs(e,o);if(t.path){let c=rXs(t.path,o);if(t.path==="/{nextLink}"&&c.startsWith("/"))c=c.substring(1);if(b5u(c))i=c,s=!0;else i=E5u(i,c)}let{queryParams:a,sequenceParams:l}=C5u(t,n,r);return i=R5u(i,a,l,s),i}
function rXs(e,t){let n=e;for(let[r,o]of t)n=n.split(r).join(o);return n}
function S5u(e,t,n){var r;let o=new Map;if((r=e.urlParameters)===null||r===void 0?void 0:r.length)for(let s of e.urlParameters){let i=QAe(t,s,n),a=use(s);if(i=e.serializer.serialize(s.mapper,i,a),!s.skipEncoding)i=encodeURIComponent(i);o.set(`{${s.mapper.serializedName||a}}`,i)}return o}
function b5u(e){return e.includes("://")}
function E5u(e,t){if(!t)return e;let n=new URL(e),r=n.pathname;if(!r.endsWith("/"))r=`${r}/`;if(t.startsWith("/"))t=t.substring(1);let o=t.indexOf("?");if(o!==-1){let s=t.substring(0,o),i=t.substring(o+1);if(r=r+s,i)n.search=n.search?`${n.search}&${i}`:i}else r=r+t;return n.pathname=r,n.toString()}
function C5u(e,t,n){var r;let o=new Map,s=new Set;if((r=e.queryParameters)===null||r===void 0?void 0:r.length)for(let i of e.queryParameters){if(i.mapper.type.name==="Sequence"&&i.mapper.serializedName)s.add(i.mapper.serializedName);let a=QAe(t,i,n);if(a!==void 0&&a!==null||i.mapper.required){a=e.serializer.serialize(i.mapper,a,use(i));let l=i.collectionFormat?T5u[i.collectionFormat]:"";if(Array.isArray(a))a=a.map((c)=>{if(c===null||c===void 0)return"";return c});if(i.collectionFormat==="Multi"&&a.length===0)continue;else if(Array.isArray(a)&&(i.collectionFormat==="SSV"||i.collectionFormat==="TSV"))a=a.join(l);if(!i.skipEncoding)if(Array.isArray(a))a=a.map((c)=>encodeURIComponent(c));else a=encodeURIComponent(a);if(Array.isArray(a)&&(i.collectionFormat==="CSV"||i.collectionFormat==="Pipes"))a=a.join(l);o.set(i.mapper.serializedName||use(i),a)}}return{queryParams:o,sequenceParams:s}}
function A5u(e){let t=new Map;if(!e||e[0]!=="?")return t;e=e.slice(1);let n=e.split("&");for(let r of n){let[o,s]=r.split("=",2),i=t.get(o);if(i)if(Array.isArray(i))i.push(s);else t.set(o,[i,s]);else t.set(o,s)}return t}
function R5u(e,t,n,r=!1){if(t.size===0)return e;let o=new URL(e),s=A5u(o.search);for(let[a,l]of t){let c=s.get(a);if(Array.isArray(c))if(Array.isArray(l)){c.push(...l);let u=new Set(c);s.set(a,Array.from(u))}else c.push(l);else if(c){if(Array.isArray(l))l.unshift(c);else if(n.has(a))s.set(a,[c,l]);if(!r)s.set(a,l)}else s.set(a,l)}let i=[];for(let[a,l]of s)if(typeof l==="string")i.push(`${a}=${l}`);else if(Array.isArray(l))for(let c of l)i.push(`${a}=${c}`);else i.push(`${a}=${l}`);return o.search=i.length?`?${i.join("&")}`:"",o.toString()}
var T5u;
var sXs=b(()=>{HHt();Hhn();T5u={CSV:",",SSV:" ",Multi:"Multi",TSV:"\t",Pipes:"|"}});
export {oXs,rXs,S5u,b5u,E5u,C5u,A5u,R5u,T5u,sXs};
