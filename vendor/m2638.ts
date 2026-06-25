// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {x_} from "./m2615.ts";
var _Wr=Q((QOg,eBi)=>{var s$e=Qm();x_();s$e.mgf=s$e.mgf||{};var HHd=eBi.exports=s$e.mgf.mgf1=s$e.mgf1=s$e.mgf1||{};HHd.create=function(e){var t={generate:function(n,r){var o=new s$e.util.ByteBuffer,s=Math.ceil(r/e.digestLength);for(var i=0;i<s;i++){var a=new s$e.util.ByteBuffer;a.putInt32(i),e.start(),e.update(n+a.getBytes()),o.putBuffer(e.digest())}return o.truncate(o.length()-r),o.getBytes()}};return t}});
export {_Wr};
