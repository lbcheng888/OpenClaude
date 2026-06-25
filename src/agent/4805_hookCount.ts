// @ts-nocheck
import {b} from "../../runtime.ts";
// @ts-nocheck
function isStopHookSummaryMessage(msg) {
  return msg.type === "system" && msg.subtype === "stop_hook_summary" && msg.hookLabel !== undefined;
}
function mergeConsecutiveHookSummaries(messages) {
  let result = [],
    idx = 0;
  while (idx < messages.length) {
    let msg = messages[idx];
    if (isStopHookSummaryMessage(msg)) {
      let hookLabel = msg.hookLabel,
        group = [];
      while (idx < messages.length) {
        let current = messages[idx];
        if (!isStopHookSummaryMessage(current) || current.hookLabel !== hookLabel) break;
        group.push(current), idx++;
      }
      if (group.length === 1) result.push(msg);else result.push({
        ...msg,
        hookCount: group.reduce((acc, entry) => acc + entry.hookCount, 0),
        hookInfos: group.flatMap(entry => entry.hookInfos),
        hookErrors: group.flatMap(entry => entry.hookErrors),
        hookAdditionalContext: group.flatMap(entry => entry.hookAdditionalContext ?? []),
        preventedContinuation: group.some(entry => entry.preventedContinuation),
        hasOutput: group.some(entry => entry.hasOutput),
        totalDurationMs: Math.max(...group.map(entry => entry.totalDurationMs ?? 0))
      });
    } else result.push(msg), idx++;
  }
  return result;
}
function isCompletedTeammateAttachment(msg) {
  return msg.type === "attachment" && msg.attachment.type === "task_status" && msg.attachment.taskType === "in_process_teammate" && msg.attachment.status === "completed";
}
function mergeConsecutiveTeammateShutdowns(messages) {
  let result = [],
    idx = 0;
  while (idx < messages.length) {
    let msg = messages[idx];
    if (isCompletedTeammateAttachment(msg)) {
      let count = 0;
      while (idx < messages.length && isCompletedTeammateAttachment(messages[idx])) count++, idx++;
      if (count === 1) result.push(msg);else result.push({
        type: "attachment",
        uuid: msg.uuid,
        timestamp: msg.timestamp,
        attachment: {
          type: "teammate_shutdown_batch",
          count: count
        }
      });
    } else result.push(msg), idx++;
  }
  return result;
}
function BXp(e) {
  let t = renderGroupedToolUseNamesCache.get(e);
  if (!t) t = new Set(e.filter(n => n.renderGroupedToolUse).map(n => n.name)), renderGroupedToolUseNamesCache.set(e, t);
  return t;
}
function getRenderGroupedToolUseNames(tools) {
  if (tools.type === "assistant" && tools.message.content[0]?.type === "tool_use") {
    let t = tools.message.content[0];
    return {
      messageId: tools.message.id,
      toolUseId: t.id,
      toolName: t.name
    };
  }
  return null;
}
function extractFirstToolUseRef(msg, t, n = false) {
  if (n) return {
    messages: msg
  };
  let r = BXp(t),
    o = new Map();
  for (let u of msg) {
    if (u.type !== "assistant") continue;
    let d = u.message.content[0];
    if (d?.type !== "tool_use" || !r.has(d.name)) continue;
    let p = `${u.message.id}:${d.name}`,
      m = o.get(p) ?? [];
    m.push(u), o.set(p, m);
  }
  let s = new Map(),
    i = new Set();
  for (let [u, d] of o) if (d.length >= 2) {
    s.set(u, d);
    for (let p of d) {
      let m = getRenderGroupedToolUseNames(p);
      if (m) i.add(m.toolUseId);
    }
  }
  if (s.size === 0) return {
    messages: msg
  };
  let a = new Map();
  for (let u of msg) if (u.type === "user") {
    for (let d of u.message.content) if (d.type === "tool_result" && i.has(d.tool_use_id)) a.set(d.tool_use_id, u);
  }
  let l = [],
    c = new Set();
  for (let u of msg) {
    let d = getRenderGroupedToolUseNames(u);
    if (d) {
      let p = `${d.messageId}:${d.toolName}`,
        m = s.get(p);
      if (m) {
        if (!c.has(p)) {
          c.add(p);
          let f = m[0],
            A = [];
          for (let g of m) {
            let _ = g.message.content[0].id,
              y = a.get(_);
            if (y) A.push(y);
          }
          let h = {
            type: "grouped_tool_use",
            toolName: d.toolName,
            messages: m,
            results: A,
            displayMessage: f,
            uuid: `grouped-${f.uuid}`,
            timestamp: f.timestamp,
            messageId: d.messageId
          };
          l.push(h);
        }
        continue;
      }
    }
    if (u.type === "user") {
      let p = u.message.content.filter(m => m.type === "tool_result");
      if (p.length > 0) {
        if (p.every(f => i.has(f.tool_use_id))) continue;
      }
    }
    l.push(u);
  }
  return {
    messages: l
  };
}
var renderGroupedToolUseNamesCache;
var EO4 = b(() => {
  renderGroupedToolUseNamesCache = new WeakMap();
});
export {isStopHookSummaryMessage as dvl,mergeConsecutiveHookSummaries as pvl,isCompletedTeammateAttachment as mvl,mergeConsecutiveTeammateShutdowns as fvl,BXp as Lcm,getRenderGroupedToolUseNames as gvl,extractFirstToolUseRef as _vl,renderGroupedToolUseNamesCache as hvl,EO4 as yvl};
