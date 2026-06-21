// @ts-nocheck
import {tie,RBr,RQe} from "./m2234.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {isTmuxControlMode,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {gyn,_yn} from "./m2236.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {b} from "../runtime.ts";
async function ghi(e=qQu){let t;try{t=tie()}catch(o){return logForDebugging(`memory-prompt-index: parseMemoryStoresEnv failed: ${Se(o)}`,{level:"debug"}),[]}if(t===null)return[];let n=t.filter((o)=>o.promptIndex!==void 0);if(n.length===0)return[];return(await Promise.allSettled(n.map((o)=>jQu(o,e)))).flatMap((o)=>o.status==="fulfilled"&&o.value!==null?[o.value]:[])}
async function jQu(e,t){let n=e.promptIndex;if(!RBr(n))return isTmuxControlMode("memory_prompt_index","unsafe_path"),null;let r=new gyn(e);try{let o=await withTimeout(r.readByPath(n),t,`promptIndex fetch for ${e.mount}`);if(o===null)return logForDebugging(`memory-prompt-index[${e.mount}]: ${n} not found`,{level:"debug"}),Ie("memory_prompt_index"),{mount:e.mount,promptIndex:n,content:""};return Ie("memory_prompt_index"),{mount:e.mount,promptIndex:n,content:o.content}}catch(o){let s=Se(o),i=s.includes(`promptIndex fetch for ${e.mount}`)?"timeout":"error";return isTmuxControlMode("memory_prompt_index",i),logForDebugging(`memory-prompt-index[${e.mount}]: fetch failed (${i}): ${s}`,{level:"debug"}),null}}
var qQu=5000;
var _hi=b(()=>{qe();bt();ln();_yn();RQe()});
export {ghi,jQu,qQu,_hi};
