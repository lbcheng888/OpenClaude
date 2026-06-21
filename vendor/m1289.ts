// @ts-nocheck
import {dn,bt} from "./m195.ts";
import {Rh,ok} from "./m633.ts";
import {b} from "../runtime.ts";
class LOs{read(e){return LR.readFile(e,"utf8")}readBytes(e){return LR.readFile(e)}write(e,t,n){return LR.writeFile(e,t,{encoding:"utf8",mode:n})}async mkdir(e){try{await LR.mkdir(e,{recursive:!0})}catch(t){if(dn(t)!=="EEXIST")throw t}}atomicWrite(e,t,n){return Rh(e,t,n)}delete(e){return LR.unlink(e)}list(e){return LR.readdir(e)}append(e,t,n){return LR.appendFile(e,t,{encoding:"utf8",mode:n})}writeExclusive(e,t,n){return LR.writeFile(e,t,{encoding:"utf8",flag:"wx",mode:n})}writeBytes(e,t){return LR.writeFile(e,t)}copy(e,t){return LR.copyFile(e,t)}async stat(e){return{mtimeMs:(await LR.stat(e)).mtimeMs}}async listEntries(e){return(await LR.readdir(e,{withFileTypes:!0})).map((n)=>({name:n.name,isDirectory:n.isDirectory(),isFile:n.isFile()}))}async readRange(e,t,n){Rvr("readRange","offset",t),Rvr("readRange","length",n);let r=await LR.open(e,"r");try{return await POs(r,t,n)}finally{await r.close()}}async readTail(e,t){Rvr("readTail","maxBytes",t);let n=await LR.open(e,"r");try{let{size:r}=await n.stat(),o=Math.min(t,r);return await POs(n,r-o,o)}finally{await n.close()}}}
function Rvr(e,t,n){if(!Number.isInteger(n)||n<0)throw RangeError(`${e}: ${t} must be a non-negative integer, got ${n}`)}
async function POs(e,t,n){if(n===0)return Buffer.alloc(0);let r=Buffer.alloc(n),o=0;while(o<n){let{bytesRead:s}=await e.read(r,o,n-o,t+o);if(s===0)break;o+=s}return o===n?r:Buffer.from(r.subarray(0,o))}
function ci(){return xIu.getStore()??new LOs}
var OOs,LR,xIu;
var pT=b(()=>{ok();bt();OOs=require("async_hooks"),LR=require("fs/promises");xIu=new OOs.AsyncLocalStorage});
export {LOs,Rvr,POs,ci,OOs,LR,xIu,pT};
