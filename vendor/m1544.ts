// @ts-nocheck
import {nkr,I6s} from "./m1542.ts";
import {qxr,o6s} from "./m1530.ts";
import {w6s,A6s,c6s,Fdn,u6s,d6s,m6s,p6s,f6s,E6s,zxr,y6s,Pwt,h6s,yNe} from "./m1537.ts";
import {$dn,x6s,Xxr} from "./m1538.ts";
import {okr,Wdn,D6s,skr,ikr} from "./m1543.ts";
import {qdn,Qxr} from "./m1539.ts";
import {Owt,tkr} from "./m1541.ts";
import {xQ,Hwt} from "./m1514.ts";
import {lCe} from "./m1534.ts";
import {Zxr,ekr} from "./m1540.ts";
import {aCe,jxr} from "./m1531.ts";
import {b} from "../runtime.ts";
import {Dwt} from "./m1536.ts";
var P6s=(e)=>jLu(e).toISOString().replace(/\.\d{3}Z$/,"Z"),jLu=(e)=>{if(typeof e==="number")return new Date(e*1000);if(typeof e==="string"){if(Number(e))return new Date(Number(e)*1000);return new Date(e)}return e};
class TNe{constructor({applyChecksum:e,credentials:t,region:n,service:r,sha256:o,uriEscapePath:s=!0}){this.headerFormatter=new nkr,this.service=r,this.sha256=o,this.uriEscapePath=s,this.applyChecksum=typeof e==="boolean"?e:!0,this.regionProvider=qxr(n),this.credentialProvider=qxr(t)}async presign(e,t={}){let{signingDate:n=new Date,expiresIn:r=3600,unsignableHeaders:o,unhoistableHeaders:s,signableHeaders:i,signingRegion:a,signingService:l}=t,c=await this.credentialProvider();this.validateResolvedCredentials(c);let u=a??await this.regionProvider(),{longDate:d,shortDate:p}=Gdn(n);if(r>w6s)return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");let m=$dn(p,u,l??this.service),f=okr(Wdn(e),{unhoistableHeaders:s});if(c.sessionToken)f.query[A6s]=c.sessionToken;f.query[c6s]=Fdn,f.query[u6s]=`${c.accessKeyId}/${m}`,f.query[d6s]=d,f.query[m6s]=r.toString(10);let A=qdn(f,o,i);return f.query[p6s]=O6s(A),f.query[f6s]=await this.getSignature(d,m,this.getSigningKey(c,u,p,l),this.createCanonicalRequest(f,A,await Owt(e,this.sha256))),f}async sign(e,t){if(typeof e==="string")return this.signString(e,t);else if(e.headers&&e.payload)return this.signEvent(e,t);else if(e.message)return this.signMessage(e,t);else return this.signRequest(e,t)}async signEvent({headers:e,payload:t},{signingDate:n=new Date,priorSignature:r,signingRegion:o,signingService:s}){let i=o??await this.regionProvider(),{shortDate:a,longDate:l}=Gdn(n),c=$dn(a,i,s??this.service),u=await Owt({headers:{},body:t},this.sha256),d=new this.sha256;d.update(e);let p=xQ(await d.digest()),m=[E6s,l,c,r,p,u].join(`
`);return this.signString(m,{signingDate:n,signingRegion:i,signingService:s})}async signMessage(e,{signingDate:t=new Date,signingRegion:n,signingService:r}){return this.signEvent({headers:this.headerFormatter.format(e.message.headers),payload:e.message.body},{signingDate:t,signingRegion:n,signingService:r,priorSignature:e.priorSignature}).then((s)=>({message:e.message,signature:s}))}async signString(e,{signingDate:t=new Date,signingRegion:n,signingService:r}={}){let o=await this.credentialProvider();this.validateResolvedCredentials(o);let s=n??await this.regionProvider(),{shortDate:i}=Gdn(t),a=new this.sha256(await this.getSigningKey(o,s,i,r));return a.update(lCe(e)),xQ(await a.digest())}async signRequest(e,{signingDate:t=new Date,signableHeaders:n,unsignableHeaders:r,signingRegion:o,signingService:s}={}){let i=await this.credentialProvider();this.validateResolvedCredentials(i);let a=o??await this.regionProvider(),l=Wdn(e),{longDate:c,shortDate:u}=Gdn(t),d=$dn(u,a,s??this.service);if(l.headers[zxr]=c,i.sessionToken)l.headers[y6s]=i.sessionToken;let p=await Owt(l,this.sha256);if(!D6s(Pwt,l.headers)&&this.applyChecksum)l.headers[Pwt]=p;let m=qdn(l,r,n),f=await this.getSignature(c,d,this.getSigningKey(i,a,u,s),this.createCanonicalRequest(l,m,p));return l.headers[h6s]=`${Fdn} Credential=${i.accessKeyId}/${d}, SignedHeaders=${O6s(m)}, Signature=${f}`,l}createCanonicalRequest(e,t,n){let r=Object.keys(t).sort();return`${e.method}
${this.getCanonicalPath(e)}
${Zxr(e)}
${r.map((o)=>`${o}:${t[o]}`).join(`
`)}

${r.join(";")}
${n}`}async createStringToSign(e,t,n){let r=new this.sha256;r.update(lCe(n));let o=await r.digest();return`${Fdn}
${e}
${t}
${xQ(o)}`}getCanonicalPath({path:e}){if(this.uriEscapePath){let t=[];for(let o of e.split("/")){if(o?.length===0)continue;if(o===".")continue;if(o==="..")t.pop();else t.push(o)}let n=`${e?.startsWith("/")?"/":""}${t.join("/")}${t.length>0&&e?.endsWith("/")?"/":""}`;return aCe(n).replace(/%2F/g,"/")}return e}async getSignature(e,t,n,r){let o=await this.createStringToSign(e,t,r),s=new this.sha256(await n);return s.update(lCe(o)),xQ(await s.digest())}getSigningKey(e,t,n,r){return x6s(this.sha256,e,n,t,r||this.service)}validateResolvedCredentials(e){if(typeof e!=="object"||typeof e.accessKeyId!=="string"||typeof e.secretAccessKey!=="string")throw Error("Resolved credential object is not valid")}}
var Gdn=(e)=>{let t=P6s(e).replace(/[\-:]/g,"");return{longDate:t,shortDate:t.slice(0,8)}},O6s=(e)=>Object.keys(e).sort().join(";");
var L6s=b(()=>{Hwt();o6s();jxr();Dwt();yNe();Xxr();Qxr();ekr();tkr();I6s();skr();ikr()});
export {P6s,jLu,TNe,Gdn,O6s,L6s};
