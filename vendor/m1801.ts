// @ts-nocheck
import {X} from "../runtime.ts";
import {IJe} from "./m1800.ts";
var tDr=X((oNA,oKs)=>{var ofn=IJe().Buffer,xUu=require("stream"),kUu=require("util");function sfn(e){if(this.buffer=null,this.writable=!0,this.readable=!0,!e)return this.buffer=ofn.alloc(0),this;if(typeof e.pipe==="function")return this.buffer=ofn.alloc(0),e.pipe(this),this;if(e.length||typeof e==="object")return this.buffer=e,this.writable=!1,process.nextTick(function(){this.emit("end",e),this.readable=!1,this.emit("close")}.bind(this)),this;throw TypeError("Unexpected data type ("+typeof e+")")}kUu.inherits(sfn,xUu);sfn.prototype.write=function(t){this.buffer=ofn.concat([this.buffer,ofn.from(t)]),this.emit("data",t)};sfn.prototype.end=function(t){if(t)this.write(t);this.emit("end",t),this.emit("close"),this.writable=!1,this.readable=!1};oKs.exports=sfn});
export {tDr};
