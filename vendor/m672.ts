// @ts-nocheck
import {Mbt,Nbt} from "./m670.ts";
import {b} from "../runtime.ts";
import {Etn,Ctn,Dfr} from "./m671.ts";
async function Ofr(e,t){return Mbt(e,JYc,t)}
var qYc=()=>({contents:new ArrayBuffer(0)}),jYc=(e)=>WYc.encode(e),WYc,HZo=(e)=>new Uint8Array(e),IZo=(e)=>new Uint8Array(e.buffer,e.byteOffset,e.byteLength),GYc=(e,t)=>e.slice(0,t),VYc=(e,{contents:t,length:n},r)=>{let o=OZo()?zYc(t,r):KYc(t,r);return new Uint8Array(o).set(e,n),o},KYc=(e,t)=>{if(t<=e.byteLength)return e;let n=new ArrayBuffer(PZo(t));return new Uint8Array(n).set(new Uint8Array(e),0),n},zYc=(e,t)=>{if(t<=e.maxByteLength)return e.resize(t),e;let n=new ArrayBuffer(t,{maxByteLength:PZo(t)});return new Uint8Array(n).set(new Uint8Array(e),0),n},PZo=(e)=>DZo**Math.ceil(Math.log(e)/Math.log(DZo)),DZo=2,YYc=({contents:e,length:t})=>OZo()?e:e.slice(0,t),OZo=()=>("resize"in ArrayBuffer.prototype),JYc;
var Lfr=b(()=>{Nbt();WYc=new TextEncoder,JYc={init:qYc,convertChunk:{string:jYc,buffer:HZo,arrayBuffer:HZo,dataView:IZo,typedArray:IZo,others:Etn},getSize:Ctn,truncateChunk:GYc,addChunk:VYc,getFinalChunk:Dfr,finalize:YYc}});
export {Ofr,qYc,jYc,WYc,HZo,IZo,GYc,VYc,KYc,zYc,PZo,DZo,YYc,OZo,JYc,Lfr};
