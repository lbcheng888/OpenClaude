// @ts-nocheck
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {pb,eG} from "./m3827.ts";
import {isTaskAssignment,Pw} from "../src/permissions/3902_writeToMailbox.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function tDp(e){let t=u4a.c(8),{assignment:n}=e,r=`Task #${n.taskId} assigned by ${n.assignedBy}`,o;if(t[0]!==n.subject)o=$6e.jsx(Text,{bold:!0,children:n.subject}),t[0]=n.subject,t[1]=o;else o=t[1];let s;if(t[2]!==n.description)s=n.description&&$6e.jsx(Text,{dimColor:!0,children:n.description}),t[2]=n.description,t[3]=s;else s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=$6e.jsx(Box,{flexDirection:"column",marginY:1,children:$6e.jsxs(pb,{color:"cyan_FOR_SUBAGENTS_ONLY",title:r,children:[o,s]})}),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function b3n(e){let t=isTaskAssignment(e);if(t)return $6e.jsx(tDp,{assignment:t});return null}
function d4a(e){let t=isTaskAssignment(e);if(t)return`[Task Assigned] #${t.taskId} - ${t.subject}`;return null}
var u4a,$6e;
var E3n=b(()=>{je();Pw();eG();u4a=x(tt(),1),$6e=x(oe(),1)});
export {tDp,b3n,d4a,u4a,$6e,E3n};
