// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {s3o} from "./m0.ts";
var tRn={};
ft(tRn,{sharp:()=>sharp,getNativeModule:()=>getNativeModule,default:()=>wTd});
function getNativeModule(){if(gDi)return eRn;gDi=!0;try{eRn=s3o()}catch{eRn=null}return eRn}
function sharp(e){let t=[];async function n(o){let s=getNativeModule();if(!s)throw Error("Native image processor module not available");let i=await s.processImage(e);if(o)for(let a of t)a(i);return i}let r={async metadata(){let o=await n(!1);try{return o.metadata()}finally{o.dispose?.()}},resize(o,s,i){return t.push((a)=>{a.resize(o,s,i)}),r},jpeg(o){return t.push((s)=>{s.jpeg(o?.quality)}),r},png(o){return t.push((s)=>{s.png(o)}),r},webp(o){return t.push((s)=>{s.webp(o?.quality)}),r},async toBuffer(){let o=await n(!0);try{return await o.toBuffer()}finally{o.dispose?.()}}};return r}
var eRn=null,gDi=!1,wTd;
var nRn=b(()=>{wTd=sharp});
export {tRn,getNativeModule,sharp,eRn,gDi,wTd,nRn};
