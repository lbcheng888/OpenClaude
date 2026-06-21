// @ts-nocheck
import {mt,bo,Mc,configProtoStore} from "./m2458.ts";
import {Ui,Ld} from "./m2459.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {Qwo,GVn} from "../src/api/5028_type.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function L8l(e,t){let n=mt((c)=>c.toolPermissionContext),r=n.mode,o=bo(),s=Mc(),{addNotification:i}=Ui(),a=TGt.useRef({mode:r,context:n}),l=TGt.useRef(null);TGt.useEffect(()=>{if(!e.isRemoteMode||!e.caps.controlChannel||e.viewerOnly)return;let c=a.current;a.current={mode:r,context:n};let u=t.current;if(t.current=null,c.mode===r||r==="bubble")return;if(u===r)return;let d=r,p=l.current===d;l.current=null,e.sendControlRequest({subtype:"set_permission_mode",mode:d}).then(()=>{if(!p)Ie("mode_switch")}).catch((m)=>{if(logForDebugging(`[remote] set_permission_mode rejected: ${Se(m)}`),p)return;if(Oe("mode_switch",Qwo(m)),s.getState().toolPermissionContext.mode!==d)return;l.current=c.mode,o((f)=>{if(f.toolPermissionContext.mode!==d)return f;return{...f,toolPermissionContext:c.context}}),i({key:"remote-permission-mode-rejected",kind:"feedback",text:`Cloud session couldn't switch to ${d} mode`,color:"warning",priority:"immediate"})})},[r,n,e,o,i,s,t])}
var TGt;
var M8l=b(()=>{Ld();GVn();ln();configProtoStore();qe();bt();TGt=M(Te(),1)});
export {L8l,TGt,M8l};
