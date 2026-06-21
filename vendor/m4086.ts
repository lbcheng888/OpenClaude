// @ts-nocheck
import {Id,mc} from "../src/config/0645_maxBytes.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {wB,eC} from "./m717.ts";
import {fc,sl} from "./m715.ts";
import {Gn,sc} from "./m2455.ts";
import {l_,dU} from "./m3932.ts";
import {DP,yx} from "../src/core/5144_encoding.ts";
import {n2n,Mao} from "./m4007.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var n$a=`Use this tool when you are in plan mode and have finished writing your plan to the plan file and are ready for user approval.

## How This Tool Works
- You should have already written your plan to the plan file specified in the plan mode system message
- This tool does NOT take the plan content as a parameter - it will read the plan from the file you wrote
- This tool simply signals that you're done planning and ready for the user to review and approve
- The user will see the contents of your plan file when they review it

## When to Use This Tool
IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires writing code. For research tasks where you're gathering information, searching files, reading files or in general trying to understand the codebase - do NOT use this tool.

## Before Using This Tool
Ensure your plan is complete and unambiguous:
- If you have unresolved questions about requirements or approach, use AskUserQuestion first (in earlier phases)
- Once your plan is finalized, use THIS tool to request approval

**Important:** Do NOT use AskUserQuestion to ask "Is this plan okay?" or "Should I proceed?" - that's exactly what THIS tool does. ExitPlanMode inherently requests user approval of your plan.

## Examples

1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the exit plan mode tool because you are not planning the implementation steps of a task.
2. Initial task: "Help me implement yank mode for vim" - Use the exit plan mode tool after you have finished planning the implementation steps of the task.
3. Initial task: "Add a new feature to handle user authentication" - If unsure about auth method (OAuth, JWT, etc.), use AskUserQuestion first, then use exit plan mode tool after clarifying the approach.
`;
function r$a(){return null}
function o$a(e,t,{theme:n}){let{plan:r,filePath:o}=e,s=!r||r.trim()==="",i=o?Id(o):"",a=e.awaitingLeaderApproval;if(s)return sm.createElement(Box,{flexDirection:"column",marginTop:1},sm.createElement(Box,{flexDirection:"row"},sm.createElement(Text,{color:wB("plan")},fc),sm.createElement(Text,null," Exited plan mode")));if(a)return sm.createElement(Box,{flexDirection:"column",marginTop:1},sm.createElement(Box,{flexDirection:"row"},sm.createElement(Text,{color:wB("plan")},fc),sm.createElement(Text,null," Plan submitted for team lead approval")),sm.createElement(Gn,null,sm.createElement(Box,{flexDirection:"column"},o&&sm.createElement(Text,{dimColor:!0},"Plan file: ",i),sm.createElement(Text,{dimColor:!0},"Waiting for team lead to review and approve..."))));return sm.createElement(Box,{flexDirection:"column",marginTop:1},sm.createElement(Box,{flexDirection:"row"},sm.createElement(Text,{color:wB("plan")},fc),sm.createElement(Text,null," User approved Claude's plan")),sm.createElement(Gn,null,sm.createElement(Box,{flexDirection:"column"},o&&sm.createElement(Text,{dimColor:!0},"Plan saved to: ",i," \xB7 /plan to edit"),sm.createElement(l_,null,r))))}
function s$a({plan:e},{theme:t}){let n=e??DP()??"No plan found";return sm.createElement(Box,{flexDirection:"column"},sm.createElement(n2n,{plan:n}))}
var sm;
var i$a=b(()=>{dU();sc();Mao();sl();eC();ze();mc();yx();sm=M(Te(),1)});
export {n$a,r$a,o$a,s$a,sm,i$a};
