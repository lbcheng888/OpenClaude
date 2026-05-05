import type {
  ApiMessage,
  ApiStreamEvent,
  AssistantContentBlock,
  TextContentBlock,
  ToolDef,
  ToolResultContentBlock,
  ToolUseContentBlock,
  Usage,
} from "../api/client.js";
import type { HookEventName, HookInput, HookOutcome, HookRunner } from "../hooks/runner.js";
import { sanitizeAssistantText, stripDanglingInternalProtocolPrefix, stripInternalProtocolLeak } from "../core/protocol.js";
import { existsSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";

export type ToolExecutionResult = {
  content: string;
  isError?: boolean;
  display?: ToolDisplay;
};

export type ToolExecutionContext = {
  toolUseId: string;
  emitProgress?: (progress: ToolProgressDisplay) => void | Promise<void>;
  emitNotification?: (text: string) => void | Promise<void>;
  runSubagent?: (request: SubagentExecutionRequest, signal?: AbortSignal) => Promise<SubagentExecutionResult>;
};

export type SubagentExecutionRequest = {
  description: string;
  prompt: string;
  subagentType?: string;
  parentToolUseId: string;
  agentId?: string;
  runInBackground?: boolean;
};

export type SubagentExecutionResult = {
  agentId: string;
  status?: "completed" | "failed";
  content: string;
  totalDurationMs: number;
  totalTokens: number;
  totalToolUseCount: number;
  error?: string;
};

export type ToolDisplay =
  | {
      type: "bash";
      stdout: string;
      stderr: string;
      exitCode: number | null;
      cwd: string;
      cwdResetWarning?: string;
      persistedOutputPath?: string;
      persistedOutputSize?: number;
      noOutputExpected?: boolean;
      timeoutMs?: number;
    }
  | {
      type: "bash_background";
      taskId: string;
      command: string;
      cwd: string;
      status: "running" | "completed" | "failed" | "killed";
    }
  | {
      type: "edit";
      filePath: string;
      summary: string;
      diff: string;
    }
  | {
      type: "read";
      filePath: string;
      startLine: number;
      numLines: number;
      totalLines: number;
      status: "text" | "empty" | "offset_out_of_range";
    }
  | {
      type: "web_search";
      query: string;
      searchCount: number;
      totalResultCount: number;
      durationSeconds: number;
      results: Array<{ title: string; url: string; snippet?: string }>;
    }
  | {
      type: "agent";
      agentId: string;
      description: string;
      prompt: string;
      status: "completed" | "failed";
      content: string;
      totalDurationMs: number;
      totalTokens: number;
      totalToolUseCount: number;
      error?: string;
    }
  | {
      type: "agent_background";
      taskId: string;
      agentId: string;
      description: string;
      prompt: string;
      outputFile: string;
      status: "running" | "completed" | "failed" | "killed";
    }
  | { type: "text"; summary?: string };

export type ToolProgressDisplay =
  | {
      type: "bash_progress";
      output: string;
      fullOutput: string;
      elapsedTimeSeconds: number;
      totalLines: number;
      totalBytes: number;
      timeoutMs?: number;
    }
  | {
      type: "web_search_progress";
      stage: "query_update" | "search_results_received";
      query: string;
      resultCount?: number;
      elapsedTimeSeconds: number;
    }
  | {
      type: "agent_progress";
      agentId?: string;
      description: string;
      message: string;
      elapsedTimeSeconds: number;
      totalTokens?: number;
      totalToolUseCount?: number;
      toolName?: string;
      entries?: Array<{
        toolUseId: string;
        toolName: string;
        input: Record<string, unknown>;
        status: "running" | "completed" | "failed";
        summary?: string;
      }>;
    };

export type PermissionDecision = {
  behavior: "allow" | "deny" | "ask";
  updatedInput?: Record<string, unknown>;
  message?: string;
};

export type SpinnerMode = "requesting" | "responding" | "thinking" | "tool-input" | "tool-use";

export type TenguLoopEvent =
  | { type: "api_request"; turn: number; messages: ApiMessage[]; tools: ToolDef[] }
  | { type: "stream_mode"; mode: SpinnerMode }
  | { type: "assistant_start"; assistantId: string; turn: number }
  | { type: "assistant_text_delta"; assistantId: string; text: string; fullText: string }
  | {
      type: "tool_input_start";
      assistantId: string;
      index: number;
      tool: { id: string; name: string; input: Record<string, unknown> };
    }
  | {
      type: "tool_input_delta";
      assistantId: string;
      index: number;
      toolUseId: string;
      partialJson: string;
      fullInputJson: string;
    }
  | {
      type: "assistant_complete";
      assistantId: string;
      content: AssistantContentBlock[];
      text: string;
      stopReason: string | null;
      usage?: Usage;
    }
  | { type: "tool_start"; assistantId: string; tool: ToolUseContentBlock }
  | { type: "tool_progress"; assistantId: string; tool: ToolUseContentBlock; progress: ToolProgressDisplay }
  | {
      type: "tool_result";
      assistantId: string;
      tool: ToolUseContentBlock;
      result: ToolResultContentBlock;
      display?: ToolDisplay;
    }
  | { type: "tool_results_message"; results: ToolResultContentBlock[] }
  | { type: "notification"; text: string };

export type TenguSessionOptions = {
  tools: ToolDef[];
  stream: (messages: ApiMessage[], tools: ToolDef[], signal?: AbortSignal) => AsyncIterable<ApiStreamEvent>;
  executeTool: (
    name: string,
    input: Record<string, unknown>,
    signal?: AbortSignal,
    context?: ToolExecutionContext,
  ) => Promise<ToolExecutionResult>;
  checkPermission?: (tool: ToolUseContentBlock) => Promise<PermissionDecision>;
  requestPermission?: (tool: ToolUseContentBlock) => Promise<PermissionDecision>;
  runHooks?: HookRunner;
  onEvent?: (event: TenguLoopEvent) => void | Promise<void>;
  maxTurns?: number;
  apiHistoryTokenBudget?: number;
};

export type TenguRunResult = {
  text: string;
  messages: ApiMessage[];
  stopReason: string | null;
  usage?: Usage;
};

type AssistantTurn = {
  content: AssistantContentBlock[];
  text: string;
  toolUses: ToolUseContentBlock[];
  stopReason: string | null;
  usage?: Usage;
};

type PreparedToolUse =
  | { kind: "result"; tool: ToolUseContentBlock; result: ToolResultContentBlock }
  | { kind: "execute"; tool: ToolUseContentBlock };

export class TenguSession {
  private readonly messages: ApiMessage[] = [];
  private readonly maxTurns: number;
  private nextAssistantId = 1;
  private activeAbortController: AbortController | null = null;

  constructor(private readonly options: TenguSessionOptions) {
    this.maxTurns = options.maxTurns ?? 10;
  }

  get history(): ApiMessage[] {
    return cloneMessages(this.messages);
  }

  reset(): void {
    this.cancel("Session reset");
    this.messages.length = 0;
    this.nextAssistantId = 1;
  }

  hydrate(messages: ApiMessage[]): void {
    this.cancel("Session hydrate");
    this.messages.length = 0;
    this.messages.push(...cloneMessages(messages).map(sanitizeApiMessage));
    this.nextAssistantId = 1;
  }

  cancel(reason = "Interrupted"): void {
    this.activeAbortController?.abort(new Error(reason));
  }

  async runUserTurn(prompt: string): Promise<TenguRunResult> {
    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new Error("Prompt is empty");
    }
    if (this.activeAbortController) {
      throw new Error("Turn already running");
    }

    const abortController = new AbortController();
    this.activeAbortController = abortController;
    let finalText = "";

    try {
      this.messages.push({ role: "user", content: trimmed });
      let finalStopReason: string | null = null;

      for (let turn = 0; turn < this.maxTurns; turn++) {
        throwIfAborted(abortController.signal);
        const assistantId = `assistant-${this.nextAssistantId++}`;
        const requestMessages = this.apiRequestHistory();
        await this.emit({ type: "api_request", turn, messages: cloneMessages(requestMessages), tools: this.options.tools });
        await this.emit({ type: "assistant_start", assistantId, turn });

        const assistantTurn = await this.collectAssistantTurn(assistantId, abortController.signal, requestMessages);
        finalText = assistantTurn.text;
        finalStopReason = assistantTurn.stopReason;
        await this.emit({
          type: "assistant_complete",
          assistantId,
          content: assistantTurn.content,
          text: assistantTurn.text,
          stopReason: assistantTurn.stopReason,
          usage: assistantTurn.usage,
        });

        if (assistantTurn.content.length > 0) {
          this.messages.push({ role: "assistant", content: assistantTurn.content });
        }

        if (assistantTurn.toolUses.length === 0) {
          if (assistantTurn.stopReason === "tool_use") {
            throw new Error("API stopped for tool_use without a tool_use block");
          }
          const stopHook = await this.runHooks("Stop", {
            stop_reason: assistantTurn.stopReason,
            stop_hook_active: false,
            message: assistantTurn.text,
            last_assistant_message: assistantTurn.text,
          }, abortController.signal);
          if (stopHook.blocked) {
            this.messages.push({
              role: "user",
              content: stopHook.message || "Stop hook prevented continuation",
            });
            continue;
          }
          return {
            text: finalText,
            messages: this.history,
            stopReason: finalStopReason,
          };
        }

        const toolResults = await this.executeToolUses(assistantId, assistantTurn.toolUses, abortController.signal);
        this.messages.push({ role: "user", content: toolResults });
        assertResolvedToolResults(this.messages);
        await this.emit({ type: "tool_results_message", results: toolResults });
      }

      throw new Error(`Agent loop exceeded ${this.maxTurns} turns`);
    } catch (error) {
      if (!abortController.signal.aborted) {
        await this.runHooks("StopFailure", {
          error: formatError(error),
          last_assistant_message: finalText,
        }, abortController.signal).catch(() => undefined);
      }
      throw error;
    } finally {
      if (this.activeAbortController === abortController) {
        this.activeAbortController = null;
      }
    }
  }

  private async collectAssistantTurn(
    assistantId: string,
    signal: AbortSignal,
    requestMessages: ApiMessage[],
  ): Promise<AssistantTurn> {
    const blocksByIndex = new Map<number, AssistantContentBlock>();
    const toolInputByIndex = new Map<number, { id: string; name: string; inputJson: string }>();
    const textStateByIndex = new Map<number, TextStreamState>();
    let stopReason: string | null = null;
    let usage: Usage | undefined;
    let fullText = "";

    for await (const event of this.options.stream(requestMessages, this.options.tools, signal)) {
      throwIfAborted(signal);
      switch (event.type) {
        case "request_start":
          await this.emit({ type: "stream_mode", mode: "requesting" });
          break;

        case "content_block_start":
          await this.emit({ type: "stream_mode", mode: getSpinnerModeForContentBlock(event.blockType) });
          if (event.tool) {
            toolInputByIndex.set(event.index, {
              id: event.tool.id,
              name: event.tool.name,
              inputJson: "",
            });
            await this.emit({
              type: "tool_input_start",
              assistantId,
              index: event.index,
              tool: { id: event.tool.id, name: event.tool.name, input: {} },
            });
          }
          break;

        case "tool_input_delta":
          await this.emit({ type: "stream_mode", mode: "tool-input" });
          {
            const current = toolInputByIndex.get(event.index);
            if (current) {
              current.inputJson += event.partialJson;
              await this.emit({
                type: "tool_input_delta",
                assistantId,
                index: event.index,
                toolUseId: current.id,
                partialJson: event.partialJson,
                fullInputJson: current.inputJson,
              });
            }
          }
          break;

        case "thinking_delta":
          await this.emit({ type: "stream_mode", mode: "thinking" });
          break;

        case "text_delta": {
          await this.emit({ type: "stream_mode", mode: "responding" });
          const state = textStateByIndex.get(event.index) || createTextStreamState();
          state.rawText += event.text;
          textStateByIndex.set(event.index, state);
          if (state.suppressed) break;
          const sanitizedText = stripInternalProtocolLeak(state.rawText);
          if (sanitizedText.truncated) {
            state.suppressed = true;
          }
          const visibleText = sanitizedText.truncated
            ? sanitizedText.text
            : stripDanglingInternalProtocolPrefix(sanitizedText.text);
          const visibleDelta = visibleText.slice(state.visibleText.length);
          if (!visibleDelta) break;
          const existing = blocksByIndex.get(event.index);
          if (existing && existing.type !== "text") {
            throw new Error(`Text delta collided with ${existing.type} block at index ${event.index}`);
          }
          const block: TextContentBlock = existing || { type: "text", text: "" };
          block.text += visibleDelta;
          blocksByIndex.set(event.index, block);
          state.visibleText += visibleDelta;
          fullText += visibleDelta;
          await this.emit({
            type: "assistant_text_delta",
            assistantId,
            text: visibleDelta,
            fullText,
          });
          break;
        }

        case "tool_use": {
          await this.emit({ type: "stream_mode", mode: "tool-input" });
          if (blocksByIndex.has(event.index)) {
            throw new Error(`Duplicate content block at index ${event.index}`);
          }
          blocksByIndex.set(event.index, event.tool);
          break;
        }

        case "message_delta":
          await this.emit({ type: "stream_mode", mode: "responding" });
          if (event.stop_reason !== undefined) {
            stopReason = event.stop_reason;
          }
          if (event.usage) {
            usage = { ...usage, ...event.usage };
          }
          break;

        case "message_stop":
          await this.emit({ type: "stream_mode", mode: "tool-use" });
          break;

        case "error":
          throw new Error(event.error);
      }
    }

    for (const [index, state] of textStateByIndex) {
      if (state.suppressed || state.rawText.length <= state.visibleText.length) continue;
      const pendingText = state.rawText.slice(state.visibleText.length);
      const existing = blocksByIndex.get(index);
      if (existing?.type === "text") {
        existing.text += pendingText;
        state.visibleText += pendingText;
      }
    }

    const content = [...blocksByIndex.entries()]
      .sort(([a], [b]) => a - b)
      .map(([, block]) => block)
      .filter(block => block.type !== "text" || block.text.length > 0);
    const toolUses = content.filter((block): block is ToolUseContentBlock => block.type === "tool_use");

    assertUniqueToolUseIds(content);
    return {
      content,
      text: content
        .filter((block): block is { type: "text"; text: string } => block.type === "text")
        .map(block => block.text)
        .join(""),
      toolUses,
      stopReason,
      usage,
    };
  }

  private async executeToolUses(
    assistantId: string,
    toolUses: ToolUseContentBlock[],
    signal: AbortSignal,
  ): Promise<ToolResultContentBlock[]> {
    const resultsByToolUseId = new Map<string, ToolResultContentBlock>();

    for (const batch of partitionToolUses(toolUses)) {
      if (batch.concurrent) {
        const prepared: PreparedToolUse[] = [];
        for (const toolUse of batch.toolUses) {
          const item = await this.prepareToolUse(assistantId, toolUse, signal);
          if (item.kind === "result") {
            resultsByToolUseId.set(item.tool.id, item.result);
          } else {
            prepared.push(item);
          }
        }

        const completed = await Promise.all(
          prepared.map(item => this.executePreparedToolUse(assistantId, item.tool, signal)),
        );
        for (const item of completed) {
          resultsByToolUseId.set(item.tool.id, item.result);
        }
        continue;
      }

      for (const toolUse of batch.toolUses) {
        const prepared = await this.prepareToolUse(assistantId, toolUse, signal);
        if (prepared.kind === "result") {
          resultsByToolUseId.set(prepared.tool.id, prepared.result);
          continue;
        }
        const completed = await this.executePreparedToolUse(assistantId, prepared.tool, signal);
        resultsByToolUseId.set(completed.tool.id, completed.result);
      }
    }

    return toolUses.map(toolUse => {
      const result = resultsByToolUseId.get(toolUse.id);
      if (!result) throw new Error(`Missing tool_result for ${toolUse.id}`);
      return result;
    });
  }

  private async prepareToolUse(
    assistantId: string,
    toolUse: ToolUseContentBlock,
    signal: AbortSignal,
  ): Promise<PreparedToolUse> {
    throwIfAborted(signal);
    await this.emit({ type: "stream_mode", mode: "tool-use" });
    await this.emit({ type: "tool_start", assistantId, tool: toolUse });
    let finalToolUse = toolUse;

    const preHook = await this.runHooks("PreToolUse", {
      tool_name: finalToolUse.name,
      tool_input: finalToolUse.input,
      tool_use_id: finalToolUse.id,
    }, signal);

    if (preHook.updatedInput) {
      finalToolUse = { ...finalToolUse, input: preHook.updatedInput };
    }

    if (preHook.blocked || preHook.permissionBehavior === "deny") {
      const result = {
        type: "tool_result" as const,
        tool_use_id: finalToolUse.id,
        content: preHook.message || preHook.permissionDecisionReason || "PreToolUse hook blocked tool execution",
        is_error: true,
      };
      await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
      return { kind: "result", tool: finalToolUse, result };
    }

    const decision = await this.resolvePermission(finalToolUse, signal, preHook);
    throwIfAborted(signal);

    if (decision.behavior === "deny") {
      const result = {
        type: "tool_result" as const,
        tool_use_id: finalToolUse.id,
        content: decision.message || "Permission denied",
        is_error: true,
      };
      await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
      return { kind: "result", tool: finalToolUse, result };
    }

    const input = decision.updatedInput ?? finalToolUse.input;
    finalToolUse = input === finalToolUse.input ? finalToolUse : { ...finalToolUse, input };
    return { kind: "execute", tool: finalToolUse };
  }

  private async executePreparedToolUse(
    assistantId: string,
    finalToolUse: ToolUseContentBlock,
    signal: AbortSignal,
  ): Promise<{ tool: ToolUseContentBlock; result: ToolResultContentBlock }> {
    try {
      const executed = await this.options.executeTool(finalToolUse.name, finalToolUse.input, signal, {
        toolUseId: finalToolUse.id,
        emitProgress: progress => this.emit({ type: "tool_progress", assistantId, tool: finalToolUse, progress }),
        emitNotification: text => this.emit({ type: "notification", text }),
      });
      const postHook = await this.runHooks(executed.isError ? "PostToolUseFailure" : "PostToolUse", {
        tool_name: finalToolUse.name,
        tool_input: finalToolUse.input,
        tool_use_id: finalToolUse.id,
        tool_response: executed.content,
        error: executed.isError ? executed.content : undefined,
        is_error: executed.isError || false,
      }, signal);
      const contentWithHookContext = postHook.additionalContext.length > 0
        ? appendHookContext(executed.content, postHook.additionalContext)
        : executed.content;
      const contentForModel = boundToolResultContent(
        postHook.blocked
          ? appendHookMessage(contentWithHookContext, postHook.message || "PostToolUse hook blocked continuation")
          : contentWithHookContext,
        finalToolUse.name,
        finalToolUse.id,
      );
      const result = {
        type: "tool_result" as const,
        tool_use_id: finalToolUse.id,
        content: contentForModel,
        is_error: executed.isError || postHook.blocked || undefined,
      };
      await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result, display: executed.display });
      return { tool: finalToolUse, result };
    } catch (error) {
      if (signal.aborted) throw error;
      const result = {
        type: "tool_result" as const,
        tool_use_id: finalToolUse.id,
        content: `<tool_use_error>${formatError(error)}</tool_use_error>`,
        is_error: true,
      };
      await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
      return { tool: finalToolUse, result };
    }
  }

  private async resolvePermission(
    toolUse: ToolUseContentBlock,
    signal: AbortSignal,
    preHook?: HookOutcome,
  ): Promise<PermissionDecision> {
    if (preHook?.permissionBehavior === "allow") {
      const checked = this.options.checkPermission
        ? await this.options.checkPermission(toolUse)
        : { behavior: "allow" as const };
      if (checked.behavior === "deny") return checked;
      return { behavior: "allow", updatedInput: preHook.updatedInput };
    }

    const checked = preHook?.permissionBehavior === "ask"
      ? {
          behavior: "ask" as const,
          message: preHook.permissionDecisionReason || "PreToolUse hook requested permission prompt",
        }
      : this.options.checkPermission
        ? await this.options.checkPermission(toolUse)
        : { behavior: "allow" as const };

    if (checked.behavior !== "ask") {
      return checked;
    }

    const permissionHook = await this.runHooks("PermissionRequest", {
      tool_name: toolUse.name,
      tool_input: toolUse.input,
      tool_use_id: toolUse.id,
    }, signal);

    if (permissionHook.permissionDecision) {
      return {
        behavior: permissionHook.permissionDecision.behavior,
        updatedInput: permissionHook.permissionDecision.updatedInput,
        message: permissionHook.permissionDecision.message,
      };
    }

    if (!this.options.requestPermission) {
      return { behavior: "deny", message: "Permission prompt unavailable" };
    }

    return this.options.requestPermission(toolUse);
  }

  private async emit(event: TenguLoopEvent): Promise<void> {
    await this.options.onEvent?.(event);
  }

  private apiRequestHistory(): ApiMessage[] {
    return prepareApiMessagesForRequest(this.messages, this.options.apiHistoryTokenBudget);
  }

  private async runHooks(
    event: HookEventName,
    input: HookInput,
    signal: AbortSignal,
  ): Promise<HookOutcome> {
    if (!this.options.runHooks) return { blocked: false, additionalContext: [], notifications: [] };
    const rawOutcome = await this.options.runHooks(event, input, signal);
    const outcome = {
      ...rawOutcome,
      additionalContext: rawOutcome.additionalContext || [],
      notifications: rawOutcome.notifications || [],
    };
    await this.emitHookNotifications(outcome.notifications, signal, event === "Notification");
    return outcome;
  }

  private async emitHookNotifications(
    notifications: string[],
    signal: AbortSignal,
    skipNotificationHooks: boolean,
  ): Promise<void> {
    for (const notification of notifications) {
      if (!skipNotificationHooks && this.options.runHooks) {
        const outcome = await this.options.runHooks("Notification", { message: notification }, signal);
        for (const nestedNotification of outcome.notifications) {
          await this.emit({ type: "notification", text: nestedNotification });
        }
        if (outcome.blocked && outcome.message) {
          await this.emit({ type: "notification", text: outcome.message });
        }
      }
      await this.emit({ type: "notification", text: notification });
    }
  }
}

export function assertResolvedToolResults(messages: ApiMessage[]): void {
  const unresolved = new Set<string>();
  const seen = new Set<string>();

  for (const message of messages) {
    if (!Array.isArray(message.content)) continue;

    for (const block of message.content) {
      if (message.role === "assistant" && block.type === "tool_use") {
        if (seen.has(block.id)) {
          throw new Error(`Duplicate tool_use id: ${block.id}`);
        }
        seen.add(block.id);
        unresolved.add(block.id);
      }

      if (message.role === "user" && block.type === "tool_result") {
        if (!seen.has(block.tool_use_id)) {
          throw new Error(`tool_result without matching tool_use: ${block.tool_use_id}`);
        }
        unresolved.delete(block.tool_use_id);
      }
    }
  }

  if (unresolved.size > 0) {
    throw new Error(`Unresolved tool_use ids: ${[...unresolved].join(", ")}`);
  }
}

function assertUniqueToolUseIds(content: AssistantContentBlock[]): void {
  const seen = new Set<string>();
  for (const block of content) {
    if (block.type !== "tool_use") continue;
    if (seen.has(block.id)) {
      throw new Error(`Duplicate tool_use id in assistant response: ${block.id}`);
    }
    seen.add(block.id);
  }
}

function cloneMessages(messages: ApiMessage[]): ApiMessage[] {
  return JSON.parse(JSON.stringify(messages));
}

function sanitizeApiMessage(message: ApiMessage): ApiMessage {
  if (message.role !== "assistant" || !Array.isArray(message.content)) return message;
  return {
    ...message,
    content: message.content
      .map(block => block.type === "text" ? { ...block, text: sanitizeAssistantText(block.text) } : block)
      .filter(block => block.type !== "text" || block.text.length > 0),
  };
}

const DEFAULT_API_HISTORY_TOKEN_BUDGET = 60_000;

export function prepareApiMessagesForRequest(
  messages: ApiMessage[],
  tokenBudget = DEFAULT_API_HISTORY_TOKEN_BUDGET,
): ApiMessage[] {
  const prepared = cloneMessages(messages).map(sanitizeApiMessage);
  const maxBytes = Math.max(1_000, Math.floor(tokenBudget) * BYTES_PER_TOKEN);
  let currentBytes = estimateApiMessagesBytes(prepared);
  if (currentBytes <= maxBytes) return prepared;

  const toolNames = collectToolUseNames(prepared);
  const candidates = collectToolResultBlocks(prepared);
  for (const candidate of candidates) {
    if (currentBytes <= maxBytes) break;
    const originalContent = candidate.block.content;
    if (isCompactedHistoryToolResult(originalContent)) continue;
    const replacement = compactHistoryToolResult(
      originalContent,
      candidate.block.tool_use_id,
      toolNames.get(candidate.block.tool_use_id) || "Tool",
      tokenBudget,
    );
    candidate.block.content = replacement;
    currentBytes += Buffer.byteLength(replacement, "utf8") - Buffer.byteLength(originalContent, "utf8");
  }

  return prepared;
}

function collectToolUseNames(messages: ApiMessage[]): Map<string, string> {
  const names = new Map<string, string>();
  for (const message of messages) {
    if (!Array.isArray(message.content)) continue;
    for (const block of message.content) {
      if (block.type === "tool_use") {
        names.set(block.id, block.name);
      }
    }
  }
  return names;
}

function collectToolResultBlocks(messages: ApiMessage[]): Array<{
  block: Extract<NonNullable<Extract<ApiMessage["content"], unknown[]>[number]>, { type: "tool_result" }>;
}> {
  const blocks: Array<{
    block: Extract<NonNullable<Extract<ApiMessage["content"], unknown[]>[number]>, { type: "tool_result" }>;
  }> = [];
  for (const message of messages) {
    if (message.role !== "user" || !Array.isArray(message.content)) continue;
    for (const block of message.content) {
      if (block.type === "tool_result") {
        blocks.push({ block });
      }
    }
  }
  return blocks;
}

function compactHistoryToolResult(
  content: string,
  toolUseId: string,
  toolName: string,
  tokenBudget: number,
): string {
  const size = Buffer.byteLength(content, "utf8");
  const estimatedTokens = Math.ceil(size / BYTES_PER_TOKEN);
  const outputFile = writeCompactedHistoryToolResult(content, toolUseId);
  return [
    "<system-reminder>",
    `${toolName} tool result for ${toolUseId} was moved out of this API request because accumulated conversation context exceeded the ${tokenBudget}-token history budget.`,
    `Original result: ${estimatedTokens} estimated tokens.`,
    `Saved content: ${outputFile}`,
    "Use a narrower Read/Grep/Glob/BashOutput/TaskOutput request if that older result is needed again.",
    "</system-reminder>",
  ].join("\n");
}

function writeCompactedHistoryToolResult(content: string, toolUseId: string): string {
  const digest = createHash("sha256").update(content).digest("hex").slice(0, 16);
  const outputFile = join(tmpdir(), `claude-code-history-tool-result-${sanitizeToolResultId(toolUseId)}-${digest}.txt`);
  if (!existsSync(outputFile)) {
    writeFileSync(outputFile, content, "utf8");
  }
  return outputFile;
}

function isCompactedHistoryToolResult(content: string): boolean {
  return content.includes("was moved out of this API request because accumulated conversation context exceeded");
}

function estimateApiMessagesBytes(messages: ApiMessage[]): number {
  return Buffer.byteLength(JSON.stringify(messages), "utf8");
}

function getSpinnerModeForContentBlock(blockType: string): SpinnerMode {
  switch (blockType) {
    case "thinking":
    case "redacted_thinking":
      return "thinking";
    case "text":
      return "responding";
    case "tool_use":
    case "server_tool_use":
    case "web_search_tool_result":
    case "code_execution_tool_result":
    case "mcp_tool_use":
    case "mcp_tool_result":
    case "container_upload":
    case "web_fetch_tool_result":
    case "bash_code_execution_tool_result":
    case "text_editor_code_execution_tool_result":
    case "tool_search_tool_result":
    case "compaction":
      return "tool-input";
    default:
      return "responding";
  }
}

function partitionToolUses(toolUses: ToolUseContentBlock[]): Array<{ concurrent: boolean; toolUses: ToolUseContentBlock[] }> {
  return toolUses.reduce<Array<{ concurrent: boolean; toolUses: ToolUseContentBlock[] }>>((batches, toolUse) => {
    const concurrent = isConcurrencySafeTool(toolUse.name);
    const last = batches.at(-1);
    if (concurrent && last?.concurrent) {
      last.toolUses.push(toolUse);
    } else {
      batches.push({ concurrent, toolUses: [toolUse] });
    }
    return batches;
  }, []);
}

function isConcurrencySafeTool(name: string): boolean {
  return new Set(["Read", "LS", "Glob", "Grep", "WebFetch", "WebSearch", "BashOutput"]).has(name);
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function appendHookMessage(content: string, message: string): string {
  return [content, `<hook_error>${message}</hook_error>`].filter(Boolean).join("\n\n");
}

function appendHookContext(content: string, contexts: string[]): string {
  const context = contexts.map(item => `<hook_context>${item}</hook_context>`).join("\n\n");
  return [content, context].filter(Boolean).join("\n\n");
}

const TOOL_RESULT_WIRE_TOKEN_LIMIT = 5_000;
const BYTES_PER_TOKEN = 4;
const TOOL_RESULT_WIRE_MAX_BYTES = TOOL_RESULT_WIRE_TOKEN_LIMIT * BYTES_PER_TOKEN;
const TOOL_RESULT_PREVIEW_RESERVED_BYTES = 900;

function boundToolResultContent(content: string, toolName: string, toolUseId: string): string {
  const size = Buffer.byteLength(content, "utf8");
  if (size <= TOOL_RESULT_WIRE_MAX_BYTES) return content;

  const outputFile = join(tmpdir(), `claude-code-tool-result-${sanitizeToolResultId(toolUseId)}.txt`);
  writeFileSync(outputFile, content, "utf8");

  const previewBudget = Math.max(1_000, TOOL_RESULT_WIRE_MAX_BYTES - TOOL_RESULT_PREVIEW_RESERVED_BYTES);
  const preview = generatePreview(content, previewBudget);
  const estimatedTokens = Math.ceil(size / BYTES_PER_TOKEN);
  const previewTokens = Math.ceil(Buffer.byteLength(preview, "utf8") / BYTES_PER_TOKEN);

  return [
    preview,
    "",
    "<system-reminder>",
    `${toolName} tool result was ${estimatedTokens} estimated tokens and exceeded the ${TOOL_RESULT_WIRE_TOKEN_LIMIT}-token tool-result budget. The visible preview above is ${previewTokens} estimated tokens.`,
    `Full output saved to: ${outputFile}`,
    "Use offset/limit or a narrower command to inspect more of the saved output if needed.",
    "</system-reminder>",
  ].join("\n");
}

function generatePreview(content: string, maxBytes: number): string {
  const buffer = Buffer.from(content, "utf8");
  if (buffer.byteLength <= maxBytes) return content;
  const decoded = new TextDecoder("utf-8", { fatal: false }).decode(buffer.subarray(0, maxBytes));
  const lastNewline = decoded.lastIndexOf("\n");
  const cutPoint = lastNewline > decoded.length / 2 ? lastNewline : decoded.length;
  return decoded.slice(0, cutPoint).replace(/\uFFFD$/u, "");
}

function sanitizeToolResultId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/gu, "_").slice(0, 80) || "result";
}

type TextStreamState = {
  rawText: string;
  visibleText: string;
  suppressed: boolean;
};

function createTextStreamState(): TextStreamState {
  return { rawText: "", visibleText: "", suppressed: false };
}

function throwIfAborted(signal: AbortSignal): void {
  if (!signal.aborted) return;
  const reason = signal.reason;
  if (reason instanceof Error) throw reason;
  throw new Error(reason ? String(reason) : "Interrupted");
}
