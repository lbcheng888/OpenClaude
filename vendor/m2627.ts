// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {w_} from "./m2604.ts";
var F4r=X((pEh,bPi)=>{var o2e=Uf();w_();o2e.mgf=o2e.mgf||{};var oyd=bPi.exports=o2e.mgf.mgf1=o2e.mgf1=o2e.mgf1||{};oyd.create=function(e){var t={generate:function(n,r){var o=new o2e.util.ByteBuffer,s=Math.ceil(r/e.digestLength);for(var i=0;i<s;i++){var a=new o2e.util.ByteBuffer;a.putInt32(i),e.start(),e.update(n+a.getBytes()),o.putBuffer(e.digest())}return o.truncate(o.length()-r),o.getBytes()}};return t}});
export {F4r};
