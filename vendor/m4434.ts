// @ts-nocheck
import {ax,getPluginCachePath,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {cjn,uqt} from "../src/tools/4432_encoding.ts";
import {fjn,Ajn} from "./m4445.ts";
import {clearPluginHookCache,pruneRemovedPluginHooks,z2e} from "./m2766.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {xkn,Hq} from "./m3140.ts";
import {Bgo,ujn} from "./m4432.ts";
import {inl,Vq} from "./m5187.ts";
import {clearCommandsCache,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {clearAgentDefinitionsCache,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {clearPromptCache,SRe} from "../src/tools/2680_getSkillToolInfo.ts";
import {resetSentSkillNames,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {gG,M0e} from "../src/config/4434_path.ts";
import {dn,bt} from "./m195.ts";
import {MP,Mk} from "../src/config/4439_operation.ts";
import {lqt,Pgo} from "./m4429.ts";
import {b,ro} from "../runtime.ts";
import {fdo,N6a} from "./m4180.ts";
function pqp(){ax(),cjn(),fjn(),clearPluginHookCache(),pruneRemovedPluginHooks().catch((e)=>De(e)),xkn(),Bgo(),inl(),cqp?.()}
function react(){pqp(),clearCommandsCache(),clearAgentDefinitionsCache(),clearPromptCache(),resetSentSkillNames()}
async function N0e(e){try{await cne.writeFile($go(e),`${Date.now()}`,"utf-8")}catch(t){logForDebugging(`Failed to write .orphaned_at: ${e}: ${t}`)}}
async function snl(){if(gG())return;try{let e=fqp();if(!e||e.size===0)return;let t=getPluginCachePath(),n=Date.now();await Promise.all([...e].map((r)=>mqp(r)));for(let r of await mjn(t)){let o=mqt.join(t,r);for(let s of await mjn(o)){let i=mqt.join(o,s);for(let a of await mjn(i)){let l=mqt.join(i,a);if(e.has(l))continue;await Aqp(l,n)}await onl(i)}await onl(o)}}catch(e){logForDebugging(`Plugin cache cleanup failed: ${e}`)}}
function $go(e){return mqt.join(e,uqp)}
async function mqp(e){let t=$go(e);try{await cne.unlink(t)}catch(n){if(dn(n)==="ENOENT")return;logForDebugging(`Failed to remove .orphaned_at: ${e}: ${n}`)}}
function fqp(){try{let e=new Set,t=MP();for(let n of Object.values(t.plugins))for(let r of n)e.add(r.installPath);return e}catch(e){return logForDebugging(`Failed to load installed plugins: ${e}`),null}}
async function Aqp(e,t){let n=$go(e),r;try{r=(await cne.stat(n)).mtimeMs}catch(o){if(dn(o)==="ENOENT"){await N0e(e);return}logForDebugging(`Failed to stat orphaned marker: ${e}: ${o}`);return}if(t-r>dqp){try{if(await lqt(e)){logForDebugging(`Skipping orphan cleanup, in use by live session: ${e}`);return}}catch(o){logForDebugging(`Failed to check ${e} for live users, skipping cleanup: ${o}`);return}try{await cne.rm(e,{recursive:!0,force:!0})}catch(o){logForDebugging(`Failed to delete orphaned version: ${e}: ${o}`)}}}
async function onl(e){if((await mjn(e)).length===0)try{await cne.rm(e,{recursive:!0,force:!0})}catch(t){logForDebugging(`Failed to remove empty dir: ${e}: ${t}`)}}
async function mjn(e){try{return(await cne.readdir(e,{withFileTypes:!0})).filter((n)=>n.isDirectory()).map((n)=>n.name)}catch{return[]}}
var cne,mqt,cqp,uqp=".orphaned_at",dqp=1209600000;
var W6=b(()=>{Sf();Vq();scrubPathsConfig();SRe();Bv();qe();bt();Rn();Pgo();Mk();Ajn();uqt();z2e();ujn();gg();Hq();M0e();cne=require("fs/promises"),mqt=require("path"),cqp=(fdo(),ro(N6a)).clearPluginWorkflowCache});
export {pqp,react,N0e,snl,$go,mqp,fqp,Aqp,onl,mjn,cne,mqt,cqp,uqp,dqp,W6};
