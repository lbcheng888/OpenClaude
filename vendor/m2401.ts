// @ts-nocheck
import {$Ci,qCi} from "./m2400.ts";
import {b} from "../runtime.ts";
function cad(){if(n$r===void 0)n$r=typeof process.env.WT_SESSION==="string"||process.env.TERM_PROGRAM==="vscode";return n$r}
function uad(){if(!t$r)t$r=$Ci();return t$r}
function jCi(e){if(!cad()||e.length===0)return e;let t=e.map((l)=>l.value.replace(/[\u061C\u202A-\u202E\u2066-\u2069]/g,"\uFFFD")).join("");if(!fad(t))return e;let n=uad(),{levels:r}=n.getEmbeddingLevels(t,"auto"),o=[],s=0;for(let l=0;l<e.length;l++)o.push(r[s]),s+=e[l].value.length;let i=[...e],a=Math.max(...o);for(let l=a;l>=1;l--){let c=0;while(c<i.length)if(o[c]>=l){let u=c+1;while(u<i.length&&o[u]>=l)u++;dad(i,c,u-1),pad(o,c,u-1),c=u}else c++}return i}
function dad(e,t,n){while(t<n){let r=e[t];e[t]=e[n],e[n]=r,t++,n--}}
function pad(e,t,n){while(t<n){let r=e[t];e[t]=e[n],e[n]=r,t++,n--}}
function fad(e){return mad.test(e)}
var t$r,n$r,mad;
var WCi=b(()=>{qCi();mad=/[\u0590-\u05FF\uFB1D-\uFB4F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0780-\u07BF\u0700-\u074F]/u});
export {cad,uad,jCi,dad,pad,fad,t$r,n$r,mad,WCi};
