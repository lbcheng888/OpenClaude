// @ts-nocheck
import {bUt,IBn} from "../../vendor/m3830.ts";
import {PUe,q0t} from "../../vendor/m2536.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {UGl,SLo,$Gl} from "../agent/5451_toolName.ts";
import {qH,Iwe} from "./2545_current.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function sLm(){let e=NGt.c(7),[t,n]=bUt("responding",qGl,!1),r;if(e[0]!==n)r=qGl.split("").map((i,a)=>RS.default.createElement(PUe,{key:a,char:i,index:a,glimmerIndex:n,messageColor:"inactive",shimmerColor:"text"})),e[0]=n,e[1]=r;else r=e[1];let o;if(e[2]!==r)o=RS.default.createElement(Text,null,r),e[2]=r,e[3]=o;else o=e[3];let s;if(e[4]!==t||e[5]!==o)s=RS.default.createElement(Box,{ref:t},o),e[4]=t,e[5]=o,e[6]=s;else s=e[6];return s}
function iLm(e){switch(e){case"LOW":return"success";case"MEDIUM":return"warning";case"HIGH":return"error"}}
function aLm(e){switch(e){case"LOW":return"Low risk";case"MEDIUM":return"Med risk";case"HIGH":return"High risk"}}
function lLm(e,t){return UGl({toolName:e.toolName,toolInput:e.toolInput,toolDescription:e.toolDescription,messages:e.messages??[],signal:t}).catch(()=>null)}
function kXn(e){let t=NGt.c(12),n;if(t[0]===Symbol.for("react.memo_cache_sentinel"))n=SLo(),t[0]=n;else n=t[0];let r=n,o=qH("confirm:toggleExplanation","Confirmation","ctrl+e"),[s,i]=RS.useState(!1),[a,l]=RS.useState(null),c=RS.useRef(null),u;if(t[1]!==a||t[2]!==e||t[3]!==s)u=()=>{if(!s){if(logEvent("tengu_permission_explainer_shortcut_used",{}),!a){let A=new AbortController;c.current=A,l(lLm(e,A.signal))}}i(cLm)},t[1]=a,t[2]=e,t[3]=s,t[4]=u;else u=t[4];let d;if(t[5]===Symbol.for("react.memo_cache_sentinel"))d={context:"Confirmation",isActive:r},t[5]=d;else d=t[5];Or("confirm:toggleExplanation",u,d);let p,m;if(t[6]===Symbol.for("react.memo_cache_sentinel"))p=()=>()=>c.current?.abort(),m=[],t[6]=p,t[7]=m;else p=t[6],m=t[7];RS.useEffect(p,m);let f;if(t[8]!==o||t[9]!==a||t[10]!==s)f={visible:s,enabled:r,chord:o,promise:a},t[8]=o,t[9]=a,t[10]=s,t[11]=f;else f=t[11];return f}
function cLm(e){return!e}
function uLm(e){let t=NGt.c(21),{promise:n}=e,r=RS.use(n);if(!r){let p;if(t[0]===Symbol.for("react.memo_cache_sentinel"))p=RS.default.createElement(Box,{marginTop:1},RS.default.createElement(Text,{dimColor:!0},"Explanation unavailable")),t[0]=p;else p=t[0];return p}let o;if(t[1]!==r.explanation)o=RS.default.createElement(Text,null,r.explanation),t[1]=r.explanation,t[2]=o;else o=t[2];let s;if(t[3]!==r.reasoning)s=RS.default.createElement(Box,{marginTop:1},RS.default.createElement(Text,null,r.reasoning)),t[3]=r.reasoning,t[4]=s;else s=t[4];let i;if(t[5]!==r.riskLevel)i=iLm(r.riskLevel),t[5]=r.riskLevel,t[6]=i;else i=t[6];let a;if(t[7]!==r.riskLevel)a=aLm(r.riskLevel),t[7]=r.riskLevel,t[8]=a;else a=t[8];let l;if(t[9]!==i||t[10]!==a)l=RS.default.createElement(Text,{color:i},a,":"),t[9]=i,t[10]=a,t[11]=l;else l=t[11];let c;if(t[12]!==r.risk)c=RS.default.createElement(Text,null," ",r.risk),t[12]=r.risk,t[13]=c;else c=t[13];let u;if(t[14]!==l||t[15]!==c)u=RS.default.createElement(Box,{marginTop:1},RS.default.createElement(Text,null,l,c)),t[14]=l,t[15]=c,t[16]=u;else u=t[16];let d;if(t[17]!==o||t[18]!==s||t[19]!==u)d=RS.default.createElement(Box,{flexDirection:"column",marginTop:1},o,s,u),t[17]=o,t[18]=s,t[19]=u,t[20]=d;else d=t[20];return d}
function HXn(e){let t=NGt.c(3),{visible:n,promise:r}=e;if(!n||!r)return null;let o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=RS.default.createElement(Box,{marginTop:1},RS.default.createElement(sLm,null)),t[0]=o;else o=t[0];let s;if(t[1]!==r)s=RS.default.createElement(RS.Suspense,{fallback:o},RS.default.createElement(uLm,{promise:r})),t[1]=r,t[2]=s;else s=t[2];return s}
var NGt,RS,qGl="Loading explanation\u2026";
var bLo=b(()=>{ze();Iwe();Ts();Ct();$Gl();q0t();IBn();NGt=M(rt(),1),RS=M(Te(),1)});
export {sLm,iLm,aLm,lLm,kXn,cLm,uLm,HXn,NGt,RS,qGl,bLo};
