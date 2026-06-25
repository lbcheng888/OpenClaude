// @ts-nocheck
import {Tl,mn} from "../src/telemetry/0600_feature_name.ts";
import {qG,cht,uht} from "../src/session/4612_proto.ts";
import {Yt,Es} from "./m641.ts";
import {rWe,lht,CTe,uN,iJ,Tx,lP,CL} from "./m4609.ts";
import {U1,x0e} from "../src/config/3883_x0e.ts";
import {W2e,Pf} from "../src/agent/2591_level.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {gx,F8e} from "./m4514.ts";
import {isSameProcessAsync,sigtermThenKill,lE} from "./m1461.ts";
import {b} from "../runtime.ts";
var X2l="allow_routines",Q2l="Routines are disabled by your organization's policy.";
async function lPo(){return Tl("daemon_bg_reap_all",async()=>{let e=await qG({silent:!0}),t=new Map;for(let[l,c]of Object.entries(e.workers))t.set(l,{pid:c.pid,procStart:c.procStart,ptySock:c.ptySock});let n=Yt()==="windows",[r,o]=n?[rWe(),".pid"]:[lht(),".sock"],s=await Mne.readdir(r).catch(()=>[]),i=new Set(s.filter((l)=>l.endsWith(o)));for(let l of s){if(!l.endsWith(o)){if(!n){let d=[".err",".late"].find((p)=>l.endsWith(`.sock${p}`));if(d&&!i.has(l.slice(0,-d.length)))await Mne.unlink(iPo.join(r,l)).catch(()=>{})}continue}let c=l.slice(0,-o.length);if(t.has(c))continue;let u=n?Number(await U1(CTe(c),4096)??"0"):0;t.set(c,{pid:u,ptySock:uN(c)})}if(!n){let l=new Set;for(let u of t.values())if(u.ptySock)l.add(u.ptySock);let c=await Mne.readdir(iJ()).catch(()=>[]);for(let u of c){if(!u.endsWith(".pty.sock"))continue;let d=iPo.join(iJ(),u);if(l.has(d))continue;t.set(`spare:${u}`,{pid:0,ptySock:d})}}let a=0;if(await Promise.all(Array.from(t.entries()).map(async([l,c])=>{if(c.ptySock&&await aGe(c.ptySock))a++;else if(c.pid&&await dRm(c.pid,c.procStart))a++;if(!l.startsWith("spare:"))await W2e(l,"stopped","stopped");if(n)await Mne.unlink(CTe(l)).catch(()=>{}),await Mne.unlink(Tx(uN(l))).catch(()=>{}),await Mne.unlink(lP(uN(l))).catch(()=>{})})),t.size>0)await cht((l)=>{for(let c of t.keys())delete l.workers[c]}).catch(Ie);return{reaped:a}})}
function aGe(e){return new Promise((t)=>{let n=!1,r=(s)=>{if(n)return;n=!0,t(s)},o=aPo.connect(e);o.unref(),o.setTimeout(2000,()=>{o.destroy(),r(!1)}),o.on("error",()=>{Mne.unlink(e).catch(()=>{}),Mne.unlink(Tx(e)).catch(()=>{}),Mne.unlink(lP(e)).catch(()=>{}),r(!1)}),o.once("connect",()=>{o.resume(),o.write(gx({t:"kill",sig:"SIGTERM"}))}),o.once("close",()=>r(!0))})}
function WJn(e){return new Promise((t)=>{let n=!1,r=(s)=>{if(n)return;n=!0,t(s)},o=aPo.connect(e);o.unref(),o.setTimeout(250,()=>{o.destroy(),r(!1)}),o.on("error",()=>r(!1)),o.once("connect",()=>{o.end(gx({t:"pong"})),r(!0)})})}
async function dRm(e,t){if(t!==void 0){if(!await isSameProcessAsync(e,t))return!1}else try{return process.kill(e,0),!1}catch{}return sigtermThenKill([-e,e],t)}
var Mne,aPo,iPo;
var MVt=b(()=>{Pf();mn();x0e();lE();vn();Es();CL();F8e();uht();Mne=require("fs/promises"),aPo=require("net"),iPo=require("path")});
export {X2l,Q2l,lPo,aGe,WJn,dRm,Mne,aPo,iPo,MVt};
