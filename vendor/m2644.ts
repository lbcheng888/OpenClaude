// @ts-nocheck
import {Jo} from "./m2601.ts";
import {b,M} from "../runtime.ts";
import {UCn} from "./m2643.ts";
function fqr(e,t){let n=e.leafCerts.get(t);if(n)return n;let r=$Cn.rsa.generateKeyPair(2048),o=$Cn.createCertificate();o.publicKey=r.publicKey,o.serialNumber=TTd();let s=STd(-1);o.validity.notBefore=s,o.validity.notAfter=yTd(e.cert,s),o.setSubject([{name:"commonName",value:t}]),o.setIssuer(e.cert.subject.attributes),o.setExtensions([{name:"basicConstraints",cA:!1,critical:!0},{name:"keyUsage",critical:!0,digitalSignature:!0,keyEncipherment:!0},{name:"extKeyUsage",serverAuth:!0},{name:"subjectAltName",altNames:[_Td(t)]}]),o.sign(e.key,ATd.sha256.create());let i={certPem:$Cn.certificateToPem(o)+e.certPem,keyPem:$Cn.privateKeyToPem(r.privateKey)};return e.leafCerts.set(t,i),Jo(`[mitm-leaf] minted RSA leaf for ${t}`),i}
function vOi(e,t){let n=e.secureContexts.get(t);if(n)return n;let{certPem:r,keyPem:o}=fqr(e,t),s=COi.createSecureContext({cert:r,key:o});return e.secureContexts.set(t,s),s}
function _Td(e){return EOi.isIP(e)!==0?{type:7,ip:e}:{type:2,value:e}}
function yTd(e,t){let n=e.validity.notAfter,r=new Date(t);return r.setDate(r.getDate()+99),n<r?new Date(n):r}
function TTd(){let e=hTd.getBytesSync(16),t=gTd.bytesToHex(e);return(parseInt(t[0],16)&7).toString(16)+t.slice(1)}
function STd(e){let t=new Date;return t.setDate(t.getDate()+e),t}
var bOi,EOi,COi,$Cn,ATd,hTd,gTd;
var wOi=b(()=>{bOi=M(UCn(),1),EOi=require("net"),COi=require("tls"),{pki:$Cn,md:ATd,random:hTd,util:gTd}=bOi.default});
export {fqr,vOi,_Td,yTd,TTd,STd,bOi,EOi,COi,$Cn,ATd,hTd,gTd,wOi};
