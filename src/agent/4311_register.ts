// @ts-nocheck
import {h0n as QG6,ele as YYH} from "../../vendor/m3293.ts";
import {Wce as Y1H,Yot as t8_} from "../tools/4310_recursive.ts";
import {Fv as M2,bC as tM} from "../session/2784_uuid.ts";
import {nR as BP,Ax as uP} from "../../vendor/m5146.ts";
import {XKa as UdK,vC as _X} from "../../vendor/m5145.ts";
import {b as L} from "../../runtime.ts";
import {lt as A_} from "../session/0131_sent.ts";
import {initKp as pO} from "../../vendor/m609.ts";
import {sA as Fz} from "../../vendor/m2782.ts";
// @ts-nocheck
function FE6(H, _) {
  if (H === undefined || H.size === 0) return H;
  let q;
  for (let [K, O] of H) if (O === _) (q ??= new Map(H)).delete(K);
  return q ?? H;
}
function DomainCheckFailedError(progress, _) {
  return {
    register(q) {
      logShellAllowRuleAdded(q, _);
    },
    update(q, K) {
      gE6(q, _, K);
    },
    updateTranscript(q, K) {
      _(O => {
        let T = O.transcripts?.[q] ?? {
            messages: [],
            inProgressToolUseIDs: new Set()
          },
          z = K(T);
        if (z === T) return O;
        return {
          ...O,
          transcripts: {
            ...O.transcripts,
            [q]: z
          }
        };
      });
    },
    getTranscript(q) {
      return progress().transcripts[q];
    },
    remove(q) {
      QG6(q), _(K => {
        if (!(q in K.tasks)) return K;
        let {
            [q]: O,
            ...T
          } = K.tasks,
          z = K.transcripts ?? {},
          {
            [q]: $,
            ...Y
          } = z;
        return {
          ...K,
          tasks: T,
          transcripts: q in z ? Y : z,
          agentNameRegistry: FE6(K.agentNameRegistry, q)
        };
      });
    },
    evictTerminal(q) {
      HwH(q, _);
    },
    applyOffsetsAndEvict(q, K) {
      L3(_, q, K);
    },
    get(q) {
      return progress().tasks[q];
    },
    all() {
      return progress().tasks;
    },
    abortSpeculation() {
      Y1H(_);
    }
  };
}
function gE6(progress, streamMessage, getActivityDesc) {
  let K = null;
  if (streamMessage(O => {
    let T = O.tasks?.[progress];
    if (!T) return O;
    let z = getActivityDesc(T);
    if (z === T) return O;
    return K = gC_(T, z), {
      ...O,
      tasks: {
        ...O.tasks,
        [progress]: z
      }
    };
  }), K !== null) M2({
    type: "system",
    subtype: "task_updated",
    task_id: progress,
    patch: K
  });
}
function gC_(progress, _) {
  let q = {};
  if (_.status !== progress.status) q.status = _.status;
  if (_.description !== progress.description) q.description = _.description;
  if (_.endTime !== progress.endTime) q.end_time = _.endTime;
  if (_.totalPausedMs !== progress.totalPausedMs) q.total_paused_ms = _.totalPausedMs;
  let K = "error" in progress ? progress.error : undefined,
    O = "error" in _ ? _.error : undefined;
  if (O !== K && O !== undefined) q.error = O;
  let T = "isBackgrounded" in progress ? progress.isBackgrounded : undefined,
    z = "isBackgrounded" in _ ? _.isBackgrounded : undefined;
  if (z !== T && z !== undefined) q.is_backgrounded = z;
  return Object.keys(q).length > 0 ? q : null;
}
function logShellAllowRuleAdded(tools, _) {
  let q = false;
  if (_(K => {
    let O = K.tasks[tools.id];
    q = O !== undefined;
    let T = O && "retain" in O ? {
      ...tools,
      retain: O.retain,
      startTime: O.startTime,
      diskLoaded: O.diskLoaded,
      pendingMessages: O.pendingMessages,
      keepaliveReasons: O.keepaliveReasons,
      ownerAgentId: O.ownerAgentId,
      parentAgentId: O.parentAgentId,
      spawnDepth: O.spawnDepth
    } : tools;
    return {
      ...K,
      tasks: {
        ...K.tasks,
        [tools.id]: T
      }
    };
  }), q) return;
  M2({
    type: "system",
    subtype: "task_started",
    task_id: tools.id,
    tool_use_id: tools.toolUseId,
    description: tools.description,
    subagent_type: "agentType" in tools ? tools.agentType : undefined,
    task_type: tools.type,
    workflow_name: "workflowName" in tools ? tools.workflowName : undefined,
    prompt: "prompt" in tools ? tools.prompt : undefined,
    skip_transcript: tools.skipTranscript
  });
}
function HwH(task, _) {
  let q = false;
  if (_(K => {
    let O = K.tasks?.[task];
    if (!O) return K;
    if (!BP(O.status)) return K;
    if (!O.notified) return K;
    if ("retain" in O && (O.evictAfter ?? 1 / 0) > Date.now()) return K;
    if ("retain" in O && (O.keepaliveReasons?.size ?? 0) > 0) return K;
    if (O.type === "local_workflow" && (O.evictAfter ?? 0) > Date.now()) return K;
    q = true;
    let {
        [task]: T,
        ...z
      } = K.tasks,
      $ = K.transcripts ?? {},
      {
        [task]: Y,
        ...w
      } = $;
    return {
      ...K,
      tasks: z,
      transcripts: task in $ ? w : $,
      agentNameRegistry: FE6(K.agentNameRegistry, task)
    };
  }), q) QG6(task);
}
function FE(task) {
  let _ = task.tasks ?? {};
  return Object.values(_).filter(q => q.status === "running");
}
async function MOq(task) {
  let _ = [],
    q = {},
    K = [];
  for (let O of Object.values(task)) {
    if (O.notified) switch (O.status) {
      case "completed":
      case "failed":
      case "killed":
        K.push(O.id);
        continue;
      case "pending":
        continue;
      case "running":
        break;
    }
    if (O.status === "running") {
      let T = await UdK(O.id, O.outputOffset);
      if (T.content) q[O.id] = T.newOffset;
    }
  }
  return {
    attachments: _,
    updatedTaskOffsets: q,
    evictedTaskIds: K
  };
}
function L3(task, _, q) {
  let K = Object.keys(_);
  if (K.length === 0 && q.length === 0) return;
  let O = [];
  task(T => {
    let z = false,
      $ = {
        ...T.tasks
      };
    for (let A of K) {
      let f = $[A];
      if (f?.status === "running") $[A] = {
        ...f,
        outputOffset: _[A]
      }, z = true;
    }
    for (let A of q) {
      let f = $[A];
      if (!f || !BP(f.status) || !f.notified) continue;
      if ("retain" in f && (f.evictAfter ?? 1 / 0) > Date.now()) continue;
      if ("retain" in f && (f.keepaliveReasons?.size ?? 0) > 0) continue;
      if (f.type === "local_workflow" && (f.evictAfter ?? 0) > Date.now()) continue;
      delete $[A], O.push(A), z = true;
    }
    if (!z) return T;
    let Y = T.agentNameRegistry,
      w;
    for (let A of O) if (Y = FE6(Y, A), T.transcripts && A in T.transcripts) w ??= {
      ...T.transcripts
    }, delete w[A];
    return {
      ...T,
      tasks: $,
      agentNameRegistry: Y,
      ...(w && {
        transcripts: w
      })
    };
  });
  for (let T of O) QG6(T);
}
var KuK = 3000,
  lI_ = 30000;
var k_H = L(() => {
  A_();
  YYH();
  pO();
  t8_();
  uP();
  Fz();
  tM();
  _X();
});

export {FE6 as Xmo,DomainCheckFailedError as LP,gE6 as S1p,gC_ as b1p,logShellAllowRuleAdded as E1p,HwH as C1p,FE as I4n,MOq as JKa,L3 as v1p,KuK as kDa,lI_ as Vqe,k_H as MY};
