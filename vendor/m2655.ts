// @ts-nocheck
import {Lo} from "./m2612.ts";
import {b,x} from "../runtime.ts";
import {Iwn} from "./m2654.ts";
function KWr(e,t){let n=e.leafCerts.get(t);if(n)return n;let r=xwn.rsa.generateKeyPair(2048),o=xwn.createCertificate();o.publicKey=r.publicKey,o.serialNumber=VId();let s=KId(-1);o.validity.notBefore=s,o.validity.notAfter=GId(e.cert,s),o.setSubject([{name:"commonName",value:t}]),o.setIssuer(e.cert.subject.attributes),o.setExtensions([{name:"basicConstraints",cA:!1,critical:!0},{name:"keyUsage",critical:!0,digitalSignature:!0,keyEncipherment:!0},{name:"extKeyUsage",serverAuth:!0},{name:"subjectAltName",altNames:[WId(t)]}]),o.sign(e.key,UId.sha256.create());let i={certPem:xwn.certificateToPem(o)+e.certPem,keyPem:xwn.privateKeyToPem(r.privateKey)};return e.leafCerts.set(t,i),Lo(`[mitm-leaf] minted RSA leaf for ${t}`),i}
function rUi(e,t){let n=e.secureContexts.get(t);if(n)return n;let{certPem:r,keyPem:o}=KWr(e,t),s=nUi.createSecureContext({cert:r,key:o});return e.secureContexts.set(t,s),s}
function WId(e){return tUi.isIP(e)!==0?{type:7,ip:e}:{type:2,value:e}}
function GId(e,t){let n=e.validity.notAfter,r=new Date(t);return r.setDate(r.getDate()+99),n<r?new Date(n):r}
function VId(){let e=$Id.getBytesSync(16),t=qId.bytesToHex(e);return(parseInt(t[0],16)&7).toString(16)+t.slice(1)}
function KId(e){let t=new Date;return t.setDate(t.getDate()+e),t}
var eUi,tUi,nUi,xwn,UId,$Id,qId;
var oUi=b(()=>{eUi=x(Iwn(),1),tUi=require("net"),nUi=require("tls"),{pki:xwn,md:UId,random:$Id,util:qId}=eUi.default});
export {KWr,rUi,WId,GId,VId,KId,eUi,tUi,nUi,xwn,UId,$Id,qId,oUi};
