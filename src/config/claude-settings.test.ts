import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { clearClaudeSettingsCache, readClaudeSettings } from "./claude-settings.js";

const originalHome = process.env.HOME;
const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalSettingsPath = process.env.CLAUDE_CODE_SETTINGS_PATH;
const originalManagedPath = process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
const originalCwd = process.cwd();
let tempDir: string | null = null;

afterEach(() => {
  clearClaudeSettingsCache();
  process.env.HOME = originalHome;
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalSettingsPath === undefined) delete process.env.CLAUDE_CODE_SETTINGS_PATH;
  else process.env.CLAUDE_CODE_SETTINGS_PATH = originalSettingsPath;
  if (originalManagedPath === undefined) delete process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
  else process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = originalManagedPath;
  process.chdir(originalCwd);
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("claude settings", () => {
  test("merges user, project, and local settings in official precedence order", () => {
    tempDir = join(tmpdir(), `claude-settings-${Date.now()}`);
    const home = join(tempDir, "home");
    const project = join(tempDir, "repo");
    mkdirSync(join(home, ".claude"), { recursive: true });
    mkdirSync(join(project, ".claude"), { recursive: true });
    writeJson(join(home, ".claude", "settings.json"), {
      env: { A: "user", B: "user" },
      permissions: { allow: ["Read"] },
      hooks: { PreToolUse: [{ matcher: "Read", hooks: [{ type: "command", command: "echo user" }] }] },
    });
    writeJson(join(project, ".claude", "settings.json"), {
      env: { A: "project" },
      permissions: { allow: ["Bash(git *)"], ask: ["Read(/secret/**)"] },
      hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "echo project" }] }] },
    });
    writeJson(join(project, ".claude", "settings.local.json"), {
      env: { B: "local" },
      permissions: { ask: ["Bash(git push:*)"], deny: ["Bash(rm *)"], defaultMode: "plan" },
    });

    process.env.HOME = home;
    process.env.CLAUDE_CONFIG_DIR = join(home, ".claude");
    process.chdir(project);
    clearClaudeSettingsCache();

    const settings = readClaudeSettings();

    expect(settings?.env).toEqual({ A: "project", B: "local" });
    expect(settings?.permissions?.allow).toEqual(["Read", "Bash(git *)"]);
    expect(settings?.permissions?.ask).toEqual(["Read(/secret/**)", "Bash(git push:*)"]);
    expect(settings?.permissions?.deny).toEqual(["Bash(rm *)"]);
    expect(settings?.permissions?.defaultMode).toBe("plan");
    expect(settings?.hooks?.PreToolUse).toHaveLength(2);
  });

  test("merges flag and managed settings after local settings", () => {
    tempDir = join(tmpdir(), `claude-settings-policy-${Date.now()}`);
    const home = join(tempDir, "home");
    const project = join(tempDir, "repo");
    const managed = join(tempDir, "managed");
    const flagPath = join(tempDir, "flag.json");
    mkdirSync(join(home, ".claude"), { recursive: true });
    mkdirSync(join(project, ".claude"), { recursive: true });
    mkdirSync(join(managed, "managed-settings.d"), { recursive: true });
    writeJson(join(home, ".claude", "settings.json"), {
      env: { A: "user" },
      permissions: { allow: ["Read"] },
    });
    writeJson(join(project, ".claude", "settings.local.json"), {
      env: { A: "local", B: "local" },
      permissions: { deny: ["Bash(rm *)"] },
    });
    writeJson(flagPath, {
      env: { B: "flag" },
      permissions: { allow: ["Bash(npm *)"], ask: ["Bash(npm publish:*)"] },
    });
    writeJson(join(managed, "managed-settings.json"), {
      env: { A: "managed-base" },
      permissions: { defaultMode: "dontAsk" },
    });
    writeJson(join(managed, "managed-settings.d", "20-extra.json"), {
      env: { A: "managed-dropin", C: "managed" },
      permissions: { deny: ["Bash(curl *)"] },
    });

    process.env.HOME = home;
    process.env.CLAUDE_CONFIG_DIR = join(home, ".claude");
    process.env.CLAUDE_CODE_SETTINGS_PATH = flagPath;
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = managed;
    process.chdir(project);
    clearClaudeSettingsCache();

    const settings = readClaudeSettings();

    expect(settings?.env).toEqual({ A: "managed-dropin", B: "flag", C: "managed" });
    expect(settings?.permissions?.allow).toEqual(["Read", "Bash(npm *)"]);
    expect(settings?.permissions?.ask).toEqual(["Bash(npm publish:*)"]);
    expect(settings?.permissions?.deny).toEqual(["Bash(rm *)", "Bash(curl *)"]);
    expect(settings?.permissions?.defaultMode).toBe("dontAsk");
  });
});

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value), "utf8");
}
