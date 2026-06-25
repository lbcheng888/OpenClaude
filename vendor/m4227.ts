// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Mgo,Eza} from "./m4225.ts";
import {Rza,Aza} from "./m4226.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getTeammateModeFromSnapshot,pIe} from "./m3312.ts";
import {isInITerm2,isIt2CliAvailable,isInsideTmux,isTmuxAvailable,isInsideTmuxSync,hte} from "./m3895.ts";
import {xe,He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {mza,Igo} from "./m4221.ts";
import {Yt,Es} from "./m641.ts";
import {getIsNonInteractiveSession,lt} from "../src/session/0132_sent.ts";
import {sza,iza} from "../src/api/4221_success.ts";
import {_za,yza} from "./m4224.ts";
var ZFa={};
ft(ZFa,{resetBackendDetection:()=>resetBackendDetection,registerTmuxBackend:()=>registerTmuxBackend,registerITermBackend:()=>registerITermBackend,markInProcessFallback:()=>markInProcessFallback,isInProcessEnabled:()=>isInProcessEnabled,globalBackendRegistry:()=>globalBackendRegistry,getTeammateExecutor:()=>getTeammateExecutor,getResolvedTeammateMode:()=>getResolvedTeammateMode,getInProcessBackend:()=>getInProcessBackend,getCachedDetectionResult:()=>getCachedDetectionResult,getCachedBackend:()=>getCachedBackend,getBackendByType:()=>getBackendByType,ensureBackendsRegistered:()=>ensureBackendsRegistered,detectAndGetBackend:()=>detectAndGetBackend,createBackendRegistry:()=>createBackendRegistry});
function createBackendRegistry(){return{cachedBackend:null,cachedDetectionResult:null,backendsRegistered:!1,cachedInProcessBackend:null,cachedPaneBackendExecutor:null,inProcessFallbackActive:!1,TmuxBackendClass:null,ITermBackendClass:null}}
async function ensureBackendsRegistered(e=globalBackendRegistry){if(e.backendsRegistered)return;await Promise.resolve().then(() => (Mgo(),Eza)),await Promise.resolve().then(() => (Rza(),Aza)),e.TmuxBackendClass=globalBackendRegistry.TmuxBackendClass,e.ITermBackendClass=globalBackendRegistry.ITermBackendClass,e.backendsRegistered=!0}
function registerTmuxBackend(e,t=globalBackendRegistry){t.TmuxBackendClass=e}
function registerITermBackend(e,t=globalBackendRegistry){logForDebugging(`[registry] registerITermBackend called, class=${e?.name||"undefined"}`),t.ITermBackendClass=e}
function S6n(e){if(!e.TmuxBackendClass)throw Error("TmuxBackend not registered. Import TmuxBackend.ts before using the registry.");return new e.TmuxBackendClass}
function Ugo(e){if(!e.ITermBackendClass)throw Error("ITermBackend not registered. Import ITermBackend.ts before using the registry.");return new e.ITermBackendClass}
async function detectAndGetBackend(e=globalBackendRegistry){if(await ensureBackendsRegistered(e),e.cachedDetectionResult)return logForDebugging(`[BackendRegistry] Using cached backend: ${e.cachedDetectionResult.backend.type}`),e.cachedDetectionResult;if(logForDebugging("[BackendRegistry] Starting backend detection..."),getTeammateModeFromSnapshot()==="iterm2"){if(!isInITerm2())throw xe("swarm_backend_detect","iterm2_explicit_not_in_iterm2"),Error('teammateMode is set to "iterm2" but this session is not running inside iTerm2. Launch Claude from iTerm2, or change teammateMode in settings.');if(!await isIt2CliAvailable())throw xe("swarm_backend_detect","iterm2_explicit_no_it2"),Error('teammateMode is set to "iterm2" but the it2 CLI is not reachable. Install it with `pip install it2` and enable the Python API in iTerm2 (Preferences > General > Magic > Enable Python API).');logForDebugging("[BackendRegistry] Selected: iterm2 (explicit teammateMode)");let o=Ugo(e);return e.cachedBackend=o,e.cachedDetectionResult={backend:o,isNative:!0,needsIt2Setup:!1},He("swarm_backend_detect"),e.cachedDetectionResult}let t=await isInsideTmux(),n=isInITerm2();if(logForDebugging(`[BackendRegistry] Environment: insideTmux=${t}, inITerm2=${n}`),t){logForDebugging("[BackendRegistry] Selected: tmux (running inside tmux session)");let o=S6n(e);return e.cachedBackend=o,e.cachedDetectionResult={backend:o,isNative:!0,needsIt2Setup:!1},He("swarm_backend_detect"),e.cachedDetectionResult}if(n){let o=mza();if(o)logForDebugging("[BackendRegistry] User prefers tmux over iTerm2, skipping iTerm2 detection");else{let i=await isIt2CliAvailable();if(logForDebugging(`[BackendRegistry] iTerm2 detected, it2 CLI available: ${i}`),i){logForDebugging("[BackendRegistry] Selected: iterm2 (native iTerm2 with it2 CLI)");let a=Ugo(e);return e.cachedBackend=a,e.cachedDetectionResult={backend:a,isNative:!0,needsIt2Setup:!1},He("swarm_backend_detect"),e.cachedDetectionResult}}let s=await isTmuxAvailable();if(logForDebugging(`[BackendRegistry] it2 not available, tmux available: ${s}`),s){logForDebugging("[BackendRegistry] Selected: tmux (fallback in iTerm2, it2 setup recommended)");let i=S6n(e);return e.cachedBackend=i,e.cachedDetectionResult={backend:i,isNative:!1,needsIt2Setup:!o},Pt("swarm_backend_detect",o?"fallback_to_tmux":"needs_it2_setup"),e.cachedDetectionResult}throw logForDebugging("[BackendRegistry] ERROR: iTerm2 detected but no it2 CLI and no tmux"),xe("swarm_backend_detect","iterm2_no_it2_no_tmux"),Error("iTerm2 detected but it2 CLI not installed. Install it2 with: pip install it2")}let r=await isTmuxAvailable();if(logForDebugging(`[BackendRegistry] Not in tmux or iTerm2, tmux available: ${r}`),r){logForDebugging("[BackendRegistry] Selected: tmux (external session mode)");let o=S6n(e);return e.cachedBackend=o,e.cachedDetectionResult={backend:o,isNative:!1,needsIt2Setup:!1},He("swarm_backend_detect"),e.cachedDetectionResult}throw logForDebugging("[BackendRegistry] ERROR: No pane backend available"),xe("swarm_backend_detect","no_backend_available"),Error(qBp())}
function qBp(){switch(Yt()){case"macos":return`To use agent swarms, install tmux:
  brew install tmux
Then start a tmux session with: tmux new-session -s claude`;case"linux":case"wsl":return`To use agent swarms, install tmux:
  sudo apt install tmux    # Ubuntu/Debian
  sudo dnf install tmux    # Fedora/RHEL
Then start a tmux session with: tmux new-session -s claude`;case"windows":return`To use agent swarms, you need tmux which requires WSL (Windows Subsystem for Linux).
Install WSL first, then inside WSL run:
  sudo apt install tmux
Then start a tmux session with: tmux new-session -s claude`;default:return`To use agent swarms, install tmux using your system's package manager.
Then start a tmux session with: tmux new-session -s claude`}}
function getBackendByType(e,t=globalBackendRegistry){switch(e){case"tmux":return S6n(t);case"iterm2":return Ugo(t)}}
function getCachedBackend(e=globalBackendRegistry){return e.cachedBackend}
function getCachedDetectionResult(e=globalBackendRegistry){return e.cachedDetectionResult}
function markInProcessFallback(e=globalBackendRegistry){logForDebugging("[BackendRegistry] Marking in-process fallback as active"),e.inProcessFallbackActive=!0}
function GBp(){return getTeammateModeFromSnapshot()}
function isInProcessEnabled(e=globalBackendRegistry){if(getIsNonInteractiveSession())return logForDebugging("[BackendRegistry] isInProcessEnabled: true (non-interactive session)"),!0;let t=GBp(),n;if(t==="in-process")n=!0;else if(t==="tmux"||t==="iterm2")n=!1;else{if(e.inProcessFallbackActive)return logForDebugging("[BackendRegistry] isInProcessEnabled: true (fallback after pane backend unavailable)"),!0;let r=isInsideTmuxSync(),o=isInITerm2();n=!r&&!o}return logForDebugging(`[BackendRegistry] isInProcessEnabled: ${n} (mode=${t}, insideTmux=${isInsideTmuxSync()}, inITerm2=${isInITerm2()})`),n}
function getResolvedTeammateMode(e=globalBackendRegistry){return isInProcessEnabled(e)?"in-process":"tmux"}
function getInProcessBackend(e=globalBackendRegistry){if(!e.cachedInProcessBackend)e.cachedInProcessBackend=sza();return e.cachedInProcessBackend}
async function getTeammateExecutor(e=!1,t=globalBackendRegistry){if(e&&isInProcessEnabled(t))return logForDebugging("[BackendRegistry] Using in-process executor"),getInProcessBackend(t);return logForDebugging("[BackendRegistry] Using pane backend executor"),zBp(t)}
async function zBp(e){if(!e.cachedPaneBackendExecutor){let t=await detectAndGetBackend(e);e.cachedPaneBackendExecutor=_za(t.backend),logForDebugging(`[BackendRegistry] Created PaneBackendExecutor wrapping ${t.backend.type}`)}return e.cachedPaneBackendExecutor}
function resetBackendDetection(e=globalBackendRegistry){e.cachedBackend=null,e.cachedDetectionResult=null,e.cachedInProcessBackend=null,e.cachedPaneBackendExecutor=null,e.backendsRegistered=!1,e.inProcessFallbackActive=!1}
var globalBackendRegistry;
var sye=b(()=>{lt();mn();qe();Es();hte();iza();Igo();yza();pIe();globalBackendRegistry=createBackendRegistry()});
export {ZFa,createBackendRegistry,ensureBackendsRegistered,registerTmuxBackend,registerITermBackend,S6n,Ugo,detectAndGetBackend,qBp,getBackendByType,getCachedBackend,getCachedDetectionResult,markInProcessFallback,GBp,isInProcessEnabled,getResolvedTeammateMode,getInProcessBackend,getTeammateExecutor,zBp,resetBackendDetection,globalBackendRegistry,sye};
