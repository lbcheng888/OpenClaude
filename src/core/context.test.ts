import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  buildClaudeMdContext,
  buildCurrentDateContext,
  buildOfficialEnvironmentContext,
  discoverMemoryFiles,
} from "./context.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalDisableClaudeMds = process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS;
let tempDir: string | null = null;

afterEach(() => {
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalDisableClaudeMds === undefined) delete process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS;
  else process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS = originalDisableClaudeMds;
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("official context", () => {
  test("environment context carries cwd, model and additional directories", () => {
    const context = buildOfficialEnvironmentContext({
      cwd: "/tmp/project",
      model: "deepseek-v4-pro",
      additionalWorkingDirectories: ["/tmp/extra"],
    });

    expect(context).toContain("# Environment");
    expect(context).toContain("Primary working directory: /tmp/project");
    expect(context).toContain("Additional working directories:");
    expect(context).toContain("  - /tmp/extra");
    expect(context).toContain("You are powered by the model deepseek-v4-pro.");
  });

  test("discovers user, project, local and additional CLAUDE.md files in official order", () => {
    tempDir = join(tmpdir(), `claude-context-${Date.now()}`);
    const config = join(tempDir, "config");
    const repo = join(tempDir, "repo");
    const child = join(repo, "packages", "app");
    const extra = join(tempDir, "extra");
    mkdirSync(join(config), { recursive: true });
    mkdirSync(join(repo, ".claude", "rules"), { recursive: true });
    mkdirSync(child, { recursive: true });
    mkdirSync(extra, { recursive: true });
    writeFileSync(join(config, "CLAUDE.md"), "user memory", "utf8");
    writeFileSync(join(repo, "CLAUDE.md"), "project memory", "utf8");
    writeFileSync(join(repo, ".claude", "CLAUDE.md"), "dot project memory", "utf8");
    writeFileSync(join(repo, ".claude", "rules", "style.md"), "rule memory", "utf8");
    writeFileSync(join(repo, "CLAUDE.local.md"), "local memory", "utf8");
    writeFileSync(join(extra, "CLAUDE.md"), "extra memory", "utf8");
    process.env.CLAUDE_CONFIG_DIR = config;

    const files = discoverMemoryFiles(child, [extra]);

    expect(files.map(file => file.content.trim())).toEqual([
      "user memory",
      "project memory",
      "dot project memory",
      "rule memory",
      "local memory",
      "extra memory",
    ]);
  });

  test("formats CLAUDE.md content as overriding user context", () => {
    tempDir = join(tmpdir(), `claude-md-context-${Date.now()}`);
    const repo = join(tempDir, "repo");
    mkdirSync(repo, { recursive: true });
    writeFileSync(join(repo, "CLAUDE.md"), "Always use bun.", "utf8");

    const context = buildClaudeMdContext(repo);

    expect(context).toContain("Codebase and user instructions are shown below.");
    expect(context).toContain("Contents of");
    expect(context).toContain("Always use bun.");
  });

  test("can disable CLAUDE.md injection", () => {
    tempDir = join(tmpdir(), `claude-md-disabled-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    writeFileSync(join(tempDir, "CLAUDE.md"), "ignored", "utf8");
    process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS = "1";

    expect(buildClaudeMdContext(tempDir)).toBeNull();
  });

  test("current date uses local ISO date", () => {
    expect(buildCurrentDateContext(new Date(2026, 4, 6))).toBe("Today's date is 2026-05-06.");
  });
});
