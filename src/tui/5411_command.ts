// @ts-nocheck
import {eN,oA} from "../config/2697_oA.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {useClock} from "../../vendor/m2432.ts";
import {ift,d8t} from "../../vendor/m4897.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {bo,configProtoStore} from "../../vendor/m2458.ts";
import {mIe,jBa,fIe} from "./4022_classifierApprovals.ts";
import {qqa,T9n} from "../tools/4164_resolve.ts";
import {hasPermissionsToUseToolWithSink,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {Text} from "../../vendor/m2423.ts";
import {tWl,nWl} from "../../vendor/m5408.ts";
import {rWl,oWl} from "../../vendor/m5409.ts";
import {Pja,Odo} from "../permissions/4200_ctx.ts";
import {vu,bt} from "../../vendor/m195.ts";
import {xm} from "../../vendor/m135.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qi,$u} from "../mcp/2194_mcpServerName.ts";
import {fromEnumOpt} from "../../vendor/m5.ts";
import {b,M} from "../../runtime.ts";
import {LD} from "../../vendor/m194.ts";
import {ze} from "../../vendor/m2452.ts";
import {HL} from "../tools/4363_stripAllEnvVars.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function sWl(e,t){return eN.includes(e)?Le({command:t.command}):Le(t)}
function cPm(e){let t=iWl.c(10),n=useClock(),{recordDenial:r,getDenials:o,removeDenial:s}=ift(),{addNotification:i}=Ui(),a=bo(),l;if(t[0]!==a)l=mIe(a),t[0]=a,t[1]=l;else l=t[1];let c=l,u;if(t[2]!==i||t[3]!==n||t[4]!==o||t[5]!==r||t[6]!==s||t[7]!==c||t[8]!==e)u=async(d,p,m,f,A,h)=>{let g;{let y=o();if(y.length>0){let T=sWl(d.name,p);g=y.find((S)=>S.toolName===d.name&&S.inputKey===T)}}let _=new Promise((y)=>{let T=qqa(d,p,m,f,A,e,c);if(T.resolveIfAborted(y))return;return(h!==void 0?Promise.resolve(h):hasPermissionsToUseToolWithSink(d,p,m,f,A,i,c)).then(async(v)=>{if(v.behavior==="allow"){if(T.resolveIfAborted(y))return;if(v.decisionReason?.type==="classifier"&&v.decisionReason.classifier==="auto-mode")jBa(c,A,v.decisionReason.reason);T.logDecision({decision:"accept",source:"config"},{input:v.updatedInput??p}),y(T.buildAllow(v.updatedInput??p,{decisionReason:v.decisionReason}));return}let R=m.getAppState(),k=Fr(m),x=await d.description(p,{isNonInteractiveSession:m.options.isNonInteractiveSession,toolPermissionContext:k,tools:m.options.tools});if(T.resolveIfAborted(y))return;switch(v.behavior){case"deny":{if(T.logDecision({decision:"reject",source:"config"}),v.decisionReason?.type==="classifier"&&v.decisionReason.classifier==="auto-mode"){r({toolName:d.name,display:x,inputKey:sWl(d.name,p),reason:v.decisionReason.reason??"",timestamp:Date.now()});let H="";i({key:"auto-mode-denied",kind:"warning",priority:"immediate",jsx:ide.createElement(ide.Fragment,null,ide.createElement(Text,{color:"error"},d.userFacingName(p).toLowerCase()," denied by auto mode"),null,ide.createElement(Text,{dimColor:!0}," \xB7 /permissions"))})}y(v);return}case"ask":{if(k.awaitAutomatedChecksBeforeDialog){let I=await tWl({ctx:T,...{},updatedInput:v.updatedInput,suggestions:v.suggestions,permissionMode:k.mode});if(I){y(I);return}}if(T.resolveIfAborted(y))return;let H=await rWl({ctx:T,description:x,...{},updatedInput:v.updatedInput,suggestions:v.suggestions});if(H){y(H);return}Pja({ctx:T,description:x,result:v,awaitAutomatedChecksBeforeDialog:k.awaitAutomatedChecksBeforeDialog,bridgeCallbacks:R.replBridgePermissionCallbacks,channelCallbacks:R.channelPermissionCallbacks},y);return}}}).catch((v)=>{if(v instanceof vu||v instanceof xm)logForDebugging(`Permission check threw ${v.constructor.name} for tool=${d.name}: ${v.message}`),T.logCancelled(),y(T.cancelAndAbort(void 0,!0));else De(v),y(T.cancelAndAbort(void 0,!0))}).finally(()=>{fIe(c,A)})});if(g){let y=g;_.then((T)=>{if(T.behavior==="allow")logEvent("tengu_auto_mode_subsequent_approval",{toolName:Qi(d.name),msSinceDeny:Date.now()-y.timestamp,allowReasonType:fromEnumOpt(T.decisionReason?.type)}),s(y)})}return _},t[2]=i,t[3]=n,t[4]=o,t[5]=r,t[6]=s,t[7]=c,t[8]=e,t[9]=u;else u=t[9];return u}
var iWl,ide,aWl;
var lWl=b(()=>{LD();Ct();$u();d8t();Ld();ze();configProtoStore();HL();Ql();qe();bt();Rn();ay();oA();Xt();nWl();Odo();oWl();T9n();iWl=M(rt(),1),ide=M(Te(),1);aWl=cPm});
export {sWl,cPm,iWl,ide,aWl,lWl};
