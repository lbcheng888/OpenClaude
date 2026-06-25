// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {FHe,UHe,NHe,SXr,HI} from "../src/telemetry/3173_error.ts";
import {vs,dm} from "./m2256.ts";
import {WA,fW} from "../src/api/4438_type.ts";
import {Y5i,czr,lzr,sIn} from "../src/telemetry/2776_clearSet.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {fql,aql,lql,mql,cql,pql,pQn,dql,uql,hql} from "../src/telemetry/5209_requestId.ts";
import {V0r,xM} from "./m1450.ts";
var Sql={};
ft(Sql,{handleHintReject:()=>handleHintReject,createContextHintController:()=>createContextHintController,applyHintEdits:()=>applyHintEdits});
async function LHm(e,t){let n=await FHe(e,t);if(UHe(n))return null;return`${NHe}Tool result saved to: ${n.filepath}

Use ${vs} to view${SXr}`}
async function applyHintEdits(e,t){let n=WA(e),r=await Y5i(e,t,{keepRecent:gql,persist:LHm}),o=r?r.messages:e,s=WA(o);return logForDebugging(`[CONTEXT_HINT_REJECT] mc=${!!r} tokensSaved=${r?.tokensSaved??0}`),{messages:o,clearedIds:r?.clearedIds??_ql,clearedContent:r?.clearedContent??yql,applied:{mcApplied:!!r,mcTokensSaved:r?.tokensSaved??0},preCompactTokenEstimate:n,postCompactTokenEstimate:s}}
async function handleHintReject(e){let t=await applyHintEdits(e.messages,e.querySource);return He("compact_hint_reject"),fql({requestId:e.requestId,preCompactTokenEstimate:t.preCompactTokenEstimate,postCompactTokenEstimate:t.postCompactTokenEstimate,tokensSaved:t.preCompactTokenEstimate-t.postCompactTokenEstimate,mcApplied:t.applied.mcApplied,mcTokensSaved:t.applied.mcTokensSaved}),{messages:t.messages,clearedIds:t.clearedIds,clearedContent:t.clearedContent}}
function createContextHintController(e){if(!e.includeFirstPartyBetas)return null;if(!e.querySource.startsWith("repl_main_thread"))return null;let t=aql(),n=!1,r=!1,o=!1;return{active:t,buildRequestParams(s){if(r=!1,!t||n)return null;r=!0;let i=czr(s,gql).tokensSaved>=lzr,a=lql();return{beta:V0r,body:i?{context_hint:{enabled:!0,...a>0&&{target_tokens_saved:a}}}:null}},async onRequestError(s,i){if(!r||n)return null;let a=mql(s);if(cql(s))return n=!0,handleHintReject({messages:i,querySource:e.querySource,requestId:a});if(pql(s))return n=!0,pQn(a,400),{messages:i,clearedIds:_ql,clearedContent:yql};if(dql(s))return n=!0,pQn(a,409),null;if(e.is529Error(s))return n=!0,pQn(a,529),null;return null},classifyStreamError(s){if(o=!1,!r||n)return!1;if(!uql(s))return!1;return o=!0,!0},async onStreamFallback(s,i){let a=o;if(n=!0,!a)return null;return handleHintReject({messages:s,querySource:e.querySource,requestId:i})},strip(){n=!0}}}
var gql=5,_ql,yql;
var bql=b(()=>{xM();dm();qe();HI();mn();hql();fW();sIn();_ql=new Set,yql=new Map});
export {Sql,LHm,applyHintEdits,handleHintReject,createContextHintController,gql,_ql,yql,bql};
