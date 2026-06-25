// @ts-nocheck
import {Nfn} from "./m1570.ts";
import {b} from "../runtime.ts";
import {I7s} from "./m1572.ts";
async function*x7s(e){let t=!1,n=!1,r=[];e.on("error",(o)=>{if(!t)t=!0;if(o)throw o}),e.on("data",(o)=>{r.push(o)}),e.on("end",()=>{t=!0});while(!n){let o=await new Promise((s)=>setTimeout(()=>s(r.shift()),0));if(o)yield o;n=t&&r.length===0}}
class Ffn{constructor({utf8Encoder:e,utf8Decoder:t}){this.universalMarshaller=new Nfn({utf8Decoder:t,utf8Encoder:e})}deserialize(e,t){let n=typeof e[Symbol.asyncIterator]==="function"?e:x7s(e);return this.universalMarshaller.deserialize(n,t)}serialize(e,t){return D7s.Readable.from(this.universalMarshaller.serialize(e,t))}}
var D7s;
var QDr=b(()=>{I7s();D7s=require("stream")});
export {x7s,Ffn,D7s,QDr};
