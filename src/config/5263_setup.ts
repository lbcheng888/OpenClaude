// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {switchSession,getIsNonInteractiveSession,getIsRemoteMode,getSessionId,setOriginalCwd,setProjectRoot,getProjectRoot,lt} from "../session/0132_sent.ts";
import {FT,xS} from "../../vendor/m122.ts";
import {Ed,dl,dn} from "./0137_namespace.ts";
import {g8e,RWn} from "./4413_stopRendezvousServer.ts";
import {captureTeammateModeSnapshotIfEnabled,isAgentSwarmsEnabled,lb} from "./3314_isAgentSwarmsEnabled.ts";
import {SWl,bWl} from "../../vendor/m5261.ts";
import {vRn,p5r} from "../../vendor/m2526.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {markTelemetryString,KO} from "../agent/3295_code.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {setBgExitCause,mK} from "../../vendor/m231.ts";
import {dEi,cve,zM} from "../../vendor/m2240.ts";
import {Mc,W$} from "./3882_entrypoint.ts";
import {e8i,m1t} from "../../vendor/m2777.ts";
import {hasWorktreeCreateHook,kUe} from "../../vendor/m2241.ts";
import {getIsGit,findCanonicalGitRoot,isLinkedWorktree,ia} from "../../vendor/m698.ts";
import {nDe,Dw} from "../core/5176_encoding.ts";
import {isTmuxControlMode,Po} from "../../vendor/m638.ts";
import {generateTmuxSessionName,worktreeBranchName,createWorktreeForSession,createTmuxSessionForWorktree,qI} from "../session/5205_worktreeBranchName.ts";
import {logEvent,kt} from "../../vendor/m132.ts";
import {saveWorktreeState,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {clearMemoryFileCaches,ZR} from "./2729_stripHtmlComments.ts";
import {hWl,P1o} from "../../vendor/m5260.ts";
import {cqe} from "./3778_level.ts";
import {profileCheckpoint,z9} from "../session/0243_profileReport.ts";
import {Ne} from "../../vendor/m583.ts";
import {getCommands,Mm} from "../tools/5174_toSlashCommands.ts";
import {e9e,hzr} from "../../vendor/m2778.ts";
import {dSo,Vrl} from "../tools/4377_registerSessionFileAccessHooks.ts";
import {checkHasTrustDialogAccepted,getGlobalConfig,getCurrentProjectConfig,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {N8n,M8n} from "../telemetry/4376_stopMemoryWatcher.ts";
import {initSinks,tGe} from "../../vendor/m5121.ts";
import {prefetchApiKeyFromApiKeyHelperIfSafe,lo} from "./2036_withOAuthRefreshLock.ts";
import {getSettings_DEPRECATED,getSettingsForSource,br} from "./0745_updateSettingsForSource.ts";
import {_setProxyAuthHelperConfig,prefetchProxyAuthFromHelperIfSafe,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {CRl,CWe} from "../../vendor/m4794.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {qe} from "./0236_setHasFormattedOutput.ts";
import {rI} from "./0586_rI.ts";
import {Ir} from "../../vendor/m584.ts";
import {E8} from "./2192_terminal.ts";
import {rY} from "../../vendor/m3778.ts";
var uZn={};
ft(uZn,{setup:()=>setup,isDesktopEntrypointExempted:()=>isDesktopEntrypointExempted});
async function setup(e,t,n,r,o,s,i,a,l){wn("info","setup_started");let c=process.version.match(/^v(\d+)\./)?.[1];if(!c||parseInt(c)<18)console.error(bt.bold.red("Error: Claude Code requires Node.js version 18 or higher.")),process.exit(1);if(i)switchSession(FT(i),"startup_custom_id");if(!Ed()||l!==void 0);if(process.env.CLAUDE_BG_BACKEND==="daemon"){let{startRendezvousServer:h}=await Promise.resolve().then(() => (g8e(),RWn));h()}if(await captureTeammateModeSnapshotIfEnabled(),!getIsNonInteractiveSession()){if(isAgentSwarmsEnabled()){let h=await SWl();if(h.status==="restored")console.log(bt.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));else if(h.status==="failed")console.error(bt.red(`Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${h.backupPath}.`))}try{let h=await vRn();if(h.status==="restored")console.log(bt.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));else if(h.status==="failed")console.error(bt.red(`Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${h.backupPath}.`))}catch(h){Ie(h)}}try{markTelemetryString(e)}catch(h){process.stderr.write(bt.red(`Error: Can't access working directory ${bt.bold(e)}: ${Ce(h)}
`)),setBgExitCause("setcwd"),process.exit(1)}let u=performance.now();if(dEi(),Mc("setup_hooks_snapshot_ms",performance.now()-u,u),wn("info","setup_hooks_captured",{duration_ms:Math.round(performance.now()-u)}),!getIsRemoteMode()){let h=performance.now();e8i(e),Mc("setup_file_watcher_ms",performance.now()-h,h)}let d=performance.now();if(r){let h=hasWorktreeCreateHook(),g=await getIsGit();if(!h&&!g)process.stderr.write(bt.red(`Error: Can only use --worktree in a git repository, but ${bt.bold(e)} is not a git repository. Configure a WorktreeCreate hook in settings.json to use --worktree with other VCS systems.
`)),process.exit(1);let _=a?`pr-${a}`:o??nDe(),T;if(g){let S=findCanonicalGitRoot(isTmuxControlMode());if(!S)process.stderr.write(bt.red(`Error: Could not determine the main git repository root.
`)),process.exit(1);if(isLinkedWorktree(isTmuxControlMode()))wn("info","worktree_resolved_to_main_repo"),process.chdir(S),markTelemetryString(S);T=s?generateTmuxSessionName(S,worktreeBranchName(_)):void 0}else T=s?generateTmuxSessionName(isTmuxControlMode(),worktreeBranchName(_)):void 0;let y;try{y=await createWorktreeForSession(getSessionId(),_,T,{prNumber:a,fromCwd:e})}catch(S){process.stderr.write(bt.red(`Error creating worktree: ${Ce(S)}
`)),setBgExitCause("worktree_create"),process.exit(1)}if(logEvent("tengu_worktree_created",{tmux_enabled:s}),s&&T){let S=await createTmuxSessionForWorktree(T,y.worktreePath);if(S.created)console.log(bt.green(`Created tmux session: ${bt.bold(T)}
To attach: ${bt.bold(`tmux attach -t ${T}`)}`));else console.error(bt.yellow(`Warning: Failed to create tmux session: ${S.error}`))}process.chdir(y.worktreePath),markTelemetryString(y.worktreePath),setOriginalCwd(isTmuxControlMode()),setProjectRoot(isTmuxControlMode()),saveWorktreeState(y),clearMemoryFileCaches(),cve(),Mc("setup_worktree_ms",performance.now()-d,d)}if(wn("info","setup_background_jobs_starting"),!Ed())try{hWl()}catch(h){Ie(h)}cqe(),wn("info","setup_background_jobs_launched"),profileCheckpoint("setup_before_prefetch"),wn("info","setup_prefetch_starting");let p=getIsNonInteractiveSession()&&Ne.CLAUDE_CODE_SYNC_PLUGIN_INSTALL||Ed()||dl();if(!p)getCommands(getProjectRoot());if(Promise.resolve().then(() => (e9e(),hzr)).then((h)=>{if(!p)h.loadPluginHooks(),h.setupPluginHookHotReload()}),!Ed()){if(Promise.resolve().then(() => (dSo(),Vrl)).then((h)=>h.registerSessionFileAccessHooks()),!getIsRemoteMode()&&checkHasTrustDialogAccepted())Promise.resolve().then(() => (N8n(),M8n)).then((h)=>h.startMemoryWatcher())}initSinks(),logEvent("tengu_started",{}),prefetchApiKeyFromApiKeyHelperIfSafe(getIsNonInteractiveSession());let m=(getSettings_DEPRECATED()||{}).proxyAuthHelper;if(_setProxyAuthHelperConfig({helper:m,fromProjectOrLocal:getSettingsForSource("projectSettings")?.proxyAuthHelper===m||getSettingsForSource("localSettings")?.proxyAuthHelper===m,trustAccepted:checkHasTrustDialogAccepted}),prefetchProxyAuthFromHelperIfSafe(),profileCheckpoint("setup_after_prefetch"),!Ed()){let h=performance.now();await CRl(getGlobalConfig().lastReleaseNotesSeen),Mc("setup_release_notes_ms",performance.now()-h,h)}if(t==="bypassPermissions"||n){if(typeof process.getuid==="function"&&process.getuid()===0&&process.env.IS_SANDBOX!=="1"&&!Ne.CLAUDE_CODE_BUBBLEWRAP)console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons"),process.exit(1)}let f=getCurrentProjectConfig();if(f.lastCost!==void 0&&f.lastDuration!==void 0)logEvent("tengu_exit",{last_session_cost:f.lastCost,last_session_api_duration:f.lastAPIDuration,last_session_tool_duration:f.lastToolDuration,last_session_duration:f.lastDuration,last_session_lines_added:f.lastLinesAdded,last_session_lines_removed:f.lastLinesRemoved,last_session_total_input_tokens:f.lastTotalInputTokens,last_session_total_output_tokens:f.lastTotalOutputTokens,last_session_total_cache_creation_input_tokens:f.lastTotalCacheCreationInputTokens,last_session_total_cache_read_input_tokens:f.lastTotalCacheReadInputTokens,last_session_fps_average:f.lastFpsAverage,last_session_fps_low_1_pct:f.lastFpsLow1Pct,last_session_graceful_shutdown:f.lastGracefulShutdown??!1,last_session_version_base:f.lastVersionBase??"unknown",last_session_id:xr(f.lastSessionId),...f.lastSessionMetrics})}
function isDesktopEntrypointExempted(e){return!1}
var dZn=b(()=>{Gc();kt();QT();Po();CWe();KO();tGe();lt();Mm();mK();P1o();xS();lb();p5r();lo();ZR();tr();qe();pf();rI();Ir();E8();dn();Ct();ia();m1t();kUe();zM();bWl();vn();rY();Dw();ey();_a();br();z9();W$();qI()});
export {uZn,setup,isDesktopEntrypointExempted,dZn};
