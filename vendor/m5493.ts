// @ts-nocheck
import {Hot,Cae} from "./m2788.ts";
import {ws} from "../src/config/2709_Zm.ts";
import {Rtr,qBo} from "./m5480.ts";
import {b} from "../runtime.ts";
function JZl({suggestions:e=[],onRejectFeedbackChange:t,onAcceptFeedbackChange:n,yesInputMode:r=!1,noInputMode:o=!1,editablePrefix:s,onEditablePrefixChange:i}){let a=[];if(r)a.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:n,allowEmptySubmitToCancel:!0});else a.push({label:"Yes",value:"yes"});if(Hot()&&e.length>0){let l=e.some((c)=>c.type==="addDirectories"||c.type==="addRules"&&c.rules?.some((u)=>u.toolName!==ws));if(s!==void 0&&i&&!l)a.push({type:"input",label:"Yes, and don\u2019t ask again for",value:"yes-prefix-edited",placeholder:"command prefix (e.g., Get-Process *)",initialValue:s,onChange:i,allowEmptySubmitToCancel:!0,showLabelWithValue:!0,labelValueSeparator:": ",resetCursorOnUpdate:!0});else{let c=Rtr(e,ws);if(c)a.push({label:c,value:"yes-apply-suggestions"})}}if(o)a.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:t,allowEmptySubmitToCancel:!0});else a.push({label:"No",value:"no"});return a}
var XZl=b(()=>{Cae();qBo()});
export {JZl,XZl};
