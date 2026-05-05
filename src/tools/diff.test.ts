import { describe, expect, test } from "bun:test";
import { createUnifiedDiff } from "./diff.js";

describe("unified diff", () => {
  test("uses shortest edit script for inserted lines", () => {
    const diff = createUnifiedDiff("a.txt", "alpha\nbeta\ngamma\n", "alpha\ninserted\nbeta\ngamma\n");

    expect(diff).toContain("@@ -1,3 +1,4 @@");
    expect(diff).toContain(" alpha");
    expect(diff).toContain("+inserted");
    expect(diff).toContain(" beta");
    expect(diff).not.toContain("-beta");
    expect(diff).not.toContain("+gamma");
  });

  test("creates separated hunks for distant changes", () => {
    const before = Array.from({ length: 20 }, (_, index) => `line ${index + 1}`).join("\n");
    const after = before
      .replace("line 2", "line two")
      .replace("line 18", "line eighteen");

    const diff = createUnifiedDiff("a.txt", before, after);

    expect(diff.match(/^@@ /gmu)?.length).toBe(2);
    expect(diff).toContain("-line 2");
    expect(diff).toContain("+line two");
    expect(diff).toContain("-line 18");
    expect(diff).toContain("+line eighteen");
  });

  test("truncates very large diffs deterministically", () => {
    const before = Array.from({ length: 300 }, (_, index) => `old ${index}`).join("\n");
    const after = Array.from({ length: 300 }, (_, index) => `new ${index}`).join("\n");

    const diff = createUnifiedDiff("a.txt", before, after, 3, 20);

    expect(diff.split("\n").at(-1)).toBe("… diff truncated");
  });
});
