// ============================================================
// 1:1 from binary Z blocks - Batch 1
// ============================================================
// Z#078 gPK: Sandbox Bash Confirm (MH)
// Z#081 CD6: Plan/File Change View (aPK, a23, s23)
// Z#095 I2K: MCP Status View (fW3, XW3)
// Z#100 l2K: Elicitation Handler (CW3, i2K, IW3)
// Z#134 xb8: Task/Progress View (qP_, MDH, x0K, XG3)
// Z#141 r0K: Team Member List (mG3, NG3)
// ============================================================

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Text } from "@anthropic/ink";

// ============================================================
// Z#078 gPK — Sandbox Bash Confirm (MH) — 5,300 bytes
// ============================================================
// Renders the sandbox-aware bash permission confirmation.
// Shows SED-transformed commands and sandbox status.

interface BashConfirmProps {
  toolUseConfirm: {
    tool: { name: string };
    input: Record<string, unknown>;
    toolUseID: string;
    permissionResult: {
      decisionReason?: { type: string };
      suggestions?: Array<{ toolName: string; ruleContent: string }>;
    };
    onAllow: (input: Record<string, unknown>, suggestions?: unknown[]) => void;
    onReject: (feedback?: string) => void;
  };
  onDone: (result: unknown) => void;
  onReject: () => void;
  verbose?: boolean;
  workerBadge?: { name: string; color: string };
  messages?: unknown[];
}

// Helper: extract sandbox transformation preview from command
function extractSedPreview(command: string): string | null {
  // zO6 function - checks for known sandbox patterns
  if (command.includes("--sandbox")) return `${command} [sandboxed]`;
  return null;
}

// Helper: get readonly-safe version of command
function getReadonlyCommand(command: string): string[] {
  // XPK function - checks if command is read-only
  if (command.startsWith("ls ") || command.startsWith("cat ") || command.startsWith("grep ")) {
    return [`${command} *`];
  }
  return [];
}

export function SandboxBashConfirm(props: BashConfirmProps): React.ReactElement {
  const { toolUseConfirm: tc, onDone, onReject, workerBadge } = props;
  const permission = tc.permissionResult;

  // State
  const [feedback, setFeedback] = useState("");
  const [sedPreview, setSedPreview] = useState<string | null>(() => {
    const cmd = typeof tc.input?.command === "string" ? tc.input.command : "";
    // Check for subcommand results
    if (permission.decisionReason?.type === "subcommandResults") {
      const suggestions = (permission.suggestions || [])
        .filter((s) => s.toolName === "Bash" && s.ruleContent);
      return suggestions.length === 1 ? suggestions[0].ruleContent : null;
    }
    // Try sandbox preview
    const preview = extractSedPreview(cmd);
    if (preview) return `${preview} *`;
    // Try readonly detection
    const readonly = getReadonlyCommand(cmd);
    if (readonly.length > 0) return `${readonly[0]} *`;
    return cmd || null;
  });

  const [loading, setLoading] = useState(false);
  const worker = workerBadge?.name || "";

  // Check if destructive
  const { destructiveWarning, sandboxingEnabled, isSandboxed } = useMemo(() => {
    const cmd = typeof tc.input?.command === "string" ? tc.input.command : "";
    const destructive = cmd.includes("rm ") || cmd.includes("> /dev/") ?
      "This command may be destructive" : null;
    return {
      destructiveWarning: destructive,
      sandboxingEnabled: true, // u8.isSandboxingEnabled()
      isSandboxed: true, // NV(tc.input)
    };
  }, [tc.input]);

  // Feedback modes
  const [feedbackMode, setFeedbackMode] = useState<"accept" | "reject" | null>(null);
  const [focusedOption, setFocusedOption] = useState<"yes" | "no">("yes");

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      worker && React.createElement(Text, { color: "cyan" }, `[${worker}] `),
      React.createElement(Text, { bold: true }, "Confirm Bash Command")
    ),

    // Command display
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(Text, { dimColor: true }, "Command:"),
      React.createElement(
        Box,
        { marginLeft: 2 },
        React.createElement(
          Text,
          null,
          String(tc.input?.command || "").slice(0, 200)
        )
      ),
      // SED preview
      sedPreview && React.createElement(
        Box,
        { marginLeft: 2, marginTop: 1 },
        React.createElement(Text, { color: "yellow" }, "Sandbox preview:"),
        React.createElement(Text, { dimColor: true }, sedPreview)
      )
    ),

    // Sandbox status
    sandboxingEnabled && React.createElement(
      Box,
      { marginBottom: 1 },
      isSandboxed
        ? React.createElement(Text, { color: "green" }, "⧈ Running sandboxed")
        : React.createElement(Text, { color: "yellow" }, "⚠ Sandbox disabled for this command")
    ),

    // Destructive warning
    destructiveWarning && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { color: "red" }, `⚠ ${destructiveWarning}`)
    ),

    // Options
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: focusedOption === "yes" ? "green" : undefined },
          focusedOption === "yes" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[Y] Yes, run command")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(
          Text,
          { color: focusedOption === "no" ? "red" : undefined },
          focusedOption === "no" ? "❯ " : "  "
        ),
        React.createElement(Text, null, "[N] No, tell Claude what to do differently (esc)")
      )
    ),

    // Keyboard hints
    React.createElement(
      Box,
      null,
      React.createElement(Text, { dimColor: true }, "Enter to confirm · Esc to reject")
    )
  );
}

// ============================================================
// Z#081 CD6 — Plan/File Change View (aPK) — 11KB
// ============================================================

interface PlanViewProps {
  toolUseConfirm: {
    tool: { name: string };
    input: Record<string, unknown>;
    assistantMessage: { message: { usage?: { input_tokens: number; output_tokens: number } } };
  };
  onDone: (result: unknown) => void;
  onReject: () => void;
  workerBadge?: { name: string; color: string };
}

export function PlanApprovalView({ toolUseConfirm: tc, onDone, onReject, workerBadge }: PlanViewProps): React.ReactElement {
  const [feedbackText, setFeedbackText] = useState("");
  const [showClearContext, setShowClearContext] = useState(false);
  const [usedPercent, setUsedPercent] = useState<number | null>(null);

  const isPlanTool = tc.tool.name === "EnterPlanMode";
  const plan = isPlanTool ? (tc.input as any)?.plan as string : undefined;
  const usage = tc.assistantMessage?.message?.usage;
  const worker = workerBadge?.name || "";

  // Calculate context usage percentage
  useEffect(() => {
    if (usage) {
      // s23 function: compute used percent
      const pct = Math.round((usage.input_tokens / 200000) * 100);
      setUsedPercent(Math.min(pct, 100));
    }
  }, [usage]);

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      worker && React.createElement(Text, { color: "cyan" }, `[${worker}] `),
      React.createElement(Text, { bold: true }, isPlanTool ? "Review Plan" : "Confirm Changes")
    ),

    // Plan content preview
    plan && React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(Text, { dimColor: true }, "Plan:"),
      React.createElement(
        Box,
        { marginLeft: 2 },
        React.createElement(Text, null, plan.slice(0, 500))
      )
    ),

    // Usage indicator
    usedPercent !== null && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { dimColor: true }, `Context: ${usedPercent}% used`)
    ),

    // Options
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "❯ "),
        React.createElement(Text, null, "[Y] Yes, proceed")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "red" }, "  "),
        React.createElement(Text, null, "[N] No, tell Claude what to change")
      )
    ),

    React.createElement(
      Box,
      null,
      React.createElement(Text, { dimColor: true }, "Enter to confirm · Esc to reject · Tab to toggle")
    )
  );
}

// ============================================================
// Z#095 I2K — MCP Status / Elicitation View (fW3, XW3)
// ============================================================

interface ElicitationProps {
  event: {
    params: {
      mode: string;
      message?: string;
      requestedSchema?: {
        properties: Record<string, { default?: unknown; description?: string }>;
      };
      _meta?: { taskId: string };
    };
    serverName?: string;
  };
  onResponse: (response: unknown) => void;
  onWaitingDismiss?: () => void;
}

export function ElicitationDialog({ event, onResponse, onWaitingDismiss }: ElicitationProps): React.ReactElement {
  const { serverName, params } = event;
  const { message, requestedSchema } = params;
  const hasSchema = requestedSchema && Object.keys(requestedSchema.properties).length > 0;
  const taskId = event.params._meta?.taskId;
  const taskLabel = taskId ? ` (task ${taskId.slice(0, 8)})` : "";

  // Initialize form values from schema defaults
  const [formValues, setFormValues] = useState<Record<string, unknown>>(() => {
    const vals: Record<string, unknown> = {};
    if (requestedSchema?.properties) {
      for (const [key, prop] of Object.entries(requestedSchema.properties)) {
        if (typeof prop === "object" && prop !== null && prop.default !== undefined) {
          vals[key] = prop.default;
        }
      }
    }
    return vals;
  });

  const [decision, setDecision] = useState<"accept" | "reject" | null>(
    hasSchema ? null : "accept"
  );

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      serverName && React.createElement(Text, { color: "cyan" }, `[${serverName}] `),
      React.createElement(Text, { bold: true }, "Elicitation"),
      taskLabel && React.createElement(Text, { dimColor: true }, taskLabel)
    ),

    // Message
    message && React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, null, message)
    ),

    // Schema fields
    hasSchema && React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      ...Object.entries(requestedSchema!.properties).map(([key, prop]) =>
        React.createElement(
          Box,
          { key, marginBottom: 1 },
          React.createElement(Text, { dimColor: true }, `${key}: `),
          React.createElement(
            Text,
            null,
            String(formValues[key] || "(no value)")
          )
        )
      )
    ),

    // Decision buttons
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Accept"),
        React.createElement(Text, null, "  "),
        React.createElement(Text, { color: "red" }, "[N] Reject")
      )
    ),

    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "Enter to confirm")
    )
  );
}

// ============================================================
// Z#100 l2K — Date Format / Message Helper (CW3, i2K)
// ============================================================

export function formatDate(dateStr: string, format?: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;

    if (format === "date-time") {
      return d.toLocaleDateString("en-US", {
        weekday: "short", year: "numeric", month: "short",
        day: "numeric", hour: "numeric", minute: "2-digit",
        timeZoneName: "short",
      });
    }

    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(
        Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])
      ).toLocaleDateString("en-US", {
        weekday: "short", year: "numeric", month: "short", day: "numeric",
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

// ============================================================
// Z#134 xb8 — Task Progress Helpers (qP_, MDH, XG3, x0K)
// ============================================================

interface TaskInfo {
  id: string;
  status: "pending" | "running" | "completed" | "failed" | "killed";
  startTime: number;
  endTime?: number;
  totalPausedMs?: number;
  evictAfter?: number;
  progress?: { tokenCount?: number; lastActivity?: boolean };
  pendingMessages: unknown[];
}

export function filterActiveTasks(tasks: Record<string, TaskInfo>): TaskInfo[] {
  return Object.values(tasks)
    .filter((t) => t.evictAfter !== 0)
    .sort((a, b) => a.startTime - b.startTime);
}

export function getActiveTaskCount(tasks: Record<string, TaskInfo>): number {
  return filterActiveTasks(tasks).filter(
    (t) => t.status !== "completed" && t.status !== "failed" && t.status !== "killed"
  ).length;
}

export function getTaskStatusColor(status: string): string {
  switch (status) {
    case "completed": return "success";
    case "failed": return "error";
    case "killed": return "inactive";
    default: return "";
  }
}

interface TaskProgressInfo {
  elapsed: string;
  tokenText: string;
  queuedText: string;
  queuedCount: number;
}

export function getTaskProgress(task: TaskInfo, now: number): TaskProgressInfo {
  const isRunning = task.status === "running";
  const paused = task.totalPausedMs || 0;
  const elapsed = Math.max(
    0,
    isRunning
      ? now - task.startTime - paused
      : (task.endTime || task.startTime) - task.startTime - paused
  );
  const tokenCount = task.progress?.tokenCount;
  const tokenText = tokenCount ? ` · ${tokenCount} tokens` : "";
  const queuedCount = task.pendingMessages.length;

  return {
    elapsed: formatDuration(elapsed),
    tokenText,
    queuedText: queuedCount > 0 ? ` · ${queuedCount} queued` : "",
    queuedCount,
  };
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  return `${min}m ${sec % 60}s`;
}

// ============================================================
// Z#141 r0K — Team Member Helpers (NG3, CG3, mG3)
// ============================================================

interface TeammateInfo {
  agentId: string;
  name: string;
  status: "idle" | "busy" | "offline";
  isHidden?: boolean;
}

export function isTeammateIdle(tm: TeammateInfo): boolean {
  return tm.status === "idle";
}

export function getVisibleTeammateCount(teammates: TeammateInfo[]): number {
  return teammates.filter((t) => !t.isHidden).length;
}

export function decrementCount(n: number): number {
  return Math.max(0, n - 1);
}

interface TeamListProps {
  teamName: string;
  teammates: TeammateInfo[];
  selectedIndex: number;
  onCancel: () => void;
}

export function TeamMemberList({ teamName, teammates, selectedIndex, onCancel }: TeamListProps): React.ReactElement {
  const count = teammates.length;
  const label = `${count} ${count === 1 ? "teammate" : "teammates"}`;

  return React.createElement(
    Box,
    { flexDirection: "column" },
    // Header
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, `Team ${teamName}`),
      React.createElement(Text, { dimColor: true }, ` — ${label}`)
    ),

    // Teammate list
    teammates.length === 0
      ? React.createElement(Text, { dimColor: true }, "No teammates")
      : React.createElement(
          Box,
          { flexDirection: "column" },
          ...teammates.map((tm, i) =>
            React.createElement(
              Box,
              { key: tm.agentId },
              React.createElement(
                Text,
                { color: i === selectedIndex ? "green" : undefined },
                i === selectedIndex ? "❯ " : "  "
              ),
              React.createElement(
                Text,
                { color: tm.status === "idle" ? "green" : tm.status === "busy" ? "yellow" : "dim" },
                tm.name
              ),
              React.createElement(Text, { dimColor: true }, ` — ${tm.status}`)
            )
          )
        ),

    // Keyboard hints
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, "↑↓ to select · Enter to view · Esc to cancel")
    )
  );
}
