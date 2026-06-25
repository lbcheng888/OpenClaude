// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {Wd as YO,getTaskCreatedHookMessage as dKq} from "./5204_shouldSkipHookDueToTrust.ts";
import {oH as D2,HE as sD,oga as J8K,gB as xC,POn as LZ6} from "../agent/3332_id.ts";
import {Op as mz,getAgentName as ZY,getTeamName as LT} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {PJa as EmK,xJa as ymK,DJa as vmK} from "../agent/4281_description.ts";
import {MJa as bmK,OJa as SmK,LJa as CmK} from "../../vendor/m4281.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {QR as LP} from "./2710_allErrors.ts";
import {executeTaskCreatedHooks as nI_} from "../../vendor/m5198.ts";
// Module: tools/4240_subject — TaskCreate tool definition.
//
// Defines the "TaskCreate" tool: adds a single task to the on-disk task list,
// runs the TaskCreated hooks, and surfaces any blocking-hook errors. Follows the
// lazy-module-init pattern used throughout the bundle: the top-level state vars
// are populated the first time the wrapped initializer (xmK) runs.
//
// This is a 1:1 reverse-engineering of the obfuscated source. Only the internal
// method parameters/locals were renamed and TypeScript types/comments were
// added. All control flow, operators (incl. !0/!1), string literals, and
// cross-module/property references are preserved exactly.
//
// The following bundle-mangled names are KEPT because renaming them would break
// cross-module references (RPO/LPO/ImK/xmK are this module's public symbols;
// the rest are imports resolved from sibling modules):
//   RPO — exported lazy thunk for the TaskCreate input schema
//   LPO — exported lazy thunk for the TaskCreate output schema
//   ImK — exported TaskCreate tool definition (consumed by the tool registry)
//   xmK — exported module initializer (invoked lazily by callers)
//   L   — lazy module-init wrapper (returns an idempotent initializer thunk)
//   kH  — lazy/memoized schema thunk factory
//   k   — schema builder (zod-style: strictObject/object/string/record/...)
//   c9  — tool-definition factory (validates + normalizes the tool spec)
//   LP  — the canonical tool name constant ("TaskCreate")
//   SmK — the static tool description string (cross-module)
//   CmK — the tool prompt builder (cross-module)
//   ymK — coerceInput: normalizes loose/aliased LLM input into the schema shape
//   vmK — validationErrorSteer: produces guidance text on validation failure
//   sD  — whether the task tools are enabled (CLAUDE_CODE_ENABLE_TASKS gate)
//   xC  — resolves the active task-list id (team/env/default)
//   J8K — persists a new task and returns its allocated id
//   nI_ — executeTaskCreatedHooks: async generator of hook results
//   ZY  — current teammate/owner id
//   LT  — current team name / list scope
//   dKq — formats a hook blockingError into a human-readable line
//   LZ6 — deletes a task by id (rollback when creation is blocked)
//   a8/M7/YO/D2/mz/EmK/bmK — sibling module initializers run on first use

// Parsed input for a TaskCreate call (mirrors the strictObject schema below).
interface TaskCreateInput {
  /** A brief title for the task. */
  subject: string;
  /** What needs to be done. */
  description: string;
  /** Present continuous form shown in the spinner while in_progress (e.g. "Running tests"). */
  activeForm?: string;
  /** Arbitrary metadata to attach to the task. */
  metadata?: Record<string, unknown>;
}

// Output payload returned by a successful TaskCreate call.
interface TaskCreateOutput {
  task: {
    id: string;
    subject: string;
  };
}

// Tool-invocation context; only the abort controller is used here.
interface ToolCallContext {
  abortController?: {
    signal?: AbortSignal;
  };
}

// View-update callback passed as the final `call` argument; used to expand the
// "tasks" view once the task is created.
type ViewUpdateCallback = (update: {
  type: "set_expanded_view";
  expandedView: string;
}) => void;

// One result yielded by the TaskCreated hooks generator (nI_).
interface TaskCreatedHookResult {
  blockingError?: unknown;
}
var RPO: () => unknown, LPO: () => unknown, ImK: unknown;
var xmK = L(() => {
  a8();
  M7();
  YO();
  D2();
  mz();
  EmK();
  bmK();
  RPO = kH(() => k.strictObject({
    subject: k.string().describe("A brief title for the task"),
    description: k.string().describe("What needs to be done"),
    activeForm: k.string().optional().describe('Present continuous form shown in spinner when in_progress (e.g., "Running tests")'),
    metadata: k.record(k.string(), k.unknown()).optional().describe("Arbitrary metadata to attach to the task")
  })), LPO = kH(() => k.object({
    task: k.object({
      id: k.string(),
      subject: k.string()
    })
  })), ImK = c9({
    name: LP,
    searchHint: "create a task in the task list",
    maxResultSizeChars: 1e5,
    async description() {
      return SmK;
    },
    async prompt() {
      return CmK();
    },
    get inputSchema() {
      return RPO();
    },
    get outputSchema() {
      return LPO();
    },
    userFacingName() {
      return "TaskCreate";
    },
    shouldDefer: !0,
    coerceInput: ymK,
    validationErrorSteer: vmK,
    isEnabled() {
      return sD();
    },
    isConcurrencySafe() {
      return !1;
    },
    toAutoClassifierInput(input: TaskCreateInput) {
      return input.subject;
    },
    renderToolUseMessage() {
      return null;
    },
    async call({
      subject,
      description,
      activeForm,
      metadata
    }: TaskCreateInput, context: ToolCallContext, _arg3: unknown, _arg4: unknown, updateView?: ViewUpdateCallback) {
      let taskId = await J8K(xC(), {
          subject,
          description,
          activeForm,
          status: "pending",
          owner: void 0,
          blocks: [],
          blockedBy: [],
          metadata
        }),
        blockingErrors: string[] = [],
        taskCreatedHookResults = nI_(taskId, subject, description, ZY(), LT(), void 0, context?.abortController?.signal, void 0, context);
      for await (let hookResult of taskCreatedHookResults as AsyncIterable<TaskCreatedHookResult>) if (hookResult.blockingError) blockingErrors.push(dKq(hookResult.blockingError));
      if (blockingErrors.length > 0) throw await LZ6(xC(), taskId), Error(blockingErrors.join(`
`));
      return updateView?.({
        type: "set_expanded_view",
        expandedView: "tasks"
      }), {
        data: {
          task: {
            id: taskId,
            subject
          }
        }
      };
    },
    mapToolResultToToolResultBlockParam(output: TaskCreateOutput, toolUseId: string) {
      let {
        task
      } = output;
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Task #${task.id} created successfully: ${task.subject}`
      };
    }
  });
});
export {RPO as T$p,LPO as S$p,ImK as NJa,xmK as FJa};
