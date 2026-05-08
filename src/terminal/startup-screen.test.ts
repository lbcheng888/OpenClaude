import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  CHANGELOG_URL,
  formatReleaseNotes,
  getAllReleaseNotes,
  getPromptPlaceholder,
  getRecentReleaseNotes,
  getNarrowStartupScreenLines,
  getStartupNotice,
  getStartupScreenRows,
  markReleaseNotesSeen,
  parseChangelog,
  readRecentReleaseNotes,
  refreshChangelogCache,
  shouldShowPromptPlaceholder,
} from "./startup-screen.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalDisableNonessentialTraffic = process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC;
const originalFetch = globalThis.fetch;
let tempDir: string | null = null;

afterEach(() => {
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalDisableNonessentialTraffic === undefined) delete process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC;
  else process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = originalDisableNonessentialTraffic;
  globalThis.fetch = originalFetch;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("startup release notes", () => {
  test("prompt placeholder uses official 2.1.132 examples and sampled files", () => {
    expect(getPromptPlaceholder([], () => 0.99)).toBe('Try "create a util logging.py that..."');
    expect(getPromptPlaceholder(["src/index.ts"], () => 0.25)).toBe('Try "how does src/index.ts work?"');
  });

  test("2.1.132 compact startup rows keep DeepSeek effort in the model row", () => {
    const rows = getStartupScreenRows({
      version: "2.1.132",
      model: "deepseek-v4-pro[1m]",
      cwd: "/Users/lbcheng/cheng-lang",
      columns: 120,
    });

    expect(Object.values(rows).join("\n")).toBe([
      "Claude Code v2.1.132",
      "deepseek-v4-pro[1m] with max effort · API Usage Billing",
      "~/cheng-lang",
    ].join("\n"));
  });

  test("2.1.132 Opus startup row and notice match the official entry", () => {
    const rows = getStartupScreenRows({
      version: "2.1.132",
      model: "claude-opus-4-7",
      cwd: "/Users/lbcheng/cheng-lang",
      columns: 120,
    });

    expect(rows.model).toBe("Opus 4.7 (1M context) · API Usage Billing");
    expect(getStartupNotice("claude-opus-4-7")).toBe("Welcome to Opus 4.7 xhigh! · /effort to tune speed vs. intelligence");
  });

  test("2.1.132 non-Opus startup shows the official model switch notice", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-opus-switch-"));
    process.env.CLAUDE_CONFIG_DIR = join(tempDir, ".claude");
    mkdirSync(process.env.CLAUDE_CONFIG_DIR, { recursive: true });

    expect(getStartupNotice("deepseek-v4-pro[1m]")).toBe("Opus 4.7 xhigh is now available! · /model to switch");
  });

  test("2.1.132 hides Opus switch notice after official migration is complete", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-opus-switch-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(configDir, { recursive: true });
    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ opusProMigrationComplete: true }));

    expect(getStartupNotice("deepseek-v4-pro[1m]")).toBe(null);
  });

  test("80 column startup uses the official bordered release-notes card", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-narrow-startup-"));
    process.env.CLAUDE_CONFIG_DIR = join(tempDir, ".claude");
    mkdirSync(process.env.CLAUDE_CONFIG_DIR, { recursive: true });

    const lines = getNarrowStartupScreenLines({
      version: "2.1.132",
      model: "deepseek-v4-pro[1m]",
      cwd: "/Users/lbcheng/open-claude-code/claude-code-full",
      columns: 80,
      releaseNotes: [
        "Added `CLAUDE_CODE_SESSION_ID_IN_BASH=1` env var",
        "Added `CLAUDE_CODE_ALTERNATE_SCREEN=0` env var",
        'Added a "Pasting..." footer',
      ],
    });

    expect(lines[0]).toBe("Claude Code v2.1.132 ─────────────────────────────────────────────────────╮");
    expect(lines[1]).toBe("│                                                    │ What's new              │");
    expect(lines[4]).toContain("Added a \"Pasting...\" f…");
    expect(lines[8]).toBe("│ deepseek-v4-pro[1m] with max … · API Usage Billing │                         │");
    expect(lines.at(-2)).toBe("╰──────────────────────────────────────────────────────────────────────────────╯");
    expect(lines.at(-1)).toBe("  Opus 4.7 xhigh is now available! · /model to switch");
  });

  test("wide startup also uses bordered card when release notes are visible", () => {
    const lines = getNarrowStartupScreenLines({
      version: "2.1.132",
      model: "deepseek-v4-pro[1m]",
      cwd: "/Users/lbcheng/open-claude-code/claude-code-full",
      columns: 137,
      releaseNotes: [
        "Added `CLAUDE_CODE_SESSION_ID_IN_BASH=1` env var to the Bash tool subprocess",
        "Added `CLAUDE_CODE_ALTERNATE_SCREEN=1` env var",
        'Added a "Pasting..." footer hint while a Ctrl+V image paste is being read',
      ],
    });

    expect(lines[0]).toContain("Claude Code v2.1.132");
    expect(lines[1]).toContain("What's new");
    expect(lines[4]).toContain('Added a "Pasting..." footer hint while a Ctrl+V image paste is being');
    expect(lines[8]).toContain("deepseek-v4-pro[1m] with max");
    expect(lines.at(-1)).toMatch(/^╰/u);
  });

  test("prompt placeholder follows the official growthbook gate", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-prompt-suggestion-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(configDir, { recursive: true });

    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ cachedGrowthBookFeatures: { tengu_prompt_suggestion: false } }));
    expect(shouldShowPromptPlaceholder()).toBe(false);

    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ cachedGrowthBookFeatures: { tengu_prompt_suggestion: true } }));
    expect(shouldShowPromptPlaceholder()).toBe(true);
  });

  test("parses changelog sections with date suffixes", () => {
    expect(parseChangelog(sampleChangelog())).toEqual({
      "2.1.132": ["A", "B"],
      "2.1.130": ["C"],
      "2.1.129": ["D"],
    });
  });

  test("shows notes newer than the last seen version, newest first", () => {
    expect(getRecentReleaseNotes("2.1.132", "2.1.129", sampleChangelog())).toEqual(["A", "B", "C"]);
  });

  test("shows no notes after the current version has already been seen", () => {
    expect(getRecentReleaseNotes("2.1.132", "2.1.132", sampleChangelog())).toEqual([]);
  });

  test("reads official cache and global lastReleaseNotesSeen paths", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(join(configDir, "cache"), { recursive: true });
    writeFileSync(join(configDir, "cache", "changelog.md"), sampleChangelog());
    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ lastReleaseNotesSeen: "2.1.130" }));

    expect(readRecentReleaseNotes("2.1.132")).toEqual(["A", "B"]);
  });

  test("uses bundled notes when the cache is absent", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(configDir, { recursive: true });
    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ lastReleaseNotesSeen: "2.1.128" }));

    expect(readRecentReleaseNotes("2.1.132")).toEqual([
      "New `CLAUDE_CODE_SESSION_ID_IN_BASH=1` env var passes session ID to Bash subprocesses",
      "New `CLAUDE_CODE_ALTERNATE_SCREEN=0` env var opts out of alternate-screen renderer to preserve native terminal scrollback",
      "External SIGINT now triggers graceful exit with terminal state restoration",
    ]);
  });

  test("hides bundled notes when nonessential traffic is disabled and no cache exists", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1";
    mkdirSync(configDir, { recursive: true });
    writeFileSync(join(configDir, ".claude.json"), JSON.stringify({ lastReleaseNotesSeen: "2.1.128" }));

    expect(readRecentReleaseNotes("2.1.132")).toEqual([]);
  });

  test("does not refresh changelog when nonessential traffic is disabled", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    process.env.CLAUDE_CONFIG_DIR = join(tempDir, ".claude");
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1";
    let called = false;
    globalThis.fetch = (async () => {
      called = true;
      throw new Error("network should stay off");
    }) as typeof fetch;

    await expect(refreshChangelogCache("2.1.132")).resolves.toBe(false);
    expect(called).toBe(false);
  });

  test("formats all cached release notes newest first", () => {
    expect(getAllReleaseNotes(sampleChangelog())).toEqual([
      ["2.1.132", ["A", "B"]],
      ["2.1.130", ["C"]],
      ["2.1.129", ["D"]],
    ]);

    expect(formatReleaseNotes([["2.1.132", ["A", "B"]]])).toBe("Version 2.1.132:\n· A\n· B");
    expect(formatReleaseNotes([])).toContain(CHANGELOG_URL);
  });

  test("marks current release notes version as seen without dropping existing config", () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-code-full-release-notes-"));
    const configDir = join(tempDir, ".claude");
    const globalConfigPath = join(configDir, ".claude.json");
    process.env.CLAUDE_CONFIG_DIR = configDir;
    mkdirSync(configDir, { recursive: true });
    writeFileSync(globalConfigPath, JSON.stringify({ theme: "dark" }));

    markReleaseNotesSeen("2.1.132");

    expect(JSON.parse(readFileSync(globalConfigPath, "utf8"))).toEqual({
      theme: "dark",
      lastReleaseNotesSeen: "2.1.132",
    });
  });
});

function sampleChangelog(): string {
  return [
    "# Changelog",
    "",
    "## 2.1.132 - 2026-05-05",
    "- A",
    "- B",
    "",
    "## 2.1.130",
    "- C",
    "",
    "## 2.1.129",
    "- D",
    "",
  ].join("\n");
}
