// @ts-nocheck
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {deriveBackgroundSeed,spawnBackgroundFork,Cko} from "../tui/5134_spawnBackgroundFork.ts";
import {isTranscriptPersistenceDisabled,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {SMo,BQl,FQl} from "../../vendor/m5539.ts";
import {getCurrentWorktreeSession} from "../config/3332_flushAnalyticsSinks.ts";
import {preSeedReplBgJob,T5t} from "../session/5133_withStdinPositional.ts";
import {getOriginalCwd,getMemoryToggledOff,lt} from "../session/0131_sent.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {ES,EU} from "../../vendor/m4256.ts";
import {withTimeout} from "./1483_withTimeout.ts";
import {Bwe,mg} from "../agent/2580_level.ts";
import {De,Rn} from "../session/0615_length.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {zDe,c8t} from "../config/4894_cmd.ts";
import {eve,r5} from "./2034_CLAUDE_AX_SCREEN_READER.ts";
import {b} from "../../runtime.ts";
import {hI} from "../session/5172_worktreeBranchName.ts";
async function qQl(e,t,n,r,o,s,i){logForDebugging("[PERF:bg-leftarrow-start]");let a=deriveBackgroundSeed(e,"");if(a!==null&&isTranscriptPersistenceDisabled())return"Cannot open agents \u2014 session persistence is disabled, so this conversation cannot be backgrounded.";if(a&&!a.name&&i)a.name=i,a.nameSource="auto";let l=a??{intent:""},c=SMo(),u=UQl.randomUUID(),d=getCurrentWorktreeSession(),p=Boolean(d&&!d.enteredExisting),m,f;try{({short:m,jobDir:f}=await preSeedReplBgJob(u,{...l,cwd:d?.worktreePath??getOriginalCwd(),worktree:p?{path:d.worktreePath,branch:d.worktreeBranch,hookBased:d.hookBased??!1,originCwd:d.originalCwd}:void 0,sessionPermissionRules:(o.session?.length??0)>0||(s.session?.length??0)>0?{allow:[...o.session??[]],deny:[...s.session??[]]}:void 0,memoryToggledOff:getMemoryToggledOff()||void 0}))}catch(h){return`Cannot open agents \u2014 ${h instanceof Error?h.message:String(h)}`}logEvent("tengu_open_agents_via_left",{was_empty:a===null});let A=ES();if(A)await withTimeout(A.flush(),2000,"bridge flush").catch(()=>{}),A.teardown({skipArchive:!0});if(spawnBackgroundFork(l,null,t,n,r,o,s,"left_arrow",e,{providedSessionId:u,extraEnv:Bwe(A?.bridgeSessionId,A?.getLastSequenceNum(),A?.outboundOnly)}).then((h)=>{if(!h.ok){if(!h.queued)$Ql.rm(f,{recursive:!0,force:!0}).catch(()=>{});if(h.reason===void 0||h.reason==="spawn_failed_unknown"||h.reason.startsWith("spawn_failed_ERR_"))De(Error(`background spawn failed: ${h.error}`));else logForDebugging(`background spawn failed: ${h.error}`,{level:"warn"})}}).catch(De),getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_leftarrow_inprocess",!0))try{return await BQl(m,c)}catch(h){De(h)}return zDe({args:["agents"],env:{CLAUDE_AGENTS_SELECT:m,...eve()}})}
var UQl,$Ql;
var jQl=b(()=>{lt();EU();T5t();mg();zn();Ct();qe();Rn();c8t();r5();ja();hI();Cko();FQl();UQl=require("crypto"),$Ql=require("fs/promises")});
export {qQl,UQl,$Ql,jQl};
