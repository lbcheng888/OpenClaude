// @ts-nocheck
import {b} from "../runtime.ts";
function v3o(){if(!psr)psr=new Intl.DisplayNames(["en"],{type:"language"});return psr}
function KT(){if(!usr)usr=new Intl.Segmenter(void 0,{granularity:"grapheme"});return usr}
function yyt(e){if(!e)return"";return KT().segment(e)[Symbol.iterator]().next().value?.segment??""}
function jV(e){if(!e)return"";let t="";for(let{segment:n}of KT().segment(e))t=n;return t}
function xLe(e){if(!e)return 0;let t=0;for(let n of KT().segment(e))t++;return t}
function yYt(e){if(!e)return[];return Array.from(KT().segment(e),(t)=>t.segment)}
function w3o(){if(!dsr)dsr=new Intl.Segmenter(void 0,{granularity:"word"});return dsr}
function fsr(e,t){let n=`${e}:${t}`,r=b3o.get(n);if(!r)r=new Intl.RelativeTimeFormat("en",{style:e,numeric:t}),b3o.set(n,r);return r}
function Tyt(){if(!msr)msr=Intl.DateTimeFormat().resolvedOptions().timeZone;return msr}
function R3o(){if(_Yt===null)try{let e=Intl.DateTimeFormat().resolvedOptions().locale;_Yt=new Intl.Locale(e).language}catch{_Yt=void 0}return _Yt}
function nyc(e){if(!e)return"";let t=E3o.get(e);if(t!==void 0)return t;let n=Object.entries(e).sort(([o],[s])=>o<s?-1:o>s?1:0),r="";for(let[o,s]of n)r+=`${o}=${String(s)};`;return E3o.set(e,r),r}
function TYt(e,t){let n=`${e??""}|${nyc(t)}`,r=C3o.get(n);if(!r)r=new Intl.DateTimeFormat(e,t),C3o.set(n,r);return r}
var usr=null,dsr=null,psr=null,b3o,msr=null,_Yt=null,E3o,C3o;
var KI=b(()=>{b3o=new Map;E3o=new WeakMap;C3o=new Map});
export {v3o,KT,yyt,jV,xLe,yYt,w3o,fsr,Tyt,R3o,nyc,TYt,usr,dsr,psr,b3o,msr,_Yt,E3o,C3o,KI};
