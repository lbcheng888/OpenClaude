// @ts-nocheck
import {rl,ri} from "./2235_userFacingName.ts";
import {Uyo,i6t,kG,Cmt} from "./4326_code.ts";
import {Mn,Bxe,K6e,rsl,po} from "./5224_userPromptCount.ts";
import {hye,C9n} from "../../vendor/m3982.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {aO,IA} from "../telemetry/2225_names.ts";
import {h1,lh} from "../../vendor/m2739.ts";
import {l6t,xl} from "../../vendor/m4427.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Tool-use scheduler: queues tool_use blocks from an assistant message, decides
 * concurrency, executes them, and yields their results / progress / bridge events
 * back to the agent loop. Supports discard (streaming fallback) and abort/interrupt.
 */
class rTe {
  toolDefinitions;
  canUseTool;
  now;
  /** Per-tool execution records (id, block, status, results, controllers, ...). */
  tools = [];
  toolUseContext;
  /** When true, every tool result becomes a "streaming fallback discarded" error. */
  discarded = !1;
  /** Resolver woken when new progress is available for a waiting consumer. */
  progressAvailableResolve;
  /** Resolver woken when the queue becomes drainable. */
  drainableResolve;
  /** Monotonic counter bumped on every state change to wake drain waiters. */
  drainGeneration = 0;
  constructor(toolDefinitions, canUseTool, toolUseContext, now) {
    this.toolDefinitions = toolDefinitions;
    this.canUseTool = canUseTool;
    this.now = now;
    this.toolUseContext = toolUseContext;
  }
  discard() {
    this.discarded = !0, this.wakeWaiters();
  }
  /** Mark discarded and abort any in-flight tool; returns a status breakdown. */
  discardAndAbortInFlight(reason) {
    this.discard();
    let aborted = 0,
      completedBeforeEvent = 0,
      queuedNeverStarted = 0;
    for (let tool of this.tools) {
      if (tool.status === "completed" || tool.status === "yielded") {
        completedBeforeEvent++;
        continue;
      }
      if (tool.status === "queued") {
        queuedNeverStarted++;
        continue;
      }
      if (tool.status === "executing" && tool.abortController && !tool.abortController.signal.aborted) tool.abortController.abort(reason), aborted++;
    }
    return {
      aborted: aborted,
      completedBeforeEvent: completedBeforeEvent,
      queuedNeverStarted: queuedNeverStarted,
      toolUseIds: this.tools.map(tool => tool.id)
    };
  }
  /** Register a tool_use block; resolves the tool definition or queues a not-found error. */
  addTool(block, assistantMessage) {
    let toolDef = rl(this.toolDefinitions, block.name, this.toolUseContext.options.toolAliases);
    if (!toolDef) {
      let suggestion = Uyo(block.name, this.toolDefinitions, this.toolUseContext.agentId, this.toolUseContext.options.mainLoopModel);
      this.tools.push({
        id: block.id,
        block: block,
        assistantMessage: assistantMessage,
        status: "completed",
        isConcurrencySafe: !0,
        pendingProgress: [],
        pendingBridgeEvents: [],
        results: [Mn({
          content: [{
            type: "tool_result",
            content: `<tool_use_error>Error: No such tool available: ${block.name}${suggestion}</tool_use_error>`,
            is_error: !0,
            tool_use_id: block.id
          }],
          toolUseResult: `Error: No such tool available: ${block.name}${suggestion}`,
          sourceToolAssistantUUID: assistantMessage.uuid,
          now: this.now
        })]
      }), this.wakeWaiters();
      return;
    }
    let parsed = toolDef.inputSchema.safeParse(block.input),
      isConcurrencySafe = parsed?.success ? (() => {
        try {
          return Boolean(toolDef.isConcurrencySafe(parsed.data));
        } catch {
          return !1;
        }
      })() : !1;
    this.tools.push({
      id: block.id,
      block: block,
      assistantMessage: assistantMessage,
      status: "queued",
      isConcurrencySafe: isConcurrencySafe,
      pendingProgress: [],
      pendingBridgeEvents: [],
      results: []
    }), this.processQueue();
  }
  /** Allow execution if nothing is running, or if all running tools are concurrency-safe. */
  canExecuteTool(isConcurrencySafe) {
    let executing = this.tools.filter(tool => tool.status === "executing");
    return executing.length === 0 || isConcurrencySafe && executing.every(tool => tool.isConcurrencySafe);
  }
  async processQueue() {
    for (let tool of this.tools) {
      if (tool.status !== "queued") continue;
      if (this.canExecuteTool(tool.isConcurrencySafe)) await this.executeTool(tool);else if (!tool.isConcurrencySafe) break;
    }
  }
  /** Build the tool_result message for an interrupted or discarded tool. */
  createSyntheticErrorMessage(toolUseId, reason, assistantMessage) {
    if (reason === "user_interrupted") return Mn({
      content: [{
        type: "tool_result",
        content: Bxe(K6e),
        is_error: !0,
        tool_use_id: toolUseId
      }],
      toolUseResult: rsl,
      toolDenialKind: hye() ? "user-rejected" : void 0,
      sourceToolAssistantUUID: assistantMessage.uuid,
      now: this.now
    });
    return Mn({
      content: [{
        type: "tool_result",
        content: "<tool_use_error>Error: Streaming fallback - tool execution discarded</tool_use_error>",
        is_error: !0,
        tool_use_id: toolUseId
      }],
      toolUseResult: "Streaming fallback - tool execution discarded",
      sourceToolAssistantUUID: assistantMessage.uuid,
      now: this.now
    });
  }
  /** Determine why a tool should abort: discarded -> fallback, interrupt -> user, else null. */
  getAbortReason(tool) {
    if (this.discarded) return "streaming_fallback";
    if (this.toolUseContext.abortController.signal.aborted) {
      if (this.toolUseContext.abortController.signal.reason === "interrupt") return this.getToolInterruptBehavior(tool) === "cancel" ? "user_interrupted" : null;
      return "user_interrupted";
    }
    return null;
  }
  /** Resolve a tool's interrupt behavior ("cancel" | "block"), defaulting to "block". */
  getToolInterruptBehavior(tool) {
    let toolDef = rl(this.toolDefinitions, tool.block.name, this.toolUseContext.options.toolAliases);
    if (!toolDef?.interruptBehavior) return "block";
    try {
      return toolDef.interruptBehavior();
    } catch {
      return "block";
    }
  }
  /** Emit a bridge event describing whether an interruptible tool is currently running. */
  updateInterruptibleState(tool) {
    let executing = this.tools.filter(t => t.status === "executing"),
      inProgress = executing.length > 0 && executing.every(t => this.getToolInterruptBehavior(t) === "cancel");
    tool.pendingBridgeEvents.push({
      type: "interruptible_tool_in_progress",
      inProgress: inProgress
    }), this.wakeWaiters();
  }
  wakeWaiters() {
    if (this.drainGeneration++, this.progressAvailableResolve) this.progressAvailableResolve(), this.progressAvailableResolve = void 0;
    if (this.drainableResolve) this.drainableResolve(), this.drainableResolve = void 0;
  }
  /** Resolve once drainGeneration advances past the caller's last-seen value. */
  waitForDrainable(lastSeenGeneration) {
    if (this.drainGeneration > lastSeenGeneration) return Promise.resolve(this.drainGeneration);
    return new Promise(resolve => {
      this.drainableResolve = () => resolve(this.drainGeneration);
    });
  }
  /** Collect prior same-turn tool_use blocks (grouped by assistant message) for context. */
  buildSameTurnToolUses(currentTool) {
    try {
      let byMessage = new Map();
      for (let tool of this.tools) {
        if (tool === currentTool) break;
        let blocks = byMessage.get(tool.assistantMessage) ?? [];
        blocks.push(tool.block), byMessage.set(tool.assistantMessage, blocks);
      }
      if (byMessage.size === 0) return;
      return [...byMessage.entries()].map(([message, blocks]) => ({
        ...message,
        message: {
          ...message.message,
          content: blocks
        }
      }));
    } catch (error) {
      W("tengu_auto_mode_sibling_context_error", {
        ...aO(error)
      });
      return;
    }
  }
  /** Run a single tool: stream its messages/progress/bridge events into the tool record. */
  async executeTool(tool) {
    tool.status = "executing", this.updateInterruptibleState(tool);
    let results = [],
      contextLayers = [],
      promise = (async () => {
        let abortReason = this.getAbortReason(tool);
        if (abortReason) {
          results.push(this.createSyntheticErrorMessage(tool.id, abortReason, tool.assistantMessage)), tool.results = results, tool.contextLayers = contextLayers, tool.status = "completed", this.updateInterruptibleState(tool);
          return;
        }
        let childAbortController = h1(this.toolUseContext.abortController);
        childAbortController.signal.addEventListener("abort", () => {
          if (!this.toolUseContext.abortController.signal.aborted && !this.discarded) this.toolUseContext.abortController.abort(childAbortController.signal.reason);
        }, {
          once: !0
        }), tool.abortController = childAbortController;
        let stream = i6t(tool.block, tool.assistantMessage, this.canUseTool, {
            ...this.toolUseContext,
            abortController: childAbortController,
            sameTurnToolUses: this.buildSameTurnToolUses(tool)
          }, this.now),
          sawToolError = !1;
        for await (let event of stream) {
          if (kG(event)) {
            tool.pendingBridgeEvents.push(event), this.wakeWaiters();
            continue;
          }
          let abortReasonDuringStream = this.getAbortReason(tool);
          if (abortReasonDuringStream && !sawToolError) {
            results.push(this.createSyntheticErrorMessage(tool.id, abortReasonDuringStream, tool.assistantMessage));
            break;
          }
          if (event.message.type === "user" && Array.isArray(event.message.message.content) && event.message.message.content.some(part => part.type === "tool_result" && part.is_error === !0)) sawToolError = !0;
          if (event.message) if (event.message.type === "progress") {
            if (tool.pendingProgress.push(event.message), this.progressAvailableResolve) this.progressAvailableResolve(), this.progressAvailableResolve = void 0;
          } else results.push(event.message);
          if (event.contextLayers) contextLayers.push(...event.contextLayers.layers);
        }
        if (tool.results = results, tool.contextLayers = contextLayers, tool.status = "completed", this.updateInterruptibleState(tool), !tool.isConcurrencySafe && contextLayers.length > 0) this.toolUseContext = l6t(this.toolUseContext, contextLayers);
      })();
    tool.promise = promise, promise.finally(() => {
      this.processQueue();
    });
  }
  /** Yield buffered bridge events, progress, and completed results in order. */
  *getCompletedResults() {
    if (this.discarded) return;
    for (let tool of this.tools) {
      while (tool.pendingBridgeEvents.length > 0) yield tool.pendingBridgeEvents.shift();
      while (tool.pendingProgress.length > 0) yield {
        message: tool.pendingProgress.shift(),
        newContext: this.toolUseContext
      };
      if (tool.status === "yielded") continue;
      if (tool.status === "completed") {
        tool.status = "yielded";
        for (let result of tool.results) yield {
          message: result,
          newContext: this.toolUseContext
        };
        yield {
          type: "set_in_progress_tool_use_ids",
          op: {
            action: "remove",
            ids: [tool.id]
          }
        };
      } else if (tool.status === "executing" && !tool.isConcurrencySafe) break;
    }
  }
  hasPendingProgress() {
    return this.tools.some(tool => tool.pendingProgress.length > 0 || tool.pendingBridgeEvents.length > 0);
  }
  /** Drive the queue to completion, yielding results and awaiting in-flight tools as needed. */
  async *getRemainingResults() {
    if (this.discarded) return;
    while (this.hasUnfinishedTools()) {
      await this.processQueue();
      let yieldedAny = !1;
      for (let result of this.getCompletedResults()) yieldedAny = !0, yield result;
      if (this.hasExecutingTools() && !yieldedAny && !this.hasPendingProgress()) {
        let promises = this.tools.filter(tool => tool.status === "executing" && tool.promise).map(tool => tool.promise),
          progressAvailable = new Promise(resolve => {
            this.progressAvailableResolve = resolve;
          });
        if (promises.length > 0) await Promise.race([...promises, progressAvailable]);
      }
    }
    for (let result of this.getCompletedResults()) yield result;
  }
  hasExecutingTools() {
    return this.tools.some(tool => tool.status === "executing");
  }
  hasUnfinishedTools() {
    return this.tools.some(tool => tool.status !== "yielded");
  }
  getUpdatedContext() {
    return this.toolUseContext;
  }
}
var nsl = b(() => {
  kt();
  xl();
  IA();
  po();
  C9n();
  ri();
  lh();
  Cmt();
});
export {rTe,nsl};
