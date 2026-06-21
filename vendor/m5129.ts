// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {ln,isTmuxControlMode,Ie} from "../src/telemetry/0594_feature_name.ts";
import {qe,logForDebugging} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ev,iF} from "./m2211.ts";
import {D6,N6,xpt} from "../src/agent/5186_bigint.ts";
import {rKn,qOl} from "./m5128.ts";
var VOl,JFT;
var dko=b(()=>{ta();ln();qe();Ev();D6();rKn();VOl=require("path"),JFT=wn(async function(e){let t=await N6("routines",e),n=[...t.filter((s)=>s.source!=="projectSettings"&&s.source!=="policySettings"),...t.filter((s)=>s.source==="projectSettings").sort(xpt),...t.filter((s)=>s.source==="policySettings")],r=new Map,o=null;for(let s of n){let i=qOl(s.frontmatter);for(let u of i.warnings)logForDebugging(`[Routines] ${s.filePath}: ${u}`,{level:"warn"});if(i.triggers.length===0){logForDebugging(`[Routines] skipping ${s.filePath}: no usable trigger (need at least one of: schedule, on)`,{level:"warn"}),o??="routine_load_no_trigger";continue}let a=VOl.basename(s.filePath,".md"),l=s.frontmatter.name,c=typeof l==="string"&&l.trim()!==""?l.trim():a;if(c.startsWith("-")){logForDebugging(`[Routines] skipping ${s.filePath}: name '${c}' must not start with '-'`,{level:"error"}),o="routine_load_invalid_name";continue}r.set(c,{name:c,description:iF(s.frontmatter.description,c)??void 0,triggers:i.triggers,body:s.content.trim(),source:s.source,filePath:s.filePath})}if(o!==null)isTmuxControlMode("routine_load",o);else Ie("routine_load");return Array.from(r.values())})});
export {VOl,JFT,dko};
