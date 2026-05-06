import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Byline, Link, NoSelect, Ratchet, Text, getTheme, stringWidth, useAnimationFrame, useApp, useDeclaredCursor, useInput, useTheme, type InputEvent, type Key, type KeyboardEvent, type Theme, type ThemeName } from "@anthropic/ink";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { homedir } from "os";
import { isAbsolute, join, relative, resolve } from "path";
import { getApiConfig, getConfiguredModel, getConfiguredSubagentModel, streamMessage, type ApiMessage, type ApiMessageContent, type Usage } from "../api/client.js";
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
  stopAllRunningBackgroundAgentTasks,
  stopAllRunningTasks,
  stopBackgroundTask,
  stopBackgroundTaskNow,
  type BackgroundTaskSummary,
} from "../tools/registry.js";
import { isReadOnlyExploreToolCall, normalizeSubagentType } from "../tools/read-only.js";
import { createSession, listSessions, loadSession, saveSession, type SessionData } from "../session/store.js";
import { addCodeChangesToCostState, addUsageToCostState, createEmptyCostState, formatCostSummary } from "../core/cost.js";
import { appendOfficialContext } from "../core/context.js";
import { buildRuntimeOfficialContextOptions } from "../core/context-options.js";
import { sanitizeAssistantText } from "../core/protocol.js";
import type { CliOptions } from "../index.js";
export { buildOfficialEnvironmentContext } from "../core/context.js";
import {
  createAnsiTextLines,
  hasAnsiSequences,
  stripAnsiSequences,
  type AnsiTextLine,
  type AnsiTextSegment,
} from "./ansi.js";
import {
  fetchReleaseNotesForCommand,
  formatReleaseNotes,
  StartupScreen,
  getEffortStatus,
  getPromptPlaceholder,
} from "./startup-screen.js";
import { Dialog } from "./components/wrappers.js";
import { renderMarkdownToAnsi } from "./markdown.js";
import {
  PASTE_THRESHOLD,
  buildUserContentWithImages,
  formatImageRef,
  getImageReferenceBoundsForDeletion,
  getImageReferenceEndingAt,
  getImageReferenceStartingAt,
  hasImageInClipboard,
  hasImagePasteCandidate,
  isImagePasteShortcut,
  moveCursorAroundImageReference,
  parseImageReferences,
  readClipboardImage,
  readImagesFromPastedText,
  type PastedImage,
  type PastedImageInput,
} from "./image-paste.js";

type Role = "startup" | "user" | "assistant" | "system";

export type ToolRender = {
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

export type AgentProgressEntry = NonNullable<Extract<ToolProgressDisplay, { type: "agent_progress" }>["entries"]>[number];
export type ToolRenderItem =
  | { type: "tool"; tool: ToolRender }
  | { type: "agent_group"; tools: ToolRender[] };

type AgentGroupStat = {
  id: string;
  agentType: string;
  description?: string;
  taskDescription?: string;
  name?: string;
  toolUseCount: number;
  tokens: number | null;
  isResolved: boolean;
  isError: boolean;
  isAsync: boolean;
  lastToolInfo: string | null;
  output: string;
};

export type ChatMessage = {
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

type PermissionPromptOption = {
  label: string;
  detail?: string;
  key: string;
  decision: { behavior: PermissionBehavior; remember?: boolean };
};

type BackgroundTaskActionResult = {
  taskId: string;
  action: "output" | "stop";
  content: string;
  isError?: boolean;
  pending?: boolean;
};

type PastedImageMap = Record<number, PastedImage>;
type SendOptions = { appendUserMessage?: boolean };
type AnimationFrameRef = ReturnType<typeof useAnimationFrame>[0];
const TRANSCRIPT_RESERVED_ROWS = 6;
const SUBAGENT_MAX_TURNS = 30;
const SUBAGENT_API_HISTORY_TOKEN_BUDGET = 12_000;
const MAX_AGENT_PROGRESS_MESSAGES_TO_SHOW = 3;
const PERMISSION_PROMPT_OPTIONS: PermissionPromptOption[] = [
  {
    label: "Yes",
    detail: "Allow this tool once",
    key: "Y",
    decision: { behavior: "allow" },
  },
  {
    label: "Yes, don't ask again this session",
    detail: "Remember this exact tool permission",
    key: "A",
    decision: { behavior: "allow", remember: true },
  },
  {
    label: "No",
    detail: "Deny and let Claude continue",
    key: "N",
    decision: { behavior: "deny" },
  },
];
type ExitControlKeyName = "Ctrl-C" | "Ctrl-D";
type ExitMessage = { show: boolean; key?: ExitControlKeyName };
type ExitControlInput = { keyName: ExitControlKeyName; count: number };
type TemporaryNotice = { text: string; color?: string } | null;
export type InputEditAction =
  | "left"
  | "right"
  | "prevWord"
  | "nextWord"
  | "startOfLine"
  | "endOfLine"
  | "deleteBefore"
  | "deleteAfter"
  | "killLineEnd"
  | "killLineStart"
  | "killWordBefore"
  | "deleteWordAfter"
  | "yank"
  | "yankPop"
  | "upLogicalLine"
  | "downLogicalLine"
  | { type: "insert"; text: string };
const CLIPBOARD_IMAGE_HINT_DEBOUNCE_MS = 1_000;
const CLIPBOARD_IMAGE_HINT_COOLDOWN_MS = 30_000;
export const MAIN_SYSTEM_PROMPT = `You are Claude Code, Anthropic's official CLI for Claude. You help users work inside their local project by answering directly, using tools when needed, and keeping tool output concise.

Use direct file/search tools for simple, directed codebase searches, such as finding a specific file, class, function, or string.
For broader codebase exploration and deep research, use the Task tool with subagent_type="Explore". This is slower than direct search, so use it only when a simple directed search proves insufficient or when the task will clearly require more than 3 search/read queries.

When using Task, specify subagent_type to select the agent type. If omitted, the general-purpose agent is used. Use foreground Task when you need the result before continuing; use run_in_background only for independent work.

Do not paste large raw command output, whole files, or the full parent transcript into Task prompts. Give paths, goals, constraints, and expected output, then let the subagent inspect files itself.`;

export function buildMainSystemPrompt(
  model: string | undefined = getConfiguredModel(),
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  appendSystemPrompt?: string,
): string {
  return appendOfficialContext(
    appendSystemPrompt ? `${MAIN_SYSTEM_PROMPT}\n\n${appendSystemPrompt.trim()}` : MAIN_SYSTEM_PROMPT,
    buildRuntimeOfficialContextOptions(model, cwd, additionalWorkingDirectories),
  );
}

export function buildSubagentSystemPrompt(
  subagentType: string | undefined,
  model: string | undefined = getConfiguredSubagentModel(getConfiguredModel()),
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  appendSystemPrompt?: string,
): string {
  const base = subagentType === "Explore" ? EXPLORE_SUBAGENT_SYSTEM_PROMPT : GENERAL_PURPOSE_SUBAGENT_SYSTEM_PROMPT;
  return appendOfficialContext(
    [
      base,
      appendSystemPrompt?.trim(),
      "Notes:\n- Agent threads should treat the primary working directory as the repository root.\n- Use paths relative to the primary working directory, or absolute paths that are derived from it.\n- Before using a guessed path, discover it with LS, Glob, Grep, or a read-only Bash command.",
    ].filter(Boolean).join("\n\n"),
    buildRuntimeOfficialContextOptions(model, cwd, additionalWorkingDirectories),
  );
}
const GENERAL_PURPOSE_SUBAGENT_SYSTEM_PROMPT = `You are an agent for Claude Code, Anthropic's official CLI for Claude. Given the user's message, you should use the tools available to complete the task. Complete the task fully--don't gold-plate, but don't leave it half-done. When you complete the task, respond with a concise report covering what was done and any key findings -- the caller will relay this to the user, so it only needs the essentials.

Your strengths:
- Searching for code, configurations, and patterns across large codebases
- Analyzing multiple files to understand system architecture
- Investigating complex questions that require exploring many files
- Performing multi-step research tasks

Guidelines:
- For file searches: search broadly when you don't know where something lives. Use Read when you know the specific file path.
- For analysis: Start broad and narrow down. Use multiple search strategies if the first doesn't yield results.
- Be thorough: Check multiple locations, consider different naming conventions, look for related files.
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new file.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested.`;

const EXPLORE_SUBAGENT_SYSTEM_PROMPT = `You are a file search specialist for Claude Code, Anthropic's official CLI for Claude. You excel at thoroughly navigating and exploring codebases.

=== CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS ===
This is a READ-ONLY exploration task. You are STRICTLY PROHIBITED from:
- Creating new files
- Modifying existing files
- Deleting files
- Moving or copying files
- Creating temporary files anywhere
- Using redirect operators or heredocs to write to files
- Running any command that changes system state

Your role is exclusively to search and analyze existing code. Use Glob/Grep for broad search, Read when you know a file path, LS for directory listings, and Bash only for read-only commands such as ls, git status, git log, git diff, find, grep, rg, cat, head, tail, wc, stat, file, jq, awk, cut, sort, uniq, and pwd.

Complete the user's search request efficiently and report your findings clearly.`;

const EXPLORE_SUBAGENT_TOOL_NAMES = new Set([
  "Bash",
  "BashOutput",
  "Glob",
  "Grep",
  "LS",
  "Read",
  "Skill",
  "TaskOutput",
  "WebFetch",
  "WebSearch",
]);

type ClaudeCodeTuiProps = {
  version: string;
  initialPrompt?: string;
  bypassPermissions?: boolean;
  modelOverride?: string;
  resumeSessionId?: string;
  continueSession?: boolean;
  initialPermissionMode?: PermissionMode;
  additionalDirectories?: string[];
  appendSystemPrompt?: string;
};

export function ClaudeCodeTui({
  version,
  initialPrompt,
  bypassPermissions,
  modelOverride,
  resumeSessionId,
  continueSession,
  initialPermissionMode,
  additionalDirectories,
  appendSystemPrompt,
}: ClaudeCodeTuiProps): React.ReactElement {
  const { exit } = useApp();
  const cfg = getApiConfig();
  const initialModel = modelOverride || getConfiguredModel();
  const [model, setModel] = useState(initialModel);
  const modelRef = useRef(initialModel);
  const permissionHandler = useMemo(() => new PermissionHandler(), []);
  const [permissionMode, setPermissionMode] = useState<PermissionMode>(
    bypassPermissions ? "bypassPermissions" : initialPermissionMode || permissionHandler.getMode(),
  );
  const initialPromptText = useMemo(() => initialPrompt?.trim() || "", [initialPrompt]);
  const additionalWorkingDirectories = useMemo(() => additionalDirectories || [], [additionalDirectories]);
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
  const streamModeRef = useRef<SpinnerMode>("responding");
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const requestCanExitRef = useRef(false);
  const inputRef = useRef("");
  const cursorRef = useRef(0);
  const pastedImagesRef = useRef<PastedImageMap>({});
  const nextPastedImageIdRef = useRef(1);
  const pastePendingRef = useRef(false);
  const streamingRef = useRef("");
  const [exitMessage, setExitMessage] = useState<ExitMessage>({ show: false });
  const exitPendingRef = useRef<{
    key: ExitControlKeyName | null;
    timeout: ReturnType<typeof setTimeout> | null;
  }>({ key: null, timeout: null });
  const [temporaryNotice, setTemporaryNotice] = useState<TemporaryNotice>(null);
  const temporaryNoticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clipboardImageHintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClipboardImageHintAtRef = useRef(0);
  const terminalWasUnfocusedRef = useRef(false);
  const [permissionPrompt, setPermissionPrompt] = useState<PermissionPrompt | null>(null);
  const permissionPromptRef = useRef<PermissionPrompt | null>(null);
  const [permissionPromptSelection, setPermissionPromptSelection] = useState(0);
  const permissionPromptSelectionRef = useRef(0);
  const [expandedOutput, setExpandedOutput] = useState(false);
  const [backgroundTasksVisible, setBackgroundTasksVisible] = useState(false);
  const [selectedBackgroundTaskIndex, setSelectedBackgroundTaskIndex] = useState(0);
  const [backgroundTaskDetailId, setBackgroundTaskDetailId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [responseLength, setResponseLength] = useState(0);
  const backgroundTasksVisibleRef = useRef(false);
  const selectedBackgroundTaskIndexRef = useRef(0);
  const backgroundTaskDetailIdRef = useRef<string | null>(null);
  const stoppingBackgroundTaskIdsRef = useRef(new Set<string>());
  const backgroundTaskKillAgentsShortcutArmedRef = useRef(false);
  const loadingStartTimeRef = useRef(Date.now());
  const [backgroundTaskResult, setBackgroundTaskResult] = useState<BackgroundTaskActionResult | null>(null);
  const [usage, setUsage] = useState<Usage>({});
  const [costState, setCostState] = useState(createEmptyCostState);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [, setPastedImages] = useState<PastedImageMap>({});
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

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    const referencedIds = new Set(parseImageReferences(input).map(ref => ref.id));
    const currentImages = pastedImagesRef.current;
    const orphanedIds = Object.keys(currentImages)
      .map(id => Number.parseInt(id, 10))
      .filter(id => Number.isFinite(id) && !referencedIds.has(id));
    if (orphanedIds.length === 0) return;
    const nextImages = { ...currentImages };
    for (const id of orphanedIds) {
      delete nextImages[id];
    }
    pastedImagesRef.current = nextImages;
    setPastedImages(nextImages);
  }, [input]);

  useEffect(() => {
    streamingRef.current = streaming;
  }, [streaming]);

  const setBackgroundTasksVisibleNow = useCallback((visible: boolean): void => {
    backgroundTasksVisibleRef.current = visible;
    setBackgroundTasksVisible(visible);
  }, []);

  const setSelectedBackgroundTaskIndexNow = useCallback((nextIndex: number | ((current: number) => number)): void => {
    const current = selectedBackgroundTaskIndexRef.current;
    const next = typeof nextIndex === "function" ? nextIndex(current) : nextIndex;
    selectedBackgroundTaskIndexRef.current = next;
    setSelectedBackgroundTaskIndex(next);
  }, []);

  const setBackgroundTaskDetailIdNow = useCallback((taskId: string | null): void => {
    backgroundTaskDetailIdRef.current = taskId;
    setBackgroundTaskDetailId(taskId);
  }, []);

  const setResponseLengthNow = useCallback((nextLength: number): void => {
    const safeLength = Math.max(0, nextLength);
    setResponseLength(safeLength);
  }, []);

  const setLoadingNow = useCallback((nextLoading: boolean): void => {
    loadingRef.current = nextLoading;
    if (nextLoading) {
      requestCanExitRef.current = false;
      loadingStartTimeRef.current = Date.now();
      setResponseLengthNow(0);
    }
    setLoading(nextLoading);
  }, [setResponseLengthNow]);

  const setStreamModeNow = useCallback((nextMode: SpinnerMode): void => {
    streamModeRef.current = nextMode;
    setStreamMode(nextMode);
  }, []);

  const setStreamingNow = useCallback((nextStreaming: string): void => {
    streamingRef.current = nextStreaming;
    setStreaming(nextStreaming);
  }, []);

  const commitPartialAssistantMessageNow = useCallback((partial: string): void => {
    const text = sanitizeAssistantText(partial).trim();
    if (!text) return;
    setMessages(previous => {
      const next = [...previous];
      for (let index = next.length - 1; index >= 0; index--) {
        const message = next[index]!;
        if (message.role !== "assistant") continue;
        if (!message.content.trim() && (!message.toolUses || message.toolUses.length === 0)) {
          next[index] = { ...message, content: text };
          return next;
        }
        if (message.content === text) return previous;
        break;
      }
      return [
        ...previous,
        { id: `assistant-partial-${Date.now()}-${previous.length}`, role: "assistant", content: text },
      ];
    });
  }, []);

  const setPermissionPromptSelectionNow = useCallback((nextIndex: number | ((current: number) => number)): void => {
    const current = permissionPromptSelectionRef.current;
    const next = typeof nextIndex === "function" ? nextIndex(current) : nextIndex;
    const clamped = clamp(next, 0, PERMISSION_PROMPT_OPTIONS.length - 1);
    permissionPromptSelectionRef.current = clamped;
    setPermissionPromptSelection(clamped);
  }, []);

  const setPermissionPromptNow = useCallback((nextPrompt: PermissionPrompt | null): void => {
    permissionPromptRef.current = nextPrompt;
    setPermissionPrompt(nextPrompt);
  }, []);

  const pushSystemMessage = useCallback((content: string): void => {
    setMessages(previous => [
      ...previous,
      { id: `system-${Date.now()}-${previous.length}`, role: "system", content },
    ]);
  }, []);

  const showTemporaryNotice = useCallback((notice: TemporaryNotice, timeoutMs = 1000): void => {
    if (temporaryNoticeTimeoutRef.current) {
      clearTimeout(temporaryNoticeTimeoutRef.current);
    }
    setTemporaryNotice(notice);
    if (!notice) {
      temporaryNoticeTimeoutRef.current = null;
      return;
    }
    temporaryNoticeTimeoutRef.current = setTimeout(() => {
      temporaryNoticeTimeoutRef.current = null;
      setTemporaryNotice(null);
    }, timeoutMs);
  }, []);

  useEffect(() => () => {
    if (temporaryNoticeTimeoutRef.current) {
      clearTimeout(temporaryNoticeTimeoutRef.current);
    }
    if (clipboardImageHintTimeoutRef.current) {
      clearTimeout(clipboardImageHintTimeoutRef.current);
    }
  }, []);

  const handleTerminalFocusIn = useCallback((): void => {
    if (!terminalWasUnfocusedRef.current) return;
    terminalWasUnfocusedRef.current = false;
    if (loadingRef.current || pastePendingRef.current) return;

    const now = Date.now();
    if (now - lastClipboardImageHintAtRef.current < CLIPBOARD_IMAGE_HINT_COOLDOWN_MS) return;
    if (clipboardImageHintTimeoutRef.current) {
      clearTimeout(clipboardImageHintTimeoutRef.current);
    }
    clipboardImageHintTimeoutRef.current = setTimeout(() => {
      clipboardImageHintTimeoutRef.current = null;
      void (async () => {
        if (loadingRef.current || pastePendingRef.current) return;
        if (!(await hasImageInClipboard())) return;
        lastClipboardImageHintAtRef.current = Date.now();
        showTemporaryNotice({
          text: "Image in clipboard · ctrl+v to paste",
          color: "subtle",
        }, 8_000);
      })();
    }, CLIPBOARD_IMAGE_HINT_DEBOUNCE_MS);
  }, [showTemporaryNotice]);

  const setInputNow = useCallback((nextInput: string, nextCursor: number): void => {
    inputRef.current = nextInput;
    cursorRef.current = clamp(nextCursor, 0, nextInput.length);
    setInput(nextInput);
    setCursor(cursorRef.current);
  }, []);

  const applyInputEditNow = useCallback((action: InputEditAction): boolean => {
    const next = applyInputEditAction(inputRef.current, cursorRef.current, action);
    const changed = next.input !== inputRef.current || next.cursor !== cursorRef.current;
    if (changed) {
      setInputNow(next.input, next.cursor);
      setHistoryIndex(null);
    }
    return changed;
  }, [setInputNow]);

  const insertInputTextNow = useCallback((value: string): void => {
    if (!value) return;
    applyInputEditNow({ type: "insert", text: value });
  }, [applyInputEditNow]);

  const addPastedImage = useCallback((image: PastedImageInput): number => {
    const id = nextPastedImageIdRef.current++;
    const pastedImage: PastedImage = {
      ...image,
      id,
      type: "image",
    };
    pastedImagesRef.current = {
      ...pastedImagesRef.current,
      [id]: pastedImage,
    };
    setPastedImages(pastedImagesRef.current);

    const current = inputRef.current;
    const safeCursor = clamp(cursorRef.current, 0, current.length);
    const needsLeadingSpace = safeCursor > 0 && !/\s/u.test(current[safeCursor - 1] || "");
    const needsTrailingSpace = safeCursor < current.length && !/\s/u.test(current[safeCursor] || "");
    const refText = `${needsLeadingSpace ? " " : ""}${formatImageRef(id)}${needsTrailingSpace ? " " : ""}`;
    insertInputTextNow(refText);
    return id;
  }, [insertInputTextNow]);

  const handlePastedInput = useCallback((value: string): void => {
    pastePendingRef.current = true;
    void (async () => {
      try {
        const normalized = value.replace(/\r\n?/gu, "\n");
        if (normalized.length === 0) {
          const clipboardImage = await readClipboardImage(sessionRef.current.cwd || process.cwd());
          if (clipboardImage) addPastedImage(clipboardImage);
          else showTemporaryNotice({
            text: formatNoClipboardImageMessage(),
            color: "warning",
          });
          return;
        }

        const pasted = await readImagesFromPastedText(normalized, sessionRef.current.cwd || process.cwd());
        if (!pasted.foundImageCandidate) {
          insertInputTextNow(normalized);
          return;
        }
        if (pasted.text) {
          insertInputTextNow(pasted.text);
        }
        for (const image of pasted.images) {
          addPastedImage(image);
        }
      } catch (error) {
        showTemporaryNotice({
          text: error instanceof Error ? error.message : String(error),
          color: "warning",
        });
      } finally {
        pastePendingRef.current = false;
      }
    })();
  }, [addPastedImage, insertInputTextNow, showTemporaryNotice]);

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
    if (stoppingBackgroundTaskIdsRef.current.has(taskId)) return;
    stoppingBackgroundTaskIdsRef.current.add(taskId);
    const result = stopBackgroundTaskNow(taskId, "Stopped");
    setBackgroundTaskResult({
      taskId,
      action: "stop",
      content: result.content,
      isError: result.isError,
    });
    const clearStopping = setTimeout(() => {
      stoppingBackgroundTaskIdsRef.current.delete(taskId);
    }, 250);
    clearStopping.unref?.();
  }, []);

  const stopAllManagedBackgroundAgents = useCallback((): void => {
    const stoppedTaskIds = stopAllRunningBackgroundAgentTasks("Stopped");
    setBackgroundTaskResult({
      taskId: stoppedTaskIds[0] || "agents",
      action: "stop",
      content: stoppedTaskIds.length === 0
        ? "No running background agents."
        : `Stopped ${stoppedTaskIds.length} background ${stoppedTaskIds.length === 1 ? "agent" : "agents"}.`,
      isError: stoppedTaskIds.length === 0 || undefined,
    });
  }, []);

  const openBackgroundTasksPanel = useCallback((): void => {
    const tasks = sortBackgroundTasksForDialog(listBackgroundTasks());
    const selectedIndex = clamp(selectedBackgroundTaskIndexRef.current, 0, Math.max(0, tasks.length - 1));
    setSelectedBackgroundTaskIndexNow(selectedIndex);
    const selectedTask = tasks[selectedIndex] || null;
    setBackgroundTaskResult(null);
    backgroundTaskKillAgentsShortcutArmedRef.current = false;
    setBackgroundTaskDetailIdNow(tasks.length === 1 && selectedTask ? selectedTask.id : null);
    if (tasks.length === 1 && selectedTask) showBackgroundTaskOutput(selectedTask.id);
    setBackgroundTasksVisibleNow(true);
  }, [setBackgroundTaskDetailIdNow, setBackgroundTasksVisibleNow, setSelectedBackgroundTaskIndexNow, showBackgroundTaskOutput]);

  useEffect(() => {
    if (!backgroundTasksVisible || !backgroundTaskDetailId) return;
    const refreshCompletedDetailOutput = (): void => {
      const task = listBackgroundTasks().find(item => item.id === backgroundTaskDetailId);
      if (!task || task.status === "running") return;
      if (
        backgroundTaskResult?.taskId === backgroundTaskDetailId
        && backgroundTaskResult.action === "stop"
        && !backgroundTaskResult.pending
      ) {
        return;
      }
      if (
        backgroundTaskResult?.taskId === backgroundTaskDetailId
        && backgroundTaskResult.action === "output"
        && !backgroundTaskResult.pending
        && !isTaskOutputNotReady(backgroundTaskResult.content)
      ) {
        return;
      }
      showBackgroundTaskOutput(backgroundTaskDetailId);
    };

    refreshCompletedDetailOutput();
    const timer = setInterval(refreshCompletedDetailOutput, 1000);
    return () => clearInterval(timer);
  }, [backgroundTaskDetailId, backgroundTaskResult, backgroundTasksVisible, showBackgroundTaskOutput]);

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
      setStreamModeNow(event.mode);
      return;
    }

    if (event.type === "assistant_start") {
      setStreamModeNow("requesting");
      setResponseLengthNow(0);
      setMessages(previous => [
        ...previous,
        { id: event.assistantId, role: "assistant", content: "", toolUses: [] },
      ]);
      return;
    }

    if (event.type === "assistant_text_delta") {
      setStreamModeNow("responding");
      const text = sanitizeAssistantText(event.fullText);
      setResponseLengthNow(text.length);
      setStreamingNow(text);
      return;
    }

    if (event.type === "tool_input_start") {
      requestCanExitRef.current = false;
      setStreamModeNow("tool-input");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
      });
      return;
    }

    if (event.type === "tool_input_delta") {
      requestCanExitRef.current = false;
      setStreamModeNow("tool-input");
      upsertToolRender(event.assistantId, {
        id: event.toolUseId,
        name: "",
        input: {},
        inputPreview: event.fullInputJson,
      });
      return;
    }

    if (event.type === "assistant_complete") {
      setStreamingNow("");
      const hasToolUse = event.content.some(block => block.type === "tool_use");
      requestCanExitRef.current = !hasToolUse;
      setStreamModeNow(hasToolUse ? "tool-use" : "responding");
      const text = sanitizeAssistantText(event.text);
      setResponseLengthNow(text.length);
      const apiDurationMs = apiRequestStartedAt.current === null ? 0 : Date.now() - apiRequestStartedAt.current;
      apiRequestStartedAt.current = null;
      if (event.usage) {
        setUsage(current => ({ ...current, ...event.usage }));
        setCostState(current => addUsageToCostState(current, modelRef.current, event.usage!, apiDurationMs));
      }
      setMessages(previous => {
        let found = false;
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
      requestCanExitRef.current = false;
      setStreamModeNow("tool-use");
      upsertToolRender(event.assistantId, {
        id: event.tool.id,
        name: event.tool.name,
        input: event.tool.input,
        startedAt: Date.now(),
      });
      return;
    }

    if (event.type === "tool_result") {
      requestCanExitRef.current = false;
      setStreamModeNow("tool-use");
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
      requestCanExitRef.current = false;
      setStreamModeNow("tool-use");
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
  }, [pushSystemMessage, setResponseLengthNow, setStreamingNow, setStreamModeNow, upsertToolRender]);

  const requestPermission = useCallback(async (tool: {
    id: string;
    name: string;
    input: Record<string, unknown>;
  }): Promise<PermissionDecision> => {
    const decision = await new Promise<{ behavior: PermissionBehavior; remember?: boolean }>(resolve => {
      setPermissionPromptSelectionNow(0);
      setPermissionPromptNow({
        toolName: tool.name,
        toolUseID: tool.id,
        input: tool.input,
        resolve,
      });
    });
    setPermissionPromptNow(null);
    if (decision.remember) {
      permissionHandler.recordApproval(tool.name, tool.input, decision.behavior);
    }
    return { behavior: decision.behavior };
  }, [permissionHandler, setPermissionPromptNow, setPermissionPromptSelectionNow]);

  const agentSession = useMemo(
    () => {
      const createRunSubagent = (
        parentContext: { emitProgress?: (progress: ToolProgressDisplay) => void | Promise<void> } | undefined,
      ) => async (
        request: SubagentExecutionRequest,
        signal?: AbortSignal,
      ): Promise<SubagentExecutionResult> => {
        const subagentType = normalizeSubagentType(request.subagentType);
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
          maxTurns: SUBAGENT_MAX_TURNS,
          apiHistoryTokenBudget: SUBAGENT_API_HISTORY_TOKEN_BUDGET,
          tools: getSubagentToolDefs(subagentType),
          stream: (history, tools, childSignal) => streamMessage(history, buildSubagentSystemPrompt(subagentType, getConfiguredSubagentModel(modelRef.current), sessionRef.current.cwd || process.cwd(), additionalWorkingDirectories, appendSystemPrompt), tools, undefined, childSignal, getConfiguredSubagentModel(modelRef.current)),
          executeTool: (name, input, childSignal, childContext) => {
            if (subagentType === "Explore" && !isReadOnlyExploreToolCall(name, input)) {
              return Promise.resolve(denyExploreMutation(name, input));
            }
            return executeTool(name, input, childSignal, {
              ...childContext,
              sessionId: sessionRef.current.id,
              cwd: sessionRef.current.cwd || process.cwd(),
              additionalWorkingDirectories,
            });
          },
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
              const userFacingToolName = getUserFacingToolName(event.tool.name);
              await emitAgentProgress({
                message: userFacingToolName ? `Using ${userFacingToolName}` : "Initializing…",
                ...(userFacingToolName ? { toolName: event.tool.name } : {}),
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
              const userFacingToolName = getUserFacingToolName(event.tool.name);
              await emitAgentProgress({
                message: userFacingToolName ? `${userFacingToolName} ${event.result.is_error ? "failed" : "done"}` : "Working…",
                ...(userFacingToolName ? { toolName: event.tool.name } : {}),
              });
            }
            if (event.type === "assistant_text_delta" && event.fullText.trim()) {
              await emitAgentProgress({ message: "Responding" });
            }
          },
        });
        try {
          const result = await childSession.runUserTurn(request.prompt, signal);
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
        stream: (history, tools, signal) => streamMessage(history, buildMainSystemPrompt(modelRef.current, sessionRef.current.cwd || process.cwd(), additionalWorkingDirectories, appendSystemPrompt), tools, undefined, signal, modelRef.current),
        executeTool: (name, input, signal, context) => executeTool(name, input, signal, {
          ...context,
          sessionId: sessionRef.current.id,
          cwd: sessionRef.current.cwd || process.cwd(),
          additionalWorkingDirectories,
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
    [additionalWorkingDirectories, appendSystemPrompt, handleAgentEvent, hookRunner, permissionHandler, requestPermission],
  );

  const clearExitPendingTimer = useCallback((): void => {
    if (exitPendingRef.current.timeout) {
      clearTimeout(exitPendingRef.current.timeout);
    }
    exitPendingRef.current = { key: null, timeout: null };
  }, []);

  const clearExitPending = useCallback((): void => {
    clearExitPendingTimer();
    setExitMessage({ show: false });
  }, [clearExitPendingTimer]);

  const exitApplication = useCallback((reason = "Exit", forceProcessExit = false): void => {
    clearExitPendingTimer();
    agentSession.cancel(reason);
    stopAllRunningTasks(reason);
    exit();
    if (forceProcessExit) {
      const timeout = setTimeout(() => process.exit(0), 250);
      timeout.unref?.();
    }
  }, [agentSession, clearExitPendingTimer, exit]);

  useEffect(() => () => {
    clearExitPendingTimer();
    agentSession.cancel("Exit");
    stopAllRunningTasks("Exit");
  }, [agentSession, clearExitPendingTimer]);

  const handleExitDoublePress = useCallback((
    keyName: ExitControlKeyName,
    onFirstPress?: () => void,
  ): boolean => {
    const pending = exitPendingRef.current;
    // Once the footer asks for a second Ctrl-C/Ctrl-D, that exact key remains
    // armed until normal input clears it. Time windows can leave stale prompts
    // in error states, making the visible instruction false.
    const isDoublePress = pending.key === keyName;

    if (isDoublePress) {
      clearExitPending();
      exitApplication("Exit", true);
      return true;
    }

    onFirstPress?.();
    if (pending.timeout) {
      clearTimeout(pending.timeout);
    }
    exitPendingRef.current = { key: keyName, timeout: null };
    setExitMessage({ show: true, key: keyName });
    return false;
  }, [clearExitPending, exitApplication]);

  const handleExitControlInput = useCallback((control: ExitControlInput): void => {
    if (control.keyName === "Ctrl-C" && loadingRef.current && !requestCanExitRef.current) {
      clearExitPending();
      const partialText = sanitizeAssistantText(streamingRef.current).trim();
      if (partialText) {
        setMessages(previous => [
          ...previous,
          { id: `assistant-interrupted-${Date.now()}-${previous.length}`, role: "assistant", content: partialText },
        ]);
      }
      agentSession.cancel("user-cancel");
      setLoadingNow(false);
      setStreamingNow("");
      setStreamModeNow("responding");
      pushSystemMessage("[Request interrupted by user]");
      return;
    }

    if (control.keyName === "Ctrl-C") {
      for (let index = 0; index < control.count; index++) {
        const exited = handleExitDoublePress("Ctrl-C", index === 0
          ? () => {
              if (inputRef.current) {
                setInput("");
                setCursor(0);
                setHistoryIndex(null);
              }
            }
          : undefined);
        if (exited) return;
      }
      return;
    }

    if (inputRef.current) {
      removeInputText("after", inputRef.current, cursorRef.current, setInput, setCursor);
      return;
    }

    for (let index = 0; index < control.count; index++) {
      const exited = handleExitDoublePress("Ctrl-D");
      if (exited) return;
    }
  }, [agentSession, clearExitPending, handleExitDoublePress, pushSystemMessage, setLoadingNow, setStreamingNow, setStreamModeNow]);

  useEffect(() => {
    const onSigint = (): void => handleExitControlInput({ keyName: "Ctrl-C", count: 1 });
    process.on("SIGINT", onSigint);
    return () => {
      process.off("SIGINT", onSigint);
    };
  }, [handleExitControlInput]);

  const handleSlashCommand = useCallback(
    (commandLine: string): true | string => {
      const [command = "", ...args] = commandLine.trim().split(/\s+/u);
      const argumentText = args.join(" ");

      switch (command) {
        case "/clear":
          agentSession.reset();
          setMessages([createStartupMessage()]);
          setStreamingNow("");
          setUsage({});
          setCostState(createEmptyCostState());
          setBackgroundTasksVisibleNow(false);
          setSelectedBackgroundTaskIndexNow(0);
          setBackgroundTaskDetailIdNow(null);
          setBackgroundTaskResult(null);
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
          pushSystemMessage("Feedback surveys are disabled.");
          return true;

        case "/release-notes":
          void fetchReleaseNotesForCommand()
            .then(notes => pushSystemMessage(formatReleaseNotes(notes)))
            .catch(() => pushSystemMessage(formatReleaseNotes([])));
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

        case "/login":
          pushSystemMessage(
            "To authenticate, set the ANTHROPIC_API_KEY environment variable in your shell profile or .env file.\n" +
              "Get your API key at: https://console.anthropic.com/",
          );
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
    [
      agentSession,
      cfg,
      costState,
      emitHookOutcome,
      hookRunner,
      model,
      openBackgroundTasksPanel,
      permissionMode,
      pushSystemMessage,
      setBackgroundTaskDetailIdNow,
      setBackgroundTasksVisibleNow,
      setSelectedBackgroundTaskIndexNow,
      setStreamingNow,
    ],
  );

  const send = useCallback(
    async (text: string, options: SendOptions = {}) => {
      if (pastePendingRef.current) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      if (loading) {
        if (trimmed === "/tasks") {
          openBackgroundTasksPanel();
          setInputNow("", 0);
        }
        return;
      }
      let promptForAgent = trimmed;
      if (trimmed.startsWith("/") || trimmed === "?") {
        const slashResult = handleSlashCommand(trimmed);
        setInputNow("", 0);
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
          setInputNow("", 0);
          return;
        }
        if (promptHook.additionalContext.length > 0) {
          promptForAgent = [promptForAgent, ...promptHook.additionalContext].join("\n\n");
        }
      }
      const userContent = buildUserContentWithImages(promptForAgent, pastedImagesRef.current);
      const appendUserMessage = options.appendUserMessage ?? true;
      setInputHistory(previous => [...previous.filter(item => item !== trimmed), trimmed].slice(-50));
      setHistoryIndex(null);

      setBackgroundTasksVisibleNow(false);
      setBackgroundTaskDetailIdNow(null);
      setBackgroundTaskResult(null);
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      if (appendUserMessage) {
        setMessages(previous => [...previous, userMessage]);
      }
      setInputNow("", 0);
      setLoadingNow(true);
      setStreamingNow("");
      setStreamModeNow("requesting");

      try {
        await agentSession.runUserTurn(userContent.content);
        saveCurrentSession(sessionRef.current, agentSession.history, permissionMode);
        if (userContent.imageIds.length > 0) {
          const nextImages = { ...pastedImagesRef.current };
          for (const id of userContent.imageIds) {
            delete nextImages[id];
          }
          pastedImagesRef.current = nextImages;
          setPastedImages(nextImages);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!isUserInterruptionMessage(message) && message !== "Session reset") {
          commitPartialAssistantMessageNow(streamingRef.current);
          setMessages(previous => [
            ...previous,
            { id: `system-${Date.now()}`, role: "system", content: message },
          ]);
        }
      } finally {
        setLoadingNow(false);
        setStreamingNow("");
        setStreamModeNow("responding");
      }
    },
    [
      agentSession,
      commitPartialAssistantMessageNow,
      emitHookOutcome,
      handleSlashCommand,
      hookRunner,
      loading,
      openBackgroundTasksPanel,
      permissionMode,
      setBackgroundTaskDetailIdNow,
      setBackgroundTasksVisibleNow,
      setInputNow,
      setLoadingNow,
      setStreamingNow,
      setStreamModeNow,
    ],
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

  useEffect(() => {
    streamModeRef.current = streamMode;
  }, [streamMode]);

  // Reduced motion from settings
  useEffect(() => {
    try {
      const { readClaudeSettings } = require("../config/claude-settings.js");
      const settings = readClaudeSettings();
      setReducedMotion(settings?.prefersReducedMotion === true);
    } catch {
      // settings unavailable
    }
  }, []);

  const navigateHistoryUpNow = useCallback((): void => {
    if (inputHistory.length === 0) return;
    resetInputEditTransientState();
    const nextIndex = historyIndex === null ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
    const nextInput = inputHistory[nextIndex] || "";
    setHistoryIndex(nextIndex);
    setInputNow(nextInput, nextInput.length);
  }, [historyIndex, inputHistory, setInputNow]);

  const navigateHistoryDownNow = useCallback((): void => {
    if (historyIndex === null) return;
    resetInputEditTransientState();
    const nextIndex = historyIndex + 1;
    if (nextIndex >= inputHistory.length) {
      setHistoryIndex(null);
      setInputNow("", 0);
      return;
    }
    const nextInput = inputHistory[nextIndex] || "";
    setHistoryIndex(nextIndex);
    setInputNow(nextInput, nextInput.length);
  }, [historyIndex, inputHistory, setInputNow]);

  const moveUpOrHistoryUpNow = useCallback((): void => {
    if (applyInputEditNow("upLogicalLine")) return;
    navigateHistoryUpNow();
  }, [applyInputEditNow, navigateHistoryUpNow]);

  const moveDownOrHistoryDownNow = useCallback((): void => {
    if (applyInputEditNow("downLogicalLine")) return;
    if (historyIndex !== null) {
      navigateHistoryDownNow();
      return;
    }
    if (inputRef.current.trim() === "") openBackgroundTasksPanel();
  }, [applyInputEditNow, historyIndex, navigateHistoryDownNow, openBackgroundTasksPanel]);

  const handleBackgroundTasksShortcut = useCallback((value: string, key: Key): void => {
    const tasks = sortBackgroundTasksForDialog(listBackgroundTasks());
    const selectedTask = tasks[clamp(selectedBackgroundTaskIndexRef.current, 0, Math.max(0, tasks.length - 1))];
    const detailTaskId = backgroundTaskDetailIdRef.current;
    const detailTask = detailTaskId ? tasks.find(task => task.id === detailTaskId) : null;
    const actionKey = value.toLowerCase();
    const isKillAgentsPrefix = key.ctrl && (value === "\x18" || actionKey === "x");
    const isKillAgentsConfirm = key.ctrl && (value === "\x0b" || actionKey === "k");

    if (isKillAgentsPrefix) {
      backgroundTaskKillAgentsShortcutArmedRef.current = true;
      return;
    }
    if (isKillAgentsConfirm && backgroundTaskKillAgentsShortcutArmedRef.current) {
      backgroundTaskKillAgentsShortcutArmedRef.current = false;
      stopAllManagedBackgroundAgents();
      return;
    }
    if (value || key.escape || key.leftArrow || key.rightArrow || key.upArrow || key.downArrow || key.return) {
      backgroundTaskKillAgentsShortcutArmedRef.current = false;
    }

    if (detailTaskId) {
      if (!detailTask) {
        setBackgroundTaskDetailIdNow(null);
        if (tasks.length === 0) setBackgroundTasksVisibleNow(false);
        return;
      }

      if (key.leftArrow) {
        if (tasks.length <= 1) {
          setBackgroundTasksVisibleNow(false);
          setBackgroundTaskDetailIdNow(null);
          setBackgroundTaskResult(null);
          backgroundTaskKillAgentsShortcutArmedRef.current = false;
        } else {
          setBackgroundTaskDetailIdNow(null);
          setBackgroundTaskResult(null);
        }
        return;
      }

      if (key.escape || key.return || value === "\r" || value === "\n" || value === " ") {
        setBackgroundTasksVisibleNow(false);
        setBackgroundTaskDetailIdNow(null);
        setBackgroundTaskResult(null);
        backgroundTaskKillAgentsShortcutArmedRef.current = false;
        return;
      }

      if (actionKey === "x" && detailTask.status === "running") {
        stopManagedBackgroundTask(detailTask.id);
        return;
      }

      if (actionKey === "r") {
        showBackgroundTaskOutput(detailTask.id);
      }
      return;
    }

    if (key.escape || key.leftArrow) {
      setBackgroundTasksVisibleNow(false);
      setBackgroundTaskDetailIdNow(null);
      setBackgroundTaskResult(null);
      backgroundTaskKillAgentsShortcutArmedRef.current = false;
      return;
    }

    if (key.upArrow) {
      setSelectedBackgroundTaskIndexNow(current => Math.max(0, current - 1));
      setBackgroundTaskResult(null);
      return;
    }

    if (key.downArrow) {
      setSelectedBackgroundTaskIndexNow(current => Math.min(Math.max(0, tasks.length - 1), current + 1));
      setBackgroundTaskResult(null);
      return;
    }

    if ((key.return || value === "\r" || value === "\n" || actionKey === "o") && selectedTask) {
      setBackgroundTaskDetailIdNow(selectedTask.id);
      showBackgroundTaskOutput(selectedTask.id);
      return;
    }

    if (actionKey === "x" && selectedTask?.status === "running") {
      stopManagedBackgroundTask(selectedTask.id);
      return;
    }

    if (actionKey === "r") {
      setBackgroundTaskResult(null);
    }
  }, [
    setBackgroundTaskDetailIdNow,
    setBackgroundTasksVisibleNow,
    setSelectedBackgroundTaskIndexNow,
    showBackgroundTaskOutput,
    stopAllManagedBackgroundAgents,
    stopManagedBackgroundTask,
  ]);

  useEffect(() => {
    const onData = (chunk: Buffer): void => {
      const value = chunk.toString("utf8");
      if (!backgroundTasksVisibleRef.current) {
        const hasBackgroundTasks = listBackgroundTasks().length > 0;
        const canOpenFromDownArrow = inputRef.current.trim() === "" || (loadingRef.current && hasBackgroundTasks);
        if (canOpenFromDownArrow && value.includes("\x1b[B")) openBackgroundTasksPanel();
        return;
      }
      for (const char of value) {
        if (char === "\x18") {
          handleBackgroundTasksShortcut(char, createSyntheticInputKey({ ctrl: true }));
          continue;
        }
        if (char === "\x0b") {
          handleBackgroundTasksShortcut(char, createSyntheticInputKey({ ctrl: true }));
          continue;
        }
        if (char === "x" || char === "X" || char === "r" || char === "R") {
          handleBackgroundTasksShortcut(char, createSyntheticInputKey({ shift: char === char.toUpperCase() }));
        }
      }
    };

    process.stdin.on("data", onData);
    return () => {
      process.stdin.off("data", onData);
    };
  }, [handleBackgroundTasksShortcut, openBackgroundTasksPanel]);

  useInput((value, key, event: InputEvent) => {
    if (!backgroundTasksVisibleRef.current) return;
    if (value === "\x1b[O" || value === "[O" || value === "\x1b[I" || value === "[I") return;
    if (getExitControlInput(value, key)) return;
    event.stopImmediatePropagation();
    handleBackgroundTasksShortcut(value, key);
  }, { isActive: backgroundTasksVisible });

  useInput((value, key, event: InputEvent) => {
    if (value === "\x1b[O" || value === "[O") {
      terminalWasUnfocusedRef.current = true;
      return;
    }
    if (value === "\x1b[I" || value === "[I") {
      handleTerminalFocusIn();
      return;
    }

    const exitControl = getExitControlInput(value, key);
    if (exitControl) {
      handleExitControlInput(exitControl);
      return;
    }

    clearExitPending();

    if (event.keypress.isPasted) {
      handlePastedInput(value);
      return;
    }

    if (isImagePasteShortcut(value, key)) {
      handlePastedInput("");
      return;
    }

    if (pastePendingRef.current && (key.return || value === "\r" || value === "\n")) {
      return;
    }

    if (!key.ctrl && !key.meta && value && (value.length > PASTE_THRESHOLD || hasImagePasteCandidate(value))) {
      handlePastedInput(value);
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

    const activePermissionPrompt = permissionPromptRef.current;
    if (!activePermissionPrompt && (key as { shift?: boolean; tab?: boolean }).shift && ((key as { tab?: boolean }).tab || value === "\x1b[Z")) {
      setPermissionMode(current => cyclePermissionMode(current));
      return;
    }

    if (activePermissionPrompt) {
      if (key.escape) {
        activePermissionPrompt.resolve({ behavior: "deny" });
        return;
      }
      if (key.upArrow || value === "\x1b[A" || value === "k") {
        setPermissionPromptSelectionNow(current => current - 1);
        return;
      }
      if ((key as { shift?: boolean; tab?: boolean }).shift && ((key as { tab?: boolean }).tab || value === "\x1b[Z")) {
        setPermissionPromptSelectionNow(current => current - 1);
        return;
      }
      if (key.downArrow || value === "\x1b[B" || value === "j" || key.tab || value === "\t") {
        setPermissionPromptSelectionNow(current => current + 1);
        return;
      }
      if (key.return || value === "\r" || value === "\n") {
        const selected = PERMISSION_PROMPT_OPTIONS[permissionPromptSelectionRef.current] || PERMISSION_PROMPT_OPTIONS[0]!;
        activePermissionPrompt.resolve(selected.decision);
        return;
      }
      const shortcut = PERMISSION_PROMPT_OPTIONS.find(option => option.key.toLowerCase() === value.toLowerCase());
      if (shortcut) {
        activePermissionPrompt.resolve(shortcut.decision);
        return;
      }
      return;
    }

    if (backgroundTasksVisible || backgroundTasksVisibleRef.current) {
      const tasks = sortBackgroundTasksForDialog(listBackgroundTasks());
      const selectedTask = tasks[clamp(selectedBackgroundTaskIndexRef.current, 0, Math.max(0, tasks.length - 1))];
      const detailTaskId = backgroundTaskDetailIdRef.current;
      const detailTask = detailTaskId ? tasks.find(task => task.id === detailTaskId) : null;
      const actionKey = value || (key as { name?: string }).name || "";
      const isKillAgentsPrefix = key.ctrl && (value === "\x18" || actionKey.toLowerCase() === "x");
      const isKillAgentsConfirm = key.ctrl && (value === "\x0b" || actionKey.toLowerCase() === "k");

      if (isKillAgentsPrefix) {
        backgroundTaskKillAgentsShortcutArmedRef.current = true;
        return;
      }
      if (isKillAgentsConfirm && backgroundTaskKillAgentsShortcutArmedRef.current) {
        backgroundTaskKillAgentsShortcutArmedRef.current = false;
        stopAllManagedBackgroundAgents();
        return;
      }
      if (actionKey || key.escape || key.leftArrow || key.rightArrow || key.upArrow || key.downArrow || key.return) {
        backgroundTaskKillAgentsShortcutArmedRef.current = false;
      }

      if (detailTaskId) {
        if (!detailTask) {
          setBackgroundTaskDetailIdNow(null);
          if (tasks.length === 0) setBackgroundTasksVisibleNow(false);
          return;
        }

        if (key.leftArrow) {
          if (tasks.length <= 1) {
            setBackgroundTasksVisibleNow(false);
            setBackgroundTaskDetailIdNow(null);
            setBackgroundTaskResult(null);
            backgroundTaskKillAgentsShortcutArmedRef.current = false;
          } else {
            setBackgroundTaskDetailIdNow(null);
            setBackgroundTaskResult(null);
          }
          return;
        }

        if (key.escape || key.return || value === "\r" || value === "\n" || value === " ") {
          setBackgroundTasksVisibleNow(false);
          setBackgroundTaskDetailIdNow(null);
          setBackgroundTaskResult(null);
          backgroundTaskKillAgentsShortcutArmedRef.current = false;
          return;
        }

        if (actionKey.toLowerCase() === "x" && detailTask.status === "running") {
          stopManagedBackgroundTask(detailTask.id);
          return;
        }

        if (actionKey.toLowerCase() === "r") {
          showBackgroundTaskOutput(detailTask.id);
          return;
        }

        return;
      }

      if (key.escape || key.leftArrow) {
        setBackgroundTasksVisibleNow(false);
        setBackgroundTaskDetailIdNow(null);
        setBackgroundTaskResult(null);
        backgroundTaskKillAgentsShortcutArmedRef.current = false;
        return;
      }

      if (key.upArrow) {
        setSelectedBackgroundTaskIndexNow(current => Math.max(0, current - 1));
        setBackgroundTaskResult(null);
        return;
      }

      if (key.downArrow) {
        setSelectedBackgroundTaskIndexNow(current => Math.min(Math.max(0, tasks.length - 1), current + 1));
        setBackgroundTaskResult(null);
        return;
      }

      if ((key.return || value === "\r" || value === "\n" || actionKey.toLowerCase() === "o") && selectedTask) {
        setBackgroundTaskDetailIdNow(selectedTask.id);
        showBackgroundTaskOutput(selectedTask.id);
        return;
      }

      if (actionKey.toLowerCase() === "x" && selectedTask?.status === "running") {
        stopManagedBackgroundTask(selectedTask.id);
        return;
      }

      if (actionKey.toLowerCase() === "r") {
        setBackgroundTaskResult(null);
        return;
      }
    }

    if (key.leftArrow) {
      applyInputEditNow(key.meta || key.ctrl ? "prevWord" : "left");
      return;
    }

    if (key.rightArrow) {
      applyInputEditNow(key.meta || key.ctrl ? "nextWord" : "right");
      return;
    }

    if (key.upArrow && !(key as { shift?: boolean }).shift) {
      moveUpOrHistoryUpNow();
      return;
    }

    if (key.downArrow && !(key as { shift?: boolean }).shift) {
      moveDownOrHistoryDownNow();
      return;
    }

    const ctrlShortcut = getCtrlShortcut(value, key);
    if (ctrlShortcut) {
      switch (ctrlShortcut) {
        case "a":
          applyInputEditNow("startOfLine");
          return;
        case "b":
          applyInputEditNow("left");
          return;
        case "e":
          applyInputEditNow("endOfLine");
          return;
        case "f":
          applyInputEditNow("right");
          return;
        case "h":
          applyInputEditNow("deleteBefore");
          return;
        case "k":
          applyInputEditNow("killLineEnd");
          return;
        case "n":
          moveDownOrHistoryDownNow();
          return;
        case "p":
          moveUpOrHistoryUpNow();
          return;
        case "u":
          applyInputEditNow("killLineStart");
          return;
        case "w":
          applyInputEditNow("killWordBefore");
          return;
        case "y":
          applyInputEditNow("yank");
          return;
        default:
          break;
      }
    }

    const metaShortcut = getMetaShortcut(value, key);
    if (metaShortcut) {
      switch (metaShortcut) {
        case "b":
          applyInputEditNow("prevWord");
          return;
        case "f":
          applyInputEditNow("nextWord");
          return;
        case "d":
          applyInputEditNow("deleteWordAfter");
          return;
        case "y":
          applyInputEditNow("yankPop");
          return;
        default:
          break;
      }
    }

    if (value === "\x1b\x7f") {
      applyInputEditNow("killWordBefore");
      return;
    }

    if ((key.meta && !key.return && !key.backspace && !key.delete) || /^\x1b[^\[\r\n]/u.test(value)) {
      return;
    }

    if (value.includes("\x7f") && !key.backspace && !key.delete) {
      for (let index = 0; index < (value.match(/\x7f/gu)?.length || 0); index++) {
        applyInputEditNow("deleteBefore");
      }
      return;
    }

    if (key.tab && input.startsWith("/")) {
      const completion = completeSlashCommand(input);
      if (completion) {
        resetInputEditTransientState();
        setInputNow(completion, completion.length);
      }
      return;
    }

    if ((key as { home?: boolean }).home) {
      applyInputEditNow("startOfLine");
      return;
    }

    if ((key as { end?: boolean }).end) {
      applyInputEditNow("endOfLine");
      return;
    }

    const normalizedIncoming = value.replace(/\r\n?/gu, "\n");
    if (!key.ctrl && !key.meta && normalizedIncoming.includes("\n") && !(key as { shift?: boolean }).shift) {
      const textBeforeReturn = normalizedIncoming.split("\n")[0] || "";
      const next = applyInputEditAction(inputRef.current, cursorRef.current, { type: "insert", text: textBeforeReturn });
      setBackgroundTasksVisibleNow(false);
      setBackgroundTaskDetailIdNow(null);
      resetInputEditTransientState();
      void send(next.input);
      return;
    }

    if (key.return || value === "\r" || value === "\n") {
      const current = inputRef.current;
      const safeCursor = clamp(cursorRef.current, 0, current.length);
      if (safeCursor > 0 && current[safeCursor - 1] === "\\") {
        const next = `${current.slice(0, safeCursor - 1)}\n${current.slice(safeCursor)}`;
        resetInputEditTransientState();
        setInputNow(next, safeCursor);
        return;
      }
      if ((key as { shift?: boolean }).shift || key.meta) {
        applyInputEditNow({ type: "insert", text: "\n" });
        return;
      }
      resetInputEditTransientState();
      void send(current);
      return;
    }

    if (key.backspace) {
      applyInputEditNow(key.meta || key.ctrl || value === "\x1b\x7f" ? "killWordBefore" : "deleteBefore");
      return;
    }

    if (key.delete) {
      applyInputEditNow(key.meta ? "killLineEnd" : "deleteAfter");
      return;
    }

    if (value && !key.ctrl && value !== "\t" && value !== "\x1b[Z") {
      setBackgroundTasksVisibleNow(false);
      setBackgroundTaskDetailIdNow(null);
      setBackgroundTaskResult(null);
      applyInputEditNow({ type: "insert", text: value.replace(/\r\n?/gu, "\n") });
    }
  });

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box flexDirection="column" minHeight={1}>
        {visibleMessages.map(message => (
          <MessageView key={message.id} message={message} expandedOutput={expandedOutput} version={version} model={model} />
        ))}
        {visibleStreaming && <AssistantStreaming text={visibleStreaming} />}
        {loading && !visibleStreaming && (
          <OfficialSpinner
            mode={streamMode}
            marginTop={messages.length > 0 ? 1 : 0}
            responseLength={responseLength}
            loadingStartedAt={loadingStartTimeRef.current}
            reducedMotion={reducedMotion}
          />
        )}
      </Box>
      {permissionPrompt && <PermissionPromptView prompt={permissionPrompt} selectedIndex={permissionPromptSelection} />}
      {backgroundTasksVisible && (
        <BackgroundTasksPanel
          tasks={listBackgroundTasks()}
          selectedIndex={selectedBackgroundTaskIndex}
          detailTaskId={backgroundTaskDetailId}
          result={backgroundTaskResult}
          onClose={() => {
            setBackgroundTasksVisibleNow(false);
            setBackgroundTaskDetailIdNow(null);
            setBackgroundTaskResult(null);
            backgroundTaskKillAgentsShortcutArmedRef.current = false;
          }}
          onBack={() => {
            const tasks = sortBackgroundTasksForDialog(listBackgroundTasks());
            if (tasks.length <= 1) {
              setBackgroundTasksVisibleNow(false);
              setBackgroundTaskDetailIdNow(null);
            } else {
              setBackgroundTaskDetailIdNow(null);
            }
            setBackgroundTaskResult(null);
          }}
          onSelect={nextIndex => {
            setSelectedBackgroundTaskIndexNow(clamp(nextIndex, 0, Math.max(0, listBackgroundTasks().length - 1)));
            setBackgroundTaskResult(null);
          }}
          onView={taskId => {
            setBackgroundTaskDetailIdNow(taskId);
            showBackgroundTaskOutput(taskId);
          }}
          onStop={taskId => stopManagedBackgroundTask(taskId)}
          onStopAllAgents={stopAllManagedBackgroundAgents}
          onRefresh={taskId => showBackgroundTaskOutput(taskId)}
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
      <ModeFooter
        permissionMode={permissionMode}
        model={model}
        expandedOutput={expandedOutput}
        usage={usage}
        exitMessage={exitMessage}
        temporaryNotice={temporaryNotice}
      />
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
    const subagentType = normalizeSubagentType(request.subagentType);
    const agentId = request.agentId || `${request.parentToolUseId}-agent-${subagentSeq++}`;
    const startedAt = Date.now();
    const childSession = new TenguSession({
      maxTurns: SUBAGENT_MAX_TURNS,
      apiHistoryTokenBudget: SUBAGENT_API_HISTORY_TOKEN_BUDGET,
      tools: getSubagentToolDefs(subagentType),
      stream: (history, tools, childSignal) =>
        streamMessage(history, buildSubagentSystemPrompt(subagentType, getConfiguredSubagentModel(options.model || getConfiguredModel()), restored?.session?.cwd || process.cwd(), options.addDirs || [], options.appendSystemPrompt), tools, undefined, childSignal, getConfiguredSubagentModel(options.model || getConfiguredModel())),
      executeTool: (name, input, childSignal, childContext) => {
        if (subagentType === "Explore" && !isReadOnlyExploreToolCall(name, input)) {
          return Promise.resolve(denyExploreMutation(name, input));
        }
        return executeTool(name, input, childSignal, {
          ...childContext,
          sessionId: restored?.session?.id,
          cwd: restored?.session?.cwd || process.cwd(),
          additionalWorkingDirectories: options.addDirs || [],
        });
      },
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
      const result = await childSession.runUserTurn(request.prompt, signal);
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
    stream: (history, tools, signal) => streamMessage(history, buildMainSystemPrompt(options.model || getConfiguredModel(), restored?.session?.cwd || process.cwd(), options.addDirs || [], options.appendSystemPrompt), tools, undefined, signal, options.model),
    executeTool: (name, input, signal, context) => executeTool(name, input, signal, {
      ...context,
      sessionId: restored?.session?.id,
      cwd: restored?.session?.cwd || process.cwd(),
      additionalWorkingDirectories: options.addDirs || [],
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
      {groupToolRenderItems(message.toolUses || []).map(item => {
        if (item.type === "agent_group") {
          return <AgentGroupView key={item.tools.map(tool => tool.id).join(":")} tools={item.tools} expandedOutput={expandedOutput} />;
        }
        return <ToolUseView key={item.tool.id} tool={item.tool} expandedOutput={expandedOutput} />;
      })}
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

function getSubagentToolDefs(subagentType: string | undefined) {
  const tools = getToolDefs().filter(tool => tool.name !== "Task");
  if (subagentType !== "Explore") return tools;
  return tools.filter(tool => EXPLORE_SUBAGENT_TOOL_NAMES.has(tool.name));
}

function denyExploreMutation(name: string, input: Record<string, unknown>) {
  return {
    content: `Error: Explore agents are read-only and cannot use ${name}${formatToolUseMessage(name, input) ? `(${formatToolUseMessage(name, input)})` : ""}.`,
    isError: true,
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
  const toolRows = groupToolRenderItems(message.toolUses || []).reduce(
    (sum, item) => sum + estimateToolRenderItemRows(item, expandedOutput),
    0,
  );
  return assistantTextRows + toolRows;
}

function estimateToolRenderItemRows(item: ToolRenderItem, expandedOutput: boolean): number {
  if (item.type === "tool") return estimateToolRows(item.tool, expandedOutput);
  const stats = item.tools.map(getAgentGroupStat);
  const visibleCount = expandedOutput ? stats.length : Math.min(stats.length, 4);
  const hiddenCount = Math.max(0, stats.length - visibleCount);
  return 2 + visibleCount * 2 + (hiddenCount > 0 ? 1 : 0);
}

function estimateToolRows(tool: ToolRender, expandedOutput: boolean): number {
  if (isInvisibleToolRender(tool)) return 0;
  if (tool.result === undefined) {
    if (tool.progress?.type === "agent_progress") {
      const entries = getRenderableAgentProgressEntries(tool.progress.entries || []);
      const visibleCount = expandedOutput ? entries.length : Math.min(entries.length, MAX_AGENT_PROGRESS_MESSAGES_TO_SHOW);
      const hiddenCount = Math.max(0, entries.length - visibleCount);
      return entries.length > 0 ? 1 + visibleCount * 2 + (hiddenCount > 0 ? 1 : 0) : 2;
    }
    return 2;
  }

  if ((tool.name === "Bash" || tool.name === "BashOutput") && tool.display?.type === "bash") {
    if (!expandedOutput) return 2;
    return 2 + estimateWrappedLineCount([tool.display.stdout, tool.display.stderr].filter(Boolean).join("\n"), process.stdout.columns || 80);
  }
  if (tool.name === "TaskOutput") {
    if (expandedOutput && tool.display?.type === "agent") {
      return 4 + estimateWrappedLineCount(tool.display.content || tool.display.error || "", process.stdout.columns || 80);
    }
    return 2;
  }
  if (tool.name === "Task" && tool.display?.type === "agent") {
    const entries = tool.progress?.type === "agent_progress" ? getRenderableAgentProgressEntries(tool.progress.entries || []) : [];
    const visibleCount = expandedOutput ? entries.length : Math.min(entries.length, MAX_AGENT_PROGRESS_MESSAGES_TO_SHOW);
    const hiddenCount = Math.max(0, entries.length - visibleCount);
    const entryRows = entries.length > 0 ? visibleCount * 2 + (hiddenCount > 0 ? 1 : 0) : 0;
    if (!expandedOutput) return 3 + entryRows;
    return 2 + entryRows + estimateWrappedLineCount(tool.display.content || tool.display.error || "", process.stdout.columns || 80);
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

export function groupToolRenderItems(tools: ToolRender[]): ToolRenderItem[] {
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
    if (isInvisibleToolRender(tool)) continue;
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

function isInvisibleToolRender(tool: ToolRender): boolean {
  return isInvisibleToolName(tool.name);
}

function isInvisibleToolName(name: string): boolean {
  return name === "TodoWrite";
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
  detailTaskId,
  result,
  onClose,
  onBack,
  onSelect,
  onView,
  onStop,
  onStopAllAgents,
  onRefresh,
}: {
  tasks: BackgroundTaskSummary[];
  selectedIndex: number;
  detailTaskId: string | null;
  result: BackgroundTaskActionResult | null;
  onClose: () => void;
  onBack: () => void;
  onSelect: (nextIndex: number) => void;
  onView: (taskId: string) => void;
  onStop: (taskId: string) => void;
  onStopAllAgents: () => void;
  onRefresh: (taskId: string) => void;
}): React.ReactElement {
  const sortedTasks = sortBackgroundTasksForDialog(tasks);
  const safeSelectedIndex = clamp(selectedIndex, 0, Math.max(0, sortedTasks.length - 1));
  const selectedTask = sortedTasks[safeSelectedIndex] || null;
  const detailTask = detailTaskId ? sortedTasks.find(task => task.id === detailTaskId) || null : null;
  const handleKeyDown = (event: KeyboardEvent): void => {
    const eventKey = event.key;
    const activeTask = detailTask || selectedTask;

    if (event.ctrl && eventKey === "x") {
      event.preventDefault();
      return;
    }
    if (event.ctrl && eventKey === "k") {
      event.preventDefault();
      onStopAllAgents();
      return;
    }

    if (detailTask) {
      if (eventKey === "left") {
        event.preventDefault();
        onBack();
        return;
      }
      if (eventKey === "escape" || eventKey === "return" || eventKey === " ") {
        event.preventDefault();
        onClose();
        return;
      }
      if (eventKey === "x" && detailTask.status === "running") {
        event.preventDefault();
        onStop(detailTask.id);
        return;
      }
      if (eventKey === "r") {
        event.preventDefault();
        onRefresh(detailTask.id);
      }
      return;
    }

    if (eventKey === "escape" || eventKey === "left") {
      event.preventDefault();
      onClose();
      return;
    }
    if (eventKey === "up") {
      event.preventDefault();
      onSelect(safeSelectedIndex - 1);
      return;
    }
    if (eventKey === "down") {
      event.preventDefault();
      onSelect(safeSelectedIndex + 1);
      return;
    }
    if ((eventKey === "return" || eventKey === "o") && activeTask) {
      event.preventDefault();
      onView(activeTask.id);
      return;
    }
    if (eventKey === "x" && activeTask?.status === "running") {
      event.preventDefault();
      onStop(activeTask.id);
    }
  };

  if (detailTask) {
    return (
      <Box flexDirection="column" tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
        <BackgroundTaskDetailPanel
          task={detailTask}
          result={result?.taskId === detailTask.id ? result : null}
          canGoBack={sortedTasks.length > 1}
        />
      </Box>
    );
  }

  const bashTasks = sortedTasks.filter(task => task.kind === "bash");
  const agentTasks = sortedTasks.filter(task => task.kind === "agent");
  const sectionCount = [bashTasks, agentTasks].filter(section => section.length > 0).length;
  const runningBashCount = bashTasks.filter(task => task.status === "running").length;
  const runningAgentCount = agentTasks.filter(task => task.status === "running").length;
  const subtitle = formatBackgroundTasksDialogSubtitle(runningBashCount, runningAgentCount);
  return (
    <Box marginTop={1} flexDirection="column" tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
      <Dialog
        title="Background tasks"
        subtitle={subtitle}
        color="background"
        inputGuide={() => (
          <Text dimColor>{formatBackgroundTasksInputGuide(selectedTask, runningAgentCount > 0)}</Text>
        )}
      >
        {sortedTasks.length === 0 ? (
          <Text dimColor>No tasks currently running</Text>
        ) : (
          <Box flexDirection="column">
            {bashTasks.length > 0 && (
              <BackgroundTaskSection
                title="Shells"
                tasks={bashTasks}
                selectedTaskId={selectedTask?.id}
                showHeader={sectionCount > 1}
              />
            )}
            {agentTasks.length > 0 && (
              <BackgroundTaskSection
                title="Local agents"
                tasks={agentTasks}
                selectedTaskId={selectedTask?.id}
                showHeader={sectionCount > 1}
                marginTop={bashTasks.length > 0 ? 1 : 0}
              />
            )}
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

function BackgroundTaskDetailPanel({
  task,
  result,
  canGoBack,
}: {
  task: BackgroundTaskSummary;
  result: BackgroundTaskActionResult | null;
  canGoBack: boolean;
}): React.ReactElement {
  const title = task.kind === "bash" ? "Shell details" : "agent › " + (task.description || "Async agent");
  const elapsedMs = task.totalDurationMs ?? Date.now() - task.startedAt;
  const displayPrompt = task.kind === "agent" ? task.prompt || task.description : task.description;
  const statusText = formatBackgroundTaskDetailStatus(task.status);
  const subtitle = (
    <Text>
      {task.status !== "running" ? (
        <>
          <Text color={getBackgroundTaskDetailStatusColor(task.status)}>
            {statusText === "completed" ? "✓ Completed" : statusText === "failed" ? "Failed" : "Stopped"}
          </Text>
          <Text dimColor> · </Text>
        </>
      ) : null}
      <Text dimColor>
        {formatDurationMs(elapsedMs)}
        {typeof task.totalTokens === "number" && task.totalTokens > 0 ? ` · ${formatNumber(task.totalTokens)} tokens` : ""}
        {typeof task.totalToolUseCount === "number" && task.totalToolUseCount > 0
          ? ` · ${task.totalToolUseCount} ${task.totalToolUseCount === 1 ? "tool" : "tools"}`
          : ""}
      </Text>
    </Text>
  );
  return (
    <Box marginTop={1}>
      <Dialog
        title={title}
        subtitle={subtitle}
        color="background"
        inputGuide={() => (
          <Text dimColor>{formatBackgroundTaskDetailInputGuide(task, canGoBack)}</Text>
        )}
      >
        <Box flexDirection="column">
          <Box>
            <Text bold>Status:</Text>
            <Text> </Text>
            <Text color={getBackgroundTaskDetailStatusColor(task.status)}>
              {formatBackgroundTaskDetailStatus(task.status)}
              {task.kind === "bash" && task.exitCode !== undefined && task.exitCode !== null ? ` (exit code: ${task.exitCode})` : ""}
            </Text>
          </Box>
          <Box>
            <Text bold>Runtime:</Text>
            <Text> {formatDurationMs(elapsedMs)}</Text>
          </Box>
          <Box>
            <Text bold>{task.kind === "bash" ? "Command:" : "Prompt:"}</Text>
            <Text> {truncateLine(displayPrompt, 280)}</Text>
          </Box>
          <Box flexDirection="column" marginTop={1}>
            <Text bold>{result?.action === "stop" ? "Stop:" : "Output:"}</Text>
            <BackgroundTaskDetailOutput result={result} />
          </Box>
          {task.status === "failed" && task.error ? (
            <Box flexDirection="column" marginTop={1}>
              <Text bold color="error">Error</Text>
              <Text color="error">{task.error}</Text>
            </Box>
          ) : null}
        </Box>
      </Dialog>
    </Box>
  );
}

function BackgroundTaskDetailOutput({
  result,
}: {
  result: BackgroundTaskActionResult | null;
}): React.ReactElement {
  if (!result || result.pending) {
    return <Text dimColor>Loading output…</Text>;
  }
  const content = result.action === "stop"
    ? formatTaskStopResult(result.content)
    : formatManagedTaskResultContent(result.content);
  if (!content.trim()) return <Text dimColor>No output available</Text>;
  return (
    <OutputLineView
      content={content}
      isError={result.isError}
      expanded={false}
    />
  );
}

function BackgroundTaskSection({
  title,
  tasks,
  selectedTaskId,
  showHeader,
  marginTop = 0,
}: {
  title: string;
  tasks: BackgroundTaskSummary[];
  selectedTaskId?: string;
  showHeader: boolean;
  marginTop?: number;
}): React.ReactElement {
  return (
    <Box flexDirection="column" marginTop={marginTop}>
      {showHeader && (
        <Text dimColor>
          <Text bold>{`  ${title}`}</Text> ({tasks.length})
        </Text>
      )}
      {tasks.map(task => (
        <BackgroundTaskItem key={task.id} task={task} selected={task.id === selectedTaskId} />
      ))}
    </Box>
  );
}

function BackgroundTaskItem({
  task,
  selected,
}: {
  task: BackgroundTaskSummary;
  selected: boolean;
}): React.ReactElement {
  const maxActivityWidth = Math.max(30, (process.stdout.columns || 80) - 26);
  const label = truncateLine(task.description, maxActivityWidth);
  return (
    <Box>
      <Text dimColor>{selected ? "› " : "  "}</Text>
      <Text color={selected ? "suggestion" : undefined}>
        {label} <BackgroundTaskStatusText status={task.status} />
      </Text>
    </Box>
  );
}

function BackgroundTaskStatusText({ status }: { status: BackgroundTaskSummary["status"] }): React.ReactElement {
  const label = status === "completed" ? "done" : status === "failed" ? "error" : status === "killed" ? "stopped" : status;
  const color = status === "completed" ? "success" : status === "failed" ? "error" : status === "killed" ? "warning" : undefined;
  return (
    <Text color={color} dimColor>
      ({label})
    </Text>
  );
}

function formatBackgroundTaskDetailStatus(status: BackgroundTaskSummary["status"]): string {
  if (status === "killed") return "stopped";
  return status;
}

function getBackgroundTaskDetailStatusColor(status: BackgroundTaskSummary["status"]): string | undefined {
  if (status === "running") return "background";
  if (status === "completed") return "success";
  if (status === "failed") return "error";
  if (status === "killed") return "warning";
  return undefined;
}

function formatBackgroundTaskDetailInputGuide(task: BackgroundTaskSummary, canGoBack: boolean): string {
  return [
    ...(canGoBack ? ["← go back"] : []),
    "Esc/Enter/Space close",
    ...(task.status === "running" ? ["x stop"] : []),
  ].join(" · ");
}

function formatBackgroundTasksDialogSubtitle(runningBashCount: number, runningAgentCount: number): string | undefined {
  const parts = [
    runningBashCount > 0 ? `${runningBashCount} active ${runningBashCount === 1 ? "shell" : "shells"}` : "",
    runningAgentCount > 0 ? `${runningAgentCount} active ${runningAgentCount === 1 ? "agent" : "agents"}` : "",
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function sortBackgroundTasksForDialog(tasks: BackgroundTaskSummary[]): BackgroundTaskSummary[] {
  return [...tasks].sort((a, b) => {
    const statusDelta = backgroundTaskStatusRank(a.status) - backgroundTaskStatusRank(b.status);
    if (statusDelta !== 0) return statusDelta;
    return b.startedAt - a.startedAt;
  });
}

function backgroundTaskStatusRank(status: BackgroundTaskSummary["status"]): number {
  if (status === "running") return 0;
  if (status === "failed") return 1;
  if (status === "killed") return 2;
  return 3;
}

function formatBackgroundTasksInputGuide(selectedTask: BackgroundTaskSummary | null, hasRunningAgentTasks: boolean): string {
  return [
    "↑/↓ select",
    "Enter view",
    ...(selectedTask?.status === "running" ? ["x stop"] : []),
    ...(hasRunningAgentTasks ? ["ctrl+x ctrl+k stop all agents"] : []),
    "←/Esc close",
  ].join(" · ");
}

function normalizeSystemMessage(content: string): string {
  return content
    .replace(/<\/?(?:hook_error|hook_context|error)>/gu, "")
    .replace(/^Error:\s*/iu, "")
    .trimEnd();
}

function isUserInterruptionMessage(message: string): boolean {
  return message === "Interrupted"
    || message === "user-cancel"
    || message === "[Request interrupted by user]"
    || message === "[Request interrupted by user for tool use]";
}

function isSystemMessageError(line: string): boolean {
  return /(?:\berror\b|权限|denied|failed|not found|credentials|超长)/iu.test(line);
}

function AssistantStreaming({ text }: { text: string }): React.ReactElement {
  return (
    <Box flexDirection="column">
      <MarkdownBlock content={text} prefix="● " prefixColor="text" />
      <Box>
        <Text color="text">  </Text>
        <Text dimColor>│</Text>
      </Box>
    </Box>
  );
}

function CtrlOToExpandHint(): React.ReactElement {
  return <Text dimColor>(ctrl+o to expand)</Text>;
}

function ManageShortcutHint(): React.ReactElement {
  return <Text dimColor>(↓ manage)</Text>;
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
  const allComplete = !anyUnresolved;
  const allAsync = stats.every(stat => stat.isAsync);
  const allSameType = stats.length > 0 && stats.every(stat => stat.agentType === stats[0]?.agentType);
  const commonType = allSameType && stats[0]?.agentType !== "Agent" ? stats[0]?.agentType : null;

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box flexDirection="row">
        <Box minWidth={2}>
          <Text dimColor={!allComplete}>⏺</Text>
        </Box>
        {allComplete ? (
          allAsync ? (
            <Text>
              <Text bold>{tools.length}</Text> background agents launched <ManageShortcutHint />
            </Text>
          ) : (
            <Text>
              <Text bold>{tools.length}</Text> {commonType ? `${commonType} agents` : "agents"} finished{" "}
            </Text>
          )
        ) : (
          <Text>
            Running <Text bold>{tools.length}</Text> {commonType ? `${commonType} agents` : "agents"}…{" "}
          </Text>
        )}
        {!allAsync ? <CtrlOToExpandHint /> : null}
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
  const isBackgrounded = stat.isAsync && stat.isResolved;
  const statusText = getAgentGroupStatusText(stat);
  const title = stat.name || stat.description || stat.agentType;

  return (
    <Box flexDirection="column">
      <Box paddingLeft={3}>
        <Text dimColor>{treeChar} </Text>
        <Text dimColor={!stat.isResolved}>
          {hideType ? (
            <>
              <Text bold>{title}</Text>
              {stat.name && stat.description ? <Text dimColor>{`: ${stat.description}`}</Text> : null}
            </>
          ) : (
            <>
              <Text bold>{stat.agentType}</Text>
              {stat.description ? <Text dimColor>{` (${stat.description})`}</Text> : null}
            </>
          )}
          {!isBackgrounded ? (
            <>
              {" · "}
              {stat.toolUseCount} {stat.toolUseCount === 1 ? "tool use" : "tool uses"}
              {stat.tokens !== null ? ` · ${formatNumber(stat.tokens)} tokens` : ""}
            </>
          ) : null}
        </Text>
      </Box>
      {!isBackgrounded ? (
        <Box paddingLeft={3} flexDirection="row">
          <Text dimColor>{isLast ? "   ⎿  " : "│  ⎿  "}</Text>
          <Text dimColor>{statusText}</Text>
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
  const rendered = renderMarkdownToAnsi(content);
  const { lines } = createAnsiTextLines(rendered || content, process.stdout.columns || 80, true);

  return (
    <Box flexDirection="column">
      {lines.map((line, index) => (
        <Box key={`md-${index}`}>
          <Text color={prefixColor}>{index === 0 ? prefix : "  "}</Text>
          <AnsiTextLineView line={line} />
        </Box>
      ))}
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
  const rawDisplayInput = tool.inputPreview
    ? formatToolInputPreview(tool.name, tool.inputPreview)
    : formatToolUseMessage(tool.name, tool.input);
  const displayName = getToolDisplayName(tool);
  const displayInput = formatToolUseMessageForColumns(rawDisplayInput, displayName, process.stdout.columns || 80);
  const resolved = tool.result !== undefined;

  return (
    <Box flexDirection="column">
      <Box>
        <Box minWidth={2}>
          <Text color={resolved ? (tool.isError ? "error" : "success") : undefined} dimColor={!resolved}>
            ⏺
          </Text>
        </Box>
        <Text bold>{displayName}</Text>
        {displayInput && <Text dimColor>{`(${displayInput})`}</Text>}
        {tool.name === "TaskOutput" && typeof tool.input.task_id === "string" ? (
          <Text dimColor>{` ${tool.input.task_id}`}</Text>
        ) : null}
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

  if (tool.name === "Bash" || tool.name === "BashOutput" || (tool.name === "TaskOutput" && tool.display?.type === "bash")) {
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

  if (tool.name === "TaskOutput") {
    return <TaskOutputResultView tool={tool} expandedOutput={expandedOutput} />;
  }

  if (tool.name === "KillBash" || tool.name === "TaskStop") {
    return (
      <MessageResponseView height={1}>
        <Text>{formatTaskStopResult(result)}</Text>
      </MessageResponseView>
    );
  }

  if (tool.name === "WebSearch" && tool.display?.type === "web_search") {
    return <WebSearchResultView display={tool.display} expandedOutput={expandedOutput} />;
  }

  if (tool.name === "Task" && tool.display?.type === "agent") {
    return (
      <AgentResultView
        display={tool.display}
        progress={tool.progress?.type === "agent_progress" ? tool.progress : undefined}
        expandedOutput={expandedOutput}
      />
    );
  }

  if (tool.name === "Task" && tool.display?.type === "agent_background") {
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
    const count = getSearchResultCount(tool.name, result);
    const countLabel = getSearchResultLabel(tool.name, result, count);
    if (expandedOutput && count > 0) {
      return <OutputLineView content={result} expanded />;
    }
    return (
      <MessageResponseView height={1}>
        <Text>
          Found <Text bold>{count}</Text> {countLabel}
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
    const entries = getRenderableAgentProgressEntries(progress?.entries || []);
    const visibleEntries = getVisibleAgentProgressEntries(entries, expandedOutput);
    const hiddenCount = Math.max(0, entries.length - visibleEntries.length);
    if (visibleEntries.length === 0) {
      return (
        <MessageResponseView height={1}>
          <Text dimColor>{message}</Text>
        </MessageResponseView>
      );
    }
    return (
      <MessageResponseView>
        <Box flexDirection="column">
          {visibleEntries.map((entry, index) => (
            <AgentProgressEntryView
              key={entry.toolUseId}
              entry={entry}
              isLast={hiddenCount === 0 && index === visibleEntries.length - 1}
            />
          ))}
          {hiddenCount > 0 ? <HiddenToolUseCountHint hiddenCount={hiddenCount} /> : null}
          {expandedOutput && progress?.agentId ? <Text dimColor>{progress.agentId}</Text> : null}
        </Box>
      </MessageResponseView>
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
  isLast,
}: {
  entry: AgentProgressEntry;
  isLast: boolean;
}): React.ReactElement {
  const label = formatToolUseMessage(entry.toolName, entry.input);
  const treeChar = isLast ? "└" : "├";
  const resultPrefix = isLast ? "└" : "│";
  const summary = entry.summary || (entry.status === "running" ? "Running…" : undefined);
  return (
    <Box flexDirection="column">
      <Text>
        {treeChar} {getUserFacingToolName(entry.toolName)}
        {label ? <Text dimColor>{`(${label})`}</Text> : null}
      </Text>
      {summary ? <Text color={entry.status === "failed" ? "error" : undefined} dimColor={entry.status !== "failed"}>{`${resultPrefix}  ${summary}`}</Text> : null}
    </Box>
  );
}

export function getVisibleAgentProgressEntries(entries: AgentProgressEntry[], expandedOutput: boolean): AgentProgressEntry[] {
  return expandedOutput ? entries : entries.slice(-MAX_AGENT_PROGRESS_MESSAGES_TO_SHOW);
}

export function getRenderableAgentProgressEntries(entries: AgentProgressEntry[]): AgentProgressEntry[] {
  return entries.filter(entry => !isInvisibleToolName(entry.toolName));
}

function HiddenToolUseCountHint({ hiddenCount }: { hiddenCount: number }): React.ReactElement {
  return (
    <Text dimColor>
      +{hiddenCount} more tool {hiddenCount === 1 ? "use" : "uses"} <CtrlOToExpandHint />
    </Text>
  );
}

function getAgentGroupStat(tool: ToolRender): AgentGroupStat {
  const progress = tool.progress?.type === "agent_progress" ? tool.progress : undefined;
  const display = tool.display;
  const agentDisplay = display?.type === "agent" ? display : undefined;
  const backgroundDisplay = display?.type === "agent_background" ? display : undefined;
  const isAsync = tool.input.run_in_background === true || backgroundDisplay !== undefined;
  const entries = getRenderableAgentProgressEntries(progress?.entries || []);
  const lastEntry = entries[entries.length - 1];
  const name = typeof tool.input.name === "string" && tool.input.name.trim() ? `@${tool.input.name.trim()}` : undefined;
  const inputDescription = typeof tool.input.description === "string" ? tool.input.description : undefined;
  const subagentType = normalizeSubagentType(tool.input.subagent_type);
  const customDescription = name && subagentType && subagentType !== "general-purpose" && subagentType !== "worker"
    ? subagentType
    : undefined;
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
    agentType: name || getTaskDisplayType(tool),
    description: customDescription || inputDescription,
    taskDescription: name ? inputDescription : undefined,
    name,
    toolUseCount: agentDisplay?.totalToolUseCount ?? progress?.totalToolUseCount ?? 0,
    tokens: agentDisplay?.totalTokens ?? progress?.totalTokens ?? null,
    isResolved: tool.result !== undefined,
    isError: Boolean(tool.isError || agentDisplay?.status === "failed"),
    isAsync,
    lastToolInfo: lastEntry ? formatAgentGroupLastToolInfo(lastEntry) : progress?.message || null,
    output,
  };
}

function getTaskDisplayType(tool: ToolRender): string {
  const subagentType = normalizeSubagentType(tool.input.subagent_type);
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
  if (stat.isAsync) return stat.taskDescription || stat.description || "Running in the background";
  return "Done";
}

function AgentResultView({
  display,
  progress,
  expandedOutput,
}: {
  display: Extract<ToolDisplay, { type: "agent" }>;
  progress?: Extract<ToolProgressDisplay, { type: "agent_progress" }>;
  expandedOutput: boolean;
}): React.ReactElement {
  const parts = [
    display.totalToolUseCount === 1 ? "1 tool use" : `${display.totalToolUseCount} tool uses`,
    `${display.totalTokens} tokens`,
    formatDurationMs(display.totalDurationMs),
  ];
  const label = display.status === "failed" ? "Failed" : "Done";
  const output = display.content.trim() || display.error?.trim() || "";
  const entries = getRenderableAgentProgressEntries(progress?.entries || []);
  const visibleEntries = getVisibleAgentProgressEntries(entries, expandedOutput);
  const hiddenCount = Math.max(0, entries.length - visibleEntries.length);
  const entryTree = entries.length > 0 ? (
    <MessageResponseView>
      <Box flexDirection="column">
      {visibleEntries.map((entry, index) => (
        <AgentProgressEntryView
          key={entry.toolUseId}
          entry={entry}
          isLast={hiddenCount === 0 && index === visibleEntries.length - 1}
        />
      ))}
      {hiddenCount > 0 ? <HiddenToolUseCountHint hiddenCount={hiddenCount} /> : null}
      </Box>
    </MessageResponseView>
  ) : null;
  if (expandedOutput && output) {
    return (
      <Box flexDirection="column">
        {entryTree}
        <MessageResponseView height={1}>
          <Text color={display.status === "failed" ? "error" : undefined}>{label} ({parts.join(" · ")})</Text>
        </MessageResponseView>
        <OutputLineView content={output} isError={display.status === "failed"} expanded />
      </Box>
    );
  }
  return (
    <Box flexDirection="column">
      {entryTree}
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

function TaskOutputResultView({
  tool,
  expandedOutput,
}: {
  tool: ToolRender;
  expandedOutput: boolean;
}): React.ReactElement {
  const result = tool.result || "";
  const retrievalStatus = getTaggedResultValue(result, "retrieval_status");
  const taskStatus = getTaggedResultValue(result, "status");
  const isStillRunning = retrievalStatus === "not_ready"
    || retrievalStatus === "timeout"
    || taskStatus === "running"
    || taskStatus === "pending"
    || (tool.display?.type === "agent_background" && (!taskStatus || taskStatus === "running"));

  if (isStillRunning) {
    return (
      <MessageResponseView height={1}>
        <Text dimColor>Task is still running…</Text>
      </MessageResponseView>
    );
  }

  if (tool.display?.type === "agent") {
    const output = tool.display.content.trim() || tool.display.error?.trim() || "";
    if (!expandedOutput) {
      return (
        <MessageResponseView height={1}>
          <Text dimColor>Read output (ctrl+o to expand)</Text>
        </MessageResponseView>
      );
    }
    const lineCount = output ? output.split("\n").length : 0;
    return (
      <Box flexDirection="column">
        <MessageResponseView height={1}>
          <Text>
            {tool.display.description} ({lineCount} {lineCount === 1 ? "line" : "lines"})
          </Text>
        </MessageResponseView>
        <Box paddingLeft={2} flexDirection="column">
          <Text dimColor>{truncateLine(tool.display.prompt, 280)}</Text>
          {output ? (
            <Box marginTop={1}>
              <OutputLineView content={output} isError={tool.display.status === "failed"} expanded />
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  }

  if (tool.isError) {
    return (
      <MessageResponseView height={1}>
        <Text color="error">{firstResultLine(result)}</Text>
      </MessageResponseView>
    );
  }

  return (
    <MessageResponseView height={1}>
      <Text dimColor>Task not ready</Text>
    </MessageResponseView>
  );
}

function getTaggedResultValue(content: string, tagName: string): string | null {
  const match = new RegExp(`<${tagName}>\\s*([^<]+?)\\s*<\\/${tagName}>`, "iu").exec(content);
  return match?.[1]?.trim() || null;
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

const DEFAULT_SPINNER_CHARACTERS = process.env.TERM === "xterm-ghostty"
  ? ["·", "✢", "✱", "✶", "✻", "*"]
  : ["·", "✢", "✱", "✶", "✻", "✽"];
const SPINNER_FRAMES = [...DEFAULT_SPINNER_CHARACTERS, ...[...DEFAULT_SPINNER_CHARACTERS].reverse()];
const SPINNER_TICK_MS = 50;
const GLIMMER_SPEED_REQUESTING = 50;
const GLIMMER_SPEED_DEFAULT = 200;
const SPINNER_FRAME_MS = 120;
const REDUCED_MOTION_CYCLE_MS = 2000;
const TOKEN_DISPLAY_THRESHOLD_MS = 30000;
const STALL_THRESHOLD_MS = 3000;
const STALL_FADE_MS = 2000;
const SHIMMER_CYCLE_PADDING = 20;
const SHIMMER_OFFSCREEN = -100;
const STALL_ERROR_RGB = { r: 171, g: 43, b: 63 };
const THINKING_INACTIVE_RGB = { r: 153, g: 153, b: 153 };
const THINKING_INACTIVE_SHIMMER_RGB = { r: 185, g: 185, b: 185 };
const THINKING_DELAY_MS = 3000;
const THINKING_GLOW_PERIOD_S = 2;
type Rgb = { r: number; g: number; b: number };

const SPINNER_VERBS = [
  "Accomplishing", "Actioning", "Actualizing", "Architecting", "Baking", "Beaming",
  "Beboppin'", "Befuddling", "Billowing", "Blanching", "Bloviating", "Boogieing",
  "Boondoggling", "Booping", "Bootstrapping", "Brewing", "Bunning", "Burrowing",
  "Calculating", "Canoodling", "Caramelizing", "Cascading", "Catapulting",
  "Cerebrating", "Channeling", "Channelling", "Choreographing", "Churning",
  "Clauding", "Coalescing", "Cogitating", "Combobulating", "Composing",
  "Computing", "Concocting", "Considering", "Contemplating", "Cooking",
  "Crafting", "Creating", "Crunching", "Crystallizing", "Cultivating",
  "Deciphering", "Deliberating", "Determining", "Dilly-dallying",
  "Discombobulating", "Doing", "Doodling", "Drizzling", "Ebbing", "Effecting",
  "Elucidating", "Embellishing", "Enchanting", "Envisioning", "Evaporating",
  "Fermenting", "Fiddle-faddling", "Finagling", "Flambéing",
  "Flibbertigibbeting", "Flowing", "Flummoxing", "Fluttering", "Forging",
  "Forming", "Frolicking", "Frosting", "Gallivanting", "Galloping",
  "Garnishing", "Generating", "Gesticulating", "Germinating", "Gitifying",
  "Grooving", "Gusting", "Harmonizing", "Hashing", "Hatching", "Herding",
  "Honking", "Hullaballooing", "Hyperspacing", "Ideating", "Imagining",
  "Improvising", "Incubating", "Inferring", "Infusing", "Ionizing",
  "Jitterbugging", "Julienning", "Kneading", "Leavening", "Levitating",
  "Lollygagging", "Manifesting", "Marinating", "Meandering",
  "Metamorphosing", "Misting", "Moonwalking", "Moseying", "Mulling",
  "Mustering", "Musing", "Nebulizing", "Nesting", "Newspapering",
  "Noodling", "Nucleating", "Orbiting", "Orchestrating", "Osmosing",
  "Perambulating", "Percolating", "Perusing", "Philosophising",
  "Photosynthesizing", "Pollinating", "Pondering", "Pontificating",
  "Pouncing", "Precipitating", "Prestidigitating", "Processing", "Proofing",
  "Propagating", "Puttering", "Puzzling", "Quantumizing", "Razzle-dazzling",
  "Razzmatazzing", "Recombobulating", "Reticulating", "Roosting",
  "Ruminating", "Sautéing", "Scampering", "Schlepping", "Scurrying",
  "Seasoning", "Shenaniganing", "Shimmying", "Simmering", "Skedaddling",
  "Sketching", "Slithering", "Smooshing", "Sock-hopping", "Spelunking",
  "Spinning", "Sprouting", "Stewing", "Sublimating", "Swirling", "Swooping",
  "Symbioting", "Synthesizing", "Tempering", "Thinking", "Thundering",
  "Tinkering", "Tomfoolering", "Topsy-turvying", "Transfiguring",
  "Transmuting", "Twisting", "Undulating", "Unfurling", "Unravelling",
  "Vibing", "Waddling", "Wandering", "Warping", "Whatchamacalliting",
  "Whirlpooling", "Whirring", "Whisking", "Wibbling", "Working",
  "Wrangling", "Zesting", "Zigzagging",
];

function formatCompactNumber(n: number): string {
  if (n < 1000) return String(Math.round(n));
  if (n < 10000) return `${(n / 1000).toFixed(1)}k`;
  return `${Math.round(n / 1000)}k`;
}

type SpinnerAnimationState = {
  frame: string;
  glimmerIndex: number;
  flashOpacity: number;
};

export function getOfficialSpinnerAnimationState(
  message: string,
  mode: SpinnerMode,
  time: number,
  reducedMotion = false,
  isStalled = false,
): SpinnerAnimationState {
  const frameIndex = reducedMotion ? 0 : Math.floor(time / SPINNER_FRAME_MS) % SPINNER_FRAMES.length;
  const messageWidth = stringWidth(message);
  const glimmerSpeed = mode === "requesting" ? GLIMMER_SPEED_REQUESTING : GLIMMER_SPEED_DEFAULT;
  const cycleLength = messageWidth + SHIMMER_CYCLE_PADDING;
  const cyclePosition = Math.floor(time / glimmerSpeed);
  const glimmerIndex = reducedMotion || isStalled
    ? SHIMMER_OFFSCREEN
    : mode === "requesting"
      ? (cyclePosition % cycleLength) - (SHIMMER_CYCLE_PADDING / 2)
      : messageWidth + (SHIMMER_CYCLE_PADDING / 2) - (cyclePosition % cycleLength);
  const flashOpacity = reducedMotion || mode !== "tool-use" ? 0 : (Math.sin((time / 1000) * Math.PI) + 1) / 2;

  return {
    frame: SPINNER_FRAMES[frameIndex] || SPINNER_FRAMES[0] || "·",
    glimmerIndex,
    flashOpacity,
  };
}

export function splitOfficialSpinnerShimmer(
  text: string,
  glimmerIndex: number,
): { before: string; shimmer: string; after: string } {
  const messageWidth = stringWidth(text);
  const shimmerStart = glimmerIndex - 1;
  const shimmerEnd = glimmerIndex + 1;

  if (shimmerStart >= messageWidth || shimmerEnd < 0) {
    return { before: text, shimmer: "", after: "" };
  }

  const clampedStart = Math.max(0, shimmerStart);
  let column = 0;
  let before = "";
  let shimmer = "";
  let after = "";
  for (const segment of getGraphemeSegments(text)) {
    const width = stringWidth(segment);
    if (column + width <= clampedStart) {
      before += segment;
    } else if (column > shimmerEnd) {
      after += segment;
    } else {
      shimmer += segment;
    }
    column += width;
  }

  return { before, shimmer, after };
}

function getGraphemeSegments(text: string): string[] {
  const Segmenter = Intl.Segmenter;
  if (Segmenter) {
    return Array.from(new Segmenter(undefined, { granularity: "grapheme" }).segment(text), part => part.segment);
  }
  return Array.from(text);
}

function interpolateRgb(
  from: Rgb,
  to: Rgb,
  amount: number,
): Rgb {
  return {
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount),
  };
}

function rgbColor(color: Rgb): string {
  return `rgb(${color.r},${color.g},${color.b})`;
}

function parseRgbColor(value: string | undefined): Rgb | null {
  const match = value?.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/u);
  if (!match) return null;
  return {
    r: Number.parseInt(match[1] || "0", 10),
    g: Number.parseInt(match[2] || "0", 10),
    b: Number.parseInt(match[3] || "0", 10),
  };
}

function getThemeRgb(themeName: ThemeName, key: keyof Theme): Rgb | null {
  return parseRgbColor(getTheme(themeName)[key]);
}

function getStalledColor(themeName: ThemeName, amount: number): string {
  const base = getThemeRgb(themeName, "claude");
  if (base) return rgbColor(interpolateRgb(base, STALL_ERROR_RGB, amount));
  return amount > 0.5 ? "error" : "claude";
}

function getToolUseColor(themeName: ThemeName, amount: number): string {
  const base = getThemeRgb(themeName, "claude");
  const shimmer = getThemeRgb(themeName, "claudeShimmer");
  if (base && shimmer) return rgbColor(interpolateRgb(base, shimmer, amount));
  return amount > 0.5 ? "claudeShimmer" : "claude";
}

function useOfficialStalledAnimation(
  time: number,
  currentResponseLength: number,
  hasActiveTools = false,
  reducedMotion = false,
): { isStalled: boolean; stalledIntensity: number } {
  const lastTokenTime = useRef(time);
  const lastResponseLength = useRef(currentResponseLength);
  const mountTime = useRef(time);
  const stalledIntensityRef = useRef(0);
  const lastSmoothTime = useRef(time);

  if (currentResponseLength > lastResponseLength.current) {
    lastTokenTime.current = time;
    lastResponseLength.current = currentResponseLength;
    stalledIntensityRef.current = 0;
    lastSmoothTime.current = time;
  }

  let timeSinceLastToken: number;
  if (hasActiveTools) {
    timeSinceLastToken = 0;
    lastTokenTime.current = time;
  } else if (currentResponseLength > 0) {
    timeSinceLastToken = time - lastTokenTime.current;
  } else {
    timeSinceLastToken = time - mountTime.current;
  }

  const isStalled = timeSinceLastToken > STALL_THRESHOLD_MS && !hasActiveTools;
  const intensity = isStalled ? Math.min((timeSinceLastToken - STALL_THRESHOLD_MS) / STALL_FADE_MS, 1) : 0;

  if (!reducedMotion && (intensity > 0 || stalledIntensityRef.current > 0)) {
    const dt = time - lastSmoothTime.current;
    if (dt >= SPINNER_TICK_MS) {
      const steps = Math.floor(dt / SPINNER_TICK_MS);
      let current = stalledIntensityRef.current;
      for (let i = 0; i < steps; i += 1) {
        const diff = intensity - current;
        if (Math.abs(diff) < 0.01) {
          current = intensity;
          break;
        }
        current += diff * 0.1;
      }
      stalledIntensityRef.current = current;
      lastSmoothTime.current = time;
    }
  } else {
    stalledIntensityRef.current = intensity;
    lastSmoothTime.current = time;
  }

  return {
    isStalled,
    stalledIntensity: reducedMotion ? intensity : stalledIntensityRef.current,
  };
}

function OfficialSpinnerGlyph({
  frame,
  stalledIntensity,
  reducedMotion,
  time,
}: {
  frame: string;
  stalledIntensity: number;
  reducedMotion?: boolean;
  time: number;
}): React.ReactElement {
  const [themeName] = useTheme();

  if (reducedMotion) {
    const isDim = Math.floor(time / (REDUCED_MOTION_CYCLE_MS / 2)) % 2 === 1;
    return (
      <Box flexWrap="wrap" height={1} width={2}>
        <Text color="claude" dimColor={isDim}>●</Text>
      </Box>
    );
  }

  const color = stalledIntensity > 0 ? getStalledColor(themeName, stalledIntensity) : "claude";
  return (
    <Box flexWrap="wrap" height={1} width={2}>
      <Text color={color}>{frame}</Text>
    </Box>
  );
}

function OfficialSpinner({
  mode,
  marginTop,
  thinkingDuration,
  responseLength,
  loadingStartedAt,
  hasTeammates,
  reducedMotion,
}: {
  mode: SpinnerMode;
  marginTop: number;
  thinkingDuration?: number;
  responseLength: number;
  loadingStartedAt: number;
  hasTeammates?: boolean;
  reducedMotion?: boolean;
}): React.ReactElement {
  const [ref, time] = useAnimationFrame(reducedMotion ? null : SPINNER_TICK_MS);
  const [verb] = useState(
    () => SPINNER_VERBS[Math.floor(Math.random() * SPINNER_VERBS.length)] || "Working",
  );
  const message = `${verb}…`;
  const hasActiveTools = mode === "tool-use" || mode === "tool-input";
  const {
    isStalled: officialIsStalled,
    stalledIntensity: officialStalledIntensity,
  } = useOfficialStalledAnimation(time, responseLength, hasActiveTools, reducedMotion);
  const tokenCounterRef = useRef(responseLength);
  if (reducedMotion) {
    tokenCounterRef.current = responseLength;
  } else {
    const gap = responseLength - tokenCounterRef.current;
    if (gap > 0) {
      const increment = gap < 70
        ? 3
        : gap < 200
          ? Math.max(8, Math.ceil(gap * 0.15))
          : 50;
      tokenCounterRef.current = Math.min(tokenCounterRef.current + increment, responseLength);
    }
  }
  const displayedTokenCount = Math.round(tokenCounterRef.current / 4);
  const elapsedMs = Math.max(0, Date.now() - loadingStartedAt);
  const stalledIntensity = officialStalledIntensity;
  const { frame, glimmerIndex, flashOpacity } = getOfficialSpinnerAnimationState(
    message,
    mode,
    time,
    reducedMotion,
    officialIsStalled,
  );
  const [thinkingStatus, setThinkingStatus] = useState<"thinking" | number | null>(null);
  const thinkingStartRef = useRef<number | null>(null);
  useEffect(() => {
    let showDurationTimer: ReturnType<typeof setTimeout> | null = null;
    let clearStatusTimer: ReturnType<typeof setTimeout> | null = null;

    if (mode === "thinking") {
      if (thinkingStartRef.current === null) {
        thinkingStartRef.current = Date.now();
        setThinkingStatus("thinking");
      }
    } else if (thinkingStartRef.current !== null) {
      const duration = thinkingDuration ?? Date.now() - thinkingStartRef.current;
      const remainingThinkingTime = Math.max(0, 2000 - duration);
      thinkingStartRef.current = null;
      const showDuration = (): void => {
        setThinkingStatus(duration);
        clearStatusTimer = setTimeout(setThinkingStatus, 2000, null);
      };
      if (remainingThinkingTime > 0) {
        showDurationTimer = setTimeout(showDuration, remainingThinkingTime);
      } else {
        showDuration();
      }
    }

    return () => {
      if (showDurationTimer) clearTimeout(showDurationTimer);
      if (clearStatusTimer) clearTimeout(clearStatusTimer);
    };
  }, [mode, thinkingDuration]);
  const showTokens = hasTeammates || (elapsedMs ?? 0) > TOKEN_DISPLAY_THRESHOLD_MS;
  const status = getSpinnerStatusParts(
    thinkingStatus,
    time,
    displayedTokenCount,
    elapsedMs,
    showTokens,
    mode,
    Math.max(20, process.stdout.columns || 80),
    stringWidth(message) + 2,
    reducedMotion,
  );

  return (
    <Box ref={ref} marginTop={marginTop} flexDirection="row" flexWrap="wrap" width="100%">
      <OfficialSpinnerGlyph
        frame={frame}
        stalledIntensity={stalledIntensity}
        reducedMotion={reducedMotion}
        time={time}
      />
      <OfficialSpinnerMessage
        text={message}
        mode={mode}
        glimmerIndex={glimmerIndex}
        flashOpacity={flashOpacity}
        stalledIntensity={stalledIntensity}
        reducedMotion={reducedMotion}
      />
      {status}
    </Box>
  );
}

function OfficialSpinnerMessage({
  text,
  mode,
  glimmerIndex,
  flashOpacity,
  stalledIntensity,
  reducedMotion,
}: {
  text: string;
  mode: SpinnerMode;
  glimmerIndex: number;
  flashOpacity: number;
  stalledIntensity?: number;
  reducedMotion?: boolean;
}): React.ReactElement {
  const [themeName] = useTheme();

  if ((stalledIntensity ?? 0) > 0) {
    const color = getStalledColor(themeName, stalledIntensity ?? 0);
    return (
      <>
        <Text color={color}>{text}</Text>
        <Text color={color}> </Text>
      </>
    );
  }

  if (reducedMotion) {
    return (
      <>
        <Text color="claude">{text}</Text>
        <Text color="claude"> </Text>
      </>
    );
  }

  if (mode === "tool-use") {
    const color = getToolUseColor(themeName, flashOpacity);
    return (
      <>
        <Text color={color}>{text}</Text>
        <Text color="claude"> </Text>
      </>
    );
  }

  const { before, shimmer, after } = splitOfficialSpinnerShimmer(text, glimmerIndex);
  return (
    <>
      {before && <Text color="claude">{before}</Text>}
      {shimmer && <Text color="claudeShimmer">{shimmer}</Text>}
      {after && <Text color="claude">{after}</Text>}
      <Text color="claude"> </Text>
    </>
  );
}

function getSpinnerStatusParts(
  thinkingStatus: "thinking" | number | null,
  time: number,
  tokenCount?: number,
  elapsedMs?: number,
  showTokens?: boolean,
  mode: SpinnerMode = "responding",
  columns = 80,
  messageWidth = 0,
  reducedMotion = false,
): React.ReactElement | null {
  const parts: React.ReactElement[] = [];
  const partWidths: number[] = [];
  const separatorWidth = stringWidth(" · ");
  const availableSpace = columns - messageWidth - 5;

  const pushPart = (part: React.ReactElement, width: number): void => {
    const used = partWidths.reduce((sum, partWidth) => sum + partWidth, 0)
      + Math.max(0, partWidths.length) * separatorWidth;
    if (availableSpace > used + width) {
      parts.push(part);
      partWidths.push(width);
    }
  };

  if (showTokens) {
    if (elapsedMs !== undefined) {
      const elapsedText = formatDurationMs(Math.max(0, Math.floor(elapsedMs / 1000) * 1000));
      pushPart(<Text dimColor key="elapsed">{elapsedText}</Text>, stringWidth(elapsedText));
    }
    if (tokenCount !== undefined && tokenCount > 0) {
      const arrow = mode === "requesting" ? "↑" : "↓";
      const tokenText = `${arrow} ${formatCompactNumber(tokenCount)} tokens`;
      pushPart(<Text dimColor key="tokens">{tokenText}</Text>, stringWidth(tokenText));
    }
  }

  if (thinkingStatus === "thinking") {
    const thinkingElapsedSec = (time - THINKING_DELAY_MS) / 1000;
    const opacity = reducedMotion || time < THINKING_DELAY_MS
      ? 0
      : (Math.sin((thinkingElapsedSec * Math.PI * 2) / THINKING_GLOW_PERIOD_S) + 1) / 2;
    const thinkingText = parts.length === 0 ? "(thinking)" : "thinking";
    pushPart(
      <Text key="thinking" color={rgbColor(interpolateRgb(THINKING_INACTIVE_RGB, THINKING_INACTIVE_SHIMMER_RGB, opacity))}>
        {thinkingText}
      </Text>,
      stringWidth(thinkingText),
    );
  } else if (typeof thinkingStatus === "number") {
    const thinkingText = `thought for ${Math.max(1, Math.round(thinkingStatus / 1000))}s`;
    pushPart(<Text dimColor key="thinking">{thinkingText}</Text>, stringWidth(thinkingText));
  }

  if (parts.length === 0) return null;
  if (parts.length === 1 && thinkingStatus === "thinking" && (!showTokens || tokenCount === undefined || tokenCount <= 0)) {
    return <Byline>{parts}</Byline>;
  }
  return (
    <>
      <Text dimColor>(</Text>
      <Byline>{parts}</Byline>
      <Text dimColor>)</Text>
    </>
  );
}

function PermissionPromptView({
  prompt,
  selectedIndex,
}: {
  prompt: PermissionPrompt;
  selectedIndex: number;
}): React.ReactElement {
  const summary = formatToolUseMessage(prompt.toolName, prompt.input);
  return (
    <Box marginTop={1} paddingX={2}>
      <Dialog
        title={`Allow ${getUserFacingToolName(prompt.toolName)}?`}
        subtitle={summary || undefined}
        color="warning"
        hideInputGuide={false}
        inputGuide={() => <Text dimColor>↑/↓ select · Enter confirm · Esc deny · Y/A/N shortcut</Text>}
      >
        <Box flexDirection="column" marginTop={1}>
          {PERMISSION_PROMPT_OPTIONS.map((option, index) => {
            const selected = index === selectedIndex;
            const color = option.decision.behavior === "deny" ? "error" : "success";
            return (
              <Box key={option.key}>
                <Text color={selected ? "claude" : "subtle"}>{selected ? "❯ " : "  "}</Text>
                <Text color={color} bold={selected}>{`[${option.key}] ${option.label}`}</Text>
                {option.detail ? <Text dimColor>{`  ${option.detail}`}</Text> : null}
              </Box>
            );
          })}
        </Box>
      </Dialog>
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
            showCursor={cursorPoint.line === lineIndex}
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
  const cursorParts = getInputLineCursorParts(line, cursorColumn);
  const cursorRef = useDeclaredCursor({
    line: 0,
    column: cursorParts.visualColumn,
    active: showCursor,
  });

  if (!showCursor) {
    return (
      <Box ref={cursorRef}>
        <Text dimColor={isPlaceholder}>{line}</Text>
      </Box>
    );
  }

  return (
    <Box ref={cursorRef}>
      {cursorParts.before && <Text dimColor={isPlaceholder}>{cursorParts.before}</Text>}
      <Text inverse>{cursorParts.cursor}</Text>
      {cursorParts.after && <Text dimColor={isPlaceholder}>{cursorParts.after}</Text>}
    </Box>
  );
}

function ModeFooter({
  permissionMode,
  model,
  expandedOutput,
  usage,
  exitMessage,
  temporaryNotice,
}: {
  permissionMode: PermissionMode;
  model: string;
  expandedOutput: boolean;
  usage: Usage;
  exitMessage: ExitMessage;
  temporaryNotice: TemporaryNotice;
}): React.ReactElement {
  const left = exitMessage.show ? `Press ${exitMessage.key} again to exit` : temporaryNotice?.text ?? formatPermissionMode(permissionMode);
  const expanded = !exitMessage.show && !temporaryNotice && expandedOutput ? " · expanded" : "";
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
      <Text color={temporaryNotice?.color ?? (!exitMessage.show ? getModeColor(permissionMode) : undefined)} dimColor={exitMessage.show}>
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
  const stopped = parseTaskStopResult(content);
  if (stopped) return stopped;
  const retrievalStatus = getTaggedResultValue(content, "retrieval_status");
  if (retrievalStatus === "not_ready" || retrievalStatus === "timeout") return "Task is still running…";
  const output = getTaggedResultValue(content, "output");
  if (output) return output;
  const error = getTaggedResultValue(content, "error");
  if (error) return error;
  const normalized = content
    .replace(/<\/?retrieval_status>/gu, "")
    .replace(/<\/?task_id>/gu, "")
    .replace(/<\/?task_type>/gu, "")
    .replace(/<\/?status>/gu, "")
    .replace(/<\/?exit_code>/gu, "")
    .replace(/<\/?output>/gu, "")
    .replace(/<\/?error>/gu, "")
    .trim();
  return normalized || content;
}

function isTaskOutputNotReady(content: string): boolean {
  const formatted = formatManagedTaskResultContent(content);
  return /<retrieval_status>\s*not_ready\s*<\/retrieval_status>/iu.test(content)
    || /^\s*not_ready\b/iu.test(formatted)
    || /^\s*Task is still running/iu.test(formatted);
}

function formatTaskStopResult(content: string): string {
  return parseTaskStopResult(content) || firstResultLine(content) || "Stopped";
}

function parseTaskStopResult(content: string): string | null {
  const trimmed = content.trim();
  if (!trimmed.startsWith("{")) return null;
  try {
    const parsed = JSON.parse(trimmed) as { command?: unknown };
    if (typeof parsed.command === "string" && parsed.command.trim()) {
      return `${truncateCommandForTaskStop(parsed.command)} · stopped`;
    }
  } catch {
    return null;
  }
  return null;
}

function truncateCommandForTaskStop(command: string): string {
  const lines = command.split("\n");
  let value = lines.length > 2 ? lines.slice(0, 2).join("\n") : command;
  if (stringWidth(value) > 160) value = truncateToWidth(value, 160);
  return value.trim();
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
  const shouldInsertSpaceAfterImage = value.length > 0
    && !/\s/u.test(value[0] || "")
    && getImageReferenceEndingAt(input, safeCursor) !== null;
  const inserted = `${shouldInsertSpaceAfterImage ? " " : ""}${value}`;
  setInput(`${input.slice(0, safeCursor)}${inserted}${input.slice(safeCursor)}`);
  setCursor(safeCursor + inserted.length);
}

function removeInputText(
  direction: "before" | "after",
  input: string,
  cursor: number,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setCursor: React.Dispatch<React.SetStateAction<number>>,
): void {
  const safeCursor = clamp(cursor, 0, input.length);
  const imageRef = getImageReferenceBoundsForDeletion(input, safeCursor, direction);
  if (imageRef) {
    setInput(`${input.slice(0, imageRef.start)}${input.slice(imageRef.end)}`);
    setCursor(imageRef.start);
    return;
  }

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

export function getInputLineCursorParts(
  line: string,
  cursorColumn: number,
): { before: string; cursor: string; after: string; visualColumn: number } {
  const safeColumn = clamp(cursorColumn, 0, line.length);
  const before = line.slice(0, safeColumn);
  const cursor = line.slice(safeColumn, safeColumn + 1) || " ";
  const after = safeColumn < line.length ? line.slice(safeColumn + 1) : "";
  return {
    before,
    cursor,
    after,
    visualColumn: stringWidth(before),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function createSyntheticInputKey(partial: Partial<Key>): Key {
  return {
    upArrow: false,
    downArrow: false,
    leftArrow: false,
    rightArrow: false,
    pageDown: false,
    pageUp: false,
    wheelUp: false,
    wheelDown: false,
    home: false,
    end: false,
    return: false,
    escape: false,
    ctrl: false,
    shift: false,
    fn: false,
    tab: false,
    backspace: false,
    delete: false,
    meta: false,
    super: false,
    ...partial,
  };
}

function getExitControlInput(value: string, key: { ctrl?: boolean }): ExitControlInput | null {
  let ctrlCCount = 0;
  let ctrlDCount = 0;
  for (const char of value) {
    if (char === "\x03") ctrlCCount++;
    if (char === "\x04") ctrlDCount++;
  }

  const csiUCtrlCMatches = value.match(/\x1b\[(?:67|99);5u/gu);
  ctrlCCount += csiUCtrlCMatches?.length || 0;

  const csiUCtrlDMatches = value.match(/\x1b\[(?:68|100);5u/gu);
  ctrlDCount += csiUCtrlDMatches?.length || 0;

  const modifyOtherKeysCtrlCMatches = value.match(/\x1b\[27;5;(?:67|99)~/gu);
  ctrlCCount += modifyOtherKeysCtrlCMatches?.length || 0;

  const modifyOtherKeysCtrlDMatches = value.match(/\x1b\[27;5;(?:68|100)~/gu);
  ctrlDCount += modifyOtherKeysCtrlDMatches?.length || 0;

  if (ctrlCCount === 0 && ctrlDCount === 0 && key.ctrl) {
    if (/^[cC]$/u.test(value)) ctrlCCount = 1;
    if (/^[dD]$/u.test(value)) ctrlDCount = 1;
  }

  if (ctrlCCount > 0) return { keyName: "Ctrl-C", count: ctrlCCount };
  if (ctrlDCount > 0) return { keyName: "Ctrl-D", count: ctrlDCount };
  return null;
}

function cyclePermissionMode(mode: PermissionMode): PermissionMode {
  switch (mode) {
    case "default":
      return "acceptEdits";
    case "acceptEdits":
      return "plan";
    case "plan":
      return "auto";
    case "auto":
      return "bypassPermissions";
    case "bypassPermissions":
      return "default";
    case "dontAsk":
      return "default";
  }
}

function permissionModeSymbol(mode: PermissionMode): string {
  if (mode === "plan") return "⏸";
  if (mode === "default" || !mode) return "";
  return "⏵⏵";
}

function permissionModeTitle(mode: PermissionMode): string {
  switch (mode) {
    case "default": return "Default";
    case "acceptEdits": return "Accept edits";
    case "plan": return "Plan Mode";
    case "auto": return "Auto";
    case "bypassPermissions": return "Bypass";
    case "dontAsk": return "Don't Ask";
  }
}

function getModeColor(mode: PermissionMode): string | undefined {
  if (mode === "bypassPermissions" || mode === "dontAsk") return "error";
  if (mode === "auto") return "warning";
  if (mode === "acceptEdits") return "autoAccept";
  if (mode === "plan") return "planMode";
  return undefined;
}

function formatPermissionMode(mode: PermissionMode): string {
  if (mode === "default" || !mode) return "";
  const sym = permissionModeSymbol(mode);
  const title = permissionModeTitle(mode).toLowerCase();
  return `${sym} ${title} on (shift+tab to cycle)`;
}

function formatNoClipboardImageMessage(): string {
  if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY) {
    return "No image found in clipboard. You're SSH'd; try scp?";
  }
  return "No image found in clipboard. Use ctrl+v to paste images.";
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
    "/clear, /compact, /cost, /doctor, /help, /init, /login, /mcp, /model, /permissions, /release-notes, /resume, /tasks",
    "Shortcuts: Ctrl+C interrupt/exit, Ctrl+O expand tool output, ↓ manage background tasks, Shift+Enter newline, Shift+Tab cycle permissions.",
  ].join("\n");
}

const SLASH_COMMANDS = [
  "/clear",
  "/compact",
  "/cost",
  "/doctor",
  "/help",
  "/init",
  "/login",
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

const INPUT_KILL_RING_MAX_SIZE = 10;
let inputKillRing: string[] = [];
let inputKillRingIndex = 0;
let inputLastActionWasKill = false;
let inputLastActionWasYank = false;
let inputLastYankStart = 0;
let inputLastYankLength = 0;

type SegmentRecord = { segment: string; index: number; isWordLike?: boolean };
type SegmenterGranularity = "grapheme" | "word";
type SegmenterLike = { segment(input: string): Iterable<SegmentRecord> };
type SegmenterConstructor = new (
  locales?: string | string[],
  options?: { granularity: SegmenterGranularity },
) => SegmenterLike;

export function resetInputEditStateForTest(): void {
  inputKillRing = [];
  inputKillRingIndex = 0;
  inputLastActionWasKill = false;
  inputLastActionWasYank = false;
  inputLastYankStart = 0;
  inputLastYankLength = 0;
}

function resetInputEditTransientState(): void {
  resetInputKillAccumulation();
  resetInputYankState();
}

function resetInputKillAccumulation(): void {
  inputLastActionWasKill = false;
}

function resetInputYankState(): void {
  inputLastActionWasYank = false;
}

function pushInputKill(text: string, direction: "prepend" | "append"): void {
  if (!text) return;
  if (inputLastActionWasKill && inputKillRing.length > 0) {
    inputKillRing[0] = direction === "prepend"
      ? `${text}${inputKillRing[0]}`
      : `${inputKillRing[0]}${text}`;
  } else {
    inputKillRing.unshift(text);
    if (inputKillRing.length > INPUT_KILL_RING_MAX_SIZE) inputKillRing.pop();
  }
  inputLastActionWasKill = true;
  inputLastActionWasYank = false;
  inputKillRingIndex = 0;
}

function getLastInputKill(): string {
  return inputKillRing[0] || "";
}

function recordInputYank(start: number, length: number): void {
  inputLastYankStart = start;
  inputLastYankLength = length;
  inputLastActionWasYank = true;
  inputKillRingIndex = 0;
}

function yankPopInput(): { text: string; start: number; length: number } | null {
  if (!inputLastActionWasYank || inputKillRing.length <= 1) return null;
  inputKillRingIndex = (inputKillRingIndex + 1) % inputKillRing.length;
  return {
    text: inputKillRing[inputKillRingIndex] || "",
    start: inputLastYankStart,
    length: inputLastYankLength,
  };
}

function updateInputYankLength(length: number): void {
  inputLastYankLength = length;
}

function getInputEditActionName(action: InputEditAction): string {
  return typeof action === "string" ? action : action.type;
}

function isInputKillAction(actionName: string): boolean {
  return actionName === "killLineEnd" || actionName === "killLineStart" || actionName === "killWordBefore";
}

function isInputYankAction(actionName: string): boolean {
  return actionName === "yank" || actionName === "yankPop";
}

export function applyInputEditAction(input: string, cursor: number, action: InputEditAction): { input: string; cursor: number } {
  const actionName = getInputEditActionName(action);
  if (!isInputKillAction(actionName)) resetInputKillAccumulation();
  if (!isInputYankAction(actionName)) resetInputYankState();

  const safeCursor = clamp(cursor, 0, input.length);

  switch (actionName) {
    case "insert": {
      const text = typeof action === "string" ? "" : action.text.replace(/\r\n?/gu, "\n");
      if (!text) return { input, cursor: safeCursor };
      const shouldInsertSpaceAfterImage = !/\s/u.test(text[0] || "")
        && getImageReferenceEndingAt(input, safeCursor) !== null;
      const inserted = `${shouldInsertSpaceAfterImage ? " " : ""}${text}`;
      return {
        input: `${input.slice(0, safeCursor)}${inserted}${input.slice(safeCursor)}`,
        cursor: safeCursor + inserted.length,
      };
    }
    case "left":
      return { input, cursor: moveCursorAroundImageReference(input, safeCursor, "left") ?? previousGraphemeBoundary(input, safeCursor) };
    case "right":
      return { input, cursor: moveCursorAroundImageReference(input, safeCursor, "right") ?? nextGraphemeBoundary(input, safeCursor) };
    case "prevWord":
      return { input, cursor: snapOffsetOutOfImageRef(input, previousWordBoundary(input, safeCursor), "start") };
    case "nextWord":
      return { input, cursor: snapOffsetOutOfImageRef(input, nextWordBoundary(input, safeCursor), "end") };
    case "startOfLine":
      return { input, cursor: getLogicalLineStart(input, safeCursor) };
    case "endOfLine":
      return { input, cursor: getLogicalLineEnd(input, safeCursor) };
    case "deleteBefore": {
      const chipAfter = getImageReferenceStartingAt(input, safeCursor);
      const deletion = chipAfter ?? getImageReferenceBoundsForDeletion(input, safeCursor, "before");
      if (deletion) {
        return {
          input: `${input.slice(0, deletion.start)}${input.slice(deletion.end)}`,
          cursor: deletion.start,
        };
      }
      if (safeCursor === 0) return { input, cursor: safeCursor };
      const start = previousGraphemeBoundary(input, safeCursor);
      return { input: `${input.slice(0, start)}${input.slice(safeCursor)}`, cursor: start };
    }
    case "deleteAfter": {
      const deletion = getImageReferenceBoundsForDeletion(input, safeCursor, "after");
      if (deletion) {
        return {
          input: `${input.slice(0, deletion.start)}${input.slice(deletion.end)}`,
          cursor: deletion.start,
        };
      }
      if (safeCursor >= input.length) return { input, cursor: safeCursor };
      const end = nextGraphemeBoundary(input, safeCursor);
      return { input: `${input.slice(0, safeCursor)}${input.slice(end)}`, cursor: safeCursor };
    }
    case "killLineEnd": {
      const end = input[safeCursor] === "\n" ? safeCursor + 1 : getLogicalLineEnd(input, safeCursor);
      const killed = input.slice(safeCursor, end);
      pushInputKill(killed, "append");
      return { input: `${input.slice(0, safeCursor)}${input.slice(end)}`, cursor: safeCursor };
    }
    case "killLineStart": {
      const start = safeCursor > 0 && input[safeCursor - 1] === "\n"
        ? safeCursor - 1
        : getLogicalLineStart(input, safeCursor);
      const killed = input.slice(start, safeCursor);
      pushInputKill(killed, "prepend");
      return { input: `${input.slice(0, start)}${input.slice(safeCursor)}`, cursor: start };
    }
    case "killWordBefore": {
      if (safeCursor === 0) return { input, cursor: safeCursor };
      const imageRef = getImageReferenceBoundsForDeletion(input, safeCursor, "before");
      if (imageRef) {
        const killed = input.slice(imageRef.start, imageRef.end);
        pushInputKill(killed, "prepend");
        return {
          input: `${input.slice(0, imageRef.start)}${input.slice(imageRef.end)}`,
          cursor: imageRef.start,
        };
      }
      const start = snapOffsetOutOfImageRef(input, previousWordBoundary(input, safeCursor), "start");
      const killed = input.slice(start, safeCursor);
      pushInputKill(killed, "prepend");
      return { input: `${input.slice(0, start)}${input.slice(safeCursor)}`, cursor: start };
    }
    case "deleteWordAfter": {
      if (safeCursor >= input.length) return { input, cursor: safeCursor };
      const imageRef = getImageReferenceBoundsForDeletion(input, safeCursor, "after");
      if (imageRef) {
        return {
          input: `${input.slice(0, imageRef.start)}${input.slice(imageRef.end)}`,
          cursor: imageRef.start,
        };
      }
      const end = snapOffsetOutOfImageRef(input, nextWordBoundary(input, safeCursor), "end");
      return { input: `${input.slice(0, safeCursor)}${input.slice(end)}`, cursor: safeCursor };
    }
    case "yank": {
      const killed = getLastInputKill();
      if (!killed) return { input, cursor: safeCursor };
      recordInputYank(safeCursor, killed.length);
      return {
        input: `${input.slice(0, safeCursor)}${killed}${input.slice(safeCursor)}`,
        cursor: safeCursor + killed.length,
      };
    }
    case "yankPop": {
      const pop = yankPopInput();
      if (!pop) return { input, cursor: safeCursor };
      const start = clamp(pop.start, 0, input.length);
      const end = clamp(start + pop.length, start, input.length);
      updateInputYankLength(pop.text.length);
      return {
        input: `${input.slice(0, start)}${pop.text}${input.slice(end)}`,
        cursor: start + pop.text.length,
      };
    }
    case "upLogicalLine":
      return { input, cursor: moveLogicalLine(input, safeCursor, "up") };
    case "downLogicalLine":
      return { input, cursor: moveLogicalLine(input, safeCursor, "down") };
    default:
      return { input, cursor: safeCursor };
  }
}

function getCtrlShortcut(value: string, key: { ctrl?: boolean }): string | null {
  if (!key.ctrl) return null;
  if (/^[a-z]$/iu.test(value)) return value.toLowerCase();
  if (value.length !== 1) return null;
  const code = value.charCodeAt(0);
  if (code >= 1 && code <= 26) return String.fromCharCode(code + 96);
  return null;
}

function getMetaShortcut(value: string, key: { meta?: boolean }): string | null {
  if (key.meta && /^[a-z]$/iu.test(value)) return value.toLowerCase();
  const escapePrefixed = value.match(/^\x1b([a-z])$/iu);
  return escapePrefixed?.[1]?.toLowerCase() || null;
}

function getTextSegments(value: string, granularity: SegmenterGranularity): SegmentRecord[] {
  const Segmenter = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter;
  if (Segmenter) return Array.from(new Segmenter(undefined, { granularity }).segment(value));
  const segments: SegmentRecord[] = [];
  let index = 0;
  for (const segment of value) {
    segments.push({ segment, index, isWordLike: /\S/u.test(segment) });
    index += segment.length;
  }
  return segments;
}

function previousGraphemeBoundary(value: string, cursor: number): number {
  const safeCursor = clamp(cursor, 0, value.length);
  let previous = 0;
  for (const segment of getTextSegments(value, "grapheme")) {
    const start = segment.index;
    const end = start + segment.segment.length;
    if (end >= safeCursor) return start;
    previous = start;
  }
  return previous;
}

function nextGraphemeBoundary(value: string, cursor: number): number {
  const safeCursor = clamp(cursor, 0, value.length);
  for (const segment of getTextSegments(value, "grapheme")) {
    const start = segment.index;
    const end = start + segment.segment.length;
    if (end > safeCursor) return end;
  }
  return value.length;
}

function getWordBoundaries(value: string): Array<{ start: number; end: number; isWordLike: boolean }> {
  const segments = getTextSegments(value, "word");
  if (segments.some(segment => segment.isWordLike !== undefined)) {
    return segments.map(segment => ({
      start: segment.index,
      end: segment.index + segment.segment.length,
      isWordLike: segment.isWordLike === true,
    }));
  }

  return [...value.matchAll(/\S+/gu)].map(match => ({
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
    isWordLike: true,
  }));
}

function previousWordBoundary(value: string, cursor: number): number {
  let index = clamp(cursor, 0, value.length);
  let previousStart = 0;
  for (const boundary of getWordBoundaries(value)) {
    if (!boundary.isWordLike) continue;
    if (index > boundary.start && index <= boundary.end) return boundary.start;
    if (boundary.start < index) previousStart = boundary.start;
  }
  return previousStart;
}

function nextWordBoundary(value: string, cursor: number): number {
  const index = clamp(cursor, 0, value.length);
  for (const boundary of getWordBoundaries(value)) {
    if (boundary.isWordLike && boundary.start > index) return boundary.start;
  }
  return value.length;
}

function snapOffsetOutOfImageRef(value: string, offset: number, toward: "start" | "end"): number {
  const safeOffset = clamp(offset, 0, value.length);
  for (const ref of parseImageReferences(value)) {
    const start = ref.index;
    const end = start + ref.match.length;
    if (safeOffset > start && safeOffset < end) return toward === "start" ? start : end;
  }
  return safeOffset;
}

function getLogicalLineStart(value: string, cursor: number): number {
  const safeCursor = clamp(cursor, 0, value.length);
  const previousNewline = value.lastIndexOf("\n", Math.max(0, safeCursor - 1));
  return previousNewline === -1 ? 0 : previousNewline + 1;
}

function getLogicalLineEnd(value: string, cursor: number): number {
  const safeCursor = clamp(cursor, 0, value.length);
  const nextNewline = value.indexOf("\n", safeCursor);
  return nextNewline === -1 ? value.length : nextNewline;
}

function moveLogicalLine(value: string, cursor: number, direction: "up" | "down"): number {
  const safeCursor = clamp(cursor, 0, value.length);
  const currentStart = getLogicalLineStart(value, safeCursor);
  const currentEnd = getLogicalLineEnd(value, safeCursor);
  const column = safeCursor - currentStart;

  if (direction === "up") {
    if (currentStart === 0) return 0;
    const previousEnd = currentStart - 1;
    const previousStart = getLogicalLineStart(value, previousEnd);
    return snapOffsetToGraphemeBoundary(value, previousStart + Math.min(column, previousEnd - previousStart), "start");
  }

  if (currentEnd >= value.length) return value.length;
  const nextStart = currentEnd + 1;
  const nextEnd = getLogicalLineEnd(value, nextStart);
  return snapOffsetToGraphemeBoundary(value, nextStart + Math.min(column, nextEnd - nextStart), "start");
}

function snapOffsetToGraphemeBoundary(value: string, offset: number, toward: "start" | "end"): number {
  const safeOffset = clamp(offset, 0, value.length);
  for (const segment of getTextSegments(value, "grapheme")) {
    const start = segment.index;
    const end = start + segment.segment.length;
    if (safeOffset > start && safeOffset < end) return toward === "start" ? start : end;
  }
  return safeOffset;
}

function saveCurrentSession(session: SessionData, history: ApiMessage[], permissionMode: PermissionMode): void {
  session.title = history
    .filter(message => message.role === "user")
    .map(message => formatUserContentForDisplay(message.content))
    .find(Boolean);
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
        return {
          id: `resume-user-${index}`,
          role: "user",
          content: formatUserContentForDisplay(message.content),
        };
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

function formatUserContentForDisplay(content: ApiMessageContent): string {
  if (typeof content === "string") return content;
  return content
    .map(block => {
      if (block.type === "text") return block.text;
      if (block.type === "image") return block.id ? formatImageRef(block.id) : "[Image]";
      return "";
    })
    .join("")
    .trim();
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
  if (name === "TodoWrite") return "";
  if (name === "WebFetch") return "Fetch";
  if (name === "BashOutput") return "Bash Output";
  if (name === "KillBash") return "Kill Bash";
  if (name === "NotebookEdit") return "Edit Notebook";
  if (name === "WebSearch") return "Web Search";
  if (name === "TaskOutput") return "Task Output";
  if (name === "TaskStop") return "Stop Task";
  return name;
}

function getToolDisplayName(tool: ToolRender): string {
  if (tool.name === "Task") return getTaskDisplayType(tool);
  return getUserFacingToolName(tool.name);
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
  if (name === "TaskOutput") {
    return input.block === false ? "non-blocking" : "";
  }
  if (name === "TaskStop" && typeof input.task_id === "string") {
    return input.task_id;
  }
  if (name === "TaskStop" && typeof input.shell_id === "string") {
    return input.shell_id;
  }
  if (name === "NotebookEdit" && typeof input.notebook_path === "string") {
    return truncateLine(formatDisplayPath(input.notebook_path), 120);
  }
  return "";
}

export function formatToolUseMessageForColumns(message: string, displayName: string, columns: number): string {
  if (!message) return "";
  const fixedWidth = 2 + stringWidth(displayName) + 2;
  const availableWidth = Math.max(0, columns - fixedWidth - 1);
  return truncateToWidth(message, availableWidth);
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

export function formatToolInputPreview(name: string, inputPreview: string): string {
  const compact = inputPreview.replace(/\s+/gu, " ").trim();
  if (!compact) return "";
  try {
    const parsed = JSON.parse(compact) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const formatted = formatToolUseMessage(name, parsed as Record<string, unknown>);
      if (formatted) return formatted;
    }
  } catch {
    if (name === "TodoWrite") return "";
    // Streaming JSON may be incomplete; compact text keeps the in-flight tool visible.
  }
  if (name === "TodoWrite") return "";
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
  const content = segment.href
    ? <Link url={segment.href} fallback={segment.text}>{segment.text}</Link>
    : splitUrls(segment.text).map((part, index) => (
        part.type === "url"
          ? <Link key={`${part.value}-${index}`} url={part.value} fallback={part.value}>{part.value}</Link>
          : part.value
      ));
  return (
    <Text
      color={foreground}
      backgroundColor={segment.backgroundColor}
      bold={segment.bold}
      dimColor={segmentDim}
      underline={segment.underline}
      inverse={segment.inverse}
      italic={segment.italic}
      strikethrough={segment.strikethrough}
    >
      {content}
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
  return normalized === "" || normalized === "(no matches)" || normalized === "no files found" || normalized === "no matches found";
}

function getSearchResultCount(toolName: string, value: string): number {
  if (isEmptySearchResult(value)) return 0;
  if (toolName === "Grep") {
    const files = value.match(/^Found (\d+) files?(?:\b|$)/u);
    if (files?.[1]) return Number(files[1]);
    const matches = value.match(/Found (\d+) total occurrences? across/u);
    if (matches?.[1]) return Number(matches[1]);
    return value
      .split("\n")
      .filter(line => line.trim() && !line.startsWith("[Showing results with pagination"))
      .length;
  }
  return value
    .split("\n")
    .filter(line => line.trim() && !line.startsWith("(Results truncated"))
    .length;
}

function getSearchResultLabel(toolName: string, value: string, count: number): string {
  if (toolName !== "Grep") return pluralize(count, "file", "files");
  if (/^Found \d+ files?(?:\b|$)/u.test(value)) return pluralize(count, "file", "files");
  return pluralize(count, "match", "matches");
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
