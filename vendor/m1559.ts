// @ts-nocheck
import {fkr,Akr} from "./m1557.ts";
import {bjs,Ejs} from "./m1558.ts";
import {b,M} from "../runtime.ts";
import {epn} from "./m1554.ts";
class hkr{constructor(e,t){this.headerMarshaller=new fkr(e,t),this.messageBuffer=[],this.isEndOfStream=!1}feed(e){this.messageBuffer.push(this.decode(e))}endOfStream(){this.isEndOfStream=!0}getMessage(){let e=this.messageBuffer.pop(),t=this.isEndOfStream;return{getMessage(){return e},isEndOfStream(){return t}}}getAvailableMessages(){let e=this.messageBuffer;this.messageBuffer=[];let t=this.isEndOfStream;return{getMessages(){return e},isEndOfStream(){return t}}}encode({headers:e,body:t}){let n=this.headerMarshaller.format(e),r=n.byteLength+t.byteLength+16,o=new Uint8Array(r),s=new DataView(o.buffer,o.byteOffset,o.byteLength),i=new Cjs.Crc32;return s.setUint32(0,r,!1),s.setUint32(4,n.byteLength,!1),s.setUint32(8,i.update(o.subarray(0,8)).digest(),!1),o.set(n,12),o.set(t,n.byteLength+12),s.setUint32(r-4,i.update(o.subarray(8,r-4)).digest(),!1),o}decode(e){let{headers:t,body:n}=bjs(e);return{headers:this.headerMarshaller.parse(t),body:n}}formatHeaders(e){return this.headerMarshaller.format(e)}}
var Cjs;
var vjs=b(()=>{Akr();Ejs();Cjs=M(epn(),1)});
export {hkr,Cjs,vjs};
