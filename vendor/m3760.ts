// @ts-nocheck
import {_l} from "./m5.ts";
import {getProcessCommand,rE} from "./m1456.ts";
import {jt,ws} from "./m228.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {c8,ok} from "./m633.ts";
import {Pn,_o,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
import {sn} from "../src/config/0047_namespace.ts";
function bHe(){return!_l(void 0)}
function HNn(e){if(e<=1)return!1;try{return process.kill(e,0),!0}catch{return!1}}
function kdp(e,t){if(!HNn(e))return!1;if(e===process.pid)return!0;try{let n=getProcessCommand(e);if(!n)return!0;let r=n.toLowerCase(),o=t.toLowerCase();return r.includes("claude")||r.includes(o)}catch{return!0}}
function G3e(e){let t=jt();try{let n=t.readFileSync(e,{encoding:"utf8"});if(!n||n.trim()==="")return null;let r=qt(n);if(typeof r.pid!=="number"||!r.version||!r.execPath)return null;return r}catch{return null}}
function jFt(e){let t=G3e(e);if(!t)return!1;let{pid:n,execPath:r}=t;if(!HNn(n))return!1;if(!kdp(n,r))return logForDebugging(`Lock PID ${n} is running but does not appear to be Claude - treating as stale`),!1;let o=jt();try{let s=o.statSync(e);if(Date.now()-s.mtimeMs>xdp){if(!HNn(n))return!1}}catch{}return!0}
function Hdp(e,t){c8(e,Le(t,null,2))}
async function Zwa(e,t){let n=jt(),r=qFt.basename(e);if(jFt(t)){let s=G3e(t);return logForDebugging(`Cannot acquire lock for ${r} - held by PID ${s?.pid}`),null}let o={pid:process.pid,version:r,execPath:process.execPath,acquiredAt:Date.now()};try{if(Hdp(t,o),G3e(t)?.pid!==process.pid)return null;return logForDebugging(`Acquired PID lock for ${r} (PID ${process.pid})`),()=>{try{if(G3e(t)?.pid===process.pid)n.unlinkSync(t),logForDebugging(`Released PID lock for ${r}`)}catch(i){logForDebugging(`Failed to release lock for ${r}: ${i}`)}}}catch(s){return logForDebugging(`Failed to acquire lock for ${r}: ${s}`),null}}
async function eRa(e,t){let n=await Zwa(e,t);if(!n)return!1;let r=()=>{try{n()}catch{}};return process.on("exit",r),process.on("SIGINT",r),process.on("SIGTERM",r),!0}
async function tRa(e,t,n){let r=await Zwa(e,t);if(!r)return!1;try{return await n(),!0}finally{r()}}
function nRa(e){let t=jt(),n=[];try{let r=t.readdirStringSync(e).filter((o)=>o.endsWith(".lock"));for(let o of r){let s=qFt.join(e,o),i=G3e(s);if(i)n.push({version:i.version,pid:i.pid,isProcessRunning:HNn(i.pid),execPath:i.execPath,acquiredAt:new Date(i.acquiredAt),lockFilePath:s})}}catch(r){if(Pn(r))return n;De(_o(r))}return n}
function INn(e){let t=jt(),n=0;try{let r=t.readdirStringSync(e).filter((o)=>o.endsWith(".lock"));for(let o of r){let s=qFt.join(e,o);try{if(t.lstatSync(s).isDirectory())t.rmSync(s,{recursive:!0,force:!0}),n++,logForDebugging(`Cleaned up legacy directory lock: ${o}`);else if(!jFt(s))t.unlinkSync(s),n++,logForDebugging(`Cleaned up stale lock: ${o}`)}catch{}}}catch(r){if(Pn(r))return 0;logForDebugging(`Failed to readdir locks directory: ${_o(r).message}`,{level:"error"})}return n}
var qFt,xdp=7200000;
var fro=b(()=>{ok();qe();sn();bt();ws();rE();Rn();Xt();qFt=require("path")});
export {bHe,HNn,kdp,G3e,jFt,Hdp,Zwa,eRa,tRa,nRa,INn,qFt,xdp,fro};
