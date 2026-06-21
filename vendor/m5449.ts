// @ts-nocheck
import {nle,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {Cnt,che} from "./m2776.ts";
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {CXn,TLo} from "./m5447.ts";
import {vXn,wXn,xXn} from "./m5448.ts";
import {b} from "../runtime.ts";
function YOm(e){let{commandWithoutRedirections:t,redirections:n}=nle(e);return n.length>0?t:e}
function BGl({suggestions:e=[],decisionReason:t,onRejectFeedbackChange:n,onAcceptFeedbackChange:r,onClassifierDescriptionChange:o,classifierDescription:s,initialClassifierDescriptionEmpty:i=!1,existingAllowDescriptions:a=[],yesInputMode:l=!1,noInputMode:c=!1,editablePrefix:u,onEditablePrefixChange:d,showEnableAutoModeOption:p=!1}){let m=[];if(l)m.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:r,allowEmptySubmitToCancel:!0});else m.push({label:"Yes",value:"yes"});if(Cnt()){let f=e.some((h)=>h.type==="addDirectories"||h.type==="addRules"&&h.rules?.some((g)=>g.toolName!==ns));if(u!==void 0&&d&&!f&&e.length>0)m.push({type:"input",label:"Yes, and don\u2019t ask again for",value:"yes-prefix-edited",placeholder:"command prefix (e.g., npm run *)",initialValue:u,onChange:d,allowEmptySubmitToCancel:!0,showLabelWithValue:!0,labelValueSeparator:": ",resetCursorOnUpdate:!0});else if(e.length>0){let h=CXn(e,ns,YOm);if(h)m.push({label:h,value:"yes-apply-suggestions"})}let A=m.some((h)=>h.value==="yes-prefix-edited")}if(p)m.push({label:vXn,description:wXn,value:"yes-enable-auto-mode"});if(c)m.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:n,allowEmptySubmitToCancel:!0});else m.push({label:"No",value:"no"});return m}
var FGl=b(()=>{AN();che();TLo();xXn()});
export {YOm,BGl,FGl};
