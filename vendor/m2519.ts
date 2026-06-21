// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ci,pT} from "./m1289.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {Pn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function aHi(){return Ymd??zmd}
function Jmd(e,t){let n=Oie.get(e);if(n!==void 0)M0t-=n.length,Oie.delete(e);if(t.length>aHi())return;Oie.set(e,t),M0t+=t.length;while(M0t>aHi()){let r=Oie.keys().next().value;M0t-=Oie.get(r).length,Oie.delete(r)}}
function V9r(){return Qbn.join(tr(),Kmd)}
function cHi(e){return lHi.createHash("sha256").update(e).digest("hex").slice(0,16)}
function uHi(e){return Qbn.join(V9r(),`${e}.txt`)}
function dHi(e,t){return Xbn.set(e,t),Xmd(e,t)}
async function Xmd(e,t){try{let n=ci(),r=V9r();await n.mkdir(r);let o=uHi(e);if(await n.write(o,t,384),Xbn.delete(e),Oie.has(e))M0t-=Oie.get(e).length,Oie.delete(e);logForDebugging(`Stored paste ${e} to ${o}`),Ie("paste_store")}catch(n){Xbn.delete(e),Jmd(e,t),logForDebugging(`Failed to store paste: ${n}`),isTmuxControlMode("paste_store","paste_store_write_failed")}}
async function pHi(e){let t=Xbn.get(e);if(t!==void 0)return t;let n=Oie.get(e);if(n!==void 0)return n;try{let r=uHi(e);return await ci().read(r)}catch(r){if(!Pn(r))logForDebugging(`Failed to retrieve paste ${e}: ${r}`);return null}}
async function mHi(e){let t=ci(),n=V9r(),r;try{r=await t.list(n)}catch{return}let o=e.getTime();for(let s of r){if(!s.endsWith(".txt"))continue;let i=Qbn.join(n,s);try{if((await t.stat(i)).mtimeMs<o)await t.delete(i),logForDebugging(`Cleaned up old paste: ${i}`)}catch{}}}
var lHi,Qbn,Kmd="paste-cache",Xbn,Oie,M0t=0,zmd=1e7,Ymd=null;
var K9r=b(()=>{ln();pT();qe();sn();bt();lHi=require("crypto"),Qbn=require("path"),Xbn=new Map,Oie=new Map});
export {aHi,Jmd,V9r,cHi,uHi,dHi,Xmd,pHi,mHi,lHi,Qbn,Kmd,Xbn,Oie,M0t,zmd,Ymd,K9r};
