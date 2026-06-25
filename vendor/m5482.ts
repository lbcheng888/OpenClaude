// @ts-nocheck
import {tle,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {Hot,Cae} from "./m2788.ts";
import {Mo} from "../src/mcp/2200_mcpServerName.ts";
import {Rtr,qBo} from "./m5480.ts";
import {vtr,wtr,Htr} from "./m5481.ts";
import {b} from "../runtime.ts";
function o9m(e){let{commandWithoutRedirections:t,redirections:n}=tle(e);return n.length>0?t:e}
function bZl({suggestions:e=[],decisionReason:t,onRejectFeedbackChange:n,onAcceptFeedbackChange:r,onClassifierDescriptionChange:o,classifierDescription:s,initialClassifierDescriptionEmpty:i=!1,existingAllowDescriptions:a=[],yesInputMode:l=!1,noInputMode:c=!1,editablePrefix:u,onEditablePrefixChange:d,showEnableAutoModeOption:p=!1}){let m=[];if(l)m.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:r,allowEmptySubmitToCancel:!0});else m.push({label:"Yes",value:"yes"});if(Hot()){let f=e.some((g)=>g.type==="addDirectories"||g.type==="addRules"&&g.rules?.some((_)=>_.toolName!==Mo));if(u!==void 0&&d&&!f&&e.length>0)m.push({type:"input",label:"Yes, and don\u2019t ask again for",value:"yes-prefix-edited",placeholder:"command prefix (e.g., npm run *)",initialValue:u,onChange:d,allowEmptySubmitToCancel:!0,showLabelWithValue:!0,labelValueSeparator:": ",resetCursorOnUpdate:!0});else if(e.length>0){let g=Rtr(e,Mo,o9m);if(g)m.push({label:g,value:"yes-apply-suggestions"})}let h=m.some((g)=>g.value==="yes-prefix-edited")}if(p)m.push({label:vtr,description:wtr,value:"yes-enable-auto-mode"});if(c)m.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:n,allowEmptySubmitToCancel:!0});else m.push({label:"No",value:"no"});return m}
var EZl=b(()=>{H1();Cae();qBo();Htr()});
export {o9m,bZl,EZl};
