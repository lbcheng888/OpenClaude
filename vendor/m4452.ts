// @ts-nocheck
import {Wt,ps} from "./m230.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function yft(e,t,n={}){let r=Wt(),o=n.logLabel??"plugin",s=0,i=!1;async function a(l,c){if(c.length>=Hll){logForDebugging(`Skipping ${o} directory beyond depth ${Hll}: ${l}`,{level:"error"});return}if(++s>Ill){if(!i)i=!0,logForDebugging(`Stopping ${o} scan after ${Ill} directories (root=${e})`,{level:"error"});return}try{let u=await r.readdir(l);if(n.stopAtSkillDir&&u.some((d)=>d.isFile()&&N7p.test(d.name))){await Promise.all(u.map((d)=>d.isFile()&&d.name.toLowerCase().endsWith(".md")?t(kEo.join(l,d.name),c):void 0));return}await Promise.all(u.map((d)=>{let p=kEo.join(l,d.name);if(d.isDirectory())return a(p,[...c,d.name]);if(d.isFile()&&d.name.toLowerCase().endsWith(".md"))return t(p,c);return}))}catch(u){logForDebugging(`Failed to scan ${o} directory ${l}: ${u}`,{level:"error"})}}await a(e,[])}
var kEo,N7p,Hll=32,Ill=4096;
var kGn=b(()=>{qe();ps();kEo=require("path"),N7p=/^skill\.md$/i});
export {yft,kEo,N7p,Hll,Ill,kGn};
