// @ts-nocheck
import {wWr} from "../src/core/2797_toInfraSessionId.ts";
import {tn,Hc} from "./m235.ts";
import {KT,KI} from "./m234.ts";
import {b} from "../runtime.ts";
import {ps} from "./m238.ts";
function DHe(){let e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}
function hUt(e,t){return`${wWr(void 0,t)}/code?environment=${e}`}
function EHa(e,t){let n=t+20;return t+10-e%n}
function TBn(e,t){let n=tn(e),r=t-1,o=t+1;if(r>=n||o<0)return{before:e,shimmer:"",after:""};let s=Math.max(0,r),i=0,a="",l="",c="";for(let{segment:u}of KT().segment(e)){let d=tn(u);if(i+d<=s)a+=u;else if(i>o)c+=u;else l+=u;i+=d}return{before:a,shimmer:l,after:c}}
function SBn({error:e,connected:t,sessionActive:n,reconnecting:r}){if(e)return{label:"/rc failed",color:"error"};if(r)return{label:"/rc reconnecting",color:"warning"};if(n||t)return{label:"/rc active",color:"success"};return{label:"/rc connecting\u2026",color:"warning"}}
function bBn(e){return`Code anywhere with the Claude mobile app or ${e}`}
function EBn(e){return`Continue coding in the Claude mobile app or ${e}`}
function wHa(e,t){return`\x1B]8;;${t}\x07${e}\x1B]8;;\x07`}
var SHa=30000,g6="bridge-failed",Qat="disabled after repeated failures \xB7 restart to retry",bHa=150,CHa="Run /remote-control to retry",vHa="Re-run `claude remote-control` to try again";
var mte=b(()=>{Hc();ps();KI()});
export {DHe,hUt,EHa,TBn,SBn,bBn,EBn,wHa,SHa,g6,Qat,bHa,CHa,vHa,mte};
