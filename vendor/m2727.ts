// @ts-nocheck
import {a3,yje} from "./m642.ts";
import {b} from "../runtime.ts";
function f4i(e){return Bun.hash(e).toString(36)}
function gae(e,t){if(e.contentHash!==void 0)return e.contentHash===f4i(t);return e.content===t}
class h4i{cache;constructor(e,t){this.cache=new a3({max:e,maxSize:t,sizeCalculation:(n)=>Math.max(1,Buffer.byteLength(n.content))})}get(e){return this.cache.get(DMt.normalize(e))}set(e,t){let n=DMt.normalize(e),r=this.cache.get(n),o=t.keepContent??r?.keepContent,s=t.contentHash??f4i(t.content),i=t.contentLength??t.content.length,a=o&&t.content===""&&s===r?.contentHash&&r.content?r.content:t.content,l=o||Buffer.byteLength(a)<=FLd?a:"";return this.cache.set(n,{...t,keepContent:o,contentHash:s,contentLength:i,content:l}),this}has(e){return this.cache.has(DMt.normalize(e))}delete(e){return this.cache.delete(DMt.normalize(e))}clear(){this.cache.clear()}get size(){return this.cache.size}get max(){return this.cache.max}get maxSize(){return this.cache.maxSize}get calculatedSize(){return this.cache.calculatedSize}keys(){return this.cache.keys()}entries(){return this.cache.entries()}dump(){return this.cache.dump()}load(e){this.cache.load(e)}}
function _$(e,t=NLd){return new h4i(e,t)}
function PMt(e){return Object.fromEntries(e.entries())}
function Ske(e){return Array.from(e.keys())}
function uge(e){let t=_$(e.max,e.maxSize);return t.load(e.dump()),t}
function jrt(e,t){let n=uge(e);for(let[r,o]of t.entries()){let s=n.get(r);if(!s||o.timestamp>s.timestamp)n.set(r,o)}return n}
var DMt,eB=5000,NLd=26214400,FLd=4096;
var Gk=b(()=>{yje();DMt=require("path")});
export {f4i,gae,h4i,_$,PMt,Ske,uge,jrt,DMt,eB,NLd,FLd,Gk};
