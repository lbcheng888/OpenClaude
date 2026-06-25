// @ts-nocheck
import {Q} from "../runtime.ts";
import {wMn} from "./m3466.ts";
import {ple} from "./m3465.ts";
var pba=Q((Ix_,dba)=>{dba.exports=mle;var uba=wMn();(mle.prototype=Object.create(uba.prototype)).constructor=mle;var OIe=ple();function mle(){uba.call(this)}mle._configure=function(){mle.alloc=OIe._Buffer_allocUnsafe,mle.writeBytesBuffer=OIe.Buffer&&OIe.Buffer.prototype instanceof Uint8Array&&OIe.Buffer.prototype.set.name==="set"?function(t,n,r){n.set(t,r)}:function(t,n,r){if(t.copy)t.copy(n,r,0,t.length);else for(var o=0;o<t.length;)n[r++]=t[o++]}};mle.prototype.bytes=function(t){if(OIe.isString(t))t=OIe._Buffer_from(t,"base64");var n=t.length>>>0;if(this.uint32(n),n)this._push(mle.writeBytesBuffer,n,t);return this};function uop(e,t,n){if(e.length<40)OIe.utf8.write(e,t,n);else if(t.utf8Write)t.utf8Write(e,n);else t.write(e,n)}mle.prototype.string=function(t){var n=OIe.Buffer.byteLength(t);if(this.uint32(n),n)this._push(uop,n,t);return this};mle._configure()});
export {pba};
