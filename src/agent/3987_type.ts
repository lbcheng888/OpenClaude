// @ts-nocheck
import {VA as Y2,RE as sM} from "../session/2796_uuid.ts";
import {b as L} from "../../runtime.ts";
/** Parameters for a task_progress system event. */
interface TaskProgressParams {
  taskId: string;
  toolUseId?: string;
  description: string;
  subagentType?: string;
  startTime: number;
  totalTokens: number;
  toolUses: number;
  lastToolName?: string;
  summary?: string;
  workflowProgress?: unknown;
}

/**
 * Enqueue a `task_progress` system event into the session event queue.
 * Called periodically during subagent / workflow execution to report live
 * token usage and activity to the parent session.
 */
function S8_(params: TaskProgressParams): void {
  Y2({
    type: "system",
    subtype: "task_progress",
    task_id: params.taskId,
    tool_use_id: params.toolUseId,
    description: params.description,
    subagent_type: params.subagentType,
    usage: {
      total_tokens: params.totalTokens,
      tool_uses: params.toolUses,
      duration_ms: Date.now() - params.startTime
    },
    last_tool_name: params.lastToolName,
    summary: params.summary,
    workflow_progress: params.workflowProgress
  });
}

/** Lazy initializer: ensures the session event queue module (`sM`) is ready. */
var xZ6 = L(() => {
  sM();
});
export {S8_ as ldt,xZ6 as H9n};
