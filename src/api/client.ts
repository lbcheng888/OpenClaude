// Anthropic Messages API client with streaming support

export interface ApiConfig {
  baseUrl: string;
  token: string;
  model: string;
}

export interface ContentBlock {
  type: "text" | "tool_use";
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
}

export type ApiMessageContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> }
      | { type: "tool_result"; tool_use_id: string; content: string; is_error?: boolean }
    >;

export type ApiMessage = {
  role: "user" | "assistant";
  content: ApiMessageContent;
};

export type TextContentBlock = { type: "text"; text: string };
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
export type AssistantContentBlock = TextContentBlock | ToolUseContentBlock;
export type Usage = { input_tokens?: number; output_tokens?: number };
export type ApiStreamEvent =
  | { type: "text_delta"; index: number; text: string }
  | { type: "tool_use"; index: number; tool: ToolUseContentBlock }
  | { type: "message_delta"; stop_reason?: string | null; usage?: Usage }
  | { type: "message_stop" }
  | { type: "error"; error: string };

export interface ApiResponse {
  content: ContentBlock[];
  usage?: { input_tokens: number; output_tokens: number };
  stop_reason?: string;
}

export function getApiConfig(): ApiConfig | null {
  const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";
  const token = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY || "";
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  return token ? { baseUrl, token, model } : null;
}

export async function sendMessage(
  messages: ApiMessage[],
  system?: string,
  tools?: ToolDef[],
  maxTokens = 4096
): Promise<ApiResponse> {
  const cfg = getApiConfig();
  if (!cfg) return { content: [{ type: "text", text: "Error: No API credentials configured." }] };

  const body: Record<string, unknown> = {
    model: cfg.model,
    max_tokens: maxTokens,
    messages,
  };
  if (system) body.system = system;
  if (tools && tools.length > 0) body.tools = tools;

  try {
    const res = await fetch(`${cfg.baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cfg.token,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120000),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      return { content: [{ type: "text", text: `API Error ${res.status}: ${err.slice(0, 300)}` }] };
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
    return { content: [{ type: "text", text: `Error: ${e.message}` }] };
  }
}

// Streaming API call
export async function* streamMessage(
  messages: ApiMessage[],
  system?: string,
  tools?: ToolDef[],
  maxTokens = 4096,
  signal?: AbortSignal
): AsyncGenerator<ApiStreamEvent> {
  const cfg = getApiConfig();
  if (!cfg) { yield { type: "error", error: "No API credentials" }; return; }

  const body: Record<string, unknown> = {
    model: cfg.model,
    max_tokens: maxTokens,
    messages,
    stream: true,
  };
  if (system) body.system = system;
  if (tools && tools.length > 0) body.tools = tools;

  const requestSignal = createRequestSignal(signal, 120000);
  try {
    const res = await fetch(`${cfg.baseUrl}/v1/messages`, {
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
      yield { type: "error", error: `HTTP ${res.status}` };
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) { yield { type: "error", error: "No response body" }; return; }

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
            if (event.content_block?.type === "tool_use") {
              currentTools.set(index, {
                id: String(event.content_block.id),
                name: String(event.content_block.name),
                inputJson: "",
              });
            }
            break;

          case "content_block_delta":
            if (event.delta?.type === "text_delta") {
              yield { type: "text_delta", index, text: String(event.delta.text || "") };
            } else if (event.delta?.type === "input_json_delta" && currentTools.has(index)) {
              const currentTool = currentTools.get(index)!;
              currentTool.inputJson += String(event.delta.partial_json || "");
            }
            break;

          case "content_block_stop": {
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
            yield {
              type: "message_delta",
              stop_reason: event.delta?.stop_reason ?? undefined,
              usage: event.usage,
            };
            break;

          case "message_stop":
            yield { type: "message_stop" };
            break;

          case "error":
            yield { type: "error", error: event.error?.message || event.error?.type || "API stream error" };
            break;
        }
      }
    }
  } catch (e: any) {
    if (requestSignal.signal.aborted) {
      yield { type: "error", error: "Interrupted" };
      return;
    }
    yield { type: "error", error: e.message };
  } finally {
    requestSignal.cleanup();
  }
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

function createRequestSignal(signal: AbortSignal | undefined, timeoutMs: number): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort(new Error(`Request timed out after ${timeoutMs}ms`));
  }, timeoutMs);

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
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abortFromParent);
    },
  };
}
