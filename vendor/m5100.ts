// @ts-nocheck
import {WT,Vb,Sk,aM,VT} from "./m648.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {O$,W9e} from "./m3167.ts";
import {cn,Ct} from "./m197.ts";
import {w5,N1e} from "./m647.ts";
import {b} from "../runtime.ts";
async function xFl(e,t,n={}){if(!WT(e))throw Error(`Invalid sessionId: ${e}`);if(!t.trim())throw Error("title must be non-empty");let r=TeamDeleteToolName({type:"custom-title",customTitle:t.trim(),sessionId:e})+`
`;await OFl(e,r,n)}
async function DFl(e,t,n={}){if(!WT(e))throw Error(`Invalid sessionId: ${e}`);if(t!==null){let o=O$(t).trim();if(!o)throw Error("tag must be non-empty (use null to clear)");t=o}let r=TeamDeleteToolName({type:"tag",tag:t??"",sessionId:e})+`
`;await OFl(e,r,n)}
async function PFl(e,t={}){if(!WT(e))throw Error(`Invalid sessionId: ${e}`);for(let n of await hbm(t)){let r=eGe.join(n,`${e}.jsonl`),o;try{({size:o}=await que.stat(r))}catch(s){let i=cn(s);if(i==="ENOENT"||i==="ENOTDIR")continue;throw s}if(o===0)continue;await que.rm(r,{force:!0}),await que.rm(eGe.join(n,e),{recursive:!0,force:!0});return}throw Error(t.dir?`Session ${e} not found in project directory for ${t.dir}`:`Session ${e} not found in any project directory`)}
async function hbm(e){if(e.dir){let n=await Vb(e.dir),r=await Sk(n),o;try{o=await w5(n)}catch{o=[]}for(let s of o){if(s===n)continue;r.push(...await Sk(s))}return r}let t=aM();try{return(await que.readdir(t,{withFileTypes:!0})).filter((r)=>r.isDirectory()||r.isSymbolicLink()).map((r)=>eGe.join(t,r.name))}catch{return[]}}
async function OFl(e,t,n){let r=`${e}.jsonl`;if(n.dir){let i=await Vb(n.dir);for(let l of await Sk(i))if(await Yxo(eGe.join(l,r),t))return;let a;try{a=await w5(i)}catch{a=[]}for(let l of a){if(l===i)continue;for(let c of await Sk(l))if(await Yxo(eGe.join(c,r),t))return}throw Error(`Session ${e} not found in project directory for ${n.dir}`)}let o=aM(),s;try{s=await que.readdir(o)}catch{throw Error(`Session ${e} not found (no projects directory)`)}for(let i of s)if(await Yxo(eGe.join(o,i,r),t))return;throw Error(`Session ${e} not found in any project directory`)}
async function Yxo(e,t){let n;try{n=await que.open(e,Jxo.constants.O_WRONLY|Jxo.constants.O_APPEND)}catch(r){let o=cn(r);if(o==="ENOENT"||o==="ENOTDIR")return!1;throw r}try{let{size:r}=await n.stat();if(r===0)return!1;let o=void 0;return await n.write(t,o,"utf8"),!0}finally{await n.close()}}
var Jxo,que,eGe;
var LFl=b(()=>{Ct();N1e();W9e();VT();tn();Jxo=require("fs"),que=require("fs/promises"),eGe=require("path")});
export {xFl,DFl,PFl,hbm,OFl,Yxo,Jxo,que,eGe,LFl};
