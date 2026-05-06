import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { clearClaudeSettingsCache } from "../config/claude-settings.js";
import { buildRuntimeOfficialContextOptions } from "./context-options.js";
import {
  buildClaudeMdContext,
  buildCurrentDateContext,
  buildOfficialContextSections,
  buildNestedClaudeMdContextForPath,
  buildOfficialEnvironmentContext,
  discoverConditionalMemoryFilesForPath,
  discoverMemoryFiles,
} from "./context.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalDisableClaudeMds = process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS;
const originalMcpInstructions = process.env.CLAUDE_CODE_MCP_INSTRUCTIONS_JSON;
let tempDir: string | null = null;

afterEach(() => {
  clearClaudeSettingsCache();
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalDisableClaudeMds === undefined) delete process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS;
  else process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS = originalDisableClaudeMds;
  if (originalMcpInstructions === undefined) delete process.env.CLAUDE_CODE_MCP_INSTRUCTIONS_JSON;
  else process.env.CLAUDE_CODE_MCP_INSTRUCTIONS_JSON = originalMcpInstructions;
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

  test("expands CLAUDE.md @include directives without reading code spans", () => {
    tempDir = join(tmpdir(), `claude-md-include-${Date.now()}`);
    const repo = join(tempDir, "repo");
    mkdirSync(join(repo, "docs"), { recursive: true });
    writeFileSync(
      join(repo, "CLAUDE.md"),
      [
        "---",
        "paths: **/*.{ts,tsx}",
        "---",
        "<!-- hidden note -->",
        "Root instructions @./docs/included.md",
        "`@./docs/ignored.md`",
      ].join("\n"),
      "utf8",
    );
    writeFileSync(join(repo, "docs", "included.md"), "included instructions", "utf8");
    writeFileSync(join(repo, "docs", "ignored.md"), "ignored instructions", "utf8");

    const context = buildClaudeMdContext(repo);

    expect(context).toContain("Root instructions @./docs/included.md");
    expect(context).toContain("included instructions");
    expect(context).not.toContain("hidden note");
    expect(context).not.toContain("ignored instructions");
    expect(context).not.toContain("paths:");
  });

  test("requires approval before project CLAUDE.md includes outside cwd", () => {
    tempDir = join(tmpdir(), `claude-md-external-${Date.now()}`);
    const repo = join(tempDir, "repo");
    const external = join(tempDir, "external.md");
    mkdirSync(repo, { recursive: true });
    writeFileSync(join(repo, "CLAUDE.md"), `Project @${external}`, "utf8");
    writeFileSync(external, "external instructions", "utf8");

    expect(buildClaudeMdContext(repo)).not.toContain("external instructions");
    expect(buildClaudeMdContext(repo, [], { includeExternal: true })).toContain("external instructions");
  });

  test("keeps conditional rules out of eager context and loads matching nested rules", () => {
    tempDir = join(tmpdir(), `claude-md-conditional-${Date.now()}`);
    const repo = join(tempDir, "repo");
    mkdirSync(join(repo, ".claude", "rules"), { recursive: true });
    writeFileSync(join(repo, ".claude", "rules", "always.md"), "always rule", "utf8");
    writeFileSync(
      join(repo, ".claude", "rules", "typescript.md"),
      ["---", "paths: src/**/*.{ts,tsx}", "---", "typescript rule"].join("\n"),
      "utf8",
    );

    const eager = buildClaudeMdContext(repo);
    const conditional = buildNestedClaudeMdContextForPath("src/app.ts", repo);
    const files = discoverConditionalMemoryFilesForPath("README.md", repo);

    expect(eager).toContain("always rule");
    expect(eager).not.toContain("typescript rule");
    expect(conditional).toContain("typescript rule");
    expect(files.map(file => file.content.trim())).not.toContain("typescript rule");
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

  test("runtime context wires configured language, output style, skills and MCP instructions", () => {
    tempDir = join(tmpdir(), `claude-runtime-context-${Date.now()}`);
    const config = join(tempDir, "config");
    const repo = join(tempDir, "repo");
    mkdirSync(join(config, "output-styles"), { recursive: true });
    mkdirSync(join(config, "skills", "review"), { recursive: true });
    mkdirSync(repo, { recursive: true });
    writeFileSync(join(config, "settings.json"), JSON.stringify({
      outputStyle: "Strict",
      preferredLanguage: "zh",
    }));
    writeFileSync(
      join(config, "output-styles", "Strict.md"),
      ["---", "description: Strict output", "---", "Answer tersely."].join("\n"),
      "utf8",
    );
    writeFileSync(
      join(config, "skills", "review", "SKILL.md"),
      ["---", "description: Review code", "when_to_use: User asks for review", "---", "Inspect changed code."].join("\n"),
      "utf8",
    );
    process.env.CLAUDE_CODE_MCP_INSTRUCTIONS_JSON = JSON.stringify([
      { name: "local-mcp", instructions: "Use local MCP tools carefully." },
    ]);
    process.env.CLAUDE_CONFIG_DIR = config;
    clearClaudeSettingsCache();

    const sections = buildOfficialContextSections(buildRuntimeOfficialContextOptions("deepseek-v4-pro", repo));
    const context = sections.join("\n\n");

    expect(context).toContain("# Language");
    expect(context).toContain("Always respond in Chinese.");
    expect(context).toContain("# Output Style: Strict");
    expect(context).toContain("Answer tersely.");
    expect(context).toContain("# MCP Server Instructions");
    expect(context).toContain("Use local MCP tools carefully.");
    expect(context).toContain("# Skills");
    expect(context).toContain("- review: Review code");
    expect(context).toContain("When to use: User asks for review");
  });
});
