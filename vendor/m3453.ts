// @ts-nocheck
import {X} from "../runtime.ts";
import {MPn} from "./m3452.ts";
import {mle} from "./m3449.ts";
var ifa=X((z_g,sfa)=>{sfa.exports=e3e;var ofa=MPn();(e3e.prototype=Object.create(ofa.prototype)).constructor=e3e;var rfa=mle();function e3e(e){ofa.call(this,e)}e3e._configure=function(){if(rfa.Buffer)e3e.prototype._slice=rfa.Buffer.prototype.slice};e3e.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};e3e._configure()});
export {ifa};
