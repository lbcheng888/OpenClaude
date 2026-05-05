// Tool registry and execution engine
import type { ToolDef } from "../api/client.js";
import type { ToolDisplay } from "../agent/tengu.js";
import { exec, type ChildProcess } from "child_process";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, unlinkSync } from "fs";
import { extname, join, resolve, relative } from "path";
import { tmpdir } from "os";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface ToolResult {
  content: string;
  isError?: boolean;
  display?: ToolDisplay;
}

export interface Tool {
  name: string;
  description: string;
  input_schema: ToolDef["input_schema"];
  execute: (input: Record<string, unknown>, signal?: AbortSignal) => Promise<ToolResult>;
  requiresPermission?: boolean;
}

type TodoItem = {
  content: string;
  status: "pending" | "in_progress" | "completed";
  activeForm?: string;
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

let currentTodos: TodoItem[] = [];
let bashCwd = process.cwd();
let bashEnv: NodeJS.ProcessEnv = { ...process.env };
let backgroundTaskSeq = 1;
const backgroundBashTasks = new Map<string, BackgroundBashTask>();

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
    async execute(input, signal) {
      const cmd = input.command as string;
      const cwdState = getBashCwd();
      const stateFile = join(tmpdir(), `claude-code-bash-${Date.now()}-${Math.random().toString(36).slice(2)}.state`);
      const timeout = getBashTimeout(input.timeout);

      if (input.run_in_background === true) {
        return startBackgroundBash(cmd, cwdState.cwd, cwdState.warning, timeout);
      }

      try {
        const command = wrapBashCommand(cmd, stateFile);
        const { stdout, stderr } = await execAsync(command, {
          cwd: cwdState.cwd,
          timeout,
          maxBuffer: 10 * 1024 * 1024,
          shell: "/bin/bash",
          signal,
          env: bashEnv,
        });
        const state = readBashState(stateFile);
        updateBashState(state);
        const finalStderr = [stderr, cwdState.warning].filter(Boolean).join("\n");
        const content = formatBashContent(stdout, finalStderr, state.exitCode);
        return {
          content,
          isError: state.exitCode !== 0 || undefined,
          display: {
            type: "bash",
            stdout,
            stderr: finalStderr,
            exitCode: state.exitCode,
            cwd: state.cwd || cwdState.cwd,
            cwdResetWarning: cwdState.warning,
          },
        };
      } catch (e: any) {
        if (signal?.aborted) {
          return {
            content: "Interrupted",
            isError: true,
            display: { type: "bash", stdout: "", stderr: "Interrupted", exitCode: null, cwd: cwdState.cwd },
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
        return {
          content: formatBashContent(stdout, finalStderr || errorText, exitCode),
          isError: true,
          display: {
            type: "bash",
            stdout,
            stderr: finalStderr || errorText || "Command failed",
            exitCode,
            cwd: state.cwd || cwdState.cwd,
            cwdResetWarning: cwdState.warning,
          },
        };
      } finally {
        cleanupStateFile(stateFile);
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
    async execute(input) {
      const taskId = String(input.bash_id || "");
      const task = backgroundBashTasks.get(taskId);
      if (!task) return { content: `Error: Background task not found: ${taskId}`, isError: true };
      const status = `Status: ${task.status}`;
      return {
        content: [status, task.stdout, task.stderr].filter(Boolean).join("\n") || status,
        isError: task.status === "failed" || undefined,
        display: {
          type: "bash",
          stdout: task.stdout,
          stderr: task.stderr,
          exitCode: task.exitCode,
          cwd: task.cwd,
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
    async execute(input) {
      const fp = resolve(input.file_path as string);
      if (!existsSync(fp)) return { content: `Error: File not found: ${fp}`, isError: true };
      const stat = statSync(fp);
      if (!stat.isFile()) return { content: `Error: Not a file: ${fp}`, isError: true };
      if (stat.size === 0) return { content: "(empty file)" };
      if (stat.size > 1024 * 1024 && input.offset === undefined && input.limit === undefined) {
        return { content: `Error: File content too large: ${fp} (${stat.size} bytes). Use offset and limit.`, isError: true };
      }
      const mediaSummary = summarizeNonTextFile(fp, stat.size);
      if (mediaSummary) return { content: mediaSummary };
      try {
        const content = readFileSync(fp, "utf-8");
        const lines = content.split("\n");
        const offset = typeof input.offset === "number" ? input.offset : 1;
        const lineOffset = offset === 0 ? 0 : offset - 1;
        const limit = typeof input.limit === "number" ? input.limit : lines.length;
        return { content: lines.slice(lineOffset, lineOffset + limit).join("\n") };
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
          shell: "/bin/bash",
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
  signal?: AbortSignal
): Promise<ToolResult> {
  const tool = BUILTIN_TOOLS.find((t) => t.name === name);
  if (!tool) {
    return {
      content: `<tool_use_error>Error: No such tool available: ${name}</tool_use_error>`,
      isError: true,
    };
  }
  return tool.execute(input, signal);
}

export function resetToolStateForTests(): void {
  bashCwd = process.cwd();
  bashEnv = { ...process.env };
  currentTodos = [];
  for (const task of backgroundBashTasks.values()) {
    if (task.status === "running") {
      task.controller.abort(new Error("Reset"));
      task.child.kill("SIGTERM");
    }
  }
  backgroundBashTasks.clear();
  backgroundTaskSeq = 1;
}

function startBackgroundBash(
  commandText: string,
  cwd: string,
  cwdResetWarning: string | undefined,
  timeout: number,
): ToolResult {
  const taskId = `local_bash_${backgroundTaskSeq++}`;
  const controller = new AbortController();
  const stateFile = join(tmpdir(), `claude-code-bash-${taskId}-${Date.now()}.state`);
  const wrappedCommand = wrapBashCommand(commandText, stateFile);
  const child = exec(wrappedCommand, {
    cwd,
    timeout,
    maxBuffer: 10 * 1024 * 1024,
    shell: "/bin/bash",
    signal: controller.signal,
    env: bashEnv,
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

function wrapBashCommand(command: string, stateFile: string): string {
  return [
    `trap "__cc_status=\\$?; { printf '%s\\n' \\$__cc_status; printf '%s\\n' \\$PWD; env -0; } > ${shellQuote(stateFile)}" EXIT`,
    command,
  ].join("\n");
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

function formatBashContent(stdout: string, stderr: string, exitCode: number | null): string {
  const parts = [stdout, stderr].filter(Boolean);
  if (exitCode !== null && exitCode !== 0 && !stderr.trim()) {
    parts.push(`Exit code ${exitCode}`);
  }
  return parts.join("\n") || "(no output)";
}

function createUnifiedDiff(filePath: string, before: string, after: string): string {
  if (before === after) return "";
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  const rows = [`--- ${filePath}`, `+++ ${filePath}`];
  const max = Math.max(beforeLines.length, afterLines.length);
  for (let index = 0; index < max; index++) {
    const oldLine = beforeLines[index];
    const newLine = afterLines[index];
    if (oldLine === newLine) {
      if (oldLine !== undefined && rows.length < 200) rows.push(` ${oldLine}`);
      continue;
    }
    if (oldLine !== undefined) rows.push(`-${oldLine}`);
    if (newLine !== undefined) rows.push(`+${newLine}`);
    if (rows.length >= 200) {
      rows.push("… diff truncated");
      break;
    }
  }
  return rows.join("\n");
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
