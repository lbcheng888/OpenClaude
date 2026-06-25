// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {mn,Pt,He} from "../src/telemetry/0600_feature_name.ts";
import {qe,logForDebugging} from "../src/config/0236_setHasFormattedOutput.ts";
import {HA,HF} from "./m2219.ts";
import {Xq,n6,kft} from "../src/agent/5220_bigint.ts";
import {JJn,y$l} from "./m5158.ts";
var E$l,J7S;
var yPo=b(()=>{Wi();mn();qe();HA();Xq();JJn();E$l=require("path"),J7S=Hn(async function(e){let t=await n6("routines",e),n=[...t.filter((s)=>s.source!=="projectSettings"&&s.source!=="policySettings"),...t.filter((s)=>s.source==="projectSettings").sort(kft),...t.filter((s)=>s.source==="policySettings")],r=new Map,o=null;for(let s of n){let i=y$l(s.frontmatter);for(let u of i.warnings)logForDebugging(`[Routines] ${s.filePath}: ${u}`,{level:"warn"});if(i.triggers.length===0){logForDebugging(`[Routines] skipping ${s.filePath}: no usable trigger (need at least one of: schedule, on)`,{level:"warn"}),o??="routine_load_no_trigger";continue}let a=E$l.basename(s.filePath,".md"),l=s.frontmatter.name,c=typeof l==="string"&&l.trim()!==""?l.trim():a;if(c.startsWith("-")){logForDebugging(`[Routines] skipping ${s.filePath}: name '${c}' must not start with '-'`,{level:"error"}),o="routine_load_invalid_name";continue}r.set(c,{name:c,description:HF(s.frontmatter.description,c)??void 0,triggers:i.triggers,body:s.content.trim(),source:s.source,filePath:s.filePath})}if(o!==null)Pt("routine_load",o);else He("routine_load");return Array.from(r.values())})});
export {E$l,J7S,yPo};
