// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {HE,JW} from "./m3976.ts";
import {isTaskAssignment,Tx} from "../src/permissions/3886_writeToMailbox.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function aEp(e){let t=j1a.c(8),{assignment:n}=e,r=`Task #${n.taskId} assigned by ${n.assignedBy}`,o;if(t[0]!==n.subject)o=Mte.createElement(Text,{bold:!0},n.subject),t[0]=n.subject,t[1]=o;else o=t[1];let s;if(t[2]!==n.description)s=n.description&&Mte.createElement(Text,{dimColor:!0},n.description),t[2]=n.description,t[3]=s;else s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=Mte.createElement(Box,{flexDirection:"column",marginY:1},Mte.createElement(HE,{color:"cyan_FOR_SUBAGENTS_ONLY",title:r},o,s)),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function NUn(e){let t=isTaskAssignment(e);if(t)return Mte.createElement(aEp,{assignment:t});return null}
function W1a(e){let t=isTaskAssignment(e);if(t)return`[Task Assigned] #${t.taskId} - ${t.subject}`;return null}
var j1a,Mte;
var BUn=b(()=>{ze();Tx();JW();j1a=M(rt(),1),Mte=M(Te(),1)});
export {aEp,NUn,W1a,j1a,Mte,BUn};
