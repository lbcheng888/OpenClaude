// @ts-nocheck
import {Q} from "../runtime.ts";
import {BM} from "./m1964.ts";
import {x0t} from "./m1978.ts";
var gFr=Q((pyn)=>{Object.defineProperty(pyn,"__esModule",{value:!0});pyn.AwsRequestSigner=void 0;var dyn=BM(),Eii=x0t(),bii="AWS4-HMAC-SHA256",OQu="aws4_request";class Cii{getCredentials;region;crypto;constructor(e,t){this.getCredentials=e,this.region=t,this.crypto=(0,Eii.createCrypto)()}async getRequestOptions(e){if(!e.url)throw RangeError('"url" is required in "amzOptions"');let t=typeof e.data==="object"?JSON.stringify(e.data):e.data,n=e.url,r=e.method||"GET",o=e.body||t,s=e.headers,i=await this.getCredentials(),a=new URL(n);if(typeof o!=="string"&&o!==void 0)throw TypeError(`'requestPayload' is expected to be a string if provided. Got: ${o}`);let l=await MQu({crypto:this.crypto,host:a.host,canonicalUri:a.pathname,canonicalQuerystring:a.search.slice(1),method:r,region:this.region,securityCredentials:i,requestPayload:o,additionalAmzHeaders:s}),c=dyn.Gaxios.mergeHeaders(l.amzDate?{"x-amz-date":l.amzDate}:{},{authorization:l.authorizationHeader,host:a.host},s||{});if(i.token)dyn.Gaxios.mergeHeaders(c,{"x-amz-security-token":i.token});let u={url:n,method:r,headers:c};if(o!==void 0)u.body=o;return u}}pyn.AwsRequestSigner=Cii;async function M0t(e,t,n){return await e.signWithHmacSha256(t,n)}async function LQu(e,t,n,r,o){let s=await M0t(e,`AWS4${t}`,n),i=await M0t(e,s,r),a=await M0t(e,i,o);return await M0t(e,a,"aws4_request")}async function MQu(e){let t=dyn.Gaxios.mergeHeaders(e.additionalAmzHeaders),n=e.requestPayload||"",r=e.host.split(".")[0],o=new Date,s=o.toISOString().replace(/[-:]/g,"").replace(/\.[0-9]+/,""),i=o.toISOString().replace(/[-]/g,"").replace(/T.*/,"");if(e.securityCredentials.token)t.set("x-amz-security-token",e.securityCredentials.token);let a=dyn.Gaxios.mergeHeaders({host:e.host},t.has("date")?{}:{"x-amz-date":s},t),l="",c=[...a.keys()].sort();c.forEach((T)=>{l+=`${T}:${a.get(T)}
`});let u=c.join(";"),d=await e.crypto.sha256DigestHex(n),p=`${e.method.toUpperCase()}
${e.canonicalUri}
${e.canonicalQuerystring}
${l}
${u}
${d}`,m=`${i}/${e.region}/${r}/${OQu}`,f=`${bii}
${s}
${m}
`+await e.crypto.sha256DigestHex(p),h=await LQu(e.crypto,e.securityCredentials.secretAccessKey,i,e.region,r),g=await M0t(e.crypto,h,f),_=`${bii} Credential=${e.securityCredentials.accessKeyId}/${m}, SignedHeaders=${u}, Signature=${(0,Eii.fromArrayBufferToHex)(g)}`;return{amzDate:t.has("date")?void 0:s,authorizationHeader:_,canonicalQuerystring:e.canonicalQuerystring}}});
export {gFr};
