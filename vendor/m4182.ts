// @ts-nocheck
import {Qqe,D6} from "../src/agent/5186_bigint.ts";
import {qp,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {jt,ws} from "./m228.ts";
import {_$,fsModule} from "./m2246.ts";
import {AI,Mce} from "./m4173.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {xh,mf} from "./m702.ts";
import {b} from "../runtime.ts";
function h0p(e){try{return Qqe("workflows",e)}catch(t){if(qp(t))return logForDebugging(`loadWorkflowsDir: project-dir walk failed: ${t.code}`,{level:"error"}),[];throw t}}
async function F6a(e,t){let n=jt(),r;try{r=await n.readdir(e)}catch{return[]}return(await Promise.all(r.map(async(s)=>{if(!(s.isFile()||s.isSymbolicLink()))return null;if(!s.name.endsWith(".js"))return null;let i=hdo.join(e,s.name),a;try{a=await n.readFileBytes(i,_$+1)}catch{return null}if(a.byteLength>_$)return logForDebugging(`Workflow ${i} exceeds ${_$} bytes \u2014 skipping`,{level:"warn"}),null;let l=a.toString("utf-8"),c=AI(l);if("error"in c)return logForDebugging(`Workflow ${i} has invalid meta: ${c.error} \u2014 skipping`,{level:"warn"}),null;return{source:t,name:c.meta.name,description:c.meta.description,whenToUse:c.meta.whenToUse,phases:c.meta.phases,script:l,filePath:i}}))).filter((s)=>s!==null)}
async function U6a(e){let t=hdo.join(tr(),"workflows"),n=h0p(e),[r,...o]=await Promise.all([xh("userSettings")?F6a(t,"userSettings"):Promise.resolve([]),...xh("projectSettings")?n.map((i)=>F6a(i,"projectSettings")):[]]),s=new Map;for(let i of r)s.set(i.name,i);for(let i=o.length-1;i>=0;i--)for(let a of o[i])s.set(a.name,a);return[...s.values()].sort((i,a)=>i.name.localeCompare(a.name))}
var hdo;
var $6a=b(()=>{qe();sn();bt();ws();D6();mf();Mce();fsModule();hdo=require("path")});
export {h0p,F6a,U6a,hdo,$6a};
