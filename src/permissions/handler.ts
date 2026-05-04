// Permission system (1:1 from binary)

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
    // Load from settings
    this.allowlist = ["Read", "Glob", "Grep"];
  }

  setMode(mode: PermissionMode): void {
    this.mode = mode;
  }

  getMode(): PermissionMode {
    return this.mode;
  }

  async checkPermission(request: PermissionRequest): Promise<PermissionResult> {
    const { toolName, toolUseID, input, decisionReasonType } = request;

    // Bypass mode - allow everything
    if (this.mode === "bypassPermissions") {
      return { behavior: "allow" };
    }

    // Plan mode - deny edits and bash
    if (this.mode === "plan" && (toolName === "Write" || toolName === "Edit" || toolName === "Bash")) {
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

    // Session approval cache
    const cached = this.sessionApprovals.get(toolUseID);
    if (cached) return { behavior: cached };

    // Safety checks
    if (toolName === "Bash") {
      const cmd = String(input.command || "");
      if (cmd.includes("rm -rf /") || cmd.includes("sudo rm")) {
        return { behavior: "deny", message: "Safety: destructive command blocked." };
      }
    }

    // Accept edits mode
    if (this.mode === "acceptEdits" && (toolName === "Write" || toolName === "Edit")) {
      return { behavior: "allow" };
    }

    // Default: ask
    return { behavior: "ask" };
  }

  recordApproval(toolUseID: string, behavior: PermissionBehavior): void {
    this.sessionApprovals.set(toolUseID, behavior);
  }

  addAllowRule(rule: string): void {
    this.allowlist.push(rule);
  }

  addDenyRule(rule: string): void {
    this.denylist.push(rule);
  }
}

function matchRule(rule: string, toolName: string, input: Record<string, unknown>): boolean {
  // Exact tool match
  if (rule === toolName) return true;

  // Tool with pattern: Bash(git *)
  const m = rule.match(/^(\w+)\((.+)\)$/);
  if (m) {
    if (m[1] !== toolName) return false;
    const pattern = m[2].trim();
    const cmd = String(input.command || input.file_path || input.pattern || "");

    if (pattern === "*") return true;
    if (pattern.endsWith(" *")) return cmd.startsWith(pattern.slice(0, -2));
    if (pattern.endsWith("*")) return cmd.startsWith(pattern.slice(0, -1));
    return cmd === pattern;
  }

  return false;
}
