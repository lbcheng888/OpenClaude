// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {mt,bo,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {uc,b$s,T$s,A$s,h$s,tE} from "../src/api/1448_month.ts";
import {formatDuration,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function hnc(){let e=Anc.c(13),{addNotification:t}=Ui(),n=mt(M$m),r=bo(),o,s;if(e[0]!==t||e[1]!==n||e[2]!==r)o=()=>{if(getIsRemoteMode())return;if(!uc())return;return b$s((u)=>{if(u)t({key:fnc,kind:"event",color:"fastMode",priority:"immediate",text:"Fast mode is now available \xB7 /fast to turn on"});else if(n)r(L$m),t({key:fnc,kind:"event",color:"warning",priority:"immediate",text:"Fast mode has been disabled by your organization"})})},s=[t,n,r],e[0]=t,e[1]=n,e[2]=r,e[3]=o,e[4]=s;else o=e[3],s=e[4];VQn.useEffect(o,s);let i,a;if(e[5]!==t||e[6]!==r)i=()=>{if(getIsRemoteMode())return;if(!uc())return;return T$s((u)=>{r(O$m),t({key:P$m,kind:"feedback",color:"warning",priority:"immediate",text:u})})},a=[t,r],e[5]=t,e[6]=r,e[7]=i,e[8]=a;else i=e[7],a=e[8];VQn.useEffect(i,a);let l,c;if(e[9]!==t||e[10]!==n)l=()=>{if(getIsRemoteMode())return;if(!n)return;let u=A$s((p,m)=>{let f=formatDuration(p-Date.now(),{hideTrailingZeros:!0}),A=N$m(m,f);t({key:pnc,invalidates:[mnc],text:A,color:"warning",priority:"immediate"})}),d=h$s(()=>{t({key:mnc,kind:"event",invalidates:[pnc],color:"fastMode",text:"Fast limit reset \xB7 now using fast mode",priority:"immediate"})});return()=>{u(),d()}},c=[t,n],e[9]=t,e[10]=n,e[11]=l,e[12]=c;else l=e[11],c=e[12];VQn.useEffect(l,c)}
function O$m(e){return{...e,fastMode:!1}}
function L$m(e){return{...e,fastMode:!1}}
function M$m(e){return e.fastMode}
function N$m(e,t){switch(e){case"overloaded":return`Fast mode overloaded and is temporarily unavailable \xB7 resets in ${t}`;case"rate_limit":return`Fast limit reached and temporarily disabled \xB7 resets in ${t}`}}
var Anc,VQn,pnc="fast-mode-cooldown-started",mnc="fast-mode-cooldown-expired",fnc="fast-mode-org-changed",P$m="fast-mode-overage-rejected";
var gnc=b(()=>{Ld();configProtoStore();tE();ps();lt();Anc=M(rt(),1),VQn=M(Te(),1)});
export {hnc,O$m,L$m,M$m,N$m,Anc,VQn,pnc,mnc,fnc,P$m,gnc};
