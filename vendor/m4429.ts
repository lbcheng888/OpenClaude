// @ts-nocheck
import {Rh,ok} from "./m633.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {ownProcStartAsync,isProcessRunning,isSameProcessAsync,rE} from "./m1456.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {rx,J1} from "../src/config/2678_withFileTypes.ts";
import {ds,bt} from "./m195.ts";
import {Fa,Pd} from "./m701.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
async function Q4p(){await Promise.all(Array.from(Dgo).map((e)=>hG.rm(e,{force:!0}).catch(()=>{}))),Dgo.clear()}
async function $tl(e){let t=hpt.join(e,gpt),n=hpt.join(t,String(process.pid));try{await hG.mkdir(t,{recursive:!0}),await Rh(n,Le({pid:process.pid,procStart:await ownProcStartAsync()}))}catch(r){logForDebugging(`Failed to write ${gpt} marker: ${e}: ${r}`);return}Dgo.add(n),X4p??=Gi(Q4p)}
async function qtl(e){if(e.length===0)return;let t=hpt.join(rx(),Utl);try{let r=await hG.stat(t);if(Date.now()-r.mtimeMs<Z4p)return}catch{}let n=await Promise.allSettled(e.map((r)=>lqt(r)));for(let[r,o]of n.entries())if(o.status==="rejected")logForDebugging(`Failed to sweep ${gpt}: ${e[r]}: ${o.reason}`);try{await hG.writeFile(t,new Date().toISOString(),"utf-8")}catch(r){logForDebugging(`Failed to stamp ${Utl}: ${r}`)}}
async function lqt(e,t){let n=hpt.join(e,gpt),r;try{r=await hG.readdir(n)}catch(s){if(ds(s))return!1;throw s}let o=!1;for(let s of r){if(s.includes(".tmp.")){o=!0;continue}let i=hpt.join(n,s),a;try{a=await hG.readFile(i,"utf-8")}catch{}if(a===""){o=!0;continue}let l=J4p().safeParse(Fa(a,!1));if(t?.excludeSelf&&l.success&&l.data.pid===process.pid)continue;if(l.success&&(l.data.pid===1||isProcessRunning(l.data.pid))&&await isSameProcessAsync(l.data.pid,l.data.procStart)){o=!0;continue}await hG.rm(i,{force:!0})}return o}
var hG,hpt,gpt=".in_use",J4p,Dgo,X4p,Utl=".last_inuse_sweep",Z4p=86400000;
var Pgo=b(()=>{iv();ok();ReactHooks();qe();bt();rE();Pd();Xt();J1();hG=require("fs/promises"),hpt=require("path"),J4p=we(()=>hn.object({pid:hn.number(),procStart:hn.string().optional()})),Dgo=new Set});
export {Q4p,$tl,qtl,lqt,hG,hpt,gpt,J4p,Dgo,X4p,Utl,Z4p,Pgo};
