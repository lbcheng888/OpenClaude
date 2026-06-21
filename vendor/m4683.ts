// @ts-nocheck
import {rx,J1} from "../src/config/2678_withFileTypes.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {jt,ws} from "./m228.ts";
import {dn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function nfl(){return tfl.join(rx(),WYp)}
function VYp(e){let t=qt(e);if(typeof t!=="object"||t===null||!("plugins"in t)||typeof t.plugins!=="object"||t.plugins===null)return{};let n=t.plugins,r={};for(let[o,s]of Object.entries(n))if(s&&typeof s==="object"&&"flaggedAt"in s&&typeof s.flaggedAt==="string"){let i={flaggedAt:s.flaggedAt};if("seenAt"in s&&typeof s.seenAt==="string")i.seenAt=s.seenAt;r[o]=i}return r}
async function dWn(){try{let e=await kDe.readFile(nfl(),{encoding:"utf-8"});return VYp(e)}catch{return{}}}
async function pWn(e){let t=nfl(),n=`${t}.${efl.randomBytes(8).toString("hex")}.tmp`;try{await jt().mkdir(rx());let r=Le({plugins:e},null,2);await kDe.writeFile(n,r,{encoding:"utf-8",mode:384}),await kDe.rename(n,t),ej=e}catch(r){let o=dn(r);if(o==="ENOSPC"||o==="EROFS"||o==="EACCES"||o==="ENOENT"||o==="ENOTDIR")logForDebugging(`Failed to persist flagged plugins: ${r}`,{level:"error"});else De(r);try{await kDe.unlink(n)}catch{}}}
async function rfl(){let e=await dWn(),t=Date.now(),n=!1;for(let[r,o]of Object.entries(e))if(o.seenAt&&t-new Date(o.seenAt).getTime()>=GYp)delete e[r],n=!0;if(ej=e,n)await pWn(e)}
function Cmt(){return ej??{}}
async function ofl(e){if(ej===null)ej=await dWn();let t={...ej,[e]:{flaggedAt:new Date().toISOString()}};await pWn(t),logForDebugging(`Flagged plugin: ${e}`)}
async function sfl(e){if(ej===null)ej=await dWn();let t=new Date().toISOString(),n=!1,r={...ej};for(let o of e){let s=r[o];if(s&&!s.seenAt)r[o]={...s,seenAt:t},n=!0}if(n)await pWn(r)}
async function ifl(e){if(ej===null)ej=await dWn();if(!(e in ej))return;let{[e]:t,...n}=ej;ej=n,await pWn(n)}
var efl,kDe,tfl,WYp="flagged-plugins.json",GYp=172800000,ej=null;
var mWn=b(()=>{qe();bt();ws();Rn();Xt();J1();efl=require("crypto"),kDe=require("fs/promises"),tfl=require("path")});
export {nfl,VYp,dWn,pWn,rfl,Cmt,ofl,sfl,ifl,efl,kDe,tfl,WYp,GYp,ej,mWn};
