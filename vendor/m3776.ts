// @ts-nocheck
import {Za} from "./m127.ts";
import {getProcessCommand,lE} from "./m1461.ts";
import {Wt,ps} from "./m230.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {R5,Pv} from "./m639.ts";
import {In,mo,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
import {dn} from "../src/config/0137_namespace.ts";
function u0e(){return!Za(void 0)}
function bUn(e){if(e<=1)return!1;try{return process.kill(e,0),!0}catch{return!1}}
function gEp(e,t){if(!bUn(e))return!1;if(e===process.pid)return!0;try{let n=getProcessCommand(e);if(!n)return!0;let r=n.toLowerCase(),o=t.toLowerCase();return r.includes("claude")||r.includes(o)}catch{return!0}}
function sqe(e){let t=Wt();try{let n=t.readFileSync(e,{encoding:"utf8"});if(!n||n.trim()==="")return null;let r=qt(n);if(typeof r.pid!=="number"||!r.version||!r.execPath)return null;return r}catch{return null}}
function T$t(e){let t=sqe(e);if(!t)return!1;let{pid:n,execPath:r}=t;if(!bUn(n))return!1;if(!gEp(n,r))return logForDebugging(`Lock PID ${n} is running but does not appear to be Claude - treating as stale`),!1;let o=Wt();try{let s=o.statSync(e);if(Date.now()-s.mtimeMs>hEp){if(!bUn(n))return!1}}catch{}return!0}
function _Ep(e,t){R5(e,TeamDeleteToolName(t,null,2))}
async function _Pa(e,t){let n=Wt(),r=y$t.basename(e);if(T$t(t)){let s=sqe(t);return logForDebugging(`Cannot acquire lock for ${r} - held by PID ${s?.pid}`),null}let o={pid:process.pid,version:r,execPath:process.execPath,acquiredAt:Date.now()};try{if(_Ep(t,o),sqe(t)?.pid!==process.pid)return null;return logForDebugging(`Acquired PID lock for ${r} (PID ${process.pid})`),()=>{try{if(sqe(t)?.pid===process.pid)n.unlinkSync(t),logForDebugging(`Released PID lock for ${r}`)}catch(i){logForDebugging(`Failed to release lock for ${r}: ${i}`)}}}catch(s){return logForDebugging(`Failed to acquire lock for ${r}: ${s}`),null}}
async function yPa(e,t){let n=await _Pa(e,t);if(!n)return!1;let r=()=>{try{n()}catch{}};return process.on("exit",r),process.on("SIGINT",r),process.on("SIGTERM",r),!0}
async function TPa(e,t,n){let r=await _Pa(e,t);if(!r)return!1;try{return await n(),!0}finally{r()}}
function SPa(e){let t=Wt(),n=[];try{let r=t.readdirStringSync(e).filter((o)=>o.endsWith(".lock"));for(let o of r){let s=y$t.join(e,o),i=sqe(s);if(i)n.push({version:i.version,pid:i.pid,isProcessRunning:bUn(i.pid),execPath:i.execPath,acquiredAt:new Date(i.acquiredAt),lockFilePath:s})}}catch(r){if(In(r))return n;Ie(mo(r))}return n}
function EUn(e){let t=Wt(),n=0;try{let r=t.readdirStringSync(e).filter((o)=>o.endsWith(".lock"));for(let o of r){let s=y$t.join(e,o);try{if(t.lstatSync(s).isDirectory())t.rmSync(s,{recursive:!0,force:!0}),n++,logForDebugging(`Cleaned up legacy directory lock: ${o}`);else if(!T$t(s))t.unlinkSync(s),n++,logForDebugging(`Cleaned up stale lock: ${o}`)}catch{}}}catch(r){if(In(r))return 0;logForDebugging(`Failed to readdir locks directory: ${mo(r).message}`,{level:"error"})}return n}
var y$t,hEp=7200000;
var Qao=b(()=>{Pv();qe();dn();Ct();ps();lE();vn();tn();y$t=require("path")});
export {u0e,bUn,gEp,sqe,T$t,_Ep,_Pa,yPa,TPa,SPa,EUn,y$t,hEp,Qao};
