// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {n7n,D8t} from "../../vendor/m5056.ts";
import {gIl,bRo} from "./5056_onDone.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {Login,runPostLoginHooks,t$t} from "./3947_runPostLoginHooks.ts";
import {getOauthAccountInfo,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {ug,ZR} from "../../vendor/m2551.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG,BRIDGE_LOGIN_INSTRUCTION} from "../core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {pC,Fie} from "../../vendor/m2555.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {g0t,Ld} from "../../vendor/m2459.ts";
import {g6,mte} from "../../vendor/m3821.ts";
import {getBridgeDisabledReason,Vk} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {e7n,t7n} from "../config/5055_ISSUES_EXPLAINER.ts";
import {getBridgeAccessToken,tJ} from "../../vendor/m4224.ts";
import {enrollTrustedDeviceIfNeeded,isTrustedDeviceUnenrolled,isProactiveEnrollmentDisabled,PROACTIVE_ENROLLMENT_DISABLED_MESSAGE,lY} from "../telemetry/3327_untrustedDeviceHint.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Omt} from "../../vendor/m4753.ts";
import {Te} from "../../vendor/m2253.ts";
var vIl={};
isFullscreenWithTTY(vIl,{call:()=>Pdm});
function _dm(e){let t=vRo.c(18),{onDone:n,name:r,context:o}=e,s=bo(),i=mt(bdm),a=mt(Sdm),l=mt(Tdm),[c,u]=Lue.useState(!1),[d,p]=Lue.useState(!1),[m]=Lue.useState(ydm),f;if(t[0]!==r||t[1]!==n||t[2]!==s)f=function(){if(n7n(),gIl()){s((y)=>{if(y.showRemoteCallout)return y;return{...y,showRemoteCallout:!0,replBridgeInitialName:r}}),n("",{display:"system"});return}logEvent("tengu_bridge_command",{action:Qe("connect")}),s((y)=>{if(y.replBridgeEnabled&&!y.replBridgeOutboundOnly)return y;return{...y,replBridgeEnabled:!0,replBridgeExplicit:!0,replBridgeOutboundOnly:!1,replBridgeInitialName:r}}),n("",{display:"system"})},t[0]=r,t[1]=n,t[2]=s,t[3]=f;else f=t[3];let A=f,h;if(t[4]!==A||t[5]!==n||t[6]!==i||t[7]!==a||t[8]!==l)h=()=>{if((i||a)&&!l){u(!0);return}let _=!1;return(async()=>{let y=await EIl();if(_)return;if(y?.kind==="error"){logEvent("tengu_bridge_command",{action:Qe("preflight_failed")}),n(y.message,{display:"system"});return}if(y?.kind==="unenrolled-trusted-device"){logEvent("tengu_bridge_command",{action:Qe("preflight_login_for_enrollment")}),p(!0);return}A()})(),()=>{_=!0}},t[4]=A,t[5]=n,t[6]=i,t[7]=a,t[8]=l,t[9]=h;else h=t[9];let g;if(t[10]===Symbol.for("react.memo_cache_sentinel"))g=[],t[10]=g;else g=t[10];if(Lue.useEffect(h,g),c){let _;if(t[11]!==n)_=Hf.createElement(Edm,{onDone:n}),t[11]=n,t[12]=_;else _=t[12];return _}if(d){if(!o)return n("Your organization requires Trusted Devices for Remote Control, but this device is not enrolled. Please run `/login` in Claude Code to enroll this device.",{display:"system"}),null;let _;if(t[13]!==o||t[14]!==A||t[15]!==n||t[16]!==m)_=Hf.createElement(Login,{startingMessage:"Sign in to enroll this device for Remote Control.",onDone:async(y)=>{if(await runPostLoginHooks(o,y,{awaitEnrollment:!0,previousAccount:m}),!y){logEvent("tengu_bridge_command",{action:Qe("preflight_login_canceled")}),n("Sign-in canceled. Run /remote-control after enrolling this device.",{display:"system"});return}let T=await EIl();if(T?.kind==="error"){n(T.message,{display:"system"});return}if(T?.kind==="unenrolled-trusted-device"){logEvent("tengu_bridge_command",{action:Qe("preflight_enrollment_did_not_complete")}),n("Signed in, but device enrollment didn't complete. Run /remote-control again, or check the debug log for [trusted-device] messages.",{display:"system"});return}A()}}),t[13]=o,t[14]=A,t[15]=n,t[16]=m,t[17]=_;else _=t[17];return _}return null}
function ydm(){let e=getOauthAccountInfo();return e&&{accountUuid:e.accountUuid,organizationUuid:e.organizationUuid}}
function Tdm(e){return e.replBridgeOutboundOnly}
function Sdm(e){return e.replBridgeEnabled}
function bdm(e){return e.replBridgeConnected}
function Edm(e){let t=vRo.c(64),{onDone:n}=e;ug("bridge-disconnect-dialog");let r=bo(),o=mt(Ddm),s=mt(Idm),i=mt(Hdm),[a,l]=Lue.useState(2),[c,u]=Lue.useState(!1),[d,p]=Lue.useState(""),m=i?o:s,f,A;if(t[0]!==m||t[1]!==c)f=()=>{if(!c||!m){p("");return}CIl.toString(m,{type:"utf8",errorCorrectionLevel:"L",small:!0}).then(p).catch(()=>p(""))},A=[c,m],t[0]=m,t[1]=c,t[2]=f,t[3]=A;else f=t[2],A=t[3];Lue.useEffect(f,A);let h;if(t[4]!==n||t[5]!==r)h=function(){r(kdm),logEvent("tengu_bridge_command",{action:Qe("disconnect")}),n(REMOTE_CONTROL_DISCONNECTED_MSG,{display:"system"})},t[4]=n,t[5]=r,t[6]=h;else h=t[6];let g=h,_;if(t[7]===Symbol.for("react.memo_cache_sentinel"))_=function(){u(xdm)},t[7]=_;else _=t[7];let y=_,T;if(t[8]!==n)T=function(){n(void 0,{display:"skip"})},t[8]=n,t[9]=T;else T=t[9];let S=T,v,R;if(t[10]===Symbol.for("react.memo_cache_sentinel"))v=()=>l(Rdm),R=()=>l(wdm),t[10]=v,t[11]=R;else v=t[10],R=t[11];let k;if(t[12]!==a||t[13]!==S||t[14]!==g)k={"select:next":v,"select:previous":R,"select:accept":()=>{if(a===0)g();else if(a===1)y();else S()}},t[12]=a,t[13]=S,t[14]=g,t[15]=k;else k=t[15];let x;if(t[16]===Symbol.for("react.memo_cache_sentinel"))x={context:"Select"},t[16]=x;else x=t[16];Wo(k,x);let H,I,P,L,D,N,O,$,U;if(t[17]!==m||t[18]!==S||t[19]!==d||t[20]!==c){let he=d?d.split(`
`).filter(vdm):[];I=Kn,O="Remote Control",$=S,U=!0,H=Box,P="column",L=1;let se=m?` and at ${m}`:" and claude.ai/code";if(t[30]!==se)D=Hf.createElement(Text,null,"This session is available in the Claude mobile app",se,"."),t[30]=se,t[31]=D;else D=t[31];N=c&&he.length>0&&Hf.createElement(Box,{flexDirection:"column"},he.map(Cdm)),t[17]=m,t[18]=S,t[19]=d,t[20]=c,t[21]=H,t[22]=I,t[23]=P,t[24]=L,t[25]=D,t[26]=N,t[27]=O,t[28]=$,t[29]=U}else H=t[21],I=t[22],P=t[23],L=t[24],D=t[25],N=t[26],O=t[27],$=t[28],U=t[29];let W=a===0,G;if(t[32]===Symbol.for("react.memo_cache_sentinel"))G=Hf.createElement(Text,null,"Disconnect this session"),t[32]=G;else G=t[32];let V;if(t[33]!==W)V=Hf.createElement(pC,{isFocused:W},G),t[33]=W,t[34]=V;else V=t[34];let Q=a===1,K=c?"Hide QR code":"Show QR code",Y;if(t[35]!==c)Y=!c&&Hf.createElement(Text,{dimColor:!0},"  Scan with your phone to open this session"),t[35]=c,t[36]=Y;else Y=t[36];let J;if(t[37]!==K||t[38]!==Y)J=Hf.createElement(Text,null,K,Y),t[37]=K,t[38]=Y,t[39]=J;else J=t[39];let ee;if(t[40]!==Q||t[41]!==J)ee=Hf.createElement(pC,{isFocused:Q},J),t[40]=Q,t[41]=J,t[42]=ee;else ee=t[42];let te=a===2,ne;if(t[43]===Symbol.for("react.memo_cache_sentinel"))ne=Hf.createElement(Text,null,"Continue"),t[43]=ne;else ne=t[43];let re;if(t[44]!==te)re=Hf.createElement(pC,{isFocused:te},ne),t[44]=te,t[45]=re;else re=t[45];let oe;if(t[46]!==V||t[47]!==ee||t[48]!==re)oe=Hf.createElement(Box,{flexDirection:"column"},V,ee,re),t[46]=V,t[47]=ee,t[48]=re,t[49]=oe;else oe=t[49];let ce;if(t[50]===Symbol.for("react.memo_cache_sentinel"))ce=Hf.createElement(Text,{dimColor:!0},Hf.createElement(Tn,null,Hf.createElement(at,{chord:"enter",action:"select"}),Hf.createElement(at,{chord:"escape",action:"continue"}))),t[50]=ce;else ce=t[50];let ue;if(t[51]!==H||t[52]!==P||t[53]!==L||t[54]!==D||t[55]!==N||t[56]!==oe)ue=Hf.createElement(H,{flexDirection:P,gap:L},D,N,oe,ce),t[51]=H,t[52]=P,t[53]=L,t[54]=D,t[55]=N,t[56]=oe,t[57]=ue;else ue=t[57];let ae;if(t[58]!==I||t[59]!==O||t[60]!==$||t[61]!==U||t[62]!==ue)ae=Hf.createElement(I,{title:O,onCancel:$,hideInputGuide:U},ue),t[58]=I,t[59]=O,t[60]=$,t[61]=U,t[62]=ue,t[63]=ae;else ae=t[63];return ae}
function Cdm(e,t){return Hf.createElement(Text,{key:t},e)}
function vdm(e){return e.length>0}
function wdm(e){return(e-1+3)%3}
function Rdm(e){return(e+1)%3}
function xdm(e){return!e}
function kdm(e){if(!e.replBridgeEnabled&&e.replBridgeError===void 0)return e;return{...e,replBridgeEnabled:!1,replBridgeExplicit:!1,replBridgeOutboundOnly:!1,replBridgeError:void 0,notifications:g0t(e.notifications,g6)}}
function Hdm(e){return e.replBridgeSessionActive}
function Idm(e){return e.replBridgeConnectUrl}
function Ddm(e){return e.replBridgeSessionUrl}
async function EIl(){let e=await getBridgeDisabledReason();if(e)return{kind:"error",message:e};let t=await e7n();if(t)return{kind:"error",message:t};if(!getBridgeAccessToken())return{kind:"error",message:BRIDGE_LOGIN_INSTRUCTION};if(await enrollTrustedDeviceIfNeeded(),await isTrustedDeviceUnenrolled()){if(isProactiveEnrollmentDisabled())return{kind:"error",message:PROACTIVE_ENROLLMENT_DISABLED_MESSAGE};return{kind:"unenrolled-trusted-device"}}return logForDebugging("[bridge] Prerequisites passed, enabling bridge"),null}
async function Pdm(e,t,n){let r=n.trim()||void 0;return Hf.createElement(_dm,{onDone:e,name:r,context:t})}
var vRo,CIl,Hf,Lue;
var wIl=b(()=>{tJ();Vk();mte();t7n();lY();zs();Li();rs();Fie();bRo();Ld();ZR();ze();Ts();Ct();D8t();configProtoStore();Ao();qe();t$t();vRo=M(rt(),1),CIl=M(Omt(),1),Hf=M(Te(),1),Lue=M(Te(),1)});
export {vIl,_dm,ydm,Tdm,Sdm,bdm,Edm,Cdm,vdm,wdm,Rdm,xdm,kdm,Hdm,Idm,Ddm,EIl,Pdm,vRo,CIl,Hf,Lue,wIl};
