// @ts-nocheck
import {d5t,Jxo} from "./5124_onStarting.ts";
import {lj,h8e} from "../config/5123_proto.ts";
import {l5n,OT,gue} from "../../vendor/m4582.ts";
import {kje,hue,sM} from "../../vendor/m4581.ts";
import {Cp,rM} from "../../vendor/m4493.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {Rh,ok} from "../../vendor/m633.ts";
import {Pn,Se,bt} from "../../vendor/m195.ts";
import {sleep} from "./1483_withTimeout.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnumOpt} from "../../vendor/m5.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {b} from "../../runtime.ts";
async function Ako(e,t=!1,n=Date.now()){let r=fko;if(!r){pko??=(e.source==="shell"?d5t():lj({forceTransient:!0})).finally(()=>{pko=null});let s=await pko;if(!s.ok)return mko("daemon-unreachable",s.reason,e.source,n),{ok:!1,reason:"daemon-unreachable",detail:s.reason}}let o=l5n("cli-bg-dispatch");try{let s=kje(),i=YOl.join(s,`${e.short}.json`),a="ack-timeout",l="no ack",c=zOl.randomBytes(4).toString("hex");for(let u=0;u<3;u++){if(r){let m=await OT({proto:Cp,op:"dispatch",d:{...e,nonce:c},timeoutMs:5000,auth:await hue()},{timeoutMs:6000});if(m.ok&&m.op==="dispatch")return KOl(e,m.pid,m.messagingSock,n,m.via);if("code"in m&&m.code==="EALIVE")return mko("short-alive",m.error,e.source,n),{ok:!1,reason:"short-alive",detail:m.error,nonce:c};if("code"in m&&m.code==="ESTALE"){if(a="stale-short",l=m.error,u<2){logForDebugging(`bg: stale handle for ${e.short}, retrying dispatch (${u+1}/2)`);continue}break}logForDebugging(`bg: socket dispatch fell through (${"code"in m?m.code:"?"}), using file path`)}try{let m=Le({...e,nonce:c});await Rh(i,m,384).catch(async(f)=>{if(!Pn(f))throw f;await oKn.mkdir(s,{recursive:!0,mode:448}),await Rh(i,m,384)})}catch(m){a="dispatch-write",l=Se(m);break}let d=await OT({proto:Cp,op:"await-ack",short:e.short,nonce:c,timeoutMs:5000},{timeoutMs:6000});for(let m=0;!d.ok&&d.code==="ESTARTING"&&m<40;m++)await sleep(200),d=await OT({proto:Cp,op:"await-ack",short:e.short,nonce:c,timeoutMs:5000},{timeoutMs:6000});if(d.ok&&d.op==="await-ack")return KOl(e,d.pid,d.messagingSock,n,d.via);await oKn.unlink(i).catch(()=>{});let p="code"in d?d.code:void 0;if(p==="EALIVE")a="short-alive";else if(p==="ESTALE")a="stale-short";else if(p==="ENOCONN")a="enoconn";else if(p==="ESTARTING")a="estarting";else a="ack-timeout";if(l=p?`${p}: ${"error"in d?d.error:"no ack"}`:("error"in d)?d.error:"no ack",u===2||a!=="stale-short"&&a!=="ack-timeout")break;logForDebugging(`bg: ${a} for ${e.short}, retrying dispatch (${u+1}/2)`)}if(!t&&(a==="enoconn"||a==="estarting"))return fko=!1,await Ako(e,!0,n);return mko(a,l,e.source,n),logForDebugging(`bg: daemon dispatch fallback (${a}): ${l}`,{level:"warn"}),{ok:!1,reason:a,detail:l,nonce:c}}finally{o()}}
function KOl(e,t,n,r,o){return fko=!0,logEvent("tengu_bg_dispatch",{backend_daemon:!0,source_shell:e.source==="shell",source_slash:e.source==="slash",source_fleet:e.source==="fleet",source_spare:e.source==="spare",source_respawn:e.source==="respawn",has_worktree:e.worktree!==void 0,has_agent:e.agent!==void 0,ms:Date.now()-r,via:fromEnumOpt(o)}),{ok:!0,pid:t,messagingSock:n}}
function mko(e,t,n,r){let o=zt(),s=[...t.matchAll(/\bE[A-Z]{2,14}\b/g)].filter((a)=>!"/\\".includes(t[a.index-1]??".")).map((a)=>a[0]),i=s.length>0?s.join(","):/[\\/]/.test(t)?"<path-bearing>":t.slice(0,80);logEvent("tengu_bg_dispatch_fallback",{ms:Date.now()-r,reason_unreachable:e==="daemon-unreachable",reason_ack_timeout:e==="ack-timeout",reason_write:e==="dispatch-write",reason_enoconn:e==="enoconn",reason_estarting:e==="estarting",reason_stale_short:e==="stale-short",reason_short_alive:e==="short-alive",platform_darwin:o==="macos",platform_linux:o==="linux",platform_windows:o==="windows",source_spare:n==="spare",source_respawn:n==="respawn",detail:i})}
var zOl,oKn,YOl,fko=!1,pko=null;
var JOl=b(()=>{Jxo();gue();h8e();sM();rM();Ct();ok();qe();bt();qs();Xt();zOl=require("crypto"),oKn=require("fs/promises"),YOl=require("path")});
export {Ako,KOl,mko,zOl,oKn,YOl,fko,pko,JOl};
