// @ts-nocheck
import {kz,M2e} from "../telemetry/2737_M2e.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {x8t,k8t} from "../core/5036_call.ts";
import {s$t,i$t} from "../../vendor/m3953.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function EHl(e){let t=SHl.c(15),{onDone:n,context:r}=e,[o,s]=bHl.useState(null);if(o)return o;let i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i=[...kz()?[]:[{label:"Upgrade to Max",value:"upgrade"}],{label:"Add funds to continue with usage credits",value:"extra-usage"}],t[0]=i;else i=t[0];let a=i,l;if(t[1]===Symbol.for("react.memo_cache_sentinel"))l=Une.createElement(Box,{paddingX:2},Une.createElement(Text,{color:"error"},"Your Claude Code trial has ended.")),t[1]=l;else l=t[1];let c;if(t[2]!==n)c=()=>n(),t[2]=n,t[3]=c;else c=t[3];let u;if(t[4]!==n)u=()=>n(),t[4]=n,t[5]=u;else u=t[5];let d;if(t[6]!==r||t[7]!==n)d=(f)=>{if(logEvent("tengu_pro_trial_expired_choice",{chose_upgrade:f==="upgrade"}),f==="upgrade")x8t(n,r).then((A)=>s(A));else s$t(n,r).then((A)=>s(A))},t[6]=r,t[7]=n,t[8]=d;else d=t[8];let p;if(t[9]!==u||t[10]!==d)p=Une.createElement(pr,{options:a,onCancel:u,onChange:d}),t[9]=u,t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==c||t[13]!==p)m=Une.createElement(Box,{flexDirection:"column"},l,Une.createElement(Kn,{title:"What do you want to do?",onCancel:c},p)),t[12]=c,t[13]=p,t[14]=m;else m=t[14];return m}
var SHl,Une,bHl;
var CHl=b(()=>{i$t();k8t();ze();Ct();M2e();Yl();Li();SHl=M(rt(),1),Une=M(Te(),1),bHl=M(Te(),1)});
export {EHl,SHl,Une,bHl,CHl};
