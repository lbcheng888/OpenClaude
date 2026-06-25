// @ts-nocheck
import {shouldDisableBypassPermissions,createDisabledBypassPermissionsContext,verifyAutoModeGateAccess,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {_t,bo,gc,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {Ci,fd} from "./m2469.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
async function F3t(e,t){if(ypo)return;if(ypo=!0,!e.isBypassPermissionsModeAvailable)return;if(!await shouldDisableBypassPermissions())return;t((r)=>createDisabledBypassPermissionsContext(r))}
function a3a(){ypo=!1}
function l3a(){let e=_t((n)=>n.toolPermissionContext),t=bo();N3t.useEffect(()=>{if(getIsRemoteMode())return;F3t(e,(n)=>t((r)=>({...r,toolPermissionContext:n(r.toolPermissionContext)})))},[])}
async function B3t(e,t,n,r){{if(Tpo)return;Tpo=!0;let{updateContext:o,notification:s}=await verifyAutoModeGateAccess(e,n);if(t((i)=>{let a=o(i.toolPermissionContext),l=a===i.toolPermissionContext?i:{...i,toolPermissionContext:a};if(!s||r)return l;return{...l,notifications:{...l.notifications,queue:[...l.notifications.queue,{key:"auto-mode-gate-notification",text:s,color:"warning",priority:"high"}]}}}),s&&r)r({key:"auto-mode-gate-notification",text:s,color:"warning",priority:"high"})}}
function Spo(){Tpo=!1}
function c3a(){let e=_t((a)=>a.mainLoopModel),t=_t((a)=>a.mainLoopModelForSession),n=_t((a)=>a.fastMode),r=bo(),o=gc(),{addNotification:s}=Ci(),i=N3t.useRef(!0);N3t.useEffect(()=>{if(getIsRemoteMode())return;if(i.current)i.current=!1;else Spo();B3t(o.getState().toolPermissionContext,r,n,s)},[e,t,n])}
var N3t,ypo=!1,Tpo=!1;
var bpo=b(()=>{fd();uo();lt();cy();N3t=x(et(),1)});
export {F3t,a3a,l3a,B3t,Spo,c3a,N3t,ypo,Tpo,bpo};
