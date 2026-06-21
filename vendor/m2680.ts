// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function LEd(e){return Math.max(0,Math.floor((Date.now()-e)/86400000))}
function J6r(e){let t=LEd(e);if(t<=1)return"";return`This memory is ${t} days old. `+"Memories are point-in-time observations, not live state \u2014 "+"claims about code behavior or file:line citations may be outdated. Verify against current code before asserting as fact."}
function F1i(e){let t=J6r(e);if(!t)return"";return`<system-reminder>${t}</system-reminder>
`}
function Rtt(){let e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}
function U1i(){return new Date().toLocaleString("en-US",{month:"long",year:"numeric"})}
var bRe;
var T2e=b(()=>{ta();bRe=wn(Rtt)});
export {LEd,J6r,F1i,Rtt,U1i,bRe,T2e};
