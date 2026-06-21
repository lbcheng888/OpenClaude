// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Yxe,Xxe,zxe,B7r,eI} from "../src/telemetry/3157_error.ts";
import {Ws,ef} from "./m2248.ts";
import {Nv,Z5} from "../src/api/4416_type.ts";
import {o$i,H5r,k5r,TRn} from "../src/telemetry/2764_clearSet.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {vNl,_Nl,yNl,CNl,TNl,ENl,gzn,bNl,SNl,wNl} from "../src/telemetry/5176_requestId.ts";
import {hRr,g1} from "./m1445.ts";
var INl={};
isFullscreenWithTTY(INl,{handleHintReject:()=>handleHintReject,createContextHintController:()=>createContextHintController,applyHintEdits:()=>applyHintEdits});
async function fTm(e,t){let n=await Yxe(e,t);if(Xxe(n))return null;return`${zxe}Tool result saved to: ${n.filepath}

Use ${Ws} to view${B7r}`}
async function applyHintEdits(e,t){let n=Nv(e),r=await o$i(e,t,{keepRecent:RNl,persist:fTm}),o=r?r.messages:e,s=Nv(o);return logForDebugging(`[CONTEXT_HINT_REJECT] mc=${!!r} tokensSaved=${r?.tokensSaved??0}`),{messages:o,clearedIds:r?.clearedIds??xNl,clearedContent:r?.clearedContent??kNl,applied:{mcApplied:!!r,mcTokensSaved:r?.tokensSaved??0},preCompactTokenEstimate:n,postCompactTokenEstimate:s}}
async function handleHintReject(e){let t=await applyHintEdits(e.messages,e.querySource);return Ie("compact_hint_reject"),vNl({requestId:e.requestId,preCompactTokenEstimate:t.preCompactTokenEstimate,postCompactTokenEstimate:t.postCompactTokenEstimate,tokensSaved:t.preCompactTokenEstimate-t.postCompactTokenEstimate,mcApplied:t.applied.mcApplied,mcTokensSaved:t.applied.mcTokensSaved}),{messages:t.messages,clearedIds:t.clearedIds,clearedContent:t.clearedContent}}
function createContextHintController(e){if(!e.includeFirstPartyBetas)return null;if(!e.querySource.startsWith("repl_main_thread"))return null;let t=_Nl(),n=!1,r=!1,o=!1;return{active:t,buildRequestParams(s){if(r=!1,!t||n)return null;r=!0;let i=H5r(s,RNl).tokensSaved>=k5r,a=yNl();return{beta:hRr,body:i?{context_hint:{enabled:!0,...a>0&&{target_tokens_saved:a}}}:null}},async onRequestError(s,i){if(!r||n)return null;let a=CNl(s);if(TNl(s))return n=!0,handleHintReject({messages:i,querySource:e.querySource,requestId:a});if(ENl(s))return n=!0,gzn(a,400),{messages:i,clearedIds:xNl,clearedContent:kNl};if(bNl(s))return n=!0,gzn(a,409),null;if(e.is529Error(s))return n=!0,gzn(a,529),null;return null},classifyStreamError(s){if(o=!1,!r||n)return!1;if(!SNl(s))return!1;return o=!0,!0},async onStreamFallback(s,i){let a=o;if(n=!0,!a)return null;return handleHintReject({messages:s,querySource:e.querySource,requestId:i})},strip(){n=!0}}}
var RNl=5,xNl,kNl;
var DNl=b(()=>{g1();ef();qe();eI();ln();wNl();Z5();TRn();xNl=new Set,kNl=new Map});
export {INl,fTm,applyHintEdits,handleHintReject,createContextHintController,RNl,xNl,kNl,DNl};
