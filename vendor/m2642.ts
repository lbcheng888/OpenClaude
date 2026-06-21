// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {Zwe} from "./m2607.ts";
import {Get} from "./m2611.ts";
import {ACn} from "./m2612.ts";
import {Yet} from "./m2621.ts";
import {w_} from "./m2604.ts";
var TOi=X((REh,yOi)=>{var k0=Uf();Zwe();Get();ACn();Yet();w_();var FCn=yOi.exports=k0.ssh=k0.ssh||{};FCn.privateKeyToPutty=function(e,t,n){n=n||"",t=t||"";var r="ssh-rsa",o=t===""?"none":"aes256-cbc",s="PuTTY-User-Key-File-2: "+r+`\r
`;s+="Encryption: "+o+`\r
`,s+="Comment: "+n+`\r
`;var i=k0.util.createBuffer();ott(i,r),Qie(i,e.e),Qie(i,e.n);var a=k0.util.encode64(i.bytes(),64),l=Math.floor(a.length/66)+1;s+="Public-Lines: "+l+`\r
`,s+=a;var c=k0.util.createBuffer();Qie(c,e.d),Qie(c,e.p),Qie(c,e.q),Qie(c,e.qInv);var u;if(!t)u=k0.util.encode64(c.bytes(),64);else{var d=c.length()+16-1;d-=d%16;var p=BCn(c.bytes());p.truncate(p.length()-d+c.length()),c.putBuffer(p);var m=k0.util.createBuffer();m.putBuffer(BCn("\x00\x00\x00\x00",t)),m.putBuffer(BCn("\x00\x00\x00\x01",t));var f=k0.aes.createEncryptionCipher(m.truncate(8),"CBC");f.start(k0.util.createBuffer().fillWithByte(0,16)),f.update(c.copy()),f.finish();var A=f.output;A.truncate(16),u=k0.util.encode64(A.bytes(),64)}l=Math.floor(u.length/66)+1,s+=`\r
Private-Lines: `+l+`\r
`,s+=u;var h=BCn("putty-private-key-file-mac-key",t),g=k0.util.createBuffer();ott(g,r),ott(g,o),ott(g,n),g.putInt32(i.length()),g.putBuffer(i),g.putInt32(c.length()),g.putBuffer(c);var _=k0.hmac.create();return _.start("sha1",h),_.update(g.bytes()),s+=`\r
Private-MAC: `+_.digest().toHex()+`\r
`,s};FCn.publicKeyToOpenSSH=function(e,t){var n="ssh-rsa";t=t||"";var r=k0.util.createBuffer();return ott(r,n),Qie(r,e.e),Qie(r,e.n),n+" "+k0.util.encode64(r.bytes())+" "+t};FCn.privateKeyToOpenSSH=function(e,t){if(!t)return k0.pki.privateKeyToPem(e);return k0.pki.encryptRsaPrivateKey(e,t,{legacy:!0,algorithm:"aes128"})};FCn.getPublicKeyFingerprint=function(e,t){t=t||{};var n=t.md||k0.md.md5.create(),r="ssh-rsa",o=k0.util.createBuffer();ott(o,r),Qie(o,e.e),Qie(o,e.n),n.start(),n.update(o.getBytes());var s=n.digest();if(t.encoding==="hex"){var i=s.toHex();if(t.delimiter)return i.match(/.{2}/g).join(t.delimiter);return i}else if(t.encoding==="binary")return s.getBytes();else if(t.encoding)throw Error('Unknown encoding "'+t.encoding+'".');return s};function Qie(e,t){var n=t.toString(16);if(n[0]>="8")n="00"+n;var r=k0.util.hexToBytes(n);e.putInt32(r.length),e.putBytes(r)}function ott(e,t){e.putInt32(t.length),e.putString(t)}function BCn(){var e=k0.md.sha1.create(),t=arguments.length;for(var n=0;n<t;++n)e.update(arguments[n]);return e.digest()}});
export {TOi};
