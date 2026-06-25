// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {getSkillToolCommands,clearCommandsCache,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {resetSentSkillNames,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {oB,zke} from "./m2779.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {dl,dn} from "../src/config/0137_namespace.ts";
import {Sn,lr} from "./m233.ts";
var bLl={};
ft(bLl,{call:()=>x_m});
var x_m=async(e,t)=>{let n=isTmuxControlMode(),r=await getSkillToolCommands(n),o=new Set(r.map((p)=>p.name));clearCommandsCache(),resetSentSkillNames();let s=await getSkillToolCommands(n),i=new Set(s.map((p)=>p.name));oB.emit();let a=zn(s,(p)=>!o.has(p.name)),l=zn(r,(p)=>!i.has(p.name)),c=[];if(a>0)c.push(`${a} added`);if(l>0)c.push(`${l} removed`);let u=c.length>0?c.join(", "):"no changes",d=dl()?" (custom skills are disabled in safe mode)":"";return{type:"text",value:`Reloaded skills: ${s.length} ${Sn(s.length,"skill")} available (${u})${d}`}};
var ELl=b(()=>{Mm();GA();Po();dn();zke();lr()});
export {bLl,x_m,ELl};
