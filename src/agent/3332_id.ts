// @ts-nocheck
import {Js as T7,rT as of} from "../../vendor/m1294.ts";
import {Za as J4,Ni as _K} from "../../vendor/m127.ts";
import {zg as vA} from "../../vendor/m1479.ts";
import {getTeammateContext as MP,b2 as oh} from "../../vendor/m1462.ts";
import {getTeamName as VT,Op as Xz} from "./1464_waitForTeammatesToBecomeIdle.ts";
import {getSessionId as C_,lt as Y_} from "../session/0132_sent.ts";
import {or as $8,dn as w6} from "../config/0137_namespace.ts";
import {TeamDeleteToolName as xH,qt as i_,tn as t_} from "../config/0230_encoding.ts";
import {logForDebugging as N,qe as gH} from "../config/0236_setHasFormattedOutput.ts";
import {cn as L6,Ce as GH,Ct as G_} from "../../vendor/m197.ts";
import {Ie as CH,vn as C6} from "../session/0621_length.ts";
import {b as L} from "../../runtime.ts";
import {Qr as i8} from "../../vendor/m323.ts";
import {ig as GA} from "../../vendor/m130.ts";
import {ve as yH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
// @ts-nocheck
function dqK(H) {
  if (Lr8 === H) return;
  Lr8 = H, Fy_();
}
function Fy_() {
  try {
    cqK.emit();
  } catch {}
}
function nqK(H) {
  return _q_.join(setActiveTaskListId(H), FB3);
}
async function hr8(H) {
  let _ = nqK(H);
  try {
    let q = (await T7().read(_)).trim(),
      K = parseInt(q, 10);
    return isNaN(K) ? 0 : K;
  } catch {
    return 0;
  }
}
async function iqK(H, _) {
  let q = nqK(H);
  await T7().write(q, String(_));
}
function _M() {
  if (J4(process.env.CLAUDE_CODE_ENABLE_TASKS)) return false;
  return true;
}
async function rqK(H) {
  let _ = setActiveTaskListId(H),
    q = await readEffectiveMaxTaskId(H),
    K;
  try {
    K = await vA(q, gy_);
    let O = await readHighWatermark(H);
    if (O > 0) {
      let z = await hr8(H);
      if (O > z) await iqK(H, O);
    }
    let T;
    try {
      T = await T7().list(_);
    } catch {
      T = [];
    }
    for (let z of T) if (z.endsWith(".json") && !z.startsWith(".")) {
      let $ = _q_.join(_, z);
      try {
        await T7().delete($);
      } catch {}
    }
    Fy_();
  } finally {
    if (K) await K();
  }
}
function tC() {
  if (process.env.CLAUDE_CODE_TASK_LIST_ID) return process.env.CLAUDE_CODE_TASK_LIST_ID;
  let H = MP();
  if (H) return H.teamName;
  return VT() || Lr8 || C_();
}
function qq_(H) {
  return H.replace(/[^a-zA-Z0-9_-]/g, "-");
}
function setActiveTaskListId(newId) {
  return _q_.join($8(), "tasks", qq_(newId));
}
function emitTaskChange(H, _) {
  return _q_.join(setActiveTaskListId(H), `${qq_(_)}.json`);
}
async function getLockFilePath(listId) {
  let _ = setActiveTaskListId(listId);
  try {
    await T7().mkdir(_);
  } catch {}
}
async function readHighWatermark(listId) {
  let hwPath = setActiveTaskListId(listId),
    q;
  try {
    q = await T7().list(hwPath);
  } catch {
    return 0;
  }
  let K = 0;
  for (let O of q) {
    if (!O.endsWith(".json")) continue;
    let T = parseInt(O.replace(".json", ""), 10);
    if (!isNaN(T) && T > K) K = T;
  }
  return K;
}
async function writeHighWatermark(listId) {
  let [_, q] = await Promise.all([readHighWatermark(listId), hr8(listId)]);
  return Math.max(_, q);
}
async function isTaskWriteInProgress(H, _) {
  let q = await readEffectiveMaxTaskId(H),
    K;
  try {
    K = await vA(q, gy_);
    let O = await writeHighWatermark(H),
      T = String(O + 1),
      z = {
        id: T,
        ..._
      },
      $ = emitTaskChange(H, T);
    return await T7().write($, xH(z, null, 2)), Fy_(), T;
  } finally {
    if (K) await K();
  }
}
async function clearTaskListDir(listId, _) {
  let q = emitTaskChange(listId, _);
  try {
    let K = await T7().read(q),
      O = i_(K),
      T = taskWriteInProgress().safeParse(O);
    if (!T.success) return N(`[Tasks] Task ${_} failed schema validation: ${T.error.message}`), null;
    return T.data;
  } catch (K) {
    if (L6(K) === "ENOENT") return null;
    if (N(`[Tasks] Failed to read task ${_}: ${GH(K)}`), !(K instanceof SyntaxError)) CH(K);
    return null;
  }
}
async function getCurrentTaskListId(H, _, q) {
  let K = await clearTaskListDir(H, _);
  if (!K) return null;
  let O = {
      ...K,
      ...q,
      id: _
    },
    T = emitTaskChange(H, _);
  return await T7().write(T, xH(O, null, 2)), Fy_(), O;
}
async function sanitizeIdForFilesystem(id, _, q) {
  let K = emitTaskChange(id, _);
  if (!(await clearTaskListDir(id, _))) return null;
  let T;
  try {
    return T = await vA(K, gy_), await getCurrentTaskListId(id, _, q);
  } finally {
    await T?.();
  }
}
async function getTaskListDir(listId, _) {
  let q = emitTaskChange(listId, _);
  try {
    let K = parseInt(_, 10);
    if (!isNaN(K)) {
      let T = await hr8(listId);
      if (K > T) await iqK(listId, K);
    }
    try {
      await T7().delete(q);
    } catch (T) {
      if (L6(T) === "ENOENT") return false;
      throw T;
    }
    let O = await getTaskFilePath(listId);
    for (let T of O) {
      let z = T.blocks.filter(Y => Y !== _),
        $ = T.blockedBy.filter(Y => Y !== _);
      if (z.length !== T.blocks.length || $.length !== T.blockedBy.length) await sanitizeIdForFilesystem(listId, T.id, {
        blocks: z,
        blockedBy: $
      });
    }
    return Fy_(), true;
  } catch {
    return false;
  }
}
async function getTaskFilePath(listId) {
  let _ = setActiveTaskListId(listId),
    q;
  try {
    q = await T7().list(_);
  } catch {
    return [];
  }
  let K = q.filter(T => T.endsWith(".json")).map(T => T.replace(".json", ""));
  return (await Promise.all(K.map(T => clearTaskListDir(listId, T)))).filter(T => T !== null).sort((T, z) => Number(T.id) - Number(z.id));
}
async function ensureTaskListDir(listId, _, q) {
  let [K, O] = await Promise.all([clearTaskListDir(listId, _), clearTaskListDir(listId, q)]);
  if (!K || !O) return false;
  if (!K.blocks.includes(q)) await sanitizeIdForFilesystem(listId, _, {
    blocks: [...K.blocks, q]
  });
  if (!O.blockedBy.includes(_)) await sanitizeIdForFilesystem(listId, q, {
    blockedBy: [...O.blockedBy, _]
  });
  return true;
}
function readMaxTaskId(listId) {
  return _q_.join(setActiveTaskListId(listId), ".lock");
}
async function readEffectiveMaxTaskId(listId) {
  await getLockFilePath(listId);
  let _ = readMaxTaskId(listId);
  try {
    await QqK.writeFile(_, "", {
      flag: "wx"
    });
  } catch {}
  return _;
}
async function createTask(listId, taskData, q, K = {}) {
  let O = emitTaskChange(listId, taskData);
  if (!(await clearTaskListDir(listId, taskData))) return {
    success: false,
    reason: "task_not_found"
  };
  if (K.checkAgentBusy) return readTask(listId, taskData, q);
  let z;
  try {
    z = await vA(O, gy_);
    let $ = await clearTaskListDir(listId, taskData);
    if (!$) return {
      success: false,
      reason: "task_not_found"
    };
    if ($.owner && $.owner !== q) return {
      success: false,
      reason: "already_claimed",
      task: $
    };
    if ($.status === "completed") return {
      success: false,
      reason: "already_resolved",
      task: $
    };
    let Y = await getTaskFilePath(listId),
      A = new Set(Y.filter(j => j.status !== "completed").map(j => j.id)),
      w = $.blockedBy.filter(j => A.has(j));
    if (w.length > 0) return {
      success: false,
      reason: "blocked",
      task: $,
      blockedByTasks: w
    };
    return {
      success: true,
      task: await getCurrentTaskListId(listId, taskData, {
        owner: q
      })
    };
  } catch ($) {
    return N(`[Tasks] Failed to claim task ${taskData}: ${GH($)}`), CH($), {
      success: false,
      reason: "task_not_found"
    };
  } finally {
    if (z) await z();
  }
}
async function readTask(listId, taskId, q) {
  let K = await readEffectiveMaxTaskId(listId),
    O;
  try {
    O = await vA(K, gy_);
    let T = await getTaskFilePath(listId),
      z = T.find(f => f.id === taskId);
    if (!z) return {
      success: false,
      reason: "task_not_found"
    };
    if (z.owner && z.owner !== q) return {
      success: false,
      reason: "already_claimed",
      task: z
    };
    if (z.status === "completed") return {
      success: false,
      reason: "already_resolved",
      task: z
    };
    let $ = new Set(T.filter(f => f.status !== "completed").map(f => f.id)),
      Y = z.blockedBy.filter(f => $.has(f));
    if (Y.length > 0) return {
      success: false,
      reason: "blocked",
      task: z,
      blockedByTasks: Y
    };
    let A = T.filter(f => f.status !== "completed" && f.owner === q && f.id !== taskId);
    if (A.length > 0) return {
      success: false,
      reason: "agent_busy",
      task: z,
      busyWithTasks: A.map(f => f.id)
    };
    return {
      success: true,
      task: await sanitizeIdForFilesystem(listId, taskId, {
        owner: q
      })
    };
  } catch (T) {
    return N(`[Tasks] Failed to claim task ${taskId} with busy check: ${GH(T)}`), CH(T), {
      success: false,
      reason: "task_not_found"
    };
  } finally {
    if (O) await O();
  }
}
async function updateTaskFields(listId, taskId, updates, K) {
  let T = (await getTaskFilePath(listId)).filter(Y => Y.status !== "completed" && (Y.owner === taskId || Y.owner === updates));
  for (let Y of T) await sanitizeIdForFilesystem(listId, Y.id, {
    owner: undefined,
    status: "pending"
  });
  if (T.length > 0) N(`[Tasks] Unassigned ${T.length} task(s) from ${updates}`);
  let $ = `${updates} ${K === "terminated" ? "was terminated" : "has shut down"}.`;
  if (T.length > 0) {
    let Y = T.map(A => `#${A.id} "${A.subject}"`).join(", ");
    $ += ` ${T.length} task(s) were unassigned: ${Y}. Use TaskList to check availability and TaskUpdate with owner to reassign them to idle teammates.`;
  }
  return {
    unassignedTasks: T.map(Y => ({
      id: Y.id,
      subject: Y.subject
    })),
    notificationMessage: $
  };
}
var QqK,
  _q_,
  cqK,
  Lr8,
  lqK,
  RxH,
  taskWriteInProgress,
  FB3 = ".highwatermark",
  gy_;
var $0 = L(() => {
  i8();
  Y_();
  of();
  gH();
  w6();
  G_();
  C6();
  GA();
  t_();
  Xz();
  oh();
  QqK = require("fs/promises"), _q_ = require("path"), cqK = _K();
  lqK = cqK.subscribe;
  RxH = yH(() => k.enum(["pending", "in_progress", "completed"])), taskWriteInProgress = yH(() => k.object({
    id: k.string(),
    subject: k.string(),
    description: k.string(),
    activeForm: k.string().optional(),
    owner: k.string().optional(),
    status: RxH(),
    blocks: k.array(k.string()),
    blockedBy: k.array(k.string()),
    metadata: k.record(k.string(), k.unknown()).optional()
  })), gy_ = {
    retries: {
      retries: 30,
      minTimeout: 5,
      maxTimeout: 100
    },
    onCompromised: H => CH(H)
  };
});
export {dqK as Qha,Fy_ as DBt,nqK as ega,hr8 as Sto,iqK as tga,_M as HE,rqK as nga,tC as gB,qq_ as cat,setActiveTaskListId as cq,emitTaskChange as uat,getLockFilePath as bto,readHighWatermark as rga,writeHighWatermark as bep,isTaskWriteInProgress as oga,clearTaskListDir as Fee,getCurrentTaskListId as sga,sanitizeIdForFilesystem as m_e,getTaskListDir as POn,getTaskFilePath as F$,ensureTaskListDir as Eto,readMaxTaskId as Eep,readEffectiveMaxTaskId as Cto,createTask as iga,readTask as Cep,updateTaskFields as dat,QqK as Jha,_q_ as lat,cqK as Xha,Lr8 as Tto,lqK as Zha,RxH as O3e,taskWriteInProgress as Tep,FB3 as Sep,gy_ as PBt,$0 as oH};
