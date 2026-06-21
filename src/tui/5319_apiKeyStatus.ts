// @ts-nocheck
import {kE,jL} from "../../vendor/m3944.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {KRe} from "../config/2727_repl.ts";
import {jYn,_Po} from "../../vendor/m5303.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {_ce,fct} from "../telemetry/3958_fct.ts";
import {D5r,OOt} from "../../vendor/m2765.ts";
import {getSubscriptionType,getConfiguredApiKeyHelper,getApiKeyHelperElapsedMs,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {Q6,TDe} from "../../vendor/m4603.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Text} from "../../vendor/m2423.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Ok,ab} from "../config/3178_path.ts";
import {F4l,U4l} from "../../vendor/m5312.ts";
import {Box} from "../../vendor/m2422.ts";
import {et,Ai} from "../../vendor/m2208.ts";
import {q4l,j4l} from "../../vendor/m5313.ts";
import {iqe,OUn} from "../../vendor/m3968.ts";
import {ec,Dd} from "../../vendor/m687.ts";
import {getLastApiCompletionTimestamp,lt} from "../session/0131_sent.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {formatDuration,ps} from "../../vendor/m238.ts";
import {useVoiceState,iAe} from "../../vendor/m2457.ts";
import {tde,JWt} from "../telemetry/5303_user_intent_store.ts";
import {st} from "../../vendor/m5.ts";
import {VYn,SPo} from "../../vendor/m5308.ts";
import {M4l,N4l} from "../../vendor/m5311.ts";
import {G4l,V4l} from "../../vendor/m5314.ts";
import {KYn,bPo} from "../../vendor/m5309.ts";
import {R5r,oxe} from "../mcp/2763_pendingChanges.ts";
import {b,M,ro} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {nN} from "../../vendor/m4410.ts";
import {sn} from "../config/0047_namespace.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {XYn,K4l} from "../../vendor/m5315.ts";
import {tql,eql} from "../telemetry/5318_ClosedIssueNotice.ts";
function tJn(e){let t=rql.c(40),{apiKeyStatus:n,isAutoUpdating:r,verbose:o,tokenUsage:s,onChangeIsUpdating:i,isInputWrapped:a,hasStash:l}=e,c=a===void 0?!1:a,u=l===void 0?!1:l,d=kE(),p=mt(Rkm),m;if(t[0]!==p||t[1]!==d||t[2]!==s)m=KRe(s,d,p),t[0]=p,t[1]=d,t[2]=s,t[3]=m;else m=t[3];let f=m.level!=="ok",A=jYn(),h=mt(wkm),g=mt(vkm),{addNotification:_,removeNotification:y}=Ui(),T=_ce(),S,v;if(t[4]!==_)S=()=>(D5r((J,ee)=>{_({key:"env-hook",kind:"event",text:J,color:ee?"error":void 0,priority:ee?"medium":"low",timeoutMs:ee?8000:5000})}),Ckm),v=[_],t[4]=_,t[5]=S,t[6]=v;else S=t[5],v=t[6];qPe.useEffect(S,v);let R=T.isUsingOverage,k;if(t[7]===Symbol.for("react.memo_cache_sentinel"))k=getSubscriptionType(),t[7]=k;else k=t[7];let x=k,H=x==="team"||x==="enterprise",I;if(t[8]===Symbol.for("react.memo_cache_sentinel"))I=Q6(),t[8]=I;else I=t[8];let P=I,L=c&&!f&&n!=="invalid"&&n!=="missing"&&P!==void 0,D,N;if(t[9]!==_||t[10]!==y||t[11]!==L)D=()=>{if(L&&P)logEvent("tengu_external_editor_hint_shown",{}),_({key:"external-editor-hint",kind:"hint",jsx:lc.createElement(Text,{dimColor:!0},lc.createElement(lr,{action:"chat:externalEditor",context:"Chat",fallback:"ctrl+g",description:`edit in ${Ok(P)}`})),priority:"immediate",timeoutMs:5000});else y("external-editor-hint")},N=[L,P,_,y],t[9]=_,t[10]=y,t[11]=L,t[12]=D,t[13]=N;else D=t[12],N=t[13];qPe.useEffect(D,N);let O,$;if(t[14]!==_||t[15]!==h||t[16]!==f||t[17]!==d||t[18]!==y||t[19]!==A||t[20]!==s)O=()=>{if(f&&!A&&!h)_({key:"token-warning",jsx:lc.createElement(F4l,{tokenUsage:s,model:d}),priority:"medium",timeoutMs:18000000,fold:Ekm});else y("token-warning")},$=[f,A,h,s,d,_,y],t[14]=_,t[15]=h,t[16]=f,t[17]=d,t[18]=y,t[19]=A,t[20]=s,t[21]=O,t[22]=$;else O=t[21],$=t[22];qPe.useEffect(O,$);let U=Boolean(g||R&&!H||n==="invalid"||n==="missing"||o||r),W=R??!1,G;if(t[23]!==n||t[24]!==r||t[25]!==f||t[26]!==i||t[27]!==W||t[28]!==s||t[29]!==o)G=lc.createElement(Box,{flexDirection:"column",alignItems:"flex-end",flexShrink:1,overflowX:"hidden"},lc.createElement(xkm,{isInOverageMode:W,isTeamOrEnterprise:H,apiKeyStatus:n,verbose:o,tokenUsage:s,isAutoUpdating:r,isShowingCompactMessage:f,onChangeIsUpdating:i})),t[23]=n,t[24]=r,t[25]=f,t[26]=i,t[27]=W,t[28]=s,t[29]=o,t[30]=G;else G=t[30];let V;if(t[31]!==U||t[32]!==u)V=u&&lc.createElement(Box,{flexShrink:0},lc.createElement(Text,{dimColor:!0},U?" \xB7 ":" "),lc.createElement(Text,{dimColor:!0},et.pointerSmall," stashed")),t[31]=U,t[32]=u,t[33]=V;else V=t[33];let Q=U||u,K;if(t[34]!==Q)K=lc.createElement(q4l,{withSeparator:Q}),t[34]=Q,t[35]=K;else K=t[35];let Y;if(t[36]!==G||t[37]!==V||t[38]!==K)Y=lc.createElement(iqe,null,lc.createElement(Box,{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",flexShrink:0,overflowX:"hidden"},G,V,K)),t[36]=G,t[37]=V,t[38]=K,t[39]=Y;else Y=t[39];return Y}
function Ekm(e,t){return t}
function Ckm(){return D5r(null)}
function vkm(e){return e.notifications.current!==null}
function wkm(e){return e.isBriefOnly}
function Rkm(e){return e.autoCompactWindow}
function xkm({isInOverageMode:e,isTeamOrEnterprise:t,apiKeyStatus:n,verbose:r,tokenUsage:o,isAutoUpdating:s,isShowingCompactMessage:i,onChangeIsUpdating:a}){let[l,c]=qPe.useState(null),u=!ec()&&getSubscriptionType()==="pro";qPe.useEffect(()=>{if(!u){c((_)=>_===null?_:null);return}let g=nql(o,getLastApiCompletionTimestamp());c((_)=>_===g?_:g)},[o,u]),useInterval(()=>{let g=nql(o,getLastApiCompletionTimestamp());c((_)=>_===g?_:g)},u?30000:null);let[d,p]=qPe.useState(null),m=!ec()&&Boolean(getConfiguredApiKeyHelper());useInterval(()=>{let g=getApiKeyHelperElapsedMs(),_=g>=1e4?formatDuration(g):null;p((y)=>_===y?y:_)},m?1000:null);let f=useVoiceState((g)=>g.voiceState),A=tde(),h=useVoiceState((g)=>g.voiceError);if(A&&(f==="recording"||f==="processing"))return lc.createElement(Skm,{voiceState:f});return lc.createElement(lc.Fragment,null,e&&!t&&lc.createElement(Box,null,lc.createElement(Text,{dimColor:!0,wrap:"truncate"},"Now using usage credits")),d&&lc.createElement(Box,null,lc.createElement(Text,{color:"warning",wrap:"truncate"},"apiKeyHelper is taking a while"," "),lc.createElement(Text,{dimColor:!0,wrap:"truncate"},"(",d,")")),(n==="invalid"||n==="missing")&&lc.createElement(Box,null,lc.createElement(Text,{color:"error",wrap:"truncate"},st(process.env.CLAUDE_CODE_REMOTE)?"Authentication error \xB7 Try again":"Not logged in \xB7 Run /login")),n!=="invalid"&&n!=="missing"&&r&&lc.createElement(Box,null,lc.createElement(Text,{dimColor:!0,wrap:"truncate"},o," tokens")),l&&lc.createElement(Box,null,lc.createElement(Text,{dimColor:!0,wrap:"truncate"},l)),lc.createElement(VYn,{verbose:r,isUpdating:s,onChangeIsUpdating:a,showSuccessMessage:!i}),lc.createElement(bkm,null),A&&h&&lc.createElement(Box,null,lc.createElement(Text,{color:"error",wrap:"truncate"},h)),lc.createElement(M4l,null),!ec()&&lc.createElement(G4l,null),lc.createElement(KYn,null))}
function nql(e,t,n=Date.now()){if(t===null)return null;if(e<kkm)return null;if(n-t<=R5r)return null;return`~${Math.round(e/1000)}k uncached \xB7 /clear to start fresh`}
var rql,lc,qPe,Skm,bkm,eJn=5000,kkm=50000;
var nJn=b(()=>{Ai();Ld();Ct();configProtoStore();lt();iAe();jL();JWt();ze();Dd();oxe();fct();nN();_Po();Ao();TDe();sn();ps();OOt();ab();SPo();readRoster();bPo();N4l();OUn();U4l();j4l();V4l();rql=M(rt(),1),lc=M(Te(),1),qPe=M(Te(),1),Skm=(XYn(),ro(K4l)).VoiceIndicator,bkm=(tql(),ro(eql)).ClosedIssueNotice});
export {tJn,Ekm,Ckm,vkm,wkm,Rkm,xkm,nql,rql,lc,qPe,Skm,bkm,eJn,kkm,nJn};
