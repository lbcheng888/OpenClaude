// @ts-nocheck
import {OEo,xGn,N5t,qll,DDe} from "../src/config/4456_path.ts";
import {rYe,bk} from "../src/agent/0731_level.ts";
import {qt,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {tP,dS} from "../src/config/4460_source.ts";
import {b} from "../runtime.ts";
async function zYm(){try{let e=await r9o.readFile(OEo(),"utf-8"),t=rYe().safeParse(qt(e));if(!t.success)return logForDebugging(`Invalid known_marketplaces.json in zip cache: ${t.error.message}`,{level:"error"}),{};return t.data}catch{return{}}}
async function jYm(e){await xGn(OEo(),TeamDeleteToolName(e,null,2))}
async function YYm(e,t){let n=N5t();if(!n)return;let r=await JYm(t);if(r!==null){let o=qll(e);await xGn(Orr.join(n,o),r)}}
async function JYm(e){let t=[Orr.join(e,".claude-plugin","marketplace.json"),Orr.join(e,"marketplace.json"),e];for(let n of t)try{return await r9o.readFile(n,"utf-8")}catch{}return null}
async function Ayc(){let e=await tP();for(let[r,o]of Object.entries(e)){if(!o.installLocation)continue;try{await YYm(r,o.installLocation)}catch(s){logForDebugging(`Failed to save marketplace JSON for ${r}: ${s}`)}}let n={...await zYm(),...e};await jYm(n)}
var r9o,Orr;
var Ryc=b(()=>{qe();tn();dS();bk();DDe();r9o=require("fs/promises"),Orr=require("path")});
export {zYm,jYm,YYm,JYm,Ayc,r9o,Orr,Ryc};
