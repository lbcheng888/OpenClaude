// @ts-nocheck
import {Q} from "../runtime.ts";
import {Eps} from "./m805.ts";
import {bCe} from "./m797.ts";
var Aps=Q((Qsn)=>{Object.defineProperty(Qsn,"__esModule",{value:!0});Qsn.headStream=void 0;var adu=require("stream"),ldu=Eps(),cdu=bCe(),udu=(e,t)=>{if((0,cdu.isReadableStream)(e))return(0,ldu.headStream)(e,t);return new Promise((n,r)=>{let o=new Cps;o.limit=t,e.pipe(o),e.on("error",(s)=>{o.end(),r(s)}),o.on("error",r),o.on("finish",function(){let s=new Uint8Array(Buffer.concat(this.buffers));n(s)})})};Qsn.headStream=udu;class Cps extends adu.Writable{buffers=[];limit=1/0;bytesBuffered=0;_write(e,t,n){if(this.buffers.push(e),this.bytesBuffered+=e.byteLength??0,this.bytesBuffered>=this.limit){let r=this.bytesBuffered-this.limit,o=this.buffers[this.buffers.length-1];this.buffers[this.buffers.length-1]=o.subarray(0,o.byteLength-r),this.emit("finish")}n()}}});
export {Aps};
