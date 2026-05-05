import { afterEach, describe, expect, test } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { clearClaudeSettingsCache } from "../config/claude-settings.js";
import { PermissionHandler } from "./handler.js";

const originalConfigDir = process.env.CLAUDE_CONFIG_DIR;
const originalManagedPath = process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
const originalCwd = process.cwd();
let tempDir: string | null = null;

afterEach(() => {
  clearClaudeSettingsCache();
  if (originalConfigDir === undefined) delete process.env.CLAUDE_CONFIG_DIR;
  else process.env.CLAUDE_CONFIG_DIR = originalConfigDir;
  if (originalManagedPath === undefined) delete process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
  else process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = originalManagedPath;
  process.chdir(originalCwd);
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("permission handler", () => {
  test("settings allow and deny rules match tool-specific inputs", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(git:*)", "Read(/tmp/**)"],
          deny: ["Bash(rm *)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git",
      input: { command: "git status" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Read",
      toolUseID: "read",
      input: { file_path: "/tmp/project/a.ts" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "rm",
      input: { command: "rm file" },
    })).resolves.toEqual({ behavior: "deny", message: "Denied by rules: Bash" });
  });

  test("settings ask rules force prompts ahead of allow rules", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(git:*)", "Read"],
          ask: ["Bash(git push:*)", "Read(/secret/**)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git-status",
      input: { command: "git status" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git-push",
      input: { command: "git push origin main" },
    })).resolves.toEqual({ behavior: "ask" });
    await expect(handler.checkPermission({
      toolName: "Read",
      toolUseID: "read-secret",
      input: { file_path: "/secret/token.txt" },
    })).resolves.toEqual({ behavior: "ask" });
  });

  test("dontAsk mode denies explicit ask rules instead of prompting", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          defaultMode: "dontAsk",
          ask: ["Bash(npm:*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "npm",
      input: { command: "npm test" },
    })).resolves.toEqual({ behavior: "deny", message: "Permission denied by dontAsk mode: Bash" });
  });

  test("bypass mode still respects explicit deny and ask rules", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(*)"],
          ask: ["Bash(npm publish:*)"],
          deny: ["Bash(curl:*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();
    handler.setMode("bypassPermissions");

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "npm-publish",
      input: { command: "npm publish --dry-run" },
    })).resolves.toEqual({ behavior: "ask" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "curl",
      input: { command: "curl https://example.com" },
    })).resolves.toEqual({ behavior: "deny", message: "Denied by rules: Bash" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "npm-test",
      input: { command: "npm test" },
    })).resolves.toEqual({ behavior: "allow" });
  });

  test("bash prefix allow rules require every subcommand to be allowed", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(git:*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git-chain",
      input: { command: "git status && git diff --stat" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "mixed-chain",
      input: { command: "git status && curl https://example.com" },
    })).resolves.toEqual({ behavior: "ask" });
  });

  test("bash deny and ask rules pierce env vars wrappers redirections and xargs", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(*)"],
          ask: ["Bash(npm publish:*)"],
          deny: ["Bash(rm:*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "env-deny",
      input: { command: "FOO=bar rm file.txt" },
    })).resolves.toEqual({ behavior: "deny", message: "Denied by rules: Bash" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "wrapped-deny",
      input: { command: "timeout 5 xargs rm file.txt" },
    })).resolves.toEqual({ behavior: "deny", message: "Denied by rules: Bash" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "ask-publish",
      input: { command: "NODE_ENV=production npm publish --dry-run > out.txt" },
    })).resolves.toEqual({ behavior: "ask" });
  });

  test("bash wildcard rules support escaped stars and optional trailing args", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(git *)", "Bash(echo \\*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "bare-git",
      input: { command: "git" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "git-status",
      input: { command: "git status" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "literal-star",
      input: { command: "echo *" },
    })).resolves.toEqual({ behavior: "allow" });
    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "nonliteral-star",
      input: { command: "echo hello" },
    })).resolves.toEqual({ behavior: "ask" });
  });

  test("permission rules handle escaped parentheses and session remember choices", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          allow: ["Bash(python -c \"print\\(1\\)\")"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "escaped",
      input: { command: "python -c \"print(1)\"" },
    })).resolves.toEqual({ behavior: "allow" });

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "ask",
      input: { command: "npm test" },
    })).resolves.toEqual({ behavior: "ask" });

    handler.recordApproval("Bash", { command: "npm test" }, "allow");

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "remembered",
      input: { command: "npm test -- --watch=false" },
    })).resolves.toEqual({ behavior: "allow" });
  });

  test("safety checks and dontAsk mode deny before prompting", async () => {
    tempDir = join(tmpdir(), `claude-permissions-${Date.now()}`);
    mkdirSync(tempDir, { recursive: true });
    process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH = join(tempDir, "managed");
    writeFileSync(
      join(tempDir, "settings.json"),
      JSON.stringify({
        permissions: {
          defaultMode: "dontAsk",
          allow: ["Bash(*)"],
        },
      }),
      "utf8",
    );
    process.env.CLAUDE_CONFIG_DIR = tempDir;
    process.chdir(tempDir);
    clearClaudeSettingsCache();

    const handler = new PermissionHandler();

    await expect(handler.checkPermission({
      toolName: "Bash",
      toolUseID: "unsafe",
      input: { command: "rm -rf /" },
    })).resolves.toEqual({ behavior: "deny", message: "Safety: destructive command blocked." });

    await expect(handler.checkPermission({
      toolName: "Write",
      toolUseID: "write",
      input: { file_path: "/tmp/a.ts" },
    })).resolves.toEqual({ behavior: "deny", message: "Permission denied by dontAsk mode: Write" });
  });
});
