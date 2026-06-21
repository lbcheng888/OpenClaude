// @ts-nocheck
import {sy,e9} from "../../vendor/m2808.ts";
import {Ike,T9e} from "../../vendor/m3307.ts";
import {useTheme} from "../../vendor/m2274.ts";
import {mUn,V2t} from "../../vendor/m3930.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {vAt,wAt,RAt} from "../../vendor/m5257.ts";
import {kE,jL} from "../../vendor/m3944.ts";
import {initCg,j1} from "../telemetry/2531_ignore1mTag.ts";
import {IP,yx} from "../core/5144_encoding.ts";
import {IGl,DGl} from "../../vendor/m5445.ts";
import {ug,ZR} from "../../vendor/m2551.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Dp} from "../../vendor/m2215.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {wGl,RGl} from "../../vendor/m5443.ts";
import {kGl,HGl} from "../../vendor/m5444.ts";
import {qZe,XSn} from "../../vendor/m2454.ts";
import {ZO,V4} from "../telemetry/2512_error_name.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Cv} from "../telemetry/2217_names.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function PGl(e){let t=_Lo.c(5),n=sy(),r;if(t[0]!==n.syntaxHighlightingDisabled)r=n.syntaxHighlightingDisabled?null:Ike(),t[0]=n.syntaxHighlightingDisabled,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==o||t[3]!==e)s=aTe.createElement(BOm,{...e,highlight:o}),t[2]=o,t[3]=e,t[4]=s;else s=t[4];return s}
function BOm(e){let t=_Lo.c(83),{payload:n,answer:r,highlight:o}=e,s=n.questions,i=n.metadataSource,[a]=useTheme(),l=NOm;for(let Me of s)for(let Ke of Me.options){if(!Ke.preview)continue;let He=mUn(Ke.preview,a,o);for(let Ge of He.split(`
`))l=Math.max(l,tn(Ge))}let c=l,u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u={},t[0]=u;else u=t[0];let[d,p]=EXn.useState(u),m=EXn.useRef(0),f=bo(),A;if(t[1]!==f)A=function(Ke,He,Ge,Ye,ot,vt){m.current=m.current+1;let $e=m.current,Je={id:$e,type:"image",content:He,mediaType:Ge||"image/png",filename:Ye||"Pasted image",dimensions:ot};vAt(Je,f),wAt(Je,f),p((Rt)=>({...Rt,[Ke]:{...Rt[Ke]??{},[$e]:Je}}))},t[1]=f,t[2]=A;else A=t[2];let h=A,g;if(t[3]===Symbol.for("react.memo_cache_sentinel"))g=(Me,Ke)=>{p((He)=>{let Ge={...He[Me]??{}};return delete Ge[Ke],{...He,[Me]:Ge}})},t[3]=g;else g=t[3];let _=g,y;if(t[4]!==d)y=Object.values(d).flatMap(jOm).filter(qOm),t[4]=d,t[5]=y;else y=t[5];let T=y,S=mt($Om),v=kE(),R;if(t[6]!==v)R=initCg(v),t[6]=v,t[7]=R;else R=t[7];let k=R,x=S==="plan",H;if(t[8]!==x)H=x?IP():void 0,t[8]=x,t[9]=H;else H=t[9];let I=H,P=IGl(),{currentQuestionIndex:L,answers:D,questionStates:N,isInTextInput:O,nextQuestion:$,prevQuestion:U,updateQuestionState:W,setAnswer:G,setTextInputMode:V}=P;ug("ask-user-question-text-input",O);let Q=L<(s?.length||0)?s?.[L]:null,K=L===(s?.length||0),Y;if(t[10]!==D||t[11]!==s)Y=s?.every((Me)=>Me?.question&&!!D[Me.question])??!1,t[10]=D,t[11]=s,t[12]=Y;else Y=t[12];let J=Y,ee=s.length===1&&!s[0]?.multiSelect,te;if(t[13]!==r||t[14]!==x||t[15]!==i||t[16]!==s.length)te=()=>{if(i)logEvent("tengu_ask_user_question_rejected",{source_hash:Dp(i),questionCount:s.length,isInPlanMode:x});r({behavior:"deny"})},t[13]=r,t[14]=x,t[15]=i,t[16]=s.length,t[17]=te;else te=t[17];let ne=te,re;if(t[18]!==T||t[19]!==r||t[20]!==D||t[21]!==k||t[22]!==x||t[23]!==i||t[24]!==N||t[25]!==s)re=async()=>{let Me=await GOm({questions:s,answers:D,questionStates:N,imageAttachments:T,imageLimits:k});if(i)logEvent("tengu_ask_user_question_respond_to_claude",{source_hash:Dp(i),questionCount:s.length,isInPlanMode:x});r(Me)},t[18]=T,t[19]=r,t[20]=D,t[21]=k,t[22]=x,t[23]=i,t[24]=N,t[25]=s,t[26]=re;else re=t[26];let oe=re,ce;if(t[27]!==T||t[28]!==r||t[29]!==k||t[30]!==x||t[31]!==i||t[32]!==n.input||t[33]!==N||t[34]!==s)ce=async(Me)=>{let Ke=await WOm({questions:s,answersToSubmit:Me,questionStates:N,input:n.input,imageAttachments:T,imageLimits:k});if(i)logEvent("tengu_ask_user_question_accepted",{source_hash:Dp(i),questionCount:s.length,answerCount:Object.keys(Me).length,isInPlanMode:x});r(Ke)},t[27]=T,t[28]=r,t[29]=k,t[30]=x,t[31]=i,t[32]=n.input,t[33]=N,t[34]=s,t[35]=ce;else ce=t[35];let ue=ce,ae;if(t[36]!==D||t[37]!==d||t[38]!==s.length||t[39]!==G||t[40]!==ue)ae=(Me,Ke,He,Ge)=>{let Ye=Ge===void 0?!0:Ge,ot,vt=Array.isArray(Ke);if(vt)ot=Ke.join(", ");else if(He)ot=Object.values(d[Me]??{}).filter(UOm).length>0?`${He} (Image attached)`:He;else if(Ke==="__other__")ot=Object.values(d[Me]??{}).filter(FOm).length>0?"(Image attached)":Ke;else ot=Ke;let $e=s.length===1;if(!vt&&$e&&Ye){let Je={...D,[Me]:ot};ue(Je).catch(De);return}G(Me,ot,Ye)},t[36]=D,t[37]=d,t[38]=s.length,t[39]=G,t[40]=ue,t[41]=ae;else ae=t[41];let he=ae,se;if(t[42]!==D||t[43]!==ne||t[44]!==ue)se=function(Ke){if(Ke==="cancel"){ne();return}if(Ke==="submit")ue(D).catch(De)},t[42]=D,t[43]=ne,t[44]=ue,t[45]=se;else se=t[45];let le=se,pe=ee?(s?.length||1)-1:s?.length||0,de;if(t[46]!==L||t[47]!==U)de=()=>{if(L>0)U()},t[46]=L,t[47]=U,t[48]=de;else de=t[48];let _e=de,fe;if(t[49]!==L||t[50]!==pe||t[51]!==$)fe=()=>{if(L<pe)$()},t[49]=L,t[50]=pe,t[51]=$,t[52]=fe;else fe=t[52];let ie=fe,Ae;if(t[53]!==ie||t[54]!==_e)Ae={"tabs:previous":_e,"tabs:next":ie},t[53]=ie,t[54]=_e,t[55]=Ae;else Ae=t[55];let ge=!(O&&!K),Ce;if(t[56]!==ge)Ce={context:"Tabs",isActive:ge},t[56]=ge,t[57]=Ce;else Ce=t[57];Wo(Ae,Ce);let xe;if(t[58]!==J||t[59]!==D||t[60]!==Q||t[61]!==L||t[62]!==c||t[63]!==ne||t[64]!==le||t[65]!==he||t[66]!==oe||t[67]!==ie||t[68]!==_e||t[69]!==ee||t[70]!==K||t[71]!==$||t[72]!==h||t[73]!==d||t[74]!==n.permissionResult||t[75]!==I||t[76]!==N||t[77]!==s||t[78]!==V||t[79]!==W)xe=Q?aTe.createElement(wGl,{question:Q,questions:s,currentQuestionIndex:L,answers:D,questionStates:N,hideSubmitTab:ee,minContentWidth:c,planFilePath:I,onUpdateQuestionState:W,onAnswer:he,onTextInputFocus:V,onCancel:ne,onSubmit:$,onTabPrev:_e,onTabNext:ie,onRespondToClaude:oe,onImagePaste:(Me,Ke,He,Ge,Ye)=>h(Q.question,Me,Ke,He,Ge,Ye),pastedContents:d[Q.question]??{},onRemoveImage:(Me)=>_(Q.question,Me)}):K?aTe.createElement(kGl,{questions:s,currentQuestionIndex:L,answers:D,allQuestionsAnswered:J,permissionResult:n.permissionResult,onFinalResponse:le}):null,t[58]=J,t[59]=D,t[60]=Q,t[61]=L,t[62]=c,t[63]=ne,t[64]=le,t[65]=he,t[66]=oe,t[67]=ie,t[68]=_e,t[69]=ee,t[70]=K,t[71]=$,t[72]=h,t[73]=d,t[74]=n.permissionResult,t[75]=I,t[76]=N,t[77]=s,t[78]=V,t[79]=W,t[80]=xe;else xe=t[80];let Re;if(t[81]!==xe)Re=aTe.createElement(qZe,null,xe),t[81]=xe,t[82]=Re;else Re=t[82];return Re}
function FOm(e){return e.type==="image"}
function UOm(e){return e.type==="image"}
function $Om(e){return e.toolPermissionContext.mode}
function qOm(e){return e.type==="image"}
function jOm(e){return Object.values(e)}
async function WOm(e){let{questions:t,answersToSubmit:n,questionStates:r,input:o}=e,s={};for(let l of t){let c=n[l.question],u=OGl(l)?r[l.question]?.textInputValue:void 0,p=(c?l.options.find((m)=>m.label===c):void 0)?.preview;if(p||u?.trim())s[l.question]={...p&&{preview:p},...u?.trim()&&{notes:u.trim()}}}let i={...o,answers:n,annotations:s},a=await LGl(e.imageAttachments,e.imageLimits);return{behavior:"allow",updatedInput:i,...a&&a.length>0&&{contentBlocks:a}}}
async function GOm(e){let{questions:t,answers:n,questionStates:r}=e,s=`The user wants to clarify these questions.
    This means they may have additional information, context or questions for you.
    Take their response into account and then reformulate the questions if appropriate.
    Start by asking them what they would like to clarify.

    Questions asked:
${VOm(t,n,r)}`,i=await LGl(e.imageAttachments,e.imageLimits);return{behavior:"deny",feedback:s,...i&&i.length>0&&{contentBlocks:i}}}
function VOm(e,t,n){return e.map((r)=>{let o=t[r.question],s=OGl(r)?n[r.question]?.textInputValue?.trim():void 0,i=[`- "${r.question}"`];if(i.push(o?`  Answer: ${o}`:"  (No answer provided)"),s)i.push(`  User notes: ${s}`);return i.join(`
`)}).join(`
`)}
function OGl(e){return!e.multiSelect&&e.options.some((t)=>t.preview)}
async function LGl(e,t){if(e.length===0)return;return Promise.all(e.map(async(n)=>{let{block:r}=await ZO({data:n.content,mediaType:n.mediaType,limits:t});return r}))}
var _Lo,aTe,EXn,NOm=40;
var MGl=b(()=>{XSn();RGl();HGl();DGl();ZR();jL();e9();Hc();ze();Ts();Ct();configProtoStore();T9e();Cv();V4();RAt();Rn();V2t();j1();yx();_Lo=M(rt(),1),aTe=M(Te(),1),EXn=M(Te(),1)});
export {PGl,BOm,FOm,UOm,$Om,qOm,jOm,WOm,GOm,VOm,OGl,LGl,_Lo,aTe,EXn,NOm,MGl};
