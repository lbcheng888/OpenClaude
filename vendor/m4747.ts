// @ts-nocheck
import {Q} from "../runtime.ts";
import {DPe} from "./m4742.ts";
var ECl=Q((drS,bCl)=>{var Him=DPe();function Uht(e){if(this.mode=Him.BYTE,typeof e==="string")this.data=new TextEncoder().encode(e);else this.data=new Uint8Array(e)}Uht.getBitsLength=function(t){return t*8};Uht.prototype.getLength=function(){return this.data.length};Uht.prototype.getBitsLength=function(){return Uht.getBitsLength(this.data.length)};Uht.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)};bCl.exports=Uht});
export {ECl};
