// @ts-nocheck
import {YKa,JKa} from "./m4197.ts";
import {Rqn,Dpt,Uye} from "./m4181.ts";
import {Mqn,m5e} from "./m4184.ts";
import {IN,TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function XKa(e,t,n,r={}){let o=Date.now(),s=[],i=(p)=>{if(p.type==="progress"&&p.data.type==="workflow_log"&&s.length<LFp)s.push(p.data.message);r.onProgress?.(p)},a=r.journal?await r.journal.load():void 0,l=YKa(t,n,i,r.workflowRunId,r.onAgentController,r.args,r.seedPhaseTitles,r.tokenBudget,r.journal,a),c=Rqn(l.vmContext),u=t.abortController?.signal,d;try{let p=e.runInContext(l.vmContext,{timeout:r.syncTimeoutMs??Mqn}),m=Dpt(l.vmContext)(p);m.catch(()=>{});let h=(u?await Promise.race([m,new Promise((_,T)=>{let y=()=>T(Error("Workflow aborted"));if(u.aborted)y();else u.addEventListener("abort",y),d=()=>u.removeEventListener("abort",y)})]):await m).v,g;try{g=IN(h)}catch(_){if(h===null||typeof h!=="object")throw _;g=JSON.parse(TeamDeleteToolName(h,(T,y)=>typeof y==="function"?void 0:y)??"null")}return TeamDeleteToolName(g),{result:g,agentCount:l.hooks.getAgentCount(),logs:s,failures:l.hooks.getFailures(),durationMs:Date.now()-o}}catch(p){let{name:m,message:f,stack:h}=c(p);if(h)logForDebugging(`Workflow script error stack trace:
${h}`,{level:"error"});let g;if(h){let _=h.split(`
`),T=_.slice(1).filter((y)=>y.trim().startsWith("at "));g=T.length<=5?h:[_[0]??"",...T.slice(0,5)].join(`
`)}else g=f?`${m}: ${f}`:m;return{result:null,agentCount:l.hooks.getAgentCount(),logs:s,failures:l.hooks.getFailures(),durationMs:Date.now()-o,error:g}}finally{d?.()}}
var LFp=1000;
var QKa=b(()=>{qe();tn();Uye();m5e();JKa()});
export {XKa,LFp,QKa};
