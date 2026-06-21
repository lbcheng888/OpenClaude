// @ts-nocheck
import {X} from "../runtime.ts";
import {OPn} from "./m3450.ts";
import {mle} from "./m3449.ts";
var Xma=X((V_g,Jma)=>{Jma.exports=fle;var Yma=OPn();(fle.prototype=Object.create(Yma.prototype)).constructor=fle;var Kke=mle();function fle(){Yma.call(this)}fle._configure=function(){fle.alloc=Kke._Buffer_allocUnsafe,fle.writeBytesBuffer=Kke.Buffer&&Kke.Buffer.prototype instanceof Uint8Array&&Kke.Buffer.prototype.set.name==="set"?function(t,n,r){n.set(t,r)}:function(t,n,r){if(t.copy)t.copy(n,r,0,t.length);else for(var o=0;o<t.length;)n[r++]=t[o++]}};fle.prototype.bytes=function(t){if(Kke.isString(t))t=Kke._Buffer_from(t,"base64");var n=t.length>>>0;if(this.uint32(n),n)this._push(fle.writeBytesBuffer,n,t);return this};function EKd(e,t,n){if(e.length<40)Kke.utf8.write(e,t,n);else if(t.utf8Write)t.utf8Write(e,n);else t.write(e,n)}fle.prototype.string=function(t){var n=Kke.Buffer.byteLength(t);if(this.uint32(n),n)this._push(EKd,n,t);return this};fle._configure()});
export {Xma};
