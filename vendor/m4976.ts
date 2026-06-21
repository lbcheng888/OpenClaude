// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Pt,Go} from "./m632.ts";
import {getSkillToolCommands,clearCommandsCache,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {resetSentSkillNames,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {LF,axe} from "./m2767.ts";
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {Cn,dr} from "./m231.ts";
var txl={};
isFullscreenWithTTY(txl,{call:()=>ylm});
var ylm=async(e,t)=>{let n=Pt(),r=await getSkillToolCommands(n),o=new Set(r.map((p)=>p.name));clearCommandsCache(),resetSentSkillNames();let s=await getSkillToolCommands(n),i=new Set(s.map((p)=>p.name));LF.emit();let a=Wn(s,(p)=>!o.has(p.name)),l=Wn(r,(p)=>!i.has(p.name)),c=[];if(a>0)c.push(`${a} added`);if(l>0)c.push(`${l} removed`);let u=c.length>0?c.join(", "):"no changes",d=Bl()?" (custom skills are disabled in safe mode)":"";return{type:"text",value:`Reloaded skills: ${s.length} ${Cn(s.length,"skill")} available (${u})${d}`}};
var nxl=b(()=>{Sf();Bv();Go();sn();axe();dr()});
export {txl,ylm,nxl};
