// @ts-nocheck
import {Ui,Ld} from "./m2459.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {getAutoModeUnavailableReason,getAutoModeUnavailableNotification,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function otc(){let{addNotification:e}=Ui(),t=mt((s)=>s.toolPermissionContext.mode),n=mt((s)=>s.toolPermissionContext.isAutoModeAvailable),r=sVt.useRef(!1),o=sVt.useRef(t);sVt.useEffect(()=>{let s=o.current;if(o.current=t,getIsRemoteMode())return;if(r.current)return;if(!(t==="default"&&s!=="default"&&s!=="auto"&&!n))return;let a=getAutoModeUnavailableReason();if(!a)return;if(a==="provider")return;r.current=!0,e({key:"auto-mode-unavailable",kind:"feedback",text:getAutoModeUnavailableNotification(a),color:"warning",priority:"medium"})},[t,n,e])}
var sVt;
var stc=b(()=>{Ld();lt();configProtoStore();ly();sVt=M(Te(),1)});
export {otc,sVt,stc};
