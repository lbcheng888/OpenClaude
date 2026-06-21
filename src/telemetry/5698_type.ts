// @ts-nocheck
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/**
 * Cancel a stale parked prompt from a prior worker on session resume.
 *
 * When a session resumes, a `pending_action` recorded in external state may
 * belong to a previous worker that is now gone.  If the current worker does
 * not already own the corresponding request (i.e. it is not in its own
 * pending-permission or pending-dialog queues) this function sends a
 * `control_cancel_request` message to clear the stale prompt and emits a
 * `tengu_resume_stale_prompt_cancel` telemetry event.
 *
 * Cross-module symbols (kept as-is to preserve linkage):
 *   N   – logger
 *   c   – fire a telemetry event
 *   tH  – encode a telemetry enum/string value
 *   L   – lazy-module initializer factory
 *   y_  – module init: core logging
 *   FH  – module init: settings / session helpers
 */

/** Minimal shape of a pending permission/dialog request that carries a request_id. */
interface PendingRequest {
  request_id: string;
}

/** Shape of the pending_action recorded in external session state. */
interface PendingAction {
  request_id: string;
  tool_name?: string;
}

/** External session state that may carry a pending_action from a prior worker. */
interface ExternalSessionState {
  pending_action?: PendingAction;
}

/** Session/worker context exposing pending-request queues and a write channel. */
interface WorkerContext {
  getPendingPermissionRequests(): PendingRequest[];
  getPendingUserDialogRequests(): PendingRequest[];
  write(msg: { type: string; request_id: string }): void;
}

/**
 * Cancel a stale parked prompt that was left by a prior worker.
 *
 * @param worker  - The current worker context.
 * @param sessionState - Resumed session state that may contain a stale pending_action.
 */
function resumeStalePromptCancel(
  worker: WorkerContext,
  sessionState: { external?: ExternalSessionState } | undefined | null
): void {
  let pendingAction = sessionState?.external?.pending_action,
    requestId = pendingAction?.request_id;
  if (!requestId) return;
  if ([...worker.getPendingPermissionRequests(), ...worker.getPendingUserDialogRequests()].some((pendingRequest: PendingRequest) => pendingRequest.request_id === requestId)) {
    N(`[resumeStalePromptCancel] pending_action ${requestId} is owned by this worker — redelivery handles it, skipping cancel`);
    return;
  }
  N(`[resumeStalePromptCancel] cancelling stale parked prompt ${requestId} from a prior worker`), worker.write({
    type: "control_cancel_request",
    request_id: requestId
  }), c("tengu_resume_stale_prompt_cancel", {
    kind: tH(pendingAction.tool_name?.startsWith("dialog:") ? "dialog" : "permission")
  });
}

/** Lazy module initializer — ensures all dependency modules are ready. */
var lt4 = L(() => {
  y_();
  FH();
});

export {resumeStalePromptCancel as Kac,lt4 as zac};
