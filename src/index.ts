#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const version = readPackageVersion();
const args = process.argv.slice(2);
const options = parseCliArgs(args);
if (options.settingsPath) {
  process.env.CLAUDE_CODE_SETTINGS_PATH = options.settingsPath;
}
const { loadClaudeSettingsEnv } = await import("./config/claude-settings.js");
loadClaudeSettingsEnv();

if (options.version) {
  process.stdout.write(`${version} (Claude Code)\n`);
  process.exit(0);
}

if (options.help) {
  process.stdout.write(helpText());
  process.exit(0);
}

if (options.print || !process.stdin.isTTY) {
  const { runPrintMode } = await import("./terminal/app.js");
  await runPrintMode(options);
  process.exit(0);
}

const React = await import("react");
const { wrappedRender } = await import("@anthropic/ink");
const { ClaudeCodeTui } = await import("./terminal/app.js");
const { refreshChangelogCache } = await import("./terminal/startup-screen.js");
void refreshChangelogCache(version);
const { waitUntilExit } = await wrappedRender(
  React.createElement(ClaudeCodeTui, {
    version,
    initialPrompt: options.prompt,
    bypassPermissions: options.bypassPermissions,
    modelOverride: options.model,
    resumeSessionId: options.resumeSessionId,
    continueSession: options.continueSession,
    initialPermissionMode: options.permissionMode,
    additionalDirectories: options.addDirs,
    appendSystemPrompt: options.appendSystemPrompt,
  }),
  { exitOnCtrlC: false },
);
await waitUntilExit();

function readPackageVersion(): string {
  const distDir = dirname(fileURLToPath(import.meta.url));
  const pkgPath = join(distDir, "..", "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  return String(pkg.version);
}

function helpText(): string {
  return `Usage: claude [options] [prompt]

Claude Code - starts an interactive session by default, use -p/--print for
non-interactive output

Arguments:
  prompt                                            Your prompt

Options:
  -p, --print                                       Print response and exit
  --output-format <format>                          Output format for --print: text
  --model <model>                                   Model for the current session
  --settings <file>                                 Additional settings JSON file
  --append-system-prompt <prompt>                   Append extra instructions to the system prompt
  --permission-mode <mode>                          default, acceptEdits, plan, dontAsk, bypassPermissions
  -r, --resume [sessionId]                          Resume a saved session
  -c, --continue                                    Continue the most recent session
  -h, --help                                        Display help for command
  -v, -V, --version                                 Display version
`;
}

export type CliOptions = {
  help: boolean;
  version: boolean;
  print: boolean;
  bypassPermissions: boolean;
  model?: string;
  settingsPath?: string;
  addDirs: string[];
  appendSystemPrompt?: string;
  resumeSessionId?: string;
  continueSession: boolean;
  permissionMode?: "default" | "acceptEdits" | "plan" | "dontAsk" | "bypassPermissions";
  prompt: string;
};

function parseCliArgs(argv: string[]): CliOptions {
  const promptParts: string[] = [];
  let model: string | undefined;
  let settingsPath: string | undefined;
  const addDirs: string[] = [];
  let appendSystemPrompt: string | undefined;
  let resumeSessionId: string | undefined;
  let continueSession = false;
  let permissionMode: CliOptions["permissionMode"];
  let skipNext = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (arg === "--model" || arg === "--output-format" || arg === "--settings" || arg === "--permission-mode" || arg === "--add-dir" || arg === "--append-system-prompt") {
      if (arg === "--model") model = argv[i + 1];
      if (arg === "--settings") settingsPath = argv[i + 1];
      if (arg === "--permission-mode") permissionMode = parsePermissionMode(argv[i + 1]);
      if (arg === "--add-dir" && argv[i + 1]) addDirs.push(argv[i + 1]);
      if (arg === "--append-system-prompt") appendSystemPrompt = argv[i + 1];
      skipNext = true;
      continue;
    }

    if (arg === "--resume" || arg === "-r") {
      const next = argv[i + 1];
      if (next && !next.startsWith("-")) {
        resumeSessionId = next;
        skipNext = true;
      } else {
        continueSession = true;
      }
      continue;
    }

    if (arg === "--continue" || arg === "-c") {
      continueSession = true;
      continue;
    }

    if (
      arg === "--agent" ||
      arg === "--mcp-config"
    ) {
      skipNext = true;
      continue;
    }

    if (arg.startsWith("--model=")) {
      model = arg.slice("--model=".length);
      continue;
    }

    if (arg.startsWith("--settings=")) {
      settingsPath = arg.slice("--settings=".length);
      continue;
    }

    if (arg.startsWith("--add-dir=")) {
      addDirs.push(arg.slice("--add-dir=".length));
      continue;
    }

    if (arg.startsWith("--append-system-prompt=")) {
      appendSystemPrompt = arg.slice("--append-system-prompt=".length);
      continue;
    }

    if (arg.startsWith("--permission-mode=")) {
      permissionMode = parsePermissionMode(arg.slice("--permission-mode=".length));
      continue;
    }

    if (arg.startsWith("--resume=")) {
      resumeSessionId = arg.slice("--resume=".length);
      continue;
    }

    if (arg.startsWith("-")) continue;
    promptParts.push(arg);
  }

  return {
    help: argv.includes("--help") || argv.includes("-h"),
    version: argv.includes("--version") || argv.includes("-v") || argv.includes("-V"),
    print: argv.includes("--print") || argv.includes("-p"),
    bypassPermissions:
      argv.includes("--dangerously-skip-permissions") ||
      argv.includes("--allow-dangerously-skip-permissions"),
    model,
    settingsPath,
    addDirs,
    appendSystemPrompt,
    resumeSessionId,
    continueSession,
    permissionMode,
    prompt: promptParts.join(" ").trim(),
  };
}

function parsePermissionMode(value: string | undefined): CliOptions["permissionMode"] {
  if (
    value === "default" ||
    value === "acceptEdits" ||
    value === "plan" ||
    value === "dontAsk" ||
    value === "bypassPermissions"
  ) {
    return value;
  }
  return undefined;
}
