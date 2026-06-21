// @ts-nocheck
import {jt,ws} from "./m228.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function _pt(e,t,n={}){let r=jt(),o=n.logLabel??"plugin",s=0,i=!1;async function a(l,c){if(c.length>=jtl){logForDebugging(`Skipping ${o} directory beyond depth ${jtl}: ${l}`,{level:"error"});return}if(++s>Wtl){if(!i)i=!0,logForDebugging(`Stopping ${o} scan after ${Wtl} directories (root=${e})`,{level:"error"});return}try{let u=await r.readdir(l);if(n.stopAtSkillDir&&u.some((d)=>d.isFile()&&eqp.test(d.name))){await Promise.all(u.map((d)=>d.isFile()&&d.name.toLowerCase().endsWith(".md")?t(Ogo.join(l,d.name),c):void 0));return}await Promise.all(u.map((d)=>{let p=Ogo.join(l,d.name);if(d.isDirectory())return a(p,[...c,d.name]);if(d.isFile()&&d.name.toLowerCase().endsWith(".md"))return t(p,c);return}))}catch(u){logForDebugging(`Failed to scan ${o} directory ${l}: ${u}`,{level:"error"})}}await a(e,[])}
var Ogo,eqp,jtl=32,Wtl=4096;
var ljn=b(()=>{qe();ws();Ogo=require("path"),eqp=/^skill\.md$/i});
export {_pt,Ogo,eqp,jtl,Wtl,ljn};
