// @ts-nocheck
import {Cnt,che} from "./m2776.ts";
import {Js} from "../src/config/2697_oA.ts";
import {CXn,TLo} from "./m5447.ts";
import {b} from "../runtime.ts";
function mVl({suggestions:e=[],onRejectFeedbackChange:t,onAcceptFeedbackChange:n,yesInputMode:r=!1,noInputMode:o=!1,editablePrefix:s,onEditablePrefixChange:i}){let a=[];if(r)a.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:n,allowEmptySubmitToCancel:!0});else a.push({label:"Yes",value:"yes"});if(Cnt()&&e.length>0){let l=e.some((c)=>c.type==="addDirectories"||c.type==="addRules"&&c.rules?.some((u)=>u.toolName!==Js));if(s!==void 0&&i&&!l)a.push({type:"input",label:"Yes, and don\u2019t ask again for",value:"yes-prefix-edited",placeholder:"command prefix (e.g., Get-Process *)",initialValue:s,onChange:i,allowEmptySubmitToCancel:!0,showLabelWithValue:!0,labelValueSeparator:": ",resetCursorOnUpdate:!0});else{let c=CXn(e,Js);if(c)a.push({label:c,value:"yes-apply-suggestions"})}}if(o)a.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:t,allowEmptySubmitToCancel:!0});else a.push({label:"No",value:"no"});return a}
var fVl=b(()=>{che();TLo()});
export {mVl,fVl};
