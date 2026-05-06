import { describe, expect, test } from "bun:test";
import { parseAnsiSegments, stripAnsiSequences } from "./ansi.js";
import { renderMarkdownToAnsi } from "./markdown.js";

describe("terminal markdown renderer", () => {
  test("renders headings, emphasis, and unordered lists like terminal markdown", () => {
    const rendered = renderMarkdownToAnsi("# Title\n\n- **one**\n- `two`");
    const plain = stripAnsiSequences(rendered);

    expect(plain).toContain("Title");
    expect(plain).toContain("- one");
    expect(plain).toContain("- two");
    expect(plain).not.toContain("•");
  });

  test("renders nested ordered lists with official numbering levels", () => {
    const plain = stripAnsiSequences(renderMarkdownToAnsi("1. one\n   1. two\n      1. three"));

    expect(plain).toContain("1. one");
    expect(plain).toContain("  a. two");
    expect(plain).toContain("    i. three");
  });

  test("renders blockquotes with the official bar and italic text", () => {
    const rendered = renderMarkdownToAnsi("> quoted");
    const plain = stripAnsiSequences(rendered);
    const segments = parseAnsiSegments(rendered);

    expect(plain).toBe("▎ quoted");
    expect(segments.some(segment => segment.text.includes("quoted") && segment.italic)).toBe(true);
  });

  test("removes code fences and colors diff code blocks", () => {
    const rendered = renderMarkdownToAnsi("```diff\n-old\n+new\n@@ hunk\n```");
    const plain = stripAnsiSequences(rendered);
    const segments = parseAnsiSegments(rendered);

    expect(plain).toBe("-old\n+new\n@@ hunk");
    expect(plain).not.toContain("```");
    expect(segments.some(segment => segment.text === "-old" && segment.color === "ansi:red")).toBe(true);
    expect(segments.some(segment => segment.text === "+new" && segment.color === "ansi:green")).toBe(true);
    expect(segments.some(segment => segment.text === "@@ hunk" && segment.color === "ansi:cyan")).toBe(true);
  });

  test("renders markdown tables with stable column widths", () => {
    const plain = stripAnsiSequences(renderMarkdownToAnsi("| A | B |\n|---|---:|\n| x | 12 |"));

    expect(plain).toBe("| A   |   B |\n|-----|-----|\n| x   |  12 |");
  });
});
