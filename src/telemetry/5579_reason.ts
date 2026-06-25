// @ts-nocheck
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {deriveBackgroundSeed,spawnBackgroundFork,LPo} from "../tui/5166_spawnBackgroundFork.ts";
import {isTranscriptPersistenceDisabled,flushSessionStorage,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {logEvent,kt} from "../../vendor/m132.ts";
import {Ve,pre,Le} from "../../vendor/m5.ts";
import {VUo,Rac,vac} from "../../vendor/m5577.ts";
import {getCurrentWorktreeSession} from "../config/3348_flushAnalyticsSinks.ts";
import {preSeedReplBgJob,qVt} from "../session/5163_withStdinPositional.ts";
import {getOriginalCwd,getMemoryToggledOff,lt} from "../session/0132_sent.ts";
import {nXn,rXn,sXn,jVt,iXn} from "../../vendor/m5164.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {withTimeout} from "./1488_withTimeout.ts";
import {Ewe,Pf} from "../agent/2591_level.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {jPe,xGt} from "../config/4924_cmd.ts";
import {NRe,y8} from "./2039_CLAUDE_AX_SCREEN_READER.ts";
import {b} from "../../runtime.ts";
import {qI} from "../session/5205_worktreeBranchName.ts";
async function Hac(e,t,n,r,o,s,i,a){logForDebugging("[PERF:bg-leftarrow-start]");let l=deriveBackgroundSeed(e,"");if(l!==null&&isTranscriptPersistenceDisabled())return logEvent("tengu_left_arrow_blocked",{reason:Ve("persistence"),inflight_count:a?.inflightCount??0,inflight_kinds:pre(a?.inflightKinds??[])}),"Cannot open agents \u2014 session persistence is disabled, so this conversation cannot be backgrounded.";if(l&&!l.name&&i)l.name=i,l.nameSource="auto";let c=l??{intent:""},u=VUo(),d=wac.randomUUID(),p=getCurrentWorktreeSession(),m=Boolean(p&&!p.enteredExisting),f,h;try{({short:f,jobDir:h}=await preSeedReplBgJob(d,{...c,cwd:p?.worktreePath??getOriginalCwd(),worktree:m?{path:p.worktreePath,branch:p.worktreeBranch,hookBased:p.hookBased??!1,originCwd:p.originalCwd}:void 0,sessionPermissionRules:(o.session?.length??0)>0||(s.session?.length??0)>0?{allow:[...o.session??[]],deny:[...s.session??[]]}:void 0,memoryToggledOff:getMemoryToggledOff()||void 0}))}catch(T){return`Cannot open agents \u2014 ${T instanceof Error?T.message:String(T)}`}let g=null;if(a?.taskRegistry){if(g=await nXn(a.taskRegistry.all()),g)try{await rXn(h,g.payload),await g.checkpointAgents(a.taskRegistry),g.disown(a.taskRegistry)}catch(T){logForDebugging(`[adopt] write failed: ${T}`,{level:"warn"}),g=null}}logEvent("tengu_open_agents_via_left",{was_empty:l===null,via:Le(a?.via??"idle-fork"),confirmed_interstitial:a?.confirmedInterstitial??!1,inflight_count:a?.inflightCount??0,inflight_kinds:pre(a?.inflightKinds??[]),restartable_count:a?.restartableCount??0,partial_chars:a?.partialChars??0,defer_wait_ms:a?.deferWaitMs??0,...sXn(g?.payload)});let _=yS();if(_){let T=a?.replyOnResume?5000:2000;await withTimeout(_.flush(),T,"bridge flush").catch(()=>{logEvent("tengu_bg_bridge_flush_truncated",{via:Le(a?.via??"idle-fork"),cap_ms:T})}),_.teardown({skipArchive:!0})}if(a?.abortAfterFlush)await withTimeout(flushSessionStorage(),2000,"flush timeout").catch(()=>{});if(spawnBackgroundFork(c,null,t,n,r,o,s,"left_arrow",e,{providedSessionId:d,replyOnResume:a?.replyOnResume,extraEnv:Ewe(_?.bridgeSessionId,_?.getLastSequenceNum(),_?.outboundOnly)}).then((T)=>{if(!T.ok){if(!T.queued)g?.abandon(),Iyt.rm(h,{recursive:!0,force:!0}).catch(()=>{});else if(g){let y=kac.join(h,"adopt.json"),S=()=>Iyt.rename(y,`${y}.expired`).then(()=>(g?.abandon(),Iyt.unlink(`${y}.expired`).then(()=>{},()=>{})),()=>{}),E=Math.max(0,jVt-5000-(Date.now()-g.payload.writtenAtMs)),R=Si(S);setTimeout((w,H)=>{w(),H()},E,R,S).unref()}if(T.reason===void 0||T.reason==="spawn_failed_unknown"||T.reason.startsWith("spawn_failed_ERR_"))Ie(Error(`background spawn failed: ${T.error}`));else logForDebugging(`background spawn failed: ${T.error}`,{level:"warn"})}}).catch(Ie),a?.abortAfterFlush?.abort("background"),getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_leftarrow_inprocess",!0))try{return await Rac(f,u)}catch(T){Ie(T)}return jPe({args:["agents"],env:{CLAUDE_AGENTS_SELECT:f,...NRe()}})}
var wac,Iyt,kac;
var Iac=b(()=>{lt();WB();qVt();Pf();jn();kt();ud();qe();vn();xGt();y8();_a();qI();iXn();LPo();vac();wac=require("crypto"),Iyt=require("fs/promises"),kac=require("path")});
export {Hac,wac,Iyt,kac,Iac};
