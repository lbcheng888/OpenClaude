// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {k3n as sb6,a3t as bI_} from "../../vendor/m4221.ts";
import {K9t as ub_,Z9n as aS6} from "../../vendor/m4195.ts";
import {Xt as H6,Le as bH} from "../config/0228_encoding.ts";
import {Z8a as hxK,X8a as RxK,Q8a as LxK} from "../../vendor/m4222.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {pP as Hk,aNi as iL7} from "../session/2690_resolveLoopFileFire.ts";
// Tool definition module: "TaskStop" (user-facing "Stop Task").
//
// Defines the tool that terminates a running background task by its ID. The
// tool object is registered through the shared tool factory `c9` and exposed
// to the rest of the bundle via the module-scope binding `t4_` (referenced by
// the tool-registry assembler in artifact/4278_uL.ts) and the module
// initializer `jKq` (also invoked there). Those two minified names are
// cross-module references and are deliberately preserved unchanged.
//
// Behavior is 1:1 with the obfuscated source — only names, types, and comments
// were added.

/**
 * Shape of the input accepted by the TaskStop tool.
 * `task_id` is the current parameter; `shell_id` is the deprecated alias.
 */
interface StopTaskInput {
  task_id?: string;
  /** Deprecated alias for {@link StopTaskInput.task_id}. */
  shell_id?: string;
}

/**
 * Shape of the structured data returned by a successful TaskStop call.
 */
interface StopTaskOutput {
  message: string;
  task_id: string;
  task_type: string;
  command?: string;
}

/** A registry entry describing a background task tracked by `taskRegistry`. */
interface BackgroundTask {
  status: string;
  taskId: string;
  taskType: string;
  command: string;
}

/** Registry of background tasks, keyed by task ID. */
interface TaskRegistry {
  get(id: string): BackgroundTask | undefined;
}

/** Context object threaded through validation/call hooks of the tool. */
interface StopTaskContext {
  taskRegistry: TaskRegistry;
  setAppState: unknown;
}

// `getStopTaskInputSchema` / `getStopTaskOutputSchema` are this module's
// renamed-but-file-local lazy schema getters (originally `IXO` / `xXO`).
// `t4_` is the cross-module tool binding and must keep its minified name.
var getStopTaskInputSchema: () => unknown,
  getStopTaskOutputSchema: () => unknown,
  t4_: unknown;

/**
 * Module initializer for the TaskStop tool. Wires up dependency modules, then
 * builds the lazy input/output schemas and the tool definition object.
 * Re-exported through the minified name `jKq` and invoked by the tool-registry
 * assembler in artifact/4278_uL.ts; the name is preserved for that reference.
 */
var jKq = L(() => {
  a8();
  M7();
  sb6();
  ub_();
  H6();
  hxK();
  getStopTaskInputSchema = kH(() => k.strictObject({
    task_id: k.string().optional().describe("The ID of the background task to stop"),
    shell_id: k.string().optional().describe("Deprecated: use task_id instead")
  })), getStopTaskOutputSchema = kH(() => k.object({
    message: k.string().describe("Status message about the operation"),
    task_id: k.string().describe("The ID of the task that was stopped"),
    task_type: k.string().describe("The type of the task that was stopped"),
    command: k.string().optional().describe("The command or description of the stopped task")
  })), t4_ = c9({
    name: Hk,
    searchHint: "kill a running background task",
    aliases: ["KillShell", "KillBash"],
    maxResultSizeChars: 1e5,
    userFacingName: () => "Stop Task",
    get inputSchema() {
      return getStopTaskInputSchema();
    },
    get outputSchema() {
      return getStopTaskOutputSchema();
    },
    shouldDefer: !0,
    isConcurrencySafe() {
      return !0;
    },
    // Resolve the effective task ID (preferring the current `task_id`, falling
    // back to the deprecated `shell_id`) for the auto-classifier.
    toAutoClassifierInput(input: StopTaskInput): string {
      return input.task_id ?? input.shell_id ?? "";
    },
    // Validate that a task ID was supplied, the task exists, and it is running.
    async validateInput(
      { task_id: taskIdArg, shell_id: shellIdArg }: StopTaskInput,
      { taskRegistry }: StopTaskContext
    ) {
      let resolvedTaskId = taskIdArg ?? shellIdArg;
      if (!resolvedTaskId) return {
        result: !1,
        message: "Missing required parameter: task_id",
        errorCode: 1
      };
      let task = taskRegistry.get(resolvedTaskId);
      if (!task) return {
        result: !1,
        message: `No task found with ID: ${resolvedTaskId}`,
        errorCode: 1
      };
      if (task.status !== "running") return {
        result: !1,
        message: `Task ${resolvedTaskId} is not running (status: ${task.status})`,
        errorCode: 3
      };
      return {
        result: !0
      };
    },
    async description() {
      return "Stop a running background task by ID";
    },
    async prompt() {
      return iL7;
    },
    mapToolResultToToolResultBlockParam(toolResult: unknown, toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: bH(toolResult)
      };
    },
    renderToolUseMessage: RxK,
    renderToolResultMessage: LxK,
    // Stop the resolved task and report the result.
    async call({ task_id: taskIdArg, shell_id: shellIdArg }: StopTaskInput, context: StopTaskContext) {
      let { taskRegistry, setAppState } = context,
        resolvedTaskId = taskIdArg ?? shellIdArg;
      if (!resolvedTaskId) throw Error("Missing required parameter: task_id");
      let stoppedTask = await bI_(resolvedTaskId, {
        taskRegistry,
        setAppState,
        callerAgentId: aS6(context)
      });
      return {
        data: {
          message: `Successfully stopped task: ${stoppedTask.taskId} (${stoppedTask.command})`,
          task_id: stoppedTask.taskId,
          task_type: stoppedTask.taskType,
          command: stoppedTask.command
        } satisfies StopTaskOutput
      };
    }
  });
});

export {getStopTaskInputSchema as nPp,getStopTaskOutputSchema as rPp,t4_ as Zut,jKq as cpo};
