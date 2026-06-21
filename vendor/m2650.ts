// @ts-nocheck
import {Jo} from "./m2601.ts";
import {b,M} from "../runtime.ts";
import {UCn} from "./m2643.ts";
function eLi(e){if(e.caCertPath&&e.caKeyPath)return LTd(e.caCertPath,e.caKeyPath);if(e.caCertPath||e.caKeyPath)throw Error("tlsTerminate: caCertPath and caKeyPath must be provided together");return MTd()}
async function tLi(e){if(!e.ephemeral)return;try{await QOi.rm(itt.dirname(e.certPath),{recursive:!0,force:!0})}catch(t){Jo(`[mitm-ca] cleanup failed: ${t.message}`,{level:"warn"})}}
function LTd(e,t){let n=YOi(e,"CERTIFICATE","tlsTerminate.caCertPath"),r=YOi(t,"PRIVATE KEY","tlsTerminate.caKeyPath"),o,s;try{o=stt.certificateFromPem(n),s=stt.privateKeyFromPem(r)}catch(i){throw Error(`tlsTerminate: failed to parse CA from ${e}: `+i.message)}if(!("n"in s)||!("d"in s))throw Error(`tlsTerminate.caKeyPath: CA key at ${t} must be RSA`);return Jo(`[mitm-ca] loaded CA from ${e}`),{certPath:e,keyPath:t,certPem:n,keyPem:r,cert:o,key:s,leafCerts:new Map,secureContexts:new Map,ephemeral:!1}}
function MTd(){let e=stt.rsa.generateKeyPair(2048),t=stt.createCertificate();t.publicKey=e.publicKey,t.serialNumber=NTd(),t.validity.notBefore=JOi(-1),t.validity.notAfter=JOi(825);let n=[{name:"commonName",value:"sandbox-runtime ephemeral CA"},{name:"organizationName",value:"sandbox-runtime"}];t.setSubject(n),t.setIssuer(n),t.setExtensions([{name:"basicConstraints",cA:!0,critical:!0},{name:"keyUsage",critical:!0,keyCertSign:!0,cRLSign:!0,digitalSignature:!0},{name:"subjectKeyIdentifier"}]),t.sign(e.privateKey,DTd.sha256.create());let r=stt.certificateToPem(t),o=stt.privateKeyToPem(e.privateKey),s=c2e.mkdtempSync(itt.join(ZOi.tmpdir(),"srt-ca-")),i=itt.join(s,"ca.crt"),a=itt.join(s,"ca.key");return c2e.writeFileSync(i,r,{mode:420}),c2e.writeFileSync(a,o,{mode:384}),Jo(`[mitm-ca] generated ephemeral CA at ${i}`),{certPath:i,keyPath:a,certPem:r,keyPem:o,cert:t,key:e.privateKey,leafCerts:new Map,secureContexts:new Map,ephemeral:!0}}
function YOi(e,t,n){let r;try{r=c2e.readFileSync(e,"utf8")}catch(o){let s=o.code??String(o);throw Error(`${n}: cannot read ${e} (${s})`)}if(!new RegExp(`-----BEGIN [A-Z ]*${t}-----`).test(r))throw Error(`${n}: ${e} is not a PEM ${t}`);return r}
function NTd(){let e=PTd.getBytesSync(16),t=OTd.bytesToHex(e);return(parseInt(t[0],16)&7).toString(16)+t.slice(1)}
function JOi(e){let t=new Date;return t.setDate(t.getDate()+e),t}
var XOi,c2e,QOi,ZOi,itt,stt,DTd,PTd,OTd;
var nLi=b(()=>{XOi=M(UCn(),1),c2e=require("fs"),QOi=require("fs/promises"),ZOi=require("os"),itt=require("path"),{pki:stt,md:DTd,random:PTd,util:OTd}=XOi.default});
export {eLi,tLi,LTd,MTd,YOi,NTd,JOi,XOi,c2e,QOi,ZOi,itt,stt,DTd,PTd,OTd,nLi};
