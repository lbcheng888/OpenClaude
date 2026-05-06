import { parse } from "shell-quote";

type ExploreKind = "search" | "read" | "list";
type ShellToken = string | { op: string } | { comment?: string };

const BASH_SEARCH_COMMANDS = new Set(["grep", "rg", "ag", "ack", "locate", "which", "whereis"]);
const BASH_READ_COMMANDS = new Set([
  "cat",
  "head",
  "tail",
  "less",
  "more",
  "wc",
  "stat",
  "file",
  "strings",
  "jq",
  "awk",
  "cut",
  "sort",
  "uniq",
  "tr",
  "nl",
  "pwd",
]);
const BASH_LIST_COMMANDS = new Set(["ls", "tree", "du"]);
const BASH_NEUTRAL_COMMANDS = new Set(["echo", "printf", "true", "false", ":"]);
const SHELL_SEPARATORS = new Set(["|", "&&", "||", ";"]);
const SHELL_WRITE_REDIRECTS = new Set([">", ">>", ">|", ">&", "1>", "1>>", "2>", "2>>", "&>", "&>>"]);
const UNSAFE_FIND_TOKENS = new Set(["-delete", "-exec", "-execdir", "-ok", "-okdir", "-fprint", "-fprint0", "-fls", "-fprintf"]);
const READ_ONLY_GIT_SUBCOMMANDS = new Set([
  "blame",
  "branch",
  "cat-file",
  "describe",
  "diff",
  "diff-files",
  "diff-index",
  "diff-tree",
  "for-each-ref",
  "grep",
  "ls-tree",
  "log",
  "ls-files",
  "merge-base",
  "remote",
  "rev-list",
  "rev-parse",
  "show-ref",
  "show",
  "status",
  "stash",
  "submodule",
  "tag",
  "worktree",
]);
const GIT_GLOBAL_OPTIONS_WITH_VALUES = new Set([
  "-C",
  "-c",
  "--git-dir",
  "--work-tree",
  "--namespace",
  "--exec-path",
  "--config-env",
]);
const READ_ONLY_GIT_BRANCH_FLAGS = new Set([
  "-a",
  "--all",
  "-r",
  "--remotes",
  "-v",
  "-vv",
  "--verbose",
  "--show-current",
  "--no-color",
  "--ignore-case",
  "--omit-empty",
]);
const READ_ONLY_GIT_BRANCH_FLAGS_WITH_VALUES = new Set([
  "--contains",
  "--no-contains",
  "--merged",
  "--no-merged",
  "--format",
  "--sort",
  "--points-at",
  "--color",
  "--column",
]);
const UNSAFE_GIT_BRANCH_FLAGS = new Set([
  "-d",
  "-D",
  "-m",
  "-M",
  "-c",
  "-C",
  "-u",
  "--delete",
  "--move",
  "--copy",
  "--set-upstream-to",
  "--unset-upstream",
  "--edit-description",
  "--track",
  "--no-track",
]);

export function normalizeSubagentType(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^explore$/iu.test(trimmed)) return "Explore";
  if (/^plan$/iu.test(trimmed)) return "Plan";
  if (/^general-purpose$/iu.test(trimmed)) return "general-purpose";
  return trimmed;
}

export function isReadOnlyExploreToolCall(name: string, input: Record<string, unknown>): boolean {
  if (name === "Read" || name === "Glob" || name === "Grep" || name === "LS") return true;
  if (name === "Skill") return true;
  if (name === "WebSearch" || name === "WebFetch") return true;
  if (name === "BashOutput" || name === "TaskOutput") return true;
  if (name !== "Bash") return false;
  return classifyReadOnlyBashCommand(String(input.command || "")) !== null;
}

export function classifyReadOnlyBashCommand(command: string): ExploreKind | null {
  const parts = splitShellCommand(command);
  if (!parts) return null;

  let hasCommand = false;
  let hasSearch = false;
  let hasRead = false;
  let hasList = false;

  for (const part of parts) {
    const commandInfo = classifyShellPart(part);
    if (commandInfo === null) return null;
    if (commandInfo === "neutral") continue;
    hasCommand = true;
    if (commandInfo === "search") hasSearch = true;
    if (commandInfo === "read") hasRead = true;
    if (commandInfo === "list") hasList = true;
  }

  if (!hasCommand) return null;
  if (hasSearch) return "search";
  if (hasRead) return "read";
  if (hasList) return "list";
  return null;
}

function splitShellCommand(command: string): string[][] | null {
  let tokens: ShellToken[];
  try {
    tokens = parse(command) as ShellToken[];
  } catch {
    return null;
  }

  const parts: string[][] = [];
  let current: string[] = [];
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]!;
    if (typeof token === "string") {
      current.push(token);
      continue;
    }

    if ("op" in token) {
      if (SHELL_WRITE_REDIRECTS.has(token.op)) {
        const consumedIndex = consumeReadOnlyRedirect(tokens, index, current);
        if (consumedIndex === null) return null;
        index = consumedIndex;
        continue;
      }
      if (SHELL_SEPARATORS.has(token.op)) {
        if (current.length > 0) {
          parts.push(current);
          current = [];
        }
        continue;
      }
      return null;
    }
  }

  if (current.length > 0) parts.push(current);
  return parts;
}

function consumeReadOnlyRedirect(tokens: ShellToken[], index: number, current: string[]): number | null {
  const token = tokens[index];
  if (typeof token === "string" || !token || !("op" in token)) return null;
  const next = tokens[index + 1];
  const nextValue = typeof next === "string" ? next : undefined;
  const previous = current[current.length - 1];

  if ((token.op === ">" || token.op === ">>") && nextValue === "/dev/null") {
    if (previous === "1" || previous === "2") current.pop();
    return index + 1;
  }

  if (token.op === ">&" && (previous === "1" || previous === "2") && (nextValue === "1" || nextValue === "2")) {
    current.pop();
    return index + 1;
  }

  return null;
}

function classifyShellPart(tokens: string[]): ExploreKind | "neutral" | null {
  const argv = tokens.filter(token => token.trim().length > 0);
  while (argv[0] && /^[A-Za-z_][A-Za-z0-9_]*=/u.test(argv[0]!)) {
    argv.shift();
  }

  const command = argv[0];
  if (!command) return "neutral";
  const baseCommand = command.split("/").pop() || command;

  if (BASH_NEUTRAL_COMMANDS.has(baseCommand)) return "neutral";
  if (baseCommand === "cd") return classifyCdCommand(argv.slice(1));
  if (baseCommand === "find") return classifyFindCommand(argv.slice(1));
  if (baseCommand === "sed") return classifySedCommand(argv.slice(1));
  if (BASH_SEARCH_COMMANDS.has(baseCommand)) return "search";
  if (BASH_READ_COMMANDS.has(baseCommand)) return "read";
  if (BASH_LIST_COMMANDS.has(baseCommand)) return "list";
  if (baseCommand === "git") return classifyGitCommand(argv.slice(1));
  return null;
}

function classifyCdCommand(args: string[]): "neutral" | null {
  const normalized = args[0] === "--" ? args.slice(1) : args;
  if (normalized.length === 0) return "neutral";
  if (normalized.length !== 1) return null;
  const target = normalized[0]!;
  if (!target || target.includes("\n") || target.includes("\r")) return null;
  if (target.startsWith("-") && target !== "-") return null;
  return "neutral";
}

function classifyFindCommand(args: string[]): ExploreKind | null {
  for (const arg of args) {
    if (UNSAFE_FIND_TOKENS.has(arg)) return null;
    if (/^-fprint0?$/u.test(arg) || /^-fls$/u.test(arg) || /^-fprintf$/u.test(arg)) return null;
  }
  return "search";
}

function classifySedCommand(args: string[]): ExploreKind | null {
  let sawSuppressPrint = false;
  let sawScript = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!;
    if (arg === "--") continue;
    if (arg === "-i" || arg.startsWith("-i") || arg === "--in-place" || arg.startsWith("--in-place=")) {
      return null;
    }
    if (arg === "-n" || /^-[Erz]*n[Erz]*$/u.test(arg)) {
      sawSuppressPrint = true;
      continue;
    }
    if (/^-[Erz]+$/u.test(arg)) continue;
    if (arg === "-e") {
      const script = args[index + 1];
      if (!script || !isReadOnlySedPrintScript(script)) return null;
      sawScript = true;
      index++;
      continue;
    }
    if (arg.startsWith("-e")) {
      const script = arg.slice(2);
      if (!script || !isReadOnlySedPrintScript(script)) return null;
      sawScript = true;
      continue;
    }
    if (arg.startsWith("-")) return null;
    if (!sawScript && isReadOnlySedPrintScript(arg)) {
      sawScript = true;
      continue;
    }
  }
  return sawSuppressPrint && sawScript ? "read" : null;
}

function isReadOnlySedPrintScript(script: string): boolean {
  return script
    .split(";")
    .map(part => part.trim())
    .every(part => /^(?:\d+|\$)(?:,(?:\d+|\$))?p$/u.test(part));
}

function classifyGitCommand(args: string[]): ExploreKind | null {
  const parsed = parseGitSubcommand(args);
  const subcommand = parsed?.subcommand;
  if (!subcommand || !READ_ONLY_GIT_SUBCOMMANDS.has(subcommand)) return null;
  const remaining = parsed?.args || [];
  if (subcommand === "grep") return "search";
  if (subcommand === "branch") return isReadOnlyGitBranchArgs(remaining) ? "read" : null;
  if (subcommand === "worktree") return remaining[0] === "list" ? "read" : null;
  if (subcommand === "stash") return remaining[0] === "list" || remaining[0] === "show" ? "read" : null;
  if (subcommand === "submodule") return !remaining[0] || remaining[0] === "status" ? "read" : null;
  if (subcommand === "remote") {
    return remaining.length === 0
      || remaining.every(arg => arg === "-v" || arg === "--verbose")
      || remaining[0] === "get-url"
      ? "read"
      : null;
  }
  if (subcommand === "tag") {
    return remaining.length === 0 || remaining.some(arg => arg === "-l" || arg === "--list") ? "read" : null;
  }
  return subcommand === "grep" ? "search" : "read";
}

function isReadOnlyGitBranchArgs(args: string[]): boolean {
  let listMode = args.length === 0;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!;
    if (arg === "--") return false;
    if (UNSAFE_GIT_BRANCH_FLAGS.has(arg) || [...UNSAFE_GIT_BRANCH_FLAGS].some(flag => arg.startsWith(`${flag}=`))) {
      return false;
    }
    if (arg === "--list") {
      listMode = true;
      continue;
    }
    if (READ_ONLY_GIT_BRANCH_FLAGS.has(arg)) continue;
    const valueFlag = [...READ_ONLY_GIT_BRANCH_FLAGS_WITH_VALUES].find(flag => arg === flag || arg.startsWith(`${flag}=`));
    if (valueFlag) {
      if (arg === valueFlag) {
        if (!args[index + 1]) return false;
        index++;
      }
      continue;
    }
    if (arg.startsWith("-")) return false;
    if (!listMode) return false;
  }
  return true;
}

function parseGitSubcommand(args: string[]): { subcommand: string; args: string[] } | null {
  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!;
    if (arg === "--") continue;
    if (GIT_GLOBAL_OPTIONS_WITH_VALUES.has(arg)) {
      index++;
      continue;
    }
    if ([...GIT_GLOBAL_OPTIONS_WITH_VALUES].some(option => arg.startsWith(`${option}=`))) continue;
    if (arg.startsWith("-")) continue;
    return { subcommand: arg, args: args.slice(index + 1) };
  }
  return null;
}
