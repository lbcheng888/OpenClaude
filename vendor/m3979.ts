// @ts-nocheck
import {b9,lqe} from "./m3975.ts";
import {l_,dU} from "./m3932.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {HE,JW} from "./m3976.ts";
import {parseFrameForDisplay,PlanApprovalRequestMessageSchema,PlanApprovalResponseMessageSchema,IdleNotificationMessageSchema,TeammateTerminatedMessageSchema,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {q1a,mao} from "./m3977.ts";
import {W1a,BUn} from "./m3978.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function lEp(e){let t=fao.c(8),{request:n}=e,r=`Plan Approval Request from ${n.from}`,o;if(t[0]!==n.planContent)o=bg.createElement(b9,null,bg.createElement(l_,{stripPromptTags:!1},n.planContent)),t[0]=n.planContent,t[1]=o;else o=t[1];let s;if(t[2]!==n.planFilePath)s=bg.createElement(Text,{dimColor:!0},"Plan file: ",n.planFilePath),t[2]=n.planFilePath,t[3]=s;else s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=bg.createElement(Box,{flexDirection:"column",marginY:1},bg.createElement(HE,{color:"planMode",title:r},o,s)),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function cEp(e){let t=fao.c(12),{response:n,senderName:r}=e;if(n.approved){let l=`\u2713 Plan Approved by ${r}`,c;if(t[0]!==n.feedback)c=n.feedback&&bg.createElement(b9,null,bg.createElement(Text,null,"Feedback: ",n.feedback)),t[0]=n.feedback,t[1]=c;else c=t[1];let u;if(t[2]===Symbol.for("react.memo_cache_sentinel"))u=bg.createElement(Text,null,"You can now proceed with implementation. Your plan mode restrictions have been lifted."),t[2]=u;else u=t[2];let d;if(t[3]!==l||t[4]!==c)d=bg.createElement(Box,{flexDirection:"column",marginY:1},bg.createElement(HE,{color:"success",title:l},c,u)),t[3]=l,t[4]=c,t[5]=d;else d=t[5];return d}let o=`\u2717 Plan Rejected by ${r}`,s;if(t[6]!==n.feedback)s=n.feedback&&bg.createElement(b9,null,bg.createElement(Text,null,"Feedback: ",n.feedback)),t[6]=n.feedback,t[7]=s;else s=t[7];let i;if(t[8]===Symbol.for("react.memo_cache_sentinel"))i=bg.createElement(Text,{dimColor:!0},"Please revise your plan based on the feedback and call ExitPlanMode again."),t[8]=i;else i=t[8];let a;if(t[9]!==o||t[10]!==s)a=bg.createElement(Box,{flexDirection:"column",marginY:1},bg.createElement(HE,{color:"error",title:o},s,i)),t[9]=o,t[10]=s,t[11]=a;else a=t[11];return a}
function FUn(e,t){let n=parseFrameForDisplay(PlanApprovalRequestMessageSchema(),e);if(n)return bg.createElement(lEp,{request:n});let r=parseFrameForDisplay(PlanApprovalResponseMessageSchema(),e);if(r)return bg.createElement(cEp,{response:r,senderName:t});return null}
function uEp(e){let t=parseFrameForDisplay(PlanApprovalRequestMessageSchema(),e);if(t)return`[Plan Approval Request from ${t.from}]`;let n=parseFrameForDisplay(PlanApprovalResponseMessageSchema(),e);if(n)if(n.approved)return n.feedback?`[Plan Approved] ${n.feedback}`:"[Plan Approved] You can now proceed with implementation";else return`[Plan Rejected] ${n.feedback||"Please revise your plan"}`;return null}
function dEp(e){let t=["Agent idle"];if(e.completedTaskId){let n=e.completedStatus||"completed";t.push(`Task ${e.completedTaskId} ${n}`)}if(e.summary)t.push(`Last DM: ${e.summary}`);return t.join(" \xB7 ")}
function G1a(e){let t=uEp(e);if(t)return t;let n=q1a(e);if(n)return n;let r=parseFrameForDisplay(IdleNotificationMessageSchema(),e);if(r)return dEp(r);let o=W1a(e);if(o)return o;let s=parseFrameForDisplay(TeammateTerminatedMessageSchema(),e);if(s)return s.message;return e}
var fao,bg;
var Aao=b(()=>{dU();ze();Tx();lqe();JW();mao();BUn();fao=M(rt(),1),bg=M(Te(),1)});
export {lEp,cEp,FUn,uEp,dEp,G1a,fao,bg,Aao};
