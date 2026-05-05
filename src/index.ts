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
const { waitUntilExit } = await wrappedRender(
  React.createElement(ClaudeCodeTui, {
    version,
    initialPrompt: options.prompt,
    bypassPermissions: options.bypassPermissions,
    modelOverride: options.model,
  }),
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
  prompt: string;
};

function parseCliArgs(argv: string[]): CliOptions {
  const promptParts: string[] = [];
  let model: string | undefined;
  let settingsPath: string | undefined;
  let skipNext = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (arg === "--model" || arg === "--output-format" || arg === "--settings") {
      if (arg === "--model") model = argv[i + 1];
      if (arg === "--settings") settingsPath = argv[i + 1];
      skipNext = true;
      continue;
    }

    if (
      arg === "--add-dir" ||
      arg === "--agent" ||
      arg === "--append-system-prompt" ||
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
    prompt: promptParts.join(" ").trim(),
  };
}
