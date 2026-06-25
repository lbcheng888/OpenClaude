// @ts-nocheck
import {clearPluginCache,getPluginCachePath,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {HGn,M5t} from "../src/tools/4454_encoding.ts";
import {OGn,LGn} from "./m4467.ts";
import {clearPluginHookCache,pruneRemovedPluginHooks,e9e} from "./m2778.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {_xn,V4} from "./m3150.ts";
import {DEo,IGn} from "./m4454.ts";
import {Kll,lq} from "./m5221.ts";
import {clearCommandsCache,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {clearAgentDefinitionsCache,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {clearPromptCache,nge} from "../src/tools/2691_getSkillToolInfo.ts";
import {resetSentSkillNames,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {OG,DDe} from "../src/config/4456_path.ts";
import {cn,Ct} from "./m197.ts";
import {eP,rH} from "../src/config/4461_operation.ts";
import {O5t,wEo} from "./m4451.ts";
import {b,oo} from "../runtime.ts";
import {rgo,GKa} from "./m4193.ts";
function Y7p(){clearPluginCache(),HGn(),OGn(),clearPluginHookCache(),pruneRemovedPluginHooks().catch((e)=>Ie(e)),_xn(),DEo(),Kll(),K7p?.()}
function zh(){Y7p(),clearCommandsCache(),clearAgentDefinitionsCache(),clearPromptCache(),resetSentSkillNames()}
async function PDe(e){try{await tne.writeFile(LEo(e),`${Date.now()}`,"utf-8")}catch(t){logForDebugging(`Failed to write .orphaned_at: ${e}: ${t}`)}}
async function Vll(){if(OG())return;try{let e=X7p();if(!e||e.size===0)return;let t=getPluginCachePath(),n=Date.now();await Promise.all([...e].map((r)=>J7p(r)));for(let r of await PGn(t)){let o=B5t.join(t,r);for(let s of await PGn(o)){let i=B5t.join(o,s);for(let a of await PGn(i)){let l=B5t.join(i,a);if(e.has(l))continue;await Q7p(l,n)}await Gll(i)}await Gll(o)}}catch(e){logForDebugging(`Plugin cache cleanup failed: ${e}`)}}
function LEo(e){return B5t.join(e,z7p)}
async function J7p(e){let t=LEo(e);try{await tne.unlink(t)}catch(n){if(cn(n)==="ENOENT")return;logForDebugging(`Failed to remove .orphaned_at: ${e}: ${n}`)}}
function X7p(){try{let e=new Set,t=eP();for(let n of Object.values(t.plugins))for(let r of n)e.add(r.installPath);return e}catch(e){return logForDebugging(`Failed to load installed plugins: ${e}`),null}}
async function Q7p(e,t){let n=LEo(e),r;try{r=(await tne.stat(n)).mtimeMs}catch(o){if(cn(o)==="ENOENT"){await PDe(e);return}logForDebugging(`Failed to stat orphaned marker: ${e}: ${o}`);return}if(t-r>j7p){try{if(await O5t(e)){logForDebugging(`Skipping orphan cleanup, in use by live session: ${e}`);return}}catch(o){logForDebugging(`Failed to check ${e} for live users, skipping cleanup: ${o}`);return}try{await tne.rm(e,{recursive:!0,force:!0})}catch(o){logForDebugging(`Failed to delete orphaned version: ${e}: ${o}`)}}}
async function Gll(e){if((await PGn(e)).length===0)try{await tne.rm(e,{recursive:!0,force:!0})}catch(t){logForDebugging(`Failed to remove empty dir: ${e}: ${t}`)}}
async function PGn(e){try{return(await tne.readdir(e,{withFileTypes:!0})).filter((n)=>n.isDirectory()).map((n)=>n.name)}catch{return[]}}
var tne,B5t,K7p,z7p=".orphaned_at",j7p=1209600000;
var c6=b(()=>{Mm();lq();kg();nge();GA();qe();Ct();vn();wEo();rH();LGn();M5t();e9e();IGn();path();V4();DDe();tne=require("fs/promises"),B5t=require("path"),K7p=(rgo(),oo(GKa)).clearPluginWorkflowCache});
export {Y7p,zh,PDe,Vll,LEo,J7p,X7p,Q7p,Gll,PGn,tne,B5t,K7p,z7p,j7p,c6};
