// @ts-nocheck
import {Ckr,kNe,fLs,Xun} from "./m1190.ts";
import {b} from "../runtime.ts";
function dhn(e){return typeof e.stream==="function"}
function eYs(){return Ckr(this,arguments,function*(){let t=this.getReader();try{while(!0){let{done:n,value:r}=yield kNe(t.read());if(n)return yield kNe(void 0);yield yield kNe(r)}}finally{t.releaseLock()}})}
function r6u(e){if(!e[Symbol.asyncIterator])e[Symbol.asyncIterator]=eYs.bind(e);if(!e.values)e.values=eYs.bind(e)}
function tYs(e){if(e instanceof ReadableStream)return r6u(e),phn.Readable.fromWeb(e);else return e}
function o6u(e){if(e instanceof Uint8Array)return phn.Readable.from(Buffer.from(e));else if(dhn(e))return tYs(e.stream());else return tYs(e)}
async function nYs(e){return function(){let t=e.map((n)=>typeof n==="function"?n():n).map(o6u);return phn.Readable.from(function(){return Ckr(this,arguments,function*(){var n,r,o,s;for(let c of t)try{for(var i=!0,a=(r=void 0,fLs(c)),l;l=yield kNe(a.next()),n=l.done,!n;i=!0)s=l.value,i=!1,yield yield kNe(s)}catch(u){r={error:u}}finally{try{if(!i&&!n&&(o=a.return))yield kNe(o.call(a))}finally{if(r)throw r.error}}})}())}}
var phn;
var rYs=b(()=>{Xun();phn=require("stream")});
export {dhn,eYs,r6u,tYs,o6u,nYs,phn,rYs};
