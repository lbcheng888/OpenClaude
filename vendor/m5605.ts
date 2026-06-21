// @ts-nocheck
import {bo,mt,configProtoStore} from "./m2458.ts";
import {f5r,fnt} from "./m2753.ts";
import {getDisableSlashCommands,getOriginalCwd,getSessionSkillAllowlist,lt} from "../src/session/0131_sent.ts";
import {buildDefaultSystemPromptSections,eae} from "./m2666.ts";
import {getSkillToolCommands,getMcpSkillCommands,filterSkillCommandsByAllowlist,dropShadowedFallbackSkills,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function nnc(){let e=bo(),t=mt((o)=>o.mcp.commands),[n,r]=aVt.useState(0);aVt.useEffect(()=>{if(!WQn||!f5r()||getDisableSlashCommands())return;return buildDefaultSystemPromptSections.subscribe(()=>r((o)=>o+1))},[]),aVt.useEffect(()=>{if(!WQn||!f5r()||getDisableSlashCommands())return;let o=!1;return getSkillToolCommands(getOriginalCwd()).then((s)=>{if(o)return;let i=getMcpSkillCommands(t),a=filterSkillCommandsByAllowlist(dropShadowedFallbackSkills([...s,...i]),getSessionSkillAllowlist());e((l)=>{if(WQn.skillToolMembershipUnchanged(l.skillTools,a))return l;return{...l,skillTools:WQn.buildSkillTools(a,{emitTelemetry:l.skillTools.length===0})}})}).catch(De),()=>{o=!0}},[e,t,n])}
var aVt,WQn=null;
var rnc=b(()=>{lt();Sf();configProtoStore();fnt();Rn();eae();aVt=M(Te(),1)});
export {nnc,aVt,WQn,rnc};
