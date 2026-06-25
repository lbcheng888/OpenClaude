// @ts-nocheck
import {bo,_t,uo} from "./m2468.ts";
import {z7r,Tot} from "./m2765.ts";
import {getDisableSlashCommands,getOriginalCwd,getSessionSkillAllowlist,lt} from "../src/session/0132_sent.ts";
import {xO,Xie} from "./m2677.ts";
import {getSkillToolCommands,getMcpSkillCommands,filterSkillCommandsByAllowlist,dropShadowedFallbackSkills,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function quc(){let e=bo(),t=_t((o)=>o.mcp.commands),[n,r]=Mzt.useState(0);Mzt.useEffect(()=>{if(!znr||!z7r()||getDisableSlashCommands())return;return xO.subscribe(()=>r((o)=>o+1))},[]),Mzt.useEffect(()=>{if(!znr||!z7r()||getDisableSlashCommands())return;let o=!1;return getSkillToolCommands(getOriginalCwd()).then((s)=>{if(o)return;let i=getMcpSkillCommands(t),a=filterSkillCommandsByAllowlist(dropShadowedFallbackSkills([...s,...i]),getSessionSkillAllowlist());e((l)=>{if(znr.skillToolMembershipUnchanged(l.skillTools,a))return l;return{...l,skillTools:znr.buildSkillTools(a,{emitTelemetry:l.skillTools.length===0})}})}).catch(Ie),()=>{o=!0}},[e,t,n])}
var Mzt,znr=null;
var Wuc=b(()=>{lt();Mm();uo();Tot();vn();Xie();Mzt=x(et(),1)});
export {quc,Mzt,znr,Wuc};
