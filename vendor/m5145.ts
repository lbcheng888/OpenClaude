// @ts-nocheck
import {getProjectTempDir,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {dn,bLe,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {aYt,Jx,ws} from "./m228.ts";
import {b} from "../runtime.ts";
function qot(){if(THo===void 0)THo=SHo.join(getProjectTempDir(),getSessionId(),"tasks");return THo}
async function EHo(){await Wne.mkdir(qot(),{recursive:!0})}
function mh(e){return SHo.join(qot(),`${e}.output`)}
function KKn(e){return qMl.add(e),e.finally(()=>qMl.delete(e)).catch(()=>{}),e}
class zIn{#e;#t=null;#n=[];#i=0;#s=!1;#l=null;#o=null;constructor(e){this.#e=mh(e)}append(e){if(this.#s)return;if(this.#i+=e.length,this.#i>VKn)this.#s=!0,this.#n.push(`
[output truncated: exceeded ${bHo} disk cap]
`);else this.#n.push(e);if(!this.#l)this.#l=new Promise((t)=>{this.#o=t}),KKn(this.#r())}flush(){return this.#l??Promise.resolve()}cancel(){this.#n.length=0}async#c(){while(!0){try{if(!this.#t)await EHo(),this.#t=await Wne.open(this.#e,CPe.constants.O_WRONLY|CPe.constants.O_APPEND|CPe.constants.O_CREAT|jMl);while(!0)if(await this.#u(),this.#n.length===0)break}finally{if(this.#t){let e=this.#t;this.#t=null,await e.close()}}if(this.#n.length)continue;break}}#u(){return this.#t.appendFile(this.#a())}#a(){let e=this.#n.splice(0,this.#n.length),t=0;for(let o of e)t+=Buffer.byteLength(o,"utf8");let n=Buffer.allocUnsafe(t),r=0;for(let o of e)r+=n.write(o,r,"utf8");return n}async#r(){try{await this.#c()}catch(e){if(logForDebugging(`Task output drain failed (will retry once): ${e}`,{level:"error"}),this.#n.length>0)try{await this.#c()}catch(t){let n=dn(t);if(n&&bLe.has(n))logForDebugging(`Task output drain retry failed (${n}): ${t}`,{level:"error"});else De(t)}}finally{let e=this.#o;this.#l=null,this.#o=null,e()}}}
function O_m(e){let t=GKn.get(e);if(!t)t=new zIn(e),GKn.set(e,t);return t}
function gDa(e,t){O_m(e).append(t)}
function iy(e){return KKn((async()=>{let t=GKn.get(e);if(t)await t.flush(),GKn.delete(e)})())}
async function XKa(e,t,n=WMl){try{let r=await aYt(mh(e),t,n);if(!r)return{content:"",newOffset:t};return{content:r.content,newOffset:t+r.bytesRead}}catch(r){let o=dn(r);if(o==="ENOENT")return{content:"",newOffset:t};if(o&&bLe.has(o))logForDebugging(`getTaskOutputDelta failed (${o}): ${r}`,{level:"error"});else De(r);return{content:"",newOffset:t}}}
async function Ipo(e,t=WMl){try{let{content:n,bytesTotal:r,bytesRead:o}=await Jx(mh(e),t);if(r>o)return`[${Math.round((r-o)/1024)}KB of earlier output omitted]
${n}`;return n}catch(n){let r=dn(n);if(r==="ENOENT")return"";if(r&&bLe.has(r))logForDebugging(`getTaskOutput failed (${r}): ${n}`,{level:"error"});else De(n);return""}}
function flt(e){return KKn((async()=>{await EHo();let t=mh(e);return await(await Wne.open(t,CPe.constants.O_WRONLY|CPe.constants.O_CREAT|CPe.constants.O_EXCL|jMl)).close(),t})())}
function f6e(e,t){return KKn((async()=>{try{await EHo();let n=mh(e);try{await Wne.symlink(t,n)}catch(r){if(dn(r)!=="EEXIST")throw r;await Wne.unlink(n),await Wne.symlink(t,n)}return n}catch(n){let r=dn(n);if(r&&bLe.has(r))logForDebugging(`initTaskOutputAsSymlink failed (${r}): ${n}`,{level:"error"});else De(n);return flt(e)}})())}
var CPe,Wne,SHo,jMl,WMl=8388608,VKn=5368709120,bHo="5GB",THo,qMl,GKn;
var vC=b(()=>{lt();qe();bt();ws();Rn();nA();CPe=require("fs"),Wne=require("fs/promises"),SHo=require("path"),jMl=CPe.constants.O_NOFOLLOW??0;qMl=new Set;GKn=new Map});
export {qot,EHo,mh,KKn,zIn,O_m,gDa,iy,XKa,Ipo,flt,f6e,CPe,Wne,SHo,jMl,WMl,VKn,bHo,THo,qMl,GKn,vC};
