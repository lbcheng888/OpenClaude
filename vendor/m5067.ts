// @ts-nocheck
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {withTimeout,sleep} from "../src/telemetry/1483_withTimeout.ts";
import {_o,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
class MRo{send;sendTimeoutMs;onError;maxPendingEntries;maxPendingBytes;backoffMs;pending=[];pendingEntries=0;pendingBytes=0;flushPromise=null;constructor(e,t=60000,n,r=c7n,o=u7n,s=Xdm){this.send=e;this.sendTimeoutMs=t;this.onError=n;this.maxPendingEntries=r;this.maxPendingBytes=o;this.backoffMs=s}enqueue(e,t){let n=Le(t).length;if(this.pending.push({filePath:e,entries:t,bytes:n}),this.pendingEntries+=t.length,this.pendingBytes+=n,this.pendingEntries>this.maxPendingEntries||this.pendingBytes>this.maxPendingBytes)this.flushPromise=this.drain(),this.flushPromise.catch(()=>{})}async flush(){let e=this.drain();if(this.flushPromise=e,await e,this.flushPromise===e)this.flushPromise=null}async drain(){let e=this.flushPromise,t=this.pending.splice(0);if(this.pendingEntries=0,this.pendingBytes=0,e)await e;if(t.length===0)return;await this.doFlush(t)}async doFlush(e){let t=new Map;for(let r of e){let o=t.get(r.filePath);if(o)o.push(...r.entries);else t.set(r.filePath,r.entries.slice())}let n=this.backoffMs.length+1;for(let[r,o]of t){let s=`SessionStore.append() timed out after ${this.sendTimeoutMs}ms for ${r}`,i,a=1;for(;a<=n;a++)try{await withTimeout(this.send(r,o),this.sendTimeoutMs,s),i=void 0;break}catch(l){if(i=_o(l),i.message===s)break;let c=this.backoffMs[a-1];if(c===void 0)break;await sleep(c)}if(i){logForDebugging(`[TranscriptMirrorBatcher] flush failed for ${r} after ${a} attempt(s): ${i}`,{level:"error"});try{this.onError?.(r,i)}catch(l){logForDebugging(`[TranscriptMirrorBatcher] onError callback threw: ${l}`,{level:"error"})}}}}}
var c7n=500,u7n=1048576,Xdm;
var JIl=b(()=>{qe();bt();Xt();Xdm=[200,800]});
export {MRo,c7n,u7n,Xdm,JIl};
