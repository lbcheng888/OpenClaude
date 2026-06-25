// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {I8e,x8e} from "../src/agent/4493_kind.ts";
import {sdl,idl} from "../src/tui/4495_abortSignal.ts";
import {oe} from "./m2275.ts";
function adl(e){OCo=e}
function ldl(){let e=OCo;if(OCo=null,!e||Date.now()-e.setAt>30000)return null;return e}
var OCo=null;
var udl={};
ft(udl,{renderFeedbackComponent:()=>renderFeedbackComponent,call:()=>Gjp});
function renderFeedbackComponent(e,t,n,r="",o={},s){let i=I8e();if(i.kind==="disabled")return e(i.reason),null;let a=ldl()??void 0;return ddl.jsx(sdl,{abortSignal:t,messages:n,initialDescription:r,onDone:e,backgroundTasks:o,mode:i.kind,readFileState:s,surveyFeedbackSource:a})}
async function Gjp(e,t,n){let r=n?.trim()==="public"?"":n||"";return renderFeedbackComponent(e,t.abortController.signal,t.messages,r,{...t.taskRegistry.all()},t.readFileState)}
var ddl;
var pdl=b(()=>{idl();x8e();ddl=x(oe(),1)});
export {adl,ldl,OCo,udl,renderFeedbackComponent,Gjp,ddl,pdl};
