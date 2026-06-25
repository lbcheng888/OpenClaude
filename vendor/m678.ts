// @ts-nocheck
import {lRt,cRt} from "./m676.ts";
import {b} from "../runtime.ts";
import {oon,son,aTr} from "./m677.ts";
async function cTr(e,t){return lRt(e,miu,t)}
var siu=()=>({contents:new ArrayBuffer(0)}),iiu=(e)=>aiu.encode(e),aiu,wss=(e)=>new Uint8Array(e),kss=(e)=>new Uint8Array(e.buffer,e.byteOffset,e.byteLength),liu=(e,t)=>e.slice(0,t),ciu=(e,{contents:t,length:n},r)=>{let o=xss()?diu(t,r):uiu(t,r);return new Uint8Array(o).set(e,n),o},uiu=(e,t)=>{if(t<=e.byteLength)return e;let n=new ArrayBuffer(Iss(t));return new Uint8Array(n).set(new Uint8Array(e),0),n},diu=(e,t)=>{if(t<=e.maxByteLength)return e.resize(t),e;let n=new ArrayBuffer(t,{maxByteLength:Iss(t)});return new Uint8Array(n).set(new Uint8Array(e),0),n},Iss=(e)=>Hss**Math.ceil(Math.log(e)/Math.log(Hss)),Hss=2,piu=({contents:e,length:t})=>xss()?e:e.slice(0,t),xss=()=>("resize"in ArrayBuffer.prototype),miu;
var uTr=b(()=>{cRt();aiu=new TextEncoder,miu={init:siu,convertChunk:{string:iiu,buffer:wss,arrayBuffer:wss,dataView:kss,typedArray:kss,others:oon},getSize:son,truncateChunk:liu,addChunk:ciu,getFinalChunk:aTr,finalize:piu}});
export {cTr,siu,iiu,aiu,wss,kss,liu,ciu,uiu,diu,Iss,Hss,piu,xss,miu,uTr};
