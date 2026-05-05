// Permission system (1:1 from binary)
import { readClaudeSettings } from "../config/claude-settings.js";

export type PermissionBehavior = "allow" | "deny" | "ask";
export type PermissionMode = "default" | "acceptEdits" | "plan" | "bypassPermissions" | "dontAsk";

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
  private denylist: string[] = [];
  private sessionApprovals = new Map<string, PermissionBehavior>();

  constructor() {
    const permissions = readClaudeSettings()?.permissions;
    const allow = Array.isArray(permissions?.allow) ? permissions.allow.filter(isString) : [];
    const deny = Array.isArray(permissions?.deny) ? permissions.deny.filter(isString) : [];
    this.allowlist = [...new Set(["Read", "Glob", "Grep", "LS", "TodoWrite", "WebFetch", ...allow])];
    this.denylist = [...new Set(deny)];
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

    // Bypass mode - allow everything
    if (this.mode === "bypassPermissions") {
      return { behavior: "allow" };
    }

    // Plan mode - deny edits and bash
    if (
      this.mode === "plan" &&
      (toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit" || toolName === "Bash")
    ) {
      return { behavior: "deny", message: "Plan mode: edits and commands are blocked until plan is approved." };
    }

    // Check denylist
    if (this.denylist.some((r) => matchRule(r, toolName, input))) {
      return { behavior: "deny", message: `Denied by rules: ${toolName}` };
    }

    // Check allowlist
    if (this.allowlist.some((r) => matchRule(r, toolName, input))) {
      return { behavior: "allow" };
    }

    // Safety checks
    if (toolName === "Bash") {
      const cmd = String(input.command || "");
      if (cmd.includes("rm -rf /") || cmd.includes("sudo rm")) {
        return { behavior: "deny", message: "Safety: destructive command blocked." };
      }
    }

    // Session approval cache. Denylist and hard safety checks still win.
    const cached = this.sessionApprovals.get(getSessionRuleKey(toolName, input));
    if (cached) return { behavior: cached };

    // Accept edits mode
    if (this.mode === "acceptEdits" && (toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit")) {
      return { behavior: "allow" };
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

function matchRule(rule: string, toolName: string, input: Record<string, unknown>): boolean {
  const trimmedRule = rule.trim();

  const parsed = parsePermissionRule(trimmedRule);
  if (parsed.toolName !== toolName) return false;
  if (!parsed.ruleContent) return true;
  if (toolName === "Bash") {
    return matchBashRule(parsed.ruleContent, String(input.command || ""));
  }
  return matchGlob(parsed.ruleContent, getToolMatchValue(toolName, input));
}

function getToolMatchValue(toolName: string, input: Record<string, unknown>): string {
  if (toolName === "Bash") return String(input.command || "");
  if (toolName === "Read" || toolName === "Write" || toolName === "Edit" || toolName === "MultiEdit") {
    return String(input.file_path || "");
  }
  if (toolName === "Grep" || toolName === "Glob") return String(input.pattern || "");
  if (toolName === "LS") return String(input.path || "");
  return JSON.stringify(input);
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

function matchBashRule(ruleContent: string, command: string): boolean {
  const normalizedRule = ruleContent.trim();
  const normalizedCommand = command.trim();
  if (!normalizedRule) return true;
  if (normalizedRule.endsWith(":*")) {
    const prefix = normalizedRule.slice(0, -2).trim();
    return normalizedCommand === prefix || normalizedCommand.startsWith(`${prefix} `);
  }
  return matchGlob(normalizedRule, normalizedCommand);
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

function normalizeLegacyToolName(value: string): string {
  if (value === "Task") return "Agent";
  if (value === "KillShell") return "KillBash";
  if (value === "BashOutputTool" || value === "AgentOutputTool") return "BashOutput";
  return value;
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
