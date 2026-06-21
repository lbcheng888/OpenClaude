// @ts-nocheck
import {qXr as Aa8,M9e as Wv_,N9e as DZH,$Xr as wa8} from "../api/3360_headers.ts";
import {getIsNonInteractiveSession as p8,discardPendingOTelEvents as SH8,setMeter as hH8,getSessionCounter as kH8,getSessionStartType as iH8,lt as A_,onSessionSwitch as da} from "../session/0131_sent.ts";
import {Xw as bP,Zxe as G0H} from "../telemetry/3181_content.ts";
import {logForDebugging as y,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {Se as ZH,bt as R_,T2 as TI} from "../../vendor/m195.ts";
import {jJ as Xa,yAt as Az_,M8e as FFH} from "./5198_ANTHROPIC_UNIX_SOCKET.ts";
import {Wno as f_q,jno as A_q} from "./3746_parseOtelHeadersEnvVar.ts";
import {VUe as KbH,QEn as YM6} from "./2593_ISSUES_EXPLAINER.ts";
import {b as L} from "../../runtime.ts";
import {x3 as $m,profileCheckpoint as jK} from "../session/0241_profileReport.ts";
import {Qn as O8,enableConfigs as oTH,recordFirstStartTime as sv8,getOrCreateMachineID as HA6} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {ta as r7,wn as h6} from "../../vendor/m45.ts";
import {Kae as WKH,Ssa as G6K} from "../../vendor/m3247.ts";
import {DH as RG,populateOAuthAccountInfoIfNeeded as BM8} from "./1288_storeOAuthAccountInfo.ts";
import {zF as UC,initializePolicyLimitsLoadingPromise as VR6} from "../telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {rd as t5,isPolicyLimitsEligible as pI} from "../../vendor/m2205.ts";
import {xNt as Xv_} from "./3358_key.ts";
import {w$l as xC4,v$l as IC4} from "./5248_method.ts";
import {Ao as Xq} from "./2031_withOAuthRefreshLock.ts";
import {x$l as mC4,R$l as uC4} from "../../vendor/m5248.ts";
import {ReactHooks as n3,Gi as B7} from "../../vendor/m133.ts";
import {ZI as Sh,detectCurrentRepository as mJH} from "../../vendor/m692.ts";
import {SA as W$,kn as b6} from "./0689_timestamp.ts";
import {a5 as Og,sNr as D08} from "./2187_terminal.ts";
import {sn as $6} from "./0047_namespace.ts";
import {ym as uT,setupGracefulShutdown as Io8,gracefulShutdownSync as B1} from "./3332_flushAnalyticsSinks.ts";
import {S7 as al,Irs as FH9} from "./0746_bytes.ts";
import {nA as L$,isScratchpadEnabled as Ma,ensureScratchpadDir as Bn6} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {qs as u9,zt as r_} from "../../vendor/m635.ts";
import {Z_ as wf,configureGlobalAgents as vM_} from "./1021_shouldBypassProxyWithCidr.ts";
import {g6e as kBH} from "./4304_activityCallback.ts";
import {hke as p0H,yW as UQ} from "../../vendor/m3256.ts";
import {oA as H$,Su as J5,tN as lv} from "./2697_oA.ts";
import {P1 as xv,assertScrubSandboxAvailable as mu8,GAi as AR7} from "../agent/2223_subprocessEnv.ts";
import {H$l as BC4,k$l as pC4} from "../../vendor/m5249.ts";
import {L2 as WI,otn as Ee_} from "./0640_existsSync.ts";
import {I1 as jv,_Fe as nvH} from "../session/2197_shutdown1PEventLogging.ts";
import {zn as t6,$Nr as FT7} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {st as T_} from "../../vendor/m5.ts";
import {J$l as _b4,Y$l as Hb4} from "../api/5252_resetAgentProxyForTests.ts";
import {BL as WE,RDa as lGK} from "../../vendor/m3879.ts";
import {Z$l as Ob4,Q$l as Kb4} from "../../vendor/m5252.ts";
// @ts-nocheck
function rg_() {
  if (Aa8()) {
    if (p8() && bP()) eGq().catch(err => {
      y(`[3P telemetry] Eager telemetry init failed (beta tracing): ${ZH(err)}`, {
        level: "error"
      });
    });
    y("[3P telemetry] Waiting for remote managed settings before telemetry init"), Wv_().then(async () => {
      y("[3P telemetry] Remote managed settings loaded, initializing telemetry"), Xa(), await eGq();
    }).catch(H => {
      y(`[3P telemetry] Telemetry init failed (remote settings path): ${ZH(H)}`, {
        level: "error"
      });
    });
  } else eGq().catch(err => {
    y(`[3P telemetry] Telemetry init failed: ${ZH(err)}`, {
      level: "error"
    });
  });
}
async function eGq() {
  if (isTelemetryInitialized) return;
  isTelemetryInitialized = true;
  try {
    await extractSlashCommandName();
  } catch (err) {
    throw isTelemetryInitialized = false, err;
  } finally {
    SH8();
  }
}
async function extractSlashCommandName() {
  let {
      initializeTelemetry: initializeTelemetry
    } = await Promise.resolve().then(() => (f_q(), A_q)),
    meter = await initializeTelemetry();
  if (meter) hH8(meter, (counterName, counterOpts) => {
    let counter = meter?.createCounter(counterName, counterOpts);
    return {
      add(delta, attrs = {}) {
        let fullAttrs = {
          ...KbH(),
          ...attrs
        };
        counter?.add(delta, fullAttrs);
      }
    };
  }), kH8()?.add(1, {
    start_type: iH8()
  });
}
var isTelemetryInitialized = false,
  Tb4;
var HRq = L(() => {
  $m();
  A_();
  O8();
  r7();
  A_();
  A_();
  WKH();
  RG();
  UC();
  t5();
  DZH();
  Xv_();
  xC4();
  Xq();
  mC4();
  n3();
  O8();
  UH();
  Sh();
  W$();
  Og();
  $6();
  R_();
  uT();
  Az_();
  al();
  L$();
  u9();
  wf();
  kBH();
  p0H();
  H$();
  xv();
  G0H();
  YM6();
  BC4();
  WI();
  Tb4 = h6(async () => {
    let initStart = Date.now();
    b6("info", "init_started"), jK("init_function_start");
    try {
      let _ = Date.now();
      oTH(), b6("info", "init_configs_enabled", {
        duration_ms: Date.now() - _
      }), jK("init_configs_enabled");
      let q = Date.now();
      if (FFH(), await mu8(), uC4(), b6("info", "init_safe_env_vars_applied", {
        duration_ms: Date.now() - q
      }), jK("init_safe_env_vars_applied"), Io8(), jK("init_after_graceful_shutdown"), Promise.all([Promise.resolve().then(() => (jv(), nvH)), Promise.resolve().then(() => (t6(), FT7))]).then(([T, z]) => {
        T.initialize1PEventLogging(), z.onGrowthBookRefresh(() => {
          T.reinitialize1PEventLoggingIfConfigChanged();
        });
      }), jK("init_after_1p_event_logging"), BM8(), jK("init_after_oauth_populate"), D08(), jK("init_after_jetbrains_detection"), mJH(), Aa8()) wa8();
      if (pI()) VR6();
      jK("init_after_remote_settings_check"), sv8(), HA6();
      let K = Date.now();
      y("[init] configureGlobalMTLS starting"), FH9(), b6("info", "init_mtls_configured", {
        duration_ms: Date.now() - K
      }), y("[init] configureGlobalMTLS complete");
      let O = Date.now();
      if (y("[init] configureGlobalAgents starting"), vM_(), b6("info", "init_proxy_configured", {
        duration_ms: Date.now() - O
      }), y("[init] configureGlobalAgents complete"), jK("init_network_configured"), IC4(), T_(process.env.CLAUDE_CODE_REMOTE)) try {
        let {
            initAgentProxy: T,
            getAgentProxyEnv: z
          } = await Promise.resolve().then(() => (_b4(), Hb4)),
          {
            registerAgentProxyEnvFn: $
          } = await Promise.resolve().then(() => (xv(), AR7));
        $(z), await T();
      } catch (T) {
        y(`[init] agent proxy init failed: ${T instanceof Error ? T.message : String(T)}; continuing without proxy`, {
          level: "warn"
        });
      }
      if (pC4(), Ee_(), r_() === "windows" && !J5()) {
        if (!lv()) console.error(`Claude Code on Windows requires a shell tool. Git Bash was not found and the PowerShell tool is disabled (CLAUDE_CODE_USE_POWERSHELL_TOOL=0).
  - Install Git for Windows: https://git-scm.com/downloads/win, or
  - Remove CLAUDE_CODE_USE_POWERSHELL_TOOL from your environment or settings.`), process.exit(1);
        if ((await UQ()) === null) console.error(`Claude Code on Windows requires either Git for Windows (for bash) or PowerShell. Install one of:
  - Git for Windows: https://git-scm.com/downloads/win
  - PowerShell 7: https://aka.ms/powershell
Or set CLAUDE_CODE_GIT_BASH_PATH to your bash.exe location.`), process.exit(1);
      }
      if (B7(G6K), B7(async () => {
        let {
          cleanupSessionTeams: T
        } = await Promise.resolve().then(() => (WE(), lGK));
        await T();
      }), Ma()) {
        let T = Date.now();
        try {
          let z = await Bn6();
          b6("info", z === null ? "init_scratchpad_unavailable" : "init_scratchpad_created", {
            duration_ms: Date.now() - T
          });
        } catch (z) {
          y(`init: ensureScratchpadDir failed: ${z}`, {
            level: "error"
          });
        }
      }
      da(() => {
        if (Ma()) Bn6().catch(T => y(`onSessionSwitch: ensureScratchpadDir failed: ${T}`, {
          level: "error"
        }));
      }), b6("info", "init_completed", {
        duration_ms: Date.now() - initStart
      }), jK("init_function_end");
    } catch (_) {
      if (_ instanceof TI) {
        if (p8()) {
          process.stderr.write(`Configuration error in ${_.filePath}: ${_.message}
`), B1(1);
          return;
        }
        return Promise.resolve().then(() => (Ob4(), Kb4)).then(q => q.showInvalidConfigDialog({
          error: _
        }));
      } else throw _;
    }
  });
});

export {rg_ as bWt,eGq as IDo,extractSlashCommandName as zwm,isTelemetryInitialized as HDo,Tb4 as e9l,HRq as DDo};
