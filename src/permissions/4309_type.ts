// @ts-nocheck
import {w4 as m4,BHt as dHt} from "../../vendor/m2206.ts";
import {wT as yT,tne as Gte,lo} from "../tools/5190_userPromptCount.ts";
import {Edt as Zut,Wmo as Npo} from "../core/4308_id.ts";
import {getSessionId as kt,isSessionPersistenceDisabled as i3,lt as ct} from "../session/0131_sent.ts";
import {st as rt} from "../../vendor/m5.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {jmo as Mpo,jKa as b7a} from "../tools/4307_isConcurrencySafe.ts";
import {runForkedQuery as JW,bdt as Qut} from "../tools/4306_code.ts";
import {recordTranscript as Wte,ja as za} from "./5143_writeRemoteAgentMetadata.ts";
import {Cl as vl,Ri} from "../tools/2227_userFacingName.ts";
import {iN as X1,gq as rq,lx as sx} from "../../vendor/m2777.ts";
import {Y$ as N$,xk as Ck} from "../../vendor/m2715.ts";
import {Ws as Bs,Oyn as J_n,oIt as BHt,ef as sf} from "../../vendor/m2248.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {zc as Jc,ex as XR} from "../../vendor/m2582.ts";
import {Ua as $a,ty} from "../../vendor/m2245.ts";
import {tQo as VJo,tQ as VX,mc} from "../config/0645_maxBytes.ts";
import {eQ as GX,bB as mB} from "../../vendor/m634.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "../config/0047_namespace.ts";
// @ts-nocheck
function cQ6(H, t = null) {
  if (!H) return false;
  if (H.type === "assistant") {
    let n = m4(H.message.content);
    return n?.type === "text" || n?.type === "thinking" || n?.type === "redacted_thinking";
  }
  if (H.type === "user") {
    let n = H.message.content;
    if (Array.isArray(n) && n.length > 0 && n.every(r => "type" in r && r.type === "tool_result")) return true;
  }
  return t === "end_turn";
}
function* F9T(H, _) {
  switch (H.type) {
    case "assistant":
      {
        let n = H.supersedesUuids;
        for (let r of yT([H])) {
          if (!Gte(r)) continue;
          let o = n;
          n = undefined;
          let s = Zut(r.message.content, _);
          yield {
            type: "assistant",
            message: r.message,
            parent_tool_use_id: null,
            session_id: kt(),
            uuid: r.uuid,
            error: r.error,
            ...(r.requestId !== undefined && {
              request_id: r.requestId
            }),
            ...(o !== undefined && o.length > 0 && {
              supersedes: o
            }),
            ...(s.length > 0 && {
              tool_use_meta: s
            })
          };
        }
        return;
      }
    case "progress":
      if (H.data.type === "agent_progress" || H.data.type === "skill_progress") {
        let n = H.data.agentType,
          r = H.data.description;
        for (let o of yT([H.data.message])) switch (o.type) {
          case "assistant":
            if (!Gte(o)) break;
            {
              let s = Zut(o.message.content, _);
              yield {
                type: "assistant",
                message: o.message,
                parent_tool_use_id: H.parentToolUseID,
                session_id: kt(),
                uuid: o.uuid,
                error: o.error,
                ...(o.requestId !== undefined && {
                  request_id: o.requestId
                }),
                ...(n !== undefined && {
                  subagent_type: n
                }),
                ...(r !== undefined && {
                  task_description: r
                }),
                ...(s.length > 0 && {
                  tool_use_meta: s
                })
              };
            }
            break;
          case "user":
            yield {
              type: "user",
              message: o.message,
              parent_tool_use_id: H.parentToolUseID,
              session_id: kt(),
              uuid: o.uuid,
              timestamp: o.timestamp,
              isSynthetic: o.isMeta || o.isVisibleInTranscriptOnly,
              tool_use_result: o.toolUseResult,
              ...(o.origin && {
                origin: o.origin
              }),
              ...(n !== undefined && {
                subagent_type: n
              }),
              ...(r !== undefined && {
                task_description: r
              })
            };
            break;
        }
      } else if (H.data.type === "repl_tool_call") yield {
        type: "tool_progress",
        tool_use_id: H.toolUseID,
        tool_name: "REPL",
        parent_tool_use_id: H.parentToolUseID,
        elapsed_time_seconds: 0,
        repl_call: {
          inner_tool_name: H.data.toolName,
          inner_tool_input: H.data.toolInput,
          inner_tool_use_id: H.data.toolUseId,
          phase: H.data.phase
        },
        session_id: kt(),
        uuid: H.uuid
      };else if (H.data.type === "bash_progress" || H.data.type === "powershell_progress") {
        if (!rt(process.env.CLAUDE_CODE_REMOTE) && !process.env.CLAUDE_CODE_CONTAINER_ID) break;
        let n = H.parentToolUseID,
          r = Date.now(),
          o = HU_.get(n) || 0;
        if (r - o >= oW4) {
          if (HU_.size >= rW4) {
            let i = HU_.keys().next().value;
            if (i !== undefined) HU_.delete(i);
          }
          HU_.set(n, r), yield {
            type: "tool_progress",
            tool_use_id: H.toolUseID,
            tool_name: H.data.type === "bash_progress" ? "Bash" : "PowerShell",
            parent_tool_use_id: H.parentToolUseID,
            elapsed_time_seconds: H.data.elapsedTimeSeconds,
            task_id: H.data.taskId,
            session_id: kt(),
            uuid: H.uuid
          };
        }
      }
      break;
    case "user":
      for (let n of yT([H])) yield {
        type: "user",
        message: n.message,
        parent_tool_use_id: null,
        session_id: kt(),
        uuid: n.uuid,
        timestamp: n.timestamp,
        isSynthetic: n.isMeta || n.isVisibleInTranscriptOnly,
        tool_use_result: n.mcpMeta ? {
          content: n.toolUseResult,
          ...n.mcpMeta
        } : n.toolUseResult,
        ...(n.origin && {
          origin: n.origin
        })
      };
      return;
    default:
  }
}
async function* g9T(H, _, q, r) {
  let o = !i3(),
    s = Lr(r).mode;
  if (s !== H.permissionMode) v(`Deferred tool resume: permissionMode mismatch (deferred under '${H.permissionMode}', resuming under '${s}'). --resume does not restore permissionMode \u2014 pass --permission-mode ${H.permissionMode} to match.`, {
    level: "warn"
  });
  let i = q.findLast(l => l.type === "assistant" && Array.isArray(l.message.content) && l.message.content.some(c => c.type === "tool_use" && c.id === H.toolUseID));
  if (!i || i.type !== "assistant") {
    v(`Deferred tool resume: tool_use ${H.toolUseID} not found in transcript`, {
      level: "warn"
    });
    return;
  }
  let a = i.message.content.find(l => l.type === "tool_use" && l.id === H.toolUseID);
  if (!a) return;
  v(`Deferred tool resume: re-emitting ${H.toolName} (${H.toolUseID}) through PreToolUse`);
  for await (let l of Mpo([a], [i], _, r)) {
    if (JW(l)) continue;
    if (l.message) {
      if (q.push(l.message), o) await Wte(q);
      yield {
        ...l.message,
        session_id: kt(),
        parent_tool_use_id: null
      };
    }
  }
}
async function* Q9T(H, t, n, r) {
  let o = !i3(),
    {
      permissionResult: s,
      assistantMessage: i
    } = H,
    {
      toolUseID: a
    } = s;
  if (!a) {
    v("handleOrphanedPermission: dropping orphaned permission \u2014 permissionResult is missing toolUseID", {
      level: "warn"
    });
    return;
  }
  let l = i.message.content,
    c;
  if (Array.isArray(l)) {
    for (let g of l) if (g.type === "tool_use" && g.id === a) {
      c = g;
      break;
    }
  }
  if (!c) {
    v(`handleOrphanedPermission: dropping orphaned permission for toolUseID=${a} \u2014 assistant message ${i.message.id} has no matching tool_use block`, {
      level: "warn"
    });
    return;
  }
  let u = c.name;
  if (!vl(t, u, r.options.toolAliases)) {
    v(`handleOrphanedPermission: dropping orphaned permission for toolUseID=${a} \u2014 tool "${u}" not found in active tools (${t.length} available)`, {
      level: "warn"
    });
    return;
  }
  let p;
  if (s.behavior === "allow") {
    let g = s.updatedInput;
    if (g && Object.keys(g).length > 0) p = g;else v(`Orphaned permission for ${u}: updatedInput is missing or empty, falling back to original tool input`, {
      level: "warn"
    });
    let _ = s.updatedPermissions;
    if (Array.isArray(_)) try {
      r.setToolPermissionContext(y => X1(y, _)), rq(_);
    } catch (y) {
      v(`Orphaned permission for ${u}: malformed updatedPermissions ignored: ${y}`, {
        level: "warn"
      });
    }
  }
  let m = async () => ({
    ...s,
    updatedInput: p,
    decisionReason: {
      type: "mode",
      mode: "default"
    }
  });
  if (!n.some(g => g.type === "assistant" && Array.isArray(g.message.content) && g.message.content.some(_ => _.type === "tool_use" && "id" in _ && _.id === a))) {
    if (n.push(i), o) await Wte(n);
  }
  let A = Zut(i.message.content, t);
  yield {
    ...i,
    session_id: kt(),
    parent_tool_use_id: null,
    ...(A.length > 0 && {
      tool_use_meta: A
    })
  };
  for await (let g of Mpo([c], [i], m, r)) {
    if (JW(g)) continue;
    if (g.message) {
      if (n.push(g.message), o) await Wte(n);
      yield {
        ...g.message,
        session_id: kt(),
        parent_tool_use_id: null
      };
    }
  }
}
function c9T(H, t, n = xOp) {
  let r = N$(n),
    o = new Map(),
    s = new Map(),
    i = new Map();
  for (let a of H) if (a.type === "assistant" && Array.isArray(a.message.content)) for (let l of a.message.content) {
    if (l.type !== "tool_use") continue;
    try {
      if (l.name === Bs) {
        let c = l.input;
        if (typeof c?.file_path === "string" && c.offset === undefined && c.limit === undefined) o.set(l.id, Rs(c.file_path, t));
      } else if (l.name === Jc) {
        let c = l.input;
        if (typeof c?.file_path === "string" && typeof c.content === "string") s.set(l.id, {
          filePath: Rs(c.file_path, t),
          content: c.content
        });
      } else if (l.name === $a) {
        let c = l.input;
        if (typeof c?.file_path === "string") i.set(l.id, Rs(c.file_path, t));
      }
    } catch (c) {
      v(`extractReadFilesFromMessages: skipping malformed ${l.name} tool_use: ${c}`);
    }
  }
  for (let a of H) if (a.type === "user" && Array.isArray(a.message.content)) {
    for (let l of a.message.content) if (l.type === "tool_result" && l.tool_use_id) {
      let c = o.get(l.tool_use_id);
      if (c && l.is_error !== true && typeof l.content === "string" && !J_n(l.content)) {
        let p = l.content.startsWith("<system-reminder>" + BHt),
          f = l.content.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, "").split(`
`).map(VJo).join(`
`).trim();
        if (a.timestamp) {
          let A = new Date(a.timestamp).getTime();
          r.set(c, {
            content: f,
            timestamp: A,
            offset: 1,
            limit: undefined,
            ...(p && {
              isPartialView: true
            })
          });
        }
      }
      let u = s.get(l.tool_use_id);
      if (u && l.is_error !== true && a.timestamp) {
        let p = new Date(a.timestamp).getTime();
        r.set(u.filePath, {
          content: u.content,
          timestamp: p,
          offset: undefined,
          limit: undefined
        });
      }
      let d = i.get(l.tool_use_id);
      if (d && l.is_error !== true) try {
        let {
          content: p
        } = GX(d);
        r.set(d, {
          content: p,
          timestamp: VX(d),
          offset: undefined,
          limit: undefined
        });
      } catch (p) {
        v(`extractReadFilesFromMessages: skipping Edit disk read for ${d}: ${Se(p)}`);
      }
    }
  }
  return r;
}
var xOp = 10,
  rW4 = 100,
  oW4 = 30000,
  HU_;
var yMq = b(() => {
  dHt();
  ct();
  Qut();
  b7a();
  Ri();
  ty();
  sf();
  XR();
  Xl();
  je();
  an();
  St();
  mc();
  mB();
  Ck();
  lo();
  Pu();
  sx();
  za();
  Npo();
  HU_ = new Map();
});

export {cQ6 as Gmo,F9T as Fct,g9T as WKa,Q9T as GKa,c9T as Cdt,xOp as a1p,rW4 as l1p,oW4 as c1p,HU_ as W3t,yMq as wqe};
