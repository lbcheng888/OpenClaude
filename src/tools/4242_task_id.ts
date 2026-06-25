// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {L6n,Aqt} from "../../vendor/m4239.ts";
import {lqt,r6n} from "../../vendor/m4211.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {yja,gja,_ja} from "../../vendor/m4240.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {vD,K9i} from "../session/2702_resolveLoopFileFire.ts";
// Tool definition module: "TaskStop" (user-facing "Stop Task").
//
// Defines the tool that terminates a running background task by its ID. The
// tool object is registered through the shared tool factory `Ks` and exposed
// to the rest of the bundle via the module-scope binding `tmt` and the module
// initializer `o_o`. Those minified names are cross-module references and are
// deliberately preserved unchanged.
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

// `bUp` / `EUp` are this module's file-local lazy schema getters (input /
// output). `tmt` is the cross-module tool binding. All keep their minified
// names since they are referenced by the tool-registry assembler.
var bUp: () => unknown, EUp: () => unknown, tmt: unknown;

/**
 * Module initializer for the TaskStop tool. Wires up dependency modules, then
 * builds the lazy input/output schemas and the tool definition object.
 * Invoked by the tool-registry assembler; the name `o_o` is preserved for that
 * reference.
 */
var o_o = b(() => {
  Qr();
  ri();
  L6n();
  lqt();
  tn();
  yja();
  bUp = ve(() => C.strictObject({
    task_id: C.string().optional().describe("The ID of the background task to stop"),
    shell_id: C.string().optional().describe("Deprecated: use task_id instead")
  })), EUp = ve(() => C.object({
    message: C.string().describe("Status message about the operation"),
    task_id: C.string().describe("The ID of the task that was stopped"),
    task_type: C.string().describe("The type of the task that was stopped"),
    command: C.string().optional().describe("The command or description of the stopped task")
  })), tmt = Ks({
    name: vD,
    searchHint: "kill a running background task",
    aliases: ["KillShell", "KillBash"],
    maxResultSizeChars: 1e5,
    userFacingName: () => "Stop Task",
    get inputSchema() {
      return bUp();
    },
    get outputSchema() {
      return EUp();
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
    async validateInput({
      task_id: taskIdArg,
      shell_id: shellIdArg
    }: StopTaskInput, {
      taskRegistry
    }: StopTaskContext) {
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
      return K9i;
    },
    mapToolResultToToolResultBlockParam(toolResult: unknown, toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: Pe(toolResult)
      };
    },
    renderToolUseMessage: gja,
    renderToolResultMessage: _ja,
    // Stop the resolved task and report the result.
    async call({
      task_id: taskIdArg,
      shell_id: shellIdArg
    }: StopTaskInput, context: StopTaskContext) {
      let {
          taskRegistry,
          setAppState
        } = context,
        resolvedTaskId = taskIdArg ?? shellIdArg;
      if (!resolvedTaskId) throw Error("Missing required parameter: task_id");
      let stoppedTask = await Aqt(resolvedTaskId, {
        taskRegistry,
        setAppState,
        callerAgentId: r6n(context),
        killedBy: "parent"
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

export {bUp,EUp,tmt,o_o};
