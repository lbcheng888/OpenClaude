// @ts-nocheck
import {je} from "../../vendor/m577.ts";
import {R6e,t4t,x6} from "../tools/4332_displayName.ts";
import {LF,axe} from "../../vendor/m2767.ts";
import {tr,sn} from "./0047_namespace.ts";
import {qt,Le,Xt} from "./0228_encoding.ts";
import {Rh,ok} from "../../vendor/m633.ts";
import {kn,SA} from "./0689_timestamp.ts";
import {g$n,f$a,d$a,u$a,p$a,e9t} from "./4091_promise.ts";
import {findCommand,getCommands,clearCommandMemoizationCaches,Sf} from "../tools/5142_toSlashCommands.ts";
import {getProjectRoot,lt} from "../session/0131_sent.ts";
import {lF,Mw} from "./2221_recursive.ts";
import {Yic,zic,Jic} from "../../vendor/m5689.ts";
import {L0e,M0e} from "./4434_path.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
function eac(){let e=je.CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS;return e&&e>0?e:5000}
function tac(){let e=je.CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS;return e&&e>0?e:30000}
function Q1o(){if(!J1o){let e;J1o={promise:new Promise((n)=>{e=n}),resolve:e}}return J1o}
function rac(){if(nac??=dZn(),!X1o)X1o=setInterval(()=>void dZn(),c4m),X1o.unref?.()}
function oac(){let e=Q1o();return nac??=dZn(),e.promise}
async function sac(){return await vht?.catch(()=>{}),dZn()}
function eNo(){R6e(),LF.emit()}
function wVt(){return bD.join(tr(),"skills")}
function iac(){return bD.join(wVt(),u4m)}
async function d4m(){try{let e=await e2.readFile(iac(),"utf8");return qt(e)}catch{return null}}
async function p4m(e){await e2.mkdir(wVt(),{recursive:!0}),await Rh(iac(),Le(e,null,2))}
function Z1o(){return bD.join(wVt(),".staging")}
function wht(e){let t=e.replace(/[<>"|?*\\/]/g,"_"),n=wVt(),r=bD.join(n,t),o=bD.relative(n,r);if(!o||bD.isAbsolute(o)||o===".."||o.startsWith(`..${bD.sep}`))throw Error(`invalid skill name: ${e}`);return r}
function m4m(e,t){let n=new Map(t.map((l)=>[l.skillId,l])),r=new Set(e.map((l)=>l.skillId)),o=new Set,s=[],i=[];for(let l of e){let c=n.get(l.skillId),u;try{u=wht(l.name)}catch{if(kn("warn","skills_sync_invalid_name"),c)i.push(c);continue}if(o.has(u)){if(kn("warn","skills_sync_name_collision"),c)i.push(c);continue}if(o.add(u),!c||c.updatedAt!==l.updatedAt||c.name!==l.name)s.push({skill:l,prev:c});else i.push(c)}let a=t.filter((l)=>!r.has(l.skillId));return{toDownload:s,toRemove:a,carryover:i,liveDirs:o}}
function f4m(e){let t=wht(e.name),n=bD.basename(t),r=t4t({skillName:n,displayName:void 0,description:e.description,hasUserSpecifiedDescription:!0,markdownContent:"",allowedTools:[],argumentHint:void 0,argumentNames:[],whenToUse:void 0,version:void 0,model:void 0,disableModelInvocation:!1,userInvocable:!0,source:"userSettings",baseDir:t,loadedFrom:"skills",hooks:void 0,executionContext:void 0,agent:void 0,paths:void 0,effort:void 0,shell:void 0});if(r.type==="prompt")r.getPromptForCommand=async(o,s)=>{let i=await g$n(n);if(i.ok){let l=findCommand(n,await getCommands(getProjectRoot()));if(l&&l.type==="prompt"&&l!==r)return r.allowedTools=l.allowedTools,r.hooks=l.hooks,r.model=l.model,r.effort=l.effort,r.getEffort=l.getEffort,r.source=l.source,r.skillRoot=l.skillRoot,r.contentLength=l.contentLength,r.progressMessage=l.progressMessage,r.userInvocable=l.userInvocable,l.getPromptForCommand(o,s)}let a=i.ok?"skill not found after download":i.reason;return[{type:"text",text:`Skill ${n} could not be downloaded (${a}). Proceed without it.`}]};return r}
async function Qic(e){let t=wht(e.name),n=bD.join(Z1o(),bD.relative(wVt(),t)),r=bD.join(lF(),`claude-skill-${process.pid}-${Math.random().toString(36).slice(2)}.zip`);try{if(!await Yic(e.skillId,r))return!1;await e2.rm(n,{recursive:!0,force:!0}),await e2.mkdir(Z1o(),{recursive:!0}),await L0e(r,n);let s=n,i=await e2.readdir(n,{withFileTypes:!0});if(!i.some((a)=>a.name==="SKILL.md")&&i.length===1&&i[0].isDirectory())s=bD.join(n,i[0].name);return await e2.rm(t,{recursive:!0,force:!0}),await e2.rename(s,t),!0}finally{await e2.rm(r,{force:!0}).catch(()=>{}),await e2.rm(n,{recursive:!0,force:!0}).catch(()=>{})}}
async function h4m(e){try{return await Qic(e)}catch{return kn("warn","skills_sync_extract_retry"),await sleep(A4m),Qic(e)}}
async function Zic(e,t,n){let r=0,o=Array.from({length:Math.min(t,e.length)},async()=>{while(!0){let s=r++;if(s>=e.length)return;await n(e[s])}});await Promise.all(o)}
async function dZn(){if(vht)return vht;return vht=g4m().finally(()=>{vht=null}),vht}
async function g4m(){let e=Date.now(),t=new Map;try{kn("info","skills_sync_starting");let n=await zic();if(!n.success){kn("warn","skills_sync_list_failed",{duration_ms:Date.now()-e}),logEvent("tengu_skills_sync_list_failed",{duration_ms:Date.now()-e});return}let r=await d4m(),{toDownload:o,toRemove:s,carryover:i,liveDirs:a}=m4m(n.skills,r?.skills??[]),l=async(m)=>{try{let f=wht(m);if(a.has(f))return;await e2.rm(f,{recursive:!0,force:!0})}catch{}};await e2.rm(Z1o(),{recursive:!0,force:!0}).catch(()=>{});let c=new Set(Array.from(a,(m)=>bD.basename(m)));if(f$a(c)>0)clearCommandMemoizationCaches(),LF.emit();if(o.length===0&&s.length===0){kn("info","skills_sync_no_changes",{duration_ms:Date.now()-e});return}let u=0;for(let{skill:m,prev:f}of o)if(!f)d$a(f4m(m)),u++,t.set(m.skillId,u$a(bD.basename(wht(m.name))));if(u>0)clearCommandMemoizationCaches(),LF.emit();Q1o().resolve();let d=[],p=[];await Zic(o,Xic,async({skill:m,prev:f})=>{let A=!1;try{A=await h4m(m)}catch{kn("warn","skills_sync_extract_failed")}if(A){if(d.push(m),f&&f.name!==m.name)await l(f.name);p$a(bD.basename(wht(m.name))),R6e(),clearCommandMemoizationCaches()}else if(f)p.push(f);t.get(m.skillId)?.(A?{ok:!0}:{ok:!1,reason:"download failed"})}),await Zic(s,Xic,(m)=>l(m.name)),eNo(),await p4m({lastUpdated:Date.now(),skills:[...i,...d,...p]}),kn("info","skills_sync_complete",{downloaded:d.length,removed:s.length,duration_ms:Date.now()-e}),logEvent("tengu_skills_sync_success",{downloaded:d.length,removed:s.length,total:n.skills.length,duration_ms:Date.now()-e})}catch{kn("error","skills_sync_unexpected_error",{duration_ms:Date.now()-e}),logEvent("tengu_skills_sync_error",{duration_ms:Date.now()-e})}finally{for(let n of t.values())n({ok:!1,reason:"skills sync failed"});Q1o().resolve()}}
var e2,bD,c4m=600000,Xic=15,u4m="manifest.json",vht=null,nac=null,J1o=null,X1o=null,A4m=500;
var aac=b(()=>{lt();Sf();x6();ok();SA();Lr();sn();M0e();axe();Xt();Mw();Ct();Jic();e9t();e2=require("fs/promises"),bD=require("path")});
export {eac,tac,Q1o,rac,oac,sac,eNo,wVt,iac,d4m,p4m,Z1o,wht,m4m,f4m,Qic,h4m,Zic,dZn,g4m,e2,bD,c4m,Xic,u4m,vht,nac,J1o,X1o,A4m,aac};
