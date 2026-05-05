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

export type ToolExecutionResult = {
  content: string;
  isError?: boolean;
  display?: ToolDisplay;
};

export type ToolDisplay =
  | {
      type: "bash";
      stdout: string;
      stderr: string;
      exitCode: number | null;
      cwd: string;
      cwdResetWarning?: string;
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
  | { type: "text"; summary?: string };

export type PermissionDecision = {
  behavior: "allow" | "deny" | "ask";
  updatedInput?: Record<string, unknown>;
  message?: string;
};

export type TenguLoopEvent =
  | { type: "api_request"; turn: number; messages: ApiMessage[]; tools: ToolDef[] }
  | { type: "assistant_start"; assistantId: string; turn: number }
  | { type: "assistant_text_delta"; assistantId: string; text: string; fullText: string }
  | {
      type: "assistant_complete";
      assistantId: string;
      content: AssistantContentBlock[];
      text: string;
      stopReason: string | null;
      usage?: Usage;
    }
  | { type: "tool_start"; assistantId: string; tool: ToolUseContentBlock }
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
  ) => Promise<ToolExecutionResult>;
  checkPermission?: (tool: ToolUseContentBlock) => Promise<PermissionDecision>;
  requestPermission?: (tool: ToolUseContentBlock) => Promise<PermissionDecision>;
  runHooks?: HookRunner;
  onEvent?: (event: TenguLoopEvent) => void | Promise<void>;
  maxTurns?: number;
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
    this.messages.push(...cloneMessages(messages));
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
        await this.emit({ type: "api_request", turn, messages: this.history, tools: this.options.tools });
        await this.emit({ type: "assistant_start", assistantId, turn });

        const assistantTurn = await this.collectAssistantTurn(assistantId, abortController.signal);
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

  private async collectAssistantTurn(assistantId: string, signal: AbortSignal): Promise<AssistantTurn> {
    const blocksByIndex = new Map<number, AssistantContentBlock>();
    let stopReason: string | null = null;
    let usage: Usage | undefined;
    let fullText = "";

    for await (const event of this.options.stream(this.history, this.options.tools, signal)) {
      throwIfAborted(signal);
      switch (event.type) {
        case "text_delta": {
          const existing = blocksByIndex.get(event.index);
          if (existing && existing.type !== "text") {
            throw new Error(`Text delta collided with ${existing.type} block at index ${event.index}`);
          }
          const block: TextContentBlock = existing || { type: "text", text: "" };
          block.text += event.text;
          blocksByIndex.set(event.index, block);
          fullText += event.text;
          await this.emit({
            type: "assistant_text_delta",
            assistantId,
            text: event.text,
            fullText,
          });
          break;
        }

        case "tool_use": {
          if (blocksByIndex.has(event.index)) {
            throw new Error(`Duplicate content block at index ${event.index}`);
          }
          blocksByIndex.set(event.index, event.tool);
          break;
        }

        case "message_delta":
          if (event.stop_reason !== undefined) {
            stopReason = event.stop_reason;
          }
          if (event.usage) {
            usage = { ...usage, ...event.usage };
          }
          break;

        case "message_stop":
          break;

        case "error":
          throw new Error(event.error);
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
    const results: ToolResultContentBlock[] = [];

    for (const toolUse of toolUses) {
      throwIfAborted(signal);
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
        results.push(result);
        await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
        continue;
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
        results.push(result);
        await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
        continue;
      }

      const input = decision.updatedInput ?? finalToolUse.input;
      finalToolUse = input === finalToolUse.input ? finalToolUse : { ...finalToolUse, input };

      try {
        const executed = await this.options.executeTool(finalToolUse.name, finalToolUse.input, signal);
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
        const result = {
          type: "tool_result" as const,
          tool_use_id: finalToolUse.id,
          content: postHook.blocked
            ? appendHookMessage(contentWithHookContext, postHook.message || "PostToolUse hook blocked continuation")
            : contentWithHookContext,
          is_error: executed.isError || postHook.blocked || undefined,
        };
        results.push(result);
        await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result, display: executed.display });
      } catch (error) {
        if (signal.aborted) throw error;
        const result = {
          type: "tool_result" as const,
          tool_use_id: finalToolUse.id,
          content: `<tool_use_error>${formatError(error)}</tool_use_error>`,
          is_error: true,
        };
        results.push(result);
        await this.emit({ type: "tool_result", assistantId, tool: finalToolUse, result });
      }
    }

    return results;
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

function throwIfAborted(signal: AbortSignal): void {
  if (!signal.aborted) return;
  const reason = signal.reason;
  if (reason instanceof Error) throw reason;
  throw new Error(reason ? String(reason) : "Interrupted");
}
