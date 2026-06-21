// @ts-nocheck
import {rx,J1} from "../src/config/2678_withFileTypes.ts";
import {tae,oee} from "../src/config/2670_cause.ts";
import {b} from "../runtime.ts";
function BTp(){return{cachedExclusions:null}}
async function Jlt(e){let t=iLa,n=uU.normalize(uU.join(rx(),"cache"));if(e&&!FTp(e,n))return[];if(t.cachedExclusions!==null)return t.cachedExclusions;try{let r=await tae(["--files","--hidden","--no-ignore","--max-depth","4","--glob",NTp],n,new AbortController().signal);return t.cachedExclusions=r.map((o)=>{let s=uU.dirname(o);return`!**/${(uU.isAbsolute(s)?uU.relative(n,s):s).replaceAll("\\","/")}/**`}),t.cachedExclusions}catch{return t.cachedExclusions=[],t.cachedExclusions}}
function aLa(){iLa.cachedExclusions=null}
function FTp(e,t){let n=sLa(e),r=sLa(t);return n===r||n===uU.sep||r===uU.sep||n.startsWith(r+uU.sep)||r.startsWith(n+uU.sep)}
function sLa(e){return uU.normalize(e)}
var uU,NTp=".orphaned_at",iLa;
var L2t=b(()=>{oee();J1();uU=require("path");iLa=BTp()});
export {BTp,Jlt,aLa,FTp,sLa,uU,NTp,iLa,L2t};
