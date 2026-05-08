// Permission system (1:1 from binary)
import shellQuote from "shell-quote";
import { existsSync, realpathSync } from "node:fs";
import { relative, resolve } from "node:path";
import { homedir } from "node:os";
import { readClaudeSettings } from "../config/claude-settings.js";

export type PermissionBehavior = "allow" | "deny" | "ask";
export type PermissionMode = "default" | "acceptEdits" | "plan" | "auto" | "bypassPermissions" | "dontAsk";
export type PermissionRuleType = "allow" | "deny" | "ask" | "hard_deny";

export interface PermissionResult {
  behavior: PermissionBehavior;
  updatedInput?: Record<string, unknown>;
  message?: string;
}

export interface PermissionRequest {
  toolName: string;
  toolUseID: string;
  input: Record<string, unknown>;
  description?: string;
  decisionReason?: string;
  decisionReasonType?: string;
}

export class PermissionHandler {
  private mode: PermissionMode = "default";
  private allowlist: string[] = [];
  private asklist: string[] = [];
  private denylist: string[] = [];
  private hardDenyList: string[] = [];
  private sessionApprovals = new Map<string, PermissionBehavior>();

  constructor() {
    const permissions = readClaudeSettings()?.permissions;
    const allow = Array.isArray(permissions?.allow) ? permissions.allow.filter(isString) : [];
    const ask = Array.isArray(permissions?.ask) ? permissions.ask.filter(isString) : [];
    const deny = Array.isArray(permissions?.deny) ? permissions.deny.filter(isString) : [];
    const hardDeny = Array.isArray((permissions as Record<string, unknown>)?.hard_deny)
      ? ((permissions as Record<string, unknown>).hard_deny as unknown[]).filter(isString)
      : [];
    this.allowlist = [...new Set(["Read", "Glob", "Grep", "LS", "TodoWrite", "WebFetch", ...allow])];
    this.asklist = [...new Set(ask)];
    this.denylist = [...new Set(deny)];
    this.hardDenyList = [...new Set(hardDeny)];
    if (isPermissionMode(permissions?.defaultMode)) {
      this.mode = permissions.defaultMode;
    }
  }

  setMode(mode: PermissionMode): void {
    this.mode = mode;
  }

  getMode(): PermissionMode {
    return this.mode;
  }

  async checkPermission(request: PermissionRequest): Promise<PermissionResult> {
    const { toolName, input } = request;

    // hard_deny: unconditional block regardless of mode or user intent
    if (this.hardDenyList.some((r) => matchRule(r, toolName, input, "deny"))) {
      return { behavior: "deny", message: `Blocked by hard_deny rule: ${toolName}` };
    }

    // Plan mode - deny edits and bash UNLESS a matching allow rule exists
    if (
      this.mode === "plan" &&
      (toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit" || toolName === "Bash")
    ) {
      const planAllowed = toolName === "Bash"
        ? bashCommandAllowedByRules(this.allowlist, input)
        : this.allowlist.some((r) => matchRule(r, toolName, input, "allow"));
      if (!planAllowed) {
        return { behavior: "deny", message: "Plan mode: edits and commands are blocked until plan is approved." };
      }
    }

    // Safety checks
    if (toolName === "Bash") {
      const cmd = String(input.command || "");
      if (cmd.includes("rm -rf /") || cmd.includes("sudo rm")) {
        return { behavior: "deny", message: "Safety: destructive command blocked." };
      }
    }

    // Check denylist
    if (this.denylist.some((r) => matchRule(r, toolName, input, "deny"))) {
      return { behavior: "deny", message: `Denied by rules: ${toolName}` };
    }

    // Explicit ask rules force a prompt unless dontAsk mode forbids prompting.
    if (this.asklist.some((r) => matchRule(r, toolName, input, "ask"))) {
      if (this.mode === "dontAsk") {
        return { behavior: "deny", message: `Permission denied by dontAsk mode: ${toolName}` };
      }
      return { behavior: "ask" };
    }

    // Bypass mode still respects explicit deny/ask rules and hard safety checks.
    if (this.mode === "bypassPermissions") {
      return { behavior: "allow" };
    }

    // Check allowlist
    if (toolName === "Bash" ? bashCommandAllowedByRules(this.allowlist, input) : this.allowlist.some((r) => matchRule(r, toolName, input, "allow"))) {
      return { behavior: "allow" };
    }

    // Session approval cache. Denylist and hard safety checks still win.
    const cached = this.sessionApprovals.get(getSessionRuleKey(toolName, input));
    if (cached) return { behavior: cached };

    // Accept edits mode
    if (this.mode === "acceptEdits" && (toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit")) {
      return { behavior: "allow" };
    }

    if (this.mode === "dontAsk") {
      return { behavior: "deny", message: `Permission denied by dontAsk mode: ${toolName}` };
    }

    // Default: ask
    return { behavior: "ask" };
  }

  recordApproval(toolName: string, input: Record<string, unknown>, behavior: PermissionBehavior): void {
    this.sessionApprovals.set(getSessionRuleKey(toolName, input), behavior);
  }

  addAllowRule(rule: string): void {
    this.allowlist.push(rule);
  }

  addDenyRule(rule: string): void {
    this.denylist.push(rule);
  }
}

function matchRule(
  rule: string,
  toolName: string,
  input: Record<string, unknown>,
  behavior: PermissionBehavior,
): boolean {
  const trimmedRule = rule.trim();

  const parsed = parsePermissionRule(trimmedRule);

  // MCP tool matching
  if (isMCPTool(toolName)) {
    if (parsed.toolName.startsWith(MCP_TOOL_PREFIX)) {
      return matchMCPRule(parsed.toolName, parsed.ruleContent, toolName);
    }
    // Non-MCP rules can match MCP tools by exact name
    if (parsed.toolName !== toolName) return false;
    return true;
  }

  // Regular tool matching
  if (parsed.toolName !== toolName) return false;
  if (!parsed.ruleContent) return true;
  if (toolName === "Bash") {
    return matchBashRule(parsed.ruleContent, String(input.command || ""), behavior, { includeSubcommands: true });
  }
  return getToolMatchValues(toolName, input).some(value => matchGlob(parsed.ruleContent!, value));
}

function bashCommandAllowedByRules(rules: string[], input: Record<string, unknown>): boolean {
  const command = String(input.command || "");
  const bashRules = rules
    .map((rule) => parsePermissionRule(rule.trim()))
    .filter((rule) => rule.toolName === "Bash");
  if (bashRules.length === 0) return false;
  if (bashRules.some((rule) => !rule.ruleContent)) return true;

  if (bashRules.some((rule) => rule.ruleContent && matchBashRule(rule.ruleContent, command, "allow", { includeSubcommands: false }))) {
    return true;
  }

  const subcommands = splitBashCommand(command);
  if (subcommands.length === 0) return false;
  return subcommands.every((subcommand) =>
    bashRules.some((rule) =>
      rule.ruleContent && matchBashRule(rule.ruleContent, subcommand, "allow", { includeSubcommands: false }),
    ),
  );
}

function getToolMatchValues(toolName: string, input: Record<string, unknown>): string[] {
  if (toolName === "Bash") return [String(input.command || "")];
  if (toolName === "Read" || toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit") {
    return getPathMatchValues(String(input.file_path || ""));
  }
  if (toolName === "Grep" || toolName === "Glob") return [String(input.pattern || "")];
  if (toolName === "LS") return getPathMatchValues(String(input.path || ""));
  return [JSON.stringify(input)];
}

function getToolMatchValue(toolName: string, input: Record<string, unknown>): string {
  return getToolMatchValues(toolName, input)[0] || "";
}

function getPathMatchValues(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [trimmed];
  const absolute = resolve(expandHome(trimmed));
  const values = [
    trimmed,
    trimmed.replace(/\\/g, "/"),
    absolute,
    absolute.replace(/\\/g, "/"),
    relative(process.cwd(), absolute).replace(/\\/g, "/"),
    formatHomePath(absolute),
  ];
  if (existsSync(absolute)) {
    const real = realpathSync(absolute);
    values.push(real, real.replace(/\\/g, "/"), relative(process.cwd(), real).replace(/\\/g, "/"), formatHomePath(real));
  }
  return uniqueNonEmpty(values);
}

function expandHome(value: string): string {
  if (value === "~") return homedir();
  if (value.startsWith("~/")) return `${homedir()}${value.slice(1)}`;
  return value;
}

function formatHomePath(value: string): string {
  const home = homedir();
  if (value === home) return "~";
  if (value.startsWith(`${home}/`)) return `~${value.slice(home.length)}`;
  return value;
}

function matchGlob(pattern: string, value: string): boolean {
  if (pattern === "*") return true;
  const normalizedPattern = pattern.replace(/\\/g, "/");
  const normalizedValue = value.replace(/\\/g, "/");
  const source = normalizedPattern
    .split("")
    .map((char, index, chars) => {
      if (char === "*") {
        return chars[index - 1] === "*" ? "" : ".*";
      }
      if (char === "?") return ".";
      return escapeRegExp(char);
    })
    .join("");
  return new RegExp(`^${source}$`).test(normalizedValue);
}

function matchBashRule(
  ruleContent: string,
  command: string,
  behavior: PermissionBehavior,
  options: { includeSubcommands: boolean },
): boolean {
  const normalizedRule = ruleContent.trim();
  if (!normalizedRule) return true;
  const bashRule = parseBashPermissionRule(normalizedRule);
  return buildBashCandidates(command, behavior, options).some((candidate) =>
    matchParsedBashRule(bashRule, candidate, behavior),
  );
}

type BashPermissionRule =
  | { type: "exact"; command: string }
  | { type: "prefix"; prefix: string }
  | { type: "wildcard"; pattern: string };

function parseBashPermissionRule(ruleContent: string): BashPermissionRule {
  const prefix = extractBashPrefix(ruleContent);
  if (prefix !== null) return { type: "prefix", prefix };
  if (hasUnescapedStar(ruleContent)) return { type: "wildcard", pattern: ruleContent };
  return { type: "exact", command: unescapeBashWildcardLiterals(ruleContent) };
}

function matchParsedBashRule(rule: BashPermissionRule, command: string, behavior: PermissionBehavior): boolean {
  const candidate = command.trim();
  if (!candidate) return false;
  switch (rule.type) {
    case "exact":
      return candidate === rule.command;
    case "prefix":
      if (behavior === "allow" && splitBashCommand(candidate).length > 1) return false;
      if (candidate === rule.prefix || candidate.startsWith(`${rule.prefix} `)) return true;
      return candidate === `xargs ${rule.prefix}` || candidate.startsWith(`xargs ${rule.prefix} `);
    case "wildcard":
      if (behavior === "allow" && splitBashCommand(candidate).length > 1) return false;
      return matchWildcardPattern(rule.pattern, candidate);
  }
}

function buildBashCandidates(
  command: string,
  behavior: PermissionBehavior,
  options: { includeSubcommands: boolean },
): string[] {
  const seeds = uniqueNonEmpty([command.trim(), stripBashOutputRedirections(command)]);
  const candidates = expandBashCandidateTransforms(seeds, behavior);
  if (!options.includeSubcommands) return candidates;

  const subcommands = candidates.flatMap((candidate) => splitBashCommand(candidate));
  return expandBashCandidateTransforms([...candidates, ...subcommands], behavior);
}

function expandBashCandidateTransforms(commands: string[], behavior: PermissionBehavior): string[] {
  const candidates = uniqueNonEmpty(commands);
  const seen = new Set(candidates);
  let index = 0;
  while (index < candidates.length) {
    const command = candidates[index++]!;
    for (const next of [
      stripSafeBashWrappers(command),
      behavior === "allow" ? command : stripAllLeadingEnvVars(command),
    ]) {
      const trimmed = next.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        candidates.push(trimmed);
      }
    }
  }
  return candidates;
}

function splitBashCommand(command: string): string[] {
  const joined = joinBashContinuations(command.trim());
  if (!joined) return [];
  const newlinePlaceholder = `__CLAUDE_CODE_NL_${Math.random().toString(36).slice(2)}__`;
  const parsed = parseShell(joined.replace(/\n/gu, `\n${newlinePlaceholder}\n`));
  if (!parsed) return [joined];

  const commands: string[] = [];
  let current: string[] = [];
  let skipNext = false;
  for (const token of parsed) {
    if (skipNext) {
      skipNext = false;
      continue;
    }
    if (typeof token === "string") {
      if (token === newlinePlaceholder) {
        pushCurrentCommand(commands, current);
        current = [];
      } else {
        current.push(token);
      }
      continue;
    }
    if (isShellGlobToken(token)) {
      current.push(token.pattern);
      continue;
    }
    if (isShellCommentToken(token)) {
      current.push(`#${token.comment}`);
      continue;
    }
    if (!isShellOperatorToken(token)) continue;
    if (BASH_COMMAND_SEPARATORS.has(token.op)) {
      pushCurrentCommand(commands, current);
      current = [];
      continue;
    }
    if (BASH_REDIRECT_OPERATORS.has(token.op)) {
      const previous = current[current.length - 1];
      if (previous && /^[0-9]$/u.test(previous)) current.pop();
      skipNext = true;
    }
  }
  pushCurrentCommand(commands, current);
  return commands.length > 0 ? commands : [joined];
}

function stripBashOutputRedirections(command: string): string {
  const split = splitBashCommand(command);
  return split.length === 1 ? split[0]! : command.trim();
}

function pushCurrentCommand(commands: string[], current: string[]): void {
  const value = current.join(" ").trim();
  if (value) commands.push(value);
}

type ShellQuoteToken =
  | string
  | { op: string; pattern?: string }
  | { comment: string };

function parseShell(command: string): ShellQuoteToken[] | null {
  try {
    const parse = (shellQuote as { parse: (cmd: string, env?: (name: string) => string) => ShellQuoteToken[] }).parse;
    return parse(command, (name: string) => `$${name}`);
  } catch {
    return null;
  }
}

const BASH_COMMAND_SEPARATORS = new Set(["&&", "||", ";", ";;", "|"]);
const BASH_REDIRECT_OPERATORS = new Set([">", ">>", ">&"]);

function isShellOperatorToken(token: ShellQuoteToken): token is { op: string } {
  return typeof token === "object" && token !== null && "op" in token && typeof token.op === "string";
}

function isShellGlobToken(token: ShellQuoteToken): token is { op: "glob"; pattern: string } {
  return isShellOperatorToken(token) && token.op === "glob" && typeof token.pattern === "string";
}

function isShellCommentToken(token: ShellQuoteToken): token is { comment: string } {
  return typeof token === "object" && token !== null && "comment" in token && typeof token.comment === "string";
}

function joinBashContinuations(command: string): string {
  return command.replace(/\\+\n/gu, (match) => {
    const backslashCount = match.length - 1;
    return backslashCount % 2 === 1 ? "\\".repeat(backslashCount - 1) : match;
  });
}

function stripSafeBashWrappers(command: string): string {
  const safeEnvVars = new Set([
    "ANTHROPIC_API_KEY",
    "BLOCK_SIZE",
    "BLOCKSIZE",
    "CGO_ENABLED",
    "CHARSET",
    "COLORTERM",
    "FORCE_COLOR",
    "GCC_COLORS",
    "GO111MODULE",
    "GOARCH",
    "GOEXPERIMENT",
    "GOOS",
    "GREP_COLOR",
    "GREP_COLORS",
    "LANG",
    "LANGUAGE",
    "LC_ALL",
    "LC_CTYPE",
    "LC_TIME",
    "LSCOLORS",
    "LS_COLORS",
    "NODE_ENV",
    "NO_COLOR",
    "PYTEST_DEBUG",
    "PYTEST_DISABLE_PLUGIN_AUTOLOAD",
    "PYTHONDONTWRITEBYTECODE",
    "PYTHONUNBUFFERED",
    "RUST_BACKTRACE",
    "RUST_LOG",
    "TERM",
    "TIME_STYLE",
    "TZ",
  ]);
  const envPattern = /^([A-Za-z_][A-Za-z0-9_]*)=([A-Za-z0-9_./:-]+)[ \t]+/u;
  const wrapperPatterns = [
    /^timeout[ \t]+(?:(?:--(?:foreground|preserve-status|verbose)|--(?:kill-after|signal)=[A-Za-z0-9_.+-]+|--(?:kill-after|signal)[ \t]+[A-Za-z0-9_.+-]+|-v|-[ks][ \t]+[A-Za-z0-9_.+-]+|-[ks][A-Za-z0-9_.+-]+)[ \t]+)*(?:--[ \t]+)?\d+(?:\.\d+)?[smhd]?[ \t]+/u,
    /^time[ \t]+(?:--[ \t]+)?/u,
    /^nice(?:[ \t]+-n[ \t]+-?\d+|[ \t]+-\d+)?[ \t]+(?:--[ \t]+)?/u,
    /^stdbuf(?:[ \t]+-[ioe][LN0-9]+)+[ \t]+(?:--[ \t]+)?/u,
    /^nohup[ \t]+(?:--[ \t]+)?/u,
  ];
  let stripped = command.trim();
  let previous = "";
  while (stripped !== previous) {
    previous = stripped;
    stripped = stripBashCommentLines(stripped);
    const match = stripped.match(envPattern);
    if (match && safeEnvVars.has(match[1]!)) stripped = stripped.replace(envPattern, "");
  }
  previous = "";
  while (stripped !== previous) {
    previous = stripped;
    stripped = stripBashCommentLines(stripped);
    for (const pattern of wrapperPatterns) stripped = stripped.replace(pattern, "");
  }
  return stripped.trim();
}

function stripAllLeadingEnvVars(command: string): string {
  const envPattern =
    /^([A-Za-z_][A-Za-z0-9_]*(?:\[[^\]]*\])?)\+?=(?:'[^'\n\r]*'|"(?:\\.|[^"$`\\\n\r])*"|\\.|[^ \t\n\r$`;|&()<>\\\\'"])*[ \t]+/u;
  let stripped = command.trim();
  let previous = "";
  while (stripped !== previous) {
    previous = stripped;
    stripped = stripBashCommentLines(stripped);
    const match = stripped.match(envPattern);
    if (match) stripped = stripped.slice(match[0].length);
  }
  return stripped.trim();
}

function stripBashCommentLines(command: string): string {
  const lines = command.split("\n");
  const kept = lines.filter((line) => {
    const trimmed = line.trim();
    return trimmed !== "" && !trimmed.startsWith("#");
  });
  return kept.length === 0 ? command : kept.join("\n");
}

function extractBashPrefix(ruleContent: string): string | null {
  const match = ruleContent.match(/^(.+):\*$/u);
  return match?.[1]?.trim() || null;
}

function hasUnescapedStar(pattern: string): boolean {
  if (pattern.endsWith(":*")) return false;
  for (let index = 0; index < pattern.length; index++) {
    if (pattern[index] === "*" && !isEscaped(pattern, index)) return true;
  }
  return false;
}

function unescapeBashWildcardLiterals(value: string): string {
  return value.replace(/\\\*/gu, "*").replace(/\\\\/gu, "\\");
}

function matchWildcardPattern(pattern: string, command: string): boolean {
  const star = "\0STAR\0";
  const slash = "\0SLASH\0";
  let processed = "";
  for (let index = 0; index < pattern.trim().length; index++) {
    const char = pattern[index]!;
    const next = pattern[index + 1];
    if (char === "\\" && next === "*") {
      processed += star;
      index++;
    } else if (char === "\\" && next === "\\") {
      processed += slash;
      index++;
    } else {
      processed += char;
    }
  }
  const unescapedStarCount = (processed.match(/\*/gu) || []).length;
  let source = processed
    .replace(/[.+?^${}()|[\]\\'"]/gu, "\\$&")
    .replace(/\*/gu, ".*")
    .replaceAll(star, "\\*")
    .replaceAll(slash, "\\\\");
  if (source.endsWith(" .*") && unescapedStarCount === 1) {
    source = `${source.slice(0, -3)}( .*)?`;
  }
  return new RegExp(`^${source}$`, "su").test(command.trim());
}

function uniqueNonEmpty(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function parsePermissionRule(rule: string): { toolName: string; ruleContent?: string } {
  const open = findFirstUnescapedChar(rule, "(");
  if (open === -1) return { toolName: normalizeLegacyToolName(rule) };
  const close = findLastUnescapedChar(rule, ")");
  if (close <= open || close !== rule.length - 1) return { toolName: normalizeLegacyToolName(rule) };
  const toolName = rule.slice(0, open);
  if (!toolName) return { toolName: normalizeLegacyToolName(rule) };
  const rawContent = rule.slice(open + 1, close);
  if (!rawContent || rawContent === "*") return { toolName: normalizeLegacyToolName(toolName) };
  return { toolName: normalizeLegacyToolName(toolName), ruleContent: unescapeRuleContent(rawContent) };
}

function findFirstUnescapedChar(value: string, char: string): number {
  for (let index = 0; index < value.length; index++) {
    if (value[index] === char && !isEscaped(value, index)) return index;
  }
  return -1;
}

function findLastUnescapedChar(value: string, char: string): number {
  for (let index = value.length - 1; index >= 0; index--) {
    if (value[index] === char && !isEscaped(value, index)) return index;
  }
  return -1;
}

function isEscaped(value: string, index: number): boolean {
  let count = 0;
  for (let cursor = index - 1; cursor >= 0 && value[cursor] === "\\"; cursor--) count++;
  return count % 2 === 1;
}

function unescapeRuleContent(value: string): string {
  return value
    .replace(/\\\(/gu, "(")
    .replace(/\\\)/gu, ")")
    .replace(/\\\\/gu, "\\");
}

const MCP_TOOL_PREFIX = "mcp__";

function normalizeLegacyToolName(value: string): string {
  if (value === "Task") return "Agent";
  if (value === "KillShell") return "KillBash";
  if (value === "BashOutputTool" || value === "AgentOutputTool") return "BashOutput";
  return value;
}

function isMCPTool(toolName: string): boolean {
  return toolName.startsWith(MCP_TOOL_PREFIX);
}

function parseMCPToolName(toolName: string): { server: string; tool: string } | null {
  if (!isMCPTool(toolName)) return null;
  const parts = toolName.slice(MCP_TOOL_PREFIX.length).split("__");
  if (parts.length < 2) return null;
  return { server: parts[0]!, tool: parts.slice(1).join("__") };
}

function matchMCPRule(ruleToolName: string, ruleContent: string | undefined, toolName: string): boolean {
  const requestParts = parseMCPToolName(toolName);
  if (!requestParts) return false;

  // Rule like "mcp__server" matches any tool from that server
  if (!ruleContent) {
    const ruleServer = ruleToolName.slice(MCP_TOOL_PREFIX.length);
    return ruleServer === requestParts.server;
  }

  // Rule like "mcp__server(tool_pattern)" matches specific tool
  const ruleServer = ruleToolName.slice(MCP_TOOL_PREFIX.length);
  if (ruleServer !== requestParts.server) return false;
  return matchGlob(ruleContent, requestParts.tool);
}

function getSessionRuleKey(toolName: string, input: Record<string, unknown>): string {
  if (toolName === "Bash") {
    return `Bash(${getBashSessionPrefix(String(input.command || ""))}:*)`;
  }
  const value = getToolMatchValue(toolName, input);
  return value ? `${toolName}(${value})` : toolName;
}

function getBashSessionPrefix(command: string): string {
  const words = command.trim().split(/\s+/u).filter(Boolean);
  if (words.length >= 2) return `${words[0]} ${words[1]}`;
  return words[0] || command.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPermissionMode(value: unknown): value is PermissionMode {
  return (
    value === "default" ||
    value === "acceptEdits" ||
    value === "plan" ||
    value === "bypassPermissions" ||
    value === "dontAsk"
  );
}
