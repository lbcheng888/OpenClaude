// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Wt,ps} from "./m230.ts";
import {b} from "../runtime.ts";
function lVl(){return t7t.join(or(),aVl,getSessionId())}
async function RLm(){let e=lVl();await vZn.mkdir(e,{recursive:!0})}
function cVl(e,t){let n=t.split("/")[1]||"png";return t7t.join(lVl(),`${e}.${n}`)}
function W_t(e,t){if(e.type!=="image")return null;let n=cVl(e.id,e.mediaType||"image/png");return pVl(t,e.id,n),n}
async function G_t(e,t){let n=await dVl(e);if(n)pVl(t,e.id,n);return n}
async function uVl(e,t){let n=new Map;for(let[r,o]of Object.entries(e))if(o.type==="image"){let s=await dVl(o);if(s)n.set(Number(r),s)}if(n.size>0)t((r)=>{let o=r.storedImagePaths;for(let[s,i]of n)o=mVl(o,s,i);return o===r.storedImagePaths?r:{...r,storedImagePaths:o}});return n}
async function dVl(e){if(e.type!=="image")return null;try{await RLm();let t=cVl(e.id,e.mediaType||"image/png"),n=await vZn.open(t,"w",384);try{await n.writeFile(e.content,{encoding:"base64"}),await n.datasync()}finally{await n.close()}return logForDebugging(`Stored image ${e.id} to ${t}`),t}catch(t){return logForDebugging(`Failed to store image: ${t}`),null}}
function pVl(e,t,n){e((r)=>{let o=mVl(r.storedImagePaths,t,n);return o===r.storedImagePaths?r:{...r,storedImagePaths:o}})}
function mVl(e,t,n){if(e.get(t)===n)return e;let r=new Map(e);if(!r.has(t))while(r.size>=ALm){let o=r.keys().next().value;if(o===void 0)break;r.delete(o)}return r.set(t,n),r}
async function fVl(){let e=Wt(),t=t7t.join(or(),aVl),n=getSessionId();try{let r;try{r=await e.readdir(t)}catch{return}for(let o of r){if(o.name===n)continue;let s=t7t.join(t,o.name);try{await e.rm(s,{recursive:!0,force:!0}),logForDebugging(`Cleaned up old image cache: ${s}`)}catch{}}try{if((await e.readdir(t)).length===0)await e.rmdir(t)}catch{}}catch{}}
var vZn,t7t,aVl="image-cache",ALm=200;
var V_t=b(()=>{lt();qe();dn();ps();vZn=require("fs/promises"),t7t=require("path")});
export {lVl,RLm,cVl,W_t,G_t,uVl,dVl,pVl,mVl,fVl,vZn,t7t,aVl,ALm,V_t};
