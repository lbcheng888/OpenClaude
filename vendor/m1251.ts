// @ts-nocheck
import {rHr} from "./m1249.ts";
import {b} from "../runtime.ts";
import {sNs} from "./m1250.ts";
async function*iNs(e){let t=!1,n=!1,r=[];e.on("error",(o)=>{if(!t)t=!0;if(o)throw o}),e.on("data",(o)=>{r.push(o)}),e.on("end",()=>{t=!0});while(!n){let o=await new Promise((s)=>setTimeout(()=>s(r.shift()),0));if(o)yield o;n=t&&r.length===0}}
class oHr{universalMarshaller;constructor({utf8Encoder:e,utf8Decoder:t}){this.universalMarshaller=new rHr({utf8Decoder:t,utf8Encoder:e})}deserialize(e,t){let n=typeof e[Symbol.asyncIterator]==="function"?e:iNs(e);return this.universalMarshaller.deserialize(n,t)}serialize(e,t){return aNs.Readable.from(this.universalMarshaller.serialize(e,t))}}
var aNs;
var sHr=b(()=>{sNs();aNs=require("stream")});
export {iNs,oHr,aNs,sHr};
