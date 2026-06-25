// @ts-nocheck
import {Q} from "../runtime.ts";
import {HQe} from "./m1805.ts";
var xMr=Q((v8h,ZQs)=>{var Ugn=HQe().Buffer,zWu=require("stream"),jWu=require("util");function $gn(e){if(this.buffer=null,this.writable=!0,this.readable=!0,!e)return this.buffer=Ugn.alloc(0),this;if(typeof e.pipe==="function")return this.buffer=Ugn.alloc(0),e.pipe(this),this;if(e.length||typeof e==="object")return this.buffer=e,this.writable=!1,process.nextTick(function(){this.emit("end",e),this.readable=!1,this.emit("close")}.bind(this)),this;throw TypeError("Unexpected data type ("+typeof e+")")}jWu.inherits($gn,zWu);$gn.prototype.write=function(t){this.buffer=Ugn.concat([this.buffer,Ugn.from(t)]),this.emit("data",t)};$gn.prototype.end=function(t){if(t)this.write(t);this.emit("end",t),this.emit("close"),this.writable=!1,this.readable=!1};ZQs.exports=$gn});
export {xMr};
