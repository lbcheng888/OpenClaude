// @ts-nocheck
import {or as A8,dn as $6} from "../config/0137_namespace.ts";
import {qt as l_,TeamDeleteToolName as IH,tn as a_} from "../config/0230_encoding.ts";
import {cn as Z6,Ct as R_} from "../../vendor/m197.ts";
import {Si as B7,ud as n3} from "../../vendor/m134.ts";
import {getSessionId as E_,lt as A_} from "../session/0132_sent.ts";
import {logForDebugging as y,qe as UH} from "../config/0236_setHasFormattedOutput.ts";
import {Js as H7,rT as df} from "../../vendor/m1294.ts";
import {He as EH,Pt as B_,xe as bH,mn as f6} from "../telemetry/0600_feature_name.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function isLockFileData(data) {
  if (typeof data !== "object" || data === null) return false;
  return "sessionId" in data && typeof data.sessionId === "string" && "pid" in data && typeof data.pid === "number";
}
function getLockFilePath() {
  return fsPathModule.join(A8(), LOCK_FILE_NAME);
}
async function readLockFile() {
  try {
    let content = await fsModule.readFile(getLockFilePath(), "utf8"),
      parsed = l_(content);
    return isLockFileData(parsed) ? parsed : undefined;
  } catch {
    return;
  }
}
function isProcessAlive(pid) {
  try {
    return process.kill(pid, 0), true;
  } catch {
    return false;
  }
}
async function tryWriteLockFile(data) {
  try {
    return await fsModule.writeFile(getLockFilePath(), IH(data), {
      flag: "wx"
    }), true;
  } catch (err) {
    if (Z6(err) === "EEXIST") return false;
    throw err;
  }
}
function resetHeartbeatTimer() {
  heartbeatTimer?.(), heartbeatTimer = B7(async () => {
    await releaseLock();
  });
}
async function checkLockStatus() {
  let lockData = await readLockFile();
  if (!lockData) return {
    kind: "free"
  };
  if (lockData.sessionId === E_()) return {
    kind: "held_by_self"
  };
  if (isProcessAlive(lockData.pid)) return {
    kind: "blocked",
    by: lockData.sessionId
  };
  return y(`Recovering stale computer-use lock from session ${lockData.sessionId} (PID ${lockData.pid})`), await fsModule.unlink(getLockFilePath()).catch(() => {}), {
    kind: "free"
  };
}
function isLockHeld() {
  return heartbeatTimer !== undefined;
}
async function acquireLock() {
  let sessionId = E_(),
    lockData = {
      sessionId: sessionId,
      pid: process.pid,
      acquiredAt: Date.now()
    };
  if (await H7().mkdir(A8()), await tryWriteLockFile(lockData)) return resetHeartbeatTimer(), EH("computeruse_lock_acquire"), LOCK_ACQUIRED_FRESH;
  let existing = await readLockFile();
  if (!existing) {
    if (await fsModule.unlink(getLockFilePath()).catch(() => {}), await tryWriteLockFile(lockData)) return resetHeartbeatTimer(), B_("computeruse_lock_acquire", "stale_recovered"), LOCK_ACQUIRED_FRESH;
    return bH("computeruse_lock_acquire", "lock_held"), {
      kind: "blocked",
      by: (await readLockFile())?.sessionId ?? "unknown"
    };
  }
  if (existing.sessionId === sessionId) return EH("computeruse_lock_acquire"), LOCK_ACQUIRED_REUSED;
  if (isProcessAlive(existing.pid)) return bH("computeruse_lock_acquire", "lock_held"), {
    kind: "blocked",
    by: existing.sessionId
  };
  if (y(`Recovering stale computer-use lock from session ${existing.sessionId} (PID ${existing.pid})`), await fsModule.unlink(getLockFilePath()).catch(() => {}), await tryWriteLockFile(lockData)) return resetHeartbeatTimer(), B_("computeruse_lock_acquire", "stale_recovered"), LOCK_ACQUIRED_FRESH;
  return bH("computeruse_lock_acquire", "lock_held"), {
    kind: "blocked",
    by: (await readLockFile())?.sessionId ?? "unknown"
  };
}
async function releaseLock() {
  heartbeatTimer?.(), heartbeatTimer = undefined;
  let H = await readLockFile();
  if (!H || H.sessionId !== E_()) return false;
  try {
    return await fsModule.unlink(getLockFilePath()), y("Released computer-use lock"), true;
  } catch {
    return false;
  }
}
var fsModule,
  fsPathModule,
  LOCK_FILE_NAME = "computer-use.lock",
  heartbeatTimer,
  LOCK_ACQUIRED_FRESH,
  LOCK_ACQUIRED_REUSED;
var initComputerUseLockModule = L(() => {
  A_();
  f6();
  df();
  n3();
  UH();
  $6();
  a_();
  R_();
  fsModule = require("fs/promises"), fsPathModule = require("path"), LOCK_ACQUIRED_FRESH = {
    kind: "acquired",
    fresh: true
  }, LOCK_ACQUIRED_REUSED = {
    kind: "acquired",
    fresh: false
  };
});
export {isLockFileData as Pjd,getLockFilePath as lit,readLockFile as xFt,isProcessAlive as Lca,tryWriteLockFile as MQr,resetHeartbeatTimer as NQr,checkLockStatus as Mca,isLockHeld as Nca,acquireLock as Fca,releaseLock as FQr,fsModule as jge,fsPathModule as Oca,LOCK_FILE_NAME as xjd,heartbeatTimer as DFt,LOCK_ACQUIRED_FRESH as LQr,LOCK_ACQUIRED_REUSED as Djd,initComputerUseLockModule as BQr};
