// @ts-nocheck
import {Q} from "../runtime.ts";
import {Ght} from "./m4757.ts";
import {Sko} from "./m4765.ts";
var aAl=Q((IrS,iAl)=>{var Pam=require("util"),oAl=require("stream"),Oam=Ght(),Lam=Sko(),sAl=iAl.exports=function(e){oAl.call(this);let t=e||{};this._packer=new Lam(t),this._deflate=this._packer.createDeflate(),this.readable=!0};Pam.inherits(sAl,oAl);sAl.prototype.pack=function(e,t,n,r){if(this.emit("data",Buffer.from(Oam.PNG_SIGNATURE)),this.emit("data",this._packer.packIHDR(t,n)),r)this.emit("data",this._packer.packGAMA(r));let o=this._packer.filterData(e,t,n);this._deflate.on("error",this.emit.bind(this,"error")),this._deflate.on("data",function(s){this.emit("data",this._packer.packIDAT(s))}.bind(this)),this._deflate.on("end",function(){this.emit("data",this._packer.packIEND()),this.emit("end")}.bind(this)),this._deflate.end(o)}});
export {aAl};
