import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Link, NoSelect, Ratchet, Text, stringWidth, useAnimationFrame, useApp, useInput } from "@anthropic/ink";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { homedir } from "os";
import { isAbsolute, join, relative, resolve } from "path";
import { getApiConfig, streamMessage, type ApiMessage, type ApiMessageContent, type Usage } from "../api/client.js";
import {
  TenguSession,
  type PermissionDecision,
  type SpinnerMode,
  type SubagentExecutionRequest,
  type SubagentExecutionResult,
  type TenguLoopEvent,
  type ToolDisplay,
  type ToolProgressDisplay,
} from "../agent/tengu.js";
import { createSettingsHookRunner } from "../hooks/runner.js";
import { PermissionHandler, type PermissionBehavior, type PermissionMode } from "../permissions/handler.js";
import {
  backgroundForegroundBashTasks,
  executeTool,
  FILE_UNCHANGED_STUB,
  getToolDefs,
  hasForegroundBashTasks,
  listBackgroundTasks,
  readBackgroundTaskOutput,
  stopBackgroundTask,
  type BackgroundTaskSummary,
} from "../tools/registry.js";
import { createSession, listSessions, loadSession, saveSession, type SessionData } from "../session/store.js";
import { addCodeChangesToCostState, addUsageToCostState, createEmptyCostState, formatCostSummary } from "../core/cost.js";
import { sanitizeAssistantText } from "../core/protocol.js";
import type { CliOptions } from "../index.js";
import {
  createAnsiTextLines,
  hasAnsiSequences,
  stripAnsiSequences,
  type AnsiTextLine,
  type AnsiTextSegment,
} from "./ansi.js";
import { StartupScreen, getEffortStatus, getPromptPlaceholder } from "./startup-screen.js";

type Role = "startup" | "user" | "assistant" | "system";

type ToolRender = {
  id: string;
  name: string;
  input: Record<string, unknown>;
  inputPreview?: string;
  startedAt?: number;
  progress?: ToolProgressDisplay;
  result?: string;
  isError?: boolean;
  display?: ToolDisplay;
};

type AgentProgressEntry = NonNullable<Extract<ToolProgressDisplay, { type: "agent_progress" }>["entries"]>[number];
type ToolRenderItem =
  | { type: "tool"; tool: ToolRender }
  | { type: "agent_group"; tools: ToolRender[] };

type AgentGroupStat = {
  id: string;
  agentType: string;
  description?: string;
  toolUseCount: number;
  tokens: number | null;
  isResolved: boolean;
  isError: boolean;
  isAsync: boolean;
  lastToolInfo: string | null;
  output: string;
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

type BackgroundTaskActionResult = {
  taskId: string;
  action: "output" | "stop";
  content: string;
  isError?: boolean;
  pending?: boolean;
};

type SendOptions = { appendUserMessage?: boolean };
type AnimationFrameRef = ReturnType<typeof useAnimationFrame>[0];
const TRANSCRIPT_RESERVED_ROWS = 6;

type ClaudeCodeTuiProps = {
  version: string;
  initialPrompt?: string;
  bypassPermissions?: boolean;
  modelOverride?: string;
  resumeSessionId?: string;
  continueSession?: boolean;
  initialPermissionMode?: PermissionMode;
};

export function ClaudeCodeTui({
  version,
  initialPrompt,
  bypassPermissions,
  modelOverride,
  resumeSessionId,
  continueSession,
  initialPermissionMode,
}: ClaudeCodeTuiProps): React.ReactElement {
  useApp();
  const cfg = getApiConfig();
  const initialModel = modelOverride || cfg?.model || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const [model, setModel] = useState(initialModel);
  const modelRef = useRef(initialModel);
  const permissionHandler = useMemo(() => new PermissionHandler(), []);
  const [permissionMode, setPermissionMode] = useState<PermissionMode>(
    bypassPermissions ? "bypassPermissions" : initialPermissionMode || permissionHandler.getMode(),
  );
  const initialPromptText = useMemo(() => initialPrompt?.trim() || "", [initialPrompt]);
  const restoredSession = useMemo(
    () => resolveInitialSession(resumeSessionId, Boolean(continueSession)),
    [continueSession, resumeSessionId],
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    [
      ...(restoredSession?.session ? [] : [createStartupMessage()]),
      ...(restoredSession?.messages || []),
      ...(restoredSession?.error
        ? [{ id: "restore-error", role: "system" as const, content: restoredSession.error }]
        : []),
      ...(initialPromptText
        ? [
            {
              id: "user-initial",
              role: "user" as const,
              content: initialPromptText,
            },
          ]
        : []),
    ],
  );
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(0);
  const [streaming, setStreaming] = useState("");
  const [streamMode, setStreamMode] = useState<SpinnerMode>("responding");
  const [loading, setLoading] = useState(false);
  const [permissionPrompt, setPermissionPrompt] = useState<PermissionPrompt | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [expandedOutput, setExpandedOutput] = useState(false);
  const [backgroundTasksVisible, setBackgroundTasksVisible] = useState(false);
  const [selectedBackgroundTaskIndex, setSelectedBackgroundTaskIndex] = useState(0);
  const [backgroundTaskResult, setBackgroundTaskResult] = useState<BackgroundTaskActionResult | null>(null);
  const [usage, setUsage] = useState<Usage>({});
  const [costState, setCostState] = useState(createEmptyCostState);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const sessionRef = useRef(restoredSession?.session || createSession(initialPromptText || process.cwd()));
  const initialPromptSent = useRef(false);
  const restoredHydrated = useRef(false);
  const subagentSeqRef = useRef(1);
  const apiRequestStartedAt = useRef<number | null>(null);
  const hookRunner = useMemo(() => createSettingsHookRunner(), []);

  const terminalRows = Math.max(20, process.stdout.rows || 40);
  const visibleMessages = useMemo(
    () => getVisibleMessages(messages, expandedOutput, terminalRows),
    [expandedOutput, messages, terminalRows],
  );
  const visibleStreaming = useMemo(() => sanitizeAssistantText(streaming), [streaming]);
  const isEmptySession = messages.every(message => message.role === "startup") && !loading && !visibleStreaming;
  const slashCommandMatches = useMemo(() => (
    input.startsWith("/") && !input.includes(" ")
      ? getSlashCommandMatches(input).slice(0, 8)
      : []
  ), [input]);

  useEffect(() => {
    permissionHandler.setMode(permissionMode);
  }, [permissionHandler, permissionMode]);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  const pushSystemMessage = useCallback((content: string): void => {
    setMessages(previous => [
      ...previous,
      { id: `system-${Date.now()}-${previous.length}`, role: "system", content },
    ]);
  }, []);

  const showBackgroundTaskOutput = useCallback((taskId: string): void => {
    setBackgroundTaskResult({
      taskId,
      action: "output",
      content: "Loading task output…",
      pending: true,
    });
    void readBackgroundTaskOutput(taskId)
      .then(result => {
        setBackgroundTaskResult({
          taskId,
          action: "output",
          content: result.content,
          isError: result.isError,
        });
      })
      .catch(error => {
        setBackgroundTaskResult({
          taskId,
          action: "output",
          content: error instanceof Error ? error.message : String(error),
          isError: true,
        });
      });
  }, []);

  const stopManagedBackgroundTask = useCallback((taskId: string): void => {
    setBackgroundTaskResult({
      taskId,
      action: "stop",
      content: "Stopping task…",
      pending: true,
    });
    void stopBackgroundTask(taskId)
      .then(result => {
        setBackgroundTaskResult({
          taskId,
          action: "stop",
          content: result.content,
          isError: result.isError,
        });
      })
      .catch(error => {
        setBackgroundTaskResult({
          taskId,
          action: "stop",
          content: error instanceof Error ? error.message : String(error),
          isError: true,
        });
      });
  }, []);

  const openBackgroundTasksPanel = useCallback((): void => {
    const tasks = listBackgroundTasks();
    setSelectedBackgroundTaskIndex(current => clamp(current, 0, Math.max(0, tasks.length - 1)));
    setBackgroundTaskResult(null);
    setBackgroundTasksVisible(true);
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
      source: restoredSession?.source || "startup",
      cwd: process.cwd(),
      session_id: sessionRef.current.id,
      permission_mode: permissionMode,
    }).then(emitHookOutcome).catch(error => {
      pushSystemMessage(error instanceof Error ? error.message : String(error));
    });
  }, [emitHookOutcome, hookRunner, permissionMode, pushSystemMessage, restoredSession?.source]);

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
          toolUses: toolUses.map((existing, index) => {
            if (index !== existingIndex) return existing;
            const hasFullInput = Object.keys(tool.input).length > 0;
            return {
              ...existing,
              ...tool,
              name: tool.name || existing.name,
              input: hasFullInput ? tool.input : existing.input,
              inputPreview: hasFullInput ? tool.inputPreview : tool.inputPreview ?? existing.inputPreview,
            };
          }),
        };
      });
      return found ? next : [...next, { id: messageId, role: "assistant", content: "", toolUses: [tool] }];
    });
  }, []);

  const handleAgentEvent = useCallback((event: TenguLoopEvent): void => {
    if (event.type === "api_request") {
      apiRequestStartedAt.current = Date.now();
      return;
    }

    if (event.type === "stream_mode") {
      setStreamMode(event.mode);
      return;
    }

    if (event.type === "assistant_start") {
      setStreamMode("requesting");
      setMessages(previous => [
        ...previous,
        { id: event.assistantId, role: "assistant", content: "", toolUses: [] },
      ]);
      return;
    }

    if (event.type === "assistant_text_delta") {
      setStreamMode("responding");
      setStreaming(sanitizeAssistantText(event.fullText));
      return;
    }

    if (event.type === "tool_input_start") {
      setStreamMode("tool-input");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
      });
      return;
    }

    if (event.type === "tool_input_delta") {
      setStreamMode("tool-input");
      upsertToolRender(event.assistantId, {
        id: event.toolUseId,
        name: "",
        input: {},
        inputPreview: event.fullInputJson,
      });
      return;
    }

    if (event.type === "assistant_complete") {
      setStreaming("");
      setStreamMode(event.content.some(block => block.type === "tool_use") ? "tool-use" : "responding");
      const apiDurationMs = apiRequestStartedAt.current === null ? 0 : Date.now() - apiRequestStartedAt.current;
      apiRequestStartedAt.current = null;
      if (event.usage) {
        setUsage(current => ({ ...current, ...event.usage }));
        setCostState(current => addUsageToCostState(current, modelRef.current, event.usage!, apiDurationMs));
      }
      setMessages(previous => {
        let found = false;
        const text = sanitizeAssistantText(event.text);
        const next = previous.map(message => {
          if (message.id !== event.assistantId) return message;
          found = true;
          return { ...message, content: text };
        });
        return found
          ? next
          : [...next, { id: event.assistantId, role: "assistant", content: text, toolUses: [] }];
      });
      return;
    }

    if (event.type === "tool_start") {
      setStreamMode("tool-use");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
        startedAt: Date.now(),
      });
      return;
    }

    if (event.type === "tool_result") {
      setStreamMode("tool-use");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
        result: event.result.content,
        isError: event.result.is_error,
        display: event.display,
      });
      if (!event.result.is_error && event.display?.type === "edit") {
        const changes = countDiffLineChanges(event.display.diff);
        if (changes.added || changes.removed) {
          setCostState(current => addCodeChangesToCostState(current, changes.added, changes.removed));
        }
      }
      return;
    }

    if (event.type === "tool_progress") {
      setStreamMode("tool-use");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
        progress: event.progress,
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
    () => {
      const createRunSubagent = (
        parentContext: { emitProgress?: (progress: ToolProgressDisplay) => void | Promise<void> } | undefined,
      ) => async (
        request: SubagentExecutionRequest,
        signal?: AbortSignal,
      ): Promise<SubagentExecutionResult> => {
        const agentId = request.agentId || `${request.parentToolUseId}-agent-${subagentSeqRef.current++}`;
        const startedAt = Date.now();
        let totalToolUseCount = 0;
        const entries = new Map<string, AgentProgressEntry>();
        const emitAgentProgress = async (progress: {
          message: string;
          toolName?: string;
        }): Promise<void> => {
          await parentContext?.emitProgress?.({
            type: "agent_progress",
            agentId,
            description: request.description,
            message: progress.message,
            elapsedTimeSeconds: elapsedSecondsSince(startedAt),
            totalToolUseCount,
            ...(progress.toolName ? { toolName: progress.toolName } : {}),
            entries: [...entries.values()],
          });
        };
        const childSession = new TenguSession({
          tools: getToolDefs().filter(tool => tool.name !== "Task"),
          stream: (history, tools, childSignal) => streamMessage(history, undefined, tools, undefined, childSignal, modelRef.current),
          executeTool: (name, input, childSignal, childContext) => executeTool(name, input, childSignal, {
            ...childContext,
            sessionId: sessionRef.current.id,
            cwd: sessionRef.current.cwd || process.cwd(),
          }),
          checkPermission: tool =>
            permissionHandler.checkPermission({
              toolName: tool.name,
              toolUseID: tool.id,
              input: tool.input,
            }),
          requestPermission,
          runHooks: hookRunner,
          onEvent: async event => {
            if (event.type === "tool_start") {
              totalToolUseCount++;
              entries.set(event.tool.id, {
                toolUseId: event.tool.id,
                toolName: event.tool.name,
                input: event.tool.input,
                status: "running",
              });
              await emitAgentProgress({
                message: `Using ${getUserFacingToolName(event.tool.name)}`,
                toolName: event.tool.name,
              });
            }
            if (event.type === "tool_result") {
              const existing = entries.get(event.tool.id) || {
                toolUseId: event.tool.id,
                toolName: event.tool.name,
                input: event.tool.input,
                status: "running" as const,
              };
              entries.set(event.tool.id, {
                ...existing,
                status: event.result.is_error ? "failed" : "completed",
                summary: summarizeSubagentToolResult(event.tool.name, event.result.content, event.display),
              });
              await emitAgentProgress({
                message: `${getUserFacingToolName(event.tool.name)} ${event.result.is_error ? "failed" : "done"}`,
                toolName: event.tool.name,
              });
            }
            if (event.type === "assistant_text_delta" && event.fullText.trim()) {
              await emitAgentProgress({ message: "Responding" });
            }
          },
        });
        try {
          const result = await childSession.runUserTurn(request.prompt);
          return {
            agentId,
            status: "completed",
            content: result.text,
            totalDurationMs: Date.now() - startedAt,
            totalTokens: usageTokenCount(result.usage),
            totalToolUseCount: countToolUsesInMessages(result.messages),
          };
        } catch (error) {
          return createFailedSubagentResult(agentId, error, startedAt, totalToolUseCount);
        }
      };

      return new TenguSession({
        tools: getToolDefs(),
        stream: (history, tools, signal) => streamMessage(history, undefined, tools, undefined, signal, modelRef.current),
        executeTool: (name, input, signal, context) => executeTool(name, input, signal, {
          ...context,
          sessionId: sessionRef.current.id,
          cwd: sessionRef.current.cwd || process.cwd(),
          runSubagent: createRunSubagent(context),
        }),
        checkPermission: tool =>
          permissionHandler.checkPermission({
            toolName: tool.name,
            toolUseID: tool.id,
            input: tool.input,
        }),
        requestPermission,
        runHooks: hookRunner,
        onEvent: handleAgentEvent,
      });
    },
    [handleAgentEvent, hookRunner, permissionHandler, requestPermission],
  );

  const handleSlashCommand = useCallback(
    (commandLine: string): true | string => {
      const [command = "", ...args] = commandLine.trim().split(/\s+/u);
      const argumentText = args.join(" ");

      switch (command) {
        case "/clear":
          agentSession.reset();
          setMessages([createStartupMessage()]);
          setStreaming("");
          setUsage({});
          setCostState(createEmptyCostState());
          setBackgroundTasksVisible(false);
          setSelectedBackgroundTaskIndex(0);
          setBackgroundTaskResult(null);
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
          if (argumentText) {
            modelRef.current = argumentText;
            setModel(argumentText);
            setUsage({});
            pushSystemMessage(`Model set to ${argumentText}`);
          } else {
            pushSystemMessage(`Current model: ${model}`);
          }
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
          pushSystemMessage(formatCostSummary(costState));
          return true;

        case "/tasks":
          if (!argumentText) {
            openBackgroundTasksPanel();
            return true;
          }
          void runTasksSlashCommand(argumentText)
            .then(pushSystemMessage)
            .catch(error => pushSystemMessage(error instanceof Error ? error.message : String(error)));
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
          saveCurrentSession(sessionRef.current, agentSession.history, permissionMode);
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
    [agentSession, cfg, costState, emitHookOutcome, hookRunner, model, openBackgroundTasksPanel, permissionMode, pushSystemMessage],
  );

  const send = useCallback(
    async (text: string, options: SendOptions = {}) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (loading) {
        if (trimmed === "/tasks") {
          openBackgroundTasksPanel();
          setInput("");
          setCursor(0);
        }
        return;
      }
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
      setBackgroundTasksVisible(false);
      setBackgroundTaskResult(null);
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
      setStreamMode("requesting");

      try {
        await agentSession.runUserTurn(promptForAgent);
        saveCurrentSession(sessionRef.current, agentSession.history, permissionMode);
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
        setStreamMode("responding");
      }
    },
    [agentSession, emitHookOutcome, handleSlashCommand, hookRunner, loading, openBackgroundTasksPanel, permissionMode],
  );

  useEffect(() => {
    if (!restoredSession?.session || restoredHydrated.current) return;
    restoredHydrated.current = true;
    agentSession.hydrate(
      restoredSession.session.messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
    );
  }, [agentSession, restoredSession?.session]);

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
        setStreamMode("responding");
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

    if (key.ctrl && (value === "b" || value === "B")) {
      if (loading && hasForegroundBashTasks()) {
        backgroundForegroundBashTasks();
        return;
      }
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

    if (backgroundTasksVisible) {
      const tasks = listBackgroundTasks();
      const selectedTask = tasks[clamp(selectedBackgroundTaskIndex, 0, Math.max(0, tasks.length - 1))];

      if (key.escape) {
        setBackgroundTasksVisible(false);
        return;
      }

      if (key.upArrow) {
        setSelectedBackgroundTaskIndex(current => Math.max(0, current - 1));
        setBackgroundTaskResult(null);
        return;
      }

      if (key.downArrow) {
        setSelectedBackgroundTaskIndex(current => Math.min(Math.max(0, tasks.length - 1), current + 1));
        setBackgroundTaskResult(null);
        return;
      }

      if ((key.return || value === "\r" || value === "\n" || value === "o" || value === "O") && selectedTask) {
        showBackgroundTaskOutput(selectedTask.id);
        return;
      }

      if ((value === "s" || value === "S" || value === "k" || value === "K") && selectedTask) {
        stopManagedBackgroundTask(selectedTask.id);
        return;
      }

      if (value === "r" || value === "R") {
        setBackgroundTaskResult(null);
        return;
      }
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

    if (key.downArrow && historyIndex === null && input.trim() === "") {
      openBackgroundTasksPanel();
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

    const normalizedIncoming = value.replace(/\r\n?/gu, "\n");
    if (!key.ctrl && normalizedIncoming.includes("\n") && !(key as { shift?: boolean }).shift) {
      const textBeforeReturn = normalizedIncoming.split("\n")[0] || "";
      const safeCursor = clamp(cursor, 0, input.length);
      const nextInput = `${input.slice(0, safeCursor)}${textBeforeReturn}${input.slice(safeCursor)}`;
      setBackgroundTasksVisible(false);
      void send(nextInput);
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
      setBackgroundTasksVisible(false);
      insertInputText(value.replace(/\r\n?/gu, "\n"), input, cursor, setInput, setCursor);
    }
  });

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box flexDirection="column" minHeight={1}>
        {visibleMessages.map(message => (
          <MessageView key={message.id} message={message} expandedOutput={expandedOutput} version={version} model={model} />
        ))}
        {visibleStreaming && <AssistantStreaming text={visibleStreaming} />}
        {loading && !visibleStreaming && <OfficialSpinner mode={streamMode} marginTop={messages.length > 0 ? 1 : 0} />}
      </Box>
      {feedbackVisible && <FeedbackPrompt />}
      {permissionPrompt && <PermissionPromptView prompt={permissionPrompt} />}
      {backgroundTasksVisible && (
        <BackgroundTasksPanel
          tasks={listBackgroundTasks()}
          selectedIndex={selectedBackgroundTaskIndex}
          result={backgroundTaskResult}
        />
      )}
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
    const permissionMode = options.bypassPermissions
      ? "bypassPermissions"
      : options.permissionMode || "default";
    const sessionStart = await hookRunner("SessionStart", {
      source: "startup",
      cwd: process.cwd(),
      permission_mode: permissionMode,
    });
    for (const line of [...sessionStart.notifications, ...sessionStart.additionalContext]) {
      process.stderr.write(`${line}\n`);
    }

    const promptHook = await hookRunner("UserPromptSubmit", {
      prompt,
      cwd: process.cwd(),
      permission_mode: permissionMode,
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
  else if (options.permissionMode) permissionHandler.setMode(options.permissionMode);

  const restored = resolveInitialSession(options.resumeSessionId, options.continueSession);
  let subagentSeq = 1;
  const createPrintSubagentRunner = () => async (
    request: SubagentExecutionRequest,
    signal?: AbortSignal,
  ): Promise<SubagentExecutionResult> => {
    const agentId = request.agentId || `${request.parentToolUseId}-agent-${subagentSeq++}`;
    const startedAt = Date.now();
    const childSession = new TenguSession({
      tools: getToolDefs().filter(tool => tool.name !== "Task"),
      stream: (history, tools, childSignal) => streamMessage(history, undefined, tools, undefined, childSignal, options.model),
      executeTool: (name, input, childSignal, childContext) => executeTool(name, input, childSignal, {
        ...childContext,
        sessionId: restored?.session?.id,
        cwd: restored?.session?.cwd || process.cwd(),
      }),
      checkPermission: tool =>
        permissionHandler.checkPermission({
          toolName: tool.name,
          toolUseID: tool.id,
          input: tool.input,
        }),
      requestPermission: async () => ({ behavior: "deny", message: "Permission denied" }),
      runHooks: hookRunner,
    });
    try {
      const result = await childSession.runUserTurn(request.prompt);
      return {
        agentId,
        status: "completed",
        content: result.text,
        totalDurationMs: Date.now() - startedAt,
        totalTokens: usageTokenCount(result.usage),
        totalToolUseCount: countToolUsesInMessages(result.messages),
      };
    } catch (error) {
      return createFailedSubagentResult(agentId, error, startedAt);
    }
  };

  const session = new TenguSession({
    tools: getToolDefs(),
    stream: (history, tools, signal) => streamMessage(history, undefined, tools, undefined, signal, options.model),
    executeTool: (name, input, signal, context) => executeTool(name, input, signal, {
      ...context,
      sessionId: restored?.session?.id,
      cwd: restored?.session?.cwd || process.cwd(),
      runSubagent: createPrintSubagentRunner(),
    }),
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

  if (restored?.session) {
    session.hydrate(
      restored.session.messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
    );
  } else if (restored?.error) {
    process.stderr.write(`${restored.error}\n`);
    return;
  }

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
  version,
  model,
}: {
  message: ChatMessage;
  expandedOutput: boolean;
  version: string;
  model: string;
}): React.ReactElement {
  if (message.role === "startup") {
    return <StartupScreen version={version} model={model} />;
  }

  if (message.role === "user") {
    return (
      <Box marginTop={1} backgroundColor="userMessageBackground" paddingRight={1}>
        <Text color="subtle">❯ </Text>
        <Text color="text">{message.content}</Text>
      </Box>
    );
  }

  if (message.role === "system") {
    return <SystemMessageView content={message.content} />;
  }

  const assistantContent = sanitizeAssistantText(message.content);

  return (
    <Box flexDirection="column" marginTop={1}>
      {assistantContent.trim() && (
        <MarkdownBlock content={assistantContent} prefix="● " prefixColor="text" />
      )}
      {groupToolRenderItems(message.toolUses || []).map(item => item.type === "agent_group" ? (
        <AgentGroupView key={item.tools.map(tool => tool.id).join(":")} tools={item.tools} expandedOutput={expandedOutput} />
      ) : (
        <ToolUseView key={item.tool.id} tool={item.tool} expandedOutput={expandedOutput} />
      ))}
    </Box>
  );
}

function createStartupMessage(): ChatMessage {
  return {
    id: "startup",
    role: "startup",
    content: "",
  };
}

function getVisibleMessages(messages: ChatMessage[], expandedOutput: boolean, terminalRows: number): ChatMessage[] {
  if (messages.length <= 1) return messages;
  const availableRows = Math.max(8, terminalRows - TRANSCRIPT_RESERVED_ROWS);
  const visible: ChatMessage[] = [];
  let usedRows = 0;

  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index]!;
    const rows = estimateMessageRows(message, expandedOutput);
    if (visible.length > 0 && usedRows + rows > availableRows) break;
    visible.unshift(message);
    usedRows += rows;
  }

  return visible.length > 0 ? visible : [messages[messages.length - 1]!];
}

function estimateMessageRows(message: ChatMessage, expandedOutput: boolean): number {
  if (message.role === "startup") return 12;
  if (message.role === "user") return 1 + estimateWrappedLineCount(message.content, process.stdout.columns || 80);
  if (message.role === "system") return Math.max(1, normalizeSystemMessage(message.content).split("\n").length) + 1;

  const assistantContent = sanitizeAssistantText(message.content);
  const assistantTextRows = assistantContent.trim()
    ? estimateWrappedLineCount(assistantContent, process.stdout.columns || 80) + 1
    : 1;
  const toolRows = (message.toolUses || []).reduce(
    (sum, tool) => sum + estimateToolRows(tool, expandedOutput),
    0,
  );
  return assistantTextRows + toolRows;
}

function estimateToolRows(tool: ToolRender, expandedOutput: boolean): number {
  if (tool.result === undefined) {
    if (tool.progress?.type === "agent_progress") {
      const entries = tool.progress.entries || [];
      return 2 + (expandedOutput ? entries.length : Math.min(entries.length, 6));
    }
    return 2;
  }

  if ((tool.name === "Bash" || tool.name === "BashOutput") && tool.display?.type === "bash") {
    if (!expandedOutput) return 2;
    return 2 + estimateWrappedLineCount([tool.display.stdout, tool.display.stderr].filter(Boolean).join("\n"), process.stdout.columns || 80);
  }
  if ((tool.name === "Task" || tool.name === "TaskOutput") && tool.display?.type === "agent") {
    if (!expandedOutput) return 3;
    return 2 + estimateWrappedLineCount(tool.display.content || tool.display.error || "", process.stdout.columns || 80);
  }
  if (tool.display?.type === "edit" && expandedOutput && tool.display.diff) {
    return 2 + estimateWrappedLineCount(tool.display.diff, process.stdout.columns || 80);
  }
  if (expandedOutput && (tool.name === "Glob" || tool.name === "Grep" || tool.name === "LS")) {
    return 2 + estimateWrappedLineCount(tool.result || "", process.stdout.columns || 80);
  }
  return 2;
}

function estimateWrappedLineCount(content: string, terminalWidth: number): number {
  const trimmed = content.trimEnd();
  if (!trimmed) return 0;
  const wrapWidth = Math.max(10, terminalWidth - 10);
  return trimmed.split("\n").reduce((sum, line) => {
    return sum + Math.max(1, Math.ceil(stringWidth(stripAnsiSequences(line)) / wrapWidth));
  }, 0);
}

function groupToolRenderItems(tools: ToolRender[]): ToolRenderItem[] {
  const items: ToolRenderItem[] = [];
  let pendingAgents: ToolRender[] = [];
  const flushAgents = (): void => {
    if (pendingAgents.length === 0) return;
    if (pendingAgents.length === 1) {
      items.push({ type: "tool", tool: pendingAgents[0]! });
    } else {
      items.push({ type: "agent_group", tools: pendingAgents });
    }
    pendingAgents = [];
  };

  for (const tool of tools) {
    if (isAgentToolRender(tool)) {
      pendingAgents.push(tool);
      continue;
    }
    flushAgents();
    items.push({ type: "tool", tool });
  }
  flushAgents();
  return items;
}

function isAgentToolRender(tool: ToolRender): boolean {
  return tool.name === "Task";
}

function SystemMessageView({ content }: { content: string }): React.ReactElement {
  const lines = normalizeSystemMessage(content).split("\n");
  return (
    <Box marginTop={1} flexDirection="column">
      {lines.map((line, index) => (
        <Box key={`system-${index}`}>
          <Text color="warning">{index === 0 ? "⚠ " : "  "}</Text>
          <Text color={isSystemMessageError(line) ? "error" : undefined}>{line}</Text>
        </Box>
      ))}
    </Box>
  );
}

function BackgroundTasksPanel({
  tasks,
  selectedIndex,
  result,
}: {
  tasks: BackgroundTaskSummary[];
  selectedIndex: number;
  result: BackgroundTaskActionResult | null;
}): React.ReactElement {
  const safeSelectedIndex = clamp(selectedIndex, 0, Math.max(0, tasks.length - 1));
  return (
    <Box marginTop={1} flexDirection="column">
      <Box>
        <Text color="claude">Background tasks</Text>
        <Text dimColor> (↑↓ select · Enter output · S stop · R refresh · Esc close)</Text>
      </Box>
      {tasks.length === 0 ? (
        <Text dimColor>  no job focused</Text>
      ) : (
        tasks.map((task, index) => (
          <Box key={task.id} flexDirection="column">
            <Text>
              <Text color={task.status === "failed" ? "error" : task.status === "running" ? "success" : "subtle"}>
                {index === safeSelectedIndex ? "› " : "  "}
              </Text>
              <Text bold>{task.id}</Text>
              <Text dimColor>{` ${task.kind} · ${task.status} · ${formatDurationMs(Date.now() - task.startedAt)}`}</Text>
            </Text>
            <Text dimColor>{`  ${truncateLine(task.description, 96)}`}</Text>
          </Box>
        ))
      )}
      {result ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={result.isError ? "error" : result.pending ? "subtle" : "success"}>
            {result.action === "stop" ? "Stop" : "Output"} · {result.taskId}
          </Text>
          <OutputLineView
            content={formatManagedTaskResultContent(result.content)}
            isError={result.isError}
            expanded={false}
          />
        </Box>
      ) : null}
    </Box>
  );
}

function normalizeSystemMessage(content: string): string {
  return content
    .replace(/<\/?(?:hook_error|hook_context|error)>/gu, "")
    .replace(/^Error:\s*/iu, "")
    .trimEnd();
}

function isSystemMessageError(line: string): boolean {
  return /(?:\berror\b|权限|denied|failed|not found|credentials|超长)/iu.test(line);
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

function AgentGroupView({
  tools,
  expandedOutput,
}: {
  tools: ToolRender[];
  expandedOutput: boolean;
}): React.ReactElement {
  const stats = tools.map(getAgentGroupStat);
  const anyUnresolved = stats.some(stat => !stat.isResolved);
  const anyError = stats.some(stat => stat.isError);
  const allComplete = !anyUnresolved;
  const allAsync = stats.every(stat => stat.isAsync);
  const allSameType = stats.length > 0 && stats.every(stat => stat.agentType === stats[0]?.agentType);
  const commonType = allSameType && stats[0]?.agentType !== "Agent" ? stats[0]?.agentType : null;

  return (
    <Box flexDirection="column">
      <Box>
        <Box minWidth={2}>
          <Text color={anyError ? "error" : allComplete ? "success" : undefined} dimColor={!allComplete}>⏺</Text>
        </Box>
        {allComplete ? (
          allAsync ? (
            <Text>
              <Text bold>{tools.length}</Text> background agents launched <Text dimColor>(↓ manage)</Text>
            </Text>
          ) : (
            <Text>
              <Text bold>{tools.length}</Text> {commonType ? `${commonType} agents` : "agents"} finished <Text dimColor>(ctrl+o to expand)</Text>
            </Text>
          )
        ) : (
          <Text>
            Running <Text bold>{tools.length}</Text> {commonType ? `${commonType} agents` : "agents"}… <Text dimColor>(ctrl+o to expand)</Text>
          </Text>
        )}
      </Box>
      {stats.map((stat, index) => (
        <AgentGroupLine
          key={stat.id}
          stat={stat}
          isLast={index === stats.length - 1}
          hideType={allSameType}
          expandedOutput={expandedOutput}
        />
      ))}
    </Box>
  );
}

function AgentGroupLine({
  stat,
  isLast,
  hideType,
  expandedOutput,
}: {
  stat: AgentGroupStat;
  isLast: boolean;
  hideType: boolean;
  expandedOutput: boolean;
}): React.ReactElement {
  const treeChar = isLast ? "└─" : "├─";
  const statusText = getAgentGroupStatusText(stat);
  const title = hideType ? stat.description || stat.agentType : stat.agentType;

  return (
    <Box flexDirection="column">
      <Box paddingLeft={3}>
        <Text dimColor>{treeChar} </Text>
        <Text dimColor={!stat.isResolved} color={stat.isError ? "error" : undefined}>
          <Text bold>{title}</Text>
          {!hideType && stat.description ? <Text dimColor>{` (${stat.description})`}</Text> : null}
          {!stat.isAsync ? (
            <>
              {" · "}
              {stat.toolUseCount} {stat.toolUseCount === 1 ? "tool use" : "tool uses"}
              {stat.tokens !== null ? ` · ${formatNumber(stat.tokens)} tokens` : ""}
            </>
          ) : null}
        </Text>
      </Box>
      {!stat.isAsync ? (
        <Box paddingLeft={3}>
          <Text dimColor>{isLast ? "   ⎿  " : "│  ⎿  "}</Text>
          <Text dimColor={!stat.isError} color={stat.isError ? "error" : undefined}>{statusText}</Text>
        </Box>
      ) : null}
      {expandedOutput && stat.output ? (
        <Box paddingLeft={6}>
          <OutputLineView content={stat.output} isError={stat.isError} expanded />
        </Box>
      ) : null}
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
  const displayInput = tool.inputPreview
    ? formatToolInputPreview(tool.name, tool.inputPreview)
    : formatToolUseMessage(tool.name, tool.input);
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
  const isPendingBash = tool.result === undefined && tool.name === "Bash";
  const isPendingWebSearch = tool.result === undefined && tool.name === "WebSearch";
  const isPendingTask = tool.result === undefined && tool.name === "Task";
  const [progressRef] = useAnimationFrame(isPendingBash ? 1000 : null);

  if (tool.result === undefined) {
    if (isPendingBash) {
      const progress = tool.progress?.type === "bash_progress" ? tool.progress : undefined;
      const elapsedMs = progress
        ? progress.elapsedTimeSeconds * 1000
        : tool.startedAt
          ? Date.now() - tool.startedAt
          : 0;
      const timeoutMs = getExplicitBashTimeoutMs(tool.input);
      const shouldShowElapsed = elapsedMs >= BASH_PROGRESS_THRESHOLD_MS;
      if (progress?.output.trim()) {
        return <BashProgressView progress={progress} expandedOutput={expandedOutput} progressRef={progressRef} />;
      }
      return (
        <MessageResponseView>
          <Box ref={progressRef}>
            <Text dimColor>Running…</Text>
            {shouldShowElapsed && <Text dimColor>{` ${formatShellTimeDisplay(elapsedMs, timeoutMs)}`}</Text>}
            {shouldShowElapsed && <Text dimColor> (ctrl+b to run in background)</Text>}
          </Box>
        </MessageResponseView>
      );
    }
    if (isPendingWebSearch) {
      const progress = tool.progress?.type === "web_search_progress" ? tool.progress : undefined;
      return <WebSearchProgressView progress={progress} />;
    }
    if (isPendingTask) {
      const progress = tool.progress?.type === "agent_progress" ? tool.progress : undefined;
      return <AgentProgressView progress={progress} input={tool.input} expandedOutput={expandedOutput} />;
    }
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

  if (tool.name === "WebSearch" && tool.display?.type === "web_search") {
    return <WebSearchResultView display={tool.display} expandedOutput={expandedOutput} />;
  }

  if ((tool.name === "Task" || tool.name === "TaskOutput") && tool.display?.type === "agent") {
    return <AgentResultView display={tool.display} expandedOutput={expandedOutput} />;
  }

  if ((tool.name === "Task" || tool.name === "TaskOutput") && tool.display?.type === "agent_background") {
    return <AgentBackgroundView display={tool.display} expandedOutput={expandedOutput} />;
  }

  if (tool.name === "Read") {
    if (tool.isError) {
      return (
        <MessageResponseView height={1}>
          <Text color="error">{formatReadErrorSummary(result)}</Text>
        </MessageResponseView>
      );
    }
    if (tool.display?.type === "read") {
      const count = tool.display.numLines;
      return (
        <MessageResponseView height={1}>
          <Text>
            Read <Text bold>{count}</Text> {count === 1 ? "line" : "lines"}
          </Text>
        </MessageResponseView>
      );
    }
    if (tool.display?.type === "text" && tool.display.summary === "file_unchanged") {
      return (
        <MessageResponseView height={1}>
          <Text dimColor>Unchanged since last read</Text>
        </MessageResponseView>
      );
    }
    if (result.startsWith(FILE_UNCHANGED_STUB)) {
      return (
        <MessageResponseView height={1}>
          <Text dimColor>Unchanged since last read</Text>
        </MessageResponseView>
      );
    }
    const count = countResultLines(result);
    return (
      <MessageResponseView height={1}>
        <Text>
          Read <Text bold>{count}</Text> {count === 1 ? "line" : "lines"}
        </Text>
      </MessageResponseView>
    );
  }

  if (tool.isError) {
    return <OutputLineView content={result || "Error"} isError expanded={expandedOutput} />;
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

  if (tool.name === "Write" || tool.name === "Edit" || tool.name === "MultiEdit" || tool.name === "NotebookEdit") {
    if (tool.display?.type === "edit" && expandedOutput && tool.display.diff) {
      return <DiffOutputView diff={tool.display.diff} />;
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

function AgentProgressView({
  progress,
  input,
  expandedOutput,
}: {
  progress?: Extract<ToolProgressDisplay, { type: "agent_progress" }>;
  input: Record<string, unknown>;
  expandedOutput: boolean;
}): React.ReactElement {
  const description = progress?.description || (typeof input.description === "string" ? input.description : "Agent");
  const message = progress?.message || "Initializing…";
  const toolUseCount = progress?.totalToolUseCount || 0;
  if (toolUseCount > 0) {
    const entries = progress?.entries || [];
    const visibleEntries = expandedOutput ? entries : entries.slice(-6);
    const hiddenCount = Math.max(0, entries.length - visibleEntries.length);
    return (
      <Box flexDirection="column">
        <MessageResponseView height={1}>
          <Text dimColor>
            In progress… · <Text bold>{toolUseCount}</Text> {toolUseCount === 1 ? "tool use" : "tool uses"}
            {message ? ` · ${message}` : ""}
            {expandedOutput && progress?.agentId ? ` · ${progress.agentId}` : ""}
          </Text>
        </MessageResponseView>
        {hiddenCount > 0 ? (
          <Text dimColor>{`  +${hiddenCount} more tool ${hiddenCount === 1 ? "use" : "uses"} (ctrl+o to expand)`}</Text>
        ) : null}
        {visibleEntries.map(entry => (
          <AgentProgressEntryView key={entry.toolUseId} entry={entry} />
        ))}
      </Box>
    );
  }
  return (
    <MessageResponseView height={1}>
      <Text dimColor>
        {description} · {message}
      </Text>
    </MessageResponseView>
  );
}

function AgentProgressEntryView({
  entry,
}: {
  entry: AgentProgressEntry;
}): React.ReactElement {
  const label = formatToolUseMessage(entry.toolName, entry.input);
  const color = entry.status === "failed" ? "error" : entry.status === "completed" ? "success" : undefined;
  return (
    <Box flexDirection="column">
      <Text color={color}>
        {"  "}⎿ {getUserFacingToolName(entry.toolName)}
        {label ? <Text dimColor>{`(${label})`}</Text> : null}
      </Text>
      {entry.summary ? <Text dimColor>{`    └ ${entry.summary}`}</Text> : null}
    </Box>
  );
}

function getAgentGroupStat(tool: ToolRender): AgentGroupStat {
  const progress = tool.progress?.type === "agent_progress" ? tool.progress : undefined;
  const display = tool.display;
  const agentDisplay = display?.type === "agent" ? display : undefined;
  const backgroundDisplay = display?.type === "agent_background" ? display : undefined;
  const isAsync = tool.input.run_in_background === true || backgroundDisplay !== undefined;
  const lastEntry = progress?.entries?.[progress.entries.length - 1];
  const output = agentDisplay
    ? agentDisplay.content.trim() || agentDisplay.error?.trim() || ""
    : backgroundDisplay
      ? [
          `task_id: ${backgroundDisplay.taskId}`,
          `agent_id: ${backgroundDisplay.agentId}`,
          `output_file: ${backgroundDisplay.outputFile}`,
        ].join("\n")
    : "";

  return {
    id: tool.id,
    agentType: getAgentGroupType(tool.input),
    description: typeof tool.input.description === "string" ? tool.input.description : undefined,
    toolUseCount: agentDisplay?.totalToolUseCount ?? progress?.totalToolUseCount ?? 0,
    tokens: agentDisplay?.totalTokens ?? progress?.totalTokens ?? null,
    isResolved: tool.result !== undefined,
    isError: Boolean(tool.isError || agentDisplay?.status === "failed"),
    isAsync,
    lastToolInfo: lastEntry ? formatAgentGroupLastToolInfo(lastEntry) : progress?.message || null,
    output,
  };
}

function getAgentGroupType(input: Record<string, unknown>): string {
  const subagentType = typeof input.subagent_type === "string" ? input.subagent_type : "";
  if (!subagentType || subagentType === "general-purpose" || subagentType === "worker") return "Agent";
  return subagentType;
}

function formatAgentGroupLastToolInfo(entry: AgentProgressEntry): string {
  const name = getUserFacingToolName(entry.toolName);
  if (entry.status === "running") {
    const input = formatToolUseMessage(entry.toolName, entry.input);
    return input ? `${name}: ${input}` : name;
  }
  if (entry.summary) return `${name}: ${entry.summary}`;
  return entry.status === "failed" ? `${name} failed` : `${name} done`;
}

function getAgentGroupStatusText(stat: AgentGroupStat): string {
  if (!stat.isResolved) return stat.lastToolInfo || "Initializing…";
  if (stat.isAsync) return stat.description || "Running in the background";
  if (stat.isError) return "Failed";
  return "Done";
}

function AgentResultView({
  display,
  expandedOutput,
}: {
  display: Extract<ToolDisplay, { type: "agent" }>;
  expandedOutput: boolean;
}): React.ReactElement {
  const parts = [
    display.totalToolUseCount === 1 ? "1 tool use" : `${display.totalToolUseCount} tool uses`,
    `${display.totalTokens} tokens`,
    formatDurationMs(display.totalDurationMs),
  ];
  const label = display.status === "failed" ? "Failed" : "Done";
  const output = display.content.trim() || display.error?.trim() || "";
  if (expandedOutput && output) {
    return (
      <Box flexDirection="column">
        <MessageResponseView height={1}>
          <Text color={display.status === "failed" ? "error" : undefined}>{label} ({parts.join(" · ")})</Text>
        </MessageResponseView>
        <OutputLineView content={output} isError={display.status === "failed"} expanded />
      </Box>
    );
  }
  return (
    <Box flexDirection="column">
      <MessageResponseView height={1}>
        <Text color={display.status === "failed" ? "error" : undefined}>{label} ({parts.join(" · ")})</Text>
      </MessageResponseView>
      <Text dimColor>{"  "}(ctrl+o to expand)</Text>
    </Box>
  );
}

function AgentBackgroundView({
  display,
  expandedOutput,
}: {
  display: Extract<ToolDisplay, { type: "agent_background" }>;
  expandedOutput: boolean;
}): React.ReactElement {
  return (
    <Box flexDirection="column">
      <MessageResponseView height={1}>
        <Text>
          Backgrounded agent <Text bold>{display.taskId}</Text>
          <Text dimColor>{` (${truncateLine(display.description, 48)})`}</Text>
          <Text dimColor> (↓ manage)</Text>
        </Text>
      </MessageResponseView>
      {expandedOutput ? (
        <Text dimColor>{`  output_file: ${display.outputFile}`}</Text>
      ) : null}
    </Box>
  );
}

function WebSearchProgressView({
  progress,
}: {
  progress?: Extract<ToolProgressDisplay, { type: "web_search_progress" }>;
}): React.ReactElement {
  if (progress?.stage === "search_results_received") {
    return (
      <MessageResponseView height={1}>
        <Text dimColor>
          Found {progress.resultCount ?? 0} results for "{progress.query}"
        </Text>
      </MessageResponseView>
    );
  }
  return (
    <MessageResponseView height={1}>
      <Text dimColor>Searching{progress?.query ? `: ${progress.query}` : "…"}</Text>
    </MessageResponseView>
  );
}

function WebSearchResultView({
  display,
  expandedOutput,
}: {
  display: Extract<ToolDisplay, { type: "web_search" }>;
  expandedOutput: boolean;
}): React.ReactElement {
  const timeDisplay = display.durationSeconds >= 1
    ? `${Math.round(display.durationSeconds)}s`
    : `${Math.round(display.durationSeconds * 1000)}ms`;
  if (expandedOutput && display.results.length > 0) {
    return (
      <MessageResponseView>
        <Box flexDirection="column">
          <Text>{`Did ${display.searchCount} ${pluralize(display.searchCount, "search", "searches")} in ${timeDisplay}`}</Text>
          {display.results.slice(0, 8).map((result, index) => (
            <LinkedText key={`${result.url}-${index}`} content={`- ${result.title}: ${result.url}`} dimColor />
          ))}
        </Box>
      </MessageResponseView>
    );
  }
  return (
    <MessageResponseView height={1}>
      <Text>
        Did {display.searchCount} {pluralize(display.searchCount, "search", "searches")} in {timeDisplay}
      </Text>
    </MessageResponseView>
  );
}

function BashProgressView({
  progress,
  expandedOutput,
  progressRef,
}: {
  progress: Extract<ToolProgressDisplay, { type: "bash_progress" }>;
  expandedOutput: boolean;
  progressRef: AnimationFrameRef;
}): React.ReactElement {
  const output = expandedOutput ? progress.fullOutput.trimEnd() : progress.output.trimEnd();
  const formatted = formatTerminalOutput(output);
  const extraLines = expandedOutput ? 0 : Math.max(0, progress.totalLines - 5);
  const footerParts = [
    extraLines > 0 ? `+${extraLines} ${pluralize(extraLines, "line", "lines")}` : "",
    formatShellTimeDisplay(progress.elapsedTimeSeconds * 1000, progress.timeoutMs),
    progress.totalBytes > 0 ? formatFileSize(progress.totalBytes) : "",
    "(ctrl+b to run in background)",
  ].filter(Boolean);

  return (
    <MessageResponseView>
      <Box ref={progressRef} flexDirection="column">
        {formatted && <AnsiTextBlock content={formatted} dimColor expanded />}
        <Box>
          <Text dimColor>{footerParts.join(" ")}</Text>
        </Box>
      </Box>
    </MessageResponseView>
  );
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
      <Box flexDirection="column">
        <MessageResponseView height={1}>
          <Text dimColor>{display.exitCode === 0 ? (display.noOutputExpected ? "Done" : "(No output)") : `Exit code ${display.exitCode ?? 1}`}</Text>
        </MessageResponseView>
        {display.timeoutMs && (
          <MessageResponseView height={1}>
            <Text dimColor>{`(timeout ${formatDurationMs(display.timeoutMs)})`}</Text>
          </MessageResponseView>
        )}
      </Box>
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
      {display.timeoutMs && (
        <MessageResponseView height={1}>
          <Text dimColor>{`(timeout ${formatDurationMs(display.timeoutMs)})`}</Text>
        </MessageResponseView>
      )}
    </Box>
  );
}

const MessageResponseContext = React.createContext(false);
const BASH_PROGRESS_THRESHOLD_MS = 2000;

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

function DiffOutputView({ diff }: { diff: string }): React.ReactElement {
  return (
    <MessageResponseView>
      <Box flexDirection="column">
        {diff.trimEnd().split("\n").map((line, index) => (
          <Text
            key={`diff-${index}`}
            color={getDiffLineColor(line)}
            dimColor={isDimDiffLine(line)}
          >
            {line}
          </Text>
        ))}
      </Box>
    </MessageResponseView>
  );
}

function getDiffLineColor(line: string): string | undefined {
  if (line.startsWith("+") && !line.startsWith("+++")) return "diffAdded";
  if (line.startsWith("-") && !line.startsWith("---")) return "diffRemoved";
  if (line.startsWith("@@")) return "ansi:cyan";
  return undefined;
}

function isDimDiffLine(line: string): boolean {
  return line.startsWith("---")
    || line.startsWith("+++")
    || line.startsWith(" ")
    || line === "… diff truncated";
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
  return (
    <MessageResponseView>
      <AnsiTextBlock content={formatTerminalOutput(content)} color={isError ? "error" : undefined} expanded={Boolean(expanded)} />
    </MessageResponseView>
  );
}

const SPINNER_FRAMES = ["·", "✢", "✱", "✶", "✻", "✽", "✽", "✻", "✶", "✱", "✢", "·"];
const SPINNER_VERBS = [
  "Accomplishing",
  "Architecting",
  "Calculating",
  "Cogitating",
  "Considering",
  "Crafting",
  "Determining",
  "Generating",
  "Inferring",
  "Synthesizing",
];

function OfficialSpinner({
  mode,
  marginTop,
}: {
  mode: SpinnerMode;
  marginTop: number;
}): React.ReactElement {
  const [ref, time] = useAnimationFrame(120);
  const [verb] = useState(() => SPINNER_VERBS[Math.floor(Math.random() * SPINNER_VERBS.length)] || "Working");
  const frame = SPINNER_FRAMES[Math.floor(time / 120) % SPINNER_FRAMES.length] || SPINNER_FRAMES[0];
  const statusText = getSpinnerStatusText(mode, time);

  return (
    <Box ref={ref} marginTop={marginTop} flexDirection="row">
      <Box width={2}>
        <Text color="claude">{frame}</Text>
      </Box>
      <Text color="claude">{verb}…</Text>
      {statusText && <Text dimColor>{` (${statusText})`}</Text>}
    </Box>
  );
}

function getSpinnerStatusText(mode: SpinnerMode, time: number): string | null {
  switch (mode) {
    case "requesting":
      return "esc to interrupt";
    case "thinking":
      return time >= 3000 ? "thinking" : null;
    case "tool-input":
      return "using tool";
    case "tool-use":
      return "running";
    case "responding":
      return null;
  }
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
  const usageText = left || availableForUsage <= 0
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

function truncateToWidth(value: string, maxWidth: number): string {
  if (maxWidth <= 0) return "";
  if (stringWidth(value) <= maxWidth) return value;
  if (maxWidth <= 1) return "…";

  let output = "";
  for (const char of value) {
    if (stringWidth(`${output}${char}…`) > maxWidth) break;
    output += char;
  }
  return `${output}…`;
}

function formatDurationMs(value: number): string {
  if (value < 1000) return `${value}ms`;
  const seconds = value / 1000;
  if (seconds < 60) return `${seconds % 1 === 0 ? seconds.toFixed(0) : seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

function formatBackgroundTasks(tasks: BackgroundTaskSummary[]): string {
  if (tasks.length === 0) return "No background tasks.";

  return tasks
    .map(task => {
      const age = formatDurationMs(Date.now() - task.startedAt);
      const outputFile = task.outputFile ? ` | ${task.outputFile}` : "";
      return `${task.kind} ${task.id} | ${task.status} | ${truncateLine(task.description, 80)} | ${age}${outputFile}`;
    })
    .join("\n");
}

function formatManagedTaskResultContent(content: string): string {
  const normalized = content
    .replace(/<\/?retrieval_status>/gu, "")
    .replace(/<\/?task_id>/gu, "")
    .replace(/<\/?task_type>/gu, "")
    .replace(/<\/?status>/gu, "")
    .replace(/<\/?output>/gu, "")
    .replace(/<\/?error>/gu, "")
    .trim();
  return normalized || content;
}

function formatFileSize(sizeInBytes: number): string {
  const kb = sizeInBytes / 1024;
  if (kb < 1) return `${sizeInBytes} bytes`;
  if (kb < 1024) return `${kb.toFixed(1).replace(/\.0$/u, "")}KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1).replace(/\.0$/u, "")}MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1).replace(/\.0$/u, "")}GB`;
}

function getExplicitBashTimeoutMs(input: Record<string, unknown>): number | undefined {
  const value = input.timeout;
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.max(1, Math.min(Math.round(value), 10 * 60 * 1000));
}

function formatShellTimeDisplay(elapsedMs: number, timeoutMs?: number): string {
  const elapsed = formatDurationMs(Math.max(0, Math.floor(elapsedMs / 1000) * 1000));
  if (timeoutMs) return `(${elapsed} · timeout ${formatDurationMs(timeoutMs)})`;
  return `(${elapsed})`;
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
    "/clear, /compact, /cost, /doctor, /feedback, /help, /init, /mcp, /model, /permissions, /release-notes, /resume, /tasks",
    "Shortcuts: Ctrl+C interrupt/exit, Ctrl+O expand tool output, ↓ manage background tasks, Shift+Enter newline, Shift+Tab cycle permissions.",
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
  "/tasks",
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
    case "/tasks":
      return "show/manage background tasks";
    default:
      return "custom command";
  }
}

async function runTasksSlashCommand(argumentText: string): Promise<string> {
  const args = argumentText.trim().split(/\s+/u).filter(Boolean);
  if (args.length === 0) return formatBackgroundTasks(listBackgroundTasks());

  const action = args[0]?.toLowerCase();
  if ((action === "stop" || action === "kill" || action === "output" || action === "show" || action === "view") && !args[1]) {
    return tasksSlashUsage();
  }

  if ((action === "stop" || action === "kill") && args[1]) {
    const result = await stopBackgroundTask(args[1]);
    return result.content;
  }

  if ((action === "output" || action === "show" || action === "view") && args[1]) {
    const result = await readBackgroundTaskOutput(args[1]);
    return result.content;
  }

  if (args.length === 1) {
    const result = await readBackgroundTaskOutput(args[0] || "");
    return result.content;
  }

  return tasksSlashUsage();
}

function tasksSlashUsage(): string {
  return [
    "Usage:",
    "/tasks",
    "/tasks <task_id>",
    "/tasks output <task_id>",
    "/tasks stop <task_id>",
  ].join("\n");
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

function saveCurrentSession(session: SessionData, history: ApiMessage[], permissionMode: PermissionMode): void {
  session.title = history.find(message => message.role === "user" && typeof message.content === "string")?.content as string | undefined;
  session.messages = history.map((message, index) => ({
    role: message.role,
    content: message.content,
    timestamp: Date.now() - (history.length - index),
  }));
  session.permissionMode = permissionMode;
  session.cwd ||= process.cwd();
  saveSession(session);
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
        return { id: `resume-assistant-${index}`, role: "assistant", content: sanitizeAssistantText(text), toolUses };
      }

      return null;
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

function resolveInitialSession(
  resumeSessionId: string | undefined,
  continueSession: boolean,
): { session?: SessionData; messages: ChatMessage[]; source: "resume" | "continue"; error?: string } | null {
  if (!resumeSessionId && !continueSession) return null;
  const targetId = resumeSessionId || listSessions()[0]?.id;
  if (!targetId) {
    return {
      messages: [],
      source: continueSession ? "continue" : "resume",
      error: "No saved sessions",
    };
  }
  const session = loadSession(targetId);
  if (!session) {
    return {
      messages: [],
      source: continueSession ? "continue" : "resume",
      error: `Session not found: ${targetId}`,
    };
  }
  return {
    session,
    messages: rebuildChatMessagesFromSession(session.messages),
    source: continueSession && !resumeSessionId ? "continue" : "resume",
  };
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
  if (name === "TaskOutput") return "Task Output";
  if (name === "TaskStop") return "Stop Task";
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
    return truncateLine(formatDisplayPath(input.file_path), 120);
  }
  if (name === "LS" && typeof input.path === "string") {
    return truncateLine(formatDisplayPath(input.path), 120);
  }
  if ((name === "Glob" || name === "Grep") && typeof input.pattern === "string") {
    const parts = [`pattern: "${input.pattern}"`];
    if (typeof input.path === "string") parts.push(`path: "${input.path}"`);
    return truncateLine(parts.join(", "), 160);
  }
  if ((name === "Write" || name === "Edit" || name === "MultiEdit") && typeof input.file_path === "string") {
    return truncateLine(formatDisplayPath(input.file_path), 120);
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
  if ((name === "TaskOutput" || name === "TaskStop") && typeof input.task_id === "string") {
    return input.task_id;
  }
  if (name === "NotebookEdit" && typeof input.notebook_path === "string") {
    return truncateLine(formatDisplayPath(input.notebook_path), 120);
  }
  return "";
}

function formatDisplayPath(value: string): string {
  if (!value) return value;
  const absolutePath = isAbsolute(value) ? value : resolve(process.cwd(), value);
  const cwdRelative = relative(process.cwd(), absolutePath);
  if (cwdRelative === "") return ".";
  if (!cwdRelative.startsWith("..") && !isAbsolute(cwdRelative)) return cwdRelative;

  const homeRelative = relative(homedir(), absolutePath);
  if (homeRelative === "") return "~";
  if (!homeRelative.startsWith("..") && !isAbsolute(homeRelative)) return `~/${homeRelative}`;

  return value;
}

function summarizeSubagentToolResult(name: string, content: string, display?: ToolDisplay): string {
  if (display?.type === "read") {
    return `Read ${display.numLines} ${display.numLines === 1 ? "line" : "lines"}`;
  }
  if (display?.type === "web_search") {
    return `Found ${display.totalResultCount} ${display.totalResultCount === 1 ? "result" : "results"}`;
  }
  if (display?.type === "edit") {
    return display.summary;
  }
  if (display?.type === "agent") {
    return display.status === "failed" ? display.error || "Failed" : "Done";
  }
  if (display?.type === "agent_background") {
    return `Backgrounded ${display.taskId}`;
  }
  if (display?.type === "bash_background") {
    return `Backgrounded ${display.taskId}`;
  }
  if (display?.type === "bash") {
    const text = [display.stdout, display.stderr].filter(Boolean).join("\n").trim();
    if (!text && display.exitCode === 0) return "Done";
    if (!text && display.exitCode !== 0) return `Exit code ${display.exitCode ?? "unknown"}`;
    return truncateLine(firstResultLine(text), 120);
  }
  if (display?.type === "text" && display.summary) {
    return display.summary;
  }
  const cleaned = stripToolUseErrorTags(content).trim();
  return truncateLine(firstResultLine(cleaned) || (name === "Bash" ? "Done" : ""), 120);
}

function formatToolInputPreview(name: string, inputPreview: string): string {
  const compact = inputPreview.replace(/\s+/gu, " ").trim();
  if (!compact) return "";
  try {
    const parsed = JSON.parse(compact) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const formatted = formatToolUseMessage(name, parsed as Record<string, unknown>);
      if (formatted) return formatted;
    }
  } catch {
    // Streaming JSON may be incomplete; compact text keeps the in-flight tool visible.
  }
  return truncateLine(compact, 160);
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

function LinkedText({
  content,
  color,
  dimColor,
}: {
  content: string;
  color?: string;
  dimColor?: boolean;
}): React.ReactElement {
  return (
    <Text color={color} dimColor={dimColor}>
      {splitUrls(content).map((part, index) => (
        part.type === "url"
          ? <Link key={`${part.value}-${index}`} url={part.value} fallback={part.value}>{part.value}</Link>
          : part.value
      ))}
    </Text>
  );
}

function AnsiTextBlock({
  content,
  color,
  dimColor,
  expanded,
}: {
  content: string;
  color?: string;
  dimColor?: boolean;
  expanded?: boolean;
}): React.ReactElement {
  const { lines } = createAnsiTextLines(content, process.stdout.columns || 80, Boolean(expanded));
  return (
    <Box flexDirection="column">
      {lines.map((line, index) => (
        <AnsiTextLineView key={`ansi-line-${index}`} line={line} color={color} dimColor={dimColor} />
      ))}
    </Box>
  );
}

function AnsiTextLineView({
  line,
  color,
  dimColor,
}: {
  line: AnsiTextLine;
  color?: string;
  dimColor?: boolean;
}): React.ReactElement {
  return (
    <Text>
      {line.map((segment, index) => (
        <AnsiTextSegmentView
          key={`ansi-segment-${index}`}
          segment={segment}
          color={color}
          dimColor={dimColor}
        />
      ))}
    </Text>
  );
}

function AnsiTextSegmentView({
  segment,
  color,
  dimColor,
}: {
  segment: AnsiTextSegment;
  color?: string;
  dimColor?: boolean;
}): React.ReactElement {
  const foreground = segment.color || color;
  const segmentDim = !segment.bold && (segment.dimColor || dimColor || undefined);
  return (
    <Text
      color={foreground}
      backgroundColor={segment.backgroundColor}
      bold={segment.bold}
      dimColor={segmentDim}
      underline={segment.underline}
      inverse={segment.inverse}
    >
      {splitUrls(segment.text).map((part, index) => (
        part.type === "url"
          ? <Link key={`${part.value}-${index}`} url={part.value} fallback={part.value}>{part.value}</Link>
          : part.value
      ))}
    </Text>
  );
}

function splitUrls(value: string): Array<{ type: "text" | "url"; value: string }> {
  const parts: Array<{ type: "text" | "url"; value: string }> = [];
  const urlPattern = /https?:\/\/[^\s<>"'`]+/giu;
  let cursor = 0;
  for (const match of value.matchAll(urlPattern)) {
    const index = match.index || 0;
    const rawUrl = match[0] || "";
    const url = rawUrl.replace(/[),.;:!?]+$/u, "");
    const trailing = rawUrl.slice(url.length);
    if (index > cursor) parts.push({ type: "text", value: value.slice(cursor, index) });
    if (url) parts.push({ type: "url", value: url });
    if (trailing) parts.push({ type: "text", value: trailing });
    cursor = index + rawUrl.length;
  }
  if (cursor < value.length) parts.push({ type: "text", value: value.slice(cursor) });
  return parts.length > 0 ? parts : [{ type: "text", value }];
}

function formatTerminalOutput(value: string): string {
  const plain = stripAnsiSequences(value);
  const trimmed = plain.trim();
  if (/data:image\/[a-z0-9.+-]+;base64,/iu.test(trimmed)) {
    return "[Image data]";
  }
  if (hasAnsiSequences(value)) return value;
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

function formatReadErrorSummary(value: string): string {
  if (/File (does not exist|not found)/iu.test(value)) return "File not found";
  if (/exceeds maximum allowed tokens|File content too large/iu.test(value)) return "File content too large";
  if (/Not a file/iu.test(value)) return "Not a file";
  return "Error reading file";
}

function countResultLines(value: string): number {
  const trimmed = value.trimEnd();
  if (!trimmed) return 0;
  return trimmed.split("\n").length;
}

function countDiffLineChanges(diff: string): { added: number; removed: number } {
  let added = 0;
  let removed = 0;
  for (const line of diff.split("\n")) {
    if (line.startsWith("+") && !line.startsWith("+++")) {
      added++;
    } else if (line.startsWith("-") && !line.startsWith("---")) {
      removed++;
    }
  }
  return { added, removed };
}

function isEmptySearchResult(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === "" || normalized === "(no matches)";
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function elapsedSecondsSince(startedAt: number): number {
  return Math.max(0, (Date.now() - startedAt) / 1000);
}

function usageTokenCount(value?: Usage): number {
  return (value?.input_tokens || 0) + (value?.output_tokens || 0);
}

function createFailedSubagentResult(
  agentId: string,
  error: unknown,
  startedAt: number,
  totalToolUseCount = 0,
): SubagentExecutionResult {
  const message = error instanceof Error ? error.message : String(error);
  return {
    agentId,
    status: "failed",
    content: "",
    error: message,
    totalDurationMs: Date.now() - startedAt,
    totalTokens: 0,
    totalToolUseCount,
  };
}

function countToolUsesInMessages(messages: ApiMessage[]): number {
  let total = 0;
  for (const message of messages) {
    if (!Array.isArray(message.content)) continue;
    for (const block of message.content) {
      if (block.type === "tool_use") total++;
    }
  }
  return total;
}
