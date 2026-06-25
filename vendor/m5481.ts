// @ts-nocheck
import {_t,bo,uo} from "./m2468.ts";
import {Ci,fd} from "./m2469.ts";
import {ver,ker} from "./m5369.ts";
import {setPermissionModeWithGuards,getAutoModeUnavailableReason,getAutoModeUnavailableNotification,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
function ktr(e){let t=SZl.c(10),n=_t(r9m),r=bo(),{addNotification:o}=Ci(),s;if(t[0]!==e?.type||t[1]!==n)s=e?.type==="workflow-agent"&&(n.mode==="default"||n.mode==="acceptEdits")&&ver(n),t[0]=e?.type,t[1]=n,t[2]=s;else s=t[2];let i=s,a;if(t[3]!==o||t[4]!==r||t[5]!==n)a=()=>{if(!setPermissionModeWithGuards("auto",n,(d)=>r((p)=>{let m=d(p.toolPermissionContext);if(m===p.toolPermissionContext)return p;return{...p,toolPermissionContext:m}}),"workflow_permission_prompt").ok){let d=getAutoModeUnavailableReason();return o({key:"workflow-auto-mode-unavailable",text:d!==null?getAutoModeUnavailableNotification(d):"auto mode is unavailable right now",color:"warning",priority:"high"}),!1}return!0},t[3]=o,t[4]=r,t[5]=n,t[6]=a;else a=t[6];let l=a,c;if(t[7]!==l||t[8]!==i)c={offered:i,enableAutoMode:l},t[7]=l,t[8]=i,t[9]=c;else c=t[9];return c}
function r9m(e){return e.toolPermissionContext}
var SZl,vtr="Yes, and switch to auto mode",wtr="\xB7 workflows run best with it on";
var Htr=b(()=>{fd();uo();ker();cy();SZl=x(tt(),1)});
export {ktr,r9m,SZl,vtr,wtr,Htr};
