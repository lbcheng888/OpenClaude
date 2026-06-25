// @ts-nocheck
import {Ano as Aa8,Y3e as Wv_,X3e as DZH,Cno as wa8} from "../api/3376_headers.ts";
import {getIsNonInteractiveSession as p8,discardPendingOTelEvents as SH8,setMeter as hH8,getSessionCounter as kH8,getSessionStartType as iH8,lt as A_,onSessionSwitch as da} from "../session/0132_sent.ts";
import {nv as bP,qHe as G0H} from "../telemetry/3195_content.ts";
import {logForDebugging as y,qe as UH} from "./0236_setHasFormattedOutput.ts";
import {Ce as ZH,Ct as R_,$U as TI} from "../../vendor/m197.ts";
import {Kq as Xa,L6e as Az_,O6e as FFH} from "./4012_ANTHROPIC_UNIX_SOCKET.ts";
import {vao as f_q,Rao as A_q} from "./3762_parseOtelHeadersEnvVar.ts";
import {K2e as KbH,qvn as YM6} from "./2604_ISSUES_EXPLAINER.ts";
import {b as L} from "../../runtime.ts";
import {z9 as $m,profileCheckpoint as jK} from "../session/0243_profileReport.ts";
import {tr as O8,enableConfigs as oTH,recordFirstStartTime as sv8,getOrCreateMachineID as HA6} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Wi as r7,Hn as h6} from "../../vendor/m100.ts";
import {zae as WKH,wpa as G6K} from "../../vendor/m3263.ts";
import {aI as RG,populateOAuthAccountInfoIfNeeded as BM8} from "./1293_storeOAuthAccountInfo.ts";
import {_B as UC,initializePolicyLimitsLoadingPromise as VR6} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {Bu as t5,isPolicyLimitsEligible as pI} from "../../vendor/m2213.ts";
import {oUt as Xv_} from "./3374_key.ts";
import {fpo as xC4,o3a as IC4} from "./4009_method.ts";
import {lo as Xq} from "./2036_withOAuthRefreshLock.ts";
import {TGl as mC4,yGl as uC4} from "../../vendor/m5281.ts";
import {ud as n3,Si as B7} from "../../vendor/m134.ts";
import {_0 as Sh,detectCurrentRepository as mJH} from "../../vendor/m697.ts";
import {pf as W$,wn as b6} from "./0693_timestamp.ts";
import {E8 as Og,D2r as D08} from "./2192_terminal.ts";
import {dn as $6} from "./0137_namespace.ts";
import {isAmberSentinelEnabled as uT,setupGracefulShutdown as Io8,gracefulShutdownSync as B1} from "./3348_flushAnalyticsSinks.ts";
import {zK as al,Rcs as FH9} from "./0751_bytes.ts";
import {Xm as L$,isScratchpadEnabled as Ma,ensureScratchpadDir as Bn6} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {Es as u9,Yt as r_} from "../../vendor/m641.ts";
import {ey as wf,configureGlobalAgents as vM_} from "./1026_shouldBypassProxyWithCidr.ts";
import {W5e as kBH} from "./4324_activityCallback.ts";
import {oIe as p0H,LW as UQ} from "../../vendor/m3272.ts";
import {Zm as H$,Yc as J5,m1 as lv} from "./2709_Zm.ts";
import {VM as xv,assertScrubSandboxAvailable as mu8,Vbi as AR7} from "../agent/2231_subprocessEnv.ts";
import {bGl as BC4,SGl as pC4} from "../../vendor/m5282.ts";
import {r2 as WI,Brn as Ee_} from "./0646_existsSync.ts";
import {GM as jv,hUe as nvH} from "../session/2203_shutdown1PEventLogging.ts";
import {jn as t6,h$r as FT7} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {nt as T_} from "../../vendor/m127.ts";
import {JGl as _b4,YGl as Hb4} from "../api/5286_resetAgentProxyForTests.ts";
import {sL as WE,QFa as lGK} from "../../vendor/m3897.ts";
import {ZGl as Ob4,QGl as Kb4} from "../../vendor/m5286.ts";
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
export {rg_ as QKt,eGq as rNo,extractSlashCommandName as ELm,isTelemetryInitialized as nNo,Tb4 as eVl,HRq as oNo};
