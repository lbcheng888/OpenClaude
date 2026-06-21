// @ts-nocheck
import {ACe,nRt} from "./m1702.ts";
import {dse,Kpn} from "./m1704.ts";
import {b} from "../runtime.ts";
function cVs(e,t,n,r){let o=tBu(t,n,r),s=!1,i=lVs(e,o);if(t.path){let c=lVs(t.path,o);if(t.path==="/{nextLink}"&&c.startsWith("/"))c=c.substring(1);if(nBu(c))i=c,s=!0;else i=rBu(i,c)}let{queryParams:a,sequenceParams:l}=oBu(t,n,r);return i=iBu(i,a,l,s),i}
function lVs(e,t){let n=e;for(let[r,o]of t)n=n.split(r).join(o);return n}
function tBu(e,t,n){var r;let o=new Map;if((r=e.urlParameters)===null||r===void 0?void 0:r.length)for(let s of e.urlParameters){let i=ACe(t,s,n),a=dse(s);if(i=e.serializer.serialize(s.mapper,i,a),!s.skipEncoding)i=encodeURIComponent(i);o.set(`{${s.mapper.serializedName||a}}`,i)}return o}
function nBu(e){return e.includes("://")}
function rBu(e,t){if(!t)return e;let n=new URL(e),r=n.pathname;if(!r.endsWith("/"))r=`${r}/`;if(t.startsWith("/"))t=t.substring(1);let o=t.indexOf("?");if(o!==-1){let s=t.substring(0,o),i=t.substring(o+1);if(r=r+s,i)n.search=n.search?`${n.search}&${i}`:i}else r=r+t;return n.pathname=r,n.toString()}
function oBu(e,t,n){var r;let o=new Map,s=new Set;if((r=e.queryParameters)===null||r===void 0?void 0:r.length)for(let i of e.queryParameters){if(i.mapper.type.name==="Sequence"&&i.mapper.serializedName)s.add(i.mapper.serializedName);let a=ACe(t,i,n);if(a!==void 0&&a!==null||i.mapper.required){a=e.serializer.serialize(i.mapper,a,dse(i));let l=i.collectionFormat?eBu[i.collectionFormat]:"";if(Array.isArray(a))a=a.map((c)=>{if(c===null||c===void 0)return"";return c});if(i.collectionFormat==="Multi"&&a.length===0)continue;else if(Array.isArray(a)&&(i.collectionFormat==="SSV"||i.collectionFormat==="TSV"))a=a.join(l);if(!i.skipEncoding)if(Array.isArray(a))a=a.map((c)=>encodeURIComponent(c));else a=encodeURIComponent(a);if(Array.isArray(a)&&(i.collectionFormat==="CSV"||i.collectionFormat==="Pipes"))a=a.join(l);o.set(i.mapper.serializedName||dse(i),a)}}return{queryParams:o,sequenceParams:s}}
function sBu(e){let t=new Map;if(!e||e[0]!=="?")return t;e=e.slice(1);let n=e.split("&");for(let r of n){let[o,s]=r.split("=",2),i=t.get(o);if(i)if(Array.isArray(i))i.push(s);else t.set(o,[i,s]);else t.set(o,s)}return t}
function iBu(e,t,n,r=!1){if(t.size===0)return e;let o=new URL(e),s=sBu(o.search);for(let[a,l]of t){let c=s.get(a);if(Array.isArray(c))if(Array.isArray(l)){c.push(...l);let u=new Set(c);s.set(a,Array.from(u))}else c.push(l);else if(c){if(Array.isArray(l))l.unshift(c);else if(n.has(a))s.set(a,[c,l]);if(!r)s.set(a,l)}else s.set(a,l)}let i=[];for(let[a,l]of s)if(typeof l==="string")i.push(`${a}=${l}`);else if(Array.isArray(l))for(let c of l)i.push(`${a}=${c}`);else i.push(`${a}=${l}`);return o.search=i.length?`?${i.join("&")}`:"",o.toString()}
var eBu;
var uVs=b(()=>{nRt();Kpn();eBu={CSV:",",SSV:" ",Multi:"Multi",TSV:"\t",Pipes:"|"}});
export {cVs,lVs,tBu,nBu,rBu,oBu,sBu,iBu,eBu,uVs};
