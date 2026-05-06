import { afterEach, describe, expect, test } from "bun:test";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  backgroundForegroundBashTasks,
  executeTool,
  FILE_UNCHANGED_STUB,
  getToolDefs,
  hasForegroundBashTasks,
  listBackgroundTasks,
  readBackgroundTaskOutput,
  resetToolStateForTests,
  stopBackgroundTask,
} from "./registry.js";
import { classifyReadOnlyBashCommand, isReadOnlyExploreToolCall, normalizeSubagentType } from "./read-only.js";

let tempDir: string | null = null;

afterEach(() => {
  resetToolStateForTests();
  if (!tempDir) return;
  rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("tool registry", () => {
  test("unknown tools return the official fallback error", async () => {
    const result = await executeTool("MissingTool", {});

    expect(result).toEqual({
      content: "Error: Tool 'MissingTool' not found",
      isError: true,
    });
  });

  test("Read uses official 1-based offset and cat -n line format", async () => {
    const file = createTempFile("a\nb\nc\n");

    const result = await executeTool("Read", { file_path: file, offset: 1, limit: 1 });

    expect(result.content).toBe("1\ta");
    expect(result.display).toEqual({
      type: "read",
      filePath: file,
      startLine: 1,
      numLines: 1,
      totalLines: 4,
      status: "text",
    });
  });

  test("Read summarizes non-text files instead of dumping bytes", async () => {
    const file = createTempFile("not really png", "image.png");

    const result = await executeTool("Read", { file_path: file });

    expect(result.isError).toBeUndefined();
    expect(result.content).toContain("Image file:");
    expect(result.content).toContain("image.png");
  });

  test("Read reports empty files with official system-reminder content and zero-line display", async () => {
    const file = createTempFile("");

    const result = await executeTool("Read", { file_path: file });

    expect(result.content).toBe("<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>");
    expect(result.display).toEqual({
      type: "read",
      filePath: file,
      startLine: 1,
      numLines: 0,
      totalLines: 0,
      status: "empty",
    });
  });

  test("Read returns official unchanged stub for unchanged repeated range in the same session", async () => {
    const file = createTempFile("a\nb\nc\n");

    const first = await executeTool("Read", { file_path: file, offset: 1, limit: 2 }, undefined, { sessionId: "session-read" });
    const second = await executeTool("Read", { file_path: file, offset: 1, limit: 2 }, undefined, { sessionId: "session-read" });
    const otherSession = await executeTool("Read", { file_path: file, offset: 1, limit: 2 }, undefined, { sessionId: "session-other" });

    expect(first.content).toBe("1\ta\n2\tb");
    expect(second.content).toBe(FILE_UNCHANGED_STUB);
    expect(second.display).toEqual({ type: "text", summary: "file_unchanged" });
    expect(otherSession.content).toBe("1\ta\n2\tb");
  });

  test("Read injects matching nested CLAUDE.md rules once per session", async () => {
    const dir = createTempDir();
    const srcDir = join(dir, "src");
    mkdirSync(join(dir, ".claude", "rules"), { recursive: true });
    mkdirSync(srcDir, { recursive: true });
    const file = join(srcDir, "app.ts");
    writeFileSync(file, "export const x = 1;\n", "utf8");
    writeFileSync(
      join(dir, ".claude", "rules", "typescript.md"),
      ["---", "paths: src/**/*.{ts,tsx}", "---", "Use strict TypeScript rules."].join("\n"),
      "utf8",
    );

    const first = await executeTool("Read", { file_path: file }, undefined, { sessionId: "nested-memory", cwd: dir });
    const second = await executeTool("Read", { file_path: file }, undefined, { sessionId: "nested-memory", cwd: dir });

    expect(first.additionalMessages?.[0]?.content).toContain("Use strict TypeScript rules.");
    expect(second.additionalMessages || []).toEqual([]);
  });

  test("Skill loads instructions by exact skill name from configured skill dirs", async () => {
    const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
    const dir = createTempDir();
    const config = join(dir, ".claude");
    mkdirSync(join(config, "skills", "audit"), { recursive: true });
    writeFileSync(
      join(config, "skills", "audit", "SKILL.md"),
      ["---", "description: Audit code", "---", "Use the audit checklist."].join("\n"),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = config;
    try {
      const result = await executeTool("Skill", { skill: "audit" }, undefined, { cwd: dir });

      expect(result.isError).toBeUndefined();
      expect(result.content).toContain("### Skill: audit");
      expect(result.content).toContain("Use the audit checklist.");
      expect(result.display).toEqual({ type: "text", summary: "Loaded skill audit" });
    } finally {
      if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
    }
  });

  test("Edit rejects files modified after the last Read in the same session", async () => {
    const file = createTempFile("alpha\n");
    const context = { sessionId: "fresh-edit" };

    await executeTool("Read", { file_path: file }, undefined, context);
    writeFileSync(file, "beta\n");
    const future = new Date(Date.now() + 2000);
    utimesSync(file, future, future);
    const result = await executeTool("Edit", {
      file_path: file,
      old_string: "beta",
      new_string: "gamma",
    }, undefined, context);

    expect(result.isError).toBe(true);
    expect(result.content).toContain("modified since it was read");
    expect(readFileSync(file, "utf8")).toBe("beta\n");
  });

  test("Read defaults to the official 2000 line cap", async () => {
    const file = createTempFile(Array.from({ length: 2002 }, (_, index) => `line-${index + 1}`).join("\n"));

    const result = await executeTool("Read", { file_path: file });

    expect(result.content.split("\n")).toHaveLength(2000);
    expect(result.content.startsWith("1\tline-1")).toBe(true);
    expect(result.content.endsWith("2000\tline-2000")).toBe(true);
    expect(result.display).toEqual({
      type: "read",
      filePath: file,
      startLine: 1,
      numLines: 2000,
      totalLines: 2002,
      status: "text",
    });
  });

  test("Read returns a token-limit error before sending oversized file content", async () => {
    const previous = process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS;
    process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS = "2";
    try {
      const file = createTempFile("abcdefghijklmnopqrstuvwxyz\n");

      const result = await executeTool("Read", { file_path: file });

      expect(result.isError).toBe(true);
      expect(result.content).toContain("exceeds maximum allowed tokens (2)");
      expect(result.content).toContain("Use offset and limit parameters");
    } finally {
      if (previous === undefined) delete process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS;
      else process.env.CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS = previous;
    }
  });

  test("Read rejects invalid offset and limit values before reading", async () => {
    const file = createTempFile("a\n");

    const invalidOffset = await executeTool("Read", { file_path: file, offset: -1 });
    const invalidLimit = await executeTool("Read", { file_path: file, limit: 0 });

    expect(invalidOffset).toEqual({ content: "Error: offset must be a non-negative integer", isError: true });
    expect(invalidLimit).toEqual({ content: "Error: limit must be a positive integer", isError: true });
  });

  test("Read reports offsets beyond EOF with official system-reminder content and zero-line display", async () => {
    const file = createTempFile("a\nb\n");

    const result = await executeTool("Read", { file_path: file, offset: 99, limit: 10 });

    expect(result.content).toBe("<system-reminder>Warning: the file exists but is shorter than the provided offset (99). The file has 3 lines.</system-reminder>");
    expect(result.display).toEqual({
      type: "read",
      filePath: file,
      startLine: 99,
      numLines: 0,
      totalLines: 3,
      status: "offset_out_of_range",
    });
  });

  test("Read summarizes notebooks by cell", async () => {
    const file = createTempFile(JSON.stringify({
      cells: [
        { cell_type: "markdown", source: ["# Title\n"] },
        { cell_type: "code", source: ["print('hi')\n"] },
      ],
    }), "nb.ipynb");

    const result = await executeTool("Read", { file_path: file });

    expect(result.content).toContain("Notebook: 2 cells");
    expect(result.content).toContain("2. code: print('hi')");
  });

  test("LS lists directory entries", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, "b.txt"), "b");
    writeFileSync(join(dir, "a.txt"), "a");

    const result = await executeTool("LS", { path: dir });

    expect(result.content.split("\n")).toEqual(["a.txt", "b.txt"]);
  });

  test("MultiEdit applies edits sequentially", async () => {
    const file = createTempFile("alpha beta gamma\n");

    const result = await executeTool("MultiEdit", {
      file_path: file,
      edits: [
        { old_string: "alpha", new_string: "one" },
        { old_string: "one beta", new_string: "two" },
      ],
    });

    expect(result.isError).toBeUndefined();
    expect(readFileSync(file, "utf8")).toBe("two gamma\n");
  });

  test("Edit exposes diff display state", async () => {
    const file = createTempFile("alpha\nbeta\n");

    const result = await executeTool("Edit", {
      file_path: file,
      old_string: "beta",
      new_string: "gamma",
    });

    expect(result.display?.type).toBe("edit");
    if (result.display?.type !== "edit") throw new Error("Expected edit display");
    expect(result.display.diff).toContain("-beta");
    expect(result.display.diff).toContain("+gamma");
  });

  test("Edit requires a non-empty unique old_string unless replace_all is set", async () => {
    const file = createTempFile("alpha\nbeta\nbeta\n");

    const empty = await executeTool("Edit", {
      file_path: file,
      old_string: "",
      new_string: "x",
    });
    const duplicate = await executeTool("Edit", {
      file_path: file,
      old_string: "beta",
      new_string: "gamma",
    });
    const replaceAll = await executeTool("Edit", {
      file_path: file,
      old_string: "beta",
      new_string: "gamma",
      replace_all: true,
    });

    expect(empty).toEqual({ content: "Error: old_string is required", isError: true });
    expect(duplicate.content).toContain("old_string appears multiple times");
    expect(duplicate.isError).toBe(true);
    expect(replaceAll.isError).toBeUndefined();
    expect(readFileSync(file, "utf8")).toBe("alpha\ngamma\ngamma\n");
  });

  test("Edit rejects no-op edits, notebooks, and missing replace_all targets", async () => {
    const textFile = createTempFile("alpha\n");
    const notebook = createTempFile(JSON.stringify({ cells: [] }), "sample.ipynb");

    const noOp = await executeTool("Edit", {
      file_path: textFile,
      old_string: "alpha",
      new_string: "alpha",
    });
    const notebookEdit = await executeTool("Edit", {
      file_path: notebook,
      old_string: "cells",
      new_string: "other",
    });
    const missingReplaceAll = await executeTool("Edit", {
      file_path: textFile,
      old_string: "missing",
      new_string: "x",
      replace_all: true,
    });

    expect(noOp.content).toContain("No changes to make");
    expect(noOp.isError).toBe(true);
    expect(notebookEdit.content).toContain("Use the NotebookEdit tool");
    expect(notebookEdit.isError).toBe(true);
    expect(missingReplaceAll.content).toContain("old_string not found");
    expect(missingReplaceAll.isError).toBe(true);
  });

  test("MultiEdit requires unique old_string per edit unless replace_all is set", async () => {
    const file = createTempFile("one two two\n");

    const result = await executeTool("MultiEdit", {
      file_path: file,
      edits: [{ old_string: "two", new_string: "three" }],
    });

    expect(result.content).toContain("old_string appears multiple times in file for edit 1");
    expect(result.isError).toBe(true);
    expect(readFileSync(file, "utf8")).toBe("one two two\n");
  });

  test("Grep uses ripgrep include and head_limit semantics", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, "a.txt"), "target one\ntarget two\n");
    writeFileSync(join(dir, "b.md"), "target ignored\n");

    const result = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      include: "*.txt",
      head_limit: 1,
      output_mode: "content",
    });

    expect(result.content).toContain("a.txt:1:target one");
    expect(result.content).not.toContain("b.md");
  });

  test("Grep supports hidden, case-insensitive, and files_with_matches mode", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, ".hidden.txt"), "Target\n");

    // Official default includes hidden files for Grep.
    const result = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      case_insensitive: true,
      output_mode: "files_with_matches",
    });

    expect(result.content).toContain("Found 1 file");
    expect(result.content).toContain(".hidden.txt");
  });

  test("Grep honors hidden=false and rejects invalid output modes", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, ".hidden.txt"), "target\n");
    writeFileSync(join(dir, "visible.txt"), "target\n");

    const hiddenOff = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      hidden: false,
      output_mode: "files_with_matches",
    });
    const invalid = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      output_mode: "raw",
    });

    expect(hiddenOff.content).toContain("visible.txt");
    expect(hiddenOff.content).not.toContain(".hidden.txt");
    expect(invalid).toEqual({ content: "Error: invalid output_mode: raw", isError: true });
  });

  test("Grep supports official glob, offset, context, count, and unlimited limit semantics", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, "a.ts"), "before\nneedle one\nafter\n");
    writeFileSync(join(dir, "b.tsx"), "needle two\nneedle three\n");
    writeFileSync(join(dir, "c.md"), "needle ignored\n");

    const content = await executeTool("Grep", {
      pattern: "needle",
      path: dir,
      glob: "*.{ts,tsx}",
      output_mode: "content",
      "-A": 1,
      head_limit: 1,
      offset: 1,
    });
    const count = await executeTool("Grep", {
      pattern: "needle",
      path: dir,
      glob: "*.{ts,tsx}",
      output_mode: "count",
      head_limit: 0,
    });

    expect(content.content).toContain("[Showing results with pagination = limit: 1, offset: 1]");
    expect(content.content).not.toContain("c.md");
    expect(count.content).toContain("Found 3 total occurrences across 2 files.");
  });

  test("Glob supports hidden and ignore filters", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, ".hidden.ts"), "");
    writeFileSync(join(dir, "visible.ts"), "");
    writeFileSync(join(dir, "skip.ts"), "");

    const result = await executeTool("Glob", {
      pattern: "*.ts",
      path: dir,
      hidden: true,
      ignore: ["skip.ts"],
    });

    expect(result.content.split("\n")).toEqual([".hidden.ts", "visible.ts"]);
  });

  test("Glob returns files only and applies ignore patterns to paths and basenames", async () => {
    const dir = createTempDir();
    mkdirSync(join(dir, "src"));
    mkdirSync(join(dir, "src", "nested"));
    writeFileSync(join(dir, "src", "keep.ts"), "");
    writeFileSync(join(dir, "src", "skip.test.ts"), "");
    writeFileSync(join(dir, "src", "nested", "skip.ts"), "");

    const result = await executeTool("Glob", {
      pattern: "**/*.ts",
      path: dir,
      ignore: ["*.test.ts", "src/nested/**"],
    });

    expect(result.content.split("\n")).toEqual(["src/keep.ts"]);
  });

  test("Glob supports brace patterns and reports no files with official wording", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, "a.ts"), "");
    writeFileSync(join(dir, "b.tsx"), "");
    writeFileSync(join(dir, "c.md"), "");

    const matches = await executeTool("Glob", { pattern: "*.{ts,tsx}", path: dir });
    const none = await executeTool("Glob", { pattern: "*.go", path: dir });

    expect(matches.content.split("\n")).toEqual(["a.ts", "b.tsx"]);
    expect(none.content).toBe("No files found");
  });

  test("Grep returns no matches for ripgrep exit code 1", async () => {
    const file = createTempFile("nothing here\n");

    const result = await executeTool("Grep", { pattern: "missing", path: file });

    expect(result).toEqual({ content: "(no matches)" });
  });

  test("Bash receives abort signals", async () => {
    const controller = new AbortController();
    const running = executeTool("Bash", { command: "sleep 5" }, controller.signal);

    controller.abort(new Error("Interrupted"));
    const result = await running;

    expect(result.isError).toBe(true);
    expect(result.content).toContain("Interrupted");
  });

  test("Bash persists cwd and exported environment between calls", async () => {
    const dir = createTempDir();

    await executeTool("Bash", { command: `cd ${shellQuote(dir)} && export CLAUDE_CODE_FULL_TEST=ok` });
    const cwdResult = await executeTool("Bash", { command: "pwd && printf \"$CLAUDE_CODE_FULL_TEST\"" });

    expect(cwdResult.display?.type).toBe("bash");
    expect(cwdResult.content).toContain(dir);
    expect(cwdResult.content).toContain("ok");
  });

  test("Bash honors official shell selection environment", async () => {
    const dir = createTempDir();
    const fakeShell = join(dir, "fake-bash");
    const previousClaudeShell = process.env.CLAUDE_CODE_SHELL;
    const previousShell = process.env.SHELL;
    writeFileSync(fakeShell, "#!/bin/sh\nexec /bin/bash \"$@\"\n");
    chmodSync(fakeShell, 0o755);

    process.env.CLAUDE_CODE_SHELL = fakeShell;
    process.env.SHELL = "/bin/zsh";
    resetToolStateForTests();
    try {
      const result = await executeTool("Bash", { command: "printf \"$SHELL\" && printf \" $CLAUDECODE $GIT_EDITOR\"" });

      expect(result.isError).toBeUndefined();
      expect(result.content).toContain(`${fakeShell} 1 true`);
    } finally {
      if (previousClaudeShell === undefined) delete process.env.CLAUDE_CODE_SHELL;
      else process.env.CLAUDE_CODE_SHELL = previousClaudeShell;
      if (previousShell === undefined) delete process.env.SHELL;
      else process.env.SHELL = previousShell;
      resetToolStateForTests();
    }
  });

  test("Bash sources shell snapshot aliases before executing commands", async () => {
    const dir = createTempDir();
    const fakeShell = join(dir, "fake-bash");
    const previousClaudeShell = process.env.CLAUDE_CODE_SHELL;
    const previousShell = process.env.SHELL;
    const previousHome = process.env.HOME;
    const previousConfigDir = process.env.CLAUDE_CONFIG_DIR;
    writeFileSync(fakeShell, "#!/bin/sh\nexec /bin/bash \"$@\"\n");
    chmodSync(fakeShell, 0o755);
    writeFileSync(join(dir, ".bashrc"), "alias ccfalias='printf snapshot-ok'\n");

    process.env.CLAUDE_CODE_SHELL = fakeShell;
    process.env.SHELL = fakeShell;
    process.env.HOME = dir;
    process.env.CLAUDE_CONFIG_DIR = dir;
    resetToolStateForTests();
    try {
      const result = await executeTool("Bash", { command: "ccfalias" });

      expect(result.isError).toBeUndefined();
      expect(result.content).toContain("snapshot-ok");
    } finally {
      if (previousClaudeShell === undefined) delete process.env.CLAUDE_CODE_SHELL;
      else process.env.CLAUDE_CODE_SHELL = previousClaudeShell;
      if (previousShell === undefined) delete process.env.SHELL;
      else process.env.SHELL = previousShell;
      if (previousHome === undefined) delete process.env.HOME;
      else process.env.HOME = previousHome;
      if (previousConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = previousConfigDir;
      resetToolStateForTests();
    }
  });

  test("Bash display separates stdout and stderr", async () => {
    const result = await executeTool("Bash", { command: "printf out; printf err >&2; exit 7" });

    expect(result.isError).toBe(true);
    expect(result.display).toEqual({
      type: "bash",
      stdout: "out",
      stderr: "err",
      exitCode: 7,
      cwd: process.cwd(),
      cwdResetWarning: undefined,
    });
  });

  test("Bash hides internal wrapper text for silent non-zero exits", async () => {
    const result = await executeTool("Bash", { command: "false" });

    expect(result.isError).toBe(true);
    expect(result.content).toBe("Exit code 1");
    expect(result.content).not.toContain("claude-code-bash");
    expect(result.content).not.toContain("Command failed:");
    expect(result.display).toEqual({
      type: "bash",
      stdout: "",
      stderr: "",
      exitCode: 1,
      cwd: process.cwd(),
      cwdResetWarning: undefined,
    });
  });

  test("Bash marks silent successful commands as Done for UI rendering", async () => {
    const dir = createTempDir();

    const result = await executeTool("Bash", { command: `mkdir ${shellQuote(join(dir, "created"))}` });

    expect(result.isError).toBeUndefined();
    expect(result.display?.type).toBe("bash");
    if (result.display?.type !== "bash") throw new Error("Expected bash display");
    expect(result.display.stdout).toBe("");
    expect(result.display.stderr).toBe("");
    expect(result.display.noOutputExpected).toBe(true);
  });

  test("Bash respects timeout", async () => {
    const result = await executeTool("Bash", { command: "sleep 1", timeout: 25 });

    expect(result.isError).toBe(true);
    expect(result.content).toContain("timed out");
    expect(result.display?.type).toBe("bash");
    if (result.display?.type !== "bash") throw new Error("Expected bash display");
    expect(result.display.timeoutMs).toBe(25);
  });

  test("Bash emits real progress tail while command is still running", async () => {
    const progress: string[] = [];

    const result = await executeTool(
      "Bash",
      { command: "printf one; sleep 2.6; printf '\\ntwo'", timeout: 5000 },
      undefined,
      {
        toolUseId: "toolu_progress",
        emitProgress: event => {
          if (event.type === "bash_progress") {
            progress.push(`${event.elapsedTimeSeconds}:${event.output}`);
          }
        },
      },
    );

    expect(result.isError).toBeUndefined();
    expect(result.content).toContain("one");
    expect(result.content).toContain("two");
    expect(progress.some(item => item.includes(":one"))).toBe(true);
  });

  test("Bash foreground command can be moved to a background task", async () => {
    const notifications: string[] = [];
    const pending = executeTool(
      "Bash",
      { command: "printf start; sleep 0.3; printf done" },
      undefined,
      {
        toolUseId: "toolu_background",
        emitNotification: text => notifications.push(text),
      },
    );

    await waitForForegroundBashTask();
    const taskIds = backgroundForegroundBashTasks();
    const result = await pending;

    expect(taskIds).toHaveLength(1);
    expect(result.display?.type).toBe("bash_background");
    if (result.display?.type !== "bash_background") throw new Error("Expected bash_background display");
    expect(result.display.taskId).toBe(taskIds[0]);

    await waitForBackgroundTask(taskIds[0] || "");
    const output = await executeTool("BashOutput", { bash_id: taskIds[0] });
    expect(output.content).toContain("Status: completed");
    expect(output.content).toContain("startdone");
    expect(notifications).toContain(`Background bash completed: ${taskIds[0]} (printf start; sleep 0.3; printf done)`);
  });

  test("Bash persists large output instead of returning raw content", async () => {
    const dir = createTempDir();
    const previousMaxOutput = process.env.BASH_MAX_OUTPUT_LENGTH;
    const previousConfigDir = process.env.CLAUDE_CONFIG_DIR;
    const large = "x".repeat(2500);
    process.env.BASH_MAX_OUTPUT_LENGTH = "64";
    process.env.CLAUDE_CONFIG_DIR = dir;
    resetToolStateForTests();

    try {
      const result = await executeTool(
        "Bash",
        { command: `printf ${shellQuote(large)}` },
        undefined,
        { toolUseId: "toolu_large", sessionId: "session-large", cwd: dir },
      );
      const savedPath = result.content.match(/Full output saved to: (.+)/)?.[1]?.trim();

      expect(result.isError).toBeUndefined();
      expect(result.content).toContain("<persisted-output>");
      expect(result.content).not.toContain(large);
      expect(savedPath).toBeTruthy();
      expect(readFileSync(savedPath!, "utf8")).toBe(large);
      expect(result.display?.type).toBe("bash");
      if (result.display?.type !== "bash") throw new Error("Expected bash display");
      expect(Buffer.byteLength(result.display.stdout)).toBeLessThanOrEqual(64);
      expect(result.display.persistedOutputPath).toBe(savedPath);
      expect(result.display.persistedOutputSize).toBe(2500);
    } finally {
      if (previousMaxOutput === undefined) delete process.env.BASH_MAX_OUTPUT_LENGTH;
      else process.env.BASH_MAX_OUTPUT_LENGTH = previousMaxOutput;
      if (previousConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = previousConfigDir;
      resetToolStateForTests();
    }
  });

  test("Bash background tasks expose output and status", async () => {
    const notifications: string[] = [];
    const start = await executeTool(
      "Bash",
      {
        command: "printf start; sleep 0.05; printf done",
        run_in_background: true,
      },
      undefined,
      { emitNotification: text => notifications.push(text) },
    );
    expect(start.display?.type).toBe("bash_background");
    if (start.display?.type !== "bash_background") throw new Error("Expected background display");

    await waitForBackgroundTask(start.display.taskId);
    const output = await executeTool("BashOutput", { bash_id: start.display.taskId });

    expect(output.isError).toBeUndefined();
    expect(output.content).toContain("Status: completed");
    expect(output.content).toContain("startdone");
    expect(notifications).toContain(`Background bash completed: ${start.display.taskId} (printf start; sleep 0.05; printf done)`);
    expect(listBackgroundTasks()).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: start.display.taskId,
        kind: "bash",
        status: "completed",
        description: "printf start; sleep 0.05; printf done",
      }),
    ]));

    const routedOutput = await readBackgroundTaskOutput(start.display.taskId);
    expect(routedOutput.content).toContain("<retrieval_status>success</retrieval_status>");
    expect(routedOutput.content).toContain("<task_type>local_bash</task_type>");
    expect(routedOutput.content).toContain("<status>completed</status>");
    expect(routedOutput.content).toContain("startdone");
  });

  test("TaskOutput and TaskStop route shell background tasks with official task tools", async () => {
    const start = await executeTool("Bash", {
      command: "sleep 5",
      run_in_background: true,
    });
    expect(start.display?.type).toBe("bash_background");
    if (start.display?.type !== "bash_background") throw new Error("Expected background display");

    const runningOutput = await executeTool("TaskOutput", { task_id: start.display.taskId, block: false });
    expect(runningOutput.content).toContain("<retrieval_status>not_ready</retrieval_status>");
    expect(runningOutput.content).toContain("<task_type>local_bash</task_type>");
    expect(runningOutput.content).toContain("<status>running</status>");

    const stopped = await executeTool("TaskStop", { shell_id: start.display.taskId });
    expect(stopped.content).toContain(`"task_id":"${start.display.taskId}"`);
    expect(stopped.content).toContain('"task_type":"local_bash"');
    expect(stopped.content).toContain('"command":"sleep 5"');

    const output = await readBackgroundTaskOutput(start.display.taskId);
    expect(output.content).toContain("<retrieval_status>success</retrieval_status>");
    expect(output.content).toContain("<status>killed</status>");
  });

  test("WebSearch delegates to Anthropic server-side web_search tool and renders official summary state", async () => {
    const previousFetch = globalThis.fetch;
    const previousToken = process.env.ANTHROPIC_AUTH_TOKEN;
    const previousApiKey = process.env.ANTHROPIC_API_KEY;
    const previousBaseUrl = process.env.ANTHROPIC_BASE_URL;
    const progress: string[] = [];
    let requestBody: any;

    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    delete process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_BASE_URL = "https://api.test";
    globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
      requestBody = JSON.parse(String(init?.body || "{}"));
      return new Response([
        sseEvent({
          type: "content_block_start",
          index: 0,
          content_block: { type: "server_tool_use", id: "srv_1", name: "web_search" },
        }),
        sseEvent({
          type: "content_block_delta",
          index: 0,
          delta: { type: "input_json_delta", partial_json: "{\"query\":\"current docs\"}" },
        }),
        sseEvent({ type: "content_block_stop", index: 0 }),
        sseEvent({
          type: "content_block_start",
          index: 1,
          content_block: {
            type: "web_search_tool_result",
            tool_use_id: "srv_1",
            content: [
              {
                type: "web_search_result",
                title: "Official docs",
                url: "https://example.com/docs",
                snippet: "Reference",
              },
            ],
          },
        }),
        sseEvent({ type: "content_block_stop", index: 1 }),
        sseEvent({ type: "message_stop" }),
        "data: [DONE]\n\n",
      ].join(""), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }) as typeof fetch;

    try {
      const result = await executeTool(
        "WebSearch",
        { query: "current docs", allowed_domains: ["example.com"] },
        undefined,
        {
          toolUseId: "toolu_search",
          emitProgress: event => {
            if (event.type === "web_search_progress") {
              progress.push(`${event.stage}:${event.query}:${event.resultCount ?? ""}`);
            }
          },
        },
      );

      expect(requestBody.tools[0]).toEqual({
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 8,
        allowed_domains: ["example.com"],
      });
      expect(result.isError).toBeUndefined();
      expect(result.content).toContain('Web search results for query: "current docs"');
      expect(result.content).toContain("- [Official docs](https://example.com/docs): Reference");
      expect(result.display).toEqual({
        type: "web_search",
        query: "current docs",
        searchCount: 1,
        totalResultCount: 1,
        durationSeconds: expect.any(Number),
        results: [{ title: "Official docs", url: "https://example.com/docs", snippet: "Reference" }],
      });
      expect(progress).toContain("query_update:current docs:");
      expect(progress).toContain("search_results_received:current docs:1");
    } finally {
      globalThis.fetch = previousFetch;
      if (previousToken === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = previousToken;
      if (previousApiKey === undefined) delete process.env.ANTHROPIC_API_KEY;
      else process.env.ANTHROPIC_API_KEY = previousApiKey;
      if (previousBaseUrl === undefined) delete process.env.ANTHROPIC_BASE_URL;
      else process.env.ANTHROPIC_BASE_URL = previousBaseUrl;
    }
  });

  test("Task tool spec includes official subagent usage guardrails", () => {
    const task = getToolDefs().find(tool => tool.name === "Task");

    expect(task?.description).toContain("complex, multi-step tasks");
    expect(task?.description).toContain("When NOT to use the Task tool");
    expect(task?.description).toContain('subagent_type to "Explore"');
    expect(task?.description).toContain("do not paste large raw command output");
    expect(task?.input_schema.properties.prompt).toEqual(expect.objectContaining({
      description: expect.stringContaining("do not paste large raw outputs"),
    }));
    expect(task?.input_schema.properties.run_in_background).toEqual(expect.objectContaining({
      description: expect.stringContaining("You will be notified when it completes"),
    }));
  });

  test("Explore classification only allows read-only search tools and Bash commands", () => {
    expect(normalizeSubagentType("explore")).toBe("Explore");
    expect(isReadOnlyExploreToolCall("Read", { file_path: "src/index.ts" })).toBe(true);
    expect(isReadOnlyExploreToolCall("Grep", { pattern: "Explore" })).toBe(true);
    expect(classifyReadOnlyBashCommand("find . -type f | head -20 && echo --- && ls -la")).toBe("search");
    expect(classifyReadOnlyBashCommand('find /Users/lbcheng -name "chat-aa" -type d 2>/dev/null | head -20')).toBe("search");
    expect(classifyReadOnlyBashCommand("find . -type f >/dev/null")).toBe("search");
    expect(classifyReadOnlyBashCommand("sed -n '1,80p' src/index.ts")).toBe("read");
    expect(classifyReadOnlyBashCommand("nl -ba src/index.ts | head -20")).toBe("read");
    expect(classifyReadOnlyBashCommand('cd /Users/lbcheng/open-claude-code/claude-code-full && echo "=== PACKAGE.JSON ===" && cat package.json && echo "=== TSCONFIG.JSON ===" && cat tsconfig.json')).toBe("read");
    expect(classifyReadOnlyBashCommand("cd /Users/lbcheng/open-claude-code/claude-code-full && find src -type f | head -20")).toBe("search");
    expect(classifyReadOnlyBashCommand("git -C /tmp/repo ls-tree -r --name-only HEAD")).toBe("read");
    expect(classifyReadOnlyBashCommand("git branch --show-current")).toBe("read");
    expect(classifyReadOnlyBashCommand("git branch --list 'feature/*'")).toBe("read");
    expect(classifyReadOnlyBashCommand("git worktree list --porcelain")).toBe("read");
    expect(classifyReadOnlyBashCommand("git stash show --stat")).toBe("read");
    expect(classifyReadOnlyBashCommand("find . -type f > ./files.txt")).toBe(null);
    expect(classifyReadOnlyBashCommand("find . -delete")).toBe(null);
    expect(classifyReadOnlyBashCommand("find . -name '*.tmp' -exec rm {} \\;")).toBe(null);
    expect(classifyReadOnlyBashCommand("cd /Users/lbcheng/open-claude-code/claude-code-full && rm -rf dist")).toBe(null);
    expect(classifyReadOnlyBashCommand("sed -i '' 's/a/b/' src/index.ts")).toBe(null);
    expect(classifyReadOnlyBashCommand("git branch feature/new")).toBe(null);
    expect(classifyReadOnlyBashCommand("git branch -D feature/old")).toBe(null);
    expect(classifyReadOnlyBashCommand("git tag v1.0.0")).toBe(null);
    expect(classifyReadOnlyBashCommand("git remote add origin git@example.com:x/y.git")).toBe(null);
    expect(classifyReadOnlyBashCommand("git diff -- src/index.ts")).toBe("read");
    expect(isReadOnlyExploreToolCall("Bash", { command: "echo hi > /tmp/explore-write" })).toBe(false);
    expect(isReadOnlyExploreToolCall("Bash", { command: "rm -rf dist" })).toBe(false);
    expect(isReadOnlyExploreToolCall("Edit", { file_path: "src/index.ts" })).toBe(false);
  });

  test("Task runs a native in-process subagent through execution context", async () => {
    const progress: string[] = [];
    const result = await executeTool(
      "Task",
      {
        description: "inspect code",
        prompt: "Read the current file and summarize it",
        subagent_type: "general-purpose",
      },
      undefined,
      {
        toolUseId: "toolu_task",
        emitProgress: event => {
          if (event.type === "agent_progress") progress.push(`${event.description}:${event.message}`);
        },
        runSubagent: async request => {
          expect(request).toEqual({
            description: "inspect code",
            prompt: "Read the current file and summarize it",
            subagentType: "general-purpose",
            parentToolUseId: "toolu_task",
            agentId: "toolu_task-agent",
          });
          return {
            agentId: "agent-1",
            content: "Subagent answer",
            totalDurationMs: 42,
            totalTokens: 123,
            totalToolUseCount: 2,
          };
        },
      },
    );

    expect(result.isError).toBeUndefined();
    expect(result.content).toContain("Subagent answer");
    expect(result.content).toContain("agentId: agent-1");
    expect(result.content).toContain("<usage>total_tokens: 123");
    expect(result.display).toEqual({
      type: "agent",
      agentId: "agent-1",
      description: "inspect code",
      prompt: "Read the current file and summarize it",
      status: "completed",
      content: "Subagent answer",
      totalDurationMs: 42,
      totalTokens: 123,
      totalToolUseCount: 2,
    });
    expect(progress).toEqual(["inspect code:Initializing…"]);
  });

  test("Task returns structured failed agent display when the subagent fails", async () => {
    const result = await executeTool(
      "Task",
      {
        description: "inspect code",
        prompt: "Analyze the current code",
      },
      undefined,
      {
        toolUseId: "toolu_task_fail",
        runSubagent: async () => ({
          agentId: "agent-fail",
          status: "failed",
          content: "",
          error: "内容超长，请删减后再试",
          totalDurationMs: 12,
          totalTokens: 0,
          totalToolUseCount: 0,
        }),
      },
    );

    expect(result.isError).toBe(true);
    expect(result.content).toContain("Subagent failed: 内容超长，请删减后再试");
    expect(result.content).toContain("status: failed");
    expect(result.display).toEqual({
      type: "agent",
      agentId: "agent-fail",
      description: "inspect code",
      prompt: "Analyze the current code",
      status: "failed",
      content: "",
      totalDurationMs: 12,
      totalTokens: 0,
      totalToolUseCount: 0,
      error: "内容超长，请删减后再试",
    });
  });

  test("Task can launch a real background subagent and expose output through TaskOutput", async () => {
    const dir = createTempDir();
    const previousConfigDir = process.env.CLAUDE_CONFIG_DIR;
    const notifications: string[] = [];
    process.env.CLAUDE_CONFIG_DIR = dir;
    resetToolStateForTests();

    try {
      const start = await executeTool(
        "Task",
        {
          description: "inspect code",
          prompt: "Read and summarize",
          run_in_background: true,
        },
        undefined,
        {
          toolUseId: "toolu_task_bg",
          sessionId: "session-bg",
          cwd: dir,
          emitNotification: text => notifications.push(text),
          runSubagent: async request => {
            expect(request.agentId).toBe("toolu_task_bg-agent");
            expect(request.runInBackground).toBe(true);
            await new Promise(resolve => setTimeout(resolve, 25));
            return {
              agentId: request.agentId || "agent-bg",
              content: "Background answer",
              totalDurationMs: 25,
              totalTokens: 77,
              totalToolUseCount: 1,
            };
          },
        },
      );

      expect(start.display?.type).toBe("agent_background");
      if (start.display?.type !== "agent_background") throw new Error("Expected agent_background display");
      expect(start.display.taskId).toBe("local_agent_1");
      expect(existsSync(start.display.outputFile)).toBe(true);

      const output = await executeTool("TaskOutput", {
        task_id: start.display.taskId,
        block: true,
        timeout: 1000,
      });

      expect(output.isError).toBeUndefined();
      expect(output.content).toContain("<retrieval_status>success</retrieval_status>");
      expect(output.content).toContain("<task_type>local_agent</task_type>");
      expect(output.content).toContain("Background answer");
      expect(output.display).toEqual({
        type: "agent",
        agentId: "toolu_task_bg-agent",
        description: "inspect code",
        prompt: "Read and summarize",
        status: "completed",
        content: "Background answer",
        totalDurationMs: 25,
        totalTokens: 77,
        totalToolUseCount: 1,
      });
      expect(readFileSync(start.display.outputFile, "utf8")).toContain("Background answer");
      expect(notifications).toEqual([
        `Background agent completed: ${start.display.taskId} (inspect code). Output: ${start.display.outputFile}`,
      ]);
      expect(listBackgroundTasks()).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: start.display.taskId,
          kind: "agent",
          status: "completed",
          description: "inspect code",
          outputFile: start.display.outputFile,
        }),
      ]));

      const routedOutput = await readBackgroundTaskOutput(start.display.taskId);
      expect(routedOutput.content).toContain("<retrieval_status>success</retrieval_status>");
      expect(routedOutput.content).toContain("Background answer");
    } finally {
      if (previousConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = previousConfigDir;
      resetToolStateForTests();
    }
  });

  test("TaskOutput exposes failed background subagent status without raw tool error", async () => {
    const dir = createTempDir();
    const previousConfigDir = process.env.CLAUDE_CONFIG_DIR;
    const notifications: string[] = [];
    process.env.CLAUDE_CONFIG_DIR = dir;
    resetToolStateForTests();

    try {
      const start = await executeTool(
        "Task",
        {
          description: "inspect code",
          prompt: "Analyze deeply",
          run_in_background: true,
        },
        undefined,
        {
          toolUseId: "toolu_task_bg_fail",
          sessionId: "session-bg-fail",
          cwd: dir,
          emitNotification: text => notifications.push(text),
          runSubagent: async request => ({
            agentId: request.agentId || "agent-bg-fail",
            status: "failed",
            content: "",
            error: "内容超长，请删减后再试",
            totalDurationMs: 18,
            totalTokens: 0,
            totalToolUseCount: 0,
          }),
        },
      );

      expect(start.display?.type).toBe("agent_background");
      if (start.display?.type !== "agent_background") throw new Error("Expected agent_background display");

      const output = await executeTool("TaskOutput", {
        task_id: start.display.taskId,
        block: true,
        timeout: 1000,
      });

      expect(output.isError).toBe(true);
      expect(output.content).toContain("<status>failed</status>");
      expect(output.content).toContain("<error>内容超长，请删减后再试</error>");
      expect(output.display).toEqual({
        type: "agent",
        agentId: "toolu_task_bg_fail-agent",
        description: "inspect code",
        prompt: "Analyze deeply",
        status: "failed",
        content: "内容超长，请删减后再试",
        totalDurationMs: 18,
        totalTokens: 0,
        totalToolUseCount: 0,
        error: "内容超长，请删减后再试",
      });
      expect(readFileSync(start.display.outputFile, "utf8")).toContain("status: failed");
      expect(notifications).toEqual([
        `Background agent failed: ${start.display.taskId} (inspect code). Output: ${start.display.outputFile}`,
      ]);
    } finally {
      if (previousConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = previousConfigDir;
      resetToolStateForTests();
    }
  });

  test("TaskStop stops running background subagents with official output shape", async () => {
    const dir = createTempDir();
    const previousConfigDir = process.env.CLAUDE_CONFIG_DIR;
    process.env.CLAUDE_CONFIG_DIR = dir;
    resetToolStateForTests();

    try {
      const start = await executeTool(
        "Task",
        {
          description: "inspect code",
          prompt: "Analyze slowly",
          run_in_background: true,
        },
        undefined,
        {
          toolUseId: "toolu_task_bg_stop",
          sessionId: "session-bg-stop",
          cwd: dir,
          runSubagent: async (request, signal) => {
            await new Promise((_resolve, reject) => {
              signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
            });
            return {
              agentId: request.agentId || "agent-bg-stop",
              status: "completed",
              content: "unreachable",
              totalDurationMs: 0,
              totalTokens: 0,
              totalToolUseCount: 0,
            };
          },
        },
      );

      expect(start.display?.type).toBe("agent_background");
      if (start.display?.type !== "agent_background") throw new Error("Expected agent_background display");

      const stopped = await executeTool("TaskStop", { task_id: start.display.taskId });
      expect(stopped.content).toContain(`"task_id":"${start.display.taskId}"`);
      expect(stopped.content).toContain('"task_type":"local_agent"');
      expect(stopped.content).toContain('"command":"inspect code"');

      const output = await executeTool("TaskOutput", { task_id: start.display.taskId, block: false });
      expect(output.content).toContain("<retrieval_status>success</retrieval_status>");
      expect(output.content).toContain("<status>killed</status>");
    } finally {
      if (previousConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
      else process.env.CLAUDE_CONFIG_DIR = previousConfigDir;
      resetToolStateForTests();
    }
  });

  test("NotebookEdit replaces, inserts, and deletes real notebook cells", async () => {
    const file = createTempFile(JSON.stringify({
      nbformat: 4,
      nbformat_minor: 5,
      metadata: { language_info: { name: "python" } },
      cells: [
        { id: "intro", cell_type: "markdown", source: "# Old\n", metadata: {} },
        { id: "code", cell_type: "code", source: "print('old')\n", metadata: {}, execution_count: 3, outputs: [{ output_type: "stream", text: "old" }] },
      ],
    }), "nb.ipynb");
    const context = { sessionId: "notebook-edit" };

    await executeTool("Read", { file_path: file }, undefined, context);
    const replaced = await executeTool("NotebookEdit", {
      notebook_path: file,
      cell_id: "code",
      new_source: "print('new')\n",
    }, undefined, context);
    await executeTool("Read", { file_path: file }, undefined, context);
    const inserted = await executeTool("NotebookEdit", {
      notebook_path: file,
      cell_id: "intro",
      edit_mode: "insert",
      cell_type: "markdown",
      new_source: "Inserted\n",
    }, undefined, context);
    await executeTool("Read", { file_path: file }, undefined, context);
    const deleted = await executeTool("NotebookEdit", {
      notebook_path: file,
      cell_id: "cell-0",
      edit_mode: "delete",
      new_source: "",
    }, undefined, context);
    const notebook = JSON.parse(readFileSync(file, "utf8"));

    expect(replaced.isError).toBeUndefined();
    expect(replaced.content).toContain("Updated cell code");
    expect(replaced.display?.type).toBe("edit");
    expect(inserted.content).toContain("Inserted cell");
    expect(deleted.content).toContain("Deleted cell intro");
    expect(notebook.cells).toHaveLength(2);
    expect(notebook.cells[0].source).toBe("Inserted\n");
    expect(notebook.cells[1].source).toBe("print('new')\n");
    expect(notebook.cells[1].execution_count).toBeNull();
    expect(notebook.cells[1].outputs).toEqual([]);
  });

  test("NotebookEdit requires reading the notebook first", async () => {
    const file = createTempFile(JSON.stringify({
      nbformat: 4,
      nbformat_minor: 5,
      cells: [
        { id: "intro", cell_type: "markdown", source: "Old\n", metadata: {} },
      ],
    }), "unread.ipynb");

    const result = await executeTool("NotebookEdit", {
      notebook_path: file,
      cell_id: "intro",
      new_source: "New\n",
    }, undefined, { sessionId: "notebook-unread" });

    expect(result.isError).toBe(true);
    expect(result.content).toContain("not been read yet");
  });
});

function createTempDir(): string {
  tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-"));
  return tempDir;
}

function createTempFile(content: string, fileName = "sample.txt"): string {
  const dir = createTempDir();
  const file = join(dir, fileName);
  writeFileSync(file, content);
  return file;
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, "'\\''")}'`;
}

function sseEvent(event: unknown): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

async function waitForBackgroundTask(taskId: string): Promise<void> {
  const deadline = Date.now() + 2000;
  while (Date.now() < deadline) {
    const result = await executeTool("BashOutput", { bash_id: taskId });
    if (result.content.includes("Status: completed") || result.content.includes("Status: failed")) return;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error(`Timed out waiting for ${taskId}`);
}

async function waitForForegroundBashTask(): Promise<void> {
  const deadline = Date.now() + 1000;
  while (Date.now() < deadline) {
    if (hasForegroundBashTasks()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("Timed out waiting for foreground bash task");
}
