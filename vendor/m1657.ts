// @ts-nocheck
import {zEr,L1e,THs,mln} from "./m1185.ts";
import {b} from "../runtime.ts";
function kpn(e){return typeof e.stream==="function"}
function sWs(){return zEr(this,arguments,function*(){let t=this.getReader();try{while(!0){let{done:n,value:r}=yield L1e(t.read());if(n)return yield L1e(void 0);yield yield L1e(r)}}finally{t.releaseLock()}})}
function B1u(e){if(!e[Symbol.asyncIterator])e[Symbol.asyncIterator]=sWs.bind(e);if(!e.values)e.values=sWs.bind(e)}
function iWs(e){if(e instanceof ReadableStream)return B1u(e),Hpn.Readable.fromWeb(e);else return e}
function F1u(e){if(e instanceof Uint8Array)return Hpn.Readable.from(Buffer.from(e));else if(kpn(e))return iWs(e.stream());else return iWs(e)}
async function aWs(e){return function(){let t=e.map((n)=>typeof n==="function"?n():n).map(F1u);return Hpn.Readable.from(function(){return zEr(this,arguments,function*(){var n,r,o,s;for(let c of t)try{for(var i=!0,a=(r=void 0,THs(c)),l;l=yield L1e(a.next()),n=l.done,!n;i=!0)s=l.value,i=!1,yield yield L1e(s)}catch(u){r={error:u}}finally{try{if(!i&&!n&&(o=a.return))yield L1e(o.call(a))}finally{if(r)throw r.error}}})}())}}
var Hpn;
var lWs=b(()=>{mln();Hpn=require("stream")});
export {kpn,sWs,B1u,iWs,F1u,aWs,Hpn,lWs};
