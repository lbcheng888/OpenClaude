// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {x_} from "./m2615.ts";
import {Pz} from "./m2629.ts";
import {sLt} from "./m2631.ts";
var WBi=Q((cLg,qBi)=>{var oW=Qm();x_();Pz();sLt();qBi.exports=oW.kem=oW.kem||{};var UBi=oW.jsbn.BigInteger;oW.kem.rsa={};oW.kem.rsa.create=function(e,t){t=t||{};var n=t.prng||oW.random,r={};return r.encrypt=function(o,s){var i=Math.ceil(o.n.bitLength()/8),a;do a=new UBi(oW.util.bytesToHex(n.getBytesSync(i)),16).mod(o.n);while(a.compareTo(UBi.ONE)<=0);a=oW.util.hexToBytes(a.toString(16));var l=i-a.length;if(l>0)a=oW.util.fillString(String.fromCharCode(0),l)+a;var c=o.encrypt(a,"NONE"),u=e.generate(a,s);return{encapsulation:c,key:u}},r.decrypt=function(o,s,i){var a=o.decrypt(s,"NONE");return e.generate(a,i)},r};oW.kem.kdf1=function(e,t){$Bi(this,e,0,t||e.digestLength)};oW.kem.kdf2=function(e,t){$Bi(this,e,1,t||e.digestLength)};function $Bi(e,t,n,r){e.generate=function(o,s){var i=new oW.util.ByteBuffer,a=Math.ceil(s/r)+n,l=new oW.util.ByteBuffer;for(var c=n;c<a;++c){l.putInt32(c),t.start(),t.update(o+l.getBytes());var u=t.digest();i.putBytes(u.getBytes(r))}return i.truncate(i.length()-s),i.getBytes()}}});
export {WBi};
