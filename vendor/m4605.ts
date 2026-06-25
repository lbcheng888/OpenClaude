// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {cn,In,Ct} from "./m197.ts";
import {ba,pd} from "./m706.ts";
import {isSameProcessAsync,lE} from "./m1461.ts";
import {rht,URo} from "./m4604.ts";
import {b} from "../runtime.ts";
function due(){return $Ro.join(or(),jgl)}
function Ttm(e){return $Ro.join(or(),`${jgl}.tmp.${e.pid}.${e.startedAt}`)}
async function Ygl(e){try{return await EL.writeFile(due(),TeamDeleteToolName(e,null,2),{flag:"wx"}),!0}catch(t){if(cn(t)==="EEXIST")return!1;throw t}}
async function mPe(){let e;try{let n=await EL.lstat(due());if(!n.isFile()||n.size>65536)return await EL.rm(due(),{recursive:!0,force:!0}).catch(()=>{}),null;e=await EL.readFile(due(),"utf8")}catch(n){if(In(n))return null;throw n}let t=ba(e,!1);if(t&&typeof t==="object"){let n=t;if(typeof n.pid==="number"&&typeof n.version==="string")return t}return null}
async function qRo(e){let t=Ttm(e);await EL.writeFile(t,TeamDeleteToolName(e,null,2),{flag:"wx"});try{await EL.rename(t,due())}catch(r){let o=cn(r);if(o==="EEXIST"||o==="EPERM"){await EL.unlink(due()).catch(()=>{});try{await EL.rename(t,due())}catch(s){await EL.unlink(t).catch(()=>{});let i=cn(s);if(i==="EEXIST"||i==="EPERM")return!1;throw s}}else throw await EL.unlink(t).catch(()=>{}),r}let n=await mPe();return n?.pid===e.pid&&n?.startedAt===e.startedAt}
async function Jgl(){try{await EL.unlink(due())}catch(e){if(!In(e))throw e}}
async function WRo(e){let t;try{t=await EL.readFile(`/proc/${e}/cmdline`,"utf8")}catch{return!0}let n=t.split("\x00");return n[0]==="claude daemon"||n.slice(1,4).includes("daemon")}
async function VI(){let e=await mPe();if(!e)return null;try{process.kill(e.pid,0)}catch{return null}if(!await WRo(e.pid))return null;if(!await isSameProcessAsync(e.pid,e.procStart))return null;return e}
async function eWt(){let e=await VI().catch(()=>null);if(!e)return null;return await rht(e.pid),e.pid}
async function Xgl(e){let t=await VI().catch(()=>null);return!!t&&t.version!==e}
var EL,$Ro,jgl="daemon.lock";
var dne=b(()=>{dn();Ct();lE();pd();URo();tn();EL=require("fs/promises"),$Ro=require("path")});
export {due,Ttm,Ygl,mPe,qRo,Jgl,WRo,VI,eWt,Xgl,EL,$Ro,jgl,dne};
