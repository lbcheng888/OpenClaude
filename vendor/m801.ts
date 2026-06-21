// @ts-nocheck
import {X} from "../runtime.ts";
import {xis} from "./m800.ts";
import {Fbe} from "./m792.ts";
var His=X((Arn)=>{Object.defineProperty(Arn,"__esModule",{value:!0});Arn.headStream=void 0;var Geu=require("stream"),Veu=xis(),Keu=Fbe(),zeu=(e,t)=>{if((0,Keu.isReadableStream)(e))return(0,Veu.headStream)(e,t);return new Promise((n,r)=>{let o=new kis;o.limit=t,e.pipe(o),e.on("error",(s)=>{o.end(),r(s)}),o.on("error",r),o.on("finish",function(){let s=new Uint8Array(Buffer.concat(this.buffers));n(s)})})};Arn.headStream=zeu;class kis extends Geu.Writable{buffers=[];limit=1/0;bytesBuffered=0;_write(e,t,n){if(this.buffers.push(e),this.bytesBuffered+=e.byteLength??0,this.bytesBuffered>=this.limit){let r=this.bytesBuffered-this.limit,o=this.buffers[this.buffers.length-1];this.buffers[this.buffers.length-1]=o.subarray(0,o.byteLength-r),this.emit("finish")}n()}}});
export {His};
