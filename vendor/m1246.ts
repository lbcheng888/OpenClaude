// @ts-nocheck
import {xCr} from "./m1244.ts";
import {b} from "../runtime.ts";
import {dDs} from "./m1245.ts";
async function*pDs(e){let t=!1,n=!1,r=[];e.on("error",(o)=>{if(!t)t=!0;if(o)throw o}),e.on("data",(o)=>{r.push(o)}),e.on("end",()=>{t=!0});while(!n){let o=await new Promise((s)=>setTimeout(()=>s(r.shift()),0));if(o)yield o;n=t&&r.length===0}}
class kCr{universalMarshaller;constructor({utf8Encoder:e,utf8Decoder:t}){this.universalMarshaller=new xCr({utf8Decoder:t,utf8Encoder:e})}deserialize(e,t){let n=typeof e[Symbol.asyncIterator]==="function"?e:pDs(e);return this.universalMarshaller.deserialize(n,t)}serialize(e,t){return mDs.Readable.from(this.universalMarshaller.serialize(e,t))}}
var mDs;
var HCr=b(()=>{dDs();mDs=require("stream")});
export {pDs,kCr,mDs,HCr};
