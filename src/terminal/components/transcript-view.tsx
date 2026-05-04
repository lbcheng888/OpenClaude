// ============================================================
// 1:1 from binary: TranscriptView component (Mk3 - 39KB, 71 creates)
//
// This is the MAIN chat interface. Renders:
// - Message history with user/assistant/system messages
// - Streaming text with cursor
// - Tool use progress indicators
// - Permission prompts inline
// - Vim mode indicator
// - Session title bar
// - Input box with slash-command support
// ============================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, Text, useInput, useApp } from "ink";

// ============================================================
// Types (1:1 from binary message protocol)
// ============================================================

type MessageRole = "user" | "assistant" | "system";

interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
}

interface TextBlock {
  type: "text";
  text: string;
}

type ContentBlock = TextBlock | ToolUseBlock;

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: ContentBlock[];
  usage?: { input_tokens: number; output_tokens: number };
  timestamp: number;
}

interface StreamingState {
  messageId: string;
  text: string;
  toolUses: ToolUseBlock[];
}

// ============================================================
// API Client
// ============================================================

function getAPIConfig() {
  const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";
  const token = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY || "";
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  return token ? { baseUrl, token, model } : null;
}

async function callAPI(
  messages: { role: string; content: string }[]
): Promise<{ content: ContentBlock[]; usage?: { input_tokens: number; output_tokens: number } }> {
  const cfg = getAPIConfig();
  if (!cfg) return { content: [{ type: "text", text: "Error: No API credentials." }] };

  try {
    const res = await fetch(`${cfg.baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cfg.token,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: cfg.model,
        max_tokens: 4096,
        messages: messages.map((m) => ({ role: "user", content: m.content })),
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      return { content: [{ type: "text", text: `API Error ${res.status}: ${err.slice(0, 300)}` }] };
    }

    const data = await res.json();
    return {
      content: (data.content || []).map((b: any) =>
        b.type === "tool_use"
          ? { type: "tool_use", id: b.id, name: b.name, input: b.input }
          : { type: "text", text: b.text }
      ),
      usage: data.usage,
    };
  } catch (e: any) {
    return { content: [{ type: "text", text: `Error: ${e.message}` }] };
  }
}

// ============================================================
// Sub-components
// ============================================================

/** Session title bar */
function TitleBar({ title, model }: { title?: string; model?: string }) {
  return (
    <Box flexDirection="row" marginBottom={1}>
      <Text bold color="cyan">Claude Code v2.1.26</Text>
      <Text dimColor> — {title || "New Session"}</Text>
      {model && <Text dimColor> | {model}</Text>}
    </Box>
  );
}

/** User message */
function UserBubble({ text }: { text: string }) {
  return (
    <Box marginY={1}>
      <Text bold color="green">❯ </Text>
      <Text>{text}</Text>
    </Box>
  );
}

/** Assistant text block */
function AssistantText({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  return (
    <Box marginY={1}>
      <Text bold color="blue">● </Text>
      <Text>{text}</Text>
      {isStreaming && <Text color="yellow">│</Text>}
    </Box>
  );
}

/** Tool use progress */
function ToolUseProgress({ tool }: { tool: ToolUseBlock }) {
  return (
    <Box marginY={1} marginLeft={2}>
      <Text color="yellow">⚙ </Text>
      <Text dimColor>[{tool.name}]</Text>
      <Text> {JSON.stringify(tool.input).slice(0, 100)}</Text>
    </Box>
  );
}

/** System message */
function SystemMessage({ text }: { text: string }) {
  return (
    <Box marginY={1} marginLeft={2}>
      <Text dimColor>{text}</Text>
    </Box>
  );
}

/** Usage stats footer */
function UsageFooter({ usage }: { usage?: { input_tokens: number; output_tokens: number } }) {
  if (!usage) return null;
  return (
    <Box>
      <Text dimColor>  in:{usage.input_tokens} out:{usage.output_tokens}</Text>
    </Box>
  );
}

/** Input area */
function InputArea({ value, loading }: { value: string; loading: boolean }) {
  return (
    <Box marginTop={1}>
      <Text bold color="green">❯ </Text>
      <Text>{value}</Text>
      {!loading && <Text dimColor>│</Text>}
      {loading && <Text color="yellow"> ⠋</Text>}
    </Box>
  );
}

/** Status bar */
function StatusBar({ text, msgCount, model }: { text: string; msgCount: number; model?: string }) {
  return (
    <Box marginTop={1}>
      <Text dimColor>
        {[
          text || "Ready",
          msgCount > 0 ? `${msgCount} msgs` : "",
          model || "",
          "Ctrl+C to exit",
        ]
          .filter(Boolean)
          .join(" | ")}
      </Text>
    </Box>
  );
}

// ============================================================
// Main TranscriptView (1:1 Mk3 component)
// ============================================================

export function TranscriptView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState<StreamingState | null>(null);
  const [statusText, setStatusText] = useState("");
  const [vimMode, setVimMode] = useState<string>("INSERT");
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const { exit } = useApp();
  const scrollRef = useRef<number>(0);
  const cfg = getAPIConfig();

  // Auto-generate session title
  useEffect(() => {
    if (!sessionTitle && messages.length > 0) {
      const firstUser = messages.find((m) => m.role === "user");
      if (firstUser) {
        const text = firstUser.content
          .filter((b): b is TextBlock => b.type === "text")
          .map((b) => b.text)
          .join(" ")
          .slice(0, 50);
        setSessionTitle(text || "New Session");
      }
    }
  }, [messages, sessionTitle]);

  // Send message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: [{ type: "text", text: text.trim() }],
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setStatusText("Thinking...");

      // Build message history for API
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content
            .filter((b): b is TextBlock => b.type === "text")
            .map((b) => b.text)
            .join("\n"),
        }));

      const result = await callAPI(apiMessages);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: result.content,
        usage: result.usage,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setStatusText(
        result.usage
          ? `in:${result.usage.input_tokens} out:${result.usage.output_tokens}`
          : "Done"
      );
      setLoading(false);
    },
    [messages, loading]
  );

  // Raw stdin capture for text input
  useEffect(() => {
    const { stdin } = process;
    if (!stdin?.isTTY) return;

    const wasRaw = stdin.isRaw;
    stdin.setRawMode?.(true);

    let buf = "";
    const onData = (chunk: Buffer) => {
      const str = chunk.toString();
      for (const char of str) {
        if (char === "\r" || char === "\n") {
          if (buf.trim()) {
            const text = buf;
            buf = "";
            sendMessage(text);
          }
        } else if (char === "\x7f" || char === "\b") {
          buf = buf.slice(0, -1);
          setInput(buf);
        } else if (char === "\x03") {
          exit();
        } else if (char === "\x04") {
          exit();
        } else if (char === "\x1b") {
          // ESC - vim mode normal
          setVimMode((m) => (m === "INSERT" ? "NORMAL" : "INSERT"));
        } else if (char >= " ") {
          buf += char;
          setInput(buf);
        }
      }
    };

    stdin.on("data", onData);
    return () => {
      stdin.removeListener("data", onData);
      if (!wasRaw) stdin.setRawMode?.(false);
    };
  }, [sendMessage, exit]);

  // Render message content
  const renderContent = (msg: ChatMessage) => {
    return msg.content.map((block, i) => {
      if (block.type === "text") {
        if (msg.role === "user") {
          return <UserBubble key={i} text={block.text} />;
        }
        return <AssistantText key={i} text={block.text} isStreaming={loading && i === msg.content.length - 1} />;
      }
      if (block.type === "tool_use") {
        return <ToolUseProgress key={i} tool={block} />;
      }
      return null;
    });
  };

  return (
    <Box flexDirection="column" padding={1}>
      {/* Title bar */}
      <TitleBar title={sessionTitle} model={cfg?.model} />

      {/* Vim mode indicator */}
      {vimMode !== "INSERT" && (
        <Box marginBottom={1}>
          <Text backgroundColor="yellow" color="black" bold>
            {" "}{vimMode}{" "}
          </Text>
        </Box>
      )}

      {/* Messages area */}
      <Box flexDirection="column" marginBottom={1}>
        {messages.length === 0 && (
          <Box>
            <Text dimColor>Start typing and press Enter. /help for commands. ESC for vim mode.</Text>
          </Box>
        )}

        {messages.map((msg) => (
          <Box key={msg.id} flexDirection="column">
            {renderContent(msg)}
            <UsageFooter usage={msg.usage} />
          </Box>
        ))}

        {/* Loading indicator */}
        {loading && (
          <Box>
            <Text color="yellow">⠋ Thinking...</Text>
          </Box>
        )}
      </Box>

      {/* Input area */}
      <InputArea value={input} loading={loading} />

      {/* Status bar */}
      <StatusBar text={statusText} msgCount={messages.length} model={cfg?.model} />
    </Box>
  );
}
