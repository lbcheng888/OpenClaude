// @ts-nocheck
import {e0i,t0i} from "./m2410.ts";
import {b} from "../runtime.ts";
function O_d(){if(Pqr===void 0)Pqr=typeof process.env.WT_SESSION==="string"||process.env.TERM_PROGRAM==="vscode";return Pqr}
function L_d(){if(!Dqr)Dqr=e0i();return Dqr}
function n0i(e){if(!O_d()||e.length===0)return e;let t=e.map((l)=>l.value.replace(/[\u061C\u202A-\u202E\u2066-\u2069]/g,"\uFFFD")).join("");if(!B_d(t))return e;let n=L_d(),{levels:r}=n.getEmbeddingLevels(t,"auto"),o=[],s=0;for(let l=0;l<e.length;l++)o.push(r[s]),s+=e[l].value.length;let i=[...e],a=Math.max(...o);for(let l=a;l>=1;l--){let c=0;while(c<i.length)if(o[c]>=l){let u=c+1;while(u<i.length&&o[u]>=l)u++;M_d(i,c,u-1),N_d(o,c,u-1),c=u}else c++}return i}
function M_d(e,t,n){while(t<n){let r=e[t];e[t]=e[n],e[n]=r,t++,n--}}
function N_d(e,t,n){while(t<n){let r=e[t];e[t]=e[n],e[n]=r,t++,n--}}
function B_d(e){return F_d.test(e)}
var Dqr,Pqr,F_d;
var r0i=b(()=>{t0i();F_d=/[\u0590-\u05FF\uFB1D-\uFB4F\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0780-\u07BF\u0700-\u074F]/u});
export {O_d,L_d,n0i,M_d,N_d,B_d,Dqr,Pqr,F_d,r0i};
