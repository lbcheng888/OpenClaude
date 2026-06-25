// @ts-nocheck
import {yD as LO} from "../config/2259_R9r.ts";
import {pollRemoteSessionEvents as CHe,qD as wP} from "../permissions/3888_validateSessionRepository.ts";
import {isTransientNetworkError as BXe,NR as Rw} from "../api/2195_updateSessionTitle.ts";
import {sleep as Fn} from "../telemetry/1488_withTimeout.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
class PlanApprovalTracker {
  exitPlanCalls = [];
  results = new Map();
  rejectedIds = new Set();
  terminated = null;
  rescanAfterRejection = false;
  everSeenPending = false;
  get rejectCount() {
    return this.rejectedIds.size;
  }
  get hasPendingPlan() {
    let lastNonRejected = this.exitPlanCalls.findLast(id => !this.rejectedIds.has(id));
    return lastNonRejected !== undefined && !this.results.has(lastNonRejected);
  }
  ingest(messages) {
    for (let msg of messages) if (msg.type === "assistant") for (let contentItem of msg.message.content) {
      if (contentItem.type !== "tool_use") continue;
      let toolUse = contentItem;
      if (toolUse.name === LO) this.exitPlanCalls.push(toolUse.id);
    } else if (msg.type === "user") {
      let contentItems = msg.message.content;
      if (!Array.isArray(contentItems)) continue;
      for (let item of contentItems) if (item.type === "tool_result") this.results.set(item.tool_use_id, item);
    } else if (msg.type === "result" && msg.subtype !== "success") this.terminated = {
      subtype: msg.subtype
    };
    let shouldScan = messages.length > 0 || this.rescanAfterRejection;
    this.rescanAfterRejection = false;
    let action = null;
    if (shouldScan) {
      for (let idx = this.exitPlanCalls.length - 1; idx >= 0; idx--) {
        let callId = this.exitPlanCalls[idx];
        if (this.rejectedIds.has(callId)) continue;
        let toolResult = this.results.get(callId);
        if (!toolResult) action = {
          kind: "pending"
        };else if (toolResult.is_error === true) {
          let teleportPlan = extractTeleportPlan(toolResult.content);
          action = teleportPlan !== null ? {
            kind: "teleport",
            plan: teleportPlan
          } : {
            kind: "rejected",
            id: callId
          };
        } else action = {
          kind: "approved",
          plan: extractApprovedPlan(toolResult.content)
        };
        break;
      }
      if (action?.kind === "approved" || action?.kind === "teleport") return action;
    }
    if (action?.kind === "rejected") this.rejectedIds.add(action.id), this.rescanAfterRejection = true;
    if (this.terminated) return {
      kind: "terminated",
      subtype: this.terminated.subtype
    };
    if (action?.kind === "rejected") return action;
    if (action?.kind === "pending") return this.everSeenPending = true, action;
    return {
      kind: "unchanged"
    };
  }
}
async function pollUltraplanApproval(sessionId, timeoutMs, onPhaseChange, shouldStop) {
  let deadline = Date.now() + timeoutMs,
    tracker = new PlanApprovalTracker(),
    eventStats = {
      eventsReceived: 0,
      firstEventAt: undefined,
      lastEventAt: undefined
    },
    lastEventId = null,
    consecutiveErrors = 0,
    currentPhase = "running";
  while (Date.now() < deadline) {
    if (shouldStop()) throw Error("poll stopped by caller");
    let newEvents, sessionStatus;
    try {
      let fetchResult = await CHe(sessionId, lastEventId);
      if (newEvents = fetchResult.newEvents, lastEventId = fetchResult.lastEventId, sessionStatus = fetchResult.sessionStatus, consecutiveErrors = 0, newEvents.length > 0) {
        let now = Date.now();
        eventStats.eventsReceived += newEvents.length, eventStats.firstEventAt ??= now, eventStats.lastEventAt = now;
      }
    } catch (err) {
      if (!BXe(err)) throw new UltraplanPollError(err instanceof Error ? err.message : String(err), "network_or_unknown", tracker.rejectCount, eventStats, {
        cause: err
      });
      if (++consecutiveErrors >= EoO) throw new UltraplanPollError("Lost connection to the cloud session after repeated retries \u2014 the session may still be running", "network_or_unknown", tracker.rejectCount, eventStats, {
        cause: err
      });
      await Fn(POLL_INTERVAL_MS);
      continue;
    }
    let ingestResult;
    try {
      ingestResult = tracker.ingest(newEvents);
    } catch (err) {
      throw new UltraplanPollError(err instanceof Error ? err.message : String(err), "extract_marker_missing", tracker.rejectCount, eventStats);
    }
    if (ingestResult.kind === "approved") return {
      plan: ingestResult.plan,
      rejectCount: tracker.rejectCount,
      executionTarget: "remote"
    };
    if (ingestResult.kind === "teleport") return {
      plan: ingestResult.plan,
      rejectCount: tracker.rejectCount,
      executionTarget: "local"
    };
    if (ingestResult.kind === "terminated") throw new UltraplanPollError(`cloud session ended (${ingestResult.subtype}) before plan approval`, "terminated", tracker.rejectCount, eventStats);
    let isIdle = (sessionStatus === "idle" || sessionStatus === "requires_action") && newEvents.length === 0,
      nextPhase = tracker.hasPendingPlan ? "plan_ready" : isIdle ? "needs_input" : "running";
    if (nextPhase !== currentPhase) v(`[ultraplan] phase ${currentPhase} \u2192 ${nextPhase}`), currentPhase = nextPhase, onPhaseChange(nextPhase);
    await Fn(POLL_INTERVAL_MS);
  }
  let timeoutMinutes = Math.round(timeoutMs / 60000),
    minuteLabel = timeoutMinutes === 1 ? "minute" : "minutes";
  throw new UltraplanPollError(tracker.everSeenPending ? `no approval after ${timeoutMinutes} ${minuteLabel}` : `ExitPlanMode never reached after ${timeoutMinutes} ${minuteLabel} (the remote container failed to start, or session ID mismatch?)`, tracker.everSeenPending ? "timeout_pending" : "timeout_no_plan", tracker.rejectCount, eventStats);
}
function extractTextContent(content) {
  return typeof content === "string" ? content : Array.isArray(content) ? content.map(block => "text" in block ? block.text : "").join("") : "";
}
function extractTeleportPlan(content) {
  let text = extractTextContent(content),
    markerLine = `${ULTRAPLAN_TELEPORT_MARKER}
`,
    markerIndex = text.indexOf(markerLine);
  if (markerIndex === -1) return null;
  return text.slice(markerIndex + markerLine.length).trimEnd();
}
function extractApprovedPlan(content) {
  let text = extractTextContent(content),
    headers = [`## Approved Plan (edited by user):
`, `## Approved Plan:
`];
  for (let header of headers) {
    let headerIndex = text.indexOf(header);
    if (headerIndex !== -1) return text.slice(headerIndex + header.length).trimEnd();
  }
  throw Error(`ExitPlanMode approved but tool_result has no "## Approved Plan:" marker \u2014 remote may have hit the empty-plan or isAgent branch. Content preview: ${text.slice(0, 200)}`);
}
var POLL_INTERVAL_MS = 3000,
  EoO = 5,
  UltraplanPollError,
  ULTRAPLAN_TELEPORT_MARKER = "__ULTRAPLAN_TELEPORT_LOCAL__";
var d$4 = b(() => {
  je();
  Rw();
  wP();
  UltraplanPollError = class UltraplanPollError extends Error {
    reason;
    rejectCount;
    eventStats;
    constructor(message, reason, rejectCount, eventStats, options) {
      super(message, options);
      this.reason = reason;
      this.rejectCount = rejectCount;
      this.eventStats = eventStats;
      this.name = "UltraplanPollError";
    }
  };
});
export {PlanApprovalTracker as GHl,pollUltraplanApproval as VHl,extractTextContent as KHl,extractTeleportPlan as Gpm,extractApprovedPlan as Vpm,POLL_INTERVAL_MS as WHl,EoO as qpm,UltraplanPollError as vue,ULTRAPLAN_TELEPORT_MARKER as Wpm,d$4 as zHl};
