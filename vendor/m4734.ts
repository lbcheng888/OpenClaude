// @ts-nocheck
import {X} from "../runtime.ts";
import {Dmt} from "./m4725.ts";
import {tEo} from "./m4733.ts";
var dhl=X((R5y,uhl)=>{var TQp=require("util"),lhl=require("stream"),SQp=Dmt(),bQp=tEo(),chl=uhl.exports=function(e){lhl.call(this);let t=e||{};this._packer=new bQp(t),this._deflate=this._packer.createDeflate(),this.readable=!0};TQp.inherits(chl,lhl);chl.prototype.pack=function(e,t,n,r){if(this.emit("data",Buffer.from(SQp.PNG_SIGNATURE)),this.emit("data",this._packer.packIHDR(t,n)),r)this.emit("data",this._packer.packGAMA(r));let o=this._packer.filterData(e,t,n);this._deflate.on("error",this.emit.bind(this,"error")),this._deflate.on("data",function(s){this.emit("data",this._packer.packIDAT(s))}.bind(this)),this._deflate.on("end",function(){this.emit("data",this._packer.packIEND()),this.emit("end")}.bind(this)),this._deflate.end(o)}});
export {dhl};
