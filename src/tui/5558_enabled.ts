// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {xu,tA} from "../config/2201_tA.ts";
import {bfe,s5} from "../config/2182_s5.ts";
import {isPolicyAllowed,rd} from "../../vendor/m2205.ts";
import {je} from "../../vendor/m577.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {k6e,Ndt} from "../../vendor/m4337.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,fromEnumOpt,Qe} from "../../vendor/m5.ts";
import {Ou,uS} from "../config/2594_event_name.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {lQn,HMo} from "../agent/5553_success.ts";
import {fht,uQn} from "../../vendor/m5554.ts";
import {_P,wc,lo} from "../tools/5190_userPromptCount.ts";
import {b,M} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
import {Ap} from "../config/0614_Ap.ts";
import {OMo} from "../../vendor/m5555.ts";
import {Te} from "../../vendor/m2253.ts";
function bZl(){return getFeatureValue_CACHED_MAY_BE_STALE(e2m,0.2)}
function EZl(){return!1}
function n2m(e){return e==="helped"||e==="harmed"||e==="neutral"}
function CZl(){return getFeatureValue_CACHED_MAY_BE_STALE(ZUm,!1)&&xu()&&!bfe()&&isPolicyAllowed("allow_product_feedback")&&!je.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY}
function vZl(){return!1}
function wZl(e){for(let t of e){if(t.type!=="assistant")continue;let n=t.message.content;if(!Array.isArray(n))continue;for(let r of n){if(r.type!=="tool_use"||r.name!==Ws)continue;let o=r.input;if(typeof o.file_path==="string"&&k6e(o.file_path))return!0}}return!1}
function RZl(e,t,n=!1,{enabled:r=!0,otherSurveyActive:o=!1}={}){let s=TD.useRef(new Set),i=TD.useRef(!1),a=TD.useRef(e);a.current=e;let l=mt((I)=>I.lastMemoryEvaluation),[c,u]=TD.useState(null),d=TD.useRef(null),p=TD.useCallback((I,P,L)=>{let D=d.current;logEvent(pQn,{event_type:fromEnum(I),appearance_id:P,response:fromEnumOpt(L),judge_classification:fromEnumOpt(D?.classification),judge_evidence_type:D?.evidence_type}),Ou("feedback_survey",{event_type:I,appearance_id:P,response:L,survey_type:"memory"})},[]),m=TD.useCallback((I)=>p("appeared",I),[p]),f=TD.useCallback((I)=>p("timeout",I),[p]),A=TD.useCallback((I,P)=>p("responded",I,P),[p]),h=TD.useCallback((I)=>!1,[]),g=TD.useCallback((I)=>{logEvent(pQn,{event_type:Qe("transcript_prompt_appeared"),appearance_id:I,trigger:fromEnum(mQn)}),Ou("feedback_survey",{event_type:"transcript_prompt_appeared",appearance_id:I,survey_type:"memory"})},[]),_=TD.useCallback(async(I,P)=>{if(logEvent(pQn,{event_type:`transcript_share_${P}`,appearance_id:I,trigger:fromEnum(mQn)}),P==="dont_ask_again")saveGlobalConfig((L)=>({...L,transcriptShareDismissed:!0}));if(P==="yes"){let L=await lQn(a.current,mQn,I);return logEvent(pQn,{event_type:Qe(L.success?"transcript_share_submitted":"transcript_share_failed"),appearance_id:I,trigger:fromEnum(mQn),error_code:L.errorCode}),L.success}return!1},[]),{state:y,lastResponse:T,appearanceId:S,open:v,handleSelect:R,handleUndo:k,handleTranscriptSelect:x}=fht({otherSurveyActive:o,hideThanksAfterMs:XUm,autoDismissAfterMs:QUm,onOpen:m,onSelect:A,onAutoDismiss:f,shouldShowTranscriptPrompt:h,onTranscriptPromptShown:g,onTranscriptSelect:_}),H=TD.useMemo(()=>_P(e),[e]);return TD.useEffect(()=>{if(e.length===0){i.current=!1,s.current.clear();return}if(y!=="closed"||t||n)return;if(o)return;if(!r||vZl()||!CZl())return;if(!H||s.current.has(H.uuid))return;let I=wc(H.message.content," ");if(!t2m.test(I))return;if(s.current.add(H.uuid),!i.current)i.current=wZl(e);if(!i.current)return;if(EZl()||Math.random()<bZl())v()},[r,o,y,t,n,H,e,v]),TD.useEffect(()=>{if(e.length===0){d.current=null,u(null);return}if(y!=="closed"||t||n)return;if(o)return;if(!r||!vZl()||!CZl())return;if(!H||!l)return;if(l.assistantUuid!==H.uuid)return;if(s.current.has(H.uuid))return;s.current.add(H.uuid);let I=l.evaluation;if(!n2m(I.classification))return;if(!i.current)i.current=wZl(a.current);if(!i.current)return;if(I.classification!=="harmed"&&!EZl()&&Math.random()>=bZl())return;d.current=I,u(I),v()},[r,o,y,t,n,H,l,e.length,v]),{state:y,lastResponse:T,appearanceId:S,evaluation:c,handleSelect:R,handleUndo:k,handleTranscriptSelect:x}}
var TD,XUm=5000,QUm=60000,ZUm="tengu_dunwich_bell",pQn="tengu_memory_survey_event",e2m="tengu_velvet_moth",mQn="memory_survey",t2m;
var xZl=b(()=>{s5();zn();Ct();tA();rd();configProtoStore();ef();Qn();Lr();sn();Ndt();lo();Ap();uS();HMo();uQn();OMo();TD=M(Te(),1);t2m=/\bmemor(?:y|ies)\b/i});
export {bZl,EZl,n2m,CZl,vZl,wZl,RZl,TD,XUm,QUm,ZUm,pQn,e2m,mQn,t2m,xZl};
