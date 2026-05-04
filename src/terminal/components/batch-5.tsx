// ============================================================
// 1:1 from binary Z blocks - Batch 5 (Final)
// ============================================================
// Z#233 gx8: Agent job management (kk3, mk3, Ek3, vk3)
// Z#277 QVK: Permission mode options
// Z#281 eVK: Remote session auto-reconnect
// Z#286 XNK: Plugin recommendation response
// Z#288 LNK: Plugin install confirm
// Z#295 UNK: LSP status indicator
// Z#325 zm8: MCP enable-all confirm
// Z#326 uhK: MCP server select
// Z#153 rGK: Update check dialog
// Z#255 UvK: Status message display
// Z#198 tZK: Tool use classifier context
// Z#202 jLK: Hook execution display
// Z#232 Ux8: Viewport/scroll handler
// ============================================================

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, Text } from "ink";

// ============================================================
// Z#233 gx8 — Agent Job Management Views
// ============================================================

interface AgentJob {
  id: string;
  state: { state: string; updatedAt: string; backend?: string };
  activity?: string;
}

/** Agent job status row in the list view */
export function AgentJobRow({
  job,
  isFocused,
  isOrigin,
  status,
  childRows,
  renaming,
  deleteArmed,
  attaching,
}: {
  job: AgentJob;
  isFocused: boolean;
  isOrigin: boolean;
  status: string;
  childRows?: unknown[];
  renaming?: boolean;
  deleteArmed?: { justKilled?: boolean };
  attaching?: boolean;
}): React.ReactElement {
  const stateLabel = job.state.state;
  const color = status === "busy" ? "yellow" : "green";
  const dim = status !== "busy";

  const action = deleteArmed?.justKilled
    ? "Killed"
    : attaching
      ? undefined
      : "Running";

  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Box,
      { flexDirection: "row" },
      // Status indicator
      React.createElement(
        Box,
        { width: 2, flexShrink: 0 },
        React.createElement(
          Text,
          { color: isFocused ? color : undefined, dimColor: !isFocused },
          isFocused ? "●" : "○"
        )
      ),
      // Job info
      React.createElement(
        Box,
        { flexGrow: 1, width: 0 as any },
        React.createElement(Text, { wrap: "truncate" as any }, job.id),
        job.state.backend && React.createElement(
          Text,
          { dimColor: true },
          `backend ${job.state.backend}`
        )
      ),
      // Action label
      action && React.createElement(
        Box,
        { flexShrink: 0, paddingLeft: 1 },
        React.createElement(Text, { dimColor: true }, action)
      )
    )
  );
}

/** Placeholder when no job is focused */
export function NoJobFocused(): React.ReactElement {
  return React.createElement(
    Box,
    { flexShrink: 0, paddingX: 2 },
    React.createElement(Text, { dimColor: true }, "no job focused")
  );
}

/** Agent job detail panel */
export function AgentJobDetail({
  job,
  loopNextFireMs,
}: {
  job: AgentJob;
  loopNextFireMs?: number;
}): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column", paddingX: 2 },
    React.createElement(Text, { bold: true }, `Job: ${job.id}`),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, null, `State: ${job.state.state}`),
      job.state.backend && React.createElement(Text, null, `Backend: ${job.state.backend}`)
    ),
    loopNextFireMs !== undefined && React.createElement(
      Text,
      { dimColor: true },
      `Next run: ${loopNextFireMs}ms`
    )
  );
}

// ============================================================
// Z#277 QVK — Permission Mode Options Builder
// ============================================================

interface PermissionOption {
  label: React.ReactElement;
  value: string;
}

export function buildPermissionModeOptions(
  toolName: string,
  showDontAskAgain: boolean
): PermissionOption[] {
  const options: PermissionOption[] = [
    {
      label: React.createElement(Text, null, "Yes, allow"),
      value: "yes",
    },
  ];

  if (showDontAskAgain) {
    options.push({
      label: React.createElement(
        Text,
        null,
        "Yes, and don't ask again for ",
        React.createElement(Text, { bold: true }, toolName)
      ),
      value: "yes-dont-ask-again",
    });
  }

  options.push({
    label: React.createElement(
      Text,
      null,
      "No, and tell Claude what to do differently ",
      React.createElement(Text, { bold: true }, "(esc)")
    ),
    value: "no",
  });

  return options;
}

// ============================================================
// Z#281 eVK — Remote Auto-Reconnect Handler
// ============================================================

export function useRemoteAutoReconnect(
  isRemote: boolean,
  isConnected: boolean,
  onReconnect: () => void
): void {
  const reconnectRef = useRef(false);

  useEffect(() => {
    if (!isRemote || !isConnected) return;

    const interval = setInterval(() => {
      if (reconnectRef.current) return;
      // Check connection and auto-reconnect
      onReconnect();
    }, 30000);

    return () => clearInterval(interval);
  }, [isRemote, isConnected, onReconnect]);
}

// ============================================================
// Z#286 XNK — Plugin Recommendation Response Handler
// ============================================================

type PluginResponse = "yes" | "no" | "never" | "disable";

export function getPluginResponseOptions(): Array<{ label: React.ReactElement; value: PluginResponse }> {
  return [
    {
      label: React.createElement(
        Text,
        null,
        "Yes, install ",
        React.createElement(Text, { bold: true }, "plugin")
      ),
      value: "yes",
    },
    {
      label: React.createElement(Text, null, "No, not now"),
      value: "no",
    },
    {
      label: React.createElement(Text, null, "No, never suggest this plugin"),
      value: "never",
    },
    {
      label: React.createElement(Text, null, "Disable all plugin recommendations"),
      value: "disable",
    },
  ];
}

// ============================================================
// Z#288 LNK — Plugin Install Confirmation
// ============================================================

export function PluginInstallConfirmation({
  pluginName,
  pluginCount,
}: {
  pluginName: string;
  pluginCount: number;
}): React.ReactElement {
  const label =
    pluginCount <= 2
      ? pluginCount === 1
        ? pluginName
        : `${pluginName.split(",")[0]} and ${pluginName.split(",")[1]}`
      : `${pluginCount} plugins`;

  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true }, "Install Plugin"),
      React.createElement(Text, { dimColor: true }, ` ${label}`)
    ),
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Yes, install")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, "[N] No, not now")
      )
    ),
    React.createElement(
      Box,
      null,
      React.createElement(Text, { dimColor: true }, "Enter to confirm")
    )
  );
}

// ============================================================
// Z#295 UNK — LSP Status Indicator
// ============================================================

interface LspStatus {
  isConnected: boolean;
  filePath?: string;
  text?: string;
  error?: string;
}

export function LspStatusIndicator({ status }: { status: LspStatus }): React.ReactElement | null {
  const isActive = status.isConnected && (status.filePath || (status.text && status.text.length > 0));
  const isError = !!status.error;

  if (isActive) {
    return React.createElement(
      Box,
      null,
      React.createElement(Text, { color: "green" }, "LSP: Connected"),
      status.filePath && React.createElement(Text, { dimColor: true }, ` · ${status.filePath}`)
    );
  }

  if (isError) {
    return React.createElement(
      Box,
      null,
      React.createElement(Text, { color: "red" }, `LSP: ${status.error}`)
    );
  }

  return null;
}

// ============================================================
// Z#325 zm8 — MCP Enable-All Confirmation
// ============================================================

export function McpEnableAllConfirm({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "warning" as any }, title)
    ),
    React.createElement(
      Box,
      { flexDirection: "column", marginBottom: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, "Enable all MCP servers for this project?")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, "This can be changed later in settings.")
      )
    ),
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Yes, enable all")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, "[N] Cancel")
      )
    )
  );
}

// ============================================================
// Z#326 uhK — MCP Server Select List
// ============================================================

interface McpServerOption {
  name: string;
  description?: string;
  enabled: boolean;
}

export function McpServerSelectList({
  servers,
  selectedIndex,
  onSelect,
}: {
  servers: McpServerOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column" },
    ...servers.map((server, i) =>
      React.createElement(
        Box,
        { key: server.name, flexDirection: "row" },
        React.createElement(
          Text,
          { color: i === selectedIndex ? "green" : undefined },
          i === selectedIndex ? "❯ " : "  "
        ),
        React.createElement(Text, null, server.name),
        server.description && React.createElement(
          Text,
          { dimColor: true },
          ` — ${server.description}`
        ),
        React.createElement(
          Text,
          { dimColor: true, color: server.enabled ? "green" as any : undefined },
          server.enabled ? " (enabled)" : " (disabled)"
        )
      )
    )
  );
}

// ============================================================
// Z#153 rGK — Update Check Dialog
// ============================================================

interface UpdateInfo {
  currentVersion: string;
  latestVersion: string;
  updateCommand: string;
}

export function UpdateCheckDialog({
  updateInfo,
  onUpdate,
  onSkip,
}: {
  updateInfo: UpdateInfo;
  onUpdate: () => void;
  onSkip: () => void;
}): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column", padding: 1 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: "cyan" }, "Update Available")
    ),
    React.createElement(
      Box,
      { flexDirection: "column", marginY: 1 },
      React.createElement(
        Box,
        null,
        React.createElement(Text, null, `Current: ${updateInfo.currentVersion}`),
        React.createElement(Text, null, `Latest:  ${updateInfo.latestVersion}`)
      ),
      React.createElement(
        Box,
        { marginTop: 1 },
        React.createElement(Text, { dimColor: true }, `Run: ${updateInfo.updateCommand}`)
      )
    ),
    React.createElement(
      Box,
      { flexDirection: "column" },
      React.createElement(
        Box,
        null,
        React.createElement(Text, { color: "green" }, "[Y] Update now")
      ),
      React.createElement(
        Box,
        null,
        React.createElement(Text, { dimColor: true }, "[N] Skip this version")
      )
    )
  );
}

// ============================================================
// Z#255 UvK — Status / Error Message Display
// ============================================================

export function StatusMessageDisplay({
  message,
  detail,
  color = "text" as any,
}: {
  message: string;
  detail?: string;
  color?: string;
}): React.ReactElement {
  return React.createElement(
    Box,
    { flexDirection: "column" },
    React.createElement(
      Box,
      null,
      React.createElement(Text, { color }, message)
    ),
    detail && React.createElement(
      Box,
      { marginLeft: 2, marginTop: 1 },
      React.createElement(Text, { dimColor: true }, detail)
    )
  );
}

// ============================================================
// Z#198 tZK — Tool Use Classifier Context
// ============================================================

interface ClassifierDecision {
  isAutoApproved: boolean;
  decisionReason?: string;
  decisionReasonType?: string;
  classifierApprovable?: boolean;
}

export function getClassifierLabel(decision: ClassifierDecision): string {
  if (decision.isAutoApproved) return "Auto-approved";
  if (decision.classifierApprovable) return "Classifier may approve";
  if (decision.decisionReasonType === "safetyCheck") return "Safety check required";
  if (decision.decisionReasonType === "subcommandResults") return "Subcommand results";
  return "Manual approval required";
}

export function getClassifierColor(decision: ClassifierDecision): string {
  if (decision.isAutoApproved) return "green";
  if (decision.classifierApprovable) return "yellow";
  return "red";
}

// ============================================================
// Z#202 jLK — Hook Execution Display
// ============================================================

interface HookExecution {
  hookEvent: string;
  hookSource?: string;
  toolName?: string;
  status: "running" | "completed" | "failed";
  statusMessage?: string;
}

export function HookExecutionDisplay({
  hook,
}: {
  hook: HookExecution;
}): React.ReactElement {
  const statusColor =
    hook.status === "completed" ? "green" : hook.status === "failed" ? "red" : "yellow";
  const icon =
    hook.status === "completed" ? "✓" : hook.status === "failed" ? "✗" : "⏳";

  return React.createElement(
    Box,
    { flexDirection: "row" },
    React.createElement(Text, { color: statusColor }, `${icon} `),
    React.createElement(Text, { dimColor: true }, `[${hook.hookEvent}]`),
    hook.toolName && React.createElement(Text, null, ` ${hook.toolName}`),
    hook.hookSource && React.createElement(
      Text,
      { dimColor: true },
      ` (${hook.hookSource})`
    ),
    hook.statusMessage && React.createElement(
      Text,
      { dimColor: true },
      ` — ${hook.statusMessage}`
    )
  );
}

// ============================================================
// Z#232 Ux8 — Viewport Scroll Handler
// ============================================================

export function useViewportScroll(
  contentHeight: number,
  viewportHeight: number
): {
  scrollOffset: number;
  isAtBottom: boolean;
  scrollToBottom: () => void;
} {
  const [scrollOffset, setScrollOffset] = useState(0);
  const isAtBottom = scrollOffset + viewportHeight >= contentHeight;

  const scrollToBottom = useCallback(() => {
    setScrollOffset(Math.max(0, contentHeight - viewportHeight));
  }, [contentHeight, viewportHeight]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    scrollToBottom();
  }, [contentHeight, scrollToBottom]);

  return { scrollOffset, isAtBottom, scrollToBottom };
}
