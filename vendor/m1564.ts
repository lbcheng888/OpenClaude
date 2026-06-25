// @ts-nocheck
import {GDr,VDr} from "./m1562.ts";
import {_7s,y7s} from "./m1563.ts";
import {b,x} from "../runtime.ts";
import {Mfn} from "./m1559.ts";
class KDr{constructor(e,t){this.headerMarshaller=new GDr(e,t),this.messageBuffer=[],this.isEndOfStream=!1}feed(e){this.messageBuffer.push(this.decode(e))}endOfStream(){this.isEndOfStream=!0}getMessage(){let e=this.messageBuffer.pop(),t=this.isEndOfStream;return{getMessage(){return e},isEndOfStream(){return t}}}getAvailableMessages(){let e=this.messageBuffer;this.messageBuffer=[];let t=this.isEndOfStream;return{getMessages(){return e},isEndOfStream(){return t}}}encode({headers:e,body:t}){let n=this.headerMarshaller.format(e),r=n.byteLength+t.byteLength+16,o=new Uint8Array(r),s=new DataView(o.buffer,o.byteOffset,o.byteLength),i=new T7s.Crc32;return s.setUint32(0,r,!1),s.setUint32(4,n.byteLength,!1),s.setUint32(8,i.update(o.subarray(0,8)).digest(),!1),o.set(n,12),o.set(t,n.byteLength+12),s.setUint32(r-4,i.update(o.subarray(8,r-4)).digest(),!1),o}decode(e){let{headers:t,body:n}=_7s(e);return{headers:this.headerMarshaller.parse(t),body:n}}formatHeaders(e){return this.headerMarshaller.format(e)}}
var T7s;
var S7s=b(()=>{VDr();y7s();T7s=x(Mfn(),1)});
export {KDr,T7s,S7s};
