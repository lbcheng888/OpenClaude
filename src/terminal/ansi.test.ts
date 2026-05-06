import { describe, expect, test } from "bun:test";
import {
  createAnsiTextLines,
  parseAnsiSegments,
  stripAnsiSequences,
  wrapAnsiSegments,
} from "./ansi.js";

describe("ANSI terminal output parsing", () => {
  test("preserves standard SGR foreground, background, and text attributes", () => {
    const segments = parseAnsiSegments("a \u001b[1;31;44mred\u001b[22;39m still-bg\u001b[0m z");

    expect(segments).toEqual([
      { text: "a " },
      { text: "red", bold: true, color: "ansi:red", backgroundColor: "ansi:blue" },
      { text: " still-bg", backgroundColor: "ansi:blue" },
      { text: " z" },
    ]);
  });

  test("preserves bright, ansi256, rgb, underline, dim, and inverse styles", () => {
    const segments = parseAnsiSegments(
      "\u001b[92mgreen\u001b[0m \u001b[38;5;196mhot\u001b[0m \u001b[48;2;1;2;3;4;7mstyled\u001b[0m",
    );

    expect(segments).toEqual([
      { text: "green", color: "ansi:greenBright" },
      { text: " " },
      { text: "hot", color: "ansi256(196)" },
      { text: " " },
      {
        text: "styled",
        backgroundColor: "rgb(1,2,3)",
        underline: true,
        inverse: true,
      },
    ]);
  });

  test("strips all CSI sequences from plain text calculations", () => {
    expect(stripAnsiSequences("a\u001b[31mb\u001b[0m\u001b[2Kc")).toBe("abc");
  });

  test("strips OSC and single ESC sequences without leaking control text", () => {
    expect(stripAnsiSequences("a\u001b]0;title\u0007b\u001b7c\u001b8")).toBe("abc");
  });

  test("preserves OSC 8 hyperlinks as segment metadata", () => {
    const segments = parseAnsiSegments("open \u001b]8;;https://example.com\u0007site\u001b]8;;\u0007 done");

    expect(segments).toEqual([
      { text: "open " },
      { text: "site", href: "https://example.com" },
      { text: " done" },
    ]);
  });

  test("parses colon-separated RGB SGR parameters", () => {
    const segments = parseAnsiSegments("\u001b[38:2::1:2:3mfg\u001b[48:2:0:4:5:6mbg\u001b[0m");

    expect(segments).toEqual([
      { text: "fg", color: "rgb(1,2,3)" },
      { text: "bg", color: "rgb(1,2,3)", backgroundColor: "rgb(4,5,6)" },
    ]);
  });

  test("wraps styled output without dropping styles", () => {
    const lines = wrapAnsiSegments(parseAnsiSegments("\u001b[31mabcdef\u001b[0m"), 3);

    expect(lines).toEqual([
      [{ text: "abc", color: "ansi:red" }],
      [{ text: "def", color: "ansi:red" }],
    ]);
  });

  test("collapses long styled output with an expand hint", () => {
    const { lines, remainingLines } = createAnsiTextLines("one\ntwo\nthree\nfour\nfive", 80, false);

    expect(remainingLines).toBe(2);
    expect(lines.map(line => line.map(segment => segment.text).join(""))).toEqual([
      "one",
      "two",
      "three",
      "... +2 lines (ctrl+o to expand)",
    ]);
  });
});
