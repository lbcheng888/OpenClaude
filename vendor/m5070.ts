// @ts-nocheck
import {JT,$b,sk,KM,QT} from "./m642.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {defineTool,F$e} from "./m3158.ts";
import {dn,bt} from "./m195.ts";
import {d8,WMe} from "./m641.ts";
import {b} from "../runtime.ts";
async function r0l(e,t,n={}){if(!JT(e))throw Error(`Invalid sessionId: ${e}`);if(!t.trim())throw Error("title must be non-empty");let r=Le({type:"custom-title",customTitle:t.trim(),sessionId:e})+`
`;await i0l(e,r,n)}
async function o0l(e,t,n={}){if(!JT(e))throw Error(`Invalid sessionId: ${e}`);if(t!==null){let o=defineTool(t).trim();if(!o)throw Error("tag must be non-empty (use null to clear)");t=o}let r=Le({type:"tag",tag:t??"",sessionId:e})+`
`;await i0l(e,r,n)}
async function s0l(e,t={}){if(!JT(e))throw Error(`Invalid sessionId: ${e}`);for(let n of await opm(t)){let r=p8e.join(n,`${e}.jsonl`),o;try{({size:o}=await Mue.stat(r))}catch(s){let i=dn(s);if(i==="ENOENT"||i==="ENOTDIR")continue;throw s}if(o===0)continue;await Mue.rm(r,{force:!0}),await Mue.rm(p8e.join(n,e),{recursive:!0,force:!0});return}throw Error(t.dir?`Session ${e} not found in project directory for ${t.dir}`:`Session ${e} not found in any project directory`)}
async function opm(e){if(e.dir){let n=await $b(e.dir),r=await sk(n),o;try{o=await d8(n)}catch{o=[]}for(let s of o){if(s===n)continue;r.push(...await sk(s))}return r}let t=KM();try{return(await Mue.readdir(t,{withFileTypes:!0})).filter((r)=>r.isDirectory()||r.isSymbolicLink()).map((r)=>p8e.join(t,r.name))}catch{return[]}}
async function i0l(e,t,n){let r=`${e}.jsonl`;if(n.dir){let i=await $b(n.dir);for(let l of await sk(i))if(await $Ro(p8e.join(l,r),t))return;let a;try{a=await d8(i)}catch{a=[]}for(let l of a){if(l===i)continue;for(let c of await sk(l))if(await $Ro(p8e.join(c,r),t))return}throw Error(`Session ${e} not found in project directory for ${n.dir}`)}let o=KM(),s;try{s=await Mue.readdir(o)}catch{throw Error(`Session ${e} not found (no projects directory)`)}for(let i of s)if(await $Ro(p8e.join(o,i,r),t))return;throw Error(`Session ${e} not found in any project directory`)}
async function $Ro(e,t){let n;try{n=await Mue.open(e,qRo.constants.O_WRONLY|qRo.constants.O_APPEND)}catch(r){let o=dn(r);if(o==="ENOENT"||o==="ENOTDIR")return!1;throw r}try{let{size:r}=await n.stat();if(r===0)return!1;let o=void 0;return await n.write(t,o,"utf8"),!0}finally{await n.close()}}
var qRo,Mue,p8e;
var a0l=b(()=>{bt();WMe();F$e();QT();Xt();qRo=require("fs"),Mue=require("fs/promises"),p8e=require("path")});
export {r0l,o0l,s0l,opm,i0l,$Ro,qRo,Mue,p8e,a0l};
