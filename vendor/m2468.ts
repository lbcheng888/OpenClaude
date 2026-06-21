// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {ABo} from "./m0.ts";
var fbn={};
isFullscreenWithTTY(fbn,{sharp:()=>sharp,getNativeModule:()=>getNativeModule,default:()=>rcd});
function getNativeModule(){if(Ywi)return mbn;Ywi=!0;try{mbn=ABo()}catch{mbn=null}return mbn}
function sharp(e){let t=[];async function n(o){let s=getNativeModule();if(!s)throw Error("Native image processor module not available");let i=await s.processImage(e);if(o)for(let a of t)a(i);return i}let r={async metadata(){let o=await n(!1);try{return o.metadata()}finally{o.dispose?.()}},resize(o,s,i){return t.push((a)=>{a.resize(o,s,i)}),r},jpeg(o){return t.push((s)=>{s.jpeg(o?.quality)}),r},png(o){return t.push((s)=>{s.png(o)}),r},webp(o){return t.push((s)=>{s.webp(o?.quality)}),r},async toBuffer(){let o=await n(!0);try{return await o.toBuffer()}finally{o.dispose?.()}}};return r}
var mbn=null,Ywi=!1,rcd;
var Abn=b(()=>{rcd=sharp});
export {fbn,getNativeModule,sharp,mbn,Ywi,rcd,Abn};
