// @ts-nocheck
import {cn,Ct} from "./m197.ts";
import {vf,Pv} from "./m639.ts";
import {b} from "../runtime.ts";
class IBs{read(e){return Kv.readFile(e,"utf8")}readBytes(e){return Kv.readFile(e)}write(e,t,n){return Kv.writeFile(e,t,{encoding:"utf8",mode:n})}async mkdir(e){try{await Kv.mkdir(e,{recursive:!0})}catch(t){if(cn(t)!=="EEXIST")throw t}}atomicWrite(e,t,n){return vf(e,t,n)}delete(e){return Kv.unlink(e)}list(e){return Kv.readdir(e)}append(e,t,n){return Kv.appendFile(e,t,{encoding:"utf8",mode:n})}writeExclusive(e,t,n){return Kv.writeFile(e,t,{encoding:"utf8",flag:"wx",mode:n})}writeBytes(e,t){return Kv.writeFile(e,t)}copy(e,t){return Kv.copyFile(e,t)}async stat(e){return{mtimeMs:(await Kv.stat(e)).mtimeMs}}async listEntries(e){return(await Kv.readdir(e,{withFileTypes:!0})).map((n)=>({name:n.name,isDirectory:n.isDirectory(),isFile:n.isFile()}))}async readRange(e,t,n){nIr("readRange","offset",t),nIr("readRange","length",n);let r=await Kv.open(e,"r");try{return await kBs(r,t,n)}finally{await r.close()}}async readTail(e,t){nIr("readTail","maxBytes",t);let n=await Kv.open(e,"r");try{let{size:r}=await n.stat(),o=Math.min(t,r);return await kBs(n,r-o,o)}finally{await n.close()}}}
function nIr(e,t,n){if(!Number.isInteger(n)||n<0)throw RangeError(`${e}: ${t} must be a non-negative integer, got ${n}`)}
async function kBs(e,t,n){if(n===0)return Buffer.alloc(0);let r=Buffer.alloc(n),o=0;while(o<n){let{bytesRead:s}=await e.read(r,o,n-o,t+o);if(s===0)break;o+=s}return o===n?r:Buffer.from(r.subarray(0,o))}
function Js(){return VBu.getStore()??new IBs}
var HBs,Kv,VBu;
var rT=b(()=>{Pv();Ct();HBs=require("async_hooks"),Kv=require("fs/promises");VBu=new HBs.AsyncLocalStorage});
export {IBs,nIr,kBs,Js,HBs,Kv,VBu,rT};
