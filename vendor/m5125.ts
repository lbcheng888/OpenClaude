// @ts-nocheck
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {vG,rmt,omt} from "../src/session/4584_proto.ts";
import {zt,qs} from "./m635.ts";
import {Hje,nmt,eye,$N,SJ,iD,WP,sM} from "./m4581.ts";
import {wN,$He} from "./m3864.ts";
import {jUe,mg} from "../src/agent/2580_level.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {FP,dje} from "./m4492.ts";
import {isSameProcessAsync,sigtermThenKill,rE} from "./m1456.ts";
import {b} from "../runtime.ts";
var SOl="allow_routines",bOl="Routines are disabled by your organization's policy.";
async function tko(){return Ul("daemon_bg_reap_all",async()=>{let e=await vG({silent:!0}),t=new Map;for(let[l,c]of Object.entries(e.workers))t.set(l,{pid:c.pid,procStart:c.procStart,ptySock:c.ptySock});let n=zt()==="windows",[r,o]=n?[Hje(),".pid"]:[nmt(),".sock"],s=await $ne.readdir(r).catch(()=>[]),i=new Set(s.filter((l)=>l.endsWith(o)));for(let l of s){if(!l.endsWith(o)){if(!n){let d=[".err",".late"].find((p)=>l.endsWith(`.sock${p}`));if(d&&!i.has(l.slice(0,-d.length)))await $ne.unlink(Zxo.join(r,l)).catch(()=>{})}continue}let c=l.slice(0,-o.length);if(t.has(c))continue;let u=n?Number(await wN(eye(c),4096)??"0"):0;t.set(c,{pid:u,ptySock:$N(c)})}if(!n){let l=new Set;for(let u of t.values())if(u.ptySock)l.add(u.ptySock);let c=await $ne.readdir(SJ()).catch(()=>[]);for(let u of c){if(!u.endsWith(".pty.sock"))continue;let d=Zxo.join(SJ(),u);if(l.has(d))continue;t.set(`spare:${u}`,{pid:0,ptySock:d})}}let a=0;if(await Promise.all(Array.from(t.entries()).map(async([l,c])=>{if(c.ptySock&&await g8e(c.ptySock))a++;else if(c.pid&&await ehm(c.pid,c.procStart))a++;if(!l.startsWith("spare:"))await jUe(l,"stopped","stopped");if(n)await $ne.unlink(eye(l)).catch(()=>{}),await $ne.unlink(iD($N(l))).catch(()=>{}),await $ne.unlink(WP($N(l))).catch(()=>{})})),t.size>0)await rmt((l)=>{for(let c of t.keys())delete l.workers[c]}).catch(De);return{reaped:a}})}
function g8e(e){return new Promise((t)=>{let n=!1,r=(s)=>{if(n)return;n=!0,t(s)},o=eko.connect(e);o.unref(),o.setTimeout(2000,()=>{o.destroy(),r(!1)}),o.on("error",()=>{$ne.unlink(e).catch(()=>{}),$ne.unlink(iD(e)).catch(()=>{}),$ne.unlink(WP(e)).catch(()=>{}),r(!1)}),o.once("connect",()=>{o.resume(),o.write(FP({t:"kill",sig:"SIGTERM"}))}),o.once("close",()=>r(!0))})}
function J7n(e){return new Promise((t)=>{let n=!1,r=(s)=>{if(n)return;n=!0,t(s)},o=eko.connect(e);o.unref(),o.setTimeout(250,()=>{o.destroy(),r(!1)}),o.on("error",()=>r(!1)),o.once("connect",()=>{o.destroy(),r(!0)})})}
async function ehm(e,t){if(t!==void 0){if(!await isSameProcessAsync(e,t))return!1}else try{return process.kill(e,0),!1}catch{}return sigtermThenKill([-e,e],t)}
var $ne,eko,Zxo;
var m5t=b(()=>{mg();ln();$He();rE();Rn();qs();sM();dje();omt();$ne=require("fs/promises"),eko=require("net"),Zxo=require("path")});
export {SOl,bOl,tko,g8e,J7n,ehm,$ne,eko,Zxo,m5t};
