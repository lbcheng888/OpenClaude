// @ts-nocheck
import {getProjectTempDir,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {cn,ipe,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {UXt,pk,ps} from "./m230.ts";
import {b} from "../runtime.ts";
function $it(){if(DOo===void 0)DOo=POo.join(getProjectTempDir(),getSessionId(),"tasks");return DOo}
async function LOo(){await Bne.mkdir($it(),{recursive:!0})}
function gf(e){return POo.join($it(),`${e}.output`)}
function WXn(e){return v3l.add(e),e.finally(()=>v3l.delete(e)).catch(()=>{}),e}
class FPn{#e;#t=null;#n=[];#s=0;#i=!1;#a=null;#o=null;constructor(e){this.#e=gf(e)}append(e){if(this.#i)return;if(this.#s+=e.length,this.#s>qXn)this.#i=!0,this.#n.push(`
[output truncated: exceeded ${OOo} disk cap]
`);else this.#n.push(e);if(!this.#a)this.#a=new Promise((t)=>{this.#o=t}),WXn(this.#r())}flush(){return this.#a??Promise.resolve()}cancel(){this.#n.length=0}async#c(){while(!0){try{if(!this.#t)await LOo(),this.#t=await Bne.open(this.#e,EOe.constants.O_WRONLY|EOe.constants.O_APPEND|EOe.constants.O_CREAT|w3l);while(!0)if(await this.#u(),this.#n.length===0)break}finally{if(this.#t){let e=this.#t;this.#t=null,await e.close()}}if(this.#n.length)continue;break}}#u(){return this.#t.appendFile(this.#l())}#l(){let e=this.#n.splice(0,this.#n.length),t=0;for(let o of e)t+=Buffer.byteLength(o,"utf8");let n=Buffer.allocUnsafe(t),r=0;for(let o of e)r+=n.write(o,r,"utf8");return n}async#r(){try{await this.#c()}catch(e){if(logForDebugging(`Task output drain failed (will retry once): ${e}`,{level:"error"}),this.#n.length>0)try{await this.#c()}catch(t){let n=cn(t);if(n&&ipe.has(n))logForDebugging(`Task output drain retry failed (${n}): ${t}`,{level:"error"});else Ie(t)}}finally{let e=this.#o;this.#a=null,this.#o=null,e()}}}
function tkm(e){let t=$Xn.get(e);if(!t)t=new FPn(e),$Xn.set(e,t);return t}
function qFa(e,t){tkm(e).append(t)}
function p_(e){return WXn((async()=>{let t=$Xn.get(e);if(t)await t.flush(),$Xn.delete(e)})())}
async function gel(e,t,n=k3l){try{let r=await UXt(gf(e),t,n);if(!r)return{content:"",newOffset:t};return{content:r.content,newOffset:t+r.bytesRead}}catch(r){let o=cn(r);if(o==="ENOENT")return{content:"",newOffset:t};if(o&&ipe.has(o))logForDebugging(`getTaskOutputDelta failed (${o}): ${r}`,{level:"error"});else Ie(r);return{content:"",newOffset:t}}}
async function w_o(e,t=k3l){try{let{content:n,bytesTotal:r,bytesRead:o}=await pk(gf(e),t);if(r>o)return`[${Math.round((r-o)/1024)}KB of earlier output omitted]
${n}`;return n}catch(n){let r=cn(n);if(r==="ENOENT")return"";if(r&&ipe.has(r))logForDebugging(`getTaskOutput failed (${r}): ${n}`,{level:"error"});else Ie(n);return""}}
function mut(e){return WXn((async()=>{await LOo();let t=gf(e);return await(await Bne.open(t,EOe.constants.O_WRONLY|EOe.constants.O_CREAT|EOe.constants.O_EXCL|w3l)).close(),t})())}
function Yye(e,t){return WXn((async()=>{try{await LOo();let n=gf(e);try{await Bne.symlink(t,n)}catch(r){if(cn(r)!=="EEXIST")throw r;await Bne.unlink(n),await Bne.symlink(t,n)}return n}catch(n){let r=cn(n);if(r&&ipe.has(r))logForDebugging(`initTaskOutputAsSymlink failed (${r}): ${n}`,{level:"error"});else Ie(n);return mut(e)}})())}
var EOe,Bne,POo,w3l,k3l=8388608,qXn=5368709120,OOo="5GB",DOo,v3l,$Xn;
var wE=b(()=>{lt();qe();Ct();ps();vn();Xm();EOe=require("fs"),Bne=require("fs/promises"),POo=require("path"),w3l=EOe.constants.O_NOFOLLOW??0;v3l=new Set;$Xn=new Map});
export {$it,LOo,gf,WXn,FPn,tkm,qFa,p_,gel,w_o,mut,Yye,EOe,Bne,POo,w3l,k3l,qXn,OOo,DOo,v3l,$Xn,wE};
