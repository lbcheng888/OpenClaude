// @ts-nocheck
import {Ds,EB,Iu} from "./m643.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {normalizeCaseForComparison,pathInAllowedWorkingPath,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {qw,UZ} from "../src/telemetry/2468_action.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function hLm(e){let t=Ds(e),n=Ds(`${getOriginalCwd()}/.claude`),r=normalizeCaseForComparison(t),o=normalizeCaseForComparison(n);return r.startsWith(o+h5e.sep.toLowerCase())||r.startsWith(o+"/")}
function gLm(e){let t=Ds(e),n=h5e.join(eVl.homedir(),".claude"),r=normalizeCaseForComparison(t),o=normalizeCaseForComparison(n);return r.startsWith(o+h5e.sep.toLowerCase())||r.startsWith(o+"/")}
function tVl({filePath:e,toolPermissionContext:t,operationType:n="write",onRejectFeedbackChange:r,onAcceptFeedbackChange:o,yesInputMode:s=!1,noInputMode:i=!1}){let a=[],l=qw("chat:cycleMode","Chat","shift+tab");if(s&&o)a.push({type:"input",label:"Yes",value:"yes",placeholder:"and tell Claude what to do next",onChange:o,allowEmptySubmitToCancel:!0,option:{type:"accept-once"}});else a.push({label:"Yes",value:"yes",option:{type:"accept-once"}});let c=pathInAllowedWorkingPath(e,t),u=hLm(e),d=gLm(e);if((u||d)&&n!=="read")a.push({label:"Yes, and allow Claude to edit its own settings for this session",value:"yes-claude-folder",option:{type:"accept-session",scope:d?"global-claude-folder":"claude-folder"}});else{let p;if(c)if(n==="read")p="Yes, during this session";else p=QPe.default.createElement(Text,null,"Yes, allow all edits during this session"," ",QPe.default.createElement(Text,{bold:!0},"(",l,")"));else{let m=EB(e),f=h5e.basename(m)||"this directory";if(n==="read")p=QPe.default.createElement(Text,null,"Yes, allow reading from ",QPe.default.createElement(Text,{bold:!0},f,"/")," during this session");else p=QPe.default.createElement(Text,null,"Yes, allow all edits in ",QPe.default.createElement(Text,{bold:!0},f,"/")," during this session ",QPe.default.createElement(Text,{bold:!0},"(",l,")"))}a.push({label:p,value:"yes-session",option:{type:"accept-session"}})}if(i&&r)a.push({type:"input",label:"No",value:"no",placeholder:"and tell Claude what to do differently",onChange:r,allowEmptySubmitToCancel:!0,option:{type:"reject"}});else a.push({label:"No",value:"no",option:{type:"reject"}});return a}
var eVl,h5e,QPe;
var nVl=b(()=>{lt();ze();UZ();Iu();nA();eVl=require("os"),h5e=require("path"),QPe=M(Te(),1)});
export {hLm,gLm,tVl,eVl,h5e,QPe,nVl};
