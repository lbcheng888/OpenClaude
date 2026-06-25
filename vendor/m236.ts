// @ts-nocheck
import {b} from "../runtime.ts";
function SWo(){if(!Ucr)Ucr=new Intl.DisplayNames(["en"],{type:"language"});return Ucr}
function $T(){if(!Fcr)Fcr=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Fcr}
function Kbt(e){if(!e)return"";return $T().segment(e)[Symbol.iterator]().next().value?.segment??""}
function fK(e){if(!e)return"";let t="";for(let{segment:n}of $T().segment(e))t=n;return t}
function bMe(e){if(!e)return 0;let t=0;for(let n of $T().segment(e))t++;return t}
function QXt(e){if(!e)return[];return Array.from($T().segment(e),(t)=>t.segment)}
function bWo(){if(!Bcr)Bcr=new Intl.Segmenter(void 0,{granularity:"word"});return Bcr}
function qcr(e,t){let n=`${e}:${t}`,r=_Wo.get(n);if(!r)r=new Intl.RelativeTimeFormat("en",{style:e,numeric:t}),_Wo.set(n,r);return r}
function zbt(){if(!$cr)$cr=Intl.DateTimeFormat().resolvedOptions().timeZone;return $cr}
function EWo(){if(XXt===null)try{let e=Intl.DateTimeFormat().resolvedOptions().locale;XXt=new Intl.Locale(e).language}catch{XXt=void 0}return XXt}
function iHc(e){if(!e)return"";let t=yWo.get(e);if(t!==void 0)return t;let n=Object.entries(e).sort(([o],[s])=>o<s?-1:o>s?1:0),r="";for(let[o,s]of n)r+=`${o}=${String(s)};`;return yWo.set(e,r),r}
function ZXt(e,t){let n=`${e??""}|${iHc(t)}`,r=TWo.get(n);if(!r)r=new Intl.DateTimeFormat(e,t),TWo.set(n,r);return r}
var Fcr=null,Bcr=null,Ucr=null,_Wo,$cr=null,XXt=null,yWo,TWo;
var p0=b(()=>{_Wo=new Map;yWo=new WeakMap;TWo=new Map});
export {SWo,$T,Kbt,fK,bMe,QXt,bWo,qcr,zbt,EWo,iHc,ZXt,Fcr,Bcr,Ucr,_Wo,$cr,XXt,yWo,TWo,p0};
