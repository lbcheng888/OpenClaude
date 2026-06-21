// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {w_} from "./m2604.ts";
import {az} from "./m2618.ts";
import {RDt} from "./m2620.ts";
var dOi=X((EEh,uOi)=>{var j5=Uf();w_();az();RDt();uOi.exports=j5.kem=j5.kem||{};var lOi=j5.jsbn.BigInteger;j5.kem.rsa={};j5.kem.rsa.create=function(e,t){t=t||{};var n=t.prng||j5.random,r={};return r.encrypt=function(o,s){var i=Math.ceil(o.n.bitLength()/8),a;do a=new lOi(j5.util.bytesToHex(n.getBytesSync(i)),16).mod(o.n);while(a.compareTo(lOi.ONE)<=0);a=j5.util.hexToBytes(a.toString(16));var l=i-a.length;if(l>0)a=j5.util.fillString(String.fromCharCode(0),l)+a;var c=o.encrypt(a,"NONE"),u=e.generate(a,s);return{encapsulation:c,key:u}},r.decrypt=function(o,s,i){var a=o.decrypt(s,"NONE");return e.generate(a,i)},r};j5.kem.kdf1=function(e,t){cOi(this,e,0,t||e.digestLength)};j5.kem.kdf2=function(e,t){cOi(this,e,1,t||e.digestLength)};function cOi(e,t,n,r){e.generate=function(o,s){var i=new j5.util.ByteBuffer,a=Math.ceil(s/r)+n,l=new j5.util.ByteBuffer;for(var c=n;c<a;++c){l.putInt32(c),t.start(),t.update(o+l.getBytes());var u=t.digest();i.putBytes(u.getBytes(r))}return i.truncate(i.length()-s),i.getBytes()}}});
export {dOi};
