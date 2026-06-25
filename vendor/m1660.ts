// @ts-nocheck
import {eQe,lse,aOr} from "./m1659.ts";
import {ise,fHt} from "./m1640.ts";
import {b} from "../runtime.ts";
function e6u(e){var t;let n={};for(let[r,o]of e.entries())(t=n[r])!==null&&t!==void 0||(n[r]=[]),n[r].push(o);return n}
function cOr(){return{name:lOr,async sendRequest(e,t){if(eQe&&typeof FormData<"u"&&e.body instanceof FormData)e.formData=e6u(e.body),e.body=void 0;if(e.formData){let n=e.headers.get("Content-Type");if(n&&n.indexOf("application/x-www-form-urlencoded")!==-1)e.body=t6u(e.formData);else await n6u(e.formData,e);e.formData=void 0}return t(e)}}}
function t6u(e){let t=new URLSearchParams;for(let[n,r]of Object.entries(e))if(Array.isArray(r))for(let o of r)t.append(n,o.toString());else t.append(n,r.toString());return t.toString()}
async function n6u(e,t){let n=t.headers.get("Content-Type");if(n&&!n.startsWith("multipart/form-data"))return;t.headers.set("Content-Type",n!==null&&n!==void 0?n:"multipart/form-data");let r=[];for(let[o,s]of Object.entries(e))for(let i of Array.isArray(s)?s:[s])if(typeof i==="string")r.push({headers:ise({"Content-Disposition":`form-data; name="${o}"`}),body:lse(i,"utf-8")});else if(i===void 0||i===null||typeof i!=="object")throw Error(`Unexpected value for key ${o}: ${i}. Value should be serialized to string first.`);else{let a=i.name||"blob",l=ise();l.set("Content-Disposition",`form-data; name="${o}"; filename="${a}"`),l.set("Content-Type",i.type||"application/octet-stream"),r.push({headers:l,body:i})}t.multipartBody={parts:r}}
var lOr="formDataPolicy";
var Qjs=b(()=>{aOr();fHt()});
export {e6u,cOr,t6u,n6u,lOr,Qjs};
