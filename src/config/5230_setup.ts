// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {kn as b6,SA as W$} from "./0689_timestamp.ts";
import {_t as M_,cu as T5} from "../../vendor/m582.ts";
import {switchSession as hM,getIsNonInteractiveSession as p8,getIsRemoteMode as XK,getSessionId as E_,setOriginalCwd as Lh,setProjectRoot as c5H,getProjectRoot as J1,lt as A_} from "../session/0131_sent.ts";
import {qT as Lj,zE as LM} from "../../vendor/m125.ts";
import {dp as GO,Bl as p4,sn as $6} from "./0047_namespace.ts";
import {j6e as aBH,s6n as dp6} from "./4391_stopRendezvousServer.ts";
import {captureTeammateModeSnapshotIfEnabled as Or8,isAgentSwarmsEnabled as Z4,cb as dJ} from "./3298_isAgentSwarmsEnabled.ts";
import {H2l as BS4,I2l as US4} from "../../vendor/m5228.ts";
import {Fbn as cJ6,O9r as Lx8} from "../../vendor/m2515.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {x_ as ZA,initXL as DN} from "../agent/3279_code.ts";
import {Se as ZH,bt as R_} from "../../vendor/m195.ts";
import {setBgExitCause as IX,qV as Wl} from "../../vendor/m229.ts";
import {uhi as Iz7,Cve as tXH,L1 as yv} from "../../vendor/m2232.ts";
import {tu as e5,_9 as rx} from "./3864_entrypoint.ts";
import {c$i as EC7,OOt as Vk_} from "../../vendor/m2765.ts";
import {hasWorktreeCreateHook as mt,IFe as uSH} from "../../vendor/m2233.ts";
import {getIsGit as Yf,findCanonicalGitRoot as Ez,isLinkedWorktree as uJ_,Ba as uK} from "../../vendor/m693.ts";
import {l0e as SRH,yx as _0} from "../core/5144_encoding.ts";
import {Pt as x_,Go as dq} from "../../vendor/m632.ts";
import {generateTmuxSessionName as Yi6,worktreeBranchName as BFH,createWorktreeForSession as qu_,createTmuxSessionForWorktree as CZq,hI as AR} from "../session/5172_worktreeBranchName.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {saveWorktreeState as OU,ja as aK} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {clearMemoryFileCaches as dG,zw as SP} from "./2717_stripHtmlComments.ts";
import {v2l as IS4,mDo as mGq} from "../../vendor/m5227.ts";
import {Y3e as qmH} from "./3762_level.ts";
import {profileCheckpoint as jK,x3 as $m} from "../session/0241_profileReport.ts";
import {je as dH} from "../../vendor/m577.ts";
import {getCommands as zM,Sf as Xz} from "../tools/5142_toSlashCommands.ts";
import {z2e as KIH,M5r as tF8} from "../../vendor/m2766.ts";
import {yAo as MTq,uXa as iiK} from "../tools/4355_registerSessionFileAccessHooks.ts";
import {checkHasTrustDialogAccepted as kO,getGlobalConfig as N_,getCurrentProjectConfig as Df,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {hqn as tm6,Aqn as sm6} from "../telemetry/4354_stopMemoryWatcher.ts";
import {initSinks as HWq,m8e as hFH} from "../../vendor/m5091.ts";
import {prefetchApiKeyFromApiKeyHelperIfSafe as fv8,Ao as Xq} from "./2031_withOAuthRefreshLock.ts";
import {getSettings_DEPRECATED as tq,getSettingsForSource as C6,yr as v8} from "./0740_updateSettingsForSource.ts";
import {_setProxyAuthHelperConfig as _j8,prefetchProxyAuthFromHelperIfSafe as Kj8,Z_ as wf} from "./1021_shouldBypassProxyWithCidr.ts";
import {wgl as hY4,Vje as _FH} from "../../vendor/m4762.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {qe as UH} from "./0234_setHasFormattedOutput.ts";
import {xH as dR} from "./0580_xH.ts";
import {Lr as l8} from "../../vendor/m578.ts";
import {a5 as Og} from "./2187_terminal.ts";
import {wY as To} from "../../vendor/m3762.ts";
// @ts-nocheck
var ed6 = {};
J_(ed6, {
  setup: () => setup,
  isDesktopEntrypointExempted: () => isDesktopEntrypointExempted
});
async function setup(H, _, q, K, O, T, z, $, Y) {
  b6("info", "setup_started");
  let A_2 = process.version.match(/^v(\d+)\./)?.[1];
  if (!A_2 || parseInt(A_2) < 18) console.error(M_.bold.red("Error: Claude Code requires Node.js version 18 or higher.")), process.exit(1);
  if (z) hM(Lj(z), "startup_custom_id");
  if (!GO() || Y !== undefined) ;
  if (process.env.CLAUDE_BG_BACKEND === "daemon") {
    let {
      startRendezvousServer: M
    } = await Promise.resolve().then(() => (aBH(), dp6));
    M();
  }
  if (await Or8(), !p8()) {
    if (Z4()) {
      let M = await BS4();
      if (M.status === "restored") console.log(M_.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));else if (M.status === "failed") console.error(M_.red(`Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${M.backupPath}.`));
    }
    try {
      let M = await cJ6();
      if (M.status === "restored") console.log(M_.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));else if (M.status === "failed") console.error(M_.red(`Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${M.backupPath}.`));
    } catch (M) {
      SH(M);
    }
  }
  try {
    ZA(H);
  } catch (M) {
    process.stderr.write(M_.red(`Error: Can't access working directory ${M_.bold(H)}: ${ZH(M)}
`)), IX("setcwd"), process.exit(1);
  }
  let w_2 = performance.now();
  if (Iz7(), e5("setup_hooks_snapshot_ms", performance.now() - w_2, w_2), b6("info", "setup_hooks_captured", {
    duration_ms: Math.round(performance.now() - w_2)
  }), !XK()) {
    let M = performance.now();
    EC7(H), e5("setup_file_watcher_ms", performance.now() - M, M);
  }
  let f = performance.now();
  if (K) {
    let M = mt(),
      X = await Yf();
    if (!M && !X) process.stderr.write(M_.red(`Error: Can only use --worktree in a git repository, but ${M_.bold(H)} is not a git repository. Configure a WorktreeCreate hook in settings.json to use --worktree with other VCS systems.
`)), process.exit(1);
    let P = $ ? `pr-${$}` : O ?? SRH(),
      Z;
    if (X) {
      let G = Ez(x_());
      if (!G) process.stderr.write(M_.red(`Error: Could not determine the main git repository root.
`)), process.exit(1);
      if (uJ_(x_())) b6("info", "worktree_resolved_to_main_repo"), process.chdir(G), ZA(G);
      Z = T ? Yi6(G, BFH(P)) : undefined;
    } else Z = T ? Yi6(x_(), BFH(P)) : undefined;
    let W;
    try {
      W = await qu_(E_(), P, Z, {
        prNumber: $,
        fromCwd: H
      });
    } catch (G) {
      process.stderr.write(M_.red(`Error creating worktree: ${ZH(G)}
`)), IX("worktree_create"), process.exit(1);
    }
    if (c("tengu_worktree_created", {
      tmux_enabled: T
    }), T && Z) {
      let G = await CZq(Z, W.worktreePath);
      if (G.created) console.log(M_.green(`Created tmux session: ${M_.bold(Z)}
To attach: ${M_.bold(`tmux attach -t ${Z}`)}`));else console.error(M_.yellow(`Warning: Failed to create tmux session: ${G.error}`));
    }
    process.chdir(W.worktreePath), ZA(W.worktreePath), Lh(x_()), c5H(x_()), OU(W), dG(), tXH(), e5("setup_worktree_ms", performance.now() - f, f);
  }
  if (b6("info", "setup_background_jobs_starting"), !GO()) try {
    IS4();
  } catch (M) {
    SH(M);
  }
  qmH(), b6("info", "setup_background_jobs_launched"), jK("setup_before_prefetch"), b6("info", "setup_prefetch_starting");
  let j = p8() && dH.CLAUDE_CODE_SYNC_PLUGIN_INSTALL || GO() || p4();
  if (!j) zM(J1());
  if (Promise.resolve().then(() => (KIH(), tF8)).then(M => {
    if (!j) M.loadPluginHooks(), M.setupPluginHookHotReload();
  }), !GO()) {
    if (Promise.resolve().then(() => (MTq(), iiK)).then(M => M.registerSessionFileAccessHooks()), !XK() && kO()) Promise.resolve().then(() => (tm6(), sm6)).then(M => M.startMemoryWatcher());
  }
  HWq(), c("tengu_started", {}), fv8(p8());
  let J = (tq() || {}).proxyAuthHelper;
  if (_j8({
    helper: J,
    fromProjectOrLocal: C6("projectSettings")?.proxyAuthHelper === J || C6("localSettings")?.proxyAuthHelper === J,
    trustAccepted: kO
  }), Kj8(), jK("setup_after_prefetch"), !GO()) {
    let M = performance.now();
    await hY4(N_().lastReleaseNotesSeen), e5("setup_release_notes_ms", performance.now() - M, M);
  }
  if (_ === "bypassPermissions" || q) {
    if (typeof process.getuid === "function" && process.getuid() === 0 && process.env.IS_SANDBOX !== "1" && !dH.CLAUDE_CODE_BUBBLEWRAP) console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons"), process.exit(1);
  }
  let D = Df();
  if (D.lastCost !== undefined && D.lastDuration !== undefined) c("tengu_exit", {
    last_session_cost: D.lastCost,
    last_session_api_duration: D.lastAPIDuration,
    last_session_tool_duration: D.lastToolDuration,
    last_session_duration: D.lastDuration,
    last_session_lines_added: D.lastLinesAdded,
    last_session_lines_removed: D.lastLinesRemoved,
    last_session_total_input_tokens: D.lastTotalInputTokens,
    last_session_total_output_tokens: D.lastTotalOutputTokens,
    last_session_total_cache_creation_input_tokens: D.lastTotalCacheCreationInputTokens,
    last_session_total_cache_read_input_tokens: D.lastTotalCacheReadInputTokens,
    last_session_fps_average: D.lastFpsAverage,
    last_session_fps_low_1_pct: D.lastFpsLow1Pct,
    last_session_graceful_shutdown: D.lastGracefulShutdown ?? false,
    last_session_version_base: D.lastVersionBase ?? "unknown",
    last_session_id: a8(D.lastSessionId),
    ...D.lastSessionMetrics
  });
}
function isDesktopEntrypointExempted(H) {
  return false;
}
var Hl6 = L(() => {
  T5();
  v_();
  LJ();
  dq();
  _FH();
  DN();
  hFH();
  A_();
  Xz();
  Wl();
  mGq();
  LM();
  dJ();
  Lx8();
  Xq();
  SP();
  O8();
  UH();
  W$();
  dR();
  l8();
  Og();
  $6();
  R_();
  uK();
  Vk_();
  uSH();
  yv();
  US4();
  y6();
  To();
  _0();
  wf();
  aK();
  v8();
  $m();
  rx();
  AR();
});

export {ed6 as dYn,setup,isDesktopEntrypointExempted,Hl6 as pYn};
