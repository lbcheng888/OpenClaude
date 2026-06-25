// @ts-nocheck
import {S5e,Xq} from "../src/agent/5220_bigint.ts";
import {sp,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Wt,ps} from "./m230.ts";
import {$2,oz} from "./m2254.ts";
import {Bw,Nte} from "./m4186.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {xh,wm} from "./m707.ts";
import {b} from "../runtime.ts";
function OFp(e){try{return S5e("workflows",e)}catch(t){if(sp(t))return logForDebugging(`loadWorkflowsDir: project-dir walk failed: ${t.code}`,{level:"error"}),[];throw t}}
async function KKa(e,t){let n=Wt(),r;try{r=await n.readdir(e)}catch{return[]}return(await Promise.all(r.map(async(s)=>{if(!(s.isFile()||s.isSymbolicLink()))return null;if(!s.name.endsWith(".js"))return null;let i=sgo.join(e,s.name),a;try{a=await n.readFileBytes(i,$2+1)}catch{return null}if(a.byteLength>$2)return logForDebugging(`Workflow ${i} exceeds ${$2} bytes \u2014 skipping`,{level:"warn"}),null;let l=a.toString("utf-8"),c=Bw(l);if("error"in c)return logForDebugging(`Workflow ${i} has invalid meta: ${c.error} \u2014 skipping`,{level:"warn"}),null;return{source:t,name:c.meta.name,description:c.meta.description,whenToUse:c.meta.whenToUse,phases:c.meta.phases,script:l,filePath:i}}))).filter((s)=>s!==null)}
async function zKa(e){let t=sgo.join(or(),"workflows"),n=OFp(e),[r,...o]=await Promise.all([xh("userSettings")?KKa(t,"userSettings"):Promise.resolve([]),...xh("projectSettings")?n.map((i)=>KKa(i,"projectSettings")):[]]),s=new Map;for(let i of r)s.set(i.name,i);for(let i=o.length-1;i>=0;i--)for(let a of o[i])s.set(a.name,a);return[...s.values()].sort((i,a)=>i.name.localeCompare(a.name))}
var sgo;
var jKa=b(()=>{qe();dn();Ct();ps();Xq();wm();Nte();oz();sgo=require("path")});
export {OFp,KKa,zKa,sgo,jKa};
