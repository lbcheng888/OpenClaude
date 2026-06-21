// @ts-nocheck
import {Wwe} from "./m2585.ts";
import {aG,BIe} from "../src/config/4090_BIe.ts";
import {getBundledSkillsRoot,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function ap(e){let{files:t}=e,n,r=e.getPromptForCommand;if(t&&Object.keys(t).length>0){n=pkl(e.name);let s,i=e.getPromptForCommand;r=async(a,l)=>{s??=gcm(e.name,t);let c=await s,u=await i(a,l);if(c===null)return u;return Ecm(u,c)}}let o={type:"prompt",name:e.name,description:typeof e.description==="function"?"":e.description,menuDescription:e.menuDescription,aliases:e.aliases,subcommands:e.subcommands,hasUserSpecifiedDescription:!0,allowedTools:e.allowedTools??[],disallowedTools:e.disallowedTools??[],argumentHint:typeof e.argumentHint==="function"?void 0:e.argumentHint,whenToUse:typeof e.whenToUse==="function"?void 0:e.whenToUse,model:e.model,disableModelInvocation:e.disableModelInvocation??!1,userInvocable:e.userInvocable??!0,contentLength:0,source:"bundled",loadedFrom:"bundled",hooks:e.hooks,skillRoot:n,context:e.context,agent:e.agent,isEnabled:e.isEnabled,isHidden:!(e.userInvocable??!0),progressMessage:e.progressMessage??"running",getPromptForCommand:r,getEffort:e.getEffort,getArgumentCompletions:e.getArgumentCompletions};Wwe(o,"description",e.description),Wwe(o,"argumentHint",e.argumentHint),Wwe(o,"whenToUse",e.whenToUse),dkl.push(o)}
function Dwo(){if(aG())return[];return[...dkl]}
function pkl(e){return Mne.join(getBundledSkillsRoot(),e)}
async function gcm(e,t){let n=pkl(e);try{return await _cm(n,t),Ie("skill_bundled_extract"),n}catch(r){return logForDebugging(`Failed to extract bundled skill '${e}' to ${n}: ${r instanceof Error?r.message:String(r)}`),Oe("skill_bundled_extract","skill_bundled_extract_write_failed"),null}}
async function _cm(e,t){let n=new Map;for(let[r,o]of Object.entries(t)){let s=bcm(e,r),i=Mne.dirname(s),a=[s,o],l=n.get(i);if(l)l.push(a);else n.set(i,[a])}await Promise.all([...n].map(async([r,o])=>{await PVn.mkdir(r,{recursive:!0,mode:448}),await Promise.all(o.map(([s,i])=>Scm(s,i)))}))}
async function Scm(e,t){let n=await PVn.open(e,Tcm,384);try{await n.writeFile(t,"utf8")}finally{await n.close()}}
function bcm(e,t){let n=Mne.normalize(t);if(Mne.isAbsolute(n)||n.split(Mne.sep).includes("..")||n.split("/").includes(".."))throw Error(`bundled skill file path escapes skill dir: ${t}`);return Mne.join(e,n)}
function Ecm(e,t){let n=`Base directory for this skill: ${t}

`;if(e.length>0&&e[0].type==="text")return[{type:"text",text:n+e[0].text},...e.slice(1)];return[{type:"text",text:n},...e]}
var T8t,PVn,Mne,dkl,ycm,Tcm;
var BE=b(()=>{ln();qe();nA();BIe();T8t=require("fs"),PVn=require("fs/promises"),Mne=require("path"),dkl=[];ycm=T8t.constants.O_NOFOLLOW??0,Tcm=T8t.constants.O_WRONLY|T8t.constants.O_CREAT|T8t.constants.O_EXCL|ycm});
export {ap,Dwo,pkl,gcm,_cm,Scm,bcm,Ecm,T8t,PVn,Mne,dkl,ycm,Tcm,BE};
