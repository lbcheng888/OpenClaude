// @ts-nocheck
import {Lo} from "./m2612.ts";
import {b,x} from "../runtime.ts";
import {Iwn} from "./m2654.ts";
function DUi(e){if(e.caCertPath&&e.caKeyPath)return i0d(e.caCertPath,e.caKeyPath);if(e.caCertPath||e.caKeyPath)throw Error("tlsTerminate: caCertPath and caKeyPath must be provided together");return a0d()}
async function PUi(e){if(!e.ephemeral)return;try{await IUi.rm(urt.dirname(e.certPath),{recursive:!0,force:!0})}catch(t){Lo(`[mitm-ca] cleanup failed: ${t.message}`,{level:"warn"})}}
function i0d(e,t){let n=wUi(e,"CERTIFICATE","tlsTerminate.caCertPath"),r=wUi(t,"PRIVATE KEY","tlsTerminate.caKeyPath"),o,s;try{o=crt.certificateFromPem(n),s=crt.privateKeyFromPem(r)}catch(i){throw Error(`tlsTerminate: failed to parse CA from ${e}: `+i.message)}if(!("n"in s)||!("d"in s))throw Error(`tlsTerminate.caKeyPath: CA key at ${t} must be RSA`);return Lo(`[mitm-ca] loaded CA from ${e}`),{certPath:e,keyPath:t,certPem:n,keyPem:r,cert:o,key:s,leafCerts:new Map,secureContexts:new Map,ephemeral:!1}}
function a0d(){let e=crt.rsa.generateKeyPair(2048),t=crt.createCertificate();t.publicKey=e.publicKey,t.serialNumber=l0d(),t.validity.notBefore=kUi(-1),t.validity.notAfter=kUi(825);let n=[{name:"commonName",value:"sandbox-runtime ephemeral CA"},{name:"organizationName",value:"sandbox-runtime"}];t.setSubject(n),t.setIssuer(n),t.setExtensions([{name:"basicConstraints",cA:!0,critical:!0},{name:"keyUsage",critical:!0,keyCertSign:!0,cRLSign:!0,digitalSignature:!0},{name:"subjectKeyIdentifier"}]),t.sign(e.privateKey,r0d.sha256.create());let r=crt.certificateToPem(t),o=crt.privateKeyToPem(e.privateKey),s=u$e.mkdtempSync(urt.join(xUi.tmpdir(),"srt-ca-")),i=urt.join(s,"ca.crt"),a=urt.join(s,"ca.key");return u$e.writeFileSync(i,r,{mode:420}),u$e.writeFileSync(a,o,{mode:384}),Lo(`[mitm-ca] generated ephemeral CA at ${i}`),{certPath:i,keyPath:a,certPem:r,keyPem:o,cert:t,key:e.privateKey,leafCerts:new Map,secureContexts:new Map,ephemeral:!0}}
function wUi(e,t,n){let r;try{r=u$e.readFileSync(e,"utf8")}catch(o){let s=o.code??String(o);throw Error(`${n}: cannot read ${e} (${s})`)}if(!new RegExp(`-----BEGIN [A-Z ]*${t}-----`).test(r))throw Error(`${n}: ${e} is not a PEM ${t}`);return r}
function l0d(){let e=o0d.getBytesSync(16),t=s0d.bytesToHex(e);return(parseInt(t[0],16)&7).toString(16)+t.slice(1)}
function kUi(e){let t=new Date;return t.setDate(t.getDate()+e),t}
var HUi,u$e,IUi,xUi,urt,crt,r0d,o0d,s0d;
var OUi=b(()=>{HUi=x(Iwn(),1),u$e=require("fs"),IUi=require("fs/promises"),xUi=require("os"),urt=require("path"),{pki:crt,md:r0d,random:o0d,util:s0d}=HUi.default});
export {DUi,PUi,i0d,a0d,wUi,l0d,kUi,HUi,u$e,IUi,xUi,urt,crt,r0d,o0d,s0d,OUi};
