// @ts-nocheck
import {q6a,j6a} from "./m4184.ts";
import {x9n,Put,S_e} from "./m4169.ts";
import {B9n,Out} from "./m4172.ts";
import {cB,Le,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function W6a(e,t,n,r={}){let o=Date.now(),s=[],i=(p)=>{if(p.type==="progress"&&p.data.type==="workflow_log"&&s.length<g0p)s.push(p.data.message);r.onProgress?.(p)},a=r.journal?await r.journal.load():void 0,l=q6a(t,n,i,r.workflowRunId,r.onAgentController,r.args,r.seedPhaseTitles,r.tokenBudget,r.journal,a),c=x9n(l.vmContext),u=t.abortController?.signal,d;try{let p=e.runInContext(l.vmContext,{timeout:r.syncTimeoutMs??B9n}),m=Put(l.vmContext)(p);m.catch(()=>{});let A=(u?await Promise.race([m,new Promise((g,_)=>{let y=()=>_(Error("Workflow aborted"));if(u.aborted)y();else u.addEventListener("abort",y),d=()=>u.removeEventListener("abort",y)})]):await m).v,h;try{h=cB(A)}catch(g){if(A===null||typeof A!=="object")throw g;h=JSON.parse(Le(A,(_,y)=>typeof y==="function"?void 0:y)??"null")}return Le(h),{result:h,agentCount:l.hooks.getAgentCount(),logs:s,failures:l.hooks.getFailures(),durationMs:Date.now()-o}}catch(p){let{name:m,message:f,stack:A}=c(p);if(A)logForDebugging(`Workflow script error stack trace:
${A}`,{level:"error"});let h;if(A){let g=A.split(`
`),_=g.slice(1).filter((y)=>y.trim().startsWith("at "));h=_.length<=5?A:[g[0]??"",..._.slice(0,5)].join(`
`)}else h=f?`${m}: ${f}`:m;return{result:null,agentCount:l.hooks.getAgentCount(),logs:s,failures:l.hooks.getFailures(),durationMs:Date.now()-o,error:h}}finally{d?.()}}
var g0p=1000;
var G6a=b(()=>{qe();Xt();S_e();Out();j6a()});
export {W6a,g0p,G6a};
