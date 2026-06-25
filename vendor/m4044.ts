// @ts-nocheck
import {K$,Jqe} from "./m3915.ts";
import {gh,G1} from "./m3957.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {pb,eG} from "./m3827.ts";
import {parseFrameForDisplay,PlanApprovalRequestMessageSchema,PlanApprovalResponseMessageSchema,IdleNotificationMessageSchema,TeammateTerminatedMessageSchema,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {c4a,Xpo} from "./m4042.ts";
import {d4a,E3n} from "./m4043.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function nDp(e){let t=Qpo.c(8),{request:n}=e,r=`Plan Approval Request from ${n.from}`,o;if(t[0]!==n.planContent)o=jD.jsx(K$,{children:jD.jsx(gh,{stripPromptTags:!1,children:n.planContent})}),t[0]=n.planContent,t[1]=o;else o=t[1];let s;if(t[2]!==n.planFilePath)s=jD.jsxs(Text,{dimColor:!0,children:["Plan file: ",n.planFilePath]}),t[2]=n.planFilePath,t[3]=s;else s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=jD.jsx(Box,{flexDirection:"column",marginY:1,children:jD.jsxs(pb,{color:"planMode",title:r,children:[o,s]})}),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function rDp(e){let t=Qpo.c(12),{response:n,senderName:r}=e;if(n.approved){let l=`\u2713 Plan Approved by ${r}`,c;if(t[0]!==n.feedback)c=n.feedback&&jD.jsx(K$,{children:jD.jsxs(Text,{children:["Feedback: ",n.feedback]})}),t[0]=n.feedback,t[1]=c;else c=t[1];let u;if(t[2]===Symbol.for("react.memo_cache_sentinel"))u=jD.jsx(Text,{children:"You can now proceed with implementation. Your plan mode restrictions have been lifted."}),t[2]=u;else u=t[2];let d;if(t[3]!==l||t[4]!==c)d=jD.jsx(Box,{flexDirection:"column",marginY:1,children:jD.jsxs(pb,{color:"success",title:l,children:[c,u]})}),t[3]=l,t[4]=c,t[5]=d;else d=t[5];return d}let o=`\u2717 Plan Rejected by ${r}`,s;if(t[6]!==n.feedback)s=n.feedback&&jD.jsx(K$,{children:jD.jsxs(Text,{children:["Feedback: ",n.feedback]})}),t[6]=n.feedback,t[7]=s;else s=t[7];let i;if(t[8]===Symbol.for("react.memo_cache_sentinel"))i=jD.jsx(Text,{dimColor:!0,children:"Please revise your plan based on the feedback and call ExitPlanMode again."}),t[8]=i;else i=t[8];let a;if(t[9]!==o||t[10]!==s)a=jD.jsx(Box,{flexDirection:"column",marginY:1,children:jD.jsxs(pb,{color:"error",title:o,children:[s,i]})}),t[9]=o,t[10]=s,t[11]=a;else a=t[11];return a}
function C3n(e,t){let n=parseFrameForDisplay(PlanApprovalRequestMessageSchema(),e);if(n)return jD.jsx(nDp,{request:n});let r=parseFrameForDisplay(PlanApprovalResponseMessageSchema(),e);if(r)return jD.jsx(rDp,{response:r,senderName:t});return null}
function oDp(e){let t=parseFrameForDisplay(PlanApprovalRequestMessageSchema(),e);if(t)return`[Plan Approval Request from ${t.from}]`;let n=parseFrameForDisplay(PlanApprovalResponseMessageSchema(),e);if(n)if(n.approved)return n.feedback?`[Plan Approved] ${n.feedback}`:"[Plan Approved] You can now proceed with implementation";else return`[Plan Rejected] ${n.feedback||"Please revise your plan"}`;return null}
function sDp(e){let t=["Agent idle"];if(e.completedTaskId){let n=e.completedStatus||"completed";t.push(`Task ${e.completedTaskId} ${n}`)}if(e.summary)t.push(`Last DM: ${e.summary}`);return t.join(" \xB7 ")}
function p4a(e){let t=oDp(e);if(t)return t;let n=c4a(e);if(n)return n;let r=parseFrameForDisplay(IdleNotificationMessageSchema(),e);if(r)return sDp(r);let o=d4a(e);if(o)return o;let s=parseFrameForDisplay(TeammateTerminatedMessageSchema(),e);if(s)return s.message;return e}
var Qpo,jD;
var Zpo=b(()=>{G1();je();Pw();Jqe();eG();Xpo();E3n();Qpo=x(tt(),1),jD=x(oe(),1)});
export {nDp,rDp,C3n,oDp,sDp,p4a,Qpo,jD,Zpo};
