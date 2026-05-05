import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { executeTool, resetToolStateForTests } from "./registry.js";

let tempDir: string | null = null;

afterEach(() => {
  resetToolStateForTests();
  if (!tempDir) return;
  rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("tool registry", () => {
  test("Read uses official 1-based offset semantics", async () => {
    const file = createTempFile("a\nb\nc\n");

    const result = await executeTool("Read", { file_path: file, offset: 1, limit: 1 });

    expect(result).toEqual({ content: "a" });
  });

  test("Read summarizes non-text files instead of dumping bytes", async () => {
    const file = createTempFile("not really png", "image.png");

    const result = await executeTool("Read", { file_path: file });

    expect(result.isError).toBeUndefined();
    expect(result.content).toContain("Image file:");
    expect(result.content).toContain("image.png");
  });

  test("Read reports empty files without fabricating content", async () => {
    const file = createTempFile("");

    const result = await executeTool("Read", { file_path: file });

    expect(result).toEqual({ content: "(empty file)" });
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
    const readBack = await executeTool("Read", { file_path: file });

    expect(result.isError).toBeUndefined();
    expect(readBack.content).toBe("two gamma\n");
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

  test("Grep uses ripgrep include and head_limit semantics", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, "a.txt"), "target one\ntarget two\n");
    writeFileSync(join(dir, "b.md"), "target ignored\n");

    const result = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      include: "*.txt",
      head_limit: 1,
    });

    expect(result.content.split("\n")).toHaveLength(1);
    expect(result.content).toContain("a.txt:1:target one");
    expect(result.content).not.toContain("b.md");
  });

  test("Grep supports hidden, case-insensitive, and files_with_matches mode", async () => {
    const dir = createTempDir();
    writeFileSync(join(dir, ".hidden.txt"), "Target\n");

    const withoutHidden = await executeTool("Grep", { pattern: "target", path: dir, case_insensitive: true });
    const withHidden = await executeTool("Grep", {
      pattern: "target",
      path: dir,
      case_insensitive: true,
      hidden: true,
      output_mode: "files_with_matches",
    });

    expect(withoutHidden.content).toBe("(no matches)");
    expect(withHidden.content).toContain(".hidden.txt");
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

  test("Bash respects timeout", async () => {
    const result = await executeTool("Bash", { command: "sleep 1", timeout: 25 });

    expect(result.isError).toBe(true);
    expect(result.content).toContain("timed out");
  });

  test("Bash background tasks expose output and status", async () => {
    const start = await executeTool("Bash", {
      command: "printf start; sleep 0.05; printf done",
      run_in_background: true,
    });
    expect(start.display?.type).toBe("bash_background");
    if (start.display?.type !== "bash_background") throw new Error("Expected background display");

    await waitForBackgroundTask(start.display.taskId);
    const output = await executeTool("BashOutput", { bash_id: start.display.taskId });

    expect(output.isError).toBeUndefined();
    expect(output.content).toContain("Status: completed");
    expect(output.content).toContain("startdone");
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

async function waitForBackgroundTask(taskId: string): Promise<void> {
  const deadline = Date.now() + 2000;
  while (Date.now() < deadline) {
    const result = await executeTool("BashOutput", { bash_id: taskId });
    if (result.content.includes("Status: completed") || result.content.includes("Status: failed")) return;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error(`Timed out waiting for ${taskId}`);
}
