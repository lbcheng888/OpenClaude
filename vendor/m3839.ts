// @ts-nocheck
import {ijr} from "../src/core/2809_toInfraSessionId.ts";
import {sn,mc} from "./m237.ts";
import {$T,p0} from "./m236.ts";
import {b} from "../runtime.ts";
import {Xo} from "./m240.ts";
function S0e(){let e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}
function V$t(e,t){return`${ijr(void 0,t)}/code?environment=${e}`}
function zMa(e,t){let n=t+20;return t+10-e%n}
function f2n(e,t){let n=sn(e),r=t-1,o=t+1;if(r>=n||o<0)return{before:e,shimmer:"",after:""};let s=Math.max(0,r),i=0,a="",l="",c="";for(let{segment:u}of $T().segment(e)){let d=sn(u);if(i+d<=s)a+=u;else if(i>o)c+=u;else l+=u;i+=d}return{before:a,shimmer:l,after:c}}
function h2n({error:e,connected:t,sessionActive:n,reconnecting:r}){if(e)return{label:"/rc failed",color:"error"};if(r)return{label:"/rc reconnecting",color:"warning"};if(n||t)return{label:"/rc active",color:"success"};return{label:"/rc connecting\u2026",color:"warning"}}
function g2n(e){return`Code anywhere with the Claude mobile app or ${e}`}
function _2n(e){return`Continue coding in the Claude mobile app or ${e}`}
function JMa(e,t){return`\x1B]8;;${t}\x07${e}\x1B]8;;\x07`}
var VMa=30000,Dq="bridge-failed",Qct="disabled after repeated failures \xB7 restart to retry",KMa=150,jMa="Run /remote-control to retry",YMa="Re-run `claude remote-control` to try again";
var ate=b(()=>{mc();Xo();p0()});
export {S0e,V$t,zMa,f2n,h2n,g2n,_2n,JMa,VMa,Dq,Qct,KMa,jMa,YMa,ate};
