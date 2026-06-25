// @ts-nocheck
import {pl,Wu} from "./m438.ts";
import {ec,eb,q1i,Oi,Pf} from "../src/agent/2591_level.ts";
import {getCurrentSessionAgentName,getCurrentSessionTitle,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {oTe,s5t} from "./m4409.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {_2o,vcc} from "./m5617.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function kcc(e){y2o.useEffect(()=>{if(pl())return;let t=ec(eb()),n,r=async()=>{if(q1i())return;let o=await Oi(t);if(!o||!o.name)return;if(o.name===getCurrentSessionAgentName()||o.name===getCurrentSessionTitle(getSessionId()))return;let s=o.nameSource??"auto";if(oTe(o.name,s),s==="user")e?.(o.name)};try{n=wcc.watch(t,(o,s)=>{if(s&&!s.startsWith("state.json"))return;r()}),n.on("error",(o)=>logForDebugging(`[jobStateNameSync] watcher error: ${Ce(o)}`,{level:"warn"})),n.unref()}catch(o){logForDebugging(`[jobStateNameSync] watch skipped: ${o}`);return}return r(),()=>n?.close()},[e]),y2o.useEffect(()=>{if(pl())return;return _2o((t)=>{if(!t||t===getCurrentSessionAgentName())return;oTe(t,"user"),e?.(t)}),()=>_2o(null)},[e])}
var wcc,y2o;
var Hcc=b(()=>{lt();s5t();Pf();Wu();qe();Ct();_a();vcc();wcc=require("fs"),y2o=x(et(),1)});
export {kcc,wcc,y2o,Hcc};
