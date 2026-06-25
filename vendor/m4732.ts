// @ts-nocheck
import {Q} from "../runtime.ts";
var ZEl=Q((JnS,QEl)=>{function NWt(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}NWt.prototype.set=function(e,t,n,r){let o=e*this.size+t;if(this.data[o]=n,r)this.reservedBit[o]=!0};NWt.prototype.get=function(e,t){return this.data[e*this.size+t]};NWt.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n};NWt.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};QEl.exports=NWt});
export {ZEl};
