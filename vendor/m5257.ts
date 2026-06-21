// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {jt,ws} from "./m228.ts";
import {b} from "../runtime.ts";
function a9l(){return vWt.join(tr(),i9l,getSessionId())}
async function Xwm(){let e=a9l();await bYn.mkdir(e,{recursive:!0})}
function l9l(e,t){let n=t.split("/")[1]||"png";return vWt.join(a9l(),`${e}.${n}`)}
function vAt(e,t){if(e.type!=="image")return null;let n=l9l(e.id,e.mediaType||"image/png");return d9l(t,e.id,n),n}
async function wAt(e,t){let n=await u9l(e);if(n)d9l(t,e.id,n);return n}
async function c9l(e,t){let n=new Map;for(let[r,o]of Object.entries(e))if(o.type==="image"){let s=await u9l(o);if(s)n.set(Number(r),s)}if(n.size>0)t((r)=>{let o=r.storedImagePaths;for(let[s,i]of n)o=p9l(o,s,i);return o===r.storedImagePaths?r:{...r,storedImagePaths:o}});return n}
async function u9l(e){if(e.type!=="image")return null;try{await Xwm();let t=l9l(e.id,e.mediaType||"image/png"),n=await bYn.open(t,"w",384);try{await n.writeFile(e.content,{encoding:"base64"}),await n.datasync()}finally{await n.close()}return logForDebugging(`Stored image ${e.id} to ${t}`),t}catch(t){return logForDebugging(`Failed to store image: ${t}`),null}}
function d9l(e,t,n){e((r)=>{let o=p9l(r.storedImagePaths,t,n);return o===r.storedImagePaths?r:{...r,storedImagePaths:o}})}
function p9l(e,t,n){if(e.get(t)===n)return e;let r=new Map(e);if(!r.has(t))while(r.size>=Jwm){let o=r.keys().next().value;if(o===void 0)break;r.delete(o)}return r.set(t,n),r}
async function m9l(){let e=jt(),t=vWt.join(tr(),i9l),n=getSessionId();try{let r;try{r=await e.readdir(t)}catch{return}for(let o of r){if(o.name===n)continue;let s=vWt.join(t,o.name);try{await e.rm(s,{recursive:!0,force:!0}),logForDebugging(`Cleaned up old image cache: ${s}`)}catch{}}try{if((await e.readdir(t)).length===0)await e.rmdir(t)}catch{}}catch{}}
var bYn,vWt,i9l="image-cache",Jwm=200;
var RAt=b(()=>{lt();qe();sn();ws();bYn=require("fs/promises"),vWt=require("path")});
export {a9l,Xwm,l9l,vAt,wAt,c9l,u9l,d9l,p9l,m9l,bYn,vWt,i9l,Jwm,RAt};
