// @ts-nocheck
import {ft as J_,b as L} from "../../runtime.ts";
import {Xzt as lc_,Grr as ts6} from "../permissions/5772_startDeferredPrefetches.ts";
import {Ce as ZH,Ct as R_} from "../../vendor/m197.ts";
import {KQn as Zi6,zQn as Gi6,XMo as _Gq} from "../../vendor/m5235.ts";
// @ts-nocheck
var o91 = {};
J_(o91, {
  runPreload: () => runPreload,
  PRELOAD_CLAIM_SOCK: () => PRELOAD_CLAIM_SOCK
});
async function runPreload(argv) {
  let sockPath = argv[0] || PRELOAD_CLAIM_SOCK,
    pidFilePath = `${sockPath}.pid`,
    capsReadyPromise = Promise.resolve().then(() => (lc_(), ts6));
  for (let envKey of iIT) delete process.env[envKey];
  try {
    FgH.mkdirSync(i91.dirname(sockPath), {
      recursive: true,
      mode: 448
    }), FgH.unlinkSync(sockPath);
  } catch {}
  let cleanupSockFiles = () => {
      for (let filePath of [sockPath, pidFilePath]) try {
        FgH.unlinkSync(filePath);
      } catch {}
    },
    handleSignalExit = () => {
      cleanupSockFiles(), process.exit(0);
    },
    handleUncaughtException = err => {
      cleanupSockFiles(), process.stderr.write(`[preload] uncaughtException: ${ZH(err)}
`), process.exit(1);
    };
  for (let sig of ["SIGTERM", "SIGHUP", "SIGINT"]) process.on(sig, handleSignalExit);
  process.on("uncaughtException", handleUncaughtException);
  let claimMsg;
  try {
    claimMsg = await Zi6(sockPath, () => {
      FgH.writeFileSync(pidFilePath, String(process.pid), {
        mode: 384
      });
    });
  } catch (err) {
    cleanupSockFiles(), process.stderr.write(`[preload] claim recv failed: ${ZH(err)}
`), process.exit(1);
  }
  for (let sig of ["SIGTERM", "SIGHUP", "SIGINT"]) process.off(sig, handleSignalExit);
  process.off("uncaughtException", handleUncaughtException), cleanupSockFiles(), await capsReadyPromise, await Gi6(claimMsg, capsReadyPromise);
}
var FgH,
  i91,
  PRELOAD_CLAIM_SOCK = "/home/claude/.claude/remote/spare.sock",
  iIT;
var a91 = L(() => {
  R_();
  _Gq();
  FgH = require("fs"), i91 = require("path"), iIT = ["CLAUDE_CODE_SESSION_ACCESS_TOKEN", "CLAUDE_CODE_WORKER_EPOCH", "CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_REMOTE_SESSION_ID", "CLAUDE_CODE_BASE_REF", "CLAUDE_CODE_BASE_REFS", "CLAUDE_CODE_REPO_CHECKOUTS", "CLAUDE_CODE_DIAGNOSTICS_FILE", "CLAUDE_SESSION_INGRESS_TOKEN_FILE", "CLAUDECODE", "CLAUDE_CODE_CHILD_SESSION"];
});
export {o91 as _Sc,runPreload,FgH as AVe,i91 as hSc,PRELOAD_CLAIM_SOCK,iIT as EXm,a91 as ySc};
