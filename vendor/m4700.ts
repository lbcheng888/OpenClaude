// @ts-nocheck
import {X} from "../runtime.ts";
var rAl=X((K8y,nAl)=>{function yjt(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}yjt.prototype.set=function(e,t,n,r){let o=e*this.size+t;if(this.data[o]=n,r)this.reservedBit[o]=!0};yjt.prototype.get=function(e,t){return this.data[e*this.size+t]};yjt.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n};yjt.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};nAl.exports=yjt});
export {rAl};
