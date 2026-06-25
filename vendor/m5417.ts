// @ts-nocheck
import {_t,bo,gc,uo} from "./m2468.ts";
import {Ci,fd} from "./m2469.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {cxo,FYn} from "../src/api/5058_type.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function TJl(e,t){let n=_t((c)=>c.toolPermissionContext),r=n.mode,o=bo(),s=gc(),{addNotification:i}=Ci(),a=z7t.useRef({mode:r,context:n}),l=z7t.useRef(null);z7t.useEffect(()=>{if(!e.isRemoteMode||!e.caps.controlChannel||e.viewerOnly)return;let c=a.current;a.current={mode:r,context:n};let u=t.current;if(t.current=null,c.mode===r||r==="bubble")return;if(u===r)return;let d=r,p=l.current===d;l.current=null,e.sendControlRequest({subtype:"set_permission_mode",mode:d}).then(()=>{if(!p)He("mode_switch")}).catch((m)=>{if(logForDebugging(`[remote] set_permission_mode rejected: ${Ce(m)}`),p)return;if(xe("mode_switch",cxo(m)),s.getState().toolPermissionContext.mode!==d)return;l.current=c.mode,o((f)=>{if(f.toolPermissionContext.mode!==d)return f;return{...f,toolPermissionContext:c.context}}),i({key:"remote-permission-mode-rejected",kind:"feedback",text:`Cloud session couldn't switch to ${d} mode`,color:"warning",priority:"immediate"})})},[r,n,e,o,i,s,t])}
var z7t;
var SJl=b(()=>{fd();FYn();mn();uo();qe();Ct();z7t=x(et(),1)});
export {TJl,z7t,SJl};
