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
  messages: { role: string; content: string }[],
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
  messages: { role: string; content: string }[],
  system?: string,
  tools?: ToolDef[],
  maxTokens = 4096
): AsyncGenerator<{ type: "text_delta" | "tool_use" | "usage" | "error"; text?: string; tool?: { id: string; name: string; input: Record<string, unknown> }; usage?: { input_tokens: number; output_tokens: number }; error?: string }> {
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
      yield { type: "error", error: `HTTP ${res.status}` };
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) { yield { type: "error", error: "No response body" }; return; }

    const decoder = new TextDecoder();
    let buffer = "";
    let currentTool: any = null;

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

        try {
          const event = JSON.parse(data);

          switch (event.type) {
            case "content_block_start":
              if (event.content_block?.type === "tool_use") {
                currentTool = {
                  id: event.content_block.id,
                  name: event.content_block.name,
                  input: {},
                };
              }
              break;

            case "content_block_delta":
              if (event.delta?.type === "text_delta") {
                yield { type: "text_delta", text: event.delta.text };
              } else if (event.delta?.type === "input_json_delta" && currentTool) {
                currentTool.input_json = (currentTool.input_json || "") + event.delta.partial_json;
              }
              break;

            case "content_block_stop":
              if (currentTool) {
                try {
                  currentTool.input = JSON.parse(currentTool.input_json || "{}");
                } catch {}
                yield { type: "tool_use", tool: currentTool };
                currentTool = null;
              }
              break;

            case "message_delta":
              if (event.usage) {
                yield { type: "usage", usage: event.usage };
              }
              break;
          }
        } catch {}
      }
    }
  } catch (e: any) {
    yield { type: "error", error: e.message };
  }
}

export interface ToolDef {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required?: string[];
  };
}
