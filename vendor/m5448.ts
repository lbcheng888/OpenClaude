// @ts-nocheck
import {mt,bo,configProtoStore} from "./m2458.ts";
import {Ui,Ld} from "./m2459.ts";
import {mJn,AJn} from "./m5332.ts";
import {setPermissionModeWithGuards,getAutoModeUnavailableReason,getAutoModeUnavailableNotification,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
function RXn(e){let t=NGl.c(10),n=mt(zOm),r=bo(),{addNotification:o}=Ui(),s;if(t[0]!==e?.type||t[1]!==n)s=e?.type==="workflow-agent"&&(n.mode==="default"||n.mode==="acceptEdits")&&mJn(n),t[0]=e?.type,t[1]=n,t[2]=s;else s=t[2];let i=s,a;if(t[3]!==o||t[4]!==r||t[5]!==n)a=()=>{if(!setPermissionModeWithGuards("auto",n,(d)=>r((p)=>{let m=d(p.toolPermissionContext);if(m===p.toolPermissionContext)return p;return{...p,toolPermissionContext:m}}),"workflow_permission_prompt").ok){let d=getAutoModeUnavailableReason();return o({key:"workflow-auto-mode-unavailable",text:d!==null?getAutoModeUnavailableNotification(d):"auto mode is unavailable right now",color:"warning",priority:"high"}),!1}return!0},t[3]=o,t[4]=r,t[5]=n,t[6]=a;else a=t[6];let l=a,c;if(t[7]!==l||t[8]!==i)c={offered:i,enableAutoMode:l},t[7]=l,t[8]=i,t[9]=c;else c=t[9];return c}
function zOm(e){return e.toolPermissionContext}
var NGl,vXn="Yes, and switch to auto mode",wXn="\xB7 workflows run best with it on";
var xXn=b(()=>{Ld();configProtoStore();AJn();ly();NGl=M(rt(),1)});
export {RXn,zOm,NGl,vXn,wXn,xXn};
