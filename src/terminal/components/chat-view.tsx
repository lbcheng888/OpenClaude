// ============================================================
// 1:1 from binary: Main chat/transcript view component
//
// This is the primary UI — message history, input prompt,
// status bar, tool progress indicators.
//
// Component tree (from Z blocks):
//   App
//   ├── Header (model, version, session info)
//   ├── MessageList
//   │   ├── UserMessage
//   │   ├── AssistantMessage
//   │   └── SystemMessage (tool results, errors)
//   ├── InputBox (prompt input with vim mode)
//   └── StatusBar (mode, sandbox violations)
// ============================================================

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactElement,
} from "react";
import { Box, Text, useInput, useApp } from "@anthropic/ink";
import { useAppState } from "./app-state.js";
import { useTerminal } from "./terminal-context.js";

// ============================================================
// Types (1:1 from binary message protocol)
// ============================================================

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  usage?: { input_tokens: number; output_tokens: number };
  timestamp: number;
}

// ============================================================
// API Client
// ============================================================

function getConfig() {
  const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";
  const token =
    process.env.ANTHROPIC_AUTH_TOKEN ||
    process.env.ANTHROPIC_API_KEY ||
    "";
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  return token ? { baseUrl, token, model } : null;
}

async function sendToAPI(prompt: string): Promise<{
  text: string;
  usage?: { input_tokens: number; output_tokens: number };
}> {
  const cfg = getConfig();
  if (!cfg) return { text: "Error: No API credentials configured." };

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
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "unknown");
      return { text: `API Error ${res.status}: ${err.slice(0, 300)}` };
    }

    const data: any = await res.json();
    let text = "";
    if (Array.isArray(data.content)) {
      for (const b of data.content) {
        if (b.type === "text") text += b.text;
        else if (b.type === "tool_use")
          text += `\n[${b.name}] ${JSON.stringify(b.input).slice(0, 200)}`;
      }
    }
    return { text, usage: data.usage };
  } catch (e: any) {
    return { text: `Error: ${e.message}` };
  }
}

// ============================================================
// Components
// ============================================================

/** Single message row */
function MessageRow({ msg }: { msg: ChatMessage }) {
  const color = msg.role === "user" ? "green" : msg.role === "system" ? "yellow" : "blue";
  const prefix = msg.role === "user" ? "❯ " : msg.role === "system" ? "⚠ " : "● ";

  return React.createElement(
    Box,
    { flexDirection: "column", marginY: 1 },
    React.createElement(
      Box,
      null,
      React.createElement(Text, { bold: true, color }, prefix),
      React.createElement(Text, null, msg.content)
    )
  );
}

/** Input line with cursor */
function InputLine({
  value,
  loading,
}: {
  value: string;
  loading: boolean;
}) {
  return React.createElement(
    Box,
    null,
    React.createElement(Text, { bold: true, color: "green" }, "❯ "),
    React.createElement(Text, null, value),
    !loading && React.createElement(Text, { dimColor: true }, "│")
  );
}

/** Status bar at bottom */
function StatusBar({
  statusText,
  msgCount,
  cfg,
}: {
  statusText: string;
  msgCount: number;
  cfg: ReturnType<typeof getConfig>;
}) {
  const items = [statusText || "Ready"];
  if (msgCount > 0) items.push(`${msgCount} msgs`);
  if (cfg) items.push(cfg.model);
  items.push("Ctrl+C to exit");

  return React.createElement(
    Box,
    { marginTop: 1 },
    React.createElement(Text, { dimColor: true }, items.join(" | "))
  );
}

// ============================================================
// Main ChatView Component
// ============================================================

export function ChatView(): ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const { exit } = useApp();
  const { columns } = useTerminal();
  const cfg = getConfig();

  // Send prompt
  const sendPrompt = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || loading) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };

      setMessages((p) => [...p, userMsg]);
      setInput("");
      setLoading(true);
      setStatusText("Thinking...");

      const result = await sendToAPI(prompt);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: result.text,
        usage: result.usage,
        timestamp: Date.now(),
      };

      setMessages((p) => [...p, assistantMsg]);
      setStatusText("Done");
      setLoading(false);
    },
    [loading]
  );

  // Raw stdin capture for text input
  useEffect(() => {
    const { stdin } = process;
    if (!stdin.isTTY) return;

    const wasRaw = stdin.isRaw;
    stdin.setRawMode?.(true);

    let buf = "";
    const onData = (chunk: Buffer) => {
      const str = chunk.toString();
      for (const char of str) {
        if (char === "\r" || char === "\n") {
          if (buf.trim()) {
            sendPrompt(buf);
            buf = "";
          }
        } else if (char === "\x7f" || char === "\b") {
          buf = buf.slice(0, -1);
          setInput(buf);
        } else if (char === "\x03") {
          exit();
        } else if (char === "\x04") {
          exit();
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
  }, [sendPrompt, exit]);

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1, width: columns },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "cyan" }, "Claude Code v2.1.26"),
      React.createElement(Text, { dimColor: true }, " — TUI Restoration"),
      cfg &&
        React.createElement(
          Text,
          { dimColor: true },
          ` | ${cfg.model} @ ${cfg.baseUrl}`
        )
    ),

    // Messages area
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      messages.length === 0 &&
        React.createElement(
          Box,
          null,
          React.createElement(
            Text,
            { dimColor: true },
            "Start typing and press Enter. /help for commands."
          )
        ),
      ...messages.map((msg) =>
        React.createElement(MessageRow, { key: msg.id, msg })
      ),
      loading &&
        React.createElement(
          Box,
          null,
          React.createElement(Text, { color: "yellow" }, "⠋ Thinking...")
        )
    ),

    // Input line
    React.createElement(InputLine, { value: input, loading }),

    // Status bar
    React.createElement(StatusBar, {
      statusText,
      msgCount: messages.length,
      cfg,
    })
  );
}
