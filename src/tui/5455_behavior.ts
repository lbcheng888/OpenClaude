// @ts-nocheck
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {handlePlanModeTransition,lt} from "../session/0131_sent.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Tm,Fk} from "../../vendor/m3341.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function fLm(e){switch(e){case"yes":return{behavior:"allow",updatedInput:{},permissionUpdates:[{type:"setMode",mode:"plan",destination:"session"}]};case"no":return{behavior:"deny"}}}
function QGl(e){let t=XGl.c(12),{payload:n,answer:r}=e,o=mt(ALm),s;if(t[0]!==r||t[1]!==o)s=(p)=>{if(p==="yes")logEvent("tengu_plan_enter",{entryMethod:Qe("tool")}),handlePlanModeTransition(o,"plan");r(fLm(p))},t[0]=r,t[1]=o,t[2]=s;else s=t[2];let i=s,a;if(t[3]===Symbol.for("react.memo_cache_sentinel"))a=qE.createElement(Text,null,"Claude wants to enter plan mode to explore and design an implementation approach."),t[3]=a;else a=t[3];let l;if(t[4]===Symbol.for("react.memo_cache_sentinel"))l=qE.createElement(Box,{marginTop:1,flexDirection:"column"},qE.createElement(Text,{dimColor:!0},"In plan mode, Claude will:"),qE.createElement(Text,{dimColor:!0}," \xB7 Explore the codebase thoroughly"),qE.createElement(Text,{dimColor:!0}," \xB7 Identify existing patterns"),qE.createElement(Text,{dimColor:!0}," \xB7 Design an implementation strategy"),qE.createElement(Text,{dimColor:!0}," \xB7 Present a plan for your approval")),t[4]=l;else l=t[4];let c;if(t[5]===Symbol.for("react.memo_cache_sentinel"))c=qE.createElement(Box,{marginTop:1},qE.createElement(Text,{dimColor:!0},"No code changes will be made until you approve the plan.")),t[5]=c;else c=t[5];let u;if(t[6]!==i)u=qE.createElement(Box,{flexDirection:"column",marginTop:1,paddingX:1},a,l,c,qE.createElement(Box,{marginTop:1},qE.createElement(ac,{confirmLabel:"Yes, enter plan mode",cancelLabel:"No, start implementing now",onConfirm:()=>i("yes"),onCancel:()=>i("no")}))),t[6]=i,t[7]=u;else u=t[7];let d;if(t[8]!==n.requestSource||t[9]!==n.workerBadge||t[10]!==u)d=qE.createElement(Tm,{color:"planMode",title:"Enter plan mode?",workerBadge:n.workerBadge,requestSource:n.requestSource},u),t[8]=n.requestSource,t[9]=n.workerBadge,t[10]=u,t[11]=d;else d=t[11];return d}
function ALm(e){return e.toolPermissionContext.mode}
var XGl,qE;
var ZGl=b(()=>{lt();e_();Fk();ze();Ct();configProtoStore();XGl=M(rt(),1),qE=M(Te(),1)});
export {fLm,QGl,ALm,XGl,qE,ZGl};
