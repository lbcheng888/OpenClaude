import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  CHANGELOG_URL,
  formatReleaseNotes,
  getAllReleaseNotes,
  getRecentReleaseNotes,
  markReleaseNotesSeen,
  parseChangelog,
  readRecentReleaseNotes,
} from "./startup-screen.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
let tempDir: string | null = null;

afterEach(() => {
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("startup release notes", () => {
  test("parses changelog sections with date suffixes", () => {
    expect(parseChangelog(sampleChangelog())).toEqual({
      "2.1.128": ["A", "B"],
      "2.1.127": ["C"],
      "2.1.126": ["D"],
    });
  });

  test("shows notes newer than the last seen version, newest first", () => {
    expect(getRecentReleaseNotes("2.1.128", "2.1.126", sampleChangelog())).toEqual(["A", "B", "C"]);
  });

  test("shows no notes after the current version has already been seen", () => {
    expect(getRecentReleaseNotes("2.1.128", "2.1.128", sampleChangelog())).toEqual([]);
  });

  test("reads official cache and global lastReleaseNotesSeen paths", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(join(configDir, "cache"), { recursive: true });
    writeFileSync(join(configDir, "cache", "changelog.md"), sampleChangelog());
    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ lastReleaseNotesSeen: "2.1.127" }));

    expect(readRecentReleaseNotes("2.1.128")).toEqual(["A", "B"]);
  });

  test("formats all cached release notes newest first", () => {
    expect(getAllReleaseNotes(sampleChangelog())).toEqual([
      ["2.1.128", ["A", "B"]],
      ["2.1.127", ["C"]],
      ["2.1.126", ["D"]],
    ]);

    expect(formatReleaseNotes([["2.1.128", ["A", "B"]]])).toBe("Version 2.1.128:\n· A\n· B");
    expect(formatReleaseNotes([])).toContain(CHANGELOG_URL);
  });

  test("marks current release notes version as seen without dropping existing config", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    const globalConfigPath = join(configDir, ".claude.json");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(configDir, { recursive: true });
    writeFileSync(globalConfigPath, JSON.stringify({ theme: "dark" }));

    markReleaseNotesSeen("2.1.128");

    expect(JSON.parse(readFileSync(globalConfigPath, "utf8"))).toEqual({
      theme: "dark",
      lastReleaseNotesSeen: "2.1.128",
    });
  });
});

function sampleChangelog(): string {
  return [
    "# Changelog",
    "",
    "## 2.1.128 - 2026-05-05",
    "- A",
    "- B",
    "",
    "## 2.1.127",
    "- C",
    "",
    "## 2.1.126",
    "- D",
    "",
  ].join("\n");
}
