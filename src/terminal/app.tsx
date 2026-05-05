import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, NoSelect, Ratchet, Text, stringWidth, useAnimationFrame, useApp, useInput } from "@anthropic/ink";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { getApiConfig, streamMessage, type ApiMessage, type ApiMessageContent, type Usage } from "../api/client.js";
import { TenguSession, type PermissionDecision, type TenguLoopEvent, type ToolDisplay } from "../agent/tengu.js";
import { createSettingsHookRunner } from "../hooks/runner.js";
import { PermissionHandler, type PermissionBehavior, type PermissionMode } from "../permissions/handler.js";
import { executeTool, getToolDefs } from "../tools/registry.js";
import { createSession, listSessions, loadSession, saveSession } from "../session/store.js";
import type { CliOptions } from "../index.js";
import { StartupScreen, getEffortStatus, getPromptPlaceholder } from "./startup-screen.js";

type Role = "user" | "assistant" | "system";

type ToolRender = {
  id: string;
  name: string;
  input: Record<string, unknown>;
  result?: string;
  isError?: boolean;
  display?: ToolDisplay;
};

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  toolUses?: ToolRender[];
};

type PermissionPrompt = {
  toolName: string;
  toolUseID: string;
  input: Record<string, unknown>;
  resolve: (decision: { behavior: PermissionBehavior; remember?: boolean }) => void;
};

type SendOptions = { appendUserMessage?: boolean };

type ClaudeCodeTuiProps = {
  version: string;
  initialPrompt?: string;
  bypassPermissions?: boolean;
  modelOverride?: string;
};

export function ClaudeCodeTui({
  version,
  initialPrompt,
  bypassPermissions,
  modelOverride,
}: ClaudeCodeTuiProps): React.ReactElement {
  useApp();
  const cfg = getApiConfig();
  const model = modelOverride || cfg?.model || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const [permissionMode, setPermissionMode] = useState<PermissionMode>(
    bypassPermissions ? "bypassPermissions" : "default",
  );
  const permissionHandler = useMemo(() => new PermissionHandler(), []);
  const initialPromptText = useMemo(() => initialPrompt?.trim() || "", [initialPrompt]);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialPromptText
      ? [
          {
            id: "user-initial",
            role: "user",
            content: initialPromptText,
          },
        ]
      : [],
  );
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(0);
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissionPrompt, setPermissionPrompt] = useState<PermissionPrompt | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [expandedOutput, setExpandedOutput] = useState(false);
  const [usage, setUsage] = useState<Usage>({});
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const sessionRef = useRef(createSession(initialPromptText || process.cwd()));
  const initialPromptSent = useRef(false);
  const hookRunner = useMemo(() => createSettingsHookRunner(), []);

  const visibleMessages = useMemo(() => messages.slice(-12), [messages]);
  const isEmptySession = messages.length === 0 && !loading && !streaming;
  const slashCommandMatches = useMemo(() => (
    input.startsWith("/") && !input.includes(" ")
      ? getSlashCommandMatches(input).slice(0, 8)
      : []
  ), [input]);

  useEffect(() => {
    permissionHandler.setMode(permissionMode);
  }, [permissionHandler, permissionMode]);

  const pushSystemMessage = useCallback((content: string): void => {
    setMessages(previous => [
      ...previous,
      { id: `system-${Date.now()}-${previous.length}`, role: "system", content },
    ]);
  }, []);

  const emitHookOutcome = useCallback((outcome: {
    notifications?: string[];
    additionalContext?: string[];
    blocked?: boolean;
    message?: string;
  }): void => {
    for (const notification of outcome.notifications || []) {
      pushSystemMessage(notification);
    }
    for (const context of outcome.additionalContext || []) {
      pushSystemMessage(context);
    }
    if (outcome.blocked && outcome.message) {
      pushSystemMessage(outcome.message);
    }
  }, [pushSystemMessage]);

  useEffect(() => {
    if (!hookRunner) return;
    void hookRunner("SessionStart", {
      source: "startup",
      cwd: process.cwd(),
      session_id: sessionRef.current.id,
      permission_mode: permissionMode,
    }).then(emitHookOutcome).catch(error => {
      pushSystemMessage(error instanceof Error ? error.message : String(error));
    });
  }, [emitHookOutcome, hookRunner, permissionMode, pushSystemMessage]);

  const upsertToolRender = useCallback((messageId: string, tool: ToolRender): void => {
    setMessages(previous => {
      let found = false;
      const next = previous.map(message => {
        if (message.id !== messageId) return message;
        found = true;
        const toolUses = message.toolUses || [];
        const existingIndex = toolUses.findIndex(existing => existing.id === tool.id);
        if (existingIndex === -1) {
          return { ...message, toolUses: [...toolUses, tool] };
        }
        return {
          ...message,
          toolUses: toolUses.map((existing, index) =>
            index === existingIndex ? { ...existing, ...tool } : existing,
          ),
        };
      });
      return found ? next : [...next, { id: messageId, role: "assistant", content: "", toolUses: [tool] }];
    });
  }, []);

  const handleAgentEvent = useCallback((event: TenguLoopEvent): void => {
    if (event.type === "assistant_start") {
      setMessages(previous => [
        ...previous,
        { id: event.assistantId, role: "assistant", content: "", toolUses: [] },
      ]);
      return;
    }

    if (event.type === "assistant_text_delta") {
      setStreaming(event.fullText);
      return;
    }

    if (event.type === "assistant_complete") {
      setStreaming("");
      if (event.usage) {
        setUsage(current => ({ ...current, ...event.usage }));
      }
      setMessages(previous => {
        let found = false;
        const next = previous.map(message => {
          if (message.id !== event.assistantId) return message;
          found = true;
          return { ...message, content: event.text };
        });
        return found
          ? next
          : [...next, { id: event.assistantId, role: "assistant", content: event.text, toolUses: [] }];
      });
      return;
    }

    if (event.type === "tool_start") {
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
      });
      return;
    }

    if (event.type === "tool_result") {
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
        result: event.result.content,
        isError: event.result.is_error,
        display: event.display,
      });
      return;
    }

    if (event.type === "notification") {
      pushSystemMessage(event.text);
    }
  }, [pushSystemMessage, upsertToolRender]);

  const requestPermission = useCallback(async (tool: {
    id: string;
    name: string;
    input: Record<string, unknown>;
  }): Promise<PermissionDecision> => {
    const decision = await new Promise<{ behavior: PermissionBehavior; remember?: boolean }>(resolve => {
      setPermissionPrompt({
        toolName: tool.name,
        toolUseID: tool.id,
        input: tool.input,
        resolve,
      });
    });
    setPermissionPrompt(null);
    if (decision.remember) {
      permissionHandler.recordApproval(tool.name, tool.input, decision.behavior);
    }
    return { behavior: decision.behavior };
  }, [permissionHandler]);

  const agentSession = useMemo(
    () =>
      new TenguSession({
        tools: getToolDefs(),
        stream: (history, tools, signal) => streamMessage(history, undefined, tools, undefined, signal),
        executeTool,
        checkPermission: tool =>
          permissionHandler.checkPermission({
            toolName: tool.name,
            toolUseID: tool.id,
            input: tool.input,
        }),
        requestPermission,
        runHooks: hookRunner,
        onEvent: handleAgentEvent,
      }),
    [handleAgentEvent, hookRunner, permissionHandler, requestPermission],
  );

  const handleSlashCommand = useCallback(
    (commandLine: string): true | string => {
      const [command = "", ...args] = commandLine.trim().split(/\s+/u);
      const argumentText = args.join(" ");

      switch (command) {
        case "/clear":
          agentSession.reset();
          setMessages([]);
          setStreaming("");
          setFeedbackVisible(false);
          if (hookRunner) {
            void hookRunner("SessionStart", {
              source: "clear",
              cwd: process.cwd(),
              session_id: sessionRef.current.id,
              permission_mode: permissionMode,
            }).then(emitHookOutcome);
          }
          return true;

        case "/help":
        case "?":
          pushSystemMessage(helpCommandText());
          return true;

        case "/model":
          pushSystemMessage(argumentText ? `Model switching is not enabled in this build. Current model: ${model}` : `Current model: ${model}`);
          return true;

        case "/permissions":
          pushSystemMessage(`Permission mode: ${permissionMode}`);
          return true;

        case "/feedback":
          setFeedbackVisible(true);
          return true;

        case "/release-notes":
          pushSystemMessage("Release notes are shown in the startup card from ~/.claude/cache/changelog.md when available.");
          return true;

        case "/cost":
          pushSystemMessage("Cost display is not available until API usage accounting is wired into the session state.");
          return true;

        case "/doctor":
          pushSystemMessage(
            [
              `cwd: ${process.cwd()}`,
              `model: ${model}`,
              `auth: ${cfg ? "configured" : "missing"}`,
              `permission mode: ${permissionMode}`,
            ].join("\n"),
          );
          return true;

        case "/compact":
          if (hookRunner) {
            void hookRunner("PreCompact", {
              source: "manual",
              cwd: process.cwd(),
              session_id: sessionRef.current.id,
              permission_mode: permissionMode,
            }).then(emitHookOutcome);
          }
          saveCurrentSession(sessionRef.current.id, agentSession.history, permissionMode);
          pushSystemMessage(`Session compact checkpoint saved: ${sessionRef.current.id}`);
          if (hookRunner) {
            void hookRunner("PostCompact", {
              source: "manual",
              cwd: process.cwd(),
              session_id: sessionRef.current.id,
              permission_mode: permissionMode,
            }).then(emitHookOutcome);
          }
          return true;

        case "/resume": {
          const sessions = listSessions();
          if (argumentText) {
            const loaded = loadSession(argumentText);
            if (!loaded) {
              pushSystemMessage(`Session not found: ${argumentText}`);
              return true;
            }
            sessionRef.current = loaded;
            agentSession.hydrate(
              loaded.messages.map(message => ({
                role: message.role,
                content: message.content,
              })),
            );
            setMessages(rebuildChatMessagesFromSession(loaded.messages));
            pushSystemMessage(`Resumed session: ${loaded.id}`);
            if (hookRunner) {
              void hookRunner("SessionStart", {
                source: "resume",
                cwd: process.cwd(),
                session_id: loaded.id,
                permission_mode: permissionMode,
              }).then(emitHookOutcome);
            }
            return true;
          }
          pushSystemMessage(
            sessions.length
              ? sessions
                  .slice(0, 8)
                  .map(session => `${session.id}  ${session.messageCount} messages  ${session.title || ""}`.trim())
                  .join("\n")
              : "No saved sessions",
          );
          return true;
        }

        case "/mcp":
          pushSystemMessage("MCP server management UI is not wired in this build.");
          return true;

        case "/init":
          pushSystemMessage(initializeClaudeMd());
          return true;

        default: {
          const customCommand = loadCustomSlashCommand(command, argumentText);
          if (customCommand) {
            pushSystemMessage(`Running custom command: ${command}`);
            return customCommand;
          }
          pushSystemMessage(`Unknown command: ${command}`);
          return true;
        }
      }
    },
    [agentSession, cfg, emitHookOutcome, hookRunner, model, permissionMode, pushSystemMessage],
  );

  const send = useCallback(
    async (text: string, options: SendOptions = {}) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      let promptForAgent = trimmed;
      if (trimmed.startsWith("/") || trimmed === "?") {
        const slashResult = handleSlashCommand(trimmed);
        setInput("");
        setCursor(0);
        if (slashResult === true) return;
        promptForAgent = slashResult.trim();
        if (!promptForAgent) return;
      }
      if (hookRunner) {
        const promptHook = await hookRunner("UserPromptSubmit", {
          prompt: trimmed,
          cwd: process.cwd(),
          session_id: sessionRef.current.id,
          permission_mode: permissionMode,
        });
        emitHookOutcome(promptHook);
        if (promptHook.blocked) {
          setInput("");
          setCursor(0);
          return;
        }
        if (promptHook.additionalContext.length > 0) {
          promptForAgent = [promptForAgent, ...promptHook.additionalContext].join("\n\n");
        }
      }
      const appendUserMessage = options.appendUserMessage ?? true;
      setInputHistory(previous => [...previous.filter(item => item !== trimmed), trimmed].slice(-50));
      setHistoryIndex(null);

      setFeedbackVisible(false);
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      if (appendUserMessage) {
        setMessages(previous => [...previous, userMessage]);
      }
      setInput("");
      setCursor(0);
      setLoading(true);
      setStreaming("");

      try {
        await agentSession.runUserTurn(promptForAgent);
        saveCurrentSession(sessionRef.current.id, agentSession.history, permissionMode);
        setFeedbackVisible(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message !== "Interrupted" && message !== "Session reset") {
          setMessages(previous => [
            ...previous,
            { id: `system-${Date.now()}`, role: "system", content: message },
          ]);
        }
      } finally {
        setLoading(false);
        setStreaming("");
      }
    },
    [agentSession, emitHookOutcome, handleSlashCommand, hookRunner, loading, permissionMode],
  );

  useEffect(() => {
    if (!initialPromptText || initialPromptSent.current) return;
    initialPromptSent.current = true;
    void send(initialPromptText, { appendUserMessage: false });
  }, [initialPromptText, send]);

  useInput((value, key) => {
    if (value === "\x03" || value === "\x04" || (key.ctrl && (value === "c" || value === "d"))) {
      if (loading) {
        agentSession.cancel();
        setLoading(false);
        setStreaming("");
        pushSystemMessage("Interrupted");
        return;
      }
      process.exit(0);
      return;
    }

    if (value === "?" && input.length === 0 && !loading) {
      pushSystemMessage(helpCommandText());
      return;
    }

    if (key.ctrl && (value === "o" || value === "O")) {
      setExpandedOutput(current => !current);
      return;
    }

    if ((key as { shift?: boolean; tab?: boolean }).shift && ((key as { tab?: boolean }).tab || value === "\x1b[Z")) {
      setPermissionMode(current => cyclePermissionMode(current));
      return;
    }

    if (permissionPrompt) {
      if (value === "y" || value === "Y") {
        permissionPrompt.resolve({ behavior: "allow" });
      } else if (value === "a" || value === "A") {
        permissionPrompt.resolve({ behavior: "allow", remember: true });
      } else if (value === "n" || value === "N") {
        permissionPrompt.resolve({ behavior: "deny" });
      } else if (key.escape) {
        permissionPrompt.resolve({ behavior: "deny" });
      }
      return;
    }

    if (feedbackVisible && (value === "g" || value === "G" || value === "b" || value === "B")) {
      setFeedbackVisible(false);
      return;
    }

    if (key.leftArrow) {
      if (key.meta) {
        setCursor(position => previousWordBoundary(input, position));
        return;
      }
      setCursor(position => Math.max(0, position - 1));
      return;
    }

    if (key.rightArrow) {
      if (key.meta) {
        setCursor(position => nextWordBoundary(input, position));
        return;
      }
      setCursor(position => Math.min(input.length, position + 1));
      return;
    }

    if (key.upArrow && inputHistory.length > 0) {
      const nextIndex = historyIndex === null ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
      const nextInput = inputHistory[nextIndex] || "";
      setHistoryIndex(nextIndex);
      setInput(nextInput);
      setCursor(nextInput.length);
      return;
    }

    if (key.downArrow && historyIndex !== null) {
      const nextIndex = historyIndex + 1;
      if (nextIndex >= inputHistory.length) {
        setHistoryIndex(null);
        setInput("");
        setCursor(0);
        return;
      }
      const nextInput = inputHistory[nextIndex] || "";
      setHistoryIndex(nextIndex);
      setInput(nextInput);
      setCursor(nextInput.length);
      return;
    }

    if (key.tab && input.startsWith("/")) {
      const completion = completeSlashCommand(input);
      if (completion) {
        setInput(completion);
        setCursor(completion.length);
      }
      return;
    }

    if ((key as { home?: boolean }).home) {
      setCursor(0);
      return;
    }

    if ((key as { end?: boolean }).end) {
      setCursor(input.length);
      return;
    }

    if (key.return || value === "\r" || value === "\n") {
      if ((key as { shift?: boolean }).shift) {
        insertInputText("\n", input, cursor, setInput, setCursor);
        return;
      }
      void send(input);
      return;
    }

    if (key.backspace || key.delete) {
      removeInputText(key.delete ? "after" : "before", input, cursor, setInput, setCursor);
      return;
    }

    if (value && !key.ctrl && value !== "\t" && value !== "\x1b[Z") {
      insertInputText(value.replace(/\r\n?/gu, "\n"), input, cursor, setInput, setCursor);
    }
  });

  return (
    <Box flexDirection="column" paddingX={1}>
      <StartupScreen version={version} model={model} />
      <Box flexDirection="column" minHeight={1}>
        {visibleMessages.map(message => (
          <MessageView key={message.id} message={message} expandedOutput={expandedOutput} />
        ))}
        {streaming && <AssistantStreaming text={streaming} />}
        {loading && !streaming && <ThinkingSpinner marginTop={messages.length > 0 ? 1 : 0} />}
      </Box>
      {feedbackVisible && <FeedbackPrompt />}
      {permissionPrompt && <PermissionPromptView prompt={permissionPrompt} />}
      {slashCommandMatches.length > 0 && <SlashCommandPanel commands={slashCommandMatches} />}
      <Box marginTop={1}>
        <Text dimColor>{"─".repeat(Math.max(10, (process.stdout.columns || 80) - 2))}</Text>
      </Box>
      <InputLine
        value={input}
        cursor={cursor}
        loading={loading}
        placeholder={isEmptySession ? getPromptPlaceholder() : undefined}
      />
      <ModeFooter permissionMode={permissionMode} model={model} expandedOutput={expandedOutput} usage={usage} />
    </Box>
  );
}

export async function runPrintMode(options: CliOptions): Promise<void> {
  const promptFromArgs = options.prompt;
  const stdinText = process.stdin.isTTY ? "" : await readStdin();
  let prompt = (promptFromArgs || stdinText).trim();
  if (!prompt) return;
  const hookRunner = createSettingsHookRunner();

  if (hookRunner) {
    const sessionStart = await hookRunner("SessionStart", {
      source: "startup",
      cwd: process.cwd(),
      permission_mode: options.bypassPermissions ? "bypassPermissions" : "default",
    });
    for (const line of [...sessionStart.notifications, ...sessionStart.additionalContext]) {
      process.stderr.write(`${line}\n`);
    }

    const promptHook = await hookRunner("UserPromptSubmit", {
      prompt,
      cwd: process.cwd(),
      permission_mode: options.bypassPermissions ? "bypassPermissions" : "default",
    });
    for (const line of [...promptHook.notifications, ...promptHook.additionalContext]) {
      process.stderr.write(`${line}\n`);
    }
    if (promptHook.blocked) {
      process.stderr.write(`${promptHook.message || "UserPromptSubmit hook blocked prompt"}\n`);
      return;
    }
    if (promptHook.additionalContext.length > 0) {
      prompt = [prompt, ...promptHook.additionalContext].join("\n\n");
    }
  }

  const permissionHandler = new PermissionHandler();
  if (options.bypassPermissions) permissionHandler.setMode("bypassPermissions");

  const session = new TenguSession({
    tools: getToolDefs(),
    stream: (history, tools, signal) => streamMessage(history, undefined, tools, undefined, signal),
    executeTool,
    checkPermission: tool =>
      permissionHandler.checkPermission({
        toolName: tool.name,
        toolUseID: tool.id,
        input: tool.input,
      }),
    requestPermission: async () => ({ behavior: "deny", message: "Permission denied" }),
    runHooks: hookRunner,
    onEvent: event => {
      if (event.type === "assistant_text_delta") {
        process.stdout.write(event.text);
      }
    },
  });

  try {
    await session.runUserTurn(prompt);
  } catch (error) {
    process.stdout.write(error instanceof Error ? error.message : String(error));
  }
  process.stdout.write("\n");
}

function MessageView({
  message,
  expandedOutput,
}: {
  message: ChatMessage;
  expandedOutput: boolean;
}): React.ReactElement {
  if (message.role === "user") {
    return (
      <Box marginTop={1} backgroundColor="userMessageBackground" paddingRight={1}>
        <Text color="subtle">❯ </Text>
        <Text color="text">{message.content}</Text>
      </Box>
    );
  }

  if (message.role === "system") {
    return (
      <Box marginTop={1} flexDirection="column">
        <MarkdownBlock content={message.content} prefix="⚠ " prefixColor="warning" />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginTop={1}>
      {message.content.trim() && (
        <MarkdownBlock content={message.content} prefix="● " prefixColor="text" />
      )}
      {message.toolUses?.map(tool => (
        <ToolUseView key={tool.id} tool={tool} expandedOutput={expandedOutput} />
      ))}
    </Box>
  );
}

function AssistantStreaming({ text }: { text: string }): React.ReactElement {
  return (
    <Box>
      <Text color="text">● </Text>
      <Text>{text}</Text>
      <Text dimColor>│</Text>
    </Box>
  );
}

function MarkdownBlock({
  content,
  prefix,
  prefixColor,
}: {
  content: string;
  prefix: string;
  prefixColor: string;
}): React.ReactElement {
  const lines = content.split("\n");
  let inCode = false;

  return (
    <Box flexDirection="column">
      {lines.map((line, index) => {
        const fence = line.trim().startsWith("```");
        const codeLine = inCode && !fence;
        if (fence) inCode = !inCode;
        return (
          <Box key={`md-${index}`}>
            <Text color={prefixColor}>{index === 0 ? prefix : "  "}</Text>
            <MarkdownLine line={line} codeLine={codeLine || fence} />
          </Box>
        );
      })}
    </Box>
  );
}

function MarkdownLine({
  line,
  codeLine,
}: {
  line: string;
  codeLine: boolean;
}): React.ReactElement {
  const trimmed = line.trim();
  if (codeLine) {
    if (trimmed.startsWith("```")) {
      return <Text dimColor>{trimmed.replace(/^```/u, "") || "code"}</Text>;
    }
    return <Text color="text">{line}</Text>;
  }
  if (/^#{1,6}\s/u.test(trimmed)) {
    return <Text bold>{trimmed.replace(/^#{1,6}\s/u, "")}</Text>;
  }
  if (/^>\s?/u.test(trimmed)) {
    return <Text dimColor>{trimmed.replace(/^>\s?/u, "│ ")}</Text>;
  }
  if (/^[-*]\s/u.test(trimmed)) {
    return <Text>{trimmed.replace(/^[-*]\s/u, "• ")}</Text>;
  }
  if (/^\d+\.\s/u.test(trimmed)) {
    return <Text>{trimmed}</Text>;
  }
  return <Text>{line}</Text>;
}

function ToolUseView({
  tool,
  expandedOutput,
}: {
  tool: ToolRender;
  expandedOutput: boolean;
}): React.ReactElement {
  const displayInput = formatToolUseMessage(tool.name, tool.input);
  const resolved = tool.result !== undefined;

  return (
    <Box flexDirection="column">
      <Box>
        <Box minWidth={2}>
          <Text color={resolved ? (tool.isError ? "error" : "success") : undefined} dimColor={!resolved}>
            ⏺
          </Text>
        </Box>
        <Text bold>{getUserFacingToolName(tool.name)}</Text>
        {displayInput && <Text dimColor>{`(${displayInput})`}</Text>}
      </Box>
      <ToolResultView tool={tool} expandedOutput={expandedOutput} />
    </Box>
  );
}

function ToolResultView({
  tool,
  expandedOutput,
}: {
  tool: ToolRender;
  expandedOutput: boolean;
}): React.ReactElement {
  if (tool.result === undefined) {
    return (
      <MessageResponseView height={1}>
        <Text dimColor>Running…</Text>
      </MessageResponseView>
    );
  }

  const result = stripToolUseErrorTags(trimRightLines(tool.result));

  if (tool.name === "Bash" || tool.name === "BashOutput") {
    if (tool.display?.type === "bash") {
      return <BashResultView display={tool.display} expandedOutput={expandedOutput} />;
    }
    if (tool.display?.type === "bash_background") {
      return <BashBackgroundView display={tool.display} />;
    }
    const normalized = result === "(no output)" ? "" : result;
    if (!normalized) {
      return (
        <MessageResponseView height={1}>
          <Text dimColor>(No output)</Text>
        </MessageResponseView>
      );
    }
    return <OutputLineView content={normalized} expanded={expandedOutput} />;
  }

  if (tool.name === "KillBash") {
    return (
      <MessageResponseView height={1}>
        <Text>{firstResultLine(result) || "Stopped"}</Text>
      </MessageResponseView>
    );
  }

  if (tool.isError) {
    return <OutputLineView content={result || "Error"} isError expanded={expandedOutput} />;
  }

  if (tool.name === "Read") {
    const count = countResultLines(result);
    return (
      <MessageResponseView height={1}>
        <Text>
          Read <Text bold>{count}</Text> {count === 1 ? "line" : "lines"}
        </Text>
      </MessageResponseView>
    );
  }

  if (tool.name === "Glob" || tool.name === "Grep" || tool.name === "LS") {
    const count = isEmptySearchResult(result) ? 0 : countResultLines(result);
    if (expandedOutput && count > 0) {
      return <OutputLineView content={result} expanded />;
    }
    return (
      <MessageResponseView height={1}>
        <Text>
          Found <Text bold>{count}</Text> {tool.name === "Grep" ? pluralize(count, "match", "matches") : pluralize(count, "file", "files")}
          {count > 0 ? <Text dimColor> (ctrl+o to expand)</Text> : null}
        </Text>
      </MessageResponseView>
    );
  }

  if (tool.name === "Write" || tool.name === "Edit" || tool.name === "MultiEdit") {
    if (tool.display?.type === "edit" && expandedOutput && tool.display.diff) {
      return <OutputLineView content={tool.display.diff} expanded />;
    }
    return (
      <MessageResponseView height={1}>
        <Text>
          {firstResultLine(result) || "Done"}
          {tool.display?.type === "edit" && tool.display.diff ? <Text dimColor> (ctrl+o to expand diff)</Text> : null}
        </Text>
      </MessageResponseView>
    );
  }

  if (tool.name === "TodoWrite") {
    return (
      <MessageResponseView height={1}>
        <Text>{firstResultLine(result) || "Done"}</Text>
      </MessageResponseView>
    );
  }

  return <OutputLineView content={result || "Done"} expanded={expandedOutput} />;
}

function BashBackgroundView({
  display,
}: {
  display: Extract<ToolDisplay, { type: "bash_background" }>;
}): React.ReactElement {
  return (
    <MessageResponseView height={1}>
      <Text>
        Running in background <Text bold>{display.taskId}</Text>
        <Text dimColor>{` (${truncateLine(display.command, 48)})`}</Text>
      </Text>
    </MessageResponseView>
  );
}

function BashResultView({
  display,
  expandedOutput,
}: {
  display: Extract<ToolDisplay, { type: "bash" }>;
  expandedOutput: boolean;
}): React.ReactElement {
  const hasOutput = display.stdout.trim() || display.stderr.trim() || display.cwdResetWarning;
  if (!hasOutput) {
    return (
      <MessageResponseView height={1}>
        <Text dimColor>{display.exitCode === 0 ? "(No output)" : `Exit code ${display.exitCode ?? 1}`}</Text>
      </MessageResponseView>
    );
  }

  return (
    <Box flexDirection="column">
      {display.stdout.trim() && <OutputLineView content={display.stdout} expanded={expandedOutput} />}
      {display.stderr.trim() && <OutputLineView content={display.stderr} isError expanded={expandedOutput} />}
      {display.cwdResetWarning && (
        <MessageResponseView height={1}>
          <Text dimColor>{display.cwdResetWarning}</Text>
        </MessageResponseView>
      )}
      {display.exitCode !== null && display.exitCode !== 0 && !display.stderr.trim() && (
        <MessageResponseView height={1}>
          <Text color="error">{`Exit code ${display.exitCode}`}</Text>
        </MessageResponseView>
      )}
    </Box>
  );
}

const MessageResponseContext = React.createContext(false);

function MessageResponseView({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: number;
}): React.ReactElement {
  const isNested = React.useContext(MessageResponseContext);
  if (isNested) {
    return <>{children}</>;
  }

  const content = (
    <MessageResponseContext.Provider value={true}>
      <Box flexDirection="row" height={height} overflowY="hidden">
        <NoSelect fromLeftEdge flexShrink={0}>
          <Text dimColor>{"  "}⎿ {"\u00a0"}</Text>
        </NoSelect>
        <Box flexShrink={1} flexGrow={1}>
          {children}
        </Box>
      </Box>
    </MessageResponseContext.Provider>
  );

  if (height !== undefined) return content;
  return <Ratchet lock="offscreen">{content}</Ratchet>;
}

function OutputLineView({
  content,
  isError,
  expanded,
}: {
  content: string;
  isError?: boolean;
  expanded?: boolean;
}): React.ReactElement {
  const formatted = formatTerminalOutput(stripUnderlineAnsi(content));
  return (
    <MessageResponseView>
      <Text color={isError ? "error" : undefined}>
        {expanded
          ? formatted.trimEnd()
          : renderTruncatedContent(formatted, process.stdout.columns || 80)}
      </Text>
    </MessageResponseView>
  );
}

const SPINNER_FRAMES = ["·", "✢", "✱", "✶", "✻", "✽", "✽", "✻", "✶", "✱", "✢", "·"];

function ThinkingSpinner({ marginTop }: { marginTop: number }): React.ReactElement {
  const [ref, time] = useAnimationFrame(120);
  const frame = SPINNER_FRAMES[Math.floor(time / 120) % SPINNER_FRAMES.length] || SPINNER_FRAMES[0];

  return (
    <Box ref={ref} marginTop={marginTop}>
      <Text bold color="claude">{frame}</Text>
      <Text color="claude"> Thinking…</Text>
    </Box>
  );
}

function FeedbackPrompt(): React.ReactElement {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text>How was this response?</Text>
      <Box>
        <Text color="success">[G] Good</Text>
        <Text>  </Text>
        <Text color="error">[B] Bad</Text>
      </Box>
    </Box>
  );
}

function PermissionPromptView({ prompt }: { prompt: PermissionPrompt }): React.ReactElement {
  const summary = formatToolUseMessage(prompt.toolName, prompt.input);
  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      <Box>
        <Text color="warning">⏺ </Text>
        <Text bold>{`Allow ${getUserFacingToolName(prompt.toolName)}?`}</Text>
      </Box>
      {summary && (
        <MessageResponseView>
          <Text dimColor>{summary}</Text>
        </MessageResponseView>
      )}
      <Box>
        <Text color="success">[Y] Yes</Text>
        <Text>  </Text>
        <Text color="success">[A] Yes, don't ask again</Text>
        <Text>  </Text>
        <Text color="error">[N] No</Text>
      </Box>
    </Box>
  );
}

function SlashCommandPanel({ commands }: { commands: string[] }): React.ReactElement {
  return (
    <Box flexDirection="column" marginTop={1} paddingX={2}>
      {commands.map((command, index) => (
        <Box key={command}>
          <Text color={index === 0 ? "claude" : undefined}>{index === 0 ? "› " : "  "}</Text>
          <Text>{command}</Text>
          <Text dimColor>{`  ${slashCommandDescription(command)}`}</Text>
        </Box>
      ))}
    </Box>
  );
}

function InputLine({
  value,
  cursor,
  loading,
  placeholder,
}: {
  value: string;
  cursor: number;
  loading: boolean;
  placeholder?: string;
}): React.ReactElement {
  const displayLines = value.length > 0 ? value.split("\n") : [placeholder || " "];
  const cursorPoint = getCursorPoint(value, cursor);

  return (
    <Box flexDirection="column">
      {displayLines.map((line, lineIndex) => (
        <Box key={`input-${lineIndex}`}>
          <Text dimColor={loading}>{lineIndex === 0 ? "❯ " : "  "}</Text>
          <InputLineText
            line={line}
            isPlaceholder={value.length === 0}
            showCursor={!loading && cursorPoint.line === lineIndex}
            cursorColumn={cursorPoint.column}
          />
        </Box>
      ))}
    </Box>
  );
}

function InputLineText({
  line,
  isPlaceholder,
  showCursor,
  cursorColumn,
}: {
  line: string;
  isPlaceholder: boolean;
  showCursor: boolean;
  cursorColumn: number;
}): React.ReactElement {
  if (!showCursor) {
    return <Text dimColor={isPlaceholder}>{line}</Text>;
  }

  const before = line.slice(0, cursorColumn);
  const after = line.slice(cursorColumn);
  return (
    <>
      {before && <Text dimColor={isPlaceholder}>{before}</Text>}
      <Text dimColor>│</Text>
      {after && <Text>{after}</Text>}
    </>
  );
}

function ModeFooter({
  permissionMode,
  model,
  expandedOutput,
  usage,
}: {
  permissionMode: PermissionMode;
  model: string;
  expandedOutput: boolean;
  usage: Usage;
}): React.ReactElement {
  const left = formatPermissionMode(permissionMode);
  const expanded = expandedOutput ? " · expanded" : "";
  const requestedUsageText = formatUsageStatus(model, usage);
  const right = getEffortStatus(model);
  const columns = Math.max(30, process.stdout.columns || 80);
  const leftWidth = stringWidth(left) + stringWidth(expanded);
  const rightWidth = stringWidth(right);
  const separatorWidth = left || expanded ? 2 : 0;
  const availableForUsage = Math.max(0, columns - leftWidth - rightWidth - separatorWidth - 1);
  const usageText = availableForUsage <= 0
    ? ""
    : left && stringWidth(requestedUsageText) > availableForUsage
      ? ""
      : truncateToWidth(requestedUsageText, availableForUsage);
  const gap = Math.max(
    1,
    columns - leftWidth - rightWidth - separatorWidth - stringWidth(usageText),
  );

  return (
    <Box>
      <Text color={permissionMode === "bypassPermissions" ? "error" : undefined}>
        {left}
      </Text>
      <Text dimColor>{expanded}</Text>
      {usageText && <Text dimColor>{left || expanded ? "  " : ""}{usageText}</Text>}
      <Text dimColor>{" ".repeat(gap)}</Text>
      <Text dimColor>{right}</Text>
    </Box>
  );
}

function truncateLine(value: string, max: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1)}…`;
}

function insertInputText(
  value: string,
  input: string,
  cursor: number,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setCursor: React.Dispatch<React.SetStateAction<number>>,
): void {
  const safeCursor = clamp(cursor, 0, input.length);
  setInput(`${input.slice(0, safeCursor)}${value}${input.slice(safeCursor)}`);
  setCursor(safeCursor + value.length);
}

function removeInputText(
  direction: "before" | "after",
  input: string,
  cursor: number,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setCursor: React.Dispatch<React.SetStateAction<number>>,
): void {
  const safeCursor = clamp(cursor, 0, input.length);
  if (direction === "before") {
    if (safeCursor === 0) return;
    setInput(`${input.slice(0, safeCursor - 1)}${input.slice(safeCursor)}`);
    setCursor(safeCursor - 1);
    return;
  }

  if (safeCursor >= input.length) return;
  setInput(`${input.slice(0, safeCursor)}${input.slice(safeCursor + 1)}`);
  setCursor(safeCursor);
}

function getCursorPoint(value: string, cursor: number): { line: number; column: number } {
  const safeCursor = clamp(cursor, 0, value.length);
  const beforeCursor = value.slice(0, safeCursor);
  const lines = beforeCursor.split("\n");
  return {
    line: lines.length - 1,
    column: lines[lines.length - 1]?.length ?? 0,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function cyclePermissionMode(mode: PermissionMode): PermissionMode {
  switch (mode) {
    case "default":
      return "acceptEdits";
    case "acceptEdits":
      return "plan";
    case "plan":
      return "bypassPermissions";
    case "bypassPermissions":
    case "dontAsk":
      return "default";
  }
}

function formatPermissionMode(mode: PermissionMode): string {
  if (mode === "bypassPermissions") return "⏵⏵ bypass permissions on (shift+tab to cycle)";
  if (mode === "acceptEdits") return "⏵ accept edits on (shift+tab to cycle)";
  if (mode === "plan") return "⏸ plan mode on (shift+tab to cycle)";
  return "";
}

function formatUsageStatus(model: string, usage: Usage): string {
  const contextLimit = 200_000;
  const inputTokens = usage.input_tokens ?? 0;
  const percent = Math.min(100, Math.max(0, Math.round((inputTokens / contextLimit) * 100)));
  return `${model} | Context ${percent}% (${inputTokens}/${formatTokenLimit(contextLimit)}) |`;
}

function formatTokenLimit(value: number): string {
  return `${(value / 1000).toFixed(1)}k`;
}

function helpCommandText(): string {
  return [
    "Available commands:",
    "/clear, /compact, /cost, /doctor, /feedback, /help, /init, /mcp, /model, /permissions, /release-notes, /resume",
    "Shortcuts: Ctrl+C interrupt/exit, Ctrl+O expand tool output, Shift+Enter newline, Shift+Tab cycle permissions.",
  ].join("\n");
}

const SLASH_COMMANDS = [
  "/clear",
  "/compact",
  "/cost",
  "/doctor",
  "/feedback",
  "/help",
  "/init",
  "/mcp",
  "/model",
  "/permissions",
  "/release-notes",
  "/resume",
];

function completeSlashCommand(input: string): string | null {
  const matches = getSlashCommandMatches(input);
  if (matches.length === 1) return `${matches[0]} `;
  return null;
}

function getSlashCommandMatches(input: string): string[] {
  return [...SLASH_COMMANDS, ...listCustomSlashCommandNames()]
    .filter(command => command.startsWith(input))
    .sort((a, b) => a.localeCompare(b));
}

function slashCommandDescription(command: string): string {
  switch (command) {
    case "/clear":
      return "clear conversation";
    case "/compact":
      return "save compact checkpoint";
    case "/cost":
      return "show usage";
    case "/doctor":
      return "check environment";
    case "/feedback":
      return "share feedback";
    case "/help":
      return "show help";
    case "/init":
      return "create CLAUDE.md";
    case "/mcp":
      return "configure MCP";
    case "/model":
      return "show model";
    case "/permissions":
      return "show permission mode";
    case "/release-notes":
      return "show release notes";
    case "/resume":
      return "resume session";
    default:
      return "custom command";
  }
}

function loadCustomSlashCommand(command: string, argumentText: string): string | null {
  const commandName = command.replace(/^\//u, "");
  if (!commandName || commandName.includes("/") || commandName.includes("..")) return null;

  for (const dir of getCustomSlashCommandDirs()) {
    const filePath = join(dir, `${commandName}.md`);
    if (!existsSync(filePath)) continue;
    const template = readFileSync(filePath, "utf8");
    return template.replace(/\$ARGUMENTS/g, argumentText).trim();
  }

  return null;
}

function listCustomSlashCommandNames(): string[] {
  const names = new Set<string>();
  for (const dir of getCustomSlashCommandDirs()) {
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      if (!entry.endsWith(".md")) continue;
      names.add(`/${entry.slice(0, -3)}`);
    }
  }
  return [...names].sort();
}

function getCustomSlashCommandDirs(): string[] {
  return [
    join(process.cwd(), ".claude", "commands"),
    join(homedir(), ".claude", "commands"),
  ];
}

function previousWordBoundary(value: string, cursor: number): number {
  let index = clamp(cursor, 0, value.length);
  while (index > 0 && /\s/u.test(value[index - 1] || "")) index--;
  while (index > 0 && !/\s/u.test(value[index - 1] || "")) index--;
  return index;
}

function nextWordBoundary(value: string, cursor: number): number {
  let index = clamp(cursor, 0, value.length);
  while (index < value.length && !/\s/u.test(value[index] || "")) index++;
  while (index < value.length && /\s/u.test(value[index] || "")) index++;
  return index;
}

function saveCurrentSession(id: string, history: ApiMessage[], permissionMode: PermissionMode): void {
  saveSession({
    id,
    title: history.find(message => message.role === "user" && typeof message.content === "string")?.content as string | undefined,
    messages: history.map((message, index) => ({
      role: message.role,
      content: message.content,
      timestamp: Date.now() - (history.length - index),
    })),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    permissionMode,
  });
}

function initializeClaudeMd(): string {
  const filePath = join(process.cwd(), "CLAUDE.md");
  if (existsSync(filePath)) {
    return `CLAUDE.md already exists: ${filePath}`;
  }

  writeFileSync(
    filePath,
    [
      "# CLAUDE.md",
      "",
      "This file provides guidance to Claude Code when working in this repository.",
      "",
      "## Project Notes",
      "",
      "- Review the repository structure before editing.",
      "- Prefer existing project conventions over new abstractions.",
      "- Run the relevant build and tests after changes.",
      "",
    ].join("\n"),
    "utf8",
  );
  return `Created CLAUDE.md: ${filePath}`;
}

function rebuildChatMessagesFromSession(
  messages: Array<{ role: ApiMessage["role"]; content: ApiMessageContent; timestamp: number }>,
): ChatMessage[] {
  return messages
    .map((message, index): ChatMessage | null => {
      if (message.role === "user") {
        if (typeof message.content === "string") {
          return { id: `resume-user-${index}`, role: "user", content: message.content };
        }
        if (message.content.every(block => block.type === "tool_result")) {
          return null;
        }
      }

      if (message.role === "assistant" && Array.isArray(message.content)) {
        const text = message.content
          .filter((block): block is { type: "text"; text: string } => block.type === "text")
          .map(block => block.text)
          .join("");
        const toolUses = message.content
          .filter((block): block is { type: "tool_use"; id: string; name: string; input: Record<string, unknown> } => block.type === "tool_use")
          .map(block => ({ id: block.id, name: block.name, input: block.input, result: "Restored from session" }));
        return { id: `resume-assistant-${index}`, role: "assistant", content: text, toolUses };
      }

      return null;
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

function readStdin(): Promise<string> {
  return new Promise(resolve => {
    let text = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => {
      text += chunk;
    });
    process.stdin.on("end", () => resolve(text));
  });
}

function getUserFacingToolName(name: string): string {
  if (name === "LS") return "List";
  if (name === "Glob" || name === "Grep") return "Search";
  if (name === "MultiEdit") return "Edit";
  if (name === "TodoWrite") return "Update Todos";
  if (name === "WebFetch") return "Fetch";
  if (name === "BashOutput") return "Bash Output";
  if (name === "KillBash") return "Kill Bash";
  if (name === "NotebookEdit") return "Edit Notebook";
  if (name === "WebSearch") return "Web Search";
  return name;
}

function formatToolUseMessage(name: string, input: Record<string, unknown>): string {
  if (name === "Bash" && typeof input.command === "string") {
    return truncateMultiline(input.command, 160);
  }
  if ((name === "BashOutput" || name === "KillBash") && typeof input.bash_id === "string") {
    return input.bash_id;
  }
  if (name === "Read" && typeof input.file_path === "string") {
    return truncateLine(input.file_path, 120);
  }
  if (name === "LS" && typeof input.path === "string") {
    return truncateLine(input.path, 120);
  }
  if ((name === "Glob" || name === "Grep") && typeof input.pattern === "string") {
    const parts = [`pattern: "${input.pattern}"`];
    if (typeof input.path === "string") parts.push(`path: "${input.path}"`);
    return truncateLine(parts.join(", "), 160);
  }
  if ((name === "Write" || name === "Edit" || name === "MultiEdit") && typeof input.file_path === "string") {
    return truncateLine(input.file_path, 120);
  }
  if (name === "TodoWrite" && Array.isArray(input.todos)) {
    return `${input.todos.length} ${pluralize(input.todos.length, "todo", "todos")}`;
  }
  if (name === "WebFetch" && typeof input.url === "string") {
    return truncateLine(input.url, 160);
  }
  if (name === "WebSearch" && typeof input.query === "string") {
    return truncateLine(input.query, 160);
  }
  if (name === "Task" && typeof input.description === "string") {
    return truncateLine(input.description, 160);
  }
  if (name === "NotebookEdit" && typeof input.notebook_path === "string") {
    return truncateLine(input.notebook_path, 120);
  }
  return "";
}

function trimRightLines(value: string): string {
  return value
    .split("\n")
    .map(line => line.replace(/\s+$/u, ""))
    .join("\n")
    .replace(/\n+$/u, "");
}

function truncateMultiline(value: string, max: number): string {
  const lines = value.trim().split("\n");
  const shortened = lines.length > 2 ? `${lines.slice(0, 2).join(" ")}…` : lines.join(" ");
  return truncateLine(shortened, max);
}

function stripToolUseErrorTags(value: string): string {
  const match = value.match(/<tool_use_error>([\s\S]*?)<\/tool_use_error>/u);
  return match?.[1]?.trim() || value;
}

function stripUnderlineAnsi(value: string): string {
  return value.replace(
    // eslint-disable-next-line no-control-regex
    /\u001b\[([0-9]+;)*4(;[0-9]+)*m|\u001b\[4(;[0-9]+)*m|\u001b\[([0-9]+;)*4m/gu,
    "",
  );
}

function formatTerminalOutput(value: string): string {
  const trimmed = value.trim();
  if (/data:image\/[a-z0-9.+-]+;base64,/iu.test(trimmed)) {
    return "[Image data]";
  }
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return value;
  try {
    return JSON.stringify(JSON.parse(trimmed), null, 2);
  } catch {
    return value;
  }
}

function firstResultLine(value: string): string {
  return value.split("\n").find(line => line.trim())?.trim() || "";
}

function countResultLines(value: string): number {
  const trimmed = value.trimEnd();
  if (!trimmed) return 0;
  return trimmed.split("\n").length;
}

function isEmptySearchResult(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === "" || normalized === "(no matches)";
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

const MAX_LINES_TO_SHOW = 3;
const PADDING_TO_PREVENT_OVERFLOW = 10;

function renderTruncatedContent(content: string, terminalWidth: number): string {
  const trimmedContent = content.trimEnd();
  if (!trimmedContent) return "";

  const wrapWidth = Math.max(terminalWidth - PADDING_TO_PREVENT_OVERFLOW, 10);
  const maxChars = MAX_LINES_TO_SHOW * wrapWidth * 4;
  const preTruncated = trimmedContent.length > maxChars;
  const contentForWrapping = preTruncated ? trimmedContent.slice(0, maxChars) : trimmedContent;
  const { aboveTheFold, remainingLines } = wrapText(contentForWrapping, wrapWidth);
  const estimatedRemaining = preTruncated
    ? Math.max(remainingLines, Math.ceil(stringWidth(trimmedContent) / wrapWidth) - MAX_LINES_TO_SHOW)
    : remainingLines;

  return [
    aboveTheFold,
    estimatedRemaining > 0 ? `… +${estimatedRemaining} lines (ctrl+o to expand)` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function wrapText(text: string, wrapWidth: number): { aboveTheFold: string; remainingLines: number } {
  const wrappedLines: string[] = [];

  for (const line of text.split("\n")) {
    if (stringWidth(line) <= wrapWidth) {
      wrappedLines.push(line.trimEnd());
      continue;
    }

    let chunk = "";
    for (const char of line) {
      const next = `${chunk}${char}`;
      if (chunk && stringWidth(next) > wrapWidth) {
        wrappedLines.push(chunk.trimEnd());
        chunk = char;
      } else {
        chunk = next;
      }
    }
    if (chunk) wrappedLines.push(chunk.trimEnd());
  }

  const remainingLines = wrappedLines.length - MAX_LINES_TO_SHOW;
  if (remainingLines === 1) {
    return {
      aboveTheFold: wrappedLines.slice(0, MAX_LINES_TO_SHOW + 1).join("\n").trimEnd(),
      remainingLines: 0,
    };
  }

  return {
    aboveTheFold: wrappedLines.slice(0, MAX_LINES_TO_SHOW).join("\n").trimEnd(),
    remainingLines: Math.max(0, remainingLines),
  };
}
