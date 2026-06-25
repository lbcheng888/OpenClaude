// @ts-nocheck
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Ve as K_,Le as QH} from "../../vendor/m5.ts";
import {xr as a8,QT as LJ} from "../../vendor/m1461.ts";
import {getSessionId as E_,lt as A_} from "../session/0132_sent.ts";
import {Ws as h7,Fmn as N16,vd as wO} from "../session/1465_promise.ts";
import {Oi as AK,Tg as nY,Id as VO,Pm as k$,Pf as iY} from "../agent/2591_level.ts";
import {rue as h1H,bL as lN} from "../../vendor/m4515.ts";
import {He as EH,mn as f6} from "./0600_feature_name.ts";
import {gracefulShutdown as S7,isAmberSentinelEnabled as uT} from "../config/3348_flushAnalyticsSinks.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getJobDir() {
  return process.env.CLAUDE_JOB_DIR;
}
async function stopCurrentBgJob(source) {
  c("tengu_bg_agent_action", {
    action: K_("stop"),
    source: QH(source),
    jobSessionId: a8(E_())
  });
  let jobDir = getJobDir();
  if (h7() && jobDir) {
    let now = new Date().toISOString(),
      currentJobState = await AK(jobDir);
    if (currentJobState && !nY(currentJobState)) await VO(jobDir, {
      ...currentJobState,
      state: "stopped",
      detail: "stopped from session",
      tempo: "idle",
      needs: undefined,
      block: undefined,
      inFlight: undefined,
      updatedAt: now,
      firstTerminalAt: currentJobState.firstTerminalAt ?? now
    }).catch(k$);
    if (N16()) process.stdout.write(h1H("Session stopped."));
  }
  return EH("job_stop_self"), S7(0, "prompt_input_exit", {
    suppressResumeHint: true
  });
}
var stopBgJobLazyInit = L(() => {
  A_();
  lN();
  f6();
  v_();
  LJ();
  wO();
  uT();
  iY();
});
export {getJobDir as evm,stopCurrentBgJob as uXn,stopBgJobLazyInit as NPo};
