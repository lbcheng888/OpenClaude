// @ts-nocheck
import {eie,s9r,ket} from "./m2242.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Pt,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {Zbn,tEn} from "./m2244.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {b} from "../runtime.ts";
async function yEi(e=pcd){let t;try{t=eie()}catch(o){return logForDebugging(`memory-prompt-index: parseMemoryStoresEnv failed: ${Ce(o)}`,{level:"debug"}),[]}if(t===null)return[];let n=t.filter((o)=>o.promptIndex!==void 0);if(n.length===0)return[];return(await Promise.allSettled(n.map((o)=>mcd(o,e)))).flatMap((o)=>o.status==="fulfilled"&&o.value!==null?[o.value]:[])}
async function mcd(e,t){let n=e.promptIndex;if(!s9r(n))return Pt("memory_prompt_index","unsafe_path"),null;let r=new Zbn(e);try{let o=await withTimeout(r.readByPath(n),t,`promptIndex fetch for ${e.mount}`);if(o===null)return logForDebugging(`memory-prompt-index[${e.mount}]: ${n} not found`,{level:"debug"}),He("memory_prompt_index"),{mount:e.mount,promptIndex:n,content:""};return He("memory_prompt_index"),{mount:e.mount,promptIndex:n,content:o.content}}catch(o){let s=Ce(o),i=s.includes(`promptIndex fetch for ${e.mount}`)?"timeout":"error";return Pt("memory_prompt_index",i),logForDebugging(`memory-prompt-index[${e.mount}]: fetch failed (${i}): ${s}`,{level:"debug"}),null}}
var pcd=5000;
var TEi=b(()=>{qe();Ct();mn();tEn();ket()});
export {yEi,mcd,pcd,TEi};
