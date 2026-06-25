// @ts-nocheck
import {hw,a1} from "../src/config/2689_withFileTypes.ts";
import {Qie,tee} from "../src/config/2681_cause.ts";
import {b} from "../runtime.ts";
function nHp(){return{cachedExclusions:null}}
async function Qut(e){let t=kUa,n=PB.normalize(PB.join(hw(),"cache"));if(e&&!rHp(e,n))return[];if(t.cachedExclusions!==null)return t.cachedExclusions;try{let r=await Qie(["--files","--hidden","--no-ignore","--max-depth","4","--glob",tHp],n,new AbortController().signal);return t.cachedExclusions=r.map((o)=>{let s=PB.dirname(o);return`!**/${(PB.isAbsolute(s)?PB.relative(n,s):s).replaceAll("\\","/")}/**`}),t.cachedExclusions}catch{return t.cachedExclusions=[],t.cachedExclusions}}
function HUa(){kUa.cachedExclusions=null}
function rHp(e,t){let n=wUa(e),r=wUa(t);return n===r||n===PB.sep||r===PB.sep||n.startsWith(r+PB.sep)||r.startsWith(n+PB.sep)}
function wUa(e){return PB.normalize(e)}
var PB,tHp=".orphaned_at",kUa;
var r3t=b(()=>{tee();a1();PB=require("path");kUa=nHp()});
export {nHp,Qut,HUa,rHp,wUa,PB,tHp,kUa,r3t};
