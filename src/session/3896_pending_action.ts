// @ts-nocheck
import {st as rt} from "../../vendor/m5.ts";
import {Fv as Ov,bC as gC} from "./2784_uuid.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "../config/0047_namespace.ts";
// @ts-nocheck
class SessionStateManager {
  onStateChanged;
  onWaitingOnUserChanged;
  onTurnStarting;
  onMetadataChanged;
  onInternalMetadataChanged;
  onPermissionModeChanged;
  currentState = "idle";
  hasPendingAction = false;
  hasTaskSummary = false;
  hasTerminalGoalSnapshot = false;
  mainLoopRefcount = 0;
  lastWaitingOnUser = false;
  getState() {
    return this.currentState;
  }
  get waitingOnUser() {
    return this.currentState === "requires_action" && this.mainLoopRefcount === 0;
  }
  setMainLoopRefcount(refcount) {
    this.mainLoopRefcount = refcount, this.emitIfWaitingChanged();
  }
  emitIfWaitingChanged() {
    let waiting = this.waitingOnUser;
    if (waiting !== this.lastWaitingOnUser) this.lastWaitingOnUser = waiting, this.onWaitingOnUserChanged?.(waiting);
  }
  reteeWaitingOnUser() {
    this.onWaitingOnUserChanged?.(this.waitingOnUser);
  }
  notifyTurnStarting() {
    this.onTurnStarting?.();
  }
  notifyStateChanged(newState, pendingAction) {
    if (this.currentState = newState, this.lastWaitingOnUser = this.waitingOnUser, this.onStateChanged?.(newState, pendingAction), newState === "requires_action" && pendingAction) this.hasPendingAction = true, this.onMetadataChanged?.({
      pending_action: pendingAction
    });else if (this.hasPendingAction) this.hasPendingAction = false, this.onMetadataChanged?.({
      pending_action: null
    });
    if (newState === "running") {
      if (this.onMetadataChanged?.({
        post_turn_summary: null,
        recap: null
      }), this.hasTerminalGoalSnapshot) this.hasTerminalGoalSnapshot = false, this.onMetadataChanged?.({
        goal: null
      });
    }
    if (newState === "idle" && this.hasTaskSummary) this.hasTaskSummary = false, this.notifyMetadataChanged({
      task_summary: null
    });
    if (rt(process.env.CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS)) Ov({
      type: "system",
      subtype: "session_state_changed",
      state: newState
    });
  }
  republishPendingAction(pendingAction) {
    this.hasPendingAction = true, this.onMetadataChanged?.({
      pending_action: pendingAction
    });
  }
  notifyMetadataChanged(meta) {
    if (this.onMetadataChanged?.(meta), "goal" in meta) this.hasTerminalGoalSnapshot = meta.goal?.met === true;
    if ("task_summary" in meta) {
      if (meta.task_summary != null) this.hasTaskSummary = true;
      Ov({
        type: "system",
        subtype: "task_summary",
        detail: meta.task_summary ?? null
      });
    }
  }
  notifyPermissionModeChanged(mode) {
    this.onPermissionModeChanged?.(mode);
  }
  notifyInternalMetadataChanged(meta) {
    this.onInternalMetadataChanged?.(meta);
  }
}
function buildContainerRestartSystemReminder(stoppedTasks) {
  return `<system-reminder>
The container was restarted. The following background tasks were running and are now stopped:
${stoppedTasks.map(task => `- ${task.description || "(no description)"} (task ${task.task_id})`).join(`
`)}
Re-create them if still needed.
</system-reminder>`;
}
var LS6 = b(() => {
  an();
  gC();
});

export {SessionStateManager as C2t,buildContainerRestartSystemReminder as oOa,LS6 as NFn};
