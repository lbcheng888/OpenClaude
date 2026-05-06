import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { clearClaudeSettingsCache } from "../config/claude-settings.js";
import {
  getApiConfig,
  getConfiguredModel,
  getConfiguredProvider,
  getConfiguredSubagentModel,
  sendMessage,
  streamMessage,
  toDeepSeekV4ChatMessages,
  toGpt55ResponsesInput,
} from "./client.js";

const originalFetch = globalThis.fetch;
const originalEnv = {
  ANTHROPIC_AUTH_TOKEN: process.env.ANTHROPIC_AUTH_TOKEN,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  ANTHROPIC_BASE_URL: process.env.ANTHROPIC_BASE_URL,
  ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
  CLAUDE_CODE_API_PROVIDER: process.env.CLAUDE_CODE_API_PROVIDER,
  CLAUDE_CODE_SUBAGENT_MODEL: process.env.CLAUDE_CODE_SUBAGENT_MODEL,
  CLAUDE_CODE_MAX_RETRIES: process.env.CLAUDE_CODE_MAX_RETRIES,
  CLAUDE_CONFIG_DIR: process.env.CLAUDE_CONFIG_DIR,
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  DEEPSEEK_BASE_URL: process.env.DEEPSEEK_BASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
};
let tempDir: string | null = null;

afterEach(() => {
  globalThis.fetch = originalFetch;
  clearClaudeSettingsCache();
  restoreEnv("ANTHROPIC_AUTH_TOKEN", originalEnv.ANTHROPIC_AUTH_TOKEN);
  restoreEnv("ANTHROPIC_API_KEY", originalEnv.ANTHROPIC_API_KEY);
  restoreEnv("ANTHROPIC_BASE_URL", originalEnv.ANTHROPIC_BASE_URL);
  restoreEnv("ANTHROPIC_MODEL", originalEnv.ANTHROPIC_MODEL);
  restoreEnv("CLAUDE_CODE_API_PROVIDER", originalEnv.CLAUDE_CODE_API_PROVIDER);
  restoreEnv("CLAUDE_CODE_SUBAGENT_MODEL", originalEnv.CLAUDE_CODE_SUBAGENT_MODEL);
  restoreEnv("CLAUDE_CODE_MAX_RETRIES", originalEnv.CLAUDE_CODE_MAX_RETRIES);
  restoreEnv("CLAUDE_CONFIG_DIR", originalEnv.CLAUDE_CONFIG_DIR);
  restoreEnv("DEEPSEEK_API_KEY", originalEnv.DEEPSEEK_API_KEY);
  restoreEnv("DEEPSEEK_BASE_URL", originalEnv.DEEPSEEK_BASE_URL);
  restoreEnv("OPENAI_API_KEY", originalEnv.OPENAI_API_KEY);
  restoreEnv("OPENAI_BASE_URL", originalEnv.OPENAI_BASE_URL);
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("API client", () => {
  test("streamMessage sends the selected session model instead of only the env default", async () => {
    const bodies: Array<Record<string, unknown>> = [];
    installApiEnv();
    globalThis.fetch = (async (_input, init) => {
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("event: message_stop\ndata: {}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    for await (const _event of streamMessage([{ role: "user", content: "hello" }], undefined, undefined, undefined, undefined, "claude-opus-4-6")) {
      // Exhaust stream so the request is issued.
    }

    expect(bodies[0]?.model).toBe("claude-opus-4-6");
    expect(bodies[0]?.model).not.toBe("env-model");
  });

  test("streamMessage preserves user image blocks for Anthropic-compatible vision backends", async () => {
    const bodies: Array<Record<string, any>> = [];
    installApiEnv();
    globalThis.fetch = (async (_input, init) => {
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    for await (const _event of streamMessage([
      {
        role: "user",
        content: [
          { type: "text", text: "describe this" },
          { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" }, id: 1 },
        ],
      },
    ])) {
      // Exhaust stream so the request is issued.
    }

    expect(bodies[0].messages[0].content).toEqual([
      { type: "text", text: "describe this" },
      { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" }, id: 1 },
    ]);
  });

  test("serializes images for DeepSeekV4 OpenAI-compatible chat payloads", () => {
    expect(toDeepSeekV4ChatMessages([
      {
        role: "user",
        content: [
          { type: "text", text: "what is this?" },
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: "abc123" } },
        ],
      },
    ])).toEqual([
      {
        role: "user",
        content: [
          { type: "text", text: "what is this?" },
          { type: "image_url", image_url: { url: "data:image/jpeg;base64,abc123" } },
        ],
      },
    ]);
  });

  test("serializes images for GPT-5.5 Responses payloads", () => {
    expect(toGpt55ResponsesInput([
      {
        role: "user",
        content: [
          { type: "text", text: "what is this?" },
          { type: "image", source: { type: "base64", media_type: "image/png", data: "xyz789" } },
        ],
      },
    ])).toEqual([
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "what is this?" },
          { type: "input_image", image_url: "data:image/png;base64,xyz789", detail: "auto" },
        ],
      },
    ]);
  });

  test("configured provider follows explicit env before model inference", () => {
    installApiEnv();
    expect(getConfiguredProvider("deepseek-v4-pro")).toBe("deepseek-v4");
    expect(getConfiguredProvider("gpt-5.5")).toBe("gpt-5.5");
    process.env.CLAUDE_CODE_API_PROVIDER = "anthropic";
    expect(getConfiguredProvider("gpt-5.5")).toBe("anthropic");
  });

  test("streamMessage routes DeepSeekV4 images through OpenAI-compatible chat completions", async () => {
    const urls: string[] = [];
    const bodies: Array<Record<string, any>> = [];
    installApiEnv();
    process.env.ANTHROPIC_MODEL = "deepseek-v4-pro";
    process.env.DEEPSEEK_API_KEY = "deepseek-token";
    process.env.DEEPSEEK_BASE_URL = "https://deepseek.example";
    globalThis.fetch = (async (input, init) => {
      urls.push(String(input));
      bodies.push(JSON.parse(String(init?.body)));
      expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer deepseek-token");
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode([
              "data: {\"choices\":[{\"delta\":{\"content\":\"ok\"},\"finish_reason\":null}]}",
              "data: {\"choices\":[{\"delta\":{},\"finish_reason\":\"stop\"}],\"usage\":{\"prompt_tokens\":2,\"completion_tokens\":1}}",
              "data: [DONE]",
              "",
            ].join("\n\n")));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([
      {
        role: "user",
        content: [
          { type: "text", text: "describe" },
          { type: "image", source: { type: "base64", media_type: "image/png", data: "abc" } },
        ],
      },
    ])) {
      events.push(event);
    }

    expect(urls[0]).toBe("https://deepseek.example/v1/chat/completions");
    expect(bodies[0].messages[0].content).toEqual([
      { type: "text", text: "describe" },
      { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
    ]);
    expect(events).toContainEqual({ type: "text_delta", index: 0, text: "ok" });
    expect(events).toContainEqual({
      type: "message_delta",
      stop_reason: "end_turn",
      usage: { input_tokens: 2, output_tokens: 1 },
    });
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("streamMessage adapts DeepSeekV4 tool call deltas into Anthropic tool_use events", async () => {
    installApiEnv();
    process.env.ANTHROPIC_MODEL = "deepseek-v4-pro";
    process.env.DEEPSEEK_API_KEY = "deepseek-token";
    const tool = {
      name: "Read",
      description: "Read a file",
      input_schema: {
        type: "object" as const,
        properties: { file_path: { type: "string" } },
        required: ["file_path"],
      },
    };
    globalThis.fetch = (async () => new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode([
            "data: {\"choices\":[{\"delta\":{\"tool_calls\":[{\"index\":0,\"id\":\"call_1\",\"function\":{\"name\":\"Read\",\"arguments\":\"{\\\"file_path\\\"\"}}]},\"finish_reason\":null}]}",
            "data: {\"choices\":[{\"delta\":{\"tool_calls\":[{\"index\":0,\"function\":{\"arguments\":\":\\\"package.json\\\"}\"}}]},\"finish_reason\":\"tool_calls\"}]}",
            "data: [DONE]",
            "",
          ].join("\n\n")));
          controller.close();
        },
      }),
      { status: 200 },
    )) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "read package" }], undefined, [tool])) {
      events.push(event);
    }

    expect(events).toContainEqual({
      type: "content_block_start",
      index: 1,
      blockType: "tool_use",
      tool: { id: "call_1", name: "Read" },
    });
    expect(events).toContainEqual({
      type: "tool_use",
      index: 1,
      tool: { type: "tool_use", id: "call_1", name: "Read", input: { file_path: "package.json" } },
    });
  });

  test("streamMessage retries DeepSeekV4 stream error events and can be interrupted during retry", async () => {
    installApiEnv();
    process.env.ANTHROPIC_MODEL = "deepseek-v4-pro";
    process.env.DEEPSEEK_API_KEY = "deepseek-token";
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"error\":{\"type\":\"overloaded_error\",\"message\":\"overloaded\"}}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const controller = new AbortController();
    const events = [];
    for await (const event of streamMessage(
      [{ role: "user", content: "hello" }],
      undefined,
      undefined,
      undefined,
      controller.signal,
    )) {
      events.push(event);
      if (event.type === "api_retry") controller.abort("Stopped by user");
    }

    expect(calls).toBe(1);
    expect(events).toContainEqual({
      type: "api_retry",
      error: "API Error: overloaded",
      retryAttempt: 1,
      maxRetries: 1,
      retryInMs: expect.any(Number),
    });
    expect(events.at(-1)).toEqual({ type: "error", error: "Stopped by user" });
  });

  test("streamMessage routes GPT-5.5 images through Responses input", async () => {
    const urls: string[] = [];
    const bodies: Array<Record<string, any>> = [];
    installApiEnv();
    process.env.ANTHROPIC_MODEL = "gpt-5.5";
    process.env.OPENAI_API_KEY = "openai-token";
    process.env.OPENAI_BASE_URL = "https://api.openai.test/v1";
    globalThis.fetch = (async (input, init) => {
      urls.push(String(input));
      bodies.push(JSON.parse(String(init?.body)));
      expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer openai-token");
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode([
              "data: {\"type\":\"response.output_text.delta\",\"delta\":\"seen\"}",
              "data: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":3,\"output_tokens\":1}}}",
              "",
            ].join("\n\n")));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([
      {
        role: "user",
        content: [
          { type: "text", text: "describe" },
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: "xyz" } },
        ],
      },
    ])) {
      events.push(event);
    }

    expect(urls[0]).toBe("https://api.openai.test/v1/responses");
    expect(bodies[0].input[0].content).toEqual([
      { type: "input_text", text: "describe" },
      { type: "input_image", image_url: "data:image/jpeg;base64,xyz", detail: "auto" },
    ]);
    expect(events).toContainEqual({ type: "text_delta", index: 0, text: "seen" });
    expect(events).toContainEqual({
      type: "message_delta",
      stop_reason: "end_turn",
      usage: { input_tokens: 3, output_tokens: 1 },
    });
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("sendMessage sends the selected session model", async () => {
    const bodies: Array<Record<string, unknown>> = [];
    installApiEnv();
    globalThis.fetch = (async (_input, init) => {
      bodies.push(JSON.parse(String(init?.body)));
      return Response.json({
        content: [{ type: "text", text: "ok" }],
        usage: { input_tokens: 1, output_tokens: 1 },
        stop_reason: "end_turn",
      });
    }) as typeof fetch;

    await sendMessage([{ role: "user", content: "hello" }], undefined, undefined, undefined, "claude-haiku-4-5");

    expect(bodies[0]?.model).toBe("claude-haiku-4-5");
  });

  test("sendMessage retries retryable HTTP errors", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        return new Response(JSON.stringify({ error: { message: "overloaded", type: "overloaded_error" } }), {
          status: 529,
          headers: { "retry-after": "0" },
        });
      }
      return Response.json({
        content: [{ type: "text", text: "ok" }],
        usage: { input_tokens: 1, output_tokens: 1 },
        stop_reason: "end_turn",
      });
    }) as typeof fetch;

    const result = await sendMessage([{ role: "user", content: "hello" }]);

    expect(calls).toBe(2);
    expect(result.content).toEqual([{ type: "text", text: "ok" }]);
  });

  test("sendMessage retries transport failures before returning an API error", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        const cause = Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:5001"), { code: "ECONNREFUSED" });
        const error = new TypeError("fetch failed") as TypeError & { cause?: unknown };
        error.cause = cause;
        throw error;
      }
      return Response.json({
        content: [{ type: "text", text: "ok" }],
        usage: { input_tokens: 1, output_tokens: 1 },
        stop_reason: "end_turn",
      });
    }) as typeof fetch;

    const result = await sendMessage([{ role: "user", content: "hello" }]);

    expect(calls).toBe(2);
    expect(result.content).toEqual([{ type: "text", text: "ok" }]);
  });

  test("streamMessage preserves external abort reasons", async () => {
    installApiEnv();
    const controller = new AbortController();
    controller.abort(new Error("Stopped background agent"));
    globalThis.fetch = (async (_input, init) => {
      throw (init?.signal as AbortSignal).reason;
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }], undefined, undefined, undefined, controller.signal)) {
      events.push(event);
    }

    expect(events.at(-1)).toEqual({ type: "error", error: "Stopped background agent" });
  });

  test("streamMessage wraps unexpected stream termination as an API error", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "0";
    globalThis.fetch = (async () => {
      throw new TypeError("terminated");
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(events.at(-1)).toEqual({ type: "error", error: "API Error: Stream terminated unexpectedly." });
  });

  test("streamMessage rejects Anthropic-compatible streams that close before message_stop", async () => {
    installApiEnv();
    globalThis.fetch = (async () => new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: {\"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"partial\"}}\n\n"));
          controller.close();
        },
      }),
      { status: 200 },
    )) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(events).toContainEqual({ type: "text_delta", index: 0, text: "partial" });
    expect(events.at(-1)).toEqual({ type: "error", error: "API Error: Stream ended before completion." });
  });

  test("streamMessage rejects OpenAI-compatible streams without a terminal finish reason", async () => {
    installApiEnv();
    process.env.ANTHROPIC_MODEL = "deepseek-v4-pro";
    process.env.DEEPSEEK_API_KEY = "deepseek-token";
    globalThis.fetch = (async () => new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: {\"choices\":[{\"delta\":{\"content\":\"partial\"},\"finish_reason\":null}]}\n\n"));
          controller.close();
        },
      }),
      { status: 200 },
    )) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(events).toContainEqual({ type: "text_delta", index: 0, text: "partial" });
    expect(events.at(-1)).toEqual({ type: "error", error: "API Error: Stream ended before completion." });
  });

  test("streamMessage formats fetch connection causes like the official API error", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "0";
    globalThis.fetch = (async () => {
      const cause = Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:5001"), { code: "ECONNREFUSED" });
      const error = new TypeError("fetch failed") as TypeError & { cause?: unknown };
      error.cause = cause;
      throw error;
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(events.at(-1)).toEqual({ type: "error", error: "API Error: Unable to connect to API (ECONNREFUSED)" });
  });

  test("streamMessage retries transport failures before surfacing an error", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        const cause = Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:5001"), { code: "ECONNREFUSED" });
        const error = new TypeError("fetch failed") as TypeError & { cause?: unknown };
        error.cause = cause;
        throw error;
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(calls).toBe(2);
    expect(events.some(event => event.type === "api_retry" && event.retryAttempt === 1 && event.maxRetries === 1)).toBe(true);
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("streamMessage retries retryable HTTP errors with Retry-After", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        return new Response(JSON.stringify({ error: { message: "overloaded", type: "overloaded_error" } }), {
          status: 529,
          headers: { "retry-after": "0" },
        });
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(calls).toBe(2);
    expect(events).toContainEqual({
      type: "api_retry",
      error: "API Error: overloaded",
      retryInMs: 0,
      retryAttempt: 1,
      maxRetries: 1,
    });
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("streamMessage honors retry-after-ms before retry-after", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        return new Response(JSON.stringify({ error: { message: "overloaded", type: "overloaded_error" } }), {
          status: 529,
          headers: { "retry-after-ms": "7", "retry-after": "30" },
        });
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(calls).toBe(2);
    expect(events).toContainEqual({
      type: "api_retry",
      error: "API Error: overloaded",
      retryInMs: 7,
      retryAttempt: 1,
      maxRetries: 1,
    });
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("streamMessage retries retryable stream error events before any content", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      if (calls === 1) {
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode("data: {\"type\":\"error\",\"error\":{\"type\":\"overloaded_error\",\"message\":\"overloaded\"}}\n\n"));
              controller.close();
            },
          }),
          { status: 200 },
        );
      }
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(calls).toBe(2);
    expect(events.some(event => event.type === "api_retry" && event.error === "API Error: overloaded")).toBe(true);
    expect(events.at(-1)).toEqual({ type: "message_stop" });
  });

  test("streamMessage does not retry stream error events after content starts", async () => {
    installApiEnv();
    process.env.CLAUDE_CODE_MAX_RETRIES = "1";
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode([
              "data: {\"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"partial\"}}",
              "data: {\"type\":\"error\",\"error\":{\"type\":\"overloaded_error\",\"message\":\"overloaded\"}}",
              "",
            ].join("\n\n")));
            controller.close();
          },
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const events = [];
    for await (const event of streamMessage([{ role: "user", content: "hello" }])) {
      events.push(event);
    }

    expect(calls).toBe(1);
    expect(events).toContainEqual({ type: "text_delta", index: 0, text: "partial" });
    expect(events.at(-1)).toEqual({ type: "error", error: "API Error: overloaded" });
  });

  test("streamMessage does not install a local request timeout", async () => {
    installApiEnv();
    const originalSetTimeout = globalThis.setTimeout;
    const scheduledTimeouts: unknown[] = [];
    globalThis.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      scheduledTimeouts.push(timeout);
      return originalSetTimeout(handler, timeout, ...args);
    }) as typeof setTimeout;

    try {
      globalThis.fetch = (async () => new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: {\"type\":\"message_stop\"}\n\n"));
            controller.close();
          },
        }),
        { status: 200 },
      )) as typeof fetch;

      for await (const _event of streamMessage([{ role: "user", content: "hello" }])) {
        // Exhaust stream so request setup runs.
      }
    } finally {
      globalThis.setTimeout = originalSetTimeout;
    }

    expect(scheduledTimeouts).toEqual([]);
  });

  test("configured model follows official priority: env before settings before default", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-api-model-"));
    const configDir = join(tempDir, ".claude");
    mkdirSync(configDir, { recursive: true });
    writeFileSync(join(configDir, "settings.json"), JSON.stringify({ model: "settings-model" }));
    process.env.CLAUDE_CONFIG_DIR = configDir;
    process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
    delete process.env.ANTHROPIC_MODEL;
    clearClaudeSettingsCache();

    expect(getConfiguredModel()).toBe("settings-model");
    expect(getApiConfig()?.model).toBe("settings-model");

    process.env.ANTHROPIC_MODEL = "env-model";
    expect(getConfiguredModel()).toBe("env-model");
    expect(getApiConfig()?.model).toBe("env-model");
  });

  test("configured subagent model follows official env override before parent inheritance", () => {
    delete process.env.CLAUDE_CODE_SUBAGENT_MODEL;
    expect(getConfiguredSubagentModel("parent-model")).toBe("parent-model");

    process.env.CLAUDE_CODE_SUBAGENT_MODEL = "deepseek-v4-flash";
    expect(getConfiguredSubagentModel("parent-model")).toBe("deepseek-v4-flash");
  });
});

function installApiEnv(): void {
  process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
  delete process.env.ANTHROPIC_API_KEY;
  process.env.ANTHROPIC_BASE_URL = "https://api.example.test";
  process.env.ANTHROPIC_MODEL = "env-model";
  delete process.env.CLAUDE_CODE_API_PROVIDER;
  delete process.env.CLAUDE_CODE_SUBAGENT_MODEL;
  delete process.env.CLAUDE_CODE_MAX_RETRIES;
  delete process.env.CLAUDE_CONFIG_DIR;
  delete process.env.DEEPSEEK_API_KEY;
  delete process.env.DEEPSEEK_BASE_URL;
  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_BASE_URL;
  clearClaudeSettingsCache();
}

function restoreEnv(key: keyof typeof originalEnv, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }
  process.env[key] = value;
}
