// @ts-nocheck
import {Ugo,djn,dqt,nnl,M0e} from "../src/config/4434_path.ts";
import {sKe,ik} from "../src/agent/0726_level.ts";
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {NP,hS} from "../src/config/4438_source.ts";
import {b} from "../runtime.ts";
async function U4m(){try{let e=await mNo.readFile(Ugo(),"utf-8"),t=sKe().safeParse(qt(e));if(!t.success)return logForDebugging(`Invalid known_marketplaces.json in zip cache: ${t.error.message}`,{level:"error"}),{};return t.data}catch{return{}}}
async function $4m(e){await djn(Ugo(),Le(e,null,2))}
async function q4m(e,t){let n=dqt();if(!n)return;let r=await j4m(t);if(r!==null){let o=nnl(e);await djn(AZn.join(n,o),r)}}
async function j4m(e){let t=[AZn.join(e,".claude-plugin","marketplace.json"),AZn.join(e,"marketplace.json"),e];for(let n of t)try{return await mNo.readFile(n,"utf-8")}catch{}return null}
async function Alc(){let e=await NP();for(let[r,o]of Object.entries(e)){if(!o.installLocation)continue;try{await q4m(r,o.installLocation)}catch(s){logForDebugging(`Failed to save marketplace JSON for ${r}: ${s}`)}}let n={...await U4m(),...e};await $4m(n)}
var mNo,AZn;
var hlc=b(()=>{qe();Xt();hS();ik();M0e();mNo=require("fs/promises"),AZn=require("path")});
export {U4m,$4m,q4m,j4m,Alc,mNo,AZn,hlc};
