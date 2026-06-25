// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {Js,rT} from "./m1294.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {In,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function kLi(){return bAd??SAd}
function EAd(e,t){let n=Hie.get(e);if(n!==void 0)mOt-=n.length,Hie.delete(e);if(t.length>kLi())return;Hie.set(e,t),mOt+=t.length;while(mOt>kLi()){let r=Hie.keys().next().value;mOt-=Hie.get(r).length,Hie.delete(r)}}
function A5r(){return BRn.join(or(),TAd)}
function ILi(e){return HLi.createHash("sha256").update(e).digest("hex").slice(0,16)}
function xLi(e){return BRn.join(A5r(),`${e}.txt`)}
function DLi(e,t){return FRn.set(e,t),CAd(e,t)}
async function CAd(e,t){try{let n=Js(),r=A5r();await n.mkdir(r);let o=xLi(e);if(await n.write(o,t,384),FRn.delete(e),Hie.has(e))mOt-=Hie.get(e).length,Hie.delete(e);logForDebugging(`Stored paste ${e} to ${o}`),He("paste_store")}catch(n){FRn.delete(e),EAd(e,t),logForDebugging(`Failed to store paste: ${n}`),Pt("paste_store","paste_store_write_failed")}}
async function PLi(e){let t=FRn.get(e);if(t!==void 0)return t;let n=Hie.get(e);if(n!==void 0)return n;try{let r=xLi(e);return await Js().read(r)}catch(r){if(!In(r))logForDebugging(`Failed to retrieve paste ${e}: ${r}`);return null}}
async function OLi(e){let t=Js(),n=A5r(),r;try{r=await t.list(n)}catch{return}let o=e.getTime();for(let s of r){if(!s.endsWith(".txt"))continue;let i=BRn.join(n,s);try{if((await t.stat(i)).mtimeMs<o)await t.delete(i),logForDebugging(`Cleaned up old paste: ${i}`)}catch{}}}
var HLi,BRn,TAd="paste-cache",FRn,Hie,mOt=0,SAd=1e7,bAd=null;
var R5r=b(()=>{mn();rT();qe();dn();Ct();HLi=require("crypto"),BRn=require("path"),FRn=new Map,Hie=new Map});
export {kLi,EAd,A5r,ILi,xLi,DLi,CAd,PLi,OLi,HLi,BRn,TAd,FRn,Hie,mOt,SAd,bAd,R5r};
