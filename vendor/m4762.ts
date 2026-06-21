// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {ci,pT} from "./m1289.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {ra,Ap} from "../src/config/0614_Ap.ts";
import {externalHttp,ek} from "../src/core/0570_isCancel.ts";
import {Di,dr} from "./m231.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {_o,bt} from "./m195.ts";
import {cE,b0} from "./m2206.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b,M} from "../runtime.ts";
import {O4} from "./m2337.ts";
function SEo(){return Ojt.join(tr(),"cache","changelog.md")}
async function Cgl(){let e=getGlobalConfig();if(!e.cachedChangelog)return;let t=SEo();try{await ci().mkdir(Ojt.dirname(t)),await ci().writeExclusive(t,e.cachedChangelog)}catch{}saveGlobalConfig(({cachedChangelog:n,...r})=>r)}
async function bEo(){if(getIsNonInteractiveSession())return;if(ra())return;let e=DZp,t=await externalHttp.get(e);if(t.status===200){let n=t.data;if(n===Gje)return;let r=SEo();await ci().mkdir(Ojt.dirname(r)),await ci().write(r,n),Gje=n;let o=Date.now();saveGlobalConfig((s)=>({...s,changelogLastFetched:o}))}}
async function Ljt(){if(Gje!==null)return Gje;let e=SEo();try{let t=await ci().read(e);return Gje=t,t}catch{return Gje="",""}}
function UWn(){return Gje??""}
function Mjt(e){try{if(!e)return{};let t={},n=e.split(/^## /gm).slice(1);for(let r of n){let o=r.trim().split(`
`);if(o.length===0)continue;let s=o[0];if(!s)continue;let i=Di(s," - ").trim();if(!i)continue;let a=o.slice(1).filter((l)=>l.trim().startsWith("- ")).map((l)=>l.trim().substring(2).trim()).filter(Boolean);if(a.length>0)t[i]=a}return t}catch(t){return De(_o(t)),{}}}
function vgl(e,t,n=UWn()){try{let r=Mjt(n),o=FWn.coerce(e),s=t?FWn.coerce(t):null;if(!s||o&&cE(o.version,s.version))return Object.entries(r).filter(([i])=>!s||cE(i,s.version)).sort(([i],[a])=>cE(i,a)?-1:1).flatMap(([i,a])=>a).filter(Boolean).slice(0,IZp)}catch(r){return De(_o(r)),[]}return[]}
function $Wn(e=UWn()){try{let t=Mjt(e);return Object.keys(t).sort((r,o)=>cE(r,o)?1:-1).map((r)=>{let o=t[r];if(!o||o.length===0)return null;let s=o.filter(Boolean);if(s.length===0)return null;return[r,s]}).filter((r)=>r!==null)}catch(t){return De(_o(t)),[]}}
async function wgl(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION){let n=await Ljt();if(e!==t||!n||PZp(n,t))bEo().catch((s)=>logForDebugging(`Failed to fetch changelog: ${_o(s).message}`,{level:"error"}));let r=vgl(t,e,n);return{hasReleaseNotes:r.length>0,releaseNotes:r}}
function Rgl(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION){let n=vgl(t,e);return{hasReleaseNotes:n.length>0,releaseNotes:n}}
function PZp(e,t){let n=FWn.coerce(t);if(!n)return!1;return!Object.keys(Mjt(e)).some((o)=>{try{return b0(o,n.version)}catch{return!1}})}
var Ojt,FWn,IZp=5,Egl="https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",DZp="https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md",Gje=null;
var Vje=b(()=>{lt();ek();pT();Qn();qe();sn();bt();Rn();Ap();dr();Ojt=require("path"),FWn=M(O4(),1)});
export {SEo,Cgl,bEo,Ljt,UWn,Mjt,vgl,$Wn,wgl,Rgl,PZp,Ojt,FWn,IZp,Egl,DZp,Gje,Vje};
