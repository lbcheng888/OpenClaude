// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {oH as D2,O3e as xIH,HE as sD,gB as xC,F$ as HE} from "../agent/3332_id.ts";
import {YJa as lmK,zJa as cmK,jJa as dmK} from "../../vendor/m4285.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {j0 as JL} from "../session/2702_resolveLoopFileFire.ts";
// TaskList tool — lists all tasks in the active task list.
//
// This is a read-only, concurrency-safe tool that reads every task from the
// resolved task list (xC()), strips internal-only tasks, and returns a compact
// view of each task's id/subject/status/owner/blockedBy. Completed tasks are
// removed from every `blockedBy` array so the model only sees still-blocking
// dependencies.
//
// 1:1 restoration: only names, types, and comments were changed. All control
// flow, operators (incl. !0/!1), string literals, and cross-module references
// are preserved exactly.

// ---------------------------------------------------------------------------
// Cross-module references (defined in other bundle modules, names preserved):
//   k      — schema builder (zod-like): k.object/k.array/k.string/k.strictObject
//   kH     — lazy/memoized schema factory wrapper (returns a getter fn)
//   xIH    — task status enum schema: k.enum(["pending","in_progress","completed"])
//   c9     — tool-definition factory (registers a tool object)
//   JL     — tool name constant ("TaskList")
//   cmK    — static tool description string
//   dmK()  — builds the tool prompt string
//   sD()   — feature gate: whether the tasks feature is enabled
//   xC()   — resolves the active task-list id
//   HE(id) — loads all tasks for the given task-list id
//   a8/M7/D2/lmK — module init side-effect imports (run once on first access)
// ---------------------------------------------------------------------------

/** A task record as persisted/loaded by HE(). */
interface TaskRecord {
  id: string;
  subject: string;
  status: "pending" | "in_progress" | "completed";
  owner?: string;
  blockedBy: string[];
  metadata?: {
    _internal?: boolean;
  } & Record<string, unknown>;
}

/** Shape returned in the tool's `data` payload. */
interface TaskListToolOutput {
  tasks: Array<{
    id: string;
    subject: string;
    status: TaskRecord["status"];
    owner?: string;
    blockedBy: string[];
  }>;
}

/** A `tool_result` content block param produced by mapToolResultToToolResultBlockParam. */
interface ToolResultBlockParam {
  tool_use_id: string;
  type: "tool_result";
  content: string;
}
declare const k: any;
declare function kH<T>(factory: () => T): () => T;
declare function xIH(): any;
declare function c9(def: unknown): unknown;
declare const JL: string;
declare const cmK: string;
declare function dmK(): string;
declare function sD(): boolean;
declare function xC(): string;
declare function HE(taskListId: string): Promise<TaskRecord[]>;
declare function a8(): void;
declare function M7(): void;
declare function D2(): void;
declare function lmK(): void;
declare function L<T>(init: () => T): () => T;

/** Lazy input schema (no parameters — TaskList takes none). */
var taskListInputSchema: () => any;
/** Lazy output schema: `{ tasks: Array<{ id, subject, status, owner?, blockedBy }> }`. */
var taskListOutputSchema: () => any;
/** The TaskList tool definition object. */
var taskListTool: unknown;

/** Module initializer: runs dependency init then defines the TaskList tool. */
var initTaskListTool = L(() => {
  a8();
  M7();
  D2();
  lmK();
  taskListInputSchema = kH(() => k.strictObject({})), taskListOutputSchema = kH(() => k.object({
    tasks: k.array(k.object({
      id: k.string(),
      subject: k.string(),
      status: xIH(),
      owner: k.string().optional(),
      blockedBy: k.array(k.string())
    }))
  })), taskListTool = c9({
    name: JL,
    searchHint: "list all tasks",
    maxResultSizeChars: 1e5,
    async description() {
      return cmK;
    },
    async prompt() {
      return dmK();
    },
    get inputSchema() {
      return taskListInputSchema();
    },
    get outputSchema() {
      return taskListOutputSchema();
    },
    userFacingName() {
      return "TaskList";
    },
    shouldDefer: !0,
    isEnabled() {
      return sD();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    renderToolUseMessage() {
      return null;
    },
    async call(): Promise<{
      data: TaskListToolOutput;
    }> {
      let taskListId = xC(),
        tasks = (await HE(taskListId)).filter(task => !task.metadata?._internal),
        completedIds = new Set(tasks.filter(task => task.status === "completed").map(task => task.id));
      return {
        data: {
          tasks: tasks.map(task => ({
            id: task.id,
            subject: task.subject,
            status: task.status,
            owner: task.owner,
            blockedBy: task.blockedBy.filter(blockerId => !completedIds.has(blockerId))
          }))
        }
      };
    },
    mapToolResultToToolResultBlockParam(output: TaskListToolOutput, toolUseId: string): ToolResultBlockParam {
      let {
        tasks
      } = output;
      if (tasks.length === 0) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: "No tasks found"
      };
      let lines = tasks.map(task => {
        let ownerSuffix = task.owner ? ` (${task.owner})` : "",
          blockedBySuffix = task.blockedBy.length > 0 ? ` [blocked by ${task.blockedBy.map(blockerId => `#${blockerId}`).join(", ")}]` : "";
        return `#${task.id} [${task.status}] ${task.subject}${ownerSuffix}${blockedBySuffix}`;
      });
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: lines.join(`
`)
      };
    }
  });
});
export {taskListInputSchema as R$p,taskListOutputSchema as v$p,taskListTool as JJa,initTaskListTool as XJa};
