// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {Mwe} from "./m2618.ts";
import {Ynt} from "./m2622.ts";
import {swn} from "./m2623.ts";
import {Znt} from "./m2632.ts";
import {x_} from "./m2615.ts";
var QBi=Q((mLg,XBi)=>{var K0=Qm();Mwe();Ynt();swn();Znt();x_();var Hwn=XBi.exports=K0.ssh=K0.ssh||{};Hwn.privateKeyToPutty=function(e,t,n){n=n||"",t=t||"";var r="ssh-rsa",o=t===""?"none":"aes256-cbc",s="PuTTY-User-Key-File-2: "+r+`\r
`;s+="Encryption: "+o+`\r
`,s+="Comment: "+n+`\r
`;var i=K0.util.createBuffer();lrt(i,r),Yie(i,e.e),Yie(i,e.n);var a=K0.util.encode64(i.bytes(),64),l=Math.floor(a.length/66)+1;s+="Public-Lines: "+l+`\r
`,s+=a;var c=K0.util.createBuffer();Yie(c,e.d),Yie(c,e.p),Yie(c,e.q),Yie(c,e.qInv);var u;if(!t)u=K0.util.encode64(c.bytes(),64);else{var d=c.length()+16-1;d-=d%16;var p=kwn(c.bytes());p.truncate(p.length()-d+c.length()),c.putBuffer(p);var m=K0.util.createBuffer();m.putBuffer(kwn("\x00\x00\x00\x00",t)),m.putBuffer(kwn("\x00\x00\x00\x01",t));var f=K0.aes.createEncryptionCipher(m.truncate(8),"CBC");f.start(K0.util.createBuffer().fillWithByte(0,16)),f.update(c.copy()),f.finish();var h=f.output;h.truncate(16),u=K0.util.encode64(h.bytes(),64)}l=Math.floor(u.length/66)+1,s+=`\r
Private-Lines: `+l+`\r
`,s+=u;var g=kwn("putty-private-key-file-mac-key",t),_=K0.util.createBuffer();lrt(_,r),lrt(_,o),lrt(_,n),_.putInt32(i.length()),_.putBuffer(i),_.putInt32(c.length()),_.putBuffer(c);var T=K0.hmac.create();return T.start("sha1",g),T.update(_.bytes()),s+=`\r
Private-MAC: `+T.digest().toHex()+`\r
`,s};Hwn.publicKeyToOpenSSH=function(e,t){var n="ssh-rsa";t=t||"";var r=K0.util.createBuffer();return lrt(r,n),Yie(r,e.e),Yie(r,e.n),n+" "+K0.util.encode64(r.bytes())+" "+t};Hwn.privateKeyToOpenSSH=function(e,t){if(!t)return K0.pki.privateKeyToPem(e);return K0.pki.encryptRsaPrivateKey(e,t,{legacy:!0,algorithm:"aes128"})};Hwn.getPublicKeyFingerprint=function(e,t){t=t||{};var n=t.md||K0.md.md5.create(),r="ssh-rsa",o=K0.util.createBuffer();lrt(o,r),Yie(o,e.e),Yie(o,e.n),n.start(),n.update(o.getBytes());var s=n.digest();if(t.encoding==="hex"){var i=s.toHex();if(t.delimiter)return i.match(/.{2}/g).join(t.delimiter);return i}else if(t.encoding==="binary")return s.getBytes();else if(t.encoding)throw Error('Unknown encoding "'+t.encoding+'".');return s};function Yie(e,t){var n=t.toString(16);if(n[0]>="8")n="00"+n;var r=K0.util.hexToBytes(n);e.putInt32(r.length),e.putBytes(r)}function lrt(e,t){e.putInt32(t.length),e.putString(t)}function kwn(){var e=K0.md.sha1.create(),t=arguments.length;for(var n=0;n<t;++n)e.update(arguments[n]);return e.digest()}});
export {QBi};
