// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {_t,bo,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {$l,_5s,h5s,u5s,d5s,WS} from "../src/api/1453_month.ts";
import {formatDuration,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function ndc(){let e=tdc.c(13),{addNotification:t}=Ci(),n=_t(lVm),r=bo(),o,s;if(e[0]!==t||e[1]!==n||e[2]!==r)o=()=>{if(getIsRemoteMode())return;if(!$l())return;return _5s((u)=>{if(u)t({key:edc,kind:"event",color:"fastMode",priority:"immediate",text:"Fast mode is now available \xB7 /fast to turn on"});else if(n)r(aVm),t({key:edc,kind:"event",color:"warning",priority:"immediate",text:"Fast mode has been disabled by your organization"})})},s=[t,n,r],e[0]=t,e[1]=n,e[2]=r,e[3]=o,e[4]=s;else o=e[3],s=e[4];Ynr.useEffect(o,s);let i,a;if(e[5]!==t||e[6]!==r)i=()=>{if(getIsRemoteMode())return;if(!$l())return;return h5s((u)=>{r(iVm),t({key:sVm,kind:"feedback",color:"warning",priority:"immediate",text:u})})},a=[t,r],e[5]=t,e[6]=r,e[7]=i,e[8]=a;else i=e[7],a=e[8];Ynr.useEffect(i,a);let l,c;if(e[9]!==t||e[10]!==n)l=()=>{if(getIsRemoteMode())return;if(!n)return;let u=u5s((p,m)=>{let f=formatDuration(p-Date.now(),{hideTrailingZeros:!0}),h=cVm(m,f);t({key:Quc,invalidates:[Zuc],text:h,color:"warning",priority:"immediate"})}),d=d5s(()=>{t({key:Zuc,kind:"event",invalidates:[Quc],color:"fastMode",text:"Fast limit reset \xB7 now using fast mode",priority:"immediate"})});return()=>{u(),d()}},c=[t,n],e[9]=t,e[10]=n,e[11]=l,e[12]=c;else l=e[11],c=e[12];Ynr.useEffect(l,c)}
function iVm(e){return{...e,fastMode:!1}}
function aVm(e){return{...e,fastMode:!1}}
function lVm(e){return e.fastMode}
function cVm(e,t){switch(e){case"overloaded":return`Fast mode overloaded and is temporarily unavailable \xB7 resets in ${t}`;case"rate_limit":return`Fast limit reached and temporarily disabled \xB7 resets in ${t}`}}
var tdc,Ynr,Quc="fast-mode-cooldown-started",Zuc="fast-mode-cooldown-expired",edc="fast-mode-org-changed",sVm="fast-mode-overage-rejected";
var rdc=b(()=>{fd();uo();WS();Xo();lt();tdc=x(tt(),1),Ynr=x(et(),1)});
export {ndc,iVm,aVm,lVm,cVm,tdc,Ynr,Quc,Zuc,edc,sVm,rdc};
