// @ts-nocheck
import {vf,Pv} from "./m639.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {ownProcStartAsync,isProcessRunning,isSameProcessAsync,lE} from "./m1461.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Si,ud} from "./m134.ts";
import {hw,a1} from "../src/config/2689_withFileTypes.ts";
import {Jo,Ct} from "./m197.ts";
import {ba,pd} from "./m706.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
async function L7p(){await Promise.all(Array.from(vEo).map((e)=>PG.rm(e,{force:!0}).catch(()=>{}))),vEo.clear()}
async function wll(e){let t=gft.join(e,_ft),n=gft.join(t,String(process.pid));try{await PG.mkdir(t,{recursive:!0}),await vf(n,TeamDeleteToolName({pid:process.pid,procStart:await ownProcStartAsync()}))}catch(r){logForDebugging(`Failed to write ${_ft} marker: ${e}: ${r}`);return}vEo.add(n),O7p??=Si(L7p)}
async function kll(e){if(e.length===0)return;let t=gft.join(hw(),vll);try{let r=await PG.stat(t);if(Date.now()-r.mtimeMs<M7p)return}catch{}let n=await Promise.allSettled(e.map((r)=>O5t(r)));for(let[r,o]of n.entries())if(o.status==="rejected")logForDebugging(`Failed to sweep ${_ft}: ${e[r]}: ${o.reason}`);try{await PG.writeFile(t,new Date().toISOString(),"utf-8")}catch(r){logForDebugging(`Failed to stamp ${vll}: ${r}`)}}
async function O5t(e,t){let n=gft.join(e,_ft),r;try{r=await PG.readdir(n)}catch(s){if(Jo(s))return!1;throw s}let o=!1;for(let s of r){if(s.includes(".tmp.")){o=!0;continue}let i=gft.join(n,s),a;try{a=await PG.readFile(i,"utf-8")}catch{}if(a===""){o=!0;continue}let l=P7p().safeParse(ba(a,!1));if(t?.excludeSelf&&l.success&&l.data.pid===process.pid)continue;if(l.success&&(l.data.pid===1||isProcessRunning(l.data.pid))&&await isSameProcessAsync(l.data.pid,l.data.procStart)){o=!0;continue}await PG.rm(i,{force:!0})}return o}
var PG,gft,_ft=".in_use",P7p,vEo,O7p,vll=".last_inuse_sweep",M7p=86400000;
var wEo=b(()=>{MS();Pv();ud();qe();Ct();lE();pd();tn();a1();PG=require("fs/promises"),gft=require("path"),P7p=ve(()=>jt.object({pid:jt.number(),procStart:jt.string().optional()})),vEo=new Set});
export {L7p,wll,kll,O5t,PG,gft,_ft,P7p,vEo,O7p,vll,M7p,wEo};
