// @ts-nocheck
import {tpn} from "./m1565.ts";
import {b} from "../runtime.ts";
import {Ljs} from "./m1567.ts";
async function*Mjs(e){let t=!1,n=!1,r=[];e.on("error",(o)=>{if(!t)t=!0;if(o)throw o}),e.on("data",(o)=>{r.push(o)}),e.on("end",()=>{t=!0});while(!n){let o=await new Promise((s)=>setTimeout(()=>s(r.shift()),0));if(o)yield o;n=t&&r.length===0}}
class npn{constructor({utf8Encoder:e,utf8Decoder:t}){this.universalMarshaller=new tpn({utf8Decoder:t,utf8Encoder:e})}deserialize(e,t){let n=typeof e[Symbol.asyncIterator]==="function"?e:Mjs(e);return this.universalMarshaller.deserialize(n,t)}serialize(e,t){return Njs.Readable.from(this.universalMarshaller.serialize(e,t))}}
var Njs;
var bkr=b(()=>{Ljs();Njs=require("stream")});
export {Mjs,npn,Njs,bkr};
