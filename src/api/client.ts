// Anthropic Messages API client with streaming support
import { readClaudeSettingString } from "../config/claude-settings.js";

export interface ApiConfig {
  baseUrl: string;
  token: string;
  model: string;
  provider: ApiProvider;
}

export type ApiProvider = "anthropic" | "deepseek-v4" | "gpt-5.5";

export type TextContentBlock = { type: "text"; text: string };
export type ImageSource = {
  type: "base64";
  media_type: string;
  data: string;
};
export type ImageContentBlock = {
  type: "image";
  source: ImageSource;
  id?: number;
  filename?: string;
  sourcePath?: string;
};
export type ToolUseContentBlock = {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
};
export type ToolResultContentBlock = {
  type: "tool_result";
  tool_use_id: string;
  content: string;
  is_error?: boolean;
};
export type UserContentBlock = TextContentBlock | ImageContentBlock | ToolResultContentBlock;
export type AssistantContentBlock = TextContentBlock | ToolUseContentBlock;
export type ApiMessageContent = string | Array<UserContentBlock | ToolUseContentBlock>;

export interface ContentBlock {
  type: "text" | "tool_use";
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
}

export type ApiMessage = {
  role: "user" | "assistant";
  content: ApiMessageContent;
};

export type Usage = {
  input_tokens?: number;
  output_tokens?: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  server_tool_use?: {
    web_search_requests?: number;
  };
};
export type ApiStreamEvent =
  | { type: "request_start" }
  | {
      type: "content_block_start";
      index: number;
      blockType: string;
      tool?: { id: string; name: string };
    }
  | { type: "tool_input_delta"; index: number; partialJson: string }
  | { type: "thinking_delta"; index: number; thinking: string }
  | { type: "text_delta"; index: number; text: string }
  | { type: "tool_use"; index: number; tool: ToolUseContentBlock }
  | { type: "message_delta"; stop_reason?: string | null; usage?: Usage }
  | { type: "message_stop" }
  | { type: "api_retry"; error: string; retryInMs: number; retryAttempt: number; maxRetries: number }
  | { type: "error"; error: string };

export interface ApiResponse {
  content: ContentBlock[];
  usage?: Usage;
  stop_reason?: string;
}

export type DeepSeekV4ChatContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };
export type DeepSeekV4ChatMessage =
  | { role: "system" | "user"; content: string | DeepSeekV4ChatContentPart[] }
  | {
      role: "assistant";
      content: string;
      tool_calls?: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    }
  | { role: "tool"; tool_call_id: string; content: string };
export type Gpt55ResponsesContent =
  | { type: "input_text"; text: string }
  | { type: "input_image"; image_url: string; detail: "auto" }
  | { type: "output_text"; text: string };
export type Gpt55ResponsesInputItem =
  | { type: "message"; role: "system" | "user" | "assistant"; content: Gpt55ResponsesContent[] }
  | { type: "function_call_output"; call_id: string; output: string };

export function getApiConfig(modelOverride?: string): ApiConfig | null {
  const model = modelOverride || getConfiguredModel();
  const provider = getConfiguredProvider(model);
  const baseUrl = getProviderBaseUrl(provider);
  const token = getProviderToken(provider);
  return token ? { baseUrl, token, model, provider } : null;
}

export function getConfiguredModel(): string {
  return process.env.ANTHROPIC_MODEL || readClaudeSettingString("model") || "claude-sonnet-4-6";
}

export function getConfiguredSubagentModel(parentModel: string): string {
  const configured = process.env.CLAUDE_CODE_SUBAGENT_MODEL?.trim();
  return configured || parentModel;
}

export function getConfiguredProvider(model: string = getConfiguredModel()): ApiProvider {
  const explicit = process.env.CLAUDE_CODE_API_PROVIDER?.trim().toLowerCase();
  if (explicit === "anthropic" || explicit === "deepseek-v4" || explicit === "gpt-5.5") return explicit;
  if (explicit === "deepseek") return "deepseek-v4";
  if (explicit === "openai" || explicit === "gpt") return "gpt-5.5";

  const normalizedModel = model.toLowerCase();
  if (normalizedModel.includes("deepseek")) return "deepseek-v4";
  if (normalizedModel.includes("gpt-5.5") || normalizedModel.startsWith("gpt-")) return "gpt-5.5";
  return "anthropic";
}

function getProviderBaseUrl(provider: ApiProvider): string {
  switch (provider) {
    case "deepseek-v4":
      return process.env.DEEPSEEK_BASE_URL
        || process.env.OPENAI_BASE_URL
        || process.env.ANTHROPIC_BASE_URL
        || "https://api.deepseek.com";
    case "gpt-5.5":
      return process.env.OPENAI_BASE_URL
        || process.env.ANTHROPIC_BASE_URL
        || "https://api.openai.com";
    case "anthropic":
      return process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";
  }
}

function getProviderToken(provider: ApiProvider): string {
  switch (provider) {
    case "deepseek-v4":
      return process.env.DEEPSEEK_API_KEY
        || process.env.OPENAI_API_KEY
        || process.env.ANTHROPIC_AUTH_TOKEN
        || process.env.ANTHROPIC_API_KEY
        || "";
    case "gpt-5.5":
      return process.env.OPENAI_API_KEY
        || process.env.ANTHROPIC_AUTH_TOKEN
        || process.env.ANTHROPIC_API_KEY
        || "";
    case "anthropic":
      return process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY || "";
  }
}

export function imageBlockToDataUrl(block: ImageContentBlock): string {
  const mediaType = block.source.media_type || "image/png";
  return `data:${mediaType};base64,${block.source.data}`;
}

export function toDeepSeekV4ChatMessages(messages: ApiMessage[], system?: string): DeepSeekV4ChatMessage[] {
  const output: DeepSeekV4ChatMessage[] = [];
  if (system?.trim()) {
    output.push({ role: "system", content: system.trim() });
  }

  for (const message of messages) {
    if (typeof message.content === "string") {
      output.push({ role: message.role, content: message.content });
      continue;
    }

    const toolResults = message.content.filter((block): block is ToolResultContentBlock => block.type === "tool_result");
    if (message.role === "user" && toolResults.length === message.content.length) {
      for (const result of toolResults) {
        output.push({
          role: "tool",
          tool_call_id: result.tool_use_id,
          content: result.content,
        });
      }
      continue;
    }

    if (message.role === "user") {
      const content = message.content
        .filter((block): block is TextContentBlock | ImageContentBlock => block.type === "text" || block.type === "image")
        .map(block => block.type === "text"
          ? { type: "text" as const, text: block.text }
          : { type: "image_url" as const, image_url: { url: imageBlockToDataUrl(block) } })
        .filter(block => block.type !== "text" || block.text.length > 0);
      output.push({
        role: "user",
        content: content.length === 1 && content[0]?.type === "text" ? content[0].text : content,
      });
      continue;
    }

    const text = message.content
      .filter((block): block is TextContentBlock => block.type === "text")
      .map(block => block.text)
      .join("");
    const toolCalls = message.content
      .filter((block): block is ToolUseContentBlock => block.type === "tool_use")
      .map(block => ({
        id: block.id,
        type: "function" as const,
        function: {
          name: block.name,
          arguments: JSON.stringify(block.input || {}),
        },
      }));
    output.push({
      role: "assistant",
      content: text,
      ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
    });
  }

  return output;
}

export function toGpt55ResponsesInput(messages: ApiMessage[], system?: string): Gpt55ResponsesInputItem[] {
  const input: Gpt55ResponsesInputItem[] = [];
  if (system?.trim()) {
    input.push({
      type: "message",
      role: "system",
      content: [{ type: "input_text", text: system.trim() }],
    });
  }

  for (const message of messages) {
    if (typeof message.content === "string") {
      input.push({
        type: "message",
        role: message.role,
        content: [{ type: message.role === "assistant" ? "output_text" : "input_text", text: message.content }],
      });
      continue;
    }

    const toolResults = message.content.filter((block): block is ToolResultContentBlock => block.type === "tool_result");
    if (message.role === "user" && toolResults.length === message.content.length) {
      for (const result of toolResults) {
        input.push({
          type: "function_call_output",
          call_id: result.tool_use_id,
          output: result.content,
        });
      }
      continue;
    }

    const content = message.content.flatMap((block): Gpt55ResponsesContent[] => {
      if (block.type === "text") {
        if (!block.text) return [];
        return [{ type: message.role === "assistant" ? "output_text" : "input_text", text: block.text }];
      }
      if (block.type === "image") {
        return [{ type: "input_image", image_url: imageBlockToDataUrl(block), detail: "auto" }];
      }
      return [];
    });

    if (content.length > 0) {
      input.push({
        type: "message",
        role: message.role,
        content,
      });
    }
  }

  return input;
}

export async function sendMessage(
  messages: ApiMessage[],
  system?: string,
  tools?: ToolDef[],
  maxTokens = 4096,
  modelOverride?: string,
): Promise<ApiResponse> {
  const cfg = getApiConfig(modelOverride);
  if (!cfg) return { content: [{ type: "text", text: "Error: No API credentials configured." }] };

  if (cfg.provider === "deepseek-v4") {
    return sendOpenAIChatMessage(cfg, messages, system, tools, maxTokens);
  }
  if (cfg.provider === "gpt-5.5") {
    return sendGpt55ResponseMessage(cfg, messages, system, tools, maxTokens);
  }

  const body: Record<string, unknown> = {
    model: cfg.model,
    max_tokens: maxTokens,
    messages,
  };
  if (system) body.system = system;
  if (tools && tools.length > 0) body.tools = tools;

  const maxRetries = getMaxRetries();
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const res = await fetch(versionedEndpoint(cfg.baseUrl, "/messages"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": cfg.token,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
          await sleep(getRetryDelayMs(attempt, res.headers));
          continue;
        }
        return { content: [{ type: "text", text: formatApiStreamError(formatApiHttpError(res.status, text)) }] };
      }

      const data: any = await res.json();
      return {
        content: (data.content || []).map((b: any) =>
          b.type === "tool_use"
            ? { type: "tool_use", id: b.id, name: b.name, input: b.input }
            : { type: "text", text: b.text }
        ),
        usage: data.usage,
        stop_reason: data.stop_reason,
      };
    } catch (e: any) {
      if (attempt <= maxRetries && shouldRetryTransportError(e)) {
        await sleep(getRetryDelayMs(attempt));
        continue;
      }
      return { content: [{ type: "text", text: formatApiStreamError(formatTransportError(e)) }] };
    }
  }
  return { content: [{ type: "text", text: "API Error: Stream failed." }] };
}

// Streaming API call
export async function* streamMessage(
  messages: ApiMessage[],
  system?: string,
  tools?: ToolDef[],
  maxTokens = 4096,
  signal?: AbortSignal,
  modelOverride?: string,
): AsyncGenerator<ApiStreamEvent> {
  const cfg = getApiConfig(modelOverride);
  if (!cfg) { yield { type: "error", error: "No API credentials" }; return; }

  if (cfg.provider === "deepseek-v4") {
    yield* streamOpenAIChatMessage(cfg, messages, system, tools, maxTokens, signal);
    return;
  }
  if (cfg.provider === "gpt-5.5") {
    yield* streamGpt55ResponseMessage(cfg, messages, system, tools, maxTokens, signal);
    return;
  }

  const body: Record<string, unknown> = {
    model: cfg.model,
    max_tokens: maxTokens,
    messages,
    stream: true,
  };
  if (system) body.system = system;
  if (tools && tools.length > 0) body.tools = tools;

  const requestSignal = createRequestSignal(signal);
  const maxRetries = getMaxRetries();
  try {
    requestAttempts: for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      let emittedStreamContent = false;
      try {
        yield { type: "request_start" };
        const res = await fetch(versionedEndpoint(cfg.baseUrl, "/messages"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": cfg.token,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify(body),
          signal: requestSignal.signal,
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          const error = formatApiStreamError(formatApiHttpError(res.status, text));
          if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
            const retryInMs = getRetryDelayMs(attempt, res.headers);
            yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
            await sleep(retryInMs, requestSignal.signal);
            continue;
          }
          yield { type: "error", error };
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) { yield { type: "error", error: formatApiStreamError("No response body") }; return; }

        const decoder = new TextDecoder();
        let buffer = "";
        const currentTools = new Map<number, {
          id: string;
          name: string;
          inputJson: string;
        }>();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") return;

            const event = JSON.parse(data);
            const index = typeof event.index === "number" ? event.index : 0;

            switch (event.type) {
              case "content_block_start":
                emittedStreamContent = true;
                if (event.content_block?.type === "tool_use") {
                  currentTools.set(index, {
                    id: String(event.content_block.id),
                    name: String(event.content_block.name),
                    inputJson: "",
                  });
                }
                yield {
                  type: "content_block_start",
                  index,
                  blockType: String(event.content_block?.type || "unknown"),
                  ...(event.content_block?.type === "tool_use"
                    ? {
                        tool: {
                          id: String(event.content_block.id),
                          name: String(event.content_block.name),
                        },
                      }
                    : {}),
                };
                break;

              case "content_block_delta":
                emittedStreamContent = true;
                if (event.delta?.type === "text_delta") {
                  yield { type: "text_delta", index, text: String(event.delta.text || "") };
                } else if (event.delta?.type === "input_json_delta" && currentTools.has(index)) {
                  const currentTool = currentTools.get(index)!;
                  const partialJson = String(event.delta.partial_json || "");
                  currentTool.inputJson += partialJson;
                  yield { type: "tool_input_delta", index, partialJson };
                } else if (event.delta?.type === "thinking_delta") {
                  yield { type: "thinking_delta", index, thinking: String(event.delta.thinking || "") };
                }
                break;

              case "content_block_stop": {
                emittedStreamContent = true;
                const currentTool = currentTools.get(index);
                if (currentTool) {
                  yield {
                    type: "tool_use",
                    index,
                    tool: {
                      type: "tool_use",
                      id: currentTool.id,
                      name: currentTool.name,
                      input: JSON.parse(currentTool.inputJson || "{}"),
                    },
                  };
                  currentTools.delete(index);
                }
                break;
              }

              case "message_delta":
                emittedStreamContent = true;
                yield {
                  type: "message_delta",
                  stop_reason: event.delta?.stop_reason ?? undefined,
                  usage: event.usage,
                };
                break;

              case "message_stop":
                emittedStreamContent = true;
                yield { type: "message_stop" };
                break;

              case "error": {
                const error = formatApiStreamError(getStreamEventErrorMessage(event.error));
                if (!emittedStreamContent && attempt <= maxRetries && shouldRetryStreamEventError(event.error)) {
                  const retryInMs = getRetryDelayMs(attempt);
                  await reader.cancel().catch(() => undefined);
                  yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
                  await sleep(retryInMs, requestSignal.signal);
                  continue requestAttempts;
                }
                emittedStreamContent = true;
                yield { type: "error", error };
                return;
              }
            }
          }
        }
        return;
      } catch (e: any) {
        if (requestSignal.signal.aborted) {
          yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
          return;
        }
        const error = formatApiStreamError(formatTransportError(e));
        if (!emittedStreamContent && attempt <= maxRetries && shouldRetryTransportError(e)) {
          const retryInMs = getRetryDelayMs(attempt);
          yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
          await sleep(retryInMs, requestSignal.signal);
          continue;
        }
        yield { type: "error", error };
        return;
      }
    }
  } catch (e: any) {
    if (requestSignal.signal.aborted) {
      yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
      return;
    }
    yield { type: "error", error: formatApiStreamError(formatTransportError(e)) };
  } finally {
    requestSignal.cleanup();
  }
}

async function sendOpenAIChatMessage(
  cfg: ApiConfig,
  messages: ApiMessage[],
  system: string | undefined,
  tools: ToolDef[] | undefined,
  maxTokens: number,
): Promise<ApiResponse> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: toDeepSeekV4ChatMessages(messages, system),
    max_tokens: maxTokens,
  };
  const openAiTools = toOpenAIChatTools(tools);
  if (openAiTools.length > 0) body.tools = openAiTools;

  const maxRetries = getMaxRetries();
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const res = await fetch(versionedEndpoint(cfg.baseUrl, "/chat/completions"), {
        method: "POST",
        headers: openAIHeaders(cfg.token),
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
          await sleep(getRetryDelayMs(attempt, res.headers));
          continue;
        }
        return { content: [{ type: "text", text: formatApiStreamError(formatApiHttpError(res.status, text)) }] };
      }
      return parseOpenAIChatResponse(await res.json());
    } catch (error) {
      if (attempt <= maxRetries && shouldRetryTransportError(error)) {
        await sleep(getRetryDelayMs(attempt));
        continue;
      }
      return { content: [{ type: "text", text: formatApiStreamError(formatTransportError(error)) }] };
    }
  }
  return { content: [{ type: "text", text: "API Error: Stream failed." }] };
}

async function sendGpt55ResponseMessage(
  cfg: ApiConfig,
  messages: ApiMessage[],
  system: string | undefined,
  tools: ToolDef[] | undefined,
  maxTokens: number,
): Promise<ApiResponse> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    input: toGpt55ResponsesInput(messages, system),
    max_output_tokens: maxTokens,
  };
  const responseTools = toOpenAIResponsesTools(tools);
  if (responseTools.length > 0) body.tools = responseTools;

  const maxRetries = getMaxRetries();
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const res = await fetch(versionedEndpoint(cfg.baseUrl, "/responses"), {
        method: "POST",
        headers: openAIHeaders(cfg.token),
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
          await sleep(getRetryDelayMs(attempt, res.headers));
          continue;
        }
        return { content: [{ type: "text", text: formatApiStreamError(formatApiHttpError(res.status, text)) }] };
      }
      return parseGpt55Response(await res.json());
    } catch (error) {
      if (attempt <= maxRetries && shouldRetryTransportError(error)) {
        await sleep(getRetryDelayMs(attempt));
        continue;
      }
      return { content: [{ type: "text", text: formatApiStreamError(formatTransportError(error)) }] };
    }
  }
  return { content: [{ type: "text", text: "API Error: Stream failed." }] };
}

async function* streamOpenAIChatMessage(
  cfg: ApiConfig,
  messages: ApiMessage[],
  system: string | undefined,
  tools: ToolDef[] | undefined,
  maxTokens: number,
  signal: AbortSignal | undefined,
): AsyncGenerator<ApiStreamEvent> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    messages: toDeepSeekV4ChatMessages(messages, system),
    max_tokens: maxTokens,
    stream: true,
  };
  const openAiTools = toOpenAIChatTools(tools);
  if (openAiTools.length > 0) body.tools = openAiTools;

  const requestSignal = createRequestSignal(signal);
  const maxRetries = getMaxRetries();
  try {
    requestAttempts: for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      let emittedStreamContent = false;
      try {
        yield { type: "request_start" };
        const res = await fetch(versionedEndpoint(cfg.baseUrl, "/chat/completions"), {
          method: "POST",
          headers: openAIHeaders(cfg.token),
          body: JSON.stringify(body),
          signal: requestSignal.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          const error = formatApiStreamError(formatApiHttpError(res.status, text));
          if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
            const retryInMs = getRetryDelayMs(attempt, res.headers);
            yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
            await sleep(retryInMs, requestSignal.signal);
            continue;
          }
          yield { type: "error", error };
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) { yield { type: "error", error: formatApiStreamError("No response body") }; return; }
        const decoder = new TextDecoder();
        let buffer = "";
        const currentTools = new Map<number, { id: string; name: string; inputJson: string }>();
        let stopReason: string | null = null;
        let usage: Usage | undefined;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            const event = JSON.parse(data);

            if (event.error || event.type === "error") {
              const streamError = event.error || event;
              const error = formatApiStreamError(getStreamEventErrorMessage(streamError));
              if (!emittedStreamContent && attempt <= maxRetries && shouldRetryStreamEventError(streamError)) {
                const retryInMs = getRetryDelayMs(attempt);
                await reader.cancel().catch(() => undefined);
                yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
                await sleep(retryInMs, requestSignal.signal);
                continue requestAttempts;
              }
              yield { type: "error", error };
              return;
            }

            usage = mapOpenAIUsage(event.usage) || usage;
            const choice = event.choices?.[0];
            if (!choice) continue;
            stopReason = mapOpenAIStopReason(choice.finish_reason) || stopReason;
            const delta = choice.delta || {};
            if (typeof delta.content === "string" && delta.content.length > 0) {
              emittedStreamContent = true;
              yield { type: "text_delta", index: 0, text: delta.content };
            }
            const toolCalls = Array.isArray(delta.tool_calls) ? delta.tool_calls : [];
            for (const toolCall of toolCalls) {
              emittedStreamContent = true;
              const toolCallIndex = typeof toolCall.index === "number" ? toolCall.index : 0;
              const contentIndex = toolCallIndex + 1;
              const existing = currentTools.get(contentIndex);
              const id = String(toolCall.id || existing?.id || `toolu_openai_${toolCallIndex}`);
              const name = String(toolCall.function?.name || existing?.name || "");
              if (!existing) {
                currentTools.set(contentIndex, { id, name, inputJson: "" });
                yield {
                  type: "content_block_start",
                  index: contentIndex,
                  blockType: "tool_use",
                  tool: { id, name },
                };
              } else if (name && !existing.name) {
                existing.name = name;
              }
              const partialJson = String(toolCall.function?.arguments || "");
              if (partialJson) {
                currentTools.get(contentIndex)!.inputJson += partialJson;
                yield { type: "tool_input_delta", index: contentIndex, partialJson };
              }
            }
          }
        }

        for (const [index, tool] of [...currentTools.entries()].sort(([a], [b]) => a - b)) {
          yield {
            type: "tool_use",
            index,
            tool: {
              type: "tool_use",
              id: tool.id,
              name: tool.name,
              input: parseJsonObject(tool.inputJson),
            },
          };
        }
        yield { type: "message_delta", stop_reason: stopReason, usage };
        yield { type: "message_stop" };
        return;
      } catch (error) {
        if (requestSignal.signal.aborted) {
          yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
          return;
        }
        const formatted = formatApiStreamError(formatTransportError(error));
        if (!emittedStreamContent && attempt <= maxRetries && shouldRetryTransportError(error)) {
          const retryInMs = getRetryDelayMs(attempt);
          yield { type: "api_retry", error: formatted, retryInMs, retryAttempt: attempt, maxRetries };
          await sleep(retryInMs, requestSignal.signal);
          continue;
        }
        yield { type: "error", error: formatted };
        return;
      }
    }
  } catch (error) {
    if (requestSignal.signal.aborted) {
      yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
      return;
    }
    yield { type: "error", error: formatApiStreamError(formatTransportError(error)) };
  } finally {
    requestSignal.cleanup();
  }
}

async function* streamGpt55ResponseMessage(
  cfg: ApiConfig,
  messages: ApiMessage[],
  system: string | undefined,
  tools: ToolDef[] | undefined,
  maxTokens: number,
  signal: AbortSignal | undefined,
): AsyncGenerator<ApiStreamEvent> {
  const body: Record<string, unknown> = {
    model: cfg.model,
    input: toGpt55ResponsesInput(messages, system),
    max_output_tokens: maxTokens,
    stream: true,
  };
  const responseTools = toOpenAIResponsesTools(tools);
  if (responseTools.length > 0) body.tools = responseTools;

  const requestSignal = createRequestSignal(signal);
  const maxRetries = getMaxRetries();
  try {
    requestAttempts: for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      let emittedStreamContent = false;
      try {
        yield { type: "request_start" };
        const res = await fetch(versionedEndpoint(cfg.baseUrl, "/responses"), {
          method: "POST",
          headers: openAIHeaders(cfg.token),
          body: JSON.stringify(body),
          signal: requestSignal.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          const error = formatApiStreamError(formatApiHttpError(res.status, text));
          if (attempt <= maxRetries && shouldRetryHttpError(res.status, res.headers, text)) {
            const retryInMs = getRetryDelayMs(attempt, res.headers);
            yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
            await sleep(retryInMs, requestSignal.signal);
            continue;
          }
          yield { type: "error", error };
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) { yield { type: "error", error: formatApiStreamError("No response body") }; return; }
        const decoder = new TextDecoder();
        let buffer = "";
        const currentTools = new Map<string, { index: number; id: string; name: string; inputJson: string; emitted: boolean }>();
        let nextToolIndex = 1;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            const event = JSON.parse(data);

            if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
              emittedStreamContent = true;
              yield { type: "text_delta", index: 0, text: event.delta };
              continue;
            }

            if (event.type === "response.output_item.added" && event.item?.type === "function_call") {
              emittedStreamContent = true;
              const key = String(event.item.call_id || event.item.id || event.output_index || nextToolIndex);
              const tool = ensureResponsesTool(currentTools, key, event.item, nextToolIndex++);
              if (!tool.emitted) {
                tool.emitted = true;
                yield {
                  type: "content_block_start",
                  index: tool.index,
                  blockType: "tool_use",
                  tool: { id: tool.id, name: tool.name },
                };
              }
              continue;
            }

            if (event.type === "response.function_call_arguments.delta" && typeof event.delta === "string") {
              emittedStreamContent = true;
              const key = String(event.call_id || event.item_id || event.output_index || nextToolIndex);
              const tool = ensureResponsesTool(currentTools, key, event, nextToolIndex++);
              if (!tool.emitted) {
                tool.emitted = true;
                yield {
                  type: "content_block_start",
                  index: tool.index,
                  blockType: "tool_use",
                  tool: { id: tool.id, name: tool.name },
                };
              }
              tool.inputJson += event.delta;
              yield { type: "tool_input_delta", index: tool.index, partialJson: event.delta };
              continue;
            }

            if (event.type === "response.output_item.done" && event.item?.type === "function_call") {
              emittedStreamContent = true;
              const key = String(event.item.call_id || event.item.id || event.output_index || nextToolIndex);
              const tool = ensureResponsesTool(currentTools, key, event.item, nextToolIndex++);
              if (typeof event.item.arguments === "string" && !tool.inputJson) tool.inputJson = event.item.arguments;
              yield {
                type: "tool_use",
                index: tool.index,
                tool: {
                  type: "tool_use",
                  id: tool.id,
                  name: tool.name,
                  input: parseJsonObject(tool.inputJson),
                },
              };
              currentTools.delete(key);
              continue;
            }

            if (event.type === "response.completed") {
              yield { type: "message_delta", stop_reason: "end_turn", usage: mapResponsesUsage(event.response?.usage) };
              yield { type: "message_stop" };
              return;
            }

            if (event.type === "response.failed" || event.type === "error") {
              const error = formatApiStreamError(getResponsesErrorMessage(event));
              if (!emittedStreamContent && attempt <= maxRetries && shouldRetryStreamEventError(event.error || event.response?.error)) {
                const retryInMs = getRetryDelayMs(attempt);
                await reader.cancel().catch(() => undefined);
                yield { type: "api_retry", error, retryInMs, retryAttempt: attempt, maxRetries };
                await sleep(retryInMs, requestSignal.signal);
                continue requestAttempts;
              }
              yield { type: "error", error };
              return;
            }
          }
        }
        yield { type: "message_stop" };
        return;
      } catch (error) {
        if (requestSignal.signal.aborted) {
          yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
          return;
        }
        const formatted = formatApiStreamError(formatTransportError(error));
        if (!emittedStreamContent && attempt <= maxRetries && shouldRetryTransportError(error)) {
          const retryInMs = getRetryDelayMs(attempt);
          yield { type: "api_retry", error: formatted, retryInMs, retryAttempt: attempt, maxRetries };
          await sleep(retryInMs, requestSignal.signal);
          continue;
        }
        yield { type: "error", error: formatted };
        return;
      }
    }
  } catch (error) {
    if (requestSignal.signal.aborted) {
      yield { type: "error", error: formatAbortReason(requestSignal.signal.reason) };
      return;
    }
    yield { type: "error", error: formatApiStreamError(formatTransportError(error)) };
  } finally {
    requestSignal.cleanup();
  }
}

function formatApiStreamError(message: string): string {
  const normalized = message.trim();
  if (!normalized) return "API Error: Stream failed.";
  if (/^API Error\b/iu.test(normalized)) return normalized;
  if (normalized === "terminated") return "API Error: Stream terminated unexpectedly.";
  return `API Error: ${normalized}`;
}

function versionedEndpoint(baseUrl: string, path: string): string {
  const trimmed = baseUrl.replace(/\/+$/u, "");
  return trimmed.endsWith("/v1") ? `${trimmed}${path}` : `${trimmed}/v1${path}`;
}

function openAIHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function toOpenAIChatTools(tools?: ToolDef[]): Array<Record<string, unknown>> {
  return (tools || []).map(tool => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.input_schema,
    },
  }));
}

function toOpenAIResponsesTools(tools?: ToolDef[]): Array<Record<string, unknown>> {
  return (tools || []).map(tool => ({
    type: "function",
    name: tool.name,
    description: tool.description,
    parameters: tool.input_schema,
  }));
}

function parseOpenAIChatResponse(data: any): ApiResponse {
  const choice = data?.choices?.[0] || {};
  const message = choice.message || {};
  const content: ContentBlock[] = [];
  const text = typeof message.content === "string" ? message.content : "";
  if (text) content.push({ type: "text", text });
  for (const toolCall of Array.isArray(message.tool_calls) ? message.tool_calls : []) {
    content.push({
      type: "tool_use",
      id: String(toolCall.id || `toolu_openai_${content.length}`),
      name: String(toolCall.function?.name || ""),
      input: parseJsonObject(String(toolCall.function?.arguments || "{}")),
    });
  }
  return {
    content,
    usage: mapOpenAIUsage(data?.usage),
    stop_reason: mapOpenAIStopReason(choice.finish_reason) || undefined,
  };
}

function parseGpt55Response(data: any): ApiResponse {
  const content: ContentBlock[] = [];
  for (const item of Array.isArray(data?.output) ? data.output : []) {
    if (item?.type === "message") {
      for (const part of Array.isArray(item.content) ? item.content : []) {
        const text = typeof part.text === "string" ? part.text : "";
        if (part.type === "output_text" && text) content.push({ type: "text", text });
      }
      continue;
    }
    if (item?.type === "function_call") {
      content.push({
        type: "tool_use",
        id: String(item.call_id || item.id || `toolu_gpt_${content.length}`),
        name: String(item.name || ""),
        input: parseJsonObject(String(item.arguments || "{}")),
      });
    }
  }
  return {
    content,
    usage: mapResponsesUsage(data?.usage),
    stop_reason: mapResponsesStopReason(data),
  };
}

function parseJsonObject(value: string): Record<string, unknown> {
  const trimmed = value.trim();
  if (!trimmed) return {};
  const parsed = JSON.parse(trimmed);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

function mapOpenAIUsage(usage: any): Usage | undefined {
  if (!usage) return undefined;
  return {
    input_tokens: usage.prompt_tokens,
    output_tokens: usage.completion_tokens,
  };
}

function mapResponsesUsage(usage: any): Usage | undefined {
  if (!usage) return undefined;
  return {
    input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
  };
}

function mapOpenAIStopReason(reason: unknown): string | null {
  switch (reason) {
    case "stop":
      return "end_turn";
    case "tool_calls":
    case "function_call":
      return "tool_use";
    case "length":
      return "max_tokens";
    case "content_filter":
      return "stop_sequence";
    default:
      return typeof reason === "string" ? reason : null;
  }
}

function mapResponsesStopReason(data: any): string | undefined {
  if (data?.status === "completed") return "end_turn";
  if (data?.status === "incomplete") return "max_tokens";
  return undefined;
}

function ensureResponsesTool(
  tools: Map<string, { index: number; id: string; name: string; inputJson: string; emitted: boolean }>,
  key: string,
  item: any,
  fallbackIndex: number,
): { index: number; id: string; name: string; inputJson: string; emitted: boolean } {
  const existing = tools.get(key);
  if (existing) {
    if (item?.name && !existing.name) existing.name = String(item.name);
    if ((item?.call_id || item?.id) && existing.id === key) existing.id = String(item.call_id || item.id);
    return existing;
  }
  const tool = {
    index: typeof item?.output_index === "number" ? item.output_index + 1 : fallbackIndex,
    id: String(item?.call_id || item?.id || key),
    name: String(item?.name || ""),
    inputJson: "",
    emitted: false,
  };
  tools.set(key, tool);
  return tool;
}

function getResponsesErrorMessage(event: any): string {
  const error = event?.error || event?.response?.error;
  return getStreamEventErrorMessage(error);
}

const SSL_ERROR_CODES = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "CERT_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CERT_REVOKED",
  "CERT_REJECTED",
  "CERT_UNTRUSTED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "CERT_CHAIN_TOO_LONG",
  "PATH_LENGTH_EXCEEDED",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "HOSTNAME_MISMATCH",
  "ERR_TLS_HANDSHAKE_TIMEOUT",
  "ERR_SSL_WRONG_VERSION_NUMBER",
  "ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC",
]);

function formatTransportError(error: unknown): string {
  const details = extractConnectionErrorDetails(error);
  const message = extractErrorMessage(error);

  if (details?.code === "ETIMEDOUT") {
    return "Request timed out. Check your internet connection and proxy settings";
  }

  if (details?.isSSLError) {
    switch (details.code) {
      case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
      case "UNABLE_TO_GET_ISSUER_CERT":
      case "UNABLE_TO_GET_ISSUER_CERT_LOCALLY":
        return "Unable to connect to API: SSL certificate verification failed. Check your proxy or corporate SSL certificates";
      case "CERT_HAS_EXPIRED":
        return "Unable to connect to API: SSL certificate has expired";
      case "CERT_REVOKED":
        return "Unable to connect to API: SSL certificate has been revoked";
      case "DEPTH_ZERO_SELF_SIGNED_CERT":
      case "SELF_SIGNED_CERT_IN_CHAIN":
        return "Unable to connect to API: Self-signed certificate detected. Check your proxy or corporate SSL certificates";
      case "ERR_TLS_CERT_ALTNAME_INVALID":
      case "HOSTNAME_MISMATCH":
        return "Unable to connect to API: SSL certificate hostname mismatch";
      case "CERT_NOT_YET_VALID":
        return "Unable to connect to API: SSL certificate is not yet valid";
      default:
        return `Unable to connect to API: SSL error (${details.code})`;
    }
  }

  if (/^(fetch failed|Connection error\.)$/iu.test(message)) {
    return details?.code
      ? `Unable to connect to API (${details.code})`
      : "Unable to connect to API. Check your internet connection";
  }

  return message;
}

function extractConnectionErrorDetails(error: unknown): { code: string; message: string; isSSLError: boolean } | null {
  let current = error;
  for (let depth = 0; current && depth < 5; depth++) {
    if (typeof current !== "object") break;
    const candidate = current as { code?: unknown; message?: unknown; cause?: unknown };
    if (typeof candidate.code === "string") {
      return {
        code: candidate.code,
        message: typeof candidate.message === "string" ? candidate.message : candidate.code,
        isSSLError: SSL_ERROR_CODES.has(candidate.code),
      };
    }
    if (!("cause" in candidate) || candidate.cause === current) break;
    current = candidate.cause;
  }
  return null;
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  if (typeof error === "string" && error.trim()) return error.trim();
  return String(error);
}

function formatApiHttpError(status: number, body: string): string {
  const message = extractApiErrorMessage(body);
  return message || `HTTP ${status}`;
}

function extractApiErrorMessage(body: string): string {
  const text = body.trim();
  if (!text) return "";
  try {
    const parsed = JSON.parse(text);
    const error = parsed?.error;
    if (typeof error?.message === "string" && error.message.trim()) return error.message.trim();
    if (typeof error === "string" && error.trim()) return error.trim();
    if (typeof parsed?.message === "string" && parsed.message.trim()) return parsed.message.trim();
  } catch {
    // Plain-text proxy errors are already user-facing.
  }
  return text.slice(0, 300);
}

const DEFAULT_MAX_RETRIES = 10;
const BASE_RETRY_DELAY_MS = 500;

function getMaxRetries(): number {
  const configured = process.env.CLAUDE_CODE_MAX_RETRIES;
  if (!configured) return DEFAULT_MAX_RETRIES;
  const parsed = Number.parseInt(configured, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_MAX_RETRIES;
}

function shouldRetryHttpError(status: number, headers: Headers, body: string): boolean {
  const shouldRetry = headers.get("x-should-retry");
  if (shouldRetry === "true") return true;
  if (shouldRetry === "false" && !(process.env.USER_TYPE === "ant" && status >= 500)) return false;
  if (body.includes("\"type\":\"overloaded_error\"") || body.includes("overloaded_error")) return true;
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

function shouldRetryTransportError(error: unknown): boolean {
  const details = extractConnectionErrorDetails(error);
  if (details) return true;
  const message = extractErrorMessage(error);
  return /^(fetch failed|Connection error\.|terminated)$/iu.test(message);
}

function getStreamEventErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") return "API stream error";
  const candidate = error as { message?: unknown; type?: unknown; error?: unknown };
  if (typeof candidate.message === "string" && candidate.message.trim()) return candidate.message.trim();
  if (typeof candidate.error === "string" && candidate.error.trim()) return candidate.error.trim();
  if (typeof candidate.type === "string" && candidate.type.trim()) return candidate.type.trim();
  return "API stream error";
}

function shouldRetryStreamEventError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { type?: unknown; status?: unknown; status_code?: unknown; message?: unknown };
  const type = typeof candidate.type === "string" ? candidate.type : "";
  const status = typeof candidate.status === "number"
    ? candidate.status
    : typeof candidate.status_code === "number"
      ? candidate.status_code
      : undefined;
  if (type === "overloaded_error" || type === "api_error" || type === "rate_limit_error") return true;
  if (status === 408 || status === 409 || status === 429 || (status !== undefined && status >= 500)) return true;
  const message = typeof candidate.message === "string" ? candidate.message : "";
  return message.includes("\"type\":\"overloaded_error\"") || message.includes("overloaded_error");
}

type RetryDelaySource = string | null | { get(name: string): string | null };

function getRetryDelayMs(attempt: number, retryDelaySource?: RetryDelaySource): number {
  const retryAfterMs = getRetryAfterDelayMs(retryDelaySource);
  if (retryAfterMs !== null) return retryAfterMs;
  const baseDelay = Math.min(BASE_RETRY_DELAY_MS * 2 ** (attempt - 1), 32_000);
  const jitter = Math.random() * 0.25 * baseDelay;
  return baseDelay + jitter;
}

function getRetryAfterDelayMs(retryDelaySource: RetryDelaySource | undefined): number | null {
  if (!retryDelaySource) return null;
  if (typeof retryDelaySource !== "string") {
    const retryAfterMsHeader = retryDelaySource.get("retry-after-ms");
    if (retryAfterMsHeader) {
      const milliseconds = Number.parseFloat(retryAfterMsHeader);
      if (Number.isFinite(milliseconds)) return Math.max(0, milliseconds);
    }
    return getRetryAfterDelayMs(retryDelaySource.get("retry-after"));
  }

  const seconds = Number.parseFloat(retryDelaySource);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

  const dateMs = Date.parse(retryDelaySource);
  if (Number.isFinite(dateMs)) return Math.max(0, dateMs - Date.now());
  return null;
}

async function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) throw signal.reason ?? new Error("Interrupted");
  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const cleanup = (): void => {
      signal?.removeEventListener("abort", abort);
    };
    const finish = (): void => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };
    const abort = (): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      cleanup();
      reject(signal.reason ?? new Error("Interrupted"));
    };
    const timeout = setTimeout(finish, ms);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
  });
}

export interface ToolDef {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
}

function createRequestSignal(signal: AbortSignal | undefined): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();

  const abortFromParent = (): void => {
    controller.abort(signal?.reason ?? new Error("Interrupted"));
  };

  if (signal?.aborted) {
    abortFromParent();
  } else {
    signal?.addEventListener("abort", abortFromParent, { once: true });
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      signal?.removeEventListener("abort", abortFromParent);
    },
  };
}

function formatAbortReason(reason: unknown): string {
  if (reason instanceof Error && reason.message.trim()) return reason.message;
  if (typeof reason === "string" && reason.trim()) return reason;
  return "Interrupted";
}
