// @ts-nocheck
import {hs,VN,Tu} from "./m649.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {Lf,pathInAllowedWorkingPath,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {KR,NZ} from "../src/telemetry/2478_action.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function R9m(e){let t=hs(e),n=hs(`${getOriginalCwd()}/.claude`),r=Lf(t),o=Lf(n);return r.startsWith(o+iVe.sep.toLowerCase())||r.startsWith(o+"/")}
function v9m(e){let t=hs(e),n=iVe.join(NZl.homedir(),".claude"),r=Lf(t),o=Lf(n);return r.startsWith(o+iVe.sep.toLowerCase())||r.startsWith(o+"/")}
function FZl({filePath:e,toolPermissionContext:t,operationType:n="write",onRejectFeedbackChange:r,onAcceptFeedbackChange:o,yesInputMode:s=!1,noInputMode:i=!1}){let a=[],l=KR("chat:cycleMode","Chat","shift+tab");if(s&&o)a.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:o,allowEmptySubmitToCancel:!0,option:{type:"accept-once"}});else a.push({label:"Yes",value:"yes",option:{type:"accept-once"}});let c=pathInAllowedWorkingPath(e,t),u=R9m(e),d=v9m(e);if((u||d)&&n!=="read")a.push({label:"Yes, and allow Claude to edit its own settings for this session",value:"yes-claude-folder",option:{type:"accept-session",scope:d?"global-claude-folder":"claude-folder"}});else{let p;if(c)if(n==="read")p="Yes, during this session";else p=JOe.jsxs(Text,{children:["Yes, allow all edits during this session"," ",JOe.jsxs(Text,{bold:!0,children:["(",l,")"]})]});else{let m=VN(e),f=iVe.basename(m)||"this directory";if(n==="read")p=JOe.jsxs(Text,{children:["Yes, allow reading from ",JOe.jsxs(Text,{bold:!0,children:[f,"/"]})," during this session"]});else p=JOe.jsxs(Text,{children:["Yes, allow all edits in ",JOe.jsxs(Text,{bold:!0,children:[f,"/"]})," during this session ",JOe.jsxs(Text,{bold:!0,children:["(",l,")"]})]})}a.push({label:p,value:"yes-session",option:{type:"accept-session"}})}if(i&&r)a.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:r,allowEmptySubmitToCancel:!0,option:{type:"reject"}});else a.push({label:"No",value:"no",option:{type:"reject"}});return a}
var NZl,iVe,JOe;
var BZl=b(()=>{lt();je();NZ();Tu();Xm();NZl=require("os"),iVe=require("path"),JOe=x(oe(),1)});
export {R9m,v9m,FZl,NZl,iVe,JOe,BZl};
