// @ts-nocheck
import {runForkedQuery as fc,$3t as Ax_,bdt as L1_} from "./4306_code.ts";
import {j3t as fx_,Ql as c4} from "../../vendor/m4405.ts";
import {Cl as u4,Ri as M7} from "./2227_userFacingName.ts";
import {d2n as Rb6,gqe as qpH} from "./4028_maxEditDistance.ts";
import {b as L} from "../../runtime.ts";
// Tool-use execution pipeline.
//
// Given a sequence of `tool_use` content blocks emitted by the assistant, this
// module groups consecutive blocks by whether their tool reports itself
// concurrency-safe, then dispatches each group either concurrently (bounded by
// CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY) or strictly serially. As tools run,
// context layers they produce are accumulated into a threaded `newContext`
// value so later tools observe earlier tools' effects.

// ---------------------------------------------------------------------------
// Imported (cross-module) helpers — names recovered from sibling restored files
// ---------------------------------------------------------------------------

/**
 * Type guard distinguishing a control/progress event (has a `type` field, e.g.
 * `set_in_progress_tool_use_ids`) from a normal `{ message, newContext }`
 * result. Defined in tools/4280_code.ts as `fc`.
 */
declare function fc(event: unknown): event is { type: string; [key: string]: unknown };

/**
 * Resolve a tool definition by name (honoring alias maps) from a tool list.
 * Defined in tools/2206_userFacingName.ts as `u4`.
 */
declare function u4(
  tools: ToolDefinition[],
  name: string,
  toolAliases?: Record<string, string>,
): ToolDefinition | undefined;

/**
 * Execute a single `tool_use` block, yielding progress events and a final
 * result event (which may carry `contextLayers`). Defined in tools/4280_code.ts
 * as `Ax_`.
 */
declare function Ax_(
  block: ToolUseBlock,
  assistantMessage: AssistantMessageEnvelope | undefined,
  canUseTool: CanUseTool,
  context: ToolUseContext,
  getNow: () => string,
): AsyncGenerator<ToolExecEvent>;

/**
 * Fold a list of context layers into the tool-use context, returning the new
 * context. Defined outside tools/ (imported runtime helper) as `fx_`.
 */
declare function fx_(context: ToolUseContext, layers: ContextLayer[]): ToolUseContext;

/**
 * Merge multiple async generators, running at most `concurrency` of them at
 * once and yielding their values as they arrive. Defined in tools/4179_done.ts
 * as `Rb6`.
 */
declare function Rb6<T>(
  generators: Iterable<AsyncGenerator<T>>,
  concurrency?: number,
): AsyncGenerator<T>;

/** Lazy module-init thunk factory (the standard once-init wrapper). */
declare function L(init: () => void): () => void;

// Sibling-module init thunks invoked by this module's own init thunk.
declare const M7: () => void;
declare const c4: () => void;
declare const qpH: () => void;
declare const L1_: () => void;

// ---------------------------------------------------------------------------
// Local types (inferred from usage; opaque shapes left as broad records)
// ---------------------------------------------------------------------------

/** A `tool_use` content block produced by the assistant. */
interface ToolUseBlock {
  id: string;
  name: string;
  input: unknown;
  type?: "tool_use";
}

/** Minimal shape of a tool definition this module touches. */
interface ToolDefinition {
  name: string;
  inputSchema: { safeParse(input: unknown): { success: boolean; data: unknown } };
  isConcurrencySafe(parsedInput: unknown): boolean;
}

/** An assistant message envelope from the transcript. */
interface AssistantMessageEnvelope {
  message: { content: Array<{ type: string; id?: string }> };
  [key: string]: unknown;
}

/** Opaque context-layer value threaded through tool execution. */
type ContextLayer = unknown;

/** Opaque tool-use context (carries `options`, abort controller, etc.). */
interface ToolUseContext {
  options: {
    tools: ToolDefinition[];
    toolAliases?: Record<string, string>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** The permission callback threaded into single-block execution. */
type CanUseTool = unknown;

/** A control event that adjusts the set of in-flight tool-use ids. */
interface InProgressToolUseIdsEvent {
  type: "set_in_progress_tool_use_ids";
  op: { action: "remove"; ids: string[] };
}

/** A normal result event produced while a tool runs. */
interface ToolResultEvent {
  message?: unknown;
  newContext?: ToolUseContext;
  contextLayers?: { toolUseID: string; layers: ContextLayer[] };
}

/** Any event a single-tool execution generator may yield. */
type ToolExecEvent = ToolResultEvent | InProgressToolUseIdsEvent;

/** One run-group: a maximal run of blocks sharing a concurrency-safety verdict. */
interface ConcurrencyGroup {
  isConcurrencySafe: boolean;
  blocks: ToolUseBlock[];
}

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

/**
 * Maximum number of concurrency-safe tools to run in parallel. Reads
 * CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY and defaults to 10 when unset/invalid.
 */
function getMaxToolUseConcurrency(): number {
  let parsed = parseInt(process.env.CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY || "", 10);
  return parsed > 0 ? parsed : 10;
}

/**
 * Execute a batch of `tool_use` blocks, threading an evolving tool-use context
 * through each run-group. Concurrency-safe groups run in parallel and their
 * context layers are applied once the whole group settles; unsafe groups run
 * strictly serially, applying context after each block.
 *
 * Yields progress/control events and `{ message, newContext }` results.
 */
async function* runToolUseBlocks(
  toolUseBlocks: ToolUseBlock[],
  assistantMessages: AssistantMessageEnvelope[],
  canUseTool: CanUseTool,
  toolUseContext: ToolUseContext,
): AsyncGenerator<ToolExecEvent> {
  let context = toolUseContext;
  for (let { isConcurrencySafe, blocks } of groupBlocksByConcurrencySafety(toolUseBlocks, context))
    if (isConcurrencySafe) {
      let layersByToolUseID: Record<string, ContextLayer[]> = {};
      for await (let event of runBlocksConcurrently(blocks, assistantMessages, canUseTool, context)) {
        if (fc(event)) {
          yield event;
          continue;
        }
        if (event.contextLayers) {
          let { toolUseID, layers } = event.contextLayers;
          if (!layersByToolUseID[toolUseID]) layersByToolUseID[toolUseID] = [];
          layersByToolUseID[toolUseID].push(...layers);
        }
        yield {
          message: event.message,
          newContext: context,
        };
      }
      for (let block of blocks) {
        let layers = layersByToolUseID[block.id];
        if (!layers || layers.length === 0) continue;
        context = fx_(context, layers);
      }
      yield {
        newContext: context,
      };
    } else
      for await (let event of runBlocksSerially(blocks, assistantMessages, canUseTool, context)) {
        if (fc(event)) {
          yield event;
          continue;
        }
        if (event.newContext) context = event.newContext;
        yield {
          message: event.message,
          newContext: context,
        };
      }
}

/**
 * Partition blocks into maximal contiguous run-groups by whether each tool is
 * concurrency-safe for its parsed input. A tool is deemed safe only when its
 * input parses and `isConcurrencySafe(parsedInput)` returns truthy without
 * throwing. Consecutive safe blocks accumulate into the same group; everything
 * else starts a new group.
 */
function groupBlocksByConcurrencySafety(
  toolUseBlocks: ToolUseBlock[],
  context: ToolUseContext,
): ConcurrencyGroup[] {
  return toolUseBlocks.reduce<ConcurrencyGroup[]>((groups, block) => {
    let tool = u4(context.options.tools, block.name, context.options.toolAliases),
      parsed = tool?.inputSchema.safeParse(block.input),
      isConcurrencySafe = parsed?.success
        ? (() => {
            try {
              return Boolean(tool?.isConcurrencySafe(parsed.data));
            } catch {
              return !1;
            }
          })()
        : !1;
    if (isConcurrencySafe && groups.at(-1)?.isConcurrencySafe) groups.at(-1)!.blocks.push(block);
    else
      groups.push({
        isConcurrencySafe,
        blocks: [block],
      });
    return groups;
  }, []);
}

/**
 * Run blocks one at a time. Each block's context layers are applied immediately
 * (so the next block sees them), and an in-progress-id removal event is emitted
 * once a block completes.
 */
async function* runBlocksSerially(
  blocks: ToolUseBlock[],
  assistantMessages: AssistantMessageEnvelope[],
  canUseTool: CanUseTool,
  toolUseContext: ToolUseContext,
): AsyncGenerator<ToolExecEvent> {
  let context = toolUseContext;
  for (let block of blocks) {
    for await (let event of Ax_(
      block,
      assistantMessages.find((msg) =>
        msg.message.content.some((c) => c.type === "tool_use" && c.id === block.id),
      ),
      canUseTool,
      context,
      () => new Date().toISOString(),
    )) {
      if (fc(event)) {
        yield event;
        continue;
      }
      if (event.contextLayers) context = fx_(context, event.contextLayers.layers);
      yield {
        message: event.message,
        newContext: context,
      };
    }
    yield {
      type: "set_in_progress_tool_use_ids",
      op: {
        action: "remove",
        ids: [block.id],
      },
    };
  }
}

/**
 * Run all blocks in a group concurrently (bounded by getMaxToolUseConcurrency),
 * merging their event streams. Context is NOT mutated here — callers collect the
 * yielded `contextLayers` and apply them after the group settles. Each block
 * emits an in-progress-id removal event when it finishes.
 */
async function* runBlocksConcurrently(
  blocks: ToolUseBlock[],
  assistantMessages: AssistantMessageEnvelope[],
  canUseTool: CanUseTool,
  toolUseContext: ToolUseContext,
): AsyncGenerator<ToolExecEvent> {
  yield* Rb6(
    blocks.map(async function* (block) {
      yield* Ax_(
        block,
        assistantMessages.find((msg) =>
          msg.message.content.some((c) => c.type === "tool_use" && c.id === block.id),
        ),
        canUseTool,
        toolUseContext,
        () => new Date().toISOString(),
      ),
        yield {
          type: "set_in_progress_tool_use_ids",
          op: {
            action: "remove",
            ids: [block.id],
          },
        };
    }),
    getMaxToolUseConcurrency(),
  );
}

/** Lazy init thunk for this module; primes the sibling modules it depends on. */
var initToolExecutionModule = L(() => {
  M7();
  c4();
  qpH();
  L1_();
});

export {getMaxToolUseConcurrency as r1p,runToolUseBlocks as jmo,groupBlocksByConcurrencySafety as o1p,runBlocksSerially as s1p,runBlocksConcurrently as i1p,initToolExecutionModule as jKa};
