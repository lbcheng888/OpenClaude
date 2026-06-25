// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {oH as D2,O3e as xIH,HE as sD,gB as xC,Fee as oe} from "../agent/3332_id.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {Kz as ui} from "./2710_allErrors.ts";
// ---------------------------------------------------------------------------
// Cross-module references (kept by their recovered/minified names so the
// runtime bindings resolve unchanged). Declared here only for typing.
// ---------------------------------------------------------------------------

/** esbuild `__esm` lazy module-initializer wrapper. */
declare const L: <T>(init: () => T) => () => T;

/** Zod schema factory namespace (the bundled `zod` import). */
declare const k: any;

/** Lazy/memoized schema builder: defers construction until first access. */
declare const kH: <T>(build: () => T) => () => T;

/**
 * Wraps a raw tool definition into a full tool object, applying shared default
 * descriptors plus a `userFacingName` getter derived from `name`.
 */
declare const c9: <T extends {
  name: string;
}>(definition: T) => T;

/** Zod enum schema for a task's status: "pending" | "in_progress" | "completed". */
declare const xIH: () => ZodType<TaskStatus>;

/** Resolves the active task-list identifier (env override, team, or workspace). */
declare const xC: () => string;

/** Reads and schema-validates a single task by ID from the given task list. */
declare const oe: (taskListId: string, taskId: string) => Promise<TaskRecord | null>;

/** Returns whether the task subsystem is enabled (gated by CLAUDE_CODE_ENABLE_TASKS). */
declare const sD: () => boolean;

/** The user-facing tool name constant: "TaskGet". */
declare const ui: string;

// Module-init side-effect imports referenced from inside the lazy initializer.
declare const a8: () => void;
declare const M7: () => void;
declare const D2: () => void;

// ---------------------------------------------------------------------------
// Domain types (inferred from the validated task schema in agent/3320_id.ts).
// ---------------------------------------------------------------------------

/** Lifecycle status of a task. */
type TaskStatus = "pending" | "in_progress" | "completed";

/** Full persisted task record as stored/validated in the task list. */
interface TaskRecord {
  id: string;
  subject: string;
  description: string;
  status: TaskStatus;
  /** IDs of tasks waiting on this one to complete. */
  blocks: string[];
  /** IDs of tasks that must complete before this one can start. */
  blockedBy: string[];
}

/** Input arguments accepted by the TaskGet tool. */
interface TaskGetInput {
  taskId: string;
}

/** Successful tool output shape: the task, or null when not found. */
interface TaskGetOutput {
  task: TaskRecord | null;
}

/** Anthropic tool_result block parameter produced for the model. */
interface ToolResultBlockParam {
  tool_use_id: string;
  type: "tool_result";
  content: string;
}

// ---------------------------------------------------------------------------
// Tool metadata strings.
// ---------------------------------------------------------------------------

/** One-line description shown to the model for the TaskGet tool. */
var taskGetDescription = "Get a task by ID from the task list",
  /** Full prompt/usage guidance for the TaskGet tool. */
  taskGetPrompt = `Use this tool to retrieve a task by its ID from the task list.

## When to Use This Tool

- When you need the full description and context before starting work on a task
- To understand task dependencies (what it blocks, what blocks it)
- After being assigned a task, to get complete requirements

## Output

Returns full task details:
- **subject**: Task title
- **description**: Detailed requirements and context
- **status**: 'pending', 'in_progress', or 'completed'
- **blocks**: Tasks waiting on this one to complete
- **blockedBy**: Tasks that must complete before this one can start

## Tips

- After fetching a task, verify its blockedBy list is empty before beginning work.
- Use TaskList to see all tasks in summary form.
`;

/** Lazily-built input schema getter. */
var inputSchemaGetter: () => ZodType<TaskGetInput>, /** Lazily-built output schema getter. */
  outputSchemaGetter: () => ZodType<TaskGetOutput>, /** The assembled TaskGet tool definition (populated by the lazy initializer below). */
  taskGetTool: ReturnType<typeof c9>;

/**
 * Lazy module initializer for the TaskGet tool. Runs dependent module inits,
 * builds the input/output Zod schemas, and assembles the tool definition.
 */
var initTaskGetTool = L(() => {
  a8();
  M7();
  D2();
  inputSchemaGetter = kH(() => k.strictObject({
    taskId: k.string().describe("The ID of the task to retrieve")
  })), outputSchemaGetter = kH(() => k.object({
    task: k.object({
      id: k.string(),
      subject: k.string(),
      description: k.string(),
      status: xIH(),
      blocks: k.array(k.string()),
      blockedBy: k.array(k.string())
    }).nullable()
  })), taskGetTool = c9({
    name: ui,
    searchHint: "retrieve a task by ID",
    maxResultSizeChars: 1e5,
    async description() {
      return taskGetDescription;
    },
    async prompt() {
      return taskGetPrompt;
    },
    get inputSchema() {
      return inputSchemaGetter();
    },
    get outputSchema() {
      return outputSchemaGetter();
    },
    userFacingName() {
      return "TaskGet";
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
    toAutoClassifierInput(input: TaskGetInput) {
      return input.taskId;
    },
    renderToolUseMessage() {
      return null;
    },
    async call({
      taskId: taskId
    }: TaskGetInput) {
      let taskListId = xC(),
        task = await oe(taskListId, taskId);
      if (!task) return {
        data: {
          task: null
        }
      };
      return {
        data: {
          task: {
            id: task.id,
            subject: task.subject,
            description: task.description,
            status: task.status,
            blocks: task.blocks,
            blockedBy: task.blockedBy
          }
        }
      };
    },
    mapToolResultToToolResultBlockParam(output: TaskGetOutput, toolUseId: string): ToolResultBlockParam {
      let {
        task: task
      } = output;
      if (!task) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: "Task not found"
      };
      let lines = [`Task #${task.id}: ${task.subject}`, `Status: ${task.status}`, `Description: ${task.description}`];
      if (task.blockedBy.length > 0) lines.push(`Blocked by: ${task.blockedBy.map(id => `#${id}`).join(", ")}`);
      if (task.blocks.length > 0) lines.push(`Blocks: ${task.blocks.map(id => `#${id}`).join(", ")}`);
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: lines.join(`
`)
      };
    }
  });
});
export {taskGetDescription as BJa,taskGetPrompt as UJa,inputSchemaGetter as b$p,outputSchemaGetter as E$p,taskGetTool as $Ja,initTaskGetTool as qJa};
