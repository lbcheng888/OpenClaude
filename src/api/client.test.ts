import { afterEach, describe, expect, test } from "bun:test";
import { sendMessage, streamMessage } from "./client.js";

const originalFetch = globalThis.fetch;
const originalEnv = {
  ANTHROPIC_AUTH_TOKEN: process.env.ANTHROPIC_AUTH_TOKEN,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  ANTHROPIC_BASE_URL: process.env.ANTHROPIC_BASE_URL,
  ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
};

afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreEnv("ANTHROPIC_AUTH_TOKEN", originalEnv.ANTHROPIC_AUTH_TOKEN);
  restoreEnv("ANTHROPIC_API_KEY", originalEnv.ANTHROPIC_API_KEY);
  restoreEnv("ANTHROPIC_BASE_URL", originalEnv.ANTHROPIC_BASE_URL);
  restoreEnv("ANTHROPIC_MODEL", originalEnv.ANTHROPIC_MODEL);
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
});

function installApiEnv(): void {
  process.env.ANTHROPIC_AUTH_TOKEN = "test-token";
  delete process.env.ANTHROPIC_API_KEY;
  process.env.ANTHROPIC_BASE_URL = "https://api.example.test";
  process.env.ANTHROPIC_MODEL = "env-model";
}

function restoreEnv(key: keyof typeof originalEnv, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }
  process.env[key] = value;
}
