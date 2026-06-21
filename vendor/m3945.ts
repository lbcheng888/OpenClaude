// @ts-nocheck
import {shouldDisableBypassPermissions,createDisabledBypassPermissionsContext,verifyAutoModeGateAccess,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {mt,bo,Mc,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {Ui,Ld} from "./m2459.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
async function Q2t(e,t){if(Lio)return;if(Lio=!0,!e.isBypassPermissionsModeAvailable)return;if(!await shouldDisableBypassPermissions())return;t((r)=>createDisabledBypassPermissionsContext(r))}
function MMa(){Lio=!1}
function NMa(){let e=mt((n)=>n.toolPermissionContext),t=bo();X2t.useEffect(()=>{if(getIsRemoteMode())return;Q2t(e,(n)=>t((r)=>({...r,toolPermissionContext:n(r.toolPermissionContext)})))},[])}
async function Z2t(e,t,n,r){{if(Mio)return;Mio=!0;let{updateContext:o,notification:s}=await verifyAutoModeGateAccess(e,n);if(t((i)=>{let a=o(i.toolPermissionContext),l=a===i.toolPermissionContext?i:{...i,toolPermissionContext:a};if(!s||r)return l;return{...l,notifications:{...l.notifications,queue:[...l.notifications.queue,{key:"auto-mode-gate-notification",text:s,color:"warning",priority:"high"}]}}}),s&&r)r({key:"auto-mode-gate-notification",text:s,color:"warning",priority:"high"})}}
function Nio(){Mio=!1}
function BMa(){let e=mt((a)=>a.mainLoopModel),t=mt((a)=>a.mainLoopModelForSession),n=mt((a)=>a.fastMode),r=bo(),o=Mc(),{addNotification:s}=Ui(),i=X2t.useRef(!0);X2t.useEffect(()=>{if(getIsRemoteMode())return;if(i.current)i.current=!1;else Nio();Z2t(o.getState().toolPermissionContext,r,n,s)},[e,t,n])}
var X2t,Lio=!1,Mio=!1;
var Bio=b(()=>{Ld();configProtoStore();lt();ly();X2t=M(Te(),1)});
export {Q2t,MMa,NMa,Z2t,Nio,BMa,X2t,Lio,Mio,Bio};
