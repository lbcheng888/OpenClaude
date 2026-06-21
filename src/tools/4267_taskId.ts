// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {cb as Lf,isAgentSwarmsEnabled as wK} from "../config/3298_isAgentSwarmsEnabled.ts";
import {yp as YO,getTaskCompletedHookMessage as iI_} from "./5171_shouldSkipHookDueToTrust.ts";
import {Xt as H6,Le as bH} from "../config/0228_encoding.ts";
import {Nk as D2,E9e as xIH,TE as sD,KF as xC,Wee as oe,q0n as LZ6,ege as U$H,UJr as Ln8} from "../agent/3316_id.ts";
import {Am as mz,getAgentName as ZY,getTeamName as LT,getTeammateColor as ZW,getAgentId as ph} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Tx as iW,writeToMailbox as T$} from "../permissions/3886_writeToMailbox.ts";
import {MJr as yqq,tNt as Sb_} from "../../vendor/m3314.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {mP as _k} from "./2698_allErrors.ts";
import {executeTaskCompletedHooks as PpH} from "../../vendor/m5165.ts";
/** A single field name that may be reported in `updatedFields`. */
type UpdatedField = "subject" | "description" | "activeForm" | "owner" | "metadata" | "status" | "deleted" | "blocks" | "blockedBy";

/** Status change record returned when a task's status transitions. */
interface StatusChange {
  from: string;
  to: string;
}

/** Result payload returned by the TaskUpdate tool's `call`. */
interface TaskUpdateResultData {
  success: boolean;
  taskId: string;
  updatedFields: UpdatedField[] | string[];
  error?: string;
  statusChange?: StatusChange;
}

/** Validated input shape accepted by the TaskUpdate tool. */
interface TaskUpdateInput {
  taskId: string;
  subject?: string;
  description?: string;
  activeForm?: string;
  status?: string;
  addBlocks?: string[];
  addBlockedBy?: string[];
  owner?: string;
  metadata?: Record<string, unknown>;
}

/** A persisted task record as returned by `oe(store, taskId)`. */
interface TaskRecord {
  id: string;
  subject: string;
  description: string;
  activeForm?: string;
  status: string;
  owner?: string;
  metadata?: Record<string, unknown>;
  blocks: string[];
  blockedBy: string[];
}

/** Short one-line description of the TaskUpdate tool. */
var TASK_UPDATE_DESCRIPTION = "Update a task in the task list",
  /** Full prompt/usage guidance shown to the model for the TaskUpdate tool. */
  TASK_UPDATE_PROMPT = `Use this tool to update a task in the task list.

## When to Use This Tool

**Mark tasks as resolved:**
- When you have completed the work described in a task
- When a task is no longer needed or has been superseded
- IMPORTANT: Always mark your assigned tasks as resolved when you finish them
- After resolving, call TaskList to find your next task

- ONLY mark a task as completed when you have FULLY accomplished it
- If you encounter errors, blockers, or cannot finish, keep the task as in_progress
- When blocked, create a new task describing what needs to be resolved
- Never mark a task as completed if:
  - Tests are failing
  - Implementation is partial
  - You encountered unresolved errors
  - You couldn't find necessary files or dependencies

**Delete tasks:**
- When a task is no longer relevant or was created in error
- Setting status to \`deleted\` permanently removes the task

**Update task details:**
- When requirements change or become clearer
- When establishing dependencies between tasks

## Fields You Can Update

- **status**: The task status (see Status Workflow below)
- **subject**: Change the task title (imperative form, e.g., "Run tests")
- **description**: Change the task description
- **activeForm**: Present continuous form shown in spinner when in_progress (e.g., "Running tests")
- **owner**: Change the task owner (agent name)
- **metadata**: Merge metadata keys into the task (set a key to null to delete it)
- **addBlocks**: Mark tasks that cannot start until this one completes
- **addBlockedBy**: Mark tasks that must complete before this one can start

## Status Workflow

Status progresses: \`pending\` → \`in_progress\` → \`completed\`

Use \`deleted\` to permanently remove a task.

## Staleness

Make sure to read a task's latest state using \`TaskGet\` before updating it.

## Examples

Mark task as in progress when starting work:
\`\`\`json
{"taskId": "1", "status": "in_progress"}
\`\`\`

Mark task as completed after finishing work:
\`\`\`json
{"taskId": "1", "status": "completed"}
\`\`\`

Delete a task:
\`\`\`json
{"taskId": "1", "status": "deleted"}
\`\`\`

Claim a task by setting owner:
\`\`\`json
{"taskId": "1", "owner": "my-name"}
\`\`\`

Set up task dependencies:
\`\`\`json
{"taskId": "2", "addBlockedBy": ["1"]}
\`\`\`
`;

/** Lazily-built Zod input schema for TaskUpdate. */
var taskUpdateInputSchema: () => z.ZodTypeAny, /** Lazily-built Zod output schema for TaskUpdate. */
  taskUpdateOutputSchema: () => z.ZodTypeAny, /** The TaskUpdate tool definition object. */
  TaskUpdateTool: ReturnType<typeof c9>;

/**
 * Lazy module initializer for the TaskUpdate tool. Wired through `L(...)` so
 * the tool (and its schemas) are only constructed on first access.
 */
var initTaskUpdateTool = L(() => {
  a8();
  M7();
  Lf();
  YO();
  H6();
  D2();
  mz();
  iW();
  yqq();
  taskUpdateInputSchema = kH(() => {
    let statusSchema = xIH().or(k.literal("deleted"));
    return k.strictObject({
      taskId: k.string().describe("The ID of the task to update"),
      subject: k.string().optional().describe("New subject for the task"),
      description: k.string().optional().describe("New description for the task"),
      activeForm: k.string().optional().describe('Present continuous form shown in spinner when in_progress (e.g., "Running tests")'),
      status: statusSchema.optional().describe("New status for the task"),
      addBlocks: k.array(k.string()).optional().describe("Task IDs that this task blocks"),
      addBlockedBy: k.array(k.string()).optional().describe("Task IDs that block this task"),
      owner: k.string().optional().describe("New owner for the task"),
      metadata: k.record(k.string(), k.unknown()).optional().describe("Metadata keys to merge into the task. Set a key to null to delete it.")
    });
  }), taskUpdateOutputSchema = kH(() => k.object({
    success: k.boolean(),
    taskId: k.string(),
    updatedFields: k.array(k.string()),
    error: k.string().optional(),
    statusChange: k.object({
      from: k.string(),
      to: k.string()
    }).optional()
  })), TaskUpdateTool = c9({
    name: _k,
    searchHint: "update a task",
    maxResultSizeChars: 1e5,
    async description() {
      return TASK_UPDATE_DESCRIPTION;
    },
    async prompt() {
      return TASK_UPDATE_PROMPT;
    },
    get inputSchema() {
      return taskUpdateInputSchema();
    },
    get outputSchema() {
      return taskUpdateOutputSchema();
    },
    userFacingName() {
      return "TaskUpdate";
    },
    coerceInput: Sb_,
    shouldDefer: !0,
    isEnabled() {
      return sD();
    },
    isConcurrencySafe() {
      return !0;
    },
    toAutoClassifierInput(rawInput: unknown) {
      let coerced: TaskUpdateInput = Sb_(rawInput)?.input ?? rawInput,
        tokens = [coerced.taskId];
      if (coerced.status) tokens.push(coerced.status);
      if (coerced.subject) tokens.push(coerced.subject);
      return tokens.join(" ");
    },
    renderToolUseMessage() {
      return null;
    },
    async call({
      taskId: taskId,
      subject: subject,
      description: description,
      activeForm: activeForm,
      status: status,
      owner: owner,
      addBlocks: addBlocks,
      addBlockedBy: addBlockedBy,
      metadata: metadata
    }: TaskUpdateInput, toolUseContext: any, _unusedB: unknown, _unusedC: unknown, emitEvent?: (event: {
      type: string;
      expandedView: string;
    }) => void) {
      let store = xC();
      emitEvent?.({
        type: "set_expanded_view",
        expandedView: "tasks"
      });
      let task: TaskRecord | null | undefined = await oe(store, taskId);
      if (!task) return {
        data: {
          success: !1,
          taskId: taskId,
          updatedFields: [],
          error: "Task not found"
        }
      };
      let updatedFields: UpdatedField[] = [],
        updates: Partial<TaskRecord> = {};
      if (subject !== void 0 && subject !== task.subject) updates.subject = subject, updatedFields.push("subject");
      if (description !== void 0 && description !== task.description) updates.description = description, updatedFields.push("description");
      if (activeForm !== void 0 && activeForm !== task.activeForm) updates.activeForm = activeForm, updatedFields.push("activeForm");
      if (owner !== void 0 && owner !== task.owner) updates.owner = owner, updatedFields.push("owner");
      if (wK() && status === "in_progress" && owner === void 0 && !task.owner) {
        let currentAgent = ZY();
        if (currentAgent) updates.owner = currentAgent, updatedFields.push("owner");
      }
      if (metadata !== void 0) {
        let mergedMetadata: Record<string, unknown> = {
          ...(task.metadata ?? {})
        };
        for (let [metaKey, metaValue] of Object.entries(metadata)) if (metaValue === null) delete mergedMetadata[metaKey];else mergedMetadata[metaKey] = metaValue;
        updates.metadata = mergedMetadata, updatedFields.push("metadata");
      }
      if (status !== void 0) {
        if (status === "deleted") {
          let deleted: boolean = await LZ6(store, taskId);
          return {
            data: {
              success: deleted,
              taskId: taskId,
              updatedFields: deleted ? ["deleted"] : [],
              error: deleted ? void 0 : "Failed to delete task",
              statusChange: deleted ? {
                from: task.status,
                to: "deleted"
              } : void 0
            }
          };
        }
        if (status !== task.status) {
          if (status === "completed") {
            let blockingErrors: string[] = [],
              completionChecks = PpH(taskId, task.subject, task.description, ZY(), LT(), void 0, toolUseContext?.abortController?.signal, void 0, toolUseContext);
            for await (let checkResult of completionChecks) if (checkResult.blockingError) blockingErrors.push(iI_(checkResult.blockingError));
            if (blockingErrors.length > 0) return {
              data: {
                success: !1,
                taskId: taskId,
                updatedFields: [],
                error: blockingErrors.join(`
`)
              }
            };
          }
          updates.status = status, updatedFields.push("status");
        }
      }
      if (Object.keys(updates).length > 0) await U$H(store, taskId, updates);
      if (updates.owner && wK()) {
        let assignedBy = ZY() || "team-lead",
          assignerColor = ZW(),
          assignmentMessage = bH({
            type: "task_assignment",
            taskId: taskId,
            subject: task.subject,
            description: task.description,
            assignedBy: assignedBy,
            timestamp: new Date().toISOString()
          });
        await T$(updates.owner, {
          from: assignedBy,
          text: assignmentMessage,
          timestamp: new Date().toISOString(),
          color: assignerColor
        }, store);
      }
      if (addBlocks && addBlocks.length > 0) {
        let newBlocks = addBlocks.filter(id => !task.blocks.includes(id));
        for (let blockedId of newBlocks) await Ln8(store, taskId, blockedId);
        if (newBlocks.length > 0) updatedFields.push("blocks");
      }
      if (addBlockedBy && addBlockedBy.length > 0) {
        let newBlockedBy = addBlockedBy.filter(id => !task.blockedBy.includes(id));
        for (let blockerId of newBlockedBy) await Ln8(store, blockerId, taskId);
        if (newBlockedBy.length > 0) updatedFields.push("blockedBy");
      }
      return {
        data: {
          success: !0,
          taskId: taskId,
          updatedFields: updatedFields,
          statusChange: updates.status !== void 0 ? {
            from: task.status,
            to: updates.status
          } : void 0
        }
      };
    },
    mapToolResultToToolResultBlockParam(result: TaskUpdateResultData, toolUseId: string) {
      let {
        success: success,
        taskId: taskId,
        updatedFields: updatedFields,
        error: error,
        statusChange: statusChange
      } = result;
      if (!success) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: error || `Task #${taskId} not found`
      };
      let content = `Updated task #${taskId} ${updatedFields.join(", ")}`;
      if (statusChange?.to === "completed" && ph() && wK()) content += `

Task completed. Call TaskList now to find your next available task or see if your work unblocked others.`;
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: content
      };
    }
  });
});
export {TASK_UPDATE_DESCRIPTION as EGa,TASK_UPDATE_PROMPT as CGa,taskUpdateInputSchema as rLp,taskUpdateOutputSchema as oLp,TaskUpdateTool as vGa,initTaskUpdateTool as wGa};
