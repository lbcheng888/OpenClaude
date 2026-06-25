// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Js,rT} from "./m1294.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {Vi,$d} from "../src/config/0620_$d.ts";
import {externalHttp,_k} from "../src/core/0576_isCancel.ts";
import {mi,lr} from "./m233.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {mo,Ct} from "./m197.ts";
import {fE,U0} from "./m2214.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b,x} from "../runtime.ts";
import {t4} from "./m2347.ts";
function Bko(){return QWt.join(or(),"cache","changelog.md")}
async function bRl(){let e=getGlobalConfig();if(!e.cachedChangelog)return;let t=Bko();try{await Js().mkdir(QWt.dirname(t)),await Js().writeExclusive(t,e.cachedChangelog)}catch{}saveGlobalConfig(({cachedChangelog:n,...r})=>r)}
async function Uko(){if(getIsNonInteractiveSession())return;if(Vi())return;let e=Vlm,t=await externalHttp.get(e);if(t.status===200){let n=t.data;if(n===EWe)return;let r=Bko();await Js().mkdir(QWt.dirname(r)),await Js().write(r,n),EWe=n;let o=Date.now();saveGlobalConfig((s)=>({...s,changelogLastFetched:o}))}}
async function ZWt(){if(EWe!==null)return EWe;let e=Bko();try{let t=await Js().read(e);return EWe=t,t}catch{return EWe="",""}}
function vzn(){return EWe??""}
function eGt(e){try{if(!e)return{};let t={},n=e.split(/^## /gm).slice(1);for(let r of n){let o=r.trim().split(`
`);if(o.length===0)continue;let s=o[0];if(!s)continue;let i=mi(s," - ").trim();if(!i)continue;let a=o.slice(1).filter((l)=>l.trim().startsWith("- ")).map((l)=>l.trim().substring(2).trim()).filter(Boolean);if(a.length>0)t[i]=a}return t}catch(t){return Ie(mo(t)),{}}}
function ERl(e,t,n=vzn()){try{let r=eGt(n),o=Rzn.coerce(e),s=t?Rzn.coerce(t):null;if(!s||o&&fE(o.version,s.version))return Object.entries(r).filter(([i])=>!s||fE(i,s.version)).sort(([i],[a])=>fE(i,a)?-1:1).flatMap(([i,a])=>a).filter(Boolean).slice(0,Glm)}catch(r){return Ie(mo(r)),[]}return[]}
function wzn(e=vzn()){try{let t=eGt(e);return Object.keys(t).sort((r,o)=>fE(r,o)?1:-1).map((r)=>{let o=t[r];if(!o||o.length===0)return null;let s=o.filter(Boolean);if(s.length===0)return null;return[r,s]}).filter((r)=>r!==null)}catch(t){return Ie(mo(t)),[]}}
async function CRl(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION){let n=await ZWt();if(e!==t||!n||Klm(n,t))Uko().catch((s)=>logForDebugging(`Failed to fetch changelog: ${mo(s).message}`,{level:"error"}));let r=ERl(t,e,n);return{hasReleaseNotes:r.length>0,releaseNotes:r}}
function ARl(e,t={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION){let n=ERl(t,e);return{hasReleaseNotes:n.length>0,releaseNotes:n}}
function Klm(e,t){let n=Rzn.coerce(t);if(!n)return!1;return!Object.keys(eGt(e)).some((o)=>{try{return U0(o,n.version)}catch{return!1}})}
var QWt,Rzn,Glm=5,SRl="https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",Vlm="https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md",EWe=null;
var CWe=b(()=>{lt();_k();rT();tr();qe();dn();Ct();vn();$d();lr();QWt=require("path"),Rzn=x(t4(),1)});
export {Bko,bRl,Uko,ZWt,vzn,eGt,ERl,wzn,CRl,ARl,Klm,QWt,Rzn,Glm,SRl,Vlm,EWe,CWe};
