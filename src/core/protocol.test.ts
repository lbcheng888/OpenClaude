import { describe, expect, test } from "bun:test";
import {
  sanitizeAssistantText,
  stripDanglingInternalProtocolPrefix,
  stripInternalProtocolLeak,
} from "./protocol.js";

describe("internal protocol visibility guard", () => {
  test("strips compact and spaced protocol markers", () => {
    expect(sanitizeAssistantText("ok<|end_of_sentence|> hidden")).toBe("ok");
    expect(sanitizeAssistantText("ok<| end_of_sentence |> hidden")).toBe("ok");
    expect(sanitizeAssistantText("ok<| end_of_toolresults |> hidden")).toBe("ok");
  });

  test("strips leaked tool-result prelude from restored assistant text", () => {
    const text = "<| end_of_sentence |>1\timport { TuiRuntime } from './agent/tengu/tui';";

    expect(sanitizeAssistantText(text)).toBe("");
  });

  test("keeps non-protocol angle-pipe text", () => {
    expect(sanitizeAssistantText("keep <| not a marker")).toBe("keep <| not a marker");
    expect(stripInternalProtocolLeak("keep <| not a marker").truncated).toBe(false);
  });

  test("holds dangling protocol prefixes until the marker is complete", () => {
    expect(stripDanglingInternalProtocolPrefix("ok<|")).toBe("ok");
    expect(stripDanglingInternalProtocolPrefix("ok<| end")).toBe("ok");
    expect(stripDanglingInternalProtocolPrefix("ok<| not")).toBe("ok<| not");
  });
});
