// Tool registry and execution engine
import { getApiConfig, type ToolDef } from "../api/client.js";
import type {
  SubagentExecutionRequest,
  SubagentExecutionResult,
  ToolDisplay,
  ToolProgressDisplay,
} from "../agent/tengu.js";
import { exec, execFileSync, type ChildProcess } from "child_process";
import {
  accessSync,
  constants as fsConstants,
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { extname, join, resolve, relative } from "path";
import { homedir, tmpdir } from "os";
import { promisify } from "util";
import { getClaudeConfigDir, getProjectDir } from "../session/store.js";
import { createUnifiedDiff } from "./diff.js";

const execAsync = promisify(exec);

export interface ToolResult {
  content: string;
  isError?: boolean;
  display?: ToolDisplay;
}

export type ToolExecutionContext = {
  toolUseId?: string;
  sessionId?: string;
  cwd?: string;
  emitProgress?: (progress: ToolProgressDisplay) => void | Promise<void>;
  emitNotification?: (text: string) => void | Promise<void>;
  runSubagent?: (request: SubagentExecutionRequest, signal?: AbortSignal) => Promise<SubagentExecutionResult>;
};

export interface Tool {
  name: string;
  description: string;
  input_schema: ToolDef["input_schema"];
  execute: (input: Record<string, unknown>, signal?: AbortSignal, context?: ToolExecutionContext) => Promise<ToolResult>;
  requiresPermission?: boolean;
}

type TodoItem = {
  content: string;
  status: "pending" | "in_progress" | "completed";
  activeForm?: string;
};

type ReadFileCacheEntry = {
  mtimeMs: number;
  offset: number;
  limit?: number;
};

type BackgroundBashTask = {
  id: string;
  command: string;
  cwd: string;
  startedAt: number;
  status: "running" | "completed" | "failed" | "killed";
  stdout: string;
  stderr: string;
  exitCode: number | null;
  controller: AbortController;
  child: ChildProcess;
};

type ForegroundBashTask = {
  toolUseId?: string;
  command: string;
  cwd: string;
  stateFile: string;
  child: ChildProcess;
  startedAt: number;
  stdout: string;
  stderr: string;
  progressTimer?: NodeJS.Timeout;
  backgroundTaskId?: string;
  emitNotification?: (text: string) => void | Promise<void>;
  resolve: (result: ForegroundBashResult) => void;
};

type ForegroundBashResult =
  | { type: "completed"; stdout: string; stderr: string }
  | { type: "backgrounded"; taskId: string };

type WebSearchHit = {
  title: string;
  url: string;
  snippet?: string;
};

type WebSearchResultBlock = {
  tool_use_id: string;
  content: WebSearchHit[];
};

type WebSearchOutput = {
  query: string;
  results: Array<WebSearchResultBlock | string>;
  durationSeconds: number;
};

type BackgroundAgentTask = {
  id: string;
  agentId: string;
  description: string;
  prompt: string;
  outputFile: string;
  startedAt: number;
  status: "running" | "completed" | "failed" | "killed";
  output: string;
  error?: string;
  totalDurationMs?: number;
  totalTokens?: number;
  totalToolUseCount?: number;
  controller: AbortController;
};

export type BackgroundTaskSummary = {
  id: string;
  kind: "bash" | "agent";
  status: "running" | "completed" | "failed" | "killed";
  description: string;
  startedAt: number;
  outputFile?: string;
};

let currentTodos: TodoItem[] = [];
const readFileState = new Map<string, Map<string, ReadFileCacheEntry>>();
let bashCwd = process.cwd();
let bashEnv: NodeJS.ProcessEnv = { ...process.env };
let shellPathCache: string | null = null;
let shellSnapshotCache: { shellPath: string; path: string } | null = null;
let backgroundTaskSeq = 1;
let backgroundAgentSeq = 1;
const backgroundBashTasks = new Map<string, BackgroundBashTask>();
const backgroundAgentTasks = new Map<string, BackgroundAgentTask>();
const foregroundBashTasks = new Set<ForegroundBashTask>();
const BASH_MAX_OUTPUT_DEFAULT = 30_000;
const BASH_MAX_OUTPUT_UPPER_LIMIT = 150_000;
const BASH_PREVIEW_SIZE_BYTES = 2_000;
const BASH_MAX_PERSISTED_OUTPUT_BYTES = 64 * 1024 * 1024;
const BASH_PROGRESS_THRESHOLD_MS = 2_000;
const BASH_PROGRESS_INTERVAL_MS = 1_000;
const MAX_LINES_TO_READ = 2_000;
const DEFAULT_READ_MAX_OUTPUT_TOKENS = 25_000;
const READ_BYTES_PER_TOKEN = 4;
const DEFAULT_READ_MAX_SIZE_BYTES = 256 * 1024;
const TASK_TOOL_DESCRIPTION = `Launch a new agent to handle complex, multi-step tasks autonomously.

The Task tool launches a specialized subagent that starts fresh and handles a focused task with its own tool loop.

When NOT to use the Task tool:
- If you want to read a specific file path, use the Read tool or search tools instead.
- If you are searching for a specific class, symbol, or string, use Glob/Grep or Bash search commands instead.
- If you are searching within a specific file or a small set of files, use Read instead.
- Do not use Task for work that is simpler and faster to do directly.

Usage notes:
- Always include a short description (3-5 words) summarizing what the agent will do.
- The prompt must be a complete task briefing, but do not paste large raw command output, whole file contents, or the full parent transcript into it. Give paths, goals, constraints, and expected output; let the subagent use tools to inspect files.
- Clearly tell the agent whether you expect it to write code or just research.
- Foreground Task is for results needed before continuing. Background Task is for independent work; when it completes, you will be notified automatically and should not poll.`;
export const FILE_UNCHANGED_STUB = "File unchanged since last read. The content from the earlier Read tool_result in this conversation is still current — refer to that instead of re-reading.";

// ============================================================
// Built-in Tools (1:1 from binary)
// ============================================================

export const BUILTIN_TOOLS: Tool[] = [
  {
    name: "Bash",
    description: "Execute a shell command in the current working directory",
    input_schema: {
      type: "object",
      properties: {
        command: { type: "string", description: "The shell command to execute" },
        description: { type: "string", description: "Description of what the command does" },
        timeout: { type: "number", description: "Timeout in milliseconds" },
        run_in_background: { type: "boolean", description: "Run command as a background task" },
      },
      required: ["command"],
    },
    requiresPermission: true,
    async execute(input, signal, context) {
      const cmd = input.command as string;
      const cwdState = getBashCwd();
      const stateFile = join(tmpdir(), `claude-code-bash-${Date.now()}-${Math.random().toString(36).slice(2)}.state`);
      const timeout = getBashTimeout(input.timeout);
      const shellPath = getShellPath();
      const shellSnapshotPath = getShellSnapshotPath(shellPath);
      let keepStateFileForBackgroundTask = false;

      if (input.run_in_background === true) {
        return startBackgroundBash(cmd, cwdState.cwd, cwdState.warning, timeout, shellPath, shellSnapshotPath, context);
      }

      try {
        const command = wrapBashCommand(cmd, stateFile, shellPath, shellSnapshotPath);
        const execution = await runForegroundBash(command, {
          commandText: cmd,
          cwd: cwdState.cwd,
          stateFile,
          timeout,
          shellPath,
          signal,
          env: getShellEnv(shellPath),
          context,
          explicitTimeout: input.timeout === undefined ? undefined : timeout,
        });
        if (execution.type === "backgrounded") {
          keepStateFileForBackgroundTask = true;
          return {
            content: `Background task started: ${execution.taskId}`,
            display: {
              type: "bash_background",
              taskId: execution.taskId,
              command: cmd,
              cwd: cwdState.cwd,
              status: "running",
            },
          };
        }
        const { stdout, stderr } = execution;
        const state = readBashState(stateFile);
        updateBashState(state);
        const finalStderr = [stderr, cwdState.warning].filter(Boolean).join("\n");
        const output = prepareBashOutput(stdout, finalStderr, state.exitCode, context);
        return {
          content: output.content,
          isError: state.exitCode !== 0 || undefined,
          display: {
            type: "bash",
            stdout: output.stdout,
            stderr: output.stderr,
            exitCode: state.exitCode,
            cwd: state.cwd || cwdState.cwd,
            cwdResetWarning: cwdState.warning,
            persistedOutputPath: output.persistedOutputPath,
            persistedOutputSize: output.persistedOutputSize,
            ...(isSilentBashCommand(cmd) ? { noOutputExpected: true } : {}),
            ...(input.timeout === undefined ? {} : { timeoutMs: timeout }),
          },
        };
      } catch (e: any) {
        if (signal?.aborted) {
          return {
            content: "Interrupted",
            isError: true,
            display: {
              type: "bash",
              stdout: "",
              stderr: "Interrupted",
              exitCode: null,
              cwd: cwdState.cwd,
              ...(isSilentBashCommand(cmd) ? { noOutputExpected: true } : {}),
              ...(input.timeout === undefined ? {} : { timeoutMs: timeout }),
            },
          };
        }
        const stdout = typeof e.stdout === "string" ? e.stdout : "";
        const stderr = typeof e.stderr === "string" ? e.stderr : "";
        const state = readBashState(stateFile);
        updateBashState(state);
        const exitCode = state.exitCode ?? (typeof e.code === "number" ? e.code : 1);
        const finalStderr = [stderr, cwdState.warning].filter(Boolean).join("\n");
        const timedOut = e.killed === true || e.signal === "SIGTERM";
        const errorText = timedOut ? `Command timed out after ${formatDurationMs(timeout)}` : e.message;
        const output = prepareBashOutput(stdout, finalStderr || errorText, exitCode, context);
        return {
          content: output.content,
          isError: true,
          display: {
            type: "bash",
            stdout: output.stdout,
            stderr: output.stderr || "Command failed",
            exitCode,
            cwd: state.cwd || cwdState.cwd,
            cwdResetWarning: cwdState.warning,
            persistedOutputPath: output.persistedOutputPath,
            persistedOutputSize: output.persistedOutputSize,
            ...(isSilentBashCommand(cmd) ? { noOutputExpected: true } : {}),
            ...(input.timeout === undefined ? {} : { timeoutMs: timeout }),
          },
        };
      } finally {
        if (!keepStateFileForBackgroundTask) cleanupStateFile(stateFile);
      }
    },
  },
  {
    name: "BashOutput",
    description: "Read stdout/stderr and status for a background Bash task",
    input_schema: {
      type: "object",
      properties: {
        bash_id: { type: "string", description: "Background bash task id" },
      },
      required: ["bash_id"],
    },
    async execute(input, _signal, context) {
      const taskId = String(input.bash_id || "");
      const task = backgroundBashTasks.get(taskId);
      if (!task) return { content: `Error: Background task not found: ${taskId}`, isError: true };
      const status = `Status: ${task.status}`;
      const output = prepareBashOutput(task.stdout, task.stderr, task.exitCode, context);
      return {
        content: [status, output.content === "(no output)" ? "" : output.content].filter(Boolean).join("\n") || status,
        isError: task.status === "failed" || undefined,
        display: {
          type: "bash",
          stdout: output.stdout,
          stderr: output.stderr,
          exitCode: task.exitCode,
          cwd: task.cwd,
          persistedOutputPath: output.persistedOutputPath,
          persistedOutputSize: output.persistedOutputSize,
        },
      };
    },
  },
  {
    name: "KillBash",
    description: "Stop a running background Bash task",
    input_schema: {
      type: "object",
      properties: {
        bash_id: { type: "string", description: "Background bash task id" },
      },
      required: ["bash_id"],
    },
    requiresPermission: true,
    async execute(input) {
      const taskId = String(input.bash_id || "");
      const task = backgroundBashTasks.get(taskId);
      if (!task) return { content: `Error: Background task not found: ${taskId}`, isError: true };
      if (task.status !== "running") return { content: `Background task ${taskId} is already ${task.status}` };
      task.status = "killed";
      task.controller.abort(new Error("Killed"));
      task.child.kill("SIGTERM");
      return { content: `Stopped background task: ${taskId}` };
    },
  },
  {
    name: "Task",
    description: TASK_TOOL_DESCRIPTION,
    input_schema: {
      type: "object",
      properties: {
        description: { type: "string", description: "A short 3-5 word description of the task" },
        prompt: {
          type: "string",
          description: "A complete task briefing. Include goals, paths, constraints, and expected output, but do not paste large raw outputs, whole files, or the full parent transcript.",
        },
        subagent_type: { type: "string", description: "The type of specialized agent to use" },
        run_in_background: { type: "boolean", description: "Set to true to run this agent in the background. You will be notified when it completes." },
      },
      required: ["description", "prompt"],
    },
    async execute(input, signal, context) {
      const description = String(input.description || "").trim();
      const prompt = String(input.prompt || "").trim();
      const subagentType = typeof input.subagent_type === "string" ? input.subagent_type : undefined;
      if (!description || !prompt) {
        return { content: "Error: description and prompt are required", isError: true };
      }
      if (!context?.runSubagent) {
        return { content: "Error: Task tool requires an agent execution context", isError: true };
      }

      if (input.run_in_background === true) {
        return startBackgroundAgentTask({ description, prompt, subagentType, context });
      }

      const startedAt = Date.now();
      const parentToolUseId = context.toolUseId || `task-${startedAt}`;
      const agentId = `${parentToolUseId}-agent`;
      await context.emitProgress?.({
        type: "agent_progress",
        description,
        agentId,
        message: "Initializing…",
        elapsedTimeSeconds: 0,
      });
      let result: SubagentExecutionResult;
      try {
        result = await context.runSubagent({
          description,
          prompt,
          subagentType,
          parentToolUseId,
          agentId,
        }, signal);
      } catch (error) {
        result = {
          agentId,
          status: "failed",
          content: "",
          error: error instanceof Error ? error.message : String(error),
          totalDurationMs: Date.now() - startedAt,
          totalTokens: 0,
          totalToolUseCount: 0,
        };
      }
      const status = result.status || "completed";
      return {
        content: formatSubagentToolResult(result),
        isError: status === "failed" || undefined,
        display: {
          type: "agent",
          agentId: result.agentId,
          description,
          prompt,
          status,
          content: result.content,
          totalDurationMs: result.totalDurationMs,
          totalTokens: result.totalTokens,
          totalToolUseCount: result.totalToolUseCount,
          ...(result.error ? { error: result.error } : {}),
        },
      };
    },
  },
  {
    name: "TaskOutput",
    description: "Read output and status from a background agent task",
    input_schema: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "Background agent task id" },
        block: { type: "boolean", description: "Whether to wait for completion" },
        timeout: { type: "number", description: "Maximum wait time in milliseconds" },
      },
      required: ["task_id"],
    },
    async execute(input, signal) {
      const taskId = String(input.task_id || "");
      const task = backgroundAgentTasks.get(taskId);
      if (!task) return { content: `Error: Background agent task not found: ${taskId}`, isError: true };
      const shouldBlock = input.block !== false;
      const timeoutMs = typeof input.timeout === "number" ? Math.max(0, Math.min(input.timeout, 600000)) : 30000;
      let timedOut = false;
      if (shouldBlock && task.status === "running") {
        timedOut = !(await waitForBackgroundAgentTask(task, timeoutMs, signal));
      }
      return formatBackgroundAgentTaskOutput(task, timedOut ? "timeout" : undefined);
    },
  },
  {
    name: "TaskStop",
    description: "Stop a running background agent task",
    input_schema: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "Background agent task id" },
      },
      required: ["task_id"],
    },
    requiresPermission: true,
    async execute(input) {
      const taskId = String(input.task_id || "");
      const task = backgroundAgentTasks.get(taskId);
      if (!task) return { content: `Error: Background agent task not found: ${taskId}`, isError: true };
      if (task.status !== "running") return { content: `Background agent task ${taskId} is already ${task.status}` };
      task.status = "killed";
      task.error = "Killed";
      task.controller.abort(new Error("Killed"));
      writeBackgroundAgentOutputFile(task);
      return { content: `Stopped background agent task: ${taskId}` };
    },
  },
  {
    name: "LS",
    description: "List files and directories in a given path",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Directory path to list" },
        ignore: { type: "array", description: "Glob patterns to ignore" },
      },
      required: ["path"],
    },
    async execute(input) {
      const dir = resolve(String(input.path || "."));
      if (!existsSync(dir)) return { content: `Error: Path not found: ${dir}`, isError: true };
      if (!statSync(dir).isDirectory()) return { content: `Error: Not a directory: ${dir}`, isError: true };
      const ignore = Array.isArray(input.ignore) ? input.ignore.map(String).map(globToRegExp) : [];
      const entries = readdirSync(dir, { withFileTypes: true })
        .map(entry => `${entry.name}${entry.isDirectory() ? "/" : ""}`)
        .filter(name => !ignore.some(regex => regex.test(name)))
        .sort((a, b) => a.localeCompare(b));
      return { content: entries.join("\n") || "(empty)" };
    },
  },
  {
    name: "Read",
    description: "Read a file from the local filesystem",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to the file to read" },
        offset: { type: "number", description: "Line number to start reading from" },
        limit: { type: "number", description: "Number of lines to read" },
      },
      required: ["file_path"],
    },
    requiresPermission: true,
    async execute(input, _signal, context) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      const stat = statSync(fp);
      if (!stat.isFile()) return { content: `Error: Not a file: ${fp}`, isError: true };
      if (stat.size === 0) {
        return {
          content: "<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>",
          display: {
            type: "read",
            filePath: fp,
            startLine: 1,
            numLines: 0,
            totalLines: 0,
            status: "empty",
          },
        };
      }
      const maxSizeBytes = getReadMaxSizeBytes();
      if (stat.size > maxSizeBytes && input.offset === undefined && input.limit === undefined) {
        return {
          content: `Error: File content too large: ${fp} (${stat.size} bytes). Use offset and limit to read specific portions of the file.`,
          isError: true,
        };
      }
      const mediaSummary = summarizeNonTextFile(fp, stat.size);
      if (mediaSummary) return { content: mediaSummary };
      try {
        const content = readFileSync(fp, "utf-8");
        const lines = content.split("\n");
        const offset = typeof input.offset === "number" ? input.offset : 1;
        const lineOffset = offset === 0 ? 0 : offset - 1;
        const limit = typeof input.limit === "number" ? input.limit : MAX_LINES_TO_READ;
        const explicitLimit = typeof input.limit === "number" ? input.limit : undefined;
        const cache = getReadFileCache(context);
        const cached = cache.get(fp);
        if (cached && cached.offset === offset && cached.limit === explicitLimit && cached.mtimeMs === stat.mtimeMs) {
          return {
            content: FILE_UNCHANGED_STUB,
            display: { type: "text", summary: "file_unchanged" },
          };
        }
        cache.set(fp, {
          mtimeMs: stat.mtimeMs,
          offset,
          limit: explicitLimit,
        });
        const selectedLines = lines.slice(lineOffset, lineOffset + limit);
        if (selectedLines.length === 0) {
          return {
            content: `<system-reminder>Warning: the file exists but is shorter than the provided offset (${offset}). The file has ${lines.length} lines.</system-reminder>`,
            display: {
              type: "read",
              filePath: fp,
              startLine: offset,
              numLines: 0,
              totalLines: lines.length,
              status: "offset_out_of_range",
            },
          };
        }
        const numberedContent = addLineNumbers(selectedLines, offset);
        const tokenError = validateReadOutputTokens(numberedContent);
        if (tokenError) return { content: tokenError, isError: true };
        return {
          content: numberedContent,
          display: {
            type: "read",
            filePath: fp,
            startLine: offset,
            numLines: selectedLines.length,
            totalLines: lines.length,
            status: "text",
          },
        };
      } catch (e: any) {
        return { content: `Error reading file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Write",
    description: "Write a file to the local filesystem",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to write the file to" },
        content: { type: "string", description: "Content to write" },
      },
      required: ["file_path", "content"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      try {
        const before = existsSync(fp) ? readFileSync(fp, "utf-8") : "";
        const next = input.content as string;
        writeFileSync(fp, next, "utf-8");
        const summary = `File written: ${relative(process.cwd(), fp)}`;
        return {
          content: summary,
          display: {
            type: "edit",
            filePath: fp,
            summary,
            diff: createUnifiedDiff(relative(process.cwd(), fp), before, next),
          },
        };
      } catch (e: any) {
        return { content: `Error writing file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "MultiEdit",
    description: "Make multiple precise edits to an existing file",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to the file to edit" },
        edits: {
          type: "array",
          description: "Edits to apply sequentially",
          items: {
            type: "object",
            properties: {
              old_string: { type: "string", description: "Text to replace" },
              new_string: { type: "string", description: "Replacement text" },
              replace_all: { type: "boolean", description: "Replace all occurrences" },
            },
          },
        },
      },
      required: ["file_path", "edits"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      if (!Array.isArray(input.edits)) return { content: "Error: edits must be an array", isError: true };

      try {
        const before = readFileSync(fp, "utf-8");
        let content = before;
        let applied = 0;
        for (const edit of input.edits) {
          if (!edit || typeof edit !== "object") {
            return { content: "Error: invalid edit entry", isError: true };
          }
          const item = edit as Record<string, unknown>;
          const oldString = String(item.old_string ?? "");
          const newString = String(item.new_string ?? "");
          const replaceAll = Boolean(item.replace_all);
          if (!oldString) return { content: "Error: old_string is required", isError: true };
          if (!content.includes(oldString)) {
            return { content: `Error: old_string not found in file for edit ${applied + 1}`, isError: true };
          }
          content = replaceAll
            ? content.split(oldString).join(newString)
            : content.replace(oldString, newString);
          applied++;
        }
        writeFileSync(fp, content, "utf-8");
        const summary = `Applied ${applied} edits to ${relative(process.cwd(), fp)}`;
        return {
          content: summary,
          display: {
            type: "edit",
            filePath: fp,
            summary,
            diff: createUnifiedDiff(relative(process.cwd(), fp), before, content),
          },
        };
      } catch (e: any) {
        return { content: `Error editing file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Edit",
    description: "Make precise edits to an existing file",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path to the file to edit" },
        old_string: { type: "string", description: "Text to replace" },
        new_string: { type: "string", description: "Replacement text" },
        replace_all: { type: "boolean", description: "Replace all occurrences" },
      },
      required: ["file_path", "old_string", "new_string"],
    },
    requiresPermission: true,
    async execute(input) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      try {
        const before = readFileSync(fp, "utf-8");
        let content = before;
        const oldS = input.old_string as string;
        const newS = input.new_string as string;
        const replaceAll = input.replace_all as boolean;

        if (replaceAll) {
          content = content.split(oldS).join(newS);
        } else {
          const idx = content.indexOf(oldS);
          if (idx === -1) return { content: `Error: old_string not found in file`, isError: true };
          content = content.slice(0, idx) + newS + content.slice(idx + oldS.length);
        }

        writeFileSync(fp, content, "utf-8");
        const summary = `File edited: ${relative(process.cwd(), fp)}`;
        return {
          content: summary,
          display: {
            type: "edit",
            filePath: fp,
            summary,
            diff: createUnifiedDiff(relative(process.cwd(), fp), before, content),
          },
        };
      } catch (e: any) {
        return { content: `Error editing file: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "NotebookEdit",
    description: "Edit a cell in a Jupyter notebook (.ipynb)",
    input_schema: {
      type: "object",
      properties: {
        notebook_path: { type: "string", description: "Path to the Jupyter notebook to edit" },
        cell_id: { type: "string", description: "Cell id, or cell-N numeric index" },
        new_source: { type: "string", description: "New source for the cell" },
        cell_type: { type: "string", description: "code or markdown" },
        edit_mode: { type: "string", description: "replace, insert, or delete" },
      },
      required: ["notebook_path", "new_source"],
    },
    requiresPermission: true,
    async execute(input) {
      return editNotebook(input);
    },
  },
  {
    name: "Glob",
    description: "Find files matching a glob pattern",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Glob pattern to match (e.g. *.ts)" },
        path: { type: "string", description: "Directory to search in" },
        hidden: { type: "boolean", description: "Include hidden files and directories" },
        ignore: { type: "array", description: "Glob patterns to ignore" },
      },
      required: ["pattern"],
    },
    async execute(input) {
      const dir = resolve((input.path as string) || ".");
      const pattern = input.pattern as string;
      try {
        const regex = globToRegExp(pattern);
        const ignore = Array.isArray(input.ignore) ? input.ignore.map(String).map(globToRegExp) : [];
        const includeHidden = input.hidden === true;
        const files = readdirSync(dir, { recursive: true } as any)
          .map(file => String(file).replace(/\\/g, "/"))
          .filter(file => includeHidden || !hasHiddenPathPart(file))
          .filter(file => !ignore.some(ignorePattern => ignorePattern.test(file)))
          .filter(file => regex.test(file))
          .sort((a, b) => a.localeCompare(b))
          .slice(0, 100);
        return { content: files.join("\n") || "(no matches)" };
      } catch (e: any) {
        return { content: `Error: ${e.message}`, isError: true };
      }
    },
  },
  {
    name: "Grep",
    description: "Search file contents using regex",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Regex pattern to search for" },
        path: { type: "string", description: "Directory or file to search in" },
        include: { type: "string", description: "File pattern to include (e.g. *.ts)" },
        head_limit: { type: "number", description: "Maximum number of matching lines to return" },
        case_insensitive: { type: "boolean", description: "Search case-insensitively" },
        hidden: { type: "boolean", description: "Search hidden files and directories" },
        output_mode: { type: "string", description: "content, files_with_matches, or count" },
      },
      required: ["pattern"],
    },
    async execute(input) {
      const pattern = input.pattern as string;
      const path = String(input.path || ".");
      const include = (input.include as string) || "*";
      const headLimit = typeof input.head_limit === "number" ? Math.max(1, input.head_limit) : 200;
      const outputMode = String(input.output_mode || "content");
      try {
        const command = [
          "rg",
          outputMode === "files_with_matches" ? "--files-with-matches" : outputMode === "count" ? "--count" : "--line-number",
          outputMode === "content" ? "--no-heading" : "",
          "--color=never",
          input.case_insensitive === true ? "--ignore-case" : "",
          input.hidden === true ? "--hidden" : "",
          include ? `-g ${shellQuote(include)}` : "",
          "--",
          shellQuote(pattern),
          shellQuote(path),
        ]
          .filter(Boolean)
          .join(" ");
        const { stdout } = await execAsync(command, {
          cwd: process.cwd(),
          timeout: 120000,
          maxBuffer: 10 * 1024 * 1024,
          shell: getShellPath(),
        });
        const filtered = filterGrepHiddenOutput(stdout.trimEnd(), input.hidden === true);
        return { content: limitLines(filtered, headLimit) || "(no matches)" };
      } catch (e: any) {
        const stdout = typeof e.stdout === "string" ? e.stdout.trimEnd() : "";
        if (stdout) {
          const filtered = filterGrepHiddenOutput(stdout, input.hidden === true);
          return { content: limitLines(filtered, headLimit) || "(no matches)" };
        }
        if (e.code === 1) return { content: "(no matches)" };
        const stderr = typeof e.stderr === "string" ? e.stderr.trim() : "";
        return { content: `Error: ${stderr || e.message}`, isError: true };
      }
    },
  },
  {
    name: "TodoWrite",
    description: "Create and update the current task todo list",
    input_schema: {
      type: "object",
      properties: {
        todos: {
          type: "array",
          description: "Complete replacement todo list",
          items: {
            type: "object",
            properties: {
              content: { type: "string", description: "Todo text" },
              status: { type: "string", description: "pending, in_progress, or completed" },
              activeForm: { type: "string", description: "Present-tense action form" },
            },
          },
        },
      },
      required: ["todos"],
    },
    async execute(input) {
      if (!Array.isArray(input.todos)) return { content: "Error: todos must be an array", isError: true };
      const parsed: TodoItem[] = [];
      for (const item of input.todos) {
        if (!item || typeof item !== "object") return { content: "Error: invalid todo entry", isError: true };
        const todo = item as Record<string, unknown>;
        const status = String(todo.status);
        if (status !== "pending" && status !== "in_progress" && status !== "completed") {
          return { content: `Error: invalid todo status: ${status}`, isError: true };
        }
        parsed.push({
          content: String(todo.content || ""),
          status,
          activeForm: todo.activeForm ? String(todo.activeForm) : undefined,
        });
      }
      currentTodos = parsed;
      const completed = currentTodos.filter(todo => todo.status === "completed").length;
      return { content: `Todos updated: ${completed}/${currentTodos.length} completed` };
    },
  },
  {
    name: "WebSearch",
    description: "Search the web for current information using Anthropic's server-side web search tool",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query to use" },
        allowed_domains: { type: "array", description: "Only include search results from these domains" },
        blocked_domains: { type: "array", description: "Never include search results from these domains" },
        num_results: { type: "number", description: "Maximum number of web searches to perform" },
        livecrawl: { type: "string", description: "Live crawl mode: fallback or preferred" },
        search_type: { type: "string", description: "Search type: auto, fast, or deep" },
        context_max_characters: { type: "number", description: "Maximum context characters for search results" },
      },
      required: ["query"],
    },
    requiresPermission: true,
    async execute(input, signal, context) {
      const query = String(input.query || "").trim();
      const allowedDomains = toStringArray(input.allowed_domains);
      const blockedDomains = toStringArray(input.blocked_domains);

      if (query.length < 2) return { content: "Error: Missing query", isError: true };
      if (allowedDomains.length > 0 && blockedDomains.length > 0) {
        return {
          content: "Error: Cannot specify both allowed_domains and blocked_domains in the same request",
          isError: true,
        };
      }

      try {
        const output = await runAnthropicWebSearch(query, {
          allowedDomains,
          blockedDomains,
          maxUses: 8,
          signal,
          context,
        });
        const summary = summarizeWebSearchOutput(output);
        return {
          content: formatWebSearchToolResult(output),
          display: {
            type: "web_search",
            query,
            searchCount: summary.searchCount,
            totalResultCount: summary.totalResultCount,
            durationSeconds: output.durationSeconds,
            results: flattenWebSearchResults(output.results),
          },
        };
      } catch (error: any) {
        return {
          content: error?.name === "AbortError" ? "Interrupted" : `Error searching web: ${error?.message || String(error)}`,
          isError: true,
        };
      }
    },
  },
  {
    name: "WebFetch",
    description: "Fetch a URL and return readable text content",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to fetch" },
        prompt: { type: "string", description: "Extraction instruction" },
      },
      required: ["url"],
    },
    async execute(input, signal) {
      const url = String(input.url || "");
      if (!/^https?:\/\//u.test(url)) return { content: `Error: invalid URL: ${url}`, isError: true };
      try {
        const response = await fetch(url, { signal, headers: { "User-Agent": "claude-code-full/2.1.128" } });
        if (!response.ok) return { content: `Error: HTTP ${response.status} ${response.statusText}`, isError: true };
        const contentType = response.headers.get("content-type") || "";
        const text = await response.text();
        const readable = contentType.includes("text/html") ? htmlToText(text) : text;
        return { content: readable.trim().slice(0, 20000) || "(empty)" };
      } catch (e: any) {
        return { content: e.name === "AbortError" ? "Interrupted" : `Error fetching URL: ${e.message}`, isError: true };
      }
    },
  },
];

export function getToolDefs(): ToolDef[] {
  return BUILTIN_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.input_schema,
  }));
}

export async function executeTool(
  name: string,
  input: Record<string, unknown>,
  signal?: AbortSignal,
  context?: ToolExecutionContext,
): Promise<ToolResult> {
  const tool = BUILTIN_TOOLS.find((t) => t.name === name);
  if (!tool) {
    return {
      content: `<tool_use_error>Error: No such tool available: ${name}</tool_use_error>`,
      isError: true,
    };
  }
  return tool.execute(input, signal, context);
}

type WebSearchRequestOptions = {
  allowedDomains: string[];
  blockedDomains: string[];
  maxUses: number;
  signal?: AbortSignal;
  context?: ToolExecutionContext;
};

async function runAnthropicWebSearch(query: string, options: WebSearchRequestOptions): Promise<WebSearchOutput> {
  const cfg = getApiConfig();
  if (!cfg) throw new Error("No API credentials configured");

  const startedAt = Date.now();
  await emitWebSearchProgress(options.context, {
    stage: "query_update",
    query,
    elapsedTimeSeconds: 0,
  });

  const requestSignal = createToolRequestSignal(options.signal, 120000);
  try {
    const webSearchTool: Record<string, unknown> = {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: options.maxUses,
    };
    if (options.allowedDomains.length > 0) webSearchTool.allowed_domains = options.allowedDomains;
    if (options.blockedDomains.length > 0) webSearchTool.blocked_domains = options.blockedDomains;

    const response = await fetch(`${cfg.baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cfg.token,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: cfg.model,
        max_tokens: 4096,
        stream: true,
        system: "You are an assistant for performing a web search tool use",
        messages: [
          {
            role: "user",
            content: `Perform a web search for the query: ${query}`,
          },
        ],
        tools: [webSearchTool],
      }),
      signal: requestSignal.signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 300) || response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";
    let currentServerToolId: string | null = null;
    let currentServerToolInput = "";
    const toolQueries = new Map<string, string>();
    const results: Array<WebSearchResultBlock | string> = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") break;
        const event = JSON.parse(data);
        const block = event.content_block;
        const delta = event.delta;

        if (event.type === "content_block_start" && block?.type === "server_tool_use") {
          currentServerToolId = String(block.id || "");
          currentServerToolInput = block.input ? JSON.stringify(block.input) : "";
          const blockQuery = extractWebSearchQuery(currentServerToolInput);
          if (currentServerToolId && blockQuery) {
            toolQueries.set(currentServerToolId, blockQuery);
            await emitWebSearchProgress(options.context, {
              stage: "query_update",
              query: blockQuery,
              elapsedTimeSeconds: elapsedSecondsSince(startedAt),
            });
          }
          continue;
        }

        if (event.type === "content_block_delta" && currentServerToolId && delta?.type === "input_json_delta") {
          currentServerToolInput += String(delta.partial_json || "");
          const blockQuery = extractWebSearchQuery(currentServerToolInput);
          if (blockQuery && toolQueries.get(currentServerToolId) !== blockQuery) {
            toolQueries.set(currentServerToolId, blockQuery);
            await emitWebSearchProgress(options.context, {
              stage: "query_update",
              query: blockQuery,
              elapsedTimeSeconds: elapsedSecondsSince(startedAt),
            });
          }
          continue;
        }

        if (event.type === "content_block_stop" && currentServerToolId) {
          currentServerToolId = null;
          currentServerToolInput = "";
          continue;
        }

        if (event.type === "content_block_start" && block?.type === "web_search_tool_result") {
          const toolUseId = String(block.tool_use_id || `web_search_${results.length + 1}`);
          const hits = extractWebSearchHits(block.content);
          const errorText = extractWebSearchError(block.content);
          const resultQuery = toolQueries.get(toolUseId) || query;
          if (hits.length > 0) {
            results.push({ tool_use_id: toolUseId, content: hits });
            await emitWebSearchProgress(options.context, {
              stage: "search_results_received",
              query: resultQuery,
              resultCount: hits.length,
              elapsedTimeSeconds: elapsedSecondsSince(startedAt),
            });
          } else if (errorText) {
            results.push(errorText);
          }
        }
      }
    }

    return {
      query,
      results: results.length > 0 ? results : ["No search results found."],
      durationSeconds: elapsedSecondsSince(startedAt),
    };
  } finally {
    requestSignal.cleanup();
  }
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(item => String(item).trim()).filter(Boolean);
}

function summarizeWebSearchOutput(output: WebSearchOutput): { searchCount: number; totalResultCount: number } {
  let searchCount = 0;
  let totalResultCount = 0;
  for (const result of output.results) {
    if (typeof result === "string") continue;
    searchCount++;
    totalResultCount += result.content.length;
  }
  return { searchCount, totalResultCount };
}

function flattenWebSearchResults(results: Array<WebSearchResultBlock | string>): WebSearchHit[] {
  return results.flatMap(result => typeof result === "string" ? [] : result.content);
}

function formatWebSearchToolResult(output: WebSearchOutput): string {
  const lines = [`Web search results for query: "${output.query}"`, ""];
  for (const result of output.results) {
    if (typeof result === "string") {
      lines.push(result, "");
      continue;
    }
    if (result.content.length === 0) {
      lines.push("No links found.", "");
      continue;
    }
    lines.push("Links:");
    for (const link of result.content) {
      const snippet = link.snippet ? `: ${link.snippet}` : "";
      lines.push(`  - [${link.title}](${link.url})${snippet}`);
    }
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}

function extractWebSearchHits(content: unknown): WebSearchHit[] {
  if (!Array.isArray(content)) return [];
  const hits: WebSearchHit[] = [];
  for (const item of content) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const title = typeof record.title === "string" ? record.title : "";
    const url = typeof record.url === "string" ? record.url : "";
    if (!title || !url) continue;
    const snippet = typeof record.snippet === "string" ? record.snippet : undefined;
    hits.push({ title, url, ...(snippet ? { snippet } : {}) });
  }
  return hits;
}

function extractWebSearchError(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  const record = content as Record<string, unknown>;
  if (record.type !== "web_search_tool_result_error") return "";
  const code = typeof record.error_code === "string" ? record.error_code : "unknown_error";
  return `Web search error: ${code}`;
}

function extractWebSearchQuery(inputJson: string): string {
  try {
    const parsed = JSON.parse(inputJson) as Record<string, unknown>;
    return typeof parsed.query === "string" ? parsed.query : "";
  } catch {
    const match = inputJson.match(/"query"\s*:\s*"((?:[^"\\]|\\.)*)"/u);
    if (!match?.[1]) return "";
    try {
      return JSON.parse(`"${match[1]}"`) as string;
    } catch {
      return "";
    }
  }
}

async function emitWebSearchProgress(
  context: ToolExecutionContext | undefined,
  progress: Omit<Extract<ToolProgressDisplay, { type: "web_search_progress" }>, "type">,
): Promise<void> {
  await context?.emitProgress?.({
    type: "web_search_progress",
    ...progress,
  });
}

function elapsedSecondsSince(startedAt: number): number {
  return Math.max(0, (Date.now() - startedAt) / 1000);
}

function createToolRequestSignal(signal: AbortSignal | undefined, timeoutMs: number): {
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
  if (signal?.aborted) abortFromParent();
  else signal?.addEventListener("abort", abortFromParent, { once: true });
  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", abortFromParent);
    },
  };
}

function startBackgroundAgentTask({
  description,
  prompt,
  subagentType,
  context,
}: {
  description: string;
  prompt: string;
  subagentType?: string;
  context: ToolExecutionContext;
}): ToolResult {
  const taskId = `local_agent_${backgroundAgentSeq++}`;
  const agentId = `${context.toolUseId || taskId}-agent`;
  const outputDir = getToolResultsDir(context);
  const outputFile = join(outputDir, `${sanitizeToolResultId(taskId)}.txt`);
  const controller = new AbortController();
  const task: BackgroundAgentTask = {
    id: taskId,
    agentId,
    description,
    prompt,
    outputFile,
    startedAt: Date.now(),
    status: "running",
    output: "",
    controller,
  };
  mkdirSync(outputDir, { recursive: true });
  backgroundAgentTasks.set(taskId, task);
  writeBackgroundAgentOutputFile(task);

  void context.runSubagent!({
    description,
    prompt,
    subagentType,
    parentToolUseId: context.toolUseId || taskId,
    agentId,
    runInBackground: true,
  }, controller.signal).then(result => {
    if (task.status === "killed") return;
    const status = result.status || "completed";
    task.status = status;
    task.output = result.content || (status === "failed" ? result.error || "" : "");
    task.error = status === "failed" ? result.error || task.output || "Subagent failed" : undefined;
    task.totalDurationMs = result.totalDurationMs;
    task.totalTokens = result.totalTokens;
    task.totalToolUseCount = result.totalToolUseCount;
    writeBackgroundAgentOutputFile(task);
    void context.emitNotification?.(`Background agent ${status}: ${task.id} (${task.description}). Output: ${task.outputFile}`);
  }).catch(error => {
    if (task.status === "killed") return;
    task.status = "failed";
    task.error = error instanceof Error ? error.message : String(error);
    task.output = task.error;
    task.totalDurationMs = Date.now() - task.startedAt;
    task.totalTokens = 0;
    task.totalToolUseCount = 0;
    writeBackgroundAgentOutputFile(task);
    void context.emitNotification?.(`Background agent failed: ${task.id} (${task.description}). Output: ${task.outputFile}`);
  });

  return {
    content: [
      "Async agent launched successfully.",
      `task_id: ${taskId}`,
      `agentId: ${agentId}`,
      "The agent is working in the background. You will be notified automatically when it completes.",
      `output_file: ${outputFile}`,
      "If asked, check progress with TaskOutput using the task_id.",
    ].join("\n"),
    display: {
      type: "agent_background",
      taskId,
      agentId,
      description,
      prompt,
      outputFile,
      status: "running",
    },
  };
}

async function waitForBackgroundAgentTask(
  task: BackgroundAgentTask,
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<boolean> {
  const startedAt = Date.now();
  while (task.status === "running" && Date.now() - startedAt < timeoutMs) {
    if (signal?.aborted) throw signal.reason instanceof Error ? signal.reason : new Error("Interrupted");
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return task.status !== "running";
}

function formatBackgroundAgentTaskOutput(
  task: BackgroundAgentTask,
  retrievalOverride?: "timeout" | "not_ready" | "success",
): ToolResult {
  const retrievalStatus = retrievalOverride || (task.status === "running" ? "not_ready" : "success");
  const content = [
    `<retrieval_status>${retrievalStatus}</retrieval_status>`,
    `<task_id>${task.id}</task_id>`,
    "<task_type>local_agent</task_type>",
    `<status>${task.status}</status>`,
    task.output.trim() ? `<output>\n${task.output.trimEnd()}\n</output>` : "",
    task.error ? `<error>${task.error}</error>` : "",
  ].filter(Boolean).join("\n\n");

  if (task.status === "completed" || task.status === "failed") {
    return {
      content,
      isError: task.status === "failed" || undefined,
      display: {
        type: "agent",
        agentId: task.agentId,
        description: task.description,
        prompt: task.prompt,
        status: task.status,
        content: task.output,
        totalDurationMs: task.totalDurationMs ?? Date.now() - task.startedAt,
        totalTokens: task.totalTokens ?? 0,
        totalToolUseCount: task.totalToolUseCount ?? 0,
        ...(task.error ? { error: task.error } : {}),
      },
    };
  }

  return {
    content,
    isError: task.status === "killed" || undefined,
    display: {
      type: "agent_background",
      taskId: task.id,
      agentId: task.agentId,
      description: task.description,
      prompt: task.prompt,
      outputFile: task.outputFile,
      status: task.status,
    },
  };
}

function writeBackgroundAgentOutputFile(task: BackgroundAgentTask): void {
  const lines = [
    `task_id: ${task.id}`,
    `agent_id: ${task.agentId}`,
    `status: ${task.status}`,
    `description: ${task.description}`,
    "",
    task.output || "(running)",
    task.error ? `\nerror: ${task.error}` : "",
  ];
  writeFileSync(task.outputFile, lines.join("\n").trimEnd() + "\n", "utf8");
}

export function hasForegroundBashTasks(): boolean {
  return foregroundBashTasks.size > 0;
}

export function listBackgroundTasks(): BackgroundTaskSummary[] {
  const bashTasks: BackgroundTaskSummary[] = [...backgroundBashTasks.values()].map(task => ({
    id: task.id,
    kind: "bash",
    status: task.status,
    description: task.command,
    startedAt: task.startedAt,
  }));
  const agentTasks: BackgroundTaskSummary[] = [...backgroundAgentTasks.values()].map(task => ({
    id: task.id,
    kind: "agent",
    status: task.status,
    description: task.description,
    startedAt: task.startedAt,
    outputFile: task.outputFile,
  }));
  return [...bashTasks, ...agentTasks].sort((a, b) => b.startedAt - a.startedAt);
}

export function findBackgroundTask(taskId: string): BackgroundTaskSummary | undefined {
  return listBackgroundTasks().find(task => task.id === taskId);
}

export async function readBackgroundTaskOutput(
  taskId: string,
  signal?: AbortSignal,
  context?: ToolExecutionContext,
): Promise<ToolResult> {
  const task = findBackgroundTask(taskId);
  if (!task) return { content: `Background task not found: ${taskId}`, isError: true };
  if (task.kind === "bash") {
    return executeTool("BashOutput", { bash_id: taskId }, signal, context);
  }
  return executeTool("TaskOutput", { task_id: taskId, block: false }, signal, context);
}

export async function stopBackgroundTask(
  taskId: string,
  signal?: AbortSignal,
  context?: ToolExecutionContext,
): Promise<ToolResult> {
  const task = findBackgroundTask(taskId);
  if (!task) return { content: `Background task not found: ${taskId}`, isError: true };
  if (task.kind === "bash") {
    return executeTool("KillBash", { bash_id: taskId }, signal, context);
  }
  return executeTool("TaskStop", { task_id: taskId }, signal, context);
}

function formatSubagentToolResult(result: SubagentExecutionResult): string {
  const status = result.status || "completed";
  const content = result.content.trim()
    ? result.content.trim()
    : status === "failed"
      ? `Subagent failed: ${result.error || "Unknown error"}`
    : "(Subagent completed but returned no output.)";
  return [
    content,
    "",
    `agentId: ${result.agentId}`,
    status === "failed" ? "status: failed" : "",
    `<usage>total_tokens: ${result.totalTokens}`,
    `tool_uses: ${result.totalToolUseCount}`,
    `duration_ms: ${result.totalDurationMs}</usage>`,
  ].filter(Boolean).join("\n");
}

export function backgroundForegroundBashTasks(): string[] {
  const taskIds: string[] = [];
  for (const foregroundTask of [...foregroundBashTasks]) {
    if (foregroundTask.backgroundTaskId) continue;
    const taskId = `local_bash_${backgroundTaskSeq++}`;
    const controller = new AbortController();
    const backgroundTask: BackgroundBashTask = {
      id: taskId,
      command: foregroundTask.command,
      cwd: foregroundTask.cwd,
      startedAt: foregroundTask.startedAt,
      status: "running",
      stdout: foregroundTask.stdout,
      stderr: foregroundTask.stderr,
      exitCode: null,
      controller,
      child: foregroundTask.child,
    };
    backgroundBashTasks.set(taskId, backgroundTask);
    foregroundTask.backgroundTaskId = taskId;
    if (foregroundTask.progressTimer) {
      clearInterval(foregroundTask.progressTimer);
      foregroundTask.progressTimer = undefined;
    }
    foregroundBashTasks.delete(foregroundTask);
    foregroundTask.resolve({ type: "backgrounded", taskId });
    taskIds.push(taskId);
  }
  return taskIds;
}

export function resetToolStateForTests(): void {
  bashCwd = process.cwd();
  bashEnv = { ...process.env };
  currentTodos = [];
  readFileState.clear();
  for (const task of foregroundBashTasks) {
    if (task.progressTimer) clearInterval(task.progressTimer);
    task.child.kill("SIGTERM");
    cleanupStateFile(task.stateFile);
  }
  foregroundBashTasks.clear();
  for (const task of backgroundBashTasks.values()) {
    if (task.status === "running") {
      task.controller.abort(new Error("Reset"));
      task.child.kill("SIGTERM");
    }
  }
  backgroundBashTasks.clear();
  for (const task of backgroundAgentTasks.values()) {
    if (task.status === "running") {
      task.status = "killed";
      task.controller.abort(new Error("Reset"));
    }
  }
  backgroundAgentTasks.clear();
  backgroundTaskSeq = 1;
  backgroundAgentSeq = 1;
  shellPathCache = null;
  shellSnapshotCache = null;
}

function getReadFileCache(context?: ToolExecutionContext): Map<string, ReadFileCacheEntry> {
  const sessionKey = sanitizeToolResultId(context?.sessionId || "standalone");
  let cache = readFileState.get(sessionKey);
  if (!cache) {
    cache = new Map();
    readFileState.set(sessionKey, cache);
  }
  return cache;
}

function addLineNumbers(lines: string[], startLine: number): string {
  if (lines.length === 0) return "";
  return lines.map((line, index) => `${startLine + index}\t${line}`).join("\n");
}

function validateReadOutputTokens(content: string): string | null {
  const maxTokens = getReadMaxOutputTokens();
  const byteLength = Buffer.byteLength(content, "utf8");
  const maxBytes = maxTokens * READ_BYTES_PER_TOKEN;
  if (byteLength <= maxBytes) return null;
  const estimatedTokens = Math.ceil(byteLength / READ_BYTES_PER_TOKEN);
  return `Error: File content (${estimatedTokens} tokens) exceeds maximum allowed tokens (${maxTokens}). Use offset and limit parameters to read specific portions of the file, or search for specific content instead of reading the whole file.`;
}

function getReadMaxOutputTokens(): number {
  return parsePositiveInteger(process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS) ?? DEFAULT_READ_MAX_OUTPUT_TOKENS;
}

function getReadMaxSizeBytes(): number {
  return parsePositiveInteger(process.env.CLAUDE_CODE_FILE_READ_MAX_SIZE_BYTES) ?? DEFAULT_READ_MAX_SIZE_BYTES;
}

function parsePositiveInteger(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function startBackgroundBash(
  commandText: string,
  cwd: string,
  cwdResetWarning: string | undefined,
  timeout: number,
  shellPath: string,
  shellSnapshotPath: string | undefined,
  context?: ToolExecutionContext,
): ToolResult {
  const taskId = `local_bash_${backgroundTaskSeq++}`;
  const controller = new AbortController();
  const stateFile = join(tmpdir(), `claude-code-bash-${taskId}-${Date.now()}.state`);
  const wrappedCommand = wrapBashCommand(commandText, stateFile, shellPath, shellSnapshotPath);
  const child = exec(wrappedCommand, {
    cwd,
    timeout,
    maxBuffer: 10 * 1024 * 1024,
    shell: shellPath,
    signal: controller.signal,
    env: getShellEnv(shellPath),
  }, error => {
    const task = backgroundBashTasks.get(taskId);
    if (!task) {
      cleanupStateFile(stateFile);
      return;
    }

    const state = readBashState(stateFile);
    const timedOut = Boolean(error && (error as any).killed === true);
    if (task.status !== "killed") {
      task.exitCode = state.exitCode ?? (typeof (error as any)?.code === "number" ? (error as any).code : 0);
      task.status = error || task.exitCode !== 0 ? "failed" : "completed";
      if (timedOut && !task.stderr.includes("timed out")) {
        task.stderr = [task.stderr, `Command timed out after ${formatDurationMs(timeout)}`].filter(Boolean).join("\n");
      }
      void context?.emitNotification?.(
        `Background bash ${task.status}: ${task.id} (${truncateOneLine(task.command, 80)})`,
      );
    }
    cleanupStateFile(stateFile);
  });

  const task: BackgroundBashTask = {
    id: taskId,
    command: commandText,
    cwd,
    startedAt: Date.now(),
    status: "running",
    stdout: "",
    stderr: cwdResetWarning || "",
    exitCode: null,
    controller,
    child,
  };

  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", chunk => {
    task.stdout += String(chunk);
  });
  child.stderr?.on("data", chunk => {
    task.stderr = [task.stderr, String(chunk)].filter(Boolean).join("");
  });
  backgroundBashTasks.set(taskId, task);

  return {
    content: `Background task started: ${taskId}`,
    display: {
      type: "bash_background",
      taskId,
      command: commandText,
      cwd,
      status: "running",
    },
  };
}

function runForegroundBash(
  command: string,
  {
    commandText,
    cwd,
    stateFile,
    timeout,
    shellPath,
    signal,
    env,
    context,
    explicitTimeout,
  }: {
    commandText: string;
    cwd: string;
    stateFile: string;
    timeout: number;
    shellPath: string;
    signal?: AbortSignal;
    env: NodeJS.ProcessEnv;
    context?: ToolExecutionContext;
    explicitTimeout?: number;
  },
): Promise<ForegroundBashResult> {
  return new Promise((resolvePromise, rejectPromise) => {
    let stdout = "";
    let stderr = "";
    let lastProgressAt = 0;
    const startedAt = Date.now();
    let progressTimer: NodeJS.Timeout | undefined;
    let foregroundTask: ForegroundBashTask;

    const child = exec(command, {
      cwd,
      timeout,
      maxBuffer: 10 * 1024 * 1024,
      shell: shellPath,
      signal,
      env,
    }, error => {
      if (progressTimer) clearInterval(progressTimer);
      foregroundBashTasks.delete(foregroundTask);
      if (foregroundTask.backgroundTaskId) {
        const task = backgroundBashTasks.get(foregroundTask.backgroundTaskId);
        if (task) {
          const state = readBashState(stateFile);
          updateBashState(state);
          task.stdout = stdout;
          task.stderr = stderr;
          task.exitCode = state.exitCode ?? (typeof (error as any)?.code === "number" ? (error as any).code : 0);
          task.status = error || task.exitCode !== 0 ? "failed" : "completed";
          void foregroundTask.emitNotification?.(
            `Background bash ${task.status}: ${task.id} (${truncateOneLine(task.command, 80)})`,
          );
        }
        cleanupStateFile(stateFile);
        return;
      }
      if (error) {
        (error as any).stdout = stdout;
        (error as any).stderr = stderr;
        rejectPromise(error);
        return;
      }
      resolvePromise({ type: "completed", stdout, stderr });
    });

    foregroundTask = {
      toolUseId: context?.toolUseId,
      command: commandText,
      cwd,
      stateFile,
      child,
      startedAt,
      stdout,
      stderr,
      emitNotification: context?.emitNotification,
      resolve: resolvePromise,
    };
    foregroundBashTasks.add(foregroundTask);

    const emitProgress = (): void => {
      if (!context?.emitProgress) return;
      const elapsedMs = Date.now() - startedAt;
      if (elapsedMs < BASH_PROGRESS_THRESHOLD_MS) return;
      const now = Date.now();
      if (now - lastProgressAt < BASH_PROGRESS_INTERVAL_MS) return;
      lastProgressAt = now;
      const fullOutput = [stdout, stderr].filter(Boolean).join(stderr && stdout ? "\n" : "");
      const output = getTailLines(fullOutput, 5);
      void context.emitProgress({
        type: "bash_progress",
        output,
        fullOutput,
        elapsedTimeSeconds: Math.floor(elapsedMs / 1000),
        totalLines: countNonEmptyLines(fullOutput),
        totalBytes: Buffer.byteLength(fullOutput),
        ...(explicitTimeout === undefined ? {} : { timeoutMs: explicitTimeout }),
      });
    };

    child.stdout?.setEncoding("utf8");
    child.stderr?.setEncoding("utf8");
    child.stdout?.on("data", chunk => {
      stdout += String(chunk);
      foregroundTask.stdout = stdout;
      syncBackgroundTaskOutput(foregroundTask);
      emitProgress();
    });
    child.stderr?.on("data", chunk => {
      stderr += String(chunk);
      foregroundTask.stderr = stderr;
      syncBackgroundTaskOutput(foregroundTask);
      emitProgress();
    });

    progressTimer = setInterval(emitProgress, BASH_PROGRESS_INTERVAL_MS);
    foregroundTask.progressTimer = progressTimer;
    progressTimer.unref?.();
  });
}

function syncBackgroundTaskOutput(foregroundTask: ForegroundBashTask): void {
  if (!foregroundTask.backgroundTaskId) return;
  const task = backgroundBashTasks.get(foregroundTask.backgroundTaskId);
  if (!task) return;
  task.stdout = foregroundTask.stdout;
  task.stderr = foregroundTask.stderr;
}

function globToRegExp(pattern: string): RegExp {
  const normalized = pattern.replace(/\\/g, "/");
  let source = "^";

  for (let index = 0; index < normalized.length; index++) {
    const char = normalized[index];
    const next = normalized[index + 1];

    if (char === "*" && next === "*") {
      const after = normalized[index + 2];
      if (after === "/") {
        source += "(?:.*/)?";
        index += 2;
      } else {
        source += ".*";
        index += 1;
      }
      continue;
    }

    if (char === "*") {
      source += "[^/]*";
      continue;
    }

    if (char === "?") {
      source += "[^/]";
      continue;
    }

    source += escapeRegExp(char || "");
  }

  source += "$";
  return new RegExp(source);
}

function escapeRegExp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function basename(value: string): string {
  return value.split("/").pop() || value;
}

function limitLines(value: string, maxLines: number): string {
  const lines = value.split("\n");
  return lines.slice(0, maxLines).join("\n");
}

function countNonEmptyLines(value: string): number {
  if (!value.trim()) return 0;
  return value.split(/\r?\n/u).filter(line => line.trim()).length;
}

function getTailLines(value: string, count: number): string {
  if (!value.trim()) return "";
  return value.split(/\r?\n/u).filter(line => line.trim()).slice(-count).join("\n");
}

function filterGrepHiddenOutput(value: string, includeHidden: boolean): string {
  if (includeHidden || !value) return value;
  return value
    .split("\n")
    .filter(line => !hasHiddenPathPart(line.split(":")[0] || line))
    .join("\n");
}

function htmlToText(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/giu, "")
    .replace(/<style[\s\S]*?<\/style>/giu, "")
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<\/(p|div|section|article|li|h[1-6])>/giu, "\n")
    .replace(/<[^>]+>/gu, "")
    .replace(/&nbsp;/gu, " ")
    .replace(/&amp;/gu, "&")
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&quot;/gu, "\"")
    .replace(/&#39;/gu, "'")
    .replace(/[ \t]+\n/gu, "\n")
    .replace(/\n{3,}/gu, "\n\n");
}

function summarizeNonTextFile(filePath: string, size: number): string | null {
  const ext = extname(filePath).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff", ".svg"].includes(ext)) {
    return `Image file: ${filePath} (${size} bytes)`;
  }
  if (ext === ".pdf") {
    return `PDF file: ${filePath} (${size} bytes)`;
  }
  if (ext === ".ipynb") {
    try {
      const parsed = JSON.parse(readFileSync(filePath, "utf8")) as {
        cells?: Array<{ cell_type?: string; source?: string | string[] }>;
      };
      const cells = Array.isArray(parsed.cells) ? parsed.cells : [];
      const preview = cells
        .slice(0, 20)
        .map((cell, index) => {
          const source = Array.isArray(cell.source) ? cell.source.join("") : String(cell.source || "");
          return `${index + 1}. ${cell.cell_type || "cell"}: ${truncateOneLine(source, 100)}`;
        })
        .join("\n");
      return [`Notebook: ${cells.length} cells`, preview].filter(Boolean).join("\n");
    } catch (error) {
      return `Notebook file: ${filePath} (${size} bytes)`;
    }
  }
  return null;
}

type NotebookCell = {
  id?: string;
  cell_type?: string;
  source?: string | string[];
  metadata?: Record<string, unknown>;
  execution_count?: number | null;
  outputs?: unknown[];
};

type NotebookContent = {
  cells?: NotebookCell[];
  metadata?: { language_info?: { name?: string } };
  nbformat?: number;
  nbformat_minor?: number;
};

function editNotebook(input: Record<string, unknown>): ToolResult {
  const filePath = resolve(String(input.notebook_path || ""));
  const mode = parseNotebookEditMode(input.edit_mode);
  const cellType = parseNotebookCellType(input.cell_type);
  const newSource = String(input.new_source ?? "");
  const cellId = input.cell_id === undefined ? undefined : String(input.cell_id);

  if (extname(filePath) !== ".ipynb") {
    return {
      content: "Error: File must be a Jupyter notebook (.ipynb file).",
      isError: true,
    };
  }
  if (!existsSync(filePath)) return { content: "Error: Notebook file does not exist.", isError: true };
  if (mode === "insert" && !cellType) {
    return { content: "Error: Cell type is required when using edit_mode=insert.", isError: true };
  }
  if (mode !== "insert" && !cellId) {
    return { content: "Error: Cell ID must be specified when not inserting a new cell.", isError: true };
  }

  let notebook: NotebookContent;
  const originalContent = readFileSync(filePath, "utf8");
  try {
    notebook = JSON.parse(originalContent) as NotebookContent;
  } catch {
    return { content: "Error: Notebook is not valid JSON.", isError: true };
  }
  if (!Array.isArray(notebook.cells)) {
    return { content: "Error: Notebook is not valid JSON.", isError: true };
  }

  const cellIndex = resolveNotebookCellIndex(notebook.cells, cellId, mode);
  if (cellIndex.error) return { content: `Error: ${cellIndex.error}`, isError: true };

  const targetIndex = cellIndex.index;
  let editedCellId: string | undefined = cellId;
  let summary: string;

  if (mode === "delete") {
    const deleted = notebook.cells.splice(targetIndex, 1)[0];
    editedCellId = deleted?.id || cellId;
    summary = `Deleted cell ${editedCellId || `cell-${targetIndex}`}`;
  } else if (mode === "insert") {
    const newCellId = shouldNotebookUseCellIds(notebook)
      ? Math.random().toString(36).slice(2, 15)
      : undefined;
    const nextCell = createNotebookCell(cellType || "code", newSource, newCellId);
    notebook.cells.splice(targetIndex, 0, nextCell);
    editedCellId = newCellId || `cell-${targetIndex}`;
    summary = `Inserted cell ${editedCellId}`;
  } else {
    const target = notebook.cells[targetIndex];
    if (!target) return { content: `Error: Cell ${cellId} not found in notebook.`, isError: true };
    const previousSource = normalizeNotebookSource(target.source);
    target.source = newSource;
    if (target.cell_type === "code") {
      target.execution_count = null;
      target.outputs = [];
    }
    if (cellType && cellType !== target.cell_type) {
      target.cell_type = cellType;
    }
    editedCellId = target.id || cellId || `cell-${targetIndex}`;
    summary = `Updated cell ${editedCellId} with ${truncateOneLine(newSource || previousSource, 80)}`;
  }

  const updatedContent = `${JSON.stringify(notebook, null, 1)}\n`;
  writeFileSync(filePath, updatedContent, "utf8");
  return {
    content: summary,
    display: {
      type: "edit",
      filePath,
      summary,
      diff: createUnifiedDiff(relative(process.cwd(), filePath), originalContent, updatedContent),
    },
  };
}

function parseNotebookEditMode(value: unknown): "replace" | "insert" | "delete" {
  if (value === "insert" || value === "delete" || value === "replace") return value;
  return "replace";
}

function parseNotebookCellType(value: unknown): "code" | "markdown" | undefined {
  if (value === "code" || value === "markdown") return value;
  return undefined;
}

function resolveNotebookCellIndex(
  cells: NotebookCell[],
  cellId: string | undefined,
  mode: "replace" | "insert" | "delete",
): { index: number; error?: undefined } | { index: -1; error: string } {
  if (!cellId) return { index: 0 };

  let index = cells.findIndex(cell => cell.id === cellId);
  if (index === -1) {
    const parsed = parseNotebookCellId(cellId);
    if (parsed === undefined) return { index: -1, error: `Cell with ID "${cellId}" not found in notebook.` };
    index = parsed;
  }

  if (mode === "insert") {
    if (index < -1 || index >= cells.length) {
      return { index: -1, error: `Cell with index ${index} does not exist in notebook.` };
    }
    return { index: index + 1 };
  }

  if (!cells[index]) {
    return { index: -1, error: `Cell with index ${index} does not exist in notebook.` };
  }

  return { index };
}

function parseNotebookCellId(cellId: string): number | undefined {
  const match = cellId.match(/^cell-(\d+)$/u);
  if (!match?.[1]) return undefined;
  const index = Number.parseInt(match[1], 10);
  return Number.isNaN(index) ? undefined : index;
}

function createNotebookCell(cellType: "code" | "markdown", source: string, id: string | undefined): NotebookCell {
  if (cellType === "markdown") {
    return {
      ...(id ? { id } : {}),
      cell_type: "markdown",
      source,
      metadata: {},
    };
  }
  return {
    ...(id ? { id } : {}),
    cell_type: "code",
    source,
    metadata: {},
    execution_count: null,
    outputs: [],
  };
}

function shouldNotebookUseCellIds(notebook: NotebookContent): boolean {
  const nbformat = Number(notebook.nbformat || 0);
  const minor = Number(notebook.nbformat_minor || 0);
  return nbformat > 4 || (nbformat === 4 && minor >= 5);
}

function normalizeNotebookSource(source: NotebookCell["source"]): string {
  return Array.isArray(source) ? source.join("") : String(source || "");
}

function hasHiddenPathPart(filePath: string): boolean {
  return filePath.split("/").some(part => part.startsWith(".") && part.length > 1);
}

function truncateOneLine(value: string, max: number): string {
  const normalized = value.replace(/\s+/gu, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, Math.max(0, max - 1))}…`;
}

type BashState = {
  exitCode: number | null;
  cwd: string;
  env: NodeJS.ProcessEnv;
};

function getShellPath(): string {
  if (shellPathCache) return shellPathCache;

  const shellOverride = process.env.CLAUDE_CODE_SHELL;
  if (isSupportedExecutableShell(shellOverride)) {
    shellPathCache = shellOverride;
    return shellPathCache;
  }

  const envShell = process.env.SHELL;
  const preferBash = envShell?.includes("bash") === true;
  const shellOrder = preferBash ? ["bash", "zsh"] : ["zsh", "bash"];
  const shellDirs = ["/bin", "/usr/bin", "/usr/local/bin", "/opt/homebrew/bin"];
  const candidates = [
    isSupportedShell(envShell) ? envShell : undefined,
    ...shellOrder.flatMap(shell => shellDirs.map(dir => `${dir}/${shell}`)),
  ];

  const shellPath = uniqueDefined(candidates).find(isExecutable);
  if (!shellPath) {
    throw new Error("No suitable shell found. Claude CLI requires bash or zsh.");
  }
  shellPathCache = shellPath;
  return shellPathCache;
}

function getShellEnv(shellPath: string): NodeJS.ProcessEnv {
  return {
    ...bashEnv,
    SHELL: shellPath,
    GIT_EDITOR: "true",
    CLAUDECODE: "1",
  };
}

function isSupportedExecutableShell(value: string | undefined): value is string {
  return isSupportedShell(value) && isExecutable(value);
}

function isSupportedShell(value: string | undefined): value is string {
  return Boolean(value && (value.includes("bash") || value.includes("zsh")));
}

function isExecutable(filePath: string): boolean {
  try {
    accessSync(filePath, fsConstants.X_OK);
    return true;
  } catch {
    try {
      execFileSync(filePath, ["--version"], { timeout: 1000, stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }
}

function uniqueDefined(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function getDisableExtglobCommand(shellPath: string): string | undefined {
  if (process.env.CLAUDE_CODE_SHELL_PREFIX) {
    return "{ shopt -u extglob || setopt NO_EXTENDED_GLOB; } >/dev/null 2>&1 || true";
  }
  if (shellPath.includes("bash")) return "shopt -u extglob 2>/dev/null || true";
  if (shellPath.includes("zsh")) return "setopt NO_EXTENDED_GLOB 2>/dev/null || true";
  return undefined;
}

function formatShellPrefixCommand(prefix: string, command: string): string {
  const spaceBeforeDash = prefix.lastIndexOf(" -");
  if (spaceBeforeDash > 0) {
    const execPath = prefix.substring(0, spaceBeforeDash);
    const args = prefix.substring(spaceBeforeDash + 1);
    return `${shellQuote(execPath)} ${args} ${shellQuote(command)}`;
  }
  return `${shellQuote(prefix)} ${shellQuote(command)}`;
}

function getShellSnapshotPath(shellPath: string): string | undefined {
  if (shellSnapshotCache?.shellPath === shellPath && existsSync(shellSnapshotCache.path)) {
    return shellSnapshotCache.path;
  }

  const snapshotDir = join(getClaudeConfigDir(), "shell-snapshots");
  const shellName = shellPath.includes("zsh") ? "zsh" : "bash";
  const snapshotPath = join(snapshotDir, `snapshot-${shellName}-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`);
  mkdirSync(snapshotDir, { recursive: true });

  const script = buildShellSnapshotScript(shellPath, snapshotPath);
  execFileSync(shellPath, ["-l", "-c", script], {
    env: getShellEnv(shellPath),
    timeout: 10_000,
    maxBuffer: 1024 * 1024,
    stdio: "ignore",
  });

  if (!existsSync(snapshotPath)) {
    throw new Error(`Shell snapshot file was not created: ${snapshotPath}`);
  }

  shellSnapshotCache = { shellPath, path: snapshotPath };
  return snapshotPath;
}

function buildShellSnapshotScript(shellPath: string, snapshotPath: string): string {
  const isZsh = shellPath.includes("zsh");
  const configFile = join(process.env.HOME || homedir(), isZsh ? ".zshrc" : ".bashrc");
  const sourceConfig = existsSync(configFile) ? `source ${shellQuote(configFile)} < /dev/null` : "# No user config file to source";
  const functionDump = isZsh
    ? [
        "typeset -f > /dev/null 2>&1 || true",
        "typeset +f | grep -vE '^_[^_]' | while read -r func; do typeset -f \"$func\" >> \"$SNAPSHOT_FILE\" 2>/dev/null || true; done",
      ].join("\n")
    : [
        "declare -f > /dev/null 2>&1 || true",
        "declare -F | cut -d' ' -f3 | grep -vE '^_[^_]' | while read -r func; do declare -f \"$func\" >> \"$SNAPSHOT_FILE\" 2>/dev/null || true; done",
      ].join("\n");
  const optionDump = isZsh
    ? "setopt | sed 's/^/setopt /' | head -n 1000 >> \"$SNAPSHOT_FILE\""
    : [
        "shopt -p | head -n 1000 >> \"$SNAPSHOT_FILE\" 2>/dev/null || true",
        "set -o | awk '$2 == \"on\" { print \"set -o \" $1 }' | head -n 1000 >> \"$SNAPSHOT_FILE\"",
        "echo \"shopt -s expand_aliases\" >> \"$SNAPSHOT_FILE\"",
      ].join("\n");

  return [
    `SNAPSHOT_FILE=${shellQuote(snapshotPath)}`,
    sourceConfig,
    "echo \"# Snapshot file\" >| \"$SNAPSHOT_FILE\"",
    "echo \"unalias -a 2>/dev/null || true\" >> \"$SNAPSHOT_FILE\"",
    "echo \"# Functions\" >> \"$SNAPSHOT_FILE\"",
    functionDump,
    "echo \"# Shell Options\" >> \"$SNAPSHOT_FILE\"",
    optionDump,
    "echo \"# Aliases\" >> \"$SNAPSHOT_FILE\"",
    "alias | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> \"$SNAPSHOT_FILE\" 2>/dev/null || true",
    `echo "export PATH=${shellQuote(process.env.PATH || "")}" >> "$SNAPSHOT_FILE"`,
    "[ -f \"$SNAPSHOT_FILE\" ]",
  ].join("\n");
}

function getBashCwd(): { cwd: string; warning?: string } {
  if (existsSync(bashCwd) && statSync(bashCwd).isDirectory()) {
    return { cwd: bashCwd };
  }

  bashCwd = process.cwd();
  bashEnv.PWD = bashCwd;
  return {
    cwd: bashCwd,
    warning: `Shell cwd was reset to ${bashCwd}`,
  };
}

function wrapBashCommand(
  command: string,
  stateFile: string,
  shellPath: string,
  shellSnapshotPath?: string,
): string {
  const trapBody = `__cc_status=$?; { printf '%s\\n' $__cc_status; pwd -P; env -0; } > ${shellQuote(stateFile)}`;
  const parts = [
    `trap ${shellQuote(trapBody)} EXIT`,
    shellSnapshotPath ? `source ${shellQuote(shellSnapshotPath)} 2>/dev/null || true` : undefined,
    getDisableExtglobCommand(shellPath),
    `eval ${shellQuote(command)}`,
  ].filter(Boolean);
  const commandString = parts.join("\n");
  return process.env.CLAUDE_CODE_SHELL_PREFIX
    ? formatShellPrefixCommand(process.env.CLAUDE_CODE_SHELL_PREFIX, commandString)
    : commandString;
}

function readBashState(stateFile: string): BashState {
  if (!existsSync(stateFile)) {
    return { exitCode: null, cwd: bashCwd, env: bashEnv };
  }

  const buffer = readFileSync(stateFile);
  const firstNewline = buffer.indexOf(10);
  const secondNewline = firstNewline === -1 ? -1 : buffer.indexOf(10, firstNewline + 1);
  if (firstNewline === -1 || secondNewline === -1) {
    return { exitCode: null, cwd: bashCwd, env: bashEnv };
  }

  const exitRaw = buffer.subarray(0, firstNewline).toString("utf8").trim();
  const cwd = buffer.subarray(firstNewline + 1, secondNewline).toString("utf8").trim() || bashCwd;
  const env = parseNulEnv(buffer.subarray(secondNewline + 1));
  const exitCode = /^\d+$/u.test(exitRaw) ? Number(exitRaw) : null;
  return { exitCode, cwd, env };
}

function updateBashState(state: BashState): void {
  if (state.cwd) {
    bashCwd = state.cwd;
  }
  if (Object.keys(state.env).length > 0) {
    bashEnv = { ...state.env };
  }
}

function parseNulEnv(buffer: Buffer): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const entry of buffer.toString("utf8").split("\0")) {
    if (!entry) continue;
    const equals = entry.indexOf("=");
    if (equals <= 0) continue;
    env[entry.slice(0, equals)] = entry.slice(equals + 1);
  }
  return env;
}

type PreparedBashOutput = {
  content: string;
  stdout: string;
  stderr: string;
  persistedOutputPath?: string;
  persistedOutputSize?: number;
};

function prepareBashOutput(
  stdout: string,
  stderr: string,
  exitCode: number | null,
  context?: ToolExecutionContext,
): PreparedBashOutput {
  const content = formatBashContent(stdout, stderr, exitCode);
  const maxOutputLength = getBashMaxOutputLength();
  const contentBytes = Buffer.byteLength(content);
  if (contentBytes <= maxOutputLength) {
    return { content, stdout, stderr };
  }

  const persistedOutputPath = persistLargeBashOutput(content, context);
  const preview = generateBytePreview(content, BASH_PREVIEW_SIZE_BYTES);
  return {
    content: buildPersistedOutputMessage({
      filepath: persistedOutputPath,
      originalSize: contentBytes,
      preview: preview.text,
      hasMore: preview.hasMore,
    }),
    stdout: truncateUtf8ToBytes(stdout, maxOutputLength).text,
    stderr: truncateUtf8ToBytes(stderr, maxOutputLength).text,
    persistedOutputPath,
    persistedOutputSize: contentBytes,
  };
}

function getBashMaxOutputLength(): number {
  const value = process.env.BASH_MAX_OUTPUT_LENGTH;
  if (!value) return BASH_MAX_OUTPUT_DEFAULT;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return BASH_MAX_OUTPUT_DEFAULT;
  return Math.min(parsed, BASH_MAX_OUTPUT_UPPER_LIMIT);
}

function persistLargeBashOutput(content: string, context?: ToolExecutionContext): string {
  const toolUseId = sanitizeToolResultId(context?.toolUseId || `local-bash-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const outputDir = getToolResultsDir(context);
  const outputPath = join(outputDir, `${toolUseId}.txt`);
  const bounded = truncateUtf8ToBytes(content, BASH_MAX_PERSISTED_OUTPUT_BYTES).text;
  mkdirSync(outputDir, { recursive: true });
  try {
    writeFileSync(outputPath, bounded, { encoding: "utf8", flag: "wx" });
  } catch (error: any) {
    if (error?.code !== "EEXIST") throw error;
  }
  return outputPath;
}

function getToolResultsDir(context?: ToolExecutionContext): string {
  const cwd = context?.cwd || process.cwd();
  const sessionId = context?.sessionId ? sanitizeToolResultId(context.sessionId) : "standalone";
  return join(getProjectDir(cwd), sessionId, "tool-results");
}

function sanitizeToolResultId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_.-]/g, "-").slice(0, 160) || "tool-result";
}

function buildPersistedOutputMessage(input: {
  filepath: string;
  originalSize: number;
  preview: string;
  hasMore: boolean;
}): string {
  return [
    "<persisted-output>",
    `Output too large (${formatFileSize(input.originalSize)}). Full output saved to: ${input.filepath}`,
    "",
    `Preview (first ${formatFileSize(BASH_PREVIEW_SIZE_BYTES)}):`,
    input.preview,
    input.hasMore ? "..." : "",
    "</persisted-output>",
  ].filter((line, index) => line || index === 2).join("\n");
}

function generateBytePreview(value: string, maxBytes: number): { text: string; hasMore: boolean } {
  return truncateUtf8ToBytes(value, maxBytes);
}

function truncateUtf8ToBytes(value: string, maxBytes: number): { text: string; hasMore: boolean } {
  const buffer = Buffer.from(value);
  if (buffer.length <= maxBytes) return { text: value, hasMore: false };
  let end = Math.max(0, maxBytes);
  while (end > 0 && (buffer[end] & 0b1100_0000) === 0b1000_0000) {
    end--;
  }
  return { text: buffer.subarray(0, end).toString("utf8"), hasMore: true };
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

function formatBashContent(stdout: string, stderr: string, exitCode: number | null): string {
  const parts = [stdout, stderr].filter(Boolean);
  if (exitCode !== null && exitCode !== 0 && !stderr.trim()) {
    parts.push(`Exit code ${exitCode}`);
  }
  return parts.join("\n") || "(no output)";
}

const BASH_SEMANTIC_NEUTRAL_COMMANDS = new Set(["echo", "printf", "true", "false", ":"]);
const BASH_SILENT_COMMANDS = new Set([
  "mv",
  "cp",
  "rm",
  "mkdir",
  "rmdir",
  "chmod",
  "chown",
  "chgrp",
  "touch",
  "ln",
  "cd",
  "export",
  "unset",
  "wait",
]);

function isSilentBashCommand(command: string): boolean {
  const partsWithOperators = splitBashCommandWithOperators(command);
  if (partsWithOperators.length === 0) return false;

  let hasNonFallbackCommand = false;
  let lastOperator: string | null = null;

  for (const part of partsWithOperators) {
    if (isBashControlOperator(part)) {
      lastOperator = part;
      continue;
    }

    const baseCommand = part.trim().split(/\s+/u)[0];
    if (!baseCommand) continue;

    if (lastOperator === "||" && BASH_SEMANTIC_NEUTRAL_COMMANDS.has(baseCommand)) {
      continue;
    }

    hasNonFallbackCommand = true;
    if (!BASH_SILENT_COMMANDS.has(baseCommand)) return false;
  }

  return hasNonFallbackCommand;
}

function splitBashCommandWithOperators(command: string): string[] {
  const parts: string[] = [];
  let buffer = "";
  let quote: "'" | "\"" | null = null;
  let escaped = false;

  for (let index = 0; index < command.length; index++) {
    const char = command[index] || "";
    const next = command[index + 1] || "";

    if (escaped) {
      buffer += char;
      escaped = false;
      continue;
    }
    if (char === "\\") {
      buffer += char;
      escaped = true;
      continue;
    }
    if (quote) {
      buffer += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === "\"") {
      quote = char;
      buffer += char;
      continue;
    }
    const operator = char === "&" && next === "&"
      ? "&&"
      : char === "|" && next === "|"
        ? "||"
        : char === "|" || char === ";" || char === "\n"
          ? char
          : "";
    if (operator) {
      if (buffer.trim()) parts.push(buffer.trim());
      parts.push(operator === "\n" ? ";" : operator);
      buffer = "";
      if (operator.length === 2) index++;
      continue;
    }
    buffer += char;
  }

  if (buffer.trim()) parts.push(buffer.trim());
  return parts;
}

function isBashControlOperator(part: string): boolean {
  return part === "||" || part === "&&" || part === "|" || part === ";";
}

function getBashTimeout(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 120000;
  return Math.max(1, Math.min(Math.round(value), 10 * 60 * 1000));
}

function formatDurationMs(value: number): string {
  if (value < 1000) return `${value}ms`;
  const seconds = value / 1000;
  if (seconds < 60) return `${seconds % 1 === 0 ? seconds.toFixed(0) : seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

function cleanupStateFile(stateFile: string): void {
  try {
    if (existsSync(stateFile)) unlinkSync(stateFile);
  } catch {}
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/gu, "'\\''")}'`;
}
