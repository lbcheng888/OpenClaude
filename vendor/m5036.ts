// @ts-nocheck
import {wwe} from "./m2596.ts";
import {runForkedQuery,sxe} from "../src/config/3967_sxe.ts";
import {getBundledSkillsRoot,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Td(e){let{files:t}=e,n,r=e.getPromptForCommand,o=typeof t==="function";if(t&&(o||Object.keys(t).length>0)){n=DMl(e.name);let i,a=e.getPromptForCommand;r=async(l,c)=>{i??=(async()=>{let p=o?await t():t;return Hym(e.name,p)})();let u=await i,d=await a(l,c);if(u===null)return d;return Lym(d,u)}}let s={type:"prompt",name:e.name,description:typeof e.description==="function"?"":e.description,menuDescription:e.menuDescription,aliases:e.aliases,subcommands:e.subcommands,hasUserSpecifiedDescription:!0,allowedTools:e.allowedTools??[],disallowedTools:e.disallowedTools??[],argumentHint:typeof e.argumentHint==="function"?void 0:e.argumentHint,whenToUse:typeof e.whenToUse==="function"?void 0:e.whenToUse,model:e.model,disableModelInvocation:e.disableModelInvocation??!1,userInvocable:e.userInvocable??!0,contentLength:0,source:"bundled",loadedFrom:"bundled",hooks:e.hooks,skillRoot:n,context:e.context,agent:e.agent,isEnabled:e.isEnabled,isHidden:!(e.userInvocable??!0),progressMessage:e.progressMessage??"running",getPromptForCommand:r,getEffort:e.getEffort,getArgumentCompletions:e.getArgumentCompletions};wwe(s,"description",e.description),wwe(s,"argumentHint",e.argumentHint),wwe(s,"whenToUse",e.whenToUse),xMl.push(s)}
function V0o(){if(runForkedQuery())return[];return[...xMl]}
function DMl(e){return Pne.join(getBundledSkillsRoot(),e)}
async function Hym(e,t){let n=DMl(e);try{return await Iym(n,t),He("skill_bundled_extract"),n}catch(r){return logForDebugging(`Failed to extract bundled skill '${e}' to ${n}: ${r instanceof Error?r.message:String(r)}`),xe("skill_bundled_extract","skill_bundled_extract_write_failed"),null}}
async function Iym(e,t){let n=new Map;for(let[r,o]of Object.entries(t)){let s=Oym(e,r),i=Pne.dirname(s),a=[s,o],l=n.get(i);if(l)l.push(a);else n.set(i,[a])}await Promise.all([...n].map(async([r,o])=>{await RYn.mkdir(r,{recursive:!0,mode:448}),await Promise.all(o.map(([s,i])=>Pym(s,i)))}))}
async function Pym(e,t){let n=await RYn.open(e,Dym,384);try{await n.writeFile(t,"utf8")}finally{await n.close()}}
function Oym(e,t){let n=Pne.normalize(t);if(Pne.isAbsolute(n)||n.split(Pne.sep).includes("..")||n.split("/").includes(".."))throw Error(`bundled skill file path escapes skill dir: ${t}`);return Pne.join(e,n)}
function Lym(e,t){let n=`Base directory for this skill: ${t}

`;if(e.length>0&&e[0].type==="text")return[{type:"text",text:n+e[0].text},...e.slice(1)];return[{type:"text",text:n},...e]}
var UGt,RYn,Pne,xMl,xym,Dym;
var Cb=b(()=>{mn();qe();Xm();sxe();UGt=require("fs"),RYn=require("fs/promises"),Pne=require("path"),xMl=[];xym=UGt.constants.O_NOFOLLOW??0,Dym=UGt.constants.O_WRONLY|UGt.constants.O_CREAT|UGt.constants.O_EXCL|xym});
export {Td,V0o,DMl,Hym,Iym,Pym,Oym,Lym,UGt,RYn,Pne,xMl,xym,Dym,Cb};
