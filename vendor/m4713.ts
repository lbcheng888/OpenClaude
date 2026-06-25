// @ts-nocheck
import {hw,a1} from "../src/config/2689_withFileTypes.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {Wt,ps} from "./m230.ts";
import {cn,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function Xbl(){return Jbl.join(hw(),jom)}
function Jom(e){let t=qt(e);if(typeof t!=="object"||t===null||!("plugins"in t)||typeof t.plugins!=="object"||t.plugins===null)return{};let n=t.plugins,r={};for(let[o,s]of Object.entries(n))if(s&&typeof s==="object"&&"flaggedAt"in s&&typeof s.flaggedAt==="string"){let i={flaggedAt:s.flaggedAt};if("seenAt"in s&&typeof s.seenAt==="string")i.seenAt=s.seenAt;r[o]=i}return r}
async function Y7n(){try{let e=await wPe.readFile(Xbl(),{encoding:"utf-8"});return Jom(e)}catch{return{}}}
async function J7n(e){let t=Xbl(),n=`${t}.${Ybl.randomBytes(8).toString("hex")}.tmp`;try{await Wt().mkdir(hw());let r=TeamDeleteToolName({plugins:e},null,2);await wPe.writeFile(n,r,{encoding:"utf-8",mode:384}),await wPe.rename(n,t),A6=e}catch(r){let o=cn(r);if(o==="ENOSPC"||o==="EROFS"||o==="EACCES"||o==="ENOENT"||o==="ENOTDIR")logForDebugging(`Failed to persist flagged plugins: ${r}`,{level:"error"});else Ie(r);try{await wPe.unlink(n)}catch{}}}
async function Qbl(){let e=await Y7n(),t=Date.now(),n=!1;for(let[r,o]of Object.entries(e))if(o.seenAt&&t-new Date(o.seenAt).getTime()>=Yom)delete e[r],n=!0;if(A6=e,n)await J7n(e)}
function Lht(){return A6??{}}
async function Zbl(e){if(A6===null)A6=await Y7n();let t={...A6,[e]:{flaggedAt:new Date().toISOString()}};await J7n(t),logForDebugging(`Flagged plugin: ${e}`)}
async function eEl(e){if(A6===null)A6=await Y7n();let t=new Date().toISOString(),n=!1,r={...A6};for(let o of e){let s=r[o];if(s&&!s.seenAt)r[o]={...s,seenAt:t},n=!0}if(n)await J7n(r)}
async function tEl(e){if(A6===null)A6=await Y7n();if(!(e in A6))return;let{[e]:t,...n}=A6;A6=n,await J7n(n)}
var Ybl,wPe,Jbl,jom="flagged-plugins.json",Yom=172800000,A6=null;
var X7n=b(()=>{qe();Ct();ps();vn();tn();a1();Ybl=require("crypto"),wPe=require("fs/promises"),Jbl=require("path")});
export {Xbl,Jom,Y7n,J7n,Qbl,Lht,Zbl,eEl,tEl,Ybl,wPe,Jbl,jom,Yom,A6,X7n};
