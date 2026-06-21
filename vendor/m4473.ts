// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {rje,oje} from "../src/agent/4471_kind.ts";
import {_ol,yol} from "../src/tui/4473_abortSignal.ts";
import {Te} from "./m2253.ts";
function Tol(e){F_o=e}
function Sol(){let e=F_o;if(F_o=null,!e||Date.now()-e.setAt>30000)return null;return e}
var F_o=null;
var Eol={};
isFullscreenWithTTY(Eol,{renderFeedbackComponent:()=>renderFeedbackComponent,call:()=>ajp});
function renderFeedbackComponent(e,t,n,r="",o={},s){let i=rje();if(i.kind==="disabled")return e(i.reason),null;let a=Sol()??void 0;return U_o.createElement(_ol,{abortSignal:t,messages:n,initialDescription:r,onDone:e,backgroundTasks:o,mode:i.kind,readFileState:s,surveyFeedbackSource:a})}
async function ajp(e,t,n){let r=n?.trim()==="public"?"":n||"";return renderFeedbackComponent(e,t.abortController.signal,t.messages,r,{...t.taskRegistry.all()},t.readFileState)}
var U_o;
var Col=b(()=>{yol();oje();U_o=M(Te(),1)});
export {Tol,Sol,F_o,Eol,renderFeedbackComponent,ajp,U_o,Col};
