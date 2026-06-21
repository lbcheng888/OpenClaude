// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Udo,r8a} from "./m4207.ts";
import {i8a,s8a} from "./m4208.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {isInsideTmux,isInITerm2,isIt2CliAvailable,isTmuxAvailable,isInsideTmuxSync,Tte} from "./m3877.ts";
import {Ie,isTmuxControlMode,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {zja,Ndo} from "./m4204.ts";
import {zt,qs} from "./m635.ts";
import {getTeammateModeFromSnapshot,vke} from "./m3296.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0131_sent.ts";
import {Uja,$ja} from "../src/api/4204_success.ts";
import {Qja,Zja} from "./m4206.ts";
var xDa={};
isFullscreenWithTTY(xDa,{resetBackendDetection:()=>resetBackendDetection,registerTmuxBackend:()=>registerTmuxBackend,registerITermBackend:()=>registerITermBackend,markInProcessFallback:()=>markInProcessFallback,isInProcessEnabled:()=>isInProcessEnabled,globalBackendRegistry:()=>globalBackendRegistry,getTeammateExecutor:()=>getTeammateExecutor,getResolvedTeammateMode:()=>getResolvedTeammateMode,getInProcessBackend:()=>getInProcessBackend,getCachedDetectionResult:()=>getCachedDetectionResult,getCachedBackend:()=>getCachedBackend,getBackendByType:()=>getBackendByType,ensureBackendsRegistered:()=>ensureBackendsRegistered,detectAndGetBackend:()=>detectAndGetBackend,createBackendRegistry:()=>createBackendRegistry});
function createBackendRegistry(){return{cachedBackend:null,cachedDetectionResult:null,backendsRegistered:!1,cachedInProcessBackend:null,cachedPaneBackendExecutor:null,inProcessFallbackActive:!1,TmuxBackendClass:null,ITermBackendClass:null}}
async function ensureBackendsRegistered(e=globalBackendRegistry){if(e.backendsRegistered)return;await Promise.resolve().then(() => (Udo(),r8a)),await Promise.resolve().then(() => (i8a(),s8a)),e.TmuxBackendClass=globalBackendRegistry.TmuxBackendClass,e.ITermBackendClass=globalBackendRegistry.ITermBackendClass,e.backendsRegistered=!0}
function registerTmuxBackend(e,t=globalBackendRegistry){t.TmuxBackendClass=e}
function registerITermBackend(e,t=globalBackendRegistry){logForDebugging(`[registry] registerITermBackend called, class=${e?.name||"undefined"}`),t.ITermBackendClass=e}
function f3n(e){if(!e.TmuxBackendClass)throw Error("TmuxBackend not registered. Import TmuxBackend.ts before using the registry.");return new e.TmuxBackendClass}
function l8a(e){if(!e.ITermBackendClass)throw Error("ITermBackend not registered. Import ITermBackend.ts before using the registry.");return new e.ITermBackendClass}
async function detectAndGetBackend(e=globalBackendRegistry){if(await ensureBackendsRegistered(e),e.cachedDetectionResult)return logForDebugging(`[BackendRegistry] Using cached backend: ${e.cachedDetectionResult.backend.type}`),e.cachedDetectionResult;logForDebugging("[BackendRegistry] Starting backend detection...");let t=await isInsideTmux(),n=isInITerm2();if(logForDebugging(`[BackendRegistry] Environment: insideTmux=${t}, inITerm2=${n}`),t){logForDebugging("[BackendRegistry] Selected: tmux (running inside tmux session)");let o=f3n(e);return e.cachedBackend=o,e.cachedDetectionResult={backend:o,isNative:!0,needsIt2Setup:!1},Ie("swarm_backend_detect"),e.cachedDetectionResult}if(n){let o=zja();if(o)logForDebugging("[BackendRegistry] User prefers tmux over iTerm2, skipping iTerm2 detection");else{let i=await isIt2CliAvailable();if(logForDebugging(`[BackendRegistry] iTerm2 detected, it2 CLI available: ${i}`),i){logForDebugging("[BackendRegistry] Selected: iterm2 (native iTerm2 with it2 CLI)");let a=l8a(e);return e.cachedBackend=a,e.cachedDetectionResult={backend:a,isNative:!0,needsIt2Setup:!1},Ie("swarm_backend_detect"),e.cachedDetectionResult}}let s=await isTmuxAvailable();if(logForDebugging(`[BackendRegistry] it2 not available, tmux available: ${s}`),s){logForDebugging("[BackendRegistry] Selected: tmux (fallback in iTerm2, it2 setup recommended)");let i=f3n(e);return e.cachedBackend=i,e.cachedDetectionResult={backend:i,isNative:!1,needsIt2Setup:!o},isTmuxControlMode("swarm_backend_detect",o?"fallback_to_tmux":"needs_it2_setup"),e.cachedDetectionResult}throw logForDebugging("[BackendRegistry] ERROR: iTerm2 detected but no it2 CLI and no tmux"),Oe("swarm_backend_detect","iterm2_no_it2_no_tmux"),Error("iTerm2 detected but it2 CLI not installed. Install it2 with: pip install it2")}let r=await isTmuxAvailable();if(logForDebugging(`[BackendRegistry] Not in tmux or iTerm2, tmux available: ${r}`),r){logForDebugging("[BackendRegistry] Selected: tmux (external session mode)");let o=f3n(e);return e.cachedBackend=o,e.cachedDetectionResult={backend:o,isNative:!1,needsIt2Setup:!1},Ie("swarm_backend_detect"),e.cachedDetectionResult}throw logForDebugging("[BackendRegistry] ERROR: No pane backend available"),Oe("swarm_backend_detect","no_backend_available"),Error(CDp())}
function CDp(){switch(zt()){case"macos":return`To use agent swarms, install tmux:
  brew install tmux
Then start a tmux session with: tmux new-session -s claude`;case"linux":case"wsl":return`To use agent swarms, install tmux:
  sudo apt install tmux    # Ubuntu/Debian
  sudo dnf install tmux    # Fedora/RHEL
Then start a tmux session with: tmux new-session -s claude`;case"windows":return`To use agent swarms, you need tmux which requires WSL (Windows Subsystem for Linux).
Install WSL first, then inside WSL run:
  sudo apt install tmux
Then start a tmux session with: tmux new-session -s claude`;default:return`To use agent swarms, install tmux using your system's package manager.
Then start a tmux session with: tmux new-session -s claude`}}
function getBackendByType(e,t=globalBackendRegistry){switch(e){case"tmux":return f3n(t);case"iterm2":return l8a(t)}}
function getCachedBackend(e=globalBackendRegistry){return e.cachedBackend}
function getCachedDetectionResult(e=globalBackendRegistry){return e.cachedDetectionResult}
function markInProcessFallback(e=globalBackendRegistry){logForDebugging("[BackendRegistry] Marking in-process fallback as active"),e.inProcessFallbackActive=!0}
function wDp(){return getTeammateModeFromSnapshot()}
function isInProcessEnabled(e=globalBackendRegistry){if(getIsNonInteractiveSession())return logForDebugging("[BackendRegistry] isInProcessEnabled: true (non-interactive session)"),!0;let t=wDp(),n;if(t==="in-process")n=!0;else if(t==="tmux")n=!1;else{if(e.inProcessFallbackActive)return logForDebugging("[BackendRegistry] isInProcessEnabled: true (fallback after pane backend unavailable)"),!0;let r=isInsideTmuxSync(),o=isInITerm2();n=!r&&!o}return logForDebugging(`[BackendRegistry] isInProcessEnabled: ${n} (mode=${t}, insideTmux=${isInsideTmuxSync()}, inITerm2=${isInITerm2()})`),n}
function getResolvedTeammateMode(e=globalBackendRegistry){return isInProcessEnabled(e)?"in-process":"tmux"}
function getInProcessBackend(e=globalBackendRegistry){if(!e.cachedInProcessBackend)e.cachedInProcessBackend=Uja();return e.cachedInProcessBackend}
async function getTeammateExecutor(e=!1,t=globalBackendRegistry){if(e&&isInProcessEnabled(t))return logForDebugging("[BackendRegistry] Using in-process executor"),getInProcessBackend(t);return logForDebugging("[BackendRegistry] Using pane backend executor"),kDp(t)}
async function kDp(e){if(!e.cachedPaneBackendExecutor){let t=await detectAndGetBackend(e);e.cachedPaneBackendExecutor=Qja(t.backend),logForDebugging(`[BackendRegistry] Created PaneBackendExecutor wrapping ${t.backend.type}`)}return e.cachedPaneBackendExecutor}
function resetBackendDetection(e=globalBackendRegistry){e.cachedBackend=null,e.cachedDetectionResult=null,e.cachedInProcessBackend=null,e.cachedPaneBackendExecutor=null,e.backendsRegistered=!1,e.inProcessFallbackActive=!1}
var globalBackendRegistry;
var VHe=b(()=>{lt();ln();qe();qs();Tte();$ja();Ndo();Zja();vke();globalBackendRegistry=createBackendRegistry()});
export {xDa,createBackendRegistry,ensureBackendsRegistered,registerTmuxBackend,registerITermBackend,f3n,l8a,detectAndGetBackend,CDp,getBackendByType,getCachedBackend,getCachedDetectionResult,markInProcessFallback,wDp,isInProcessEnabled,getResolvedTeammateMode,getInProcessBackend,getTeammateExecutor,kDp,resetBackendDetection,globalBackendRegistry,VHe};
