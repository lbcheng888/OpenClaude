// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
function pPd(e){return Math.max(0,Math.floor((Date.now()-e)/86400000))}
function vVr(e){let t=pPd(e);if(t<=1)return"";return`This memory is ${t} days old. `+"Memories are point-in-time observations, not live state \u2014 "+"claims about code behavior or file:line citations may be outdated. Verify against current code before asserting as fact."}
function A9i(e){let t=vVr(e);if(!t)return"";return`<system-reminder>${t}</system-reminder>
`}
function Irt(){let e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}
function R9i(){return new Date().toLocaleString("en-US",{month:"long",year:"numeric"})}
var ike;
var v$e=b(()=>{Wi();ike=Hn(Irt)});
export {pPd,vVr,A9i,Irt,R9i,ike,v$e};
