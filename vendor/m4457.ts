// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {at,rs} from "./m2546.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {Jl,ch} from "./m2727.ts";
import {Drl,Irl,Prl} from "../src/session/4457_freeformPrompt.ts";
import {Wo,Ts} from "./m2542.ts";
import {nl,v_} from "./m2573.ts";
import {Jc,vE} from "./m3837.ts";
import {Link,Tie} from "./m2427.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Orl={};
isFullscreenWithTTY(Orl,{call:()=>_6p});
function y6p(e){let t=f_o.c(16),{onDone:n,context:r,args:o}=e,s=!1,i;if(t[0]!==!1)i=()=>!getGlobalConfig().hasSeenAutofixPrChatOpsNotice,t[0]=!1,t[1]=i;else i=t[1];let[a,l]=Vy.useState(i);if(!a){let A;if(t[2]!==o||t[3]!==r||t[4]!==n)A=Vy.default.createElement(S6p,{onDone:n,context:r,args:o}),t[2]=o,t[3]=r,t[4]=n,t[5]=A;else A=t[5];return A}let c;if(t[6]!==n)c=()=>n("Autofix PR cancelled",{display:"system"}),t[6]=n,t[7]=c;else c=t[7];let u;if(t[8]===Symbol.for("react.memo_cache_sentinel"))u=Vy.default.createElement(at,{chord:"escape",action:"cancel"}),t[8]=u;else u=t[8];let d;if(t[9]===Symbol.for("react.memo_cache_sentinel"))d=Vy.default.createElement(Text,null,"Auto-fix monitors the PR and can post comments on your behalf using your GitHub identity."),t[9]=d;else d=t[9];let p;if(t[10]===Symbol.for("react.memo_cache_sentinel"))p=[{value:"continue",label:"Continue",description:"start monitoring this PR"},{value:"cancel",label:"Not now"}],t[10]=p;else p=t[10];let m;if(t[11]!==n)m=Vy.default.createElement(Box,{flexDirection:"column",gap:1},d,Vy.default.createElement(pr,{options:p,onChange:(A)=>{if(A==="continue")saveGlobalConfig(T6p),l(!1);else n("Autofix PR cancelled",{display:"system"})},onCancel:()=>n("Autofix PR cancelled",{display:"system"})})),t[11]=n,t[12]=m;else m=t[12];let f;if(t[13]!==c||t[14]!==m)f=Vy.default.createElement(Kn,{title:"Autofix PR",subtitle:"Before you start",onCancel:c,inputGuide:u},m),t[13]=c,t[14]=m,t[15]=f;else f=t[15];return f}
function T6p(e){return e.hasSeenAutofixPrChatOpsNotice?e:{...e,hasSeenAutofixPrChatOpsNotice:!0}}
function S6p(e){let t=f_o.c(30),{onDone:n,context:r,args:o}=e,[s,i]=Vy.useState("checking"),[a,l]=Vy.useState(null),[c,u]=Vy.useState(null),[d,p]=Vy.useState(!1),m=Vy.useRef(null),f=Vy.useRef(!1),A=Vy.useRef(!1),h;if(t[0]!==n)h=function(...L){let D=L;if(A.current)return;A.current=!0,n(...D)},t[0]=n,t[1]=h;else h=t[1];let g=h,_;if(t[2]!==o||t[3]!==r||t[4]!==g)_=()=>{let P=Jl();return m.current=P,Drl(o,r,{signal:P.signal,onProgress:(L)=>{if(i(L.step),L.prInfo)l(L.prInfo)}}).then((L)=>{if(P.signal.aborted&&!f.current)return;switch(L.kind){case"ok":{g(L.message,{display:L.display});return}case"error":{if(f.current)g("Autofix PR cancelled");else u(L.message);return}case"cancelled":{g("Autofix PR cancelled");return}}}).catch((L)=>{g(`Autofix PR failed: ${L instanceof Error?L.message:String(L)}`)}),()=>{P.abort()}},t[2]=o,t[3]=r,t[4]=g,t[5]=_;else _=t[5];let y;if(t[6]!==o||t[7]!==r||t[8]!==n)y=[n,r,o],t[6]=o,t[7]=r,t[8]=n,t[9]=y;else y=t[9];Vy.useEffect(_,y);let T;if(t[10]!==g||t[11]!==c)T=function(){if(c){g(c);return}if(f.current){g("Autofix PR cancelled");return}f.current=!0,p(!0),m.current?.abort()},t[10]=g,t[11]=c,t[12]=T;else T=t[12];let S=T,v;if(t[13]!==g||t[14]!==c)v={"confirm:yes":()=>{if(c)g(c)}},t[13]=g,t[14]=c,t[15]=v;else v=t[15];let R=c!==null,k;if(t[16]!==R)k={context:"Confirmation",isActive:R},t[16]=R,t[17]=k;else k=t[17];Wo(v,k);let x;if(t[18]!==d||t[19]!==c)x=c?Vy.default.createElement(at,{chord:["escape","enter"],action:"close"}):d?Vy.default.createElement(at,{chord:"escape",action:"dismiss now"}):Vy.default.createElement(at,{chord:"escape",action:"cancel"}),t[18]=d,t[19]=c,t[20]=x;else x=t[20];let H;if(t[21]!==d||t[22]!==c||t[23]!==a||t[24]!==s)H=Vy.default.createElement(Box,{flexDirection:"column",gap:1},c?Vy.default.createElement(nl,{error:c}):Vy.default.createElement(Vy.default.Fragment,null,Vy.default.createElement(Jc,{message:d?"Cancelling\u2026":Irl[s]}),a&&Vy.default.createElement(Text,{dimColor:!0},"PR: ",Vy.default.createElement(Link,{url:a.url},a.ref)))),t[21]=d,t[22]=c,t[23]=a,t[24]=s,t[25]=H;else H=t[25];let I;if(t[26]!==S||t[27]!==x||t[28]!==H)I=Vy.default.createElement(Kn,{title:"Autofix PR",subtitle:"Monitor and autofix any issues with the current PR",onCancel:S,inputGuide:x},H),t[26]=S,t[27]=x,t[28]=H,t[29]=I;else I=t[29];return I}
var f_o,Vy,_6p=async(e,t,n)=>Vy.default.createElement(y6p,{onDone:e,context:t,args:n.trim()});
var Lrl=b(()=>{Yl();Li();v_();rs();vE();Tie();ze();Ts();ch();Qn();Prl();f_o=M(rt(),1),Vy=M(Te(),1)});
export {Orl,y6p,T6p,S6p,f_o,Vy,_6p,Lrl};
