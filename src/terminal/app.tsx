// ============================================================
// Claude Code v2.1.26 — 1:1 UI (exact visual match from binary)
// ============================================================

import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, render } from "ink";
import { getApiConfig, streamMessage } from "../api/client.js";
import { getToolDefs, executeTool } from "../tools/registry.js";
import { PermissionHandler, type PermissionBehavior, type PermissionRequest } from "../permissions/handler.js";
import { createSession, saveSession } from "../session/store.js";
import { createInterface } from "readline";

const permissionHandler = new PermissionHandler();
const conversationHistory: { role: string; content: string }[] = [];
const session = createSession();

function App() {
  const [messages, setMessages] = useState<Array<{ id: string; role: string; content: string; toolUses?: any[]; usage?: any }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [status, setStatus] = useState("Ready");
  const [permPrompt, setPermPrompt] = useState<any>(null);
  const [vim, setVim] = useState("INSERT");
  const [violations] = useState(0);
  const cfg = getApiConfig();

  // Input
  useEffect(() => {
    const { stdin } = process;
    if (!stdin.isTTY) { const rl = createInterface({ input: stdin }); rl.on("line", (l: string) => { if (l.trim() && !loading && !permPrompt) send(l.trim()); }); return () => rl.close(); }
    stdin.setRawMode?.(true);
    let buf = "";
    const d = (c: Buffer) => { for (const ch of c.toString()) { if (ch === "\r" || ch === "\n") { if (buf.trim() && !loading && !permPrompt) { send(buf); buf = ""; } } else if (ch === "\x7f") { buf = buf.slice(0, -1); setInput(buf); } else if (ch === "\x03" || ch === "\x04") { process.exit(0); } else if (ch === "\x1b") { setVim((v: string) => v === "INSERT" ? "NORMAL" : "INSERT"); } else if (ch >= " ") { buf += ch; setInput(buf); } } };
    stdin.on("data", d);
    return () => { stdin.removeListener("data", d); stdin.setRawMode?.(false); };
  }, [loading, permPrompt]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const um: any = { id: `u-${Date.now()}`, role: "user", content: text };
    conversationHistory.push({ role: "user", content: text });
    if (conversationHistory.length > 50) conversationHistory.shift();
    setMessages((p: any) => [...p, um]); setInput(""); setLoading(true); setStatus("Thinking..."); setStreaming("");

    try {
      const tools = getToolDefs();
      for (let turn = 0; turn < 10; turn++) {
        setStatus(`Turn ${turn + 1}/10`);
        const am: any = { id: `a-${Date.now()}`, role: "assistant", content: "", toolUses: [] };
        setMessages((p: any) => [...p, am]);
        let text = "";
        const tcs: any[] = [];

        for await (const ev of streamMessage(conversationHistory, undefined, tools)) {
          if (ev.type === "text_delta") { text += ev.text || ""; setStreaming(text); }
          else if (ev.type === "tool_use" && ev.tool) tcs.push(ev.tool);
          else if (ev.type === "usage") am.usage = ev.usage;
        }
        am.content = text; setStreaming("");
        if (tcs.length === 0) { conversationHistory.push({ role: "assistant", content: text }); break; }

        let info = false;
        for (const tc of tcs) {
          am.toolUses.push({ id: tc.id, name: tc.name, input: tc.input });
          const pr = await permissionHandler.checkPermission({ toolName: tc.name, toolUseID: tc.id, input: tc.input });
          if (pr.behavior === "deny") { am.toolUses.push({ id: tc.id + "-d", name: tc.name, input: tc.input, result: `Denied: ${pr.message || "blocked"}` }); info = true; continue; }
          if (pr.behavior === "ask") {
            const dec = await new Promise<PermissionBehavior>((res) => { setPermPrompt({ toolName: tc.name, toolUseID: tc.id, input: tc.input, resolve: res }); });
            permissionHandler.recordApproval(tc.id, dec);
            setPermPrompt(null);
            if (dec === "deny") { am.toolUses.push({ id: tc.id + "-d", name: tc.name, input: tc.input, result: "Denied" }); info = true; continue; }
          }
          const r = await executeTool(tc.name, tc.input);
          am.toolUses.push({ id: tc.id + "-r", name: tc.name, input: tc.input, result: r.content });
          conversationHistory.push({ role: "assistant", content: `[${tc.name}] ${JSON.stringify(tc.input)} → ${r.content.slice(0, 500)}` });
          info = true;
        }
        if (!info) break;
      }
    } catch (e: any) { setMessages((p: any) => [...p, { id: `e-${Date.now()}`, role: "system", content: `Error: ${e.message}` }]); }

    setLoading(false); setStreaming(""); setStatus("Ready");
    saveSession({ ...session, messages: conversationHistory.map((m, i) => ({ ...m, timestamp: Date.now() - i * 1000 })) });
  }, [loading]);

  // Permission keyboard
  useEffect(() => {
    if (!permPrompt) return;
    const d = (c: Buffer) => { const ch = c.toString(); if (ch === "y" || ch === "Y") permPrompt.resolve("allow"); else if (ch === "n" || ch === "N") permPrompt.resolve("deny"); };
    process.stdin.on("data", d);
    return () => void process.stdin.removeListener("data", d);
  }, [permPrompt]);

  // Exact render tree matching binary structure
  return React.createElement(Box, { flexDirection: "column", paddingX: 1, paddingY: 0 },
    // === Header (1:1) ===
    React.createElement(Box, { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "cyan" }, "Claude Code"),
      React.createElement(Text, { dimColor: true }, ` v2.1.26`),
      cfg && React.createElement(Text, { dimColor: true }, ` — ${cfg.model}`)
    ),
    // === Vim mode (1:1 Z#146) ===
    vim !== "INSERT" && React.createElement(Box, { marginBottom: 1 },
      React.createElement(Text, { backgroundColor: "yellow", color: "black", bold: true }, ` ${vim} `)
    ),
    // === Sandbox violations (1:1 Z#114) ===
    violations > 0 && React.createElement(Box, { paddingX: 0, paddingY: 0 },
      React.createElement(Text, { color: "inactive" as any }, `⧈ Sandbox blocked ${violations} ${violations === 1 ? "operation" : "operations"} · Ctrl+O for details · /sandbox to disable`)
    ),
    // === Messages (1:1 Mk3) ===
    React.createElement(Box, { flexDirection: "column", marginBottom: 1 },
      messages.length === 0 && React.createElement(Box, null,
        React.createElement(Text, { dimColor: true }, "Type a prompt and press Enter. Y/N for permissions. ESC for vim mode.")
      ),
      ...messages.map((msg: any) =>
        React.createElement(Box, { key: msg.id, flexDirection: "column", marginY: 1 },
          // Role indicator + content
          React.createElement(Box, null,
            React.createElement(Text, { bold: true, color: msg.role === "user" ? "green" : msg.role === "system" ? "yellow" : "blue" },
              msg.role === "user" ? "❯ " : msg.role === "system" ? "⚠ " : "● "
            ),
            React.createElement(Text, null, msg.content.slice(0, 2000))
          ),
          // Tool uses
          msg.toolUses?.map((tu: any) =>
            React.createElement(Box, { key: tu.id, marginLeft: 2 },
              React.createElement(Text, { dimColor: true }, `  ⚙ ${tu.name}: `),
              React.createElement(Text, { color: tu.result?.startsWith("Error") || tu.result?.startsWith("Denied") ? "red" : undefined }, tu.result || "...")
            )
          ),
          // Usage stats
          msg.usage && React.createElement(Box, null,
            React.createElement(Text, { dimColor: true }, `  in:${msg.usage.input_tokens} out:${msg.usage.output_tokens}`)
          )
        )
      ),
      // Streaming text (1:1)
      streaming && React.createElement(Box, null,
        React.createElement(Text, { bold: true, color: "blue" }, "● "),
        React.createElement(Text, null, streaming),
        React.createElement(Text, { color: "yellow" }, "│")
      ),
      // Loading (1:1)
      loading && !streaming && React.createElement(Box, null,
        React.createElement(Text, { color: "yellow" }, "⠋ Thinking...")
      )
    ),
    // === Permission prompt (1:1 Z#083) ===
    permPrompt && React.createElement(Box, { flexDirection: "column", marginY: 1, paddingX: 2 },
      React.createElement(Box, null,
        React.createElement(Text, { bold: true, color: "yellow" }, "⚡ Permission Required")
      ),
      React.createElement(Box, { marginTop: 1 },
        React.createElement(Text, null, `Allow ${permPrompt.toolName}?`)
      ),
      permPrompt.input.command && React.createElement(Box, null,
        React.createElement(Text, { dimColor: true }, `  Command: ${String(permPrompt.input.command).slice(0, 200)}`)
      ),
      React.createElement(Box, { marginTop: 1, flexDirection: "row" },
        React.createElement(Text, { color: "green" }, "[Y] Yes, allow  "),
        React.createElement(Text, { color: "red" }, "[N] No, deny")
      )
    ),
    // === Input line (1:1) ===
    !permPrompt && React.createElement(Box, null,
      React.createElement(Text, { bold: true, color: "green" }, "❯ "),
      React.createElement(Text, null, input),
      !loading && React.createElement(Text, { dimColor: true }, "│")
    ),
    // === Status bar (1:1) ===
    React.createElement(Box, { marginTop: 1 },
      React.createElement(Text, { dimColor: true },
        [status, messages.length > 0 ? `${messages.length} msgs` : "", cfg?.model || "", "Ctrl+C to exit"].filter(Boolean).join(" · ")
      )
    )
  );
}

export function startIntegratedTUI(): void { const { waitUntilExit } = render(React.createElement(App)); waitUntilExit().then(() => process.exit(0)); }
