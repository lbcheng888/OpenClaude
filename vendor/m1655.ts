// @ts-nocheck
import {nJe,cse,IHr} from "./m1654.ts";
import {ase,$wt} from "./m1635.ts";
import {b} from "../runtime.ts";
function L1u(e){var t;let n={};for(let[r,o]of e.entries())(t=n[r])!==null&&t!==void 0||(n[r]=[]),n[r].push(o);return n}
function PHr(){return{name:DHr,async sendRequest(e,t){if(nJe&&typeof FormData<"u"&&e.body instanceof FormData)e.formData=L1u(e.body),e.body=void 0;if(e.formData){let n=e.headers.get("Content-Type");if(n&&n.indexOf("application/x-www-form-urlencoded")!==-1)e.body=M1u(e.formData);else await N1u(e.formData,e);e.formData=void 0}return t(e)}}}
function M1u(e){let t=new URLSearchParams;for(let[n,r]of Object.entries(e))if(Array.isArray(r))for(let o of r)t.append(n,o.toString());else t.append(n,r.toString());return t.toString()}
async function N1u(e,t){let n=t.headers.get("Content-Type");if(n&&!n.startsWith("multipart/form-data"))return;t.headers.set("Content-Type",n!==null&&n!==void 0?n:"multipart/form-data");let r=[];for(let[o,s]of Object.entries(e))for(let i of Array.isArray(s)?s:[s])if(typeof i==="string")r.push({headers:ase({"Content-Disposition":`form-data; name="${o}"`}),body:cse(i,"utf-8")});else if(i===void 0||i===null||typeof i!=="object")throw Error(`Unexpected value for key ${o}: ${i}. Value should be serialized to string first.`);else{let a=i.name||"blob",l=ase();l.set("Content-Disposition",`form-data; name="${o}"; filename="${a}"`),l.set("Content-Type",i.type||"application/octet-stream"),r.push({headers:l,body:i})}t.multipartBody={parts:r}}
var DHr="formDataPolicy";
var rWs=b(()=>{IHr();$wt()});
export {L1u,PHr,M1u,N1u,DHr,rWs};
