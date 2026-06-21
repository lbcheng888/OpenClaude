// @ts-nocheck
import {Cl as R4,Ri as k7} from "./2227_userFacingName.ts";
import {qmo as U3q,$3t as hu_,runForkedQuery as uc,bdt as G5_} from "./4306_code.ts";
import {Ln as B6,Wqe as epH,hqe as kpH,lo as Aq} from "./5190_userPromptCount.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {D1 as Jv,Cv as SW} from "../telemetry/2217_names.ts";
import {rN as nv,ch as _$} from "../../vendor/m2727.ts";
import {j3t as yu_,Ql as I4} from "../../vendor/m4405.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
class ToolUseScheduler {
  toolDefinitions;
  canUseTool;
  now;
  tools = [];
  toolUseContext;
  discarded = false;
  progressAvailableResolve;
  drainableResolve;
  drainGeneration = 0;
  constructor(reason, _, q, K) {
    this.toolDefinitions = reason;
    this.canUseTool = _;
    this.now = K;
    this.toolUseContext = q;
  }
  discard() {
    this.discarded = true, this.wakeWaiters();
  }
  discardAndAbortInFlight(isConcurrencySafe) {
    this.discard();
    let _ = 0,
      q = 0,
      K = 0;
    for (let O of this.tools) {
      if (O.status === "completed" || O.status === "yielded") {
        q++;
        continue;
      }
      if (O.status === "queued") {
        K++;
        continue;
      }
      if (O.status === "executing" && O.abortController && !O.abortController.signal.aborted) O.abortController.abort(isConcurrencySafe), _++;
    }
    return {
      aborted: _,
      completedBeforeEvent: q,
      queuedNeverStarted: K,
      toolUseIds: this.tools.map(O => O.id)
    };
  }
  addTool(H, _) {
    let q = R4(this.toolDefinitions, H.name, this.toolUseContext.options.toolAliases);
    if (!q) {
      let T = U3q(H.name, this.toolDefinitions, this.toolUseContext.agentId, this.toolUseContext.options.mainLoopModel);
      this.tools.push({
        id: H.id,
        block: H,
        assistantMessage: _,
        status: "completed",
        isConcurrencySafe: true,
        pendingProgress: [],
        pendingBridgeEvents: [],
        results: [B6({
          content: [{
            type: "tool_result",
            content: `<tool_use_error>Error: No such tool available: ${H.name}${T}</tool_use_error>`,
            is_error: true,
            tool_use_id: H.id
          }],
          toolUseResult: `Error: No such tool available: ${H.name}${T}`,
          sourceToolAssistantUUID: _.uuid,
          now: this.now
        })]
      }), this.wakeWaiters();
      return;
    }
    let K = q.inputSchema.safeParse(H.input),
      O = K?.success ? (() => {
        try {
          return Boolean(q.isConcurrencySafe(K.data));
        } catch {
          return false;
        }
      })() : false;
    this.tools.push({
      id: H.id,
      block: H,
      assistantMessage: _,
      status: "queued",
      isConcurrencySafe: O,
      pendingProgress: [],
      pendingBridgeEvents: [],
      results: []
    }), this.processQueue();
  }
  canExecuteTool(toolUseId) {
    let _ = this.tools.filter(q => q.status === "executing");
    return _.length === 0 || toolUseId && _.every(q => q.isConcurrencySafe);
  }
  async processQueue() {
    for (let H of this.tools) {
      if (H.status !== "queued") continue;
      if (this.canExecuteTool(H.isConcurrencySafe)) await this.executeTool(H);else if (!H.isConcurrencySafe) break;
    }
  }
  createSyntheticErrorMessage(tool, _, q) {
    if (_ === "user_interrupted") return B6({
      content: [{
        type: "tool_result",
        content: epH(kpH),
        is_error: true,
        tool_use_id: tool
      }],
      toolUseResult: "User rejected tool use",
      sourceToolAssistantUUID: q.uuid,
      now: this.now
    });
    return B6({
      content: [{
        type: "tool_result",
        content: "<tool_use_error>Error: Streaming fallback - tool execution discarded</tool_use_error>",
        is_error: true,
        tool_use_id: tool
      }],
      toolUseResult: "Streaming fallback - tool execution discarded",
      sourceToolAssistantUUID: q.uuid,
      now: this.now
    });
  }
  getAbortReason(tool) {
    if (this.discarded) return "streaming_fallback";
    if (this.toolUseContext.abortController.signal.aborted) {
      if (this.toolUseContext.abortController.signal.reason === "interrupt") return this.getToolInterruptBehavior(tool) === "cancel" ? "user_interrupted" : null;
      return "user_interrupted";
    }
    return null;
  }
  getToolInterruptBehavior(currentTool) {
    let _ = R4(this.toolDefinitions, currentTool.block.name, this.toolUseContext.options.toolAliases);
    if (!_?.interruptBehavior) return "block";
    try {
      return _.interruptBehavior();
    } catch {
      return "block";
    }
  }
  updateInterruptibleState(tool) {
    let _ = this.tools.filter(K => K.status === "executing"),
      results = _.length > 0 && _.every(K => this.getToolInterruptBehavior(K) === "cancel");
    tool.pendingBridgeEvents.push({
      type: "interruptible_tool_in_progress",
      inProgress: results
    }), this.wakeWaiters();
  }
  wakeWaiters() {
    if (this.drainGeneration++, this.progressAvailableResolve) this.progressAvailableResolve(), this.progressAvailableResolve = undefined;
    if (this.drainableResolve) this.drainableResolve(), this.drainableResolve = undefined;
  }
  waitForDrainable(H) {
    if (this.drainGeneration > H) return Promise.resolve(this.drainGeneration);
    return new Promise(_ => {
      this.drainableResolve = () => _(this.drainGeneration);
    });
  }
  buildSameTurnToolUses(H) {
    try {
      let _ = new Map();
      for (let q of this.tools) {
        if (q === H) break;
        let K = _.get(q.assistantMessage) ?? [];
        K.push(q.block), _.set(q.assistantMessage, K);
      }
      if (_.size === 0) return;
      return [..._.entries()].map(([q, K]) => ({
        ...q,
        message: {
          ...q.message,
          content: K
        }
      }));
    } catch (_) {
      c("tengu_auto_mode_sibling_context_error", {
        ...Jv(_)
      });
      return;
    }
  }
  async executeTool(H) {
    H.status = "executing", this.updateInterruptibleState(H);
    let _ = [],
      q = [],
      O = (async () => {
        let T = this.getAbortReason(H);
        if (T) {
          _.push(this.createSyntheticErrorMessage(H.id, T, H.assistantMessage)), H.results = _, H.contextLayers = q, H.status = "completed", this.updateInterruptibleState(H);
          return;
        }
        let z = nv(this.toolUseContext.abortController);
        z.signal.addEventListener("abort", () => {
          if (!this.toolUseContext.abortController.signal.aborted && !this.discarded) this.toolUseContext.abortController.abort(z.signal.reason);
        }, {
          once: true
        }), H.abortController = z;
        let $ = hu_(H.block, H.assistantMessage, this.canUseTool, {
            ...this.toolUseContext,
            abortController: z,
            sameTurnToolUses: this.buildSameTurnToolUses(H)
          }, this.now),
          Y = false;
        for await (let w of $) {
          if (uc(w)) {
            H.pendingBridgeEvents.push(w), this.wakeWaiters();
            continue;
          }
          let A = this.getAbortReason(H);
          if (A && !Y) {
            _.push(this.createSyntheticErrorMessage(H.id, A, H.assistantMessage));
            break;
          }
          if (w.message.type === "user" && Array.isArray(w.message.message.content) && w.message.message.content.some(f => f.type === "tool_result" && f.is_error === true)) Y = true;
          if (w.message) if (w.message.type === "progress") {
            if (H.pendingProgress.push(w.message), this.progressAvailableResolve) this.progressAvailableResolve(), this.progressAvailableResolve = undefined;
          } else _.push(w.message);
          if (w.contextLayers) q.push(...w.contextLayers.layers);
        }
        if (H.results = _, H.contextLayers = q, H.status = "completed", this.updateInterruptibleState(H), !H.isConcurrencySafe && q.length > 0) this.toolUseContext = yu_(this.toolUseContext, q);
      })();
    H.promise = O, O.finally(() => {
      this.processQueue();
    });
  }
  *getCompletedResults() {
    if (this.discarded) return;
    for (let H of this.tools) {
      while (H.pendingBridgeEvents.length > 0) yield H.pendingBridgeEvents.shift();
      while (H.pendingProgress.length > 0) yield {
        message: H.pendingProgress.shift(),
        newContext: this.toolUseContext
      };
      if (H.status === "yielded") continue;
      if (H.status === "completed") {
        H.status = "yielded";
        for (let _ of H.results) yield {
          message: _,
          newContext: this.toolUseContext
        };
        yield {
          type: "set_in_progress_tool_use_ids",
          op: {
            action: "remove",
            ids: [H.id]
          }
        };
      } else if (H.status === "executing" && !H.isConcurrencySafe) break;
    }
  }
  hasPendingProgress() {
    return this.tools.some(H => H.pendingProgress.length > 0 || H.pendingBridgeEvents.length > 0);
  }
  async *getRemainingResults() {
    if (this.discarded) return;
    while (this.hasUnfinishedTools()) {
      await this.processQueue();
      let H = false;
      for (let _ of this.getCompletedResults()) H = true, yield _;
      if (this.hasExecutingTools() && !H && !this.hasPendingProgress()) {
        let _ = this.tools.filter(K => K.status === "executing" && K.promise).map(K => K.promise),
          q = new Promise(K => {
            this.progressAvailableResolve = K;
          });
        if (_.length > 0) await Promise.race([..._, q]);
      }
    }
    for (let H of this.getCompletedResults()) yield H;
  }
  hasExecutingTools() {
    return this.tools.some(H => H.status === "executing");
  }
  hasUnfinishedTools() {
    return this.tools.some(H => H.status !== "yielded");
  }
  getUpdatedContext() {
    return this.toolUseContext;
  }
}
var EdK = L(() => {
  v_();
  I4();
  SW();
  Aq();
  k7();
  _$();
  G5_();
});

export {ToolUseScheduler as N_e,EdK as TQa};
