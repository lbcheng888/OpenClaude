// @ts-nocheck
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_,fromEnum as QH} from "../../vendor/m5.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {getSessionId as E_,lt as A_} from "../session/0131_sent.ts";
import {_i as h7,ndn as N16,hp as wO} from "../session/1460_promise.ts";
import {ma as AK,pg as nY,Lp as VO,kA as k$,mg as iY} from "../agent/2580_level.ts";
import {aue as h1H,rM as lN} from "../../vendor/m4493.ts";
import {Ie as EH,ln as f6} from "./0594_feature_name.ts";
import {gracefulShutdown as S7,ym as uT} from "../config/3332_flushAnalyticsSinks.ts";
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

export {getJobDir as Ohm,stopCurrentBgJob as dKn,stopBgJobLazyInit as wko};
