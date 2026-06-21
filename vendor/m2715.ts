// @ts-nocheck
import {j3,S7e} from "./m636.ts";
import {b} from "../runtime.ts";
function kBi(e){return Bun.hash(e).toString(36)}
function yae(e,t){if(e.contentHash!==void 0)return e.contentHash===kBi(t);return e.content===t}
class HBi{cache;constructor(e,t){this.cache=new j3({max:e,maxSize:t,sizeCalculation:(n)=>Math.max(1,Buffer.byteLength(n.content))})}get(e){return this.cache.get(ZPt.normalize(e))}set(e,t){let n=ZPt.normalize(e),r=this.cache.get(n),o=t.keepContent??r?.keepContent,s=t.contentHash??kBi(t.content),i=t.contentLength??t.content.length,a=o&&t.content===""&&s===r?.contentHash&&r.content?r.content:t.content,l=o||Buffer.byteLength(a)<=awd?a:"";return this.cache.set(n,{...t,keepContent:o,contentHash:s,contentLength:i,content:l}),this}has(e){return this.cache.has(ZPt.normalize(e))}delete(e){return this.cache.delete(ZPt.normalize(e))}clear(){this.cache.clear()}get size(){return this.cache.size}get max(){return this.cache.max}get maxSize(){return this.cache.maxSize}get calculatedSize(){return this.cache.calculatedSize}keys(){return this.cache.keys()}entries(){return this.cache.entries()}dump(){return this.cache.dump()}load(e){this.cache.load(e)}}
function Y$(e,t=iwd){return new HBi(e,t)}
function eOt(e){return Object.fromEntries(e.entries())}
function MRe(e){return Array.from(e.keys())}
function QAe(e){let t=Y$(e.max,e.maxSize);return t.load(e.dump()),t}
function Vtt(e,t){let n=QAe(e);for(let[r,o]of t.entries()){let s=n.get(r);if(!s||o.timestamp>s.timestamp)n.set(r,o)}return n}
var ZPt,DF=5000,iwd=26214400,awd=4096;
var xk=b(()=>{S7e();ZPt=require("path")});
export {kBi,yae,HBi,Y$,eOt,MRe,QAe,Vtt,ZPt,DF,iwd,awd,xk};
