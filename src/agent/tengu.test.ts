import { describe, expect, test } from "bun:test";
import type { ApiMessage, ApiStreamEvent, ToolDef } from "../api/client.js";
import { assertResolvedToolResults, prepareApiMessagesForRequest, TenguSession, type SpinnerMode } from "./tengu.js";

const tools: ToolDef[] = [
  {
    name: "Read",
    description: "Read a file",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path" },
      },
      required: ["file_path"],
    },
  },
  {
    name: "Bash",
    description: "Run a command",
    input_schema: {
      type: "object",
      properties: {
        command: { type: "string", description: "Command" },
      },
      required: ["command"],
    },
  },
];

describe("Tengu agent loop", () => {
  test("hydrate removes leaked protocol text from assistant history", () => {
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([{ type: "message_delta", stop_reason: "end_turn" }, { type: "message_stop" }]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    session.hydrate([
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "ok<| end_of_sentence |> hidden" },
          { type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "src/api/client.ts" } },
        ],
      },
    ]);

    const assistant = session.history[1];

    expect(Array.isArray(assistant?.content)).toBe(true);
    expect(Array.isArray(assistant?.content) ? assistant.content[0] : undefined).toEqual({ type: "text", text: "ok" });
    expect(Array.isArray(assistant?.content) ? assistant.content[1] : undefined).toMatchObject({ type: "tool_use", id: "toolu_read" });
  });

  test("round-trips assistant tool_use into user tool_result before the next API request", async () => {
    const requests: ApiMessage[][] = [];
    const streams: ApiStreamEvent[][] = [
      [
        { type: "text_delta", index: 0, text: "I will inspect it." },
        {
          type: "tool_use",
          index: 1,
          tool: { type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "a.ts" } },
        },
        { type: "message_delta", stop_reason: "tool_use" },
        { type: "message_stop" },
      ],
      [
        { type: "text_delta", index: 0, text: "The file says hello." },
        { type: "message_delta", stop_reason: "end_turn" },
        { type: "message_stop" },
      ],
    ];

    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(streams.shift() || []);
      },
      executeTool: async () => ({ content: "hello" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const result = await session.runUserTurn("read a.ts");

    expect(result.text).toBe("The file says hello.");
    expect(requests.length).toBe(2);
    expect(requests[1][1]).toEqual({
      role: "assistant",
      content: [
        { type: "text", text: "I will inspect it." },
        { type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "a.ts" } },
      ],
    });
    expect(requests[1][2]).toEqual({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_read", content: "hello" }],
    });
  });

  test("tool execution can emit notification events into the TUI loop", async () => {
    const notifications: string[] = [];
    const session = new TenguSession({
      tools,
      stream: history => fromEvents(
        history.length === 1
          ? [
              {
                type: "tool_use",
                index: 0,
                tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "npm test" } },
              },
              { type: "message_delta", stop_reason: "tool_use" },
              { type: "message_stop" },
            ]
          : [
              { type: "text_delta", index: 0, text: "done" },
              { type: "message_delta", stop_reason: "end_turn" },
              { type: "message_stop" },
            ],
      ),
      executeTool: async (_name, _input, _signal, context) => {
        await context?.emitNotification?.("Background bash completed: local_bash_1");
        return { content: "ok" };
      },
      checkPermission: async () => ({ behavior: "allow" }),
      onEvent: event => {
        if (event.type === "notification") notifications.push(event.text);
      },
    });

    await session.runUserTurn("run tests");

    expect(notifications).toEqual(["Background bash completed: local_bash_1"]);
  });

  test("preserves multiple tool_result blocks in tool_use order", async () => {
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_a", name: "Read", input: { file_path: "a.ts" } },
                },
                {
                  type: "tool_use",
                  index: 1,
                  tool: { type: "tool_use", id: "toolu_b", name: "Bash", input: { command: "pwd" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async name => ({ content: name }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    await session.runUserTurn("use two tools");

    expect(requests[1][2]).toEqual({
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "toolu_a", content: "Read" },
        { type: "tool_result", tool_use_id: "toolu_b", content: "Bash" },
      ],
    });
  });

  test("runs consecutive read-only tool batches concurrently while preserving result order", async () => {
    let active = 0;
    let maxActive = 0;
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_a", name: "Read", input: { file_path: "a.ts" } },
                },
                {
                  type: "tool_use",
                  index: 1,
                  tool: { type: "tool_use", id: "toolu_b", name: "Read", input: { file_path: "b.ts" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async (_name, input) => {
        active++;
        maxActive = Math.max(maxActive, active);
        await new Promise(resolve => setTimeout(resolve, 30));
        active--;
        return { content: String(input.file_path) };
      },
      checkPermission: async () => ({ behavior: "allow" }),
    });

    await session.runUserTurn("read two files");

    expect(maxActive).toBe(2);
    expect(requests[1][2]).toEqual({
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "toolu_a", content: "a.ts" },
        { type: "tool_result", tool_use_id: "toolu_b", content: "b.ts" },
      ],
    });
  });

  test("emits official spinner mode transitions from stream and tool execution", async () => {
    const modes: SpinnerMode[] = [];
    const streamedInputs: string[] = [];
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        { type: "request_start" },
        { type: "content_block_start", index: 0, blockType: "thinking" },
        { type: "thinking_delta", index: 0, thinking: "hmm" },
        { type: "content_block_start", index: 1, blockType: "tool_use", tool: { id: "toolu_read", name: "Read" } },
        { type: "tool_input_delta", index: 1, partialJson: "{\"file_path\":\"a.ts\"}" },
        {
          type: "tool_use",
          index: 1,
          tool: { type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "a.ts" } },
        },
        { type: "message_delta", stop_reason: "tool_use" },
        { type: "message_stop" },
      ]),
      executeTool: async () => ({ content: "ok" }),
      checkPermission: async () => ({ behavior: "allow" }),
      onEvent: event => {
        if (event.type === "stream_mode") modes.push(event.mode);
        if (event.type === "tool_input_delta") streamedInputs.push(event.fullInputJson);
      },
      maxTurns: 1,
    });

    await expect(session.runUserTurn("inspect")).rejects.toThrow("Agent loop exceeded");

    expect(modes).toContain("requesting");
    expect(modes).toContain("thinking");
    expect(modes).toContain("tool-input");
    expect(modes).toContain("tool-use");
    expect(streamedInputs).toEqual(["{\"file_path\":\"a.ts\"}"]);
  });

  test("forwards real tool progress events from execution context", async () => {
    const progressEvents: string[] = [];
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        {
          type: "tool_use",
          index: 0,
          tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "printf one; sleep 2" } },
        },
        { type: "message_delta", stop_reason: "tool_use" },
        { type: "message_stop" },
      ]),
      executeTool: async (_name, _input, _signal, context) => {
        await context?.emitProgress?.({
          type: "bash_progress",
          output: "one",
          fullOutput: "one",
          elapsedTimeSeconds: 2,
          totalLines: 1,
          totalBytes: 3,
        });
        return { content: "one" };
      },
      checkPermission: async () => ({ behavior: "allow" }),
      onEvent: event => {
        if (event.type === "tool_progress") {
          progressEvents.push(`${event.tool.id}:${event.progress.type}:${event.progress.output}`);
        }
      },
      maxTurns: 1,
    });

    await expect(session.runUserTurn("run bash")).rejects.toThrow("Agent loop exceeded");

    expect(progressEvents).toEqual(["toolu_bash:bash_progress:one"]);
  });

  test("denied permission becomes an is_error tool_result and does not execute the tool", async () => {
    let executed = false;
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "rm x" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "denied" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => {
        executed = true;
        return { content: "should not run" };
      },
      checkPermission: async () => ({ behavior: "ask" }),
      requestPermission: async () => ({ behavior: "deny", message: "No" }),
    });

    await session.runUserTurn("delete");

    expect(executed).toBe(false);
    expect(requests[1][2]).toEqual({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_bash", content: "No", is_error: true }],
    });
  });

  test("rejects duplicate tool_use ids", async () => {
    const session = new TenguSession({
      tools,
      stream: () =>
        fromEvents([
          {
            type: "tool_use",
            index: 0,
            tool: { type: "tool_use", id: "toolu_dup", name: "Read", input: { file_path: "a" } },
          },
          {
            type: "tool_use",
            index: 1,
            tool: { type: "tool_use", id: "toolu_dup", name: "Read", input: { file_path: "b" } },
          },
          { type: "message_delta", stop_reason: "tool_use" },
          { type: "message_stop" },
        ]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    await expect(session.runUserTurn("duplicate")).rejects.toThrow("Duplicate tool_use id");
  });

  test("detects orphaned tool_result blocks", () => {
    expect(() =>
      assertResolvedToolResults([
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "missing", content: "x" }],
        },
      ]),
    ).toThrow("tool_result without matching tool_use");
  });

  test("cancel aborts the active API stream", async () => {
    let streamSignal: AbortSignal | undefined;
    let streamStarted!: () => void;
    const started = new Promise<void>(resolve => {
      streamStarted = resolve;
    });

    const session = new TenguSession({
      tools,
      stream: (_history, _tools, signal) => {
        streamSignal = signal;
        return waitForAbort(signal!, streamStarted);
      },
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const run = session.runUserTurn("cancel me");
    await started;
    session.cancel();

    await expect(run).rejects.toThrow("Interrupted");
    expect(streamSignal?.aborted).toBe(true);
  });

  test("PreToolUse hook blocks execution with an is_error tool_result", async () => {
    let executed = false;
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "npm test" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "blocked" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => {
        executed = true;
        return { content: "should not run" };
      },
      checkPermission: async () => ({ behavior: "allow" }),
      runHooks: async event => ({
        blocked: event === "PreToolUse",
        message: "hook blocked",
        notifications: [],
      }),
    });

    await session.runUserTurn("run");

    expect(executed).toBe(false);
    expect(requests[1][2]).toEqual({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_bash", content: "hook blocked", is_error: true }],
    });
  });

  test("PreToolUse hook updatedInput is used for permission and execution", async () => {
    let executedInput: Record<string, unknown> | undefined;
    let permissionInput: Record<string, unknown> | undefined;
    const session = new TenguSession({
      tools,
      stream: history =>
        fromEvents(
          history.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "echo old" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        ),
      executeTool: async (_name, input) => {
        executedInput = input;
        return { content: "ok" };
      },
      checkPermission: async tool => {
        permissionInput = tool.input;
        return { behavior: "allow" };
      },
      runHooks: async event => {
        if (event === "PreToolUse") {
          return {
            blocked: false,
            permissionBehavior: "allow",
            updatedInput: { command: "echo new" },
            additionalContext: [],
            notifications: [],
          };
        }
        return { blocked: false, additionalContext: [], notifications: [] };
      },
    });

    await session.runUserTurn("run");

    expect(permissionInput).toEqual({ command: "echo new" });
    expect(executedInput).toEqual({ command: "echo new" });
  });

  test("PermissionRequest hook can deny before interactive prompt", async () => {
    let prompted = false;
    let executed = false;
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_bash", name: "Bash", input: { command: "npm test" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "denied" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => {
        executed = true;
        return { content: "should not run" };
      },
      checkPermission: async () => ({ behavior: "ask" }),
      requestPermission: async () => {
        prompted = true;
        return { behavior: "allow" };
      },
      runHooks: async event => {
        if (event === "PermissionRequest") {
          return {
            blocked: false,
            permissionDecision: { behavior: "deny", message: "denied by hook" },
            additionalContext: [],
            notifications: [],
          };
        }
        return { blocked: false, additionalContext: [], notifications: [] };
      },
    });

    await session.runUserTurn("run");

    expect(prompted).toBe(false);
    expect(executed).toBe(false);
    expect(requests[1][2]).toEqual({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_bash", content: "denied by hook", is_error: true }],
    });
  });

  test("Stop hook can force one more API turn", async () => {
    const requests: ApiMessage[][] = [];
    let stopHookCalls = 0;
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                { type: "text_delta", index: 0, text: "first" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "second" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
      runHooks: async event => {
        if (event !== "Stop") return { blocked: false, notifications: [] };
        stopHookCalls++;
        return stopHookCalls === 1
          ? { blocked: true, message: "continue from stop hook", notifications: [] }
          : { blocked: false, notifications: [] };
      },
    });

    const result = await session.runUserTurn("start");

    expect(result.text).toBe("second");
    expect(requests[1][2]).toEqual({ role: "user", content: "continue from stop hook" });
  });

  test("hook notifications trigger Notification hooks and UI events", async () => {
    const notifications: string[] = [];
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "a.ts" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => ({ content: "file" }),
      checkPermission: async () => ({ behavior: "allow" }),
      runHooks: async (event, input) => {
        if (event === "PostToolUse") return { blocked: false, notifications: ["tool completed"] };
        if (event === "Notification") {
          return { blocked: false, notifications: [`notification hook saw: ${input.message}`] };
        }
        return { blocked: false, notifications: [] };
      },
      onEvent: event => {
        if (event.type === "notification") notifications.push(event.text);
      },
    });

    await session.runUserTurn("read");

    expect(notifications).toEqual(["notification hook saw: tool completed", "tool completed"]);
  });

  test("large tool results are persisted and bounded before the next API request", async () => {
    const requests: ApiMessage[][] = [];
    const session = new TenguSession({
      tools,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_big", name: "Read", input: { file_path: "big.ts" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => ({ content: "0123456789".repeat(3_000) }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    await session.runUserTurn("read big file");

    const nextContent = requests[1][2].content;
    expect(Array.isArray(nextContent)).toBe(true);
    const result = Array.isArray(nextContent) ? nextContent[0] : undefined;
    expect(result?.type).toBe("tool_result");
    expect(result?.content).toContain("Full output saved to:");
    expect(result?.content).toContain("5000-token tool-result budget");
    expect(result?.content.length).toBeLessThan(21_000);
  });

  test("compacts accumulated tool_result history before API requests", async () => {
    const requests: ApiMessage[][] = [];
    const largeResult = "large output\n".repeat(600);
    const session = new TenguSession({
      tools,
      apiHistoryTokenBudget: 1_200,
      stream: history => {
        requests.push(history);
        return fromEvents(
          requests.length === 1
            ? [
                {
                  type: "tool_use",
                  index: 0,
                  tool: { type: "tool_use", id: "toolu_a", name: "Read", input: { file_path: "a.ts" } },
                },
                {
                  type: "tool_use",
                  index: 1,
                  tool: { type: "tool_use", id: "toolu_b", name: "Read", input: { file_path: "b.ts" } },
                },
                { type: "message_delta", stop_reason: "tool_use" },
                { type: "message_stop" },
              ]
            : [
                { type: "text_delta", index: 0, text: "done" },
                { type: "message_delta", stop_reason: "end_turn" },
                { type: "message_stop" },
              ],
        );
      },
      executeTool: async () => ({ content: largeResult }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    await session.runUserTurn("read too much");

    const secondRequest = requests[1];
    const toolResultMessage = secondRequest?.find(message => (
      message.role === "user"
      && Array.isArray(message.content)
      && message.content.some(block => block.type === "tool_result")
    ));
    expect(toolResultMessage).toBeDefined();
    const toolResults = Array.isArray(toolResultMessage?.content)
      ? toolResultMessage.content.filter((block): block is { type: "tool_result"; tool_use_id: string; content: string } => block.type === "tool_result")
      : [];

    expect(toolResults.length).toBe(2);
    expect(toolResults.every(result => result.content.length < largeResult.length)).toBe(true);
    expect(toolResults[0]?.content).toContain("was moved out of this API request");
    expect(toolResults[0]?.content).toContain("Saved content:");
    assertResolvedToolResults(secondRequest || []);
  });

  test("prepareApiMessagesForRequest preserves small histories", () => {
    const messages: ApiMessage[] = [
      { role: "user", content: "hello" },
      { role: "assistant", content: [{ type: "text", text: "hi" }] },
    ];

    expect(prepareApiMessagesForRequest(messages, 1_000)).toEqual(messages);
  });

  test("assistant text drops leaked internal tool-result protocol", async () => {
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        { type: "text_delta", index: 0, text: "ok<|" },
        { type: "text_delta", index: 0, text: "end_of_sentence|>| Tool | End of output - 5000 token limit reached." },
        { type: "text_delta", index: 0, text: " leaked content" },
        { type: "message_delta", stop_reason: "end_turn" },
        { type: "message_stop" },
      ]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const result = await session.runUserTurn("hello");

    expect(result.text).toBe("ok");
  });

  test("assistant text drops spaced internal protocol markers", async () => {
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        { type: "text_delta", index: 0, text: "ok<| " },
        { type: "text_delta", index: 0, text: "end_of_sentence |> 1\timport { TuiRuntime } from './agent/tengu/tui';" },
        { type: "text_delta", index: 0, text: "\n2\timport { Tengu } from './agent/tengu';" },
        { type: "message_delta", stop_reason: "end_turn" },
        { type: "message_stop" },
      ]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const result = await session.runUserTurn("hello");

    expect(result.text).toBe("ok");
  });

  test("assistant text keeps non-protocol angle-pipe text", async () => {
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        { type: "text_delta", index: 0, text: "keep <| not a protocol marker" },
        { type: "message_delta", stop_reason: "end_turn" },
        { type: "message_stop" },
      ]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const result = await session.runUserTurn("hello");

    expect(result.text).toBe("keep <| not a protocol marker");
  });

  test("assistant protocol leak suppression is scoped to one text block", async () => {
    const session = new TenguSession({
      tools,
      stream: () => fromEvents([
        { type: "text_delta", index: 0, text: "first<|" },
        { type: "text_delta", index: 0, text: "end_of_toolresults|> hidden" },
        { type: "text_delta", index: 1, text: " second" },
        { type: "message_delta", stop_reason: "end_turn" },
        { type: "message_stop" },
      ]),
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
    });

    const result = await session.runUserTurn("hello");

    expect(result.text).toBe("first second");
  });

  test("StopFailure hook runs when API turn fails", async () => {
    const events: string[] = [];
    const session = new TenguSession({
      tools,
      stream: () => {
        throw new Error("api failed");
      },
      executeTool: async () => ({ content: "" }),
      checkPermission: async () => ({ behavior: "allow" }),
      runHooks: async (event, input) => {
        if (event === "StopFailure") events.push(`${event}:${input.error}`);
        return { blocked: false, additionalContext: [], notifications: [] };
      },
    });

    await expect(session.runUserTurn("fail")).rejects.toThrow("api failed");
    expect(events).toEqual(["StopFailure:api failed"]);
  });
});

async function* fromEvents(events: ApiStreamEvent[]): AsyncGenerator<ApiStreamEvent> {
  for (const event of events) {
    yield event;
  }
}

async function* waitForAbort(signal: AbortSignal, onStart: () => void): AsyncGenerator<ApiStreamEvent> {
  onStart();
  await new Promise<void>(resolve => {
    if (signal.aborted) {
      resolve();
      return;
    }
    signal.addEventListener("abort", () => resolve(), { once: true });
  });
  throw signal.reason;
}
