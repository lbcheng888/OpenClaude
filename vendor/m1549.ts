// @ts-nocheck
import {DDr,vKs} from "./m1547.ts";
import {yDr,ZVs} from "./m1535.ts";
import {bKs,uKs,oKs,bfn,sKs,iKs,lKs,aKs,cKs,yKs,ADr,fKs,iHt,dKs,hFe} from "./m1542.ts";
import {Cfn,CKs,wDr} from "./m1543.ts";
import {ODr,vfn,wKs,LDr,MDr} from "./m1548.ts";
import {Afn,kDr} from "./m1544.ts";
import {aHt,xDr} from "./m1546.ts";
import {AQ,rHt} from "./m1519.ts";
import {VAe} from "./m1539.ts";
import {HDr,IDr} from "./m1545.ts";
import {GAe,TDr} from "./m1536.ts";
import {b} from "../runtime.ts";
import {sHt} from "./m1541.ts";
var kKs=(e)=>l4u(e).toISOString().replace(/\.\d{3}Z$/,"Z"),l4u=(e)=>{if(typeof e==="number")return new Date(e*1000);if(typeof e==="string"){if(Number(e))return new Date(Number(e)*1000);return new Date(e)}return e};
class gFe{constructor({applyChecksum:e,credentials:t,region:n,service:r,sha256:o,uriEscapePath:s=!0}){this.headerFormatter=new DDr,this.service=r,this.sha256=o,this.uriEscapePath=s,this.applyChecksum=typeof e==="boolean"?e:!0,this.regionProvider=yDr(n),this.credentialProvider=yDr(t)}async presign(e,t={}){let{signingDate:n=new Date,expiresIn:r=3600,unsignableHeaders:o,unhoistableHeaders:s,signableHeaders:i,signingRegion:a,signingService:l}=t,c=await this.credentialProvider();this.validateResolvedCredentials(c);let u=a??await this.regionProvider(),{longDate:d,shortDate:p}=wfn(n);if(r>bKs)return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");let m=Cfn(p,u,l??this.service),f=ODr(vfn(e),{unhoistableHeaders:s});if(c.sessionToken)f.query[uKs]=c.sessionToken;f.query[oKs]=bfn,f.query[sKs]=`${c.accessKeyId}/${m}`,f.query[iKs]=d,f.query[lKs]=r.toString(10);let h=Afn(f,o,i);return f.query[aKs]=HKs(h),f.query[cKs]=await this.getSignature(d,m,this.getSigningKey(c,u,p,l),this.createCanonicalRequest(f,h,await aHt(e,this.sha256))),f}async sign(e,t){if(typeof e==="string")return this.signString(e,t);else if(e.headers&&e.payload)return this.signEvent(e,t);else if(e.message)return this.signMessage(e,t);else return this.signRequest(e,t)}async signEvent({headers:e,payload:t},{signingDate:n=new Date,priorSignature:r,signingRegion:o,signingService:s}){let i=o??await this.regionProvider(),{shortDate:a,longDate:l}=wfn(n),c=Cfn(a,i,s??this.service),u=await aHt({headers:{},body:t},this.sha256),d=new this.sha256;d.update(e);let p=AQ(await d.digest()),m=[yKs,l,c,r,p,u].join(`
`);return this.signString(m,{signingDate:n,signingRegion:i,signingService:s})}async signMessage(e,{signingDate:t=new Date,signingRegion:n,signingService:r}){return this.signEvent({headers:this.headerFormatter.format(e.message.headers),payload:e.message.body},{signingDate:t,signingRegion:n,signingService:r,priorSignature:e.priorSignature}).then((s)=>({message:e.message,signature:s}))}async signString(e,{signingDate:t=new Date,signingRegion:n,signingService:r}={}){let o=await this.credentialProvider();this.validateResolvedCredentials(o);let s=n??await this.regionProvider(),{shortDate:i}=wfn(t),a=new this.sha256(await this.getSigningKey(o,s,i,r));return a.update(VAe(e)),AQ(await a.digest())}async signRequest(e,{signingDate:t=new Date,signableHeaders:n,unsignableHeaders:r,signingRegion:o,signingService:s}={}){let i=await this.credentialProvider();this.validateResolvedCredentials(i);let a=o??await this.regionProvider(),l=vfn(e),{longDate:c,shortDate:u}=wfn(t),d=Cfn(u,a,s??this.service);if(l.headers[ADr]=c,i.sessionToken)l.headers[fKs]=i.sessionToken;let p=await aHt(l,this.sha256);if(!wKs(iHt,l.headers)&&this.applyChecksum)l.headers[iHt]=p;let m=Afn(l,r,n),f=await this.getSignature(c,d,this.getSigningKey(i,a,u,s),this.createCanonicalRequest(l,m,p));return l.headers[dKs]=`${bfn} Credential=${i.accessKeyId}/${d}, SignedHeaders=${HKs(m)}, Signature=${f}`,l}createCanonicalRequest(e,t,n){let r=Object.keys(t).sort();return`${e.method}
${this.getCanonicalPath(e)}
${HDr(e)}
${r.map((o)=>`${o}:${t[o]}`).join(`
`)}

${r.join(";")}
${n}`}async createStringToSign(e,t,n){let r=new this.sha256;r.update(VAe(n));let o=await r.digest();return`${bfn}
${e}
${t}
${AQ(o)}`}getCanonicalPath({path:e}){if(this.uriEscapePath){let t=[];for(let o of e.split("/")){if(o?.length===0)continue;if(o===".")continue;if(o==="..")t.pop();else t.push(o)}let n=`${e?.startsWith("/")?"/":""}${t.join("/")}${t.length>0&&e?.endsWith("/")?"/":""}`;return GAe(n).replace(/%2F/g,"/")}return e}async getSignature(e,t,n,r){let o=await this.createStringToSign(e,t,r),s=new this.sha256(await n);return s.update(VAe(o)),AQ(await s.digest())}getSigningKey(e,t,n,r){return CKs(this.sha256,e,n,t,r||this.service)}validateResolvedCredentials(e){if(typeof e!=="object"||typeof e.accessKeyId!=="string"||typeof e.secretAccessKey!=="string")throw Error("Resolved credential object is not valid")}}
var wfn=(e)=>{let t=kKs(e).replace(/[\-:]/g,"");return{longDate:t,shortDate:t.slice(0,8)}},HKs=(e)=>Object.keys(e).sort().join(";");
var IKs=b(()=>{rHt();ZVs();TDr();sHt();hFe();wDr();kDr();IDr();xDr();vKs();LDr();MDr()});
export {kKs,l4u,gFe,wfn,HKs,IKs};
