import { beforeEach, describe, expect, test } from "bun:test";
import { stringWidth } from "@anthropic/ink";
import {
  MAIN_SYSTEM_PROMPT,
  applyInputEditAction,
  buildMainSystemPrompt,
  buildSubagentSystemPrompt,
  formatAgentResultStatusLine,
  formatCoordinatorTaskHint,
  getModeFooterBackgroundTaskTexts,
  formatOutputPickerDuration,
  formatOutputPickerAgentLine,
  formatOutputPickerMainLine,
  formatTurnDurationText,
  formatToolInputPreview,
  formatToolUseMessageForColumns,
  getBottomSeparatorText,
  getInputLineCursorParts,
  getOfficialSpinnerAnimationState,
  getExitControlInput,
  getModeFooterParts,
  getRenderableAgentProgressEntries,
  getVisibleAgentProgressEntries,
  groupToolRenderItems,
  resetInputEditStateForTest,
  splitOfficialSpinnerShimmer,
  type ToolRender,
} from "./app.js";

function tool(partial: Partial<ToolRender> & Pick<ToolRender, "id" | "name">): ToolRender {
  return {
    input: {},
    ...partial,
  };
}

beforeEach(() => {
  resetInputEditStateForTest();
});

describe("terminal tool render grouping", () => {
  test("main system prompt matches official Explore trigger rules", () => {
    expect(MAIN_SYSTEM_PROMPT).toContain("Use direct file/search tools for simple, directed codebase searches");
    expect(MAIN_SYSTEM_PROMPT).toContain('subagent_type="Explore"');
    expect(MAIN_SYSTEM_PROMPT).toContain("more than 3 search/read queries");
  });

  test("api system prompt includes official environment cwd context", () => {
    const prompt = buildMainSystemPrompt("deepseek-v4-pro", "/tmp/claude-code-full");

    expect(prompt).toContain("# Environment");
    expect(prompt).toContain("Primary working directory: /tmp/claude-code-full");
    expect(prompt).toContain("You are powered by the model deepseek-v4-pro.");
  });

  test("api system prompt preserves appended CLI instructions", () => {
    const prompt = buildMainSystemPrompt("deepseek-v4-pro", "/tmp/claude-code-full", [], "Always answer with terse status.");

    expect(prompt).toContain(MAIN_SYSTEM_PROMPT);
    expect(prompt).toContain("Always answer with terse status.");
    expect(prompt).toContain("# Environment");
  });

  test("subagent prompt carries cwd and path discovery guidance", () => {
    const prompt = buildSubagentSystemPrompt("Explore", "deepseek-v4-pro", "/tmp/claude-code-full");

    expect(prompt).toContain("READ-ONLY exploration task");
    expect(prompt).toContain("Primary working directory: /tmp/claude-code-full");
    expect(prompt).toContain("Before using a guessed path, discover it with LS, Glob, Grep, or a read-only Bash command.");
  });

  test("subagent prompt inherits appended CLI instructions", () => {
    const prompt = buildSubagentSystemPrompt("Explore", "deepseek-v4-pro", "/tmp/claude-code-full", [], "Respect the caller's extra policy.");

    expect(prompt).toContain("READ-ONLY exploration task");
    expect(prompt).toContain("Respect the caller's extra policy.");
    expect(prompt).toContain("# Environment");
  });

  test("keeps top-level read-only tools standalone like the official TUI", () => {
    const grouped = groupToolRenderItems([
      tool({ id: "ls-1", name: "LS", input: { path: "." }, result: "Found 15 files" }),
      tool({ id: "bash-1", name: "Bash", input: { command: "find . -maxdepth 1 -type f | head -20" }, result: "a.ts" }),
      tool({ id: "read-1", name: "Read", input: { file_path: "package.json" }, result: "Read 30 lines" }),
    ]);

    expect(grouped.map(item => item.type)).toEqual(["tool", "tool", "tool"]);
  });

  test("groups multiple Task tool calls from the same assistant response", () => {
    const grouped = groupToolRenderItems([
      tool({ id: "task-1", name: "Task", input: { subagent_type: "Explore", description: "Explore src" }, result: "Done" }),
      tool({ id: "task-2", name: "Task", input: { subagent_type: "Explore", description: "Explore tests" }, result: "Done" }),
    ]);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.type).toBe("agent_group");
    expect(grouped[0]?.type === "agent_group" ? grouped[0].tools.map(entry => entry.id) : []).toEqual(["task-1", "task-2"]);
  });

  test("does not group a single Explore Task as synthetic read-only Explore", () => {
    const grouped = groupToolRenderItems([
      tool({ id: "task-1", name: "Task", input: { subagent_type: "Explore", description: "Explore project structure" }, result: "Done" }),
    ]);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.type).toBe("tool");
  });

  test("hides deferred TodoWrite tool calls like the official TUI", () => {
    const grouped = groupToolRenderItems([
      tool({ id: "todo-1", name: "TodoWrite", input: { todos: [] }, result: "Todos updated: 0/0 completed" }),
      tool({ id: "ls-1", name: "LS", input: { path: "." }, result: "Found 15 files" }),
    ]);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.type).toBe("tool");
    expect(grouped[0]?.type === "tool" ? grouped[0].tool.id : "").toBe("ls-1");
  });

  test("hidden TodoWrite does not break adjacent Task grouping", () => {
    const grouped = groupToolRenderItems([
      tool({ id: "task-1", name: "Task", input: { subagent_type: "Explore", description: "Explore src" }, result: "Done" }),
      tool({ id: "todo-1", name: "TodoWrite", input: { todos: [] }, result: "Todos updated: 0/0 completed" }),
      tool({ id: "task-2", name: "Task", input: { subagent_type: "Explore", description: "Explore tests" }, result: "Done" }),
    ]);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.type).toBe("agent_group");
    expect(grouped[0]?.type === "agent_group" ? grouped[0].tools.map(entry => entry.id) : []).toEqual(["task-1", "task-2"]);
  });

  test("hides non-blocking TaskOutput polling while background agents are still running", () => {
    const grouped = groupToolRenderItems([
      tool({
        id: "task-output-1",
        name: "TaskOutput",
        input: { task_id: "local_agent_1", block: false },
        result: "<retrieval_status>not_ready</retrieval_status>\n<status>running</status>",
      }),
      tool({ id: "grep-1", name: "Grep", input: { pattern: "needle" }, result: "Found 1 match" }),
    ]);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.type).toBe("tool");
    expect(grouped[0]?.type === "tool" ? grouped[0].tool.id : "").toBe("grep-1");
  });

  test("truncates tool input chrome to the current terminal columns", () => {
    const message = 'find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \\) ! -path "*/node_modules/*" | head -80';
    const rendered = formatToolUseMessageForColumns(message, "Bash", 48);

    expect(rendered).toEndWith("…");
    expect(rendered.length).toBeLessThan(message.length);
  });

  test("does not leak raw TodoWrite streaming JSON in the tool header", () => {
    expect(formatToolInputPreview("TodoWrite", '{"todos":[{"content":"Explore')).toBe("");
    expect(formatToolInputPreview("TodoWrite", '{"todos":[{"content":"Explore","status":"pending"}]}')).toBe("1 todo");
  });

  test("hides deferred TodoWrite inside subagent progress", () => {
    const entries = getRenderableAgentProgressEntries([
      {
        toolUseId: "todo-1",
        toolName: "TodoWrite",
        input: { todos: [] },
        status: "completed",
        summary: "Todos updated",
      },
      {
        toolUseId: "read-1",
        toolName: "Read",
        input: { file_path: "package.json" },
        status: "completed",
        summary: "Read 24 lines",
      },
    ]);

    expect(entries.map(entry => entry.toolName)).toEqual(["Read"]);
  });

  test("keeps repeated agent progress tool uses and only folds older rows", () => {
    const entries = getRenderableAgentProgressEntries([
      {
        toolUseId: "ls-1",
        toolName: "LS",
        input: { path: "." },
        status: "completed",
        summary: "Found 15 files",
      },
      {
        toolUseId: "ls-2",
        toolName: "LS",
        input: { path: "." },
        status: "completed",
        summary: "Found 15 files",
      },
      {
        toolUseId: "ls-3",
        toolName: "LS",
        input: { path: "." },
        status: "completed",
        summary: "Found 15 files",
      },
      {
        toolUseId: "ls-4",
        toolName: "LS",
        input: { path: "." },
        status: "completed",
        summary: "Found 15 files",
      },
    ]);

    expect(entries.map(entry => entry.toolUseId)).toEqual(["ls-1", "ls-2", "ls-3", "ls-4"]);
    expect(getVisibleAgentProgressEntries(entries, false).map(entry => entry.toolUseId)).toEqual(["ls-2", "ls-3", "ls-4"]);
    expect(getVisibleAgentProgressEntries(entries, true).map(entry => entry.toolUseId)).toEqual(["ls-1", "ls-2", "ls-3", "ls-4"]);
  });

  test("input cursor uses official inverse-cell parts instead of inserting a pipe glyph", () => {
    expect(getInputLineCursorParts("abcdef", 2)).toEqual({
      before: "ab",
      cursor: "c",
      after: "def",
      visualColumn: 2,
    });

    expect(getInputLineCursorParts("abc", 3)).toEqual({
      before: "abc",
      cursor: " ",
      after: "",
      visualColumn: 3,
    });

    expect(getInputLineCursorParts("你a", 1)).toEqual({
      before: "你",
      cursor: "a",
      after: "",
      visualColumn: 2,
    });
  });

  test("spinner uses official reverse shimmer and tool-use flash animation", () => {
    expect(getOfficialSpinnerAnimationState("Noodling…", "responding", 0)).toEqual({
      frame: "·",
      glimmerIndex: stringWidth("Noodling…") + 10,
      flashOpacity: 0,
    });
    expect(getOfficialSpinnerAnimationState("Noodling…", "responding", 200).glimmerIndex).toBe(stringWidth("Noodling…") + 9);
    expect(getOfficialSpinnerAnimationState("Noodling…", "requesting", 0).glimmerIndex).toBe(-10);
    expect(getOfficialSpinnerAnimationState("Noodling…", "requesting", 50).glimmerIndex).toBe(-9);
    expect(getOfficialSpinnerAnimationState("Noodling…", "tool-use", 500).flashOpacity).toBeCloseTo(1, 5);
    expect(getOfficialSpinnerAnimationState("Noodling…", "responding", 240, false, true).glimmerIndex).toBe(-100);
    expect(getOfficialSpinnerAnimationState("Noodling…", "responding", 240, true).frame).toBe("·");

    expect(splitOfficialSpinnerShimmer("Noodling…", 2)).toEqual({
      before: "N",
      shimmer: "ood",
      after: "ling…",
    });
  });

  test("input edit actions support official ctrl/meta kill and yank behavior", () => {
    expect(applyInputEditAction("hello world", 11, "killWordBefore")).toEqual({
      input: "hello ",
      cursor: 6,
    });
    expect(applyInputEditAction("hello ", 6, "yank")).toEqual({
      input: "hello world",
      cursor: 11,
    });

    resetInputEditStateForTest();
    expect(applyInputEditAction("alpha beta", 10, "killWordBefore")).toEqual({
      input: "alpha ",
      cursor: 6,
    });
    expect(applyInputEditAction("alpha ", 6, "killLineStart")).toEqual({
      input: "",
      cursor: 0,
    });
    expect(applyInputEditAction("", 0, "yank")).toEqual({
      input: "alpha beta",
      cursor: 10,
    });
  });

  test("input edit actions move through multiline prompts before history takes over", () => {
    expect(applyInputEditAction("abc\ndef", 5, "upLogicalLine")).toEqual({
      input: "abc\ndef",
      cursor: 1,
    });
    expect(applyInputEditAction("abc\ndef", 1, "downLogicalLine")).toEqual({
      input: "abc\ndef",
      cursor: 5,
    });
  });

  test("input edit actions keep image refs atomic for readline shortcuts", () => {
    const imageInput = "ask [Image #2] now";
    const imageStart = imageInput.indexOf("[Image #2]");
    const imageEnd = imageStart + "[Image #2]".length;

    expect(applyInputEditAction(imageInput, imageEnd, "left").cursor).toBe(imageStart);
    expect(applyInputEditAction(imageInput, imageStart, "right").cursor).toBe(imageEnd);
    expect(applyInputEditAction(imageInput, imageStart, "deleteBefore")).toEqual({
      input: "ask  now",
      cursor: imageStart,
    });
    expect(applyInputEditAction(imageInput, imageStart + 4, "killWordBefore")).toEqual({
      input: "ask  now",
      cursor: imageStart,
    });
  });

  test("exit control parser handles raw ETX/EOT and CSI-u forms", () => {
    expect(getExitControlInput("\x03", { ctrl: false })).toEqual({ keyName: "Ctrl-C", count: 1 });
    expect(getExitControlInput("\x03\x03\x03", { ctrl: false })).toEqual({ keyName: "Ctrl-C", count: 3 });
    expect(getExitControlInput("\x04", { ctrl: false })).toEqual({ keyName: "Ctrl-D", count: 1 });
    expect(getExitControlInput("\x1b[99;5u", { ctrl: false })).toEqual({ keyName: "Ctrl-C", count: 1 });
    expect(getExitControlInput("[99;5u", { ctrl: false })).toEqual({ keyName: "Ctrl-C", count: 1 });
    expect(getExitControlInput("\x1b[100;5u", { ctrl: false })).toEqual({ keyName: "Ctrl-D", count: 1 });
    expect(getExitControlInput("[100;5u", { ctrl: false })).toEqual({ keyName: "Ctrl-D", count: 1 });
    expect(getExitControlInput("c", { ctrl: true })).toEqual({ keyName: "Ctrl-C", count: 1 });
  });

  test("footer keeps permission mode and interrupt hint in the official left zone", () => {
    const previousToken = process.env.ANTHROPIC_AUTH_TOKEN;
    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    try {
      const parts = getModeFooterParts({
        permissionMode: "bypassPermissions",
        model: "deepseek-v4-pro[1m]",
        expandedOutput: false,
        loading: true,
        hasCoordinatorTasks: true,
        coordinatorActive: false,
        usage: { input_tokens: 5330 },
        exitMessage: { show: false },
        temporaryNotice: null,
      });

      expect(parts.modeText).toBe("⏵⏵ bypass permissions on");
      expect(parts.modeColor).toBe("error");
      expect(parts.modeShortcutText).toBe("(shift+tab to cycle)");
      expect(parts.backgroundTaskTexts).toEqual([]);
      expect(parts.hintText).toBe("esc to interrupt");
      expect(parts.taskHintText).toBe("↓ to manage");
      expect(parts.usageText).toBe("");
      expect(parts.rightText).toBe("◈ max · /effort");
    } finally {
      if (previousToken === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = previousToken;
    }
  });

  test("footer keeps the official byline even after coordinator tasks exist", () => {
    const previousToken = process.env.ANTHROPIC_AUTH_TOKEN;
    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    try {
      const parts = getModeFooterParts({
        permissionMode: "bypassPermissions",
        model: "deepseek-v4-pro[1m]",
        expandedOutput: false,
        loading: true,
        hasCoordinatorTasks: true,
        coordinatorActive: false,
        usage: { input_tokens: 5330 },
        exitMessage: { show: false },
        temporaryNotice: null,
        isEmptySession: false,
      });

      expect(parts.modeText).toBe("⏵⏵ bypass permissions on");
      expect(parts.modeShortcutText).toBe("(shift+tab to cycle)");
      expect(parts.hintText).toBe("esc to interrupt");
      expect(parts.taskHintText).toBe("↓ to manage");
      expect(parts.rightText).toBe("◈ max · /effort");
    } finally {
      if (previousToken === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = previousToken;
    }
  });

  test("footer shows official effort status when no task panel owns the right zone", () => {
    const previousToken = process.env.ANTHROPIC_AUTH_TOKEN;
    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    try {
      const parts = getModeFooterParts({
        permissionMode: "default",
        model: "deepseek-v4-pro[1m]",
        expandedOutput: false,
        loading: false,
        hasCoordinatorTasks: false,
        coordinatorActive: false,
        usage: {},
        exitMessage: { show: false },
        temporaryNotice: null,
        isEmptySession: false,
      });

      expect(parts.rightText).toBe("◈ max · /effort");
    } finally {
      if (previousToken === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = previousToken;
    }
  });

  test("bottom separator stays plain; manage hint belongs to the footer byline", () => {
    expect(getBottomSeparatorText(12)).toBe("────────────");
  });

  test("footer mirrors official background task byline when shells or agents are running", () => {
    const previousToken = process.env.ANTHROPIC_AUTH_TOKEN;
    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    try {
      const backgroundTasks = [
        { kind: "bash" as const, status: "running" as const },
        { kind: "bash" as const, status: "running" as const },
        { kind: "agent" as const, status: "completed" as const },
      ];
      const parts = getModeFooterParts({
        permissionMode: "bypassPermissions",
        model: "deepseek-v4-pro[1m]",
        expandedOutput: false,
        loading: true,
        hasCoordinatorTasks: false,
        coordinatorActive: false,
        backgroundTasks,
        hasTaskList: true,
        tasksVisible: true,
        usage: {},
        exitMessage: { show: false },
        temporaryNotice: null,
      });

      expect(getModeFooterBackgroundTaskTexts(backgroundTasks)).toEqual(["2 shells"]);
      expect(parts.backgroundTaskTexts).toEqual(["2 shells"]);
      expect(parts.hintText).toBe("esc to interrupt");
      expect(parts.taskToggleText).toBe("ctrl+t to hide tasks");
      expect(parts.taskHintText).toBe("↓ to manage");
    } finally {
      if (previousToken === undefined) delete process.env.ANTHROPIC_AUTH_TOKEN;
      else process.env.ANTHROPIC_AUTH_TOKEN = previousToken;
    }
  });

  test("footer exit message suppresses usage status like the official footer", () => {
    const parts = getModeFooterParts({
      permissionMode: "bypassPermissions",
      model: "deepseek-v4-pro[1m]",
      expandedOutput: false,
      loading: true,
      hasCoordinatorTasks: true,
      coordinatorActive: true,
      usage: { input_tokens: 5330 },
      exitMessage: { show: true, key: "Ctrl-C" },
      temporaryNotice: null,
    });

    expect(parts.exitText).toBe("Press Ctrl-C again to exit");
    expect(parts.modeText).toBe("");
    expect(parts.modeShortcutText).toBe("");
    expect(parts.hintText).toBe("");
    expect(parts.taskHintText).toBe("");
    expect(parts.usageText).toBe("");
    expect(parts.rightText).toBe("");
  });

  test("turn duration text uses real elapsed time instead of a hard-coded zero", () => {
    expect(formatTurnDurationText("Cooked", 49_400)).toBe("Cooked for 49s");
    expect(formatTurnDurationText("Worked", 61_000)).toBe("Worked for 1m 1s");
  });

  test("output picker follows official coordinator panel row shape", () => {
    expect(formatOutputPickerMainLine(true)).toBe("› ⏺ main");
    expect(formatOutputPickerMainLine(false)).toBe("  ⏺ main");
    expect(formatOutputPickerMainLine(false, false)).toBe("  ○ main");
    const inactiveLine = formatOutputPickerAgentLine("Explore cheng codebase structure", "43s", false, false, true, 80, undefined, 0, "Explore");
    expect(inactiveLine.startsWith("  ◯ Explore  Explore cheng codebase structure")).toBe(true);
    expect(inactiveLine.endsWith("43s")).toBe(true);
    expect(stringWidth(inactiveLine)).toBe(80);
    const selectedRunningLine = formatOutputPickerAgentLine("Explore cheng codebase structure", "43s", true, false, true, 80, undefined, 0, "Explore");
    expect(selectedRunningLine.startsWith("› ◯ Explore  Explore cheng codebase structure")).toBe(true);
    expect(selectedRunningLine.endsWith("▶ 43s · x to stop")).toBe(true);
    expect(formatOutputPickerAgentLine("Explore cheng codebase structure", "43s", true, true, true, 80, undefined, 0, "Explore").endsWith("▶ 43s")).toBe(true);
    expect(formatOutputPickerAgentLine("Explore cheng codebase structure", "43s", true, false, false, 80, undefined, 0, "Explore").endsWith("⏸ 43s · x to clear")).toBe(true);
    expect(formatCoordinatorTaskHint(false)).toBe("↓ to manage");
    expect(formatCoordinatorTaskHint(true)).toBe("Enter to view tasks");
  });

  test("agent result metrics match official failure line semantics", () => {
    expect(formatAgentResultStatusLine("failed", 1, 0, 192_100)).toEqual({
      label: "Failed",
      metrics: "1 tool use · 3m 12s",
    });
    expect(formatAgentResultStatusLine("completed", 2, 12_345, 43_700)).toEqual({
      label: "Done",
      metrics: "2 tool uses · 12,345 tokens · 43s",
    });
  });

  test("output picker duration uses official minute formatting while running", () => {
    expect(formatOutputPickerDuration(tool({
      id: "task-1",
      name: "Task",
      input: { description: "Analyze codebase issues" },
      progress: {
        type: "agent_progress",
        description: "Analyze codebase issues",
        message: "Running...",
        elapsedTimeSeconds: 210,
      },
    }))).toBe("3m 30s");
  });
});
