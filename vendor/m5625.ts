// @ts-nocheck
import {Ci,fd} from "./m2469.ts";
import {_t,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {getAutoModeUnavailableReason,getAutoModeUnavailableNotification,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Kcc(){let{addNotification:e}=Ci(),t=_t((s)=>s.toolPermissionContext.mode),n=_t((s)=>s.toolPermissionContext.isAutoModeAvailable),r=Pzt.useRef(!1),o=Pzt.useRef(t);Pzt.useEffect(()=>{let s=o.current;if(o.current=t,getIsRemoteMode())return;if(r.current)return;if(!(t==="default"&&s!=="default"&&s!=="auto"&&!n))return;let a=getAutoModeUnavailableReason();if(!a)return;if(a==="provider")return;r.current=!0,e({key:"auto-mode-unavailable",kind:"feedback",text:getAutoModeUnavailableNotification(a),color:"warning",priority:"medium"})},[t,n,e])}
var Pzt;
var zcc=b(()=>{fd();lt();uo();cy();Pzt=x(et(),1)});
export {Kcc,Pzt,zcc};
