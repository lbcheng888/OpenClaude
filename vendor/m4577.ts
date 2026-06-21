// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {dn,Pn,bt} from "./m195.ts";
import {Fa,Pd} from "./m701.ts";
import {isSameProcessAsync,rE} from "./m1456.ts";
import {Xpt,RTo} from "./m4576.ts";
import {b} from "../runtime.ts";
function fue(){return xTo.join(tr(),mcl)}
function A7p(e){return xTo.join(tr(),`${mcl}.tmp.${e.pid}.${e.startedAt}`)}
async function fcl(e){try{return await oM.writeFile(fue(),Le(e,null,2),{flag:"wx"}),!0}catch(t){if(dn(t)==="EEXIST")return!1;throw t}}
async function x6t(){let e;try{let n=await oM.lstat(fue());if(!n.isFile()||n.size>65536)return await oM.rm(fue(),{recursive:!0,force:!0}).catch(()=>{}),null;e=await oM.readFile(fue(),"utf8")}catch(n){if(Pn(n))return null;throw n}let t=Fa(e,!1);if(t&&typeof t==="object"){let n=t;if(typeof n.pid==="number"&&typeof n.version==="string")return t}return null}
async function kTo(e){let t=A7p(e);await oM.writeFile(t,Le(e,null,2),{flag:"wx"});try{await oM.rename(t,fue())}catch(r){let o=dn(r);if(o==="EEXIST"||o==="EPERM"){await oM.unlink(fue()).catch(()=>{});try{await oM.rename(t,fue())}catch(s){await oM.unlink(t).catch(()=>{});let i=dn(s);if(i==="EEXIST"||i==="EPERM")return!1;throw s}}else throw await oM.unlink(t).catch(()=>{}),r}let n=await x6t();return n?.pid===e.pid&&n?.startedAt===e.startedAt}
async function Acl(){try{await oM.unlink(fue())}catch(e){if(!Pn(e))throw e}}
async function HTo(e){let t;try{t=await oM.readFile(`/proc/${e}/cmdline`,"utf8")}catch{return!0}let n=t.split("\x00");return n[0]==="claude daemon"||n.slice(1,4).includes("daemon")}
async function yI(){let e=await x6t();if(!e)return null;try{process.kill(e.pid,0)}catch{return null}if(!await HTo(e.pid))return null;if(!await isSameProcessAsync(e.pid,e.procStart))return null;return e}
async function k6t(){let e=await yI().catch(()=>null);if(!e)return null;return await Xpt(e.pid),e.pid}
async function hcl(e){let t=await yI().catch(()=>null);return!!t&&t.version!==e}
var oM,xTo,mcl="daemon.lock";
var yne=b(()=>{sn();bt();rE();Pd();RTo();Xt();oM=require("fs/promises"),xTo=require("path")});
export {fue,A7p,fcl,x6t,kTo,Acl,HTo,yI,k6t,hcl,oM,xTo,mcl,yne};
