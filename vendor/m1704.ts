// @ts-nocheck
import {b} from "../runtime.ts";
var HOr="$",vhn="_";
function n5u(e,t){return t!=="Composite"&&t!=="Dictionary"&&(typeof e==="string"||typeof e==="number"||typeof e==="boolean"||(t===null||t===void 0?void 0:t.match(/^(Date|DateTime|DateTimeRfc1123|UnixTime|ByteArray|Base64Url)$/i))!==null||e===void 0||e===null)}
function r5u(e){let t=Object.assign(Object.assign({},e.headers),e.body);if(e.hasNullableType&&Object.getOwnPropertyNames(t).length===0)return e.shouldWrapBody?{body:null}:null;else return e.shouldWrapBody?Object.assign(Object.assign({},e.headers),{body:e.body}):t}
function IOr(e,t){var n,r;let o=e.parsedHeaders;if(e.request.method==="HEAD")return Object.assign(Object.assign({},o),{body:e.parsedBody});let s=t&&t.bodyMapper,i=Boolean(s===null||s===void 0?void 0:s.nullable),a=s===null||s===void 0?void 0:s.type.name;if(a==="Stream")return Object.assign(Object.assign({},o),{blobBody:e.blobBody,readableStreamBody:e.readableStreamBody});let l=a==="Composite"&&s.type.modelProperties||{},c=Object.keys(l).some((u)=>l[u].serializedName==="");if(a==="Sequence"||c){let u=(n=e.parsedBody)!==null&&n!==void 0?n:[];for(let d of Object.keys(l))if(l[d].serializedName)u[d]=(r=e.parsedBody)===null||r===void 0?void 0:r[d];if(o)for(let d of Object.keys(o))u[d]=o[d];return i&&!e.parsedBody&&!o&&Object.getOwnPropertyNames(l).length===0?null:u}return r5u({body:e.parsedBody,headers:o,hasNullableType:i,shouldWrapBody:n5u(e.parsedBody,a)})}
var qJs=()=>{};
var Gme;
var whn=b(()=>{Gme={Base64Url:"Base64Url",Boolean:"Boolean",ByteArray:"ByteArray",Composite:"Composite",Date:"Date",DateTime:"DateTime",DateTimeRfc1123:"DateTimeRfc1123",Dictionary:"Dictionary",Enum:"Enum",Number:"Number",Object:"Object",Sequence:"Sequence",String:"String",Stream:"Stream",TimeSpan:"TimeSpan",UnixTime:"UnixTime"}});
export {HOr,vhn,n5u,r5u,IOr,qJs,Gme,whn};
