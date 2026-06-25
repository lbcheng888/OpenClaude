// @ts-nocheck
import {Q} from "../runtime.ts";
import {HMn} from "./m3468.ts";
import {ple} from "./m3465.ts";
var bba=Q((Dx_,Sba)=>{Sba.exports=f4e;var Tba=HMn();(f4e.prototype=Object.create(Tba.prototype)).constructor=f4e;var yba=ple();function f4e(e){Tba.call(this,e)}f4e._configure=function(){if(yba.Buffer)f4e.prototype._slice=yba.Buffer.prototype.slice};f4e.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};f4e._configure()});
export {bba};
